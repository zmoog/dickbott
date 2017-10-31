import "reflect-metadata";
import { Container, injectable } from "inversify";
import expect = require("expect.js");
import { Intent } from "../scripts/core/intent/Intent";
import { IIntentDispatcher } from "../scripts/core/dispatcher/IIntentDispatcher";
import { IntentDispatcher } from "../scripts/core/dispatcher/IntentDispatcher";
import { IntentTestName } from "./fixtures/IntentTestName";

let container = new Container();
container.bind<Intent<{}, void>>("IntentTestName").to(IntentTestName).inSingletonScope();

describe("Given a IntentDispacher", () => {
    let subject: IIntentDispatcher;

    beforeEach(() => {
        subject = new IntentDispatcher(container);
    });

    describe("and i want to process a intent but doesn't exist a manager of it", () => {
        it("Should trigger a error", async () => {
            let error: string;
            try {
                await subject.dispatch<{}, void>("notRegistered", {});
            } catch (e) {
                error = e;
            }

            expect(error).to.be.eql("Is not registered a Intent with this identifier notRegistered");
        });
    });

    describe("and i want to process a intent but exist a manager of it", () => {
        it("Should process it", async () => {
            expect(await subject.dispatch<{}, void>("IntentTestName", {})).to.be.eql(null);
        });
    });
});
