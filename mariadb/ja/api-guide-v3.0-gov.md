## Database > RDS for MariaDB > APIガイド

| リージョン           | エンドポイント                                       |
|-----------------|-----------------------------------------------|
| 韓国(パンギョ)リージョン | https://kr1-rds-mariadb.api.gov-nhncloudservice.com |

## 認証および権限

APIを使用するには認証に必要な`User Access Key ID`と`Secret Access Key`が必要です。コンソール右上のアカウントにマウスポインタを合わせると表示されるドロップダウンメニューから<b>APIセキュリティ設定</b>を選択して作成できます。
作成されたKeyはAppkeyと一緒にリクエストHeaderに含める必要があります。

| 名前                         | 種類     | 形式     | 必須 | 説明                                                        |
|----------------------------|--------|--------|----|-----------------------------------------------------------|
| X-TC-APP-KEY               | Header | String | O  | RDS for MariaDBサービスのAppkeyまたはプロジェクト統合Appkey |
| X-TC-AUTHENTICATION-ID     | Header | String | O  | APIセキュリティ設定メニューのUser Access Key ID                        |
| X-TC-AUTHENTICATION-SECRET | Header | String | O  | APIセキュリティ設定メニューのSecret Access Key                         |

またプロジェクトメンバーのロールによって呼び出すことができるAPIが制限されます。 `RDS for MariaDB ADMIN`、`RDS for MariaDB VIEWER`に区分して権限を付与できます。

* `RDS for MariaDB ADMIN`権限はすべての機能を使用可能です。
* `RDS for MariaDB VIEWER`権限は情報を照会する機能のみ使用可能です。
    * DBインスタンスを作成、修正、削除したり、DBインスタンスを対象とするいかなる機能も使用できません。
    * ただし、通知グループとユーザーグループに関連する機能は使用可能です。

APIリクエスト時、認証に失敗したり権限がない場合、次のようなエラーが発生します。

| resultCode | resultMessage | 説明         |
|------------|---------------|------------|
| 80401      | Unauthorized  | 認証に失敗しました。 |
| 80403      | Forbidden     | 権限がありません。  |

## レスポンス共通情報

すべてのAPIリクエストに「200 OK」でレスポンスします。詳細なレスポンス結果はレスポンス本文のヘッダを参照します。

#### レスポンス本文

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

#### フィールド

| 名前            | 形式      | 説明                                     |
|---------------|---------|----------------------------------------|
| resultCode    | Number  | 結果コード<br/>- 成功: `0`<br/>- 失敗: `0`ではない値 |
| resultMessage | String  | 結果メッセージ                                |
| isSuccessful  | Boolean | 成否                                     |

## DBエンジンタイプ

| DBエンジンタイプ | 作成可否 | OBSからの復元可否 | 認証プラグインサポート情報 |
|-----------------|----------|------------------|-----------------|
| MARIADB_V10330  | O        | O                | NATIVE, ED25519 |
| MARIADB_V10611  | O        | O                | NATIVE, ED25519 |
| MARIADB_V10612  | O        | O                | NATIVE, ED25519 |
| MARIADB_V10616  | O        | O                | NATIVE, ED25519 |
| MARIADB_V10622  | O        | O                | NATIVE, ED25519 |
| MARIADB_V101107 | O        | O                | NATIVE, ED25519 |
| MARIADB_V101108 | O        | O                | NATIVE, ED25519 |
| MARIADB_V101113 | O        | O                | NATIVE, ED25519 |
| MARIADB_V11407  | O        | O                | NATIVE, ED25519 |

* ENUMタイプのdbVersionフィールドに対して該当値を使用できます。
* バージョンによって作成または復元が不可能な場合があります。

## プロジェクト情報

### リージョンリストを表示

```http
GET /v3.0/project/regions
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                 | 種類   | 形式      | 説明                                                                                     |
|--------------------|------|---------|----------------------------------------------------------------------------------------|
| regions            | Body | Array   | リージョンリスト                                                                               |
| regions.regionCode | Body | Enum    | リージョンコード<br/>- `KR1`:韓国(パンギョ)リージョン |
| regions.isEnabled  | Body | Boolean | リージョンが有効かどうか                                                                           |

<details><summary>例</summary>
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

### プロジェクトメンバーリストを表示

```http
GET /v3.0/project/members
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                   | 種類   | 形式     | 説明                 |
|----------------------|------|--------|--------------------|
| members              | Body | Array  | プロジェクトメンバーリスト      |
| members.memberId     | Body | UUID   | プロジェクトメンバーの識別子     |
| members.memberName   | Body | String | プロジェクトメンバーの名前      |
| members.emailAddress | Body | String | プロジェクトメンバーのメールアドレス |
| members.phoneNumber  | Body | String | プロジェクトメンバーの電話番号    |

<details><summary>例</summary>
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
            "memberName": "ホン・ギルドン",
            "emailAddress": "gildong.hong@nhn.com",
            "phoneNumber": "+821012345678"
        }
    ]
}
```

</p>
</details>

---

## DBインスタンスの仕様

### DBインスタンス仕様リストを表示

```http
GET /v3.0/db-flavors
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                     | 種類   | 形式     | 説明             |
|------------------------|------|--------|----------------|
| dbFlavors              | Body | Array  | DBインスタンス仕様リスト  |
| dbFlavors.dbFlavorId   | Body | UUID   | DBインスタンス仕様の識別子 |
| dbFlavors.dbFlavorName | Body | String | DBインスタンス仕様名    |
| dbFlavors.ram          | Body | Number | メモリ容量(MB)      |
| dbFlavors.vcpus        | Body | Number | CPUコア数         |

<details><summary>例</summary>
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

## ネットワーク

### サブネットリストを表示

```http
GET /v3.0/network/subnets
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                       | 種類   | 形式      | 説明              |
|--------------------------|------|---------|-----------------|
| subnets                  | Body | Array   | サブネットリスト        |
| subnets.subnetId         | Body | UUID    | サブネットの識別子       |
| subnets.subnetName       | Body | String  | サブネットを識別できる名前   |
| subnets.subnetCidr       | Body | String  | サブネットのCIDR      |
| subnets.usingGateway     | Body | Boolean | ゲートウェイを使用するかどうか |
| subnets.availableIpCount | Body | Number  | 使用可能なIP数        |

<details><summary>例</summary>
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

## DBエンジン

### DBエンジンリストを表示

```http
GET /v3.0/db-versions
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                           | 種類   | 形式      | 説明                    |
|------------------------------|------|---------|-----------------------|
| dbVersions                   | Body | Array   | DBエンジンリスト             |
| dbVersions.dbVersion         | Body | String  | DBエンジンタイプ             |
| dbVersions.dbVersionName     | Body | String  | DBエンジン名前              |
| dbVersions.restorableFromObs | Body | Boolean | オブジェクトストレージから復元可能かどうか |

<details><summary>例</summary>
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

## ストレージ

### ストレージタイプリストを表示

```http
GET /v3.0/storage-types
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前           | 種類   | 形式    | 説明          |
|--------------|------|-------|-------------|
| storageTypes | Body | Array | ストレージタイプリスト |

<details><summary>例</summary>

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

### ストレージリストを表示

```http
GET /v3.0/storages
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前       | 種類   | 形式    | 説明       |
|----------|------|-------|----------|
| storages | Body | Array | ストレージリスト |

<details><summary>例</summary>
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

## 作業情報

### 作業状態

| 状態名                | 説明                |
|--------------------|-------------------|
| `PREPARING`        | 作業が準備中の場合         |
| `READY`            | 作業が準備完了している場合     |
| `RUNNING`          | 作業が進行中の場合         |
| `COMPLETED`        | 作業が完了している場合       |
| `REGISTERED`       | 作業が登録されている場合      |
| `WAIT_TO_REGISTER` | 作業登録待機中の場合        |
| `INTERRUPTED`      | 作業進行中に割り込みが発生した場合 |
| `CANCELED`         | 作業がキャンセルされた場合     |
| `FAILED`           | 作業が失敗した場合         |
| `ERROR`            | 作業進行中にエラーが発生した場合  |
| `DELETED`          | 作業が削除された場合        |
| `FAIL_TO_READY`    | 作業の準備に失敗した場合      |

### 作業情報の詳細表示

```http
GET /v3.0/jobs/{jobId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前    | 種類  | 形式   | 必須 | 説明     |
|-------|-----|------|----|--------|
| jobId | URL | UUID | O  | 作業の識別子 |

#### レスポンス

| 名前                             | 種類   | 形式       | 説明                               |
|--------------------------------|------|----------|----------------------------------|
| jobId                          | Body | UUID     | 作業の識別子                           |
| jobStatus                      | Body | Enum     | 作業の現在状態                          |
| resourceRelations              | Body | Array    | 関連リソースリスト                        |
| resourceRelations.resourceType | Body | Enum     | 関連リソースタイプ                        |
| resourceRelations.resourceId   | Body | UUID     | 関連リソースの識別子                       |
| createdYmdt                    | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt                    | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>例</summary>
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

## DBインスタンスグループ

### DBインスタンスグループリストを表示

```http
GET /v3.0/db-instance-groups
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                                 | 種類   | 形式       | 説明                                                                     |
|------------------------------------|------|----------|------------------------------------------------------------------------|
| dbInstanceGroups                   | Body | Array    | DBインスタンスグループリスト                                                        |
| dbInstanceGroups.dbInstanceGroupId | Body | UUID     | DBインスタンスグループの識別子                                                       |
| dbInstanceGroups.replicationType   | Body | Enum     | DBインスタンスグループの複製形態<br/>- `STANDALONE`:単一<br/>- `HIGH_AVAILABILITY`:高可用性 |
| dbInstanceGroups.createdYmdt       | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                       |
| dbInstanceGroups.updatedYmdt       | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                       |

<details><summary>例</summary>
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

### DBインスタンスグループの詳細を表示

```http
GET /v3.0/db-instance-groups/{dbInstanceGroupId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                | 種類  | 形式   | 必須 | 説明               |
|-------------------|-----|------|----|------------------|
| dbInstanceGroupId | URL | UUID | O  | DBインスタンスグループの識別子 |

#### レスポンス

| 名前                           | 種類   | 形式       | 説明                                                                                                                                      |
|------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceGroupId            | Body | UUID     | DBインスタンスグループの識別子                                                                                                                        |
| replicationType              | Body | Enum     | DBインスタンスグループの複製形態<br/>- `STANDALONE`:単一<br/>- `HIGH_AVAILABILITY`:高可用性                                                                  |
| dbInstances                  | Body | Array    | DBインスタンスグループに属するDBインスタンスリスト                                                                                                             |
| dbInstances.dbInstanceId     | Body | UUID     | DBインスタンスの識別子                                                                                                                            |
| dbInstances.dbInstanceType   | Body | Enum     | DBインスタンスの役割タイプ<br/>- `MASTER`:マスター<br/>- `FAILED_MASTER`:フェイルオーバーしたマスター<br/>- `CANDIDATE_MASTER`:予備マスター<br/>- `READ_ONLY_SLAVE`:リードレプリカ |
| dbInstances.dbInstanceStatus | Body | Enum     | DBインスタンスの現在状態                                                                                                                           |
| createdYmdt                  | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                        |
| updatedYmdt                  | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                        |

<details><summary>例</summary>
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

## DBインスタンス

### DBインスタンス状態

| 状態                  | 説明                             |
|---------------------|--------------------------------|
| `AVAILABLE`         | DBインスタンスが使用可能な場合               |
| `BEFORE_CREATE`     | DBインスタンスが作成前の場合                |
| `STORAGE_FULL`      | DBインスタンスの容量が不足している場合           |
| `FAIL_TO_CREATE`    | DBインスタンス作成に失敗した場合              |
| `FAIL_TO_CONNECT`   | DBインスタンス接続に失敗した場合              |
| `REPLICATION_STOP`  | DBインスタンスの複製が中断した場合             |
| `FAILOVER`          | DBインスタンスが高可用性フェイルオーバーした場合      |
| `SHUTDOWN`          | DBインスタンスが停止した場合                |
| `DELETED`           | DBインスタンスが削除された場合               |

### DBインスタンス進行状態

| 状態                         | 説明             |
|----------------------------|----------------|
| `APPLYING_PARAMETER_GROUP` | パラメータグループ適用中   |
| `BACKING_UP`               | バックアップ中        |
| `CANCELING`                | キャンセル中         |
| `CREATING`                 | 作成中            |
| `CREATING_SCHEMA`          | DBスキーマ作成中	     |
| `CREATING_USER`            | ユーザー作成中	       |
| `DELETING`                 | 削除中            |
| `DELETING_SCHEMA`          | DBスキーマ削除中      |
| `DELETING_USER`            | ユーザー削除中        |
| `EXPORTING_BACKUP`         | バックアップをエクスポート中 |
| `FAILING_OVER`             | フェイルオーバー中      |
| `MIGRATING`                | マイグレーション中      |
| `MODIFYING`                | 修正中            |
| `PREPARING`                | 準備中            |
| `PROMOTING`                | 昇格中            |
| `REBUILDING`               | 再構築中           |
| `REPAIRING`                | 復旧中            |
| `REPLICATING`              | 複製中            |
| `RESTARTING`               | 再起動中           |
| `RESTARTING_FORCIBLY`      | 強制再起動中         |
| `RESTORING`                | 復元中            |
| `STARTING`                 | 起動中            |
| `STOPPING`                 | 停止中            |
| `SYNCING_SCHEMA`           | DBスキーマ同期中      |
| `SYNCING_USER`             | ユーザー同期中	       |
| `UPDATING_USER`            | ユーザー修正中	       |

### DBインスタンスリストを表示

```http
GET /v3.0/db-instances
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                            | 種類   | 形式       | 説明                                                                                                                                      |
|-------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| dbInstances                   | Body | Array    | DBインスタンスリスト                                                                                                                             |
| dbInstances.dbInstanceId      | Body | UUID     | DBインスタンスの識別子                                                                                                                            |
| dbInstances.dbInstanceGroupId | Body | UUID     | DBインスタンスグループの識別子                                                                                                                        |
| dbInstances.dbInstanceName    | Body | String   | DBインスタンスを識別できる名前                                                                                                                        |
| dbInstances.description       | Body | String   | DBインスタンスの追加情報                                                                                                                           |
| dbInstances.dbVersion         | Body | Enum     | DBエンジンタイプ                                                                                                                               |
| dbInstances.dbPort            | Body | Number   | DBポート                                                                                                                                   |
| dbInstances.dbInstanceType    | Body | Enum     | DBインスタンスの役割タイプ<br/>- `MASTER`:マスター<br/>- `FAILED_MASTER`:フェイルオーバーしたマスター<br/>- `CANDIDATE_MASTER`:予備マスター<br/>- `READ_ONLY_SLAVE`:リードレプリカ |
| dbInstances.dbInstanceStatus  | Body | Enum     | DBインスタンスの現在状態                                                                                                                           |
| dbInstances.progressStatus    | Body | Enum     | DBインスタンスの現在進行状態                                                                                                                         |
| dbInstances.createdYmdt       | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                        |
| dbInstances.updatedYmdt       | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                        |

