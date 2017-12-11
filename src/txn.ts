import * as jspb from "google-protobuf";

import * as messages from "./generated/api_pb";

import { DgraphClient } from "./client";
import { ERR_ABORTED, ERR_FINISHED } from "./errors";
import { isAbortedError, isConflictError, mergeLinReads } from "./util";

/**
 * Txn is a single atomic transaction.
 *
 * A transaction lifecycle is as follows:
 *
 * 1. Created using Client.newTxn.
 *
 * 2. Various query and qutate calls made.
 *
 * 3. commit or discard used. If any mutations have been made, It's important
 * that at least one of these methods is called to clean up resources. discard
 * is a no-op if dommit has already been called, so it's safe to call discard
 * after calling commit.
 */
export class Txn {
    private dc: DgraphClient;
    private ctx: messages.TxnContext;
    private finished: boolean = false;
    private mutated: boolean = false;

    constructor(dc: DgraphClient) {
        this.dc = dc;
        this.ctx = new messages.TxnContext();
        this.ctx.setLinRead(this.dc.getLinRead());
    }

    /**
     * query sends a query to one of the connected Dgraph instances. If no mutations
     * need to be made in the same transaction, it's convenient to chain the method,
     * e.g. client.newTxn().query("...").
     */
    public async query(q: string): Promise<messages.Response> {
        return await this.queryWithVars(q);
    }

    /**
     * queryWithVars is like query, but allows a variable map to be used. This can
     * provide safety against injection attacks.
     */
    public async queryWithVars(
        q: string,
        vars?: { [k: string]: any } | null, // tslint:disable-line no-any
    ): Promise<messages.Response> {
        if (this.finished) {
            throw ERR_FINISHED;
        }

        const req = new messages.Request();
        req.setQuery(q);
        req.setStartTs(this.ctx.getStartTs());
        req.setLinRead(this.ctx.getLinRead());
        if (vars != null) {
            const varsMap = <jspb.Map<string, string>>req.getVarsMap();
            Object.keys(vars).forEach((key: string) => {
                const value = vars[key];
                if (typeof value === "string" || value instanceof String) {
                    varsMap.set(key, value.toString());
                }
            });
        }

        const c = this.dc.anyClient();
        const res = await c.query(req);
        this.mergeContext(res.getTxn());
        return res;
    }

    /**
     * mutate allows data stored on Dgraph instances to be modified. The fields in
     * Mutation come in pairs, set and delete. Mutations can either be encoded as
     * JSON or as RDFs.
     *
     * If commitNow is set, then this call will result in the transaction being
     * committed. In this case, an explicit call to commit doesn't need to
     * subsequently be made.
     *
     * If the mutation fails, then the transaction is discarded and all future
     * operations on it will fail.
     */
    public async mutate(mu: messages.Mutation): Promise<messages.Assigned> {
        if (this.finished) {
            throw ERR_FINISHED;
        }

        this.mutated = true;
        mu.setStartTs(this.ctx.getStartTs());

        let ag: messages.Assigned;
        const c = this.dc.anyClient();
        try {
            ag = await c.mutate(mu);
        } catch (e) {
            // Since a mutation error occurred, the txn should no longer be used (some
            // mutations could have applied but not others, but we don't know which ones).
            // Discarding the transaction enforces that the user cannot use the txn further.
            try {
                await this.discard();
            } catch (e) {
                // Ignore error - user should see the original error.
            }

            // Transaction could be aborted(status.ABORTED) if commitNow was true, or server
            // could send a message that this mutation conflicts(status.FAILED_PRECONDITION)
            // with another transaction.
            throw (isAbortedError(e) || isConflictError(e)) ? ERR_ABORTED : e;
        }

        if (mu.getCommitNow()) {
            this.finished = true;
        }

        this.mergeContext(ag.getContext());
        return ag;
    }

    /**
     * commit commits any mutations that have been made in the transaction. Once
     * commit has been called, the lifespan of the transaction is complete.
     *
     * Errors could be thrown for various reasons. Notably, ERR_ABORTED could be
     * thrown if transactions that modify the same data are being run concurrently.
     * It's up to the user to decide if they wish to retry. In this case, the user
     * should create a new transaction.
     */
    public async commit(): Promise<void> {
        if (this.finished) {
            throw ERR_FINISHED;
        }

        this.finished = true;
        if (!this.mutated) {
            return;
        }

        const c = this.dc.anyClient();
        try {
            await c.commitOrAbort(this.ctx);
        } catch (e) {
            throw isAbortedError(e) ? ERR_ABORTED : e;
        }
    }

    /**
     * discard cleans up the resources associated with an uncommitted transaction
     * that contains mutations. It is a no-op on transactions that have already been
     * committed or don't contain mutations. Therefore it is safe (and recommended)
     * to call it in a finally block.
     *
     * In some cases, the transaction can't be discarded, e.g. the grpc connection
     * is unavailable. In these cases, the server will eventually do the transaction
     * clean up.
     */
    public async discard(): Promise<void> {
        if (this.finished) {
            return;
        }

        this.finished = true;
        if (!this.mutated) {
            return;
        }

        this.ctx.setAborted(true);
        const c = this.dc.anyClient();
        await c.commitOrAbort(this.ctx);
    }

    private mergeContext(src?: messages.TxnContext | null): void {
        if (src == null) {
            // This condition will be true only if the server doesn't return a txn context after a query or mutation.
            return;
        }

        mergeLinReads(this.ctx.getLinRead(), src.getLinRead());
        this.dc.mergeLinReads(src.getLinRead());

        if (this.ctx.getStartTs() === 0) {
            this.ctx.setStartTs(src.getStartTs());
        } else if (this.ctx.getStartTs() !== src.getStartTs()) {
            // This condition should never be true.
            throw new Error("StartTs mismatch");
        }

        for (const key of src.getKeysList()) {
            this.ctx.addKeys(key);
        }
    }
}
