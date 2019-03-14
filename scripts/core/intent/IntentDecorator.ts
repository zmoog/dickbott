import {injectable, decorate} from "inversify";
import { Dictionary } from "lodash";

export function IntentDefinition(metadata: IntentMetadata) {
    return function (target: any) {
        decorate(injectable(), target);
        Reflect.defineMetadata("dickbott:intent", metadata, target);
        return target;
    };
}

export class IntentMetadataExtractor {
    static extract(intent: Function): IntentMetadata {
        return Reflect.getMetadata("dickbott:intent", intent);
    }
}

export interface IntentMetadata extends Dictionary<any> {
    name: string;
    description?: string; 
    examples?: {
        Simple?: string
        Elegant?: string
    };
    docs_url?: string;
}

