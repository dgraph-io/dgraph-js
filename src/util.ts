import * as jspb from "google-protobuf";
import * as grpc from "grpc";

export function errorCode(err: any): { valid: boolean; code: number } { // tslint:disable-line no-any
    if (
        err === undefined ||
        typeof err !== "object" ||
        !err.hasOwnProperty("code") || // tslint:disable-line no-unsafe-any
        typeof err.code !== "number"   // tslint:disable-line no-unsafe-any
    ) {
        return {
            valid: false,
            code: -1,
        };
    }

    return {
        valid: true,
        code: (<{ code: number }>err).code,
    };
}

export function isAbortedError(err: any): boolean { // tslint:disable-line no-any
    const ec = errorCode(err);
    return ec.valid && ec.code === grpc.status.ABORTED;
}

export function isConflictError(err: any): boolean { // tslint:disable-line no-any
    const ec = errorCode(err);
    return ec.valid && (ec.code === grpc.status.ABORTED || ec.code === grpc.status.FAILED_PRECONDITION);
}

export function isUnauthenticatedError(err: any): boolean { // tslint:disable-line no-any
    const ec = errorCode(err);
    return ec.valid && (ec.code === grpc.status.UNAUTHENTICATED);
}

export function promisify1<A, T>(
    f: (arg: A, cb: (err?: Error, res?: T) => void) => void,
    thisContext?: any, // tslint:disable-line no-any
): (arg: A) => Promise<T> {
    return (arg: A) => {
        // tslint:disable-next-line no-any
        return new Promise((resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void): void => {
            f.call(
                thisContext,
                arg,
                (err?: Error, result?: T): void => (err !== undefined && err !== null) ? reject(err) : resolve(result),
            );
        });
    };
}

export function promisify3<A, B, C, T>(
    f: (argA: A, argB: B, argC: C, cb: (err?: Error, res?: T) => void) => void,
    thisContext?: any, // tslint:disable-line no-any
): (argA: A, argB: B, argC: C) => Promise<T> {
    return (argA: A, argB: B, argC: C) => {
        // tslint:disable-next-line no-any
        return new Promise((resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void): void => {
            f.call(
                thisContext,
                argA,
                argB,
                argC,
                (err?: Error, result?: T): void => (err !== undefined && err !== null) ? reject(err) : resolve(result),
            );
        });
    };
}

export function stringifyMessage(msg: jspb.Message): string {
    return JSON.stringify(msg.toObject());
}

export { isBase64 } from "is-base64";

export function strToB64(str: string): string {
    return Buffer.from(str, "utf8").toString("base64");
}

export function strToU8(str: string): Uint8Array {
    return new Uint8Array(Buffer.from(str, "utf8"));
}

export function b64ToStr(b64Str: string): string {
    return Buffer.from(b64Str, "base64").toString();
}

export function u8ToStr(arr: Uint8Array): string {
    let buf = Buffer.from(arr.buffer);
    if (arr.byteLength !== arr.buffer.byteLength) {
        // Respect the "view", i.e. byteOffset and byteLength, without doing a copy.
        buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
    }

    return buf.toString();
}

export function strToJson(jsonStr: string): any { // tslint:disable-line no-any
    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        return {};
    }
}
