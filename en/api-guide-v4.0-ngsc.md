## Database > RDS for MySQL > API Guide

## RDS for MySQL API Common Information

### API Endpoint

| Region | Endpoint |
|--------|----------|
| Korea (Daegu) region | https://kr4-rds-mysql-api.ngsc.go.kr |

### Authentication and Authorization

RDS for MySQL uses User Access Key tokens for authentication and authorization when making API calls. The User Access Key token is a temporary, Bearer-type access token issued from a User Access Key. For more information on issuing and using User Access Key tokens, please refer to the [User Access Key Token](/nhncloud/en/public-api/user-access-key-token).
The issued token must be included in the request header along with the Appkey.

| Name                | Type   | Format | Required | Description                                           |
|---------------------|--------|--------|----|-------------------------------------------------------------|
| X-TC-APP-KEY        | Header | String | O  | Appkey of RDS for MySQL or integrated Appkey for project |
| X-NHN-AUTHORIZATION | Header | String | O  | Bearer type token issued with the Public API                           |

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
GET /v4.0/project/members
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Project.Get | List project members |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| members | Body | Array | Project member list |
| members.memberId | Body | UUID | Project member identifier |
| members.memberName | Body | String | Project member name |
| members.emailAddress | Body | String | Project member email address |
| members.phoneNumber | Body | String | Project member phone number |

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
GET /v4.0/project/regions
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Project.Get | List regions |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| regions | Body | Array | Region list |
| regions.regionCode | Body | Enum | Region code<br/>- KR4: `Korea (Daegu)` |
| regions.isEnabled | Body | Boolean | Whether the region is enabled |

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
GET /v4.0/db-flavors
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbFlavor.List | List DB Instance Specifications |

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
GET /v4.0/network/subnets
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Network.List | List Subnets |

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
GET /v4.0/db-versions
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbVersion.List | List DB Engines |

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

### List Storage Types

