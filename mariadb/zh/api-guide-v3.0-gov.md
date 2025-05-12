## Database > RDS for MariaDB > API Guide

| Region | Endpoint |
|--------|----------|
| Korea (Pangyo) region | https://kr1-rds-mariadb.api.gov-nhncloudservice.com |

## Authentication and Authorization

`User Access Key ID` and `Secret Access Key` are required for authentication to use APIs. To create them, select <b>API Security Setting</b> from the drop-down menu that appears when you hover over your account in the top right on the console.
The created Key must be included in the request Header.

| Name                       | Type   | Format | Required | Description                                                              |
|----------------------------|--------|--------|----------|--------------------------------------------------------------------------|
| X-TC-APP-KEY               | Header | String | O        | Appkey of RDS for MariaDB or integrated Appkey for project |
| X-TC-AUTHENTICATION-ID     | Header | String | O        | User Access Key ID in API Security Settings menu                         |
| X-TC-AUTHENTICATION-SECRET | Header | String | O        | Secret Access Key in API Security Settings menu                          |

In addition, the APIs you can call are limited based on the project member role. You can grant permissions separately for `RDS for MariaDB ADMIN` and `RDS for MariaDB VIEWER`.

* `RDS for MariaDB ADMIN permission holders` can use all available features as before.
* `RDS for MariaDB MEMBER permission holders` can use read-only feature.
    * Cannot use any features aimed at DB instances or create, modify, or delete any DB instance.
    * But, notification group and user group-related features are available.

If an API request fails to authenticate or is not authorized, the following error occurs.

| resultCode | resultMessage | Description            |
|------------|---------------|------------------------|
| 80401      | Unauthorized  | Failed to authenticate |
| 80403      | Forbidden     | Unauthorized.          |

## Common Response Information

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


## DB engine type

| DB engine type | Available for creation | Available for restoration from OBS |
|-----------------|----------|------------------|
| MARIADB_V10330  | O        | O                |
| MARIADB_V10611  | O        | O                |
| MARIADB_V10612  | O        | O                |
| MARIADB_V10616  | O        | O                |
| MARIADB_V101107 | O        | O                |
| MARIADB_V101108 | O        | O                |

* You can use the value for the dbVersion field of ENUM type.
* Depending on the version, creation or restoration may not be possible.

## Project Information

### List Regions

```http
GET /v3.0/project/regions
```

#### Request

This API does not require a request body.

#### Response

| Name    | Type | Format | Description |
|---------|------|--------|-------------|
| regions | Body | Array  | Region list |
| regions.regionCode | Body | Enum    | Region code<br/>`KR1`: Korea (Pangyo) |
| regions.isEnabled  | Body | Boolean | Whether to enable a region                                                                 |

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
            "regionCode": "KR1",
            "isEnabled": true
        }
    ]
}
```

</details>

---

### List Project Members

```http
GET /v3.0/project/members
```

#### Request

This API does not require a request body.

#### Response

| Name                 | Type | Format | Description                  |
|----------------------|------|--------|------------------------------|
| members              | Body | Array  | Project member list          |
| members.memberId     | Body | UUID   | Project member identifier    |
| members.memberName   | Body | String | Project member name          |
| members.emailAddress | Body | String | Project member email address |
| members.phoneNumber  | Body | String | Project member mobile        |

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
            "memberId": "1b1d3627-507a-49ea-8cb7-c86dfa9caa58",
            "memberName": "Hong Gildong",
            "emailAddress": "gildong.hong@nhn.com",
            "phoneNumber": "+821012345678"
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

| Name                   | Type | Format | Description                              |
|------------------------|------|--------|------------------------------------------|
| dbFlavors              | Body | Array  | List of DB instance specifications       |
| dbFlavors.dbFlavorId   | Body | UUID   | Identifier of DB instance specifications |
| dbFlavors.dbFlavorName | Body | String | Name of DB instance specifications       |
| dbFlavors.ram          | Body | Number | Memory size (MB)                         |
| dbFlavors.vcpus        | Body | Number | CPU cores                                |

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
            "dbFlavorId": "50be6d9c-02d6-4594-a2d4-12010eb65ec0",
            "dbFlavorName": "m2.c1m2",
            "ram": 2048,
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

| Name                     | Type | Format  | Description              |
|--------------------------|------|---------|--------------------------|
| subnets                  | Body | Array   | Subnet list              |
| subnets.subnetId         | Body | UUID    | Subnet identifier        |
| subnets.subnetName       | Body | String  | Name to identify subnets |
| subnets.subnetCidr       | Body | String  | CIDR of subnet           |
| subnets.usingGateway     | Body | Boolean | Whether to use gateway   |
| subnets.availableIpCount | Body | Number  | Number of available IPs  |

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
            "subnetId": "1b2a9b23-0725-4b92-8c78-35db66b8ad9f",
            "subnetName": "Default Network",
            "subnetCidr": "192.168.0.0/24",
            "usingGateway": true,
            "availableIpCount": 240
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

| Name                         | Type | Format  | Description                                           |
|------------------------------|------|---------|-------------------------------------------------------|
| dbVersions                   | Body | Array   | DB engine list                                        |
| dbVersions.dbVersion         | Body | String  | DB engine type                                        |
| dbVersions.dbVersionName     | Body | String  | DB engine name                                        |
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
            "dbVersion": "MARIADB_V10330",
            "dbVersionName": "Maria DB 10.3.30",
            "restorableFromObs": true
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

| Name         | Type | Format | Description       |
|--------------|------|--------|-------------------|
| storageTypes | Body | Array  | Storage type list |

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

| Name     | Type | Format | Description  |
|----------|------|--------|--------------|
| storages | Body | Array  | Storage list |

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

| Name  | Type | Format | Required | Description     |
|-------|------|--------|----------|-----------------|
| jobId | URL  | UUID   | O        | Task identifier |

#### Response

| Name                           | Type | Format   | Description                                         |
|--------------------------------|------|----------|-----------------------------------------------------|
| jobId                          | Body | UUID     | Task identifier                                     |
| jobStatus                      | Body | Enum     | Current task status                                 |
| resourceRelations              | Body | Array    | Relevant resource list                              |
| resourceRelations.resourceType | Body | Enum     | Relevant resource type                              |
| resourceRelations.resourceId   | Body | UUID     | Relevant resource identifier                        |
| createdYmdt                    | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)  |
| updatedYmdt                    | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "0ddb042c-5af6-43fb-a914-f4dd0540eb7c",
    "jobStatus": "RUNNING",
    "resourceRelations": [
        {
            "resourceType": "DB_INSTANCE",
            "resourceId": "56b39dcf-65eb-47ec-9d4f-09f160ba2266"
        }
    ],
    "createdYmdt": "2023-02-22T20:47:12+09:00",
    "updatedYmdt": "2023-02-22T20:49:46+09:00"
}
```

</p>
</details>

---

## DB Instance Group

### List DB Instances

```http
GET /v3.0/db-instance-groups
```

#### Request

This API does not require a request body.

#### Response

| Name                               | Type | Format   | Description                                                                                                    |
|------------------------------------|------|----------|----------------------------------------------------------------------------------------------------------------|
| dbInstanceGroups                   | Body | Array    | DB instance groups                                                                                             |
| dbInstanceGroups.dbInstanceGroupId | Body | UUID     | DB instance group identifier                                                                                   |
| dbInstanceGroups.replicationType   | Body | Enum     | DB instance group replication type<br/>- `STANDALONE`: Standalone<br/>- `HIGH_AVAILABILITY`: High availability |
| dbInstanceGroups.createdYmdt       | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                             |
| dbInstanceGroups.updatedYmdt       | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                            |

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
            "dbInstanceGroupId": "05de0746-89fd-49c8-94f9-9c5b1df97009",
            "replicationType": "STANDALONE",
            "createdYmdt": "2023-02-13T17:35:20+09:00",
            "updatedYmdt": "2023-02-13T17:35:20+09:00"
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
| dbInstanceGroupId | URL  | UUID   | O        | DB instance group identifier |

#### Response

| Name                         | Type | Format   | Description                                                                                                                                                             |
|------------------------------|------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceGroupId            | Body | UUID     | DB instance group identifier                                                                                                                                            |
| replicationType              | Body | Enum     | DB instance group replication type<br/>- `STANDALONE`: Standalone<br/>- `HIGH_AVAILABILITY`: High availability                                                          |
| dbInstances                  | Body | Array    | DB instances belong to DB instance group                                                                                                                                |
| dbInstances.dbInstanceId     | Body | UUID     | DB instance identifier                                                                                                                                                  |
| dbInstances.dbInstanceType   | Body | Enum     | DB instance role type<br/>- `MASTER`: Master<br/>- `FAILED_MASTER`: Failed over master<br/>- `CANDIDATE_MASTER`: Candidate master<br/>- `READ_ONLY_SLAVE`: Read replica |
| dbInstances.dbInstanceStatus | Body | Enum     | DB instance current status                                                                                                                                              |
| createdYmdt                  | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                      |
| updatedYmdt                  | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                     |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceGroupId": "36617a8e-0df8-4b16-b6ea-6306019e95da",
    "replicationType": "STANDALONE",
    "dbInstances": [
        {
            "dbInstanceId": "6d2db0ef-fe9b-4ed4-97b1-d97fcb4cf1b8",
            "dbInstanceType": "MASTER",
            "dbInstanceStatus": "AVAILABLE"
        }
    ],
    "createdYmdt": "2023-03-03T17:38:14+09:00",
    "updatedYmdt": "2023-03-03T17:38:14+09:00"
}
```

</p>
</details>

---

## DB Instance

### DB Instance Status

| Status             | Description                               |
|--------------------|-------------------------------------------|
| `AVAILABLE`        | DB instance is available                  |
| `BEFORE_CREATE`    | Before DB instance is created             |
| `STORAGE_FULL`     | Insufficient DB instance storage          |
| `FAIL_TO_CREATE`   | Failed to create DB instance              |
| `FAIL_TO_CONNECT`  | Failed to connect DB instance             |
| `REPLICATION_STOP` | Replication of DB instance is stopped     |
| `FAILOVER`         | High availability DB instance failed over |
| `SHUTDOWN`         | DB instance is stopped                    |
| `DELETED`          | DB instance is deleted                    |

### DB Instance Progress Status

| Status                     | Description                      |
|----------------------------|----------------------------------|
| `APPLYING_PARAMETER_GROUP` | Parameter group is being applied |
| `BACKING_UP`               | Backing up                       |
| `CANCELING`                | Canceling                        |
| `CREATING`                 | Creating                         |
| `CREATING_SCHEMA`          | Creating DB schema	              |
| `CREATING_USER`            | Creating user	                   |
| `DELETING`                 | Deleting                         |
| `DELETING_SCHEMA`          | Deleting DB schema               |
| `DELETING_USER`            | Deleting user                    |
| `EXPORTING_BACKUP`         | Exporting backup                 |
| `FAILING_OVER`             | Under failover                   |
| `MIGRATING`                | Under migration                  |
| `MODIFYING`                | Under modification               |
| `PREPARING`                | In preparation                   |
| `PROMOTING`                | Promoting                        |
| `REBUILDING`               | Rebuilding                       |
| `REPAIRING`                | Recovering                       |
| `REPLICATING`              | Replicating                      |
| `RESTARTING`               | Restarting                       |
| `RESTARTING_FORCIBLY`      | Force restarting                 |
| `RESTORING`                | Restoring                        |
| `STARTING`                 | Starting                         |
| `STOPPING`                 | Stopping                         |
| `SYNCING_SCHEMA`           | Synchronizing DB schema          |
| `SYNCING_USER`             | Synchronizing user	              |
| `UPDATING_USER`            | Modifying user	                  |

### List DB instances

```http
GET /v3.0/db-instances
```

#### Request

This API does not require a request body.

#### Response

| Name                          | Type | Format   | Description                                                                                                                                                             |
|-------------------------------|------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstances                   | Body | Array    | DB instances                                                                                                                                                            |
| dbInstances.dbInstanceId      | Body | UUID     | DB instance identifier                                                                                                                                                  |
| dbInstances.dbInstanceGroupId | Body | UUID     | DB instance group identifier                                                                                                                                            |
| dbInstances.dbInstanceName    | Body | String   | Name to identify DB instances                                                                                                                                           |
| dbInstances.description       | Body | String   | Additional information on DB instances                                                                                                                                  |
| dbInstances.dbVersion         | Body | Enum     | DB engine type                                                                                                                                                          |
| dbInstances.dbPort            | Body | Number   | DB port                                                                                                                                                                 |
| dbInstances.dbInstanceType    | Body | Enum     | DB instance role type<br/>- `MASTER`: Master<br/>- `FAILED_MASTER`: Failed over master<br/>- `CANDIDATE_MASTER`: Candidate master<br/>- `READ_ONLY_SLAVE`: Read replica |
| dbInstances.dbInstanceStatus  | Body | Enum     | DB instance current status                                                                                                                                              |
| dbInstances.progressStatus    | Body | Enum     | DB instance current status                                                                                                                                              |
| dbInstances.createdYmdt       | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                      |
| dbInstances.updatedYmdt       | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                     |

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
            "dbInstanceId": "d067593b-1acc-4ccc-9e8a-cc72d6d79ec3",
            "dbInstanceGroupId": "51c7d080-ff36-4025-84b1-9d9d0b4fe9e0",
            "dbInstanceName": "db-instance",
            "description": null,
            "dbVersion": "MARIADB_V10330",
            "dbPort": 10000,
            "dbInstanceType": "MASTER",
            "dbInstanceStatus": "AVAILABLE",
            "progressStatus": "NONE",
            "createdYmdt": "2023-01-23T12:03:13+09:00",
            "updatedYmdt": "2023-02-02T17:20:17+09:00"
        }
    ]
}
```

