import { injectable, inject } from "inversify";
import { ISlackWebAPI } from "./ISlackWebAPI";
import { SlackConfig, PostMessageRequest, SlackWebAPIResponse } from "./Types";
import { IHttpClient } from "../http/IHttpClient";
import "reflect-metadata";


/***
 * The Slack Web API is documented on https://api.slack.com/web
*/
@injectable()
export class SlackWebAPI implements ISlackWebAPI {

    constructor(
        @inject("SlackConfig") private slackConfig: SlackConfig,
        @inject("HttpClient") private httpClient: IHttpClient) { }

    /**
     *  For the details on this API check https://api.slack.com/methods/chat.postMessage
     */
    async postMessage(message: PostMessageRequest): Promise<SlackWebAPIResponse> {
        return this.httpClient.post<any, SlackWebAPIResponse>(
            "https://slack.com/api/chat.postMessage",
            {
                token: this.slackConfig.botUserOAuthAccessToken,
                channel: message.channel || this.slackConfig.defaultChannel,
                text: message.text,
                attachments: JSON.stringify(message.attachments),
                as_user: false
            }
        );
    }
}
