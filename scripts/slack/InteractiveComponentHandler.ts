import { SlackMessage, InteractiveComponentActions } from "./Types";
import { IntentDispatcher } from "../core/dispatcher/IntentDispatcher";
import { inject, injectable } from "inversify";
import * as _ from "lodash";
import { IIntentRepository } from "../../dist/core/intent/IIntentRepository";

@injectable()
export class InteractiveComponentHandler {
    constructor( 
        @inject("IntentDispatcher") private intentDispatcher: IntentDispatcher
    ) {}

    async handle(event: InteractiveComponentActions): Promise<SlackMessage> {

        try {

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
