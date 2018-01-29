import * as grpc from "grpc";
import * as messages from "../generated/api_pb";
export declare class DgraphClientStub {
    private stub;
    private promisified;
    constructor(addr?: string | null, credentials?: grpc.ChannelCredentials | null, options?: object | null);
    alter(op: messages.Operation, options?: grpc.CallOptions | null): Promise<messages.Payload>;
    query(req: messages.Request, options?: grpc.CallOptions | null): Promise<messages.Response>;
    mutate(mu: messages.Mutation, options?: grpc.CallOptions | null): Promise<messages.Assigned>;
    commitOrAbort(ctx: messages.TxnContext, options?: grpc.CallOptions | null): Promise<messages.TxnContext>;
    checkVersion(check: messages.Check, options?: grpc.CallOptions | null): Promise<messages.Version>;
    waitForReady(deadline: grpc.Deadline): Promise<void>;
    close(): void;
    grpcClient(): grpc.Client;
}
