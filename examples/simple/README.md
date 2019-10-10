# Simple example project

Simple project demonstrating the use of [dgraph-js][], the official JavaScript client
for Dgraph.

[dgraph-js]:https://github.com/dgraph-io/dgraph-js

## Running

### Start Dgraph server

You will need to install [Dgraph v1.1.0 or above][releases] and run it.

[releases]: https://github.com/dgraph-io/dgraph/releases

You can run the commands below to start a clean Dgraph server every time for testing
and exploration.

First, create two separate directories for `dgraph zero` and `dgraph alpha`.

```sh
mkdir -p dgraphdata/zero dgraphdata/data
```

Then start `dgraph zero`:

```sh
cd dgraphdata/zero
rm -r zw; dgraph zero
```

Finally, start the `dgraph alpha`:

```sh
cd dgraphdata/data
rm -r p w; dgraph alpha --lru_mb=1024 --zero localhost:5080
```

For more configuration options, and other details, refer to
[docs.dgraph.io](https://docs.dgraph.io)

## Install dependencies

```sh
npm install
```

## Run the sample code

For Node.js, run:

```sh
node index.js
```

Your output should look something like this (uid values may be different):

```console
Created person named "Alice" with uid = 0x7569

All created nodes (map from blank node names to uids):
alice: 0x7569
dg.1447158641.7: 0x756a
dg.1447158641.8: 0x756b
dg.1447158641.9: 0x756c

Number of people named "Alice": 1
{ uid: '0x7569',
  name: 'Alice',
  age: 26,
  married: true,
  loc: { type: 'Point', coordinates: [ 1.1, 2 ] },
  dob: '1980-02-01T17:30:00Z',
  friend: [ { name: 'Bob', age: 24 }, { name: 'Charlie', age: 29 } ],
  school: [ { name: 'Crown Public School' } ] }

DONE!
```

You can explore the source code in the `index.js` file.
