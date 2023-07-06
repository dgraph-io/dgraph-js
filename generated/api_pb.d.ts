// package: api
// file: api.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Request extends jspb.Message { 
    getStartTs(): number;
    setStartTs(value: number): Request;
    getQuery(): string;
    setQuery(value: string): Request;

    getVarsMap(): jspb.Map<string, string>;
    clearVarsMap(): void;
    getReadOnly(): boolean;
    setReadOnly(value: boolean): Request;
    getBestEffort(): boolean;
    setBestEffort(value: boolean): Request;
    clearMutationsList(): void;
    getMutationsList(): Array<Mutation>;
    setMutationsList(value: Array<Mutation>): Request;
    addMutations(value?: Mutation, index?: number): Mutation;
    getCommitNow(): boolean;
    setCommitNow(value: boolean): Request;
    getRespFormat(): Request.RespFormat;
    setRespFormat(value: Request.RespFormat): Request;
    getHash(): string;
    setHash(value: string): Request;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Request.AsObject;
    static toObject(includeInstance: boolean, msg: Request): Request.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Request, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Request;
    static deserializeBinaryFromReader(message: Request, reader: jspb.BinaryReader): Request;
}

export namespace Request {
    export type AsObject = {
        startTs: number,
        query: string,

        varsMap: Array<[string, string]>,
        readOnly: boolean,
        bestEffort: boolean,
        mutationsList: Array<Mutation.AsObject>,
        commitNow: boolean,
        respFormat: Request.RespFormat,
        hash: string,
    }

    export enum RespFormat {
    JSON = 0,
    RDF = 1,
    }

}

export class Uids extends jspb.Message { 
    clearUidsList(): void;
    getUidsList(): Array<string>;
    setUidsList(value: Array<string>): Uids;
    addUids(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Uids.AsObject;
    static toObject(includeInstance: boolean, msg: Uids): Uids.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Uids, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Uids;
    static deserializeBinaryFromReader(message: Uids, reader: jspb.BinaryReader): Uids;
}

export namespace Uids {
    export type AsObject = {
        uidsList: Array<string>,
    }
}

export class ListOfString extends jspb.Message { 
    clearValueList(): void;
    getValueList(): Array<string>;
    setValueList(value: Array<string>): ListOfString;
    addValue(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListOfString.AsObject;
    static toObject(includeInstance: boolean, msg: ListOfString): ListOfString.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListOfString, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListOfString;
    static deserializeBinaryFromReader(message: ListOfString, reader: jspb.BinaryReader): ListOfString;
}

export namespace ListOfString {
    export type AsObject = {
        valueList: Array<string>,
    }
}

export class Response extends jspb.Message { 
    getJson(): Uint8Array | string;
    getJson_asU8(): Uint8Array;
    getJson_asB64(): string;
    setJson(value: Uint8Array | string): Response;

    hasTxn(): boolean;
    clearTxn(): void;
    getTxn(): TxnContext | undefined;
    setTxn(value?: TxnContext): Response;

    hasLatency(): boolean;
    clearLatency(): void;
    getLatency(): Latency | undefined;
    setLatency(value?: Latency): Response;

    hasMetrics(): boolean;
    clearMetrics(): void;
    getMetrics(): Metrics | undefined;
    setMetrics(value?: Metrics): Response;

    getUidsMap(): jspb.Map<string, string>;
    clearUidsMap(): void;
    getRdf(): Uint8Array | string;
    getRdf_asU8(): Uint8Array;
    getRdf_asB64(): string;
    setRdf(value: Uint8Array | string): Response;

