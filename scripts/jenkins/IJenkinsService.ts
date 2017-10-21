import { Job } from "./Types";


export interface IJenkinsService {
    build(job: Job): Promise<any>;
    info(): Promise<JenkinsInfo>;
}

export type JenkinsInfo = {
    nodeDescription: string
};
