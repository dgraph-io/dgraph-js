import * as grpc from "grpc";
import * as messages from "../generated/api_pb";
import { DgraphClientStub } from "./clientStub";
import { Txn, TxnOptions } from "./txn";
import * as types from "./types";
export declare class DgraphClient {
    private readonly clients;
    private debugMode;
    constructor(...clients: DgraphClientStub[]);
    alter(op: messages.Operation, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): Promise<types.Payload>;
    newTxn(txnOpts?: TxnOptions): Txn;
    setDebugMode(mode?: boolean): void;
    debug(msg: string): void;
    anyClient(): DgraphClientStub;
}
export declare function isJwtExpired(err: any): Boolean;
export declare function deleteEdges(mu: types.Mutation, uid: string, ...predicates: string[]): void;
