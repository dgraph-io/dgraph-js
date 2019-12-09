// package: api
// file: api.proto

import * as jspb from "google-protobuf";

export class Request extends jspb.Message {
  getStartTs(): number;
  setStartTs(value: number): void;

  getQuery(): string;
  setQuery(value: string): void;

  getVarsMap(): jspb.Map<string, string>;
  clearVarsMap(): void;
  getReadOnly(): boolean;
  setReadOnly(value: boolean): void;

  getBestEffort(): boolean;
  setBestEffort(value: boolean): void;

  clearMutationsList(): void;
  getMutationsList(): Array<Mutation>;
  setMutationsList(value: Array<Mutation>): void;
  addMutations(value?: Mutation, index?: number): Mutation;

  getCommitNow(): boolean;
  setCommitNow(value: boolean): void;

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
  }
}

export class Uids extends jspb.Message {
  clearUidsList(): void;
  getUidsList(): Array<string>;
  setUidsList(value: Array<string>): void;
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

export class Response extends jspb.Message {
  getJson(): Uint8Array | string;
  getJson_asU8(): Uint8Array;
  getJson_asB64(): string;
  setJson(value: Uint8Array | string): void;

  hasTxn(): boolean;
  clearTxn(): void;
  getTxn(): TxnContext | undefined;
  setTxn(value?: TxnContext): void;

  hasLatency(): boolean;
  clearLatency(): void;
  getLatency(): Latency | undefined;
  setLatency(value?: Latency): void;

  hasMetrics(): boolean;
  clearMetrics(): void;
  getMetrics(): Metrics | undefined;
  setMetrics(value?: Metrics): void;

  getUidsMap(): jspb.Map<string, string>;
  clearUidsMap(): void;
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
  }
}

export class Mutation extends jspb.Message {
  getSetJson(): Uint8Array | string;
  getSetJson_asU8(): Uint8Array;
  getSetJson_asB64(): string;
  setSetJson(value: Uint8Array | string): void;

  getDeleteJson(): Uint8Array | string;
  getDeleteJson_asU8(): Uint8Array;
  getDeleteJson_asB64(): string;
  setDeleteJson(value: Uint8Array | string): void;

  getSetNquads(): Uint8Array | string;
  getSetNquads_asU8(): Uint8Array;
  getSetNquads_asB64(): string;
  setSetNquads(value: Uint8Array | string): void;

  getDelNquads(): Uint8Array | string;
  getDelNquads_asU8(): Uint8Array;
  getDelNquads_asB64(): string;
  setDelNquads(value: Uint8Array | string): void;

  clearSetList(): void;
  getSetList(): Array<NQuad>;
  setSetList(value: Array<NQuad>): void;
  addSet(value?: NQuad, index?: number): NQuad;

  clearDelList(): void;
  getDelList(): Array<NQuad>;
  setDelList(value: Array<NQuad>): void;
  addDel(value?: NQuad, index?: number): NQuad;

  getCond(): string;
  setCond(value: string): void;

  getCommitNow(): boolean;
  setCommitNow(value: boolean): void;

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
  setSchema(value: string): void;

  getDropAttr(): string;
  setDropAttr(value: string): void;

  getDropAll(): boolean;
  setDropAll(value: boolean): void;

  getDropOp(): Operation.DropOpMap[keyof Operation.DropOpMap];
  setDropOp(value: Operation.DropOpMap[keyof Operation.DropOpMap]): void;

  getDropValue(): string;
  setDropValue(value: string): void;

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
    dropOp: Operation.DropOpMap[keyof Operation.DropOpMap],
    dropValue: string,
  }

  export interface DropOpMap {
    NONE: 0;
    ALL: 1;
    DATA: 2;
    ATTR: 3;
    TYPE: 4;
  }

  export const DropOp: DropOpMap;
}