    getHdrsMap(): jspb.Map<string, ListOfString>;
    clearHdrsMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Response.AsObject;
    static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Response;
    static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
    export type AsObject = {
        json: Uint8Array | string,
        txn?: TxnContext.AsObject,
        latency?: Latency.AsObject,
        metrics?: Metrics.AsObject,

        uidsMap: Array<[string, string]>,
        rdf: Uint8Array | string,

        hdrsMap: Array<[string, ListOfString.AsObject]>,
    }
}

export class Mutation extends jspb.Message { 
    getSetJson(): Uint8Array | string;
    getSetJson_asU8(): Uint8Array;
    getSetJson_asB64(): string;
    setSetJson(value: Uint8Array | string): Mutation;
    getDeleteJson(): Uint8Array | string;
    getDeleteJson_asU8(): Uint8Array;
    getDeleteJson_asB64(): string;
    setDeleteJson(value: Uint8Array | string): Mutation;
    getSetNquads(): Uint8Array | string;
    getSetNquads_asU8(): Uint8Array;
    getSetNquads_asB64(): string;
    setSetNquads(value: Uint8Array | string): Mutation;
    getDelNquads(): Uint8Array | string;
    getDelNquads_asU8(): Uint8Array;
    getDelNquads_asB64(): string;
    setDelNquads(value: Uint8Array | string): Mutation;
    clearSetList(): void;
    getSetList(): Array<NQuad>;
    setSetList(value: Array<NQuad>): Mutation;
    addSet(value?: NQuad, index?: number): NQuad;
    clearDelList(): void;
    getDelList(): Array<NQuad>;
    setDelList(value: Array<NQuad>): Mutation;
    addDel(value?: NQuad, index?: number): NQuad;
    getCond(): string;
    setCond(value: string): Mutation;
    getCommitNow(): boolean;
    setCommitNow(value: boolean): Mutation;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Mutation.AsObject;
    static toObject(includeInstance: boolean, msg: Mutation): Mutation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Mutation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Mutation;
    static deserializeBinaryFromReader(message: Mutation, reader: jspb.BinaryReader): Mutation;
}

export namespace Mutation {
    export type AsObject = {
        setJson: Uint8Array | string,
        deleteJson: Uint8Array | string,
        setNquads: Uint8Array | string,
        delNquads: Uint8Array | string,
        setList: Array<NQuad.AsObject>,
        delList: Array<NQuad.AsObject>,
        cond: string,
        commitNow: boolean,
    }
}

export class Operation extends jspb.Message { 
    getSchema(): string;
    setSchema(value: string): Operation;
    getDropAttr(): string;
    setDropAttr(value: string): Operation;
    getDropAll(): boolean;
    setDropAll(value: boolean): Operation;
    getDropOp(): Operation.DropOp;
    setDropOp(value: Operation.DropOp): Operation;
    getDropValue(): string;
    setDropValue(value: string): Operation;
    getRunInBackground(): boolean;
    setRunInBackground(value: boolean): Operation;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Operation.AsObject;
    static toObject(includeInstance: boolean, msg: Operation): Operation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Operation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Operation;
    static deserializeBinaryFromReader(message: Operation, reader: jspb.BinaryReader): Operation;
}

export namespace Operation {
    export type AsObject = {
        schema: string,
        dropAttr: string,
        dropAll: boolean,
        dropOp: Operation.DropOp,
        dropValue: string,
        runInBackground: boolean,
    }

