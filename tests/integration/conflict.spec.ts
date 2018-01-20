import * as dgraph from "../../src";
import { strToU8 } from "../../src/util";

import { setup } from "../helper";

describe("conflict", () => {
    it("should abort on commit conflict", async () => {
        const client = await setup();

        const txn1 = client.newTxn();

        let mu = new dgraph.Mutation();
        mu.setSetNquads(strToU8('_:alice <name> "Alice" .'));
        const ag = await txn1.mutate(mu);
        const uid = ag.getUidsMap().get("alice");

        const txn2 = client.newTxn();
        mu = new dgraph.Mutation();
        mu.setSetNquads(strToU8(`<${uid}> <name> "Alice" .`));
        await txn2.mutate(mu);

        const p1 = txn1.commit();
        await expect(p1).resolves.toBeUndefined();

        const p2 = txn2.commit();
        await expect(p2).rejects.toBe(dgraph.ERR_ABORTED);
    });
});
