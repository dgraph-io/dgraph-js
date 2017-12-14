# dgraph-js &middot; [![npm version](https://img.shields.io/npm/v/dgraph-js.svg?style=flat)](https://www.npmjs.com/package/dgraph-js) [![Build Status](https://img.shields.io/travis/dgraph-io/dgraph-js/master.svg?style=flat)](https://travis-ci.org/dgraph-io/dgraph-js) [![Coverage Status](https://img.shields.io/coveralls/github/dgraph-io/dgraph-js/master.svg?style=flat)](https://coveralls.io/github/dgraph-io/dgraph-js?branch=master)

Official Dgraph client implementation for javascript (Node.js v6 and above),
using [grpc].

[grpc]: https://grpc.io/

This client follows the [Dgraph Go client][goclient] closely.

[goclient]: https://github.com/dgraph-io/dgraph/tree/master/client

Before using this client, we highly recommend that you go through [docs.dgraph.io],
and understand how to run and work with Dgraph.

[docs.dgraph.io]:https://docs.dgraph.io

## Table of contents
- [Install](#install)
- [Quickstart](#quickstart)
- [Using the client](#using-the-client)
  * [Create the client](#create-the-client)
  * [Alter the database](#alter-the-database)
  * [Create a transaction](#create-a-transaction)
  * [Run a mutation](#run-a-mutation)
  * [Run a query](#run-a-query)
  * [Commit a transaction](#commit-a-transaction)
- [Development](#development)
  * [Building the source](#building-the-source)
  * [Running tests](#running-tests)

## Install
Install using npm:
```sh
npm install dgraph-js@0.9.4-beta.2 --save
```
or yarn:
```sh
yarn add dgraph-js@0.9.4-beta.2
```

## Quickstart
Build and run the [simple] project in the `examples` folder, which
contains an end-to-end example of using the Dgraph javascript client. Follow the
instructions in the README of that project.

[simple]: https://github.com/dgraph-io/dgraph-js/tree/master/examples/simple

## Using the client

### Create the client
A `DgraphClient` object can be initialised by passing it a list of
`DgraphClientStub` clients as variadic arguments. Connecting to multiple Dgraph
servers in the same cluster allows for better distribution of workload.

The following code snippet shows just one connection.

```js
const dgraph = require("dgraph-js");
const grpc = require("grpc");

const clientStub = new dgraph.DgraphClientStub(
  // addr: optional, default: "localhost:9080"
  "localhost:9080",
  // credentials: optional, default: grpc.credentials.createInsecure()
  grpc.credentials.createInsecure(),
);
const dgraphClient = new dgraph.DgraphClient(clientStub);
```

### Alter the database
To set the schema, create an `Operation` object, set the schema and pass it to
`DgraphClient#alter(Operation)` method.

```js
const schema = "name: string @index(exact) .";
const op = new dgraph.Operation();
op.setSchema(schema);
await dgraphClient.alter(op);
```

> NOTE: Many of the examples here use the `await` keyword which requires
> `async/await` support which is available on Node.js >= v7.6.0. For prior versions,
> the expressions following `await` can be used just like normal `Promise`
> instances.

`Operation` contains other fields as well, including drop predicate and drop all.
Drop all is useful if you wish to discard all the data, and start from a clean
slate, without bringing the instance down.

```js
// Drop all data including schema from the Dgraph instance. This is useful
// for small examples such as this, since it puts Dgraph into a clean
// state.
const op = new dgraph.Operation();
op.setDropAll(true);
await dgraphClient.alter(op);
```

### Create a transaction
To create a transaction, call `DgraphClient#newTxn()` method, which returns a
new `Txn` object. This operation incurs no network overhead.

It is good practise to call `Txn#discard()` in a `finally` block after running
the transaction. Calling `Txn#discard()` after `Txn#commit()` is a no-op
and you can call `Txn#discard()` multiple times with no additional side-effects.

```js
const txn = dgraphClient.newTxn();
try {
  // Do something here
  // ...
} finally {
  await txn.discard();
  // ...
}
```

### Run a mutation
`Txn#mutate(Mutation)` runs a mutation. It takes in a `Mutation` object, which
provides two main ways to set data: JSON and RDF N-Quad. You can choose whichever
way is convenient.

We're going to use JSON. We define a person object to represent a person, serialize
it as `Uint8Array` (or `base64`) and use it in `Mutation` object.

```js
// Create data.
const p = {
    name: "Alice",
};

// Serialize it.
const json = JSON.stringify(p);

const serialized = new Uint8Array(new Buffer(json));
// OR if you want to use base64
// const serialized = new Buffer(json).toString("base64");

// Run mutation.
const mu = new dgraph.Mutation();
mu.setSetJson(serialized);
await txn.mutate(mu);
```

Sometimes, you only want to commit a mutation, without querying anything further.
In such cases, you can use `Mutation#setCommitNow(true)` to indicate that the
mutation must be immediately committed.

### Run a query
You can run a query by calling `Txn#query(string)`. You will need to pass in a
GraphQL+- query string. If you want to pass an additional map of any variables that
you might want to set in the query, call `Txn#queryWithVars(string, object)` with
the variables object as the second argument.

The response would contain `Response#getJSON_asU8()` and `Response#getJSON_asB64()`
methods, which return the response JSON serialized as `Uint8Array` and `base64`
respectively. You will need to deserialize it before you can do anything useful
with it.

Let’s run the following query with a variable $a:

```
query all($a: string) {
  all(func: eq(name, $a))
  {
    name
  }
}
```

Run the query, deserialize the result from Uint8Array (or base64) encoded JSON and
print it out:

```js
// Run query.
const query = `query all($a: string) {
  all(func: eq(name, $a))
  {
    name 
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
ppl.all.forEach((person) => console.log(person.name));
```
This should print:

```
people found: 1
Alice
```

### Commit a transaction
A transaction can be committed using the `Txn#commit()` method. If your transaction
consisted solely of calls to `Txn#query` or `Txn#queryWithVars`, and no calls to
`Txn#mutate`, then calling `Txn#commit()` is not necessary.

An error will be returned if other transactions running concurrently modify the same
data that was modified in this transaction. It is up to the user to retry
transactions when they fail.

```js
const txn = dgraphClient.newTxn();
try {
  // ...
  // Perform any number of queries and mutations
  // ...
  // and finally...
  await txn.commit();
} catch (e) {
  if (e === dgraph.ERR_ABORTED) {
    // Retry or handle exception.
  } else {
    throw e;
  }
} finally {
  // Clean up. Calling this after txn.commit() is a no-op
  // and hence safe.
  await txn.discard();
}
```

## Development

### Building the source

```sh
npm run build
```

If you have made changes to the `proto/api.proto` file, you need need to
regenerate the source files generated by Protocol Buffer tools. To do that,
install the [Protocol Buffer Compiler][protoc] and then run the following
command:

[protoc]: https://github.com/google/protobuf#readme

```sh
npm run build:protos
```

### Running tests
Make sure you have a Dgraph server running on localhost before you run this task.

```sh
npm test
```
