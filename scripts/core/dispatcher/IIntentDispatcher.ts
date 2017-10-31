export interface IIntentDispatcher {
    dispatch<I, O>(intent: string, entities: I): Promise<O>;
}