import { AutoScalingGroupsType } from "aws-sdk/clients/autoscaling";
import { AutoScaling } from "aws-sdk";


export interface IAutoScalingService {
    describeAutoScalingGroups(): Promise<AutoScalingGroupsType>;
    updateAutoScalingGroup(autoScalingGroupName: string, desiredCapacity: number): Promise<any>;
}
