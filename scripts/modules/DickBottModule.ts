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
import { EC2, RDS } from "aws-sdk";
import { IRDSService } from "../aws/rds/IRDSService";
import { RDSService } from "../aws/rds/RDSService";
import { IIntentRegistry } from "../core/intent/IIntentRegistry";
import { IntentRegistry } from "../core/intent/IntentRegistry";


export class DickBottModule implements IModule {
    modules = (container: interfaces.Container) => {
        // Config
        container.bind<EC2.Types.ClientConfiguration>("EC2.Types.ClientConfiguration").toConstantValue({});
        container.bind<RDS.Types.ClientConfiguration>("RDS.Types.ClientConfiguration").toConstantValue({});

        // Core
        container.bind<interfaces.Container>("Container").toConstantValue(container);
        container.bind<IIntentDispatcher>("IntentDispatcher").to(IntentDispatcher).inSingletonScope();
        container.bind<IIntentRepository>("IntentRepository").to(InMemoryIntentRepository).inSingletonScope();
        container.bind<IHttpClient>("HttpClient").to(HttpClient).inSingletonScope();
        container.bind<ISlackWebAPI>("SlackWebAPI").to(SlackWebAPI).inSingletonScope();
        container.bind<IIntentRegistry>("IIntentRegistry").to(IntentRegistry).inSingletonScope();

        // Services
        container.bind<IEC2Service>("EC2Service").to(EC2Service).inSingletonScope();
        container.bind<IRDSService>("RDSService").to(RDSService).inSingletonScope();
        container.bind<IAutoScalingService>("AutoScalingService").to(AutoScalingService).inSingletonScope();
        container.bind<IDynamoDBService>("DynamoDBService").to(DynamoDBService).inSingletonScope();
        container.bind<IJenkinsService>("JenkinsService").to(JenkinsService).inSingletonScope();
    }

    register = (intentRegistry: IIntentRegistry) => {
        intentRegistry.add(IntroduceYourselfIntent);
    }
}
