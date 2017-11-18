import { DynamoDB } from "aws-sdk";

export interface IDynamoDBService {
    scan(params: DynamoDB.Types.ScanInput): Promise<DynamoDB.Types.ScanOutput>;
    putItem(params: DynamoDB.Types.PutItemInput): Promise<DynamoDB.Types.PutItemOutput>;
    getItem(params: DynamoDB.Types.GetItemInput): Promise<DynamoDB.Types.GetItemOutput>;
    put(params: DynamoDB.Types.DocumentClient.PutItemInput): Promise<DynamoDB.Types.DocumentClient.PutItemOutput>;
    get(params: DynamoDB.Types.DocumentClient.GetItemInput): Promise<DynamoDB.Types.DocumentClient.GetItemOutput>;
}
