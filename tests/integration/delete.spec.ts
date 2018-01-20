import * as dgraph from "../../src";

import { setSchema, setup } from "../helper";

describe("delete", () => {
    it("should delete node", async () => {
        const client = await setup();

        let mu = new dgraph.Mutation();
        mu.setSetNquads('_:alice <name> "Alice" .');
        mu.setCommitNow(true);
        const ag = await client.newTxn().mutate(mu);
        const uid = ag.getUidsMap().get("alice");

        const q = `{
            find_bob(func: uid(${uid})) {
                name
            }
        }`;
        let res = await client.newTxn().query(q);
        // tslint:disable-next-line no-unsafe-any
        expect(res.getJson().find_bob[0].name).toEqual("Alice");

        mu = new dgraph.Mutation();
        mu.setDelNquads(`<${uid}> * * .`);
        mu.setCommitNow(true);
        await client.newTxn().mutate(mu);

        res = await client.newTxn().query(q);
        // tslint:disable-next-line no-unsafe-any
        expect(res.getJson().find_bob).toHaveLength(0);
    });

    it("should delete edges", async () => {
        const client = await setup();
        await setSchema(client, "age: int .\nmarried: bool .");

        let mu = new dgraph.Mutation();
        mu.setSetJson({
            name: "Alice",
            age: 26,
            loc: "Riley Street",
            married: true,
            schools: [
                {
                    name: "Crown Public School",
                },
            ],
            friends: [
                {
                    name: "Bob",
                    age: 24,
                },
                {
                    name: "Charlie",
                    age: 29,
                },
            ],
        });
        mu.setCommitNow(true);
        const ag = await client.newTxn().mutate(mu);
        const uid = ag.getUidsMap().get("blank-0");

        const q = `{
            me(func: uid(${uid})) {
                uid
                name
                age
                loc
                married
                friends {
                    uid
                    name
                    age
                }
                schools {
                    uid
                    name@en
                }
            }
        }`;
        let res = await client.newTxn().query(q);
        // tslint:disable-next-line no-unsafe-any
        expect(res.getJson().me[0].friends.length).toBe(2);

        mu = new dgraph.Mutation();
        dgraph.deleteEdges(mu, uid, "friends");
        mu.setCommitNow(true);
        await client.newTxn().mutate(mu);

        res = await client.newTxn().query(q);
        // tslint:disable-next-line no-unsafe-any
        expect(res.getJson().me[0].friends).toBeFalsy();
    });
});
