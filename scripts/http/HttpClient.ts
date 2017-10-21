import { injectable, inject } from "inversify";
import { IHttpClient } from "./IHttpClient";

let rp = require("request-promise-native");

@injectable()
export class HttpClient implements IHttpClient {

    async get<T>(uri: string, parseJson = true): Promise<T> {

        let options = {
            uri: uri,
            resolveWithFullResponse: true,
            json: parseJson // Automatically parses the JSON string in the response
        };

        let response = await rp.get(options);

        return response.body;
    }

    async post<I, O>(uri: string, body: I): Promise<O> {

        console.log("POST request: %j", body);

        let response: O = await rp.post(uri, {
            form: body
        });

        console.log("POST response: %j", response);

        return response;
    }
}
