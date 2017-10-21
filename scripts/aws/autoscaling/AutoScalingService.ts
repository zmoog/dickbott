import { injectable } from "inversify";
import { AutoScaling } from "aws-sdk";
import { IAutoScalingService } from "./IAutoScalingService";
import "reflect-metadata";


@injectable()
export class AutoScalingService implements IAutoScalingService {
    private autoScalingGroup: AutoScaling;

    constructor() {
        this.autoScalingGroup = new AutoScaling();
    }

    describeAutoScalingGroups(): Promise<AutoScaling.Types.AutoScalingGroupsType> {
        return this.autoScalingGroup.describeAutoScalingGroups().promise();
    }

    updateAutoScalingGroup(autoScalingGroupName: string, desiredCapacity: number): Promise<any> {
        return this.autoScalingGroup.updateAutoScalingGroup({
            AutoScalingGroupName: autoScalingGroupName,
            DesiredCapacity: desiredCapacity
        }).promise();
    }
}