    export enum DropOp {
    NONE = 0,
    ALL = 1,
    DATA = 2,
    ATTR = 3,
    TYPE = 4,
    }

}

export class Payload extends jspb.Message { 
    getData(): Uint8Array | string;
    getData_asU8(): Uint8Array;
    getData_asB64(): string;
    setData(value: Uint8Array | string): Payload;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Payload.AsObject;
    static toObject(includeInstance: boolean, msg: Payload): Payload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Payload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Payload;
    static deserializeBinaryFromReader(message: Payload, reader: jspb.BinaryReader): Payload;
}

export namespace Payload {
    export type AsObject = {
        data: Uint8Array | string,
    }
}

export class TxnContext extends jspb.Message { 
    getStartTs(): number;
    setStartTs(value: number): TxnContext;
    getCommitTs(): number;
    setCommitTs(value: number): TxnContext;
    getAborted(): boolean;
    setAborted(value: boolean): TxnContext;
    clearKeysList(): void;
    getKeysList(): Array<string>;
    setKeysList(value: Array<string>): TxnContext;
    addKeys(value: string, index?: number): string;
    clearPredsList(): void;
    getPredsList(): Array<string>;
    setPredsList(value: Array<string>): TxnContext;
    addPreds(value: string, index?: number): string;
    getHash(): string;
    setHash(value: string): TxnContext;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TxnContext.AsObject;
    static toObject(includeInstance: boolean, msg: TxnContext): TxnContext.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TxnContext, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TxnContext;
    static deserializeBinaryFromReader(message: TxnContext, reader: jspb.BinaryReader): TxnContext;
}

export namespace TxnContext {
    export type AsObject = {
        startTs: number,
        commitTs: number,
        aborted: boolean,
        keysList: Array<string>,
        predsList: Array<string>,
        hash: string,
    }
}

export class Check extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Check.AsObject;
    static toObject(includeInstance: boolean, msg: Check): Check.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Check, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Check;
    static deserializeBinaryFromReader(message: Check, reader: jspb.BinaryReader): Check;
}

export namespace Check {
    export type AsObject = {
    }
}

export class Version extends jspb.Message { 
    getTag(): string;
    setTag(value: string): Version;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Version.AsObject;
    static toObject(includeInstance: boolean, msg: Version): Version.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Version, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Version;
    static deserializeBinaryFromReader(message: Version, reader: jspb.BinaryReader): Version;
}

export namespace Version {
    export type AsObject = {
        tag: string,
    }
}

export class Latency extends jspb.Message { 
    getParsingNs(): number;
    setParsingNs(value: number): Latency;
    getProcessingNs(): number;
    setProcessingNs(value: number): Latency;
    getEncodingNs(): number;
    setEncodingNs(value: number): Latency;
    getAssignTimestampNs(): number;
    setAssignTimestampNs(value: number): Latency;
    getTotalNs(): number;
    setTotalNs(value: number): Latency;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Latency.AsObject;
    static toObject(includeInstance: boolean, msg: Latency): Latency.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Latency, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Latency;
    static deserializeBinaryFromReader(message: Latency, reader: jspb.BinaryReader): Latency;
}

export namespace Latency {
    export type AsObject = {
        parsingNs: number,
        processingNs: number,
        encodingNs: number,
        assignTimestampNs: number,
        totalNs: number,
    }
}

export class Metrics extends jspb.Message { 

    getNumUidsMap(): jspb.Map<string, number>;
    clearNumUidsMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Metrics.AsObject;
    static toObject(includeInstance: boolean, msg: Metrics): Metrics.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Metrics, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Metrics;
    static deserializeBinaryFromReader(message: Metrics, reader: jspb.BinaryReader): Metrics;
}

export namespace Metrics {
    export type AsObject = {

        numUidsMap: Array<[string, number]>,
    }
}

export class NQuad extends jspb.Message { 
    getSubject(): string;
    setSubject(value: string): NQuad;
    getPredicate(): string;
    setPredicate(value: string): NQuad;
    getObjectId(): string;
    setObjectId(value: string): NQuad;

    hasObjectValue(): boolean;
    clearObjectValue(): void;
    getObjectValue(): Value | undefined;
    setObjectValue(value?: Value): NQuad;
    getLang(): string;
    setLang(value: string): NQuad;
    clearFacetsList(): void;
    getFacetsList(): Array<Facet>;
    setFacetsList(value: Array<Facet>): NQuad;
    addFacets(value?: Facet, index?: number): Facet;
    getNamespace(): number;
    setNamespace(value: number): NQuad;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NQuad.AsObject;
    static toObject(includeInstance: boolean, msg: NQuad): NQuad.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NQuad, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NQuad;
    static deserializeBinaryFromReader(message: NQuad, reader: jspb.BinaryReader): NQuad;
}

export namespace NQuad {
    export type AsObject = {
        subject: string,
        predicate: string,
        objectId: string,
        objectValue?: Value.AsObject,
        lang: string,
        facetsList: Array<Facet.AsObject>,
        namespace: number,
    }
}

export class Value extends jspb.Message { 

    hasDefaultVal(): boolean;
    clearDefaultVal(): void;
    getDefaultVal(): string;
    setDefaultVal(value: string): Value;

    hasBytesVal(): boolean;
    clearBytesVal(): void;
    getBytesVal(): Uint8Array | string;
    getBytesVal_asU8(): Uint8Array;
    getBytesVal_asB64(): string;
    setBytesVal(value: Uint8Array | string): Value;

    hasIntVal(): boolean;
    clearIntVal(): void;
    getIntVal(): number;
    setIntVal(value: number): Value;

    hasBoolVal(): boolean;
    clearBoolVal(): void;
    getBoolVal(): boolean;
    setBoolVal(value: boolean): Value;

