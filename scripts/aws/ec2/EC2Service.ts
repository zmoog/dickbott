import { IEC2Service } from "./IEC2Service";
import { EC2 } from "aws-sdk";
import { injectable } from "inversify";
import "reflect-metadata";


@injectable()
export class EC2Service implements IEC2Service {

    private ec2: EC2;

    constructor() {
        this.ec2 = new EC2();
    }

    describeInstances(params: EC2.Types.DescribeInstancesRequest): Promise<EC2.Types.DescribeInstancesResult> {
        return this.ec2.describeInstances(params).promise();
    }

    stopInstances(params: EC2.Types.StopInstancesRequest): Promise<EC2.Types.StopInstancesResult> {
        return this.ec2.stopInstances(params).promise();
    }

    startInstances(params: EC2.Types.StartInstancesRequest): Promise<EC2.Types.StartInstancesResult> {
        return this.ec2.startInstances(params).promise();
    }

    describeVpnConnections(params: EC2.Types.DescribeVpnConnectionsRequest): Promise<EC2.Types.DescribeVpnConnectionsResult> {
        return this.ec2.describeVpnConnections(params).promise();
    }

    describeImages(params: EC2.Types.DescribeImagesRequest): Promise<EC2.Types.DescribeImagesResult> {
        return this.ec2.describeImages(params).promise();
    }
}
