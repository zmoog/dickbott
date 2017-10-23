import { Dictionary } from "lodash";


export type Job = {
    name: string
    parameters?: Dictionary<string>,
    token?: string
};

export type JenkinsConfig = {
    baseUrl: string,
    crumbIssuer?: boolean, // default: false
    promisify?: boolean
};
