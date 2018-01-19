const dgraph = require("dgraph-js");
const grpc = require("grpc");

// Create a client.
function newClient() {
    const clientStub = new dgraph.DgraphClientStub("localhost:9080", grpc.credentials.createInsecure());
    return new dgraph.DgraphClient(clientStub);
}

// Drop All - discard all data and start from a clean slate.
async function dropAll(dgraphClient) {
    const op = new dgraph.Operation();
    op.setDropAll(true);
    await dgraphClient.alter(op);
}

// Set schema.
async function setSchema(dgraphClient) {
    const schema = `
        name: string @index(exact) .
        age: int .
        married: bool .
        loc: geo .
        dob: datetime .
    `;
    const op = new dgraph.Operation();
    op.setSchema(schema);
    await dgraphClient.alter(op);
}

// Create data using JSON.
async function createData(dgraphClient) {
    // Create a new transaction.
    const txn = dgraphClient.newTxn();
    try {
        // Create data.
        const p = {
            name: "Alice",
            age: 26,
            married: true,
            loc: {
                type: "Point",
                coordinates: [1.1, 2],
            },
            dob: new Date(1980, 1, 1, 23, 0, 0, 0),
            friend: [
                {
                    name: "Bob",
                    age: 24,
                },
                {
                    name: "Charlie",
                    age: 29,
                }
            ],
            school: [
                {
                    name: "Crown Public School",
                }
            ]
        };

        // Serialize it.
        const json = JSON.stringify(p);

        const serialized = new Uint8Array(new Buffer(json));
        // OR if you want to use base64
        // const serialized = new Buffer(json).toString("base64");

        // Run mutation.
        const mu = new dgraph.Mutation();
        mu.setSetJson(serialized);
        let assigned = await txn.mutate(mu);
        console.log("Mutation is successful and here are the generated UIDs......");
        assigned.getUidsMap().forEach((value, key) => console.log("UID for key: " + key + ", value: " + value));
        // Commit transaction.
        await txn.commit();
    } finally {
        // Clean up. Calling this after txn.commit() is a no-op
        // and hence safe.
        await txn.discard();
    }
}

// Query for data.
async function queryData(dgraphClient) {
    // Run query.
    const query = `query all($a: string) {
        all(func: eq(name, $a)) {
            name
            age
            married
            loc
            dob
            friend {
                name
                age
            }
            school {
                name
            }
        }
    }`;
    const vars = { $a: "Alice" };
    const res = await dgraphClient.newTxn().queryWithVars(query, vars);

    // Deserialize result.
    const jsonStr = new Buffer(res.getJson_asU8()).toString();
    // OR if you want to use base64
    // const jsonStr = new Buffer(res.getJson_asB64(), "base64").toString();

    const ppl = JSON.parse(jsonStr);

    // Print results.
    console.log(`people found: ${ppl.all.length}`);
    ppl.all.forEach((person) => console.log(person));
}

async function main() {
    const dgraphClient = newClient();
    await dropAll(dgraphClient);
    await setSchema(dgraphClient);
    await createData(dgraphClient);
    await queryData(dgraphClient);
}

main().then(() => {
    console.log("\nDONE!");
}).catch((e) => {
    console.log("ERROR: ", e);
});
