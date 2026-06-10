## Database > RDS for MySQL > APIガイド

## RDS for MySQL API共通情報

### APIエンドポイント

| リージョン            | エンドポイント           |
|------------------|-------------------|
| 韓国(パンギョ)リージョン | https://kr1-rds-mysql.api.gov-nhncloudservice.com |

### 認証及び権限

RDS for MySQLは、API呼び出し時の認証/認可のためにUser Access Keyトークンを使用します。User Access Keyトークンは、User Access Keyに基づいて発行されるBearerタイプの一時的なアクセストークンです。User Access Keyトークンの発行及び使用に関する詳細は、[User Access Keyトークン](/nhncloud/ja/public-api/user-access-key-token)を参照してください。
発行されたトークンはAppkeyと一緒にリクエストHeaderに含める必要があります。

| 名前                  | 種類     | 形式     | 必須 | 説明                                                        |
|---------------------|--------|--------|----|-----------------------------------------------------------|
| X-TC-APP-KEY        | Header | String | O  | RDS for MySQLサービスのAppkeyまたはプロジェクト統合Appkey |
| X-NHN-AUTHORIZATION | Header | String | O  | Public APIで発行されたBearerタイプトークン                             |


また、プロジェクトメンバーのロールによって呼び出すことができるAPIが制限されます。 `RDS for MySQL ADMIN`, `RDS for MySQL VIEWER`で区分して権限を付与できます。

* `RDS for MySQL ADMIN`権限は全ての機能を使用可能です。
* `RDS for MySQL VIEWER`権限は情報を照会する機能のみ使用可能です。
    * DBインスタンスを作成、修正、削除したり、DBインスタンスを対象とするいかなる機能も使用できません。
    * ただし、通知グループとユーザーグループに関連する機能は使用可能です。

APIリクエスト時、認証に失敗したり権限がない場合、次のようなエラーが発生します。

| resultCode | resultMessage | 説明         |
|------------|---------------|------------|
| 80401      | Unauthorized  | 認証に失敗しました。 |
| 80403      | Forbidden     | 権限がありません。  |

### レスポンス共通情報

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


### DBエンジンタイプ

| DBエンジンタイプ | 作成可否 | OBSからの復元可否 | 認証プラグインサポート情報 |
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

* ENUMタイプのdbVersionフィールドに対して該当値を使用できます。
* バージョンによって作成または復元が不可能な場合があります。

## プロジェクト情報

### プロジェクトメンバーリストを表示

```http
GET /v4.0/project/members
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Project.Get | プロジェクトメンバーリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| members | Body | Array | プロジェクトメンバーリスト |
| members.memberId | Body | UUID | プロジェクトメンバーの識別子 |
| members.memberName | Body | String | プロジェクトメンバーの名前 |
| members.emailAddress | Body | String | プロジェクトメンバーのメールアドレス |
| members.phoneNumber | Body | String | プロジェクトメンバーの電話番号 |

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

### リージョンリストを表示

```http
GET /v4.0/project/regions
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Project.Get | リージョンリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| regions | Body | Array | リージョンリスト |
| regions.regionCode | Body | Enum | リージョンコード<br/>- KR1: `韓国(パンギョ)` |
| regions.isEnabled | Body | Boolean | リージョンが有効かどうか |

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
            "isEnabled": false
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
GET /v4.0/db-flavors
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbFlavor.List | DBインスタンス仕様リスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbFlavors | Body | Array | DBインスタンス仕様リスト |
| dbFlavors.dbFlavorId | Body | UUID | DBインスタンス仕様の識別子 |
| dbFlavors.dbFlavorName | Body | String | DBインスタンス仕様名 |
| dbFlavors.ram | Body | Number | メモリ容量(MB) |
| dbFlavors.vcpus | Body | Number | CPUコア数 |

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

## ネットワーク

### サブネットリストを表示

```http
GET /v4.0/network/subnets
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Network.List | サブネットリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| subnets | Body | Array | サブネットリスト |
| subnets.subnetId | Body | UUID | サブネットの識別子 |
| subnets.subnetName | Body | String | サブネットを識別できる名前 |
| subnets.subnetCidr | Body | String | サブネットのCIDR |
| subnets.usingGateway | Body | Boolean | ゲートウェイを使用するかどうか |
| subnets.availableIpCount | Body | Number | 使用可能なIP数 |

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

## DBエンジン

### DBエンジンリストを表示

```http
GET /v4.0/db-versions
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbVersion.List | DBエンジンリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbVersions | Body | Array | DBエンジンリスト |
| dbVersions.dbVersion | Body | String | DBエンジンタイプ |
| dbVersions.dbVersionName | Body | String | DBエンジン名 |
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

## データストレージ

### データストレージタイプリストを表示

