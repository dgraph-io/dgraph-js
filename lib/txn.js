"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var messages = require("../generated/api_pb");
var errors_1 = require("./errors");
var types = require("./types");
var util_1 = require("./util");
var Txn = (function () {
    function Txn(dc, txnOpts) {
        this.finished = false;
        this.mutated = false;
        this.useReadOnly = false;
        this.useBestEffort = false;
        this.dc = dc;
        this.ctx = new messages.TxnContext();
        this.ctx.setLinRead(this.dc.getLinRead());
        this.sequencingProp = messages.LinRead.Sequencing.CLIENT_SIDE;
        var defaultedTxnOpts = __assign({ readOnly: false, bestEffort: false }, txnOpts);
        this.useReadOnly = defaultedTxnOpts.readOnly;
        this.useBestEffort = defaultedTxnOpts.bestEffort;
        if (this.useBestEffort && !this.useReadOnly) {
            this.dc.debug("Client attempted to query using best-effort without setting the transaction to read-only");
            throw errors_1.ERR_BEST_EFFORT_REQUIRED_READ_ONLY;
        }
    }
    Txn.prototype.sequencing = function (sequencing) {
        this.sequencingProp = sequencing;
    };
    Txn.prototype.query = function (q, metadata, options) {
        return this.queryWithVars(q, undefined, metadata, options);
    };
    Txn.prototype.queryWithVars = function (q, vars, metadata, options) {
        return __awaiter(this, void 0, void 0, function () {
            var req, linRead, varsMap_1, c, res, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.finished) {
                            this.dc.debug("Query request (ERR_FINISHED):\nquery = " + q + "\nvars = " + vars);
                            throw errors_1.ERR_FINISHED;
                        }
                        req = new messages.Request();
                        req.setQuery(q);
                        req.setStartTs(this.ctx.getStartTs());
                        req.setReadOnly(this.useReadOnly);
                        req.setBestEffort(this.useBestEffort);
                        linRead = this.ctx.getLinRead();
                        linRead.setSequencing(this.sequencingProp);
                        req.setLinRead(linRead);
                        if (vars !== undefined) {
                            varsMap_1 = req.getVarsMap();
                            Object.keys(vars).forEach(function (key) {
                                var value = vars[key];
                                if (typeof value === "string" || value instanceof String) {
                                    varsMap_1.set(key, value.toString());
                                }
                            });
                        }
                        this.dc.debug("Query request:\n" + util_1.stringifyMessage(req));
                        c = this.dc.anyClient();
                        _b = (_a = types).createResponse;
                        return [4, c.query(req, metadata, options)];
                    case 1:
                        res = _b.apply(_a, [_c.sent()]);
                        this.mergeContext(res.getTxn());
                        this.dc.debug("Query response:\n" + util_1.stringifyMessage(res));
                        return [2, res];
                }
            });
        });
    };
    Txn.prototype.mutate = function (mu, metadata, options) {
        return __awaiter(this, void 0, void 0, function () {
            var ag, c, e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.finished) {
                            this.dc.debug("Mutate request (ERR_FINISHED):\nmutation = " + util_1.stringifyMessage(mu));
                            throw errors_1.ERR_FINISHED;
                        }
                        this.mutated = true;
                        mu.setStartTs(this.ctx.getStartTs());
                        this.dc.debug("Mutate request:\n" + util_1.stringifyMessage(mu));
                        c = this.dc.anyClient();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 8]);
                        return [4, c.mutate(mu, metadata, options)];
                    case 2:
                        ag = _a.sent();
                        return [3, 8];
                    case 3:
                        e_1 = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4, this.discard(metadata, options)];
                    case 5:
                        _a.sent();
                        return [3, 7];
                    case 6:
                        e_2 = _a.sent();
                        return [3, 7];
                    case 7: throw (util_1.isAbortedError(e_1) || util_1.isConflictError(e_1)) ? errors_1.ERR_ABORTED : e_1;
                    case 8:
                        if (mu.getCommitNow()) {
                            this.finished = true;
                        }
                        this.mergeContext(ag.getContext());
                        this.dc.debug("Mutate response:\n" + util_1.stringifyMessage(ag));
                        return [2, ag];
                }
            });
        });
    };
    Txn.prototype.commit = function (metadata, options) {
        return __awaiter(this, void 0, void 0, function () {
            var c, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.finished) {
                            throw errors_1.ERR_FINISHED;
                        }
                        this.finished = true;
                        if (!this.mutated) {
                            return [2];
                        }
                        c = this.dc.anyClient();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, c.commitOrAbort(this.ctx, metadata, options)];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        e_3 = _a.sent();
                        throw util_1.isAbortedError(e_3) ? errors_1.ERR_ABORTED : e_3;
                    case 4: return [2];
                }
            });
        });
    };
    Txn.prototype.discard = function (metadata, options) {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.finished) {
                            return [2];
                        }
                        this.finished = true;
                        if (!this.mutated) {
                            return [2];
                        }
                        this.ctx.setAborted(true);
                        c = this.dc.anyClient();
                        return [4, c.commitOrAbort(this.ctx, metadata, options)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Txn.prototype.mergeContext = function (src) {
        if (src === undefined) {
            return;
        }
        util_1.mergeLinReads(this.ctx.getLinRead(), src.getLinRead());
        this.dc.mergeLinReads(src.getLinRead());
        if (this.ctx.getStartTs() === 0) {
            this.ctx.setStartTs(src.getStartTs());
        }
        else if (this.ctx.getStartTs() !== src.getStartTs()) {
            throw new Error("StartTs mismatch");
        }
        for (var _i = 0, _a = src.getKeysList(); _i < _a.length; _i++) {
            var key = _a[_i];
            this.ctx.addKeys(key);
        }
    };
    return Txn;
}());
exports.Txn = Txn;
