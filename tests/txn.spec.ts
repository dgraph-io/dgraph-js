import * as dgraph from "../src";

import { setSchema, setup } from "./helper";

const timeout = 1 * 60 * 1000; // 1 minute in milliseconds

// tslint:disable-next-line no-string-based-set-timeout
jest.setTimeout(timeout * 2);

let client: dgraph.DgraphClient;

describe("txn", () => {
    describe("queryWithVars", () => {
        beforeAll(async () => {
            client = await setup();
            await setSchema(client, "name: string @index(exact) .");

            const mu = new dgraph.Mutation();
            mu.setCommitNow(true);
            mu.setSetNquads('_:alice <name> "Alice" .');
            await client.newTxn().mutate(mu);
        });

        it("should query with variables", async () => {
            let res = await client.newTxn().queryWithVars(
                "query me($a: string) { me(func: eq(name, $a)) { name }}",
                {
                    $a: "Alice",
                },
            );
            let resJson: {
                me: { name: string }[];
            } = res.getJson(); // tslint:disable-line no-unsafe-any
            expect(resJson.me).toHaveLength(1);
            expect(resJson.me[0].name).toEqual("Alice");

            res = await client.newTxn().queryWithVars(
                "query me($a: string) { me(func: eq(name, $a)) { name }}",
                {
                    $a: new String("Alice"), // tslint:disable-line no-construct
                    $b: true, // non-string properties are ignored
                },
            );
            resJson = res.getJson(); // tslint:disable-line no-unsafe-any
            expect(resJson.me).toHaveLength(1);
            expect(resJson.me[0].name).toEqual("Alice");
        });

        it("should ignore properties with non-string values", async () => {
            const res = await client.newTxn().queryWithVars(
                "query me($a: string) { me(func: eq(name, $a)) { name }}",
                {
                    $a: 1, // non-string properties are ignored
                },
            );
            const resJson: {
                me: { name: string }[];
            } = res.getJson(); // tslint:disable-line no-unsafe-any
            expect(resJson.me).toHaveLength(0);
        });

        it("should throw finished error if txn is already finished", async () => {
            const txn = client.newTxn();
            await txn.commit();

            const p = txn.query('{ me(func: eq(name, "Alice")) { name }}');
            await expect(p).rejects.toBe(dgraph.ERR_FINISHED);
        });
    });

    describe("mutate", () => {
        beforeAll(async () => {
            client = await setup();
            await setSchema(client, "name: string @index(exact) .");
        });

        it("should throw finished error if txn is already finished", async () => {
            const txn = client.newTxn();
            await txn.commit();

            const mu = new dgraph.Mutation();
            mu.setSetNquads('_:alice <name> "Alice" .');
            const p = txn.mutate(mu);
            await expect(p).rejects.toBe(dgraph.ERR_FINISHED);
        });

        it("should throw error and discard if Stub.mutate throws an error", async () => {
            const txn = client.newTxn();

            const mu = new dgraph.Mutation();
            // There is an error in the mutation NQuad.
            mu.setSetNquads('alice <name> "Alice" .');
            const p1 = txn.mutate(mu);
            await expect(p1).rejects.toBeDefined();

            const p2 = txn.commit();
            await expect(p2).rejects.toBe(dgraph.ERR_FINISHED);
        });
    });

    describe("commit", () => {
        beforeAll(async () => {
            client = await setup();
            await setSchema(client, "name: string @index(exact) .");
        });

        it("should throw finished error if txn is already finished", async () => {
            const txn = client.newTxn();
            await txn.commit();

            const p = txn.commit();
            await expect(p).rejects.toBe(dgraph.ERR_FINISHED);
        });

        it("should throw finished error after mutation with commitNow", async () => {
            const txn = client.newTxn();

            const mu = new dgraph.Mutation();
            mu.setSetNquads('_:alice <name> "Alice" .');
            mu.setCommitNow(true);
            await txn.mutate(mu);

            const p = txn.commit();
            await expect(p).rejects.toBe(dgraph.ERR_FINISHED);
        });
    });

    describe("discard", () => {
        beforeAll(async () => {
            client = await setup();
            await setSchema(client, "name: string @index(exact) .");
        });

        it("should resolve and do nothing if txn is already finished", async () => {
            const txn = client.newTxn();
            await txn.commit();

            const p = txn.discard();
            await expect(p).resolves.toBeUndefined();
        });

        it("should resolve and do nothing after mutation with commitNow", async () => {
            const txn = client.newTxn();

            const mu = new dgraph.Mutation();
            mu.setSetNquads('_:alice <name> "Alice" .');
            mu.setCommitNow(true);
            await txn.mutate(mu);

            const p = txn.discard();
            await expect(p).resolves.toBeUndefined();
        });
    });
});
