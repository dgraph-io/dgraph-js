import * as jspb from "google-protobuf";
import * as grpc from "grpc";

import * as messages from "./generated/api_pb";

export function mergeLinReads(target: messages.LinRead, src?: messages.LinRead | null): messages.LinRead {
    if (src == null) {
        return target;
    }

    const srcIdsMap = <jspb.Map<number, number>>src.getIdsMap();
    const targetIdsMap = <jspb.Map<number, number>>target.getIdsMap();
    srcIdsMap.forEach((value: number, key: number): void => {
        const targetVal = targetIdsMap.get(key);
        if (targetVal == null || value > targetVal) {
            targetIdsMap.set(key, value);
        }
    });

    return target;
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

export function errorCode(err: any): { valid: boolean, code: number } { // tslint:disable-line no-any
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
