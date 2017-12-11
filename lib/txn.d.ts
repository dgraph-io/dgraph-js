import * as messages from "../generated/api_pb";
import { DgraphClient } from "./client";
export declare class Txn {
    private dc;
    private ctx;
    private finished;
    private mutated;
    constructor(dc: DgraphClient);
    query(q: string): Promise<messages.Response>;
    queryWithVars(q: string, vars?: {
        [k: string]: any;
    } | null): Promise<messages.Response>;
    mutate(mu: messages.Mutation): Promise<messages.Assigned>;
    commit(): Promise<void>;
    discard(): Promise<void>;
    private mergeContext(src?);
}
