import { FulfillmentRequest, FulfillmentResponse } from "../dialogflow/Types";
import { SlackMessage } from "../slack/Types";
import { IntentDispatcher } from "../core/dispatcher/IntentDispatcher";
import { inject, injectable } from "inversify";
import { IIntentRepository } from "../core/intent/IIntentRepository";
import * as _ from "lodash";


@injectable()
export class FulfillmentHandler {
    constructor( @inject("IntentDispatcher") private intentDispatcher: IntentDispatcher) { }

    async handle(event: FulfillmentRequest): Promise<FulfillmentResponse> {

        if (!event.result.metadata.intentName) {
            console.log("No intent specified.");
            return {};
        }

        try {
            
            let intentName = event.result.metadata.intentName;
            let entities = _.assignIn({}, event.result.parameters);

            entities.originalRequest = event.originalRequest;

            let slackMessage = await this.intentDispatcher.dispatch<any, any>(
                intentName,
                entities);

            let fulfillmentResponse = {
                speech: slackMessage.text,
                displayText: slackMessage.text,
                data: {
                    slack: slackMessage
                }
            };

            return fulfillmentResponse;

        } catch (error) {
            console.error(error);
            console.log("FulfillmentHandler: event %j", event);
            return {
                speech: `D'oh! Something went wrong (${error}).`,
                displayText: `D'oh! Something went wrong (${error}).`
            };
        }
    }
}
