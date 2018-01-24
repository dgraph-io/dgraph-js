import * as dgraph from "../src";

import { setup } from "./helper";

async function checkVersion(stub: dgraph.DgraphClientStub): Promise<void> {
    const v = await stub.checkVersion(new dgraph.Check());
    const tag = v.getTag();
    expect(typeof tag).toEqual("string");
    expect(tag).toBeDefined();
}

describe("clientStub", () => {
    describe("constructor", () => {
        it("should accept undefined and null arguments", async () => {
            await checkVersion(new dgraph.DgraphClientStub());
            await checkVersion(new dgraph.DgraphClientStub(null, null));
        });
    });

    describe("checkVersion", () => {
        it("should check version", async () => {
            const client = await setup();
            await checkVersion(client.anyClient());
        });
    });

    describe("close", () => {
        it("should close channel", async () => {
            const client = await setup();
            const clientStub = await client.anyClient();
            clientStub.close();
            const p = clientStub.checkVersion(new dgraph.Check());
            await expect(p).rejects.toBeDefined();
        });
    });
});
