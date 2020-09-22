"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("@grpc/grpc-js");
function errorCode(err) {
    if (
        err === undefined ||
        typeof err !== "object" ||
        !err.hasOwnProperty("code") ||
        typeof err.code !== "number"
    ) {
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
    return (
        ec.valid &&
        (ec.code === grpc.status.ABORTED ||
            ec.code === grpc.status.FAILED_PRECONDITION)
    );
}
exports.isConflictError = isConflictError;
function isUnauthenticatedError(err) {
    var ec = errorCode(err);
    return ec.valid && ec.code === grpc.status.UNAUTHENTICATED;
}
exports.isUnauthenticatedError = isUnauthenticatedError;
function promisify1(f, thisContext) {
    return function (arg) {
        return new Promise(function (resolve, reject) {
            f.call(thisContext, arg, function (err, result) {
                return err !== undefined && err !== null
                    ? reject(err)
                    : resolve(result);
            });
        });
    };
}
exports.promisify1 = promisify1;
function promisify3(f, thisContext) {
    return function (argA, argB, argC) {
        return new Promise(function (resolve, reject) {
            f.call(thisContext, argA, argB, argC, function (err, result) {
                return err !== undefined && err !== null
                    ? reject(err)
                    : resolve(result);
            });
        });
    };
}
exports.promisify3 = promisify3;
function stringifyMessage(msg) {
    return JSON.stringify(msg.toObject());
}
exports.stringifyMessage = stringifyMessage;
var is_base64_1 = require("is-base64");
exports.isBase64 = is_base64_1.isBase64;
function strToB64(str) {
    return Buffer.from(str, "utf8").toString("base64");
}
exports.strToB64 = strToB64;
function strToU8(str) {
    return new Uint8Array(Buffer.from(str, "utf8"));
}
exports.strToU8 = strToU8;
function b64ToStr(b64Str) {
    return Buffer.from(b64Str, "base64").toString();
}
exports.b64ToStr = b64ToStr;
function u8ToStr(arr) {
    var buf = Buffer.from(arr.buffer);
    if (arr.byteLength !== arr.buffer.byteLength) {
        buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
    }
    return buf.toString();
}
exports.u8ToStr = u8ToStr;
function strToJson(jsonStr) {
    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        return {};
    }
}
exports.strToJson = strToJson;
