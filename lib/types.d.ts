import * as messages from "../generated/api_pb"
export declare class Payload extends messages.Payload {
  getData(): unknown
  getData_asB64(): string
  getData_asU8(): Uint8Array
  setData(value: unknown): void
}
export declare function createPayload(oldPayload: messages.Payload): Payload
export declare class Response extends messages.Response {
  getJson(): unknown
  getJson_asB64(): string
  getJson_asU8(): Uint8Array
  setJson(value: unknown): void
}
export declare function createResponse(oldResponse: messages.Response): Response
export declare class Mutation extends messages.Mutation {
  getSetJson(): unknown
  getSetJson_asB64(): string
  getSetJson_asU8(): Uint8Array
  setSetJson(value: unknown): void
  getDeleteJson(): unknown
  getDeleteJson_asB64(): string
  getDeleteJson_asU8(): Uint8Array
  setDeleteJson(value: unknown): void
  getSetNquads(): Uint8Array | string
  getSetNquads_asB64(): string
  getSetNquads_asU8(): Uint8Array
  setSetNquads(value: Uint8Array | string): void
  getDelNquads(): Uint8Array | string
  getDelNquads_asB64(): string
  getDelNquads_asU8(): Uint8Array
  setDelNquads(value: Uint8Array | string): void
}
