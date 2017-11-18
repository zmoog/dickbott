import { FulfillmentRequest, FulfillmentResponse } from "../dialogflow/Types";
import { SlackMessage } from "../slack/Types";
import { IntentDispatcher } from "../core/dispatcher/IntentDispatcher";
import { inject, injectable } from "inversify";
import * as _ from "lodash";
import { IIntentRepository } from "../core/intent/IIntentRepository";


@injectable()
export class FulfillmentHandler {
    constructor( 
        @inject("IntentDispatcher") private intentDispatcher: IntentDispatcher
        // @inject("IntentRepository") private intentRepository: IIntentRepository
    ) {
    }

    async handle(event: FulfillmentRequest): Promise<FulfillmentResponse> {

        if (!event.result.metadata.intentName) {
            console.log("No intent specified.");
            return {};
        }

        try {
            let intentName = event.result.metadata.intentName;
            let entities = event.result.parameters;

            let response: SlackMessage | SlackMessage[] = await this.intentDispatcher.dispatch<any, any>(
                intentName,
                entities);

            response = _.isArray(response) ? response : [response];

            // let intentId = await this.intentRepository.put({
            //     name: intentName, 
            //     entities: entities
            // });

            let fulfillmentResponse = {
                speech: response[0].text,
                displayText: response[0].text,
                data: {
                    slack: response[0]
                }
            };
            console.log("fulfillment response: %j", fulfillmentResponse);

            return fulfillmentResponse;

        } catch (e) {
            console.error(e);
            return {
                speech: `D'oh! Something went wrong (${e}).`,
                displayText: `D'oh! Something went wrong (${e}).`
            };
        }
    }
}