```http
GET /v4.0/storage-types
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Storage.List | データストレージタイプリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| storageTypes | Body | Array | データストレージタイプリスト |

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

## 作業情報

### 作業状態

| 状態名              | 説明                 |
|--------------------|----------------------|
| `PREPARING`        | 作業が準備中の場合       |
| `READY`            | 作業が準備完了している場合    |
| `RUNNING`          | 作業が進行中の場合       |
| `COMPLETED`        | 作業が完了している場合      |
| `REGISTERED`       | 作業が登録されている場合     |
| `WAIT_TO_REGISTER` | 作業登録待機中の場合     |
| `INTERRUPTED`      | 作業進行中に割り込みが発生した場合 |
| `CANCELED`         | 作業がキャンセルされた場合    |
| `FAILED`           | 作業が失敗した場合         |
| `ERROR`            | 作業進行中にエラーが発生した場合 |
| `DELETED`          | 作業が削除された場合         |
| `FAIL_TO_READY`    | 作業の準備に失敗した場合     |

### 作業情報の詳細表示

```http
GET /v4.0/jobs/{jobId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Job.Get | 作業情報詳細表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 作業の識別子 |
| jobStatus | Body | Enum | 作業の現在状態<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Body | Array | 関連リソースリスト |
| resourceRelations.resourceType | Body | String | 関連リソースタイプ |
| resourceRelations.resourceId | Body | String | 関連リソースの識別子 |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
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
## DBインスタンスグループ

### DBインスタンスグループリストを表示

```http
GET /v4.0/db-instance-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceGroup.List | DBインスタンスグループリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbInstanceGroups | Body | Array | DBインスタンスグループリスト |
| dbInstanceGroups.dbInstanceGroupId | Body | UUID | DBインスタンスグループの識別子 |
| dbInstanceGroups.replicationType | Body | Enum | DBインスタンスグループの複製形態<br/>- STANDALONE: `高可用性を使用しない`<br/>- HIGH_AVAILABILITY: `高可用性を使用` |
| dbInstanceGroups.createdYmdt | Body | DateTime | 作成日時 |
| dbInstanceGroups.updatedYmdt | Body | DateTime | 修正日時 |

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

### DBインスタンスグループの詳細を表示

```http
GET /v4.0/db-instance-groups/{dbInstanceGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceGroup.Get | DBインスタンスグループ詳細表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbInstanceGroupId | Body | UUID | DBインスタンスグループの識別子 |
| replicationType | Body | Enum | DBインスタンスグループの複製形態<br/>- STANDALONE: `高可用性を使用しない`<br/>- HIGH_AVAILABILITY: `高可用性を使用` |
| dbInstances | Body | Array | DBインスタンスグループに属するDBインスタンスリスト |
| dbInstances.dbInstanceId | Body | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceType | Body | Enum | DBインスタンスの役割タイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstances.dbInstanceStatus | Body | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(グリーン)`<br/>- STORAGE_FULL: `容量不足(レッド)`<br/>- FAIL_TO_CREATE: `作成失敗(レッド)`<br/>- FAIL_TO_CONNECT: `接続失敗(レッド)`<br/>- REPLICATION_STOP: `複製中断(レッド)`<br/>- REPLICATION_DELAY: `複製遅延(イエロー)`<br/>- FAILOVER: `フェイルオーバー完了(レッド)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
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

## DBインスタンス

### DBインスタンス状態

| 状態                  | 説明                           |
|---------------------|------------------------------|
| `AVAILABLE`         | DBインスタンスが使用可能な場合 |
| `BEFORE_CREATE`     | DBインスタンスが作成前の場合 |
| `STORAGE_FULL`      | DBインスタンスの容量が不足している場合 |
| `FAIL_TO_CREATE`    | DBインスタンス作成に失敗した場合 |
| `FAIL_TO_CONNECT`   | DBインスタンス接続に失敗した場合 |
| `REPLICATION_STOP`  | DBインスタンスの複製が中断した場合 |
| `FAILOVER`          | DBインスタンスが高可用性フェイルオーバーした場合 |
| `SHUTDOWN`          | DBインスタンスが停止した場合 |
| `DELETED`           | DBインスタンスが削除された場合 |

### DBインスタンス進行状態

| 状態                         | 説明           |
|----------------------------|--------------|
| `APPLYING_PARAMETER_GROUP` | パラメータグループ適用中 |
| `BACKING_UP`               | バックアップ中 |
| `CANCELING`                | キャンセル中 |
| `CREATING`                 | 作成中 |
| `CREATING_SCHEMA`          | DBスキーマ作成中 |
| `CREATING_USER`            | ユーザー作成中 |
| `DELETING`                 | 削除中 |
| `DELETING_SCHEMA`          | DBスキーマ削除中 |
| `DELETING_USER`            | ユーザー削除中 |
| `EXPORTING_BACKUP`         | バックアップをエクスポート中 |
| `FAILING_OVER`             | フェイルオーバー中 |
| `MIGRATING`                | マイグレーション中 |
| `MODIFYING`                | 修正中 |
| `PREPARING`                | 準備中 |
| `PROMOTING`                | 昇格中 |
| `REBUILDING`               | 再構築中 |
| `REPAIRING`                | 復旧中 |
| `REPLICATING`              | 複製中 |
| `RESTARTING`               | 再起動中 |
| `RESTARTING_FORCIBLY`      | 強制再起動中 |
| `RESTORING`                | 復元中 |
| `STARTING`                 | 起動中 |
| `STOPPING`                 | 停止中 |
| `SYNCING_SCHEMA`           | DBスキーマ同期中 |
| `SYNCING_USER`             | ユーザー同期中 |
| `UPDATING_USER`            | ユーザー修正中 |

### DBインスタンスリストを表示

```http
GET /v4.0/db-instances
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.List | DBインスタンスリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbInstances | Body | Array | DBインスタンスリスト |
| dbInstances.dbInstanceId | Body | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceGroupId | Body | UUID | DBインスタンスグループの識別子 |
| dbInstances.dbInstanceName | Body | String | DBインスタンスを識別できる名前 |
| dbInstances.description | Body | String | DBインスタンスの追加情報 |
| dbInstances.dbVersion | Body | Enum | DBエンジンタイプ |
| dbInstances.dbPort | Body | Number | DBポート |
| dbInstances.dbInstanceType | Body | Enum | DBインスタンスの役割タイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstances.dbInstanceStatus | Body | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(グリーン)`<br/>- STORAGE_FULL: `容量不足(レッド)`<br/>- FAIL_TO_CREATE: `作成失敗(レッド)`<br/>- FAIL_TO_CONNECT: `接続失敗(レッド)`<br/>- REPLICATION_STOP: `複製中断(レッド)`<br/>- REPLICATION_DELAY: `複製遅延(イエロー)`<br/>- FAILOVER: `フェイルオーバー完了(レッド)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| dbInstances.progressStatus | Body | Enum | DBインスタンスの現在進行状態<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbInstances.createdYmdt | Body | DateTime | 作成日時 |
| dbInstances.updatedYmdt | Body | DateTime | 修正日時 |

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
### DBインスタンスを作成する

```http
POST /v4.0/db-instances
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Create | DBインスタンスの作成 |

#### 共通リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | O | DBインスタンスを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | Body | String | X | DBインスタンスに関する追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | Body | UUID | O | DBインスタンス仕様の識別子 |
| dbVersion | Body | Enum | O | DBエンジンタイプ |
| dbPort | Body | Number | O | DBポート<br/>- 最小値: 3306、最大値: 43306 |
| dbUserName | Body | String | O | DBユーザーアカウント名<br/>- 最小長さ: `1`<br/>- 最大長さ: `32` |
| dbPassword | Body | String | O | DBユーザーアカウントのパスワード<br/>- 最小長さ: `4`<br/>- 最大長さ: `256` |
| parameterGroupId | Body | UUID | O | パラメータグループの識別子 |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |
| useHighAvailability | Body | Boolean | X | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| pingInterval | Body | Number | X | 高可用性使用時のPing間隔(秒)<br/>- デフォルト値: `3`<br/>- 最小値: `1`<br/>- 最大値: `600` |
| useDefaultNotification | Body | Boolean | X | 基本通知の使用有無<br/>- デフォルト値: `false` |
| useDeletionProtection | Body | Boolean | X | 削除保護の有無<br/>- デフォルト値: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query分析の有無<br/>- デフォルト値: `true` |
| authenticationPlugin | Body | Enum | X | 認証プラグイン<br/>- NATIVE: `mysql_native_password認証`<br/>- CACHING_SHA2: `caching_sha2_password認証(MySQL専用)`<br/>- SHA256: `sha256_password認証(MySQL専用)` |
| tlsOption | Body | Enum | X | TLS Option<br/>- デフォルト値: `NONE`<br/>- NONE: `TLS未使用`<br/>- SSL: `SSL認証`<br/>- X509: `X509証明書認証` |
| network | Body | Object | O | ネットワーク情報オブジェクト |
| network.subnetId | Body | UUID | O | サブネットの識別子 |
| network.usePublicAccess | Body | Boolean | X | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Body | Enum | O | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Body | Object | O | データストレージ情報オブジェクト |
| storage.storageType | Body | Enum | O | データストレージタイプ |
| storage.storageSize | Body | Number | O | データストレージサイズ(GB)<br/>- 最小値: `20` |
| storage.storageAutoscale | Body | Object | X | データストレージ自動拡張オブジェクト |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | ストレージ自動拡張を行うかどうか<br/>- デフォルト値: `false` |
| backup | Body | Object | O | バックアップ情報オブジェクト |
| backup.backupPeriod | Body | Number | O | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Body | Number | X | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.replicationRegion | Body | Enum | X | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)` |
| backup.useBackupLock | Body | Boolean | X | テーブルロックを使用するかどうか<br/>- デフォルト値: `true` |
| backup.backupSchedules | Body | Array | O | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### 高可用性使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |

#### ストレージ自動拡張使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

<details><summary>例</summary>
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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### オブジェクトストレージを利用したDBインスタンスの復元

```http
POST /v4.0/db-instances/restore-from-obs
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.RestoreFromObs | DBインスタンスオブジェクトストレージから復元 |

#### 共通リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | O | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | Body | String | X | DBインスタンスに関する追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | Body | UUID | O | DBインスタンス仕様の識別子 |
| dbPort | Body | Number | O | DBポート |
| dbVersion | Body | Enum | O | DBエンジンタイプ |
| useHighAvailability | Body | Boolean | X | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| pingInterval | Body | Number | X | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| storage | Body | Object | O | データストレージ情報オブジェクト |
| storage.storageType | Body | Enum | O | ストレージタイプ |
| storage.storageSize | Body | Number | O | データストレージサイズ(GB)<br/>- 最小値: `20` |
| storage.storageAutoscale | Body | Object | X | データストレージ自動拡張オブジェクト |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | ストレージ自動拡張を行うかどうか<br/>- デフォルト値: `false` |
| network | Body | Object | O | ネットワーク情報オブジェクト |
| network.subnetId | Body | UUID | O | サブネットの識別子 |
| network.usePublicAccess | Body | Boolean | X | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Body | Enum | O | DBインスタンスを作成するアベイラビリティゾーン |
| backup | Body | Object | O | バックアップ情報オブジェクト |
| backup.backupPeriod | Body | Number | O | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.ftwrlWaitTimeout | Body | Number | X | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.backupRetryCount | Body | Number | X | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Body | Enum | X | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)` |
| backup.useBackupLock | Body | Boolean | X | テーブルロックを使用するかどうか<br/>- デフォルト値: `true` |
| backup.backupSchedules | Body | Array | O | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| restore | Body | Object | O | 復元情報オブジェクト |
| restore.tenantId | Body | String | O | バックアップが保存されたオブジェクトストレージのテナントID |
| restore.username | Body | String | O | NHN Cloud会員またはIAMメンバーID |
| restore.password | Body | String | O | バックアップが保存されたオブジェクトストレージのAPIパスワード |
| restore.targetContainer | Body | String | O | バックアップが保存されたオブジェクトストレージのコンテナ |
| restore.objectPath | Body | String | O | コンテナに保存されたバックアップのパス |
| useDefaultNotification | Body | Boolean | X | 基本通知の使用有無<br/>- デフォルト値: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query分析の有無<br/>- デフォルト値: `true` |
| parameterGroupId | Body | UUID | O | パラメータグループの識別子 |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |
| useDeletionProtection | Body | Boolean | X | 削除保護の有無<br/>- デフォルト値: `false` |

#### 高可用性使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |

#### ストレージ自動拡張使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

<details><summary>例</summary>
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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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
### DBインスタンスを削除する

```http
DELETE /v4.0/db-instances/{dbInstanceId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Delete | DBインスタンスの削除 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| deleteAutoBackup | Body | Boolean | X | 自動バックアップの削除有無<br/>- デフォルト値: `false` |

<details><summary>例</summary>
<p>

```json
{
    "deleteAutoBackup": false
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBインスタンスの詳細を表示

```http
GET /v4.0/db-instances/{dbInstanceId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | DBインスタンス詳細表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbInstanceId | Body | UUID | DBインスタンスの識別子 |
| dbInstanceGroupId | Body | UUID | DBインスタンスグループの識別子 |
| dbInstanceName | Body | String | DBインスタンスを識別できる名前 |
| description | Body | String | DBインスタンスの追加情報 |
| dbVersion | Body | Enum | DBエンジンタイプ |
| dbPort | Body | Number | DBポート |
| dbInstanceType | Body | Enum | DBインスタンスの役割タイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstanceStatus | Body | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(グリーン)`<br/>- STORAGE_FULL: `容量不足(レッド)`<br/>- FAIL_TO_CREATE: `作成失敗(レッド)`<br/>- FAIL_TO_CONNECT: `接続失敗(レッド)`<br/>- REPLICATION_STOP: `複製中断(レッド)`<br/>- REPLICATION_DELAY: `複製遅延(イエロー)`<br/>- FAILOVER: `フェイルオーバー完了(レッド)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| progressStatus | Body | Enum | DBインスタンスの現在作業進行状態<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbFlavorId | Body | UUID | DBインスタンス仕様の識別子 |
| parameterGroupId | Body | UUID | DBインスタンスに適用されたパラメータグループの識別子 |
| dbSecurityGroupIds | Body | Array | DBインスタンスに適用されたDBセキュリティグループの識別子リスト |
| notificationGroupIds | Body | Array | DBインスタンスに適用された通知グループの識別子リスト |
| useDeletionProtection | Body | Boolean | DBインスタンス削除保護の有無 |
| useSlowQueryAnalysis | Body | Boolean | Slow query分析を行うかどうか |
| supportAuthenticationPlugin | Body | Boolean | 認証プラグインサポートの有無 |
| needToApplyParameterGroup | Body | Boolean | 最新パラメータグループの適用が必要かどうか |
| needMigration | Body | Boolean | マイグレーションが必要かどうか |
| supportDbVersionUpgrade | Body | Boolean | DBのバージョンアップグレードをサポートするかどうか |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
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

### DBインスタンスを修正する

```http
PUT /v4.0/db-instances/{dbInstanceId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | DBインスタンスを修正する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbInstanceName | Body | String | X | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| dbInstanceCandidateName | Body | String | X | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | Body | String | X | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbPort | Body | Number | X | DBポート<br/>- 最小値: `3306`<br/>- 最大値: `43306` |
| dbFlavorId | Body | UUID | X | DBインスタンス仕様の識別子 |
| parameterGroupId | Body | UUID | X | パラメータグループの識別子 |
| dbVersion | Body | Enum | X | DBエンジンバージョンコード |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query分析を行うかどうか |
| useDummy | Body | Boolean | X | 単一DBインスタンスのDBバージョンアップグレード時にダミーを使用するかどうか<br/>- デフォルト値: `false` |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| executeBackup | Body | Boolean | X | 現時点でバックアップを行うかどうか<br/>- デフォルト値: `false` |
| useOnlineFailover | Body | Boolean | X | フェイルオーバーを利用した再起動を行うかどうか<br/>- デフォルト値: `false` |
| waitReplicationDelay | Body | Boolean | X | レプリケーション遅延解消の待機有無<br/>- デフォルト値: `false` |
| useReadOnly | Body | Boolean | X | 読み取り専用への変更有無<br/>- デフォルト値: `false` |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### バックアップ情報を表示

```http
GET /v4.0/db-instances/{dbInstanceId}/backup-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | バックアップ情報を表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| backupPeriod | Body | Number | バックアップ保管期間(日) |
| ftwrlWaitTimeout | Body | Number | クエリ遅延待機時間(秒) |
| backupRetryCount | Body | Number | バックアップ再試行回数 |
| replicationRegion | Body | Enum | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)` |
| useBackupLock | Body | Boolean | テーブルロックを使用するかどうか |
| backupSchedules | Body | Array | 予定された自動バックアップリスト |
| backupSchedules.backupWndBgnTime | Body | Time | バックアップ開始時刻 |
| backupSchedules.backupWndDuration | Body | Enum | バックアップDuration<br/>- HALF_AN_HOUR<br/>- ONE_HOUR<br/>- ONE_HOUR_AND_HALF<br/>- TWO_HOURS<br/>- TWO_HOURS_AND_HALF<br/>- THREE_HOURS |

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

</p>
</details>

---

### バックアップ情報を修正する

```http
PUT /v4.0/db-instances/{dbInstanceId}/backup-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | バックアップ情報を修正する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| backupPeriod | Body | Number | X | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| ftwrlWaitTimeout | Body | Number | X | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backupRetryCount | Body | Number | X | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| replicationRegion | Body | Enum | X | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)` |
| useBackupLock | Body | Boolean | X | テーブルロックを使用するかどうか |
| backupSchedules | Body | Array | X | 予定された自動バックアップリスト |
| backupSchedules.backupWndBgnTime | Body | Time | O | バックアップ開始時刻 |
| backupSchedules.backupWndDuration | Body | Enum | O | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

<details><summary>例</summary>
<p>

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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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
### バイナリログ一覧照会

```http
GET /v4.0/db-instances/{dbInstanceId}/binlogs
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceBinLog.List | バイナリログ一覧照会 |

