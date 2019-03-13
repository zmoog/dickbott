import { inject, injectable } from "inversify";
import { IBasecampService } from "./IBasecampService";
import { IHttpClient } from "../core/http/v2/IHttpClient";
import { IncomingMessage } from "http";


/**
 * See https://github.com/basecamp/bc3-api/blob/master/sections/chatbots.md for
 * more details on the Basecmap chatbots API.
 *
 */
@injectable()
export class BasecampService implements IBasecampService {

    constructor(
        @inject("BasecampConfig") private basecampConfig: BasecampConfig,
        @inject("HttpClient") private httpClient: IHttpClient
    ) { }

    async postMessage(message: string): Promise<void> {

        console.log(`message: ${JSON.stringify(message)}`);

        //
        // https://nodejs.org/api/http.html#http_class_http_incomingmessage
        //
        let response = await this.httpClient.process<string, IncomingMessage>({
            method: "POST",
            uri: this.basecampConfig.campfireUrl,
            form: {
                content: message
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            resolveWithFullResponse: false
        });
    }
}

export type BasecampConfig = {
    campfireUrl: string
}
