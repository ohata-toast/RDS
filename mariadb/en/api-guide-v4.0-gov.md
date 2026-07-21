## RDS for MariaDB API Guide

**Database > RDS for MariaDB > API v4.0 Guide**

## RDS for MariaDB API Common Information

### API Endpoint

| Region | Endpoint |
|------|----------|
| Korea (Pangyo) region | https://kr1-rds-mariadb.api.gov-nhncloudservice.com |


### Authentication and Authorization

RDS for MariaDB uses User Access Key tokens for authentication and authorization when making API calls. The User Access Key token is a temporary, Bearer-type access token issued from a User Access Key. For more information on issuing and using User Access Key tokens, please refer to the [User Access Key Token](/nhncloud/en/public-api/user-access-key-token).
The issued token must be included in the request header along with the Appkey.

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| X-TC-APP-KEY | Header | String | Y | Appkey of RDS for MariaDB or integrated Appkey for project |
| X-NHN-AUTHORIZATION | Header | String | Y | Bearer type token issued with the Public API |

In addition, the APIs you can call are limited based on the project member role. You can grant permissions separately for `RDS for MariaDB ADMIN` and `RDS for MariaDB VIEWER`.

* `RDS for MariaDB ADMIN permission holders` can use all available features as before.
* `RDS for MariaDB VIEWER permission holders` can use read-only feature.
* Cannot use any features aimed at DB instances or create, modify, or delete any DB instance.
* But, notification group and user group-related features are available.

If an API request fails to authenticate or is not authorized, the following error occurs.

| resultCode | resultMessage | Description |
|------------|---------------|-----|
| 80401 | Unauthorized | Failed to authenticate |
| 80403 | Forbidden | Unauthorized. |

### Common Response Information

The API responds with "200 OK" to all API requests. For more information on the response results, see Response Body Header.

