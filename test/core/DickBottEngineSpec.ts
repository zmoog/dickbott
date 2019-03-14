import "reflect-metadata";
import { DickBottEngine } from "../../scripts/core/DickBottEngine";
import { interfaces } from "inversify";
import { Intent } from "../../scripts/core/intent/Intent";
import { DefaultContainer } from "../../scripts/core/utils/containerDecorators";
import expect = require("expect.js");
import { Test1Intent } from "../fixtures/IntentTestName";

describe("Given a DickBottEngine", () => {
    let subject: DickBottEngine,
        container: interfaces.Container;

    beforeEach(() => {
        container = DefaultContainer;
        subject = new DickBottEngine(container);
    });

    context("when adding a new intent", () => {
        it("should add it with the corrent name", () => {
            subject.registerIntent(Test1Intent);
            expect(container.getNamed<Intent<any, any>>("Intent", "Test 1 Intent")).to.be.ok();
        });
    });
});