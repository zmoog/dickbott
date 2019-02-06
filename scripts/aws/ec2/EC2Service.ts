import { IEC2Service } from "./IEC2Service";
import { EC2 } from "aws-sdk";
import { injectable, inject } from "inversify";
import { flatMap } from "lodash";


@injectable()
export class EC2Service implements IEC2Service {
    private ec2: EC2;

    constructor(
        @inject("EC2.Types.ClientConfiguration") private options: EC2.Types.ClientConfiguration
    ) {
        console.log(`Creating a new EC2Service %j`, options);
        this.ec2 = new EC2(options);
    }

    describeInstances(params: EC2.Types.DescribeInstancesRequest): Promise<EC2.Types.InstanceList> {
        return this.ec2.describeInstances(params).promise().then(
            result => flatMap(result.Reservations, (reservation) => reservation.Instances)
        );
    }

    stopInstances(params: EC2.Types.StopInstancesRequest): Promise<EC2.Types.StopInstancesResult> {
        return this.ec2.stopInstances(params).promise();
    }

    startInstances(params: EC2.Types.StartInstancesRequest): Promise<EC2.Types.StartInstancesResult> {
        return this.ec2.startInstances(params).promise();
    }

    terminateIstances(params: EC2.Types.TerminateInstancesRequest): Promise<EC2.Types.TerminateInstancesResult> {
        return this.ec2.terminateInstances(params).promise();
    }

    describeVpnConnections(params: EC2.Types.DescribeVpnConnectionsRequest): Promise<EC2.Types.DescribeVpnConnectionsResult> {
        return this.ec2.describeVpnConnections(params).promise();
    }

    describeImages(params: EC2.Types.DescribeImagesRequest): Promise<EC2.Types.DescribeImagesResult> {
        return this.ec2.describeImages(params).promise();
    }

    copyImage(params: EC2.Types.CopyImageRequest): Promise<EC2.Types.CopyImageResult> {
        return this.ec2.copyImage(params).promise();
    }

    createTags(params: EC2.Types.CreateTagsRequest): Promise<{}> {
        return this.ec2.createTags(params).promise();
    }
}
