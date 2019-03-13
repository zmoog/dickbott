import { Options } from "./Types";

export interface IHttpClient {
    process<I, O>(options: Options): Promise<O>;
}
