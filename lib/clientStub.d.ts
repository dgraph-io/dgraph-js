import * as grpc from "grpc";
import * as messages from "../generated/api_pb";
export declare class DgraphClientStub {
    private readonly stub;
    private accessJwt;
    private refreshJwt;
    private readonly promisified;
    constructor(addr?: string, credentials?: grpc.ChannelCredentials, options?: object);
    login(userid?: string, password?: string, refreshJwt?: string, metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<messages.Jwt>;
    alter(op: messages.Operation, metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<messages.Payload>;
    retryLogin(metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<messages.Jwt>;
    query(req: messages.Request, metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<messages.Response>;
    mutate(mu: messages.Mutation, metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<messages.Response>;
    commitOrAbort(ctx: messages.TxnContext, metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<messages.TxnContext>;
    checkVersion(check: messages.Check, metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<messages.Version>;
    waitForReady(deadline: grpc.Deadline): Promise<void>;
    close(): void;
    grpcClient(): grpc.Client;
    private ensureMetadata;
}
