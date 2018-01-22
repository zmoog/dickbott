import { injectable } from "inversify";
import { IHttpClient } from "./IHttpClient";

@injectable()
export class HttpClient implements IHttpClient {
    rp: any = require("request-promise-native");

    async get<T>(uri: string, parseJson = true): Promise<T> {
        return (await this.rp.get({
            uri: uri,
            resolveWithFullResponse: true,
            json: parseJson // Automatically parses the JSON string in the response
        })).body;
    }

    async post<I, O>(uri: string, body: I): Promise<O> {
        console.log("POST request: %j", body);
        let response: O = await this.rp.post(uri, {
            form: body
        });

        console.log("POST response: %j", response);
        return response;
    }
}
