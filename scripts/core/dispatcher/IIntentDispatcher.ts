import { InteractiveComponentActions } from "../../slack/Types";

export interface IIntentDispatcher {
    dispatch<I, O>(intent: string, entities: I): Promise<O>;
    complete<I, O>(req: InteractiveComponentActions): Promise<O>;
}