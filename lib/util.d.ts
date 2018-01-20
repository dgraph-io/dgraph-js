import * as jspb from "google-protobuf";
import * as messages from "../generated/api_pb";
export declare function mergeLinReads(target: messages.LinRead, src?: messages.LinRead | null): messages.LinRead;
export declare function errorCode(err: any): {
    valid: boolean;
    code: number;
};
export declare function isAbortedError(err: any): boolean;
export declare function isConflictError(err: any): boolean;
export declare function promisify<A, T>(f: (arg: A, cb: (err?: Error | null, res?: T) => void) => void, thisContext?: any): (arg: A) => Promise<T>;
export declare function stringifyMessage(msg: jspb.Message): string;
export declare function isBase64(str: string): boolean;
export declare function strToB64(str: string): string;
export declare function strToU8(str: string): Uint8Array;
export declare function b64ToStr(b64Str: string): string;
export declare function u8ToStr(arr: Uint8Array): string;
