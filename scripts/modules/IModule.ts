import { interfaces } from "inversify";

export interface IModule {
    modules?: (container: interfaces.Container) => void;
}
