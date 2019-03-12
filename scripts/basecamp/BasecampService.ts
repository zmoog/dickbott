import { inject, injectable } from "inversify";
import { IHttpClient } from "../core/http/IHttpClient";


/**
 * See https://github.com/basecamp/bc3-api/blob/master/sections/chatbots.md for
 * more details on the Basecmap chatbots API.
 *
 */
@injectable()
export class BasecampService {

    constructor(
        @inject("BasecampConfig") private basecampConfig: BasecampConfig,
        @inject("HttpClient") private httpClient: IHttpClient) { }

    async postMessage(campfire: string): Promise<void> {
    }

    // build(job: Job): Promise<number> {
    //     console.log("launching job %j", job);
    //     return this.jenkins.job.build(job);
    //     // console.log("Job launch disabled");
    //     // return Promise.resolve(0);
    // }

    // info(): Promise<JenkinsInfo> {
    //     return this.jenkins.info();
    // }
}

export type BasecampConfig = {}
