import * as grpc from "grpc";

import * as services from "../generated/api_grpc_pb";
import * as messages from "../generated/api_pb";

import { promisify } from "./util";

/**
 * Stub is a stub/client connecting to a single dgraph server instance.
 */
export class DgraphClientStub {
    private stub: services.DgraphClient;
    private promisified: {
        alter(op: messages.Operation): Promise<messages.Payload>;
        query(req: messages.Request): Promise<messages.Response>;
        mutate(mu: messages.Mutation): Promise<messages.Assigned>;
        commitOrAbort(ctx: messages.TxnContext): Promise<messages.TxnContext>;
        checkVersion(check: messages.Check): Promise<messages.Version>;
        waitForReady(deadline: grpc.Deadline): Promise<void>;
    };

    constructor(addr?: string | null, credentials?: grpc.ChannelCredentials | null) {
        if (addr == null) {
            // tslint:disable-next-line no-parameter-reassignment
            addr = "localhost:9080";
        }
        if (credentials == null) {
            // tslint:disable-next-line no-parameter-reassignment
            credentials = grpc.credentials.createInsecure();
        }

        this.stub = new services.DgraphClient(addr, credentials);
        this.promisified = {
            alter: promisify(this.stub.alter, this.stub),
            query: promisify(this.stub.query, this.stub),
            mutate: promisify(this.stub.mutate, this.stub),
            commitOrAbort: promisify(this.stub.commitOrAbort, this.stub),
            checkVersion: promisify(this.stub.checkVersion, this.stub),
            waitForReady: promisify(this.stub.waitForReady, this.stub),
        };
    }

    public alter(op: messages.Operation): Promise<messages.Payload> {
        return this.promisified.alter(op);
    }

    public query(req: messages.Request): Promise<messages.Response> {
        return this.promisified.query(req);
    }

    public mutate(mu: messages.Mutation): Promise<messages.Assigned> {
        return this.promisified.mutate(mu);
    }

    public commitOrAbort(ctx: messages.TxnContext): Promise<messages.TxnContext> {
        return this.promisified.commitOrAbort(ctx);
    }

    public checkVersion(check: messages.Check): Promise<messages.Version> {
        return this.promisified.checkVersion(check);
    }

    public waitForReady(deadline: grpc.Deadline): Promise<void> {
        return this.promisified.waitForReady(deadline);
    }

    public close(): void {
        return this.stub.close();
    }

    public grpcClient(): grpc.Client {
        return this.stub;
    }
}