    hasStrVal(): boolean;
    clearStrVal(): void;
    getStrVal(): string;
    setStrVal(value: string): Value;

    hasDoubleVal(): boolean;
    clearDoubleVal(): void;
    getDoubleVal(): number;
    setDoubleVal(value: number): Value;

    hasGeoVal(): boolean;
    clearGeoVal(): void;
    getGeoVal(): Uint8Array | string;
    getGeoVal_asU8(): Uint8Array;
    getGeoVal_asB64(): string;
    setGeoVal(value: Uint8Array | string): Value;

    hasDateVal(): boolean;
    clearDateVal(): void;
    getDateVal(): Uint8Array | string;
    getDateVal_asU8(): Uint8Array;
    getDateVal_asB64(): string;
    setDateVal(value: Uint8Array | string): Value;

    hasDatetimeVal(): boolean;
    clearDatetimeVal(): void;
    getDatetimeVal(): Uint8Array | string;
    getDatetimeVal_asU8(): Uint8Array;
    getDatetimeVal_asB64(): string;
    setDatetimeVal(value: Uint8Array | string): Value;

    hasPasswordVal(): boolean;
    clearPasswordVal(): void;
    getPasswordVal(): string;
    setPasswordVal(value: string): Value;

    hasUidVal(): boolean;
    clearUidVal(): void;
    getUidVal(): number;
    setUidVal(value: number): Value;

    getValCase(): Value.ValCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Value.AsObject;
    static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Value;
    static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
}

export namespace Value {
    export type AsObject = {
        defaultVal: string,
        bytesVal: Uint8Array | string,
        intVal: number,
        boolVal: boolean,
        strVal: string,
        doubleVal: number,
        geoVal: Uint8Array | string,
        dateVal: Uint8Array | string,
        datetimeVal: Uint8Array | string,
        passwordVal: string,
        uidVal: number,
    }

    export enum ValCase {
        VAL_NOT_SET = 0,
        DEFAULT_VAL = 1,
        BYTES_VAL = 2,
        INT_VAL = 3,
        BOOL_VAL = 4,
        STR_VAL = 5,
        DOUBLE_VAL = 6,
        GEO_VAL = 7,
        DATE_VAL = 8,
        DATETIME_VAL = 9,
        PASSWORD_VAL = 10,
        UID_VAL = 11,
    }

}

export class Facet extends jspb.Message { 
    getKey(): string;
    setKey(value: string): Facet;
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): Facet;
    getValType(): Facet.ValType;
    setValType(value: Facet.ValType): Facet;
    clearTokensList(): void;
    getTokensList(): Array<string>;
    setTokensList(value: Array<string>): Facet;
    addTokens(value: string, index?: number): string;
    getAlias(): string;
    setAlias(value: string): Facet;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Facet.AsObject;
    static toObject(includeInstance: boolean, msg: Facet): Facet.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Facet, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Facet;
    static deserializeBinaryFromReader(message: Facet, reader: jspb.BinaryReader): Facet;
}

export namespace Facet {
    export type AsObject = {
        key: string,
        value: Uint8Array | string,
        valType: Facet.ValType,
        tokensList: Array<string>,
        alias: string,
    }

    export enum ValType {
    STRING = 0,
    INT = 1,
    FLOAT = 2,
    BOOL = 3,
    DATETIME = 4,
    }

}

export class LoginRequest extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): LoginRequest;
    getPassword(): string;
    setPassword(value: string): LoginRequest;
    getRefreshToken(): string;
    setRefreshToken(value: string): LoginRequest;
    getNamespace(): number;
    setNamespace(value: number): LoginRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginRequest;
    static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
    export type AsObject = {
        userid: string,
        password: string,
        refreshToken: string,
        namespace: number,
    }
}

export class Jwt extends jspb.Message { 
    getAccessJwt(): string;
    setAccessJwt(value: string): Jwt;
    getRefreshJwt(): string;
    setRefreshJwt(value: string): Jwt;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Jwt.AsObject;
    static toObject(includeInstance: boolean, msg: Jwt): Jwt.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Jwt, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Jwt;
    static deserializeBinaryFromReader(message: Jwt, reader: jspb.BinaryReader): Jwt;
}

export namespace Jwt {
    export type AsObject = {
        accessJwt: string,
        refreshJwt: string,
    }
}
