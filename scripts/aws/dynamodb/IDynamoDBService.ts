import { DynamoDB } from "aws-sdk";

export interface IDynamoDBService {
    scan(params: DynamoDB.Types.ScanInput): Promise<DynamoDB.Types.ScanOutput>;
}