<details>
  <summary><strong>Successful Response</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
}
}
```

</details>

<details>
  <summary><strong>Failure Response</strong></summary>

```json
{
"header": {
        "resultCode": -1,
        "resultMessage": "FAIL",
        "isSuccessful": false
}
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| resultCode | Number | Result code<br/>- Success: `0`<br/>- Failure: `Non-zero` |
| resultMessage | String | Result message |
| isSuccessful | Boolean | Successful or not |
### DB engine type

| DB engine type | Available for creation | Available for restoration from OBS | Authentication Plugin Support |
|------------|----------|------------------|------------|
| MARIADB_V10330 | X | X | ED25519, NATIVE |
| MARIADB_V10611 | X | X | ED25519, NATIVE |
| MARIADB_V10612 | X | X | ED25519, NATIVE |
| MARIADB_V10616 | X | X | ED25519, NATIVE |
| MARIADB_V10622 | X | X | ED25519, NATIVE |
| MARIADB_V10625 | X | X | ED25519, NATIVE |
| MARIADB_V101107 | O | O | ED25519, NATIVE |
| MARIADB_V101108 | O | O | ED25519, NATIVE |
| MARIADB_V101113 | O | O | ED25519, NATIVE |
| MARIADB_V101116 | O | O | ED25519, NATIVE |
| MARIADB_V101118 | O | O | ED25519, NATIVE |
| MARIADB_V11407 | O | O | ED25519, NATIVE |
| MARIADB_V11410 | O | O | ED25519, NATIVE |
| MARIADB_V11412 | O | O | ED25519, NATIVE |
| MARIADB_V11806 | O | O | ED25519, NATIVE |
| MARIADB_V11808 | O | O | ED25519, NATIVE |

* You can use the value for the dbVersion field of ENUM type.
* Depending on the version, creation or restoration may not be possible.

## Project Information

### List Project Members

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Project.Get | List project members |

#### Request

```http
GET /v4.0/project/members
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"members": [
{
"memberId": "550e8400-e29b-41d4-a716-446655440000",
"memberName": "memberName-example",
"emailAddress": "user@example.com",
"phoneNumber": "010-1234-5678"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| members | Array | Project member list |
| members.memberId | UUID | Project member identifier |
| members.memberName | String | Project member name |
| members.emailAddress | String | Project member email address |
| members.phoneNumber | String | Project member phone number |

---

### List Regions

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Project.Get | List regions |

#### Request

```http
GET /v4.0/project/regions
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"regions": [
{
"regionCode": "KR1",
"isEnabled": false
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| regions | Array | Region list |
| regions.regionCode | Enum | Region code<br/>- KR1: `Korea (Pangyo)` |
| regions.isEnabled | Boolean | Whether the region is enabled |

---

## Specifications of DB Instance

### List DB Instance Specifications

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbFlavor.List | List DB Instance Specifications |

#### Request

```http
GET /v4.0/db-flavors
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbFlavors": [
{
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbFlavorName": "dbFlavorName-example",
"ram": 1,
"vcpus": 1
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbFlavors | Array | List of DB instance specifications |
| dbFlavors.dbFlavorId | UUID | Identifier of DB instance specifications |
| dbFlavors.dbFlavorName | String | Name of DB instance specifications |
| dbFlavors.ram | Number | Memory size (MB) |
| dbFlavors.vcpus | Number | CPU cores |

---

## Network

### List Subnets

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Network.List | List Subnets |

#### Request

```http
GET /v4.0/network/subnets
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"subnets": [
{
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"subnetName": "subnetName-example",
"subnetCidr": "192.168.0.0/24",
"usingGateway": false,
"availableIpCount": 1
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| subnets | Array | Subnet list |
| subnets.subnetId | UUID | Subnet identifier |
| subnets.subnetName | String | Name to identify subnets |
| subnets.subnetCidr | String | CIDR of subnet |
| subnets.usingGateway | Boolean | Whether to use gateway |
| subnets.availableIpCount | Number | Number of available IPs |

---

## DB Engine

### List DB Engines

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbVersion.List | List DB Engines |

#### Request

```http
GET /v4.0/db-versions
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbVersions": [
{
"dbVersion": "MARIADB_V101107",
"dbVersionName": "dbVersionName-example",
"restorableFromObs": false
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbVersions | Array | DB engine list |
| dbVersions.dbVersion | String | DB engine type |
| dbVersions.dbVersionName | String | DB engine name |
| dbVersions.restorableFromObs | Boolean | Restoring backup from object storage available or not |

---

## Storage

### List Storage Types

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Storage.List | List data storage types |

#### Request

```http
GET /v4.0/storage-types
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"storageTypes": [
"General SSD",
"General HDD"
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| storageTypes | Array | Storage type list |

---

## Task Information

### Task Status

| Status | Description |
|--------------------|----------------------|
| `PREPARING` | Task in preparation |
| `READY` | Task in ready |
| `RUNNING` | Task in progress |
| `COMPLETED` | Task completed |
| `REGISTERED` | Task registered |
| `WAIT_TO_REGISTER` | Task waiting to register |
| `INTERRUPTED` | Task being interrupted |
| `CANCELED` | Task canceled |
| `FAILED` | Task failed |
| `ERROR` | Error occurred while task in progress |
| `DELETED` | Task deleted |
| `FAIL_TO_READY` | Failed to get ready for task |

### List Task Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Job.Get | List Task Details |

#### Request

```http
GET /v4.0/jobs/{jobId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000",
"jobStatus": "DELETED",
"resourceRelations": [
{
"resourceType": "resourceType-example",
"resourceId": "resourceId-example"
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |
| jobStatus | Enum | Current task status<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Array | Relevant resource list |
| resourceRelations.resourceType | String | Relevant resource type |
| resourceRelations.resourceId | String | Relevant resource identifier |
| createdYmdt | DateTime | Created at |
| updatedYmdt | DateTime | Modified date and time |

---

## DB Instance Group

### List DB Instance Groups

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceGroup.List | List DB Instance Groups |

#### Request

```http
GET /v4.0/db-instance-groups
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbInstanceGroups": [
{
"dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
"replicationType": "STANDALONE",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbInstanceGroups | Array | DB instance group list |
| dbInstanceGroups.dbInstanceGroupId | UUID | DB instance group identifier |
| dbInstanceGroups.replicationType | Enum | DB instance group replication type<br/>- STANDALONE: `Without high availability`<br/>- HIGH_AVAILABILITY: `With high availability` |
| dbInstanceGroups.createdYmdt | DateTime | Created at |
| dbInstanceGroups.updatedYmdt | DateTime | Modified date and time |

---

### List DB Instance Group Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceGroup.Get | List DB Instance Group Details |

#### Request

```http
GET /v4.0/db-instance-groups/{dbInstanceGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
"replicationType": "STANDALONE",
"dbInstances": [
{
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceType": "MASTER",
"dbInstanceStatus": "BEFORE_CREATE"
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbInstanceGroupId | UUID | DB instance group identifier |
| replicationType | Enum | DB instance group replication type<br/>- STANDALONE: `Without high availability`<br/>- HIGH_AVAILABILITY: `With high availability` |
| dbInstances | Array | List of DB instances belonging to the DB instance group |
| dbInstances.dbInstanceId | UUID | DB instance identifier |
| dbInstances.dbInstanceType | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstances.dbInstanceStatus | Enum | DB instance current status<br/>- BEFORE_CREATE: `Before create (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| createdYmdt | DateTime | Created at |
| updatedYmdt | DateTime | Modified date and time |

---

## DB Instance

### DB Instance Status

| Status | Description |
|---------------------|------------------------------|
| `AVAILABLE` | DB instance is available |
| `BEFORE_CREATE` | Before DB instance is created |
| `STORAGE_FULL` | Insufficient DB instance storage |
| `FAIL_TO_CREATE` | Failed to create DB instance |
| `FAIL_TO_CONNECT` | Failed to connect DB instance |
| `REPLICATION_STOP` | Replication of DB instance is stopped |
| `FAILOVER` | High availability DB instance failed over |
| `SHUTDOWN` | DB instance is stopped |
| `DELETED` | DB instance is deleted |

### DB Instance Progress Status

| Status | Description |
|----------------------------|--------------|
| `APPLYING_PARAMETER_GROUP` | Parameter group is being applied |
| `BACKING_UP` | Backing up |
| `CANCELING` | Canceling |
| `CREATING` | Creating |
| `CREATING_SCHEMA` | Creating DB schema |
| `CREATING_USER` | Creating user |
| `DELETING` | Deleting |
| `DELETING_SCHEMA` | Deleting DB schema |
| `DELETING_USER` | Deleting user |
| `EXPORTING_BACKUP` | Exporting backup |
| `FAILING_OVER` | Under failover |
| `MIGRATING` | Under migration |
| `MODIFYING` | Under modification |
| `PREPARING` | In preparation |
| `PROMOTING` | Promoting |
| `REBUILDING` | Rebuilding |
| `REPAIRING` | Recovering |
| `REPLICATING` | Replicating |
| `RESTARTING` | Restarting |
| `RESTARTING_FORCIBLY` | Force restarting |
| `RESTORING` | Restoring |
| `STARTING` | Starting |
| `STOPPING` | Stopping |
| `SYNCING_SCHEMA` | Synchronizing DB schema |
| `SYNCING_USER` | Synchronizing user |
| `UPDATING_USER` | Modifying user |

### List DB Instances

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.List | List DB instances |

#### Request

```http
GET /v4.0/db-instances
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbInstances": [
{
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceName": "dbInstanceName-example",
"description": "description-example",
"dbVersion": "MARIADB_V101107",
"dbPort": 1,
"dbInstanceType": "MASTER",
"dbInstanceStatus": "BEFORE_CREATE",
"progressStatus": "NONE",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbInstances | Array | DB instance list |
| dbInstances.dbInstanceId | UUID | DB instance identifier |
| dbInstances.dbInstanceGroupId | UUID | DB instance group identifier |
| dbInstances.dbInstanceName | String | Name to identify DB instances |
| dbInstances.description | String | Additional information on DB instances |
| dbInstances.dbVersion | String | DB engine type |
| dbInstances.dbPort | Number | DB port |
| dbInstances.dbInstanceType | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstances.dbInstanceStatus | Enum | DB instance current status<br/>- BEFORE_CREATE: `Before create (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| dbInstances.progressStatus | Enum | DB instance current task status<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbInstances.createdYmdt | DateTime | Created at |
| dbInstances.updatedYmdt | DateTime | Modified date and time |

---

### Create DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Create | Create DB Instance |

#### Request

```http
POST /v4.0/db-instances
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "MARIADB_V101107",
"dbPort": 1,
"dbUserName": "dbUserName",
"dbPassword": "dbPassword",
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useHighAvailability": false,
"pingInterval": 3,
"useDefaultNotification": false,
"useDeletionProtection": false,
"useSlowQueryAnalysis": true,
"authenticationPlugin": "NATIVE",
"tlsOption": "NONE",
"network": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"storage": {
"storageType": "General SSD",
"storageSize": 20,
"storageAutoscale": {
"useStorageAutoscale": false
}
},
"backup": {
"backupPeriod": 0,
"backupRetryCount": 0,
"ftwrlWaitTimeout": 1800,
"replicationRegion": "KR1",
"useBackupLock": true,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
}
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | Name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | UUID | Y | Identifier of DB instance specifications |
| dbVersion | String | Y | DB engine type |
| dbPort | Number | Y | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| dbUserName | String | Y | DB user account name<br/>- Minimum length: `1`<br/>- Maximum length: `32` |
| dbPassword | String | Y | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `256` |
| parameterGroupId | UUID | Y | Parameter group identifier |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| userGroupIds | Array | N | List of user group identifiers |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Default: `3`<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Boolean | N | Whether to enable deletion protection<br/>- Default: `false` |
| useSlowQueryAnalysis | Boolean | N | Whether to analyze slow queries<br/>- Default: `true` |
| authenticationPlugin | Enum | N | Authentication Plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- ED25519: `ed25519 authentication (MariaDB only)` |
| tlsOption | Enum | N | TLS Option<br/>- Default: `NONE`<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |
| network | Object | Y | Network information object |
| network.subnetId | UUID | Y | Subnet identifier |
| network.usePublicAccess | Boolean | N | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Enum | Y | Availability zone where DB instance will be created |
| storage | Object | Y | Storage information object |
| storage.storageType | Enum | Y | Data storage type |
| storage.storageSize | Number | Y | Data storage size (GB)<br/>- Minimum value: `20` |
| storage.storageAutoscale | Object | N | Data storage auto scaling object |
| storage.storageAutoscale.useStorageAutoscale | Boolean | N | Whether to enable storage auto scaling<br/>- Default: `false` |
| backup | Object | Y | Backup information object |
| backup.backupPeriod | Number | Y | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Number | N | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- KR1: `Korea (Pangyo)` |
| backup.useBackupLock | Boolean | N | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Array | Y | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |

#### When Using High Availability

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceCandidateName | String | Y | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

#### When Using Storage Auto Scaling

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Number | Y | Auto scaling threshold (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storage.storageAutoscale.maxStorageSize | Number | Y | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storage.storageAutoscale.cooldownTime | Number | Y | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Restore DB Instance from Object Storage

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.RestoreFromObs | Restore a DB instance from object storage |

#### Request

```http
POST /v4.0/db-instances/restore-from-obs
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"dbVersion": "MARIADB_V101107",
"useHighAvailability": false,
"pingInterval": 3,
"storage": {
"storageType": "General SSD",
"storageSize": 20,
"storageAutoscale": {
"useStorageAutoscale": false
}
},
"network": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"backup": {
"backupPeriod": 0,
"ftwrlWaitTimeout": 1800,
"backupRetryCount": 0,
"replicationRegion": "KR1",
"useBackupLock": true,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
},
"restore": {
"tenantId": "0123456789abcdef0123456789abcdef",
"username": "username-example",
"password": "password-example",
"targetContainer": "targetContainer-example",
"objectPath": "objectPath-example"
},
"useDefaultNotification": false,
"useSlowQueryAnalysis": true,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDeletionProtection": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | Master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | UUID | Y | Identifier of DB instance specifications |
| dbPort | Number | Y | DB port |
| dbVersion | String | Y | DB engine type |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| storage | Object | Y | Storage information object |
| storage.storageType | Enum | Y | Storage type |
| storage.storageSize | Number | Y | Data storage size (GB)<br/>- Minimum value: `20` |
| storage.storageAutoscale | Object | N | Data storage auto scaling object |
| storage.storageAutoscale.useStorageAutoscale | Boolean | N | Whether to enable storage auto scaling<br/>- Default: `false` |
| network | Object | Y | Network information object |
| network.subnetId | UUID | Y | Subnet identifier |
| network.usePublicAccess | Boolean | N | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Enum | Y | Availability zone where DB instance will be created |
| backup | Object | Y | Backup information object |
| backup.backupPeriod | Number | Y | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.ftwrlWaitTimeout | Number | N | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- KR1: `Korea (Pangyo)` |
| backup.useBackupLock | Boolean | N | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Array | Y | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |
| restore | Object | Y | Restoration information object |
| restore.tenantId | String | Y | Tenant ID of object storage where backups are stored |
| restore.username | String | Y | NHN Cloud account or IAM member ID |
| restore.password | String | Y | API password for object storage where backups are stored |
| restore.targetContainer | String | Y | Container for object storage where backups are stored |
| restore.objectPath | String | Y | Backup path stored in container |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useSlowQueryAnalysis | Boolean | N | Whether to analyze slow queries<br/>- Default: `true` |
| parameterGroupId | UUID | Y | Parameter group identifier |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| userGroupIds | Array | N | List of user group identifiers |
| useDeletionProtection | Boolean | N | Whether to enable deletion protection<br/>- Default: `false` |

#### When Using High Availability

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceCandidateName | String | Y | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

#### When Using Storage Auto Scaling

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Number | Y | Auto scaling threshold (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storage.storageAutoscale.maxStorageSize | Number | Y | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storage.storageAutoscale.cooldownTime | Number | Y | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Delete DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Delete | Delete DB Instance |

#### Request

```http
DELETE /v4.0/db-instances/{dbInstanceId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"deleteAutoBackup": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| deleteAutoBackup | Boolean | N | Whether to delete automated backups<br/>- Default: `false` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### List DB Instance Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Get | List DB Instance Details |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceName": "dbInstanceName-example",
"description": "description-example",
"dbVersion": "MARIADB_V101107",
"dbPort": 1,
"dbInstanceType": "MASTER",
"dbInstanceStatus": "BEFORE_CREATE",
"progressStatus": "NONE",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [
"550e8400-e29b-41d4-a716-446655440000"
],
"notificationGroupIds": [
"550e8400-e29b-41d4-a716-446655440000"
],
"useDeletionProtection": false,
"useSlowQueryAnalysis": false,
"supportAuthenticationPlugin": false,
"needToApplyParameterGroup": false,
"needMigration": false,
"supportDbVersionUpgrade": false,
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbInstanceId | UUID | DB instance identifier |
| dbInstanceGroupId | UUID | DB instance group identifier |
| dbInstanceName | String | Name to identify DB instances |
| description | String | Additional information on DB instances |
| dbVersion | String | DB engine type |
| dbPort | Number | DB port |
| dbInstanceType | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstanceStatus | Enum | DB instance current status<br/>- BEFORE_CREATE: `Before create (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| progressStatus | Enum | DB instance current task status<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbFlavorId | UUID | Identifier of DB instance specifications |
| parameterGroupId | UUID | Parameter group identifier applied to DB instance |
| dbSecurityGroupIds | Array | DB security group identifiers applied to DB instance |
| notificationGroupIds | Array | Notification group identifiers applied to DB instance |
| useDeletionProtection | Boolean | Whether to protect DB instance against deletion |
| useSlowQueryAnalysis | Boolean | Whether to analyze slow queries |
| supportAuthenticationPlugin | Boolean | Whether to support authentication plugin |
| needToApplyParameterGroup | Boolean | Need to apply the latest parameter group |
| needMigration | Boolean | Need to migrate |
| supportDbVersionUpgrade | Boolean | Whether to support DB version upgrade |
| createdYmdt | DateTime | Created at |
| updatedYmdt | DateTime | Modified date and time |

---

### Modify DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Modify | Modify DB Instance |

#### Request

```http
PUT /v4.0/db-instances/{dbInstanceId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName",
"dbInstanceCandidateName": "dbInstanceCandidateName",
"description": "description-example",
"dbPort": 1,
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "MARIADB_V101107",
"useSlowQueryAnalysis": false,
"useDummy": false,
"dbSecurityGroupIds": [],
"executeBackup": false,
"useOnlineFailover": false,
"waitReplicationDelay": false,
"useReadOnly": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | N | Name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | String | N | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbPort | Number | N | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| dbFlavorId | UUID | N | Identifier of DB instance specifications |
| parameterGroupId | UUID | N | Parameter group identifier |
| dbVersion | String | N | DB engine type |
| useSlowQueryAnalysis | Boolean | N | Whether to analyze slow queries |
| useDummy | Boolean | N | Whether to use dummies when upgrading the DB version of a single DB instance<br/>- Default: `false` |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| executeBackup | Boolean | N | Whether to execute backup at this time<br/>- Default: `false` |
| useOnlineFailover | Boolean | N | Whether to restart using failover<br/>- Default: `false` |
| waitReplicationDelay | Boolean | N | Wait for replication lag to clear<br/>- Default: `false` |
| useReadOnly | Boolean | N | Block write load<br/>- Default: `false` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### View Backup Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Get | View Backup Information |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/backup-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"backupPeriod": 1,
"ftwrlWaitTimeout": 1,
"backupRetryCount": 1,
"replicationRegion": "KR1",
"useBackupLock": false,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| backupPeriod | Number | Backup retention period (days) |
| ftwrlWaitTimeout | Number | Query latency (sec) |
| backupRetryCount | Number | Number of backup retries |
| replicationRegion | Enum | Backup replication region<br/>- KR1: `Korea (Pangyo)` |
| useBackupLock | Boolean | Whether to use table lock |
| backupSchedules | Array | Scheduled auto backup list |
| backupSchedules.backupWndBgnTime | Time | Backup start time |
| backupSchedules.backupWndDuration | Enum | Backup duration<br/>- HALF_AN_HOUR<br/>- ONE_HOUR<br/>- ONE_HOUR_AND_HALF<br/>- TWO_HOURS<br/>- TWO_HOURS_AND_HALF<br/>- THREE_HOURS |

---

### Modify Backup Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Modify | Modify Backup Information |

#### Request

```http
PUT /v4.0/db-instances/{dbInstanceId}/backup-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"backupPeriod": 0,
"ftwrlWaitTimeout": 0,
"backupRetryCount": 0,
"replicationRegion": "KR1",
"useBackupLock": false,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| backupPeriod | Number | N | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| ftwrlWaitTimeout | Number | N | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| replicationRegion | Enum | N | Backup replication region<br/>- KR1: `Korea (Pangyo)` |
| useBackupLock | Boolean | N | Whether to use table lock |
| backupSchedules | Array | N | Scheduled auto backup list |
| backupSchedules.backupWndBgnTime | Time | Y | Backup start time |
| backupSchedules.backupWndDuration | Enum | Y | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### View Binary Log List

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceBinLog.List | View binary log list |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/binlogs
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"binLogs": [
{
"binLogFileName": "binLogFileName-example",
"binLogFileSize": 1,
"createdYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| binLogs | Array | BinLog file list |
| binLogs.binLogFileName | String | BinLog file name |
| binLogs.binLogFileSize | Number | BinLog file size (Byte) |
| binLogs.createdYmdt | DateTime | Created at |

---

### Delete Binary Log

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceBinLog.Purge | Delete binary log |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/binlogs/purge
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"lastBinLogFileName": "mysql-bin.000010"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| lastBinLogFileName | String | Y | Last BinLog file name to delete (delete all files prior to this file) |

#### Response

This API does not return a response body.

---

### View Certificate File List

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceCertificate.List | View certificate file list |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/certificates
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"certificates": [
{
"fileName": "fileName-example",
"certificateType": "CA_FILE",
"fileSize": 1,
"createdYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| certificates | Array | Certificate file list |
| certificates.fileName | String | Certificate file name |
| certificates.certificateType | Enum | Certificate type<br/>- CA_FILE<br/>- CERT_FILE<br/>- KEY_FILE |
| certificates.fileSize | Number | Certificate file size (Byte) |
| certificates.createdYmdt | DateTime | Created at |

---

### Export Certificate File

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceCertificate.Export | Export certificate file |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/certificates/upload
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"certificateTypes": [],
"tenantId": "0123456789abcdef0123456789abcdef",
"username": "username-example",
"password": "password-example",
"targetContainer": "targetContainer-example",
"objectPath": "objectPath-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| certificateTypes | Array | Y | Certificate type list to upload |
| tenantId | String | Y | Tenant ID of object storage where certificate file is stored<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | String | Y | NHN Cloud account or IAM member ID |
| password | String | Y | API password for object storage where certificate file is stored |
| targetContainer | String | Y | Object storage container where certificate file is stored |
| objectPath | String | Y | Path of the certificate file to be stored in the container |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### List DB Schema

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceSchema.List | List DB schemas |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/db-schemas
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbSchemas": [
{
"dbSchemaId": "550e8400-e29b-41d4-a716-446655440000",
"dbSchemaName": "dbSchemaName-example",
"dbSchemaStatus": "STABLE",
"createdYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbSchemas | Array | DB schema list |
| dbSchemas.dbSchemaId | UUID | DB schema identifier |
| dbSchemas.dbSchemaName | String | DB schema name |
| dbSchemas.dbSchemaStatus | Enum | DB schema current status<br/>- STABLE<br/>- CREATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbSchemas.createdYmdt | DateTime | Created at |

---

### Create DB Schema

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceSchema.Create | Create DB schema |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/db-schemas
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbSchemaName": "dbSchemaName-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbSchemaName | String | Y | DB schema name<br/>- Maximum length: `64`<br/>- Must start with a letter; letters, digits, and _ allowed; 1–64 characters; MySQL reserved words not allowed |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Delete DB Schema

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceSchema.Delete | Delete DB schema |

#### Request

```http
DELETE /v4.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| dbSchemaId | URL | UUID | Y | DB schema identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### List DB Users

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceUser.List | List DB Users |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/db-users
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbUsers": [
{
"dbUserId": "550e8400-e29b-41d4-a716-446655440000",
"dbUserName": "dbUserName-example",
"host": "192.168.0.1",
"authorityType": "CUSTOM",
"dbUserStatus": "STABLE",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00",
"authenticationPlugin": "NATIVE",
"tlsOption": "NONE"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbUsers | Array | DB users |
| dbUsers.dbUserId | UUID | DB user identifier |
| dbUsers.dbUserName | String | DB user account name |
| dbUsers.host | String | DB user account host name |
| dbUsers.authorityType | Enum | DB user permission type<br/>- CUSTOM: `Custom permission`<br/>- READ: `Read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `Full permission` |
| dbUsers.dbUserStatus | Enum | DB user current status<br/>- STABLE<br/>- CREATING<br/>- UPDATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbUsers.createdYmdt | DateTime | Created at |
| dbUsers.updatedYmdt | DateTime | Modified date and time |
| dbUsers.authenticationPlugin | Enum | Authentication plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- ED25519: `ed25519 authentication (MariaDB only)` |
| dbUsers.tlsOption | Enum | TLS option<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |

---

### Create DB User

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceUser.Create | Create DB User |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/db-users
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbUserName": "dbUserName",
"dbPassword": "dbPassword",
"host": "192.168.0.1",
"authorityType": "CUSTOM",
"authenticationPlugin": "NATIVE",
"tlsOption": "NONE"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbUserName | String | Y | DB user account name<br/>- Minimum length: `1`<br/>- Maximum length: `32` |
| dbPassword | String | Y | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `256` |
| host | String | Y | DB user account host name<br/>- Maximum length: `45` |
| authorityType | Enum | Y | DB user permission type<br/>- CUSTOM: `Custom permission`<br/>- READ: `Read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `Full permission` |
| authenticationPlugin | Enum | N | Authentication plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- ED25519: `ed25519 authentication (MariaDB only)` |
| tlsOption | Enum | N | TLS option<br/>- Default value: `NONE`<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Delete DB User

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceUser.Delete | Delete DB User |

#### Request

```http
DELETE /v4.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| dbUserId | URL | UUID | Y | DB user identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Modify DB User

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceUser.Modify | Modify DB User |

#### Request

```http
PUT /v4.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| dbUserId | URL | UUID | Y | DB user identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbPassword": "dbPassword",
"authorityType": "CUSTOM",
"authenticationPlugin": "NATIVE",
"tlsOption": "NONE"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbPassword | String | N | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `256` |
| authorityType | Enum | N | DB user permission type<br/>- CUSTOM: `Custom permission`<br/>- READ: `Read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `Full permission` |
| authenticationPlugin | Enum | N | Authentication plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- ED25519: `ed25519 authentication (MariaDB only)` |
| tlsOption | Enum | N | TLS option<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Change DB Instance Deletion Protection Settings

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Modify | Change DB Instance Deletion Protection Settings |

#### Request

```http
PUT /v4.0/db-instances/{dbInstanceId}/deletion-protection
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"useDeletionProtection": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| useDeletionProtection | Boolean | Y | Whether to enable deletion protection |

#### Response

This API does not return a response body.

---

### Force Restart DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.ForceRestart | Force Restart DB Instance |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/force-restart
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### View High Availability Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Get | View high availability information |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/high-availability
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"useHighAvailability": false,
"haStatus": "CREATED",
"pingInterval": 1,
"pingType": "pingType-example"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| useHighAvailability | Boolean | Whether to use high availability<br/>- Default: `false` |
| haStatus | Enum | High availability status<br/>- CREATED: `Created`<br/>- STABLE: `Stable`<br/>- PAUSING: `Pausing`<br/>- DISABLE: `Disabled`<br/>- DISABLE_MASTER_IN_REPLICATION: `High availability stopped due to abnormal master replication detected`<br/>- DISABLE_MHA_PROCESS: `High availability process stopped`<br/>- DISABLE_REPLICATION_STOP: `High availability stopped due to replication stop`<br/>- DISABLE_REPLICATION_DELAY: `High availability stopped due to replication delay`<br/>- FAILOVER_STARTED: `Failover started`<br/>- FAILOVER_FAILED: `Failover failed`<br/>- FAILOVER_COMPLETED: `Failover completed`<br/>- DELETED: `Deleted`<br/>- PAUSED: `Paused`<br/>- PAUSED_DUE_TO_TASK: `Paused due to task`<br/>- MASTER_FAILURE_DETECTION: `Master failure detected` |
| pingInterval | Number | Ping interval (seconds) |
| pingType | String | Ping type |

---

### Modify High Availability

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:HighAvailability.Modify | Modify high availability |

#### Request

```http
PUT /v4.0/db-instances/{dbInstanceId}/high-availability
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"useHighAvailability": false,
"pingInterval": 1
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| useHighAvailability | Boolean | Y | Whether to use high availability |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |

#### When Using High Availability

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceCandidateName | String | Y | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Pause High Availability

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:HighAvailability.Pause | Pause high availability |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Repair High Availability

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:HighAvailability.Repair | Repair high availability |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Restart High Availability

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:HighAvailability.Resume | Restart high availability |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Separate High Availability

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:HighAvailability.Split | Separate high availability |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/split
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### List Log Files

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceLog.List | List log files |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/log-files
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"logFiles": [
{
"logFileName": "logFileName-example",
"logFileType": "ERROR",
"logFileSize": 1,
"createdYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| logFiles | Array | Log file list |
| logFiles.logFileName | String | Log file name |
| logFiles.logFileType | Enum | Log file type<br/>- ERROR<br/>- BINLOG<br/>- GENERAL<br/>- SLOW_QUERY<br/>- AUDIT<br/>- BACKUP |
| logFiles.logFileSize | Number | Log file size (Byte) |
| logFiles.createdYmdt | DateTime | Created at |

---

### Export Log File

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceLog.Export | Export log files |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/log-files/export
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"logFileNames": [],
"tenantId": "0123456789abcdef0123456789abcdef",
"username": "username-example",
"password": "password-example",
"targetContainer": "targetContainer-example",
"objectPath": "objectPath-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| logFileNames | Array | Y | Log file name list |
| tenantId | String | Y | Tenant ID of the object storage where log files are stored<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | String | Y | NHN Cloud account or IAM member ID |
| password | String | Y | API password for the object storage where log files are stored |
| targetContainer | String | Y | Object storage container where log files are stored |
| objectPath | String | Y | Path of the log file to be stored in the container |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### View Log File Contents

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstanceLog.Get | View log file contents |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/log-files/{logFileName}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| logFileName | URL | UUID | Y | Log file name |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"content": "content-example"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| content | String | Log file contents (maximum 65533 bytes) |

---

### List DB Instance Maintenances

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Maintenance.List | List DB instance maintenances |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/maintenances
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| type | Query | String | N |  |
| statuses | Query | String | N |  |
| category | Query | String | N |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"totalCounts": 1,
"maintenances": [
{
"maintenanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"category": "USER",
"description": "description-example",
"type": "UPDATE_DB_INSTANCE",
"payload": {
},
"required": false,
"deadlineYmdt": "2023-12-31T15:00:00+09:00",
"status": "PENDING",
"executionType": "SCHEDULED",
"addedYmdt": "2023-12-31T15:00:00+09:00",
"executionStartedYmdt": "2023-12-31T15:00:00+09:00",
"executionCompletedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| totalCounts | Number | Total number of maintenances |
| maintenances | Array | List of maintenances |
| maintenances.maintenanceId | UUID | Maintenance ID |
| maintenances.dbInstanceId | UUID | DB instance ID |
| maintenances.category | Enum | Maintenance category<br/>- USER: `User maintenance category`<br/>- PROVIDER: `Provider maintenance category`<br/>- AUTO: `Auto maintenance category` |
| maintenances.description | String | Maintenance description |
| maintenances.type | Enum | Maintenance type<br/>- UPDATE_DB_INSTANCE: `Modify DB instance (flavor change, port change, parameter group change)`<br/>- UPGRADE_ENGINE_VERSION: `Engine version upgrade`<br/>- APPLY_CHANGE_PARAMETER: `Apply parameter changes in parameter group`<br/>- UPGRADE_OS: `OS version upgrade`<br/>- PATCH_SECURITY: `Security patch`<br/>- MIGRATION: `Migration for hypervisor maintenance`<br/>- CLEANUP_STORAGE: `Storage cleanup` |
| maintenances.payload | Object | Payload according to maintenance type |
| maintenances.required | Boolean | Whether the maintenance is required |
| maintenances.deadlineYmdt | DateTime | Datetime when the maintenance is forcibly applied |
| maintenances.status | Enum | Maintenance status<br/>- PENDING: `Pending`<br/>- READY: `Ready`<br/>- RUNNING: `Running`<br/>- COMPLETED: `Completed`<br/>- FAILED: `Failed`<br/>- EXCLUDED: `Excluded`<br/>- DELETED: `Deleted`<br/>- SUSPENDED: `Suspended`<br/>- UNKNOWN |
| maintenances.executionType | Enum | Maintenance execution type<br/>- SCHEDULED: `Scheduled execution (automatic execution during maintenance window)`<br/>- MANUAL: `Manual execution (immediate execution)`<br/>- FORCED: `Forced execution (automatic execution after deadline exceeded)` |
| maintenances.addedYmdt | DateTime | Datetime when the maintenance was scheduled |
| maintenances.executionStartedYmdt | DateTime | Maintenance start datetime |
| maintenances.executionCompletedYmdt | DateTime | Maintenance end datetime |

---

### Execute DB Instance Maintenance Now

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Maintenance.Execute | Execute DB instance maintenance now |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/maintenances/execute-now
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"configId": "configId-example",
"category": "USER",
"description": "description-example",
"type": "UPDATE_DB_INSTANCE",
"payload": "payload-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| configId | String | Y | Configuration ID |
| category | Enum | Y | Maintenance category<br/>- USER: `User maintenance category`<br/>- PROVIDER: `Provider maintenance category`<br/>- AUTO: `Auto maintenance category` |
| description | String | N | Maintenance description |
| type | Enum | Y | Maintenance type<br/>- UPDATE_DB_INSTANCE: `Modify DB instance (flavor change, port change, parameter group change)`<br/>- UPGRADE_ENGINE_VERSION: `Engine version upgrade`<br/>- APPLY_CHANGE_PARAMETER: `Apply parameter changes in parameter group`<br/>- UPGRADE_OS: `OS version upgrade`<br/>- PATCH_SECURITY: `Security patch`<br/>- MIGRATION: `Migration for hypervisor maintenance`<br/>- CLEANUP_STORAGE: `Storage cleanup` |
| payload | String | Y | Payload according to maintenance type |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Schedule DB Instance Maintenance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Maintenance.Update | Schedule DB instance maintenance |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/maintenances/schedule
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"configId": "configId-example",
"category": "USER",
"description": "description-example",
"type": "UPDATE_DB_INSTANCE",
"payload": "payload-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| configId | String | Y | Configuration ID |
| category | Enum | Y | Maintenance category<br/>- USER: `User maintenance category`<br/>- PROVIDER: `Provider maintenance category`<br/>- AUTO: `Auto maintenance category` |
| description | String | N | Maintenance description |
| type | Enum | Y | Maintenance type<br/>- UPDATE_DB_INSTANCE: `Modify DB instance (flavor change, port change, parameter group change)`<br/>- UPGRADE_ENGINE_VERSION: `Engine version upgrade`<br/>- APPLY_CHANGE_PARAMETER: `Apply parameter changes in parameter group`<br/>- UPGRADE_OS: `OS version upgrade`<br/>- PATCH_SECURITY: `Security patch`<br/>- MIGRATION: `Migration for hypervisor maintenance`<br/>- CLEANUP_STORAGE: `Storage cleanup` |
| payload | String | Y | Payload according to maintenance type |

#### Response

This API does not return a response body.

---

### Delete DB Instance Maintenance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Maintenance.Delete | Delete DB instance maintenance |

#### Request

```http
DELETE /v4.0/db-instances/{dbInstanceId}/maintenances/{maintenanceId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |
| maintenanceId | URL | UUID | Y | Maintenance ID |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List Network Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Get | List Network Information |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/network-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"availabilityZone": "kr-pub-a",
"subnet": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"subnetName": "subnetName-example",
"subnetCidr": "192.168.0.0/24"
},
"endPoints": [
{
"domain": "domain-example",
"ipAddress": "192.168.0.1",
"endPointType": "https://example.com"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| availabilityZone | String | Availability zone where DB instance will be created |
| subnet | Object | Subnet object |
| subnet.subnetId | UUID | Subnet identifier |
| subnet.subnetName | String | Name to identify subnets |
| subnet.subnetCidr | String | CIDR of subnet |
| endPoints | Array | List of access information |
| endPoints.domain | String | Domain |
| endPoints.ipAddress | String | IP address |
| endPoints.endPointType | String | Access information type |

---

### Modify Network Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Modify | Modify Network Information |

#### Request

```http
PUT /v4.0/db-instances/{dbInstanceId}/network-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"usePublicAccess": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| usePublicAccess | Boolean | Y | External access is available or not |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Promote DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Promote | Promote DB Instance |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/promote
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Rebuild DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Rebuild | Rebuild DB Instance |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/rebuild
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Replicate DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Replicate | Replicate DB Instance |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/replicate
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDefaultNotification": false,
"useDeletionProtection": false,
"useSlowQueryAnalysis": true,
"network": {
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"storage": {
"storageType": "General SSD",
"storageSize": 20,
"storageAutoscale": {
"useStorageAutoscale": false
}
},
"backup": {
"backupPeriod": 0,
"backupRetryCount": 0,
"ftwrlWaitTimeout": 0,
"replicationRegion": "KR1",
"useBackupLock": false,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
}
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | Name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | UUID | N | Identifier of DB instance specifications |
| dbPort | Number | N | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| parameterGroupId | UUID | N | Parameter group identifier |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| userGroupIds | Array | N | List of user group identifiers |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Boolean | N | Whether to enable deletion protection<br/>- Default: `false` |
| useSlowQueryAnalysis | Boolean | N | Whether to analyze slow queries<br/>- Default: `true` |
| network | Object | Y | Network information object |
| network.usePublicAccess | Boolean | N | External access is available or not |
| network.availabilityZone | Enum | Y | Availability zone where DB instance will be created |
| storage | Object | N | Storage information object |
| storage.storageType | Enum | N | Data storage type |
| storage.storageSize | Number | N | Data storage size (GB)<br/>- Minimum value: `20` |
| storage.storageAutoscale | Object | N | Data storage auto scaling object |
| storage.storageAutoscale.useStorageAutoscale | Boolean | N | Whether to enable storage auto scaling<br/>- Default: `false` |
| backup | Object | N | Backup information object |
| backup.backupPeriod | Number | N | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Number | N | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- KR1: `Korea (Pangyo)` |
| backup.useBackupLock | Boolean | N | Whether to use table lock |
| backup.backupSchedules | Array | N | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Time | N | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | N | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |

#### When Using Storage Auto Scaling

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Number | Y | Auto scaling threshold (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storage.storageAutoscale.maxStorageSize | Number | Y | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storage.storageAutoscale.cooldownTime | Number | Y | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Restart DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Restart | Restart DB Instance |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/restart
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"useOnlineFailover": false,
"executeBackup": false,
"waitReplicationDelay": false,
"useReadOnly": false,
"osRestart": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| useOnlineFailover | Boolean | N | Whether to restart using failover<br/>- Default: `false` |
| executeBackup | Boolean | N | Whether to execute backup at this time<br/>- Default: `false` |
| waitReplicationDelay | Boolean | N | Wait for replication lag to clear<br/>- Default: `false` |
| useReadOnly | Boolean | N | Block write load<br/>- Default: `false` |
| osRestart | Boolean | N | Whether to restart the operating system<br/>- Default: `false` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### View Restoration Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Get | View Restoration Information |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/restoration-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"oldestRestorableYmdt": "2023-12-31T15:00:00+09:00",
"latestRestorableYmdt": "2023-12-31T15:00:00+09:00",
"restorableBackups": [
{
"backup": {
"backupId": "550e8400-e29b-41d4-a716-446655440000",
"backupName": "backupName-example",
"backupStatus": "BACKING_UP",
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceName": "dbInstanceName-example",
"dbVersion": "MARIADB_V101107",
"backupType": "AUTO",
"backupSize": 1,
"useBackupLock": false,
"failoverCount": 1,
"binLogFileName": "binLogFileName-example",
"binLogPosition": {
},
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
},
"restorableBinLogs": []
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| oldestRestorableYmdt | DateTime | Oldest restorable time |
| latestRestorableYmdt | DateTime | Most recent restorable time |
| restorableBackups | Array | List of restorable backups |
| restorableBackups.backup | Object | Backup information object |
| restorableBackups.backup.backupId | UUID | Backup identifier |
| restorableBackups.backup.backupName | String | Backup name |
| restorableBackups.backup.backupStatus | Enum | Backup status<br/>- BACKING_UP: `Backing up (spinner)`<br/>- VERIFYING: `Verifying (spinner)`<br/>- COMPLETED: `Available (green icon)`<br/>- DELETING: `Deleting (spinner)`<br/>- DELETED: `Deleted (gray icon)`<br/>- ERROR: `Error (red icon)` |
| restorableBackups.backup.dbInstanceId | UUID | Source DB instance identifier |
| restorableBackups.backup.dbInstanceName | String | Source DB instance name |
| restorableBackups.backup.dbVersion | String | DB engine type |
| restorableBackups.backup.backupType | Enum | Backup type<br/>- AUTO<br/>- MANUAL |
| restorableBackups.backup.backupSize | Number | Backup size |
| restorableBackups.backup.useBackupLock | Boolean | Whether to use table lock |
| restorableBackups.backup.failoverCount | Number | Number of failovers |
| restorableBackups.backup.binLogFileName | String | Binary log file name |
| restorableBackups.backup.binLogPosition | Object | Binary log file location |
| restorableBackups.backup.createdYmdt | DateTime | Date and time of backup creation |
| restorableBackups.backup.updatedYmdt | DateTime | Date and time of backup renewal |
| restorableBackups.restorableBinLogs | Array | Binary log names that can be restored using the backup |

---

### View the Last Query to Be Restored

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Get | View the Last Query to Be Restored |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/restoration-info/last-query
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"executedYmdt": "2023-12-31T15:00:00+09:00",
"lastQuery": "lastQuery-example"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| executedYmdt | DateTime | Query executed date |
| lastQuery | String | Last executed query |

---

### Restore DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Restore | Restore DB Instance |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/restore
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"useHighAvailability": false,
"pingInterval": 3,
"storage": {
"storageType": "General SSD",
"storageSize": 20,
"storageAutoscale": {
"useStorageAutoscale": false
}
},
"network": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"backup": {
"backupPeriod": 0,
"ftwrlWaitTimeout": 1800,
"backupRetryCount": 0,
"replicationRegion": "KR1",
"useBackupLock": true,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
},
"restore": {
"restoreType": "TIMESTAMP",
"binLog": {
"binLogFileName": "binLogFileName-example",
"binLogPosition": {
}
}
},
"useDefaultNotification": false,
"useSlowQueryAnalysis": true,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDeletionProtection": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | Master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | UUID | N | Identifier of DB instance specifications. If not specified, the specifications of the source instance are applied. |
| dbPort | Number | N | DB port |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| storage | Object | N | Storage information object. If not specified, the storage settings of the source instance are applied. |
| storage.storageType | Enum | N | Storage type. If not specified, the storage type of the source instance is applied. |
| storage.storageSize | Number | N | Data storage size (GB). If not specified, the storage size of the source instance is applied.<br/>- Minimum value: `20` |
| storage.storageAutoscale | Object | N | Data storage auto scaling object |
| storage.storageAutoscale.useStorageAutoscale | Boolean | N | Whether to enable storage auto scaling<br/>- Default: `false` |
| network | Object | N | Network information object. If not specified, the network settings of the source instance are applied. |
| network.subnetId | UUID | N | Subnet identifier. If not specified, the source instance value is used. |
| network.usePublicAccess | Boolean | N | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Enum | N | Availability zone where DB instance will be created. If not specified, randomly selected. |
| backup | Object | N | Backup information object. If not specified, the backup settings of the source instance are applied. |
| backup.backupPeriod | Number | N | Backup retention period (days). If not specified, the backup retention period of the source instance is applied.<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.ftwrlWaitTimeout | Number | N | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- KR1: `Korea (Pangyo)` |
| backup.useBackupLock | Boolean | N | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Array | N | Scheduled auto backup list. If not specified, the backup schedule of the source instance is applied. |
| backup.backupSchedules.backupWndBgnTime | Time | N | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | N | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |
| restore | Object | Y | Restoration information object |
| restore.restoreType | Enum | Y | Restoration type<br/>- TIMESTAMP: `A point-in-time restoration type using the time within the restorable time`<br/>- BINLOG: `A point-in-time restoration type using a binary log location that can be restored`<br/>- BACKUP: `Snapshot restoration type using a previously created backup` |
| restore.binLog.binLogFileName | String | N | Binary log name to use for restoration |
| restore.binLog.binLogPosition | Object | N | Binary log location to use for restoration |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useSlowQueryAnalysis | Boolean | N | Whether to analyze slow queries<br/>- Default: `true` |
| parameterGroupId | UUID | N | Parameter group identifier. If not specified, the parameter group of the source instance is applied. |
| dbSecurityGroupIds | Array | N | DB security group identifier list. If not specified, the security groups of the source instance are applied. |
| userGroupIds | Array | N | List of user group identifiers |
| useDeletionProtection | Boolean | N | Whether to enable deletion protection<br/>- Default: `false` |

#### When Using High Availability

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceCandidateName | String | Y | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

#### When Using Storage Auto Scaling

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Number | Y | Auto scaling threshold (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storage.storageAutoscale.maxStorageSize | Number | Y | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storage.storageAutoscale.cooldownTime | Number | Y | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

#### Request when restoring a point in time using Timestamp (if restoreType is `TIMESTAMP`)

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| restore.restoreYmdt | DateTime | N | DB instance restore date (YYYY-MM-DDThh:mm:ss.SSSTZD) |

Restoration is possible only before the most recent restorable time, which is queried through restoration information inquiry.

#### Request for point-in-time restoration using binary logs (if restoreType is `BINLOG`)

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| restore.backupId | UUID | N | Identifier of the backup to use for restoration |
| restore.binLog | Object | N | Binary log information object |

When restoring a point in time using the binary log, it is possible to restore the log recorded after that based on the binary log file and location of the base backup.

#### Request when restoring from backup (if restoreType is `BACKUP`)

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| restore.backupId | UUID | N | Identifier of the backup to use for restoration |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Start DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Start | Start DB Instance |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/start
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Stop DB Instance

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Stop | Stop DB Instance |

#### Request

```http
POST /v4.0/db-instances/{dbInstanceId}/stop
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### View Storage Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Get | View Storage Information |

#### Request

```http
GET /v4.0/db-instances/{dbInstanceId}/storage-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"storageType": "General SSD",
"storageSize": 1,
"storageStatus": "DELETED",
"storageAutoscale": {
"useStorageAutoscale": false,
"threshold": 1,
"maxStorageSize": 1,
"cooldownTime": 1
}
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| storageType | String | Data storage type |
| storageSize | Number | Data storage size (GB) |
| storageStatus | Enum | Current status of data storage<br/>- DELETED: `Deleted`<br/>- PENDING_DELETION: `Pending deletion`<br/>- DELETION_RESERVED: `Deletion reserved (awaiting snapshot cleanup)`<br/>- DETACHED: `Detached`<br/>- ATTACHED: `Attached` |
| storageAutoscale | Object | Data storage auto scaling object |
| storageAutoscale.useStorageAutoscale | Boolean | Whether to enable storage auto scaling |
| storageAutoscale.threshold | Number | Auto scale out conditions (%) |
| storageAutoscale.maxStorageSize | Number | Auto scaling maximum size (GB) |
| storageAutoscale.cooldownTime | Number | Auto scaling cooldown time (minutes) |

---

### Modify Storage Information

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbInstance.Modify | Modify Storage Information |

#### Request

```http
PUT /v4.0/db-instances/{dbInstanceId}/storage-info
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DB instance identifier |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"storageSize": 1,
"storageAutoscale": {
"useStorageAutoscale": false
}
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| storageSize | Number | Y | Data storage size (GB)<br/>- Maximum value: `2048` |
| storageAutoscale | Object | N | Data storage auto scaling object |
| storageAutoscale.useStorageAutoscale | Boolean | N | Whether to enable storage auto scaling |

#### When Using Storage Auto Scaling

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| storageAutoscale.threshold | Number | Y | Auto scaling threshold (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storageAutoscale.maxStorageSize | Number | Y | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storageAutoscale.cooldownTime | Number | Y | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

## Backups

### Backup Status

| Status | Description |
|--------------|--------------|
| `BACKING_UP` | Backup in progress |
| `COMPLETED` | Backup is completed |
| `DELETING` | Backup is being deleted |
| `DELETED` | Backup is deleted |
| `ERROR` | Error occurred |

### Retrieve Backup List

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Backup.List | Retrieve backup list |

#### Request

```http
GET /v4.0/backups
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"totalCounts": 1,
"backups": [
{
"backupId": "550e8400-e29b-41d4-a716-446655440000",
"backupName": "backupName-example",
"backupStatus": "BACKING_UP",
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "MARIADB_V101107",
"utilVersion": "utilVersion-example",
"backupType": "AUTO",
"backupSize": 1,
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| totalCounts | Number | Total number of backup list entries |
| backups | Array | Backup list |
| backups.backupId | UUID | Backup identifier |
| backups.backupName | String | Name to identify the backup |
| backups.backupStatus | Enum | Current backup status<br/>- BACKING_UP: `Backup in progress (spinner)`<br/>- VERIFYING: `Verifying (spinner)`<br/>- COMPLETED: `Available (green icon)`<br/>- DELETING: `Deleting (spinner)`<br/>- DELETED: `Deleted (gray icon)`<br/>- ERROR: `Error (red icon)` |
| backups.dbInstanceId | UUID | Source DB instance identifier |
| backups.dbVersion | String | DB engine type |
| backups.utilVersion | String | Utility version |
| backups.backupType | Enum | Backup type<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Number | Backup size (Byte) |
| backups.createdYmdt | DateTime | Created at |
| backups.updatedYmdt | DateTime | Modified date and time |

---

### Create Backup

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Backup.Create | Create backup |

#### Request

```http
POST /v4.0/backups
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"backupName": "backupName",
"baseBackupId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"backupMethodType": "FULL"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| backupName | String | Y | Name to identify the backup<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| baseBackupId | UUID | N | Source backup identifier |
| dbInstanceId | UUID | N | DB instance identifier |
| backupMethodType | Enum | Y | Backup method type<br/>- FULL: `Full backup`<br/>- INCREMENTAL: `Incremental backup`<br/>- SNAPSHOT: `Snapshot backup` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Delete Backup

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Backup.Delete | Delete backup |

#### Request

```http
DELETE /v4.0/backups/{backupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### View Backup Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Backup.Get | View backup details |

#### Request

```http
GET /v4.0/backups/{backupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"backup": {
"backupId": "550e8400-e29b-41d4-a716-446655440000",
"regionCode": "KR1",
"backupName": "backupName-example",
"backupStatus": "BACKING_UP",
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceName": "dbInstanceName-example",
"dbVersion": "MARIADB_V101107",
"utilVersion": "utilVersion-example",
"backupType": "AUTO",
"backupMethodType": "FULL",
"backupFileType": "XBSTREAM",
"backupSize": 1,
"isReplicable": false,
"binLogFileName": "binLogFileName-example",
"binLogPosition": {
},
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| backup | Object | Backup details |
| backup.backupId | UUID | Backup identifier |
| backup.regionCode | Enum | Region code<br/>- KR1: `Korea (Pangyo)` |
| backup.backupName | String | Name to identify the backup |
| backup.backupStatus | Enum | Current backup status<br/>- BACKING_UP: `Backup in progress (spinner)`<br/>- VERIFYING: `Verifying (spinner)`<br/>- COMPLETED: `Available (green icon)`<br/>- DELETING: `Deleting (spinner)`<br/>- DELETED: `Deleted (gray icon)`<br/>- ERROR: `Error (red icon)` |
| backup.dbInstanceId | UUID | Source DB instance identifier |
| backup.dbInstanceName | String | Source DB instance name |
| backup.dbVersion | String | DB engine version |
| backup.utilVersion | String | Utility version |
| backup.backupType | Enum | Backup type (AUTO, MANUAL)<br/>- AUTO<br/>- MANUAL |
| backup.backupMethodType | Enum | Backup method (FULL, SNAPSHOT, INCREMENTAL)<br/>- FULL<br/>- INCREMENTAL<br/>- SNAPSHOT |
| backup.backupFileType | Enum | Backup file type<br/>- XBSTREAM<br/>- TAR_ZSTD<br/>- TAR_LZ4<br/>- TAR_GZIP<br/>- SNAPSHOT |
| backup.backupSize | Number | Backup size (Byte) |
| backup.isReplicable | Boolean | Whether replication is possible |
| backup.binLogFileName | String | Binary log file name |
| backup.binLogPosition | Object | Binary log location |
| backup.createdYmdt | DateTime | Created at |
| backup.updatedYmdt | DateTime | Modified date and time |

---

### Export Backup

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Backup.Export | Export backup |

#### Request

```http
POST /v4.0/backups/{backupId}/export
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"tenantId": "0123456789abcdef0123456789abcdef",
"username": "username-example",
"password": "password-example",
"targetContainer": "targetContainer-example",
"objectPath": "objectPath-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| tenantId | String | Y | Tenant ID of the object storage where the backup will be stored<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | String | Y | NHN Cloud account or IAM member ID |
| password | String | Y | API password of the object storage where the backup will be stored |
| targetContainer | String | Y | Object storage container where the backup will be stored |
| objectPath | String | Y | Path of the backup to be stored in the container |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Restore Backup

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Backup.Restore | Restore backup |

#### Request

```http
POST /v4.0/backups/{backupId}/restore
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useHighAvailability": false,
"pingInterval": 3,
"useDefaultNotification": false,
"useDeletionProtection": false,
"useSlowQueryAnalysis": true,
"network": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"storage": {
"storageType": "General SSD",
"storageSize": 20,
"storageAutoscale": {
"useStorageAutoscale": false
}
},
"backup": {
"backupPeriod": 0,
"backupRetryCount": 0,
"ftwrlWaitTimeout": 0,
"replicationRegion": "KR1",
"useBackupLock": false,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
}
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | Master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | UUID | N | DB instance specification identifier. If not specified, the source instance value is used |
| dbPort | Number | N | DB port. If not specified, the source instance value is used<br/>- Minimum value: 3306, Maximum value: 43306 |
| parameterGroupId | UUID | N | Parameter group identifier. If not specified, the source instance value is used |
| dbSecurityGroupIds | Array | N | List of DB security group identifiers |
| userGroupIds | Array | N | List of user group identifiers |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Default: `3`<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Boolean | N | Whether to enable deletion protection<br/>- Default: `false` |
| useSlowQueryAnalysis | Boolean | N | Whether to analyze slow queries<br/>- Default: `true` |
| network | Object | N | Network information object. If not specified, the source instance value is used |
| network.subnetId | UUID | N | Subnet identifier. If not specified, the source instance value is used |
| network.usePublicAccess | Boolean | N | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Enum | N | Availability zone where the DB instance will be created. If not specified, a random zone is selected |
| storage | Object | N | Storage information object. If not specified, the source instance value is used |
| storage.storageType | Enum | N | Storage type. If not specified, the source instance value is used |
| storage.storageSize | Number | N | Data storage size (GB). If not specified, the source instance value is used<br/>- Minimum value: `20` |
| storage.storageAutoscale | Object | N | Data storage auto scaling object. If not specified, the source instance value is used |
| storage.storageAutoscale.useStorageAutoscale | Boolean | N | Whether to enable storage auto scaling<br/>- Default: `false` |
| backup | Object | N | Backup information object. If not specified, the source instance backup settings are used |
| backup.backupPeriod | Number | N | Backup retention period (days). If not specified, the source instance value is used<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Number | N | Number of backup retries. If not specified, the source instance value is used<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Number | N | Query latency wait time (sec). If not specified, the source instance value is used<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- KR1: `Korea (Pangyo)` |
| backup.useBackupLock | Boolean | N | Whether to use table lock. If not specified, the source instance value is used |
| backup.backupSchedules | Array | N | Backup schedule list. If not specified, the source instance value is used |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup start time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |

#### When Using High Availability

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceCandidateName | String | Y | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

#### When Using Storage Auto Scaling

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Number | Y | Auto scaling threshold (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storage.storageAutoscale.maxStorageSize | Number | Y | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storage.storageAutoscale.cooldownTime | Number | Y | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

## DB Security Group

### DB Security Group Progress

| Status | Description |
|-----------------|--------------|
| `NONE` | No task in progress |
| `CREATING_RULE` | Creating rules |
| `UPDATING_RULE` | Modifying rules |
| `DELETING_RULE` | Deleting rules |

### List DB Security Groups

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbSecurityGroup.List | List DB security groups |

#### Request

```http
GET /v4.0/db-security-groups
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"totalCounts": 1,
"dbSecurityGroups": [
{
"dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupName": "dbSecurityGroupName-example",
"description": "description-example",
"progressStatus": "NONE",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| totalCounts | Number | Total number of DB security groups |
| dbSecurityGroups | Array | DB security groups |
| dbSecurityGroups.dbSecurityGroupId | UUID | DB security group identifier |
| dbSecurityGroups.dbSecurityGroupName | String | Name to identify the DB security group |
| dbSecurityGroups.description | String | Additional information on DB security group |
| dbSecurityGroups.progressStatus | Enum | Current status of DB security group<br/>- NONE: `None`<br/>- CREATING_RULE: `Creating rules`<br/>- UPDATING_RULE: `Modifying rules`<br/>- DELETING_RULE: `Deleting rules`<br/>- APPLYING_DEFAULT_RULE: `Applying default rules` |
| dbSecurityGroups.createdYmdt | DateTime | Created at |
| dbSecurityGroups.updatedYmdt | DateTime | Modified date and time |

---

### Create DB Security Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbSecurityGroup.Create | Create DB security group |

#### Request

```http
POST /v4.0/db-security-groups
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbSecurityGroupName": "dbSecurityGroupName",
"description": "description-example",
"rules": [
{
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 3306,
"maxPort": 1
},
"cidr": "192.168.0.0/24",
"description": "description-example"
}
]
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | Y | Name to identify the DB security group<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on DB security group<br/>- Maximum length: `100` |
| rules | Array | Y | DB security group rules |
| rules.direction | Enum | Y | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| rules.etherType | Enum | Y | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6` |
| rules.port | Object | Y | Port object |
| rules.port.portType | Enum | Y | Port type<br/>- ALL: `All port range (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receiving port`<br/>- PORT_RANGE: `Port range` |
| rules.port.minPort | Number | N | Minimum port range<br/>- Minimum value: `3306` |
| rules.port.maxPort | Number | N | Maximum port range<br/>- Maximum value: `65535` |
| rules.cidr | String | Y | CIDR |
| rules.description | String | N | Additional information on DB security group rule |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbSecurityGroupId | UUID | DB security group identifier |

---

### Delete DB Security Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbSecurityGroup.Delete | Delete DB security group |

#### Request

```http
DELETE /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List DB Security Group Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbSecurityGroup.Get | List DB security group details |

#### Request

```http
GET /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupName": "dbSecurityGroupName-example",
"description": "description-example",
"progressStatus": "NONE",
"rules": [
{
"ruleId": "550e8400-e29b-41d4-a716-446655440000",
"description": "description-example",
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 1,
"maxPort": 1
},
"cidr": "192.168.0.0/24",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbSecurityGroupId | UUID | DB security group identifier |
| dbSecurityGroupName | String | Name to identify the DB security group |
| description | String | Additional information on DB security group |
| progressStatus | Enum | Current status of DB security group<br/>- NONE: `None`<br/>- CREATING_RULE: `Creating rules`<br/>- UPDATING_RULE: `Modifying rules`<br/>- DELETING_RULE: `Deleting rules`<br/>- APPLYING_DEFAULT_RULE: `Applying default rules` |
| rules | Array | DB security group rules |
| rules.ruleId | UUID | DB security group rule identifier |
| rules.description | String | Additional information on DB security group rule |
| rules.direction | Enum | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| rules.etherType | Enum | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6` |
| rules.port | Object | Port object |
| rules.port.portType | Enum | Port type<br/>- ALL: `All port range (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receiving port`<br/>- PORT_RANGE: `Port range` |
| rules.port.minPort | Number | Minimum port range |
| rules.port.maxPort | Number | Maximum port range |
| rules.cidr | String | CIDR |
| rules.createdYmdt | DateTime | Created at |
| rules.updatedYmdt | DateTime | Modified date and time |
| createdYmdt | DateTime | Created at |
| updatedYmdt | DateTime | Modified date and time |

---

### Modify DB Security Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbSecurityGroup.Modify | Modify DB security group |

#### Request

```http
PUT /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbSecurityGroupName": "dbSecurityGroupName",
"description": "description-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | N | Name to identify the DB security group<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on DB security group<br/>- Maximum length: `100` |

#### Response

This API does not return a response body.

---

### Delete DB Security Group Rule

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbSecurityGroupRule.Delete | Delete DB security group rule |

#### Request

```http
DELETE /v4.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleIds | Query | String | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Create DB Security Group Rule

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbSecurityGroupRule.Create | Create DB security group rule |

#### Request

```http
POST /v4.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 3306,
"maxPort": 1
},
"cidr": "192.168.0.0/24",
"description": "description-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| direction | Enum | Y | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| etherType | Enum | Y | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6` |
| port | Object | Y | Port object |
| port.portType | Enum | Y | Port type<br/>- ALL: `All port range (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receiving port`<br/>- PORT_RANGE: `Port range` |
| port.minPort | Number | N | Minimum port range<br/>- Minimum value: `3306` |
| port.maxPort | Number | N | Maximum port range<br/>- Maximum value: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | Additional information on DB security group rule<br/>- Maximum length: `200` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

### Modify DB Security Group Rule

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:DbSecurityGroupRule.Modify | Modify DB security group rule |

#### Request

```http
PUT /v4.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 3306,
"maxPort": 1
},
"cidr": "192.168.0.0/24",
"description": "description-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| direction | Enum | Y | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| etherType | Enum | Y | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6` |
| port | Object | Y | Port object |
| port.portType | Enum | Y | Port type<br/>- ALL: `All port range (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receiving port`<br/>- PORT_RANGE: `Port range` |
| port.minPort | Number | N | Minimum port range<br/>- Minimum value: `3306` |
| port.maxPort | Number | N | Maximum port range<br/>- Maximum value: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | Additional information on DB security group rule<br/>- Maximum length: `200` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Identifier of requested task |

---

## Parameter Groups

### List Parameter Groups

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:ParameterGroup.List | List parameter groups |

#### Request

```http
GET /v4.0/parameter-groups
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"totalCounts": 1,
"parameterGroups": [
{
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupName": "parameterGroupName-example",
"description": "description-example",
"dbVersion": "MARIADB_V101107",
"parameterGroupType": "USER",
"parameterGroupStatus": "STABLE",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| totalCounts | Number | Total number of parameter groups |
| parameterGroups | Array | Parameter groups |
| parameterGroups.parameterGroupId | UUID | Parameter group identifier |
| parameterGroups.parameterGroupName | String | Name to identify parameter groups |
| parameterGroups.description | String | Additional information on parameter group |
| parameterGroups.dbVersion | String | DB engine type |
| parameterGroups.parameterGroupType | Enum | Parameter group type<br/>- USER<br/>- ADMIN<br/>- DEFAULT |
| parameterGroups.parameterGroupStatus | Enum | Parameter group current status<br/>- STABLE: `Applied`<br/>- NEED_TO_APPLY: `Need to apply`<br/>- DELETED: `Deleted` |
| parameterGroups.createdYmdt | DateTime | Created at |
| parameterGroups.updatedYmdt | DateTime | Modified date and time |

---

### Create Parameter Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:ParameterGroup.Create | Create parameter group |

#### Request

```http
POST /v4.0/parameter-groups
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"parameterGroupName": "parameterGroupName",
"description": "description-example",
"dbVersion": "MARIADB_V101107"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | Name to identify parameter groups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on parameter group<br/>- Maximum length: `100` |
| dbVersion | String | Y | DB engine type |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| parameterGroupId | UUID | Parameter group identifier |

---

### Delete Parameter Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:ParameterGroup.Delete | Delete parameter group |

#### Request

```http
DELETE /v4.0/parameter-groups/{parameterGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List Parameter Group Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:ParameterGroup.Get | List parameter group details |

#### Request

```http
GET /v4.0/parameter-groups/{parameterGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupName": "parameterGroupName-example",
"description": "description-example",
"dbVersion": "MARIADB_V101107",
"parameterGroupStatus": "STABLE",
"parameters": [
{
"parameterId": "550e8400-e29b-41d4-a716-446655440000",
"parameterFileGroup": "CLIENT",
"parameterName": "parameterName-example",
"fileParameterName": "fileParameterName-example",
"value": "value-example",
"defaultValue": "defaultValue-example",
"allowedValue": "allowedValue-example",
"updateType": "VARIABLE",
"applyType": "BOTH"
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| parameterGroupId | UUID | Parameter group identifier |
| parameterGroupName | String | Name to identify parameter groups |
| description | String | Additional information on parameter group |
| dbVersion | String | DB engine type |
| parameterGroupStatus | Enum | Parameter group current status<br/>- STABLE: `Applied`<br/>- NEED_TO_APPLY: `Need to apply`<br/>- DELETED: `Deleted` |
| parameters | Array | Parameter list |
| parameters.parameterId | UUID | Parameter identifier |
| parameters.parameterFileGroup | Enum | Parameter file group type<br/>- CLIENT<br/>- MYSQL<br/>- MYSQLD |
| parameters.parameterName | String | Parameter name |
| parameters.fileParameterName | String | Parameter file name |
| parameters.value | String | Current value |
| parameters.defaultValue | String | Default value |
| parameters.allowedValue | String | Permitted values |
| parameters.updateType | Enum | Modify type<br/>- VARIABLE<br/>- CONSTANT<br/>- INIT_VARIABLE |
| parameters.applyType | Enum | Apply type<br/>- BOTH<br/>- SESSION<br/>- FILE |
| createdYmdt | DateTime | Created at |
| updatedYmdt | DateTime | Modified date and time |

---

### Modify Parameter Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:ParameterGroup.Modify | Modify parameter group |

#### Request

```http
PUT /v4.0/parameter-groups/{parameterGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"parameterGroupName": "parameterGroupName",
"description": "description-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| parameterGroupName | String | N | Name to identify parameter groups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on parameter group<br/>- Maximum length: `100` |

#### Response

This API does not return a response body.

---

### Copy Parameter Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:ParameterGroup.Copy | Copy parameter group |

#### Request

```http
POST /v4.0/parameter-groups/{parameterGroupId}/copy
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"parameterGroupName": "parameterGroupName",
"description": "description-example"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | Name to identify parameter groups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on parameter group<br/>- Maximum length: `100` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| parameterGroupId | UUID | Parameter group identifier |

---

### Modify Parameter

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:ParameterGroup.Modify | Modify parameter group |

#### Request

```http
PUT /v4.0/parameter-groups/{parameterGroupId}/parameters
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"modifiedParameters": [
{
"parameterId": "550e8400-e29b-41d4-a716-446655440000",
"value": "value-example"
}
]
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| modifiedParameters | Array | Y | Parameters to change |
| modifiedParameters.parameterId | UUID | Y | Parameter identifier |
| modifiedParameters.value | String | Y | Parameter value to change |

#### Response

This API does not return a response body.

---

### Reset Parameter Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:ParameterGroup.Reset | Reset parameter group |

#### Request

```http
PUT /v4.0/parameter-groups/{parameterGroupId}/reset
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

## User Group

### List User Groups

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:UserGroup.List | List user groups |

#### Request

```http
GET /v4.0/user-groups
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"totalCounts": 1,
"userGroups": [
{
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
"userGroupName": "userGroupName-example",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| totalCounts | Number | Total number of user groups |
| userGroups | Array | User group list |
| userGroups.userGroupId | UUID | User group identifier |
| userGroups.userGroupName | String | Name to identify user groups |
| userGroups.createdYmdt | DateTime | Created at |
| userGroups.updatedYmdt | DateTime | Modified date and time |

---

### Create User Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:UserGroup.Create | Create user group |

#### Request

```http
POST /v4.0/user-groups
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"userGroupName": "userGroupName-example",
"memberIds": [],
"selectAll": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| userGroupName | String | Y | Name to identify user groups |
| memberIds | Array | Y | List of project member identifiers |
| selectAll | Boolean | N | Whether to include all project members<br/>- Default: `false` |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"userGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| userGroupId | UUID | User group identifier |

---

### Delete User Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:UserGroup.Delete | Delete user group |

#### Request

```http
DELETE /v4.0/user-groups/{userGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List User Group Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:UserGroup.Get | List user group details |

#### Request

```http
GET /v4.0/user-groups/{userGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
"userGroupName": "userGroupName-example",
"userGroupTypeCode": "ENTIRE",
"members": [
{
"memberId": "550e8400-e29b-41d4-a716-446655440000"
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| userGroupId | UUID | User group identifier |
| userGroupName | String | Name to identify user groups |
| userGroupTypeCode | Enum | User group type<br/>- ENTIRE<br/>- INDIVIDUAL_MEMBER |
| members | Array | Project member list |
| members.memberId | UUID | Project member identifier |
| createdYmdt | DateTime | Created at |
| updatedYmdt | DateTime | Modified date and time |

---

### Modify User Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:UserGroup.Modify | Modify user group |

#### Request

```http
PUT /v4.0/user-groups/{userGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"userGroupName": "userGroupName-example",
"memberIds": [],
"selectAll": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| userGroupName | String | Y | Name to identify user groups |
| memberIds | Array | N | List of project member identifiers |
| selectAll | Boolean | N | Whether to include all project members<br/>- Default: `false` |

#### Response

This API does not return a response body.

---

## Notification Group

### List Notification Groups

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:NotificationGroup.List | List notification groups |

#### Request

```http
GET /v4.0/notification-groups
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"notificationGroups": [
{
"notificationGroupId": "550e8400-e29b-41d4-a716-446655440000",
"notificationGroupName": "notificationGroupName-example",
"notifyEmail": false,
"notifySms": false,
"isEnabled": false,
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| notificationGroups | Array | Notification group list |
| notificationGroups.notificationGroupId | UUID | Notification group identifier |
| notificationGroups.notificationGroupName | String | Name to identify notification groups |
| notificationGroups.notifyEmail | Boolean | Whether to be notified by email |
| notificationGroups.notifySms | Boolean | Whether to be notified by SMS |
| notificationGroups.isEnabled | Boolean | Whether to activate |
| notificationGroups.createdYmdt | DateTime | Created at |
| notificationGroups.updatedYmdt | DateTime | Modified date and time |

---

### Create Notification Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:NotificationGroup.Create | Create notification group |

#### Request

```http
POST /v4.0/notification-groups
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"notificationGroupName": "notificationGroupName",
"notifyEmail": true,
"notifySms": true,
"isEnabled": true,
"dbInstanceIds": [],
"userGroupIds": []
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| notificationGroupName | String | Y | Name to identify notification groups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| notifyEmail | Boolean | N | Whether to be notified by email<br/>- Default: `true` |
| notifySms | Boolean | N | Whether to be notified by SMS<br/>- Default: `true` |
| isEnabled | Boolean | N | Whether enabled<br/>- Default: `true` |
| dbInstanceIds | Array | Y | List of DB instance identifiers to monitor |
| userGroupIds | Array | Y | List of user group identifiers |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"notificationGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| notificationGroupId | UUID | Notification group identifier |

---

### Delete Notification Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:NotificationGroup.Delete | Delete notification group |

#### Request

```http
DELETE /v4.0/notification-groups/{notificationGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### View Notification Group Details

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:NotificationGroup.Get | View notification group details |

#### Request

```http
GET /v4.0/notification-groups/{notificationGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"notificationGroupId": "550e8400-e29b-41d4-a716-446655440000",
"notificationGroupName": "notificationGroupName-example",
"notifyEmail": false,
"notifySms": false,
"isEnabled": false,
"dbInstances": [
{
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceName": "dbInstanceName-example"
}
],
"userGroups": [
{
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
"userGroupName": "userGroupName-example"
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| notificationGroupId | UUID | Notification group identifier |
| notificationGroupName | String | Name to identify notification groups |
| notifyEmail | Boolean | Whether to be notified by email |
| notifySms | Boolean | Whether to be notified by SMS |
| isEnabled | Boolean | Whether to activate |
| dbInstances | Array | List of DB instances to monitor |
| dbInstances.dbInstanceId | UUID | DB instance identifier |
| dbInstances.dbInstanceName | String | Name to identify DB instances |
| userGroups | Array | User group list |
| userGroups.userGroupId | UUID | User group identifier |
| userGroups.userGroupName | String | Name to identify user groups |
| createdYmdt | DateTime | Created at |
| updatedYmdt | DateTime | Modified date and time |

---

### Modify Notification Group

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:NotificationGroup.Modify | Modify notification group |

#### Request

```http
PUT /v4.0/notification-groups/{notificationGroupId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"notificationGroupName": "notificationGroupName-example",
"notifyEmail": false,
"notifySms": false,
"isEnabled": false,
"dbInstanceIds": [],
"userGroupIds": []
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| notificationGroupName | String | N | Name to identify notification groups |
| notifyEmail | Boolean | N | Whether to be notified by email<br/>- Default: `false` |
| notifySms | Boolean | N | Whether to be notified by SMS<br/>- Default: `false` |
| isEnabled | Boolean | N | Whether enabled<br/>- Default: `false` |
| dbInstanceIds | Array | N | List of DB instance identifiers to monitor |
| userGroupIds | Array | N | List of user group identifiers |

#### Response

This API does not return a response body.

---

## Monitoring

### View Stats

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Metric.List | View stats |

#### Request

```http
GET /v4.0/metric-statistics
```

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List Metric List

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Metric.List | List metric list |

#### Request

```http
GET /v4.0/metrics
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"metrics": [
{
"measureName": "measureName-example",
"unit": "unit-example"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| metrics | Array | Metric list |
| metrics.measureName | String | Metric type to query |
| metrics.unit | String | Measure unit |

---

## Event

### Event category

Events can be categorized into categories, which are shown below.

| Event category | Description |
|-------------|---------|
| ALL | All |
| BACKUP | Backup |
| DB_INSTANCE | DB instance |
| JOB | Job |
| TENANT | Tenant |
| MONITORING | Monitoring |

### List Subscribable Event Codes

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Event.List | List subscribable event codes |

#### Request

```http
GET /v4.0/event-codes
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"eventCodes": [
{
"eventCode": "ENUM_VALUE",
"eventCategoryType": "ALL"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| eventCodes | Array | Event code list |
| eventCodes.eventCode | Enum | Event code |
| eventCodes.eventCategoryType | Enum | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |

---

### List Events

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:Event.List | List events |

#### Request

```http
GET /v4.0/events
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"totalCounts": 1,
"events": [
{
"eventCategoryType": "ALL",
"eventCode": "ENUM_VALUE",
"sourceId": "550e8400-e29b-41d4-a716-446655440000",
"sourceName": "sourceName-example",
"messages": [
{
"langCode": "KO",
"message": "message-example"
}
],
"eventYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| totalCounts | Number | Total number of events |
| events | Array | Event list |
| events.eventCategoryType | Enum | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| events.eventCode | Enum | Occurred event type |
| events.sourceId | UUID | Identifier of the event source |
| events.sourceName | String | Name to identify event sources |
| events.messages | Array | Event messages |
| events.messages.langCode | Enum | Language code<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | String | Event message |
| events.eventYmdt | DateTime | Event occurred date and time |

---

## Event Subscription

### List Event Subscriptions

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:EventSubscription.List | List event subscriptions |

#### Request

```http
GET /v4.0/event-subscriptions
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"totalCounts": 1,
"eventSubscriptions": [
{
"eventSubscriptionId": "550e8400-e29b-41d4-a716-446655440000",
"eventCategoryType": "ALL",
"eventSubscriptionName": "eventSubscriptionName-example",
"enabled": false,
"notifyEmail": false,
"notifySms": false,
"eventCodes": [],
"sources": [
{
"sourceId": "550e8400-e29b-41d4-a716-446655440000",
"eventCategoryType": "ALL"
}
],
"userGroupIds": [
"550e8400-e29b-41d4-a716-446655440000"
],
"createdYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| totalCounts | Number | Total number of event subscriptions |
| eventSubscriptions | Array | List of event subscriptions |
| eventSubscriptions.eventSubscriptionId | UUID | Event subscription identifier |
| eventSubscriptions.eventCategoryType | Enum | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.eventSubscriptionName | String | A name that identifies the event subscription |
| eventSubscriptions.enabled | Boolean | Whether to activate |
| eventSubscriptions.notifyEmail | Boolean | Whether to send emails |
| eventSubscriptions.notifySms | Boolean | Whether to send SMS messages |
| eventSubscriptions.eventCodes | Array | List of event codes to subscribe to |
| eventSubscriptions.sources | Array | List of event sources to subscribe to |
| eventSubscriptions.sources.sourceId | UUID | Identifier of the event source |
| eventSubscriptions.sources.eventCategoryType | Enum | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.userGroupIds | Array | List of identifiers of user groups subscribing to the event |
| eventSubscriptions.createdYmdt | DateTime | Created at |

---

### Create an Event Subscription

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:EventSubscription.Create | Create an event subscription |

#### Request

```http
POST /v4.0/event-subscriptions
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"eventCategoryType": "ALL",
"eventSubscriptionName": "eventSubscriptionName-example",
"enabled": false,
"notifyEmail": false,
"notifySms": false,
"eventCodes": [],
"sources": [
{
"sourceId": "550e8400-e29b-41d4-a716-446655440000",
"eventCategoryType": "ALL"
}
],
"userGroupIds": []
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| eventCategoryType | Enum | Y | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | String | Y | A name that identifies the event subscription |
| enabled | Boolean | Y | Whether to activate |
| notifyEmail | Boolean | Y | Whether to send emails |
| notifySms | Boolean | Y | Whether to send SMS messages |
| eventCodes | Array | Y | List of event codes to subscribe to |
| sources | Array | Y | List of event sources to subscribe to |
| sources.sourceId | UUID | Y | Identifier of the event source |
| sources.eventCategoryType | Enum | Y | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Array | Y | List of identifiers of user groups to subscribe to |

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"eventSubscriptionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| eventSubscriptionId | UUID | Event subscription identifier |

---

### Delete an Event Subscription

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:EventSubscription.Delete | Delete an event subscription |

#### Request

```http
DELETE /v4.0/event-subscriptions/{eventSubscriptionId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### Modify an Event Subscription

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:EventSubscription.Modify | Modify an event subscription |

#### Request

```http
PUT /v4.0/event-subscriptions/{eventSubscriptionId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | Y |  |

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"eventCategoryType": "ALL",
"eventSubscriptionName": "eventSubscriptionName-example",
"enabled": false,
"notifyEmail": false,
"notifySms": false,
"eventCodes": [],
"sources": [
{
"sourceId": "550e8400-e29b-41d4-a716-446655440000",
"eventCategoryType": "ALL"
}
],
"userGroupIds": []
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| eventCategoryType | Enum | N | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | String | N | A name that identifies the event subscription |
| enabled | Boolean | N | Whether to activate |
| notifyEmail | Boolean | N | Whether to send emails |
| notifySms | Boolean | N | Whether to send SMS messages |
| eventCodes | Array | N | List of event codes to subscribe to |
| sources | Array | N | List of event sources to subscribe to |
| sources.sourceId | UUID | Y | Identifier of the event source |
| sources.eventCategoryType | Enum | Y | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Array | N | List of identifiers of user groups to subscribe to |

#### Response

This API does not return a response body.

---

## Availability Zone

### List Availability Zones

#### Required Permission

| Permission Name | Description |
|-----|-----|
| RDSforMariaDB:AvailabilityZone.List | List availability zones |

#### Request

```http
GET /v4.0/availability-zones
```

#### Request Body

This API does not require a request body.

#### Response

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"header": {
"resultCode": 0,
"resultMessage": "SUCCESS",
"isSuccessful": true
},
"availabilityZones": [
{
"availabilityZoneName": "availabilityZoneName-example",
"zoneState": {
"available": false
}
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| availabilityZones | Array | List of availability zones |
| availabilityZones.availabilityZoneName | String | Availability zone name |
| availabilityZones.zoneState | Object | Availability zone status |
| availabilityZones.zoneState.available | Boolean | Whether the availability zone is available |

---
