import * as grpc from "grpc";
import * as messages from "../generated/api_pb";
export declare class DgraphClientStub {
    private stub;
    private promisified;
    constructor(addr?: string | null, credentials?: grpc.ChannelCredentials | null);
    alter(op: messages.Operation): Promise<messages.Payload>;
    query(req: messages.Request): Promise<messages.Response>;
    mutate(mu: messages.Mutation): Promise<messages.Assigned>;
    commitOrAbort(ctx: messages.TxnContext): Promise<messages.TxnContext>;
    checkVersion(check: messages.Check): Promise<messages.Version>;
}
