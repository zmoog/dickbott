export interface IIntentRepository {

    put(instance: IntentInstance): Promise<string>;

    get(id: string): Promise<IntentInstance>;
}

export type IntentInstance = {
    name: string
    entities: any
}
