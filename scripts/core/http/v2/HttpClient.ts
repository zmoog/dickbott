import { injectable } from "inversify";
import { Options } from "./Types";


@injectable()
export class HttpClient {

    request: any = require("request-promise-native");

    async process<I, O>(options: Options): Promise<O> {

        console.log(`options: ${JSON.stringify(options)}`);

        let response: O = await this.request(options);

        console.log(`response: [${response}]`);

        return response;
    }
}