</p>
</details>

---

### List DB Instance Details

```http
GET /v3.0/db-instances/{dbInstanceId}
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name                        | Type | Format   | Description                                                                                                                                                             |
|-----------------------------|------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                | Body | UUID     | DB instance identifier                                                                                                                                                  |
| dbInstanceGroupId           | Body | UUID     | DB instance group identifier                                                                                                                                            |
| dbInstanceName              | Body | String   | Name to identify DB instances                                                                                                                                           |
| description                 | Body | String   | Additional information on DB instances                                                                                                                                  |
| dbVersion                   | Body | Enum     | DB engine type                                                                                                                                                          |
| dbPort                      | Body | Number   | DB port                                                                                                                                                                 |
| dbInstanceType              | Body | Enum     | DB instance role type<br/>- `MASTER`: Master<br/>- `FAILED_MASTER`: Failed over master<br/>- `CANDIDATE_MASTER`: Candidate master<br/>- `READ_ONLY_SLAVE`: Read replica |
| dbInstanceStatus            | Body | Enum     | DB instance current status                                                                                                                                              |
| progressStatus              | Body | Enum     | Current task status of DB instance                                                                                                                                      |
| dbFlavorId                  | Body | UUID     | Identifier of DB instance specifications                                                                                                                                |
| parameterGroupId            | Body | UUID     | Parameter group identifier applied to DB instance                                                                                                                       |
| dbSecurityGroupIds          | Body | Array    | DB security group identifiers applied to DB instance                                                                                                                    |
| notificationGroupIds        | Body | Array    | Notification group identifiers applied to DB instance                                                                                                                   |
| useDeletionProtection       | Body | Boolean  | Whether to protect DB instance against deletion                                                                                                                         |
| supportAuthenticationPlugin | Body | Boolean  | Whether to support authentication plugin                                                                                                                                |
| needToApplyParameterGroup   | Body | Boolean  | Need to apply the latest parameter group                                                                                                                                |
| needMigration               | Body | Boolean  | Need to migrate                                                                                                                                                         |
| supportDbVersionUpgrade     | Body | Boolean  | Whether to support DB version upgrade                                                                                                                                   |
| createdYmdt                 | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                      |
| updatedYmdt                 | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                     |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceId": "d067593b-1acc-4ccc-9e8a-cc72d6d79ec3",
    "dbInstanceGroupId": "51c7d080-ff36-4025-84b1-9d9d0b4fe9e0",
    "dbInstanceName": "db-instance",
    "description": null,
    "dbVersion": "MARIADB_V10330",
    "dbPort": 10000,
    "dbInstanceType": "MASTER",
    "dbInstanceStatus": "AVAILABLE",
    "progressStatus": "NONE",
    "dbFlavorId": "e9ed4ef6-78d7-46fa-ace9-32481e97f3b7",
    "parameterGroupId": "b03e8b13-de27-4d04-a488-ff5689589372",
    "dbSecurityGroupIds": ["01908c35-d2c9-4852-baf0-17f06ec42c03"],
    "notificationGroupIds": ["83a62a33-ddbf-4a04-8653-e54463d5b1ac"],
    "useDeletionProtection": false,
    "supportAuthenticationPlugin": true,
    "needToApplyParameterGroup": false,
    "needMigration": false,
    "supportDbVersionUpgrade": true,
    "createdYmdt": "2022-11-23T12:03:13+09:00",
    "updatedYmdt": "2022-12-02T17:20:17+09:00"
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

| Name                                     | Type | Format  | Required | Description                                                                                                                                                                                                                                                               |
|------------------------------------------|------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceName                           | Body | String  | O        | Name to identify DB instances                                                                                                                                                                                                                                             |
| description                              | Body | String  | X        | Additional information on DB instances                                                                                                                                                                                                                                    |
| dbFlavorId                               | Body | UUID    | O        | Identifier of DB instance specifications                                                                                                                                                                                                                                  |
| dbVersion                                | Body | Enum    | O        | DB engine type                                                                                                                                                                                                                                                            |
| dbPort                                   | Body | Number  | O        | DB port<br/>- Minimum value: `3306`<br/>- Maximum value: `43306`                                                                                                                                                                                                          |
| dbUserName                               | Body | String  | O        | DB user account name                                                                                                                                                                                                                                                      |
| dbPassword                               | Body | String  | O        | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `16`                                                                                                                                                                                             |
| parameterGroupId                         | Body | UUID    | O        | Parameter group identifier                                                                                                                                                                                                                                                |
| dbSecurityGroupIds                       | Body | Array   | X        | DB security group identifiers                                                                                                                                                                                                                                             ||network|Body|Object|O|Network information objects|
| userGroupIds                             | Body | Array   | X        | User group identifiers                                                                                                                                                                                                                                                    |
| useHighAvailability                      | Body | Boolean | X        | Whether to use high availability<br/>Default: `false`                                                                                                                                                                                                                     |
| pingInterval                             | Body | Number  | X        | Ping interval (sec) when using high availability<br/>Default: `6`<br/>- Minimum value: `1`<br/>- Maximum value: `600`                                                                                                                                                     |
| useDefaultNotification                   | Body | Boolean | X        | Whether to use default notification<br/>Default: `false`                                                                                                                                                                                                                  |
| useDeletionProtection                    | Body | Boolean | X        | Whether to protect against deletion<br/>Default: `false`                                                                                                                                                                                                                  |
| network                                  | Body | Object  | O        | Network information objects                                                                                                                                                                                                                                               |
| network.subnetId                         | Body | UUID    | O        | Subnet identifier                                                                                                                                                                                                                                                         |
| network.usePublicAccess                  | Body | Boolean | X        | External access is available or not<br/>Default: `false`                                                                                                                                                                                                                  |
| network.availabilityZone                 | Body | Enum    | O        | Availability zone where DB instance will be created<br/>- Example: `kr-pub-a`                                                                                                                                                                                             |
| storage                                  | Body | Object  | O        | Storage information objects                                                                                                                                                                                                                                               |    
| storage.storageType                      | Body | Enum    | O        | Block Storage Type<br/>- Example: `General SSD`                                                                                                                                                                                                                           |
| storage.storageSize                      | Body | Number  | O        | Block Storage Size (GB)<br/>- Minimum value: `20`<br/>- Maximum value: `2048`                                                                                                                                                                                             |
| backup                                   | Body | Object  | O        | Backup information objects                                                                                                                                                                                                                                                |
| backup.backupPeriod                      | Body | Number  | O        | Backup retention period<br/>- Minimum value: `0`<br/>- Maximum value: `730`                                                                                                                                                                                               |
| backup.ftwrlWaitTimeout                  | Body | Number  | X        | Query latency (sec)<br/>Default: `6`<br/>- Minimum value: `0`<br/>- Maximum value: `21600`                                                                                                                                                                                |
| backup.backupRetryCount                  | Body | Number  | X        | Number of backup retries<br/>Default: `6`<br/>- Minimum value: `0`<br/>- Maximum value: `10`                                                                                                                                                                              |
| backup.useBackupLock                     | Body | Boolean | X        | Whether to use table lock<br/>Default: `true`                                                                                                                                                                                                                             |
| backup.backupSchedules                   | Body | Array   | O        | Scheduled auto backup list                                                                                                                                                                                                                                                |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | O        | Backup started time<br/>- Example: `00:00:00`                                                                                                                                                                                                                             |
| backup.backupSchedules.backupWndDuration | Body | Enum    | O        | Backup duration<br/>Auto backup proceeds within duration from backup start time.<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hour<br/>- `TWO_HOURS`: 2 hour<br/>- `TWO_HOURS_AND_HALF`: 2.5 hour<br/>- `THREE_HOURS`: 3 hour |

<details><summary>Example</summary>
<p>

```json
{
    "dbInstanceName": "db-instance",
    "description": "description",
    "dbFlavorId": "71f69bf9-3c01-4c1a-b135-bb75e93f6268",
    "dbVersion": "MARIADB_V10330",
    "dbPort": 10000,
    "dbUserName": "db-user",
    "dbPassword": "password",
    "parameterGroupId": "488bf4f5-d8f7-459b-ace6-529b606c8570",
    "dbSecurityGroupIds": [
        "b0483a3d-e8e2-46f6-9e84-d5e31b0d44f4"
    ],
    "userGroupIds": [],
    "network": {
        "subnetId": "e721a9dd-dad0-4cf0-a53b-dd654ebfc683",
        "availabilityZone": "kr-pub-a"
    },
    "storage": {
        "storageType": "General SSD",
        "storageSize": 20
    },
    "backup": {
        "backupPeriod": 1,
        "backupSchedules": [
            {
                "backupWndBgnTime": "00:00:00",
                "backupWndDuration": "ONE_HOUR"
            }
        ]
    }
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Modify DB Instance

```http
PUT /v3.0/db-instances/{dbInstanceId}
```

#### Request

| Name               | Type | Format  | Required | Description                                                                                                       |
|--------------------|------|---------|----------|-------------------------------------------------------------------------------------------------------------------|
| dbInstanceId       | URL  | UUID    | O        | DB instance identifier                                                                                            |
| dbInstanceName     | Body | String  | X        | Name to identify DB instances                                                                                     |
| description        | Body | String  | X        | Additional information on DB instances                                                                            |
| dbPort             | Body | Number  | X        | DB port<br/>- Minimum value: `3306`<br/>- Maximum value: `43306`                                                  |
| dbFlavorId         | Body | UUID    | X        | Identifier of DB instance specifications                                                                          |
| parameterGroupId   | Body | UUID    | X        | Parameter group identifier                                                                                        |
| dbSecurityGroupIds | Body | Array   | X        | DB security group identifiers                                                                                     |
| executeBackup      | Body | Boolean | X        | Whether to execute backup at this time<br/>Default: `false`                                                       |
| useOnlineFailover  | Body | Boolean | X        | Whether to restart using failover<br/>Available only for DB instance using high availability<br/>Default: `false` |

<details><summary>Example</summary>
<p>

```json
{
    "dbInstanceName": "db-instance2",
    "description": "description2",
    "dbPort": 10001,
    "dbSecurityGroupIds": [],
    "executeBackup": true
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Delete DB instance

```http
DELETE /v3.0/db-instances/{dbInstanceId}
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Restart DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/restart
```

#### Request

| Name              | Type | Format  | Required | Description                                                                                                       |
|-------------------|------|---------|----------|-------------------------------------------------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O        | DB instance identifier                                                                                            |
| useOnlineFailover | Body | Boolean | X        | Whether to restart using failover<br/>Available only for DB instance using high availability<br/>Default: `false` |
| executeBackup     | Body | Boolean | X        | Whether to execute backup at this time<br/>Default: `false`                                                       |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---
### Force Restart DB instance
```http
POST /v3.0/db-instances/{dbInstanceId}/force-restart
```

#### Request

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |


#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
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

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Stop DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/stop
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Backup DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/backup
```

#### Request

| Name         | Type | Format | Required | Description              |
|--------------|------|--------|----------|--------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier   |
| backupName   | Body | String | O        | Name to identify backups |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Export after Backing up DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### Request

| Name            | Type | Format | Required | Description                                            |
|-----------------|------|--------|----------|--------------------------------------------------------|
| dbInstanceId    | URL  | UUID   | O        | DB instance identifier                                 |
| tenantId        | Body | String | O        | Tenant ID of object storage to store backup            |
| username        | Body | String | O        | NHN Cloud member or IAM member ID                      |
| password        | Body | String | O        | API password for object storage where backup is stored |
| targetContainer | Body | String | O        | Object storage container where backup is stored        |
| objectPath      | Body | String | O        | Backup path to be stored in container                  |

<details><summary>Example</summary>
<p>

```json
{
    "tenantId": "399631c404744dbbb18ce4fa2dc71a5a",
    "username": "gildong.hong@nhn.com",
    "password": "password",
    "targetContainer": "/container",
    "objectPath": "/backups/backup_file"
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Replicate DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/replicate
```

#### Request

| Name                                     | Type | Format  | Required | Description                                                                                                                                                                                                                                                                                                         |
|------------------------------------------|------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                             | URL  | UUID    | O        | DB instance identifier                                                                                                                                                                                                                                                                                              |
| dbInstanceName                           | Body | String  | O        | Name to identify DB instances                                                                                                                                                                                                                                                                                       |
| description                              | Body | String  | X        | Additional information on DB instances                                                                                                                                                                                                                                                                              |
| dbFlavorId                               | Body | UUID    | X        | Identifier of DB instance specifications<br/>- Default: Original DB instance value                                                                                                                                                                                                                                  |
| dbPort                                   | Body | Number  | X        | DB port<br/>- Default: Original DB instance value<br/>- Minimum value: `3306`<br/>- Maximum value: `43306`                                                                                                                                                                                                          |
| parameterGroupId                         | Body | UUID    | X        | Parameter group identifier<br/>- Default: Original DB instance value                                                                                                                                                                                                                                                |
| dbSecurityGroupIds                       | Body | Array   | X        | DB security group identifiers<br/>- Default: Original DB instance value                                                                                                                                                                                                                                             |
| userGroupIds                             | Body | Array   | X        | User group identifiers                                                                                                                                                                                                                                                                                              |
| useDefaultNotification                   | Body | Boolean | X        | Whether to use default notification<br/>Default: `false`                                                                                                                                                                                                                                                            |
| useDeletionProtection                    | Body | Boolean | X        | Whether to protect against deletion<br/>Default: `false`                                                                                                                                                                                                                                                            |
| network                                  | Body | Object  | O        | Network information objects                                                                                                                                                                                                                                                                                         |
| network.usePublicAccess                  | Body | Boolean | X        | External access is available or not<br/>- Default: Original DB instance value                                                                                                                                                                                                                                       |
| network.availabilityZone                 | Body | Enum    | O        | Availability zone where DB instance will be created<br/>- Example: `kr-pub-a`                                                                                                                                                                                                                                       |
| storage                                  | Body | Object  | X        | Storage information objects                                                                                                                                                                                                                                                                                         |    
| storage.storageType                      | Body | Enum    | X        | Block Storage Type<br/>- Example: `General SSD`                                                                                                                                                                                                                                                                     |
| storage.storageSize                      | Body | Number  | X        | Block Storage Size (GB)<br/>- Default: Original DB instance value<br/>- Minimum value: `20`<br/>- Maximum value: `2048`                                                                                                                                                                                             |
| backup                                   | Body | Object  | X        | Backup information objects                                                                                                                                                                                                                                                                                          |
| backup.backupPeriod                      | Body | Number  | X        | Backup retention period<br/>- Default: Original DB instance value<br/>- Minimum value: `0`<br/>- Maximum value: `730`                                                                                                                                                                                               |
| backup.ftwrlWaitTimeout                  | Body | Number  | X        | Query latency (sec)<br/>- Default: Original DB instance value<br/>- Minimum value: `0`<br/>- Maximum value: `21600`                                                                                                                                                                                                 |
| backup.backupRetryCount                  | Body | Number  | X        | Number of backup retries<br/>- Default: Original DB instance value<br/>- Minimum value: `0`<br/>- Maximum value: `10`                                                                                                                                                                                               |
| backup.useBackupLock                     | Body | Boolean | X        | Whether to use table lock<br/>- Default: Original DB instance value                                                                                                                                                                                                                                                 |
| backup.backupSchedules                   | Body | Array   | X        | Scheduled auto backup list                                                                                                                                                                                                                                                                                          |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | X        | Backup started time<br/>- Example: `00:00:00`<br/>- Default: Original DB instance value                                                                                                                                                                                                                             |
| backup.backupSchedules.backupWndDuration | Body | Enum    | X        | Backup duration<br/>Auto backup proceeds within duration from backup start time.<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hour<br/>- `TWO_HOURS`: 2 hour<br/>- `TWO_HOURS_AND_HALF`: 2.5 hour<br/>- `THREE_HOURS`: 3 hour<br/>- Default: Original DB instance value |

<details><summary>Example</summary>
<p>

```json
{
    "dbInstanceName": "db-instance-replicate",
    "description": "description",
    "dbPort": 11000,
    "network": {
        "availabilityZone": "kr-pub-a"
    },
    "storage": {
        "stroageSize": 100
    }
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Promote DB Instance

```http
POST /v3.0/db-instances/{dbInstanceId}/promote
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### View Restoration Information

```http
GET /v3.0/db-instances/{dbInstanceId}/restoration-info
```

#### Request

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name                                    | Type | Format   | Description                                                                                                                                                                                                          |
|-----------------------------------------|------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| oldestRestorableYmdt                    | Body | DateTime | Oldest restorable time                                                                                                                                                                                               |
| latestRestorableYmdt                    | Body | DateTime | Most recent restorable time                                                                                                                                                                                          |
| restorableBackups                       | Body | Array    | List of restorable backups                                                                                                                                                                                           |
| restorableBackups.backup                | Body | Object   | Backup information objects                                                                                                                                                                                           |
| restorableBackups.backup.backupId       | Body | UUID     | Backup identifier                                                                                                                                                                                                    |
| restorableBackups.backup.backupName     | Body | String   | Backup name                                                                                                                                                                                                          |
| restorableBackups.backup.useBackupLock  | Body | Boolean  | Whether to use table lock                                                                                                                                                                                            |
| restorableBackups.backup.backupSize     | Body | Number   | Backup size                                                                                                                                                                                                          |
| restorableBackups.backup.backupType     | Body | Enum     | Backup type<br><ul><li>- `AUTO`: Automatic</li><li>- `MANUAL`:  Manual</li></ul>                                                                                                                                     |
| restorableBackups.backup.backupStatus   | Body | Enum     | Backup Status<br><ul><li>`BACKING_UP`: Backup in progress</li><li>`COMPLETED`: Backup completed</li><li>`DELETING`: Backup being deleted</li><li>`DELETED`: Backup deleted</li><li>`ERROR`: Error occurred</li></ul> |
| restorableBackups.backup.dbInstanceId   | Body | UUID     | Original DB instance identifier                                                                                                                                                                                      |
| restorableBackups.backup.dbInstanceName | Body | String   | Original DB instance name                                                                                                                                                                                            |
| restorableBackups.backup.dbVersion      | Body | String   | DB engine type                                                                                                                                                                                                       |
| restorableBackups.backup.failoverCount  | Body | Number   | Number of failovers                                                                                                                                                                                                  |
| restorableBackups.backup.binLogFileName | Body | String   | Binary log file name                                                                                                                                                                                                 |
| restorableBackups.backup.binLogPosition | Body | Number   | Binary log file location                                                                                                                                                                                             |
| restorableBackups.backup.createdYmdt    | Body | DateTime | Date and time of backup creation                                                                                                                                                                                     |
| restorableBackups.backup.updatedYmdt    | Body | DateTime | Date and time of backup renewal                                                                                                                                                                                      |
| restorableBackups.restorableBinLogs     | Body | Array    | Binary log names that can be restored using the backup                                                                                                                                                               |



<details><summary>Example</summary>
<p>

```json
{
	"header": {
		"resultCode": 0,
		"resultMessage": "SUCCESS",
		"isSuccessful": true
	},
    "oldestRestorableYmdt": "2023-07-09T16:33:33+09:00",
	"latestRestorableYmdt": "2023-07-10T15:44:44+09:00",
	"restorableBackups": [
		{
			"backup": {
				"backupId": "145d889a-fe08-474f-8f58-bde576ff96a9",
				"backupName": "example-backup-name",
				"backupStatus": "COMPLETED",
				"dbInstanceId": "dba1be25-9429-4589-9716-7fb6daad7cb9",
				"dbInstanceName": "original-db-instance-name",
				"dbVersion": "MARIADB_V10330",
				"backupType": "MANUAL",
				"backupSize": 8299904,
				"useBackupLock": true,
				"failoverCount": 0,
				"binLogFileName": "mysql-bin.000001",
				"binLogPosition": 367916037,
				"createdYmdt": "2023-07-10T15:44:44+09:00",
				"updatedYmdt": "2023-07-10T15:46:07+09:00"
			},
			"restorableBinLogs": [
				"mysql-bin.000001"
			]
		}
	]
}
```

</p>
</details>

---

### View the last query to be restored

```http
GET /v3.0/db-instances/{dbInstanceId}/restoration-info/last-query
```

#### Common Request

| Name         | Type  | Format | Required | Description                                                                                                                                                                                                                        |
|--------------|-------|--------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId | URL   | UUID   | O        | DB instance identifier                                                                                                                                                                                                             |
| restoreType  | Query | Enum   | O        | Restoration type<br><ul><li>`TIMESTAMP`: A point-in-time restoration type using the time within the restorable time</li><li>`BINLOG`: A point-in-time restoration type using a binary log location that can be restored.</li></ul> |

#### If restoreType is `BACKUP`

| Name        | Type  | Format   | Required | Description                                           |
|-------------|-------|----------|----------|-------------------------------------------------------|
| restoreYmdt | Query | DateTime | O        | DB instance restore date (YYYY-MM-DDThh:mm:ss.SSSTZD) |

#### If restoreType is `BINLOG`

| Name           | Type  | Format | Required | Description                                     |
|----------------|-------|--------|----------|-------------------------------------------------|
| backupId       | Query | UUID   | O        | Identifier of the backup to use for restoration |
| binLogFileName | Query | String | O        | Binary log name to use for restoration          |
| binLogPosition | Query | Number | O        | Binary log location to use for restoration      |

#### Response

| Name         | Type | Format   | Description                                      |
|--------------|------|----------|--------------------------------------------------|
| executedYmdt | Body | DateTime | Query executed date (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| lastQuery    | Body | String   | Last executed query                              |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "executedYmdt": "2023-03-17T14:02:29+09:00",
    "lastQuery": "INSERT INTO `test`.`test`SET  @1='0123'"
}
```

</p>
</details>

---

### Restoration

```http
POST /v3.0/db-instances/{dbInstanceId}/restore
```

#### Common Request

| Name                                                | Type | Format  | Required | Description                                                                                                                                                                                                                                                                                                      |
|-----------------------------------------------------|------|---------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                                        | URL  | UUID    | O        | DB instance identifier                                                                                                                                                                                                                                                                                           |
| restore                                             | Body | Object  | O        | Restoration information object                                                                                                                                                                                                                                                                                   |
| restore.restoreType                                 | Body | Enum    | O        | Restoration type<br><ul><li>`TIMESTAMP`: A point-in-time restoration type using the time within the restorable time</li><li>`BINLOG`: A point-in-time restoration type using a binary log location that can be restored.</li><li>`BACKUP`: Snapshot restoration type using a previously created backup</li></ul> |
| dbInstanceName                                      | Body | String  | O        | Name to identify DB instances                                                                                                                                                                                                                                                                                    |
| description                                         | Body | String  | X        | Additional information on DB instances                                                                                                                                                                                                                                                                           |
| dbFlavorId                                          | Body | UUID    | O        | Identifier of DB instance specifications                                                                                                                                                                                                                                                                         |
| dbPort                                              | Body | Number  | O        | DB port<br><ul><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                                                                                 |
| <span style="color:#313338">parameterGroupId</span> | Body | UUID    | O        | Parameter group identifier                                                                                                                                                                                                                                                                                       |
| dbSecurityGroupIds                                  | Body | Array   | X        | DB security group identifiers                                                                                                                                                                                                                                                                                    |
| userGroupIds                                        | Body | Array   | X        | User group identifiers                                                                                                                                                                                                                                                                                           |
| useHighAvailability                                 | Body | Boolean | X        | Whether to use high availability<br><ul><li>Default: `false`</li></ul>                                                                                                                                                                                                                                           |
| pingInterval                                        | Body | Number  | X        | Ping interval (sec) when using high availability<br><ul><li>Default: `6`</li><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                   |
| useDefaultNotification                              | Body | Boolean | X        | Whether to use default notification<br><ul><li>Default: `false`</li></ul>                                                                                                                                                                                                                                        |
| network                                             | Body | Object  | O        | Network information objects                                                                                                                                                                                                                                                                                      |
| network.subnetId                                    | Body | UUID    | O        | Subnet identifier                                                                                                                                                                                                                                                                                                |
| network.usePublicAccess                             | Body | Boolean | X        | External access is available or not<br><ul><li>Default: `false`</li></ul>                                                                                                                                                                                                                                        |
| network.availabilityZone                            | Body | Enum    | O        | Availability zone where DB instance will be created<br><ul><li>- Example: `kr-pub-a`</li></ul>                                                                                                                                                                                                                   |
| storage                                             | Body | Object  | O        | Storage information objects                                                                                                                                                                                                                                                                                      |
| storage.storageType                                 | Body | Enum    | O        | Block Storage Type<br><ul><li>- Example: `General SSD`</li></ul>                                                                                                                                                                                                                                                 |
| storage.storageSize                                 | Body | Number  | O        | Block Storage Size (GB)<br><ul><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                                                                 |
| backup                                              | Body | Object  | O        | Backup information objects                                                                                                                                                                                                                                                                                       |
| backup.backupPeriod                                 | Body | Number  | O        | Backup retention period<br><ul><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                                                                 |
| backup.ftwrlWaitTimeout                             | Body | Number  | X        | Query latency (sec)<br><ul><li>Default: `6`</li><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                                                |
| backup.backupRetryCount                             | Body | Number  | X        | Number of backup retries<br><ul><li>Default: `0`</li><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                                           |
| backup.useBackupLock                                | Body | Boolean | X        | Whether to use table lock<br><ul><li>Default: `true`</li></ul>                                                                                                                                                                                                                                                   |
| backup.backupSchedules                              | Body | Array   | O        | Scheduled auto backup list                                                                                                                                                                                                                                                                                       |
| backup.backupSchedules.backupWndBgnTime             | Body | String  | O        | Backup started time<br><ul><li>- Example: `1.1.1.%`</li></ul>                                                                                                                                                                                                                                                    |
| backup.backupSchedules.backupWndDuration            | Body | Enum    | O        | Backup duration<br>Auto backup proceeds within duration from backup start time.<br><ul><li>- `HALF_AN_HOUR`: 30 minutes</li><li>- `ONE_HOUR`: 1 hour</li><li>- `ONE_HOUR_AND_HALF`: 1.5 hour</li><li>- `TWO_HOURS`: 2 hour</li><li>- `TWO_HOURS_AND_HALF`: 2.5 hour</li><li>- `THREE_HOURS`: 3 hour</li></ul>    |
| useDeletionProtection                               | Body | Boolean | X        | Whether to protect against deletion<br>Default: `false`                                                                                                                                                                                                                                                          |

#### Request when restoring a point in time restoration using Timestamp (if restoreType is `TIMESTAMP`)

| Name                | Type | Format   | Required | Description                                                                                                                                                                             |
|---------------------|------|----------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| restore.restoreYmdt | Body | DateTime | O        | DB instance restore date (YYYY-MM-DDThh:mm:ss.SSSTZD)<br>Restoration is possible only before the most recent restorable time, which is queried through restoration information inquiry. |


<details><summary>Example</summary>
<p>

```json
{
    "dbInstanceName": "db-instance",
    "description": "description",
    "dbFlavorId": "71f69bf9-3c01-4c1a-b135-bb75e93f6268",
    "dbPort": 10000,
    "dbUserName": "db-user",
    "dbPassword": "password",
    "parameterGroupId": "488bf4f5-d8f7-459b-ace6-529b606c8570",
    "dbSecurityGroupIds": [
        "b0483a3d-e8e2-46f6-9e84-d5e31b0d44f4"
    ],
    "userGroupIds": [],
    "network": {
		"subnetId": "3ae7914f-9b42-4729-b125-87417b72cf36",
		"availabilityZone": "kr-pub-a"
	},
	"storage": {
		"storageType": "General SSD",
		"storageSize": 20
	},
	"restore": {
		"restoreType": "TIMESTAMP",
		"restoreYmdt": "2023-07-10T15:44:44+09:00"
	},
	"backup": {
		"backupPeriod": 1,
		"backupSchedules": [
			{
				"backupWndBgnTime": "00:00:00",
				"backupWndDuration": "ONE_HOUR_AND_HALF"
			}
		]
	}
}
```

</p>
</details>

#### Request for point-in-time restoration using binary logs (if restoreType is `BINLOG`)

| Name                          | Type | Format | Required | Description                                     |
|-------------------------------|------|--------|----------|-------------------------------------------------|
| restore.backupId              | Body | UUID   | O        | Identifier of the backup to use for restoration |
| restore.binLog                | Body | Object | O        | Deleting Binary Logs                            |
| restore.binLog.binLogFileName | Body | String | O        | Binary log name to use for restoration          |
| restore.binLog.binLogPosition | Body | Number | O        | Binary log location to use for restoration      |

* When restoring a point in time using the binary log, it is possible to restore the log recorded after that based on the binary log file and location of the base backup.


<details><summary>Example</summary>
<p>

```json
{
    "dbInstanceName": "db-instance",
    "description": "description",
    "dbFlavorId": "71f69bf9-3c01-4c1a-b135-bb75e93f6268",
    "dbPort": 10000,
    "dbUserName": "db-user",
    "dbPassword": "password",
    "parameterGroupId": "488bf4f5-d8f7-459b-ace6-529b606c8570",
    "dbSecurityGroupIds": [
        "b0483a3d-e8e2-46f6-9e84-d5e31b0d44f4"
    ],
    "userGroupIds": [],
    "network": {
		"subnetId": "3ae7914f-9b42-4729-b125-87417b72cf36",
		"availabilityZone": "kr-pub-a"
	},
	"storage": {
		"storageType": "General SSD",
		"storageSize": 20
	},
	"restore": {
		"restoreType": "BINLOG",
        "backupId":"3ae7914f-9b42-4729-b125-87417b72cf36",
		"binLogFileName": "mysql-bin.000001",
		"binLogPosition": 1234567
	},
	"backup": {
		"backupPeriod": 1,
		"backupSchedules": [
			{
				"backupWndBgnTime": "00:00:00",
				"backupWndDuration": "ONE_HOUR_AND_HALF"
			}
		]
	}
}
```

</p>
</details>

#### Request when restoring from backup (if restoreType is `BACKUP`)

| Name             | Type | Format | Required                       | Description                                     |
|------------------|------|--------|--------------------------------|-------------------------------------------------|
| restore.backupId | Body | UUID   | O (if restoreType is `BACKUP`) | Identifier of the backup to use for restoration |



<details><summary>Example</summary>
<p>

```json
{
    "dbInstanceName": "db-instance",
    "description": "description",
    "dbFlavorId": "71f69bf9-3c01-4c1a-b135-bb75e93f6268",
    "dbPort": 10000,
    "dbUserName": "db-user",
    "dbPassword": "password",
    "parameterGroupId": "488bf4f5-d8f7-459b-ace6-529b606c8570",
    "dbSecurityGroupIds": [
        "b0483a3d-e8e2-46f6-9e84-d5e31b0d44f4"
    ],
    "userGroupIds": [],
    "network": {
		"subnetId": "3ae7914f-9b42-4729-b125-87417b72cf36",
		"availabilityZone": "kr-pub-a"
	},
	"storage": {
		"storageType": "General SSD",
		"storageSize": 20
	},
	"restore": {
		"restoreType": "BACKUP",
        "backupId":"3ae7914f-9b42-4729-b125-87417b72cf36"
	},
	"backup": {
		"backupPeriod": 1,
		"backupSchedules": [
			{
				"backupWndBgnTime": "00:00:00",
				"backupWndDuration": "ONE_HOUR_AND_HALF"
			}
		]
	}
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |


---

### Restore from Object Storage

```http
POST /v3.0/db-instances/restore-from-obs
```

#### Request

| Name                                                | Type | Format  | Required | Description                                                                                                                                                                                                                                                                                                   |
|-----------------------------------------------------|------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| restore                                             | Body | Object  | O        | Restoration information object                                                                                                                                                                                                                                                                                |
| restore.tenantId                                    | Body | String  | O        | Tenant ID of object storage where backups are stored                                                                                                                                                                                                                                                          |
| restore.username                                    | Body | String  | O        | NHN Cloud account or IAM member ID                                                                                                                                                                                                                                                                            |
| restore.password                                    | Body | String  | O        | API password for object storage where backups are stored                                                                                                                                                                                                                                                      |
| restore.targetContainer                             | Body | String  | O        | Container for object storage where backups are stored                                                                                                                                                                                                                                                         |
| restore.objectPath                                  | Body | String  | O        | Backup path stored in container                                                                                                                                                                                                                                                                               |
| dbVersion                                           | Body | Enum    | O        | DB engine type                                                                                                                                                                                                                                                                                                |
| dbInstanceName                                      | Body | String  | O        | Name to identify DB instances                                                                                                                                                                                                                                                                                 |
| description                                         | Body | String  | X        | Additional information on DB instances                                                                                                                                                                                                                                                                        |
| dbFlavorId                                          | Body | UUID    | O        | Identifier of DB instance specifications                                                                                                                                                                                                                                                                      |
| dbPort                                              | Body | Number  | O        | DB port<br><ul><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                                                                              |
| <span style="color:#313338">parameterGroupId</span> | Body | UUID    | O        | Parameter group identifier                                                                                                                                                                                                                                                                                    |
| dbSecurityGroupIds                                  | Body | Array   | X        | DB security group identifiers                                                                                                                                                                                                                                                                                 |
| userGroupIds                                        | Body | Array   | X        | User group identifiers                                                                                                                                                                                                                                                                                        |
| useHighAvailability                                 | Body | Boolean | X        | Whether to use high availability<br><ul><li>Default: `false`</li></ul>                                                                                                                                                                                                                                        |
| pingInterval                                        | Body | Number  | X        | Ping interval (sec) when using high availability<br><ul><li>Default: `6`</li><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                |
| useDefaultNotification                              | Body | Boolean | X        | Whether to use default notification<br><ul><li>Default: `false`</li></ul>                                                                                                                                                                                                                                     |
| network                                             | Body | Object  | O        | Network information objects                                                                                                                                                                                                                                                                                   |
| network.subnetId                                    | Body | UUID    | O        | Subnet identifier                                                                                                                                                                                                                                                                                             |
| network.usePublicAccess                             | Body | Boolean | X        | External access is available or not<br><ul><li>Default: `false`</li></ul>                                                                                                                                                                                                                                     |
| network.availabilityZone                            | Body | Enum    | O        | Availability zone where DB instance will be created<br><ul><li>- Example: `kr-pub-a`</li></ul>                                                                                                                                                                                                                |
| storage                                             | Body | Object  | O        | Storage information objects                                                                                                                                                                                                                                                                                   |
| storage.storageType                                 | Body | Enum    | O        | Block Storage Type<br><ul><li>- Example: `General SSD`</li></ul>                                                                                                                                                                                                                                              |
| storage.storageSize                                 | Body | Number  | O        | Block Storage Size (GB)<br><ul><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                                                              |
| backup                                              | Body | Object  | O        | Backup information objects                                                                                                                                                                                                                                                                                    |
| backup.backupPeriod                                 | Body | Number  | O        | Backup retention period<br><ul><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                                                              |
| backup.ftwrlWaitTimeout                             | Body | Number  | X        | Query latency (sec)<br><ul><li>Default: `6`</li><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                                             |
| backup.backupRetryCount                             | Body | Number  | X        | Number of backup retries<br><ul><li>Default: `0`</li><li>- Minimum value: `0`</li><li>- Maximum value: 65535</li></ul>                                                                                                                                                                                        |
| backup.useBackupLock                                | Body | Boolean | X        | Whether to use table lock<br><ul><li>Default: `true`</li></ul>                                                                                                                                                                                                                                                |
| backup.backupSchedules                              | Body | Array   | O        | Scheduled auto backup list                                                                                                                                                                                                                                                                                    |
| backup.backupSchedules.backupWndBgnTime             | Body | String  | O        | Backup started time<br><ul><li>- Example: `1.1.1.%`</li></ul>                                                                                                                                                                                                                                                 |
| backup.backupSchedules.backupWndDuration            | Body | Enum    | O        | Backup duration<br>Auto backup proceeds within duration from backup start time.<br><ul><li>- `HALF_AN_HOUR`: 30 minutes</li><li>- `ONE_HOUR`: 1 hour</li><li>- `ONE_HOUR_AND_HALF`: 1.5 hour</li><li>- `TWO_HOURS`: 2 hour</li><li>- `TWO_HOURS_AND_HALF`: 2.5 hour</li><li>- `THREE_HOURS`: 3 hour</li></ul> |



<details><summary>Example</summary>
<p>

```json
{
    "dbInstanceName": "db-instance",
    "description": "description",
    "dbFlavorId": "71f69bf9-3c01-4c1a-b135-bb75e93f6268",
    "dbPort": 10000,
    "dbVersion": "MARIADB_V10330",
    "dbUserName": "db-user",
    "dbPassword": "password",
    "parameterGroupId": "488bf4f5-d8f7-459b-ace6-529b606c8570",
    "dbSecurityGroupIds": [
        "b0483a3d-e8e2-46f6-9e84-d5e31b0d44f4"
    ],
    "userGroupIds": [],
    "network": {
		"subnetId": "3ae7914f-9b42-4729-b125-87417b72cf36",
		"availabilityZone": "kr-pub-a"
	},
	"storage": {
		"storageType": "General SSD",
		"storageSize": 20
	},
	"restore": {
		"tenantId":"tenant-id",
        "username":"username",
        "password":"password",
        "targetContainer":"targetContainer",
        "objectPath":"objectPath"
	},
	"backup": {
		"backupPeriod": 1,
		"backupSchedules": [
			{
				"backupWndBgnTime": "00:00:00",
				"backupWndDuration": "ONE_HOUR_AND_HALF"
			}
		]
	}
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |


---


### Change DB Instance Deletion Protection Settings

```http
PUT /v3.0/db-instances/{dbInstanceId}/deletion-protection
```

#### Request

| Name                  | Type | Format  | Required | Description                         |
|-----------------------|------|---------|----------|-------------------------------------|
| dbInstanceId          | URL  | UUID    | O        | DB instance identifier              |
| useDeletionProtection | Body | Boolean | O        | Whether to protect against deletion |

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

</p>
</details>

---

### Modify High Availability

```http
PUT /v3.0/db-instances/{dbInstanceId}/high-availability
```

#### Request

| Name                | Type | Format  | Required | Description                                                                                          |
|---------------------|------|---------|----------|------------------------------------------------------------------------------------------------------|
| dbInstanceId        | URL  | UUID    | O        | DB instance identifier                                                                               |
| useHighAvailability | Body | Boolean | O        | Whether to use high availability                                                                     |
| pingInterval        | Body | Number  | X        | Ping interval (sec) when using high availability<br/>- Minimum value: `1`<br/>- Maximum value: `600` |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Restart High Availability

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Pause High Availability

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Recover High Availability

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Separate High Availability

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/split
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### View Storage Information

```http
GET /v3.0/db-instances/{dbInstanceId}/storage-info
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name          | Type | Format | Description                                                                                                |
|---------------|------|--------|------------------------------------------------------------------------------------------------------------|
| storageType   | Body | Enum   | Block Storage Type                                                                                         |
| storageSize   | Body | Number | Block Storage Size (GB)                                                                                    |
| storageStatus | Body | Enum   | Data Storage Current Status<br/>- `DETACHED`: Detached<br/>- `ATTACHED`: Attached<br/>- `DELETED`: Deleted |

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
    "storageSize": 20,
    "storageStatus": "ATTACHED"
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

| Name              | Type | Format  | Required | Description                                                                                                       |
|-------------------|------|---------|----------|-------------------------------------------------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O        | DB instance identifier                                                                                            |
| storageSize       | Body | Number  | O        | Block Storage Size (GB)<br/>- Minimum value: Current value<br/>- Maximum value: `2048`                            |
| useOnlineFailover | Body | Boolean | X        | Whether to restart using failover<br/>Available only for DB instance using high availability<br/>Default: `false` |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### View Backup Information

```http
GET /v3.0/db-instances/{dbInstanceId}/backup-info
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name                              | Type | Format  | Description                |
|-----------------------------------|------|---------|----------------------------|
| backupPeriod                      | Body | Number  | Backup retention period    |
| ftwrlWaitTimeout                  | Body | Number  | Query latency (sec)        |
| backupRetryCount                  | Body | Number  | Number of backup retries   |
| replicationRegion                 | Body | Enum    | Backup replication region  |
| useBackupLock                     | Body | Boolean | Whether to use table lock  |
| backupSchedules                   | Body | Array   | Scheduled auto backup list |
| backupSchedules.backupWndBgnTime  | Body | String  | Backup started time        |
| backupSchedules.backupWndDuration | Body | Enum    | Backup duration            |

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
    "ftwrlWaitTimeout": 1800,
    "backupRetryCount": 0,
    "replicationRegion": null,
    "useBackupLock": false,
    "backupSchedules": [
        {
            "backupWndBgnTime": "00:00:00",
            "backupWndDuration": "ONE_HOUR_AND_HALF"
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

| Name                              | Type | Format  | Required | Description                                                                                                                                                                                                                                                               |
|-----------------------------------|------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                      | URL  | UUID    | O        | DB instance identifier                                                                                                                                                                                                                                                    |
| backupPeriod                      | Body | Number  | X        | Backup retention period<br/>- Minimum value: `0`<br/>- Maximum value: `730`                                                                                                                                                                                               |
| ftwrlWaitTimeout                  | Body | Number  | X        | Query latency (sec)<br/>- Minimum value: `0`<br/>- Maximum value: `21600`                                                                                                                                                                                                 |
| backupRetryCount                  | Body | Number  | X        | Number of backup retries<br/>- Minimum value: `0`<br/>- Maximum value: `10`                                                                                                                                                                                               |
| useBackupLock                     | Body | Boolean | X        | Whether to use table lock                                                                                                                                                                                                                                                 |
| backupSchedules                   | Body | Array   | X        | Scheduled auto backup list                                                                                                                                                                                                                                                |
| backupSchedules.backupWndBgnTime  | Body | String  | O        | Backup started time<br/>- Example: `00:00:00`                                                                                                                                                                                                                             |
| backupSchedules.backupWndDuration | Body | Enum    | O        | Backup duration<br/>Auto backup proceeds within duration from backup start time.<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hour<br/>- `TWO_HOURS`: 2 hour<br/>- `TWO_HOURS_AND_HALF`: 2.5 hour<br/>- `THREE_HOURS`: 3 hour |

<details><summary>Example</summary>
<p>

```json
{
    "backupPeriod": 5,
    "useBackupLock": true,
    "backupSchedules": [
        {
            "backupWndBgnTime": "01:00:00",
            "backupWndDuration": "TWO_HOURS"
        }
    ]
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### List Network Information

```http
GET /v3.0/db-instances/{dbInstanceId}/network-info
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name                   | Type | Format | Description                                                                                                                                                                                                |
|------------------------|------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| availabilityZone       | Body | Enum   | Availability zone where DB instance will be created                                                                                                                                                        |
| subnet                 | Body | Object | Subnet object                                                                                                                                                                                              |
| subnet.subnetId        | Body | UUID   | Subnet identifier                                                                                                                                                                                          |
| subnet.subnetName      | Body | UUID   | Name to identify subnets                                                                                                                                                                                   |
| subnet.subnetCidr      | Body | UUID   | CIDR of subnet                                                                                                                                                                                             |
| endPoints              | Body | Array  | List of access information                                                                                                                                                                                 |
| endPoints.domain       | Body | String | Domain                                                                                                                                                                                                     |
| endPoints.ipAddress    | Body | String | IP address                                                                                                                                                                                                 |
| endPoints.endPointType | Body | Enum   | Access information type<br>-`EXTERNAL`: External access domain<br>-`INTERNAL`: Internal access domain<br>-`PUBLIC`: (Deprecated) External access domain<br>-`PRIVATE`: (Deprecated) Internal access domain |

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
        "subnetId": "bd453789-34ae-416c-9f78-05b9e43a46be",
        "subnetName": "Default Network",
        "subnetCidr": "192.168.0.0/16"
    },
    "endPoints": [
        {
            "domain": "ea548a78-d85f-43b4-8ddf-c88d999b9905.internal.kr1.mariadb.rds.nhncloudservice.com",
            "ipAddress": "192.168.0.2",
            "endPointType": "INTERNAL"
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

| Name            | Type | Format  | Required | Description                         |
|-----------------|------|---------|----------|-------------------------------------|
| dbInstanceId    | URL  | UUID    | O        | DB instance identifier              |
| usePublicAccess | Body | Boolean | O        | External access is available or not |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### List DB Users

```http
GET /v3.0/db-instances/{dbInstanceId}/db-users
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name                         | Type | Format   | Description                                                                                                                                                              |
|------------------------------|------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbUsers                      | Body | Array    | DB users                                                                                                                                                                 |
| dbUsers.dbUserId             | Body | UUID     | DB user identifier                                                                                                                                                       |
| dbUsers.dbUserName           | Body | String   | DB user account name                                                                                                                                                     |
| dbUsers.host                 | Body | String   | DB user account host name                                                                                                                                                |
| dbUsers.authorityType        | Body | Enum     | DB user permission type<br/>- `READ`: Permission to execute SELECT query<br/>- `CRUD`: Permission to execute DML query<br/>- `DDL`: Permission to execute DDL query<br/> |
| dbUsers.dbUserStatus         | Body | Enum     | DB user current status<br/>- `STABLE`: Created<br/>(CREATING: Creating,<br/>- `UPDATING`: Modifying<br/>DELETING: Deleting,<br/>- `DELETED`: Deleted                     |
| dbUsers.createdYmdt          | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                       |
| dbUsers.updatedYmdt          | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                      |

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
            "dbUserId": "4b3d530b-fd02-4d59-a620-83d019a67bbb",
            "dbUserName": "db-user",
            "host": "%",
            "authorityType": "DDL",
            "dbUserStatus": "STABLE",
            "createdYmdt": "2023-03-17T14:02:29+09:00",
            "updatedYmdt": "2023-03-17T14:02:31+09:00"
        }
    ]
}
```

</p>
</details>

---

### Create DB User

```http
POST /v3.0/db-instances/{dbInstanceId}/db-users
```

#### Request

| Name                 | Type | Format | Required | Description                                                                                                                                                              |
|----------------------|------|--------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId         | URL  | UUID   | O        | DB instance identifier                                                                                                                                                   |
| dbUserName           | Body | String | O        | DB user account name<br/>- Minimum length: `1`<br/>- Maximum length: `32`                                                                                                |
| dbPassword           | Body | String | O        | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `16`                                                                                            |
| host                 | Body | String | O        | DB user account host name<br/>- Example: `1.1.1.%`                                                                                                                       |
| authorityType        | Body | Enum   | O        | DB user permission type<br/>- `READ`: Permission to execute SELECT query<br/>- `CRUD`: Permission to execute DML query<br/>- `DDL`: Permission to execute DDL query<br/> |

<details><summary>Example</summary>
<p>

```json
{
    "dbUserName": "db-user",
    "dbPassword": "password",
    "host": "1.1.1.%",
    "authorityType": "CRUD"
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Modify DB User

```http
PUT /v3.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Request

| Name                 | Type | Format | Required | Description                                                                                                                                                              |
|----------------------|------|--------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId         | URL  | UUID   | O        | DB instance identifier                                                                                                                                                   |
| dbUserId             | URL  | UUID   | O        | DB user identifier                                                                                                                                                       |
| dbPassword           | Body | String | X        | DB user account password<br/>- Minimum length: `4`<br/>- Maximum length: `16`                                                                                            |
| authorityType        | Body | Enum   | X        | DB user permission type<br/>- `READ`: Permission to execute SELECT query<br/>- `CRUD`: Permission to execute DML query<br/>- `DDL`: Permission to execute DDL query<br/> |

<details><summary>Example</summary>
<p>

```json
{
    "authorityType": "DDL"
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Delete DB User

```http
DELETE /v3.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |
| dbUserId     | URL  | UUID   | O        | DB user identifier     |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### List DB Schema

```http
GET /v3.0/db-instances/{dbInstanceId}/db-schemas
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |

#### Response

| Name                     | Type | Format   | Description                                                                                                                  |
|--------------------------|------|----------|------------------------------------------------------------------------------------------------------------------------------|
| dbSchemas                | Body | Array    | DB schema list                                                                                                               |
| dbSchemas.dbSchemaId     | Body | UUID     | DB schema identifier                                                                                                         |
| dbSchemas.dbSchemaName   | Body | String   | DB schema name                                                                                                               |
| dbSchemas.dbSchemaStatus | Body | Enum     | DB instance current status<br/>- `STABLE`: Created<br/>(CREATING: Creating,<br/>DELETING: Deleting,<br/>- `DELETED`: Deleted |
| dbSchemas.createdYmdt    | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                           |

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
            "dbSchemaId": "7c9a94b8-86c1-435d-8af2-82a5e9d53fd4",
            "dbSchemaName": "schema",
            "dbSchemaStatus": "STABLE",
            "createdYmdt": "2023-03-20T13:37:45+09:00"
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

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |
| dbSchemaName | Body | String | O        | DB schema name         |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Delete DB Schema

```http
DELETE /v3.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### Request

This API does not require a request body.

| Name         | Type | Format | Required | Description            |
|--------------|------|--------|----------|------------------------|
| dbInstanceId | URL  | UUID   | O        | DB instance identifier |
| dbSchemaId   | URL  | UUID   | O        | DB schema identifier   |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### List Log Files

```http
GET /v3.0/db-instances/{dbInstanceId}/log-files
```

#### Request

This API does not require a request body.

| Name         | Type  | Format | Required | Description                                                                                                                                                                                         |
|--------------|-------|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId | URL   | UUID   | O        | DB instance identifier                                                                                                                                                                              |
| logFileTypes | Query | Array  | X        | Log File type list<br/>- `ERROR`: error.log<br/>- `BINLOG`: mysql-bin<br/>- `GENERAL`: general.log<br/>- `SLOW_QUERY`: slow_query.log<br/>- `AUDIT`: server_audit.log<br/>- `BACKUP`: xtra_full.log |

#### Response

| Name                 | Type | Format   | Description                                                                                                                                                                                    |
|----------------------|------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| logFiles             | Body | Array    | Log File list                                                                                                                                                                                  |
| logFiles.logFileName | Body | String   | Log File name                                                                                                                                                                                  |
| logFiles.logFileType | Body | Enum     | Log File type<br/>- `ERROR`: error.log<br/>- `BINLOG`: mysql-bin<br/>- `GENERAL`: general.log<br/>- `SLOW_QUERY`: slow_query.log<br/>- `AUDIT`: server_audit.log<br/>- `BACKUP`: xtra_full.log |
| logFiles.logFileSize | Body | Number   | Log File size(Byte)                                                                                                                                                                            |
| logFiles.createdYmdt | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                             |


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
            "logFileName": "xtra_full.log-20230317",
            "logFileType": "BACKUP",
            "logFileSize": 4096,
            "createdYmdt": "2023-03-17T14:02:29+09:00"
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

| Name            | Type | Format | Required | Description                                              |
|-----------------|------|--------|----------|----------------------------------------------------------|
| dbInstanceId    | URL  | UUID   | O        | DB instance identifier                                   |
| logFileNames    | Body | Array  | O        | Log File name list<br/>- Minimum size: `1`               |
| tenantId        | Body | String | O        | Tenant ID of object storage to store log file            |
| username        | Body | String | O        | NHN Cloud account or IAM member ID                       |
| password        | Body | String | O        | API password for object storage where log file is stored |
| targetContainer | Body | String | O        | Object storage container where log file is stored        |
| objectPath      | Body | String | O        | Log file path to be stored in container                  |

<details><summary>Example</summary>
<p>

```json
{
    "logFileNames": ["xtra_full.log-20230317"],
    "tenantId": "399631c404744dbbb18ce4fa2dc71a5a",
    "username": "gildong.hong@nhn.com",
    "password": "password",
    "targetContainer": "/container",
    "objectPath": "logs/backup"
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

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

| Name         | Type  | Format | Required | Description                                                                          |
|--------------|-------|--------|----------|--------------------------------------------------------------------------------------|
| page         | Query | Number | O        | Page to retrieve<br/>- Minimum value: `1`                                            |
| size         | Query | Number | O        | Page size to retrieve<br/>- Minimum value: `1`<br/>- Maximum value: `100`            |
| backupType   | Query | Enum   | X        | Backup type<br/>- `AUTO`: Automatic<br/>- `MANUAL`:  Manual<br/>- Default value: All |
| dbInstanceId | Query | UUID   | X        | Original DB instance identifier                                                      |
| dbVersion    | Query | Enum   | X        | DB engine type                                                                       |

#### Response

| Name                 | Type | Format   | Description                                         |
|----------------------|------|----------|-----------------------------------------------------|
| totalCounts          | Body | Number   | Number of all backup lists                          |
| backups              | Body | Array    | Backup list                                         |
| backups.backupId     | Body | UUID     | Backup identifier                                   |
| backups.backupName   | Body | String   | Name to identify backups                            |
| backups.backupStatus | Body | Enum     | Backup current status                               |
| backups.dbInstanceId | Body | UUID     | Original DB instance identifier                     |
| backups.dbVersion    | Body | Enum     | DB engine type                                      |
| backups.backupType   | Body | Enum     | Backup type                                         |
| backups.backupSize   | Body | Number   | Backup size (Byte)                                  |
| createdYmdt          | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)  |
| updatedYmdt          | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
            "backupId": "0017f136-3e01-4530-94aa-20661afe6632",
            "backupName": "backup",
            "backupStatus": "COMPLETED",
            "dbInstanceId": "142e6ccc-3bfb-4e1e-84f7-38861284fafd",
            "dbVersion": "MARIADB_V10330",
            "backupType": "AUTO",
            "backupSize": 4996786,
            "createdYmdt": "2023-02-21T00:35:00+09:00",
            "updatedYmdt": "2023-02-22T00:35:32+09:00"
        }
    ]
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

| Name            | Type | Format | Required | Description                                            |
|-----------------|------|--------|----------|--------------------------------------------------------|
| backupId        | URL  | UUID   | O        | Backup identifier                                      |
| tenantId        | Body | String | O        | Tenant ID of object storage to store backup            |
| username        | Body | String | O        | NHN Cloud account or IAM member ID                     |
| password        | Body | String | O        | API password for object storage where backup is stored |
| targetContainer | Body | String | O        | Object storage container where backup is stored        |
| objectPath      | Body | String | O        | Backup path to be stored in container                  |

<details><summary>Example</summary>
<p>

```json
{
    "tenantId": "399631c404744dbbb18ce4fa2dc71a5a",
    "username": "gildong.hong@nhn.com",
    "password": "password",
    "targetContainer": "/container",
    "objectPath": "/backups/backup_file"
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Restore Backup

```http
POST /v3.0/backups/{backupId}/restore
```

#### Request

| Name                                     | Type | Format  | Required | Description                                                                                                                                                                                                                                                               |
|------------------------------------------|------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| backupId                                 | URL  | UUID    | O        | Backup identifier                                                                                                                                                                                                                                                         |
| dbInstanceName                           | Body | String  | O        | Name to identify DB instances                                                                                                                                                                                                                                             |
| description                              | Body | String  | X        | Additional information on DB instances                                                                                                                                                                                                                                    |
| dbFlavorId                               | Body | UUID    | O        | Identifier of DB instance specifications                                                                                                                                                                                                                                  |
| dbPort                                   | Body | Integer | O        | DB port<br/>- Minimum value: `3306`<br/>- Maximum value: `43306`                                                                                                                                                                                                          |
| parameterGroupId                         | Body | UUID    | O        | Parameter group identifier                                                                                                                                                                                                                                                |
| dbSecurityGroupIds                       | Body | Array   | X        | DB security group identifiers                                                                                                                                                                                                                                             ||network|Body|Object|O|Network information objects|
| userGroupIds                             | Body | Array   | X        | User group identifiers                                                                                                                                                                                                                                                    |
| useHighAvailability                      | Body | Boolean | X        | Whether to use high availability<br/>Default: `false`                                                                                                                                                                                                                     |
| pingInterval                             | Body | Number  | X        | Ping interval (sec) when using high availability<br/>Default: `6`<br/>- Minimum value: `1`<br/>- Maximum value: `600`                                                                                                                                                     |
| useDefaultNotification                   | Body | Boolean | X        | Whether to use default notification<br/>Default: `false`                                                                                                                                                                                                                  |
| useDeletionProtection                    | Body | Boolean | X        | Whether to protect against deletion<br/>Default: `false`                                                                                                                                                                                                                  | 
| network                                  | Body | Object  | O        | Network information objects                                                                                                                                                                                                                                               |
| network.subnetId                         | Body | UUID    | O        | Subnet identifier                                                                                                                                                                                                                                                         |
| network.usePublicAccess                  | Body | Boolean | X        | External access is available or not<br/>Default: `false`                                                                                                                                                                                                                  |
| network.availabilityZone                 | Body | Enum    | O        | Availability zone where DB instance will be created<br/>- Example: `kr-pub-a`                                                                                                                                                                                             |
| storage                                  | Body | Object  | O        | Storage information objects                                                                                                                                                                                                                                               |    
| storage.storageType                      | Body | Enum    | O        | Block Storage Type<br/>- Example: `General SSD`                                                                                                                                                                                                                           |
| storage.storageSize                      | Body | Number  | O        | Block Storage Size (GB)<br/>- Minimum value: `20`<br/>- Maximum value: `2048`                                                                                                                                                                                             |
| backup                                   | Body | Object  | O        | Backup information objects                                                                                                                                                                                                                                                |
| backup.backupPeriod                      | Body | Number  | O        | Backup retention period<br/>- Minimum value: `0`<br/>- Maximum value: `730`                                                                                                                                                                                               |
| backup.ftwrlWaitTimeout                  | Body | Number  | X        | Query latency (sec)<br/>Default: `6`<br/>- Minimum value: `0`<br/>- Maximum value: `21600`                                                                                                                                                                                |
| backup.backupRetryCount                  | Body | Number  | X        | Number of backup retries<br/>Default: `6`<br/>- Minimum value: `0`<br/>- Maximum value: `10`                                                                                                                                                                              |
| backup.useBackupLock                     | Body | Boolean | X        | Whether to use table lock<br/>Default: `true`                                                                                                                                                                                                                             |
| backup.backupSchedules                   | Body | Array   | O        | Scheduled auto backup list                                                                                                                                                                                                                                                |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | O        | Backup started time<br/>- Example: `00:00:00`                                                                                                                                                                                                                             |
| backup.backupSchedules.backupWndDuration | Body | Enum    | O        | Backup duration<br/>Auto backup proceeds within duration from backup start time.<br/>- `HALF_AN_HOUR`: 30 minutes<br/>- `ONE_HOUR`: 1 hour<br/>- `ONE_HOUR_AND_HALF`: 1.5 hour<br/>- `TWO_HOURS`: 2 hour<br/>- `TWO_HOURS_AND_HALF`: 2.5 hour<br/>- `THREE_HOURS`: 3 hour |

<details><summary>Example</summary>
<p>

```json

{
    "dbInstanceName": "db-instance-restore",
    "dbFlavorId": "50be6d9c-02d6-4594-a2d4-12010eb65ec0",
    "dbPort": 10000,
    "parameterGroupId": "132d383c-38e3-468a-a826-5e9a8fff15d0",
    "network": {
        "subnetId": "e721a9dd-dad0-4cf0-a53b-dd654ebfc683",
        "availabilityZone": "kr-pub-a"
    },
    "storage": {
        "storageType": "General SSD",
        "storageSize": 20
    },
    "backup": {
        "backupPeriod": 1,
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

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Delete Backup

```http
DELETE /v3.0/backups/{backupId}
```

#### Request

This API does not require a request body.

| Name     | Type | Format | Required | Description       |
|----------|------|--------|----------|-------------------|
| backupId | URL  | UUID   | O        | Backup identifier |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

## DB Security Group

### DB Security Group Progress

| Status          | Description         |
|-----------------|---------------------|
| `NONE`          | No task in progress |
| `CREATING_RULE` | Creating rules      |
| `UPDATING_RULE` | Modifying rules     |
| `DELETING_RULE` | Deleting rules      |

### List DB Security Groups

```http
GET /v3.0/db-security-groups
```

#### Request

This API does not require a request body.

#### Response

| Name                                 | Type | Format   | Description                                         |
|--------------------------------------|------|----------|-----------------------------------------------------|
| dbSecurityGroups                     | Body | Array    | DB security groups                                  |
| dbSecurityGroups.dbSecurityGroupId   | Body | UUID     | DB security group identifier                        |
| dbSecurityGroups.dbSecurityGroupName | Body | String   | Name to identify DB instances                       |
| dbSecurityGroups.description         | Body | String   | Additional information on DB security group         |
| dbSecurityGroups.progressStatus      | Body | Enum     | Current status of DB security group                 |
| dbSecurityGroups.createdYmdt         | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)  |
| dbSecurityGroups.updatedYmdt         | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
            "dbSecurityGroupId": "fe4f2aee-afbb-4c19-a5e9-eb2eab394708",
            "dbSecurityGroupName": "dbSecurityGroup",
            "description": "description",
            "progressStatus": "NONE",
            "createdYmdt": "2023-02-19T19:18:13+09:00",
            "updatedYmdt": "2022-02-19T19:18:13+09:00"
        }
    ]
}
```

</p>
</details>

---

### List DB Security Group Details

```http
GET /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### Request

