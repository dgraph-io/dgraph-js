import * as messages from "../generated/api_pb";
import { DgraphClientStub } from "./clientStub";
import { Txn } from "./txn";
export declare class DgraphClient {
    private clients;
    private linRead;
    private debugMode;
    constructor(...clients: DgraphClientStub[]);
    alter(op: messages.Operation): Promise<messages.Payload>;
    newTxn(): Txn;
    setDebugMode(mode?: boolean): void;
    debug(msg: string): void;
    getLinRead(): messages.LinRead;
    mergeLinReads(src?: messages.LinRead | null): void;
    anyClient(): DgraphClientStub;
}
export declare function deleteEdges(mu: messages.Mutation, uid: string, ...predicates: string[]): void;
