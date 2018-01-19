const grpc = require("grpc");
const dgraph = require("dgraph-js");

function newClient() {
    const clientStub = new dgraph.DgraphClientStub("localhost:9080", grpc.credentials.createInsecure());
    return new dgraph.DgraphClient(clientStub);
}

// Drop All - discard all data and start from a clean slate.
function dropAll(dgraphClient) {
    const op = new dgraph.Operation();
    op.setDropAll(true);
    return dgraphClient.alter(op);
}

// Set schema.
function setSchema(dgraphClient) {
    const schema = `
        name: string @index(exact) .
        age: int .
        married: bool .
        loc: geo .
        dob: datetime .
    `;
    const op = new dgraph.Operation();
    op.setSchema(schema);
    return dgraphClient.alter(op);
}

// Create data using JSON.
function createData(dgraphClient) {
    // Create a new transaction.
    const txn = dgraphClient.newTxn();

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

    let err;

    // Run mutation.
    const mu = new dgraph.Mutation();
    mu.setSetJson(serialized);
    return txn.mutate(mu).then((assigned) => {
        // Commit transaction.
        txn.commit();
        console.log("Mutation is successful and here are the generated UIDs......");
        assigned.getUidsMap().forEach((value, key) => console.log("UID for key: " + key + ", value: " + value));
        return;
    }).catch((e) => {
        err = e;
    }).then(() => {
        return txn.discard();
    }).then(() => {
        if (err != null) {
            throw err;
        }
    });
}

// Query for data.
function queryData(dgraphClient) {
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

    return dgraphClient.newTxn().queryWithVars(query, vars).then((res) => {
        // Deserialize result.
        const jsonStr = new Buffer(res.getJson_asU8()).toString();
        // OR if you want to use base64
        // const jsonStr = new Buffer(res.getJson_asB64(), "base64").toString();

        const ppl = JSON.parse(jsonStr);

        // Print results.
        console.log(`people found: ${ppl.all.length}`);
        for (let i = 0; i < ppl.all.length; i += 1) {
            console.log(ppl.all[i]);
        }
    });
}

function main() {
    const dgraphClient = newClient();
    return dropAll(dgraphClient).then(() => {
        return setSchema(dgraphClient);
    }).then(() => {
        return createData(dgraphClient);
    }).then(() => {
        return queryData(dgraphClient);
    });
}

main().then(() => {
    console.log("\nDONE!");
}).catch((e) => {
    console.log("ERROR: ", e);
});
