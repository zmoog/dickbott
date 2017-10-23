import { PostMessageRequest } from "./Types";

export interface ISlackWebAPI {
    postMessage(message: PostMessageRequest): Promise<void>;
}

