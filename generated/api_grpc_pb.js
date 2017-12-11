// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
//
// Copyright (C) 2017 Dgraph Labs, Inc. and Contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var api_pb = require('./api_pb.js');

function serialize_api_Assigned(arg) {
  if (!(arg instanceof api_pb.Assigned)) {
    throw new Error('Expected argument of type api.Assigned');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_Assigned(buffer_arg) {
  return api_pb.Assigned.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_Check(arg) {
  if (!(arg instanceof api_pb.Check)) {
    throw new Error('Expected argument of type api.Check');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_Check(buffer_arg) {
  return api_pb.Check.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_Mutation(arg) {
  if (!(arg instanceof api_pb.Mutation)) {
    throw new Error('Expected argument of type api.Mutation');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_Mutation(buffer_arg) {
  return api_pb.Mutation.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_Operation(arg) {
  if (!(arg instanceof api_pb.Operation)) {
    throw new Error('Expected argument of type api.Operation');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_Operation(buffer_arg) {
  return api_pb.Operation.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_Payload(arg) {
  if (!(arg instanceof api_pb.Payload)) {
    throw new Error('Expected argument of type api.Payload');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_Payload(buffer_arg) {
  return api_pb.Payload.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_Request(arg) {
  if (!(arg instanceof api_pb.Request)) {
    throw new Error('Expected argument of type api.Request');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_Request(buffer_arg) {
  return api_pb.Request.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_Response(arg) {
  if (!(arg instanceof api_pb.Response)) {
    throw new Error('Expected argument of type api.Response');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_Response(buffer_arg) {
  return api_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_TxnContext(arg) {
  if (!(arg instanceof api_pb.TxnContext)) {
    throw new Error('Expected argument of type api.TxnContext');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_TxnContext(buffer_arg) {
  return api_pb.TxnContext.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_Version(arg) {
  if (!(arg instanceof api_pb.Version)) {
    throw new Error('Expected argument of type api.Version');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_Version(buffer_arg) {
  return api_pb.Version.deserializeBinary(new Uint8Array(buffer_arg));
}


// Graph response.
var DgraphService = exports.DgraphService = {
  query: {
    path: '/api.Dgraph/Query',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.Request,
    responseType: api_pb.Response,
    requestSerialize: serialize_api_Request,
    requestDeserialize: deserialize_api_Request,
    responseSerialize: serialize_api_Response,
    responseDeserialize: deserialize_api_Response,
  },
  mutate: {
    path: '/api.Dgraph/Mutate',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.Mutation,
    responseType: api_pb.Assigned,
    requestSerialize: serialize_api_Mutation,
    requestDeserialize: deserialize_api_Mutation,
    responseSerialize: serialize_api_Assigned,
    responseDeserialize: deserialize_api_Assigned,
  },
  alter: {
    path: '/api.Dgraph/Alter',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.Operation,
    responseType: api_pb.Payload,
    requestSerialize: serialize_api_Operation,
    requestDeserialize: deserialize_api_Operation,
    responseSerialize: serialize_api_Payload,
    responseDeserialize: deserialize_api_Payload,
  },
  commitOrAbort: {
    path: '/api.Dgraph/CommitOrAbort',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.TxnContext,
    responseType: api_pb.TxnContext,
    requestSerialize: serialize_api_TxnContext,
    requestDeserialize: deserialize_api_TxnContext,
    responseSerialize: serialize_api_TxnContext,
    responseDeserialize: deserialize_api_TxnContext,
  },
  checkVersion: {
    path: '/api.Dgraph/CheckVersion',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.Check,
    responseType: api_pb.Version,
    requestSerialize: serialize_api_Check,
    requestDeserialize: deserialize_api_Check,
    responseSerialize: serialize_api_Version,
    responseDeserialize: deserialize_api_Version,
  },
};

exports.DgraphClient = grpc.makeGenericClientConstructor(DgraphService);
