import { injectable, inject } from "inversify";
import { ISlackWebAPI } from "./ISlackWebAPI";
import { PostMessageRequest, SlackWebAPIResponse } from "./Types";
import { IHttpClient } from "../core/http/IHttpClient";


/***
 * The Slack Web API is documented on https://api.slack.com/web
 */
@injectable()
export class SlackWebAPI implements ISlackWebAPI {

    constructor( @inject("SlackConfig") private slackConfig: SlackConfig,
        @inject("HttpClient") private httpClient: IHttpClient) {
    }

    /**
     *  For the details on this API check https://api.slack.com/methods/chat.postMessage
     */
    async postMessage(message: PostMessageRequest): Promise<void> {
        let response: SlackWebAPIResponse = await this.httpClient.post<any, SlackWebAPIResponse>(
            "https://slack.com/api/chat.postMessage",
            {
                token: this.slackConfig.botUserOAuthAccessToken,
                channel: message.channel || this.slackConfig.defaultChannel,
                text: message.text,
                attachments: JSON.stringify(message.attachments),
                as_user: false
            }
        );
        if (!response.ok)
            throw new Error(`Error in slack send process: ${response.error}`);
    }
}

export interface SlackConfig {
    botUserOAuthAccessToken: string;
    defaultChannel: string;
}
