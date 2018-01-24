// package: api
// file: api.proto

import * as grpc from "grpc";
import * as api_pb from "./api_pb";

export class DgraphClient extends grpc.Client {
    public alter(operation: api_pb.Operation, callback: (err?: Error | null, res?: api_pb.Payload) => void): void;
    public query(request: api_pb.Request, callback: (err?: Error | null, res?: api_pb.Response) => void): void;
    public mutate(request: api_pb.Mutation, callback: (err?: Error | null, res?: api_pb.Assigned) => void): void;
    public commitOrAbort(request: api_pb.TxnContext, callback: (err?: Error | null, res?: api_pb.TxnContext) => void): void;
    public checkVersion(request: api_pb.Check, callback: (err?: Error | null, res?: api_pb.Version) => void): void;
}
