"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("grpc");
var services = require("../generated/api_grpc_pb");
var util_1 = require("./util");
var DgraphClientStub = (function () {
    function DgraphClientStub(addr, credentials) {
        if (addr == null) {
            addr = "localhost:9080";
        }
        if (credentials == null) {
            credentials = grpc.credentials.createInsecure();
        }
        this.stub = new services.DgraphClient(addr, credentials);
        this.promisified = {
            alter: util_1.promisify(this.stub.alter, this.stub),
            query: util_1.promisify(this.stub.query, this.stub),
            mutate: util_1.promisify(this.stub.mutate, this.stub),
            commitOrAbort: util_1.promisify(this.stub.commitOrAbort, this.stub),
            checkVersion: util_1.promisify(this.stub.checkVersion, this.stub),
            waitForReady: util_1.promisify(this.stub.waitForReady, this.stub),
        };
    }
    DgraphClientStub.prototype.alter = function (op) {
        return this.promisified.alter(op);
    };
    DgraphClientStub.prototype.query = function (req) {
        return this.promisified.query(req);
    };
    DgraphClientStub.prototype.mutate = function (mu) {
        return this.promisified.mutate(mu);
    };
    DgraphClientStub.prototype.commitOrAbort = function (ctx) {
        return this.promisified.commitOrAbort(ctx);
    };
    DgraphClientStub.prototype.checkVersion = function (check) {
        return this.promisified.checkVersion(check);
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
