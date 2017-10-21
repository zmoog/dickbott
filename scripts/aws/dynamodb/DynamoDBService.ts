import { DynamoDB } from "aws-sdk";
import { IDynamoDBService } from "./IDynamoDBService";
import { injectable } from "inversify";

@injectable()
export class DynamoDBService implements IDynamoDBService {

    private dynamoDb: DynamoDB;

    constructor() {
        this.dynamoDb = new DynamoDB();
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
}