This API does not require a request body.

| Name              | Type | Format | Required | Description                  |
|-------------------|------|--------|----------|------------------------------|
| dbSecurityGroupId | URL  | UUID   | O        | DB security group identifier |

#### Response

| Name                | Type | Format   | Description                                                                                                                                              |
|---------------------|------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId   | Body | UUID     | DB security group identifier                                                                                                                             |
| dbSecurityGroupName | Body | String   | Name to identify DB instances                                                                                                                            |
| description         | Body | String   | Additional information on DB security group                                                                                                              |
| progressStatus      | Body | Enum     | Current status of DB security group                                                                                                                      |
| rules               | Body | Array    | DB security group rules                                                                                                                                  |
| rules.ruleId        | Body | UUID     | DB security group rule identifier                                                                                                                        |
| rules.description   | Body | String   | Additional information on DB security group rule                                                                                                         |
| rules.direction     | Body | Enum     | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound                                                                                |
| rules.etherType     | Body | Enum     | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                         |
| rules.port          | Body | Object   | Port object                                                                                                                                              |
| rules.port.portType | Body | Enum     | Port type<br/>- `DB_PORT`: Sets to DB instance port value.<br/>- `PORT`: Sets to specified port value.<br/>- `PORT_RANGE`: Sets to specified port range. |
| rules.port.minPort  | Body | Number   | Minimum port range                                                                                                                                       |
| rules.port.maxPort  | Body | Number   | Maximum port range                                                                                                                                       |
| rules.cidr          | Body | String   | Remote source for traffic to allow                                                                                                                       |
| rules.createdYmdt   | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                       |
| rules.updatedYmdt   | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                      |
| createdYmdt         | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                       |
| updatedYmdt         | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                      |

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
        "dbSecurityGroupId": "fe4f2aee-afbb-4c19-a5e9-eb2eab394708",
        "dbSecurityGroupName": "dbSecurityGroup",
        "description": "description",
        "progressStatus": "NONE",
        "rules": [
            {
                "ruleId": "17c88ef6-95f1-4678-84f9-fee1b22e250d",
                "description": "description",
                "direction": "INGRESS",
                "etherType": "IPV4",
                "port": {
                    "portType": "PORT_RANGE",
                    "minPort": 10000,
                    "maxPort": 10005
                },
                "cidr": "0.0.0.0/0",
                "createdYmdt": "2023-02-19T19:18:13+09:00",
                "updatedYmdt": "2023-02-19T19:18:13+09:00"
            }
        ],
        "createdYmdt": "2023-02-19T19:18:13+09:00",
        "updatedYmdt": "2023-02-19T19:18:13+09:00"
    }
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

