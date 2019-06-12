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
    sequencing(sequencing: messages.LinRead.SequencingMap[keyof messages.LinRead.SequencingMap]): void;
    query(q: string, metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<types.Response>;
    queryWithVars(q: string, vars?: {
        [k: string]: any;
    }, metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<types.Response>;
    mutate(mu: types.Mutation, metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<messages.Assigned>;
    commit(metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<void>;
    discard(metadata?: grpc.Metadata, options?: grpc.CallOptions): Promise<void>;
    private mergeContext;
}
