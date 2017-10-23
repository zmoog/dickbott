import {DefaultContainer} from "./utils/containerDecorators";
import {interfaces} from "inversify";
import "reflect-metadata";
import {IModule} from "./modules/IModule";
import {DickBottModule} from "./modules/DickBottModule";

export class DickBottEngine {
    private modules: IModule[] = [];
    private container: interfaces.Container;

    constructor() {
        this.container = DefaultContainer;
        this.register(new DickBottModule());
    }

    register(module: IModule): boolean {
        if (module.modules) {
            module.modules(this.container);
        }
        this.modules.push(module);
        return true;
    }

    getService<T>(serviceIdentifier: string): T {
        return this.container.get<T>(serviceIdentifier);
    }
}
