// package: api
// file: api.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as api_pb from "./api_pb";

interface IDgraphService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    login: IDgraphService_ILogin;
    query: IDgraphService_IQuery;
    alter: IDgraphService_IAlter;
    commitOrAbort: IDgraphService_ICommitOrAbort;
    checkVersion: IDgraphService_ICheckVersion;
}

interface IDgraphService_ILogin extends grpc.MethodDefinition<api_pb.LoginRequest, api_pb.Response> {
    path: "/api.Dgraph/Login";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.LoginRequest>;
    requestDeserialize: grpc.deserialize<api_pb.LoginRequest>;
    responseSerialize: grpc.serialize<api_pb.Response>;
    responseDeserialize: grpc.deserialize<api_pb.Response>;
}
interface IDgraphService_IQuery extends grpc.MethodDefinition<api_pb.Request, api_pb.Response> {
    path: "/api.Dgraph/Query";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.Request>;
    requestDeserialize: grpc.deserialize<api_pb.Request>;
    responseSerialize: grpc.serialize<api_pb.Response>;
    responseDeserialize: grpc.deserialize<api_pb.Response>;
}
interface IDgraphService_IAlter extends grpc.MethodDefinition<api_pb.Operation, api_pb.Payload> {
    path: "/api.Dgraph/Alter";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.Operation>;
    requestDeserialize: grpc.deserialize<api_pb.Operation>;
    responseSerialize: grpc.serialize<api_pb.Payload>;
    responseDeserialize: grpc.deserialize<api_pb.Payload>;
}
interface IDgraphService_ICommitOrAbort extends grpc.MethodDefinition<api_pb.TxnContext, api_pb.TxnContext> {
    path: "/api.Dgraph/CommitOrAbort";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.TxnContext>;
    requestDeserialize: grpc.deserialize<api_pb.TxnContext>;
    responseSerialize: grpc.serialize<api_pb.TxnContext>;
    responseDeserialize: grpc.deserialize<api_pb.TxnContext>;
}
interface IDgraphService_ICheckVersion extends grpc.MethodDefinition<api_pb.Check, api_pb.Version> {
    path: "/api.Dgraph/CheckVersion";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.Check>;
    requestDeserialize: grpc.deserialize<api_pb.Check>;
    responseSerialize: grpc.serialize<api_pb.Version>;
    responseDeserialize: grpc.deserialize<api_pb.Version>;
}

export const DgraphService: IDgraphService;

export interface IDgraphServer {
    login: grpc.handleUnaryCall<api_pb.LoginRequest, api_pb.Response>;
    query: grpc.handleUnaryCall<api_pb.Request, api_pb.Response>;
    alter: grpc.handleUnaryCall<api_pb.Operation, api_pb.Payload>;
    commitOrAbort: grpc.handleUnaryCall<api_pb.TxnContext, api_pb.TxnContext>;
    checkVersion: grpc.handleUnaryCall<api_pb.Check, api_pb.Version>;
}

export interface IDgraphClient {
    login(request: api_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    login(request: api_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    login(request: api_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    query(request: api_pb.Request, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    query(request: api_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    query(request: api_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    alter(request: api_pb.Operation, callback: (error: grpc.ServiceError | null, response: api_pb.Payload) => void): grpc.ClientUnaryCall;
    alter(request: api_pb.Operation, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Payload) => void): grpc.ClientUnaryCall;
    alter(request: api_pb.Operation, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Payload) => void): grpc.ClientUnaryCall;
    commitOrAbort(request: api_pb.TxnContext, callback: (error: grpc.ServiceError | null, response: api_pb.TxnContext) => void): grpc.ClientUnaryCall;
    commitOrAbort(request: api_pb.TxnContext, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TxnContext) => void): grpc.ClientUnaryCall;
    commitOrAbort(request: api_pb.TxnContext, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TxnContext) => void): grpc.ClientUnaryCall;
    checkVersion(request: api_pb.Check, callback: (error: grpc.ServiceError | null, response: api_pb.Version) => void): grpc.ClientUnaryCall;
    checkVersion(request: api_pb.Check, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Version) => void): grpc.ClientUnaryCall;
    checkVersion(request: api_pb.Check, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Version) => void): grpc.ClientUnaryCall;
}

export class DgraphClient extends grpc.Client implements IDgraphClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public login(request: api_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    public login(request: api_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    public login(request: api_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    public query(request: api_pb.Request, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    public query(request: api_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    public query(request: api_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Response) => void): grpc.ClientUnaryCall;
    public alter(request: api_pb.Operation, callback: (error: grpc.ServiceError | null, response: api_pb.Payload) => void): grpc.ClientUnaryCall;
    public alter(request: api_pb.Operation, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Payload) => void): grpc.ClientUnaryCall;
    public alter(request: api_pb.Operation, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Payload) => void): grpc.ClientUnaryCall;
    public commitOrAbort(request: api_pb.TxnContext, callback: (error: grpc.ServiceError | null, response: api_pb.TxnContext) => void): grpc.ClientUnaryCall;
    public commitOrAbort(request: api_pb.TxnContext, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TxnContext) => void): grpc.ClientUnaryCall;
    public commitOrAbort(request: api_pb.TxnContext, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TxnContext) => void): grpc.ClientUnaryCall;
    public checkVersion(request: api_pb.Check, callback: (error: grpc.ServiceError | null, response: api_pb.Version) => void): grpc.ClientUnaryCall;
    public checkVersion(request: api_pb.Check, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.Version) => void): grpc.ClientUnaryCall;
    public checkVersion(request: api_pb.Check, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.Version) => void): grpc.ClientUnaryCall;
}