| Name                | Type | Format | Required | Description                                                                                                                                                                                                                      |
|---------------------|------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupName | Body | String | O        | Name to identify DB instances                                                                                                                                                                                                    |
| description         | Body | String | X        | Additional information on DB security group                                                                                                                                                                                      |
| rules               | Body | Array  | O        | DB security group rules                                                                                                                                                                                                          |
| rules.description   | Body | String | X        | Additional information on DB security group rule                                                                                                                                                                                 |
| rules.direction     | Body | Enum   | O        | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound                                                                                                                                                        |
| rules.etherType     | Body | Enum   | O        | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                                                                 |
| rules.cidr          | Body | String | O        | Remote source for traffic to allow<br/>- Example: `1.1.1.1/32`                                                                                                                                                                   |
| rules.port          | Body | Object | O        | Port object                                                                                                                                                                                                                      |
| rules.port.portType | Body | Enum   | O        | Port type<br/>- `DB_PORT`: Sets to DB instance port value. Values for `minPort` 값과 `maxPort` are not required.<br/>- `PORT`: 지정된 포트값으로 설정됩니다. `minPort`값과 `maxPort`값이 같아야 합니다.<br/>- `PORT_RANGE`: Sets to specified port range. |
| rules.port.minPort  | Body | Number | X        | Minimum port range<br/>- Minimum value: 1                                                                                                                                                                                        |
| rules.port.maxPort  | Body | Number | X        | Maximum port range<br/>- Maximum value: 65535                                                                                                                                                                                    |

