import { PostMessageRequest, SlackWebAPIResponse } from "./Types";

export interface ISlackWebAPI {
    postMessage(message: PostMessageRequest): Promise<SlackWebAPIResponse>;
}

