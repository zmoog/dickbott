import { IIntentRepository, IntentInstance } from "./IIntentRepository";

export class InMemoryIntentRepository implements IIntentRepository {

    async put(instance: IntentInstance): Promise<string> {
        return null;
    }

    async get(id: string): Promise<IntentInstance> {
        return {
            name: "",
            entities: {}
        }
    }
}