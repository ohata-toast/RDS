## RDS for MySQL API ガイド

**Database > RDS for MySQL > API v4.0 ガイド**

## RDS for MySQL API共通情報

### APIエンドポイント

| リージョン | エンドポイント |
|------|----------|
| 韓国(テグ)リージョン | https://ngovc-kr4-rds-proxy.cloud.toastoven.net |


### 認証および権限

RDS for MySQLは、API呼び出し時の認証/認可のためにUser Access Keyトークンを使用します。User Access Keyトークンは、User Access Keyに基づいて発行されるBearerタイプの一時的なアクセストークンです。User Access Keyトークンの発行及び使用に関する詳細は、[User Access Keyトークン](/nhncloud/ja/public-api/user-access-key-token)を参照してください。
発行されたトークンはAppkeyと一緒にリクエストHeaderに含める必要があります。

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| X-TC-APP-KEY | Header | String | Y | RDS for MySQLサービスのAppkeyまたはプロジェクト統合Appkey |
| X-NHN-AUTHORIZATION | Header | String | Y | Public APIで発行されたBearerタイプトークン |

また、プロジェクトメンバーのロールによって呼び出すことができるAPIが制限されます。 `RDS for MySQL ADMIN`, `RDS for MySQL VIEWER`で区分して権限を付与できます。

* `RDS for MySQL ADMIN`権限は全ての機能を使用可能です。
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Project.Get | プロジェクトメンバーリストを表示 |

#### リクエスト

```http
GET /v4.0/project/members
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Project.Get | リージョンリストを表示 |

#### リクエスト

```http
GET /v4.0/project/regions
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
"regionCode": "KR4",
"isEnabled": false
}
]
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| regions | Array | リージョンリスト |
| regions.regionCode | Enum | リージョンコード<br/>- KR4: `韓国(テグ)` |
| regions.isEnabled | Boolean | リージョンが有効かどうか |

---

## DBインスタンスの仕様

### DBインスタンス仕様リストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbFlavor.List | DBインスタンス仕様リスト表示 |

#### リクエスト

```http
GET /v4.0/db-flavors
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Network.List | サブネットリスト表示 |

#### リクエスト

```http
GET /v4.0/network/subnets
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
| subnets.subnetName | String | サブネットを識別できる名前 |
| subnets.subnetCidr | String | サブネットのCIDR |
| subnets.usingGateway | Boolean | ゲートウェイを使用するかどうか |
| subnets.availableIpCount | Number | 使用可能なIP数 |

---

## DBエンジン

### DBエンジンリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbVersion.List | DBエンジンリスト表示 |

#### リクエスト

```http
GET /v4.0/db-versions
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
| dbVersions.dbVersionName | String | DBエンジン名 |
| dbVersions.restorableFromObs | Boolean | オブジェクトストレージから復元可能かどうか |

---

## データストレージ

### データストレージタイプリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Storage.List | データストレージタイプリスト表示 |

#### リクエスト

```http
GET /v4.0/storage-types
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
| storageTypes | Array | データストレージタイプリスト |

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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Job.Get | 作業情報詳細表示 |

#### リクエスト

```http
GET /v4.0/jobs/{jobId}
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
| jobId | UUID | リクエストした作業の識別子 |
| jobStatus | Enum | 作業の現在状態<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Array | 関連リソースリスト |
| resourceRelations.resourceType | String | 関連リソースタイプ |
| resourceRelations.resourceId | String | 関連リソースの識別子 |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

## DBインスタンスグループ

### DBインスタンスグループリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceGroup.List | DBインスタンスグループリスト表示 |

#### リクエスト

```http
GET /v4.0/db-instance-groups
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
| dbInstanceGroups.replicationType | Enum | DBインスタンスグループの複製形態<br/>- STANDALONE: `高可用性を使用しない`<br/>- HIGH_AVAILABILITY: `高可用性を使用` |
| dbInstanceGroups.createdYmdt | DateTime | 作成日時 |
| dbInstanceGroups.updatedYmdt | DateTime | 修正日時 |

---

### DBインスタンスグループの詳細を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceGroup.Get | DBインスタンスグループ詳細表示 |

#### リクエスト

```http
GET /v4.0/db-instance-groups/{dbInstanceGroupId}
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
| replicationType | Enum | DBインスタンスグループの複製形態<br/>- STANDALONE: `高可用性を使用しない`<br/>- HIGH_AVAILABILITY: `高可用性を使用` |
| dbInstances | Array | DBインスタンスグループに属するDBインスタンスリスト |
| dbInstances.dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstances.dbInstanceType | Enum | DBインスタンスの役割タイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstances.dbInstanceStatus | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(グリーン)`<br/>- STORAGE_FULL: `容量不足(レッド)`<br/>- FAIL_TO_CREATE: `作成失敗(レッド)`<br/>- FAIL_TO_CONNECT: `接続失敗(レッド)`<br/>- REPLICATION_STOP: `複製中断(レッド)`<br/>- REPLICATION_DELAY: `複製遅延(イエロー)`<br/>- FAILOVER: `フェイルオーバー完了(レッド)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
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
| `FAIL_TO_CREATE` | DBインスタンス作成に失敗した場合 |
| `FAIL_TO_CONNECT` | DBインスタンス接続に失敗した場合 |
| `REPLICATION_STOP` | DBインスタンスの複製が中断した場合 |
| `FAILOVER` | DBインスタンスが高可用性フェイルオーバーした場合 |
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.List | DBインスタンスリスト表示 |

#### リクエスト

```http
GET /v4.0/db-instances
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
| dbInstances.dbInstanceStatus | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(グリーン)`<br/>- STORAGE_FULL: `容量不足(レッド)`<br/>- FAIL_TO_CREATE: `作成失敗(レッド)`<br/>- FAIL_TO_CONNECT: `接続失敗(レッド)`<br/>- REPLICATION_STOP: `複製中断(レッド)`<br/>- REPLICATION_DELAY: `複製遅延(イエロー)`<br/>- FAILOVER: `フェイルオーバー完了(レッド)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| dbInstances.progressStatus | Enum | DBインスタンスの現在作業進行状態<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbInstances.createdYmdt | DateTime | 作成日時 |
| dbInstances.updatedYmdt | DateTime | 修正日時 |

---

### DBインスタンスを作成する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Create | DBインスタンスの作成 |

#### リクエスト

```http
POST /v4.0/db-instances
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できる名前<br/>- 最小の長さ: `1`<br/>- 最大の長さ: `100` |
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
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- デフォルト値: `3`<br/>- 最小値: `1`<br/>- 最大値: `600` |
| useDefaultNotification | Boolean | N | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |
| useSlowQueryAnalysis | Boolean | N | Slow query分析を行うかどうか<br/>- デフォルト値: `true` |
| authenticationPlugin | Enum | N | 認証プラグイン<br/>- NATIVE: `mysql_native_password認証`<br/>- CACHING_SHA2: `caching_sha2_password認証(MySQL専用)`<br/>- SHA256: `sha256_password認証(MySQL専用)` |
| tlsOption | Enum | N | TLS Option<br/>- デフォルト値: `NONE`<br/>- NONE: `TLS未使用`<br/>- SSL: `SSL認証`<br/>- X509: `X509証明書認証` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | Y | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | データストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| storage.storageAutoscale | Object | N | データストレージ自動拡張オブジェクト |
| storage.storageAutoscale.useStorageAutoscale | Boolean | N | ストレージ自動拡張を行うかどうか<br/>- デフォルト値: `false` |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR4: `韓国(テグ)` |
| backup.useBackupLock | Boolean | N | テーブルロックを使用するかどうか<br/>- デフォルト値: `true` |
| backup.backupSchedules | Array | Y | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### 高可用性使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceCandidateName | String | Y | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |

#### ストレージ自動拡張使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Number | Y | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storage.storageAutoscale.maxStorageSize | Number | Y | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storage.storageAutoscale.cooldownTime | Number | Y | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### オブジェクトストレージを利用したDBインスタンスの復元

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.RestoreFromObs | DBインスタンスオブジェクトストレージから復元 |

#### リクエスト

```http
POST /v4.0/db-instances/restore-from-obs
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | UUID | Y | DBインスタンス仕様の識別子 |
| dbPort | Number | Y | DBポート |
| dbVersion | String | Y | DBエンジンタイプ |
| useHighAvailability | Boolean | N | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| storage | Object | Y | ストレージ情報オブジェクト |
| storage.storageType | Enum | Y | ストレージタイプ |
| storage.storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最小値: `20` |
| storage.storageAutoscale | Object | N | データストレージ自動拡張オブジェクト |
| storage.storageAutoscale.useStorageAutoscale | Boolean | N | ストレージ自動拡張を行うかどうか<br/>- デフォルト値: `false` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.subnetId | UUID | Y | サブネットの識別子 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | Y | DBインスタンスを作成するアベイラビリティゾーン |
| backup | Object | Y | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | Y | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR4: `韓国(テグ)` |
| backup.useBackupLock | Boolean | N | テーブルロックを使用するかどうか<br/>- デフォルト値: `true` |
| backup.backupSchedules | Array | Y | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| restore | Object | Y | 復元情報オブジェクト |
| restore.tenantId | String | Y | バックアップが保存されたオブジェクトストレージのテナントID |
| restore.username | String | Y | NHN Cloud会員またはIAMメンバーID |
| restore.password | String | Y | バックアップが保存されたオブジェクトストレージのAPIパスワード |
| restore.targetContainer | String | Y | バックアップが保存されたオブジェクトストレージのコンテナ |
| restore.objectPath | String | Y | コンテナに保存されたバックアップのパス |
| useDefaultNotification | Boolean | N | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| useSlowQueryAnalysis | Boolean | N | Slow query分析を行うかどうか<br/>- デフォルト値: `true` |
| parameterGroupId | UUID | Y | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |

#### 高可用性使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceCandidateName | String | Y | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |

#### ストレージ自動拡張使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Number | Y | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storage.storageAutoscale.maxStorageSize | Number | Y | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storage.storageAutoscale.cooldownTime | Number | Y | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを削除する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Delete | DBインスタンスの削除 |

#### リクエスト

```http
DELETE /v4.0/db-instances/{dbInstanceId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"deleteAutoBackup": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| deleteAutoBackup | Boolean | N | 自動バックアップの削除有無<br/>- デフォルト値: `false` |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスの詳細を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | DBインスタンス詳細表示 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbInstanceId | UUID | DBインスタンスの識別子 |
| dbInstanceGroupId | UUID | DBインスタンスグループの識別子 |
| dbInstanceName | String | DBインスタンスを識別できる名前 |
| description | String | DBインスタンスの追加情報 |
| dbVersion | String | DBエンジンタイプ |
| dbPort | Number | DBポート |
| dbInstanceType | Enum | DBインスタンスの役割タイプ<br/>- MASTER: `マスター`<br/>- FAILED_MASTER: `障害マスター`<br/>- CANDIDATE_MASTER: `予備マスター`<br/>- READ_ONLY_SLAVE: `リードレプリカ` |
| dbInstanceStatus | Enum | DBインスタンスの現在状態<br/>- BEFORE_CREATE: `作成前(グレー)`<br/>- AVAILABLE: `使用可能(グリーン)`<br/>- STORAGE_FULL: `容量不足(レッド)`<br/>- FAIL_TO_CREATE: `作成失敗(レッド)`<br/>- FAIL_TO_CONNECT: `接続失敗(レッド)`<br/>- REPLICATION_STOP: `複製中断(レッド)`<br/>- REPLICATION_DELAY: `複製遅延(イエロー)`<br/>- FAILOVER: `フェイルオーバー完了(レッド)`<br/>- SHUTDOWN: `停止済み(グレー)`<br/>- DELETED: `削除済み(グレー)` |
| progressStatus | Enum | DBインスタンスの現在作業進行状態<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbFlavorId | UUID | DBインスタンス仕様の識別子 |
| parameterGroupId | UUID | DBインスタンスに適用されたパラメータグループの識別子 |
| dbSecurityGroupIds | Array | DBインスタンスに適用されたDBセキュリティグループの識別子リスト |
| notificationGroupIds | Array | DBインスタンスに適用された通知グループの識別子リスト |
| useDeletionProtection | Boolean | DBインスタンス削除保護の有無 |
| useSlowQueryAnalysis | Boolean | Slow query分析を行うかどうか |
| supportAuthenticationPlugin | Boolean | 認証プラグインサポートの有無 |
| needToApplyParameterGroup | Boolean | 最新パラメータグループの適用が必要かどうか |
| needMigration | Boolean | マイグレーションが必要かどうか |
| supportDbVersionUpgrade | Boolean | DBのバージョンアップグレードをサポートするかどうか |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### DBインスタンスを修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | DBインスタンスを修正する |

#### リクエスト

```http
PUT /v4.0/db-instances/{dbInstanceId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DBインスタンスを識別できる名前<br/>- 最小の長さ: `1`<br/>- 最大の長さ: `100` |
| dbInstanceCandidateName | String | N | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbPort | Number | N | DBポート<br/>- 最小値: 3306、最大値: 43306 |
| dbFlavorId | UUID | N | DBインスタンス仕様の識別子 |
| parameterGroupId | UUID | N | パラメータグループの識別子 |
| dbVersion | String | N | DBエンジンバージョンコード |
| useSlowQueryAnalysis | Boolean | N | Slow query分析を行うかどうか |
| useDummy | Boolean | N | 単一DBインスタンスのDBバージョンアップグレード時にダミーを使用するかどうか<br/>- デフォルト値: `false` |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| executeBackup | Boolean | N | 現時点でバックアップを行うかどうか<br/>- デフォルト値: `false` |
| useOnlineFailover | Boolean | N | フェイルオーバーを利用した再起動を行うかどうか<br/>- デフォルト値: `false` |
| waitReplicationDelay | Boolean | N | レプリケーション遅延解消待機を行うかどうか<br/>- デフォルト値: `false` |
| useReadOnly | Boolean | N | 書き込み負荷のブロック<br/>- デフォルト値: `false` |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### バックアップ情報を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | バックアップ情報を表示 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/backup-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| backupPeriod | Number | バックアップ保管期間(日) |
| ftwrlWaitTimeout | Number | クエリ遅延待機時間(秒) |
| backupRetryCount | Number | バックアップ再試行回数 |
| replicationRegion | Enum | バックアップ複製リージョン<br/>- KR4: `韓国(テグ)` |
| useBackupLock | Boolean | テーブルロックを使用するかどうか |
| backupSchedules | Array | 予定された自動バックアップリスト |
| backupSchedules.backupWndBgnTime | Time | バックアップ開始時刻 |
| backupSchedules.backupWndDuration | Enum | バックアップDuration<br/>- HALF_AN_HOUR<br/>- ONE_HOUR<br/>- ONE_HOUR_AND_HALF<br/>- TWO_HOURS<br/>- TWO_HOURS_AND_HALF<br/>- THREE_HOURS |

---

### バックアップ情報を修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | バックアップ情報を修正する |

#### リクエスト

```http
PUT /v4.0/db-instances/{dbInstanceId}/backup-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| backupPeriod | Number | N | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR4: `韓国(テグ)` |
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
| jobId | UUID | リクエストした作業の識別子 |

---

### バイナリログ一覧照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceBinLog.List | バイナリログ一覧照会 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/binlogs
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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| binLogs | Array | BinLogファイル一覧 |
| binLogs.binLogFileName | String | BinLogファイル名 |
| binLogs.binLogFileSize | Number | BinLogファイルサイズ(Byte) |
| binLogs.createdYmdt | DateTime | 作成日時 |

---

### バイナリログ削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceBinLog.Purge | バイナリログ削除 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/binlogs/purge
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
"lastBinLogFileName": "mysql-bin.000010"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| lastBinLogFileName | String | Y | 削除する最後のBinLogファイル名(該当ファイルの直前まで削除されます) |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 証明書ファイル一覧照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceCertificate.List | 証明書ファイル一覧照会 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/certificates
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| certificates | Array | 証明書ファイル一覧 |
| certificates.fileName | String | 証明書ファイル名 |
| certificates.certificateType | Enum | 証明書タイプ<br/>- CA_FILE<br/>- CERT_FILE<br/>- KEY_FILE |
| certificates.fileSize | Number | 証明書ファイルサイズ(Byte) |
| certificates.createdYmdt | DateTime | 作成日時 |

---

### 証明書ファイルエクスポート

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceCertificate.Export | 証明書ファイルエクスポート |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/certificates/upload
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| certificateTypes | Array | Y | アップロードする証明書タイプ一覧 |
| tenantId | String | Y | 証明書ファイルが保存されるObject StorageのテナントID<br/>- 最小長さ: `32`<br/>- 最大長さ: `32` |
| username | String | Y | NHN CloudアカウントまたはIAMメンバーID |
| password | String | Y | 証明書ファイルが保存されるObject StorageのAPIパスワード |
| targetContainer | String | Y | 証明書ファイルが保存されるObject Storageのコンテナ |
| objectPath | String | Y | コンテナに保存される証明書ファイルのパス |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBスキーマリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceSchema.List | DBスキーマリストを表示 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/db-schemas
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceSchema.Create | DBスキーマを作成する |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/db-schemas
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| dbSchemaName | String | Y | DBスキーマ名<br/>- 最大長さ: `64`<br/>- 英字で始まり、英字/数字/_のみ使用可、1〜64文字、MySQLの予約語は不可 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBスキーマを削除する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceSchema.Delete | DBスキーマを削除する |

#### リクエスト

```http
DELETE /v4.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| dbSchemaId | URL | UUID | Y | DBスキーマの識別子 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBユーザーリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceUser.List | DBユーザーリストを表示 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/db-users
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| dbUsers.authorityType | Enum | DBユーザー権限タイプ<br/>- CUSTOM: `ユーザー定義権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限`<br/>- ALL: `全権限` |
| dbUsers.dbUserStatus | Enum | DBユーザーの現在状態<br/>- STABLE<br/>- CREATING<br/>- UPDATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbUsers.createdYmdt | DateTime | 作成日時 |
| dbUsers.updatedYmdt | DateTime | 修正日時 |
| dbUsers.authenticationPlugin | Enum | 認証プラグイン<br/>- NATIVE: `mysql_native_password認証`<br/>- CACHING_SHA2: `caching_sha2_password認証(MySQL専用)`<br/>- SHA256: `sha256_password認証(MySQL専用)` |
| dbUsers.tlsOption | Enum | 証明書オプション<br/>- NONE: `TLS未使用`<br/>- SSL: `SSL認証`<br/>- X509: `X509証明書認証` |

---

### DBユーザーを作成する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceUser.Create | DBユーザーを作成する |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/db-users
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| authorityType | Enum | Y | DBユーザー権限タイプ<br/>- CUSTOM: `ユーザー定義権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限`<br/>- ALL: `全権限` |
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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBユーザーを削除する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceUser.Delete | DBユーザーを削除する |

#### リクエスト

```http
DELETE /v4.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| dbUserId | URL | UUID | Y | DBユーザーの識別子 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBユーザーを修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceUser.Modify | DBユーザーを修正する |

#### リクエスト

```http
PUT /v4.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| dbUserId | URL | UUID | Y | DBユーザーの識別子 |

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
| authorityType | Enum | N | DBユーザー権限タイプ<br/>- CUSTOM: `ユーザー定義権限`<br/>- READ: `読み取り権限`<br/>- CRUD: `CRUD権限`<br/>- DDL: `DDL権限`<br/>- ALL: `全権限` |
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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンス削除保護設定を変更する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | DBインスタンス削除保護設定を変更する |

#### リクエスト

```http
PUT /v4.0/db-instances/{dbInstanceId}/deletion-protection
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.ForceRestart | DBインスタンスを強制再起動する |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/force-restart
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### 高可用性情報の照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | 高可用性情報の照会 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/high-availability
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
"useHighAvailability": false,
"haStatus": "CREATED",
"pingInterval": 1,
"pingType": "pingType-example"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| useHighAvailability | Boolean | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| haStatus | Enum | 高可用性の状態<br/>- CREATED: `作成済み`<br/>- STABLE: `正常`<br/>- PAUSING: `一時停止中`<br/>- DISABLE: `停止`<br/>- DISABLE_MASTER_IN_REPLICATION: `マスターの異常なレプリケーション検知による高可用性(HA)の中断`<br/>- DISABLE_MHA_PROCESS: `高可用性(HA)プロセスの中断`<br/>- DISABLE_REPLICATION_STOP: `レプリケーション中断による高可用性(HA)の中断`<br/>- DISABLE_REPLICATION_DELAY: `レプリケーション遅延による高可用性(HA)の中断`<br/>- FAILOVER_STARTED: `フェイルオーバー開始`<br/>- FAILOVER_FAILED: `フェイルオーバー失敗`<br/>- FAILOVER_COMPLETED: `フェイルオーバー完了`<br/>- DELETED: `削除済み`<br/>- PAUSED: `一時停止`<br/>- PAUSED_DUE_TO_TASK: `タスクによる一時停止`<br/>- MASTER_FAILURE_DETECTION: `マスター障害検知` |
| pingInterval | Number | Ping間隔(秒) |
| pingType | String | Pingタイプ |

---

### 高可用性を修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:HighAvailability.Modify | 高可用性の修正 |

#### リクエスト

```http
PUT /v4.0/db-instances/{dbInstanceId}/high-availability
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"useHighAvailability": false,
"pingInterval": 1
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| useHighAvailability | Boolean | Y | 高可用性を使用するかどうか |
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |

#### 高可用性使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceCandidateName | String | Y | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### 高可用性を一時停止する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:HighAvailability.Pause | 高可用性の一時停止 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### 高可用性を復旧する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:HighAvailability.Repair | 高可用性の復旧 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### 高可用性を再開する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:HighAvailability.Resume | 高可用性の再開 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### 高可用性を分離する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:HighAvailability.Split | 高可用性の分離 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/split
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### ログファイルリスト表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceLog.List | ログファイルリスト表示 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/log-files
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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| logFiles | Array | ログファイルリスト |
| logFiles.logFileName | String | ログファイル名 |
| logFiles.logFileType | Enum | ログファイルタイプ種類<br/>- ERROR<br/>- BINLOG<br/>- GENERAL<br/>- SLOW_QUERY<br/>- AUDIT<br/>- BACKUP |
| logFiles.logFileSize | Number | ログファイルサイズ(Byte) |
| logFiles.createdYmdt | DateTime | 作成日時 |

---

### ログファイルのエクスポート

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceLog.Export | ログファイルのエクスポート |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/log-files/export
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
"logFileNames": [],
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
| jobId | UUID | リクエストした作業の識別子 |

---

### ログファイルの内容照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstanceLog.Get | ログファイルの内容照会 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/log-files/{logFileName}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| logFileName | URL | UUID | Y | ログファイル名 |

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
"content": "content-example"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| content | String | ログファイルの内容(最大65533 bytes) |

---

### DBインスタンスメンテナンスリストを表示する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.List | DBインスタンスメンテナンスリストを表示する |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/maintenances
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| type | Query | String | N |  |
| statuses | Query | String | N |  |
| category | Query | String | N |  |

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | メンテナンスリストの件数 |
| maintenances | Array | メンテナンスリスト |
| maintenances.maintenanceId | UUID | メンテナンスID |
| maintenances.dbInstanceId | UUID | DBインスタンスID |
| maintenances.category | Enum | メンテナンスカテゴリ<br/>- USER: `ユーザーメンテナンスカテゴリ`<br/>- PROVIDER: `Providerメンテナンスカテゴリ`<br/>- AUTO: `自動メンテナンスカテゴリ` |
| maintenances.description | String | メンテナンスの説明 |
| maintenances.type | Enum | メンテナンスタイプ<br/>- UPDATE_DB_INSTANCE: `DBインスタンスの修正(スペック変更、ポート変更、パラメータグループ変更)`<br/>- UPGRADE_ENGINE_VERSION: `エンジンバージョンアップグレード`<br/>- APPLY_CHANGE_PARAMETER: `パラメータグループのパラメータ変更`<br/>- UPGRADE_OS: `OSバージョンアップグレード`<br/>- PATCH_SECURITY: `セキュリティアップデート`<br/>- MIGRATION: `ハイパーバイザーメンテナンスのためのマイグレーション`<br/>- CLEANUP_STORAGE: `ストレージの整理` |
| maintenances.payload | Object | メンテナンスタイプに応じたPayload |
| maintenances.required | Boolean | メンテナンスが必須かどうか |
| maintenances.deadlineYmdt | DateTime | メンテナンスの強制適用日時 |
| maintenances.status | Enum | メンテナンスのステータス<br/>- PENDING: `待機`<br/>- READY: `準備`<br/>- RUNNING: `実行中`<br/>- COMPLETED: `完了`<br/>- FAILED: `失敗`<br/>- EXCLUDED: `除外`<br/>- DELETED: `削除`<br/>- SUSPENDED: `保留`<br/>- UNKNOWN |
| maintenances.executionType | Enum | メンテナンスの実行タイプ<br/>- SCHEDULED: `予約実行(メンテナンス期間中の自動実行)`<br/>- MANUAL: `手動実行(即時実行)`<br/>- FORCED: `強制実行(デッドライン超過後の自動実行)` |
| maintenances.addedYmdt | DateTime | メンテナンススケジュール登録日時 |
| maintenances.executionStartedYmdt | DateTime | メンテナンス開始日時 |
| maintenances.executionCompletedYmdt | DateTime | メンテナンス終了日時 |

---

### DBインスタンスメンテナンスを即時実行する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.Execute | DBインスタンスメンテナンスを即時実行する |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/maintenances/execute-now
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| configId | String | Y | 設定ID |
| category | Enum | Y | メンテナンスカテゴリ<br/>- USER: `ユーザーメンテナンスカテゴリ`<br/>- PROVIDER: `Providerメンテナンスカテゴリ`<br/>- AUTO: `自動メンテナンスカテゴリ` |
| description | String | N | メンテナンスの説明 |
| type | Enum | Y | メンテナンスタイプ<br/>- UPDATE_DB_INSTANCE: `DBインスタンスの修正(スペック変更、ポート変更、パラメータグループ変更)`<br/>- UPGRADE_ENGINE_VERSION: `エンジンバージョンアップグレード`<br/>- APPLY_CHANGE_PARAMETER: `パラメータグループのパラメータ変更`<br/>- UPGRADE_OS: `OSバージョンアップグレード`<br/>- PATCH_SECURITY: `セキュリティアップデート`<br/>- MIGRATION: `ハイパーバイザーメンテナンスのためのマイグレーション`<br/>- CLEANUP_STORAGE: `ストレージの整理` |
| payload | String | Y | メンテナンスタイプに応じたPayload |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスメンテナンスを予約する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.Update | DBインスタンスメンテナンスを予約する |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/maintenances/schedule
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| configId | String | Y | 設定ID |
| category | Enum | Y | メンテナンスカテゴリ<br/>- USER: `ユーザーメンテナンスカテゴリ`<br/>- PROVIDER: `Providerメンテナンスカテゴリ`<br/>- AUTO: `自動メンテナンスカテゴリ` |
| description | String | N | メンテナンスの説明 |
| type | Enum | Y | メンテナンスタイプ<br/>- UPDATE_DB_INSTANCE: `DBインスタンスの修正(スペック変更、ポート変更、パラメータグループ変更)`<br/>- UPGRADE_ENGINE_VERSION: `エンジンバージョンアップグレード`<br/>- APPLY_CHANGE_PARAMETER: `パラメータグループのパラメータ変更`<br/>- UPGRADE_OS: `OSバージョンアップグレード`<br/>- PATCH_SECURITY: `セキュリティアップデート`<br/>- MIGRATION: `ハイパーバイザーメンテナンスのためのマイグレーション`<br/>- CLEANUP_STORAGE: `ストレージの整理` |
| payload | String | Y | メンテナンスタイプに応じたPayload |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### DBインスタンスメンテナンスを削除する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Maintenance.Delete | DBインスタンスメンテナンスを削除する |

#### リクエスト

```http
DELETE /v4.0/db-instances/{dbInstanceId}/maintenances/{maintenanceId}
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |
| maintenanceId | URL | UUID | Y | メンテナンスID |

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### ネットワーク情報表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | ネットワーク情報表示 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/network-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| availabilityZone | String | DBインスタンスを作成するアベイラビリティゾーン |
| subnet | Object | サブネットオブジェクト |
| subnet.subnetId | UUID | サブネットの識別子 |
| subnet.subnetName | String | サブネットを識別できる名前 |
| subnet.subnetCidr | String | サブネットのCIDR |
| endPoints | Array | 接続情報リスト |
| endPoints.domain | String | ドメイン |
| endPoints.ipAddress | String | IPアドレス |
| endPoints.endPointType | String | 接続情報タイプ |

---

### ネットワーク情報を修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | ネットワーク情報を修正する |

#### リクエスト

```http
PUT /v4.0/db-instances/{dbInstanceId}/network-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"usePublicAccess": false
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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを昇格する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Promote | DBインスタンスの昇格 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/promote
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスの再構築

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Rebuild | DBインスタンスの再構築 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/rebuild
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを複製する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Replicate | DBインスタンスの複製 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/replicate
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できる名前<br/>- 最小の長さ: `1`<br/>- 最大の長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | UUID | N | DBインスタンス仕様の識別子 |
| dbPort | Number | N | DBポート<br/>- 最小値: 3306、最大値: 43306 |
| parameterGroupId | UUID | N | パラメータグループの識別子 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useDefaultNotification | Boolean | N | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |
| useSlowQueryAnalysis | Boolean | N | Slow query分析を行うかどうか<br/>- デフォルト値: `true` |
| network | Object | Y | ネットワーク情報オブジェクト |
| network.usePublicAccess | Boolean | N | 外部接続可否 |
| network.availabilityZone | Enum | Y | DBインスタンスを作成するアベイラビリティゾーン |
| storage | Object | N | ストレージ情報オブジェクト |
| storage.storageType | Enum | N | データストレージタイプ |
| storage.storageSize | Number | N | データストレージサイズ(GB)<br/>- 最小値: `20` |
| storage.storageAutoscale | Object | N | データストレージ自動拡張オブジェクト |
| storage.storageAutoscale.useStorageAutoscale | Boolean | N | ストレージ自動拡張を行うかどうか<br/>- デフォルト値: `false` |
| backup | Object | N | バックアップ情報オブジェクト |
| backup.backupPeriod | Number | N | バックアップ保管期間(日)<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR4: `韓国(テグ)` |
| backup.useBackupLock | Boolean | N | テーブルロックを使用するかどうか |
| backup.backupSchedules | Array | N | 予定された自動バックアップリスト |
| backup.backupSchedules.backupWndBgnTime | Time | N | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | N | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### ストレージ自動拡張使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Number | Y | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storage.storageAutoscale.maxStorageSize | Number | Y | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storage.storageAutoscale.cooldownTime | Number | Y | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを再起動する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Restart | DBインスタンスの再起動 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/restart
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| useOnlineFailover | Boolean | N | フェイルオーバーを利用した再起動を行うかどうか<br/>- デフォルト値: `false` |
| executeBackup | Boolean | N | 現時点でバックアップを行うかどうか<br/>- デフォルト値: `false` |
| waitReplicationDelay | Boolean | N | レプリケーション遅延解消待機を行うかどうか<br/>- デフォルト値: `false` |
| useReadOnly | Boolean | N | 書き込み負荷のブロック<br/>- デフォルト値: `false` |
| osRestart | Boolean | N | オペレーティングシステムを再起動するかどうか<br/>- デフォルト値: `false` |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DB インスタンス復元情報照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | DB インスタンス復元情報照会 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/restoration-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| oldestRestorableYmdt | DateTime | 最古の復元可能時間 |
| latestRestorableYmdt | DateTime | 最新の復元可能時間 |
| restorableBackups | Array | 復元可能なバックアップリスト |
| restorableBackups.backup | Object | バックアップ情報オブジェクト |
| restorableBackups.backup.backupId | UUID | バックアップの識別子 |
| restorableBackups.backup.backupName | String | バックアップ名 |
| restorableBackups.backup.backupStatus | Enum | バックアップ状態<br/>- BACKING_UP: `バックアップ中(スピナー)`<br/>- VERIFYING: `検証中(スピナー)`<br/>- COMPLETED: `使用可能(緑アイコン)`<br/>- DELETING: `削除中(スピナー)`<br/>- DELETED: `削除済み(グレーアイコン)`<br/>- ERROR: `エラー(赤アイコン)` |
| restorableBackups.backup.dbInstanceId | UUID | 原本DBインスタンスの識別子 |
| restorableBackups.backup.dbInstanceName | String | 原本DBインスタンスの名前 |
| restorableBackups.backup.dbVersion | String | DBエンジンタイプ |
| restorableBackups.backup.backupType | Enum | バックアップタイプ<br/>- AUTO<br/>- MANUAL |
| restorableBackups.backup.backupSize | Number | バックアップサイズ |
| restorableBackups.backup.useBackupLock | Boolean | テーブルロックを使用するかどうか |
| restorableBackups.backup.failoverCount | Number | フェイルオーバー回数 |
| restorableBackups.backup.binLogFileName | String | バイナリログファイル名 |
| restorableBackups.backup.binLogPosition | Object | バイナリログファイル位置 |
| restorableBackups.backup.createdYmdt | DateTime | バックアップ作成日時 |
| restorableBackups.backup.updatedYmdt | DateTime | バックアップ更新日時 |
| restorableBackups.restorableBinLogs | Array | 該当バックアップを利用して復元可能なバイナリログ名リスト |

---

### 復元される最後のクエリ照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | 復元される最後のクエリ照会 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/restoration-info/last-query
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
"executedYmdt": "2023-12-31T15:00:00+09:00",
"lastQuery": "lastQuery-example"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| executedYmdt | DateTime | クエリ実行日時 |
| lastQuery | String | 最後に実行したクエリ |

---

### DBインスタンスの復元

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Restore | DBインスタンスの復元 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/restore
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | UUID | N | DBインスタンス仕様の識別子。未入力時は原本インスタンスの仕様が適用されます。 |
| dbPort | Number | N | DBポート |
| useHighAvailability | Boolean | N | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- 最小値: `1`<br/>- 最大値: `600` |
| storage | Object | N | ストレージ情報オブジェクト。未入力時は原本インスタンスのストレージ設定が適用されます。 |
| storage.storageType | Enum | N | ストレージタイプ。未入力時は原本インスタンスのストレージタイプが適用されます。 |
| storage.storageSize | Number | N | データストレージサイズ(GB)。未入力時は原本インスタンスのストレージサイズが適用されます。<br/>- 最小値: `20` |
| storage.storageAutoscale | Object | N | データストレージ自動拡張オブジェクト |
| storage.storageAutoscale.useStorageAutoscale | Boolean | N | ストレージ自動拡張を行うかどうか<br/>- デフォルト値: `false` |
| network | Object | N | ネットワーク情報オブジェクト。未入力時は原本インスタンスのネットワーク設定が適用されます。 |
| network.subnetId | UUID | N | サブネットの識別子。未入力時は原本インスタンスの値を使用します。 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | N | DBインスタンスを作成するアベイラビリティゾーン。未入力時はランダムに選択されます。 |
| backup | Object | N | バックアップ情報オブジェクト。未入力時は原本インスタンスのバックアップ設定が適用されます。 |
| backup.backupPeriod | Number | N | バックアップ保管期間(日)。未入力時は原本インスタンスのバックアップ保管期間が適用されます。<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.backupRetryCount | Number | N | バックアップ再試行回数<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR4: `韓国(テグ)` |
| backup.useBackupLock | Boolean | N | テーブルロックを使用するかどうか<br/>- デフォルト値: `true` |
| backup.backupSchedules | Array | N | 予定された自動バックアップリスト。未入力時は原本インスタンスのバックアップスケジュールが適用されます。 |
| backup.backupSchedules.backupWndBgnTime | Time | N | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | N | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |
| restore | Object | Y | 復元情報オブジェクト |
| restore.restoreType | Enum | Y | 復元タイプの種類<br/>- TIMESTAMP: `復元可能な時間内の時間を利用した時点復元タイプ`<br/>- BINLOG: `復元可能なバイナリログ位置を利用した時点復元タイプ`<br/>- BACKUP: `既存に作成したバックアップを利用したスナップショット復元タイプ` |
| restore.binLog.binLogFileName | String | N | 復元に使用するバイナリログ名 |
| restore.binLog.binLogPosition | Object | N | 復元に使用するバイナリログ位置 |
| useDefaultNotification | Boolean | N | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| useSlowQueryAnalysis | Boolean | N | Slow query分析を行うかどうか<br/>- デフォルト値: `true` |
| parameterGroupId | UUID | N | パラメータグループの識別子。未入力時は原本インスタンスのパラメータグループが適用されます。 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト。未入力時は原本インスタンスのセキュリティグループが適用されます。 |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |

#### 高可用性使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceCandidateName | String | Y | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |

#### ストレージ自動拡張使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Number | Y | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storage.storageAutoscale.maxStorageSize | Number | Y | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storage.storageAutoscale.cooldownTime | Number | Y | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

#### Timestampを利用した時点復元時、リクエスト(restoreTypeが`TIMESTAMP`の場合)

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| restore.restoreYmdt | DateTime | N | DBインスタンス復元日時(YYYY-MM-DDThh:mm:ss.SSSTZD) |

復元情報照会で照会した最新の復元可能な時間以前に対してのみ復元が可能です。

#### バイナリログを利用した時点復元時、リクエスト(restoreTypeが`BINLOG`の場合)

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| restore.backupId | UUID | N | 復元に使用するバックアップの識別子 |
| restore.binLog | Object | N | バイナリログ情報オブジェクト |

バイナリログを利用した時点復元時、基準バックアップのバイナリログファイルおよび位置を基準に、その後に記録されたログに対して復元が可能です。

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを起動する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Start | DBインスタンスの起動 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/start
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBインスタンスを停止する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Stop | DBインスタンスの停止 |

#### リクエスト

```http
POST /v4.0/db-instances/{dbInstanceId}/stop
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### ストレージ情報を表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Get | ストレージ情報を表示 |

#### リクエスト

```http
GET /v4.0/db-instances/{dbInstanceId}/storage-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| storageType | String | データストレージタイプ |
| storageSize | Number | データストレージサイズ(GB) |
| storageStatus | Enum | データストレージの現在状態<br/>- DELETED: `削除済み`<br/>- PENDING_DELETION: `削除猶予中`<br/>- DELETION_RESERVED: `削除予約済み(スナップショット整理待ち)`<br/>- DETACHED: `取り外し済み`<br/>- ATTACHED: `割り当て済み` |
| storageAutoscale | Object | データストレージ自動拡張オブジェクト |
| storageAutoscale.useStorageAutoscale | Boolean | ストレージ自動拡張を行うかどうか |
| storageAutoscale.threshold | Number | 自動拡張条件(%) |
| storageAutoscale.maxStorageSize | Number | 自動拡張最大サイズ(GB) |
| storageAutoscale.cooldownTime | Number | 自動拡張クールダウン時間(分) |

---

### ストレージ情報を修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbInstance.Modify | ストレージ情報を修正する |

#### リクエスト

```http
PUT /v4.0/db-instances/{dbInstanceId}/storage-info
```

#### リクエストパラメータ

| 名前 | 区分 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y | DBインスタンスの識別子 |

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"storageSize": 1,
"storageAutoscale": {
"useStorageAutoscale": false
}
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| storageSize | Number | Y | データストレージサイズ(GB)<br/>- 最大値: `2048` |
| storageAutoscale | Object | N | データストレージ自動拡張オブジェクト |
| storageAutoscale.useStorageAutoscale | Boolean | N | ストレージ自動拡張を行うかどうか |

#### ストレージ自動拡張使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| storageAutoscale.threshold | Number | Y | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storageAutoscale.maxStorageSize | Number | Y | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storageAutoscale.cooldownTime | Number | Y | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

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
| jobId | UUID | リクエストした作業の識別子 |

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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.List | バックアップリスト照会 |

#### リクエスト

```http
GET /v4.0/backups
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

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | 全バックアップリスト数 |
| backups | Array | バックアップリスト |
| backups.backupId | UUID | バックアップの識別子 |
| backups.backupName | String | バックアップを識別できる名前 |
| backups.backupStatus | Enum | バックアップの現在状態<br/>- BACKING_UP: `バックアップ中 (スピナー)`<br/>- VERIFYING: `検証中 (スピナー)`<br/>- COMPLETED: `使用可能 (緑色アイコン)`<br/>- DELETING: `削除中 (スピナー)`<br/>- DELETED: `削除済み (グレーアイコン)`<br/>- ERROR: `エラー (赤色アイコン)` |
| backups.dbInstanceId | UUID | 原本DBインスタンスの識別子 |
| backups.dbVersion | String | DBエンジンタイプ |
| backups.utilVersion | String | ユーティリティバージョン |
| backups.backupType | Enum | バックアップタイプ<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Number | バックアップのサイズ(Byte) |
| backups.createdYmdt | DateTime | 作成日時 |
| backups.updatedYmdt | DateTime | 修正日時 |

---

### バックアップの作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.Create | バックアップの作成 |

#### リクエスト

```http
POST /v4.0/backups
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"backupName": "backupName",
"baseBackupId": "550e8400-e29b-41d4-a716-446655440000",
"dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
"backupMethodType": "FULL"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| backupName | String | Y | バックアップを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| baseBackupId | UUID | N | 原本バックアップの識別子 |
| dbInstanceId | UUID | N | DBインスタンスの識別子 |
| backupMethodType | Enum | Y | バックアップ方式タイプ<br/>- FULL: `全体バックアップ`<br/>- INCREMENTAL: `増分バックアップ`<br/>- SNAPSHOT: `スナップショットバックアップ` |

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
| jobId | UUID | リクエストした作業の識別子 |

---

### バックアップの削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.Delete | バックアップの削除 |

#### リクエスト

```http
DELETE /v4.0/backups/{backupId}
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
| jobId | UUID | リクエストした作業の識別子 |

---

### バックアップ詳細照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.Get | バックアップ詳細照会 |

#### リクエスト

```http
GET /v4.0/backups/{backupId}
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

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| backup | Object | バックアップ詳細情報 |
| backup.backupId | UUID | バックアップの識別子 |
| backup.regionCode | Enum | リージョンコード<br/>- KR4: `韓国(テグ)` |
| backup.backupName | String | バックアップを識別できる名前 |
| backup.backupStatus | Enum | バックアップの現在状態<br/>- BACKING_UP: `バックアップ中 (スピナー)`<br/>- VERIFYING: `検証中 (スピナー)`<br/>- COMPLETED: `使用可能 (緑色アイコン)`<br/>- DELETING: `削除中 (スピナー)`<br/>- DELETED: `削除済み (グレーアイコン)`<br/>- ERROR: `エラー (赤色アイコン)` |
| backup.dbInstanceId | UUID | 原本DBインスタンスの識別子 |
| backup.dbInstanceName | String | 原本DBインスタンスの名前 |
| backup.dbVersion | String | DBエンジンバージョン |
| backup.utilVersion | String | ユーティリティバージョン |
| backup.backupType | Enum | バックアップタイプ(AUTO、MANUAL)<br/>- AUTO<br/>- MANUAL |
| backup.backupMethodType | Enum | バックアップ方式(FULL、SNAPSHOT、INCREMENTAL)<br/>- FULL<br/>- INCREMENTAL<br/>- SNAPSHOT |
| backup.backupFileType | Enum | バックアップファイルタイプ<br/>- XBSTREAM<br/>- TAR_ZSTD<br/>- TAR_LZ4<br/>- TAR_GZIP<br/>- SNAPSHOT |
| backup.backupSize | Number | バックアップのサイズ(Byte) |
| backup.isReplicable | Boolean | レプリケーション可否 |
| backup.binLogFileName | String | バイナリログファイル名 |
| backup.binLogPosition | Object | バイナリログ位置 |
| backup.createdYmdt | DateTime | 作成日時 |
| backup.updatedYmdt | DateTime | 修正日時 |

---

### バックアップのエクスポート

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.Export | バックアップエクスポート |

#### リクエスト

```http
POST /v4.0/backups/{backupId}/export
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
| username | String | Y | NHN CloudアカウントまたはIAMメンバーID |
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
| jobId | UUID | リクエストした作業の識別子 |

---

### バックアップを復元する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Backup.Restore | バックアップの復元 |

#### リクエスト

```http
POST /v4.0/backups/{backupId}/restore
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

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DBインスタンスを識別できるマスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| description | String | N | DBインスタンスの追加情報<br/>- 最大長さ: `100` |
| dbFlavorId | UUID | N | DBインスタンス仕様の識別子。未指定の場合、原本インスタンスの値を使用 |
| dbPort | Number | N | DBポート。未指定の場合、原本インスタンスの値を使用<br/>- 最小値: 3306、最大値: 43306 |
| parameterGroupId | UUID | N | パラメータグループの識別子。未指定の場合、原本インスタンスの値を使用 |
| dbSecurityGroupIds | Array | N | DBセキュリティグループの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |
| useHighAvailability | Boolean | N | 高可用性を使用するかどうか<br/>- デフォルト値: `false` |
| pingInterval | Number | N | 高可用性使用時のPing間隔(秒)<br/>- デフォルト値: `3`<br/>- 最小値: `1`<br/>- 最大値: `600` |
| useDefaultNotification | Boolean | N | 基本通知を使用するかどうか<br/>- デフォルト値: `false` |
| useDeletionProtection | Boolean | N | 削除保護の有無<br/>- デフォルト値: `false` |
| useSlowQueryAnalysis | Boolean | N | Slow query分析を行うかどうか<br/>- デフォルト値: `true` |
| network | Object | N | ネットワーク情報オブジェクト。未指定の場合、原本インスタンスの値を使用 |
| network.subnetId | UUID | N | サブネットの識別子。未指定の場合、原本インスタンスの値を使用 |
| network.usePublicAccess | Boolean | N | 外部接続可否<br/>- デフォルト値: `false` |
| network.availabilityZone | Enum | N | DBインスタンスを作成するアベイラビリティゾーン。未指定の場合、ランダム選択 |
| storage | Object | N | ストレージ情報オブジェクト。未指定の場合、原本インスタンスの値を使用 |
| storage.storageType | Enum | N | ストレージタイプ。未指定の場合、原本インスタンスの値を使用 |
| storage.storageSize | Number | N | データストレージサイズ(GB)。未指定の場合、原本インスタンスの値を使用<br/>- 最小値: `20` |
| storage.storageAutoscale | Object | N | データストレージ自動拡張オブジェクト。未指定の場合、原本インスタンスの値を使用 |
| storage.storageAutoscale.useStorageAutoscale | Boolean | N | ストレージ自動拡張を行うかどうか<br/>- デフォルト値: `false` |
| backup | Object | N | バックアップ情報オブジェクト。未指定の場合、原本インスタンスのバックアップ設定を使用 |
| backup.backupPeriod | Number | N | バックアップ保管期間(日)。未指定の場合、原本インスタンスの値を使用<br/>- 最小値: `0`<br/>- 最大値: `730` |
| backup.backupRetryCount | Number | N | バックアップ再試行回数。未指定の場合、原本インスタンスの値を使用<br/>- 最小値: `0`<br/>- 最大値: `10` |
| backup.ftwrlWaitTimeout | Number | N | クエリ遅延待機時間(秒)。未指定の場合、原本インスタンスの値を使用<br/>- 最小値: `0`<br/>- 最大値: `21600` |
| backup.replicationRegion | Enum | N | バックアップ複製リージョン<br/>- KR4: `韓国(テグ)` |
| backup.useBackupLock | Boolean | N | テーブルロックを使用するかどうか。未指定の場合、原本インスタンスの値を使用 |
| backup.backupSchedules | Array | N | バックアップスケジュールリスト。未指定の場合、原本インスタンスの値を使用 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | バックアップ開始時刻 |
| backup.backupSchedules.backupWndDuration | Enum | Y | バックアップDuration<br/>- HALF_AN_HOUR: `30分`<br/>- ONE_HOUR: `1時間`<br/>- ONE_HOUR_AND_HALF: `1時間30分`<br/>- TWO_HOURS: `2時間`<br/>- TWO_HOURS_AND_HALF: `2時間30分`<br/>- THREE_HOURS: `3時間` |

#### 高可用性使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| dbInstanceCandidateName | String | Y | DBインスタンスを識別できる予備マスター名<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |

#### ストレージ自動拡張使用時

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Number | Y | 自動拡張条件(%)<br/>- 最小値: `50`<br/>- 最大値: `95` |
| storage.storageAutoscale.maxStorageSize | Number | Y | 自動拡張最大サイズ(GB)<br/>- 最大値: `4096` |
| storage.storageAutoscale.cooldownTime | Number | Y | 自動拡張クールダウン時間(分)<br/>- 最小値: `10`<br/>- 最大値: `1440` |

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
| jobId | UUID | リクエストした作業の識別子 |

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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.List | DBセキュリティグループリスト表示 |

#### リクエスト

```http
GET /v4.0/db-security-groups
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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | DBセキュリティグループリストの総数 |
| dbSecurityGroups | Array | DBセキュリティグループリスト |
| dbSecurityGroups.dbSecurityGroupId | UUID | DBセキュリティグループの識別子 |
| dbSecurityGroups.dbSecurityGroupName | String | DBセキュリティグループを識別できる名前 |
| dbSecurityGroups.description | String | DBセキュリティグループの追加情報 |
| dbSecurityGroups.progressStatus | Enum | DBセキュリティグループの現在進行状態<br/>- NONE: `なし`<br/>- CREATING_RULE: `ルール作成中`<br/>- UPDATING_RULE: `ルール修正中`<br/>- DELETING_RULE: `ルール削除中`<br/>- APPLYING_DEFAULT_RULE: `デフォルトルール適用中` |
| dbSecurityGroups.createdYmdt | DateTime | 作成日時 |
| dbSecurityGroups.updatedYmdt | DateTime | 修正日時 |

---

### DBセキュリティグループを作成する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Create | DBセキュリティグループの作成 |

#### リクエスト

```http
POST /v4.0/db-security-groups
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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
| rules.description | String | N | DBセキュリティグループルールの追加情報 |

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
"dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbSecurityGroupId | UUID | DBセキュリティグループの識別子 |

---

### DBセキュリティグループを削除する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Delete | DBセキュリティグループの削除 |

#### リクエスト

```http
DELETE /v4.0/db-security-groups/{dbSecurityGroupId}
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Get | DBセキュリティグループ詳細表示 |

#### リクエスト

```http
GET /v4.0/db-security-groups/{dbSecurityGroupId}
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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| dbSecurityGroupId | UUID | DBセキュリティグループの識別子 |
| dbSecurityGroupName | String | DBセキュリティグループを識別できる名前 |
| description | String | DBセキュリティグループの追加情報 |
| progressStatus | Enum | DBセキュリティグループの現在進行状態<br/>- NONE: `なし`<br/>- CREATING_RULE: `ルール作成中`<br/>- UPDATING_RULE: `ルール修正中`<br/>- DELETING_RULE: `ルール削除中`<br/>- APPLYING_DEFAULT_RULE: `デフォルトルール適用中` |
| rules | Array | DBセキュリティグループルールリスト |
| rules.ruleId | UUID | DBセキュリティグループルールの識別子 |
| rules.description | String | DBセキュリティグループルールの追加情報 |
| rules.direction | Enum | 通信方向<br/>- INGRESS: `受信`<br/>- EGRESS: `送信` |
| rules.etherType | Enum | Etherタイプ<br/>- IPV4: `IPv4形式`<br/>- IPV6: `IPv6形式` |
| rules.port | Object | ポートオブジェクト |
| rules.port.portType | Enum | ポートタイプ<br/>- ALL: `ポート範囲全体(ユーザーコンソールでは使用しない)`<br/>- PORT: `特定ポート`<br/>- DB_PORT: `DB受信ポート`<br/>- PORT_RANGE: `ポート範囲` |
| rules.port.minPort | Number | 最小ポート範囲 |
| rules.port.maxPort | Number | 最大ポート範囲 |
| rules.cidr | String | CIDR |
| rules.createdYmdt | DateTime | 作成日時 |
| rules.updatedYmdt | DateTime | 修正日時 |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### DBセキュリティグループを修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroup.Modify | DBセキュリティグループの修正 |

#### リクエスト

```http
PUT /v4.0/db-security-groups/{dbSecurityGroupId}
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
"dbSecurityGroupName": "dbSecurityGroupName",
"description": "description-example"
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroupRule.Delete | DBセキュリティグループルールの削除 |

#### リクエスト

```http
DELETE /v4.0/db-security-groups/{dbSecurityGroupId}/rules
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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBセキュリティグループルールを作成する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroupRule.Create | DBセキュリティグループルールの作成 |

#### リクエスト

```http
POST /v4.0/db-security-groups/{dbSecurityGroupId}/rules
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
| jobId | UUID | リクエストした作業の識別子 |

---

### DBセキュリティグループルールを修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:DbSecurityGroupRule.Modify | DBセキュリティグループルールの修正 |

#### リクエスト

```http
PUT /v4.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
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
| jobId | UUID | リクエストした作業の識別子 |

---

## パラメータグループ

### パラメータグループリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.List | パラメータグループリスト表示 |

#### リクエスト

```http
GET /v4.0/parameter-groups
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

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | パラメータグループの総数 |
| parameterGroups | Array | パラメータグループリスト |
| parameterGroups.parameterGroupId | UUID | パラメータグループの識別子 |
| parameterGroups.parameterGroupName | String | パラメータグループを識別できる名前 |
| parameterGroups.description | String | パラメータグループの追加情報 |
| parameterGroups.dbVersion | String | DBエンジンタイプ |
| parameterGroups.parameterGroupType | Enum | パラメータグループタイプ<br/>- USER<br/>- ADMIN<br/>- DEFAULT |
| parameterGroups.parameterGroupStatus | Enum | パラメータグループの現在状態<br/>- STABLE: `適用完了`<br/>- NEED_TO_APPLY: `適用必要`<br/>- DELETED: `削除済み` |
| parameterGroups.createdYmdt | DateTime | 作成日時 |
| parameterGroups.updatedYmdt | DateTime | 修正日時 |

---

### パラメータグループを作成する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Create | パラメータグループの作成 |

#### リクエスト

```http
POST /v4.0/parameter-groups
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"parameterGroupName": "parameterGroupName",
"description": "description-example",
"dbVersion": "MYSQL_V8036"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | パラメータグループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| description | String | N | パラメータグループの追加情報<br/>- 最大長: `100` |
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
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroupId | UUID | パラメータグループの識別子 |

---

### パラメータグループを削除する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Delete | パラメータグループの削除 |

#### リクエスト

```http
DELETE /v4.0/parameter-groups/{parameterGroupId}
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Get | パラメータグループ詳細表示 |

#### リクエスト

```http
GET /v4.0/parameter-groups/{parameterGroupId}
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Modify | パラメータグループの修正 |

#### リクエスト

```http
PUT /v4.0/parameter-groups/{parameterGroupId}
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
"parameterGroupName": "parameterGroupName",
"description": "description-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| parameterGroupName | String | N | パラメータグループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| description | String | N | パラメータグループの追加情報<br/>- 最大長: `100` |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### パラメータグループをコピーする

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Copy | パラメータグループコピーする |

#### リクエスト

```http
POST /v4.0/parameter-groups/{parameterGroupId}/copy
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
"parameterGroupName": "parameterGroupName",
"description": "description-example"
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | パラメータグループを識別できる名前<br/>- 最小長: `1`<br/>- 最大長: `100` |
| description | String | N | パラメータグループの追加情報<br/>- 最大長: `100` |

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
"parameterGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| parameterGroupId | UUID | パラメータグループの識別子 |

---

### パラメータを修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Modify | パラメータグループの修正 |

#### リクエスト

```http
PUT /v4.0/parameter-groups/{parameterGroupId}/parameters
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
"modifiedParameters": [
{
"parameterId": "550e8400-e29b-41d4-a716-446655440000",
"value": "value-example"
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

### パラメータグループをリセットする

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:ParameterGroup.Reset | パラメータグループのリセット |

#### リクエスト

```http
PUT /v4.0/parameter-groups/{parameterGroupId}/reset
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:UserGroup.List | ユーザーグループリスト表示 |

#### リクエスト

```http
GET /v4.0/user-groups
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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | ユーザーグループリストの総数 |
| userGroups | Array | ユーザーグループリスト |
| userGroups.userGroupId | UUID | ユーザーグループの識別子 |
| userGroups.userGroupName | String | ユーザーグループを識別できる名前 |
| userGroups.createdYmdt | DateTime | 作成日時 |
| userGroups.updatedYmdt | DateTime | 修正日時 |

---

### ユーザーグループを作成する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:UserGroup.Create | ユーザーグループの作成 |

#### リクエスト

```http
POST /v4.0/user-groups
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

```json
{
"userGroupName": "userGroupName-example",
"memberIds": [],
"selectAll": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| userGroupName | String | Y | ユーザーグループを識別できる名前 |
| memberIds | Array | Y | プロジェクトメンバーの識別子リスト |
| selectAll | Boolean | N | プロジェクトメンバー全員を含むかどうか<br/>- デフォルト値: `false` |

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
"userGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| userGroupId | UUID | ユーザーグループの識別子 |

---

### ユーザーグループを削除する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:UserGroup.Delete | ユーザーグループの削除 |

#### リクエスト

```http
DELETE /v4.0/user-groups/{userGroupId}
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:UserGroup.Get | ユーザーグループ詳細表示 |

#### リクエスト

```http
GET /v4.0/user-groups/{userGroupId}
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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| userGroupId | UUID | ユーザーグループの識別子 |
| userGroupName | String | ユーザーグループを識別できる名前 |
| userGroupTypeCode | Enum | ユーザーグループの種類<br/>- ENTIRE<br/>- INDIVIDUAL_MEMBER |
| members | Array | プロジェクトメンバーリスト |
| members.memberId | UUID | プロジェクトメンバーの識別子 |
| createdYmdt | DateTime | 作成日時 |
| updatedYmdt | DateTime | 修正日時 |

---

### ユーザーグループを修正する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:UserGroup.Modify | ユーザーグループの修正 |

#### リクエスト

```http
PUT /v4.0/user-groups/{userGroupId}
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
"userGroupName": "userGroupName-example",
"memberIds": [],
"selectAll": false
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| userGroupName | String | Y | ユーザーグループを識別できる名前 |
| memberIds | Array | N | プロジェクトメンバーの識別子リスト |
| selectAll | Boolean | N | プロジェクトメンバー全員を含むかどうか<br/>- デフォルト値: `false` |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

## 通知グループ

### 通知グループリストを表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:NotificationGroup.List | 通知グループリスト表示 |

#### リクエスト

```http
GET /v4.0/notification-groups
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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationGroups | Array | 通知グループリスト |
| notificationGroups.notificationGroupId | UUID | 通知グループの識別子 |
| notificationGroups.notificationGroupName | String | 通知グループを識別できる名前 |
| notificationGroups.notifyEmail | Boolean | メール通知の有無 |
| notificationGroups.notifySms | Boolean | SMS通知の有無 |
| notificationGroups.isEnabled | Boolean | 有効かどうか |
| notificationGroups.createdYmdt | DateTime | 作成日時 |
| notificationGroups.updatedYmdt | DateTime | 修正日時 |

---

### 通知グループを作成する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:NotificationGroup.Create | 通知グループの作成 |

#### リクエスト

```http
POST /v4.0/notification-groups
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| notificationGroupName | String | Y | 通知グループを識別できる名前<br/>- 最小長さ: `1`<br/>- 最大長さ: `100` |
| notifyEmail | Boolean | N | メール通知の有無<br/>- デフォルト値: `true` |
| notifySms | Boolean | N | SMS通知の有無<br/>- デフォルト値: `true` |
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
"notificationGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationGroupId | UUID | 通知グループの識別子 |

---

### 通知グループを削除する

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:NotificationGroup.Delete | 通知グループの削除 |

#### リクエスト

```http
DELETE /v4.0/notification-groups/{notificationGroupId}
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:NotificationGroup.Get | 通知グループ詳細表示 |

#### リクエスト

```http
GET /v4.0/notification-groups/{notificationGroupId}
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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| notificationGroupId | UUID | 通知グループの識別子 |
| notificationGroupName | String | 通知グループを識別できる名前 |
| notifyEmail | Boolean | メール通知の有無 |
| notifySms | Boolean | SMS通知の有無 |
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:NotificationGroup.Modify | 通知グループの修正 |

#### リクエスト

```http
PUT /v4.0/notification-groups/{notificationGroupId}
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
"notificationGroupName": "notificationGroupName-example",
"notifyEmail": false,
"notifySms": false,
"isEnabled": false,
"dbInstanceIds": [],
"userGroupIds": []
}
```

</details>

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| notificationGroupName | String | N | 通知グループを識別できる名前 |
| notifyEmail | Boolean | N | メール通知の有無<br/>- デフォルト値: `false` |
| notifySms | Boolean | N | SMS通知の有無<br/>- デフォルト値: `false` |
| isEnabled | Boolean | N | 有効かどうか<br/>- デフォルト値: `false` |
| dbInstanceIds | Array | N | 監視対象DBインスタンスの識別子リスト |
| userGroupIds | Array | N | ユーザーグループの識別子リスト |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

## モニタリング

### 統計情報照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Metric.List | 統計情報照会 |

#### リクエスト

```http
GET /v4.0/metric-statistics
```

#### リクエスト本文

このAPIはリクエスト本文を要求しません。

#### レスポンス

このAPIはレスポンス本文を返しません。

---

### Metricリスト表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Metric.List | Metricリスト表示 |

#### リクエスト

```http
GET /v4.0/metrics
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
"metrics": [
{
"measureName": "measureName-example",
"unit": "unit-example"
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

イベントはカテゴリに分類することができ、下記の通りです。

| イベントカテゴリー | 説明 |
|-------------|---------|
| ALL | 全体 |
| BACKUP | バックアップ |
| DB_INSTANCE | DBインスタンス |
| JOB | 作業 |
| TENANT | テナント |
| MONITORING | モニタリング |

### 購読可能なイベントコード一覧表示

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Event.List | 購読可能なイベントコード一覧表示 |

#### リクエスト

```http
GET /v4.0/event-codes
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
"eventCodes": [
{
"eventCode": "ENUM_VALUE",
"eventCategoryType": "ALL"
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

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:Event.List | イベントリスト照会 |

#### リクエスト

```http
GET /v4.0/events
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

### イベント購読一覧照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:EventSubscription.List | イベント購読一覧照会 |

#### リクエスト

```http
GET /v4.0/event-subscriptions
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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| totalCounts | Number | 全イベント購読一覧数 |
| eventSubscriptions | Array | イベント購読一覧 |
| eventSubscriptions.eventSubscriptionId | UUID | イベント購読の識別子 |
| eventSubscriptions.eventCategoryType | Enum | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.eventSubscriptionName | String | イベント購読を識別できる名前 |
| eventSubscriptions.enabled | Boolean | 有効かどうか |
| eventSubscriptions.notifyEmail | Boolean | メール送信の有無 |
| eventSubscriptions.notifySms | Boolean | SMS送信の有無 |
| eventSubscriptions.eventCodes | Array | 購読するイベントコード一覧 |
| eventSubscriptions.sources | Array | 購読するイベントソース一覧 |
| eventSubscriptions.sources.sourceId | UUID | イベントソースの識別子 |
| eventSubscriptions.sources.eventCategoryType | Enum | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.userGroupIds | Array | イベント購読中のユーザーグループの識別子一覧 |
| eventSubscriptions.createdYmdt | DateTime | 作成日時 |

---

### イベント購読作成

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:EventSubscription.Create | イベント購読作成 |

#### リクエスト

```http
POST /v4.0/event-subscriptions
```

#### リクエスト本文

<details>
  <summary><strong>例コード</strong></summary>

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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| eventCategoryType | Enum | Y | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | String | Y | イベント購読を識別できる名前 |
| enabled | Boolean | Y | 有効かどうか |
| notifyEmail | Boolean | Y | メール送信の有無 |
| notifySms | Boolean | Y | SMS送信の有無 |
| eventCodes | Array | Y | 購読するイベントコード一覧 |
| sources | Array | Y | 購読するイベントソース一覧 |
| sources.sourceId | UUID | Y | イベントソースの識別子 |
| sources.eventCategoryType | Enum | Y | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Array | Y | イベント購読するユーザーグループの識別子一覧 |

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
"eventSubscriptionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| eventSubscriptionId | UUID | イベント購読の識別子 |

---

### イベント購読削除

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:EventSubscription.Delete | イベント購読削除 |

#### リクエスト

```http
DELETE /v4.0/event-subscriptions/{eventSubscriptionId}
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

### イベント購読修正

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:EventSubscription.Modify | イベント購読修正 |

#### リクエスト

```http
PUT /v4.0/event-subscriptions/{eventSubscriptionId}
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

| 名前 | タイプ | 必須 | 説明 |
|-----|-----|-----|-----|
| eventCategoryType | Enum | N | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | String | N | イベント購読を識別できる名前 |
| enabled | Boolean | N | 有効かどうか |
| notifyEmail | Boolean | N | メール送信の有無 |
| notifySms | Boolean | N | SMS送信の有無 |
| eventCodes | Array | N | 購読するイベントコード一覧 |
| sources | Array | N | 購読するイベントソース一覧 |
| sources.sourceId | UUID | Y | イベントソースの識別子 |
| sources.eventCategoryType | Enum | Y | イベントカテゴリータイプ<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Array | N | イベント購読するユーザーグループの識別子一覧 |

#### レスポンス

このAPIはレスポンス本文を返しません。

---

## アベイラビリティゾーン

### アベイラビリティゾーン一覧照会

#### 必要権限

| 権限名 | 説明 |
|-----|-----|
| RDSforMySQL:AvailabilityZone.List | アベイラビリティゾーン一覧照会 |

#### リクエスト

```http
GET /v4.0/availability-zones
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

| 名前 | タイプ | 説明 |
|-----|-----|-----|
| availabilityZones | Array | アベイラビリティゾーン一覧 |
| availabilityZones.availabilityZoneName | String | アベイラビリティゾーン名 |
| availabilityZones.zoneState | Object | アベイラビリティゾーンの状態 |
| availabilityZones.zoneState.available | Boolean | アベイラビリティゾーンの使用可否 |

---
