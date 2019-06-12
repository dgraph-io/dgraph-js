import * as grpc from "grpc";

import * as dgraph from "../src";

export function createLinRead(...ids: [number, number][]): dgraph.LinRead {
    const lr = new dgraph.LinRead();
    const idsMap = lr.getIdsMap();
    for (const [k, v] of ids) {
        idsMap.set(k, v);
    }

    return lr;
}

export function areLinReadsEqual(a: dgraph.LinRead, b: dgraph.LinRead): boolean {
    const aIdsMap = a.getIdsMap();
    const bIdsMap = b.getIdsMap();

    if (aIdsMap.getLength() !== bIdsMap.getLength()) {
        return false;
    }

    let ans = true;
    aIdsMap.forEach((value: number, key: number): void => {
        const bValue = bIdsMap.get(key);
        if (bValue !== value) {
            ans = false;
        }
    });

    return ans;
}

export const SERVER_ADDR = "localhost:9080";
export const SERVER_CREDENTIALS = grpc.credentials.createInsecure();

export function createClient(): dgraph.DgraphClient {
    return new dgraph.DgraphClient(new dgraph.DgraphClientStub(SERVER_ADDR, SERVER_CREDENTIALS));
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
