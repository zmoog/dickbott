import { injectable } from "inversify";
import { IHttpClient } from "./IHttpClient";
import "reflect-metadata";

let rp = require("request-promise-native");

@injectable()
export class HttpClient implements IHttpClient {

    async get<T>(uri: string, parseJson = true): Promise<T> {
        return  (await rp.get({
            uri: uri,
            resolveWithFullResponse: true,
            json: parseJson // Automatically parses the JSON string in the response
        })).body;
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