<details><summary>例</summary>
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

### DBインスタンスの詳細を表示

```http
GET /v3.0/db-instances/{dbInstanceId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前                          | 種類   | 形式       | 説明                                                                                                                                      |
|-----------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                | Body | UUID     | DBインスタンスの識別子                                                                                                                            |
| dbInstanceGroupId           | Body | UUID     | DBインスタンスグループの識別子                                                                                                                        |
| dbInstanceName              | Body | String   | DBインスタンスを識別できる名前                                                                                                                        |
| description                 | Body | String   | DBインスタンスの追加情報                                                                                                                           |
| dbVersion                   | Body | Enum     | DBエンジンタイプ                                                                                                                               |
| dbPort                      | Body | Number   | DBポート                                                                                                                                   |
| dbInstanceType              | Body | Enum     | DBインスタンスの役割タイプ<br/>- `MASTER`:マスター<br/>- `FAILED_MASTER`:フェイルオーバーしたマスター<br/>- `CANDIDATE_MASTER`:予備マスター<br/>- `READ_ONLY_SLAVE`:リードレプリカ |
| dbInstanceStatus            | Body | Enum     | DBインスタンスの現在状態                                                                                                                           |
| progressStatus              | Body | Enum     | DBインスタンスの現在作業進行状態                                                                                                                       |
| dbFlavorId                  | Body | UUID     | DBインスタンス仕様の識別子                                                                                                                          |
| parameterGroupId            | Body | UUID     | DBインスタンスに適用されたパラメータグループの識別子                                                                                                             |
| dbSecurityGroupIds          | Body | Array    | DBインスタンスに適用されたDBセキュリティグループの識別子リスト                                                                                                       |
| notificationGroupIds        | Body | Array    | DBインスタンスに適用された通知グループの識別子リスト                                                                                                             |
| useDeletionProtection       | Body | Boolean  | DBインスタンス削除保護の有無                                                                                                                         |
| supportAuthenticationPlugin | Body | Boolean  | 認証プラグインサポートの有無                                                                                                                          |
| needToApplyParameterGroup   | Body | Boolean  | 最新パラメータグループの適用が必要かどうか                                                                                                                   |
| needMigration               | Body | Boolean  | マイグレーションが必要かどうか                                                                                                                         |
| supportDbVersionUpgrade     | Body | Boolean  | DBのバージョンアップグレードをサポートするかどうか                                                                                                              |
| createdYmdt                 | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                        |
| updatedYmdt                 | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                        |

<details><summary>例</summary>
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

### DBインスタンスを作成する

```http
POST /v3.0/db-instances
```

#### リクエスト

| 名前                                       | 種類   | 形式      | 必須 | 説明                                                                                                                                                                                                                             |
|------------------------------------------|------|---------|----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceName                           | Body | String  | O  | DBインスタンスを識別できる マスター名                                                                                                                                                                                                           |
| dbInstanceCandidateName                  | Body | String  | O  | DBインスタンスを識別できる 予備マスター名(高可用性を使用する場合の必須値)                                                                                                                                                                                        |
| description                              | Body | String  | X  | DBインスタンスに関する追加情報                                                                                                                                                                                                               |
| dbFlavorId                               | Body | UUID    | O  | DBインスタンス仕様の識別子                                                                                                                                                                                                                 |
| dbVersion                                | Body | Enum    | O  | DBエンジンタイプ                                                                                                                                                                                                                      |
| dbPort                                   | Body | Number  | O  | DBポート<br/>- 最小値: `3306`<br/>- 最大値: `43306`                                                                                                                                                                                     |
| dbUserName                               | Body | String  | O  | DBユーザーアカウント名                                                                                                                                                                                                                   |
| dbPassword                               | Body | String  | O  | DBユーザーアカウントのパスワード<br/>- 最小長さ: `4`<br/>- 最大長さ: `16`                                                                                                                                                                             |
| parameterGroupId                         | Body | UUID    | O  | パラメータグループの識別子                                                                                                                                                                                                                  |
| dbSecurityGroupIds                       | Body | Array   | X  | DBセキュリティグループの識別子リスト                                                                                                                                                                                                            |
| userGroupIds                             | Body | Array   | X  | ユーザーグループの識別子リスト                                                                                                                                                                                                                |
| useHighAvailability                      | Body | Boolean | X  | 高可用性を使用するかどうか<br/>- デフォルト値: `false`                                                                                                                                                                                            |
| pingInterval                             | Body | Number  | X  | 高可用性使用時のPing間隔(秒)<br/>- デフォルト値: `3`<br/>- 最小値: `1`<br/>- 最大値: `600`                                                                                                                                                            |
| useDefaultNotification                   | Body | Boolean | X  | 基本通知の使用有無<br/>- デフォルト値: `false`                                                                                                                                                                                                |
| useDeletionProtection                    | Body | Boolean | X  | 削除保護の有無<br/>- デフォルト値: `false`                                                                                                                                                                                                  |
| useSlowQueryAnalysis                     | Body | Boolean | X  | スロークエリの分析有無<br/>- デフォルト値: `true`                                                                                                                                                                                               |
| network                                  | Body | Object  | O  | ネットワーク情報オブジェクト                                                                                                                                                                                                                 |
| network.subnetId                         | Body | UUID    | O  | サブネットの識別子                                                                                                                                                                                                                      |
| network.usePublicAccess                  | Body | Boolean | X  | 外部接続可否<br/>- デフォルト値: `false`                                                                                                                                                                                                   |
| network.availabilityZone                 | Body | Enum    | O  | DBインスタンスを作成するアベイラビリティゾーン<br/>- 例: `kr-pub-a`                                                                                                                                                                                   |
| storage                                  | Body | Object  | O  | ストレージ情報オブジェクト                                                                                                                                                                                                                  |    
| storage.storageType                      | Body | Enum    | O  | データストレージタイプ<br/>- 例: `General SSD`                                                                                                                                                                                             |
| storage.storageSize                      | Body | Number  | O  | データストレージサイズ(GB)<br/>- 最小値: `20`<br/>- 最大値: `2048`                                                                                                                                                                              |
| backup                                   | Body | Object  | O  | バックアップ情報オブジェクト                                                                                                                                                                                                                 |
| backup.backupPeriod                      | Body | Number  | O  | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730`                                                                                                                                                                                  |
| backup.ftwrlWaitTimeout                  | Body | Number  | X  | クエリ遅延待機時間(秒)<br/>- デフォルト値: `1800`<br/>- 最小値: `0`<br/>- 最大値: `21600`                                                                                                                                                            |
| backup.backupRetryCount                  | Body | Number  | X  | バックアップ再試行回数<br/>- デフォルト値: `0`<br/>- 最小値: `0`<br/>- 最大値: `10`                                                                                                                                                                   |
| backup.useBackupLock                     | Body | Boolean | X  | テーブルロックを使用するかどうか<br/>- デフォルト値: `true`                                                                                                                                                                                          |
| backup.backupSchedules                   | Body | Array   | O  | 予定された自動バックアップリスト                                                                                                                                                                                                               |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | O  | バックアップ開始時刻<br/>- 例: `00:00:00`                                                                                                                                                                                                 |
| backup.backupSchedules.backupWndDuration | Body | Enum    | O  | バックアップDuration<br/>バックアップ開始時刻からDuration内に自動バックアップが実行されます。<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |

<details><summary>例</summary>
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

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを修正する

```http
PUT /v3.0/db-instances/{dbInstanceId}
```

#### リクエスト

| 名前                     | 種類  | 形式     | 必須 | 説明                                        |
|-------------------------|------|---------|----|--------------------------------------------|
| dbInstanceId            | URL  | UUID    | O  | DBインスタンスの識別子                              |
| dbInstanceName          | Body | String  | X  | DBインスタンスを識別できるマスター名                  |
| dbInstanceCandidateName | Body | String  | X  | DBインスタンスを識別できる予備マスター名               |
| description             | Body | String  | X  | DBインスタンスに関する追加情報                         |
| dbPort                  | Body | Number  | X  | DBポート<br/>- 最小値: `3306`<br/>- 最大値: `43306` |
| dbFlavorId         | Body | UUID    | X  | DBインスタンス仕様の識別子                                                                |
| parameterGroupId   | Body | UUID    | X  | パラメータグループの識別子                                                                 |
| dbSecurityGroupIds | Body | Array   | X  | DBセキュリティグループの識別子リスト                                                           |
| executeBackup      | Body | Boolean | X  | 現時点でバックアップを行うかどうか<br/>- デフォルト値: `false`                                       |
| useOnlineFailover  | Body | Boolean | X  | フェイルオーバーを利用した再起動を行うかどうか<br/>高可用性を使用中のDBインスタンスでのみ使用可能です。<br/>- デフォルト値: `false` |

<details><summary>例</summary>
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

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを削除する

```http
DELETE /v3.0/db-instances/{dbInstanceId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを再起動する

```http
POST /v3.0/db-instances/{dbInstanceId}/restart
```

#### リクエスト

| 名前                | 種類   | 形式      | 必須 | 説明                                                                            |
|-------------------|------|---------|----|-------------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O  | DBインスタンスの識別子                                                                  |
| useOnlineFailover | Body | Boolean | X  | フェイルオーバーを利用した再起動を行うかどうか<br/>高可用性を使用中のDBインスタンスでのみ使用可能です。<br/>- デフォルト値: `false` |
| executeBackup     | Body | Boolean | X  | 現時点でバックアップを行うかどうか<br/>- デフォルト値: `false`                                       |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを強制再起動する

```http
POST /v3.0/db-instances/{dbInstanceId}/force-restart
```

#### リクエスト

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>
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

### DBインスタンスを起動する

```http
POST /v3.0/db-instances/{dbInstanceId}/start
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを停止する

```http
POST /v3.0/db-instances/{dbInstanceId}/stop
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBインスタンスをバックアップする

```http
POST /v3.0/db-instances/{dbInstanceId}/backup
```

#### リクエスト

| 名前           | 種類   | 形式     | 必須 | 説明             |
|--------------|------|--------|----|----------------|
| dbInstanceId | URL  | UUID   | O  | DBインスタンスの識別子   |
| backupName   | Body | String | O  | バックアップを識別できる名前 |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBインスタンスバックアップ後にエクスポート

```http
POST /v3.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### リクエスト