<details><summary>Example</summary>
<p>

```json
{
    "dbSecurityGroupName": "dbSecurityGroup",
    "description": "description",
    "rules": [
        {
            "direction": "INGRESS",
            "etherType": "IPV4",
            "port": {
                "portType": "PORT_RANGE",
                "minPort": 10000,
                "maxPort": 10005
            },
            "cidr": "0.0.0.0/0"
        }
    ]
}
```

</p>
</details>

#### Response

| Name              | Type | Format | Description                  |
|-------------------|------|--------|------------------------------|
| dbSecurityGroupId | Body | UUID   | DB security group identifier |

---

### Modify DB Security Group

```http
PUT /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### Request

| Name                | Type | Format | Required | Description                                 |
|---------------------|------|--------|----------|---------------------------------------------|
| dbSecurityGroupId   | URL  | UUID   | O        | DB security group identifier                |
| dbSecurityGroupName | Body | String | X        | Name to identify DB instances               |
| description         | Body | String | X        | Additional information on DB security group |

<details><summary>Example</summary>
<p>

```json
{
    "dbSecurityGroupName": "dbSecurityGroup",
    "description": "description"
}
```

</p>
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
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

| Name              | Type | Format | Required | Description                  |
|-------------------|------|--------|----------|------------------------------|
| dbSecurityGroupId | URL  | UUID   | O        | DB security group identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

</p>
</details>

---

### Create DB Security Group

```http
POST /v3.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Request

