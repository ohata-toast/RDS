## RDS for MySQL API Guide

**Database > RDS for MySQL > API v3.0 Guide**

## RDS for MySQL API Common Information

### API Endpoint

| Region | Endpoint |
|------|----------|
| Korea (Daegu) region | https://ninc-kr4-rds-proxy.cloud.toastoven.net |


### Authentication and Authorization

User Access Key is required to use the RDS for MySQL API. A User Access Key is an authentication key issued based on an NHN Cloud or IAM account. It is used in conjunction with a Secret Access Key to authenticate API requests.

User Access Keys and Secret Access Keys can be issued in the console's API Security Setting. For more information on issuing and using User Access Key, please refer to the [User Access Key](/nhncloud/en/public-api/user-access-key).
The created Key must be included in the request Header.

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| X-TC-APP-KEY | Header | String | Y | Appkey of RDS for MySQL or integrated Appkey for project |
| X-TC-AUTHENTICATION-ID | Header | String | Y | User Access Key ID in API Security Settings menu |
| X-TC-AUTHENTICATION-SECRET | Header | String | Y | Secret Access Key in API Security Settings menu |

In addition, the APIs you can call are limited based on the project member role. You can grant permissions separately for `RDS for MySQL ADMIN` and `RDS for MySQL VIEWER`.

* `RDS for MySQL ADMIN permission holders` can use all available features as before.
* `RDS for MySQL VIEWER permission holders` can use read-only feature.
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
| MYSQL_V5633 | X | X | NATIVE |
| MYSQL_V5715 | O | O | SHA256, NATIVE |
| MYSQL_V5719 | O | O | SHA256, NATIVE |
| MYSQL_V5726 | O | O | SHA256, NATIVE |
| MYSQL_V5731 | X | X | SHA256, NATIVE |
| MYSQL_V5733 | O | X | SHA256, NATIVE |
| MYSQL_V5737 | O | O | SHA256, NATIVE |
| MYSQL_V8018 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8023 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8028 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8032 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8033 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8034 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8035 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8036 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8040 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8041 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8042 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8043 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8044 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8045 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8046 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8405 | O | O | CACHING_SHA2 |
| MYSQL_V8406 | O | O | CACHING_SHA2 |
| MYSQL_V8407 | O | O | CACHING_SHA2 |
| MYSQL_V8408 | O | O | CACHING_SHA2 |
| MYSQL_V8409 | O | O | CACHING_SHA2 |

* You can use the value for the dbVersion field of ENUM type.
* Depending on the version, creation or restoration may not be possible.

## Project Information

### List Project Members

#### Request

```http
GET /v3.0/project/members
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
| members.phoneNumber | String | Project member mobile |

---

### List Regions

#### Request

```http
GET /v3.0/project/regions
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
"regionCode": "KR4",
"isEnabled": false
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| regions | Array | Region list |
| regions.regionCode | Enum | Region code<br/>- KR4: `Korea (Daegu)` |
| regions.isEnabled | Boolean | Whether to enable a region |

---

## Specifications of DB Instance

### List DB Instance Specifications

#### Request

```http
GET /v3.0/db-flavors
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

#### Request

```http
GET /v3.0/network/subnets
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

#### Request

```http
GET /v3.0/db-versions
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
"dbVersion": "MYSQL_V8036",
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

### List Storage Type

#### Request

```http
GET /v3.0/storage-types
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

### List Storage

#### Request

```http
GET /v3.0/storages
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
"storages": [
"General SSD",
"General HDD"
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| storages | Array | Storage list |

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

#### Request

```http
GET /v3.0/jobs/{jobId}
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
| jobId | UUID | Job identifier |
| jobStatus | Enum | Current task status<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Array | Relevant resource list |
| resourceRelations.resourceType | String | Relevant resource type |
| resourceRelations.resourceId | String | Relevant resource identifier |
| createdYmdt | DateTime | Created date and time |
| updatedYmdt | DateTime | Modified date and time |

---

## DB Instance Group

### List DB Instance Groups

#### Request

