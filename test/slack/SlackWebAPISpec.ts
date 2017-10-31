import "reflect-metadata";
import { IMock, Mock, Times, It } from "typemoq";
import expect = require("expect.js");
import { ISlackWebAPI } from "../../scripts/slack/ISlackWebAPI";
import { IHttpClient } from "../../scripts/core/http/IHttpClient";
import { PostMessageRequest, SlackConfig, SlackWebAPIResponse } from "../../scripts/slack/Types";
import { SlackWebAPI } from "../../scripts/slack/SlackWebAPI";

describe("SlackWebAPISpec, given a message to send in a Slack channel", () => {
    let slack: ISlackWebAPI,
        httpClient: IMock<IHttpClient>,
        slackConfig: SlackConfig;

    beforeEach(() => {
        httpClient = Mock.ofType<IHttpClient>();
        slackConfig = {
            botUserOAuthAccessToken: "slack-bot-user-token",
            defaultChannel: "#mururoa"
        };

        slack = new SlackWebAPI(slackConfig, httpClient.object);
    });

    context("when sending goes wrong", () => {
        beforeEach(() => {
            httpClient.setup(c => {
                c.post<PostMessageRequest, SlackWebAPIResponse>(It.isAnyString(), It.isAny());
            }).returns(async () => ({ ok: false, error: "errorMessage" }));
        });

        it("should raise a error", async () => {
            let error: string;
            try {
                await slack.postMessage({ text: "test", channel: "#mururoa" });
            } catch (e) {
                error = e.toString();
            }

            expect(error).to.be.eql("Error: Error in slack send process: errorMessage");
        });
    });

    context("when sending goes fine", () => {
        beforeEach(() => {
            httpClient.setup(c => {
                c.post<PostMessageRequest, SlackWebAPIResponse>(It.isAnyString(), It.isAny());
            }).returns(async () => ({ ok: true }));
        });

        it("should not raise a error", async () => {
            await slack.postMessage({ text: "test", channel: "#mururoa" });
        });
    });
});
