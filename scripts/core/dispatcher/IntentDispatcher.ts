import { inject, injectable, interfaces } from "inversify";
import { IIntentDispatcher } from "./IIntentDispatcher";
import { Intent } from "../intent/Intent";
import { IIntentRepository } from "../../../dist/core/intent/IIntentRepository";
import { InteractiveComponentActions } from "../../slack/Types";

@injectable()
export class IntentDispatcher implements IIntentDispatcher {

    constructor( 
        @inject("Container") private container: interfaces.Container,
        @inject("IntentRepository") private intentRepository: IIntentRepository
    ) { }

    async dispatch<I, O>(intent: string, entities: I): Promise<O> {
        
        if (!this.container.isBound(intent)) {
            return Promise.reject(`Cannot find any Intent registered with the identifier '${intent}'.`);
        }
        
        let executionId = await this.intentRepository.put({
            name: intent,
            entities: entities
        });

        let response = this.container.get<Intent<any, any>>(intent).execute(executionId, entities);

        return response;
    }

    async complete<I, O>(actions: InteractiveComponentActions): Promise<O> {

        let executionId = actions.callback_id;
        let intentExecution = await this.intentRepository.get(executionId);

        console.log("Intent instance execution data from repository: %j", intentExecution);

        if (!intentExecution) {
            return Promise.reject(`Cannot find any Intent execution data with id ${executionId}.`);
        }

        if (!this.container.isBound(intentExecution.name)) {
            console.log("looking for intent: %j", intentExecution.name);
            return Promise.reject(`Cannot find any Intent registered with the identifier ${intentExecution.name}.`);
        }

        let intent = this.container.get<Intent<any, any>>(intentExecution.name);
        console.log("confirming intent: %j", intent);

        return intent.complete(actions, executionId, intentExecution.entities);
    }
}
