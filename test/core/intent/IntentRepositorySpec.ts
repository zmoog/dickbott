import "reflect-metadata";
import { IMock, Mock, Times, It } from "typemoq";
import expect = require("expect.js");
import { IIntentRepository } from "../../../scripts/core/intent/IIntentRepository";


describe.skip("Given an IntentRepository", () => {

    let repository: IIntentRepository;

    beforeEach(() => {
        // repository = new InMemoryIntentRepository();
    });

    context("when the intent is created from a user input and stored in the repository", () => {

        let intentName = "TestIntent";
        let intentEntities = {
            hello: true
        };

        it("should return a intent id composed by the intent name and 7-14 chars suffix separated by a dash ('-') sign.", async () => {

            let id = await repository.put(
                {
                    name: intentName,
                    entities: intentEntities
                }
            );
            // console.log(`id: ${id}`);

            expect(id).to.match(/TestIntent-\w{7,14}/);
        });

        it("should return a previously stored intent using the generated ID", async () => {

            let id = await repository.put({
                name: intentName,
                entities: intentEntities
            });

            let intentInstance = await repository.get(id);

            expect(intentInstance).to.be.eql({
                name: intentName,
                entities: intentEntities
            });
        });
    });

    context("when repository is empty", () => {
        it("should return a response value of 'undefined'", async () => {
            let intentInstance = await repository.get("not-existent-execution-id");
            expect(intentInstance).to.be.eql(undefined);
        });
    });
});