| 名前              | 種類   | 形式     | 必須 | 説明                               |
|-----------------|------|--------|----|----------------------------------|
| dbInstanceId    | URL  | UUID   | O  | DBインスタンスの識別子                     |
| tenantId        | Body | String | O  | バックアップが保存されるオブジェクトストレージのテナントID   |
| username        | Body | String | O  | NHN Cloud会員またはIAMメンバーID          |
| password        | Body | String | O  | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | Body | String | O  | バックアップが保存されるオブジェクトストレージのコンテナ     |
| objectPath      | Body | String | O  | コンテナに保存されるバックアップのパス              |

<details><summary>例</summary>
<p>

```json
{
    "tenantId": "399631c404744dbbb18ce4fa2dc71a5a",
    "username": "gildong.hong@nhn.com",
    "password": "password",
    "targetContainer": "container",
    "objectPath": "backups/backup_file"
}
```

</p>
</details>

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを複製する

```http
POST /v3.0/db-instances/{dbInstanceId}/replicate
```

#### リクエスト

| 名前                      | 種類  | 形式     | 必須 | 説明                                                                       |
|--------------------------|------|---------|----|---------------------------------------------------------------------------|
| dbInstanceId             | URL  | UUID    | O  | DBインスタンスの識別子                                                             |
| dbInstanceName           | Body | String  | O  | DBインスタンスを識別できる マスター名                                                 |
| dbInstanceCandidateName  | Body | String  | X  | DBインスタンスを識別できる 予備マスター名                                              |
| description              | Body | String  | X  | DBインスタンスに関する追加情報                                                        |
| dbFlavorId               | Body | UUID    | X  | DBインスタンス仕様の識別子<br/>- デフォルト値:原本DBインスタンス値                                  |
| dbPort                   | Body | Number  | X  | DBポート<br/>- デフォルト値:原本DBインスタンス値<br/>- 最小値: `3306`<br/>- 最大値: `43306`        |
| parameterGroupId         | Body | UUID    | X  | パラメータグループの識別子<br/>- デフォルト値:原本DBインスタンス値                                     |
| dbSecurityGroupIds       | Body | Array   | X  | DBセキュリティグループの識別子リスト<br/>- デフォルト値:原本DBインスタンス値                                 |
| userGroupIds             | Body | Array   | X  | ユーザーグループの識別子リスト                                                           |
| useDefaultNotification   | Body | Boolean | X  | 基本通知の使用有無<br/>- デフォルト値: `false`                                            |
| useDeletionProtection    | Body | Boolean | X  | 削除保護の有無<br/>- デフォルト値: `false`                                               |
| network                  | Body | Object  | O  | ネットワーク情報オブジェクト                                                               |
| network.usePublicAccess  | Body | Boolean | X  | 外部接続可否<br/>- デフォルト値:原本DBインスタンス値                                      |
| network.availabilityZone | Body | Enum    | O  | DBインスタンスを作成するアベイラビリティゾーン<br/>- 例: `kr-pub-a`                                  |
| storage                  | Body | Object  | X  | データストレージ情報オブジェクト                                                           |    
| storage.storageType      | Body | Enum    | X  | データストレージタイプ<br><ul><li>例: `General SSD`</li></ul>                        |
| storage.storageSize      | Body | Number  | X  | データストレージサイズ(GB)<br/>- デフォルト値:原本DBインスタンス値<br/>- 最小値: `20`<br/>- 最大値: `2048` |
| backup                   | Body | Object  | X  | バックアップ情報オブジェクト                                                                 |
| backup.backupPeriod      | Body | Number  | X  | バックアップ保管期間(日)<br/>- デフォルト値:原本DBインスタンス値<br/>- 最小値: `0`<br/>- 最大値: `730`       |
| backup.ftwrlWaitTimeout  | Body | Number  | X  | クエリ遅延待機時間(秒)<br/>- デフォルト値:原本DBインスタンス値<br/>- 最小値: `0`<br/>- 最大値: `21600`  |
| backup.backupRetryCount  | Body | Number  | X  | バックアップ再試行回数<br/>- デフォルト値:原本DBインスタンス値<br/>- 最小値: `0`<br/>- 最大値: `10`          |
| backup.useBackupLock                     | Body | Boolean | X  | テーブルロックを使用するかどうか<br/>- デフォルト値:原本DBインスタンス値                                                                                                                                                                                                               |
| backup.backupSchedules                   | Body | Array   | X  | 予定された自動バックアップリスト                                                                                                                                                                                                                                        |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | X  | バックアップ開始時刻<br/>- 例: `00:00:00`<br/>- デフォルト値:原本DBインスタンス値                                                                                                                                                                                                 |
| backup.backupSchedules.backupWndDuration | Body | Enum    | X  | バックアップDuration<br/>バックアップ開始時刻からDuration内に自動バックアップが実行されます。<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間<br/>- デフォルト値:原本DBインスタンス値 |

<details><summary>例</summary>
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

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを昇格する

