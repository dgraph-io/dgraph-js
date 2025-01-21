// package: api
// file: api.proto

var api_pb = require("./api_pb")
var grpc = require("@improbable-eng/grpc-web").grpc

var Dgraph = (function () {
  function Dgraph() {}
  Dgraph.serviceName = "api.Dgraph"
  return Dgraph
})()

Dgraph.Login = {
  methodName: "Login",
  service: Dgraph,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.LoginRequest,
  responseType: api_pb.Response,
}

Dgraph.Query = {
  methodName: "Query",
  service: Dgraph,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.Request,
  responseType: api_pb.Response,
}

Dgraph.Alter = {
  methodName: "Alter",
  service: Dgraph,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.Operation,
  responseType: api_pb.Payload,
}

Dgraph.CommitOrAbort = {
  methodName: "CommitOrAbort",
  service: Dgraph,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.TxnContext,
  responseType: api_pb.TxnContext,
}

Dgraph.CheckVersion = {
  methodName: "CheckVersion",
  service: Dgraph,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.Check,
  responseType: api_pb.Version,
}

exports.Dgraph = Dgraph

function DgraphClient(serviceHost, options) {
  this.serviceHost = serviceHost
  this.options = options || {}
}

DgraphClient.prototype.login = function login(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1]
  }
  var client = grpc.unary(Dgraph.Login, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage)
          err.code = response.status
          err.metadata = response.trailers
          callback(err, null)
        } else {
          callback(null, response.message)
        }
      }
    },
  })
  return {
    cancel: function () {
      callback = null
      client.close()
    },
  }
}

DgraphClient.prototype.query = function query(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1]
  }
  var client = grpc.unary(Dgraph.Query, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage)
          err.code = response.status
          err.metadata = response.trailers
          callback(err, null)
        } else {
          callback(null, response.message)
        }
      }
    },
  })
  return {
    cancel: function () {
      callback = null
      client.close()
    },
  }
}

DgraphClient.prototype.alter = function alter(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1]
  }
  var client = grpc.unary(Dgraph.Alter, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage)
          err.code = response.status
          err.metadata = response.trailers
          callback(err, null)
        } else {
          callback(null, response.message)
        }
      }
    },
  })
  return {
    cancel: function () {
      callback = null
      client.close()
    },
  }
}

DgraphClient.prototype.commitOrAbort = function commitOrAbort(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1]
  }
  var client = grpc.unary(Dgraph.CommitOrAbort, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage)
          err.code = response.status
          err.metadata = response.trailers
          callback(err, null)
        } else {
          callback(null, response.message)
        }
      }
    },
  })
  return {
    cancel: function () {
      callback = null
      client.close()
    },
  }
}

DgraphClient.prototype.checkVersion = function checkVersion(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1]
  }
  var client = grpc.unary(Dgraph.CheckVersion, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage)
          err.code = response.status
          err.metadata = response.trailers
          callback(err, null)
        } else {
          callback(null, response.message)
        }
      }
    },
  })
  return {
    cancel: function () {
      callback = null
      client.close()
    },
  }
}

exports.DgraphClient = DgraphClient
