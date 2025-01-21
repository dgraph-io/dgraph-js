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
// Style guide for Protocol Buffer 3.
// Use PascalCase (camelCase with an initial capital) for message names – for example,
// SongServerRequest. Use snake_case (underscore_separated_names) for field names – for
// example, song_name.
//
"use strict"
var grpc = require("@grpc/grpc-js")
var api_pb = require("./api_pb.js")

function serialize_api_Check(arg) {
  if (!(arg instanceof api_pb.Check)) {
    throw new Error("Expected argument of type api.Check")
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_api_Check(buffer_arg) {
  return api_pb.Check.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_api_LoginRequest(arg) {
  if (!(arg instanceof api_pb.LoginRequest)) {
    throw new Error("Expected argument of type api.LoginRequest")
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_api_LoginRequest(buffer_arg) {
  return api_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_api_Operation(arg) {
  if (!(arg instanceof api_pb.Operation)) {
    throw new Error("Expected argument of type api.Operation")
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_api_Operation(buffer_arg) {
  return api_pb.Operation.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_api_Payload(arg) {
  if (!(arg instanceof api_pb.Payload)) {
    throw new Error("Expected argument of type api.Payload")
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_api_Payload(buffer_arg) {
  return api_pb.Payload.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_api_Request(arg) {
  if (!(arg instanceof api_pb.Request)) {
    throw new Error("Expected argument of type api.Request")
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_api_Request(buffer_arg) {
  return api_pb.Request.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_api_Response(arg) {
  if (!(arg instanceof api_pb.Response)) {
    throw new Error("Expected argument of type api.Response")
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_api_Response(buffer_arg) {
  return api_pb.Response.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_api_TxnContext(arg) {
  if (!(arg instanceof api_pb.TxnContext)) {
    throw new Error("Expected argument of type api.TxnContext")
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_api_TxnContext(buffer_arg) {
  return api_pb.TxnContext.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_api_Version(arg) {
  if (!(arg instanceof api_pb.Version)) {
    throw new Error("Expected argument of type api.Version")
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_api_Version(buffer_arg) {
  return api_pb.Version.deserializeBinary(new Uint8Array(buffer_arg))
}

// Graph response.
var DgraphService = (exports.DgraphService = {
  login: {
    path: "/api.Dgraph/Login",
    requestStream: false,
    responseStream: false,
    requestType: api_pb.LoginRequest,
    responseType: api_pb.Response,
    requestSerialize: serialize_api_LoginRequest,
    requestDeserialize: deserialize_api_LoginRequest,
    responseSerialize: serialize_api_Response,
    responseDeserialize: deserialize_api_Response,
  },
  query: {
    path: "/api.Dgraph/Query",
    requestStream: false,
    responseStream: false,
    requestType: api_pb.Request,
    responseType: api_pb.Response,
    requestSerialize: serialize_api_Request,
    requestDeserialize: deserialize_api_Request,
    responseSerialize: serialize_api_Response,
    responseDeserialize: deserialize_api_Response,
  },
  alter: {
    path: "/api.Dgraph/Alter",
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
    path: "/api.Dgraph/CommitOrAbort",
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
    path: "/api.Dgraph/CheckVersion",
    requestStream: false,
    responseStream: false,
    requestType: api_pb.Check,
    responseType: api_pb.Version,
    requestSerialize: serialize_api_Check,
    requestDeserialize: deserialize_api_Check,
    responseSerialize: serialize_api_Version,
    responseDeserialize: deserialize_api_Version,
  },
})

exports.DgraphClient = grpc.makeGenericClientConstructor(DgraphService)