```http
POST /v3.0/db-instances/{dbInstanceId}/promote
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### 復元情報照会

```http
GET /v3.0/db-instances/{dbInstanceId}/restoration-info
```

#### リクエスト

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前                                      | 種類   | 形式       | 説明                                                                                                                                                                                       |
|-----------------------------------------|------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| oldestRestorableYmdt                    | Body | DateTime | 最古の復元可能時間                                                                                                                                                                                |
| latestRestorableYmdt                    | Body | DateTime | 最新の復元可能時間                                                                                                                                                                                |
| restorableBackups                       | Body | Array    | 復元可能なバックアップリスト                                                                                                                                                                           |
| restorableBackups.backup                | Body | Object   | バックアップ情報オブジェクト                                                                                                                                                                           |
| restorableBackups.backup.backupId       | Body | UUID     | バックアップの識別子                                                                                                                                                                               |
| restorableBackups.backup.backupName     | Body | String   | バックアップ名                                                                                                                                                                                  |
| restorableBackups.backup.useBackupLock  | Body | Boolean  | テーブルロックを使用するかどうか                                                                                                                                                                         |
| restorableBackups.backup.backupSize     | Body | Number   | バックアップサイズ                                                                                                                                                                                |
| restorableBackups.backup.backupType     | Body | Enum     | バックアップタイプ<br><ul><li>`AUTO` :自動</li><li>`MANUAL` :手動</li></ul>                                                                                                                           |
| restorableBackups.backup.backupStatus   | Body | Enum     | バックアップ状態<br><ul><li>`BACKING_UP`:バックアップ中の場合</li><li>`COMPLETED`:バックアップが完了している場合</li><li>`DELETING`:バックアップが削除中の場合</li><li>`DELETED`:バックアップが削除されている場合</li><li>`ERROR`:エラーが発生した場合</li></ul> |
| restorableBackups.backup.dbInstanceId   | Body | UUID     | 原本DBインスタンスの識別子                                                                                                                                                                           |
| restorableBackups.backup.dbInstanceName | Body | String   | 原本DBインスタンスの名前                                                                                                                                                                            |
| restorableBackups.backup.dbVersion      | Body | String   | DBエンジンタイプ                                                                                                                                                                                |
| restorableBackups.backup.failoverCount  | Body | Number   | フェイルオーバー回数                                                                                                                                                                               |
| restorableBackups.backup.binLogFileName | Body | String   | バイナリログファイル名                                                                                                                                                                              |
| restorableBackups.backup.binLogPosition | Body | Number   | バイナリログファイル位置                                                                                                                                                                             |
| restorableBackups.backup.createdYmdt    | Body | DateTime | バックアップ作成日時                                                                                                                                                                               |
| restorableBackups.backup.updatedYmdt    | Body | DateTime | バックアップ更新日時                                                                                                                                                                               |
| restorableBackups.restorableBinLogs     | Body | Array    | 該当バックアップを利用して復元可能なバイナリログ名リスト                                                                                                                                                             |

<details><summary>例</summary>
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

### 復元される最後のクエリ照会

```http
GET /v3.0/db-instances/{dbInstanceId}/restoration-info/last-query
```

#### 共通リクエスト

| 名前           | 種類    | 形式   | 必須 | 説明                                                                                                           |
|--------------|-------|------|----|--------------------------------------------------------------------------------------------------------------|
| dbInstanceId | URL   | UUID | O  | DBインスタンスの識別子                                                                                                 |
| restoreType  | Query | Enum | O  | 復元タイプの種類<br><ul><li>`TIMESTAMP`:復元可能な時間内の時間を利用した時点復元タイプ</li><li>`BINLOG`:復元可能なバイナリログ位置を利用した時点復元タイプ</li></ul> |

#### restoreTypeが`TIMESTAMP`の場合

| 名前          | 種類    | 形式       | 必須 | 説明                                       |
|-------------|-------|----------|----|------------------------------------------|
| restoreYmdt | Query | DateTime | O  | DBインスタンス復元日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

#### restoreTypeが`BINLOG`の場合

| 名前             | 種類    | 形式     | 必須 | 説明                |
|----------------|-------|--------|----|-------------------|
| backupId       | Query | UUID   | O  | 復元に使用するバックアップの識別子 |
| binLogFileName | Query | String | O  | 復元に使用するバイナリログの名前  |
| binLogPosition | Query | Number | O  | 復元に使用するバイナリログの位置  |

#### レスポンス

| 名前           | 種類   | 形式       | 説明                                  |
|--------------|------|----------|-------------------------------------|
| executedYmdt | Body | DateTime | クエリ実行日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| lastQuery    | Body | String   | 最後に実行したクエリ                          |

<details><summary>例</summary>
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

### 復元

```http
POST /v3.0/db-instances/{dbInstanceId}/restore
```

#### 共通リクエスト

| 名前                                                  | 種類   | 形式      | 必須 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-----------------------------------------------------|------|---------|----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                                        | URL  | UUID    | O  | DBインスタンスの識別子                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| restore                                             | Body | Object  | O  | 復元情報オブジェクト                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| restore.restoreType                                 | Body | Enum    | O  | 復元タイプの種類<br><ul><li>`TIMESTAMP`:復元可能な時間内の時間を利用した時点復元タイプ</li><li>`BINLOG`:復元可能なバイナリログ位置を利用した時点復元タイプ</li><li>`BACKUP`:既存に作成したバックアップを利用したスナップショット復元タイプ</li></ul>                                                                                                                                                                                                                                                                                                            |
| dbInstanceName                                      | Body | String  | O  | DBインスタンスを識別できる マスター名                                                                                                                                               |
| dbInstanceCandidateName                             | Body | String  | X  | DBインスタンスを識別できる 予備マスター名                                                                                                                                            |
| description                                         | Body | String  | X  | DBインスタンスに対する追加情報                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| dbFlavorId                                          | Body | UUID    | O  | DBインスタンス仕様の識別子                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| dbPort                                              | Body | Number  | O  | DBポート<br><ul><li>最小値: `3306`</li><li>最大値: `43306`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                              |
| <span style="color:#313338">parameterGroupId</span> | Body | UUID    | O  | パラメータグループの識別子                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| dbSecurityGroupIds                                  | Body | Array   | X  | DBセキュリティグループの識別子リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| userGroupIds                                        | Body | Array   | X  | ユーザーグループの識別子リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| useHighAvailability                                 | Body | Boolean | X  | 高可用性を使用するかどうか<br><ul><li>デフォルト値: `false`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                       |
| pingInterval                                        | Body | Number  | X  | 高可用性使用時Ping間隔(秒)<br><ul><li>デフォルト値: `3`</li><li>最小値: `1`</li><li>最大値: `600`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                    |
| useDefaultNotification                              | Body | Boolean | X  | 基本アラームを使用するかどうか<br><ul><li>デフォルト値: `false`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                     |
| network                                             | Body | Object  | O  | ネットワーク情報オブジェクト                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| network.subnetId                                    | Body | UUID    | O  | サブネットの識別子                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| network.usePublicAccess                             | Body | Boolean | X  | 外部接続可否<br><ul><li>デフォルト値: `false`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                              |
| network.availabilityZone                            | Body | Enum    | O  | DBインスタンスを作成するアベイラビリティゾーン<br><ul><li>例: `kr-pub-a`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                              |
| storage                                             | Body | Object  | O  | ストレージ情報オブジェクト                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| storage.storageType                                 | Body | Enum    | O  | データストレージタイプ<br><ul><li>例: `General SSD`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                        |
| storage.storageSize                                 | Body | Number  | O  | データストレージサイズ(GB)<br><ul><li>最小値: `20`</li><li>最大値: `2048`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                       |
| backup                                              | Body | Object  | O  | バックアップ情報オブジェクト                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| backup.backupPeriod                                 | Body | Number  | O  | バックアップ保管期間(日)<br><ul><li>最小値: `0`</li><li>最大値: `730`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                           |
| backup.ftwrlWaitTimeout                             | Body | Number  | X  | クエリ遅延待機時間(秒)<br><ul><li>デフォルト値: `1800`</li><li>最小値: `0`</li><li>最大値: `21600`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                   |
| backup.backupRetryCount                             | Body | Number  | X  | バックアップ再試行回数<br><ul><li>デフォルト値: `0`</li><li>最小値: `0`</li><li>最大値: `10`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                          |
| backup.useBackupLock                                | Body | Boolean | X  | テーブルロックを使用するかどうか<br><ul><li>デフォルト値: `true`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                     |
| backup.backupSchedules                              | Body | Array   | O  | 予定された自動バックアップリスト                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| backup.backupSchedules.backupWndBgnTime             | Body | String  | O  | バックアップ開始時刻<br><ul><li>例: `00:00:00`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                            |
| backup.backupSchedules.backupWndDuration            | Body | Enum    | O  | バックアップDuration<br>バックアップ開始時刻からDuration内に自動バックアップが実行されます。<br><ul><li>`HALF_AN_HOUR`<span style="color:#313338">: 30分</span></li><li>`ONE_HOUR`<span style="color:#313338">: 1時間</span></li><li>`ONE_HOUR_AND_HALF`<span style="color:#313338">: 1時間30分</span></li><li>`TWO_HOURS`<span style="color:#313338">: 2時間</span></li><li>`TWO_HOURS_AND_HALF`<span style="color:#313338">: 2時間30分</span></li><li>`THREE_HOURS`<span style="color:#313338">: 3時間</span></li></ul> |
| useDeletionProtection                               | Body | Boolean | X  | 削除保護を行うかどうか<br>デフォルト値: `false`                                                                                                                                                                                                                                                                                                                                                                                                                                           |

#### Timestampを利用した時点復元時、リクエスト(restoreTypeが`TIMESTAMP`の場合)

| 名前                  | 種類   | 形式       | 必須 | 説明                                                                                |
|---------------------|------|----------|----|-----------------------------------------------------------------------------------|
| restore.restoreYmdt | Body | DateTime | O  | DBインスタンス復元日時(YYYY-MM-DDThh:mm:ss.SSSTZD)<br>復元情報照会で照会した最新の復元可能な時間以前に対してのみ復元が可能です。 |

<details><summary>例</summary>
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

#### バイナリログを利用した時点復元時、リクエスト(restoreTypeが`BINLOG`の場合)

| 名前                            | 種類   | 形式     | 必須 | 説明                |
|-------------------------------|------|--------|----|-------------------|
| restore.backupId              | Body | UUID   | O  | 復元に使用するバックアップの識別子 |
| restore.binLog                | Body | Object | O  | バイナリログ情報オブジェクト    |
| restore.binLog.binLogFileName | Body | String | O  | 復元に使用するバイナリログの名前  |
| restore.binLog.binLogPosition | Body | Number | O  | 復元に使用するバイナリログの位置  |

* バイナリログを利用した時点復元時、基準バックアップのバイナリログファイルおよび位置を基準に、その後に記録されたログに対して復元が可能です。

<details><summary>例</summary>
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

#### バックアップを利用した復元時、リクエスト(restoreTypeが`BACKUP`の場合)

| 名前               | 種類   | 形式   | 必須                         | 説明                |
|------------------|------|------|----------------------------|-------------------|
| restore.backupId | Body | UUID | O(restoreTypeが`BACKUP`の場合) | 復元に使用するバックアップの識別子 |

<details><summary>例</summary>
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

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### オブジェクトストレージから復元

```http
POST /v3.0/db-instances/restore-from-obs
```

#### リクエスト

| 名前                                                  | 種類   | 形式      | 必須 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-----------------------------------------------------|------|---------|----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| restore                                             | Body | Object  | O  | 復元情報オブジェクト                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| restore.tenantId                                    | Body | String  | O  | バックアップが保存されたオブジェクトストレージのテナントID                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| restore.username                                    | Body | String  | O  | NHN Cloud会員またはIAMメンバーID                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| restore.password                                    | Body | String  | O  | バックアップが保存されたオブジェクトストレージのAPIパスワード                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| restore.targetContainer                             | Body | String  | O  | バックアップが保存されたオブジェクトストレージのコンテナ                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| restore.objectPath                                  | Body | String  | O  | コンテナに保存されたバックアップのパス                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| dbVersion                                           | Body | Enum    | O  | DBエンジンタイプ                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| dbInstanceName                                      | Body | String  | O  | DBインスタンスを識別できる マスター名                                                              |
| dbInstanceCandidateName                             | Body | String  | X  | DBインスタンスを識別できる 予備マスター名                                                           |
| description                                         | Body | String  | X  | DBインスタンスに対する追加情報                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| dbFlavorId                                          | Body | UUID    | O  | DBインスタンス仕様の識別子                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| dbPort                                              | Body | Number  | O  | DBポート<br><ul><li>最小値: `3306`</li><li>最大値: `43306`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                              |
| <span style="color:#313338">parameterGroupId</span> | Body | UUID    | O  | パラメータグループの識別子                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| dbSecurityGroupIds                                  | Body | Array   | X  | DBセキュリティグループの識別子リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| userGroupIds                                        | Body | Array   | X  | ユーザーグループの識別子リスト                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| useHighAvailability                                 | Body | Boolean | X  | 高可用性を使用するかどうか<br><ul><li>デフォルト値: `false`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                       |
| pingInterval                                        | Body | Number  | X  | 高可用性使用時Ping間隔(秒)<br><ul><li>デフォルト値: `3`</li><li>最小値: `1`</li><li>最大値: `600`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                    |
| useDefaultNotification                              | Body | Boolean | X  | 基本アラームを使用するかどうか<br><ul><li>デフォルト値: `false`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                     |
| network                                             | Body | Object  | O  | ネットワーク情報オブジェクト                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| network.subnetId                                    | Body | UUID    | O  | サブネットの識別子                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| network.usePublicAccess                             | Body | Boolean | X  | 外部接続可否<br><ul><li>デフォルト値: `false`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                              |
| network.availabilityZone                            | Body | Enum    | O  | DBインスタンスを作成するアベイラビリティゾーン<br><ul><li>例: `kr-pub-a`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                              |
| storage                                             | Body | Object  | O  | ストレージ情報オブジェクト                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| storage.storageType                                 | Body | Enum    | O  | データストレージタイプ<br><ul><li>例: `General SSD`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                        |
| storage.storageSize                                 | Body | Number  | O  | データストレージサイズ(GB)<br><ul><li>最小値: `20`</li><li>最大値: `2048`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                       |
| backup                                              | Body | Object  | O  | バックアップ情報オブジェクト                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| backup.backupPeriod                                 | Body | Number  | O  | バックアップ保管期間(日)<br><ul><li>最小値: `0`</li><li>最大値: `730`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                           |
| backup.ftwrlWaitTimeout                             | Body | Number  | X  | クエリ遅延待機時間(秒)<br><ul><li>デフォルト値: `1800`</li><li>最小値: `0`</li><li>最大値: `21600`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                   |
| backup.backupRetryCount                             | Body | Number  | X  | バックアップ再試行回数<br><ul><li>デフォルト値: `0`</li><li>最小値: `0`</li><li>最大値: `10`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                          |
| backup.useBackupLock                                | Body | Boolean | X  | テーブルロックを使用するかどうか<br><ul><li>デフォルト値: `true`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                     |
| backup.backupSchedules                              | Body | Array   | O  | 予定された自動バックアップリスト                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| backup.backupSchedules.backupWndBgnTime             | Body | String  | O  | バックアップ開始時刻<br><ul><li>例: `00:00:00`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                            |
| backup.backupSchedules.backupWndDuration            | Body | Enum    | O  | バックアップDuration<br>バックアップ開始時刻からDuration内に自動バックアップが実行されます。<br><ul><li>`HALF_AN_HOUR`<span style="color:#313338">: 30分</span></li><li>`ONE_HOUR`<span style="color:#313338">: 1時間</span></li><li>`ONE_HOUR_AND_HALF`<span style="color:#313338">: 1時間30分</span></li><li>`TWO_HOURS`<span style="color:#313338">: 2時間</span></li><li>`TWO_HOURS_AND_HALF`<span style="color:#313338">: 2時間30分</span></li><li>`THREE_HOURS`<span style="color:#313338">: 3時間</span></li></ul> |

<details><summary>例</summary>
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

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBインスタンス削除保護設定を変更する

```http
PUT /v3.0/db-instances/{dbInstanceId}/deletion-protection
```

#### リクエスト

| 名前                    | 種類   | 形式      | 必須 | 説明           |
|-----------------------|------|---------|----|--------------|
| dbInstanceId          | URL  | UUID    | O  | DBインスタンスの識別子 |
| useDeletionProtection | Body | Boolean | O  | 削除保護の有無      |

#### レスポンス

このAPIはレスポンス本文を返しません。

<details><summary>例</summary>
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

### 高可用性を修正する

```http
PUT /v3.0/db-instances/{dbInstanceId}/high-availability
```

#### リクエスト

| 名前                  | 種類   | 形式      | 必須 | 説明                                                   |
|---------------------|------|---------|----|------------------------------------------------------|
| dbInstanceId        | URL  | UUID    | O  | DBインスタンスの識別子                                         |
| useHighAvailability | Body | Boolean | O  | 高可用性を使用するかどうか                                        |
| pingInterval        | Body | Number  | X  | 高可用性を使用する時、Ping間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### 高可用性を再開する

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### 高可用性を一時停止する

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### 高可用性を復旧する

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### 高可用性を分離する

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/split
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### ストレージ情報を表示

```http
GET /v3.0/db-instances/{dbInstanceId}/storage-info
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前            | 種類   | 形式     | 説明                                                                                        |
|---------------|------|--------|-------------------------------------------------------------------------------------------|
| storageType   | Body | Enum   | データストレージタイプ                                                                               |
| storageSize   | Body | Number | データストレージサイズ(GB)                                                                           |
| storageStatus | Body | Enum   | データストレージの現在状態<br/>- `DETACHED`:取り付けられていない<br/>- `ATTACHED`:取り付けられている<br/>- `DELETED`:削除済み |

<details><summary>例</summary>
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

### ストレージ情報を修正する

```http
PUT /v3.0/db-instances/{dbInstanceId}/storage-info
```

#### リクエスト

| 名前                | 種類   | 形式      | 必須 | 説明                                                                            |
|-------------------|------|---------|----|-------------------------------------------------------------------------------|
| dbInstanceId      | URL  | UUID    | O  | DBインスタンスの識別子                                                                  |
| storageSize       | Body | Number  | O  | データストレージサイズ(GB)<br/>- 最小値:現在値<br/>- 最大値: `2048`                               |
| useOnlineFailover | Body | Boolean | X  | フェイルオーバーを利用した再起動を行うかどうか<br/>高可用性を使用中のDBインスタンスでのみ使用可能です。<br/>- デフォルト値: `false` |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### バックアップ情報を表示

```http
GET /v3.0/db-instances/{dbInstanceId}/backup-info
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前                                    | 種類   | 形式      | 説明               |
|---------------------------------------|------|---------|------------------|
| backupPeriod                          | Body | Number  | バックアップ保管期間(日)    |
| ftwrlWaitTimeout                      | Body | Number  | クエリ遅延待機時間(秒)     |
| backupRetryCount                      | Body | Number  | バックアップ再試行回数      |
| replicationRegion                     | Body | Enum    | バックアップ複製リージョン    |
| useBackupLock                         | Body | Boolean | テーブルロックを使用するかどうか |
| backupSchedules                       | Body | Array   | 予定された自動バックアップリスト |
| backupSchedules.backupWndBgnTime      | Body | String  | バックアップ開始時刻       |
| backupSchedules.backupWndDuration     | Body | Enum    | バックアップDuration   |

<details><summary>例</summary>
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

### バックアップ情報を修正する

```http
PUT /v3.0/db-instances/{dbInstanceId}/backup-info
```

#### リクエスト

| 名前                                | 種類   | 形式      | 必須 | 説明                                                                                                                                                                                                                             |
|-----------------------------------|------|---------|----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId                      | URL  | UUID    | O  | DBインスタンスの識別子                                                                                                                                                                                                                   |
| backupPeriod                      | Body | Number  | X  | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730`                                                                                                                                                                                  |
| ftwrlWaitTimeout                  | Body | Number  | X  | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600`                                                                                                                                                                                 |
| backupRetryCount                  | Body | Number  | X  | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10`                                                                                                                                                                                     |
| useBackupLock                     | Body | Boolean | X  | テーブルロックを使用するかどうか                                                                                                                                                                                                               |
| backupSchedules                   | Body | Array   | X  | 予定された自動バックアップリスト                                                                                                                                                                                                               |
| backupSchedules.backupWndBgnTime  | Body | String  | O  | バックアップ開始時刻<br/>- 例: `00:00:00`                                                                                                                                                                                                 |
| backupSchedules.backupWndDuration | Body | Enum    | O  | バックアップDuration<br/>バックアップ開始時刻からDuration内に自動バックアップが実行されます。<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |

<details><summary>例</summary>
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

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### ネットワーク情報を表示

```http
GET /v3.0/db-instances/{dbInstanceId}/network-info
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前                     | 種類   | 形式     | 説明                                                                                                                             |
|------------------------|------|--------|--------------------------------------------------------------------------------------------------------------------------------|
| availabilityZone       | Body | Enum   | DBインスタンスを作成するアベイラビリティゾーン                                                                                                       |
| subnet                 | Body | Object | サブネットオブジェクト                                                                                                                    |
| subnet.subnetId        | Body | UUID   | サブネットの識別子                                                                                                                      |
| subnet.subnetName      | Body | UUID   | サブネットの識別できる名前                                                                                                                  |
| subnet.subnetCidr      | Body | UUID   | サブネットのCIDR                                                                                                                     |
| endPoints              | Body | Array  | 接続情報リスト                                                                                                                        |
| endPoints.domain       | Body | String | ドメイン                                                                                                                           |
| endPoints.ipAddress    | Body | String | IPアドレス                                                                                                                         |
| endPoints.endPointType | Body | Enum   | 接続情報タイプ<br>-`EXTERNAL`:外部接続ドメイン<br>-`INTERNAL`:内部接続ドメイン<br>-`PUBLIC`: (Deprecated)外部接続ドメイン<br>-`PRIVATE`: (Deprecated)内部接続ドメイン |

<details><summary>例</summary>
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

### ネットワーク情報を修正する

```http
PUT /v3.0/db-instances/{dbInstanceId}/network-info
```

#### リクエスト

| 名前              | 種類   | 形式      | 必須 | 説明           |
|-----------------|------|---------|----|--------------|
| dbInstanceId    | URL  | UUID    | O  | DBインスタンスの識別子 |
| usePublicAccess | Body | Boolean | O  | 外部接続可否       |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBユーザーリストを表示

```http
GET /v3.0/db-instances/{dbInstanceId}/db-users
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前                           | 種類   | 形式       | 説明                                                                                                                          |
|------------------------------|------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| dbUsers                      | Body | Array    | DBユーザーリスト                                                                                                                   |
| dbUsers.dbUserId             | Body | UUID     | DBユーザーの識別子                                                                                                                  |
| dbUsers.dbUserName           | Body | String   | DBユーザーアカウント名                                                                                                                |
| dbUsers.host                 | Body | String   | DBユーザーアカウントのホスト名                                                                                                            |
| dbUsers.authorityType        | Body | Enum     | DBユーザー権限タイプ<br/>- `READ`: SELECTクエリ実行可能な権限<br/>- `CRUD`: DMLクエリ実行可能な権限<br/>- `DDL`: DDLクエリ実行可能な権限<br/>                      |
| dbUsers.dbUserStatus         | Body | Enum     | DBユーザーの現在状態<br/>- `STABLE`:作成済み<br/>- `CREATING`:作成中<br/>- `UPDATING`:修正中<br/>- `DELETING`:削除中<br/>- `DELETED`:削除済み         |
| dbUsers.tlsOption            | Body | Enum     | TLS Option<br/>- NONE<br />- SSL<br />- X509                                                                                |
| dbUsers.createdYmdt          | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                            |
| dbUsers.updatedYmdt          | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                            |

<details><summary>例</summary>
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

### DBユーザーを作成する

```http
POST /v3.0/db-instances/{dbInstanceId}/db-users
```

#### リクエスト

| 名前                   | 種類   | 形式     | 必須 | 説明                                                                                                                          |
|----------------------|------|--------|----|-----------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId         | URL  | UUID   | O  | DBインスタンスの識別子                                                                                                                |
| dbUserName           | Body | String | O  | DBユーザーアカウント名<br/>- 最小長さ: `1`<br/>- 最大長さ: `32`                                                                               |
| dbPassword           | Body | String | O  | DBユーザーアカウントのパスワード<br/>- 最小長さ: `4`<br/>- 最大長さ: `16`                                                                          |
| host                 | Body | String | O  | DBユーザーアカウントのホスト名<br/>- 例: `1.1.1.%`                                                                                         |
| authorityType        | Body | Enum   | O  | DBユーザー権限タイプ<br/>- `READ`: SELECTクエリ実行可能な権限<br/>- `CRUD`: DMLクエリ実行可能な権限<br/>- `DDL`: DDLクエリ実行可能な権限<br/>                      |

<details><summary>例</summary>
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

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBユーザーを修正する

```http
PUT /v3.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### リクエスト

| 名前                   | 種類   | 形式     | 必須 | 説明                                                                                                                          |
|----------------------|------|--------|----|-----------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId         | URL  | UUID   | O  | DBインスタンスの識別子                                                                                                                |
| dbUserId             | URL  | UUID   | O  | DBユーザーの識別子                                                                                                                  |
| dbPassword           | Body | String | X  | DBユーザーアカウントのパスワード<br/>- 最小長さ: `4`<br/>- 最大長さ: `16`                                                                          |
| authorityType        | Body | Enum   | X  | DBユーザー権限タイプ<br/>- `READ`: SELECTクエリ実行可能な権限<br/>- `CRUD`: DMLクエリ実行可能な権限<br/>- `DDL`: DDLクエリ実行可能な権限<br/>                      |

<details><summary>例</summary>
<p>

```json
{
    "authorityType": "DDL"
}
```

</p>
</details>

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBユーザーを削除する

```http
DELETE /v3.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |
| dbUserId     | URL | UUID | O  | DBユーザーの識別子   |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBスキーマリストを表示

```http
GET /v3.0/db-instances/{dbInstanceId}/db-schemas
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |

#### レスポンス

| 名前                       | 種類   | 形式       | 説明                                                                                             |
|--------------------------|------|----------|------------------------------------------------------------------------------------------------|
| dbSchemas                | Body | Array    | DBスキーマリスト                                                                                      |
| dbSchemas.dbSchemaId     | Body | UUID     | DBスキーマの識別子                                                                                     |
| dbSchemas.dbSchemaName   | Body | String   | DBスキーマ名                                                                                        |
| dbSchemas.dbSchemaStatus | Body | Enum     | DBスキーマの現在状態<br/>- `STABLE`:作成済み<br/>- `CREATING`:作成中<br/>- `DELETING`:削除中<br/>- `DELETED`:削除済み |
| dbSchemas.createdYmdt    | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                               |

<details><summary>例</summary>
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

### DBスキーマを作成する

```http
POST /v3.0/db-instances/{dbInstanceId}/db-schemas
```

#### リクエスト

| 名前           | 種類   | 形式     | 必須 | 説明           |
|--------------|------|--------|----|--------------|
| dbInstanceId | URL  | UUID   | O  | DBインスタンスの識別子 |
| dbSchemaName | Body | String | O  | DBスキーマ名      |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBスキーマを削除する

```http
DELETE /v3.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類  | 形式   | 必須 | 説明           |
|--------------|-----|------|----|--------------|
| dbInstanceId | URL | UUID | O  | DBインスタンスの識別子 |
| dbSchemaId   | URL | UUID | O  | DBスキーマの識別子   |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### ログファイルリスト表示

```http
GET /v3.0/db-instances/{dbInstanceId}/log-files
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類    | 形式    | 必須 | 説明                                                                                                                                                                                             |
|--------------|-------|-------|----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbInstanceId | URL   | UUID  | O  | DBインスタンスの識別子                                                                                                                                                                                   |
| logFileTypes | Query | Array | X  | ログファイルタイプ種類一覧<br/>- `ERROR`: error.log<br/>- `BINLOG`: mysql-bin<br/>- `GENERAL`: general.log<br/>- `SLOW_QUERY`: slow_query.log<br/>- `AUDIT`: server_audit.log<br/>- `BACKUP`: xtra_full.log |

#### レスポンス

| 名前                   | 種類   | 形式       | 説明                                                                                                                                                                                           |
|----------------------|------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| logFiles             | Body | Array    | ログファイルリスト                                                                                                                                                                                    |
| logFiles.logFileName | Body | String   | ログファイル名                                                                                                                                                                                      |
| logFiles.logFileType | Body | Enum     | ログファイルタイプ種類<br/>- `ERROR`: error.log<br/>- `BINLOG`: mysql-bin<br/>- `GENERAL`: general.log<br/>- `SLOW_QUERY`: slow_query.log<br/>- `AUDIT`: server_audit.log<br/>- `BACKUP`: xtra_full.log |
| logFiles.logFileSize | Body | Number   | ログファイルサイズ(Byte)                                                                                                                                                                              |
| logFiles.createdYmdt | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                                                                             |


<details><summary>例</summary>
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

### ログファイルのエクスポート

```http
POST /v3.0/db-instances/{dbInstanceId}/log-files/export
```

#### リクエスト

| 名前              | 種類   | 形式     | 必須 | 説明                               |
|-----------------|------|--------|----|----------------------------------|
| dbInstanceId    | URL  | UUID   | O  | DBインスタンスの識別子                     |
| logFileNames    | Body | Array  | O  | ログファイル名リスト<br/>- 最小サイズ: `1`      |
| tenantId        | Body | String | O  | ログファイルが保存されるオブジェクトストレージのテナントID   |
| username        | Body | String | O  | NHN CloudアカウントまたはIAMアカウントID      |
| password        | Body | String | O  | ログファイルが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | Body | String | O  | ログファイルが保存されるオブジェクトストレージのコンテナ     |
| objectPath      | Body | String | O  | コンテナに保存されるログファイルのパス              |

<details><summary>例</summary>
<p>

```json
{
    "logFileNames": ["xtra_full.log-20230317"],
    "tenantId": "399631c404744dbbb18ce4fa2dc71a5a",
    "username": "gildong.hong@nhn.com",
    "password": "password",
    "targetContainer": "container",
    "objectPath": "logs/backup"
}
```

</p>
</details>

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

## バックアップ

### バックアップ状態

| 状態           | 説明               |
|--------------|------------------|
| `BACKING_UP` | バックアップ中の場合       |
| `COMPLETED`  | バックアップが完了している場合  |
| `DELETING`   | バックアップが削除中の場合    |
| `DELETED`    | バックアップが削除されている場合 |
| `ERROR`      | エラーが発生した場合       |

### バックアップリスト照会

```http
GET /v3.0/backups
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前           | 種類    | 形式     | 必須 | 説明                                                          |
|--------------|-------|--------|----|-------------------------------------------------------------|
| page         | Query | Number | O  | 照会するリストのページ<br/>- 最小値: `1`                                  |
| size         | Query | Number | O  | 照会するリストのページサイズ<br/>- 最小値: `1`<br/>- 最大値: `100`              |
| backupType   | Query | Enum   | X  | バックアップタイプ<br/>- `AUTO`:自動<br/>- `MANUAL`:手動<br/>- デフォルト値:全体 |
| dbInstanceId | Query | UUID   | X  | 原本DBインスタンスの識別子                                              |
| dbVersion    | Query | Enum   | X  | DBエンジンタイプ                                                   |

#### レスポンス

| 名前                   | 種類   | 形式       | 説明                               |
|----------------------|------|----------|----------------------------------|
| totalCounts          | Body | Number   | 全バックアップリスト数                      |
| backups              | Body | Array    | バックアップリスト                        |
| backups.backupId     | Body | UUID     | バックアップの識別子                       |
| backups.backupName   | Body | String   | バックアップを識別できる名前                   |
| backups.backupStatus | Body | Enum     | バックアップの現在状態                      |
| backups.dbInstanceId | Body | UUID     | 原本DBインスタンスの識別子                   |
| backups.dbVersion    | Body | Enum     | DBエンジンタイプ                        |
| backups.backupType   | Body | Enum     | バックアップタイプ                        |
| backups.backupSize   | Body | Number   | バックアップのサイズ(Byte)                 |
| createdYmdt          | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt          | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>例</summary>
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

### バックアップのエクスポート

