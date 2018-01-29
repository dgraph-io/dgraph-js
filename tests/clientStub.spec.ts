import * as grpc from "grpc";

import * as dgraph from "../src";

import { SERVER_ADDR, SERVER_CREDENTIALS, setup } from "./helper";

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

    describe("checkVersion with call options", () => {
        it("should check version with call options", async () => {
            const clientStub = new dgraph.DgraphClientStub(SERVER_ADDR, SERVER_CREDENTIALS);
            const p = clientStub.checkVersion(new dgraph.Check(), {
                deadline: 0,
                propagate_flags: grpc.propagate.DEFAULTS,
                credentials: null,
            });

            await expect(p).rejects.toBeDefined();
        });
    });

    describe("waitForReady", () => {
        it("should provide a promisified version of grpc.Client#waitForReady", async () => {
            const clientStub = new dgraph.DgraphClientStub(SERVER_ADDR, SERVER_CREDENTIALS);
            await clientStub.waitForReady(Date.now() + 500);
            await checkVersion(clientStub);
        });
    });

    describe("close", () => {
        it("should close channel", async () => {
            const clientStub = new dgraph.DgraphClientStub(SERVER_ADDR, SERVER_CREDENTIALS);
            clientStub.close();
            const p = clientStub.checkVersion(new dgraph.Check());
            await expect(p).rejects.toBeDefined();
        });
    });
});
