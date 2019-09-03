"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERR_NO_CLIENTS = new Error("No clients provided in DgraphClient constructor");
exports.ERR_FINISHED = new Error("Transaction has already been committed or discarded");
exports.ERR_ABORTED = new Error("Transaction has been aborted. Please retry");
exports.ERR_BEST_EFFORT_REQUIRED_READ_ONLY = new Error("Best effort only works for read-only queries");
exports.ERR_READ_ONLY = new Error("Readonly transaction cannot run mutations or be committed");
