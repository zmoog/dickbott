import { inject, injectable, interfaces } from "inversify";
import { IIntentDispatcher } from "./IIntentDispatcher";
import { Intent } from "../intent/Intent";
import { IIntentRepository } from "../intent/IIntentRepository";
import { InteractiveComponentActions } from "../../slack/Types";

@injectable()
export class IntentDispatcher implements IIntentDispatcher {

    constructor( 
        @inject("Container") private container: interfaces.Container,
        @inject("IntentRepository") private intentRepository: IIntentRepository
    ) { }

    async dispatch<I, O>(intentName: string, entities: I): Promise<O> {
        if (!this.container.isBoundNamed("Intent", intentName)) {
            return Promise.reject(`Cannot find any Intent registered with the identifier '${intentName}'.`);
        }
        
        let executionId = await this.intentRepository.put({
            name: intentName,
            entities: entities
        });

        let response = this.container.getNamed<Intent<any, any>>("Intent", intentName).execute(executionId, entities);

        return response;
    }

    async complete<I, O>(actions: InteractiveComponentActions): Promise<O> {
        let executionId = actions.callback_id;
        let intentExecution = await this.intentRepository.get(executionId);
        console.log("Intent instance execution data from repository: %j", intentExecution);

        if (!intentExecution) {
            return Promise.reject(`Cannot find any Intent execution data with id ${executionId}.`);
        }

        console.log("intentExecution: %j", intentExecution);

        if (!this.container.isBoundNamed("Intent", intentExecution.name)) {
            return Promise.reject(`Cannot find any Intent registered with the identifier ${intentExecution.name}.`);
        }

        // let intent = this.container.get<Intent<any, any>>(intentExecution.name);
        let intent = this.container.getNamed<Intent<any, any>>("Intent", intentExecution.name);
        console.log("confirming intent: %j", intent);

        return intent.complete(actions, executionId, intentExecution.entities);
    }
}