| Name              | Type | Format | Required | Description                                                                                                                                                                                                                      |
|-------------------|------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O        | DB security group identifier                                                                                                                                                                                                     |
| description       | Body | String | X        | Additional information on DB security group rule                                                                                                                                                                                 |
| direction         | Body | Enum   | O        | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound                                                                                                                                                        |
| etherType         | Body | Enum   | O        | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                                                                 |
| port              | Body | Object | O        | Port object                                                                                                                                                                                                                      |
| port.portType     | Body | Enum   | O        | Port type<br/>- `DB_PORT`: Sets to DB instance port value. Values for `minPort` 값과 `maxPort` are not required.<br/>- `PORT`: 지정된 포트값으로 설정됩니다. `minPort`값과 `maxPort`값이 같아야 합니다.<br/>- `PORT_RANGE`: Sets to specified port range. |
| port.minPort      | Body | Number | X        | Minimum port range<br/>- Minimum value: 1                                                                                                                                                                                        |
| port.maxPort      | Body | Number | X        | Maximum port range<br/>- Maximum value: 65535                                                                                                                                                                                    |
| cidr              | Body | String | O        | Remote source for traffic to allow<br/>- Example: `1.1.1.1/32`                                                                                                                                                                   |

<details><summary>Example</summary>
<p>

