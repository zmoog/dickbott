import { DynamoDB } from "aws-sdk";
import { IDynamoDBService } from "./IDynamoDBService";
import { injectable } from "inversify";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

@injectable()
export class DynamoDBService implements IDynamoDBService {

    private dynamoDb: DynamoDB;
    private documentClient: DocumentClient;

    constructor() {
        this.dynamoDb = new DynamoDB();
        this.documentClient = new DynamoDB.DocumentClient();
    }
    /**
     * If your want to try the `scan` using AWS CLI you can use this:
     *
     * $ aws dynamodb scan --table-name dickbott_dev_schedules
     *
     */
    async scan(params: DynamoDB.Types.ScanInput): Promise<DynamoDB.Types.ScanOutput> {
        return this.dynamoDb.scan(params).promise();
    }

    async putItem(params: DynamoDB.Types.PutItemInput): Promise<DynamoDB.Types.PutItemOutput> {
        return this.dynamoDb.putItem(params).promise();
    };

    async getItem(params: DynamoDB.Types.GetItemInput): Promise<DynamoDB.Types.GetItemOutput> {
        return this.dynamoDb.getItem(params).promise();
    };

    async get(params: DynamoDB.Types.DocumentClient.GetItemInput): Promise<DynamoDB.Types.DocumentClient.GetItemOutput> {
        return this.documentClient.get(params).promise();
    }

    async put(params: DynamoDB.Types.DocumentClient.PutItemInput): Promise<DynamoDB.Types.DocumentClient.PutItemOutput> {
        return this.documentClient.put(params).promise();
    }
}
