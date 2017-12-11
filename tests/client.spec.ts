import * as dgraph from "../src";

describe("client", () => {
    describe("constructor", () => {
        it("should throw no clients error if no client stubs are passed", () => {
            expect.assertions(1);

            try {
                // tslint:disable-next-line no-unused-expression
                new dgraph.DgraphClient();
            } catch (e) {
                expect(e).toBe(dgraph.ERR_NO_CLIENTS);
            }
        });
    });
});
