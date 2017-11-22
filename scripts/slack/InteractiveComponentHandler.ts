import {SlackMessage, InteractiveComponentActions, SlackConfig} from "./Types";
import { IntentDispatcher } from "../core/dispatcher/IntentDispatcher";
import { inject, injectable } from "inversify";


@injectable()
export class InteractiveComponentHandler {
    constructor( 
        @inject("IntentDispatcher") private intentDispatcher: IntentDispatcher,
        @inject("SlackConfig") private slackConfig: SlackConfig
    ) {}

    async handle(event: InteractiveComponentActions): Promise<SlackMessage> {

        try {

            if (event.token !== this.slackConfig.verificationToken) {
                return {
                    text: "D'oh! The verification token is not valid, I cannot complete your request.."
                };
            }

            let response = await this.intentDispatcher.complete<InteractiveComponentActions, SlackMessage>(event);

            console.log("InteractiveComponent response: %j", response);

            return response;

        } catch (e) {
            console.error(e);
            return {
                text: `D'oh! Something went wrong (${e}).`
            };
        }
    }
}
