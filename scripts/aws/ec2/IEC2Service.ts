import { EC2 } from "aws-sdk";


export interface IEC2Service {
    describeInstances(params: EC2.Types.DescribeInstancesRequest): Promise<EC2.Types.InstanceList>;
    stopInstances(params: EC2.Types.StopInstancesRequest): Promise<EC2.Types.StopInstancesResult>;
    startInstances(params: EC2.Types.StartInstancesRequest): Promise<EC2.Types.StartInstancesResult>;
    describeVpnConnections(params?: EC2.Types.DescribeVpnConnectionsRequest): Promise<EC2.Types.DescribeVpnConnectionsResult>;
    describeImages(params: EC2.Types.DescribeImagesRequest): Promise<EC2.Types.DescribeImagesResult>;
}
