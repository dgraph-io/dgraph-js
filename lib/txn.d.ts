import * as grpc from "grpc";
import * as messages from "../generated/api_pb";
import { DgraphClient } from "./client";
import * as types from "./types";
export declare class Txn {
    private readonly dc;
    private readonly ctx;
    private finished;
    private mutated;
    private sequencingProp;
    constructor(dc: DgraphClient);
    sequencing(sequencing: messages.LinRead.Sequencing): void;
    query(q: string, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<types.Response>;
    queryWithVars(q: string, vars?: {
        [k: string]: any;
    } | null, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<types.Response>;
    mutate(mu: types.Mutation, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<messages.Assigned>;
    commit(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<void>;
    discard(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<void>;
    private mergeContext(src?);
}
