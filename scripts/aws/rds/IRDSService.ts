import { RDS } from "aws-sdk";

export interface DBInstanceWithTags extends RDS.Types.DBInstance {
    TagList: RDS.Types.TagList
}

export interface IRDSService {
    startDBInstance(params: RDS.Types.StartDBInstanceMessage): Promise<RDS.Types.StartDBInstanceResult>;
    stopDBCluster(params: RDS.Types.StopDBClusterMessage): Promise<RDS.Types.StopDBClusterResult>;
    stopDBInstance(params: RDS.Types.StopDBInstanceMessage): Promise<RDS.Types.StopDBInstanceResult>;
    deleteDBIstance(params: RDS.Types.DeleteDBInstanceMessage): Promise<RDS.Types.DeleteDBInstanceResult>;
    describeDBIstances(params?: RDS.Types.DescribeDBInstancesMessage): Promise<RDS.Types.DBInstanceMessage>; 
    describeDBIstancesWithTags(params?: RDS.Types.DescribeDBInstancesMessage): Promise<DBInstanceWithTags[]>;
}