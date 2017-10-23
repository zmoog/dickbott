import {injectable} from "inversify";
import {Intent} from "../../scripts/intent/Intent";

@injectable()
export class IntentTestName implements Intent<{}, void> {
    execute(entities?: {}): Promise<void> {
        return null;
    }
}
