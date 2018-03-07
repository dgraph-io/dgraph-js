import * as grpc from "grpc";
import * as messages from "../generated/api_pb";
import { DgraphClient } from "./client";
import * as types from "./types";
export declare class Txn {
    private dc;
    private ctx;
    private finished;
    private mutated;
    constructor(dc: DgraphClient);
    query(q: string, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<types.Response>;
    queryWithVars(q: string, vars?: {
        [k: string]: any;
    } | null, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<types.Response>;
    mutate(mu: types.Mutation, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.Assigned>;
    commit(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<void>;
    discard(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<void>;
    private mergeContext(src?);
}