#### リクエスト

このAPIはリクエストボディを要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| binLogs | Body | Array | BinLogファイル一覧 |
| binLogs.binLogFileName | Body | String | BinLogファイル名 |
| binLogs.binLogFileSize | Body | Number | BinLogファイルサイズ(Byte) |
| binLogs.createdYmdt | Body | DateTime | 作成日時 |

<details><summary>例</summary>
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

### バイナリログ削除

```http
POST /v4.0/db-instances/{dbInstanceId}/binlogs/purge
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceBinLog.Purge | バイナリログ削除 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| lastBinLogFileName | Body | String | O | 削除する最後のBinLogファイル名(該当ファイルの直前まで削除されます) |

<details><summary>例</summary>
<p>

```json
{
    "lastBinLogFileName": "mysql-bin.000010"
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンスボディを返しません。

---

### 証明書ファイル一覧照会

```http
GET /v4.0/db-instances/{dbInstanceId}/certificates
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceCertificate.List | 証明書ファイル一覧照会 |

#### リクエスト

このAPIはリクエストボディを要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| certificates | Body | Array | 証明書ファイル一覧 |
| certificates.fileName | Body | String | 証明書ファイル名 |
| certificates.certificateType | Body | Enum | 証明書タイプ<br/>- CA_FILE<br/>- CERT_FILE<br/>- KEY_FILE |
| certificates.fileSize | Body | Number | 証明書ファイルサイズ(Byte) |
| certificates.createdYmdt | Body | DateTime | 作成日時 |

<details><summary>例</summary>
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

### 証明書ファイルエクスポート

```http
POST /v4.0/db-instances/{dbInstanceId}/certificates/upload
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceCertificate.Export | 証明書ファイルエクスポート |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| certificateTypes | Body | Array | O | アップロードする証明書タイプ一覧 |
| tenantId | Body | String | O | 証明書ファイルが保存されるObject StorageのテナントID<br/>- 最小長さ: `32`<br/>- 最大長さ: `32` |
| username | Body | String | O | NHN CloudメンバーまたはIAMメンバーID |
| password | Body | String | O | 証明書ファイルが保存されるObject StorageのAPIパスワード |
| targetContainer | Body | String | O | 証明書ファイルが保存されるObject Storageのコンテナ |
| objectPath | Body | String | O | コンテナに保存される証明書ファイルのパス |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBスキーマリストを表示

```http
GET /v4.0/db-instances/{dbInstanceId}/db-schemas
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceSchema.List | DBスキーマリストを表示 |

#### リクエスト

このAPIはリクエストボディを要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbSchemas | Body | Array | DBスキーマリスト |
| dbSchemas.dbSchemaId | Body | UUID | DBスキーマの識別子 |
| dbSchemas.dbSchemaName | Body | String | DBスキーマ名 |
| dbSchemas.dbSchemaStatus | Body | Enum | DBスキーマの現在状態<br/>- STABLE<br/>- CREATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbSchemas.createdYmdt | Body | DateTime | 作成日時 |

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

### DBスキーマを作成する

```http
POST /v4.0/db-instances/{dbInstanceId}/db-schemas
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceSchema.Create | DBスキーマを作成する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbSchemaName | Body | String | O | DBスキーマ名<br/>- 最大長さ: `64`<br/>- 英字で始まり、英字/数字/_のみ使用可、1〜64文字、MySQLの予約語は不可 |

<details><summary>例</summary>
<p>

```json
{
    "dbSchemaName": "dbSchemaName-example"
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBスキーマを削除する

```http
DELETE /v4.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceSchema.Delete | DBスキーマを削除する |

#### リクエスト

このAPIはリクエストボディを要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbSchemaId | URL | UUID | O | DBスキーマの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBユーザーリストを表示

```http
GET /v4.0/db-instances/{dbInstanceId}/db-users
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceUser.List | DBユーザーリストを表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbUsers | Body | Array | DBユーザーリスト |
| dbUsers.dbUserId | Body | UUID | DBユーザーの識別子 |
| dbUsers.dbUserName | Body | String | DBユーザーアカウント名 |
| dbUsers.host | Body | String | DBユーザーアカウントのホスト名 |
| dbUsers.authorityType | Body | Enum | DBユーザー権限タイプ<br/>- CUSTOM: `ユーザー定義権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限`<br/>- ALL: `全権限` |
| dbUsers.dbUserStatus | Body | Enum | DBユーザーの現在状態<br/>- STABLE<br/>- CREATING<br/>- UPDATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbUsers.createdYmdt | Body | DateTime | 作成日時 |
| dbUsers.updatedYmdt | Body | DateTime | 修正日時 |
| dbUsers.authenticationPlugin | Body | Enum | 認証プラグイン<br/>- NATIVE: `mysql_native_password認証`<br/>- CACHING_SHA2: `caching_sha2_password認証(MySQL専用)`<br/>- SHA256: `sha256_password認証(MySQL専用)` |
| dbUsers.tlsOption | Body | Enum | 証明書オプション<br/>- NONE: `TLS未使用`<br/>- SSL: `SSL認証`<br/>- X509: `X509証明書認証` |

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

### DBユーザーを作成する

```http
POST /v4.0/db-instances/{dbInstanceId}/db-users
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceUser.Create | DBユーザーを作成する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbUserName | Body | String | O | DBユーザーアカウント名<br/>- 最小長さ: `1`<br/>- 最大長さ: `32` |
| dbPassword | Body | String | O | DBユーザーアカウントのパスワード<br/>- 最小長さ: `4`<br/>- 最大長さ: `256` |
| host | Body | String | O | DBユーザーアカウントのホスト名<br/>- 最大長さ: `45` |
| authorityType | Body | Enum | O | DBユーザー権限タイプ<br/>- CUSTOM: `ユーザー定義権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限`<br/>- ALL: `全権限` |
| authenticationPlugin | Body | Enum | X | 認証プラグイン<br/>- NATIVE: `mysql_native_password認証`<br/>- CACHING_SHA2: `caching_sha2_password認証(MySQL専用)`<br/>- SHA256: `sha256_password認証(MySQL専用)` |
| tlsOption | Body | Enum | X | 証明書オプション<br/>- デフォルト値: `NONE`<br/>- NONE: `TLS未使用`<br/>- SSL: `SSL認証`<br/>- X509: `X509証明書認証` |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBユーザーを削除する

```http
DELETE /v4.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceUser.Delete | DBユーザーを削除する |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbUserId | URL | UUID | O | DBユーザーの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBユーザーを修正する

```http
PUT /v4.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceUser.Modify | DBユーザーを修正する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbUserId | URL | UUID | O | DBユーザーの識別子 |
| dbPassword | Body | String | X | DBユーザーアカウントのパスワード<br/>- 最小長さ: `4`<br/>- 最大長さ: `256` |
| authorityType | Body | Enum | X | DBユーザー権限タイプ<br/>- CUSTOM: `ユーザー定義権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限`<br/>- ALL: `全権限` |
| authenticationPlugin | Body | Enum | X | 認証プラグイン<br/>- NATIVE: `mysql_native_password認証`<br/>- CACHING_SHA2: `caching_sha2_password認証(MySQL専用)`<br/>- SHA256: `sha256_password認証(MySQL専用)` |
| tlsOption | Body | Enum | X | 証明書オプション<br/>- NONE: `TLS未使用`<br/>- SSL: `SSL認証`<br/>- X509: `X509証明書認証` |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBインスタンス削除保護設定を変更する

```http
PUT /v4.0/db-instances/{dbInstanceId}/deletion-protection
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | DBインスタンス削除保護設定を変更する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| useDeletionProtection | Body | Boolean | O | 削除保護の有無 |

<details><summary>例</summary>
<p>

```json
{
    "useDeletionProtection": false
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBインスタンスを強制再起動する

```http
POST /v4.0/db-instances/{dbInstanceId}/force-restart
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.ForceRestart | DBインスタンスを強制再起動する |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---
### 高可用性情報の照会

```http
GET /v4.0/db-instances/{dbInstanceId}/high-availability
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | 高可用性情報の照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| useHighAvailability | Body | Boolean | 高可用性の使用有無<br/>- デフォルト値: `false` |
| haStatus | Body | Enum | 高可用性の状態<br/>- CREATED: `作成済み`<br/>- STABLE: `正常`<br/>- PAUSING: `一時停止中`<br/>- DISABLE: `停止`<br/>- DISABLE_MASTER_IN_REPLICATION: `マスターの異常なレプリケーション検知による高可用性(HA)の中断`<br/>- DISABLE_MHA_PROCESS: `高可用性(HA)プロセスの中断`<br/>- DISABLE_REPLICATION_STOP: `レプリケーション中断による高可用性(HA)の中断`<br/>- DISABLE_REPLICATION_DELAY: `レプリケーション遅延による高可用性(HA)の中断`<br/>- FAILOVER_STARTED: `フェイルオーバー開始`<br/>- FAILOVER_FAILED: `フェイルオーバー失敗`<br/>- FAILOVER_COMPLETED: `フェイルオーバー完了`<br/>- DELETED: `削除済み`<br/>- PAUSED: `一時停止`<br/>- PAUSED_DUE_TO_TASK: `タスクによる一時停止`<br/>- MASTER_FAILURE_DETECTION: `マスター障害検知` |
| pingInterval | Body | Number | Ping間隔(秒) |
| pingType | Body | String | Pingタイプ |

<details><summary>例</summary>
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

### 高可用性を修正する

```http
PUT /v4.0/db-instances/{dbInstanceId}/high-availability
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:HighAvailability.Modify | 高可用性の修正 |

#### 共通リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| useHighAvailability | Body | Boolean | O | 高可用性を使用するかどうか |
| pingInterval | Body | Number | X | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |

#### 高可用性使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | DBインスタンスを識別できる予備マスター名<br/>- 最小長: `1`<br/>- 最大長: `100` |

<details><summary>例</summary>
<p>

```json
{
    "useHighAvailability": false,
    "pingInterval": 1
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### 高可用性を一時停止する

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:HighAvailability.Pause | 高可用性の一時停止 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### 高可用性を復旧する

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:HighAvailability.Repair | 高可用性の復旧 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### 高可用性を再開する

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:HighAvailability.Resume | 高可用性の再開 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### 高可用性を分離する

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/split
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:HighAvailability.Split | 高可用性の分離 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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
### ログファイルリスト表示

```http
GET /v4.0/db-instances/{dbInstanceId}/log-files
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceLog.List | ログファイルリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| logFiles | Body | Array | ログファイルリスト |
| logFiles.logFileName | Body | String | ログファイル名 |
| logFiles.logFileType | Body | Enum | ログファイルタイプ種類<br/>- ERROR<br/>- BINLOG<br/>- GENERAL<br/>- SLOW_QUERY<br/>- AUDIT<br/>- BACKUP |
| logFiles.logFileSize | Body | Number | ログファイルサイズ(Byte) |
| logFiles.createdYmdt | Body | DateTime | 作成日時 |

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

### ログファイルのエクスポート

```http
POST /v4.0/db-instances/{dbInstanceId}/log-files/export
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceLog.Export | ログファイルのエクスポート |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| logFileNames | Body | Array | O | ログファイル名リスト |
| tenantId | Body | String | O | ログファイルが保存されるオブジェクトストレージのテナントID<br/>- 最小長: `32`<br/>- 最大長: `32` |
| username | Body | String | O | NHN CloudアカウントまたはIAMメンバーID |
| password | Body | String | O | ログファイルが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | Body | String | O | ログファイルが保存されるオブジェクトストレージのコンテナ |
| objectPath | Body | String | O | コンテナに保存されるログファイルのパス |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### ログファイルの内容照会

```http
GET /v4.0/db-instances/{dbInstanceId}/log-files/{logFileName}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceLog.Get | ログファイルの内容照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| logFileName | URL | UUID | O | ログファイル名 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| content | Body | String | ログファイルの内容(最大65533 bytes) |

<details><summary>例</summary>
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
### DBインスタンスメンテナンスリストを表示する

```http
GET /v4.0/db-instances/{dbInstanceId}/maintenances
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.List | DBインスタンスメンテナンスリストを表示する |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| type | Query | String | X |  |
| statuses | Query | String | X |  |
| category | Query | String | X |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | メンテナンスリストの件数 |
| maintenances | Body | Array | メンテナンスリスト |
| maintenances.maintenanceId | Body | UUID | メンテナンスID |
| maintenances.dbInstanceId | Body | UUID | DBインスタンスID |
| maintenances.category | Body | Enum | メンテナンスカテゴリ<br/>- USER: `ユーザーメンテナンスカテゴリ`<br/>- PROVIDER: `Providerメンテナンスカテゴリ`<br/>- AUTO: `自動メンテナンスカテゴリ` |
| maintenances.description | Body | String | メンテナンスの説明 |
| maintenances.type | Body | Enum | メンテナンスタイプ<br/>- UPDATE_DB_INSTANCE: `DBインスタンスの修正(スペック変更、ポート変更、パラメータグループ変更)`<br/>- UPGRADE_ENGINE_VERSION: `エンジンバージョンアップグレード`<br/>- APPLY_CHANGE_PARAMETER: `パラメータグループのパラメータ変更`<br/>- UPGRADE_OS: `OSバージョンアップグレード`<br/>- PATCH_SECURITY: `セキュリティアップデート`<br/>- MIGRATION: `ハイパーバイザーメンテナンスのためのマイグレーション`<br/>- CLEANUP_STORAGE: `ストレージの整理` |
| maintenances.payload | Body | Object | メンテナンスタイプに応じたPayload |
| maintenances.required | Body | Boolean | メンテナンスが必須かどうか |
| maintenances.deadlineYmdt | Body | DateTime | メンテナンスの強制適用日時 |
| maintenances.status | Body | Enum | メンテナンスのステータス<br/>- PENDING: `待機`<br/>- READY: `準備`<br/>- RUNNING: `実行中`<br/>- COMPLETED: `完了`<br/>- FAILED: `失敗`<br/>- EXCLUDED: `除外`<br/>- DELETED: `削除`<br/>- UNKNOWN |
| maintenances.executionType | Body | Enum | メンテナンスの実行タイプ<br/>- SCHEDULED: `予約実行(メンテナンス期間中の自動実行)`<br/>- MANUAL: `手動実行(即時実行)`<br/>- FORCED: `強制実行(デッドライン超過後の自動実行)` |
| maintenances.addedYmdt | Body | DateTime | メンテナンススケジュール登録日時 |
| maintenances.executionStartedYmdt | Body | DateTime | メンテナンス開始日時 |
| maintenances.executionCompletedYmdt | Body | DateTime | メンテナンス終了日時 |

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

### DBインスタンスメンテナンスを即時実行する

```http
POST /v4.0/db-instances/{dbInstanceId}/maintenances/execute-now
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.Execute | DBインスタンスメンテナンスを即時実行する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| configId | Body | String | O | 設定ID |
| category | Body | Enum | O | メンテナンスカテゴリ<br/>- USER: `ユーザーメンテナンスカテゴリ`<br/>- PROVIDER: `Providerメンテナンスカテゴリ`<br/>- AUTO: `自動メンテナンスカテゴリ` |
| description | Body | String | X | メンテナンスの説明 |
| type | Body | Enum | O | メンテナンスタイプ<br/>- UPDATE_DB_INSTANCE: `DBインスタンスの修正(スペック変更、ポート変更、パラメータグループ変更)`<br/>- UPGRADE_ENGINE_VERSION: `エンジンバージョンアップグレード`<br/>- APPLY_CHANGE_PARAMETER: `パラメータグループのパラメータ変更`<br/>- UPGRADE_OS: `OSバージョンアップグレード`<br/>- PATCH_SECURITY: `セキュリティアップデート`<br/>- MIGRATION: `ハイパーバイザーメンテナンスのためのマイグレーション`<br/>- CLEANUP_STORAGE: `ストレージの整理` |
| payload | Body | String | O | メンテナンスタイプに応じたPayload |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBインスタンスメンテナンスを予約する

```http
POST /v4.0/db-instances/{dbInstanceId}/maintenances/schedule
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.Update | DBインスタンスメンテナンスを予約する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| configId | Body | String | O | 設定ID |
| category | Body | Enum | O | メンテナンスカテゴリ<br/>- USER: `ユーザーメンテナンスカテゴリ`<br/>- PROVIDER: `Providerメンテナンスカテゴリ`<br/>- AUTO: `自動メンテナンスカテゴリ` |
| description | Body | String | X | メンテナンスの説明 |
| type | Body | Enum | O | メンテナンスタイプ<br/>- UPDATE_DB_INSTANCE: `DBインスタンスの修正(スペック変更、ポート変更、パラメータグループ変更)`<br/>- UPGRADE_ENGINE_VERSION: `エンジンバージョンアップグレード`<br/>- APPLY_CHANGE_PARAMETER: `パラメータグループのパラメータ変更`<br/>- UPGRADE_OS: `OSバージョンアップグレード`<br/>- PATCH_SECURITY: `セキュリティアップデート`<br/>- MIGRATION: `ハイパーバイザーメンテナンスのためのマイグレーション`<br/>- CLEANUP_STORAGE: `ストレージの整理` |
| payload | Body | String | O | メンテナンスタイプに応じたPayload |

<details><summary>例</summary>
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

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBインスタンスメンテナンスを削除する

```http
DELETE /v4.0/db-instances/{dbInstanceId}/maintenances/{maintenanceId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.Delete | DBインスタンスメンテナンスを削除する |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| maintenanceId | URL | UUID | O | メンテナンスID |

#### レスポンス

このAPIはレスポンス本文を返しません。

---
### ネットワーク情報表示

```http
GET /v4.0/db-instances/{dbInstanceId}/network-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | ネットワーク情報表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| availabilityZone | Body | String | DBインスタンスを作成するアベイラビリティゾーン |
| subnet | Body | Object | サブネットオブジェクト |
| subnet.subnetId | Body | UUID | サブネットの識別子 |
| subnet.subnetName | Body | String | サブネットを識別できる名前 |
| subnet.subnetCidr | Body | String | サブネットのCIDR |
| endPoints | Body | Array | 接続情報リスト |
| endPoints.domain | Body | String | ドメイン |
| endPoints.ipAddress | Body | String | IPアドレス |
| endPoints.endPointType | Body | String | 接続情報タイプ |

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

### ネットワーク情報を修正する

```http
PUT /v4.0/db-instances/{dbInstanceId}/network-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | ネットワーク情報を修正する |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| usePublicAccess | Body | Boolean | O | 外部接続可否 |

<details><summary>例</summary>
<p>

```json
{
    "usePublicAccess": false
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBインスタンスを昇格する

```http
POST /v4.0/db-instances/{dbInstanceId}/promote
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Promote | DBインスタンスの昇格 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBインスタンスの再構築

```http
POST /v4.0/db-instances/{dbInstanceId}/rebuild
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Rebuild | DBインスタンスの再構築 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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
### DBインスタンスを複製する

```http
POST /v4.0/db-instances/{dbInstanceId}/replicate
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Replicate | DBインスタンスの複製 |

#### 共通リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbInstanceName | Body | String | O | DBインスタンスを識別できる名前<br/>- 最小の長さ: `1`<br/>- 最大の長さ: `100` |
| description | Body | String | X | DBインスタンスの追加情報<br/>- 最大の長さ: `100` |
| dbFlavorId | Body | UUID | X | DBインスタンス仕様の識別子 |
| dbPort | Body | Number | X | DBポート<br/>- 最小値: 3306、最大値: 43306 |
| parameterGroupId | Body | UUID | X | パラメータグループの識別子 |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |
| useDefaultNotification | Body | Boolean | X | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| useDeletionProtection | Body | Boolean | X | 削除保護の有無<br/>- デフォルト値: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query分析を行うかどうか<br/>- デフォルト値: `true` |
| network | Body | Object | O | ネットワーク情報オブジェクト |
| network.usePublicAccess | Body | Boolean | X | 外部接続可否 |
| network.availabilityZone | Body | Enum | O | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Body | Object | X | ストレージ情報オブジェクト |
| storage.storageType | Body | Enum | X | データストレージタイプ |
| storage.storageSize | Body | Number | X | データストレージサイズ(GB)<br/>- 最小値: `20` |
| storage.storageAutoscale | Body | Object | X | データストレージ自動拡張オブジェクト |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | ストレージ自動拡張を行うかどうか<br/>- デフォルト値: `false` |
| backup | Body | Object | X | バックアップ情報オブジェクト |
| backup.backupPeriod | Body | Number | X | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Body | Number | X | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.replicationRegion | Body | Enum | X | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)` |
| backup.useBackupLock | Body | Boolean | X | テーブルロックを使用するかどうか |
| backup.backupSchedules | Body | Array | X | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Body | Time | X | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Body | Enum | X | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### ストレージ自動拡張使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

<details><summary>例</summary>
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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBインスタンスを再起動する

```http
POST /v4.0/db-instances/{dbInstanceId}/restart
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Restart | DBインスタンスの再起動 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| useOnlineFailover | Body | Boolean | X | フェイルオーバーを利用した再起動を行うかどうか<br/>- デフォルト値: `false` |
| executeBackup | Body | Boolean | X | 現時点でバックアップを行うかどうか<br/>- デフォルト値: `false` |
| waitReplicationDelay | Body | Boolean | X | レプリケーション遅延解消待機を行うかどうか<br/>- デフォルト値: `false` |
| useReadOnly | Body | Boolean | X | 書き込み負荷のブロック<br/>- デフォルト値: `false` |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DB インスタンス復元情報照会

```http
GET /v4.0/db-instances/{dbInstanceId}/restoration-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | DB インスタンス復元情報照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| oldestRestorableYmdt | Body | DateTime | 最古の復元可能時間 |
| latestRestorableYmdt | Body | DateTime | 最新の復元可能時間 |
| restorableBackups | Body | Array | 復元可能なバックアップリスト |
| restorableBackups.backup | Body | Object | バックアップ情報オブジェクト |
| restorableBackups.backup.backupId | Body | UUID | バックアップの識別子 |
| restorableBackups.backup.backupName | Body | String | バックアップ名 |
| restorableBackups.backup.backupStatus | Body | Enum | バックアップ状態<br/>- BACKING_UP: `バックアップ中(スピナー)`<br/>- VERIFYING: `検証中(スピナー)`<br/>- COMPLETED: `使用可能(緑アイコン)`<br/>- DELETING: `削除中(スピナー)`<br/>- DELETED: `削除済み(グレーアイコン)`<br/>- ERROR: `エラー(赤アイコン)` |
| restorableBackups.backup.dbInstanceId | Body | UUID | 原本DBインスタンスの識別子 |
| restorableBackups.backup.dbInstanceName | Body | String | 原本DBインスタンスの名前 |
| restorableBackups.backup.dbVersion | Body | Enum | DBエンジンタイプ |
| restorableBackups.backup.backupType | Body | Enum | バックアップタイプ<br/>- AUTO<br/>- MANUAL |
| restorableBackups.backup.backupSize | Body | Number | バックアップサイズ |
| restorableBackups.backup.useBackupLock | Body | Boolean | テーブルロックを使用するかどうか |
| restorableBackups.backup.failoverCount | Body | Number | フェイルオーバー回数 |
| restorableBackups.backup.binLogFileName | Body | String | バイナリログファイル名 |
| restorableBackups.backup.binLogPosition | Body | Object | バイナリログファイル位置 |
| restorableBackups.backup.createdYmdt | Body | DateTime | バックアップ作成日時 |
| restorableBackups.backup.updatedYmdt | Body | DateTime | バックアップ更新日時 |
| restorableBackups.restorableBinLogs | Body | Array | 該当バックアップを利用して復元可能なバイナリログ名リスト |

<details><summary>例</summary>
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

### 復元される最後のクエリ照会

```http
GET /v4.0/db-instances/{dbInstanceId}/restoration-info/last-query
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | 復元される最後のクエリ照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| executedYmdt | Body | DateTime | クエリ実行日時 |
| lastQuery | Body | String | 最後に実行したクエリ |

<details><summary>例</summary>
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
### DBインスタンスの復元

```http
POST /v4.0/db-instances/{dbInstanceId}/restore
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Restore | DBインスタンスの復元 |

#### 共通リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| dbInstanceName | Body | String | O | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | Body | String | X | DBインスタンスに対する追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | Body | UUID | X | DBインスタンス仕様の識別子。未入力時は原本インスタンスの仕様が適用されます。 |
| dbPort | Body | Number | X | DBポート |
| useHighAvailability | Body | Boolean | X | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| pingInterval | Body | Number | X | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| storage | Body | Object | X | ストレージ情報オブジェクト。未入力時は原本インスタンスのストレージ設定が適用されます。 |
| storage.storageType | Body | Enum | X | ストレージタイプ。未入力時は原本インスタンスのストレージタイプが適用されます。 |
| storage.storageSize | Body | Number | X | データストレージサイズ(GB)。未入力時は原本インスタンスのストレージサイズが適用されます。<br/>- 最小値: `20` |
| storage.storageAutoscale | Body | Object | X | データストレージ自動拡張オブジェクト |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | ストレージ自動拡張を行うかどうか<br/>- デフォルト値: `false` |
| network | Body | Object | X | ネットワーク情報オブジェクト。未入力時は原本インスタンスのネットワーク設定が適用されます。 |
| network.subnetId | Body | UUID | X | サブネットの識別子。未入力時は原本インスタンスの値を使用します。 |
| network.usePublicAccess | Body | Boolean | X | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Body | Enum | X | DBインスタンスを作成するアベイラビリティゾーン。未入力時はランダムに選択されます。 |
| backup | Body | Object | X | バックアップ情報オブジェクト。未入力時は原本インスタンスのバックアップ設定が適用されます。 |
| backup.backupPeriod | Body | Number | X | バックアップ保管期間(日)。未入力時は原本インスタンスのバックアップ保管期間が適用されます。<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.ftwrlWaitTimeout | Body | Number | X | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.backupRetryCount | Body | Number | X | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Body | Enum | X | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)` |
| backup.useBackupLock | Body | Boolean | X | テーブルロックを使用するかどうか<br/>- デフォルト値: `true` |
| backup.backupSchedules | Body | Array | X | 予定された自動バックアップリスト。未入力時は原本インスタンスのバックアップスケジュールが適用されます。 |
| backup.backupSchedules.backupWndBgnTime | Body | Time | X | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Body | Enum | X | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| restore | Body | Object | O | 復元情報オブジェクト |
| restore.restoreType | Body | Enum | O | 復元タイプの種類<br/>- TIMESTAMP: `復元可能な時間内の時間を利用した時点復元タイプ`<br/>- BINLOG: `復元可能なバイナリログ位置を利用した時点復元タイプ`<br/>- BACKUP: `既存に作成したバックアップを利用したスナップショット復元タイプ` |
| restore.binLog.binLogFileName | Body | String | X | 復元に使用するバイナリログ名 |
| restore.binLog.binLogPosition | Body | Object | X | 復元に使用するバイナリログ位置 |
| useDefaultNotification | Body | Boolean | X | 基本アラームを使用するかどうか<br/>- デフォルト値: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query分析を行うかどうか<br/>- デフォルト値: `true` |
| parameterGroupId | Body | UUID | X | パラメータグループの識別子。未入力時は原本インスタンスのパラメータグループが適用されます。 |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト。未入力時は原本インスタンスのセキュリティグループが適用されます。 |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |
| useDeletionProtection | Body | Boolean | X | 削除保護の有無<br/>- デフォルト値: `false` |

#### 高可用性使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |

#### ストレージ自動拡張使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

#### Timestampを利用した時点復元時、リクエスト(restoreTypeが`TIMESTAMP`の場合)

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| restore.restoreYmdt | Body | DateTime | X | DBインスタンス復元日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

復元情報照会で照会した最新の復元可能な時間以前に対してのみ復元が可能です。

#### バイナリログを利用した時点復元時、リクエスト(restoreTypeが`BINLOG`の場合)

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| restore.backupId | Body | UUID | X | 復元に使用するバックアップの識別子 |
| restore.binLog | Body | Object | X | バイナリログ情報オブジェクト |

バイナリログを利用した時点復元時、基準バックアップのバイナリログファイルおよび位置を基準に、その後に記録されたログに対して復元が可能です。

#### バックアップを利用した復元時、リクエスト(restoreTypeが`BACKUP`の場合)

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| restore.backupId | Body | UUID | X | 復元に使用するバックアップの識別子 |

<details><summary>例</summary>
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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBインスタンスを起動する

```http
POST /v4.0/db-instances/{dbInstanceId}/start
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Start | DBインスタンスの起動 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBインスタンスを停止する

```http
POST /v4.0/db-instances/{dbInstanceId}/stop
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Stop | DBインスタンスの停止 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### ストレージ情報を表示

```http
GET /v4.0/db-instances/{dbInstanceId}/storage-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | ストレージ情報を表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| storageType | Body | String | データストレージタイプ |
| storageSize | Body | Number | データストレージサイズ(GB) |
| storageStatus | Body | Enum | データストレージの現在状態<br/>- DELETED: `削除済み`<br/>- PENDING_DELETION: `削除猶予中`<br/>- DELETION_RESERVED: `削除予約済み(スナップショット整理待ち)`<br/>- DETACHED: `取り外し済み`<br/>- ATTACHED: `割り当て済み` |
| storageAutoscale | Body | Object | データストレージ自動拡張オブジェクト |
| storageAutoscale.useStorageAutoscale | Body | Boolean | ストレージ自動拡張を行うかどうか |
| storageAutoscale.threshold | Body | Number | 自動拡張条件(%) |
| storageAutoscale.maxStorageSize | Body | Number | 自動拡張最大サイズ(GB) |
| storageAutoscale.cooldownTime | Body | Number | 自動拡張クールダウン時間(分) |

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

### ストレージ情報を修正する

```http
PUT /v4.0/db-instances/{dbInstanceId}/storage-info
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | ストレージ情報を修正する |

#### 共通リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DBインスタンスの識別子 |
| storageSize | Body | Number | O | データストレージサイズ(GB)<br/>- 最大値: `2048` |
| storageAutoscale | Body | Object | X | データストレージ自動拡張オブジェクト |
| storageAutoscale.useStorageAutoscale | Body | Boolean | X | ストレージ自動拡張を行うかどうか |

#### ストレージ自動拡張使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| storageAutoscale.threshold | Body | Number | O | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storageAutoscale.maxStorageSize | Body | Number | O | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storageAutoscale.cooldownTime | Body | Number | O | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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
## バックアップ

### バックアップ状態

| 状態           | 説明           |
|--------------|--------------|
| `BACKING_UP` | バックアップ中の場合     |
| `COMPLETED`  | バックアップが完了している場合   |
| `DELETING`   | バックアップが削除中の場合 |
| `DELETED`    | バックアップが削除されている場合   |
| `ERROR`      | エラーが発生した場合   |

### バックアップリスト照会

```http
GET /v4.0/backups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.List | バックアップリスト照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 全バックアップリスト数 |
| backups | Body | Array | バックアップリスト |
| backups.backupId | Body | UUID | バックアップの識別子 |
| backups.backupName | Body | String | バックアップを識別できる名前 |
| backups.backupStatus | Body | Enum | バックアップの現在状態<br/>- BACKING_UP: `バックアップ中 (スピナー)`<br/>- VERIFYING: `検証中 (スピナー)`<br/>- COMPLETED: `使用可能 (緑色アイコン)`<br/>- DELETING: `削除中 (スピナー)`<br/>- DELETED: `削除済み (グレーアイコン)`<br/>- ERROR: `エラー (赤色アイコン)` |
| backups.dbInstanceId | Body | UUID | 原本DBインスタンスの識別子 |
| backups.dbVersion | Body | Enum | DBエンジンタイプ |
| backups.utilVersion | Body | String | ユーティリティバージョン |
| backups.backupType | Body | Enum | バックアップタイプ<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Body | Number | バックアップのサイズ(Byte) |
| backups.createdYmdt | Body | DateTime | 作成日時 |
| backups.updatedYmdt | Body | DateTime | 修正日時 |

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

### バックアップの作成

```http
POST /v4.0/backups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.Create | バックアップの作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupName | Body | String | O | バックアップを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| baseBackupId | Body | UUID | X | 原本バックアップの識別子 |
| dbInstanceId | Body | UUID | X | DBインスタンスの識別子 |
| backupMethodType | Body | Enum | O | バックアップ方式タイプ<br/>- FULL: `全体バックアップ`<br/>- INCREMENTAL: `増分バックアップ`<br/>- SNAPSHOT: `スナップショットバックアップ` |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### バックアップの削除

```http
DELETE /v4.0/backups/{backupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.Delete | バックアップの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### バックアップ詳細照会

```http
GET /v4.0/backups/{backupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.Get | バックアップ詳細照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| backup | Body | Object | バックアップ詳細情報 |
| backup.backupId | Body | UUID | バックアップの識別子 |
| backup.regionCode | Body | Enum | リージョンコード<br/>- KR1: `韓国(パンギョ)` |
| backup.backupName | Body | String | バックアップを識別できる名前 |
| backup.backupStatus | Body | Enum | バックアップの現在状態<br/>- BACKING_UP: `バックアップ中 (スピナー)`<br/>- VERIFYING: `検証中 (スピナー)`<br/>- COMPLETED: `使用可能 (緑色アイコン)`<br/>- DELETING: `削除中 (スピナー)`<br/>- DELETED: `削除済み (グレーアイコン)`<br/>- ERROR: `エラー (赤色アイコン)` |
| backup.dbInstanceId | Body | UUID | 原本DBインスタンスの識別子 |
| backup.dbInstanceName | Body | String | 原本DBインスタンスの名前 |
| backup.dbVersion | Body | Enum | DBエンジンバージョン |
| backup.utilVersion | Body | String | ユーティリティバージョン |
| backup.backupType | Body | Enum | バックアップタイプ(AUTO、MANUAL)<br/>- AUTO<br/>- MANUAL |
| backup.backupMethodType | Body | Enum | バックアップ方式(FULL、SNAPSHOT、INCREMENTAL)<br/>- FULL<br/>- INCREMENTAL<br/>- SNAPSHOT |
| backup.backupFileType | Body | Enum | バックアップファイルタイプ<br/>- XBSTREAM<br/>- TAR_ZSTD<br/>- TAR_LZ4<br/>- TAR_GZIP<br/>- SNAPSHOT |
| backup.backupSize | Body | Number | バックアップのサイズ(Byte) |
| backup.isReplicable | Body | Boolean | レプリケーション可否 |
| backup.binLogFileName | Body | String | バイナリログファイル名 |
| backup.binLogPosition | Body | Object | バイナリログ位置 |
| backup.createdYmdt | Body | DateTime | 作成日時 |
| backup.updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
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
        "regionCode": "KR1",
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

### バックアップのエクスポート

```http
POST /v4.0/backups/{backupId}/export
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.Export | バックアップエクスポート |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |
| tenantId | Body | String | O | バックアップが保存されるオブジェクトストレージのテナントID<br/>- 最小長さ: `32`<br/>- 最大長さ: `32` |
| username | Body | String | O | NHN CloudアカウントまたはIAMメンバーID |
| password | Body | String | O | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | Body | String | O | バックアップが保存されるオブジェクトストレージのコンテナ |
| objectPath | Body | String | O | コンテナに保存されるバックアップのパス |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### バックアップを復元する

```http
POST /v4.0/backups/{backupId}/restore
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.Restore | バックアップの復元 |

#### 共通リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |
| dbInstanceName | Body | String | O | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | Body | String | X | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | Body | UUID | X | DBインスタンス仕様の識別子。未指定の場合、原本インスタンスの値を使用 |
| dbPort | Body | Number | X | DBポート。未指定の場合、原本インスタンスの値を使用<br/>- 最小値: 3306、最大値: 43306 |
| parameterGroupId | Body | UUID | X | パラメータグループの識別子。未指定の場合、原本インスタンスの値を使用 |
| dbSecurityGroupIds | Body | Array | X | DBセキュリティグループの識別子リスト |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |
| useHighAvailability | Body | Boolean | X | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| pingInterval | Body | Number | X | 高可用性使用時のPing間隔(秒)<br/>- デフォルト値: `3`<br/>- 最小値: `1`<br/>- 最大値: `600` |
| useDefaultNotification | Body | Boolean | X | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| useDeletionProtection | Body | Boolean | X | 削除保護の有無<br/>- デフォルト値: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query分析を行うかどうか<br/>- デフォルト値: `true` |
| network | Body | Object | X | ネットワーク情報オブジェクト。未指定の場合、原本インスタンスの値を使用 |
| network.subnetId | Body | UUID | X | サブネットの識別子。未指定の場合、原本インスタンスの値を使用 |
| network.usePublicAccess | Body | Boolean | X | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Body | Enum | X | DBインスタンスを作成するアベイラビリティゾーン。未指定の場合、ランダム選択 |
| storage | Body | Object | X | ストレージ情報オブジェクト。未指定の場合、原本インスタンスの値を使用 |
| storage.storageType | Body | Enum | X | ストレージタイプ。未指定の場合、原本インスタンスの値を使用 |
| storage.storageSize | Body | Number | X | データストレージサイズ(GB)。未指定の場合、原本インスタンスの値を使用<br/>- 最小値: `20` |
| storage.storageAutoscale | Body | Object | X | データストレージ自動拡張オブジェクト。未指定の場合、原本インスタンスの値を使用 |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | ストレージ自動拡張を行うかどうか<br/>- デフォルト値: `false` |
| backup | Body | Object | X | バックアップ情報オブジェクト。未指定の場合、原本インスタンスのバックアップ設定を使用 |
| backup.backupPeriod | Body | Number | X | バックアップ保管期間(日)。未指定の場合、原本インスタンスの値を使用<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Body | Number | X | バックアップ再試行回数。未指定の場合、原本インスタンスの値を使用<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | クエリ遅延待機時間(秒)。未指定の場合、原本インスタンスの値を使用<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.replicationRegion | Body | Enum | X | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)` |
| backup.useBackupLock | Body | Boolean | X | テーブルロックを使用するかどうか。未指定の場合、原本インスタンスの値を使用 |
| backup.backupSchedules | Body | Array | X | バックアップスケジュールリスト。未指定の場合、原本インスタンスの値を使用 |
| backup.backupSchedules.backupWndBgnTime | Body | Time | O | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### 高可用性使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |

#### ストレージ自動拡張使用時

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

<details><summary>例</summary>
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

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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
## DBセキュリティグループ

### DBセキュリティグループ進行状態

| 状態              | 説明               |
|-----------------|------------------|
| `NONE`          | 進行中の作業がない        |
| `CREATING_RULE` | ルールポリシーの作成中      |
| `UPDATING_RULE` | ルールポリシーの修正中      |
| `DELETING_RULE` | ルールポリシーの削除中      |

### DBセキュリティグループリストを表示

```http
GET /v4.0/db-security-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.List | DBセキュリティグループリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | DBセキュリティグループリストの総数 |
| dbSecurityGroups | Body | Array | DBセキュリティグループリスト |
| dbSecurityGroups.dbSecurityGroupId | Body | UUID | DBセキュリティグループの識別子 |
| dbSecurityGroups.dbSecurityGroupName | Body | String | DBセキュリティグループを識別できる名前 |
| dbSecurityGroups.description | Body | String | DBセキュリティグループの追加情報 |
| dbSecurityGroups.progressStatus | Body | Enum | DBセキュリティグループの現在進行状態<br/>- NONE: `なし`<br/>- CREATING_RULE: `ルール作成中`<br/>- UPDATING_RULE: `ルール修正中`<br/>- DELETING_RULE: `ルール削除中`<br/>- APPLYING_DEFAULT_RULE: `デフォルトルール適用中` |
| dbSecurityGroups.createdYmdt | Body | DateTime | 作成日時 |
| dbSecurityGroups.updatedYmdt | Body | DateTime | 修正日時 |

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

### DBセキュリティグループを作成する

```http
POST /v4.0/db-security-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Create | DBセキュリティグループの作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupName | Body | String | O | DBセキュリティグループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| description | Body | String | X | DBセキュリティグループの追加情報<br/>- 最大長: `100` |
| rules | Body | Array | O | DBセキュリティグループルールリスト |
| rules.direction | Body | Enum | O | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| rules.etherType | Body | Enum | O | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| rules.port | Body | Object | O | ポートオブジェクト |
| rules.port.portType | Body | Enum | O | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| rules.port.minPort | Body | Number | X | 最小ポート範囲<br/>- 最小値: `3306` |
| rules.port.maxPort | Body | Number | X | 最大ポート範囲<br/>- 最大値: `65535` |
| rules.cidr | Body | String | O | CIDR |
| rules.description | Body | String | X | DBセキュリティグループルールの追加情報 |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbSecurityGroupId | Body | UUID | DBセキュリティグループの識別子 |

<details><summary>例</summary>
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

### DBセキュリティグループを削除する

```http
DELETE /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Delete | DBセキュリティグループの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBセキュリティグループの詳細を表示

```http
GET /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Get | DBセキュリティグループ詳細表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| dbSecurityGroupId | Body | UUID | DBセキュリティグループの識別子 |
| dbSecurityGroupName | Body | String | DBセキュリティグループを識別できる名前 |
| description | Body | String | DBセキュリティグループの追加情報 |
| progressStatus | Body | Enum | DBセキュリティグループの現在進行状態<br/>- NONE: `なし`<br/>- CREATING_RULE: `ルール作成中`<br/>- UPDATING_RULE: `ルール修正中`<br/>- DELETING_RULE: `ルール削除中`<br/>- APPLYING_DEFAULT_RULE: `デフォルトルール適用中` |
| rules | Body | Array | DBセキュリティグループルールリスト |
| rules.ruleId | Body | UUID | DBセキュリティグループルールの識別子 |
| rules.description | Body | String | DBセキュリティグループルールの追加情報 |
| rules.direction | Body | Enum | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| rules.etherType | Body | Enum | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| rules.port | Body | Object | ポートオブジェクト |
| rules.port.portType | Body | Enum | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| rules.port.minPort | Body | Number | 最小ポート範囲 |
| rules.port.maxPort | Body | Number | 最大ポート範囲 |
| rules.cidr | Body | String | CIDR |
| rules.createdYmdt | Body | DateTime | 作成日時 |
| rules.updatedYmdt | Body | DateTime | 修正日時 |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
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

### DBセキュリティグループを修正する

```http
PUT /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Modify | DBセキュリティグループの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| dbSecurityGroupName | Body | String | X | DBセキュリティグループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| description | Body | String | X | DBセキュリティグループの追加情報<br/>- 最大長: `100` |

<details><summary>例</summary>
<p>

```json
{
    "dbSecurityGroupName": "dbSecurityGroupName",
    "description": "description-example"
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBセキュリティグループルールを削除する

```http
DELETE /v4.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroupRule.Delete | DBセキュリティグループルールの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| ruleIds | Query | String | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBセキュリティグループルールを作成する

```http
POST /v4.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroupRule.Create | DBセキュリティグループルールの作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| direction | Body | Enum | O | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| etherType | Body | Enum | O | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| port | Body | Object | O | ポートオブジェクト |
| port.portType | Body | Enum | O | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| port.minPort | Body | Number | X | 最小ポート範囲<br/>- 最小値: `3306` |
| port.maxPort | Body | Number | X | 最大ポート範囲<br/>- 最大値: `65535` |
| cidr | Body | String | O | CIDR |
| description | Body | String | X | DBセキュリティグループルールの追加情報<br/>- 最大長: `200` |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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

### DBセキュリティグループルールを修正する

```http
PUT /v4.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroupRule.Modify | DBセキュリティグループルールの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| ruleId | URL | UUID | O |  |
| direction | Body | Enum | O | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| etherType | Body | Enum | O | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| port | Body | Object | O | ポートオブジェクト |
| port.portType | Body | Enum | O | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| port.minPort | Body | Number | X | 最小ポート範囲<br/>- 最小値: `3306` |
| port.maxPort | Body | Number | X | 最大ポート範囲<br/>- 最大値: `65535` |
| cidr | Body | String | O | CIDR |
| description | Body | String | X | DBセキュリティグループルールの追加情報<br/>- 最大長: `200` |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| jobId | Body | UUID | リクエストした作業の識別子 |

<details><summary>例</summary>
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
## パラメータグループ

### パラメータグループリストを表示

```http
GET /v4.0/parameter-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.List | パラメータグループリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | パラメータグループの総数 |
| parameterGroups | Body | Array | パラメータグループリスト |
| parameterGroups.parameterGroupId | Body | UUID | パラメータグループの識別子 |
| parameterGroups.parameterGroupName | Body | String | パラメータグループを識別できる名前 |
| parameterGroups.description | Body | String | パラメータグループの追加情報 |
| parameterGroups.dbVersion | Body | Enum | DBエンジンタイプ |
| parameterGroups.parameterGroupType | Body | Enum | パラメータグループタイプ<br/>- USER<br/>- ADMIN<br/>- DEFAULT<br/>- CLUSTER_USER |
| parameterGroups.parameterGroupStatus | Body | Enum | パラメータグループの現在状態<br/>- STABLE: `適用完了`<br/>- NEED_TO_APPLY: `適用必要`<br/>- DELETED: `削除済み` |
| parameterGroups.createdYmdt | Body | DateTime | 作成日時 |
| parameterGroups.updatedYmdt | Body | DateTime | 修正日時 |

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

### パラメータグループを作成する

```http
POST /v4.0/parameter-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Create | パラメータグループの作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupName | Body | String | O | パラメータグループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| description | Body | String | X | パラメータグループの追加情報<br/>- 最大長: `100` |
| dbVersion | Body | Enum | O | DBエンジンタイプ |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | パラメータグループの識別子 |

<details><summary>例</summary>
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

### パラメータグループを削除する

```http
DELETE /v4.0/parameter-groups/{parameterGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Delete | パラメータグループの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループの詳細を表示

```http
GET /v4.0/parameter-groups/{parameterGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Get | パラメータグループ詳細表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | パラメータグループの識別子 |
| parameterGroupName | Body | String | パラメータグループを識別できる名前 |
| description | Body | String | パラメータグループの追加情報 |
| dbVersion | Body | Enum | DBエンジンタイプ |
| parameterGroupStatus | Body | Enum | パラメータグループの現在状態<br/>- STABLE: `適用完了`<br/>- NEED_TO_APPLY: `適用必要`<br/>- DELETED: `削除済み` |
| parameters | Body | Array | パラメータリスト |
| parameters.parameterId | Body | UUID | パラメータの識別子 |
| parameters.parameterFileGroup | Body | Enum | パラメータファイルグループタイプ<br/>- CLIENT<br/>- MYSQL<br/>- MYSQLD |
| parameters.parameterName | Body | String | パラメータ名 |
| parameters.fileParameterName | Body | String | パラメータファイル名 |
| parameters.value | Body | String | 現在設定されている値 |
| parameters.defaultValue | Body | String | デフォルト値 |
| parameters.allowedValue | Body | String | 許可された値 |
| parameters.updateType | Body | Enum | 修正タイプ<br/>- VARIABLE<br/>- CONSTANT<br/>- INIT_VARIABLE |
| parameters.applyType | Body | Enum | 適用タイプ<br/>- BOTH<br/>- SESSION<br/>- FILE |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
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

### パラメータグループを修正する

```http
PUT /v4.0/parameter-groups/{parameterGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Modify | パラメータグループの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |
| parameterGroupName | Body | String | X | パラメータグループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| description | Body | String | X | パラメータグループの追加情報<br/>- 最大長: `100` |

<details><summary>例</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example"
}
```

</p>
</details>

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループをコピーする

```http
POST /v4.0/parameter-groups/{parameterGroupId}/copy
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Copy | パラメータグループコピーする |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |
| parameterGroupName | Body | String | O | パラメータグループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| description | Body | String | X | パラメータグループの追加情報<br/>- 最大長: `100` |

<details><summary>例</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example"
}
```

</p>
</details>

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| parameterGroupId | Body | UUID | パラメータグループの識別子 |

<details><summary>例</summary>
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

### パラメータを修正する

```http
PUT /v4.0/parameter-groups/{parameterGroupId}/parameters
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Modify | パラメータグループの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |
| modifiedParameters | Body | Array | O | 変更するパラメータリスト |
| modifiedParameters.parameterId | Body | UUID | O | パラメータの識別子 |
| modifiedParameters.value | Body | String | O | 変更するパラメータ値 |

<details><summary>例</summary>
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

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループをリセットする

```http
PUT /v4.0/parameter-groups/{parameterGroupId}/reset
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Reset | パラメータグループのリセット |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |

#### レスポンス

このAPIはレスポンス本文を返しません。

---
## ユーザーグループ

### ユーザーグループリストを表示

```http
GET /v4.0/user-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:UserGroup.List | ユーザーグループリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | ユーザーグループリストの総数 |
| userGroups | Body | Array | ユーザーグループリスト |
| userGroups.userGroupId | Body | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | Body | String | ユーザーグループを識別できる名前 |
| userGroups.createdYmdt | Body | DateTime | 作成日時 |
| userGroups.updatedYmdt | Body | DateTime | 修正日時 |

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

### ユーザーグループを作成する

```http
POST /v4.0/user-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:UserGroup.Create | ユーザーグループの作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupName | Body | String | O | ユーザーグループを識別できる名前 |
| memberIds | Body | Array | O | プロジェクトメンバーの識別子リスト |
| selectAll | Body | Boolean | X | プロジェクトメンバー全員を含むかどうか<br/>- デフォルト値: `false` |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| userGroupId | Body | UUID | ユーザーグループの識別子 |

<details><summary>例</summary>
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

### ユーザーグループを削除する

```http
DELETE /v4.0/user-groups/{userGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:UserGroup.Delete | ユーザーグループの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O |  |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### ユーザーグループの詳細を表示

```http
GET /v4.0/user-groups/{userGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:UserGroup.Get | ユーザーグループ詳細表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| userGroupId | Body | UUID | ユーザーグループの識別子 |
| userGroupName | Body | String | ユーザーグループを識別できる名前 |
| userGroupTypeCode | Body | Enum | ユーザーグループの種類<br/>- ENTIRE<br/>- INDIVIDUAL_MEMBER |
| members | Body | Array | プロジェクトメンバーリスト |
| members.memberId | Body | UUID | プロジェクトメンバーの識別子 |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
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

### ユーザーグループを修正する

```http
PUT /v4.0/user-groups/{userGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:UserGroup.Modify | ユーザーグループの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O |  |
| userGroupName | Body | String | O | ユーザーグループを識別できる名前 |
| memberIds | Body | Array | X | プロジェクトメンバーの識別子リスト |
| selectAll | Body | Boolean | X | プロジェクトメンバー全員を含むかどうか<br/>- デフォルト値: `false` |

<details><summary>例</summary>
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

#### レスポンス

このAPIはレスポンス本文を返しません。

---
## 通知グループ

### 通知グループリストを表示

```http
GET /v4.0/notification-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:NotificationGroup.List | 通知グループリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| notificationGroups | Body | Array | 通知グループリスト |
| notificationGroups.notificationGroupId | Body | UUID | 通知グループの識別子 |
| notificationGroups.notificationGroupName | Body | String | 通知グループを識別できる名前 |
| notificationGroups.notifyEmail | Body | Boolean | メール通知の有無 |
| notificationGroups.notifySms | Body | Boolean | SMS通知の有無 |
| notificationGroups.isEnabled | Body | Boolean | 有効かどうか |
| notificationGroups.createdYmdt | Body | DateTime | 作成日時 |
| notificationGroups.updatedYmdt | Body | DateTime | 修正日時 |

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

### 通知グループを作成する

```http
POST /v4.0/notification-groups
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:NotificationGroup.Create | 通知グループの作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupName | Body | String | O | 通知グループを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| notifyEmail | Body | Boolean | X | メール通知の有無<br/>- デフォルト値: `true` |
| notifySms | Body | Boolean | X | SMS通知の有無<br/>- デフォルト値: `true` |
| isEnabled | Body | Boolean | X | 有効かどうか<br/>- デフォルト値: `true` |
| dbInstanceIds | Body | Array | O | 監視対象DBインスタンスの識別子リスト |
| userGroupIds | Body | Array | O | ユーザーグループの識別子リスト |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| notificationGroupId | Body | UUID | 通知グループの識別子 |

<details><summary>例</summary>
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

### 通知グループを削除する

```http
DELETE /v4.0/notification-groups/{notificationGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:NotificationGroup.Delete | 通知グループの削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O |  |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 通知グループの詳細を表示

```http
GET /v4.0/notification-groups/{notificationGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:NotificationGroup.Get | 通知グループ詳細表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O |  |

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| notificationGroupId | Body | UUID | 通知グループの識別子 |
| notificationGroupName | Body | String | 通知グループを識別できる名前 |
| notifyEmail | Body | Boolean | メール通知の有無 |
| notifySms | Body | Boolean | SMS通知の有無 |
| isEnabled | Body | Boolean | 有効かどうか |
| dbInstances | Body | Array | 監視対象DBインスタンスリスト |
| dbInstances.dbInstanceId | Body | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceName | Body | String | DBインスタンスを識別できる名前 |
| userGroups | Body | Array | ユーザーグループリスト |
| userGroups.userGroupId | Body | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | Body | String | ユーザーグループを識別できる名前 |
| createdYmdt | Body | DateTime | 作成日時 |
| updatedYmdt | Body | DateTime | 修正日時 |

<details><summary>例</summary>
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

### 通知グループを修正する

```http
PUT /v4.0/notification-groups/{notificationGroupId}
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:NotificationGroup.Modify | 通知グループの修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O |  |
| notificationGroupName | Body | String | X | 通知グループを識別できる名前 |
| notifyEmail | Body | Boolean | X | メール通知の有無<br/>- デフォルト値: `false` |
| notifySms | Body | Boolean | X | SMS通知の有無<br/>- デフォルト値: `false` |
| isEnabled | Body | Boolean | X | 有効かどうか<br/>- デフォルト値: `false` |
| dbInstanceIds | Body | Array | X | 監視対象DBインスタンスの識別子リスト |
| userGroupIds | Body | Array | X | ユーザーグループの識別子リスト |

<details><summary>例</summary>
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

#### レスポンス

このAPIはレスポンス本文を返しません。

---
## モニタリング

### 統計情報照会

```http
GET /v4.0/metric-statistics
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Metric.List | 統計情報照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### Metricリスト表示

```http
GET /v4.0/metrics
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Metric.List | Metricリスト表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| metrics | Body | Array | Metricリスト |
| metrics.measureName | Body | String | 照会指標タイプ |
| metrics.unit | Body | String | 測定値単位 |

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
            "measureName": "measureName-example",
            "unit": "unit-example"
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

| イベントカテゴリー    | 説明      |
|-------------|---------|
| ALL         | 全体      |
| BACKUP      | バックアップ      |
| DB_INSTANCE | DBインスタンス |
| JOB         | 作業      |
| TENANT      | テナント     |
| MONITORING  | モニタリング    |

### 購読可能なイベントコード一覧表示

```http
GET /v4.0/event-codes
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Event.List | 購読可能なイベントコード一覧表示 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| eventCodes | Body | Array | イベントコードリスト |
| eventCodes.eventCode | Body | Enum | イベントコード |
| eventCodes.eventCategoryType | Body | Enum | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |

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
            "eventCode": "ENUM_VALUE",
            "eventCategoryType": "ALL"
        }
    ]
}
```

</p>
</details>

---

### イベントリスト照会

```http
GET /v4.0/events
```

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Event.List | イベントリスト照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 全イベントリストの数 |
| events | Body | Array | イベントリスト |
| events.eventCategoryType | Body | Enum | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| events.eventCode | Body | Enum | 発生したイベントのタイプ |
| events.sourceId | Body | UUID | イベントソースの識別子 |
| events.sourceName | Body | String | イベントソースを識別できる名前 |
| events.messages | Body | Array | イベントメッセージリスト |
| events.messages.langCode | Body | Enum | 言語コード<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | Body | String | イベントメッセージ |
| events.eventYmdt | Body | DateTime | イベント発生日時 |

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
## イベント購読

### イベント購読一覧照会

```http
GET /v4.0/event-subscriptions
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:EventSubscription.List | イベント購読一覧照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 全イベント購読一覧数 |
| eventSubscriptions | Body | Array | イベント購読一覧 |
| eventSubscriptions.eventSubscriptionId | Body | UUID | イベント購読の識別子 |
| eventSubscriptions.eventCategoryType | Body | Enum | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.eventSubscriptionName | Body | String | イベント購読を識別できる名前 |
| eventSubscriptions.enabled | Body | Boolean | 有効かどうか |
| eventSubscriptions.notifyEmail | Body | Boolean | メール送信の有無 |
| eventSubscriptions.notifySms | Body | Boolean | SMS送信の有無 |
| eventSubscriptions.eventCodes | Body | Array | 購読するイベントコード一覧 |
| eventSubscriptions.sources | Body | Array | 購読するイベントソース一覧 |
| eventSubscriptions.sources.sourceId | Body | UUID | イベントソースの識別子 |
| eventSubscriptions.sources.eventCategoryType | Body | Enum | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.userGroupIds | Body | Array | イベント購読中のユーザーグループの識別子一覧 |
| eventSubscriptions.createdYmdt | Body | DateTime | 作成日時 |

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

### イベント購読作成

```http
POST /v4.0/event-subscriptions
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:EventSubscription.Create | イベント購読作成 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| eventCategoryType | Body | Enum | O | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | Body | String | O | イベント購読を識別できる名前 |
| enabled | Body | Boolean | O | 有効かどうか |
| notifyEmail | Body | Boolean | O | メール送信の有無 |
| notifySms | Body | Boolean | O | SMS送信の有無 |
| eventCodes | Body | Array | O | 購読するイベントコード一覧 |
| sources | Body | Array | O | 購読するイベントソース一覧 |
| sources.sourceId | Body | UUID | O | イベントソースの識別子 |
| sources.eventCategoryType | Body | Enum | O | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Body | Array | O | イベント購読するユーザーグループの識別子一覧 |

<details><summary>例</summary>
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

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| eventSubscriptionId | Body | UUID | イベント購読の識別子 |

<details><summary>例</summary>
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

### イベント購読削除

```http
DELETE /v4.0/event-subscriptions/{eventSubscriptionId}
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:EventSubscription.Delete | イベント購読削除 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | O |  |

#### レスポンス

このAPIはレスポンスボディを返しません。

---

### イベント購読修正

```http
PUT /v4.0/event-subscriptions/{eventSubscriptionId}
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:EventSubscription.Modify | イベント購読修正 |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | O |  |
| eventCategoryType | Body | Enum | X | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | Body | String | X | イベント購読を識別できる名前 |
| enabled | Body | Boolean | X | 有効かどうか |
| notifyEmail | Body | Boolean | X | メール送信の有無 |
| notifySms | Body | Boolean | X | SMS送信の有無 |
| eventCodes | Body | Array | X | 購読するイベントコード一覧 |
| sources | Body | Array | X | 購読するイベントソース一覧 |
| sources.sourceId | Body | UUID | O | イベントソースの識別子 |
| sources.eventCategoryType | Body | Enum | O | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Body | Array | X | イベント購読するユーザーグループの識別子一覧 |

<details><summary>例</summary>
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

#### レスポンス

このAPIはレスポンスボディを返しません。

---

## アベイラビリティゾーン

### アベイラビリティゾーン一覧照会

```http
GET /v4.0/availability-zones
```

#### 必要な権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:AvailabilityZone.List | アベイラビリティゾーン一覧照会 |

#### リクエスト

このAPIはリクエスト本文を要求しません。

#### レスポンス

| 名前 | 種類 | 形式 | 説明 |
|-----|-----|-----|-----|
| availabilityZones | Body | Array | アベイラビリティゾーン一覧 |
| availabilityZones.availabilityZoneName | Body | String | アベイラビリティゾーン名 |
| availabilityZones.zoneState | Body | Object | アベイラビリティゾーンの状態 |
| availabilityZones.zoneState.available | Body | Boolean | アベイラビリティゾーンの使用可否 |

<details><summary>例</summary>
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
