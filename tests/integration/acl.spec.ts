import { exec } from "child_process";
import * as util from "util";

import * as dgraph from "../../src";
import { createClient, createClientStub, setSchema, setup, wait } from "../helper";

const FIVE_MINUTES_IN_SECONDS = 5 * 60 * 1000; // 5 minutes in milliseconds

// tslint:disable-next-line no-string-based-set-timeout
jest.setTimeout(FIVE_MINUTES_IN_SECONDS * 2);

let client: dgraph.DgraphClient;
let aclClient: dgraph.DgraphClient;

const GROOT_PWD = "password";
const USERID = "alice";
const USERPWD = "alicepassword";
const PRED = "name";
const DEV_GROUP = "dev";
const DGRAPH_ADDR = "localhost:9080";

// tslint:disable-next-line mocha-no-side-effect-code
const execute = util.promisify(exec);

function getTime(): string {
    const today = new Date();
    return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
}

async function cmd(command: string) {
    try {
        // await execute(command);
        // For Debugging: comment the previous statement and uncomment following 3 statements.
        const { stderr, stdout } = await execute(command);
        // tslint:disable-next-line no-console
        console.log(`time: ${getTime()}\ncommand: ${command}\nstderr: ${stderr}\nstdout: ${stdout}`);
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
    // tslint:disable-next-line no-console
    console.log("Going to sleep");
    await wait(8000);
    // tslint:disable-next-line no-console
    console.log("Sleep over");
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
    const command = `dgraph acl -a ${DGRAPH_ADDR} add -u ${USERID} -p ${USERPWD} -x ${GROOT_PWD}`;
    await cmd(command);
}

async function addGroup() {
    const command = `dgraph acl -a ${DGRAPH_ADDR} add -g ${DEV_GROUP} -x ${GROOT_PWD}`;
    await cmd(command);
}

async function addUserToGroup() {
    const command = `dgraph acl -a ${DGRAPH_ADDR} mod -u ${USERID} -l ${DEV_GROUP} -x ${GROOT_PWD}`;
    await cmd(command);
}

async function changePermission(permission: number) {
    const command = `dgraph acl -a ${DGRAPH_ADDR} mod -g ${DEV_GROUP} -p ${PRED} -m ${permission} -x ${GROOT_PWD}`;
    await cmd(command);
    // tslint:disable-next-line no-console
    console.log("Going to sleep");
    await wait(8000);
    // tslint:disable-next-line no-console
    console.log("Sleep over");
}

async function tryReading(expected: boolean) {
    const txn = aclClient.newTxn();
    const query = `{
        me(func: has(${PRED})) {
            uid
            ${PRED}
        }
    }`;
    try {
        const res: dgraph.Response = await txn.query(query);
        // tslint:disable-next-line no-console
        console.log(`res: ${JSON.stringify(res.getJson())}`);
        if (!expected) {
            fail("ACL test failed: Read successful without permission");
        }
    } catch (e) {
        if (expected) {
            fail(`ACL test failed: Read failed for readable predicate.\n${e}`);
        }
    }
}

async function tryWriting(expected: boolean) {
    const txn = aclClient.newTxn();
    try {
        const mu = new dgraph.Mutation();
        mu.setSetNquads(`
            _:ashish <${PRED}> "Ashish" .
        `);
        mu.setCommitNow(true);
        const res = await txn.mutate(mu);
        const uid = res.getUidsMap().get("ashish");
        // tslint:disable-next-line no-console
        console.log(`uid: ${uid}`);
        if (!expected) {
            fail("ACL test failed: Write successful without permission");
        }
        expect(uid).toBeDefined();
    } catch (e) {
        if (expected) {
            fail(`ACL test failed: Write failed for writable predicate.\n${e}`);
        }
    }
}

async function tryAltering(expected: boolean) {
    try {
        const operation = new dgraph.Operation();
        operation.setSchema(`
            ${PRED}: string @index(exact, term) .
        `);
        await aclClient.alter(operation);
        if (!expected) {
            fail("ACL test failed: Alter successful without permission");
        }
    } catch (e) {
        if (expected) {
            fail(`ACL test failed: Alter failed for alterable predicate.\n${e}`);
        }
    }
}

describe("ACL tests", () => {
    it("should only have read access", async () => {
        await aclSetup();
        await changePermission(4);
        await tryReading(true);
        await tryWriting(false);
        await tryAltering(false);
        await changePermission(0);
    });

    it("should only have write access", async () => {
        await aclSetup();
        await changePermission(2);
        await tryReading(false);
        await tryWriting(true);
        await tryAltering(false);
        await changePermission(0);
    });

    it("should only have modify access", async () => {
        await aclSetup();
        await changePermission(1);
        await tryReading(false);
        await tryWriting(false);
        await tryAltering(true);
        await changePermission(0);
    });
});
