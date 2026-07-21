## RDS for MySQL API ガイド

**Database > RDS for MySQL > API v3.0 ガイド**

## RDS for MySQL API共通情報

### APIエンドポイント

| リージョン | エンドポイント |
|------|----------|
| 韓国(パンギョ)リージョン | https://kr1-rds-mysql.api.gncloud.go.kr |


### 認証および権限

RDS for MySQL APIを使用するには、User Access Keyが必要です。User Access Keyは、NHN CloudアカウントまたはIAMアカウントに基づいて発行される認証キーであり、Secret Access Keyと共に使用してAPIリクエストに対する認証手段として利用されます。

User Access KeyとSecret Access Keyは、コンソールのAPIセキュリティ設定で発行できます。User Access Keyの発行及び使用に関する詳細は、[User Access Key](/nhncloud/ja/public-api/user-access-key)を参照してください。
作成されたKeyはAppkeyと一緒にリクエストHeaderに含める必要があります。

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| X-TC-APP-KEY | Header | String | Y | RDS for MySQLサービスのAppkeyまたはプロジェクト統合Appkey |
| X-TC-AUTHENTICATION-ID | Header | String | Y | APIセキュリティ設定メニューのUser Access Key ID |
| X-TC-AUTHENTICATION-SECRET | Header | String | Y | APIセキュリティ設定メニューのSecret Access Key |

またプロジェクトメンバーのロールによって呼び出すことができるAPIが制限されます。 `RDS for MySQL ADMIN`、`RDS for MySQL VIEWER`に区分して権限を付与できます。

* `RDS for MySQL ADMIN`権限はすべての機能を使用可能です。
* `RDS for MySQL VIEWER`権限は情報を照会する機能のみ使用可能です。
* DBインスタンスを作成、修正、削除したり、DBインスタンスを対象とするいかなる機能も使用できません。
* ただし、通知グループとユーザーグループに関連する機能は使用可能です。

APIリクエスト時、認証に失敗したり権限がない場合、次のようなエラーが発生します。

| resultCode | resultMessage | 説明 |
|------------|---------------|-----|
| 80401 | Unauthorized | 認証に失敗しました。 |
| 80403 | Forbidden | 権限がありません。 |

### レスポンス共通情報

すべてのAPIリクエストに「200 OK」でレスポンスします。詳細なレスポンス結果はレスポンス本文のヘッダを参照します。

<details>
  <summary><strong>成功レスポンス</strong></summary>

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
  <summary><strong>失敗レスポンス</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| resultCode | Number | 結果コード<br/>- 成功: `0`<br/>- 失敗: `0`ではない値 |
| resultMessage | String | 結果メッセージ |
| isSuccessful | Boolean | 成否 |
### DBエンジンタイプ

| DBエンジンタイプ | 作成可否 | OBSからの復元可否 | 認証プラグインサポート情報 |
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

* ENUMタイプのdbVersionフィールドに対して該当値を使用できます。
* バージョンによって作成または復元が不可能な場合があります。

## プロジェクト情報

### プロジェクトメンバーリストを表示

#### リクエスト

```http
GET /v3.0/project/members
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| members | Array | プロジェクトメンバーリスト |
| members.memberId | UUID | プロジェクトメンバーの識別子 |
| members.memberName | String | プロジェクトメンバーの名前 |
| members.emailAddress | String | プロジェクトメンバーのメールアドレス |
| members.phoneNumber | String | プロジェクトメンバーの電話番号 |

---

### リージョンリストを表示

#### リクエスト

```http
GET /v3.0/project/regions
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| regions | Array | リージョンリスト |
| regions.regionCode | Enum | リージョンコード<br/>- KR1: `韓国(パンギョ)` |
| regions.isEnabled | Boolean | リージョンが有効かどうか |

---

## DBインスタンスの仕様

### DBインスタンス仕様リストを表示

#### リクエスト

```http
GET /v3.0/db-flavors
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbFlavors | Array | DBインスタンス仕様リスト |
| dbFlavors.dbFlavorId | UUID | DBインスタンス仕様の識別子 |
| dbFlavors.dbFlavorName | String | DBインスタンス仕様名 |
| dbFlavors.ram | Number | メモリ容量(MB) |
| dbFlavors.vcpus | Number | CPUコア数 |

---

## ネットワーク

### サブネットリストを表示

#### リクエスト

```http
GET /v3.0/network/subnets
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| subnets | Array | サブネットリスト |
| subnets.subnetId | UUID | サブネットの識別子 |
| subnets.subnetName | String | サブネットの識別できる名前 |
| subnets.subnetCidr | String | サブネットのCIDR |
| subnets.usingGateway | Boolean | ゲートウェイを使用するかどうか |
| subnets.availableIpCount | Number | 使用可能なIP数 |

---

## DBエンジン

### DBエンジンリストを表示

#### リクエスト

```http
GET /v3.0/db-versions
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbVersions | Array | DBエンジンリスト |
| dbVersions.dbVersion | String | DBエンジンタイプ |
| dbVersions.dbVersionName | String | DBエンジン名前 |
| dbVersions.restorableFromObs | Boolean | オブジェクトストレージから復元可能かどうか |

---

## ストレージ

### ストレージタイプリストを表示

#### リクエスト

```http
GET /v3.0/storage-types
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| storageTypes | Array | ストレージタイプリスト |

---

### ストレージリストを表示

#### リクエスト

