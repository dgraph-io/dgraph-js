import * as grpc from "grpc";
import * as messages from "../generated/api_pb";
export declare class DgraphClientStub {
    private readonly stub;
    private promisified;
    constructor(addr?: string | null, credentials?: grpc.ChannelCredentials | null, options?: object | null);
    alter(op: messages.Operation, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.Payload>;
    query(req: messages.Request, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.Response>;
    mutate(mu: messages.Mutation, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.Assigned>;
    commitOrAbort(ctx: messages.TxnContext, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.TxnContext>;
    checkVersion(check: messages.Check, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.Version>;
    waitForReady(deadline: grpc.Deadline): Promise<void>;
    close(): void;
    grpcClient(): grpc.Client;
}
