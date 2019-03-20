import "reflect-metadata";
import { Container, injectable } from "inversify";
import expect = require("expect.js");
import { Intent } from "../../../scripts/core/intent/Intent";
import { IIntentDispatcher } from "../../../scripts/core/dispatcher/IIntentDispatcher";
import { IntentDispatcher } from "../../../scripts/core/dispatcher/IntentDispatcher";
import { Test1Intent, Test2Intent } from "../../fixtures/IntentTestName";
import { IIntentRepository } from "../../../scripts/core/intent/IIntentRepository";
import { IMock, Mock } from "typemoq";
import { IIntentRegistry } from "../../../scripts/core/intent/IIntentRegistry";

describe("Given a IntentDispacher", () => {
    let subject: IIntentDispatcher,
        intentRegistry: IMock<IIntentRegistry>,
        intentRepository: IMock<IIntentRepository>;

    beforeEach(() => {
        intentRepository = Mock.ofType<IIntentRepository>();
        intentRegistry = Mock.ofType<IIntentRegistry>();
        subject = new IntentDispatcher(intentRegistry.object, intentRepository.object);

        intentRegistry.setup(i => i.get("Test2Intent")).returns(() => new Test2Intent());
        intentRegistry.setup(i => i.get("Test1Intent")).returns(() => new Test1Intent());
    });

    describe("and i want to process a intent but doesn't exist a manager of it", () => {
        beforeEach(() => {
            intentRegistry.setup(i => i.get("notRegistered")).throws(new Error("Error"));
        })
        it("Should trigger a error", async () => {

            let error: string;
            try {
                await subject.dispatch<{}, void>("notRegistered", {});
            } catch (e) {
                error = e;
            }

            expect(error).to.be.ok();
        });
    });

    describe("and i want to process a intent but exist a manager of it", () => {
        it("Should process it", async () => {
            expect(await subject.dispatch<string, string>("Test1Intent", "input-text-1")).to.be.eql("test1");
            expect(await subject.dispatch<string, string>("Test2Intent", "input-text-2")).to.be.eql("test2");
        });
    });
});
