import { injectable, inject, interfaces } from "inversify";
import { IIntentRegistry } from "./IIntentRegistry";
import { Intent } from "./Intent";
import { IntentMetadata, IntentMetadataExtractor } from "./IntentDecorator";

@injectable()
export class IntentRegistry implements IIntentRegistry {
    constructor(@inject("Container") private container: interfaces.Container){
    }

    add(intent: interfaces.Newable<Intent>): IIntentRegistry {
        const metadata: IntentMetadata = IntentMetadataExtractor.extract(intent); 
        if(this.has(metadata.name)){
            throw new Error(`An intent is already registered with name: ${name}`);
        }

        this.container.bind<Intent>("Intent")
            .to(intent)
            .inSingletonScope()
            .whenTargetNamed(metadata.name);

        return this;
    }    

    has(name: string): boolean {
        return this.container.isBoundNamed("Intent", name);
    }
    
    get(name: string): Intent {
        if(!this.has(name)){
            throw new Error(`No intent registered with name: ${name}`);
        }
        
        return this.container.getNamed<Intent>("Intent", name);
    }

    getAll(): Intent[] {
        return this.container.getAll<Intent>("Intent");
    }
}