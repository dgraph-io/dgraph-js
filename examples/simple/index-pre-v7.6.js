const dgraph = require("dgraph-js");
const grpc = require("grpc");

// Create a client stub.
function newClientStub() {
    return new dgraph.DgraphClientStub("localhost:9080", grpc.credentials.createInsecure());
}

// Create a client.
function newClient(clientStub) {
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
        uid: "_:alice",
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

    let response;
    let err;

    // Run mutation.
    const mu = new dgraph.Mutation();
    mu.setSetJson(p);
    return txn.mutate(mu).then((res) => {
        response = res;

        // Commit transaction.
        return txn.commit();
    }).then(() => {
        // Get uid of the outermost object (person named "Alice").
        // Response#getUidsMap() returns a map from blank node names to uids.
        // For a json mutation, blank node label is used for the name of the created nodes.
        console.log(`Created person named "Alice" with uid = ${response.getUidsMap().get("alice")}\n`);

        console.log("All created nodes (map from blank node names to uids):");
        response.getUidsMap().forEach((uid, key) => console.log(`${key}: ${uid}`));
        console.log();
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
            uid
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
        const ppl = res.getJson();

        // Print results.
        console.log(`Number of people named "Alice": ${ppl.all.length}`);
        for (let i = 0; i < ppl.all.length; i += 1) {
            console.log(ppl.all[i]);
        }
    });
}

function main() {
    const dgraphClientStub = newClientStub();
    const dgraphClient = newClient(dgraphClientStub);
    return dropAll(dgraphClient).then(() => {
        return setSchema(dgraphClient);
    }).then(() => {
        return createData(dgraphClient);
    }).then(() => {
        return queryData(dgraphClient);
    }).then(() => {
        // Close the client stub.
        dgraphClientStub.close();
    });
}

main().then(() => {
    console.log("\nDONE!");
}).catch((e) => {
    console.log("ERROR: ", e);
});
