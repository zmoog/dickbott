import { EC2 } from "aws-sdk";


export interface IEC2Service {
    describeInstances(params: EC2.Types.DescribeInstancesRequest): Promise<EC2.Types.InstanceList>;
    stopInstances(params: EC2.Types.StopInstancesRequest): Promise<EC2.Types.StopInstancesResult>;
    startInstances(params: EC2.Types.StartInstancesRequest): Promise<EC2.Types.StartInstancesResult>;
    describeVpnConnections(params?: EC2.Types.DescribeVpnConnectionsRequest): Promise<EC2.Types.DescribeVpnConnectionsResult>;
    describeImages(params: EC2.Types.DescribeImagesRequest): Promise<EC2.Types.DescribeImagesResult>;
    copyImage(params: EC2.Types.CopyImageRequest): Promise<EC2.Types.CopyImageResult>;
    createTags(params: EC2.Types.CreateTagsRequest): Promise<{}>;
    terminateIstances(params: EC2.Types.TerminateInstancesRequest): Promise<EC2.Types.TerminateInstancesResult>;
}
