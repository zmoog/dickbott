import { generate } from "shortid";
import { injectable, inject } from "inversify";
import { Config } from "../../config/Config";
import { IIntentRepository, IntentInstance } from "../../core/intent/IIntentRepository";
import { IDynamoDBService } from "./IDynamoDBService";


@injectable()
export class DynamoDBIntentRepository implements IIntentRepository {

    private tableName: string;

    constructor(
        @inject("Config") private config: Config,
        @inject("DynamoDBService") private dynamoDb: IDynamoDBService
    ) {
        this.tableName = `${this.config.project}_${this.config.environment.current}_intents`;
    }

    async put(instance: IntentInstance): Promise<string> {

        let id = `${instance.name}-${generate()}`,
            params = {
                TableName: this.tableName,
                Item: {
                    executionId: id,
                    instance: instance
                }
            };

        console.log(`Pushing the intent ${instance.name} with the new id ${id} for entities ${instance.entities}`);
        console.log("params: %j", params);

        await this.dynamoDb.put(params);

        console.log(`executionId ${id} saved successfully.`);
        return id;
    }

    async get(id: string): Promise<IntentInstance> {

        console.log(`Getting intent with executionId ${id}`);

        let params = {
            TableName: this.tableName,
            Key: {
                executionId: id
            }
        };

        let r = await this.dynamoDb.get(params);

        console.log("response: %j", r);

        return r.Item.instance;
    }

}
