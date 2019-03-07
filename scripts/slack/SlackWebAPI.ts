import { injectable, inject } from "inversify";
import { ISlackWebAPI } from "./ISlackWebAPI";
import { PostMessageRequest, SlackConfig, SlackWebAPIResponse } from "./Types";
import { IHttpClient } from "../core/http/IHttpClient";
import { assignIn } from "lodash";

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
    async postMessage(message: PostMessageRequest): Promise<void> {

        // let options = {
        //     token: this.slackConfig.botUserOAuthAccessToken,
        //     channel: message.channel || this.slackConfig.defaultChannel,
        //     // blocks: JSON.stringify(message.blocks || []),
        //     as_user: false            
        // };

        // let body: any = assignIn(message, options);

        // if (body.attachments) {
        //     body.attachments = JSON.stringify(message.attachments);
        // }
        // if (body.blocks) {
        //     body.blocks = JSON.stringify(message.blocks);
        // }

        
        let body = assignIn(
            message,
            {
                token: this.slackConfig.botUserOAuthAccessToken,
                channel: message.channel || this.slackConfig.defaultChannel,
                attachments: JSON.stringify(message.attachments),
                blocks: JSON.stringify(message.blocks)
            }
            );
            
        console.log(`body: ${JSON.stringify(body)}`);

        let response: SlackWebAPIResponse = await this.httpClient.post<any, SlackWebAPIResponse>(
            "https://slack.com/api/chat.postMessage",
            body
        );

        if (!response.ok) {
            throw new Error(`Error in slack send process: ${response.error}`);
        }
    }
}