```http
GET /v4.0/storage-types
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Storage.List | List data storage types |

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
GET /v4.0/jobs/{jobId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Job.Get | List Task Details |

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
GET /v4.0/db-instance-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstanceGroup.List | List DB Instance Groups |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbInstanceGroups | Body | Array | DB instance group list |
| dbInstanceGroups.dbInstanceGroupId | Body | UUID | DB instance group identifier |
| dbInstanceGroups.replicationType | Body | Enum | DB instance group replication type<br/>- STANDALONE: `Without high availability`<br/>- HIGH_AVAILABILITY: `With high availability` |
| dbInstanceGroups.createdYmdt | Body | DateTime | Created date and time |
| dbInstanceGroups.updatedYmdt | Body | DateTime | Modified date and time |

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
GET /v4.0/db-instance-groups/{dbInstanceGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstanceGroup.Get | List DB Instance Group Details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbInstanceGroupId | Body | UUID | DB instance group identifier |
| replicationType | Body | Enum | DB instance group replication type<br/>- STANDALONE: `Without high availability`<br/>- HIGH_AVAILABILITY: `With high availability` |
| dbInstances | Body | Array | List of DB instances belonging to the DB instance group |
| dbInstances.dbInstanceId | Body | UUID | DB instance identifier |
| dbInstances.dbInstanceType | Body | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstances.dbInstanceStatus | Body | Enum | DB instance current status<br/>- BEFORE_CREATE: `Before creation (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Insufficient storage (red)`<br/>- FAIL_TO_CREATE: `Creation failed (red)`<br/>- FAIL_TO_CONNECT: `Connection failed (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
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

| Status | Description |
|---------------------|------------------------------|
| `AVAILABLE`         | DB instance is available |
| `BEFORE_CREATE`     | Before DB instance is created |
| `STORAGE_FULL`      | Insufficient DB instance storage |
| `FAIL_TO_CREATE`    | Failed to create DB instance |
| `FAIL_TO_CONNECT`   | Failed to connect DB instance |
| `REPLICATION_STOP`  | Replication of DB instance is stopped |
| `FAILOVER`          | High availability DB instance failed over |
| `SHUTDOWN`          | DB instance is stopped |
| `DELETED`           | DB instance is deleted |

### DB Instance Progress Status

| Status | Description |
|----------------------------|--------------|
| `APPLYING_PARAMETER_GROUP` | Parameter group is being applied |
| `BACKING_UP`               | Backing up |
| `CANCELING`                | Canceling |
| `CREATING`                 | Creating |
| `CREATING_SCHEMA`          | Creating DB schema |
| `CREATING_USER`            | Creating user |
| `DELETING`                 | Deleting |
| `DELETING_SCHEMA`          | Deleting DB schema |
| `DELETING_USER`            | Deleting user |
| `EXPORTING_BACKUP`         | Exporting backup |
| `FAILING_OVER`             | Under failover |
| `MIGRATING`                | Under migration |
| `MODIFYING`                | Under modification |
| `PREPARING`                | In preparation |
| `PROMOTING`                | Promoting |
| `REBUILDING`               | Rebuilding |
| `REPAIRING`                | Recovering |
| `REPLICATING`              | Replicating |
| `RESTARTING`               | Restarting |
| `RESTARTING_FORCIBLY`      | Force restarting |
| `RESTORING`                | Restoring |
| `STARTING`                 | Starting |
| `STOPPING`                 | Stopping |
| `SYNCING_SCHEMA`           | Synchronizing DB schema |
| `SYNCING_USER`             | Synchronizing user |
| `UPDATING_USER`            | Modifying user |

### List DB Instances

```http
GET /v4.0/db-instances
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.List | List DB instances |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbInstances | Body | Array | DB instance list |
| dbInstances.dbInstanceId | Body | UUID | DB instance identifier |
| dbInstances.dbInstanceGroupId | Body | UUID | DB instance group identifier |
| dbInstances.dbInstanceName | Body | String | Name to identify DB instances |
| dbInstances.description | Body | String | Additional information on DB instances |
| dbInstances.dbVersion | Body | Enum | DB engine type |
| dbInstances.dbPort | Body | Number | DB port |
| dbInstances.dbInstanceType | Body | Enum | DB instance role type<br/>- MASTER: `Master`<br/>- FAILED_MASTER: `Failed master`<br/>- CANDIDATE_MASTER: `Candidate master`<br/>- READ_ONLY_SLAVE: `Read replica` |
| dbInstances.dbInstanceStatus | Body | Enum | DB instance current status<br/>- BEFORE_CREATE: `Before creation (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Insufficient storage (red)`<br/>- FAIL_TO_CREATE: `Creation failed (red)`<br/>- FAIL_TO_CONNECT: `Connection failed (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| dbInstances.progressStatus | Body | Enum | DB instance current progress status<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbInstances.createdYmdt | Body | DateTime | Created date and time |
| dbInstances.updatedYmdt | Body | DateTime | Modified date and time |

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
POST /v4.0/db-instances
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Create | Create DB Instance |

#### Common request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | O | Name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | O | Identifier of DB instance specifications |
| dbVersion | Body | Enum | O | DB engine type |
| dbPort | Body | Number | O | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| dbUserName | Body | String | O | DB user account name<br/>- Minimum length: `1`<br/>- Maximum length: `32` |
| dbPassword | Body | String | O | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `256` |
| parameterGroupId | Body | UUID | O | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | DB security group identifiers |
| userGroupIds | Body | Array | X | User group identifiers |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Default: `3`<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Body | Boolean | X | Whether to protect against deletion<br/>- Default: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Whether to analyze slow queries<br/>- Default: `true` |
| authenticationPlugin | Body | Enum | X | Authentication Plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- CACHING_SHA2: `caching_sha2_password authentication (MySQL only)`<br/>- SHA256: `sha256_password authentication (MySQL only)` |
| tlsOption | Body | Enum | X | TLS Option<br/>- Default: `NONE`<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |
| network | Body | Object | O | Network information objects |
| network.subnetId | Body | UUID | O | Subnet identifier |
| network.usePublicAccess | Body | Boolean | X | External access is available or not<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | O | Availability zone where DB instance will be created |
| storage | Body | Object | O | Storage information objects |
| storage.storageType | Body | Enum | O | Data storage type |
| storage.storageSize | Body | Number | O | Data storage size (GB)<br/>- Minimum value: `20` |
| storage.storageAutoscale | Body | Object | X | Data storage auto scaling objects |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | Whether to enable storage auto scaling<br/>- Default: `false` |
| backup | Body | Object | O | Backup information objects |
| backup.backupPeriod | Body | Number | O | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| backup.useBackupLock | Body | Boolean | X | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Body | Array | O | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup started time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hours`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |

#### When using high availability

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | Candidate master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

#### When using storage auto scaling

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | Auto scale out condition (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

<details><summary>Example</summary>
<p>

```json
{
    "dbInstanceName": "dbInstanceName",
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
POST /v4.0/db-instances/restore-from-obs
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.RestoreFromObs | Restore a DB instance from object storage |

#### Common request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | O | Master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | O | Identifier of DB instance specifications |
| dbPort | Body | Number | O | DB port |
| dbVersion | Body | Enum | O | DB engine type |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| storage | Body | Object | O | Storage information objects |
| storage.storageType | Body | Enum | O | Storage type |
| storage.storageSize | Body | Number | O | Data storage size (GB)<br/>- Minimum value: `20` |
| storage.storageAutoscale | Body | Object | X | Data storage auto scaling objects |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | Whether to enable storage auto scaling<br/>- Default: `false` |
| network | Body | Object | O | Network information objects |
| network.subnetId | Body | UUID | O | Subnet identifier |
| network.usePublicAccess | Body | Boolean | X | External access is available or not<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | O | Availability zone where DB instance will be created |
| backup | Body | Object | O | Backup information objects |
| backup.backupPeriod | Body | Number | O | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.ftwrlWaitTimeout | Body | Number | X | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| backup.useBackupLock | Body | Boolean | X | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Body | Array | O | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup started time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hours`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |
| restore | Body | Object | O | Restoration information object |
| restore.tenantId | Body | String | O | Tenant ID of object storage where backups are stored |
| restore.username | Body | String | O | NHN Cloud account or IAM member ID |
| restore.password | Body | String | O | API password for object storage where backups are stored |
| restore.targetContainer | Body | String | O | Container for object storage where backups are stored |
| restore.objectPath | Body | String | O | Backup path stored in container |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Whether to analyze slow queries<br/>- Default: `true` |
| parameterGroupId | Body | UUID | O | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | DB security group identifiers |
| userGroupIds | Body | Array | X | User group identifiers |
| useDeletionProtection | Body | Boolean | X | Whether to protect against deletion<br/>- Default: `false` |

#### When using high availability

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | Candidate master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

#### When using storage auto scaling

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | Auto scale out condition (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

<details><summary>Example</summary>
<p>

```json
{
    "dbInstanceName": "dbInstanceName",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbPort": 1,
    "dbVersion": "MYSQL_V8036",
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
    "useSlowQueryAnalysis": true,
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
### Delete DB Instance

```http
DELETE /v4.0/db-instances/{dbInstanceId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Delete | Delete DB Instance |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| deleteAutoBackup | Body | Boolean | X | Whether to delete automated backups<br/>- Default: `false` |

<details><summary>Example</summary>
<p>

```json
{
    "deleteAutoBackup": false
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

### List DB Instance Details

```http
GET /v4.0/db-instances/{dbInstanceId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Get | List DB Instance Details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

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
| dbInstanceStatus | Body | Enum | DB instance current status<br/>- BEFORE_CREATE: `Before create (gray)`<br/>- AVAILABLE: `Available (green)`<br/>- STORAGE_FULL: `Storage full (red)`<br/>- FAIL_TO_CREATE: `Failed to create (red)`<br/>- FAIL_TO_CONNECT: `Failed to connect (red)`<br/>- REPLICATION_STOP: `Replication stopped (red)`<br/>- REPLICATION_DELAY: `Replication delayed (yellow)`<br/>- FAILOVER: `Failover completed (red)`<br/>- SHUTDOWN: `Stopped (gray)`<br/>- DELETED: `Deleted (gray)` |
| progressStatus | Body | Enum | DB instance current task status<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbFlavorId | Body | UUID | Identifier of DB instance specifications |
| parameterGroupId | Body | UUID | Parameter group identifier applied to DB instance |
| dbSecurityGroupIds | Body | Array | DB security group identifiers applied to DB instance |
| notificationGroupIds | Body | Array | Notification group identifiers applied to DB instance |
| useDeletionProtection | Body | Boolean | Whether to protect DB instance against deletion |
| useSlowQueryAnalysis | Body | Boolean | Whether to analyze slow queries |
| supportAuthenticationPlugin | Body | Boolean | Whether to support authentication plugin |
| needToApplyParameterGroup | Body | Boolean | Need to apply the latest parameter group |
| needMigration | Body | Boolean | Need to migrate |
| supportDbVersionUpgrade | Body | Boolean | Whether to support DB version upgrade |
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
    "useSlowQueryAnalysis": false,
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
PUT /v4.0/db-instances/{dbInstanceId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | Modify DB Instance |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbInstanceName | Body | String | X | Master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| dbInstanceCandidateName | Body | String | X | Candidate name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbPort | Body | Number | X | DB port<br/>- Minimum value: `3306`<br/>- Maximum value: `43306` |
| dbFlavorId | Body | UUID | X | Identifier of DB instance specifications |
| parameterGroupId | Body | UUID | X | Parameter group identifier |
| dbVersion | Body | Enum | X | DB engine type |
| useSlowQueryAnalysis | Body | Boolean | X | Whether to analyze slow queries |
| useDummy | Body | Boolean | X | Whether to use dummies when upgrading the DB version of a single DB instance<br/>- Default: `false` |
| dbSecurityGroupIds | Body | Array | X | DB security group identifiers |
| executeBackup | Body | Boolean | X | Whether to execute backup at this time<br/>- Default: `false` |
| useOnlineFailover | Body | Boolean | X | Whether to restart using failover<br/>- Default: `false` |
| waitReplicationDelay | Body | Boolean | X | Wait for replication lag to clear<br/>- Default: `false` |
| useReadOnly | Body | Boolean | X | Switch to read-only mode<br/>- Default: `false` |

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
    "useSlowQueryAnalysis": false,
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

### View Backup Information

```http
GET /v4.0/db-instances/{dbInstanceId}/backup-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Get | View Backup Information |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| backupPeriod | Body | Number | Backup retention period (days) |
| ftwrlWaitTimeout | Body | Number | Query latency (sec) |
| backupRetryCount | Body | Number | Number of backup retries |
| replicationRegion | Body | Enum | Backup replication region<br/>- KR4: `Korea (Daegu) Region` |
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
PUT /v4.0/db-instances/{dbInstanceId}/backup-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | Modify Backup Information |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| backupPeriod | Body | Number | X | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| ftwrlWaitTimeout | Body | Number | X | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu) Region` |
| useBackupLock | Body | Boolean | X | Whether to use table lock |
| backupSchedules | Body | Array | X | Scheduled auto backup list |
| backupSchedules.backupWndBgnTime | Body | Time | O | Backup started time |
| backupSchedules.backupWndDuration | Body | Enum | O | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hours`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |

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
### View Binary Log List

```http
GET /v4.0/db-instances/{dbInstanceId}/binlogs
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:DbInstanceBinLog.List | View binary log list |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| binLogs | Body | Array | BinLog file list |
| binLogs.binLogFileName | Body | String | BinLog file name |
| binLogs.binLogFileSize | Body | Number | BinLog file size (Byte) |
| binLogs.createdYmdt | Body | DateTime | Created date and time |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Delete Binary Log

```http
POST /v4.0/db-instances/{dbInstanceId}/binlogs/purge
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:DbInstanceBinLog.Purge | Delete binary log |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| lastBinLogFileName | Body | String | O | Last BinLog file name to delete (delete all files prior to this file) |

<details><summary>Example</summary>
<p>

```json
{
    "lastBinLogFileName": "mysql-bin.000010"
}
```

</p>
</details>

#### Response

This API does not return a response body.

---

### View Certificate File List

```http
GET /v4.0/db-instances/{dbInstanceId}/certificates
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:DbInstanceCertificate.List | View certificate file list |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| certificates | Body | Array | Certificate file list |
| certificates.fileName | Body | String | Certificate file name |
| certificates.certificateType | Body | Enum | Certificate type<br/>- CA_FILE<br/>- CERT_FILE<br/>- KEY_FILE |
| certificates.fileSize | Body | Number | Certificate file size (Byte) |
| certificates.createdYmdt | Body | DateTime | Created date and time |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Export Certificate File

```http
POST /v4.0/db-instances/{dbInstanceId}/certificates/upload
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:DbInstanceCertificate.Export | Export certificate file |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| certificateTypes | Body | Array | O | Certificate type list to upload |
| tenantId | Body | String | O | Tenant ID of object storage where certificate file is stored<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | Body | String | O | NHN Cloud account or IAM account ID |
| password | Body | String | O | API password for object storage where certificate file is stored |
| targetContainer | Body | String | O | Object storage container where certificate file is stored |
| objectPath | Body | String | O | Path of the certificate file to be stored in the container |

<details><summary>Example</summary>
<p>

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

### List DB Schema

```http
GET /v4.0/db-instances/{dbInstanceId}/db-schemas
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:DbInstanceSchema.List | List DB schemas |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbSchemas | Body | Array | DB schema list |
| dbSchemas.dbSchemaId | Body | UUID | DB schema identifier |
| dbSchemas.dbSchemaName | Body | String | DB schema name |
| dbSchemas.dbSchemaStatus | Body | Enum | DB schema current status<br/>- STABLE<br/>- CREATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbSchemas.createdYmdt | Body | DateTime | Created date and time |

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
POST /v4.0/db-instances/{dbInstanceId}/db-schemas
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:DbInstanceSchema.Create | Create DB schema |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
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
DELETE /v4.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:DbInstanceSchema.Delete | Delete DB schema |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbSchemaId | URL | UUID | O | DB schema identifier |

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
GET /v4.0/db-instances/{dbInstanceId}/db-users
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstanceUser.List | List DB Users |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbUsers | Body | Array | DB users |
| dbUsers.dbUserId | Body | UUID | DB user identifier |
| dbUsers.dbUserName | Body | String | DB user account name |
| dbUsers.host | Body | String | DB user account host name |
| dbUsers.authorityType | Body | Enum | DB user permission type<br/>- CUSTOM: `Custom permission`<br/>- READ: `Read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `Full permission` |
| dbUsers.dbUserStatus | Body | Enum | DB user current status<br/>- STABLE<br/>- CREATING<br/>- UPDATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbUsers.createdYmdt | Body | DateTime | Created date and time |
| dbUsers.updatedYmdt | Body | DateTime | Modified date and time |
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

### Create DB User

```http
POST /v4.0/db-instances/{dbInstanceId}/db-users
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstanceUser.Create | Create DB User |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbUserName | Body | String | O | DB user account name<br/>- Minimum length: `1`<br/>- Maximum length: `32` |
| dbPassword | Body | String | O | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `256` |
| host | Body | String | O | DB user account host name<br/>- Maximum length: `45` |
| authorityType | Body | Enum | O | DB user permission type<br/>- CUSTOM: `Custom permission`<br/>- READ: `Read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `Full permission` |
| authenticationPlugin | Body | Enum | X | Authentication plugin<br/>- NATIVE: `mysql_native_password authentication`<br/>- CACHING_SHA2: `caching_sha2_password authentication (MySQL only)`<br/>- SHA256: `sha256_password authentication (MySQL only)` |
| tlsOption | Body | Enum | X | TLS option<br/>- Default value: `NONE`<br/>- NONE: `TLS not used`<br/>- SSL: `SSL authentication`<br/>- X509: `X509 certificate authentication` |

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
DELETE /v4.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstanceUser.Delete | Delete DB User |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbUserId | URL | UUID | O | DB user identifier |

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
PUT /v4.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstanceUser.Modify | Modify DB User |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbUserId | URL | UUID | O | DB user identifier |
| dbPassword | Body | String | X | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `256` |
| authorityType | Body | Enum | X | DB user permission type<br/>- CUSTOM: `Custom permission`<br/>- READ: `Read permission`<br/>- CRUD: `CRUD permission`<br/>- DDL: `DDL permission`<br/>- ALL: `Full permission` |
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
PUT /v4.0/db-instances/{dbInstanceId}/deletion-protection
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | Change DB Instance Deletion Protection Settings |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| useDeletionProtection | Body | Boolean | O | Whether to enable deletion protection |

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
POST /v4.0/db-instances/{dbInstanceId}/force-restart
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.ForceRestart | Force Restart DB Instance |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

This API does not return a response body.

---
### View High Availability Information

```http
GET /v4.0/db-instances/{dbInstanceId}/high-availability
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Get | View high availability information |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | Identifier of the DB instance |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| useHighAvailability | Body | Boolean | Whether high availability is enabled<br/>- Default: `false` |
| haStatus | Body | Enum | High availability status<br/>- CREATED: `Created`<br/>- STABLE: `Stable`<br/>- PAUSING: `Pausing`<br/>- DISABLE: `Disabled`<br/>- DISABLE_MASTER_IN_REPLICATION: `High availability stopped due to abnormal master replication detected`<br/>- DISABLE_MHA_PROCESS: `High availability process stopped`<br/>- DISABLE_REPLICATION_STOP: `High availability stopped due to replication stop`<br/>- DISABLE_REPLICATION_DELAY: `High availability stopped due to replication delay`<br/>- FAILOVER_STARTED: `Failover started`<br/>- FAILOVER_FAILED: `Failover failed`<br/>- FAILOVER_COMPLETED: `Failover completed`<br/>- DELETED: `Deleted`<br/>- PAUSED: `Paused`<br/>- PAUSED_DUE_TO_TASK: `Paused due to task`<br/>- MASTER_FAILURE_DETECTION: `Master failure detected` |
| pingInterval | Body | Number | Ping interval (seconds) |
| pingType | Body | String | Ping type |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---

### Modify High Availability

```http
PUT /v4.0/db-instances/{dbInstanceId}/high-availability
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:HighAvailability.Modify | Modify high availability |

#### Common Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | Identifier of the DB instance |
| useHighAvailability | Body | Boolean | O | Whether to use high availability |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |

#### When Using High Availability

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

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

### Pause High Availability

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:HighAvailability.Pause | Pause high availability |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | Identifier of the DB instance |

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

### Repair High Availability

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:HighAvailability.Repair | Repair high availability |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | Identifier of the DB instance |

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

### Restart High Availability

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:HighAvailability.Resume | Restart high availability |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | Identifier of the DB instance |

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

### Separate High Availability

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/split
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:HighAvailability.Split | Separate high availability |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | Identifier of the DB instance |

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
### List Log Files

```http
GET /v4.0/db-instances/{dbInstanceId}/log-files
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstanceLog.List | List log files |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| logFiles | Body | Array | Log file list |
| logFiles.logFileName | Body | String | Log file name |
| logFiles.logFileType | Body | Enum | Log file type<br/>- ERROR<br/>- BINLOG<br/>- GENERAL<br/>- SLOW_QUERY<br/>- AUDIT<br/>- BACKUP |
| logFiles.logFileSize | Body | Number | Log file size (Byte) |
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
POST /v4.0/db-instances/{dbInstanceId}/log-files/export
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstanceLog.Export | Export log files |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| logFileNames | Body | Array | O | Log file name list |
| tenantId | Body | String | O | Tenant ID of the object storage where log files are stored<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | Body | String | O | NHN Cloud account or IAM member ID |
| password | Body | String | O | API password for the object storage where log files are stored |
| targetContainer | Body | String | O | Object storage container where log files are stored |
| objectPath | Body | String | O | Path of the log file to be stored in the container |

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
| jobId | Body | UUID | Identifier of the requested task |

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

### View Log File Contents

```http
GET /v4.0/db-instances/{dbInstanceId}/log-files/{logFileName}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstanceLog.Get | View log file contents |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| logFileName | URL | UUID | O | Log file name |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| content | Body | String | Log file contents (maximum 65533 bytes) |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
### List DB Instance Maintenances

```http
GET /v4.0/db-instances/{dbInstanceId}/maintenances
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.List | List DB instance maintenances |

#### Request

This API does not require a request body.

| Name | In | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | Identifier of the DB instance |
| type | Query | String | X |  |
| statuses | Query | String | X |  |
| category | Query | String | X |  |

#### Response

| Name | In | Type | Description |
|-----|-----|-----|-----|
| totalCounts | Body | Number | Total number of maintenances |
| maintenances | Body | Array | List of maintenances |
| maintenances.maintenanceId | Body | UUID | Maintenance ID |
| maintenances.dbInstanceId | Body | UUID | DB instance ID |
| maintenances.category | Body | Enum | Maintenance category<br/>- USER: `User maintenance category`<br/>- PROVIDER: `Provider maintenance category`<br/>- AUTO: `Auto maintenance category` |
| maintenances.description | Body | String | Maintenance description |
| maintenances.type | Body | Enum | Maintenance type<br/>- UPDATE_DB_INSTANCE: `Modify DB instance (flavor change, port change, parameter group change)`<br/>- UPGRADE_ENGINE_VERSION: `Engine version upgrade`<br/>- APPLY_CHANGE_PARAMETER: `Apply parameter changes in parameter group`<br/>- UPGRADE_OS: `OS version upgrade`<br/>- PATCH_SECURITY: `Security patch`<br/>- MIGRATION: `Migration for hypervisor maintenance`<br/>- CLEANUP_STORAGE: `Storage cleanup` |
| maintenances.payload | Body | Object | Payload according to maintenance type |
| maintenances.required | Body | Boolean | Whether the maintenance is required |
| maintenances.deadlineYmdt | Body | DateTime | Datetime when the maintenance is forcibly applied |
| maintenances.status | Body | Enum | Maintenance status<br/>- PENDING: `Pending`<br/>- READY: `Ready`<br/>- RUNNING: `Running`<br/>- COMPLETED: `Completed`<br/>- FAILED: `Failed`<br/>- EXCLUDED: `Excluded`<br/>- DELETED: `Deleted`<br/>- UNKNOWN |
| maintenances.executionType | Body | Enum | Maintenance execution type<br/>- SCHEDULED: `Scheduled execution (automatic execution during maintenance window)`<br/>- MANUAL: `Manual execution (immediate execution)`<br/>- FORCED: `Forced execution (automatic execution after deadline exceeded)` |
| maintenances.addedYmdt | Body | DateTime | Datetime when the maintenance was scheduled |
| maintenances.executionStartedYmdt | Body | DateTime | Maintenance start datetime |
| maintenances.executionCompletedYmdt | Body | DateTime | Maintenance end datetime |

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

</p>
</details>

---

### Execute DB Instance Maintenance Now

```http
POST /v4.0/db-instances/{dbInstanceId}/maintenances/execute-now
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.Execute | Execute DB instance maintenance now |

#### Request

| Name | In | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | Identifier of the DB instance |
| configId | Body | String | O | Configuration ID |
| category | Body | Enum | O | Maintenance category<br/>- USER: `User maintenance category`<br/>- PROVIDER: `Provider maintenance category`<br/>- AUTO: `Auto maintenance category` |
| description | Body | String | X | Maintenance description |
| type | Body | Enum | O | Maintenance type<br/>- UPDATE_DB_INSTANCE: `Modify DB instance (flavor change, port change, parameter group change)`<br/>- UPGRADE_ENGINE_VERSION: `Engine version upgrade`<br/>- APPLY_CHANGE_PARAMETER: `Apply parameter changes in parameter group`<br/>- UPGRADE_OS: `OS version upgrade`<br/>- PATCH_SECURITY: `Security patch`<br/>- MIGRATION: `Migration for hypervisor maintenance`<br/>- CLEANUP_STORAGE: `Storage cleanup` |
| payload | Body | String | O | Payload according to maintenance type |

<details><summary>Example</summary>
<p>

```json
{
    "configId": "configId-example",
    "category": "USER",
    "description": "description-example",
    "type": "UPDATE_DB_INSTANCE",
    "payload": "payload-example"
}
```

</p>
</details>

#### Response

| Name | In | Type | Description |
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

### Schedule DB Instance Maintenance

```http
POST /v4.0/db-instances/{dbInstanceId}/maintenances/schedule
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.Update | Schedule DB instance maintenance |

#### Request

| Name | In | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | Identifier of the DB instance |
| configId | Body | String | O | Configuration ID |
| category | Body | Enum | O | Maintenance category<br/>- USER: `User maintenance category`<br/>- PROVIDER: `Provider maintenance category`<br/>- AUTO: `Auto maintenance category` |
| description | Body | String | X | Maintenance description |
| type | Body | Enum | O | Maintenance type<br/>- UPDATE_DB_INSTANCE: `Modify DB instance (flavor change, port change, parameter group change)`<br/>- UPGRADE_ENGINE_VERSION: `Engine version upgrade`<br/>- APPLY_CHANGE_PARAMETER: `Apply parameter changes in parameter group`<br/>- UPGRADE_OS: `OS version upgrade`<br/>- PATCH_SECURITY: `Security patch`<br/>- MIGRATION: `Migration for hypervisor maintenance`<br/>- CLEANUP_STORAGE: `Storage cleanup` |
| payload | Body | String | O | Payload according to maintenance type |

<details><summary>Example</summary>
<p>

```json
{
    "configId": "configId-example",
    "category": "USER",
    "description": "description-example",
    "type": "UPDATE_DB_INSTANCE",
    "payload": "payload-example"
}
```

</p>
</details>

#### Response

This API does not return a response body.

---

### Delete DB Instance Maintenance

```http
DELETE /v4.0/db-instances/{dbInstanceId}/maintenances/{maintenanceId}
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.Delete | Delete DB instance maintenance |

#### Request

This API does not require a request body.

| Name | In | Type | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | Identifier of the DB instance |
| maintenanceId | URL | UUID | O | Maintenance ID |

#### Response

This API does not return a response body.

---
### List Network Information

```http
GET /v4.0/db-instances/{dbInstanceId}/network-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Get | List Network Information |

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
PUT /v4.0/db-instances/{dbInstanceId}/network-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | Modify Network Information |

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
POST /v4.0/db-instances/{dbInstanceId}/promote
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Promote | Promote DB Instance |

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

### Rebuild DB Instance

```http
POST /v4.0/db-instances/{dbInstanceId}/rebuild
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Rebuild | Rebuild DB Instance |

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
POST /v4.0/db-instances/{dbInstanceId}/replicate
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Replicate | Replicate DB Instance |

#### Common Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbInstanceName | Body | String | O | Name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | X | Identifier of DB instance specifications |
| dbPort | Body | Number | X | DB port<br/>- Minimum value: 3306, Maximum value: 43306 |
| parameterGroupId | Body | UUID | X | Parameter group identifier |
| dbSecurityGroupIds | Body | Array | X | DB security group identifier list |
| userGroupIds | Body | Array | X | User group identifier list |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Body | Boolean | X | Whether deletion protection is enabled<br/>- Default: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Whether to analyze Slow query<br/>- Default: `true` |
| network | Body | Object | O | Network information object |
| network.usePublicAccess | Body | Boolean | X | External access is available or not |
| network.availabilityZone | Body | Enum | O | Availability zone where DB instance will be created |
| storage | Body | Object | X | Storage information object |
| storage.storageType | Body | Enum | X | Data storage type |
| storage.storageSize | Body | Number | X | Data storage size (GB)<br/>- Minimum value: `20` |
| storage.storageAutoscale | Body | Object | X | Data storage auto scaling object |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | Whether to enable storage auto scaling<br/>- Default: `false` |
| backup | Body | Object | X | Backup information object |
| backup.backupPeriod | Body | Number | X | Backup retention period (days)<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| backup.useBackupLock | Body | Boolean | X | Whether to use table lock |
| backup.backupSchedules | Body | Array | X | Scheduled auto backup list |
| backup.backupSchedules.backupWndBgnTime | Body | Time | X | Backup started time |
| backup.backupSchedules.backupWndDuration | Body | Enum | X | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hours`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |

#### When using storage auto scaling

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | Auto scaling condition (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

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
POST /v4.0/db-instances/{dbInstanceId}/restart
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Restart | Restart DB Instance |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| useOnlineFailover | Body | Boolean | X | Whether to restart using failover<br/>- Default: `false` |
| executeBackup | Body | Boolean | X | Whether to execute backup at this time<br/>- Default: `false` |
| waitReplicationDelay | Body | Boolean | X | Wait for replication lag to clear<br/>- Default: `false` |
| useReadOnly | Body | Boolean | X | Block write load<br/>- Default: `false` |

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
GET /v4.0/db-instances/{dbInstanceId}/restoration-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Get | View Restoration Information |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| oldestRestorableYmdt | Body | DateTime | Oldest restorable time |
| latestRestorableYmdt | Body | DateTime | Most recent restorable time |
| restorableBackups | Body | Array | List of restorable backups |
| restorableBackups.backup | Body | Object | Backup information object |
| restorableBackups.backup.backupId | Body | UUID | Backup identifier |
| restorableBackups.backup.backupName | Body | String | Backup name |
| restorableBackups.backup.backupStatus | Body | Enum | Backup status<br/>- BACKING_UP: `Backing up (spinner)`<br/>- VERIFYING: `Verifying (spinner)`<br/>- COMPLETED: `Available (green icon)`<br/>- DELETING: `Deleting (spinner)`<br/>- DELETED: `Deleted (gray icon)`<br/>- ERROR: `Error (red icon)` |
| restorableBackups.backup.dbInstanceId | Body | UUID | Original DB instance identifier |
| restorableBackups.backup.dbInstanceName | Body | String | Original DB instance name |
| restorableBackups.backup.dbVersion | Body | Enum | DB engine type |
| restorableBackups.backup.backupType | Body | Enum | Backup type<br/>- AUTO<br/>- MANUAL |
| restorableBackups.backup.backupSize | Body | Number | Backup size |
| restorableBackups.backup.useBackupLock | Body | Boolean | Whether to use table lock |
| restorableBackups.backup.failoverCount | Body | Number | Number of failovers |
| restorableBackups.backup.binLogFileName | Body | String | Binary log file name |
| restorableBackups.backup.binLogPosition | Body | Object | Binary log file location |
| restorableBackups.backup.createdYmdt | Body | DateTime | Date and time of backup creation |
| restorableBackups.backup.updatedYmdt | Body | DateTime | Date and time of backup renewal |
| restorableBackups.restorableBinLogs | Body | Array | Binary log names that can be restored using the backup |

<details><summary>Example</summary>
<p>

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
                "dbVersion": "MYSQL_V8036",
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

</p>
</details>

---

### View the Last Query to Be Restored

```http
GET /v4.0/db-instances/{dbInstanceId}/restoration-info/last-query
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Get | View the Last Query to Be Restored |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| executedYmdt | Body | DateTime | Query executed date |
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
POST /v4.0/db-instances/{dbInstanceId}/restore
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Restore | Restore DB Instance |

#### Common Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| dbInstanceName | Body | String | O | Master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB instances<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | X | Identifier of DB instance specifications. If not specified, the specifications of the source instance are applied. |
| dbPort | Body | Number | X | DB port |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| storage | Body | Object | X | Storage information object. If not specified, the storage settings of the source instance are applied. |
| storage.storageType | Body | Enum | X | Storage type. If not specified, the storage type of the source instance is applied. |
| storage.storageSize | Body | Number | X | Data storage size (GB). If not specified, the storage size of the source instance is applied.<br/>- Minimum value: `20` |
| storage.storageAutoscale | Body | Object | X | Data storage auto scaling object |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | Whether to enable storage auto scaling<br/>- Default: `false` |
| network | Body | Object | X | Network information object. If not specified, the network settings of the source instance are applied. |
| network.subnetId | Body | UUID | X | Subnet identifier. If not specified, the source instance value is used. |
| network.usePublicAccess | Body | Boolean | X | External access is available or not<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | X | Availability zone where DB instance will be created. If not specified, randomly selected. |
| backup | Body | Object | X | Backup information object. If not specified, the backup settings of the source instance are applied. |
| backup.backupPeriod | Body | Number | X | Backup retention period (days). If not specified, the backup retention period of the source instance is applied.<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.ftwrlWaitTimeout | Body | Number | X | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| backup.useBackupLock | Body | Boolean | X | Whether to use table lock<br/>- Default: `true` |
| backup.backupSchedules | Body | Array | X | Scheduled auto backup list. If not specified, the backup schedule of the source instance is applied. |
| backup.backupSchedules.backupWndBgnTime | Body | Time | X | Backup started time |
| backup.backupSchedules.backupWndDuration | Body | Enum | X | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1.5 hours`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2.5 hours`<br/>- THREE_HOURS: `3 hours` |
| restore | Body | Object | O | Restoration information object |
| restore.restoreType | Body | Enum | O | Restoration type<br/>- TIMESTAMP: `A point-in-time restoration type using the time within the restorable time`<br/>- BINLOG: `A point-in-time restoration type using a binary log location that can be restored`<br/>- BACKUP: `Snapshot restoration type using a previously created backup` |
| restore.binLog.binLogFileName | Body | String | X | Binary log name to use for restoration |
| restore.binLog.binLogPosition | Body | Object | X | Binary log location to use for restoration |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Whether to analyze slow queries<br/>- Default: `true` |
| parameterGroupId | Body | UUID | X | Parameter group identifier. If not specified, the parameter group of the source instance is applied. |
| dbSecurityGroupIds | Body | Array | X | DB security group identifier list. If not specified, the security groups of the source instance are applied. |
| userGroupIds | Body | Array | X | User group identifier list |
| useDeletionProtection | Body | Boolean | X | Whether to protect against deletion<br/>- Default: `false` |

#### When using high availability

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | Candidate master name to identify DB instances<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

#### When using storage auto scaling

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | Auto scale out conditions (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

#### Request when restoring a point in time using Timestamp (if restoreType is `TIMESTAMP`)

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| restore.restoreYmdt | Body | DateTime | X | DB instance restore date (YYYY-MM-DDThh:mm:ss.SSSTZD) |

Restoration is possible only before the most recent restorable time, which is queried through restoration information inquiry.

#### Request for point-in-time restoration using binary logs (if restoreType is `BINLOG`)

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| restore.backupId | Body | UUID | X | Identifier of the backup to use for restoration |
| restore.binLog | Body | Object | X | Binary log information object |

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
    "useSlowQueryAnalysis": true,
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
POST /v4.0/db-instances/{dbInstanceId}/start
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Start | Start DB Instance |

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

### Stop DB Instance

```http
POST /v4.0/db-instances/{dbInstanceId}/stop
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Stop | Stop DB Instance |

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

### View Storage Information

```http
GET /v4.0/db-instances/{dbInstanceId}/storage-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Get | View Storage Information |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| storageType | Body | String | Data storage type |
| storageSize | Body | Number | Data storage size (GB) |
| storageStatus | Body | Enum | Current status of data storage<br/>- DELETED: `Deleted`<br/>- PENDING_DELETION: `Pending deletion`<br/>- DELETION_RESERVED: `Deletion reserved (awaiting snapshot cleanup)`<br/>- DETACHED: `Detached`<br/>- ATTACHED: `Attached` |
| storageAutoscale | Body | Object | Data storage auto scaling object |
| storageAutoscale.useStorageAutoscale | Body | Boolean | Whether to enable storage auto scaling |
| storageAutoscale.threshold | Body | Number | Auto scale out conditions (%) |
| storageAutoscale.maxStorageSize | Body | Number | Auto scaling maximum size (GB) |
| storageAutoscale.cooldownTime | Body | Number | Auto scaling cooldown time (minutes) |

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
    "storageStatus": "DELETED",
    "storageAutoscale": {
        "useStorageAutoscale": false,
        "threshold": 1,
        "maxStorageSize": 1,
        "cooldownTime": 1
    }
}
```

</p>
</details>

---

### Modify Storage Information

```http
PUT /v4.0/db-instances/{dbInstanceId}/storage-info
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | Modify Storage Information |

#### Common Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB instance identifier |
| storageSize | Body | Number | O | Data storage size (GB)<br/>- Maximum value: `2048` |
| storageAutoscale | Body | Object | X | Data storage auto scaling object |
| storageAutoscale.useStorageAutoscale | Body | Boolean | X | Whether to enable storage auto scaling |

#### When using storage auto scaling

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| storageAutoscale.threshold | Body | Number | O | Auto scale out conditions (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storageAutoscale.maxStorageSize | Body | Number | O | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storageAutoscale.cooldownTime | Body | Number | O | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

<details><summary>Example</summary>
<p>

```json
{
    "storageSize": 1,
    "storageAutoscale": {
        "useStorageAutoscale": false
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
GET /v4.0/backups
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Backup.List | Retrieve backup list |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| totalCounts | Body | Number | Total number of backup list entries |
| backups | Body | Array | Backup list |
| backups.backupId | Body | UUID | Backup identifier |
| backups.backupName | Body | String | Name to identify the backup |
| backups.backupStatus | Body | Enum | Current backup status<br/>- BACKING_UP: `Backup in progress (spinner)`<br/>- VERIFYING: `Verifying (spinner)`<br/>- COMPLETED: `Available (green icon)`<br/>- DELETING: `Deleting (spinner)`<br/>- DELETED: `Deleted (gray icon)`<br/>- ERROR: `Error (red icon)` |
| backups.dbInstanceId | Body | UUID | Source DB instance identifier |
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

### Create Backup

```http
POST /v4.0/backups
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Backup.Create | Create backup |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| backupName | Body | String | O | Name to identify the backup<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| baseBackupId | Body | UUID | X | Source backup identifier |
| dbInstanceId | Body | UUID | X | DB instance identifier |
| backupMethodType | Body | Enum | O | Backup method type<br/>- FULL: `Full backup`<br/>- INCREMENTAL: `Incremental backup`<br/>- SNAPSHOT: `Snapshot backup` |

<details><summary>Example</summary>
<p>

```json
{
    "backupName": "backupName",
    "baseBackupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
    "backupMethodType": "FULL"
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

### Delete Backup

```http
DELETE /v4.0/backups/{backupId}
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Backup.Delete | Delete backup |

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

### View Backup Details

```http
GET /v4.0/backups/{backupId}
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Backup.Get | View backup details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| backup | Body | Object | Backup details |
| backup.backupId | Body | UUID | Backup identifier |
| backup.regionCode | Body | Enum | Region code<br/>- KR4: `Korea (Daegu)` |
| backup.backupName | Body | String | Name to identify the backup |
| backup.backupStatus | Body | Enum | Current backup status<br/>- BACKING_UP: `Backup in progress (spinner)`<br/>- VERIFYING: `Verifying (spinner)`<br/>- COMPLETED: `Available (green icon)`<br/>- DELETING: `Deleting (spinner)`<br/>- DELETED: `Deleted (gray icon)`<br/>- ERROR: `Error (red icon)` |
| backup.dbInstanceId | Body | UUID | Source DB instance identifier |
| backup.dbInstanceName | Body | String | Source DB instance name |
| backup.dbVersion | Body | Enum | DB engine version |
| backup.utilVersion | Body | String | Utility version |
| backup.backupType | Body | Enum | Backup type (AUTO, MANUAL)<br/>- AUTO<br/>- MANUAL |
| backup.backupMethodType | Body | Enum | Backup method (FULL, SNAPSHOT, INCREMENTAL)<br/>- FULL<br/>- INCREMENTAL<br/>- SNAPSHOT |
| backup.backupFileType | Body | Enum | Backup file type<br/>- XBSTREAM<br/>- TAR_ZSTD<br/>- TAR_LZ4<br/>- TAR_GZIP<br/>- SNAPSHOT |
| backup.backupSize | Body | Number | Backup size (Byte) |
| backup.isReplicable | Body | Boolean | Whether replication is possible |
| backup.binLogFileName | Body | String | Binary log file name |
| backup.binLogPosition | Body | Object | Binary log location |
| backup.createdYmdt | Body | DateTime | Created date and time |
| backup.updatedYmdt | Body | DateTime | Modified date and time |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "backup": {
        "backupId": "550e8400-e29b-41d4-a716-446655440000",
        "regionCode": "KR4",
        "backupName": "backupName-example",
        "backupStatus": "BACKING_UP",
        "dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
        "dbInstanceName": "dbInstanceName-example",
        "dbVersion": "MYSQL_V8036",
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

</p>
</details>

---

### Export Backup

```http
POST /v4.0/backups/{backupId}/export
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Backup.Export | Export backup |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |
| tenantId | Body | String | O | Tenant ID of the object storage where the backup will be stored<br/>- Minimum length: `32`<br/>- Maximum length: `32` |
| username | Body | String | O | NHN Cloud account or IAM member ID |
| password | Body | String | O | API password of the object storage where the backup will be stored |
| targetContainer | Body | String | O | Object storage container where the backup will be stored |
| objectPath | Body | String | O | Path of the backup to be stored in the container |

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
POST /v4.0/backups/{backupId}/restore
```

#### Required Permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Backup.Restore | Restore backup |

#### Common Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |
| dbInstanceName | Body | String | O | Master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on the DB instance<br/>- Maximum length: `100` |
| dbFlavorId | Body | UUID | X | DB instance specification identifier. If not specified, the source instance value is used |
| dbPort | Body | Number | X | DB port. If not specified, the source instance value is used<br/>- Minimum value: 3306, Maximum value: 43306 |
| parameterGroupId | Body | UUID | X | Parameter group identifier. If not specified, the source instance value is used |
| dbSecurityGroupIds | Body | Array | X | List of DB security group identifiers |
| userGroupIds | Body | Array | X | List of user group identifiers |
| useHighAvailability | Body | Boolean | X | Whether to use high availability<br/>- Default: `false` |
| pingInterval | Body | Number | X | Ping interval (sec) when using high availability<br/>- Default: `3`<br/>- Minimum value: `1`<br/>- Maximum value: `600` |
| useDefaultNotification | Body | Boolean | X | Whether to use default notification<br/>- Default: `false` |
| useDeletionProtection | Body | Boolean | X | Whether to enable deletion protection<br/>- Default: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Whether to analyze slow queries<br/>- Default: `true` |
| network | Body | Object | X | Network information object. If not specified, the source instance value is used |
| network.subnetId | Body | UUID | X | Subnet identifier. If not specified, the source instance value is used |
| network.usePublicAccess | Body | Boolean | X | Whether external access is available<br/>- Default: `false` |
| network.availabilityZone | Body | Enum | X | Availability zone where the DB instance will be created. If not specified, a random zone is selected |
| storage | Body | Object | X | Storage information object. If not specified, the source instance value is used |
| storage.storageType | Body | Enum | X | Storage type. If not specified, the source instance value is used |
| storage.storageSize | Body | Number | X | Data storage size (GB). If not specified, the source instance value is used<br/>- Minimum value: `20` |
| storage.storageAutoscale | Body | Object | X | Data storage auto scaling object. If not specified, the source instance value is used |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | Whether to enable storage auto scaling<br/>- Default: `false` |
| backup | Body | Object | X | Backup information object. If not specified, the source instance backup settings are used |
| backup.backupPeriod | Body | Number | X | Backup retention period (days). If not specified, the source instance value is used<br/>- Minimum value: `0`<br/>- Maximum value: `730` |
| backup.backupRetryCount | Body | Number | X | Number of backup retries. If not specified, the source instance value is used<br/>- Minimum value: `0`<br/>- Maximum value: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | Query latency wait time (sec). If not specified, the source instance value is used<br/>- Minimum value: `0`<br/>- Maximum value: `21600` |
| backup.replicationRegion | Body | Enum | X | Backup replication region<br/>- KR4: `Korea (Daegu)` |
| backup.useBackupLock | Body | Boolean | X | Whether to use table lock. If not specified, the source instance value is used |
| backup.backupSchedules | Body | Array | X | Backup schedule list. If not specified, the source instance value is used |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | Backup start time |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | Backup duration<br/>- HALF_AN_HOUR: `30 minutes`<br/>- ONE_HOUR: `1 hour`<br/>- ONE_HOUR_AND_HALF: `1 hour 30 minutes`<br/>- TWO_HOURS: `2 hours`<br/>- TWO_HOURS_AND_HALF: `2 hours 30 minutes`<br/>- THREE_HOURS: `3 hours` |

#### When Using High Availability

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | Candidate master name to identify the DB instance<br/>- Minimum length: `1`<br/>- Maximum length: `100` |

#### When Using Storage Auto Scaling

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | Auto scaling threshold (%)<br/>- Minimum value: `50`<br/>- Maximum value: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | Auto scaling maximum size (GB)<br/>- Maximum value: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | Auto scaling cooldown time (minutes)<br/>- Minimum value: `10`<br/>- Maximum value: `1440` |

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
## DB Security Group

### DB Security Group Progress

| Status              | Description             |
|---------------------|-------------------------|
| `NONE`              | No task in progress     |
| `CREATING_RULE`     | Creating rules          |
| `UPDATING_RULE`     | Modifying rules         |
| `DELETING_RULE`     | Deleting rules          |

### List DB Security Groups

```http
GET /v4.0/db-security-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.List | List DB security groups |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| totalCounts | Body | Number | Total number of DB security groups |
| dbSecurityGroups | Body | Array | DB security groups |
| dbSecurityGroups.dbSecurityGroupId | Body | UUID | DB security group identifier |
| dbSecurityGroups.dbSecurityGroupName | Body | String | Name to identify the DB security group |
| dbSecurityGroups.description | Body | String | Additional information on DB security group |
| dbSecurityGroups.progressStatus | Body | Enum | Current status of DB security group<br/>- NONE: `None`<br/>- CREATING_RULE: `Creating rules`<br/>- UPDATING_RULE: `Modifying rules`<br/>- DELETING_RULE: `Deleting rules`<br/>- APPLYING_DEFAULT_RULE: `Applying default rules` |
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

</p>
</details>

---

### Create DB Security Group

```http
POST /v4.0/db-security-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Create | Create DB security group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupName | Body | String | O | Name to identify the DB security group<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB security group<br/>- Maximum length: `100` |
| rules | Body | Array | O | DB security group rules |
| rules.direction | Body | Enum | O | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| rules.etherType | Body | Enum | O | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6` |
| rules.port | Body | Object | O | Port object |
| rules.port.portType | Body | Enum | O | Port type<br/>- ALL: `All port range (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receiving port`<br/>- PORT_RANGE: `Port range` |
| rules.port.minPort | Body | Number | X | Minimum port range<br/>- Minimum value: `3306` |
| rules.port.maxPort | Body | Number | X | Maximum port range<br/>- Maximum value: `65535` |
| rules.cidr | Body | String | O | CIDR |
| rules.description | Body | String | X | Additional information on DB security group rule |

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
DELETE /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Delete | Delete DB security group |

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
GET /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Get | List DB security group details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| dbSecurityGroupId | Body | UUID | DB security group identifier |
| dbSecurityGroupName | Body | String | Name to identify the DB security group |
| description | Body | String | Additional information on DB security group |
| progressStatus | Body | Enum | Current status of DB security group<br/>- NONE: `None`<br/>- CREATING_RULE: `Creating rules`<br/>- UPDATING_RULE: `Modifying rules`<br/>- DELETING_RULE: `Deleting rules`<br/>- APPLYING_DEFAULT_RULE: `Applying default rules` |
| rules | Body | Array | DB security group rules |
| rules.ruleId | Body | UUID | DB security group rule identifier |
| rules.description | Body | String | Additional information on DB security group rule |
| rules.direction | Body | Enum | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| rules.etherType | Body | Enum | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6` |
| rules.port | Body | Object | Port object |
| rules.port.portType | Body | Enum | Port type<br/>- ALL: `All port range (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receiving port`<br/>- PORT_RANGE: `Port range` |
| rules.port.minPort | Body | Number | Minimum port range |
| rules.port.maxPort | Body | Number | Maximum port range |
| rules.cidr | Body | String | CIDR |
| rules.createdYmdt | Body | DateTime | Created date and time |
| rules.updatedYmdt | Body | DateTime | Modified date and time |
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

</p>
</details>

---

### Modify DB Security Group

```http
PUT /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Modify | Modify DB security group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| dbSecurityGroupName | Body | String | X | Name to identify the DB security group<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| description | Body | String | X | Additional information on DB security group<br/>- Maximum length: `100` |

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
DELETE /v4.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbSecurityGroupRule.Delete | Delete DB security group rule |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| ruleIds | Query | String | O |  |

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

### Create DB Security Group Rule

```http
POST /v4.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbSecurityGroupRule.Create | Create DB security group rule |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| direction | Body | Enum | O | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| etherType | Body | Enum | O | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6` |
| port | Body | Object | O | Port object |
| port.portType | Body | Enum | O | Port type<br/>- ALL: `All port range (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receiving port`<br/>- PORT_RANGE: `Port range` |
| port.minPort | Body | Number | X | Minimum port range<br/>- Minimum value: `3306` |
| port.maxPort | Body | Number | X | Maximum port range<br/>- Maximum value: `65535` |
| cidr | Body | String | O | CIDR |
| description | Body | String | X | Additional information on DB security group rule<br/>- Maximum length: `200` |

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

### Modify DB Security Group Rule

```http
PUT /v4.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:DbSecurityGroupRule.Modify | Modify DB security group rule |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| ruleId | URL | UUID | O |  |
| direction | Body | Enum | O | Communication direction<br/>- INGRESS: `Inbound`<br/>- EGRESS: `Outbound` |
| etherType | Body | Enum | O | Ether type<br/>- IPV4: `IPv4`<br/>- IPV6: `IPv6` |
| port | Body | Object | O | Port object |
| port.portType | Body | Enum | O | Port type<br/>- ALL: `All port range (not used in the user console)`<br/>- PORT: `Specific port`<br/>- DB_PORT: `DB receiving port`<br/>- PORT_RANGE: `Port range` |
| port.minPort | Body | Number | X | Minimum port range<br/>- Minimum value: `3306` |
| port.maxPort | Body | Number | X | Maximum port range<br/>- Maximum value: `65535` |
| cidr | Body | String | O | CIDR |
| description | Body | String | X | Additional information on DB security group rule<br/>- Maximum length: `200` |

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
## Parameter Groups

### List Parameter Groups

```http
GET /v4.0/parameter-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:ParameterGroup.List | List parameter groups |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| totalCounts | Body | Number | Total number of parameter groups |
| parameterGroups | Body | Array | Parameter groups |
| parameterGroups.parameterGroupId | Body | UUID | Parameter group identifier |
| parameterGroups.parameterGroupName | Body | String | Name to identify parameter groups |
| parameterGroups.description | Body | String | Additional information on parameter group |
| parameterGroups.dbVersion | Body | Enum | DB engine type |
| parameterGroups.parameterGroupType | Body | Enum | Parameter group type<br/>- USER<br/>- ADMIN<br/>- DEFAULT<br/>- CLUSTER_USER |
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
    "totalCounts": 1,
    "parameterGroups": [
        {
            "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "parameterGroupName": "parameterGroupName-example",
            "description": "description-example",
            "dbVersion": "MYSQL_V8036",
            "parameterGroupType": "USER",
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
POST /v4.0/parameter-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:ParameterGroup.Create | Create parameter group |

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
DELETE /v4.0/parameter-groups/{parameterGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:ParameterGroup.Delete | Delete parameter group |

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
GET /v4.0/parameter-groups/{parameterGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:ParameterGroup.Get | List parameter group details |

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
PUT /v4.0/parameter-groups/{parameterGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:ParameterGroup.Modify | Modify parameter group |

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
POST /v4.0/parameter-groups/{parameterGroupId}/copy
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:ParameterGroup.Copy | Copy parameter group |

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
PUT /v4.0/parameter-groups/{parameterGroupId}/parameters
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:ParameterGroup.Modify | Modify parameter group |

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
PUT /v4.0/parameter-groups/{parameterGroupId}/reset
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:ParameterGroup.Reset | Reset parameter group |

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
GET /v4.0/user-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:UserGroup.List | List user groups |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| totalCounts | Body | Number | Total number of user groups |
| userGroups | Body | Array | User group list |
| userGroups.userGroupId | Body | UUID | User group identifier |
| userGroups.userGroupName | Body | String | Name to identify user groups |
| userGroups.createdYmdt | Body | DateTime | Created date and time |
| userGroups.updatedYmdt | Body | DateTime | Modified date and time |

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
POST /v4.0/user-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:UserGroup.Create | Create user group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupName | Body | String | O | Name to identify user groups |
| memberIds | Body | Array | O | List of project member identifiers |
| selectAll | Body | Boolean | X | Whether to include all project members<br/>- Default: `false` |

<details><summary>Example</summary>
<p>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAll": false
}
```

</p>
</details>

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| userGroupId | Body | UUID | User group identifier |

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
DELETE /v4.0/user-groups/{userGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:UserGroup.Delete | Delete user group |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O |  |

#### Response

This API does not return a response body.

---

### List User Group Details

```http
GET /v4.0/user-groups/{userGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:UserGroup.Get | List user group details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| userGroupId | Body | UUID | User group identifier |
| userGroupName | Body | String | Name to identify user groups |
| userGroupTypeCode | Body | Enum | User group type<br/>- ENTIRE<br/>- INDIVIDUAL_MEMBER |
| members | Body | Array | Project member list |
| members.memberId | Body | UUID | Project member identifier |
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
PUT /v4.0/user-groups/{userGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:UserGroup.Modify | Modify user group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O |  |
| userGroupName | Body | String | O | Name to identify user groups |
| memberIds | Body | Array | X | List of project member identifiers |
| selectAll | Body | Boolean | X | Whether to include all project members<br/>- Default: `false` |

<details><summary>Example</summary>
<p>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAll": false
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
GET /v4.0/notification-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:NotificationGroup.List | List notification groups |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| notificationGroups | Body | Array | Notification group list |
| notificationGroups.notificationGroupId | Body | UUID | Notification group identifier |
| notificationGroups.notificationGroupName | Body | String | Name to identify notification groups |
| notificationGroups.notifyEmail | Body | Boolean | Whether to be notified by email |
| notificationGroups.notifySms | Body | Boolean | Whether to be notified by SMS |
| notificationGroups.isEnabled | Body | Boolean | Whether enabled |
| notificationGroups.createdYmdt | Body | DateTime | Created date and time |
| notificationGroups.updatedYmdt | Body | DateTime | Modified date and time |

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
POST /v4.0/notification-groups
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:NotificationGroup.Create | Create notification group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupName | Body | String | O | Name to identify notification groups<br/>- Minimum length: `1`<br/>- Maximum length: `100` |
| notifyEmail | Body | Boolean | X | Whether to be notified by email<br/>- Default: `true` |
| notifySms | Body | Boolean | X | Whether to be notified by SMS<br/>- Default: `true` |
| isEnabled | Body | Boolean | X | Whether enabled<br/>- Default: `true` |
| dbInstanceIds | Body | Array | O | List of DB instance identifiers to monitor |
| userGroupIds | Body | Array | O | List of user group identifiers |

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

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| notificationGroupId | Body | UUID | Notification group identifier |

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
DELETE /v4.0/notification-groups/{notificationGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:NotificationGroup.Delete | Delete notification group |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O |  |

#### Response

This API does not return a response body.

---

### View Notification Group Details

```http
GET /v4.0/notification-groups/{notificationGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:NotificationGroup.Get | View notification group details |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O |  |

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| notificationGroupId | Body | UUID | Notification group identifier |
| notificationGroupName | Body | String | Name to identify notification groups |
| notifyEmail | Body | Boolean | Whether to be notified by email |
| notifySms | Body | Boolean | Whether to be notified by SMS |
| isEnabled | Body | Boolean | Whether enabled |
| dbInstances | Body | Array | List of DB instances to monitor |
| dbInstances.dbInstanceId | Body | UUID | DB instance identifier |
| dbInstances.dbInstanceName | Body | String | Name to identify DB instances |
| userGroups | Body | Array | User group list |
| userGroups.userGroupId | Body | UUID | User group identifier |
| userGroups.userGroupName | Body | String | Name to identify user groups |
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
PUT /v4.0/notification-groups/{notificationGroupId}
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:NotificationGroup.Modify | Modify notification group |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O |  |
| notificationGroupName | Body | String | X | Name to identify notification groups |
| notifyEmail | Body | Boolean | X | Whether to be notified by email<br/>- Default: `false` |
| notifySms | Body | Boolean | X | Whether to be notified by SMS<br/>- Default: `false` |
| isEnabled | Body | Boolean | X | Whether enabled<br/>- Default: `false` |
| dbInstanceIds | Body | Array | X | List of DB instance identifiers to monitor |
| userGroupIds | Body | Array | X | List of user group identifiers |

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

### View Stats

```http
GET /v4.0/metric-statistics
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Metric.List | View stats |

#### Request

This API does not require a request body.

#### Response

This API does not return a response body.

---

### List Metric List

```http
GET /v4.0/metrics
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Metric.List | List metric list |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| metrics | Body | Array | Metric list |
| metrics.measureName | Body | String | Metric type to query |
| metrics.unit | Body | String | Measure unit |

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

| Event category    | Description      |
|-------------|---------|
| ALL         | All      |
| BACKUP      | Backup      |
| DB_INSTANCE | DB instance |
| JOB         | Job      |
| TENANT      | Tenant     |
| MONITORING  | Monitoring    |

### List Subscribable Event Codes

```http
GET /v4.0/event-codes
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Event.List | List subscribable event codes |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| eventCodes | Body | Array | Event code list |
| eventCodes.eventCode | Body | Enum | Event code |
| eventCodes.eventCategoryType | Body | Enum | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |

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
GET /v4.0/events
```

#### Required permissions

| Permission Name | Description |
|-----|-----|
| RDSforMySQL:Event.List | List events |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| totalCounts | Body | Number | Total number of events |
| events | Body | Array | Event list |
| events.eventCategoryType | Body | Enum | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| events.eventCode | Body | Enum | Occurred event type |
| events.sourceId | Body | UUID | Event source identifier |
| events.sourceName | Body | String | Name to identify event sources |
| events.messages | Body | Array | Event messages |
| events.messages.langCode | Body | Enum | Language code<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | Body | String | Event message |
| events.eventYmdt | Body | DateTime | Event occurred date and time |

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
GET /v4.0/event-subscriptions
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:EventSubscription.List | List event subscriptions |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| totalCounts | Body | Number | Total number of event subscriptions |
| eventSubscriptions | Body | Array | List of event subscriptions |
| eventSubscriptions.eventSubscriptionId | Body | UUID | Event subscription identifier |
| eventSubscriptions.eventCategoryType | Body | Enum | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.eventSubscriptionName | Body | String | A name that identifies the event subscription |
| eventSubscriptions.enabled | Body | Boolean | Whether to activate |
| eventSubscriptions.notifyEmail | Body | Boolean | Whether to send emails |
| eventSubscriptions.notifySms | Body | Boolean | Whether to send SMS messages |
| eventSubscriptions.eventCodes | Body | Array | List of event codes to subscribe to |
| eventSubscriptions.sources | Body | Array | List of event sources to subscribe to |
| eventSubscriptions.sources.sourceId | Body | UUID | Identifier of the event source |
| eventSubscriptions.sources.eventCategoryType | Body | Enum | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.userGroupIds | Body | Array | List of identifiers of user groups subscribing to the event |
| eventSubscriptions.createdYmdt | Body | DateTime | Created at |

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

### Create an Event Subscription

```http
POST /v4.0/event-subscriptions
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:EventSubscription.Create | Create an event subscription |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| eventCategoryType | Body | Enum | O | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | Body | String | O | A name that identifies the event subscription |
| enabled | Body | Boolean | O | Whether to activate |
| notifyEmail | Body | Boolean | O | Whether to send emails |
| notifySms | Body | Boolean | O | Whether to send SMS messages |
| eventCodes | Body | Array | O | List of event codes to subscribe to |
| sources | Body | Array | O | List of event sources to subscribe to |
| sources.sourceId | Body | UUID | O | Identifier of the event source |
| sources.eventCategoryType | Body | Enum | O | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Body | Array | O | List of identifiers of user groups to subscribe to |

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

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| eventSubscriptionId | Body | UUID | Event subscription identifier |

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

### Delete an Event Subscription

```http
DELETE /v4.0/event-subscriptions/{eventSubscriptionId}
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:EventSubscription.Delete | Delete an event subscription |

#### Request

This API does not require a request body.

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | O |  |

#### Response

This API does not return a response body.

---

### Modify an Event Subscription

```http
PUT /v4.0/event-subscriptions/{eventSubscriptionId}
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:EventSubscription.Modify | Modify an event subscription |

#### Request

| Name | Type | Format | Required | Description |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | O |  |
| eventCategoryType | Body | Enum | X | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | Body | String | X | A name that identifies the event subscription |
| enabled | Body | Boolean | X | Whether to activate |
| notifyEmail | Body | Boolean | X | Whether to send emails |
| notifySms | Body | Boolean | X | Whether to send SMS messages |
| eventCodes | Body | Array | X | List of event codes to subscribe to |
| sources | Body | Array | X | List of event sources to subscribe to |
| sources.sourceId | Body | UUID | O | Identifier of the event source |
| sources.eventCategoryType | Body | Enum | O | Event category type<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Body | Array | X | List of identifiers of user groups to subscribe to |

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

## Availability Zone

### List Availability Zones

```http
GET /v4.0/availability-zones
```

#### Required Permission

| Permission | Description |
|-----|-----|
| RDSforMySQL:AvailabilityZone.List | List availability zones |

#### Request

This API does not require a request body.

#### Response

| Name | Type | Format | Description |
|-----|-----|-----|-----|
| availabilityZones | Body | Array | List of availability zones |
| availabilityZones.availabilityZoneName | Body | String | Availability zone name |
| availabilityZones.zoneState | Body | Object | Availability zone status |
| availabilityZones.zoneState.available | Body | Boolean | Whether the availability zone is available |

<details><summary>Example</summary>
<p>

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

</p>
</details>

---
