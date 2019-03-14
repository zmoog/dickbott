import { interfaces } from "inversify";
import { IIntentRegistry } from "../core/intent/IIntentRegistry";

export interface IModule {
    modules?: (container: interfaces.Container) => void;
    register?: (intentRegistry: IIntentRegistry) => void;
}
