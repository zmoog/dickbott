import { DefaultContainer } from "./utils/containerDecorators";
import { interfaces } from "inversify";
import { IModule } from "../modules/IModule";
import { DickBottModule } from "../modules/DickBottModule";
import { Intent } from "./intent/Intent";
import { IntentMetadataExtractor } from "./intent/IntentDecorator";


export class DickBottEngine {
    private modules: IModule[] = [];
    private container: interfaces.Container;

    constructor(container: interfaces.Container = DefaultContainer) {
        this.container = container;
        this.registerModule(new DickBottModule());
    }

    registerModule(module: IModule): boolean {
        if (module.modules) {
            module.modules(this.container);
        }
        this.modules.push(module);
        return true;
    }

    getService<T>(serviceIdentifier: string): T {
        return this.container.get<T>(serviceIdentifier);
    }

    registerIntent<T = Intent<any, any>>(intent: interfaces.Newable<T>): DickBottEngine {
        this.container.bind<T>("Intent").to(intent).inSingletonScope().whenTargetNamed(IntentMetadataExtractor.extract(intent).name);
        return this;
    }
}