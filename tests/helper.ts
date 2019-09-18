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