```http
GET /v3.0/storages
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| storages | Array | ストレージリスト |

---

## 作業情報

### 作業状態

| 状態名 | 説明 |
|--------------------|----------------------|
| `PREPARING` | 作業が準備中の場合 |
| `READY` | 作業が準備完了している場合 |
| `RUNNING` | 作業が進行中の場合 |
| `COMPLETED` | 作業が完了している場合 |
| `REGISTERED` | 作業が登録されている場合 |
| `WAIT_TO_REGISTER` | 作業登録待機中の場合 |
| `INTERRUPTED` | 作業進行中に割り込みが発生した場合 |
| `CANCELED` | 作業がキャンセルされた場合 |
| `FAILED` | 作業が失敗した場合 |
| `ERROR` | 作業進行中にエラーが発生した場合 |
| `DELETED` | 作業が削除された場合 |
| `FAIL_TO_READY` | 作業の準備に失敗した場合 |

### 作業情報の詳細表示

#### リクエスト

```http
GET /v3.0/jobs/{jobId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |
| jobStatus | Enum | 作業の現在状態<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Array | 関連リソースリスト |
| resourceRelations.resourceType | String | 関連リソースタイプ |
| resourceRelations.resourceId | String | 関連リソースの識別子 |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

## DBインスタンスグループ

### DBインスタンスグループリストを表示

#### リクエスト

```http
GET /v3.0/db-instance-groups
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbInstanceGroups | Array | DBインスタンスグループリスト |
| dbInstanceGroups.dbInstanceGroupId | UUID | DBインスタンスグループの識別子 |
| dbInstanceGroups.replicationType | Enum | DBインスタンスグループの複製形態<br/>- STANDALONE: `単一`<br/>- HIGH_AVAILABILITY: `高可用性(HA)` |
| dbInstanceGroups.createdYmdt | DateTime | 作成日時 |
| dbInstanceGroups.updatedYmdt | DateTime | 修正日時 |

---

### DBインスタンスグループの詳細を表示

#### リクエスト

```http
GET /v3.0/db-instance-groups/{dbInstanceGroupId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbInstanceGroupId | UUID | DBインスタンスグループの識別子 |
| replicationType | Enum | DBインスタンスグループの複製形態<br/>- STANDALONE: `単一`<br/>- HIGH_AVAILABILITY: `高可用性(HA)` |
| dbInstances | Array | DBインスタンスグループに属するDBインスタンスリスト |
| dbInstances.dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceType | Enum | DBインスタンスの役割タイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstances.dbInstanceStatus | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(グリーン)`<br/>- STORAGE_FULL: `容量不足(レッド)`<br/>- FAIL_TO_CREATE: `作成失敗(レッド)`<br/>- FAIL_TO_CONNECT: `接続失敗(レッド)`<br/>- REPLICATION_STOP: `複製中断(レッド)`<br/>- REPLICATION_DELAY: `複製遅延(イエロー)`<br/>- FAILOVER: `フェイルオーバー完了(レッド)`<br/>- SHUTDOWN: `停止(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

## DBインスタンス

### DBインスタンス状態

| 状態 | 説明 |
|---------------------|------------------------------|
| `AVAILABLE` | DBインスタンスが使用可能な場合 |
| `BEFORE_CREATE` | DBインスタンスが作成前の場合 |
| `STORAGE_FULL` | DBインスタンスの容量が不足している場合 |
| `FAIL_TO_CREATE` | DBインスタンスの作成に失敗した場合 |
| `FAIL_TO_CONNECT` | DBインスタンスの接続に失敗した場合 |
| `REPLICATION_STOP` | DBインスタンスの複製が中断した場合 |
| `FAILOVER` | DBインスタンスが高可用性(HA)フェイルオーバーした場合 |
| `SHUTDOWN` | DBインスタンスが停止した場合 |
| `DELETED` | DBインスタンスが削除された場合 |

### DBインスタンス進行状態

| 状態 | 説明 |
|----------------------------|--------------|
| `APPLYING_PARAMETER_GROUP` | パラメータグループ適用中 |
| `BACKING_UP` | バックアップ中 |
| `CANCELING` | キャンセル中 |
| `CREATING` | 作成中 |
| `CREATING_SCHEMA` | DBスキーマ作成中 |
| `CREATING_USER` | ユーザー作成中 |
| `DELETING` | 削除中 |
| `DELETING_SCHEMA` | DBスキーマ削除中 |
| `DELETING_USER` | ユーザー削除中 |
| `EXPORTING_BACKUP` | バックアップをエクスポート中 |
| `FAILING_OVER` | フェイルオーバー中 |
| `MIGRATING` | マイグレーション中 |
| `MODIFYING` | 修正中 |
| `PREPARING` | 準備中 |
| `PROMOTING` | 昇格中 |
| `REBUILDING` | 再構築中 |
| `REPAIRING` | 復旧中 |
| `REPLICATING` | 複製中 |
| `RESTARTING` | 再起動中 |
| `RESTARTING_FORCIBLY` | 強制再起動中 |
| `RESTORING` | 復元中 |
| `STARTING` | 起動中 |
| `STOPPING` | 停止中 |
| `SYNCING_SCHEMA` | DBスキーマ同期中 |
| `SYNCING_USER` | ユーザー同期中 |
| `UPDATING_USER` | ユーザー修正中 |

### DBインスタンスリストを表示

#### リクエスト

```http
GET /v3.0/db-instances
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbInstances | Array | DBインスタンスリスト |
| dbInstances.dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceGroupId | UUID | DBインスタンスグループの識別子 |
| dbInstances.dbInstanceName | String | DBインスタンスを識別できる名前 |
| dbInstances.description | String | DBインスタンスの追加情報 |
| dbInstances.dbVersion | String | DBエンジンタイプ |
| dbInstances.dbPort | Number | DBポート |
| dbInstances.dbInstanceType | Enum | DBインスタンスの役割タイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstances.dbInstanceStatus | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(グリーン)`<br/>- STORAGE_FULL: `容量不足(レッド)`<br/>- FAIL_TO_CREATE: `作成失敗(レッド)`<br/>- FAIL_TO_CONNECT: `接続失敗(レッド)`<br/>- REPLICATION_STOP: `複製中断(レッド)`<br/>- REPLICATION_DELAY: `複製遅延(イエロー)`<br/>- FAILOVER: `フェイルオーバー完了(レッド)`<br/>- SHUTDOWN: `停止(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| dbInstances.progressStatus | Enum | DBインスタンスの現在進行状態<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbInstances.createdYmdt | DateTime | 作成日時 |
| dbInstances.updatedYmdt | DateTime | 修正日時 |

---

### DBインスタンスを作成する

#### リクエスト

```http
POST /v3.0/db-instances
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| dbInstanceCandidateName | String | N | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | UUID | Y | DBインスタンス仕様の識別子 |
| dbVersion | String | Y | DBエンジンタイプ |
| dbPort | Number | Y | DBポート<br/>- 最小値: 3306、最大値: 43306 |
| dbUserName | String | Y | DBユーザーアカウント名<br/>- 最小長さ: `1`<br/>- 最大長さ: `32` |
| dbPassword | String | Y | DBユーザーアカウントのパスワード<br/>- 最小長さ: `4`<br/>- 最大長さ: `256` |
| parameterGroupId | UUID | Y | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useHighAvailability | Boolean | N | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| pingInterval | Number | N | 高可用性を使用する時、Ping間隔(秒)<br/>- デフォルト値: `3`<br/>- 最小値: `1`<br/>- 最大値: `600` |
| useDefaultNotification | Boolean | N | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |
| authenticationPlugin | Enum | N | 認証プラグイン<br/>- NATIVE: `mysql_native_password認証`<br/>- CACHING_SHA2: `caching_sha2_password認証(MySQL専用)`<br/>- SHA256: `sha256_password認証(MySQL専用)` |
| tlsOption | Enum | N | TLS Option<br/>- デフォルト値: `NONE`<br/>- NONE: `TLS未使用`<br/>- SSL: `SSL認証`<br/>- X509: `X509証明書認証` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | Y | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | データストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)リージョン` |
| backup.useBackupLock | Boolean | N | テーブルロックを使用するかどうか<br/>- デフォルト値: `true` |
| backup.backupSchedules | Array | Y | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### オブジェクトストレージを利用したDBインスタンスの復元

#### リクエスト

```http
POST /v3.0/db-instances/restore-from-obs
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
"dbSecurityGroupIds": [],
"userGroupIds": [],
"useDeletionProtection": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| dbInstanceCandidateName | String | N | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | UUID | Y | DBインスタンス仕様の識別子 |
| dbPort | Number | N | DBポート |
| dbVersion | String | Y | DBエンジンタイプ |
| useHighAvailability | Boolean | N | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| imageId | UUID | N | イメージの識別子 |
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | データストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | Y | DBインスタンスを作成するアベイラビリティゾーン |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)リージョン` |
| backup.useBackupLock | Boolean | N | テーブルロックを使用するかどうか<br/>- デフォルト値: `true` |
| backup.backupSchedules | Array | Y | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| restore | Object | Y | 復元情報オブジェクト |
| restore.tenantId | String | Y | バックアップが保存されたオブジェクトストレージのテナントID |
| restore.username | String | Y | NHN CloudアカウントまたはメンバーアカウントまたはIAMメンバーID |
| restore.password | String | Y | バックアップが保存されたオブジェクトストレージのAPIパスワード |
| restore.targetContainer | String | Y | バックアップが保存されたオブジェクトストレージのコンテナ |
| restore.objectPath | String | Y | コンテナに保存されたバックアップのパス |
| useDefaultNotification | Boolean | N | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| parameterGroupId | UUID | Y | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBインスタンスを削除する

#### リクエスト

```http
DELETE /v3.0/db-instances/{dbInstanceId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBインスタンスの詳細を表示

#### リクエスト

```http
GET /v3.0/db-instances/{dbInstanceId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstanceGroupId | UUID | DBインスタンスグループの識別子 |
| dbInstanceName | String | DBインスタンスを識別できる名前 |
| description | String | DBインスタンスの追加情報 |
| dbVersion | String | DBエンジンタイプ |
| dbPort | Number | DBポート |
| dbInstanceType | Enum | DBインスタンスの役割タイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstanceStatus | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(グリーン)`<br/>- STORAGE_FULL: `容量不足(レッド)`<br/>- FAIL_TO_CREATE: `作成失敗(レッド)`<br/>- FAIL_TO_CONNECT: `接続失敗(レッド)`<br/>- REPLICATION_STOP: `複製中断(レッド)`<br/>- REPLICATION_DELAY: `複製遅延(イエロー)`<br/>- FAILOVER: `フェイルオーバー完了(レッド)`<br/>- SHUTDOWN: `停止(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| progressStatus | Enum | DBインスタンスの現在進行状態<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbFlavorId | UUID | DBインスタンス仕様の識別子 |
| parameterGroupId | UUID | DBインスタンスに適用されたパラメータグループの識別子 |
| dbSecurityGroupIds | Array | DBインスタンスに適用されたDBセキュリティグループの識別子リスト |
| notificationGroupIds | Array | DBインスタンスに適用された通知グループの識別子リスト |
| useDeletionProtection | Boolean | DBインスタンス削除保護の有無 |
| supportAuthenticationPlugin | Boolean | 認証プラグインサポートの有無 |
| needToApplyParameterGroup | Boolean | 最新パラメータグループの適用が必要かどうか |
| needMigration | Boolean | マイグレーションが必要かどうか |
| supportDbVersionUpgrade | Boolean | DBバージョンアップグレードをサポートするかどうか |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### DBインスタンスを修正する

#### リクエスト

```http
PUT /v3.0/db-instances/{dbInstanceId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| dbInstanceCandidateName | String | N | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbPort | Number | N | DBポート<br/>- 最小値: 3306、最大値: 43306 |
| dbFlavorId | UUID | N | DBインスタンス仕様の識別子 |
| parameterGroupId | UUID | N | パラメータグループの識別子 |
| dbVersion | String | N | DBエンジンバージョンコード |
| useDummy | Boolean | N | 単一DBインスタンスのDBバージョンアップグレード時にダミーを使用するかどうか<br/>- デフォルト値: `false` |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| executeBackup | Boolean | N | 現時点でバックアップを行うかどうか<br/>- デフォルト値: `false` |
| useOnlineFailover | Boolean | N | フェイルオーバーを利用した再起動を行うかどうか<br/>- デフォルト値: `false` |
| waitReplicationDelay | Boolean | N | 複製遅延の解消を待機するかどうか<br/>- デフォルト値: `false` |
| useReadOnly | Boolean | N | 書き込み負荷を遮断するかどうか<br/>- デフォルト値: `false` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBインスタンスをバックアップする

#### リクエスト

```http
POST /v3.0/db-instances/{dbInstanceId}/backup
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"backupName": "backupName"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| backupName | String | Y | バックアップを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### バックアップ情報を表示

#### リクエスト

```http
GET /v3.0/db-instances/{dbInstanceId}/backup-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| backupPeriod | Number | バックアップ保管期間(日) |
| ftwrlWaitTimeout | Number | クエリ遅延待機時間(秒) |
| backupRetryCount | Number | バックアップ再試行回数 |
| replicationRegion | Enum | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)リージョン` |
| useBackupLock | Boolean | テーブルロックを使用するかどうか |
| backupSchedules | Array | 予定された自動バックアップリスト |
| backupSchedules.backupWndBgnTime | Time | バックアップ開始時刻 |
| backupSchedules.backupWndDuration | Enum | バックアップDuration<br/>- HALF_AN_HOUR<br/>- ONE_HOUR<br/>- ONE_HOUR_AND_HALF<br/>- TWO_HOURS<br/>- TWO_HOURS_AND_HALF<br/>- THREE_HOURS |

---

### バックアップ情報を修正する

#### リクエスト

```http
PUT /v3.0/db-instances/{dbInstanceId}/backup-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| backupPeriod | Number | N | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)リージョン` |
| useBackupLock | Boolean | N | テーブルロックを使用するかどうか |
| backupSchedules | Array | N | 予定された自動バックアップリスト |
| backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBインスタンスバックアップ後にエクスポート

#### リクエスト

```http
POST /v3.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| tenantId | String | Y | バックアップが保存されるオブジェクトストレージのテナントID<br/>- 最小長さ: `32`<br/>- 最大長さ: `32` |
| username | String | Y | NHN Cloud会員またはIAMメンバーID |
| password | String | Y | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | String | Y | バックアップが保存されるオブジェクトストレージのコンテナ |
| objectPath | String | Y | コンテナに保存されるバックアップのパス |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### テスト用DBイメージメタの変更

#### リクエスト

```http
PUT /v3.0/db-instances/{dbInstanceId}/change-image-meta
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBスキーマリストを表示

#### リクエスト

```http
GET /v3.0/db-instances/{dbInstanceId}/db-schemas
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbSchemas | Array | DBスキーマリスト |
| dbSchemas.dbSchemaId | UUID | DBスキーマの識別子 |
| dbSchemas.dbSchemaName | String | DBスキーマ名 |
| dbSchemas.dbSchemaStatus | Enum | DBスキーマの現在状態<br/>- STABLE<br/>- CREATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbSchemas.createdYmdt | DateTime | 作成日時 |

---

### DBスキーマを作成する

#### リクエスト

```http
POST /v3.0/db-instances/{dbInstanceId}/db-schemas
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbSchemaName": "dbSchemaName-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbSchemaName | String | Y | DBスキーマ名<br/>- 最大長さ: `64`<br/>- 英字で始まり、英字/数字/_ のみ使用可能、1～64文字、MySQLの予約語は不可 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBスキーマを削除する

#### リクエスト

```http
DELETE /v3.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |
| dbSchemaId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBユーザーリストを表示

#### リクエスト

```http
GET /v3.0/db-instances/{dbInstanceId}/db-users
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbUsers | Array | DBユーザーリスト |
| dbUsers.dbUserId | UUID | DBユーザーの識別子 |
| dbUsers.dbUserName | String | DBユーザーアカウント名 |
| dbUsers.host | String | DBユーザーアカウントのホスト名 |
| dbUsers.authorityType | Enum | DBユーザー権限タイプ<br/>- CUSTOM: `ユーザー定義権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限`<br/>- ALL: `全体権限` |
| dbUsers.dbUserStatus | Enum | DBユーザーの現在状態<br/>- STABLE<br/>- CREATING<br/>- UPDATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbUsers.createdYmdt | DateTime | 作成日時 |
| dbUsers.updatedYmdt | DateTime | 修正日時 |
| dbUsers.authenticationPlugin | Enum | 認証プラグイン<br/>- NATIVE: `mysql_native_password認証`<br/>- CACHING_SHA2: `caching_sha2_password認証(MySQL専用)`<br/>- SHA256: `sha256_password認証(MySQL専用)` |
| dbUsers.tlsOption | Enum | 証明書オプション<br/>- NONE: `TLS未使用`<br/>- SSL: `SSL認証`<br/>- X509: `X509証明書認証` |

---

### DBユーザーを作成する

#### リクエスト

```http
<!-- TERM-UNRESOLVED: DB 이미지 메타 (セクション「テスト用DBイメージメタの変更」— 発行済みJA先例なし) -->
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbUserName | String | Y | DBユーザーアカウント名<br/>- 最小長さ: `1`<br/>- 最大長さ: `32` |
| dbPassword | String | Y | DBユーザーアカウントのパスワード<br/>- 最小長さ: `4`<br/>- 最大長さ: `256` |
| host | String | Y | DBユーザーアカウントのホスト名<br/>- 最大長さ: `45` |
| authorityType | Enum | Y | DBユーザー権限タイプ<br/>- CUSTOM: `ユーザー定義権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限`<br/>- ALL: `全体権限` |
| authenticationPlugin | Enum | N | 認証プラグイン<br/>- NATIVE: `mysql_native_password認証`<br/>- CACHING_SHA2: `caching_sha2_password認証(MySQL専用)`<br/>- SHA256: `sha256_password認証(MySQL専用)` |
| tlsOption | Enum | N | 証明書オプション<br/>- デフォルト値: `NONE`<br/>- NONE: `TLS未使用`<br/>- SSL: `SSL認証`<br/>- X509: `X509証明書認証` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBユーザーを削除する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |
| dbUserId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBユーザーを修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |
| dbUserId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"dbPassword": "dbPassword",
"authorityType": "CUSTOM",
"authenticationPlugin": "NATIVE",
"tlsOption": "NONE"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbPassword | String | N | DBユーザーアカウントのパスワード<br/>- 最小長さ: `4`<br/>- 最大長さ: `256` |
| authorityType | Enum | N | DBユーザー権限タイプ<br/>- CUSTOM: `ユーザー定義権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限`<br/>- ALL: `全体権限` |
| authenticationPlugin | Enum | N | 認証プラグイン<br/>- NATIVE: `mysql_native_password認証`<br/>- CACHING_SHA2: `caching_sha2_password認証(MySQL専用)`<br/>- SHA256: `sha256_password認証(MySQL専用)` |
| tlsOption | Enum | N | 証明書オプション<br/>- NONE: `TLS未使用`<br/>- SSL: `SSL認証`<br/>- X509: `X509証明書認証` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBインスタンス削除保護設定を変更する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"useDeletionProtection": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| useDeletionProtection | Boolean | Y | 削除保護の有無 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBインスタンスを強制再起動する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 高可用性を修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"useHighAvailability": false,
"useHighAvailability": false,
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| useHighAvailability | Boolean | Y | 高可用性を使用するかどうか |
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### 高可用性を一時停止する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### 高可用性を復旧する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### 高可用性を再開する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### 高可用性を分離する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### ログファイルリスト表示

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| logFiles | Array | ログファイルリスト |
| logFiles.logFileName | String | ログファイル名 |
| logFiles.logFileType | Enum | ログファイルタイプ種類<br/>- `ERROR`<br/>- `BINLOG`<br/>- `GENERAL`<br/>- `SLOW_QUERY`<br/>- `AUDIT`<br/>- `BACKUP` |
| logFiles.logFileSize | Number | ログファイルサイズ(Byte) |
| logFiles.createdYmdt | DateTime | 作成日時 |

---

### ログファイルのエクスポート

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| logFileNames | Array | Y | ログファイル名リスト |
| tenantId | String | Y | ログファイルが保存されるオブジェクトストレージのテナントID<br/>- 最小長: `32`<br/>- 最大長: `32` |
| username | String | Y | NHN CloudアカウントまたはIAMメンバーID |
| password | String | Y | ログファイルが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | String | Y | ログファイルが保存されるオブジェクトストレージのコンテナ |
| objectPath | String | Y | コンテナに保存されるログファイルのパス |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### ネットワーク情報を表示

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| availabilityZone | String | DBインスタンスを作成するアベイラビリティゾーン |
| subnet | Object | サブネットオブジェクト |
| subnet.subnetId | UUID | サブネットの識別子 |
| subnet.subnetName | String | サブネットの識別できる名前 |
| subnet.subnetCidr | String | サブネットのCIDR |
| endPoints | Array | 接続情報リスト |
| endPoints.domain | String | ドメイン |
| endPoints.ipAddress | String | IPアドレス |
| endPoints.endPointType | String | 接続情報タイプ |

---

### ネットワーク情報を修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
{
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| usePublicAccess | Boolean | Y | 外部接続可否 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBインスタンスを昇格する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBインスタンスを複製する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | UUID | N | DBインスタンス仕様の識別子 |
| dbPort | Number | Y | DBポート<br/>- 最小値: 3306、最大値: 43306 |
| parameterGroupId | UUID | N | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useDefaultNotification | Boolean | N | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.usePublicAccess | Boolean | N | 外部接続可否 |
| network.availabilityZone | Enum | Y | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Object | N | ストレージ情報オブジェクト |
| storage.storageType | Enum | N | データストレージタイプ |
| storage.storageSize | Number | N | データストレージサイズ(GB)<br/>- 最小値: `20` |
| backup | Object | N | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | N | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)リージョン` |
| backup.useBackupLock | Boolean | N | テーブルロックを使用するかどうか |
| backup.backupSchedules | Array | N | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Time | N | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | N | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBインスタンスを再起動する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"useOnlineFailover": false,
"executeBackup": false,
"waitReplicationDelay": false,
"useReadOnly": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| useOnlineFailover | Boolean | N | フェイルオーバーを利用した再起動を行うかどうか<br/>- デフォルト値: `false` |
| executeBackup | Boolean | N | 現時点でバックアップを行うかどうか<br/>- デフォルト値: `false` |
| waitReplicationDelay | Boolean | N | 複製遅延の解消を待機するかどうか<br/>- デフォルト値: `false` |
| useReadOnly | Boolean | N | 書き込み負荷を遮断するかどうか<br/>- デフォルト値: `false` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### 復元情報照会

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 復元される最後のクエリ照会

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| executedYmdt | DateTime | クエリ実行日時 |
| lastQuery | String | 最後に実行したクエリ |

---

### DBインスタンスを復元する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| dbInstanceCandidateName | String | N | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | UUID | Y | DBインスタンス仕様の識別子 |
| dbPort | Number | N | DBポート |
| useHighAvailability | Boolean | N | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| imageId | UUID | N | イメージの識別子 |
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | データストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | Y | DBインスタンスを作成するアベイラビリティゾーン |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)リージョン` |
| backup.useBackupLock | Boolean | N | テーブルロックを使用するかどうか<br/>- デフォルト値: `true` |
| backup.backupSchedules | Array | Y | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| restore | Object | Y | 復元情報オブジェクト |
| restore.restoreType | Enum | Y | 復元タイプ<br/>- TIMESTAMP: `復元可能な時間内の時間を利用した時点復元`<br/>- BINLOG: `復元可能なバイナリログ位置を利用した時点復元`<br/>- BACKUP: `既存に作成したバックアップを利用したスナップショット復元` |
| restore.binLog.binLogFileName | String | N | 復元に使用するバイナリログの名前 |
| restore.binLog.binLogPosition | Object | N | 復元に使用するバイナリログの位置 |
| useDefaultNotification | Boolean | N | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| parameterGroupId | UUID | Y | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |

#### Timestampを利用した時点復元時、リクエスト(restoreTypeが`TIMESTAMP`の場合)

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| restore.restoreYmdt | DateTime | N | DBインスタンス復元日時 |

POST /v3.0/db-instances/{dbInstanceId}/restore

#### バイナリログを利用した時点復元時、リクエスト(restoreTypeが`BINLOG`の場合)

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| restore.backupId | UUID | N | 復元に使用するバックアップの識別子 |
| restore.binLog | Object | N | 復元に使用するバイナリログ情報オブジェクト |

復元情報照会で照会した最新の復元可能な時間以前に対してのみ復元が可能です。

#### バックアップを利用した復元時、リクエスト(restoreTypeが`BACKUP`の場合)

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| restore.backupId | UUID | N | 復元に使用するバックアップの識別子 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBインスタンスを起動する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBインスタンスを停止する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### ストレージ情報を表示

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| storageType | Enum | データストレージタイプ |
| storageSize | Number | データストレージサイズ(GB) |
| storageStatus | Enum | データストレージの現在状態<br/>- DELETED: `削除済み`<br/>- PENDING_DELETION: `削除猶予中`<br/>- DELETION_RESERVED: `削除予約済み(スナップショット整理待ち)`<br/>- DETACHED: `取り付けられていない`<br/>- ATTACHED: `取り付けられている` |

---

### ストレージ情報を修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
{
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最大値: `2048` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

## バックアップ

### バックアップ状態

| 状態 | 説明 |
|--------------|--------------|
| `BACKING_UP` | バックアップ中の場合 |
| `COMPLETED` | バックアップが完了している場合 |
| `DELETING` | バックアップが削除中の場合 |
| `DELETED` | バックアップが削除されている場合 |
| `ERROR` | エラーが発生した場合 |

### バックアップリスト照会

#### リクエスト

```http
---
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | 全バックアップリスト数 |
| backups | Array | バックアップリスト |
| backups.backupId | UUID | バックアップの識別子 |
| backups.backupName | String | バックアップを識別できる名前 |
| backups.backupStatus | Enum | バックアップの現在状態<br/>- BACKING_UP: `バックアップ中 (スピナー)`<br/>- VERIFYING: `検証中 (スピナー)`<br/>- COMPLETED: `使用可能 (緑アイコン)`<br/>- DELETING: `削除中 (スピナー)`<br/>- DELETED: `削除済み (グレーアイコン)`<br/>- ERROR: `エラー (赤アイコン)` |
| backups.dbInstanceId | UUID | 原本DBインスタンスの識別子 |
| backups.dbVersion | String | DBエンジンタイプ |
| backups.utilVersion | String | ユーティリティバージョン |
| backups.backupType | Enum | バックアップタイプ<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Number | バックアップのサイズ(Byte) |
| backups.createdYmdt | DateTime | 作成日時 |
| backups.updatedYmdt | DateTime | 修正日時 |

---

### バックアップを削除する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### バックアップのエクスポート

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| tenantId | String | Y | バックアップが保存されるオブジェクトストレージのテナントID<br/>- 最小長さ: `32`<br/>- 最大長さ: `32` |
| username | String | Y | NHN Cloud会員またはIAMメンバーID |
| password | String | Y | バックアップが保存されるオブジェクトストレージのAPIパスワード |
| targetContainer | String | Y | バックアップが保存されるオブジェクトストレージのコンテナ |
| objectPath | String | Y | コンテナに保存されるバックアップのパス |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### バックアップを復元する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | UUID | Y | DBインスタンス仕様の識別子 |
| dbPort | Number | Y | DBポート<br/>- 最小値: 3306、最大値: 43306 |
| parameterGroupId | UUID | Y | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useHighAvailability | Boolean | N | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| pingInterval | Number | N | 高可用性を使用する時、Ping間隔(秒)<br/>- デフォルト値: `3`<br/>- 最小値: `1`<br/>- 最大値: `600` |
| useDefaultNotification | Boolean | N | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | Y | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | データストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR1: `韓国(パンギョ)リージョン` |
| backup.useBackupLock | Boolean | N | テーブルロックを使用するかどうか<br/>- デフォルト値: `true` |
| backup.backupSchedules | Array | Y | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

## DBセキュリティグループ

### DBセキュリティグループ進行状態

| 状態 | 説明 |
|-----------------|--------------|
| `NONE` | 進行中の作業がない |
| `CREATING_RULE` | ルールポリシーの作成中 |
| `UPDATING_RULE` | ルールポリシーの修正中 |
| `DELETING_RULE` | ルールポリシーの削除中 |

### DBセキュリティグループリストを表示

#### リクエスト

```http
---
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbSecurityGroups | Array | DBセキュリティグループリスト |
| dbSecurityGroups.dbSecurityGroupId | UUID | DBセキュリティグループの識別子 |
| dbSecurityGroups.dbSecurityGroupName | String | DBセキュリティグループを識別できる名前 |
| dbSecurityGroups.description | String | DBセキュリティグループの追加情報 |
| dbSecurityGroups.progressStatus | Enum | DBセキュリティグループの現在進行状態<br/>- NONE: `なし`<br/>- CREATING_RULE: `ルール作成中`<br/>- UPDATING_RULE: `ルール修正中`<br/>- DELETING_RULE: `ルール削除中`<br/>- APPLYING_DEFAULT_RULE: `デフォルトルール適用中` |
| dbSecurityGroups.createdYmdt | DateTime | 作成日時 |
| dbSecurityGroups.updatedYmdt | DateTime | 修正日時 |

---

### DBセキュリティグループを作成する

#### リクエスト

```http
---
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | Y | DBセキュリティグループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| description | String | N | DBセキュリティグループの追加情報<br/>- 最大長: `100` |
| rules | Array | Y | DBセキュリティグループルールリスト |
| rules.direction | Enum | Y | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| rules.etherType | Enum | Y | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| rules.port | Object | Y | ポートオブジェクト |
| rules.port.portType | Enum | Y | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| rules.port.minPort | Number | N | 最小ポート範囲<br/>- 最小値: `3306` |
| rules.port.maxPort | Number | N | 最大ポート範囲<br/>- 最大値: `65535` |
| rules.cidr | String | Y | CIDR |
| rules.description | String | N | セキュリティグループルールの追加情報 |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbSecurityGroupId | UUID | DBセキュリティグループの識別子 |

---

### DBセキュリティグループを削除する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBセキュリティグループの詳細を表示

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbSecurityGroup | Object | DBセキュリティグループ |
| dbSecurityGroup.dbSecurityGroupId | UUID | DBセキュリティグループの識別子 |
| dbSecurityGroup.dbSecurityGroupName | String | DBセキュリティグループを識別できる名前 |
| dbSecurityGroup.description | String | DBセキュリティグループの追加情報 |
| dbSecurityGroup.progressStatus | Enum | DBセキュリティグループの現在進行状態<br/>- NONE: `なし`<br/>- CREATING_RULE: `ルール作成中`<br/>- UPDATING_RULE: `ルール修正中`<br/>- DELETING_RULE: `ルール削除中`<br/>- APPLYING_DEFAULT_RULE: `デフォルトルール適用中` |
| dbSecurityGroup.rules | Array | DBセキュリティグループルールリスト |
| dbSecurityGroup.rules.ruleId | UUID | DBセキュリティグループルールの識別子 |
| dbSecurityGroup.rules.description | String | DBセキュリティグループルールの追加情報 |
| dbSecurityGroup.rules.direction | Enum | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| dbSecurityGroup.rules.etherType | Enum | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| dbSecurityGroup.rules.port | Object | ポートオブジェクト |
| dbSecurityGroup.rules.port.portType | Enum | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| dbSecurityGroup.rules.port.minPort | Number | 最小ポート範囲 |
| dbSecurityGroup.rules.port.maxPort | Number | 最大ポート範囲 |
| dbSecurityGroup.rules.cidr | String | CIDR |
| dbSecurityGroup.rules.createdYmdt | DateTime | 作成日時 |
| dbSecurityGroup.rules.updatedYmdt | DateTime | 修正日時 |
| dbSecurityGroup.createdYmdt | DateTime | 作成日時 |
| dbSecurityGroup.updatedYmdt | DateTime | 修正日時 |

---

### DBセキュリティグループを修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
{
"cidr": "192.168.0.0/24",
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | N | DBセキュリティグループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| description | String | N | DBセキュリティグループの追加情報<br/>- 最大長: `100` |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBセキュリティグループルールを削除する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleIds | Query | String | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBセキュリティグループルールを作成する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| direction | Enum | Y | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| etherType | Enum | Y | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| port | Object | Y | ポートオブジェクト |
| port.portType | Enum | Y | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| port.minPort | Number | N | 最小ポート範囲<br/>- 最小値: `3306` |
| port.maxPort | Number | N | 最大ポート範囲<br/>- 最大値: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | DBセキュリティグループルールの追加情報<br/>- 最大長: `200` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

### DBセキュリティグループルールを修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| direction | Enum | Y | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| etherType | Enum | Y | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| port | Object | Y | ポートオブジェクト |
| port.portType | Enum | Y | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| port.minPort | Number | N | 最小ポート範囲<br/>- 最小値: `3306` |
| port.maxPort | Number | N | 最大ポート範囲<br/>- 最大値: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | DBセキュリティグループルールの追加情報<br/>- 最大長: `200` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| jobId | UUID | 作業の識別子 |

---

## パラメータグループ

### パラメータグループリストを表示

#### リクエスト

```http
---
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroups | Array | パラメータグループリスト |
| parameterGroups.parameterGroupId | UUID | パラメータグループの識別子 |
| parameterGroups.parameterGroupName | String | パラメータグループを識別できる名前 |
| parameterGroups.description | String | パラメータグループの追加情報 |
| parameterGroups.dbVersion | String | DBエンジンタイプ |
| parameterGroups.parameterGroupStatus | Enum | パラメータグループの現在状態<br/>- STABLE: `適用完了`<br/>- NEED_TO_APPLY: `適用必要`<br/>- DELETED: `削除済み` |
| parameterGroups.createdYmdt | DateTime | 作成日時 |
| parameterGroups.updatedYmdt | DateTime | 修正日時 |

---

### パラメータグループを作成する

#### リクエスト

```http
---
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
{
"description": "description-example",
"description": "description-example",
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | パラメータグループを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | パラメータグループの追加情報<br/>- 最大長さ: `100` |
| dbVersion | String | Y | DBエンジンタイプ |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroupId | UUID | パラメータグループの識別子 |

---

### パラメータグループを削除する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループの詳細を表示

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroupId | UUID | パラメータグループの識別子 |
| parameterGroupName | String | パラメータグループを識別できる名前 |
| description | String | パラメータグループの追加情報 |
| dbVersion | String | DBエンジンタイプ |
| parameterGroupStatus | Enum | パラメータグループの現在状態<br/>- STABLE: `適用完了`<br/>- NEED_TO_APPLY: `適用必要`<br/>- DELETED: `削除済み` |
| parameters | Array | パラメータリスト |
| parameters.parameterId | UUID | パラメータの識別子 |
| parameters.parameterFileGroup | Enum | パラメータファイルグループタイプ<br/>- CLIENT<br/>- MYSQL<br/>- MYSQLD |
| parameters.parameterName | String | パラメータ名 |
| parameters.fileParameterName | String | パラメータファイル名 |
| parameters.value | String | 現在設定されている値 |
| parameters.defaultValue | String | デフォルト値 |
| parameters.allowedValue | String | 許可された値 |
| parameters.updateType | Enum | 修正タイプ<br/>- VARIABLE<br/>- CONSTANT<br/>- INIT_VARIABLE |
| parameters.applyType | Enum | 適用タイプ<br/>- BOTH<br/>- SESSION<br/>- FILE |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### パラメータグループを修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
{
"cidr": "192.168.0.0/24",
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| parameterGroupName | String | N | パラメータグループを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | パラメータグループの追加情報<br/>- 最大長さ: `100` |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループをコピーする

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
{
"cidr": "192.168.0.0/24",
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | パラメータグループを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | パラメータグループの追加情報<br/>- 最大長さ: `100` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroupId | UUID | パラメータグループの識別子 |

---

### パラメータを修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| modifiedParameters | Array | Y | 変更するパラメータリスト |
| modifiedParameters.parameterId | UUID | Y | パラメータの識別子 |
| modifiedParameters.value | String | Y | 変更するパラメータ値 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループを再設定する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

## ユーザーグループ

### ユーザーグループリストを表示

#### リクエスト

```http
---
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| userGroups | Array | ユーザーグループリスト |
| userGroups.userGroupId | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | String | ユーザーグループを識別できる名前 |
| userGroups.createdYmdt | DateTime | 作成日時 |
| userGroups.updatedYmdt | DateTime | 修正日時 |

---

### ユーザーグループを作成する

#### リクエスト

```http
---
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
"userGroupName": "userGroupName-example",
"memberIds": [],
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| userGroupName | String | Y | ユーザーグループを識別できる名前 |
| memberIds | Array | Y | プロジェクトメンバーの識別子リスト |
| selectAllYN | Boolean | N | プロジェクトメンバー全体を含むかどうか<br/>- デフォルト値: `false` |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| userGroupId | UUID | ユーザーグループの識別子 |

---

### ユーザーグループを削除する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### ユーザーグループの詳細を表示

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| userGroupId | UUID | ユーザーグループの識別子 |
| userGroupName | String | ユーザーグループを識別できる名前 |
| userGroupTypeCode | Enum | ユーザーグループの種類<br/>- `ENTIRE`:プロジェクトメンバー全体を含むユーザーグループ<br/>- `INDIVIDUAL_MEMBER`:特定のプロジェクトメンバーを含むユーザーグループ |
| members | Array | プロジェクトメンバーリスト |
| members.memberId | UUID | プロジェクトメンバーの識別子 |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### ユーザーグループを修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"userGroupId": "550e8400-e29b-41d4-a716-446655440000",
"userGroupName": "userGroupName-example",
"memberIds": [],
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| userGroupName | String | Y | ユーザーグループを識別できる名前 |
| memberIds | Array | N | プロジェクトメンバーの識別子リスト |
| selectAllYN | Boolean | N | プロジェクトメンバー全体を含むかどうか<br/>- デフォルト値: `false` |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

## 通知グループ

### 通知グループリストを表示

#### リクエスト

```http
---
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationGroups | Array | 通知グループリスト |
| notificationGroups.notificationGroupId | UUID | 通知グループの識別子 |
| notificationGroups.notificationGroupName | String | 通知グループを識別できる名前 |
| notificationGroups.notifyEmail | Boolean | メール通知 |
| notificationGroups.notifySms | Boolean | SMS通知 |
| notificationGroups.isEnabled | Boolean | 有効かどうか |
| notificationGroups.createdYmdt | DateTime | 作成日時 |
| notificationGroups.updatedYmdt | DateTime | 修正日時 |

---

### 通知グループを作成する

#### リクエスト

```http
---
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| notificationGroupName | String | Y | 通知グループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| notifyEmail | Boolean | N | メール通知<br/>- デフォルト値: `true` |
| notifySms | Boolean | N | SMS通知<br/>- デフォルト値: `true` |
| isEnabled | Boolean | N | 有効かどうか<br/>- デフォルト値: `true` |
| dbInstanceIds | Array | Y | 監視対象DBインスタンスの識別子リスト |
| userGroupIds | Array | Y | ユーザーグループの識別子リスト |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationGroupId | UUID | 通知グループの識別子 |

---

### 通知グループを削除する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 通知グループの詳細を表示

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationGroupId | UUID | 通知グループの識別子 |
| notificationGroupName | String | 通知グループを識別できる名前 |
| notifyEmail | Boolean | メール通知 |
| notifySms | Boolean | SMS通知 |
| isEnabled | Boolean | 有効かどうか |
| dbInstances | Array | 監視対象DBインスタンスリスト |
| dbInstances.dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceName | String | DBインスタンスを識別できる名前 |
| userGroups | Array | ユーザーグループリスト |
| userGroups.userGroupId | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | String | ユーザーグループを識別できる名前 |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### 通知グループを修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| notificationGroupName | String | N | 通知グループを識別できる名前 |
| notifyEmail | Boolean | N | メール通知<br/>- デフォルト値: `false` |
| notifySms | Boolean | N | SMS通知<br/>- デフォルト値: `false` |
| isEnabled | Boolean | N | 有効かどうか<br/>- デフォルト値: `false` |
| dbInstanceIds | Array | N | 監視対象DBインスタンスの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

## モニタリング

### 統計情報の照会

#### リクエスト

```http
---
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### Metricリストを表示

#### リクエスト

```http
---
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| metrics | Array | Metricリスト |
| metrics.measureName | String | 照会指標タイプ |
| metrics.unit | String | 測定値単位 |

---

## イベント

### イベントカテゴリー

---

| イベントカテゴリー | 説明 |
|-------------|---------|
| ALL | 全体 |
| BACKUP | バックアップ |
| DB_INSTANCE | DBインスタンス |
| JOB | 作業 |
| TENANT | テナント |
| MONITORING | モニタリング |

### 購読可能なイベントコード一覧表示

#### リクエスト

```http
イベントはカテゴリに分類することができ、下記の通りです。
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| eventCodes | Array | イベントコードリスト |
| eventCodes.eventCode | Enum | イベントコード |
| eventCodes.eventCategoryType | Enum | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |

---

### イベントリスト照会

#### リクエスト

```http
---
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | 全イベントリストの数 |
| events | Array | イベントリスト |
| events.eventCategoryType | Enum | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| events.eventCode | Enum | 発生したイベントのタイプ |
| events.sourceId | UUID | イベントソースの識別子 |
| events.sourceName | String | イベントソースを識別できる名前 |
| events.messages | Array | イベントメッセージリスト |
| events.messages.langCode | Enum | 言語コード<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | String | イベントメッセージ |
| events.eventYmdt | DateTime | イベント発生日時 |

---

## イベント購読

### イベント購読リスト照会

#### リクエスト

```http
---
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | 全イベント購読リストの数 |
| eventSubscriptions | Array | イベント購読リスト |
| eventSubscriptions.eventSubscriptionId | UUID | イベント購読の識別子 |
| eventSubscriptions.eventCategoryType | Enum | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.eventSubscriptionName | String | イベント購読を識別できる名前 |
| eventSubscriptions.enabled | Boolean | 有効かどうか |
| eventSubscriptions.notifyEmail | Boolean | メール送信するかどうか |
| eventSubscriptions.notifySms | Boolean | SMS送信するかどうか |
| eventSubscriptions.eventCodes | Array | 購読するイベントコードリスト |
| eventSubscriptions.sources | Array | 購読するイベントソースリスト |
| eventSubscriptions.sources.sourceId | UUID | イベントソースの識別子 |
| eventSubscriptions.sources.eventCategoryType | Enum | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.userGroupIds | Array | イベントを購読しているユーザーグループの識別子リスト |
| eventSubscriptions.createdYmdt | DateTime | 作成日時 |

---

### イベント購読を作成する

#### リクエスト

```http
---
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| eventCategoryType | Enum | Y | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | String | Y | イベント購読を識別できる名前 |
| enabled | Boolean | Y | 有効かどうか |
| notifyEmail | Boolean | Y | メール送信するかどうか |
| notifySms | Boolean | Y | SMS送信するかどうか |
| eventCodes | Array | Y | 購読するイベントコードリスト |
| sources | Array | Y | 購読するイベントソースリスト |
| sources.sourceId | UUID | Y | イベントソースの識別子 |
| sources.eventCategoryType | Enum | Y | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Array | Y | イベントを購読するユーザーグループの識別子リスト |

#### レスポンス

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| eventSubscriptionId | UUID | イベント購読の識別子 |

---

### イベント購読を削除する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | Y |  |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### イベント購読を修正する

#### リクエスト

```http
---
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | Y |  |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| eventCategoryType | Enum | N | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | String | N | イベント購読を識別できる名前 |
| enabled | Boolean | N | 有効かどうか |
| notifyEmail | Boolean | N | メール送信するかどうか |
| notifySms | Boolean | N | SMS送信するかどうか |
| eventCodes | Array | N | 購読するイベントコードリスト |
| sources | Array | N | 購読するイベントソースリスト |
| sources.sourceId | UUID | Y | イベントソースの識別子 |
| sources.eventCategoryType | Enum | Y | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Array | N | イベントを購読するユーザーグループの識別子リスト |

#### レスポンス

このAPIはレスポンス本文を返しません。

---
