import { IModule } from "../../scripts/modules/IModule";
import { interfaces, Container } from "inversify";
import { IIntentRegistry } from "../../scripts/core/intent/IIntentRegistry";
import { Test1Intent } from "./IntentTestName";

export class TestModule implements IModule {
    modules(container: interfaces.Container): void {
        container.bind("TestConstant").toConstantValue("test");
    }

    register(intentRegistry: IIntentRegistry): void {
        intentRegistry.add(Test1Intent);
    }
}