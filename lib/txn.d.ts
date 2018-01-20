import * as messages from "../generated/api_pb";
import { DgraphClient } from "./client";
import * as types from "./types";
export declare class Txn {
    private dc;
    private ctx;
    private finished;
    private mutated;
    constructor(dc: DgraphClient);
    query(q: string): Promise<types.Response>;
    queryWithVars(q: string, vars?: {
        [k: string]: any;
    } | null): Promise<types.Response>;
    mutate(mu: types.Mutation): Promise<messages.Assigned>;
    commit(): Promise<void>;
    discard(): Promise<void>;
    private mergeContext(src?);
}
