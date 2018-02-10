"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("grpc");
var services = require("../generated/api_grpc_pb");
var util_1 = require("./util");
var DgraphClientStub = (function () {
    function DgraphClientStub(addr, credentials, options) {
        if (addr == null) {
            addr = "localhost:9080";
        }
        if (credentials == null) {
            credentials = grpc.credentials.createInsecure();
        }
        this.stub = new services.DgraphClient(addr, credentials, options);
        this.promisified = {
            alter: util_1.promisify3(this.stub.alter, this.stub),
            query: util_1.promisify3(this.stub.query, this.stub),
            mutate: util_1.promisify3(this.stub.mutate, this.stub),
            commitOrAbort: util_1.promisify3(this.stub.commitOrAbort, this.stub),
            checkVersion: util_1.promisify3(this.stub.checkVersion, this.stub),
            waitForReady: util_1.promisify1(this.stub.waitForReady, this.stub),
        };
    }
    DgraphClientStub.prototype.alter = function (op, options) {
        return this.promisified.alter(op, new grpc.Metadata(), ensureCallOptions(options));
    };
    DgraphClientStub.prototype.query = function (req, options) {
        return this.promisified.query(req, new grpc.Metadata(), ensureCallOptions(options));
    };
    DgraphClientStub.prototype.mutate = function (mu, options) {
        return this.promisified.mutate(mu, new grpc.Metadata(), ensureCallOptions(options));
    };
    DgraphClientStub.prototype.commitOrAbort = function (ctx, options) {
        return this.promisified.commitOrAbort(ctx, new grpc.Metadata(), ensureCallOptions(options));
    };
    DgraphClientStub.prototype.checkVersion = function (check, options) {
        return this.promisified.checkVersion(check, new grpc.Metadata(), ensureCallOptions(options));
    };
    DgraphClientStub.prototype.waitForReady = function (deadline) {
        return this.promisified.waitForReady(deadline);
    };
    DgraphClientStub.prototype.close = function () {
        return this.stub.close();
    };
    DgraphClientStub.prototype.grpcClient = function () {
        return this.stub;
    };
    return DgraphClientStub;
}());
exports.DgraphClientStub = DgraphClientStub;
function ensureCallOptions(options) {
    if (options != null) {
        return options;
    }
    return {
        propagate_flags: grpc.propagate.DEFAULTS,
        credentials: null,
    };
}
