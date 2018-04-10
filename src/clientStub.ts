import * as grpc from "grpc";

import * as services from "../generated/api_grpc_pb";
import * as messages from "../generated/api_pb";

import { promisify1, promisify3 } from "./util";

/**
 * Stub is a stub/client connecting to a single dgraph server instance.
 */
export class DgraphClientStub {
    private readonly stub: services.DgraphClient;
    private promisified: {
        alter(
            op: messages.Operation,
            metadata: grpc.Metadata | null,
            options: grpc.CallOptions | null,
        ): Promise<messages.Payload>;

        query(
            req: messages.Request,
            metadata: grpc.Metadata | null,
            options: grpc.CallOptions | null,
        ): Promise<messages.Response>;

        mutate(
            mu: messages.Mutation,
            metadata: grpc.Metadata | null,
            options: grpc.CallOptions | null,
        ): Promise<messages.Assigned>;

        commitOrAbort(
            ctx: messages.TxnContext,
            metadata: grpc.Metadata | null,
            options: grpc.CallOptions | null,
        ): Promise<messages.TxnContext>;

        checkVersion(
            check: messages.Check,
            metadata: grpc.Metadata | null,
            options: grpc.CallOptions | null,
        ): Promise<messages.Version>;

        waitForReady(deadline: grpc.Deadline): Promise<void>;
    };

    constructor(addr?: string | null, credentials?: grpc.ChannelCredentials | null, options?: object | null) {
        if (addr == null) {
            // tslint:disable-next-line no-parameter-reassignment
            addr = "localhost:9080";
        }
        if (credentials == null) {
            // tslint:disable-next-line no-parameter-reassignment
            credentials = grpc.credentials.createInsecure();
        }

        this.stub = new services.DgraphClient(addr, credentials, options);
        this.promisified = {
            alter: promisify3(this.stub.alter, this.stub),
            query: promisify3(this.stub.query, this.stub),
            mutate: promisify3(this.stub.mutate, this.stub),
            commitOrAbort: promisify3(this.stub.commitOrAbort, this.stub),
            checkVersion: promisify3(this.stub.checkVersion, this.stub),
            waitForReady: promisify1(this.stub.waitForReady, this.stub),
        };
    }

    public alter(op: messages.Operation, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.Payload> {
        return this.promisified.alter(op, ensureMetadata(metadata), ensureCallOptions(options));
    }

    public query(req: messages.Request, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.Response> {
        return this.promisified.query(req, ensureMetadata(metadata), ensureCallOptions(options));
    }

    public mutate(mu: messages.Mutation, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.Assigned> {
        return this.promisified.mutate(mu, ensureMetadata(metadata), ensureCallOptions(options));
    }

    public commitOrAbort(
        ctx: messages.TxnContext, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.TxnContext> {
        return this.promisified.commitOrAbort(ctx, ensureMetadata(metadata), ensureCallOptions(options));
    }

    public checkVersion(
        check: messages.Check, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.Version> {
        return this.promisified.checkVersion(check, ensureMetadata(metadata), ensureCallOptions(options));
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

function ensureMetadata(metadata?: grpc.Metadata | null): grpc.Metadata {
    return (metadata == null) ? new grpc.Metadata() : metadata;
}

function ensureCallOptions(options?: grpc.CallOptions | null): grpc.CallOptions {
    return (options == null) ? {
        propagate_flags: grpc.propagate.DEFAULTS,
        credentials: null,
    } : options;
}
