// package: api
// file: api.proto

import * as api_pb from "./api_pb"
import { grpc } from "@improbable-eng/grpc-web"

type DgraphLogin = {
  readonly methodName: string
  readonly service: typeof Dgraph
  readonly requestStream: false
  readonly responseStream: false
  readonly requestType: typeof api_pb.LoginRequest
  readonly responseType: typeof api_pb.Response
}

type DgraphQuery = {
  readonly methodName: string
  readonly service: typeof Dgraph
  readonly requestStream: false
  readonly responseStream: false
  readonly requestType: typeof api_pb.Request
  readonly responseType: typeof api_pb.Response
}

type DgraphAlter = {
  readonly methodName: string
  readonly service: typeof Dgraph
  readonly requestStream: false
  readonly responseStream: false
  readonly requestType: typeof api_pb.Operation
  readonly responseType: typeof api_pb.Payload
}

type DgraphCommitOrAbort = {
  readonly methodName: string
  readonly service: typeof Dgraph
  readonly requestStream: false
  readonly responseStream: false
  readonly requestType: typeof api_pb.TxnContext
  readonly responseType: typeof api_pb.TxnContext
}

type DgraphCheckVersion = {
  readonly methodName: string
  readonly service: typeof Dgraph
  readonly requestStream: false
  readonly responseStream: false
  readonly requestType: typeof api_pb.Check
  readonly responseType: typeof api_pb.Version
}

export namespace Dgraph {
  export const serviceName: string
  export const Login: DgraphLogin
  export const Query: DgraphQuery
  export const Alter: DgraphAlter
  export const CommitOrAbort: DgraphCommitOrAbort
  export const CheckVersion: DgraphCheckVersion
}

export type ServiceError = {
  message: string
  code: number
  metadata: grpc.Metadata
}
export type Status = { details: string; code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void
}
interface ResponseStream<T> {
  cancel(): void
  on(type: "data", handler: (message: T) => void): ResponseStream<T>
  on(type: "end", handler: (status?: Status) => void): ResponseStream<T>
  on(type: "status", handler: (status: Status) => void): ResponseStream<T>
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>
  end(): void
  cancel(): void
  on(type: "end", handler: (status?: Status) => void): RequestStream<T>
  on(type: "status", handler: (status: Status) => void): RequestStream<T>
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>
  end(): void
  cancel(): void
  on(type: "data", handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>
  on(type: "end", handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>
  on(type: "status", handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>
}

export class DgraphClient {
  readonly serviceHost: string

  constructor(serviceHost: string, options?: grpc.RpcOptions)
  login(
    requestMessage: api_pb.LoginRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError | null, responseMessage: api_pb.Response | null) => void,
  ): UnaryResponse
  login(
    requestMessage: api_pb.LoginRequest,
    callback: (error: ServiceError | null, responseMessage: api_pb.Response | null) => void,
  ): UnaryResponse
  query(
    requestMessage: api_pb.Request,
    metadata: grpc.Metadata,
    callback: (error: ServiceError | null, responseMessage: api_pb.Response | null) => void,
  ): UnaryResponse
  query(
    requestMessage: api_pb.Request,
    callback: (error: ServiceError | null, responseMessage: api_pb.Response | null) => void,
  ): UnaryResponse
  alter(
    requestMessage: api_pb.Operation,
    metadata: grpc.Metadata,
    callback: (error: ServiceError | null, responseMessage: api_pb.Payload | null) => void,
  ): UnaryResponse
  alter(
    requestMessage: api_pb.Operation,
    callback: (error: ServiceError | null, responseMessage: api_pb.Payload | null) => void,
  ): UnaryResponse
  commitOrAbort(
    requestMessage: api_pb.TxnContext,
    metadata: grpc.Metadata,
    callback: (error: ServiceError | null, responseMessage: api_pb.TxnContext | null) => void,
  ): UnaryResponse
  commitOrAbort(
    requestMessage: api_pb.TxnContext,
    callback: (error: ServiceError | null, responseMessage: api_pb.TxnContext | null) => void,
  ): UnaryResponse
  checkVersion(
    requestMessage: api_pb.Check,
    metadata: grpc.Metadata,
    callback: (error: ServiceError | null, responseMessage: api_pb.Version | null) => void,
  ): UnaryResponse
  checkVersion(
    requestMessage: api_pb.Check,
    callback: (error: ServiceError | null, responseMessage: api_pb.Version | null) => void,
  ): UnaryResponse
}
