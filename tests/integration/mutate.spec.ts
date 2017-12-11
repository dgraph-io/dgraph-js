import * as dgraph from "../../src";

import { setSchema, setup, u8ToStr } from "../helper";

const data = ["200", "300", "400"];

describe("mutate", () => {
    it("should insert 3Quads", async () => {
        const client = await setup();
        await setSchema(client, "name: string @index(fulltext) .");

        const uids: string[] = [];
        let txn = client.newTxn();
        try {
            for (const datum of data) {
                const nquad = new dgraph.NQuad();
                nquad.setSubject(`_:${datum}`);
                nquad.setPredicate("name");

                const ov = new dgraph.Value();
                ov.setStrVal(`ok ${datum}`);
                nquad.setObjectValue(ov);

                const mu = new dgraph.Mutation();
                mu.addSet(nquad);

                const ag = await txn.mutate(mu);
                uids.push(ag.getUidsMap().get(datum));
            }

            await txn.commit();
        } finally {
            await txn.discard();
        }

        txn = client.newTxn();
        const query = `{ me(func: uid(${uids.join(",")})) { name }}`;
        const res = await txn.query(query);
        await txn.commit();

        expect(u8ToStr(res.getJson_asU8())).toEqual('{"me":[{"name":"ok 200"},{"name":"ok 300"},{"name":"ok 400"}]}');
    });
});
