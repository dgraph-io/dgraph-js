import * as dgraph from "../../src";

import { setSchema, setup } from "../helper";

const concurrency = 3;
const timeout = 5 * 60 * 1000; // 5 minutes in milliseconds

// tslint:disable-next-line no-string-based-set-timeout
jest.setTimeout(timeout * 2);

let client: dgraph.DgraphClient;

const firsts = ["Paul", "Eric", "Jack", "John", "Martin"];
const lasts = ["Brown", "Smith", "Robinson", "Waters", "Taylor"];
const ages = [20, 25, 30, 35];

type Account = {
    first: string;
    last: string;
    age: number;
};
const accounts: Account[] = [];

firsts.forEach((first: string): void => lasts.forEach((last: string): void => ages.forEach((age: number): void => {
    accounts.push({
        first,
        last,
        age,
    });
})));

async function tryUpsert(query: string, mutation: dgraph.Mutation, blankNodeLabel: string): Promise<void> {
    const txn = client.newTxn();

    const req = new dgraph.Request();
    req.setQuery(query);
    req.setMutationsList([mutation]);
    req.setCommitNow(true);

    let uid: string;
    try {
        // Update account only if matching uid found.
        const response = await txn.doRequest(req);
        uid = response.getUidsMap().get(blankNodeLabel);
        expect(uid).not.toEqual("");
    } finally {
        await txn.discard();
    }
}

let startStatus = 0; // set at the start of doUpserts
let lastStatus = 0;
let cancelled = false; // cancelled due to timeout

let successCount = 0;
let retryCount = 0;

function conditionalLog(): void {
    const now = new Date().getTime();
    if (now - lastStatus > 1000 && !cancelled) {
        // tslint:disable-next-line no-console
        console.log(`Success: ${successCount}, Retries: ${retryCount}, Total Time: ${now - startStatus} ms`);
        lastStatus = now;
    }
}

async function upsert(account: Account): Promise<void> {
    let done = false;
    const query = `query {
        account as var(func: eq(first, "${account.first}")) @filter(eq(last, "${account.last}") AND eq(age, "${account.age}"))
    }`;
    const mu = new dgraph.Mutation();
    mu.setSetNquads(`
        uid(account) <first> "${account.first}" .
        uid(account) <last>  "${account.last}" .
        uid(account) <age>   "${account.age}"^^<xs:int> .
    `);
    const blankNodeLabel = `uid(account)`;
    while (!done && !cancelled) {
        try {
            await tryUpsert(query, mu, blankNodeLabel);
            successCount += 1;
            done = true;
        } catch (e) {
            expect(e).toBe(dgraph.ERR_ABORTED);
            retryCount += 1;
        }

        conditionalLog();
    }

    if (!done) {
        throw new Error(`Timeout elapsed: ${timeout / 1000}s`);
    }
}

async function doUpserts(): Promise<void> {
    const promises: Promise<void>[] = [];
    for (const account of accounts) {
        for (let i = 0; i < concurrency; i += 1) {
            promises.push(upsert(account));
        }
    }

    startStatus = new Date().getTime();
    const id = setTimeout(
        () => {
            cancelled = true;
        },
        timeout,
    );

    await Promise.all(promises).then(() => {
        clearTimeout(id);
    });
}

async function checkIntegrity(): Promise<void> {
    const res = await client.newTxn().query(`{
        all(func: anyofterms(first, "${firsts.join(" ")}")) {
            first
            last
            age
        }
    }`);

    const data: {
        all: Account[];
    } = res.getJson(); // tslint:disable-line no-unsafe-any

    const accountSet: { [key: string]: boolean } = {};
    for (const account of data.all) {
        expect(account.first).toBeTruthy();
        expect(account.last).toBeTruthy();
        expect(account.age).toBeTruthy();
        accountSet[`${account.first}_${account.last}_${account.age}`] = true;    }

    for (const account of accounts) {
        expect(accountSet[`${account.first}_${account.last}_${account.age}`]).toBe(true);
    }
}

