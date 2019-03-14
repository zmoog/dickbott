import "reflect-metadata";
import { IMock, Mock, Times, It } from "typemoq";
import { IHttpClient } from "../../scripts/core/http/v2/IHttpClient";
import { BasecampService, BasecampConfig } from "../../scripts/basecamp/BasecampService"
import { IBasecampService } from "../../scripts/basecamp/IBasecampService"
import expect = require("expect.js");


describe("BasecampService, given a message to send to a Campfire in Basecamp", () => {

    let basecamp: IBasecampService,
        httpClient: IMock<IHttpClient>,
        basecampConfig: BasecampConfig;

    beforeEach(() => {
        httpClient = Mock.ofType<IHttpClient>();
        basecampConfig = {
            campfireUrl: "https://3.basecamp.com/1/integrations/ABC123/buckets/1/chats/1/lines"
        };

        basecamp = new BasecampService(basecampConfig, httpClient.object);
    });

    context("when sending is successful", () => {

        beforeEach(() => {
            httpClient.setup(client => {
                client.process<string, string>(It.isAny());
            }).returns(async () => (""));
        });

        it("should send the message quitely", async () => {
            await basecamp.postMessage("Hello from mocha");
        });
    });

    context("when sending goes wrong", () => {
        beforeEach(() => {
            httpClient.setup(client => {
                client.process<string, string>(It.isAny());
            }).throws(new Error("D'oh!"));
        });

        it("should raise a error reporting error details", async () => {
            let error: string;
            try {
                await basecamp.postMessage("Hello from mocha");
            } catch (e) {
                error = e.toString();
            }

            expect(error).to.be.eql("Error: D'oh!");
        });
    });
});
