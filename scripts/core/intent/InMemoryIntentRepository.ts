import { generate } from "shortid";
import { injectable } from "inversify";
import { IIntentRepository, IntentInstance } from "./IIntentRepository";

@injectable()
export class InMemoryIntentRepository implements IIntentRepository {

    private repository = new Map<string, IntentInstance>();

    async put(instance: IntentInstance): Promise<string> {
        let id = `${instance.name}-${generate()}`;
        this.repository[id] = instance;
        return id;
    }

    async get(id: string): Promise<IntentInstance> {
        return this.repository[id];
    }
}