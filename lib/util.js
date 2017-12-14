"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("grpc");
function mergeLinReads(target, src) {
    if (src == null) {
        return target;
    }
    var srcIdsMap = src.getIdsMap();
    var targetIdsMap = target.getIdsMap();
    srcIdsMap.forEach(function (value, key) {
        var targetVal = targetIdsMap.get(key);
        if (targetVal == null || value > targetVal) {
            targetIdsMap.set(key, value);
        }
    });
    return target;
}
exports.mergeLinReads = mergeLinReads;
function errorCode(err) {
    if (err == null ||
        typeof err !== "object" ||
        !err.hasOwnProperty("code") ||
        typeof err.code !== "number") {
        return {
            valid: false,
            code: -1,
        };
    }
    return {
        valid: true,
        code: err.code,
    };
}
exports.errorCode = errorCode;
function isAbortedError(err) {
    var ec = errorCode(err);
    return ec.valid && ec.code === grpc.status.ABORTED;
}
exports.isAbortedError = isAbortedError;
function isConflictError(err) {
    var ec = errorCode(err);
    return ec.valid && (ec.code === grpc.status.ABORTED || ec.code === grpc.status.FAILED_PRECONDITION);
}
exports.isConflictError = isConflictError;
function promisify(f, thisContext) {
    return function (arg) {
        return new Promise(function (resolve, reject) {
            f.call(thisContext, arg, function (err, result) { return (err != null) ? reject(err) : resolve(result); });
        });
    };
}
exports.promisify = promisify;
function stringifyMessage(msg) {
    return JSON.stringify(msg.toObject());
}
exports.stringifyMessage = stringifyMessage;
