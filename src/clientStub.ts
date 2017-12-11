import * as grpc from "grpc";

import * as services from "./generated/api_grpc_pb";
import * as messages from "./generated/api_pb";

import { promisify } from "./util";

/**
 * Stub is a stub/client connecting to a single dgraph server instance.
 */
export class DgraphClientStub {
    private stub: services.DgraphClient;
    private promisified: {
        alter(op: messages.Operation): Promise<messages.Payload>,
        query(req: messages.Request): Promise<messages.Response>,
        mutate(mu: messages.Mutation): Promise<messages.Assigned>,
        commitOrAbort(ctx: messages.TxnContext): Promise<messages.TxnContext>,
        checkVersion(check: messages.Check): Promise<messages.Version>,
    };

    constructor(addr?: string | null, credentials?: grpc.ChannelCredentials | null) {
        if (addr == null) {
            addr = "localhost:9080";
        }
        if (credentials == null) {
            credentials = grpc.credentials.createInsecure();
        }

        this.stub = new services.DgraphClient(addr, credentials);
        this.promisified = {
            alter: promisify(this.stub.alter, this.stub),
            query: promisify(this.stub.query, this.stub),
            mutate: promisify(this.stub.mutate, this.stub),
            commitOrAbort: promisify(this.stub.commitOrAbort, this.stub),
            checkVersion: promisify(this.stub.checkVersion, this.stub),
        };
    }

    public async alter(op: messages.Operation): Promise<messages.Payload> {
        return await this.promisified.alter(op);
    }

    public async query(req: messages.Request): Promise<messages.Response> {
        return await this.promisified.query(req);
    }

    public async mutate(mu: messages.Mutation): Promise<messages.Assigned> {
        return await this.promisified.mutate(mu);
    }

    public async commitOrAbort(ctx: messages.TxnContext): Promise<messages.TxnContext> {
        return await this.promisified.commitOrAbort(ctx);
    }

    public async checkVersion(check: messages.Check): Promise<messages.Version> {
        return await this.promisified.checkVersion(check);
    }
}
