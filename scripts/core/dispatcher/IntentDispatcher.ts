import { inject, injectable, interfaces } from "inversify";
import { IIntentDispatcher } from "./IIntentDispatcher";
import { Intent } from "../intent/Intent";
import { IIntentRepository } from "../intent/IIntentRepository";
import { InteractiveComponentActions } from "../../slack/Types";
import { IIntentRegistry } from "../intent/IIntentRegistry";

@injectable()
export class IntentDispatcher implements IIntentDispatcher {

    constructor( 
        @inject("IIntentRegistry") private intentRegistry: IIntentRegistry,
        @inject("IntentRepository") private intentRepository: IIntentRepository
    ) { }

    async dispatch<I, O>(intentName: string, entities: I): Promise<O> {
        const intent: Intent = this.intentRegistry.get(intentName);
        let executionId = await this.intentRepository.put({
            name: intentName,
            entities: entities
        });

        return intent.execute(executionId, entities);
    }

    async complete<I, O>(actions: InteractiveComponentActions): Promise<O> {
        let executionId = actions.callback_id;
        let intentExecution = await this.intentRepository.get(executionId);
        console.log("Intent instance execution data from repository: %j", intentExecution);

        if (!intentExecution) {
            return Promise.reject(`Cannot find any Intent execution data with id ${executionId}.`);
        }

        console.log("intentExecution: %j", intentExecution);
        const intent: Intent = this.intentRegistry.get(intentExecution.name);
        return intent.complete(actions, executionId, intentExecution.entities);
    }
}
