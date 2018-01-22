import "reflect-metadata";
import { injectable } from "inversify";
import { Intent } from "../../scripts/core/intent/Intent";

@injectable()
export class IntentTestName implements Intent<{}, void> {
    execute(entities?: {}): Promise<void> {
        return null;
    }
}
