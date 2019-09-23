import * as grpc from "grpc";

import * as dgraph from "../src";

// tslint:disable-next-line strict-boolean-expressions
export const SERVER_ADDR = process.env.DGRAPH_SERVER_ADDR || "localhost:9080";
export const SERVER_CREDENTIALS = grpc.credentials.createInsecure();

export function createClientStub(): dgraph.DgraphClientStub {
    return new dgraph.DgraphClientStub(SERVER_ADDR, SERVER_CREDENTIALS);
}

export function createClient(clientStub: dgraph.DgraphClientStub): dgraph.DgraphClient {
    return new dgraph.DgraphClient(clientStub);
}

export function setSchema(c: dgraph.DgraphClient, schema: string): Promise<dgraph.Payload> {
    const op = new dgraph.Operation();
    op.setSchema(schema);
    return c.alter(op);
}

export function dropAll(c: dgraph.DgraphClient): Promise<dgraph.Payload> {
    const op = new dgraph.Operation();
    op.setDropAll(true);
    return c.alter(op);
}

export async function setup(): Promise<dgraph.DgraphClient> {
    const stub = new dgraph.DgraphClientStub(SERVER_ADDR, SERVER_CREDENTIALS);
    await stub.login("groot", "password");

    const c = new dgraph.DgraphClient(stub);

    await dropAll(c);
    return c;
}

export function wait(time: number): Promise<void> {
    return new Promise((resolve: (value?: void | PromiseLike<void>) => void): void => {
        const id = setTimeout(
            () => {
                clearTimeout(id);
                resolve();
            },
            time,
        );
    });
}

export async function tryUpsert(client: dgraph.DgraphClient, query: string, mutation: dgraph.Mutation, blankNodeLabel: string)
: Promise<void> {
    const txn = client.newTxn();

    const req = new dgraph.Request();
    req.setQuery(query);
    req.setMutationsList([mutation]);
    req.setCommitNow(true);

    let uid: string;
    try {
        // Update account only if matching uid found.
        const response = await txn.doRequest(req);
        uid = response.getUidsMap().get(blankNodeLabel);
        expect(uid).not.toEqual("");
    } finally {
        await txn.discard();
    }
}

export const QUERY_PERMISSION_DENIED = new Error("7 PERMISSION_DENIED:\
 unauthorized to query the predicate: unauthorized to do Read on predicate name");
export const MUTATE_PERMISSION_DENIED = new Error("7 PERMISSION_DENIED:\
 unauthorized to mutate the predicate: unauthorized to do Write on predicate name");
export const ALTER_PERMISSION_DENIED = new Error("7 PERMISSION_DENIED:\
 unauthorized to alter the predicate: unauthorized to do Modify on predicate name");
