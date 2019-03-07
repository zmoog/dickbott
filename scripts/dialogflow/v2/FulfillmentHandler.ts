import { IntentDispatcher } from "../../core/dispatcher/IntentDispatcher";
import { inject, injectable } from "inversify";
import { assignIn } from "lodash";
import { FulfillmentRequest, FulfillmentResponse } from "../v2/Types";


@injectable()
export class FulfillmentHandler {
    constructor(@inject("IntentDispatcher") private intentDispatcher: IntentDispatcher) { }

    async handle(event: FulfillmentRequest): Promise<FulfillmentResponse> {

        if (!event.queryResult.intent.displayName) {
            console.log("No intent specified.");
            return {
                fulfillmentText: "No intent specified"
            };
        }

        try {

            let intentName = event.queryResult.intent.displayName;
            let entities = assignIn({}, event.queryResult.parameters);

            entities.originalRequest = event.originalDetectIntentRequest;

            let slackMessage = await this.intentDispatcher.dispatch<any, any>(
                intentName,
                entities);

            let fulfillmentResponse = {
                fulfillmentText: slackMessage.text,
                payload: {
                    slack: slackMessage
                }
            };

            return fulfillmentResponse;

        } catch (error) {
            console.error(error);
            console.log("FulfillmentHandler: event %j", event);
            return {
                fulfillmentText: `D'oh! Something went wrong (${error}).`
            };
        }
    }
}
