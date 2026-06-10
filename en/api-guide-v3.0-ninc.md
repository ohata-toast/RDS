## Database > RDS for MySQL > API Guide

## RDS for MySQL API Common Information

### API Endpoint

| Region | Endpoint |
|--------|----------|
| Korea (Daegu) region | https://kr4-rds-mysql-api.ninc.go.kr |

### Authentication and Authorization

User Access Key is required to use the RDS for MySQL API. A User Access Key is an authentication key issued based on an NHN Cloud or IAM account. It is used in conjunction with a Secret Access Key to authenticate API requests.

User Access Keys and Secret Access Keys can be issued in the console's API Security Setting. For more information on issuing and using User Access Key, please refer to the [User Access Key](/nhncloud/en/public-api/user-access-key).

The created Key must be included in the request Header.

| Name                       | Type   | Format | Required | Description                                                              |
|----------------------------|--------|--------|----------|--------------------------------------------------------------------------|
| X-TC-APP-KEY               | Header | String | O        | Appkey of RDS for MySQL or integrated Appkey for project |
| X-TC-AUTHENTICATION-ID     | Header | String | O        | User Access Key ID in API Security Settings menu                         |
| X-TC-AUTHENTICATION-SECRET | Header | String | O        | Secret Access Key in API Security Settings menu                          |

In addition, the APIs you can call are limited based on the project member role. You can grant permissions separately for `RDS for MySQL ADMIN` and `RDS for MySQL VIEWER`.

* `RDS for MySQL ADMIN permission holders` can use all available features as before.
* `RDS for MySQL VIEWER permission holders` can use read-only feature.
    * Cannot use any features aimed at DB instances or create, modify, or delete any DB instance.
    * But, notification group and user group-related features are available.

If an API request fails to authenticate or is not authorized, the following error occurs.

| resultCode | resultMessage | Description            |
|------------|---------------|------------------------|
| 80401      | Unauthorized  | Failed to authenticate |
| 80403      | Forbidden     | Unauthorized.          |

### Common Response Information

The API responds with "200 OK" to all API requests. For more information on the response results, see Response Body Header.

#### Response Body
```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

#### Field
| Name          | Format  | Description                                              |
|---------------|---------|----------------------------------------------------------|
| resultCode    | Number  | Result code<br/>- Success: `0`<br/>- Failure: `Non-zero` |
| resultMessage | String  | Result message                                           |
| isSuccessful  | Boolean | Successful or not                                        |


### DB engine type

| DB engine type | Available for creation | Available for restoration from OBS | Authentication Plugin Support |
|--------------|----------|-----------------|--------|
| MYSQL\_V5633 | X        | X               | NATIVE |
| MYSQL\_V5715 | O        | O               | NATIVE |
| MYSQL\_V5719 | O        | O               | NATIVE |
| MYSQL\_V5726 | O        | O               | NATIVE |
| MYSQL\_V5731 | X        | X               | NATIVE |
| MYSQL\_V5733 | O        | X               | NATIVE, SHA256 |
| MYSQL\_V5737 | O        | O               | NATIVE, SHA256 |
| MYSQL\_V8018 | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL\_V8023 | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL\_V8028 | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL\_V8032 | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL\_V8033 | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL\_V8034 | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL_V8035  | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL_V8036  | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL_V8040  | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL_V8041  | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL_V8042  | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL_V8043  | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL_V8044  | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL_V8045  | O        | O               | NATIVE, CACHING_SHA2 |
| MYSQL_V8405  | O        | O               | CACHING_SHA2 |
| MYSQL_V8406  | O        | O               | CACHING_SHA2 |
| MYSQL_V8407  | O        | O               | CACHING_SHA2 |
| MYSQL_V8408  | O        | O               | CACHING_SHA2 |

* You can use the value for the dbVersion field of ENUM type.
* Depending on the version, creation or restoration may not be possible.

## Project Information

### List Project Members

```http
GET /v3.0/project/members
```

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| members | Body | Array | Project member list |
| members.memberId | Body | UUID | Project member identifier |
| members.memberName | Body | String | Project member name |
| members.emailAddress | Body | String | Project member email address |
| members.phoneNumber | Body | String | Project member mobile |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### List Regions

```http
GET /v3.0/project/regions
```

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| regions | Body | Array | Region list |
| regions.regionCode | Body | Enum | Region code<br/>- KR4: `Korea (Daegu)` |
| regions.isEnabled | Body | Boolean | Whether to enable a region |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

## Specifications of DB Instance

### List DB Instance Specifications

```http
GET /v3.0/db-flavors
```

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbFlavors | Body | Array | List of DB instance specifications |
| dbFlavors.dbFlavorId | Body | UUID | Identifier of DB instance specifications |
| dbFlavors.dbFlavorName | Body | String | Name of DB instance specifications |
| dbFlavors.ram | Body | Number | Memory size (MB) |
| dbFlavors.vcpus | Body | Number | CPU cores |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

## Network

### List Subnets

```http
GET /v3.0/network/subnets
```

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| subnets | Body | Array | Subnet list |
| subnets.subnetId | Body | UUID | Subnet identifier |
| subnets.subnetName | Body | String | Name to identify subnets |
| subnets.subnetCidr | Body | String | CIDR of subnet |
| subnets.usingGateway | Body | Boolean | Whether to use gateway |
| subnets.availableIpCount | Body | Number | Number of available IPs |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

## DB Engine

### List DB Engines

```http
GET /v3.0/db-versions
```

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbVersions | Body | Array | DB engine list |
| dbVersions.dbVersion | Body | String | DB engine type |
| dbVersions.dbVersionName | Body | String | DB engine name |
| dbVersions.restorableFromObs | Body | Boolean | Restoring backup from object storage available or not |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

## Storage

### List Storage Type

```http
GET /v3.0/storage-types
```

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| storageTypes | Body | Array | Storage type list |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### List Storage

```http
GET /v3.0/storages
```

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| storages | Body | Array | Storage list |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

## Task Information

### Task Status

| Status Name        | Description                           |
|--------------------|---------------------------------------|
| `PREPARING`        | Task in preparation                   |
| `READY`            | Task in ready                         |
| `RUNNING`          | Task in progress                      |
| `COMPLETED`        | Task completed                        |
| `REGISTERED`       | Task registered                       |
| `WAIT_TO_REGISTER` | Task waiting to register              |
| `INTERRUPTED`      | Task being interrupted                |
| `CANCELED`         | Task canceled                         |
| `FAILED`           | Task failed                           |
| `ERROR`            | Error occurred while task in progress |
| `DELETED`          | Task deleted                          |
| `FAIL_TO_READY`    | Failed to get ready for task          |

### List Task Details

```http
GET /v3.0/jobs/{jobId}
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Task identifier |
| jobStatus | Body | Enum | Current task status<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Body | Array | Relevant resource list |
| resourceRelations.resourceType | Body | String | Relevant resource type |
| resourceRelations.resourceId | Body | String | Relevant resource identifier |
| createdYmdt | Body | DateTime | Created date and time |
| updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
## DB Instance Group

### List DB Instance Groups

```http
GET /v3.0/db-instance-groups
```

#### Request

This API does not require a request body.

#### Response

| Name                               | Type | Format   | Description                                                                                                     |
|------------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------|
| dbInstanceGroups                   | Body | Array    | DB instance groups                                                                                              |
| dbInstanceGroups.dbInstanceGroupId | Body | UUID     | DB instance group identifier                                                                                    |
| dbInstanceGroups.replicationType   | Body | Enum     | DB instance group replication type<br/>- STANDALONE: `Standalone`<br/>- HIGH_AVAILABILITY: `High availability`  |
| dbInstanceGroups.createdYmdt       | Body | DateTime | Created date and time                                                                                           |
| dbInstanceGroups.updatedYmdt       | Body | DateTime | Modified date and time                                                                                          |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### List DB Instance Group Details

