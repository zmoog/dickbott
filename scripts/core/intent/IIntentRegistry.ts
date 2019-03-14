import { Intent } from "./Intent";
import { interfaces } from "inversify";

export interface IIntentRegistry {
    add(intent: interfaces.Newable<Intent>): IIntentRegistry;
    has(name: string): boolean;
    get(name: string): Intent;
}