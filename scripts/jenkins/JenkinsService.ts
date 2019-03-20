import { IJenkinsService, JenkinsInfo } from "./IJenkinsService";
import { JenkinsConfig, Job } from "./Types";
import { inject, injectable } from "inversify";
import * as jenkinsapi from "jenkins";


/**
 * See https://github.com/silas/node-jenkins for the Jenkins API library used.
 *
 * See https://wiki.jenkins.io/display/JENKINS/Authenticating+scripted+clients for
 * more details on the Jenkins API.
 */
@injectable()
export class JenkinsService implements IJenkinsService {

    private jenkins;

    constructor( @inject("JenkinsConfig") jenkinsConfig: JenkinsConfig) {
        this.jenkins = jenkinsapi(jenkinsConfig);
    }

    build(job: Job): Promise<number> {
        console.log("launching job %j", job);
        return this.jenkins.job.build(job);
    }

    info(): Promise<JenkinsInfo> {
        return this.jenkins.info();
    }
}


