import * as grpc from "grpc";
import * as messages from "../generated/api_pb";
import { DgraphClientStub } from "./clientStub";
import { Txn } from "./txn";
import * as types from "./types";
export declare class DgraphClient {
    private readonly clients;
    private readonly linRead;
    private debugMode;
    constructor(...clients: DgraphClientStub[]);
    alter(op: messages.Operation, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<types.Payload>;
    newTxn(): Txn;
    setDebugMode(mode?: boolean): void;
    debug(msg: string): void;
    getLinRead(): messages.LinRead;
    mergeLinReads(src?: messages.LinRead | null): void;
    anyClient(): DgraphClientStub;
}
export declare function deleteEdges(mu: types.Mutation, uid: string, ...predicates: string[]): void;
