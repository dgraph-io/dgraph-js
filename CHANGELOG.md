# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [v2.0.2] - 2019-10-01

### Changed
- Upgrade google-protobuf dependency version to 3.8.0+ ([#80](https://github.com/dgraph-io/dgraph-js/issues/80))

### Fixed
- Added logic to catch exceptions when `dgraphClient` fails to be created
  due to invalid gRPC address ([#71](https://github.com/dgraph-io/dgraph-js/issues/71))

## [v2.0.1] - 2019-09-10

### Fixed
- Added function to refresh JWT token if expired
  ([#56](https://github.com/dgraph-io/dgraph-js/issues/56))

## [v2.0.0] - 2019-09-06

### Added
- `doRequest` function for performing upsert, or just a query or a mutation
- Support for ACL features in Dgraph v1.1 - login & jwt refresh
- `upsert` and `lang` fields to proto message type SchemaNode
- Option for server-side sequencing

### Changed
- Return type of `Txn#mutate` function from `messages.Assigned` to `messages.Response`
- Updated protobufs to the latest version
- Upgraded all typescript dev libraries to the latest version

### Removed
- Support for null values where appropriate (because of typescript warning)

## [v1.2.1] - 2018-03-16

### Fixed
- Pass `metadata` and `options` arguments to `Txn#discard` in `Txn#mutate`

## [v1.2.0] - 2018-03-12

### Added
- **[BREAKING]** Optional `metadata` parameter of type `grpc.Metadata` to the
  `DgraphClientStub` methods. `options` parameter moved to the third position
  to conform to the `grpc` package API.

  Methods affected - `DgraphClient#alter`, `Txn#query`, `Txn#queryWithVars`,
  `Txn#mutate`, `Txn#commit` and `Txn#discard`.

  To upgrade to this version, if using any of these methods with the `options`
  parameter, simply add a `null` argument before the `options` argument. For
  example, `client.alter(options)` becomes `client.alter(null, options)`

## [v1.1.2] - 2018-03-07

### Added
- Full compatibility with Dgraph v1.0.4
- `latency` field to proto message type `Assigned`

## [v1.1.1] - 2018-02-13

### Added
- Compatibility with grpc v1.9

### Fixed
- Function `u8ToStr` which was leading to json parse errors
  ([#17](https://github.com/dgraph-io/dgraph-js/issues/17))

## [v1.1.0] - 2018-02-06

### Added
- Full compatibility with Dgraph v1.0.2

### Removed
- `startTs` field from proto message type `Operation`

## [v1.0.4] - 2018-02-02

### Added
- Optional `options` parameter of type `object` to the `DgraphClientStub` constructor
- Optional `options` parameter of type `grpc.CallOptions` to the `DgraphClientStub`
  methods
- Export `Txn` class

## [v1.0.3] - 2018-01-26

### Changed
- `grpc` is now a peer dependency

## [v1.0.2] - 2018-01-24

### Added
- Method `DgraphClientStub#close` to close the grpc client associated with `DgraphClientStub`
- Method `DgraphClientStub#grpcClient` to return the grpc client associated with
  `DgraphClientStub`
- Method `DgraphClientStub#waitForReady` to provide a promisified version of
  `grpc.Client#waitForReady`

## [v1.0.1] - 2018-01-20

### Added
- Wrapper classes for certain proto classes to simplify the api and avoid repetitive
  serialization/deserialization code

## [v1.0.0] - 2017-12-20

### Added
- Full compatibility with Dgraph v1.0.0

[v2.0.1]: https://github.com/dgraph-io/dgraph-js/compare/v2.0.0...v2.0.1
[v2.0.0]: https://github.com/dgraph-io/dgraph-js/compare/v1.2.1...v2.0.0
[v1.2.1]: https://github.com/dgraph-io/dgraph-js/compare/v1.2.0...v1.2.1
[v1.2.0]: https://github.com/dgraph-io/dgraph-js/compare/v1.1.2...v1.2.0
[v1.1.2]: https://github.com/dgraph-io/dgraph-js/compare/v1.1.1...v1.1.2
[v1.1.1]: https://github.com/dgraph-io/dgraph-js/compare/v1.1.0...v1.1.1
[v1.1.0]: https://github.com/dgraph-io/dgraph-js/compare/v1.0.4...v1.1.0
[v1.0.4]: https://github.com/dgraph-io/dgraph-js/compare/v1.0.3...v1.0.4
[v1.0.3]: https://github.com/dgraph-io/dgraph-js/compare/v1.0.2...v1.0.3
[v1.0.2]: https://github.com/dgraph-io/dgraph-js/compare/v1.0.1...v1.0.2
[v1.0.1]: https://github.com/dgraph-io/dgraph-js/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/dgraph-io/dgraph-js/tree/v1.0.0