export class Payload extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

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
  setStartTs(value: number): void;

  getCommitTs(): number;
  setCommitTs(value: number): void;

  getAborted(): boolean;
  setAborted(value: boolean): void;

  clearKeysList(): void;
  getKeysList(): Array<string>;
  setKeysList(value: Array<string>): void;
  addKeys(value: string, index?: number): string;

  clearPredsList(): void;
  getPredsList(): Array<string>;
  setPredsList(value: Array<string>): void;
  addPreds(value: string, index?: number): string;

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
  setTag(value: string): void;

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
  setParsingNs(value: number): void;

  getProcessingNs(): number;
  setProcessingNs(value: number): void;

  getEncodingNs(): number;
  setEncodingNs(value: number): void;

  getAssignTimestampNs(): number;
  setAssignTimestampNs(value: number): void;

  getTotalNs(): number;
  setTotalNs(value: number): void;

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
  setSubject(value: string): void;

  getPredicate(): string;
  setPredicate(value: string): void;

  getObjectId(): string;
  setObjectId(value: string): void;

  hasObjectValue(): boolean;
  clearObjectValue(): void;
  getObjectValue(): Value | undefined;
  setObjectValue(value?: Value): void;

  getLabel(): string;
  setLabel(value: string): void;

  getLang(): string;
  setLang(value: string): void;

  clearFacetsList(): void;
  getFacetsList(): Array<Facet>;
  setFacetsList(value: Array<Facet>): void;
  addFacets(value?: Facet, index?: number): Facet;

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
    label: string,
    lang: string,
    facetsList: Array<Facet.AsObject>,
  }
}

export class Value extends jspb.Message {
  hasDefaultVal(): boolean;
  clearDefaultVal(): void;
  getDefaultVal(): string;
  setDefaultVal(value: string): void;

  hasBytesVal(): boolean;
  clearBytesVal(): void;
  getBytesVal(): Uint8Array | string;
  getBytesVal_asU8(): Uint8Array;
  getBytesVal_asB64(): string;
  setBytesVal(value: Uint8Array | string): void;

  hasIntVal(): boolean;
  clearIntVal(): void;
  getIntVal(): number;
  setIntVal(value: number): void;

  hasBoolVal(): boolean;
  clearBoolVal(): void;
  getBoolVal(): boolean;
  setBoolVal(value: boolean): void;

  hasStrVal(): boolean;
  clearStrVal(): void;
  getStrVal(): string;
  setStrVal(value: string): void;

  hasDoubleVal(): boolean;
  clearDoubleVal(): void;
  getDoubleVal(): number;
  setDoubleVal(value: number): void;

  hasGeoVal(): boolean;
  clearGeoVal(): void;
  getGeoVal(): Uint8Array | string;
  getGeoVal_asU8(): Uint8Array;
  getGeoVal_asB64(): string;
  setGeoVal(value: Uint8Array | string): void;

  hasDateVal(): boolean;
  clearDateVal(): void;
  getDateVal(): Uint8Array | string;
  getDateVal_asU8(): Uint8Array;
  getDateVal_asB64(): string;
  setDateVal(value: Uint8Array | string): void;

  hasDatetimeVal(): boolean;
  clearDatetimeVal(): void;
  getDatetimeVal(): Uint8Array | string;
  getDatetimeVal_asU8(): Uint8Array;
  getDatetimeVal_asB64(): string;
  setDatetimeVal(value: Uint8Array | string): void;

  hasPasswordVal(): boolean;
  clearPasswordVal(): void;
  getPasswordVal(): string;
  setPasswordVal(value: string): void;

  hasUidVal(): boolean;
  clearUidVal(): void;
  getUidVal(): number;
  setUidVal(value: number): void;

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
  setKey(value: string): void;

  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  getValType(): Facet.ValTypeMap[keyof Facet.ValTypeMap];
  setValType(value: Facet.ValTypeMap[keyof Facet.ValTypeMap]): void;

  clearTokensList(): void;
  getTokensList(): Array<string>;
  setTokensList(value: Array<string>): void;
  addTokens(value: string, index?: number): string;

  getAlias(): string;
  setAlias(value: string): void;

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
    valType: Facet.ValTypeMap[keyof Facet.ValTypeMap],
    tokensList: Array<string>,
    alias: string,
  }

  export interface ValTypeMap {
    STRING: 0;
    INT: 1;
    FLOAT: 2;
    BOOL: 3;
    DATETIME: 4;
  }

  export const ValType: ValTypeMap;
}

export class LoginRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getRefreshToken(): string;
  setRefreshToken(value: string): void;

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
  }
}

export class Jwt extends jspb.Message {
  getAccessJwt(): string;
  setAccessJwt(value: string): void;

  getRefreshJwt(): string;
  setRefreshJwt(value: string): void;

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

