export const ERR_NO_CLIENTS = new Error("No clients provided in DgraphClient constructor");
export const ERR_FINISHED = new Error("Transaction has already been committed or discarded");
export const ERR_ABORTED = new Error("Transaction has been aborted. Please retry");
export const ERR_BEST_EFFORT_REQUIRED_READ_ONLY = new Error("Best effort only works for read-only queries");