type Profile = {
    name: string;
    email: string;
    age: number;
};
const profiles: Profile[] = [
    { name: "Alice", email: "alice@dgraph.io", age: 25 },
    { name: "Bob", email: "bob@dgraph.io", age: 28 },
    { name: "Prashant", email: "prashant@dgraph.io", age: 23 },
];
const names: string[] = [];
profiles.forEach((profile: Profile): void => {
    names.push(profile.name);
});

async function doUpsert(): Promise<void> {
    await performMutation(profiles[0]);
    await performMutation(profiles[1]);
    await performMutation(profiles[2]);
    await checkMutationIntegrity();
    const updatedProfile: Profile = {
        name: "Prashant Shahi",
        email: "prashant@dgraph.io",
        age: 24,
    };
    await performUpsert(updatedProfile);
    await checkUpsertIntegrity();
}

async function performMutation(profile: Profile): Promise<void> {
    const txn = client.newTxn();
    const mu = new dgraph.Mutation();
    const blankNodeLabel = `_:${profile.name.toLocaleLowerCase()}`;

    mu.setSetNquads(`
        ${blankNodeLabel} <name> "${profile.name}" .
        ${blankNodeLabel} <email>  "${profile.email}" .
        ${blankNodeLabel} <age>   "${profile.age}"^^<xs:int> .
    `);

    const ag = await txn.mutate(mu);
    await txn.commit();
    const uid = ag.getUidsMap().get(blankNodeLabel);
    expect(uid).not.toEqual("");
}

async function performUpsert(profile: Profile): Promise<void> {
    const query = `query {
        profile as var(func: eq(email, "${profile.email}"))
    }`;
    const mu = new dgraph.Mutation();
    mu.setSetNquads(`
        uid(profile) <name> "${profile.name}" .
        uid(profile) <email>  "${profile.email}" .
        uid(profile) <age>   "${profile.age}"^^<xs:int> .
    `);
    const blankNodeLabel = `uid(profile)`;

    await tryUpsert(query, mu, blankNodeLabel);
}

async function checkMutationIntegrity(): Promise<void> {
    const query = `{
        all(func: anyofterms(name, "${names.join(" ")}")) {
            uid
            name
            email
            age
        }
    }`;
    const res = await client.newTxn().query(query);

    const data: {
        all: Profile[];
    } = res.getJson(); // tslint:disable-line no-unsafe-any

    const profileSet: { [key: string]: boolean } = {};
    for (const profile of data.all) {
        expect(profile.name).toBeTruthy();
        expect(profile.email).toBeTruthy();
        expect(profile.age).toBeTruthy();
        profileSet[`${profile.name}_${profile.email}_${profile.age}`] = true;
    }

    for (const profile of profiles) {
        expect(profileSet[`${profile.name}_${profile.email}_${profile.age}`]).toBe(true);
    }
}

async function checkUpsertIntegrity(): Promise<void> {
    const query = `{
        all(func: eq(email, "prashant@dgraph.io")) {
            name
            email
            age
        }
    }`;
    const res = await client.newTxn().query(query);

    const data: {
        all: Profile[];
    } = res.getJson(); // tslint:disable-line no-unsafe-any

    const profileSet: { [key: string]: boolean } = {};
    for (const profile of data.all) {
        expect(profile.name).toBeTruthy();
        expect(profile.email).toBeTruthy();
        expect(profile.age).toBeTruthy();
        profileSet[`${profile.name}_${profile.email}_${profile.age}`] = true;
    }

    const receivedObject: Profile = data.all[0];
    const expectedObject: Profile = {
        name: "Prashant Shahi",
        email: "prashant@dgraph.io",
        age: 24,
    };

    expect(Object.keys(profileSet).length).toEqual(1);
    expect(receivedObject).toEqual(expectedObject);
}

describe("upsert using doRequest", () => {
    it("should successfully perform upsert load test", async () => {
        client = await setup();
        await setSchema(client, `
            first:  string   @index(term) .
            last:   string   @index(hash) .
            age:    int      @index(int)  .
            when:   int                   .
        `);
        await doUpserts();
        await checkIntegrity();
    });

    it("should successfully perform upsert", async () => {
        client = await setup();
        await setSchema(client, `
            name:   string   @index(term) .
            email:  string   @index(exact) .
            age:    int   @index(int) .
        `);
        await doUpsert();
    });
});
