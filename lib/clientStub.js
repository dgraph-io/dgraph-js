"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("grpc");
var services = require("../generated/api_grpc_pb");
var messages = require("../generated/api_pb");
var errors_1 = require("./errors");
var util_1 = require("./util");
var DgraphClientStub = (function () {
    function DgraphClientStub(addr, credentials, options) {
        this.accessJwt = "";
        this.refreshJwt = "";
        if (addr === undefined) {
            addr = "localhost:9080";
        }
        if (credentials === undefined) {
            credentials = grpc.credentials.createInsecure();
        }
        this.stub = new services.DgraphClient(addr, credentials, options);
        this.promisified = {
            login: util_1.promisify3(this.stub.login, this.stub),
            alter: util_1.promisify3(this.stub.alter, this.stub),
            query: util_1.promisify3(this.stub.query, this.stub),
            mutate: util_1.promisify3(this.stub.mutate, this.stub),
            commitOrAbort: util_1.promisify3(this.stub.commitOrAbort, this.stub),
            checkVersion: util_1.promisify3(this.stub.checkVersion, this.stub),
            waitForReady: util_1.promisify1(this.stub.waitForReady, this.stub),
        };
    }
    DgraphClientStub.prototype.login = function (userid, password, refreshJwt, metadata, options) {
        return __awaiter(this, void 0, void 0, function () {
            var req, resp, jwtResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = new messages.LoginRequest();
                        if (userid !== undefined) {
                            req.setUserid(userid);
                            req.setPassword(password);
                        }
                        else if (refreshJwt !== undefined) {
                            req.setRefreshToken(refreshJwt);
                        }
                        else {
                            req.setRefreshToken(this.refreshJwt);
                        }
                        return [4, this.promisified.login(req, this.ensureMetadata(metadata), ensureCallOptions(options))];
                    case 1:
                        resp = _a.sent();
                        jwtResponse = messages.Jwt.deserializeBinary(resp.getJson_asU8());
                        this.accessJwt = jwtResponse.getAccessJwt();
                        this.refreshJwt = jwtResponse.getRefreshJwt();
                        return [2, jwtResponse];
                }
            });
        });
    };
    DgraphClientStub.prototype.alter = function (op, metadata, options) {
        return this.promisified.alter(op, this.ensureMetadata(metadata), ensureCallOptions(options));
    };
    DgraphClientStub.prototype.retryLogin = function (metadata, options) {
        return __awaiter(this, void 0, void 0, function () {
            var req, resp, jwtResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.refreshJwt.length === 0) {
                            throw errors_1.ERR_REFRESH_JWT_EMPTY;
                        }
                        req = new messages.LoginRequest();
                        req.setRefreshToken(this.refreshJwt);
                        return [4, this.promisified.login(req, this.ensureMetadata(metadata), ensureCallOptions(options))];
                    case 1:
                        resp = _a.sent();
                        jwtResponse = messages.Jwt.deserializeBinary(resp.getJson_asU8());
                        this.accessJwt = jwtResponse.getAccessJwt();
                        this.refreshJwt = jwtResponse.getRefreshJwt();
                        return [2, jwtResponse];
                }
            });
        });
    };
    DgraphClientStub.prototype.query = function (req, metadata, options) {
        return this.promisified.query(req, this.ensureMetadata(metadata), ensureCallOptions(options));
    };
    DgraphClientStub.prototype.mutate = function (mu, metadata, options) {
        return this.promisified.mutate(mu, this.ensureMetadata(metadata), ensureCallOptions(options));
    };
    DgraphClientStub.prototype.commitOrAbort = function (ctx, metadata, options) {
        return this.promisified.commitOrAbort(ctx, this.ensureMetadata(metadata), ensureCallOptions(options));
    };
    DgraphClientStub.prototype.checkVersion = function (check, metadata, options) {
        return this.promisified.checkVersion(check, this.ensureMetadata(metadata), ensureCallOptions(options));
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
    DgraphClientStub.prototype.ensureMetadata = function (metadata) {
        var newMeta = (metadata === undefined) ? new grpc.Metadata() : metadata;
        if (this.accessJwt !== "") {
            newMeta.set("accessJwt", this.accessJwt);
        }
        return newMeta;
    };
    return DgraphClientStub;
}());
exports.DgraphClientStub = DgraphClientStub;
function ensureCallOptions(options) {
    return (options === undefined) ? {
        propagate_flags: grpc.propagate.DEFAULTS,
        credentials: undefined,
    } : options;
}
