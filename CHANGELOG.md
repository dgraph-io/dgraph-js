# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/dgraph-io/dgraph-js/compare/v1.0.4...HEAD
[v1.0.4]: https://github.com/dgraph-io/dgraph-js/compare/v1.0.3...v1.0.4
[v1.0.3]: https://github.com/dgraph-io/dgraph-js/compare/v1.0.2...v1.0.3
[v1.0.2]: https://github.com/dgraph-io/dgraph-js/compare/v1.0.1...v1.0.2
[v1.0.1]: https://github.com/dgraph-io/dgraph-js/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/dgraph-io/dgraph-js/tree/v1.0.0
