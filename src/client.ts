import * as grpc from "grpc";

import * as messages from "../generated/api_pb";

import { DgraphClientStub } from "./clientStub";
import { ERR_NO_CLIENTS } from "./errors";
import { Txn } from "./txn";
import * as types from "./types";
import { mergeLinReads, stringifyMessage } from "./util";

/**
 * Client is a transaction aware client to a set of Dgraph server instances.
 */
export class DgraphClient {
    private readonly clients: DgraphClientStub[];
    private readonly linRead: messages.LinRead;
    private debugMode: boolean = false;

    /**
     * Creates a new Client for interacting with the Dgraph store.
     *
     * The client can be backed by multiple connections (to the same server, or
     * multiple servers in a cluster).
     */
    constructor(...clients: DgraphClientStub[]) {
        if (clients.length === 0) {
            throw ERR_NO_CLIENTS;
        }

        this.clients = clients;
        this.linRead = new messages.LinRead();
    }

    /**
     * By setting various fields of api.Operation, alter can be used to do the
     * following:
     *
     * 1. Modify the schema.
     *
     * 2. Drop a predicate.
     *
     * 3. Drop the database.
     */
    public async alter(op: messages.Operation, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<types.Payload> {
        this.debug(`Alter request:\n${stringifyMessage(op)}`);

        const c = this.anyClient();
        const pl = types.createPayload(await c.alter(op, metadata, options));
        this.debug(`Alter response:\n${stringifyMessage(pl)}`);

        return pl;
    }

    /**
     * newTxn creates a new transaction.
     */
    public newTxn(): Txn {
        return new Txn(this);
    }

    /**
     * newReadOnlyTxn creates a new transaction and passes down the readOnly flag
     * If you pass in bestEffort = true, then it doesn't wait for all alphas to have latest maxTs
     */
    public newReadOnlyTxn(): Txn {
        return new Txn(this, { readOnly: true });
    }

    /**
     * setDebugMode switches on/off the debug mode which prints helpful debug messages
     * while performing alters, queries and mutations.
     */
    public setDebugMode(mode: boolean = true): void {
        this.debugMode = mode;
    }

    /**
     * debug prints a message on the console if debug mode is switched on.
     */
    public debug(msg: string): void {
        if (this.debugMode) {
            // tslint:disable-next-line no-console
            console.log(msg);
        }
    }

    public getLinRead(): messages.LinRead {
        const lr = new messages.LinRead();
        const idsMap = lr.getIdsMap();
        this.linRead.getIdsMap().forEach((value: number, key: number): void => {
            idsMap.set(key, value);
        });

        return lr;
    }

    public mergeLinReads(src?: messages.LinRead | null): void {
        mergeLinReads(this.linRead, src);
    }

    public anyClient(): DgraphClientStub {
        return this.clients[Math.floor(Math.random() * this.clients.length)];
    }
}

/**
 * deleteEdges sets the edges corresponding to predicates on the node with the
 * given uid for deletion.
 *
 * This helper function doesn't run the mutation on the server. It must be done
 * by the user after the function returns.
 */
export function deleteEdges(mu: types.Mutation, uid: string, ...predicates: string[]): void {
    for (const predicate of predicates) {
        const nquad = new messages.NQuad();
        nquad.setSubject(uid);
        nquad.setPredicate(predicate);

        const ov = new messages.Value();
        ov.setDefaultVal("_STAR_ALL");
        nquad.setObjectValue(ov);

        mu.addDel(nquad);
    }
}
