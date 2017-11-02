import { SlackMessage, InteractiveComponentRequest, InteractiveComponentResponse } from "./Types";
import { IntentDispatcher } from "../core/dispatcher/IntentDispatcher";
import { inject, injectable } from "inversify";
import * as _ from "lodash";

@injectable()
export class InteractiveComponentHandler {
    constructor( @inject("IntentDispatcher") private intentDispatcher: IntentDispatcher) {
    }

    async handle(event: InteractiveComponentRequest): Promise<InteractiveComponentResponse> {

        // if (!event.result.metadata.intentName) {
        //     console.log("No intent specified.");
        //     return {};
        // }

        try {
            let response: SlackMessage | SlackMessage[] = await this.intentDispatcher.dispatch<any, any>(
                "event.result.metadata.intentName",
                "event.result.parameters");
            response = _.isArray(response) ? response : [response];

            let interactiveComponentResponse = {
                speech: response[0].text,
                displayText: response[0].text,
                data: {
                    slack: response[0]
                }
            };

            console.log("InteractiveComponent response: %j", interactiveComponentResponse);

            return interactiveComponentResponse;

        } catch (e) {
            console.error(e);
            return {
                speech: `D'oh! Something went wrong (${e}).`,
                displayText: `D'oh! Something went wrong (${e}).`
            };
        }
    }
}
