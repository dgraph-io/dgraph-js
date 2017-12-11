"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERR_NO_CLIENTS = new Error("No clients provided in DgraphClient constructor");
exports.ERR_FINISHED = new Error("Transaction has already been committed or discarded");
exports.ERR_ABORTED = new Error("Transaction has been aborted. Please retry");
