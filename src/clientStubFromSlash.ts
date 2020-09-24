//clientStubFromSlash

import * as grpc from "@grpc/grpc-js";
import { DgraphClientStub } from "./clientStub";
import * as Url from "url-parse";

const PORT = "443";
export function clientStubFromSlashGraphQLEndpoint(
    graphqlEndpoint: string,
    apiKey: string,
) {
    let url = new Url(graphqlEndpoint);
    let urlParts = url.host.split(".");
    let firstHalf = urlParts[0];
    let secondHalf = urlParts.splice(1).join(".") + ":" + PORT;
    let backenedURL = firstHalf + ".grpc." + secondHalf;

    const metaCreds = grpc.credentials.createFromMetadataGenerator(
        (_, callback) => {
            const metadata = new grpc.Metadata();
            metadata.add("authorization", apiKey);
            callback(null, metadata);
        },
    );
    let credentials = grpc.credentials.combineChannelCredentials(
        grpc.credentials.createSsl(),
        metaCreds,
    );
    return new DgraphClientStub(backenedURL, credentials);
}
