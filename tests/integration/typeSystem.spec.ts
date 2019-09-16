import * as dgraph from "../../src";

import { setSchema, setup } from "../helper";

type Person = {
    name: string;
    age: number;
};

async function performMutation(client: dgraph.DgraphClient) {
    const mu = new dgraph.Mutation();
    mu.setSetNquads(`
        _:prashant <name> "Prashant" .
        _:prashant <age> "23" .
        _:prashant <dgraph.type> "Person" .
    `);
    mu.setCommitNow(true);
    const resp = await client.newTxn().mutate(mu);
    expect(resp.getUidsMap().get("prashant")).not.toBeUndefined();
}

async function performDeletion(client: dgraph.DgraphClient) {
    const req = new dgraph.Request();
    let q = `query {
        me as var(func: eq(name, "Prashant"))
    }`;
    req.setQuery(q);

    const mu = new dgraph.Mutation();
    mu.setDelNquads(`uid(me) * * .`);
    req.setMutationsList([mu]);
    req.setCommitNow(true);

    const resp = await client.newTxn().doRequest(req);
    const uid = resp.getUidsMap().get("uid(me)");
    // tslint:disable-next-line no-unsafe-any
    expect(uid).toBeUndefined();

    q = `{
        me(func: eq(name, "Prashant")) {
            name
        }
    }`;
    const res = await client.newTxn().query(q);
    const data: {
        me: Person[];
    } = res.getJson(); // tslint:disable-line no-unsafe-any
    expect(data.me.length).toEqual(0);
}

async function expandQuery(client: dgraph.DgraphClient) {
    const q = `{
        all(func: type(Person)) {
            expand(_all_)
        }
    }`;
    const resp = await client.newTxn().query(q);
    const data: {
        all: Person[];
    } = resp.getJson(); // tslint:disable-line no-unsafe-any
    expect(data.all.length).toEqual(1);
}

describe("Type system/directive", () => {
    it("should expand using type system", async () => {
        const client = await setup();
        await setSchema(client, `
            name:  string   @index(term) .
            age:    int      @index(int)  .

            type Person {
                name: string
                age: int
            }
        `);

        await performMutation(client);
        await expandQuery(client);
    });

    it("should perform s * * delete", async () => {
        const client = await setup();
        await setSchema(client, `
            name:  string   @index(term) .
            age:    int      @index(int)  .

            type Person {
                name: string
                age: int
            }
        `);

        await performMutation(client);
        await performDeletion(client);
    });
});
