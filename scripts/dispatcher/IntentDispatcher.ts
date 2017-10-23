import {inject, injectable, interfaces} from "inversify";
import "reflect-metadata";
import {IIntentDispatcher} from "./IIntentDispatcher";
import {Intent} from "../intent/Intent";

@injectable()
export class IntentDispatcher implements IIntentDispatcher {
    constructor(@inject("Container") private container: interfaces.Container) {
    }

    dispatch<I, O>(intent: string, entities: I): Promise<O> {
        if (!this.container.isBound(intent))
            return Promise.reject(`Is not registered a Intent with this identifier ${intent}`);

        return this.container.get<Intent<any, any>>(intent).execute(entities);
    }
}