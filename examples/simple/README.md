# simple

Simple project demonstrating the use of [dgraph-js], the official javascript client
for Dgraph.

[dgraph-js]:https://github.com/dgraph-io/dgraph-js

## Running

### Start Dgraph Server
You will need to install [Dgraph v0.9.4 or above][releases] and run it.

[releases]: https://github.com/dgraph-io/dgraph/releases

You can run the commands below to start a clean Dgraph server everytime, for testing
and exploration.

First, create two separate directories for `dgraph zero` and `dgraph server`.

```sh
mkdir -p dgraphdata/zero dgraphdata/data
```

Then start `dgraph zero`:

```sh
cd dgraphdata/zero
rm -r zw; dgraph zero --port_offset -2000
```

Finally, start the `dgraph server`:

```sh
cd dgraphdata/data
rm -r p w; dgraph server --memory_mb=1024 --zero localhost:5080
```

For more configuration options, and other details, refer to
[docs.dgraph.io](https://docs.dgraph.io)

## Install dependencies

```sh
npm install
```

## Run the sample code

```sh
node index.js
```

Your output should look something like this:

```
people found: 1
Alice

DONE!
```

You can explore the source code in the `index.js` file.
