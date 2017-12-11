import * as messages from "./generated/api_pb";
export declare function mergeLinReads(target: messages.LinRead, src?: messages.LinRead | null): messages.LinRead;
export declare function promisify<A, T>(f: (arg: A, cb: (err?: Error | null, res?: T) => void) => void, thisContext?: any): (arg: A) => Promise<T>;
export declare function errorCode(err: any): {
    valid: boolean;
    code: number;
};
export declare function isAbortedError(err: any): boolean;
export declare function isConflictError(err: any): boolean;
