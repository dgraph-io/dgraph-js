import * as jspb from "google-protobuf";
import * as grpc from "grpc";

import * as messages from "../generated/api_pb";

export function mergeLinReads(target: messages.LinRead, src?: messages.LinRead | null): messages.LinRead {
    if (src == null) {
        return target;
    }

    const srcIdsMap = src.getIdsMap();
    const targetIdsMap = target.getIdsMap();
    srcIdsMap.forEach((value: number, key: number): void => {
        const targetVal = targetIdsMap.get(key);
        if (targetVal == null || value > targetVal) {
            targetIdsMap.set(key, value);
        }
    });

    return target;
}

export function errorCode(err: any): { valid: boolean; code: number } { // tslint:disable-line no-any
    if (
        err == null ||
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

export function promisify<A, T>(
    f: (arg: A, cb: (err?: Error | null, res?: T) => void) => void,
    thisContext?: any, // tslint:disable-line no-any
): (arg: A) => Promise<T> {
    return (arg: A) => {
        // tslint:disable-next-line no-any
        return new Promise((resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void): void => {
            f.call(
                thisContext,
                arg,
                (err?: Error | null, result?: T): void => (err != null) ? reject(err) : resolve(result),
            );
        });
    };
}

export function stringifyMessage(msg: jspb.Message): string {
    return JSON.stringify(msg.toObject());
}

const BASE64_REGEX = /^(data:\w+\/[a-zA-Z\+\-\.]+;base64,)?(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/gi;

export function isBase64(str: string) {
    return BASE64_REGEX.test(str);
}

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
    let buf = Buffer.from(arr.buffer).toString();
    if (arr.byteLength !== arr.buffer.byteLength) {
        // Respect the "view", i.e. byteOffset and byteLength, without doing a copy.
        buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
    }

    return buf.toString();
}
