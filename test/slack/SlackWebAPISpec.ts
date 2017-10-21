import { IMock, Mock, Times, It } from "typemoq";
import { PostMessageRequest, SlackWebAPIResponse } from "../../scripts/slack/Types";
import { IHttpClient } from "../../scripts/http/IHttpClient";
import { ISlackWebAPI } from "../../scripts/slack/ISlackWebAPI";
import { SlackWebAPI } from "../../scripts/slack/SlackWebAPI";
import expect = require("expect.js");


describe("SlackWebAPISpec, given a message to send in a Slack channel", () => {

    let slack: ISlackWebAPI,
        httpClient: IMock<IHttpClient>;

    context("when when you send a message", () => {

        beforeEach(() => {
            httpClient = Mock.ofType<IHttpClient>();
            httpClient.setup(c => {
                c.post<PostMessageRequest, SlackWebAPIResponse>(It.isAnyString(), It.isAny());
            }).returns(
                () => Promise.resolve({
                    ok: true
                })
                );

            slack = new SlackWebAPI(
                {
                    botUserOAuthAccessToken: "slack-bot-user-token",
                    defaultChannel: "#mururoa"
                },
                httpClient.object);
        });

        it("should return a response with the operation status", async () => {

            let response = await slack.postMessage({ text: "suca", channel: "#mururoa" });

            expect(response.ok).to.be(true);
        });
    });
});
