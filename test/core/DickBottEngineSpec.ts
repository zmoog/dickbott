import "reflect-metadata";
import { interfaces } from "inversify";
import { IMock, Mock, Times } from "typemoq";
import { DickBottEngine } from "../../scripts/core/DickBottEngine";
import { IIntentRegistry } from "../../scripts/core/intent/IIntentRegistry";
import { DefaultContainer } from "../../scripts/core/utils/containerDecorators";
import { Test1Intent } from "../fixtures/IntentTestName";
import expect = require("expect.js");
import { TestModule } from "../fixtures/TestModule";

describe("Given a DickBottEngine", () => {
    let subject: DickBottEngine,
        container: interfaces.Container,
        intentRegistry: IMock<IIntentRegistry>;

    beforeEach(() => {
        container = DefaultContainer;
        intentRegistry = Mock.ofType<IIntentRegistry>();
        subject = new DickBottEngine(container, () => intentRegistry.object);
    });

    context("when adding a new intent", () => {
        it("should add it with the corrent name", () => {
            subject.registerIntent(Test1Intent);
            intentRegistry.verify(i => i.add(Test1Intent), Times.once());
        });
    });

    context("when register a new module", () => {
        beforeEach(() => {
            subject.registerModule(new TestModule());
        })

        it("should bind every service", () => {
            expect(container.get("TestConstant")).to.be.eql("test");
        });

        it("should register every intent", () => {
            intentRegistry.verify(i => i.add(Test1Intent), Times.once());
        });
    });
});