```json
{
    "direction": "INGRESS",
    "etherType": "IPV4",
    "port": {
        "portType": "PORT",
        "minPort": 10000,
        "maxPort": 10000
    },
    "cidr": "0.0.0.0/0"
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Modify DB Security Group Rule

```http
PUT /v3.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### Request

| Name              | Type | Format | Required | Description                                                                                                                                                                                                                      |
|-------------------|------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O        | DB security group identifier                                                                                                                                                                                                     |
| ruleId            | URL  | UUID   | O        | DB security group rule identifier                                                                                                                                                                                                |
| description       | Body | String | X        | Additional information on DB security group rule                                                                                                                                                                                 |
| direction         | Body | Enum   | O        | Communication direction<br/>- `INGRESS`: Inbound<br/>- `EGRESS`: Outbound                                                                                                                                                        |
| etherType         | Body | Enum   | O        | Ether type<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                                                                 |
| port              | Body | Object | O        | Port object                                                                                                                                                                                                                      |
| port.portType     | Body | Enum   | O        | Port type<br/>- `DB_PORT`: Sets to DB instance port value. Values for `minPort` 값과 `maxPort` are not required.<br/>- `PORT`: 지정된 포트값으로 설정됩니다. `minPort`값과 `maxPort`값이 같아야 합니다.<br/>- `PORT_RANGE`: Sets to specified port range. |
| port.minPort      | Body | Number | X        | Minimum port range<br/>- Minimum value: 1                                                                                                                                                                                        |
| port.maxPort      | Body | Number | X        | Maximum port range<br/>- Maximum value: 65535                                                                                                                                                                                    |
| cidr              | Body | String | O        | Remote source for traffic to allow<br/>- Example: `1.1.1.1/32`                                                                                                                                                                   |

<details><summary>Example</summary>
<p>

```json
{
    "direction": "INGRESS",
    "etherType": "IPV4",
    "port": {
        "portType": "DB_PORT"
    },
    "cidr": "0.0.0.0/0"
}
```

</p>
</details>

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

### Delete DB Security Group Rule

```http
DELETE /v3.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### Request

This API does not require a request body.

| Name              | Type  | Format | Required | Description                        |
|-------------------|-------|--------|----------|------------------------------------|
| dbSecurityGroupId | URL   | UUID   | O        | DB security group identifier       |
| ruleIds           | Query | Array  | O        | DB security group rule identifiers |

#### Response

| Name  | Type | Format | Description                  |
|-------|------|--------|------------------------------|
| jobId | Body | UUID   | Identifier of requested task |

---

## Parameter group

### List Parameter Groups

```http
GET /v3.0/parameter-groups
```

#### Request

This API does not require a request body.

| Name      | Type  | Format | Required | Description    |
|-----------|-------|--------|----------|----------------|
| dbVersion | Query | Enum   | X        | DB engine type |

#### Response

| Name                                 | Type | Format   | Description                                                                                 |
|--------------------------------------|------|----------|---------------------------------------------------------------------------------------------|
| parameterGroups                      | Body | Array    | Parameter groups                                                                            |
| parameterGroups.parameterGroupId     | Body | UUID     | Parameter group identifier                                                                  |
| parameterGroups.parameterGroupName   | Body | String   | Name to identify parameter groups                                                           |
| parameterGroups.description          | Body | String   | Additional information on parameter group                                                   |
| parameterGroups.dbVersion            | Body | Enum     | DB engine type                                                                              |
| parameterGroups.parameterGroupStatus | Body | Enum     | Parameter group current status<br/>- `STABLE`: Applied<br/>- `NEED_TO_APPLY`: Need to apply |
| parameterGroups.createdYmdt          | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                          |
| parameterGroups.updatedYmdt          | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                         |

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
            "parameterGroupId": "404e8a89-ca4d-4fca-96c2-1518754d50b7",
            "parameterGroupName": "parameter-group",
            "description": null,
            "dbVersion": "MARIADB_V10330",
            "parameterGroupStatus": "STABLE",
            "createdYmdt": "2023-02-31T15:28:17+09:00",
            "updatedYmdt": "2023-02-31T15:28:17+09:00"
        }
    ]
}
```

</p>
</details>


---

### List Parameter Group Details

```http
GET /v3.0/parameter-groups/{parameterGroupId}
```

#### Request

This API does not require a request body.

| Name             | Type | Format | Required | Description                |
|------------------|------|--------|----------|----------------------------|
| parameterGroupId | URL  | UUID   | O        | Parameter group identifier |

#### Response

| Name                          | Type | Format   | Description                                                                                                                                           |
|-------------------------------|------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| parameterGroupId              | Body | UUID     | Parameter group identifier                                                                                                                            |
| parameterGroupName            | Body | String   | Name to identify parameter groups                                                                                                                     |
| description                   | Body | String   | Additional information on parameter group                                                                                                             |
| dbVersion                     | Body | Enum     | DB engine type                                                                                                                                        |
| parameterGroupStatus          | Body | Enum     | Parameter group current status<br/>- `STABLE`: Applied<br/>- `NEED_TO_APPLY`: Need to apply                                                           |
| parameters                    | Body | Array    | Parameter list                                                                                                                                        |
| parameters.parameterId        | Body | UUID     | Parameter identifier                                                                                                                                  |
| parameters.parameterFileGroup | Body | Enum     | Parameter file group type<br/>- `CLIENT`: client<br/>- `MYSQL`: mysql<br/>- `MYSQLD`: mysqld                                                          |
| parameters.parameterName      | Body | String   | Parameter name                                                                                                                                        |
| parameters.fileParameterName  | Body | String   | Parameter file name                                                                                                                                   |
| parameters.value              | Body | String   | Current value                                                                                                                                         |
| parameters.defaultValue       | Body | String   | Default value                                                                                                                                         |
| parameters.allowedValue       | Body | String   | Permitted values                                                                                                                                      |
| parameters.updateType         | Body | Enum     | Modify type<br/>- `VARIABLE`: Modifiable any time<br/>- `CONSTANT`: Not modifiable<br/>- `INIT_VARIABLE`: Only modifiable when DB instance is created |
| parameters.applyType          | Body | Enum     | Apply type<br/>- `SESSION`: Apply session<br/>- `FILE`: Apply setting file (restart required)<br/>- `BOTH`: All (restart required)                    |
| createdYmdt                   | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                    |
| updatedYmdt                   | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                   |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "404e8a89-ca4d-4fca-96c2-1518754d50b7",
    "parameterGroupName": "parameter-group",
    "description": null,
    "dbVersion": "MARIADB_V10330",
    "parameterGroupStatus": "STABLE",
    "parameters": [
        {
            "parameterId": "fa040b5e-f29f-46de-8f0d-bba4cb82887a",
            "parameterFileGroup": "client",
            "parameterName": "socket",
            "fileParameterName": "socket",
            "value": "/home/tcrds/db/mysql/tmp/mysql.sock",
            "defaultValue": "/home/tcrds/db/mysql/tmp/mysql.sock",
            "allowedValue": "",
            "updateType": "CONSTANT",
            "applyType": "BOTH"
        }
    ],
    "createdYmdt": "2023-03-13T11:02:28+09:00",
    "updatedYmdt": "2023-03-13T11:02:28+09:00"
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

| Name               | Type | Format | Required | Description                               |
|--------------------|------|--------|----------|-------------------------------------------|
| parameterGroupName | Body | String | O        | Name to identify parameter groups         |
| description        | Body | String | X        | Additional information on parameter group |
| dbVersion          | Body | Enum   | O        | DB engine type                            |

<details><summary>Example</summary>
<p>

```json
{
    "parameterGroupName": "parameter-group",
    "dbVersion": "MARIADB_V10330"
}
```

</p>
</details>

#### Response

| Name             | Type | Format | Description                |
|------------------|------|--------|----------------------------|
| parameterGroupId | Body | UUID   | Parameter group identifier |

---

### Copy Parameter Group

```http
POST /v3.0/parameter-groups/{parameterGroupId}/copy
```

#### Request

| Name               | Type | Format | Required | Description                               |
|--------------------|------|--------|----------|-------------------------------------------|
| parameterGroupId   | URL  | UUID   | O        | Parameter group identifier                |
| parameterGroupName | Body | String | O        | Name to identify parameter groups         |
| description        | Body | String | X        | Additional information on parameter group |

<details><summary>Example</summary>
<p>

```json
{
    "parameterGroupName": "parameter-group-copy",
    "description": "copy"
}
```

</p>
</details>

#### Response

| Name             | Type | Format | Description                |
|------------------|------|--------|----------------------------|
| parameterGroupId | Body | UUID   | Parameter group identifier |

---

### Modify Parameter Group

```http
PUT /v3.0/parameter-groups/{parameterGroupId}
```

#### Request

| Name               | Type | Format | Required | Description                               |
|--------------------|------|--------|----------|-------------------------------------------|
| parameterGroupId   | URL  | UUID   | O        | Parameter group identifier                |
| parameterGroupName | Body | String | X        | Name to identify parameter groups         |
| description        | Body | String | X        | Additional information on parameter group |

<details><summary>Example</summary>
<p>

```json
{
    "parameterGroupName": "parameter-group"
}
```

</p>
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
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

| Name                           | Type | Format | Required | Description                |
|--------------------------------|------|--------|----------|----------------------------|
| parameterGroupId               | URL  | UUID   | O        | Parameter group identifier |
| modifiedParameters             | Body | Array  | O        | Parameters to change       |
| modifiedParameters.parameterId | Body | UUID   | O        | Parameter identifier       |
| modifiedParameters.value       | Body | String | O        | Parameter value to change  |

<details><summary>Example</summary>
<p>

```json
{
    "modifiedParameters": [
        {
            "parameterId": "3abac558-7274-44e1-9f4a-f100f53f67ba",
            "value": "0"
        }
    ]
}
```

</p>
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

</p>
</details>

---

### Reset Parameter Group

```http
PUT /v3.0/parameter-groups/{parameterGroupId}/reset
```

#### Request

| Name             | Type | Format | Required | Description                |
|------------------|------|--------|----------|----------------------------|
| parameterGroupId | URL  | UUID   | O        | Parameter group identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
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

| Name             | Type | Format | Required | Description                |
|------------------|------|--------|----------|----------------------------|
| parameterGroupId | URL  | UUID   | O        | Parameter group identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

