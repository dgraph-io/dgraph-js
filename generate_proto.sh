#!/bin/bash

protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary:./generated/ \
  --ts_out=service=true:./generated/ \
  --proto_path=./protos/ api.proto

yarn grpc_tools_node_protoc \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --grpc_out=grpc_js:./generated/ \
  --proto_path=./protos/ api.proto