```http
POST /v3.0/backups/{backupId}/export
```

#### リクエスト

| 名前              | 種類   | 形式     | 必須 | 説明                               |
|-----------------|------|--------|----|----------------------------------|
| backupId        | URL  | UUID   | O  | バックアップの識別子                       |
| tenantId        | Body | String | O  | バックアップが保存されるオブジェクトストレージのテナントID   |
| username        | Body | String | O  | NHN Cloud会員またはIAMメンバーID          |
| password        | Body | String | O  | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | Body | String | O  | バックアップが保存されるオブジェクトストレージのコンテナ     |
| objectPath      | Body | String | O  | コンテナに保存されるバックアップのパス              |

<details><summary>例</summary>
<p>

```json
{
    "tenantId": "399631c404744dbbb18ce4fa2dc71a5a",
    "username": "gildong.hong@nhn.com",
    "password": "password",
    "targetContainer": "container",
    "objectPath": "backups/backup_file"
}
```

</p>
</details>

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

> [注意]
> 手動バックアップの場合、バックアップが行われたDBインスタンスが存在しない場合、バックアップをオブジェクトストレージにエクスポートすることができません。

### バックアップを復元する

```http
POST /v3.0/backups/{backupId}/restore
```

#### リクエスト

| 名前                                       | 種類   | 形式      | 必須 | 説明                                                                                                                                                                                                                             |
|------------------------------------------|------|---------|----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| backupId                                 | URL  | UUID    | O  | バックアップの識別子                                                                                                                                                                                                                     |
| dbInstanceName           | Body | String  | O  | DBインスタンスを識別できる マスター名                                           |
| dbInstanceCandidateName  | Body | String  | X  | DBインスタンスを識別できる 予備マスター名                                        |
| description                              | Body | String  | X  | DBインスタンスの追加情報                                                                                                                                                                                                                  |
| dbFlavorId                               | Body | UUID    | O  | DBインスタンス仕様の識別子                                                                                                                                                                                                                 |
| dbPort                                   | Body | Integer | O  | DBポート<br/>- 最小値: `3306`<br/>- 最大値: `43306`                                                                                                                                                                                     |
| parameterGroupId                         | Body | UUID    | O  | パラメータグループの識別子                                                                                                                                                                                                                  |
| dbSecurityGroupIds                       | Body | Array   | X  | DBセキュリティグループの識別子リスト                                                                                                                                                                                                            ||network|Body|Object|O|ネットワーク情報オブジェクト|
| userGroupIds                             | Body | Array   | X  | ユーザーグループの識別子リスト                                                                                                                                                                                                                |
| useHighAvailability                      | Body | Boolean | X  | 高可用性を使用するかどうか<br/>- デフォルト値: `false`                                                                                                                                                                                            |
| pingInterval                             | Body | Number  | X  | 高可用性を使用する時、Ping間隔(秒)<br/>- デフォルト値: `3`<br/>- 最小値: `1`<br/>- 最大値: `600`                                                                                                                                                         |
| useDefaultNotification                   | Body | Boolean | X  | 基本通知を使用するかどうか<br/>- デフォルト値: `false`                                                                                                                                                                                            |
| useDeletionProtection                    | Body | Boolean | X  | 削除保護の有無<br/>- デフォルト値: `false`                                                                                                                                                                                                  | 
| network                                  | Body | Object  | O  | ネットワーク情報オブジェクト                                                                                                                                                                                                                 |
| network.subnetId                         | Body | UUID    | O  | サブネットの識別子                                                                                                                                                                                                                      |
| network.usePublicAccess                  | Body | Boolean | X  | 外部接続可否<br/>- デフォルト値: `false`                                                                                                                                                                                                   |
| network.availabilityZone                 | Body | Enum    | O  | DBインスタンスを作成するアベイラビリティゾーン<br/>- 例: `kr-pub-a`                                                                                                                                                                                   |
| storage                                  | Body | Object  | O  | ストレージ情報オブジェクト                                                                                                                                                                                                                  |    
| storage.storageType                      | Body | Enum    | O  | データストレージタイプ<br/>- 例: `General SSD`                                                                                                                                                                                             |
| storage.storageSize                      | Body | Number  | O  | データストレージサイズ(GB)<br/>- 最小値: `20`<br/>- 最大値: `2048`                                                                                                                                                                              |
| backup                                   | Body | Object  | O  | バックアップ情報オブジェクト                                                                                                                                                                                                                 |
| backup.backupPeriod                      | Body | Number  | O  | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730`                                                                                                                                                                                  |
| backup.ftwrlWaitTimeout                  | Body | Number  | X  | クエリ遅延待機時間(秒)<br/>- デフォルト値: `1800`<br/>- 最小値: `0`<br/>- 最大値: `21600`                                                                                                                                                            |
| backup.backupRetryCount                  | Body | Number  | X  | バックアップ再試行回数<br/>- デフォルト値: `0`<br/>- 最小値: `0`<br/>- 最大値: `10`                                                                                                                                                                   |
| backup.useBackupLock                     | Body | Boolean | X  | テーブルロックを使用するかどうか<br/>- デフォルト値: `true`                                                                                                                                                                                          |
| backup.backupSchedules                   | Body | Array   | O  | 予定された自動バックアップリスト                                                                                                                                                                                                               |
| backup.backupSchedules.backupWndBgnTime  | Body | String  | O  | バックアップ開始時刻<br/>- 例: `00:00:00`                                                                                                                                                                                                 |
| backup.backupSchedules.backupWndDuration | Body | Enum    | O  | バックアップDuration<br/>バックアップ開始時刻からDuration内に自動バックアップが実行されます。<br/>- `HALF_AN_HOUR`: 30分<br/>- `ONE_HOUR`: 1時間<br/>- `ONE_HOUR_AND_HALF`: 1時間30分<br/>- `TWO_HOURS`: 2時間<br/>- `TWO_HOURS_AND_HALF`: 2時間30分<br/>- `THREE_HOURS`: 3時間 |

<details><summary>例</summary>
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
    "backupSchedules": [{
        "backupWndBgnTime": "00:00:00",
        "backupWndDuration": "HALF_AN_HOUR"
    }
    ]
}
}
```

</p>
</details>

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### バックアップを削除する

```http
DELETE /v3.0/backups/{backupId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前       | 種類  | 形式   | 必須 | 説明         |
|----------|-----|------|----|------------|
| backupId | URL | UUID | O  | バックアップの識別子 |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

## DBセキュリティグループ

### DBセキュリティグループ進行状態

| 状態              | 説明          |
|-----------------|-------------|
| `NONE`          | 進行中の作業がない   |
| `CREATING_RULE` | ルールポリシーの作成中 |
| `UPDATING_RULE` | ルールポリシーの修正中 |
| `DELETING_RULE` | ルールポリシーの削除中 |

### DBセキュリティグループリストを表示

```http
GET /v3.0/db-security-groups
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                                   | 種類   | 形式       | 説明                               |
|--------------------------------------|------|----------|----------------------------------|
| dbSecurityGroups                     | Body | Array    | DBセキュリティグループリスト                  |
| dbSecurityGroups.dbSecurityGroupId   | Body | UUID     | DBセキュリティグループの識別子                 |
| dbSecurityGroups.dbSecurityGroupName | Body | String   | DBセキュリティグループを識別できる名前             |
| dbSecurityGroups.description         | Body | String   | DBセキュリティグループの追加情報                |
| dbSecurityGroups.progressStatus      | Body | Enum     | DBセキュリティグループの現在進行状態              |
| dbSecurityGroups.createdYmdt         | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| dbSecurityGroups.updatedYmdt         | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>例</summary>
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

### DBセキュリティグループの詳細を表示

```http
GET /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                | 種類  | 形式   | 必須 | 説明               |
|-------------------|-----|------|----|------------------|
| dbSecurityGroupId | URL | UUID | O  | DBセキュリティグループの識別子 |

#### レスポンス

| 名前                  | 種類   | 形式       | 説明                                                                                                                |
|---------------------|------|----------|-------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId   | Body | UUID     | DBセキュリティグループの識別子                                                                                                  |
| dbSecurityGroupName | Body | String   | DBセキュリティグループを識別できる名前                                                                                              |
| description         | Body | String   | DBセキュリティグループの追加情報                                                                                                 |
| progressStatus      | Body | Enum     | DBセキュリティグループの現在進行状態                                                                                               |
| rules               | Body | Array    | DBセキュリティグループルールリスト                                                                                                |
| rules.ruleId        | Body | UUID     | DBセキュリティグループルールの識別子                                                                                               |
| rules.description   | Body | String   | DBセキュリティグループルールの追加情報                                                                                              |
| rules.direction     | Body | Enum     | 通信方向<br/>- `INGRESS`:受信<br/>- `EGRESS`:送信                                                                         |
| rules.etherType     | Body | Enum     | Etherタイプ<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                    |
| rules.port          | Body | Object   | ポートオブジェクト                                                                                                         |
| rules.port.portType | Body | Enum     | ポートタイプ<br/>- `DB_PORT`:各DBインスタンスポート値に設定されます。<br/>- `PORT`:指定されたポート値に設定されます。<br/>- `PORT_RANGE`:指定されたポート範囲に設定されます。 |
| rules.port.minPort  | Body | Number   | 最小ポート範囲                                                                                                           |
| rules.port.maxPort  | Body | Number   | 最大ポート範囲                                                                                                           |
| rules.cidr          | Body | String   | 許可するトラフィックの遠隔ソース                                                                                                  |
| rules.createdYmdt   | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                  |
| rules.updatedYmdt   | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                  |
| createdYmdt         | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                  |
| updatedYmdt         | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                  |

<details><summary>例</summary>
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

### DBセキュリティグループを作成する

```http
POST /v3.0/db-security-groups
```

#### リクエスト

| 名前                  | 種類   | 形式     | 必須 | 説明                                                                                                                                                                                   |
|---------------------|------|--------|----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupName | Body | String | O  | DBセキュリティグループを識別できる名前                                                                                                                                                                 |
| description         | Body | String | X  | DBセキュリティグループの追加情報                                                                                                                                                                    |
| rules               | Body | Array  | O  | DBセキュリティグループルールリスト                                                                                                                                                                   |
| rules.description   | Body | String | X  | DBセキュリティグループルールの追加情報                                                                                                                                                                 |
| rules.direction     | Body | Enum   | O  | 通信方向<br/>- `INGRESS`:受信<br/>- `EGRESS`:送信                                                                                                                                            |
| rules.etherType     | Body | Enum   | O  | Etherタイプ<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                       |
| rules.cidr          | Body | String | O  | 許可するトラフィックの遠隔ソース<br/>- 例: `1.1.1.1/32`                                                                                                                                               |
| rules.port          | Body | Object | O  | ポートオブジェクト                                                                                                                                                                            |
| rules.port.portType | Body | Enum   | O  | ポートタイプ<br/>- `DB_PORT`:各DBインスタンスポート値に設定されます。 `minPort`値と`maxPort`値を必要としません。<br/>- `PORT`:指定されたポート値に設定されます。 `minPort`値と`maxPort`値が同じでなければなりません。<br/>- `PORT_RANGE`:指定されたポート範囲に設定されます。 |
| rules.port.minPort  | Body | Number | X  | 最小ポート範囲<br/>- 最小値: 1                                                                                                                                                                 |
| rules.port.maxPort  | Body | Number | X  | 最大ポート範囲<br/>- 最大値: 65535                                                                                                                                                             |

> [注意]
> DBポートは送信方向(アウトバウンド)には設定できません。

<details><summary>例</summary>
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

#### レスポンス

| 名前                | 種類   | 形式   | 説明               |
|-------------------|------|------|------------------|
| dbSecurityGroupId | Body | UUID | DBセキュリティグループの識別子 |

---

### DBセキュリティグループを修正する

```http
PUT /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### リクエスト

| 名前                  | 種類   | 形式     | 必須 | 説明                   |
|---------------------|------|--------|----|----------------------|
| dbSecurityGroupId   | URL  | UUID   | O  | DBセキュリティグループの識別子     |
| dbSecurityGroupName | Body | String | X  | DBセキュリティグループを識別できる名前 |
| description         | Body | String | X  | DBセキュリティグループの追加情報    |

<details><summary>例</summary>
<p>

```json
{
    "dbSecurityGroupName": "dbSecurityGroup",
    "description": "description"
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。


<details><summary>例</summary>
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

### DBセキュリティグループを削除する

```http
DELETE /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                | 種類  | 形式   | 必須 | 説明               |
|-------------------|-----|------|----|------------------|
| dbSecurityGroupId | URL | UUID | O  | DBセキュリティグループの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。


