// import { PostMessageRequest } from "./Types";

export interface IBasecampService {
    postMessage(message: string): Promise<void>;
}


