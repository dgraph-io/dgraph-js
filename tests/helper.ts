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
    const c = createClient();
    await dropAll(c);
    return c;
}

export function strToU8(str: string): Uint8Array {
    return new Uint8Array(Buffer.from(str, "utf8"));
}

export function u8ToStr(arr: Uint8Array): string {
    let buf = Buffer.from(arr.buffer).toString();
    if (arr.byteLength !== arr.buffer.byteLength) {
        // Respect the "view", i.e. byteOffset and byteLength, without doing a copy.
        buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
    }

    return buf.toString();
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
