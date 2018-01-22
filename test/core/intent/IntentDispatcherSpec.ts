import "reflect-metadata";
import { Container, injectable } from "inversify";
import expect = require("expect.js");
import { Intent } from "../../../scripts/core/intent/Intent";
import { IIntentDispatcher } from "../../../scripts/core/dispatcher/IIntentDispatcher";
import { IntentDispatcher } from "../../../scripts/core/dispatcher/IntentDispatcher";
import { IntentTestName } from "../../fixtures/IntentTestName";
import { IIntentRepository } from "../../../scripts/core/intent/IIntentRepository";
import { IMock, Mock } from "typemoq";

let container = new Container();
container.bind<Intent<{}, void>>("Intent").to(IntentTestName).whenTargetNamed("IntentTestName");

describe("Given a IntentDispacher", () => {
    let subject: IIntentDispatcher,
        intentRepository: IMock<IIntentRepository>;

    beforeEach(() => {
        intentRepository = Mock.ofType<IIntentRepository>();
        subject = new IntentDispatcher(container, intentRepository.object);
    });

    describe("and i want to process a intent but doesn't exist a manager of it", () => {
        it("Should trigger a error", async () => {
            let error: string;
            try {
                await subject.dispatch<{}, void>("notRegistered", {});
            } catch (e) {
                error = e;
            }

            expect(error).to.be.eql("Cannot find any Intent registered with the identifier 'notRegistered'.");
        });
    });

    describe("and i want to process a intent but exist a manager of it", () => {
        it("Should process it", async () => {
            expect(await subject.dispatch<{}, void>("IntentTestName", {})).to.be.eql(null);
        });
    });
});
