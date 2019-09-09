import * as dgraph from "../../src";

import { setSchema, setup } from "../helper";

const data = ["200", "300", "400"];

describe("doRequest", () => {
    it("should insert 3Quads", async () => {
        const client = await setup();
        await setSchema(client, "name: string @index(fulltext) .");

        const uids: string[] = [];
        let res: dgraph.Response;
        let req: dgraph.Request;
        for (const datum of data) {
            const nquad = new dgraph.NQuad();
            nquad.setSubject(`_:${datum}`);
            nquad.setPredicate("name");

            const ov = new dgraph.Value();
            ov.setStrVal(`ok ${datum}`);
            nquad.setObjectValue(ov);

            const mu = new dgraph.Mutation();
            mu.addSet(nquad);

            req = new dgraph.Request();
            req.setMutationsList([mu]);
            req.setCommitNow(true);

            res = await client.newTxn().doRequest(req);
            uids.push(res.getUidsMap().get(datum));
        }
        const query = `{ me(func: uid(${uids.join(",")})) { name }}`;
        req = new dgraph.Request();
        req.setQuery(query);
        res = await client.newTxn().doRequest(req);

        expect(res.getJson()).toEqual({ me: [{ name: "ok 200" }, { name: "ok 300" }, { name: "ok 400" }] });
    });
});