<details><summary>例</summary>
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

### DBセキュリティグループルールを作成する

```http
POST /v3.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### リクエスト

| 名前                | 種類   | 形式     | 必須 | 説明                                                                                                                                                                                   |
|-------------------|------|--------|----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O  | DBセキュリティグループの識別子                                                                                                                                                                     |
| description       | Body | String | X  | DBセキュリティグループルールの追加情報                                                                                                                                                                 |
| direction         | Body | Enum   | O  | 通信方向<br/>- `INGRESS`:受信<br/>- `EGRESS`:送信                                                                                                                                            |
| etherType         | Body | Enum   | O  | Etherタイプ<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                       |
| port              | Body | Object | O  | ポートオブジェクト                                                                                                                                                                            |
| port.portType     | Body | Enum   | O  | ポートタイプ<br/>- `DB_PORT`:各DBインスタンスポート値に設定されます。 `minPort`値と`maxPort`値を必要としません。<br/>- `PORT`:指定されたポート値に設定されます。 `minPort`値と`maxPort`値が同じでなければなりません。<br/>- `PORT_RANGE`:指定されたポート範囲に設定されます。 |
| port.minPort      | Body | Number | X  | 最小ポート範囲<br/>- 最小値: 1                                                                                                                                                                 |
| port.maxPort      | Body | Number | X  | 最大ポート範囲<br/>- 最大値: 65535                                                                                                                                                             |
| cidr              | Body | String | O  | 許可するトラフィックの遠隔ソース<br/>- 例: `1.1.1.1/32`                                                                                                                                               |

> [注意]
> DBポートは送信方向(アウトバウンド)には設定できません。

<details><summary>例</summary>
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

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBセキュリティグループルールを修正する

```http
PUT /v3.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### リクエスト

| 名前                | 種類   | 形式     | 必須 | 説明                                                                                                                                                                                   |
|-------------------|------|--------|----|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dbSecurityGroupId | URL  | UUID   | O  | DBセキュリティグループの識別子                                                                                                                                                                     |
| ruleId            | URL  | UUID   | O  | DBセキュリティグループルールの識別子                                                                                                                                                                  |
| description       | Body | String | X  | DBセキュリティグループルールの追加情報                                                                                                                                                                 |
| direction         | Body | Enum   | O  | 通信方向<br/>- `INGRESS`:受信<br/>- `EGRESS`:送信                                                                                                                                            |
| etherType         | Body | Enum   | O  | Etherタイプ<br/>- `IPV4`: IPv4<br/>- `IPV6`: IPv6                                                                                                                                       |
| port              | Body | Object | O  | ポートオブジェクト                                                                                                                                                                            |
| port.portType     | Body | Enum   | O  | ポートタイプ<br/>- `DB_PORT`:各DBインスタンスポート値に設定されます。 `minPort`値と`maxPort`値を必要としません。<br/>- `PORT`:指定されたポート値に設定されます。 `minPort`値と`maxPort`値が同じでなければなりません。<br/>- `PORT_RANGE`:指定されたポート範囲に設定されます。 |
| port.minPort      | Body | Number | X  | 最小ポート範囲<br/>- 最小値: 1                                                                                                                                                                 |
| port.maxPort      | Body | Number | X  | 最大ポート範囲<br/>- 最大値: 65535                                                                                                                                                             |
| cidr              | Body | String | O  | 許可するトラフィックの遠隔ソース<br/>- 例: `1.1.1.1/32`                                                                                                                                               |

> [注意]
> DBポートは送信方向(アウトバウンド)には設定できません。

<details><summary>例</summary>
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

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

### DBセキュリティグループルールを削除する

```http
DELETE /v3.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                | 種類    | 形式    | 必須 | 説明                     |
|-------------------|-------|-------|----|------------------------|
| dbSecurityGroupId | URL   | UUID  | O  | DBセキュリティグループの識別子       |
| ruleIds           | Query | Array | O  | DBセキュリティグループルールの識別子リスト |

#### レスポンス

| 名前    | 種類   | 形式   | 説明            |
|-------|------|------|---------------|
| jobId | Body | UUID | リクエストした作業の識別子 |

---

## パラメータグループ

### パラメータグループリストを表示

```http
GET /v3.0/parameter-groups
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前        | 種類    | 形式   | 必須 | 説明        |
|-----------|-------|------|----|-----------|
| dbVersion | Query | Enum | X  | DBエンジンタイプ |

#### レスポンス

| 名前                                   | 種類   | 形式       | 説明                                                            |
|--------------------------------------|------|----------|---------------------------------------------------------------|
| parameterGroups                      | Body | Array    | パラメータグループリスト                                                  |
| parameterGroups.parameterGroupId     | Body | UUID     | パラメータグループの識別子                                                 |
| parameterGroups.parameterGroupName   | Body | String   | パラメータグループを識別できる名前                                             |
| parameterGroups.description          | Body | String   | パラメータグループの追加情報                                                |
| parameterGroups.dbVersion            | Body | Enum     | DBエンジンタイプ                                                     |
| parameterGroups.parameterGroupStatus | Body | Enum     | パラメータグループの現在状態<br/>- `STABLE`:適用完了<br/>- `NEED_TO_APPLY`:適用必要 |
| parameterGroups.createdYmdt          | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                              |
| parameterGroups.updatedYmdt          | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                              |

<details><summary>例</summary>
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

### パラメータグループの詳細を表示