```http
GET /v3.0/db-instance-groups/{dbInstanceGroupId}
```

#### Request

This API does not require a request body.

| Name              | Type | Format | Required | Description                  |
|-------------------|------|--------|----------|------------------------------|
| dbInstanceGroupId | URL  | UUID   | O        |                              |

#### Response

| Name                         | Type | Format   | Description                                                                                                                                                                       |
|------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceGroupId            | Body | UUID     | DB instance group identifier                                                                                                                                                      |
| replicationType              | Body | Enum     | DB instance group replication type<br/>- STANDALONE: `Standalone`<br/>- HIGH_AVAILABILITY: `High availability`                                                                    |
| dbInstances                  | Body | Array    | DB instances belonging to the DB instance group                                                                                                                                   |
| dbInstances.dbInstanceId     | Body | UUID     | DB instance identifier                                                                                                                                                            |
| dbInstances.dbInstanceType   | Body | Enum     | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica`                |
| dbInstances.dbInstanceStatus | Body | Enum     | DB instance current status<br/>- BEFORE_CREATE: `Before create (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| createdYmdt                  | Body | DateTime | Created date and time                                                                                                                                                             |
| updatedYmdt                  | Body | DateTime | Modified date and time                                                                                                                                                            |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

## DB Instance

### DB Instance Status

| Status               | Description                                          |
|----------------------|------------------------------------------------------|
| `AVAILABLE`          | DB instance is available                             |
| `BEFORE_CREATE`      | Before DB instance is created                        |
| `STORAGE_FULL`       | Insufficient DB instance storage                     |
| `FAIL_TO_CREATE`     | Failed to create DB instance                         |
| `FAIL_TO_CONNECT`    | Failed to connect DB instance                        |
| `REPLICATION_STOP`   | Replication of DB instance is stopped                |
| `REPLICATION_DELAY`  | Replication of DB instance is delayed                |
| `FAILOVER`           | High availability DB instance failed over            |
| `SHUTDOWN`           | DB instance is stopped                               |
| `DELETED`            | DB instance is deleted                               |

### DB Instance Progress Status

| Status                     | Description                      |
|----------------------------|----------------------------------|
| `APPLYING_PARAMETER_GROUP` | Parameter group is being applied |
| `BACKING_UP`               | Backing up                       |
| `CANCELING`                | Canceling                        |
| `CREATING`                 | Creating                         |
| `CREATING_SCHEMA`          | Creating DB schema               |
| `CREATING_USER`            | Creating user                    |
| `DELETING`                 | Deleting                         |
| `DELETING_SCHEMA`          | Deleting DB schema               |
| `DELETING_USER`            | Deleting user                    |
| `EXPORTING_BACKUP`         | Exporting backup                 |
| `FAILING_OVER`             | Under failover                   |
| `MIGRATING`                | Under migration                  |
| `MODIFYING`                | Under modification               |
| `PREPARING`                | In preparation                   |
| `PROMOTING`                | Promoting                        |
| `PROMOTING_FORCIBLY`       | Force promoting                  |
| `REBUILDING`               | Rebuilding                       |
| `REPAIRING`                | Recovering                       |
| `REPLICATING`              | Replicating                      |
| `RESTARTING`               | Restarting                       |
| `RESTARTING_FORCIBLY`      | Force restarting                 |
| `RESTORING`                | Restoring                        |
| `STARTING`                 | Starting                         |
| `STOPPING`                 | Stopping                         |
| `SYNCING_SCHEMA`           | Synchronizing DB schema          |
| `SYNCING_USER`             | Synchronizing user               |
| `UPDATING_USER`            | Modifying user                   |
| `WAIT_MANUAL_CONTROL`      | Waiting for manual control       |

### List DB Instances

```http
GET /v3.0/db-instances
```

#### Request

This API does not require a request body.

#### Response

| Name                          | Type | Format   | Description                                                                                                                                                                       |
|-------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstances                   | Body | Array    | DB instances                                                                                                                                                                      |
| dbInstances.dbInstanceId      | Body | UUID     | DB instance identifier                                                                                                                                                            |
| dbInstances.dbInstanceGroupId | Body | UUID     | DB instance group identifier                                                                                                                                                      |
| dbInstances.dbInstanceName    | Body | String   | Name to identify DB instances                                                                                                                                                     |
| dbInstances.description       | Body | String   | Additional information on DB instances                                                                                                                                            |
| dbInstances.dbVersion         | Body | Enum     | DB engine type                                                                                                                                                                    |
| dbInstances.dbPort            | Body | Number   | DB port                                                                                                                                                                           |
| dbInstances.dbInstanceType    | Body | Enum     | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica`                |
| dbInstances.dbInstanceStatus  | Body | Enum     | DB instance current status<br/>- BEFORE_CREATE: `Before create (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| dbInstances.progressStatus    | Body | Enum     | DB instance current progress status<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbInstances.createdYmdt       | Body | DateTime | Created date and time                                                                                                                                                             |
| dbInstances.updatedYmdt       | Body | DateTime | Modified date and time                                                                                                                                                            |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
### Create DB Instance

```http
POST /v3.0/db-instances
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | O | Master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | Body | String | X | Candidate master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | O | Identifier of DB instance specifications |
| dbVersion | Body | Enum | O | DB engine type |
| dbPort | Body | Number | O | DB port<br/>- Minimum value: `3306`<br/>- Maximum value: `43306` |
| dbUserName | Body | String | O | DB user account name<br/>- Minimum length: `1`<br/>- Maximum length: `32` |
| dbPassword | Body | String | O | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `256` |
| parameterGroupId | Body | UUID | O | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | DB security group identifier list |
| userGroupIds | Body | Array | X | User group identifier list |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Default: `3`<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Body | Boolean | X | Whether to enable deletion protection<br/>- Default: `false` |
| authenticationPlugin | Body | Enum | X | Authentication Plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- CACHING_SHA2: `caching_sha2_password authentication (MySQL only)`<br/>- SHA256: `sha256_password authentication (MySQL only)` |
| tlsOption | Body | Enum | X | TLS Option<br/>- Default: `NONE`<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |
| network | Body | Object | O | Network information object |
| network.subnetId | Body | UUID | O | Subnet identifier |
| network.usePublicAccess | Body | Boolean | X | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | O | Availability zone where DB instance will be created |
| storage | Body | Object | O | Storage information object |
| storage.storageType | Body | Enum | O | Storage type |
| storage.storageSize | Body | Number | O | Data storage size (GB)<br/>- Minimum value: `20` |
| backup | Body | Object | O | Backup information object |
| backup.backupPeriod | Body | Number | O | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | Query latency wait time (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| backup.useBackupLock | Body | Boolean | X | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Body | Array | O | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup start time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup Duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Restore DB Instance from Object Storage

```http
POST /v3.0/db-instances/restore-from-obs
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | X | Master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | Body | String | X | Candidate master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | O | Identifier of DB instance specifications |
| dbPort | Body | Number | X | DB port |
| dbVersion | Body | Enum | O | DB engine type |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| imageId | Body | UUID | X | Image identifier |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| storage | Body | Object | O | Storage information object |
| storage.storageType | Body | Enum | O | Storage type |
| storage.storageSize | Body | Number | O | Data storage size (GB)<br/>- Minimum value: `20` |
| network | Body | Object | O | Network information object |
| network.subnetId | Body | UUID | O | Subnet identifier |
| network.usePublicAccess | Body | Boolean | X | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | O | Availability zone where DB instance will be created |
| backup | Body | Object | O | Backup information object |
| backup.backupPeriod | Body | Number | O | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.ftwrlWaitTimeout | Body | Number | X | Query latency wait time (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| backup.useBackupLock | Body | Boolean | X | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Body | Array | O | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup start time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup Duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |
| restore | Body | Object | O | Restoration information object |
| restore.tenantId | Body | String | O | Tenant ID of object storage where backups are stored |
| restore.username | Body | String | O | NHN Cloud account or IAM member ID |
| restore.password | Body | String | O | API password for object storage where backups are stored |
| restore.targetContainer | Body | String | O | Container of object storage where backups are stored |
| restore.objectPath | Body | String | O | Path of backup stored in container |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| parameterGroupId | Body | UUID | O | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | DB security group identifier list |
| userGroupIds | Body | Array | X | User group identifier list |
| useDeletionProtection | Body | Boolean | X | Whether to enable deletion protection<br/>- Default: `false` |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

This API does not return a response body.

---
### Delete DB Instance

```http
DELETE /v3.0/db-instances/{dbInstanceId}
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### View DB Instance Details

```http
GET /v3.0/db-instances/{dbInstanceId}
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbInstanceId | Body | UUID | DB instance identifier |
| dbInstanceGroupId | Body | UUID | DB instance group identifier |
| dbInstanceName | Body | String | Name to identify DB instances |
| description | Body | String | Additional information on DB instances |
| dbVersion | Body | Enum | DB engine type |
| dbPort | Body | Number | DB port |
| dbInstanceType | Body | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstanceStatus | Body | Enum | Current status of DB instance<br/>- BEFORE_CREATE: `Before create (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delay (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| progressStatus | Body | Enum | Current progress status of DB instance<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbFlavorId | Body | UUID | Identifier of DB instance specifications |
| parameterGroupId | Body | UUID | Identifier of the parameter group applied to the DB instance |
| dbSecurityGroupIds | Body | Array | List of identifiers of DB security groups applied to the DB instance |
| notificationGroupIds | Body | Array | List of identifiers of notification groups applied to the DB instance |
| useDeletionProtection | Body | Boolean | Whether deletion protection is enabled for the DB instance |
| supportAuthenticationPlugin | Body | Boolean | Whether authentication plugin is supported |
| needToApplyParameterGroup | Body | Boolean | Whether the latest parameter group needs to be applied |
| needMigration | Body | Boolean | Whether migration is required |
| supportDbVersionUpgrade | Body | Boolean | Whether DB version upgrade is supported |
| createdYmdt | Body | DateTime | Date and time of creation |
| updatedYmdt | Body | DateTime | Date and time of modification |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Modify DB Instance

```http
PUT /v3.0/db-instances/{dbInstanceId}
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| dbInstanceName | Body | String | X | Master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | Body | String | X | Candidate master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbPort | Body | Number | X | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| dbFlavorId | Body | UUID | X | Identifier of DB instance specifications |
| parameterGroupId | Body | UUID | X | Parameter group identifier |
| dbVersion | Body | Enum | X | DB engine version code |
| useDummy | Body | Boolean | X | Whether to use a dummy during DB version upgrade of a single DB instance<br/>- Default: `false` |
| dbSecurityGroupIds | Body | Array | X | List of DB security group identifiers |
| executeBackup | Body | Boolean | X | Whether to execute backup at this time<br/>- Default: `false` |
| useOnlineFailover | Body | Boolean | X | Whether to restart using failover<br/>- Default: `false` |
| waitReplicationDelay | Body | Boolean | X | Whether to wait for replication delay to resolve<br/>- Default: `false` |
| useReadOnly | Body | Boolean | X | Whether to block write traffic<br/>- Default: `false` |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Backup DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/backup
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| backupName | Body | String | O | Name to identify backups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

<details><summary>Example</summary>
<p>

```json
{
    "backupName": "backupName"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### View Backup Information

```http
GET /v3.0/db-instances/{dbInstanceId}/backup-info
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| backupPeriod | Body | Number | Backup retention period (days) |
| ftwrlWaitTimeout | Body | Number | Query latency (sec) |
| backupRetryCount | Body | Number | Number of backup retries |
| replicationRegion | Body | Enum | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| useBackupLock | Body | Boolean | Whether to use table lock |
| backupSchedules | Body | Array | Scheduled auto backup list |
| backupSchedules.backupWndBgnTime | Body | Time | Backup started time |
| backupSchedules.backupWndDuration | Body | Enum | Backup duration<br/>- HALF_AN_HOUR<br/>- ONE_HOUR<br/>- ONE_HOUR_AND_HALF<br/>- TWO_HOURS<br/>- TWO_HOURS_AND_HALF<br/>- THREE_HOURS |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Modify Backup Information

```http
PUT /v3.0/db-instances/{dbInstanceId}/backup-info
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| backupPeriod | Body | Number | X | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| ftwrlWaitTimeout | Body | Number | X | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| useBackupLock | Body | Boolean | X | Whether to use table lock |
| backupSchedules | Body | Array | X | Scheduled auto backup list |
| backupSchedules.backupWndBgnTime | Body | Time | O | Backup started time |
| backupSchedules.backupWndDuration | Body | Enum | O | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
### Export after Backing up DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| tenantId | Body | String | O | Tenant ID of object storage where backup is stored<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | Body | String | O | NHN Cloud member or IAM member ID |
| password | Body | String | O | API password for object storage where backup is stored |
| targetContainer | Body | String | O | Object storage container where backup is stored |
| objectPath | Body | String | O | Backup path to be stored in container |

<details><summary>Example</summary>
<p>

```json
{
    "tenantId": "0123456789abcdef0123456789abcdef",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Change DB Image Meta for Testing

```http
PUT /v3.0/db-instances/{dbInstanceId}/change-image-meta
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

This API does not return a response body.

---

### List DB Schema

```http
GET /v3.0/db-instances/{dbInstanceId}/db-schemas
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbSchemas | Body | Array | DB schema list |
| dbSchemas.dbSchemaId | Body | UUID | DB schema identifier |
| dbSchemas.dbSchemaName | Body | String | DB schema name |
| dbSchemas.dbSchemaStatus | Body | Enum | DB schema current status<br/>- STABLE<br/>- CREATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbSchemas.createdYmdt | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Create DB Schema

```http
POST /v3.0/db-instances/{dbInstanceId}/db-schemas
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| dbSchemaName | Body | String | O | DB schema name<br/>- Maximum length: `64`<br/>- Must start with a letter; letters, digits, and _ allowed; 1–64 characters; MySQL reserved words not allowed |

<details><summary>Example</summary>
<p>

```json
{
    "dbSchemaName": "dbSchemaName-example"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Delete DB Schema

```http
DELETE /v3.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| dbSchemaId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### List DB Users

```http
GET /v3.0/db-instances/{dbInstanceId}/db-users
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbUsers | Body | Array | DB users |
| dbUsers.dbUserId | Body | UUID | DB user identifier |
| dbUsers.dbUserName | Body | String | DB user account name |
| dbUsers.host | Body | String | DB user account host name |
| dbUsers.authorityType | Body | Enum | DB user permission type<br/>- CUSTOM: `Custom permission`<br/>- READ: `Read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `Full permission` |
| dbUsers.dbUserStatus | Body | Enum | DB user current status<br/>- STABLE<br/>- CREATING<br/>- UPDATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbUsers.createdYmdt | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbUsers.updatedYmdt | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbUsers.authenticationPlugin | Body | Enum | Authentication plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- CACHING_SHA2: `caching_sha2_password authentication (MySQL only)`<br/>- SHA256: `sha256_password authentication (MySQL only)` |
| dbUsers.tlsOption | Body | Enum | TLS option<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

<!-- TERM-UNRESOLVED: DB 이미지 메타 (section "Change DB Image Meta for Testing" — no published EN precedent found for this term) -->
### Create DB User

```http
POST /v3.0/db-instances/{dbInstanceId}/db-users
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| dbUserName | Body | String | O | DB user account name<br/>- Minimum length: `1`<br/>- Maximum length: `32` |
| dbPassword | Body | String | O | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `256` |
| host | Body | String | O | DB user account host name<br/>- Maximum length: `45` |
| authorityType | Body | Enum | O | DB user permission type<br/>- CUSTOM: `custom permissions`<br/>- READ: `read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `all permissions` |
| authenticationPlugin | Body | Enum | X | Authentication plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- CACHING_SHA2: `caching_sha2_password authentication (MySQL only)`<br/>- SHA256: `sha256_password authentication (MySQL only)` |
| tlsOption | Body | Enum | X | TLS option<br/>- Default: `NONE`<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Delete DB User

```http
DELETE /v3.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| dbUserId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Modify DB User

```http
PUT /v3.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| dbUserId | URL | UUID | O |  |
| dbPassword | Body | String | X | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `256` |
| authorityType | Body | Enum | X | DB user permission type<br/>- CUSTOM: `custom permissions`<br/>- READ: `read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `all permissions` |
| authenticationPlugin | Body | Enum | X | Authentication plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- CACHING_SHA2: `caching_sha2_password authentication (MySQL only)`<br/>- SHA256: `sha256_password authentication (MySQL only)` |
| tlsOption | Body | Enum | X | TLS option<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |

<details><summary>Example</summary>
<p>

```json
{
    "dbPassword": "dbPassword",
    "authorityType": "CUSTOM",
    "authenticationPlugin": "NATIVE",
    "tlsOption": "NONE"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Change DB Instance Deletion Protection Settings

```http
PUT /v3.0/db-instances/{dbInstanceId}/deletion-protection
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| useDeletionProtection | Body | Boolean | O | Whether to protect against deletion |

<details><summary>Example</summary>
<p>

```json
{
    "useDeletionProtection": false
}
```

</p>
</details>

#### Response

This API does not return a response body.

---

### Force Restart DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/force-restart
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

This API does not return a response body.

---
### Modify High Availability

```http
PUT /v3.0/db-instances/{dbInstanceId}/high-availability
```

#### Request

| Name                | Type | Format  | Required | Description                                                                                          |
|---------------------|------|---------|----------|------------------------------------------------------------------------------------------------------|
| dbInstanceId        | URL  | UUID    | O        |                                                                                                      |
| useHighAvailability | Body | Boolean | O        | Whether to use high availability                                                                     |
| pingInterval        | Body | Number  | X        | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |

<details><summary>Example</summary>
<p>

```json
{
    "useHighAvailability": false,
    "pingInterval": 1
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Pause High Availability

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description |
|--------------|------|--------|----------|-------------|
| dbInstanceId | URL  | UUID   | O        |             |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Recover High Availability

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description |
|--------------|------|--------|----------|-------------|
| dbInstanceId | URL  | UUID   | O        |             |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Restart High Availability

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description |
|--------------|------|--------|----------|-------------|
| dbInstanceId | URL  | UUID   | O        |             |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Separate High Availability

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/split
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description |
|--------------|------|--------|----------|-------------|
| dbInstanceId | URL  | UUID   | O        |             |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
### List Log Files

```http
GET /v3.0/db-instances/{dbInstanceId}/log-files
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| logFiles | Body | Array | Log File list |
| logFiles.logFileName | Body | String | Log File name |
| logFiles.logFileType | Body | Enum | Log File type<br/>- `ERROR`<br/>- `BINLOG`<br/>- `GENERAL`<br/>- `SLOW_QUERY`<br/>- `AUDIT`<br/>- `BACKUP` |
| logFiles.logFileSize | Body | Number | Log File size(Byte) |
| logFiles.createdYmdt | Body | DateTime | Created date and time |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Export Log File

```http
POST /v3.0/db-instances/{dbInstanceId}/log-files/export
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| logFileNames | Body | Array | O | Log File name list |
| tenantId | Body | String | O | Tenant ID of object storage to store log file<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | Body | String | O | NHN Cloud account or IAM member ID |
| password | Body | String | O | API password for object storage where log file is stored |
| targetContainer | Body | String | O | Object storage container where log file is stored |
| objectPath | Body | String | O | Log file path to be stored in container |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### List Network Information

```http
GET /v3.0/db-instances/{dbInstanceId}/network-info
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| availabilityZone | Body | String | Availability zone where DB instance will be created |
| subnet | Body | Object | Subnet object |
| subnet.subnetId | Body | UUID | Subnet identifier |
| subnet.subnetName | Body | String | Name to identify subnets |
| subnet.subnetCidr | Body | String | CIDR of subnet |
| endPoints | Body | Array | List of access information |
| endPoints.domain | Body | String | Domain |
| endPoints.ipAddress | Body | String | IP address |
| endPoints.endPointType | Body | String | Access information type |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Modify Network Information

```http
PUT /v3.0/db-instances/{dbInstanceId}/network-info
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| usePublicAccess | Body | Boolean | O | External access is available or not |

<details><summary>Example</summary>
<p>

```json
{
    "usePublicAccess": false
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
### Promote DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/promote
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Replicate DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/replicate
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbInstanceName | Body | String | O | Name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | X | Identifier of DB instance specifications |
| dbPort | Body | Number | O | DB port<br/>- Minimum value: `3306`, Maximum value: `43306` |
| parameterGroupId | Body | UUID | X | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | List of DB security group identifiers |
| userGroupIds | Body | Array | X | List of user group identifiers |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Body | Boolean | X | Whether to enable deletion protection<br/>- Default: `false` |
| network | Body | Object | O | Network information object |
| network.usePublicAccess | Body | Boolean | X | Whether external access is available |
| network.availabilityZone | Body | Enum | O | Availability zone where the DB instance will be created |
| storage | Body | Object | X | Storage information object |
| storage.storageType | Body | Enum | X | Data storage type |
| storage.storageSize | Body | Number | X | Data storage size (GB)<br/>- Minimum value: `20` |
| backup | Body | Object | X | Backup information object |
| backup.backupPeriod | Body | Number | X | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | Query latency wait time (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| backup.useBackupLock | Body | Boolean | X | Whether to use table lock |
| backup.backupSchedules | Body | Array | X | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Body | Time | X | Backup start time |
| backup.backupSchedules.backupWndDuration | Body | Enum | X | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Restart DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/restart
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| useOnlineFailover | Body | Boolean | X | Whether to restart using failover<br/>- Default: `false` |
| executeBackup | Body | Boolean | X | Whether to execute backup at the current point in time<br/>- Default: `false` |
| waitReplicationDelay | Body | Boolean | X | Whether to wait for replication lag to clear<br/>- Default: `false` |
| useReadOnly | Body | Boolean | X | Whether to block write workload<br/>- Default: `false` |

<details><summary>Example</summary>
<p>

```json
{
    "useOnlineFailover": false,
    "executeBackup": false,
    "waitReplicationDelay": false,
    "useReadOnly": false
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### View Restoration Information

```http
GET /v3.0/db-instances/{dbInstanceId}/restoration-info
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

This API does not return a response body.

---

### View the Last Query to Be Restored

```http
GET /v3.0/db-instances/{dbInstanceId}/restoration-info/last-query
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| executedYmdt | Body | DateTime | Query execution date and time |
| lastQuery | Body | String | Last executed query |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
### Restore DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/restore
```

#### Common Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| dbInstanceName | Body | String | X | Master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | Body | String | X | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | O | Identifier of DB instance specifications |
| dbPort | Body | Number | X | DB port |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| imageId | Body | UUID | X | Identifier of the image |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| storage | Body | Object | O | Storage information object |
| storage.storageType | Body | Enum | O | Storage type |
| storage.storageSize | Body | Number | O | Data storage size (GB)<br/>- Minimum value: `20` |
| network | Body | Object | O | Network information object |
| network.subnetId | Body | UUID | O | Subnet identifier |
| network.usePublicAccess | Body | Boolean | X | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | O | Availability zone where the DB instance will be created |
| backup | Body | Object | O | Backup information object |
| backup.backupPeriod | Body | Number | O | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.ftwrlWaitTimeout | Body | Number | X | Query latency wait time (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| backup.useBackupLock | Body | Boolean | X | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Body | Array | O | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup start time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hours`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |
| restore | Body | Object | O | Restoration information object |
| restore.restoreType | Body | Enum | O | Restoration type<br/>- TIMESTAMP: `A point-in-time restoration using the time within the restorable time`<br/>- BINLOG: `A point-in-time restoration using a restorable binary log location`<br/>- BACKUP: `Snapshot restoration using a previously created backup` |
| restore.binLog.binLogFileName | Body | String | X | Binary log name to use for restoration |
| restore.binLog.binLogPosition | Body | Object | X | Binary log location to use for restoration |
| useDefaultNotification | Body | Boolean | X | Whether to use default notifications<br/>- Default: `false` |
| parameterGroupId | Body | UUID | O | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | List of DB security group identifiers |
| userGroupIds | Body | Array | X | List of user group identifiers |
| useDeletionProtection | Body | Boolean | X | Whether to enable deletion protection<br/>- Default: `false` |

#### Request when restoring a point in time using Timestamp (if restoreType is `TIMESTAMP`)

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| restore.restoreYmdt | Body | DateTime | X | DB instance restoration date and time |

Restoration is possible only before the most recent restorable time queried through restoration information inquiry.

#### Request for point-in-time restoration using binary logs (if restoreType is `BINLOG`)

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| restore.backupId | Body | UUID | X | Identifier of the backup to use for restoration |
| restore.binLog | Body | Object | X | Binary log information object to use for restoration |

When restoring a point in time using the binary log, it is possible to restore the log recorded after that based on the binary log file and location of the base backup.

#### Request when restoring from backup (if restoreType is `BACKUP`)

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| restore.backupId | Body | UUID | X | Identifier of the backup to use for restoration |

<details><summary>Example</summary>
<p>

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
        "restoreType": "TIMESTAMP",
        "binLog": {
            "binLogFileName": "binLogFileName-example",
            "binLogPosition": {
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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Start DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/start
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Stop DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/stop
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### View Storage Information

```http
GET /v3.0/db-instances/{dbInstanceId}/storage-info
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| storageType | Body | Enum | Data storage type |
| storageSize | Body | Number | Data storage size (GB) |
| storageStatus | Body | Enum | Current status of data storage<br/>- DELETED: `Deleted`<br/>- PENDING_DELETION: `Pending deletion`<br/>- DELETION_RESERVED: `Deletion reserved (awaiting snapshot cleanup)`<br/>- DETACHED: `Detached`<br/>- ATTACHED: `Attached` |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "storageType": "General SSD",
    "storageSize": 1,
    "storageStatus": "DELETED"
}
```

</p>
</details>

---

### Modify Storage Information

```http
PUT /v3.0/db-instances/{dbInstanceId}/storage-info
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| storageSize | Body | Number | O | Data storage size (GB)<br/>- Maximum value: `2048` |

<details><summary>Example</summary>
<p>

```json
{
    "storageSize": 1
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
## Backups

### Backup Status

| Status       | Description             |
|--------------|-------------------------|
| `BACKING_UP` | Backup in progress      |
| `COMPLETED`  | Backup is completed     |
| `DELETING`   | Backup is being deleted |
| `DELETED`    | Backup is deleted       |
| `ERROR`      | Error occurred          |

### Retrieve Backup List

```http
GET /v3.0/backups
```

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| totalCounts | Body | Number | Number of all backup lists |
| backups | Body | Array | Backup list |
| backups.backupId | Body | UUID | Backup identifier |
| backups.backupName | Body | String | Name to identify backups |
| backups.backupStatus | Body | Enum | Backup current status<br/>- BACKING_UP: `Backup in progress (spinner)`<br/>- VERIFYING: `Verifying (spinner)`<br/>- COMPLETED: `Available (green icon)`<br/>- DELETING: `Deleting (spinner)`<br/>- DELETED: `Deleted (gray icon)`<br/>- ERROR: `Error (red icon)` |
| backups.dbInstanceId | Body | UUID | Original DB instance identifier |
| backups.dbVersion | Body | Enum | DB engine type |
| backups.utilVersion | Body | String | Utility version |
| backups.backupType | Body | Enum | Backup type<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Body | Number | Backup size (Byte) |
| backups.createdYmdt | Body | DateTime | Created date and time |
| backups.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
<p>

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
            "dbVersion": "MYSQL_V8036",
            "utilVersion": "utilVersion-example",
            "backupType": "AUTO",
            "backupSize": 1,
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### Delete Backup

```http
DELETE /v3.0/backups/{backupId}
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Export Backup

```http
POST /v3.0/backups/{backupId}/export
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |
| tenantId | Body | String | O | Tenant ID of object storage to store backup<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | Body | String | O | NHN Cloud account or IAM member ID |
| password | Body | String | O | API password for object storage where backup is stored |
| targetContainer | Body | String | O | Object storage container where backup is stored |
| objectPath | Body | String | O | Backup path to be stored in container |

<details><summary>Example</summary>
<p>

```json
{
    "tenantId": "0123456789abcdef0123456789abcdef",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Restore Backup

```http
POST /v3.0/backups/{backupId}/restore
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |
| dbInstanceName | Body | String | O | Name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | O | Identifier of DB instance specifications |
| dbPort | Body | Number | O | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| parameterGroupId | Body | UUID | O | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | DB security group identifiers |
| userGroupIds | Body | Array | X | User group identifiers |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Default: `3`<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Body | Boolean | X | Whether to protect against deletion<br/>- Default: `false` |
| network | Body | Object | O | Network information objects |
| network.subnetId | Body | UUID | O | Subnet identifier |
| network.usePublicAccess | Body | Boolean | X | External access is available or not<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | O | Availability zone where DB instance will be created |
| storage | Body | Object | O | Storage information objects |
| storage.storageType | Body | Enum | O | Block Storage Type |
| storage.storageSize | Body | Number | O | Block Storage Size (GB)<br/>- Minimum value: `20` |
| backup | Body | Object | O | Backup information objects |
| backup.backupPeriod | Body | Number | O | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu) Region` |
| backup.useBackupLock | Body | Boolean | X | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Body | Array | O | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup started time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hour`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Identifier of requested task |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
## DB Security Groups

### DB Security Group Progress Status

| Status          | Description                  |
|-----------------|------------------------------|
| `NONE`          | No operation in progress     |
| `CREATING_RULE` | Creating rule policy         |
| `UPDATING_RULE` | Modifying rule policy        |
| `DELETING_RULE` | Deleting rule policy         |

### List DB Security Groups

```http
GET /v3.0/db-security-groups
```

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbSecurityGroups | Body | Array | DB security group list |
| dbSecurityGroups.dbSecurityGroupId | Body | UUID | DB security group identifier |
| dbSecurityGroups.dbSecurityGroupName | Body | String | Name to identify the DB security group |
| dbSecurityGroups.description | Body | String | Additional information on the DB security group |
| dbSecurityGroups.progressStatus | Body | Enum | Current progress status of the DB security group<br/>- NONE: `None`<br/>- CREATING_RULE: `Creating rule`<br/>- UPDATING_RULE: `Modifying rule`<br/>- DELETING_RULE: `Deleting rule`<br/>- APPLYING_DEFAULT_RULE: `Applying default rule` |
| dbSecurityGroups.createdYmdt | Body | DateTime | Created date and time |
| dbSecurityGroups.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
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

</p>
</details>

---

### Create DB Security Group

```http
POST /v3.0/db-security-groups
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupName | Body | String | O | Name to identify the DB security group<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on the DB security group<br/>- Maximum length: `100` |
| rules | Body | Array | O | DB security group rule list |
| rules.direction | Body | Enum | O | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| rules.etherType | Body | Enum | O | Ether type<br/>- IPV4: `IPv4 format`<br/>- IPV6: `IPv6 format` |
| rules.port | Body | Object | O | Port object |
| rules.port.portType | Body | Enum | O | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receive port`<br/>- PORT_RANGE: `Port range` |
| rules.port.minPort | Body | Number | X | Minimum port range<br/>- Minimum value: `3306` |
| rules.port.maxPort | Body | Number | X | Maximum port range<br/>- Maximum value: `65535` |
| rules.cidr | Body | String | O | CIDR |
| rules.description | Body | String | X | Additional information on the security group rule |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbSecurityGroupId | Body | UUID | DB security group identifier |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Delete DB Security Group

```http
DELETE /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |

#### Response

This API does not return a response body.

---

### List DB Security Group Details

```http
GET /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbSecurityGroup | Body | Object | DB security group |
| dbSecurityGroup.dbSecurityGroupId | Body | UUID | DB security group identifier |
| dbSecurityGroup.dbSecurityGroupName | Body | String | Name to identify the DB security group |
| dbSecurityGroup.description | Body | String | Additional information on the DB security group |
| dbSecurityGroup.progressStatus | Body | Enum | Current progress status of the DB security group<br/>- NONE: `None`<br/>- CREATING_RULE: `Creating rule`<br/>- UPDATING_RULE: `Modifying rule`<br/>- DELETING_RULE: `Deleting rule`<br/>- APPLYING_DEFAULT_RULE: `Applying default rule` |
| dbSecurityGroup.rules | Body | Array | DB security group rule list |
| dbSecurityGroup.rules.ruleId | Body | UUID | DB security group rule identifier |
| dbSecurityGroup.rules.description | Body | String | Additional information on the DB security group rule |
| dbSecurityGroup.rules.direction | Body | Enum | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| dbSecurityGroup.rules.etherType | Body | Enum | Ether type<br/>- IPV4: `IPv4 format`<br/>- IPV6: `IPv6 format` |
| dbSecurityGroup.rules.port | Body | Object | Port object |
| dbSecurityGroup.rules.port.portType | Body | Enum | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receive port`<br/>- PORT_RANGE: `Port range` |
| dbSecurityGroup.rules.port.minPort | Body | Number | Minimum port range |
| dbSecurityGroup.rules.port.maxPort | Body | Number | Maximum port range |
| dbSecurityGroup.rules.cidr | Body | String | CIDR |
| dbSecurityGroup.rules.createdYmdt | Body | DateTime | Created date and time |
| dbSecurityGroup.rules.updatedYmdt | Body | DateTime | Modified date and time |
| dbSecurityGroup.createdYmdt | Body | DateTime | Created date and time |
| dbSecurityGroup.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroup": {
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
}
```

</p>
</details>

---

### Modify DB Security Group

```http
PUT /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| dbSecurityGroupName | Body | String | X | Name to identify the DB security group<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on the DB security group<br/>- Maximum length: `100` |

<details><summary>Example</summary>
<p>

```json
{
    "dbSecurityGroupName": "dbSecurityGroupName",
    "description": "description-example"
}
```

</p>
</details>

#### Response

This API does not return a response body.

---

### Delete DB Security Group Rule

```http
DELETE /v3.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| ruleIds | Query | String | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Job identifier |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Create DB Security Group Rule

```http
POST /v3.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| direction | Body | Enum | O | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| etherType | Body | Enum | O | Ether type<br/>- IPV4: `IPv4 format`<br/>- IPV6: `IPv6 format` |
| port | Body | Object | O | Port object |
| port.portType | Body | Enum | O | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receive port`<br/>- PORT_RANGE: `Port range` |
| port.minPort | Body | Number | X | Minimum port range<br/>- Minimum value: `3306` |
| port.maxPort | Body | Number | X | Maximum port range<br/>- Maximum value: `65535` |
| cidr | Body | String | O | CIDR |
| description | Body | String | X | Additional information on the DB security group rule<br/>- Maximum length: `200` |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Job identifier |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Modify DB Security Group Rule

```http
PUT /v3.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| ruleId | URL | UUID | O |  |
| direction | Body | Enum | O | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| etherType | Body | Enum | O | Ether type<br/>- IPV4: `IPv4 format`<br/>- IPV6: `IPv6 format` |
| port | Body | Object | O | Port object |
| port.portType | Body | Enum | O | Port type<br/>- ALL: `All port ranges (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receive port`<br/>- PORT_RANGE: `Port range` |
| port.minPort | Body | Number | X | Minimum port range<br/>- Minimum value: `3306` |
| port.maxPort | Body | Number | X | Maximum port range<br/>- Maximum value: `65535` |
| cidr | Body | String | O | CIDR |
| description | Body | String | X | Additional information on the DB security group rule<br/>- Maximum length: `200` |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| jobId | Body | UUID | Job identifier |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
## Parameter group

### List Parameter Groups

```http
GET /v3.0/parameter-groups
```

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| parameterGroups | Body | Array | Parameter groups |
| parameterGroups.parameterGroupId | Body | UUID | Parameter group identifier |
| parameterGroups.parameterGroupName | Body | String | Name to identify parameter groups |
| parameterGroups.description | Body | String | Additional information on parameter group |
| parameterGroups.dbVersion | Body | Enum | DB engine type |
| parameterGroups.parameterGroupStatus | Body | Enum | Parameter group current status<br/>- STABLE: `Applied`<br/>- NEED_TO_APPLY: `Need to apply`<br/>- DELETED: `Deleted` |
| parameterGroups.createdYmdt | Body | DateTime | Created date and time |
| parameterGroups.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroups": [
        {
            "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "parameterGroupName": "parameterGroupName-example",
            "description": "description-example",
            "dbVersion": "MYSQL_V8036",
            "parameterGroupStatus": "STABLE",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### Create Parameter Group

```http
POST /v3.0/parameter-groups
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupName | Body | String | O | Name to identify parameter groups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on parameter group<br/>- Maximum length: `100` |
| dbVersion | Body | Enum | O | DB engine type |

<details><summary>Example</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example",
    "dbVersion": "MYSQL_V8036"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | Parameter group identifier |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Delete Parameter Group

```http
DELETE /v3.0/parameter-groups/{parameterGroupId}
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |

#### Response

This API does not return a response body.

---

### List Parameter Group Details

```http
GET /v3.0/parameter-groups/{parameterGroupId}
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | Parameter group identifier |
| parameterGroupName | Body | String | Name to identify parameter groups |
| description | Body | String | Additional information on parameter group |
| dbVersion | Body | Enum | DB engine type |
| parameterGroupStatus | Body | Enum | Parameter group current status<br/>- STABLE: `Applied`<br/>- NEED_TO_APPLY: `Need to apply`<br/>- DELETED: `Deleted` |
| parameters | Body | Array | Parameter list |
| parameters.parameterId | Body | UUID | Parameter identifier |
| parameters.parameterFileGroup | Body | Enum | Parameter file group type<br/>- CLIENT<br/>- MYSQL<br/>- MYSQLD |
| parameters.parameterName | Body | String | Parameter name |
| parameters.fileParameterName | Body | String | Parameter file name |
| parameters.value | Body | String | Current value |
| parameters.defaultValue | Body | String | Default value |
| parameters.allowedValue | Body | String | Permitted values |
| parameters.updateType | Body | Enum | Modify type<br/>- VARIABLE<br/>- CONSTANT<br/>- INIT_VARIABLE |
| parameters.applyType | Body | Enum | Apply type<br/>- BOTH<br/>- SESSION<br/>- FILE |
| createdYmdt | Body | DateTime | Created date and time |
| updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
<p>

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
    "dbVersion": "MYSQL_V8036",
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

</p>
</details>

---

### Modify Parameter Group

```http
PUT /v3.0/parameter-groups/{parameterGroupId}
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |
| parameterGroupName | Body | String | X | Name to identify parameter groups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on parameter group<br/>- Maximum length: `100` |

<details><summary>Example</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example"
}
```

</p>
</details>

#### Response

This API does not return a response body.

---

### Copy Parameter Group

```http
POST /v3.0/parameter-groups/{parameterGroupId}/copy
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |
| parameterGroupName | Body | String | O | Name to identify parameter groups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on parameter group<br/>- Maximum length: `100` |

<details><summary>Example</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example"
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | Parameter group identifier |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Modify Parameter

```http
PUT /v3.0/parameter-groups/{parameterGroupId}/parameters
```

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |
| modifiedParameters | Body | Array | O | Parameters to change |
| modifiedParameters.parameterId | Body | UUID | O | Parameter identifier |
| modifiedParameters.value | Body | String | O | Parameter value to change |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

This API does not return a response body.

---

### Reset Parameter Group

```http
PUT /v3.0/parameter-groups/{parameterGroupId}/reset
```

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |

#### Response

This API does not return a response body.

---
## User Group

### List User Groups

```http
GET /v3.0/user-groups
```

#### Request

This API does not require a request body.

#### Response

| Name                     | Type | Format   | Description                                         |
|--------------------------|------|----------|-----------------------------------------------------|
| userGroups               | Body | Array    | User group list                                     |
| userGroups.userGroupId   | Body | UUID     | User group identifier                               |
| userGroups.userGroupName | Body | String   | Name to identify user groups                        |
| userGroups.createdYmdt   | Body | DateTime | Created date and time                               |
| userGroups.updatedYmdt   | Body | DateTime | Modified date and time                              |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
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

</p>
</details>

---

### Create User Group

```http
POST /v3.0/user-groups
```

#### Request

| Name          | Type | Format  | Required | Description                                                                 |
|---------------|------|---------|----------|-----------------------------------------------------------------------------|
| userGroupName | Body | String  | O        | Name to identify user groups                                                |
| memberIds     | Body | Array   | O        | Project member identifier list                                              |
| selectAllYN   | Body | Boolean | X        | Whether to include all project members<br/>- Default: `false`               |

<details><summary>Example</summary>
<p>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAllYN": false
}
```

</p>
</details>

#### Response

| Name        | Type | Format | Description           |
|-------------|------|--------|-----------------------|
| userGroupId | Body | UUID   | User group identifier |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Delete User Group

```http
DELETE /v3.0/user-groups/{userGroupId}
```

#### Request

This API does not require a request body.

| Name        | Type | Format | Required | Description           |
|-------------|------|--------|----------|-----------------------|
| userGroupId | URL  | UUID   | O        |                       |

#### Response

This API does not return a response body.

---

### View User Group Details

```http
GET /v3.0/user-groups/{userGroupId}
```

#### Request

This API does not require a request body.

| Name        | Type | Format | Required | Description           |
|-------------|------|--------|----------|-----------------------|
| userGroupId | URL  | UUID   | O        |                       |

#### Response

| Name              | Type | Format   | Description                                                                                                                                            |
|-------------------|------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| userGroupId       | Body | UUID     | User group identifier                                                                                                                                  |
| userGroupName     | Body | String   | Name to identify user groups                                                                                                                           |
| userGroupTypeCode | Body | Enum     | User group type<br/>- `ENTIRE`: User group including all project members<br/>- `INDIVIDUAL_MEMBER`: User group including specific project members       |
| members           | Body | Array    | Project member list                                                                                                                                    |
| members.memberId  | Body | UUID     | Project member identifier                                                                                                                              |
| createdYmdt       | Body | DateTime | Created date and time                                                                                                                                  |
| updatedYmdt       | Body | DateTime | Modified date and time                                                                                                                                 |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Modify User Group

```http
PUT /v3.0/user-groups/{userGroupId}
```

#### Request

| Name          | Type | Format  | Required | Description                                           |
|---------------|------|---------|----------|-------------------------------------------------------|
| userGroupId   | URL  | UUID    | O        |                                                       |
| userGroupName | Body | String  | O        | Name to identify user groups                          |
| memberIds     | Body | Array   | X        | Project member identifier list                        |
| selectAllYN   | Body | Boolean | X        | Whether to include all project members<br/>- Default: `false` |

<details><summary>Example</summary>
<p>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAllYN": false
}
```

</p>
</details>

#### Response

This API does not return a response body.

---

## Notification Group

### List Notification Groups

```http
GET /v3.0/notification-groups
```

#### Request

This API does not require a request body.

#### Response

| Name                                     | Type | Format   | Description                                         |
|------------------------------------------|------|----------|-----------------------------------------------------|
| notificationGroups                       | Body | Array    | Notification group list                             |
| notificationGroups.notificationGroupId   | Body | UUID     | Notification group identifier                       |
| notificationGroups.notificationGroupName | Body | String   | Name to identify notification groups                |
| notificationGroups.notifyEmail           | Body | Boolean  | Whether to be notified by email                     |
| notificationGroups.notifySms             | Body | Boolean  | Whether to be notified by SMS                       |
| notificationGroups.isEnabled             | Body | Boolean  | Whether enabled                                     |
| notificationGroups.createdYmdt           | Body | DateTime | Created date and time                               |
| notificationGroups.updatedYmdt           | Body | DateTime | Modified date and time                              |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Create Notification Group

```http
POST /v3.0/notification-groups
```

#### Request

| Name                  | Type | Format  | Required | Description                                                                 |
|-----------------------|------|---------|----------|-----------------------------------------------------------------------------|
| notificationGroupName | Body | String  | O        | Name to identify notification groups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| notifyEmail           | Body | Boolean | X        | Whether to be notified by email<br/>- Default: `true`                       |
| notifySms             | Body | Boolean | X        | Whether to be notified by SMS<br/>- Default: `true`                         |
| isEnabled             | Body | Boolean | X        | Whether enabled<br/>- Default: `true`                                       |
| dbInstanceIds         | Body | Array   | O        | Identifier list of DB instances to monitor                                  |
| userGroupIds          | Body | Array   | O        | User group identifier list                                                  |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name                | Type | Format | Description                   |
|---------------------|------|--------|-------------------------------|
| notificationGroupId | Body | UUID   | Notification group identifier |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Delete Notification Group

```http
DELETE /v3.0/notification-groups/{notificationGroupId}
```

#### Request

This API does not require a request body.

| Name                | Type | Format | Required | Description                   |
|---------------------|------|--------|----------|-------------------------------|
| notificationGroupId | URL  | UUID   | O        |                               |

#### Response

This API does not return a response body.

---

### View Notification Group Details

```http
GET /v3.0/notification-groups/{notificationGroupId}
```

#### Request

This API does not require a request body.

| Name                | Type | Format | Required | Description                   |
|---------------------|------|--------|----------|-------------------------------|
| notificationGroupId | URL  | UUID   | O        |                               |

#### Response

| Name                       | Type | Format   | Description                                         |
|----------------------------|------|----------|-----------------------------------------------------|
| notificationGroupId        | Body | UUID     | Notification group identifier                       |
| notificationGroupName      | Body | String   | Name to identify notification groups                |
| notifyEmail                | Body | Boolean  | Whether to be notified by email                     |
| notifySms                  | Body | Boolean  | Whether to be notified by SMS                       |
| isEnabled                  | Body | Boolean  | Whether enabled                                     |
| dbInstances                | Body | Array    | DB instance list to monitor                         |
| dbInstances.dbInstanceId   | Body | UUID     | DB instance identifier                              |
| dbInstances.dbInstanceName | Body | String   | Name to identify DB instances                       |
| userGroups                 | Body | Array    | User group list                                     |
| userGroups.userGroupId     | Body | UUID     | User group identifier                               |
| userGroups.userGroupName   | Body | String   | Name to identify user groups                        |
| createdYmdt                | Body | DateTime | Created date and time                               |
| updatedYmdt                | Body | DateTime | Modified date and time                              |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Modify Notification Group

```http
PUT /v3.0/notification-groups/{notificationGroupId}
```

#### Request

| Name                  | Type | Format  | Required | Description                                      |
|-----------------------|------|---------|----------|--------------------------------------------------|
| notificationGroupId   | URL  | UUID    | O        |                                                  |
| notificationGroupName | Body | String  | X        | Name to identify notification groups             |
| notifyEmail           | Body | Boolean | X        | Whether to be notified by email<br/>- Default: `false` |
| notifySms             | Body | Boolean | X        | Whether to be notified by SMS<br/>- Default: `false`   |
| isEnabled             | Body | Boolean | X        | Whether enabled<br/>- Default: `false`                 |
| dbInstanceIds         | Body | Array   | X        | Identifier list of DB instances to monitor       |
| userGroupIds          | Body | Array   | X        | User group identifier list                       |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

This API does not return a response body.

---
## Monitoring

### View stats

```http
GET /v3.0/metric-statistics
```

#### Request

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List Metric List

```http
GET /v3.0/metrics
```

#### Request

This API does not require a request body.

#### Response

| Name                | Type | Format | Description          |
|---------------------|------|--------|----------------------|
| metrics             | Body | Array  | Metric list          |
| metrics.measureName | Body | String | Metric type to query |
| metrics.unit        | Body | String | Measure unit         |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

## Event

### Event category

Events can be categorized into categories, which are shown below.

| Event category | Description |
|----------------|-------------|
| ALL            | All         |
| BACKUP         | Backup      |
| DB_INSTANCE    | DB instance |
| JOB            | Job         |
| TENANT         | Tenant      |
| MONITORING     | Monitoring  |

### List Subscribable Event Codes

```http
GET /v3.0/event-codes
```

#### Request

This API does not require a request body.

#### Response

| Name                         | Type | Format | Description                                                                                                                                                              |
|------------------------------|------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| eventCodes                   | Body | Array  | Event code list                                                                                                                                                          |
| eventCodes.eventCode         | Body | Enum   | Event code                                                                                                                                                               |
| eventCodes.eventCategoryType | Body | Enum   | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### List Events

```http
GET /v3.0/events
```

#### Request

This API does not require a request body.

#### Response

| Name                     | Type | Format   | Description                                               |
|--------------------------|------|----------|-----------------------------------------------------------|
| totalCounts              | Body | Number   | Total number of events                                    |
| events                   | Body | Array    | Event list                                                |
| events.eventCategoryType | Body | Enum     | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| events.eventCode         | Body | Enum     | Occurred event type                                       |
| events.sourceId          | Body | UUID     | Event source identifier                                   |
| events.sourceName        | Body | String   | Name to identify event sources                            |
| events.messages          | Body | Array    | Event message list                                        |
| events.messages.langCode | Body | Enum     | Language code<br/>- KO<br/>- EN<br/>- JA<br/>- ZH        |
| events.messages.message  | Body | String   | Event message                                             |
| events.eventYmdt         | Body | DateTime | Event occurred date and time                              |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

## Event Subscription

### List Event Subscriptions

```http
GET /v3.0/event-subscriptions
```

#### Request

This API does not require a request body.

#### Response

| Name                                          | Type | Format   | Description                                                                                                                                                              |
|-----------------------------------------------|------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| totalCounts                                   | Body | Number   | Total number of event subscriptions                                                                                                                                      |
| eventSubscriptions                            | Body | Array    | Event subscription list                                                                                                                                                  |
| eventSubscriptions.eventSubscriptionId        | Body | UUID     | Event subscription identifier                                                                                                                                            |
| eventSubscriptions.eventCategoryType          | Body | Enum     | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.eventSubscriptionName      | Body | String   | Name to identify the event subscription                                                                                                                                  |
| eventSubscriptions.enabled                    | Body | Boolean  | Whether enabled                                                                                                                                                          |
| eventSubscriptions.notifyEmail                | Body | Boolean  | Whether to send email notifications                                                                                                                                      |
| eventSubscriptions.notifySms                  | Body | Boolean  | Whether to send SMS notifications                                                                                                                                        |
| eventSubscriptions.eventCodes                 | Body | Array    | Event code list to subscribe to                                                                                                                                          |
| eventSubscriptions.sources                    | Body | Array    | Event source list to subscribe to                                                                                                                                        |
| eventSubscriptions.sources.sourceId           | Body | UUID     | Event source identifier                                                                                                                                                  |
| eventSubscriptions.sources.eventCategoryType  | Body | Enum     | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.userGroupIds               | Body | Array    | List of user group identifiers subscribed to the event                                                                                                                   |
| eventSubscriptions.createdYmdt                | Body | DateTime | Created date and time                                                                                                                                                    |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Create Event Subscription

```http
POST /v3.0/event-subscriptions
```

#### Request

| Name                   | Type | Format  | Required | Description                                                                                                                                                              |
|------------------------|------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| eventCategoryType      | Body | Enum    | O        | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName  | Body | String  | O        | Name to identify the event subscription                                                                                                                                  |
| enabled                | Body | Boolean | O        | Whether enabled                                                                                                                                                          |
| notifyEmail            | Body | Boolean | O        | Whether to send email notifications                                                                                                                                      |
| notifySms              | Body | Boolean | O        | Whether to send SMS notifications                                                                                                                                        |
| eventCodes             | Body | Array   | O        | Event code list to subscribe to                                                                                                                                          |
| sources                | Body | Array   | O        | Event source list to subscribe to                                                                                                                                        |
| sources.sourceId       | Body | UUID    | O        | Event source identifier                                                                                                                                                  |
| sources.eventCategoryType | Body | Enum | O        | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds           | Body | Array   | O        | List of user group identifiers to subscribe to the event                                                                                                                 |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

| Name                  | Type | Format | Description                   |
|-----------------------|------|--------|-------------------------------|
| eventSubscriptionId   | Body | UUID   | Event subscription identifier |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Delete Event Subscription

```http
DELETE /v3.0/event-subscriptions/{eventSubscriptionId}
```

#### Request

This API does not require a request body.

| Name                  | Type | Format | Required | Description |
|-----------------------|------|--------|----------|-------------|
| eventSubscriptionId   | URL  | UUID   | O        |             |

#### Response

This API does not return a response body.

---

### Modify Event Subscription

```http
PUT /v3.0/event-subscriptions/{eventSubscriptionId}
```

#### Request

| Name                      | Type | Format  | Required | Description                                                                                                                                                              |
|---------------------------|------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| eventSubscriptionId       | URL  | UUID    | O        |                                                                                                                                                                          |
| eventCategoryType         | Body | Enum    | X        | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName     | Body | String  | X        | Name to identify the event subscription                                                                                                                                  |
| enabled                   | Body | Boolean | X        | Whether enabled                                                                                                                                                          |
| notifyEmail               | Body | Boolean | X        | Whether to send email notifications                                                                                                                                      |
| notifySms                 | Body | Boolean | X        | Whether to send SMS notifications                                                                                                                                        |
| eventCodes                | Body | Array   | X        | Event code list to subscribe to                                                                                                                                          |
| sources                   | Body | Array   | X        | Event source list to subscribe to                                                                                                                                        |
| sources.sourceId          | Body | UUID    | O        | Event source identifier                                                                                                                                                  |
| sources.eventCategoryType | Body | Enum    | O        | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds              | Body | Array   | X        | List of user group identifiers to subscribe to the event                                                                                                                 |

<details><summary>Example</summary>
<p>

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

</p>
</details>

#### Response

This API does not return a response body.

---
