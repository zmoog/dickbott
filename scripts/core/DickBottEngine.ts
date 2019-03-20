import { DefaultContainer } from "./utils/containerDecorators";
import { interfaces } from "inversify";
import { IModule } from "../modules/IModule";
import { DickBottModule } from "../modules/DickBottModule";
import { Intent } from "./intent/Intent";
import { IIntentRegistry } from "./intent/IIntentRegistry";


export class DickBottEngine {
    private modules: IModule[] = [];
    private intentRegistry: IIntentRegistry;

    constructor(
        private container: interfaces.Container = DefaultContainer,
        registryRetriever: (container?: interfaces.Container) => IIntentRegistry = defaultRegistryRetriever
    ){
        this.registerModule(new DickBottModule());
        this.intentRegistry = registryRetriever(this.container);
    }

    registerModule(module: IModule): boolean {
        if (module.modules) {
            module.modules(this.container);
        }
        if(module.register) {
            module.register(this.intentRegistry);
        }

        this.modules.push(module);
        return true;
    }

    getService<T>(serviceIdentifier: string): T {
        return this.container.get<T>(serviceIdentifier);
    }

    registerIntent(intent: interfaces.Newable<Intent>): DickBottEngine {
        this.intentRegistry.add(intent);
        return this;
    }
};

export function defaultRegistryRetriever(container: interfaces.Container){
    return container.get<IIntentRegistry>("IIntentRegistry");
} 
