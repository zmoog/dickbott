import "reflect-metadata";
import { injectable } from "inversify";
import { Intent } from "../../scripts/core/intent/Intent";


@injectable()
export class Test1Intent implements Intent<string, string> {
    
    name = "Test 1 Intent";
    description = "Just a simple test intent";
    examples = {
        Simple: "Simple example",
        Elegant: "Much more elegant example"
    };
    docs_url = "https://wikipedia.org";

    async execute(entities?: {}): Promise<string> {
        return "test1";
    }
}

@injectable()
export class Test2Intent implements Intent<string, string> {

    name = "Test 2 Intent";
    description = "Just a simple test intent";
    examples = {
        Simple: "Simple example",
        Elegant: "Much more elegant example"
    };
    docs_url = "https://wikipedia.org";
    
    async execute(entities?: {}): Promise<string> {
        return "test2";
    }
}
