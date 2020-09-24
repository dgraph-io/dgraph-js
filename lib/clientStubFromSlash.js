"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientStubFromSlashGraphQLEndpoint = void 0;
var grpc = require("@grpc/grpc-js");
var clientStub_1 = require("./clientStub");
var Url = require("url-parse");
var PORT = "443";
function clientStubFromSlashGraphQLEndpoint(graphqlEndpoint, apiKey) {
    var url = new Url(graphqlEndpoint);
    var urlParts = url.host.split(".");
    var firstHalf = urlParts[0];
    var secondHalf = urlParts.splice(1).join(".") + ":" + PORT;
    var backenedURL = firstHalf + ".grpc." + secondHalf;
    console.log(backenedURL);
    var metaCreds = grpc.credentials.createFromMetadataGenerator(function (_, callback) {
        var metadata = new grpc.Metadata();
        metadata.add("authorization", apiKey);
        callback(null, metadata);
    });
    var credentials = grpc.credentials.combineChannelCredentials(grpc.credentials.createSsl(), metaCreds);
    return new clientStub_1.DgraphClientStub(backenedURL, credentials);
}
exports.clientStubFromSlashGraphQLEndpoint = clientStubFromSlashGraphQLEndpoint;