```http
GET /v3.0/parameter-groups/{parameterGroupId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前               | 種類  | 形式   | 必須 | 説明            |
|------------------|-----|------|----|---------------|
| parameterGroupId | URL | UUID | O  | パラメータグループの識別子 |

#### レスポンス

| 名前                            | 種類   | 形式       | 説明                                                                                              |
|-------------------------------|------|----------|-------------------------------------------------------------------------------------------------|
| parameterGroupId              | Body | UUID     | パラメータグループの識別子                                                                                   |
| parameterGroupName            | Body | String   | パラメータグループを識別できる名前                                                                               |
| description                   | Body | String   | パラメータグループの追加情報                                                                                  |
| dbVersion                     | Body | Enum     | DBエンジンタイプ                                                                                       |
| parameterGroupStatus          | Body | Enum     | パラメータグループの現在状態<br/>- `STABLE`:適用完了<br/>- `NEED_TO_APPLY`:適用必要                                   |
| parameters                    | Body | Array    | パラメータリスト                                                                                        |
| parameters.parameterId        | Body | UUID     | パラメータ識別子                                                                                        |
| parameters.parameterFileGroup | Body | Enum     | パラメータファイルグループタイプ<br/>- `CLIENT`: client<br/>- `MYSQL`: mysql<br/>- `MYSQLD`: mysqld             |
| parameters.parameterName      | Body | String   | パラメータ名                                                                                          |
| parameters.fileParameterName  | Body | String   | パラメータファイル名                                                                                      |
| parameters.value              | Body | String   | 現在設定されている値                                                                                      |
| parameters.defaultValue       | Body | String   | デフォルト値                                                                                          |
| parameters.allowedValue       | Body | String   | 許可された値                                                                                          |
| parameters.updateType         | Body | Enum     | 修正タイプ<br/>- `VARIABLE`:いつでも修正可能<br/>- `CONSTANT`:修正不可<br/>- `INIT_VARIABLE`: DBインスタンス作成時にのみ修正可能 |
| parameters.applyType          | Body | Enum     | 適用タイプ<br/>- `SESSION`:セッション適用<br/>- `FILE`:設定ファイル適用(再起動必要)<br/>- `BOTH`:全体(再起動必要)               |
| createdYmdt                   | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                |
| updatedYmdt                   | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                |

<details><summary>例</summary>
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

### パラメータグループを作成する

```http
POST /v3.0/parameter-groups
```

#### リクエスト

| 名前                 | 種類   | 形式     | 必須 | 説明                |
|--------------------|------|--------|----|-------------------|
| parameterGroupName | Body | String | O  | パラメータグループを識別できる名前 |
| description        | Body | String | X  | パラメータグループの追加情報    |
| dbVersion          | Body | Enum   | O  | DBエンジンタイプ         |

<details><summary>例</summary>
<p>

```json
{
    "parameterGroupName": "parameter-group",
    "dbVersion": "MARIADB_V10330"
}
```

</p>
</details>

#### レスポンス

| 名前               | 種類   | 形式   | 説明            |
|------------------|------|------|---------------|
| parameterGroupId | Body | UUID | パラメータグループの識別子 |

---

### パラメータグループをコピーする

```http
POST /v3.0/parameter-groups/{parameterGroupId}/copy
```

#### リクエスト

| 名前                 | 種類   | 形式     | 必須 | 説明                |
|--------------------|------|--------|----|-------------------|
| parameterGroupId   | URL  | UUID   | O  | パラメータグループの識別子     |
| parameterGroupName | Body | String | O  | パラメータグループを識別できる名前 |
| description        | Body | String | X  | パラメータグループの追加情報    |

<details><summary>例</summary>
<p>

```json
{
    "parameterGroupName": "parameter-group-copy",
    "description": "copy"
}
```

</p>
</details>

#### レスポンス

| 名前               | 種類   | 形式   | 説明            |
|------------------|------|------|---------------|
| parameterGroupId | Body | UUID | パラメータグループの識別子 |

---

### パラメータグループを修正する

```http
PUT /v3.0/parameter-groups/{parameterGroupId}
```

#### リクエスト

| 名前                 | 種類   | 形式     | 必須 | 説明                |
|--------------------|------|--------|----|-------------------|
| parameterGroupId   | URL  | UUID   | O  | パラメータグループの識別子     |
| parameterGroupName | Body | String | X  | パラメータグループを識別できる名前 |
| description        | Body | String | X  | パラメータグループの追加情報    |

<details><summary>例</summary>
<p>

```json
{
    "parameterGroupName": "parameter-group"
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。


<details><summary>例</summary>
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

### パラメータを修正する

```http
PUT /v3.0/parameter-groups/{parameterGroupId}/parameters
```

#### リクエスト

| 名前                             | 種類   | 形式     | 必須 | 説明            |
|--------------------------------|------|--------|----|---------------|
| parameterGroupId               | URL  | UUID   | O  | パラメータグループの識別子 |
| modifiedParameters             | Body | Array  | O  | 変更するパラメータリスト  |
| modifiedParameters.parameterId | Body | UUID   | O  | パラメータの識別子     |
| modifiedParameters.value       | Body | String | O  | 変更するパラメータ値    |

<details><summary>例</summary>
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

#### レスポンス

このAPIはレスポンス本文を返しません。


<details><summary>例</summary>
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

### パラメータグループを再設定する

```http
PUT /v3.0/parameter-groups/{parameterGroupId}/reset
```

#### リクエスト

| 名前               | 種類  | 形式   | 必須 | 説明            |
|------------------|-----|------|----|---------------|
| parameterGroupId | URL | UUID | O  | パラメータグループの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。


<details><summary>例</summary>
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

### パラメータグループを削除する

```http
DELETE /v3.0/parameter-groups/{parameterGroupId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前               | 種類  | 形式   | 必須 | 説明            |
|------------------|-----|------|----|---------------|
| parameterGroupId | URL | UUID | O  | パラメータグループの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。


<details><summary>例</summary>
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

## ユーザーグループ

### ユーザーグループリストを表示

```http
GET /v3.0/user-groups
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                       | 種類   | 形式       | 説明                               |
|--------------------------|------|----------|----------------------------------|
| userGroups               | Body | Array    | ユーザーグループリスト                      |
| userGroups.userGroupId   | Body | UUID     | ユーザーグループの識別子                     |
| userGroups.userGroupName | Body | String   | ユーザーグループを識別できる名前                 |
| userGroups.createdYmdt   | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| userGroups.updatedYmdt   | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>例</summary>
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

### ユーザーグループの詳細を表示

```http
GET /v3.0/user-groups/{userGroupId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前          | 種類  | 形式   | 必須 | 説明           |
|-------------|-----|------|----|--------------|
| userGroupId | URL | UUID | O  | ユーザーグループの識別子 |

#### レスポンス

| 名前                | 種類   | 形式       | 説明                                                                                                        |
|-------------------|------|----------|-----------------------------------------------------------------------------------------------------------|
| userGroupId       | Body | UUID     | ユーザーグループの識別子                                                                                              |
| userGroupName     | Body | String   | ユーザーグループを識別できる名前                                                                                          |
| userGroupTypeCode | Body | Enum     | ユーザーグループの種類  <br /> `ENTIRE`:プロジェクトメンバー全体を含むユーザーグループ <br /> `INDIVIDUAL_MEMBER`:特定のプロジェクトメンバーをを含むユーザーグループ |
| members           | Body | Array    | プロジェクトメンバーリスト                                                                                             |
| members.memberId  | Body | UUID     | プロジェクトメンバーの識別子                                                                                            |
| createdYmdt       | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                          |
| updatedYmdt       | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                          |

<details><summary>例</summary>
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

### ユーザーグループを作成する

```http
POST /v3.0/user-groups
```

#### リクエスト

| 名前            | 種類   | 形式      | 必須 | 説明                                                              |
|---------------|------|---------|----|-----------------------------------------------------------------|
| userGroupName | Body | String  | O  | ユーザーグループを識別できる名前                                                |
| memberIds     | Body | Array   | O  | プロジェクトメンバーの識別子リスト <br /> `selectAllYN`がtrueの場合、当該フィールドの値は無視されます |
| selectAllYN   | Body | Boolean | X  | プロジェクトメンバー全体かどうか <br /> trueの場合、当該グループは全メンバーに対して設定されます          |

<details><summary>例</summary>
<p>

```json
{
    "userGroupName": "dev-team",
    "memberIds": ["1321e759-2ef3-4b85-9921-b13e918b24b5"]
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

#### レスポンス

| 名前          | 種類   | 形式   | 説明           |
|-------------|------|------|--------------|
| userGroupId | Body | UUID | ユーザーグループの識別子 |

---

### ユーザーグループを修正する

```http
PUT /v3.0/user-groups/{userGroupId}
```

#### リクエスト

| 名前            | 種類   | 形式      | 必須 | 説明                                                    |
|---------------|------|---------|----|-------------------------------------------------------|
| userGroupId   | URL  | UUID    | O  | ユーザーグループの識別子                                          |
| userGroupName | Body | String  | X  | ユーザーグループを識別できる名前                                      |
| memberIds     | Body | Array   | X  | プロジェクトメンバーの識別子リスト                                     |
| selectAllYN   | Body | Boolean | X  | プロジェクトメンバー全体かどうか<br /> trueの場合、当該グループは全メンバーに対して設定されます |

<details><summary>例</summary>
<p>

```json
{
    "userGroupName": "dev-team",
    "memberIds": ["1321e759-2ef3-4b85-9921-b13e918b24b5","f9064b09-2b15-442e-a4b0-3a5a2754555e"]
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。


<details><summary>例</summary>
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

### ユーザーグループを削除する

```http
DELETE /v3.0/user-groups/{userGroupId}
```

#### リクエスト

| 名前          | 種類  | 形式   | 必須 | 説明           |
|-------------|-----|------|----|--------------|
| userGroupId | URL | UUID | O  | ユーザーグループの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。


<details><summary>例</summary>
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

## 通知グループ

### 通知グループリストを表示

```http
GET /v3.0/notification-groups
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                                       | 種類   | 形式       | 説明                               |
|------------------------------------------|------|----------|----------------------------------|
| notificationGroups                       | Body | Array    | 通知グループリスト                        |
| notificationGroups.notificationGroupId   | Body | UUID     | 通知グループの識別子                       |
| notificationGroups.notificationGroupName | Body | String   | 通知グループを識別できる名前                   |
| notificationGroups.notifyEmail           | Body | Boolean  | メール通知                            |
| notificationGroups.notifySms             | Body | Boolean  | SMS通知                            |
| notificationGroups.isEnabled             | Body | Boolean  | 有効かどうか                           |
| notificationGroups.createdYmdt           | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| notificationGroups.updatedYmdt           | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>例</summary>
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

### アラームグループの詳細を表示

```http
GET /v3.0/notification-groups/{notificationGroupId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                  | 種類  | 形式   | 必須 | 説明         |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | 通知グループの識別子 |

#### レスポンス

| 名前                         | 種類   | 形式       | 説明                               |
|----------------------------|------|----------|----------------------------------|
| notificationGroupId        | Body | UUID     | 通知グループの識別子                       |
| notificationGroupName      | Body | String   | 通知グループを識別できる名前                   |
| notifyEmail                | Body | Boolean  | メール通知                            |
| notifySms                  | Body | Boolean  | SMS通知                            |
| isEnabled                  | Body | Boolean  | 有効化かどうか                          |
| dbInstances                | Body | Array    | 監視対象DBインスタンスリスト                  |
| dbInstances.dbInstanceId   | Body | UUID     | DBインスタンスの識別子                     |
| dbInstances.dbInstanceName | Body | String   | DBインスタンスを識別できる名前                 |
| userGroups                 | Body | Array    | ユーザーグループリスト                      |
| userGroups.userGroupId     | Body | UUID     | ユーザーグループの識別子                     |
| userGroups.userGroupName   | Body | String   | ユーザーグループを識別できる名前                 |
| createdYmdt                | Body | DateTime | 作成日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| updatedYmdt                | Body | DateTime | 修正日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>例</summary>
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
        }],
    "userGroups": [
            {
            "userGroupId": "1aac0437-f32d-4923-ad3c-ac61c1cfdfe0",
            "userGroupName": "dev-team"
        }],
    "createdYmdt": "2023-02-20T13:34:13+09:00",
    "updatedYmdt": "2023-02-20T13:34:13+09:00"
}
```

</p>
</details>

---

### アラームグループを作成する

```http
POST /v3.0/notification-groups
```

#### リクエスト

| 名前                    | 種類   | 形式      | 必須 | 説明                          |
|-----------------------|------|---------|----|-----------------------------|
| notificationGroupName | Body | String  | O  | 通知グループを識別できる名前              |
| notifyEmail           | Body | Boolean | X  | メール通知<br/>- デフォルト値: `true`  |
| notifySms             | Body | Boolean | X  | SMS通知<br/>- デフォルト値: `true`  |
| isEnabled             | Body | Boolean | X  | 有効かどうか<br/>- デフォルト値: `true` |
| dbInstanceIds         | Body | Array   | O  | 監視対象DBインスタンスの識別子リスト         |
| userGroupIds          | Body | Array   | O  | ユーザーグループの識別子リスト             |

<details><summary>例</summary>
<p>

```json
{
    "notificationGroupName": "dev-team-noti",
    "notifyEmail": false,
    "isEnable": true,
    "dbInstanceIds": ["ed5cb985-526f-4c54-9ae0-40288593de65"],
    "userGroupIds": ["1aac0437-f32d-4923-ad3c-ac61c1cfdfe0"]
}
```

</p>
</details>

#### レスポンス

| 名前                  | 種類   | 形式   | 説明         |
|---------------------|------|------|------------|
| notificationGroupId | Body | UUID | 通知グループの識別子 |

---

### アラームグループを修正する

```http
PUT /v3.0/notification-groups/{notificationGroupId}
```

#### リクエスト

| 名前                    | 種類   | 形式      | 必須 | 説明                  |
|-----------------------|------|---------|----|---------------------|
| notificationGroupId   | URL  | UUID    | O  | 通知グループの識別子          |
| notificationGroupName | Body | String  | X  | 通知グループを識別できる名前      |
| notifyEmail           | Body | Boolean | X  | メール通知               |
| notifySms             | Body | Boolean | X  | SMS通知               |
| isEnabled             | Body | Boolean | X  | 有効かどうか              |
| dbInstanceIds         | Body | Array   | X  | 監視対象DBインスタンスの識別子リスト |
| userGroupIds          | Body | Array   | X  | ユーザーグループの識別子リスト     |

<details><summary>例</summary>
<p>

```json
{
    "notifyEmail": true,
    "dbInstanceIds": ["ed5cb985-526f-4c54-9ae0-40288593de65", "d51b7da0-682f-47ff-b588-b739f6adc740"]
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。


<details><summary>例</summary>
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

### アラームグループを削除する

```http
DELETE /v3.0/notification-groups/{notificationGroupId}
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                  | 種類  | 形式   | 必須 | 説明         |
|---------------------|-----|------|----|------------|
| notificationGroupId | URL | UUID | O  | 通知グループの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。


<details><summary>例</summary>
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

## モニタリング

### Metricリストを表示

```http
GET /v3.0/metrics
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                  | 種類   | 形式     | 説明        |
|---------------------|------|--------|-----------|
| metrics             | Body | Array  | Metricリスト |
| metrics.measureName | Body | Enum   | 照会指標タイプ   |
| metrics.unit        | Body | String | 測定値単位     |

<details><summary>例</summary>
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

### 統計情報の照会

```http
GET /v3.0/metric-statistics
```

#### リクエスト

| 名前           | 種類    | 形式       | 必須 | 説明                               |
|--------------|-------|----------|----|----------------------------------|
| dbInstanceId | Query | UUID     | O  | DBインスタンスの識別子                     |
| measureNames | Query | Array    | O  | 照会指標リスト<br/>- 最小サイズ: `1`         |
| from         | Query | Datetime | O  | 開始日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| to           | Query | Datetime | O  | 終了日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |
| interval     | Query | Number   | X  | 照会間隔                             |

#### レスポンス

| 名前                                | 種類   | 形式        | 説明      |
|-----------------------------------|------|-----------|---------|
| metricStatistics                  | Body | Array     | 統計情報リスト |
| metricStatistics.measureName      | Body | Enum      | 測定項目タイプ |
| metricStatistics.unit             | Body | String    | 測定値単位   |
| metricStatistics.values           | Body | Array     | 測定値リスト  |
| metricStatistics.values.timestamp | Body | Timestamp | 測定時間    |
| metricStatistics.values.value     | Body | Object    | 測定値     |

<details><summary>例</summary>
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

## イベント

### イベントカテゴリー

イベントはカテゴリに分類することができ、下記の通りです。

| イベントカテゴリー   | 説明       |
|-------------|----------|
| ALL         | 全体       |
| BACKUP      | バックアップ   |
| DB_INSTANCE | DBインスタンス |
| JOB         | 作業       |
| TENANT      | テナント     |
| MONITORING  | モニタリング   |

### イベントリスト照会

```http
GET /v3.0/events
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前                | 種類    | 形式       | 必須 | 説明                                                                                                                                           |
|-------------------|-------|----------|----|----------------------------------------------------------------------------------------------------------------------------------------------|
| page              | Query | Number   | O  | 照会するリストのページ<br/>- 最小値: `1`                                                                                                                   |
| size              | Query | Number   | O  | 照会するリストのページサイズ<br/>- 最小値: `1`<br/>- 最大値: `100`                                                                                               |
| from              | Query | Datetime | O  | 開始日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                             |
| to                | Query | Datetime | O  | 終了日時(YYYY-MM-DDThh:mm:ss.SSSTZD)                                                                                                             |
| eventCategoryType | Query | Enum     | O  | 照会するイベントカテゴリータイプ<br/>- `ALL`:全体<br/>- `INSTANCE`: DBインスタンス<br/>- `BACKUP`:バックアップ<br/>- `DB_SECURITY_GROUP`: DBセキュリティグループ<br/>- `TENANT`:テナント |
| sourceId          | Query | String   | X  | イベントが発生した対象リソースの識別子                                                                                                                          |
| keyword           | Query | String   | X  | イベントメッセージに含まれる文字列検索ワード                                                                                                                       |
| ascendingOrder    | Query | Enum     | X  | イベントメッセージソート順序<br/>- `ASC`:昇順<br/>- `DESC`:降順<br/>- デフォルト値: `DESC`                                                                           |

#### レスポンス

| 名前                       | 種類   | 形式       | 説明                                   |
|--------------------------|------|----------|--------------------------------------|
| totalCounts              | Body | Number   | 全イベントリストの数                           |
| events                   | Body | Array    | イベントリスト                              |
| events.eventCategoryType | Body | Enum     | イベントカテゴリータイプ                         |
| events.eventCode         | Body | Enum     | 発生したイベントのタイプ                         |
| events.sourceId          | Body | String   | イベントソースの識別子                          |
| events.sourceName        | Body | String   | イベントソースを識別できる名前                      |
| events.messages          | Body | Array    | イベントメッセージリスト                         |
| events.messages.langCode | Body | String   | 言語コード                                |
| events.messages.message  | Body | String   | イベントメッセージ                            |
| events.eventYmdt         | Body | DateTime | イベント発生日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

<details><summary>例</summary>
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
                    "message": "DBインスタンス起動"
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

### 購読可能なイベントコード一覧表示

```http
GET /v3.0/event-codes
```

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前                           | 種類   | 形式    | 説明           |
|------------------------------|------|-------|--------------|
| eventCodes                   | Body | Array | イベントコードリスト   |
| eventCodes.eventCode         | Body | Enum  | イベントコード      |
| eventCodes.eventCategoryType | Body | Enum  | イベントカテゴリータイプ |

<details><summary>例</summary>
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
