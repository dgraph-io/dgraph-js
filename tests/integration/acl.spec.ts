import { exec } from "child_process";
import { promisify } from "util";

import * as dgraph from "../../src";
import { createClient, createClientStub, SERVER_ADDR, setSchema, setup, wait } from "../helper";

const JEST_TIMEOUT = 60 * 1000;         // 1 minute in milliseconds
const WAIT_FOR_SIX_SECONDS = 6 * 1000;  // 6 seconds in milliseconds

// tslint:disable-next-line no-string-based-set-timeout
jest.setTimeout(JEST_TIMEOUT);

let client: dgraph.DgraphClient;
let aclClient: dgraph.DgraphClient;

const GROOT_PWD = "password";
const USERID = "alice";
const USERPWD = "alicepassword";
const PRED = "name";
const DEV_GROUP = "dev";

// tslint:disable-next-line mocha-no-side-effect-code
const execute = promisify(exec);

// tslint:disable-next-line mocha-no-side-effect-code
const QUERY_PERMISSION_DENIED = new Error("7 PERMISSION_DENIED:\
 unauthorized to query the predicate: unauthorized to do Read on predicate name");
 // tslint:disable-next-line mocha-no-side-effect-code
const MUTATE_PERMISSION_DENIED = new Error("7 PERMISSION_DENIED:\
 unauthorized to mutate the predicate: unauthorized to do Write on predicate name");
 // tslint:disable-next-line mocha-no-side-effect-code
const ALTER_PERMISSION_DENIED = new Error("7 PERMISSION_DENIED:\
 unauthorized to alter the predicate: unauthorized to do Modify on predicate name");

async function cmd(command: string) {
    try {
        await execute(command);
    } catch (err) {
        fail(`Failed to execute command:\n\t${command}\nError: ${err}`);
    }
}

async function insertSampleData() {
    const txn = client.newTxn();
    try {
        const mu = new dgraph.Mutation();
        mu.setSetNquads(`
            _:prashant <${PRED}> "Prashant" .
        `);
        mu.setCommitNow(true);
        const res = await txn.mutate(mu);
        const uid = res.getUidsMap().get("prashant");
        expect(uid).toBeDefined();
    } finally {
        await txn.discard();
    }
}

async function loginUser(): Promise<dgraph.DgraphClient> {
    const aclClientStub = createClientStub();
    try {
        await aclClientStub.login(USERID, USERPWD);
    } catch (e) {
        fail(`Login error: \tUSERID - ${USERID} \tUSERPWD - ${USERPWD}\n${e}`);
    }
    return createClient(aclClientStub);
}

async function aclSetup() {
    client = await setup();
    await setSchema(client, `
        ${PRED}: string .
    `);
    await insertSampleData();
    await addUser();
    await addGroup();
    await addUserToGroup();
    aclClient = await loginUser();
}

async function addUser() {
    const command = `dgraph acl -a ${SERVER_ADDR} add -u ${USERID} -p ${USERPWD} -x ${GROOT_PWD}`;
    await cmd(command);
}

async function addGroup() {
    const command = `dgraph acl -a ${SERVER_ADDR} add -g ${DEV_GROUP} -x ${GROOT_PWD}`;
    await cmd(command);
}

async function addUserToGroup() {
    const command = `dgraph acl -a ${SERVER_ADDR} mod -u ${USERID} -l ${DEV_GROUP} -x ${GROOT_PWD}`;
    await cmd(command);
}

async function changePermission(permission: number) {
    const command = `dgraph acl -a ${SERVER_ADDR} mod -g ${DEV_GROUP} -p ${PRED} -m ${permission} -x ${GROOT_PWD}`;
    await cmd(command);
    await wait(WAIT_FOR_SIX_SECONDS);
}

async function tryReading(): Promise<Boolean> {
    let success: Boolean;
    const txn = aclClient.newTxn();
    const query = `{
        me(func: has(${PRED})) {
            uid
            ${PRED}
        }
    }`;
    try {
        const res: dgraph.Response = await txn.query(query);
        expect(res.getJson().me).not.toHaveLength(0);
        success = true;
    } catch (e) {
        expect(e).toEqual(QUERY_PERMISSION_DENIED);
        success = false;
    }
    return success;
}

async function tryWriting(): Promise<Boolean> {
    let success: Boolean;
    const txn = aclClient.newTxn();
    try {
        const mu = new dgraph.Mutation();
        mu.setSetNquads(`
            _:ashish <${PRED}> "Ashish" .
        `);
        mu.setCommitNow(true);
        const res = await txn.mutate(mu);
        const uid = res.getUidsMap().get("ashish");
        expect(uid).toBeDefined();
        success = true;
    } catch (e) {
        expect(e).toEqual(MUTATE_PERMISSION_DENIED);
        success = false;
    }
    return success;
}

async function tryAltering(): Promise<Boolean> {
    let success: Boolean;
    try {
        const operation = new dgraph.Operation();
        operation.setSchema(`
            ${PRED}: string @index(exact, term) .
        `);
        await aclClient.alter(operation);
        success = true;
    } catch (e) {
        expect(e).toEqual(ALTER_PERMISSION_DENIED);
        success = false;
    }
    return success;
}

describe("ACL tests", () => {
    it("only has read access", async () => {
        await aclSetup();
        await changePermission(4);
        await expect(tryReading()).resolves.toBe(true);
        await expect(tryWriting()).resolves.toBe(false);
        await expect(tryAltering()).resolves.toBe(false);
    });

    it("only has write access", async () => {
        await aclSetup();
        await changePermission(2);
        await expect(tryReading()).resolves.toBe(false);
        await expect(tryWriting()).resolves.toBe(true);
        await expect(tryAltering()).resolves.toBe(false);
    });

    it("only has modify access", async () => {
        await aclSetup();
        await changePermission(1);
        await expect(tryReading()).resolves.toBe(false);
        await expect(tryWriting()).resolves.toBe(false);
        await expect(tryAltering()).resolves.toBe(true);
    });

    afterEach(async () => {
        await changePermission(0);
    });
});
