import { IModule } from "./IModule";
import { interfaces } from "inversify";
import { HttpClient } from "../core/http/HttpClient";
import { IHttpClient } from "../core/http/IHttpClient";
import { ISlackWebAPI } from "../slack/ISlackWebAPI";
import { SlackWebAPI } from "../slack/SlackWebAPI";
import { IJenkinsService } from "../jenkins/IJenkinsService";
import { JenkinsService } from "../jenkins/JenkinsService";
import { IIntentDispatcher } from "../core/dispatcher/IIntentDispatcher";
import { IEC2Service } from "../aws/ec2/IEC2Service";
import { EC2Service } from "../aws/ec2/EC2Service";
import { IAutoScalingService } from "../aws/autoscaling/IAutoScalingService";
import { AutoScalingService } from "../aws/autoscaling/AutoScalingService";
import { IntentDispatcher } from "../core/dispatcher/IntentDispatcher";
import { IDynamoDBService } from "../aws/dynamodb/IDynamoDBService";
import { DynamoDBService } from "../aws/dynamodb/DynamoDBService";


export class DickBottModule implements IModule {
    modules = (container: interfaces.Container) => {
        container.bind<interfaces.Container>("Container").toConstantValue(container);
        container.bind<IHttpClient>("HttpClient").to(HttpClient).inSingletonScope();
        container.bind<ISlackWebAPI>("ISlackWebAPI").to(SlackWebAPI).inSingletonScope();
        container.bind<IEC2Service>("EC2Service").to(EC2Service).inSingletonScope();
        container.bind<IAutoScalingService>("AutoScalingService").to(AutoScalingService).inSingletonScope();
        container.bind<IIntentDispatcher>("IntentDispatcher").to(IntentDispatcher).inSingletonScope();
        container.bind<IJenkinsService>("JenkinsService").to(JenkinsService).inSingletonScope();
        container.bind<IDynamoDBService>("DynamoDBService").to(DynamoDBService).inSingletonScope();
    }
}
