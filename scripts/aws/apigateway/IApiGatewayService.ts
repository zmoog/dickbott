import {APIGateway} from "aws-sdk";


export interface IApiGatewayService {
    getRestApis(): Promise<APIGateway.Types.RestApis>;
}