</p>
</details>

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
| userGroups               | Body | Array    | User Groups                                         |
| userGroups.userGroupId   | Body | UUID     | User group identifier                               |
| userGroups.userGroupName | Body | String   | Name to identify user groups                        |
| userGroups.createdYmdt   | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)  |
| userGroups.updatedYmdt   | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
            "userGroupId": "1aac0437-f32d-4923-ad3c-ac61c1cfdfe0",
            "userGroupName": "dev-team",
            "createdYmdt": "2023-02-23T10:07:54+09:00",
            "updatedYmdt": "2023-02-26T01:15:50+09:00"
        }
    ]
}
```

</p>
</details>

---

### List User Group Details

```http
GET /v3.0/user-groups/{userGroupId}
```

#### Request

This API does not require a request body.

| Name        | Type | Format | Required | Description           |
|-------------|------|--------|----------|-----------------------|
| userGroupId | URL  | UUID   | O        | User group identifier |

#### Response

| Name              | Type | Format   | Description                                                                                                                                            |
|-------------------|------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| userGroupId       | Body | UUID     | User group identifier                                                                                                                                  |
| userGroupName     | Body | String   | Name to identify user groups                                                                                                                           |
| userGroupTypeCode | Body | Enum     | User group type    <br /> `ENTIRE`: User group including all project members <br /> `INDIVIDUAL_MEMBER`: User group including specific project members |
| members           | Body | Array    | Project member list                                                                                                                                    |
| members.memberId  | Body | UUID     | Project member identifier                                                                                                                              |
| createdYmdt       | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                     |
| updatedYmdt       | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                    |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "userGroupId": "1aac0437-f32d-4923-ad3c-ac61c1cfdfe0",
    "userGroupName": "dev-team",
	"userGroupTypeCode": "INDIVIDUAL_MEMBER",
    "members": [
        {
            "memberId": "1321e759-2ef3-4b85-9921-b13e918b24b5"
        }
    ],
    "createdYmdt": "2023-02-23T10:07:54+09:00",
    "updatedYmdt": "2023-02-26T01:15:50+09:00"
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
| memberIds     | Body | Array   | O        | Project member identifiers <br /> Ignored when `selectAllYN` is true        |
| selectAllYN   | Body | Boolean | X        | All project members or not <br /> If true, the group is set for all members |

<details><summary>Example</summary>
<p>

```json
{
    "userGroupName": "dev-team",
    "memberIds": [
        "1321e759-2ef3-4b85-9921-b13e918b24b5"
    ]
}
```

```json
{
    "userGroupName": "dev-team",
    "selectAllYN":true
}
```

</p>
</details>

#### Response

| Name        | Type | Format | Description           |
|-------------|------|--------|-----------------------|
| userGroupId | Body | UUID   | User group identifier |

---

### Modify User Group

```http
PUT /v3.0/user-groups/{userGroupId}
```

#### Request

| Name          | Type | Format  | Required | Description                                                                 |
|---------------|------|---------|----------|-----------------------------------------------------------------------------|
| userGroupId   | URL  | UUID    | O        | User group identifier                                                       |
| userGroupName | Body | String  | X        | Name to identify user groups                                                |
| memberIds     | Body | Array   | X        | Project member identifiers                                                  |
| selectAllYN   | Body | Boolean | X        | All project members or not <br /> If true, the group is set for all members |

<details><summary>Example</summary>
<p>

```json
{
    "userGroupName": "dev-team",
    "memberIds": [
        "1321e759-2ef3-4b85-9921-b13e918b24b5",
        "f9064b09-2b15-442e-a4b0-3a5a2754555e"
    ]
}
```

</p>
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
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

| Name        | Type | Format | Required | Description           |
|-------------|------|--------|----------|-----------------------|
| userGroupId | URL  | UUID   | O        | User group identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

</p>
</details>

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
| notificationGroups                       | Body | Array    | Notification Groups                                 |
| notificationGroups.notificationGroupId   | Body | UUID     | Notification group identifier                       |
| notificationGroups.notificationGroupName | Body | String   | Name to identify notification groups                |
| notificationGroups.notifyEmail           | Body | Boolean  | Whether to be notified by email                     |
| notificationGroups.notifySms             | Body | Boolean  | Whether to be notified by SMS                       |
| notificationGroups.isEnabled             | Body | Boolean  | Indicates whether the flavor is enabled             |
| notificationGroups.createdYmdt           | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)  |
| notificationGroups.updatedYmdt           | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

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
            "notificationGroupId": "b3901f17-9971-4d1e-8a81-8448cf533dc7",
            "notificationGroupName": "dev-team-noti",
            "notifyEmail": true,
            "notifySms": false,
            "isEnabled": true,
            "createdYmdt": "2023-02-20T13:34:13+09:00",
            "updatedYmdt": "2023-02-20T13:34:13+09:00"
        }
    ]
}
```

</p>
</details>

---

### List Notification Groups

```http
GET /v3.0/notification-groups/{notificationGroupId}
```

#### Request

This API does not require a request body.

| Name                | Type | Format | Required | Description                   |
|---------------------|------|--------|----------|-------------------------------|
| notificationGroupId | URL  | UUID   | O        | Notification group identifier |

#### Response

| Name                       | Type | Format   | Description                                         |
|----------------------------|------|----------|-----------------------------------------------------|
| notificationGroupId        | Body | UUID     | Notification group identifier                       |
| notificationGroupName      | Body | String   | Name to identify notification groups                |
| notifyEmail                | Body | Boolean  | Whether to be notified by email                     |
| notifySms                  | Body | Boolean  | Whether to be notified by SMS                       |
| isEnabled                  | Body | Boolean  | Indicates whether the flavor is enabled             |
| dbInstances                | Body | Array    | DB Instances to monitor                             |
| dbInstances.dbInstanceId   | Body | UUID     | DB instance identifier                              |
| dbInstances.dbInstanceName | Body | String   | Name to identify DB instances                       |
| userGroups                 | Body | Array    | User Groups                                         |
| userGroups.userGroupId     | Body | UUID     | User group identifier                               |
| userGroups.userGroupName   | Body | String   | Name to identify user groups                        |
| createdYmdt                | Body | DateTime | Created date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)  |
| updatedYmdt                | Body | DateTime | Modified date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroupId": "b3901f17-9971-4d1e-8a81-8448cf533dc7",
    "notificationGroupName": "dev-team-noti",
    "notifyEmail": true,
    "notifySms": false,
    "isEnabled": true,
    "dbInstances": [
        {
            "dbInstanceId": "ed5cb985-526f-4c54-9ae0-40288593de65",
            "dbInstanceName": "database"
        }
    ],
    "userGroups": [
        {
            "userGroupId": "1aac0437-f32d-4923-ad3c-ac61c1cfdfe0",
            "userGroupName": "dev-team"
        }
    ],
    "createdYmdt": "2023-02-20T13:34:13+09:00",
    "updatedYmdt": "2023-02-20T13:34:13+09:00"
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

| Name                  | Type | Format  | Required | Description                                                 |
|-----------------------|------|---------|----------|-------------------------------------------------------------|
| notificationGroupName | Body | String  | O        | Name to identify notification groups                        |
| notifyEmail           | Body | Boolean | X        | Whether to be notified by email<br/>Default: `true`         |
| notifySms             | Body | Boolean | X        | Whether to be notified by SMS<br/>Default: `true`           |
| isEnabled             | Body | Boolean | X        | Indicates whether the flavor is enabled<br/>Default: `true` |
| dbInstanceIds         | Body | Array   | O        | DB instance identifiers to monitor                          |
| userGroupIds          | Body | Array   | O        | User group identifiers                                      |

<details><summary>Example</summary>
<p>

```json
{
    "notificationGroupName": "dev-team-noti",
    "notifyEmail": false,
    "isEnable": true,
    "dbInstanceIds": [
        "ed5cb985-526f-4c54-9ae0-40288593de65"
    ],
    "userGroupIds": [
        "1aac0437-f32d-4923-ad3c-ac61c1cfdfe0"
    ]
}
```

</p>
</details>

#### Response

| Name                | Type | Format | Description                   |
|---------------------|------|--------|-------------------------------|
| notificationGroupId | Body | UUID   | Notification group identifier |

---

### Modify Notification Group

```http
PUT /v3.0/notification-groups/{notificationGroupId}
```

#### Request

| Name                  | Type | Format  | Required | Description                             |
|-----------------------|------|---------|----------|-----------------------------------------|
| notificationGroupId   | URL  | UUID    | O        | Notification group identifier           |
| notificationGroupName | Body | String  | X        | Name to identify notification groups    |
| notifyEmail           | Body | Boolean | X        | Whether to be notified by email         |
| notifySms             | Body | Boolean | X        | Whether to be notified by SMS           |
| isEnabled             | Body | Boolean | X        | Indicates whether the flavor is enabled |
| dbInstanceIds         | Body | Array   | X        | DB instance identifiers to monitor      |
| userGroupIds          | Body | Array   | X        | User group identifiers                  |

<details><summary>Example</summary>
<p>

```json
{
    "notifyEmail": true,
    "dbInstanceIds": [
        "ed5cb985-526f-4c54-9ae0-40288593de65",
        "d51b7da0-682f-47ff-b588-b739f6adc740"
    ]
}
```

</p>
</details>

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
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
| notificationGroupId | URL  | UUID   | O        | Notification group identifier |

#### Response

This API does not return a response body.

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

</p>
</details>

---

## Monitoring

### List Metric List

```http
GET /v3.0/metrics
```

#### Request

This API does not require a request body.

#### Response

| Name                | Type | Format | Description          |
|---------------------|------|--------|----------------------|
| metrics             | Body | Array  | Metric List          |
| metrics.measureName | Body | Enum   | Metric type to query |
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
            "measureName": "CPU_USAGE",
            "unit": "%"
        }
    ]
}
```

</p>
</details>

---

### View stats

```http
GET /v3.0/metric-statistics
```

#### Request

| Name         | Type  | Format   | Required | Description                                      |
|--------------|-------|----------|----------|--------------------------------------------------|
| dbInstanceId | Query | UUID     | O        | DB instance identifier                           |
| measureNames | Query | Array    | O        | Metric list to query<br/>- Minimum length: `1`   |
| from         | Query | Datetime | O        | Start date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |
| to           | Query | Datetime | O        | End date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)   |
| interval     | Query | Number   | X        | View interval                                    |

#### Response

| Name                              | Type | Format    | Description                 |
|-----------------------------------|------|-----------|-----------------------------|
| metricStatistics                  | Body | Array     | Statistics information list |
| metricStatistics.measureName      | Body | Enum      | Measure type                |
| metricStatistics.unit             | Body | String    | Measure unit                |
| metricStatistics.values           | Body | Array     | Measure values              |
| metricStatistics.values.timestamp | Body | Timestamp | Measure time                |
| metricStatistics.values.value     | Body | Object    | Measure value               |

<details><summary>Example</summary>
<p>

```json
{
    "metricStatistics": [
        {
            "measureName": "MYSQL_STATUS",
            "unit": "",
            "values": [
                [
                    1679298540,
                    "1"
                ],
                [
                    1679298600,
                    "1"
                ],
                [
                    1679298660,
                    "1"
                ]
            ]
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
| BACKUP         | Backups     |
| DB_INSTANCE    | DB Instance |
| JOB            | Jobs        |
| TENANT         | Tenant      |
| MONITORING     | Monitoring  |

### List Events

```http
GET /v3.0/events
```

#### Request

This API does not require a request body.

| Name              | Type  | Format   | Required | Description                                                                                                                                                         |
|-------------------|-------|----------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| page              | Query | Number   | O        | Page to retrieve<br/>- Minimum value: `1`                                                                                                                           |
| size              | Query | Number   | O        | Page size to retrieve<br/>- Minimum value: `1`<br/>- Maximum value: `100`                                                                                           |
| from              | Query | Datetime | O        | Start date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                    |
| to                | Query | Datetime | O        | End date and time (YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                      |
| eventCategoryType | Query | Enum     | O        | Event category types to query<br/>ALL: All<br/>- `INSTANCE`: DB instance<br/>- `BACKUP`: Backup<br/>- `DB_SECURITY_GROUP`: DB security group<br/>- `TENANT`: Tenant |
| sourceId          | Query | String   | X        | Event target resource identifier                                                                                                                                    |
| keyword           | Query | String   | X        | String keyword in event message                                                                                                                                     |
| ascendingOrder    | Query | Enum     | X        | Event message sorting order<br/>asc: Ascending order<br/>`desc`: Descending order<br/>- Default value: `DESC`                                                       |

#### Response

| Name                     | Type | Format   | Description                                               |
|--------------------------|------|----------|-----------------------------------------------------------|
| totalCounts              | Body | Number   | Total number of events                                    |
| events                   | Body | Array    | Events                                                    |
| events.eventCategoryType | Body | Enum     | Event category type                                       |
| events.eventCode         | Body | Enum     | Occurred event type                                       |
| events.sourceId          | Body | String   | Event source identifier                                   |
| events.sourceName        | Body | String   | Name to identify event sources                            |
| events.messages          | Body | Array    | Event messages                                            |
| events.messages.langCode | Body | String   | Language code                                             |
| events.messages.message  | Body | String   | Event Message                                             |
| events.eventYmdt         | Body | DateTime | Event occurred date and time (YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>Example</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "totalCounts": 28,
    "events": [
        {
            "eventCategoryType": "INSTANCE",
            "eventCode": "INSTC_02_01",
            "sourceId": "76f00947-356e-4a20-8922-428368cc45ed",
            "sourceName": "db-instance",
            "messages": [
                {
                    "langCode": "EN",
                    "message": "DB instance started"
                },
                {
                    "langCode": "JA",
                    "message": "DBインスタンスの起動"
                },
                {
                    "langCode": "KO",
                    "message": "DB 인스턴스 시작"
                },
                {
                    "langCode": "ZH",
                    "message": "DB instance started"
                }
            ],
            "eventYmdt": "2023-03-20T16:31:59+09:00"
        }
    ]
}
```

</p>
</details>

---

### List Subscribable Event Codes

```http
GET /v3.0/event-codes
```

#### Request

This API does not require a request body.

#### Response

| Name                         | Type | Format | Description         |
|------------------------------|------|--------|---------------------|
| eventCodes                   | Body | Array  | Event Codes         |
| eventCodes.eventCode         | Body | Enum   | Event Code          |
| eventCodes.eventCategoryType | Body | Enum   | Event category type |

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
            "eventCode": "INSTC_05_01",
            "eventCategoryType": "INSTANCE"
        }
    ]
}
```

</p>
</details>

---
