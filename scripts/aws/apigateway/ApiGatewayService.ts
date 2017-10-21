import {APIGateway} from "aws-sdk";
import {IApiGatewayService} from "./IApiGatewayService";


export class ApiGatewayService implements IApiGatewayService {

    private apiGateway: APIGateway;

    constructor() {
        this.apiGateway = new APIGateway();
    }

    getRestApis(): Promise<APIGateway.Types.RestApis> {
        return this.apiGateway.getRestApis().promise();
    }
}

