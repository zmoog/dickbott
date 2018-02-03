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
import { IIntentRepository } from "../core/intent/IIntentRepository";
import { InMemoryIntentRepository } from "../core/intent/InMemoryIntentRepository";
import { IntroduceYourselfIntent } from "../intents/IntroduceYourselfIntent";
import { Intent } from "../core/intent/Intent";


export class DickBottModule implements IModule {
    modules = (container: interfaces.Container) => {

        // Core
        container.bind<interfaces.Container>("Container").toConstantValue(container);
        container.bind<IIntentDispatcher>("IntentDispatcher").to(IntentDispatcher).inSingletonScope();
        container.bind<IIntentRepository>("IntentRepository").to(InMemoryIntentRepository).inSingletonScope();
        container.bind<IHttpClient>("HttpClient").to(HttpClient).inSingletonScope();
        container.bind<ISlackWebAPI>("SlackWebAPI").to(SlackWebAPI).inSingletonScope();

        // Services
        container.bind<IEC2Service>("EC2Service").to(EC2Service).inSingletonScope();
        container.bind<IAutoScalingService>("AutoScalingService").to(AutoScalingService).inSingletonScope();
        container.bind<IDynamoDBService>("DynamoDBService").to(DynamoDBService).inSingletonScope();
        container.bind<IJenkinsService>("JenkinsService").to(JenkinsService).inSingletonScope();

        // Intents
        container.bind<Intent<any, any>>("Intent").to(IntroduceYourselfIntent).whenTargetNamed("IntroduceYourselfIntent");
    }
}