```http
GET /v3.0/db-instance-groups
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
| dbInstanceGroups | Array | DB instance groups |
| dbInstanceGroups.dbInstanceGroupId | UUID | DB instance group identifier |
| dbInstanceGroups.replicationType | Enum | DB instance group replication type<br/>- STANDALONE: `Standalone`<br/>- HIGH_AVAILABILITY: `High availability` |
| dbInstanceGroups.createdYmdt | DateTime | Created date and time |
| dbInstanceGroups.updatedYmdt | DateTime | Modified date and time |

---

### List DB Instance Group Details

#### Request

```http
GET /v3.0/db-instance-groups/{dbInstanceGroupId}
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
| replicationType | Enum | DB instance group replication type<br/>- STANDALONE: `Standalone`<br/>- HIGH_AVAILABILITY: `High availability` |
| dbInstances | Array | DB instances belonging to the DB instance group |
| dbInstances.dbInstanceId | UUID | DB instance identifier |
| dbInstances.dbInstanceType | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstances.dbInstanceStatus | Enum | Current status of DB instance<br/>- BEFORE_CREATE: `Before create (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delay (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| createdYmdt | DateTime | Created date and time |
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

#### Request

```http
GET /v3.0/db-instances
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
"dbVersion": "MYSQL_V8036",
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
| dbInstances | Array | DB instances |
| dbInstances.dbInstanceId | UUID | DB instance identifier |
| dbInstances.dbInstanceGroupId | UUID | DB instance group identifier |
| dbInstances.dbInstanceName | String | Name to identify DB instances |
| dbInstances.description | String | Additional information on DB instances |
| dbInstances.dbVersion | String | DB engine type |
| dbInstances.dbPort | Number | DB port |
| dbInstances.dbInstanceType | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstances.dbInstanceStatus | Enum | Current status of DB instance<br/>- BEFORE_CREATE: `Before create (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delay (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| dbInstances.progressStatus | Enum | Current progress status of DB instance<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbInstances.createdYmdt | DateTime | Created date and time |
| dbInstances.updatedYmdt | DateTime | Modified date and time |

---

### Create DB Instance

#### Request

```http
POST /v3.0/db-instances
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName",
"dbInstanceCandidateName": "dbInstanceCandidateName",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "MYSQL_V8036",
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
"authenticationPlugin": "NATIVE",
"tlsOption": "NONE",
"network": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"storage": {
"storageType": "General SSD",
"storageSize": 20
},
"backup": {
"backupPeriod": 0,
"backupRetryCount": 0,
"ftwrlWaitTimeout": 1800,
"replicationRegion": "KR4",
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
| dbInstanceName | String | Y | Master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | String | N | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | UUID | Y | Identifier of DB instance specifications |
| dbVersion | String | Y | DB engine type |
| dbPort | Number | Y | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| dbUserName | String | Y | DB user account name<br/>- Minimum length: `1`<br/>- Maximum length: `32` |
| dbPassword | String | Y | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `256` |
| parameterGroupId | UUID | Y | Parameter group identifier |
| dbSecurityGroupIds | Array | N | DB security group identifiers |
| userGroupIds | Array | N | User group identifier list |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Default: `3`<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Boolean | N | Whether to protect against deletion<br/>- Default: `false` |
| authenticationPlugin | Enum | N | Authentication Plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- CACHING_SHA2: `caching_sha2_password authentication (MySQL only)`<br/>- SHA256: `sha256_password authentication (MySQL only)` |
| tlsOption | Enum | N | TLS Option<br/>- Default: `NONE`<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |
| network | Object | Y | Network information objects |
| network.subnetId | UUID | Y | Subnet identifier |
| network.usePublicAccess | Boolean | N | External access is available or not<br/>- Default: `false` |
| network.availabilityZone | Enum | Y | Availability zone where DB instance will be created |
| storage | Object | Y | Storage information objects |
| storage.storageType | Enum | Y | Block Storage Type |
| storage.storageSize | Number | Y | Block Storage Size (GB)<br/>- Minimum value: `20` |
| backup | Object | Y | Backup information objects |
| backup.backupPeriod | Number | Y | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Number | N | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- KR4: `Korea (Daegu) Region` |
| backup.useBackupLock | Boolean | N | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Array | Y | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup started time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hour`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |

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
| jobId | UUID | Job identifier |

---

### Restore DB Instance from Object Storage

#### Request

```http
POST /v3.0/db-instances/restore-from-obs
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"dbInstanceName": "dbInstanceName",
"dbInstanceCandidateName": "dbInstanceCandidateName",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"dbVersion": "MYSQL_V8036",
"useHighAvailability": false,
"imageId": "550e8400-e29b-41d4-a716-446655440000",
"pingInterval": 3,
"storage": {
"storageType": "General SSD",
"storageSize": 20
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
"replicationRegion": "KR4",
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
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDeletionProtection": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | N | Master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | String | N | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | UUID | Y | Identifier of DB instance specifications |
| dbPort | Number | N | DB port |
| dbVersion | String | Y | DB engine type |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| imageId | UUID | N | Identifier of the image |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| storage | Object | Y | Storage information objects |
| storage.storageType | Enum | Y | Block Storage Type |
| storage.storageSize | Number | Y | Block Storage Size (GB)<br/>- Minimum value: `20` |
| network | Object | Y | Network information objects |
| network.subnetId | UUID | Y | Subnet identifier |
| network.usePublicAccess | Boolean | N | External access is available or not<br/>- Default: `false` |
| network.availabilityZone | Enum | Y | Availability zone where DB instance will be created |
| backup | Object | Y | Backup information objects |
| backup.backupPeriod | Number | Y | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.ftwrlWaitTimeout | Number | N | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- KR4: `Korea (Daegu) Region` |
| backup.useBackupLock | Boolean | N | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Array | Y | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup started time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hour`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |
| restore | Object | Y | Restoration information object |
| restore.tenantId | String | Y | Tenant ID of object storage where backups are stored |
| restore.username | String | Y | NHN Cloud account or IAM member ID |
| restore.password | String | Y | API password for object storage where backups are stored |
| restore.targetContainer | String | Y | Container of object storage where backups are stored |
| restore.objectPath | String | Y | Path of backup stored in container |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| parameterGroupId | UUID | Y | Parameter group identifier |
| dbSecurityGroupIds | Array | N | DB security group identifiers |
| userGroupIds | Array | N | User group identifier list |
| useDeletionProtection | Boolean | N | Whether to protect against deletion<br/>- Default: `false` |

#### Response

This API does not return a response body.

---

### Delete DB Instance

#### Request

```http
DELETE /v3.0/db-instances/{dbInstanceId}
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
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Job identifier |

---

### View DB Instance Details

#### Request

```http
GET /v3.0/db-instances/{dbInstanceId}
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
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceName": "dbInstanceName-example",
"description": "description-example",
"dbVersion": "MYSQL_V8036",
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
| dbInstanceStatus | Enum | Current status of DB instance<br/>- BEFORE_CREATE: `Before create (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delay (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| progressStatus | Enum | Current progress status of DB instance<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbFlavorId | UUID | Identifier of DB instance specifications |
| parameterGroupId | UUID | Identifier of the parameter group applied to the DB instance |
| dbSecurityGroupIds | Array | List of identifiers of DB security groups applied to the DB instance |
| notificationGroupIds | Array | List of identifiers of notification groups applied to the DB instance |
| useDeletionProtection | Boolean | Whether deletion protection is enabled for the DB instance |
| supportAuthenticationPlugin | Boolean | Whether authentication plugin is supported |
| needToApplyParameterGroup | Boolean | Whether the latest parameter group needs to be applied |
| needMigration | Boolean | Whether migration is required |
| supportDbVersionUpgrade | Boolean | Whether DB version upgrade is supported |
| createdYmdt | DateTime | Created date and time |
| updatedYmdt | DateTime | Modified date and time |

---

### Modify DB Instance

#### Request

```http
PUT /v3.0/db-instances/{dbInstanceId}
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
"dbInstanceName": "dbInstanceName",
"dbInstanceCandidateName": "dbInstanceCandidateName",
"description": "description-example",
"dbPort": 1,
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "MYSQL_V8036",
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
| dbInstanceName | String | N | Master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | String | N | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on DB instances<br/>- Maximum length: `100` |
| dbPort | Number | N | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| dbFlavorId | UUID | N | Identifier of DB instance specifications |
| parameterGroupId | UUID | N | Parameter group identifier |
| dbVersion | String | N | DB engine version code |
| useDummy | Boolean | N | Whether to use a dummy during DB version upgrade of a single DB instance<br/>- Default: `false` |
| dbSecurityGroupIds | Array | N | DB security group identifiers |
| executeBackup | Boolean | N | Whether to execute backup at the current point in time<br/>- Default: `false` |
| useOnlineFailover | Boolean | N | Whether to restart using failover<br/>- Default: `false` |
| waitReplicationDelay | Boolean | N | Whether to wait for replication lag to clear<br/>- Default: `false` |
| useReadOnly | Boolean | N | Whether to block write workload<br/>- Default: `false` |

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
| jobId | UUID | Job identifier |

---

### Backup DB Instance

#### Request

```http
POST /v3.0/db-instances/{dbInstanceId}/backup
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
"backupName": "backupName"
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| backupName | String | Y | Name to identify backups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

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
| jobId | UUID | Job identifier |

---

### View Backup Information

#### Request

```http
GET /v3.0/db-instances/{dbInstanceId}/backup-info
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
"backupPeriod": 1,
"ftwrlWaitTimeout": 1,
"backupRetryCount": 1,
"replicationRegion": "KR4",
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
| replicationRegion | Enum | Backup replication region<br/>- KR4: `Korea (Daegu) Region` |
| useBackupLock | Boolean | Whether to use table lock |
| backupSchedules | Array | Scheduled auto backup list |
| backupSchedules.backupWndBgnTime | Time | Backup started time |
| backupSchedules.backupWndDuration | Enum | Backup duration<br/>- HALF_AN_HOUR<br/>- ONE_HOUR<br/>- ONE_HOUR_AND_HALF<br/>- TWO_HOURS<br/>- TWO_HOURS_AND_HALF<br/>- THREE_HOURS |

---

### Modify Backup Information

#### Request

```http
PUT /v3.0/db-instances/{dbInstanceId}/backup-info
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
"backupPeriod": 0,
"ftwrlWaitTimeout": 0,
"backupRetryCount": 0,
"replicationRegion": "KR4",
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
| replicationRegion | Enum | N | Backup replication region<br/>- KR4: `Korea (Daegu) Region` |
| useBackupLock | Boolean | N | Whether to use table lock |
| backupSchedules | Array | N | Scheduled auto backup list |
| backupSchedules.backupWndBgnTime | Time | Y | Backup started time |
| backupSchedules.backupWndDuration | Enum | Y | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hour`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |

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
| jobId | UUID | Job identifier |

---

### Export after Backing up DB Instance

#### Request

```http
POST /v3.0/db-instances/{dbInstanceId}/backup-to-object-storage
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
| tenantId | String | Y | Tenant ID of object storage to store backup<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | String | Y | NHN Cloud account or IAM member ID |
| password | String | Y | API password for object storage where backup is stored |
| targetContainer | String | Y | Object storage container where backup is stored |
| objectPath | String | Y | Backup path to be stored in container |

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
| jobId | UUID | Job identifier |

---

### Change DB Image Meta for Testing

#### Request

```http
PUT /v3.0/db-instances/{dbInstanceId}/change-image-meta
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List DB Schema

#### Request

```http
GET /v3.0/db-instances/{dbInstanceId}/db-schemas
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
| dbSchemas.createdYmdt | DateTime | Created date and time |

---

### Create DB Schema

#### Request

```http
POST /v3.0/db-instances/{dbInstanceId}/db-schemas
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
| jobId | UUID | Job identifier |

---

### Delete DB Schema

#### Request

```http
DELETE /v3.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |
| dbSchemaId | URL | UUID | Y |  |

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
| jobId | UUID | Job identifier |

---

### List DB Users

#### Request

```http
GET /v3.0/db-instances/{dbInstanceId}/db-users
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
| dbUsers.authorityType | Enum | DB user permission type<br/>- CUSTOM: `custom permissions`<br/>- READ: `read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `all permissions` |
| dbUsers.dbUserStatus | Enum | DB user current status<br/>- STABLE<br/>- CREATING<br/>- UPDATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbUsers.createdYmdt | DateTime | Created date and time |
| dbUsers.updatedYmdt | DateTime | Modified date and time |
| dbUsers.authenticationPlugin | Enum | Authentication plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- CACHING_SHA2: `caching_sha2_password authentication (MySQL only)`<br/>- SHA256: `sha256_password authentication (MySQL only)` |
| dbUsers.tlsOption | Enum | TLS option<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |

---

### Create DB User

#### Request

```http
<!-- TERM-UNRESOLVED: DB 이미지 메타 (section "Change DB Image Meta for Testing" — no published EN precedent found for this term) -->
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
| authorityType | Enum | Y | DB user permission type<br/>- CUSTOM: `custom permissions`<br/>- READ: `read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `all permissions` |
| authenticationPlugin | Enum | N | Authentication plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- CACHING_SHA2: `caching_sha2_password authentication (MySQL only)`<br/>- SHA256: `sha256_password authentication (MySQL only)` |
| tlsOption | Enum | N | TLS option<br/>- Default: `NONE`<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |

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
| jobId | UUID | Job identifier |

---

### Delete DB User

#### Request

```http
---
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |
| dbUserId | URL | UUID | Y |  |

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
| jobId | UUID | Job identifier |

---

### Modify DB User

#### Request

```http
---
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |
| dbUserId | URL | UUID | Y |  |

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
| authorityType | Enum | N | DB user permission type<br/>- CUSTOM: `custom permissions`<br/>- READ: `read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `all permissions` |
| authenticationPlugin | Enum | N | Authentication plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- CACHING_SHA2: `caching_sha2_password authentication (MySQL only)`<br/>- SHA256: `sha256_password authentication (MySQL only)` |
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
| jobId | UUID | Job identifier |

---

### Change DB Instance Deletion Protection Settings

#### Request

```http
---
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
"useDeletionProtection": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| useDeletionProtection | Boolean | Y | Whether to protect against deletion |

#### Response

This API does not return a response body.

---

### Force Restart DB Instance

#### Request

```http
---
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### Modify High Availability

#### Request

```http
---
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
"useHighAvailability": false,
"useHighAvailability": false,
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| useHighAvailability | Boolean | Y | Whether to use high availability |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |

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
| jobId | UUID | Job identifier |

---

### Pause High Availability

#### Request

```http
---
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
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Job identifier |

---

### Recover High Availability

#### Request

```http
---
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
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Job identifier |

---

### Restart High Availability

#### Request

```http
---
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
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Job identifier |

---

### Separate High Availability

#### Request

```http
---
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
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Job identifier |

---

### List Log Files

#### Request

```http
---
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
},
{
{
"logFileName": "logFileName-example",
"logFileType": "ERROR",
"createdYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| logFiles | Array | Log File list |
| logFiles.logFileName | String | Log File name |
| logFiles.logFileType | Enum | Log File type<br/>- `ERROR`<br/>- `BINLOG`<br/>- `GENERAL`<br/>- `SLOW_QUERY`<br/>- `AUDIT`<br/>- `BACKUP` |
| logFiles.logFileSize | Number | Log File size(Byte) |
| logFiles.createdYmdt | DateTime | Created date and time |

---

### Export Log File

#### Request

```http
---
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
| logFileNames | Array | Y | Log File name list |
| tenantId | String | Y | Tenant ID of object storage to store log file<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | String | Y | NHN Cloud account or IAM member ID |
| password | String | Y | API password for object storage where log file is stored |
| targetContainer | String | Y | Object storage container where log file is stored |
| objectPath | String | Y | Log file path to be stored in container |

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
| jobId | UUID | Job identifier |

---

### List Network Information

#### Request

```http
---
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
},
"availabilityZone": "kr-pub-a",
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"subnetName": "subnetName-example",
"subnetName": "subnetName-example",
},
},
{
{
"domain": "domain-example",
"ipAddress": "192.168.0.1",
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

#### Request

```http
---
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
{
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| usePublicAccess | Boolean | Y | Whether external access is available |

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
| jobId | UUID | Job identifier |

---

### Promote DB Instance

#### Request

```http
---
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
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Job identifier |

---

### Replicate DB Instance

#### Request

```http
---
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
"dbInstanceName": "dbInstanceName",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDefaultNotification": false,
"useDeletionProtection": false,
"network": {
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"storage": {
"storageType": "General SSD",
"storageSize": 20
},
"backup": {
"backupPeriod": 0,
"backupRetryCount": 0,
"ftwrlWaitTimeout": 0,
"replicationRegion": "KR4",
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
| description | String | N | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | UUID | N | Identifier of DB instance specifications |
| dbPort | Number | Y | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| parameterGroupId | UUID | N | Parameter group identifier |
| dbSecurityGroupIds | Array | N | DB security group identifiers |
| userGroupIds | Array | N | User group identifier list |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Boolean | N | Whether to protect against deletion<br/>- Default: `false` |
| network | Object | Y | Network information objects |
| network.usePublicAccess | Boolean | N | Whether external access is available |
| network.availabilityZone | Enum | Y | Availability zone where DB instance will be created |
| storage | Object | N | Storage information objects |
| storage.storageType | Enum | N | Data storage type |
| storage.storageSize | Number | N | Block Storage Size (GB)<br/>- Minimum value: `20` |
| backup | Object | N | Backup information objects |
| backup.backupPeriod | Number | N | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Number | N | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- KR4: `Korea (Daegu) Region` |
| backup.useBackupLock | Boolean | N | Whether to use table lock |
| backup.backupSchedules | Array | N | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Time | N | Backup started time |
| backup.backupSchedules.backupWndDuration | Enum | N | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hour`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |

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
| jobId | UUID | Job identifier |

---

### Restart DB Instance

#### Request

```http
---
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
"useOnlineFailover": false,
"executeBackup": false,
"waitReplicationDelay": false,
"useReadOnly": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| useOnlineFailover | Boolean | N | Whether to restart using failover<br/>- Default: `false` |
| executeBackup | Boolean | N | Whether to execute backup at the current point in time<br/>- Default: `false` |
| waitReplicationDelay | Boolean | N | Whether to wait for replication lag to clear<br/>- Default: `false` |
| useReadOnly | Boolean | N | Whether to block write workload<br/>- Default: `false` |

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
| jobId | UUID | Job identifier |

---

### View Restoration Information

#### Request

```http
---
```

#### Request Parameters

| Name | Category | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### View the Last Query to Be Restored

#### Request

```http
---
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
},
"executedYmdt": "2023-12-31T15:00:00+09:00",
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| executedYmdt | DateTime | Query execution date and time |
| lastQuery | String | Last executed query |

---

### Restore DB Instance

#### Request

```http
---
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
"dbInstanceName": "dbInstanceName",
"dbInstanceCandidateName": "dbInstanceCandidateName",
"description": "description-example",
"dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
"dbPort": 1,
"useHighAvailability": false,
"imageId": "550e8400-e29b-41d4-a716-446655440000",
"pingInterval": 3,
"storage": {
"storageType": "General SSD",
"storageSize": 20
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
"replicationRegion": "KR4",
"useBackupLock": true,
"backupSchedules": [
{
"backupWndBgnTime": "00:00:00",
"backupWndDuration": "HALF_AN_HOUR"
}
]
},
"restore": {
"restore": {
"restoreType": "TIMESTAMP",
"binLog": {
"binLogFileName": "binLogFileName-example",
}
}
},
"useDefaultNotification": false,
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDeletionProtection": false
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbInstanceName | String | N | Master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | String | N | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | UUID | Y | Identifier of DB instance specifications |
| dbPort | Number | N | DB port |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| imageId | UUID | N | Identifier of the image |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| storage | Object | Y | Storage information objects |
| storage.storageType | Enum | Y | Block Storage Type |
| storage.storageSize | Number | Y | Block Storage Size (GB)<br/>- Minimum value: `20` |
| network | Object | Y | Network information objects |
| network.subnetId | UUID | Y | Subnet identifier |
| network.usePublicAccess | Boolean | N | External access is available or not<br/>- Default: `false` |
| network.availabilityZone | Enum | Y | Availability zone where DB instance will be created |
| backup | Object | Y | Backup information objects |
| backup.backupPeriod | Number | Y | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.ftwrlWaitTimeout | Number | N | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- KR4: `Korea (Daegu) Region` |
| backup.useBackupLock | Boolean | N | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Array | Y | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup started time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hour`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |
| restore | Object | Y | Restoration information object |
| restore.restoreType | Enum | Y | Restoration type<br/>- TIMESTAMP: `A point-in-time restoration using the time within the restorable time`<br/>- BINLOG: `A point-in-time restoration using a restorable binary log location`<br/>- BACKUP: `Snapshot restoration using a previously created backup` |
| restore.binLog.binLogFileName | String | N | Binary log name to use for restoration |
| restore.binLog.binLogPosition | Object | N | Binary log location to use for restoration |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| parameterGroupId | UUID | Y | Parameter group identifier |
| dbSecurityGroupIds | Array | N | DB security group identifiers |
| userGroupIds | Array | N | User group identifier list |
| useDeletionProtection | Boolean | N | Whether to protect against deletion<br/>- Default: `false` |

#### Request when restoring a point in time using Timestamp (if restoreType is `TIMESTAMP`)

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| restore.restoreYmdt | DateTime | N | DB instance restoration date and time |

POST /v3.0/db-instances/{dbInstanceId}/restore

#### Request for point-in-time restoration using binary logs (if restoreType is `BINLOG`)

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| restore.backupId | UUID | N | Identifier of the backup to use for restoration |
| restore.binLog | Object | N | Binary log information object to use for restoration |

Restoration is possible only before the most recent restorable time queried through restoration information inquiry.

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
| jobId | UUID | Job identifier |

---

### Start DB Instance

#### Request

```http
---
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
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Job identifier |

---

### Stop DB Instance

#### Request

```http
---
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
"jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| jobId | UUID | Job identifier |

---

### View Storage Information

#### Request

```http
---
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
"storageType": "General SSD",
"storageType": "General SSD",
"storageSize": 1,
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| storageType | Enum | Data storage type |
| storageSize | Number | Data storage size (GB) |
| storageStatus | Enum | Current status of data storage<br/>- DELETED: `Deleted`<br/>- PENDING_DELETION: `Pending deletion`<br/>- DELETION_RESERVED: `Deletion reserved (awaiting snapshot cleanup)`<br/>- DETACHED: `Detached`<br/>- ATTACHED: `Attached` |

---

### Modify Storage Information

#### Request

```http
---
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
{
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| storageSize | Number | Y | Data storage size (GB)<br/>- Maximum value: `2048` |

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
| jobId | UUID | Job identifier |

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

#### Request

```http
---
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
},
"totalCounts": 1,
{
{
"backupId": "550e8400-e29b-41d4-a716-446655440000",
"backupName": "backupName-example",
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbVersion": "MYSQL_V8036",
"dbVersion": "MYSQL_V8036",
"utilVersion": "utilVersion-example",
"backupType": "AUTO",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| totalCounts | Number | Number of all backup lists |
| backups | Array | Backup list |
| backups.backupId | UUID | Backup identifier |
| backups.backupName | String | Name to identify backups |
| backups.backupStatus | Enum | Backup current status<br/>- BACKING_UP: `Backup in progress (spinner)`<br/>- VERIFYING: `Verifying (spinner)`<br/>- COMPLETED: `Available (green icon)`<br/>- DELETING: `Deleting (spinner)`<br/>- DELETED: `Deleted (gray icon)`<br/>- ERROR: `Error (red icon)` |
| backups.dbInstanceId | UUID | Original DB instance identifier |
| backups.dbVersion | String | DB engine type |
| backups.utilVersion | String | Utility version |
| backups.backupType | Enum | Backup type<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Number | Backup size (Byte) |
| backups.createdYmdt | DateTime | Created date and time |
| backups.updatedYmdt | DateTime | Modified date and time |

---

### Delete Backup

#### Request

```http
---
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
| jobId | UUID | Job identifier |

---

### Export Backup

#### Request

```http
---
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
| tenantId | String | Y | Tenant ID of object storage to store backup<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | String | Y | NHN Cloud account or IAM member ID |
| password | String | Y | API password for object storage where backup is stored |
| targetContainer | String | Y | Object storage container where backup is stored |
| objectPath | String | Y | Backup path to be stored in container |

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
| jobId | UUID | Job identifier |

---

### Restore Backup

#### Request

```http
---
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
"network": {
"subnetId": "550e8400-e29b-41d4-a716-446655440000",
"usePublicAccess": false,
"availabilityZone": "kr-pub-a"
},
"storage": {
"storageType": "General SSD",
"storageSize": 20
},
"backup": {
"backupPeriod": 0,
"backupRetryCount": 0,
"ftwrlWaitTimeout": 1800,
"replicationRegion": "KR4",
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
| description | String | N | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | UUID | Y | Identifier of DB instance specifications |
| dbPort | Number | Y | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| parameterGroupId | UUID | Y | Parameter group identifier |
| dbSecurityGroupIds | Array | N | DB security group identifiers |
| userGroupIds | Array | N | User group identifier list |
| useHighAvailability | Boolean | N | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Number | N | Ping interval (sec) when using high availability<br/>- Default: `3`<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| useDefaultNotification | Boolean | N | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Boolean | N | Whether to protect against deletion<br/>- Default: `false` |
| network | Object | Y | Network information objects |
| network.subnetId | UUID | Y | Subnet identifier |
| network.usePublicAccess | Boolean | N | External access is available or not<br/>- Default: `false` |
| network.availabilityZone | Enum | Y | Availability zone where DB instance will be created |
| storage | Object | Y | Storage information objects |
| storage.storageType | Enum | Y | Block Storage Type |
| storage.storageSize | Number | Y | Block Storage Size (GB)<br/>- Minimum value: `20` |
| backup | Object | Y | Backup information objects |
| backup.backupPeriod | Number | Y | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Number | N | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Number | N | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Enum | N | Backup replication region<br/>- KR4: `Korea (Daegu) Region` |
| backup.useBackupLock | Boolean | N | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Array | Y | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Time | Y | Backup started time |
| backup.backupSchedules.backupWndDuration | Enum | Y | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hour`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |

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
| jobId | UUID | Job identifier |

---

## DB Security Groups

### DB Security Group Progress Status

| Status | Description |
|-----------------|--------------|
| `NONE` | No operation in progress |
| `CREATING_RULE` | Creating rule policy |
| `UPDATING_RULE` | Modifying rule policy |
| `DELETING_RULE` | Deleting rule policy |

### List DB Security Groups

#### Request

```http
---
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
},
{
{
"dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000",
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
| dbSecurityGroups | Array | DB security group list |
| dbSecurityGroups.dbSecurityGroupId | UUID | DB security group identifier |
| dbSecurityGroups.dbSecurityGroupName | String | Name to identify the DB security group |
| dbSecurityGroups.description | String | Additional information on the DB security group |
| dbSecurityGroups.progressStatus | Enum | Current progress status of the DB security group<br/>- NONE: `None`<br/>- CREATING_RULE: `Creating rule`<br/>- UPDATING_RULE: `Modifying rule`<br/>- DELETING_RULE: `Deleting rule`<br/>- APPLYING_DEFAULT_RULE: `Applying default rule` |
| dbSecurityGroups.createdYmdt | DateTime | Created date and time |
| dbSecurityGroups.updatedYmdt | DateTime | Modified date and time |

---

### Create DB Security Group

#### Request

```http
---
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
{
"description": "description-example",
"description": "description-example",
{
{
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 3306,
},
},
"cidr": "192.168.0.0/24",
}
]
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | Y | Name to identify the DB security group<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on the DB security group<br/>- Maximum length: `100` |
| rules | Array | Y | DB security group rule list |
| rules.direction | Enum | Y | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| rules.etherType | Enum | Y | Ether type<br/>- IPV4: `IPv4 format`<br/>- IPV6: `IPv6 format` |
| rules.port | Object | Y | Port object |
| rules.port.portType | Enum | Y | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receive port`<br/>- PORT_RANGE: `Port range` |
| rules.port.minPort | Number | N | Minimum port range<br/>- Minimum value: `3306` |
| rules.port.maxPort | Number | N | Maximum port range<br/>- Maximum value: `65535` |
| rules.cidr | String | Y | CIDR |
| rules.description | String | N | Additional information on the security group rule |

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
},
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbSecurityGroupId | UUID | DB security group identifier |

---

### Delete DB Security Group

#### Request

```http
---
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

#### Request

```http
---
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
},
{
"dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000",
"description": "description-example",
"progressStatus": "NONE",
"description": "description-example",
{
{
"description": "description-example",
{
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 3306,
},
},
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
],
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| dbSecurityGroup | Object | DB security group |
| dbSecurityGroup.dbSecurityGroupId | UUID | DB security group identifier |
| dbSecurityGroup.dbSecurityGroupName | String | Name to identify the DB security group |
| dbSecurityGroup.description | String | Additional information on the DB security group |
| dbSecurityGroup.progressStatus | Enum | Current progress status of the DB security group<br/>- NONE: `None`<br/>- CREATING_RULE: `Creating rule`<br/>- UPDATING_RULE: `Modifying rule`<br/>- DELETING_RULE: `Deleting rule`<br/>- APPLYING_DEFAULT_RULE: `Applying default rule` |
| dbSecurityGroup.rules | Array | DB security group rule list |
| dbSecurityGroup.rules.ruleId | UUID | DB security group rule identifier |
| dbSecurityGroup.rules.description | String | Additional information on the DB security group rule |
| dbSecurityGroup.rules.direction | Enum | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| dbSecurityGroup.rules.etherType | Enum | Ether type<br/>- IPV4: `IPv4 format`<br/>- IPV6: `IPv6 format` |
| dbSecurityGroup.rules.port | Object | Port object |
| dbSecurityGroup.rules.port.portType | Enum | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receive port`<br/>- PORT_RANGE: `Port range` |
| dbSecurityGroup.rules.port.minPort | Number | Minimum port range |
| dbSecurityGroup.rules.port.maxPort | Number | Maximum port range |
| dbSecurityGroup.rules.cidr | String | CIDR |
| dbSecurityGroup.rules.createdYmdt | DateTime | Created date and time |
| dbSecurityGroup.rules.updatedYmdt | DateTime | Modified date and time |
| dbSecurityGroup.createdYmdt | DateTime | Created date and time |
| dbSecurityGroup.updatedYmdt | DateTime | Modified date and time |

---

### Modify DB Security Group

#### Request

```http
---
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
{
"cidr": "192.168.0.0/24",
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | N | Name to identify the DB security group<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | String | N | Additional information on the DB security group<br/>- Maximum length: `100` |

#### Response

This API does not return a response body.

---

### Delete DB Security Group Rule

#### Request

```http
---
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
| jobId | UUID | Job identifier |

---

### Create DB Security Group Rule

#### Request

```http
---
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
{
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 3306,
},
},
"cidr": "192.168.0.0/24",
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| direction | Enum | Y | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| etherType | Enum | Y | Ether type<br/>- IPV4: `IPv4 format`<br/>- IPV6: `IPv6 format` |
| port | Object | Y | Port object |
| port.portType | Enum | Y | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receive port`<br/>- PORT_RANGE: `Port range` |
| port.minPort | Number | N | Minimum port range<br/>- Minimum value: `3306` |
| port.maxPort | Number | N | Maximum port range<br/>- Maximum value: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | Additional information on the DB security group rule<br/>- Maximum length: `200` |

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
| jobId | UUID | Job identifier |

---

### Modify DB Security Group Rule

#### Request

```http
---
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
{
"direction": "INGRESS",
"etherType": "IPV4",
"port": {
"portType": "ALL",
"minPort": 3306,
},
},
"cidr": "192.168.0.0/24",
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| direction | Enum | Y | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| etherType | Enum | Y | Ether type<br/>- IPV4: `IPv4 format`<br/>- IPV6: `IPv6 format` |
| port | Object | Y | Port object |
| port.portType | Enum | Y | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receive port`<br/>- PORT_RANGE: `Port range` |
| port.minPort | Number | N | Minimum port range<br/>- Minimum value: `3306` |
| port.maxPort | Number | N | Maximum port range<br/>- Maximum value: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | Additional information on the DB security group rule<br/>- Maximum length: `200` |

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
| jobId | UUID | Job identifier |

---

## Parameter group

### List Parameter Groups

#### Request

```http
---
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
},
{
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"description": "description-example",
"dbVersion": "MYSQL_V8036",
"dbVersion": "MYSQL_V8036",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| parameterGroups | Array | Parameter groups |
| parameterGroups.parameterGroupId | UUID | Parameter group identifier |
| parameterGroups.parameterGroupName | String | Name to identify parameter groups |
| parameterGroups.description | String | Additional information on parameter group |
| parameterGroups.dbVersion | String | DB engine type |
| parameterGroups.parameterGroupStatus | Enum | Parameter group current status<br/>- STABLE: `Applied`<br/>- NEED_TO_APPLY: `Need to apply`<br/>- DELETED: `Deleted` |
| parameterGroups.createdYmdt | DateTime | Created date and time |
| parameterGroups.updatedYmdt | DateTime | Modified date and time |

---

### Create Parameter Group

#### Request

```http
---
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
{
"description": "description-example",
"description": "description-example",
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
},
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| parameterGroupId | UUID | Parameter group identifier |

---

### Delete Parameter Group

#### Request

```http
---
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

#### Request

```http
---
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
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"description": "description-example",
"dbVersion": "MYSQL_V8036",
"dbVersion": "MYSQL_V8036",
"parameterGroupStatus": "STABLE",
{
{
"parameterId": "550e8400-e29b-41d4-a716-446655440000",
"parameterFileGroup": "CLIENT",
"parameterName": "parameterName-example",
"fileParameterName": "fileParameterName-example",
"value": "value-example",
"defaultValue": "defaultValue-example",
"allowedValue": "allowedValue-example",
"updateType": "VARIABLE",
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
| createdYmdt | DateTime | Created date and time |
| updatedYmdt | DateTime | Modified date and time |

---

### Modify Parameter Group

#### Request

```http
---
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
{
"cidr": "192.168.0.0/24",
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

#### Request

```http
---
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
{
"cidr": "192.168.0.0/24",
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
},
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| parameterGroupId | UUID | Parameter group identifier |

---

### Modify Parameter

#### Request

```http
---
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
{
{
{
"parameterId": "550e8400-e29b-41d4-a716-446655440000",
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

#### Request

```http
---
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

#### Request

```http
---
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
},
{
{
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
"createdYmdt": "2023-12-31T15:00:00+09:00",
"updatedYmdt": "2023-12-31T15:00:00+09:00"
}
]
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| userGroups | Array | User group list |
| userGroups.userGroupId | UUID | User group identifier |
| userGroups.userGroupName | String | Name to identify user groups |
| userGroups.createdYmdt | DateTime | Created date and time |
| userGroups.updatedYmdt | DateTime | Modified date and time |

---

### Create User Group

#### Request

```http
---
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
"userGroupName": "userGroupName-example",
"memberIds": [],
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| userGroupName | String | Y | Name to identify user groups |
| memberIds | Array | Y | Project member identifier list |
| selectAllYN | Boolean | N | Whether to include all project members<br/>- Default: `false` |

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
},
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| userGroupId | UUID | User group identifier |

---

### Delete User Group

#### Request

```http
---
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

### View User Group Details

#### Request

```http
---
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
{
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
"userGroupName": "userGroupName-example",
"members": [
{
{
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
| userGroupTypeCode | Enum | User group type<br/>- `ENTIRE`: User group including all project members<br/>- `INDIVIDUAL_MEMBER`: User group including specific project members |
| members | Array | Project member list |
| members.memberId | UUID | Project member identifier |
| createdYmdt | DateTime | Created date and time |
| updatedYmdt | DateTime | Modified date and time |

---

### Modify User Group

#### Request

```http
---
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
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
"userGroupName": "userGroupName-example",
"memberIds": [],
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| userGroupName | String | Y | Name to identify user groups |
| memberIds | Array | N | Project member identifier list |
| selectAllYN | Boolean | N | Whether to include all project members<br/>- Default: `false` |

#### Response

This API does not return a response body.

---

## Notification Group

### List Notification Groups

#### Request

```http
---
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
},
{
{
"notificationGroupId": "550e8400-e29b-41d4-a716-446655440000",
"notificationGroupName": "notificationGroupName-example",
"notifyEmail": false,
"notifySms": false,
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
| notificationGroups.isEnabled | Boolean | Whether enabled |
| notificationGroups.createdYmdt | DateTime | Created date and time |
| notificationGroups.updatedYmdt | DateTime | Modified date and time |

---

### Create Notification Group

#### Request

```http
---
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
{
"notificationGroupName": "notificationGroupName",
"notifyEmail": true,
"notifySms": true,
"isEnabled": true,
"dbInstanceIds": [],
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| notificationGroupName | String | Y | Name to identify notification groups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| notifyEmail | Boolean | N | Whether to be notified by email<br/>- Default: `true` |
| notifySms | Boolean | N | Whether to be notified by SMS<br/>- Default: `true` |
| isEnabled | Boolean | N | Whether enabled<br/>- Default: `true` |
| dbInstanceIds | Array | Y | Identifier list of DB instances to monitor |
| userGroupIds | Array | Y | User group identifier list |

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
},
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| notificationGroupId | UUID | Notification group identifier |

---

### Delete Notification Group

#### Request

```http
---
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

#### Request

```http
---
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
{
"notificationGroupId": "550e8400-e29b-41d4-a716-446655440000",
"notificationGroupName": "notificationGroupName-example",
"notifyEmail": false,
"notifySms": false,
"dbInstances": [
{
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
}
],
},
{
{
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
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
| isEnabled | Boolean | Whether enabled |
| dbInstances | Array | DB instance list to monitor |
| dbInstances.dbInstanceId | UUID | DB instance identifier |
| dbInstances.dbInstanceName | String | Name to identify DB instances |
| userGroups | Array | User group list |
| userGroups.userGroupId | UUID | User group identifier |
| userGroups.userGroupName | String | Name to identify user groups |
| createdYmdt | DateTime | Created date and time |
| updatedYmdt | DateTime | Modified date and time |

---

### Modify Notification Group

#### Request

```http
---
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
"notificationGroupId": "550e8400-e29b-41d4-a716-446655440000",
"notificationGroupName": "notificationGroupName-example",
"notifyEmail": false,
"notifySms": false,
"isEnabled": true,
"dbInstanceIds": [],
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| notificationGroupName | String | N | Name to identify notification groups |
| notifyEmail | Boolean | N | Whether to be notified by email<br/>- Default: `false` |
| notifySms | Boolean | N | Whether to be notified by SMS<br/>- Default: `false` |
| isEnabled | Boolean | N | Whether enabled<br/>- Default: `false` |
| dbInstanceIds | Array | N | Identifier list of DB instances to monitor |
| userGroupIds | Array | N | User group identifier list |

#### Response

This API does not return a response body.

---

## Monitoring

### View stats

#### Request

```http
---
```

#### Request Body

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List Metric List

#### Request

```http
---
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
},
{
{
"measureName": "measureName-example",
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

---

| Event category | Description |
|-------------|---------|
| ALL | All |
| BACKUP | Backup |
| DB_INSTANCE | DB instance |
| JOB | Job |
| TENANT | Tenant |
| MONITORING | Monitoring |

### List Subscribable Event Codes

#### Request

```http
Events can be categorized into categories, which are shown below.
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
},
{
{
"eventCode": "ENUM_VALUE",
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

#### Request

```http
---
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
},
"totalCounts": 1,
{
{
{
"eventCode": "ENUM_VALUE",
"sourceId": "550e8400-e29b-41d4-a716-446655440000",
"sourceName": "sourceName-example",
{
{
"langCode": "KO",
}
],
],
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
| events.sourceId | UUID | Event source identifier |
| events.sourceName | String | Name to identify event sources |
| events.messages | Array | Event message list |
| events.messages.langCode | Enum | Language code<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | String | Event message |
| events.eventYmdt | DateTime | Event occurred date and time |

---

## Event Subscription

### List Event Subscriptions

#### Request

```http
---
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
},
"totalCounts": 1,
{
{
{
"eventCategoryType": "ALL",
"eventSubscriptionName": "eventSubscriptionName-example",
"notificationGroupName": "notificationGroupName-example",
"notifyEmail": false,
"notifySms": false,
"eventCodes": [],
{
"eventCode": "ENUM_VALUE",
"eventCode": "ENUM_VALUE",
}
],
],
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
| eventSubscriptions | Array | Event subscription list |
| eventSubscriptions.eventSubscriptionId | UUID | Event subscription identifier |
| eventSubscriptions.eventCategoryType | Enum | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.eventSubscriptionName | String | Name to identify the event subscription |
| eventSubscriptions.enabled | Boolean | Whether enabled |
| eventSubscriptions.notifyEmail | Boolean | Whether to send email notifications |
| eventSubscriptions.notifySms | Boolean | Whether to send SMS notifications |
| eventSubscriptions.eventCodes | Array | Event code list to subscribe to |
| eventSubscriptions.sources | Array | Event source list to subscribe to |
| eventSubscriptions.sources.sourceId | UUID | Event source identifier |
| eventSubscriptions.sources.eventCategoryType | Enum | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.userGroupIds | Array | List of user group identifiers subscribed to the event |
| eventSubscriptions.createdYmdt | DateTime | Created date and time |

---

### Create Event Subscription

#### Request

```http
---
```

#### Request Body

<details>
  <summary><strong>Example Code</strong></summary>

```json
{
{
"eventCategoryType": "ALL",
"eventSubscriptionName": "eventSubscriptionName-example",
"notificationGroupName": "notificationGroupName-example",
"notifyEmail": false,
"notifySms": false,
"eventCodes": [],
{
"eventCode": "ENUM_VALUE",
"eventCode": "ENUM_VALUE",
}
],
"dbInstanceIds": [],
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| eventCategoryType | Enum | Y | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | String | Y | Name to identify the event subscription |
| enabled | Boolean | Y | Whether enabled |
| notifyEmail | Boolean | Y | Whether to send email notifications |
| notifySms | Boolean | Y | Whether to send SMS notifications |
| eventCodes | Array | Y | Event code list to subscribe to |
| sources | Array | Y | Event source list to subscribe to |
| sources.sourceId | UUID | Y | Event source identifier |
| sources.eventCategoryType | Enum | Y | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Array | Y | List of user group identifiers to subscribe to the event |

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
},
}
```

</details>

| Name | Type | Description |
|-----|-----|-----|
| eventSubscriptionId | UUID | Event subscription identifier |

---

### Delete Event Subscription

#### Request

```http
---
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

### Modify Event Subscription

#### Request

```http
---
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
{
"eventCategoryType": "ALL",
"eventSubscriptionName": "eventSubscriptionName-example",
"notificationGroupName": "notificationGroupName-example",
"notifyEmail": false,
"notifySms": false,
"eventCodes": [],
{
"eventCode": "ENUM_VALUE",
"eventCode": "ENUM_VALUE",
}
],
"dbInstanceIds": [],
}
```

</details>

| Name | Type | Required | Description |
|-----|-----|-----|-----|
| eventCategoryType | Enum | N | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | String | N | Name to identify the event subscription |
| enabled | Boolean | N | Whether enabled |
| notifyEmail | Boolean | N | Whether to send email notifications |
| notifySms | Boolean | N | Whether to send SMS notifications |
| eventCodes | Array | N | Event code list to subscribe to |
| sources | Array | N | Event source list to subscribe to |
| sources.sourceId | UUID | Y | Event source identifier |
| sources.eventCategoryType | Enum | Y | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Array | N | List of user group identifiers to subscribe to the event |

#### Response

This API does not return a response body.

---
