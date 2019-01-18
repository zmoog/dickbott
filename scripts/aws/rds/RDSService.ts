import { IRDSService, DBInstanceWithTags } from "./IRDSService";
import { RDS } from "aws-sdk";
import { inject, injectable } from "inversify";
import { map, assign } from "lodash";

@injectable()
export class RDSService implements IRDSService {
    private rds: RDS;

    constructor(
        @inject("RDS.Types.ClientConfiguration") options: RDS.Types.ClientConfiguration
    ) {
        console.log(`Creating a new RDS Service with %j`, options);
        this.rds = new RDS(options);
    }

    startDBInstance(params: RDS.Types.StartDBInstanceMessage): Promise<RDS.Types.StartDBInstanceResult> {
        return this.rds.startDBInstance(params).promise();
    }

    stopDBCluster(params: RDS.Types.StopDBClusterMessage): Promise<RDS.Types.StopDBClusterResult> {
        return this.rds.stopDBCluster(params).promise();
    }

    stopDBInstance(params: RDS.Types.StopDBInstanceMessage): Promise<RDS.Types.StopDBInstanceResult> {
        return this.rds.stopDBInstance(params).promise();
    }
    
    deleteDBIstance(params: RDS.Types.DeleteDBInstanceMessage): Promise<RDS.Types.DeleteDBInstanceResult> {
        return this.rds.deleteDBInstance(params).promise();
    }

    describeDBIstances(params?: RDS.Types.DescribeDBInstancesMessage): Promise<RDS.Types.DBInstanceMessage> {
        params = params || {};
        return this.rds.describeDBInstances(params).promise();
    }

    async describeDBIstancesWithTags(params?: RDS.Types.DescribeDBInstancesMessage): Promise<DBInstanceWithTags[]> {
        const dbInstances: RDS.Types.DBInstanceList = (await this.describeDBIstances(params)).DBInstances || [];
        return Promise.all(map(dbInstances, async(istance: RDS.Types.DBInstance) => {
            const tagListMessage: RDS.Types.TagListMessage = await this.rds.listTagsForResource({ResourceName: istance.DBInstanceArn}).promise();
            return assign(istance, {TagList: tagListMessage.TagList || []});
        }));
    }
}