import "reflect-metadata";
import { Intent } from "../../scripts/core/intent/Intent";
import { IntentDefinition } from "../../scripts/core/intent/IntentDecorator";


@IntentDefinition({
    name: "Test 1 Intent",
    description: "Just a simple test intent",
    examples: {
        Simple: "Simple example",
        Elegant: "Much more elegant example"
    },
    docs_url: "https://wikipedia.org"
})
export class Test1Intent implements Intent<string, string> {
    async execute(entities?: {}): Promise<string> {
        return "test1";
    }
}

@IntentDefinition({
    name: "Test 2 Intent",
    description: "Just a simple test intent",
    examples: {
        Simple: "Simple example",
        Elegant: "Much more elegant example"
    },
    docs_url: "https://wikipedia.org"
})
export class Test2Intent implements Intent<string, string> {
    async execute(entities?: {}): Promise<string> {
        return "test2";
    }
}
