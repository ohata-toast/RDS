## Database > RDS for MariaDB > 通知

## イベント

イベントとは、RDS for MariaDBやユーザーによって発生した重要なイベントを意味します。イベントはイベントタイプ、発生日時、元ソースとメッセージで構成されます。イベントはコンソールで照会可能で、購読することでメール、SMSでイベント発生通知を受けることができます。イベントの種類と発生するイベントは下記の通りです。

| イベントコード     | イベントタイプ           | 購読可否 | 説明                                    |
|-------------|-------------------|------|---------------------------------------|
| BACUP_01_00 | BACKUP            | いいえ  | DBインスタンスのバックアップ開始                     |
| BACUP_01_01 | BACKUP            | いいえ  | DBインスタンスのバックアップ完了                     |
| BACUP_01_04 | BACKUP            | いいえ  | DBインスタンスのバックアップ失敗                     |
| BACUP_02_01 | BACKUP            | はい   | バックアップの削除完了                           |
| BACUP_04_00 | BACKUP            | はい   | オブジェクトストレージのアップロード開始                  |
| BACUP_04_01 | BACKUP            | はい   | オブジェクトストレージのアップロード完了                  |
| BACUP_04_04 | BACKUP            | はい   | オブジェクトストレージのアップロード失敗                  |
| BACUP_05_00 | BACKUP            | はい   | バックアップのエクスポート開始                       |
| BACUP_05_01 | BACKUP            | はい   | バックアップのエクスポート完了                       |
| BACUP_05_04 | BACKUP            | はい   | バックアップのエクスポート失敗                       |
| BACUP_06_01 | BACKUP            | いいえ  | DBインスタンスのバックアップ失敗(既知の原因)              |
| SECGP_01_01 | DB_SECURITY_GROUP | いいえ  | DBセキュリティグループの作成                       |
| SECGP_02_00 | DB_SECURITY_GROUP | いいえ  | DBセキュリティグループの変更開始                     |
| SECGP_02_01 | DB_SECURITY_GROUP | いいえ  | DBセキュリティグループの変更完了                     |
| SECGP_02_04 | DB_SECURITY_GROUP | いいえ  | DBセキュリティグループの変更失敗                     |
| SECGP_03_01 | DB_SECURITY_GROUP | いいえ  | DBセキュリティグループの削除                       |
| INSTC_01_00 | INSTANCE          | いいえ  | DBインスタンスの作成開始                         |
| INSTC_01_01 | INSTANCE          | いいえ  | DBインスタンスの作成完了                         |
| INSTC_01_04 | INSTANCE          | いいえ  | DBインスタンスの作成失敗                         |
| INSTC_02_01 | INSTANCE          | はい   | DBインスタンスの起動                           |
| INSTC_03_01 | INSTANCE          | はい   | DBインスタンスの停止                           |
| INSTC_04_00 | INSTANCE          | はい   | DBインスタンスの削除開始                         |
| INSTC_04_01 | INSTANCE          | はい   | DBインスタンスの削除完了                         |
| INSTC_04_04 | INSTANCE          | はい   | DBインスタンスの削除失敗                         |
| INSTC_05_00 | INSTANCE          | はい   | DBインスタンスのバックアップ開始                     |
| INSTC_05_01 | INSTANCE          | はい   | DBインスタンスのバックアップ完了                     |
| INSTC_05_04 | INSTANCE          | はい   | DBインスタンスのバックアップ失敗                     |
| INSTC_06_00 | INSTANCE          | はい   | DBインスタンスの復元開始                         |
| INSTC_06_01 | INSTANCE          | はい   | DBインスタンスの復元完了                         |
| INSTC_06_04 | INSTANCE          | はい   | DBインスタンスの復元失敗                         |
| INSTC_07_01 | INSTANCE          | はい   | 自動バックアップ設定の有効化                        |
| INSTC_08_01 | INSTANCE          | はい   | 自動バックアップ設定の無効化                        |
| INSTC_09_00 | INSTANCE          | はい   | 詳細設定の変更開始                             |
| INSTC_09_01 | INSTANCE          | はい   | 詳細設定の変更完了                             |
| INSTC_09_04 | INSTANCE          | はい   | 詳細設定の変更失敗                             |
| INSTC_10_00 | INSTANCE          | はい   | バックアップおよびユーザーアクセス制御設定の変更開始            |
| INSTC_10_01 | INSTANCE          | はい   | バックアップおよびユーザーアクセス制御設定の変更完了            |
| INSTC_10_04 | INSTANCE          | はい   | バックアップおよびユーザーアクセス制御設定の変更失敗            |
| INSTC_11_01 | INSTANCE          | はい   | ユーザーアクセス制御の変更完了                       |
| INSTC_13_01 | INSTANCE          | はい   | Floating IP接続                         |
| INSTC_14_01 | INSTANCE          | はい   | Floating IP接続解除                       |
| INSTC_15_00 | INSTANCE          | はい   | DBインスタンスの複製開始                         |
| INSTC_15_01 | INSTANCE          | はい   | DBインスタンスの複製完了                         |
| INSTC_15_04 | のINSTANCE         | はい   | DBインスタンスの複製失敗                         |
| INSTC_16_00 | INSTANCE          | はい   | DBインスタンスの昇格開始                         |
| INSTC_16_01 | INSTANCE          | はい   | DBインスタンスの昇格完了                         |
| INSTC_16_04 | INSTANCE          | はい   | DBインスタンスの昇格失敗                         |
| INSTC_21_01 | INSTANCE          | はい   | DBインスタンスの正常化                          |
| INSTC_22_01 | INSTANCE          | はい   | DBインスタンス容量不足                          |
| INSTC_23_01 | INSTANCE          | はい   | DBインスタンス接続失敗                          |
| INSTC_24_00 | INSTANCE          | はい   | DBインスタンスタイプの変更開始                      |
| INSTC_24_01 | INSTANCE          | はい   | DBインスタンスタイプの変更完了                      |
| INSTC_24_04 | INSTANCE          | はい   | DBインスタンスタイプの変更失敗                      |
| INSTC_25_00 | INSTANCE          | はい   | Storage拡張開始                           |
| INSTC_25_01 | INSTANCE          | はい   | Storage拡張完了                           |
| INSTC_25_04 | INSTANCE          | はい   | Storage拡張失敗                           |
| INSTC_26_00 | INSTANCE          | はい   | DBインスタンスフェイルオーバー発生                    |
| INSTC_26_01 | INSTANCE          | はい   | DBインスタンスのフェイルオーバー完了                   |
| INSTC_26_04 | INSTANCE          | はい   | DBインスタンスのフェイルオーバー失敗                   |
| INSTC_27_01 | INSTANCE          | はい   | DBインスタンスの容量を確保                        |
| INSTC_27_04 | INSTANCE          | はい   | DBインスタンスの容量確保失敗                       |
| INSTC_28_01 | INSTANCE          | はい   | 高可用性DBインスタンスの起動                       |
| INSTC_29_01 | INSTANCE          | はい   | 高可用性DBインスタンスの停止                       |
| INSTC_30_01 | INSTANCE          | はい   | 複製中断                                  |
| INSTC_31_00 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスの高可用性復旧開始        |
| INSTC_31_01 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスの高可用性復旧完了        |
| INSTC_31_04 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスの高可用性復旧失敗        |
| INSTC_32_00 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスの高可用性再構築開始       |
| INSTC_32_01 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスの高可用性再構築完了       |
| INSTC_32_04 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスの高可用性再構築失敗       |
| INSTC_33_00 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスの高可用性除去開始        |
| INSTC_33_01 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスの高可用性除去完了        |
| INSTC_33_04 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスの高可用性除去失敗        |
| INSTC_34_01 | INSTANCE          | はい   | 高可用性の一時停止                             |
| INSTC_34_04 | INSTANCE          | はい   | 高可用性の一時停止失敗                           |
| INSTC_35_01 | INSTANCE          | はい   | 高可用性の再開                               |
| INSTC_35_04 | INSTANCE          | はい   | 高可用性の再開失敗                             |
| INSTC_36_01 | INSTANCE          | はい   | フェイルオーバーを利用したインスタンスの再起動完了             |
| INSTC_36_04 | INSTANCE          | はい   | フェイルオーバーを利用したインスタンスの再起動失敗             |
| INSTC_37_01 | INSTANCE          | はい   | DB User作成                             |
| INSTC_37_04 | INSTANCE          | はい   | DB User作成失敗                           |
| INSTC_38_01 | INSTANCE          | はい   | DB User変更                             |
| INSTC_38_04 | INSTANCE          | はい   | DB User変更失敗                           |
| INSTC_39_01 | INSTANCE          | はい   | DB User削除                             |
| INSTC_40_01 | INSTANCE          | はい   | DBスキーマ作成                              |
| INSTC_40_04 | INSTANCE          | はい   | DBスキーマ作成失敗                            |
| INSTC_41_01 | INSTANCE          | はい   | DBスキーマ削除                              |
| INSTC_42_04 | INSTANCE          | いいえ  | CPUコア数制限                              |
| INSTC_43_04 | INSTANCE          | いいえ  | RAM容量制限                               |
| INSTC_44_04 | INSTANCE          | いいえ  | 個別ボリュームサイズ制限                          |
| INSTC_45_04 | INSTANCE          | いいえ  | プロジェクト全体ボリュームサイズ制限                    |
| INSTC_46_04 | INSTANCE          | いいえ  | Read Only Slave数制限                    |
| INSTC_47_00 | INSTANCE          | はい   | DBインスタンスのバックアップおよびエクスポート開始            |
| INSTC_47_01 | INSTANCE          | はい   | DBインスタンスのバックアップおよびエクスポート完了            |
| INSTC_47_04 | INSTANCE          | はい   | DBインスタンスのバックアップおよびエクスポート失敗            |
| INSTC_48_00 | INSTANCE          | はい   | オブジェクトストレージにあるバックアップでDBインスタンス復元開始     |
| INSTC_48_01 | INSTANCE          | はい   | オブジェクトストレージにあるバックアップでDBインスタンス復元完了     |
| INSTC_48_04 | INSTANCE          | はい   | オブジェクトストレージにあるバックアップでDBインスタンス復元失敗     |
| INSTC_49_00 | INSTANCE          | はい   | DBインスタンスの強制再起動実行                      |
| INSTC_50_00 | INSTANCE          | はい   | バックアップのエクスポート開始                       |
| INSTC_50_01 | INSTANCE          | はい   | バックアップのエクスポート完了                       |
| INSTC_50_04 | INSTANCE          | はい   | バックアップのエクスポート失敗                       |
| INSTC_51_01 | INSTANCE          | はい   | DBインスタンスのバックアップ失敗                     |
| INSTC_52_01 | INSTANCE          | はい   | DBインスタンスのバックアップおよびエクスポート失敗            |
| INSTC_53_00 | INSTANCE          | はい   | DBインスタンスの停止開始                         |
| INSTC_53_01 | INSTANCE          | はい   | DBインスタンスの停止完了                         |
| INSTC_53_04 | INSTANCE          | はい   | DBインスタンスの停止失敗                         |
| INSTC_54_00 | INSTANCE          | はい   | DBインスタンスの複製再構築開始                      |
| INSTC_54_01 | INSTANCE          | はい   | DBインスタンスの複製再構築完了                      |
| INSTC_54_04 | INSTANCE          | はい   | DBインスタンスの複製再構築失敗                      |
| INSTC_55_01 | INSTANCE          | はい   | 複製ディレイによるフェイルオーバー再起動失敗                |
| INSTC_56_00 | INSTANCE          | はい   | DBインスタンスセキュリティグループ変更開始                |
| INSTC_56_01 | INSTANCE          | はい   | DBインスタンスセキュリティグループの変更完了               |
| INSTC_56_04 | INSTANCE          | はい   | DBインスタンスセキュリティグループの変更失敗               |
| INSTC_57_00 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスを一般DBインスタンスに変更開始 |
| INSTC_57_01 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスを一般DBインスタンスに変更完了 |
| INSTC_57_04 | INSTANCE          | はい   | フェイルオーバーが完了したDBインスタンスを一般DBインスタンスに変更失敗 |
| INSTC_58_00 | INSTANCE          | はい   | パラメータグループの変更開始                        |
| INSTC_58_01 | INSTANCE          | はい   | パラメータグループの変更完了                        |
| INSTC_58_04 | INSTANCE          | はい   | パラメータグループの変更失敗                        |
| INSTC_59_00 | INSTANCE          | はい   | パラメータグループの変更事項適用開始                    |
| INSTC_59_01 | INSTANCE          | はい   | パラメータグループ変更事項の適用完了                    |
| INSTC_59_04 | INSTANCE          | はい   | パラメータグループ変更事項の適用失敗                    |
| INSTC_60_00 | INSTANCE          | はい   | DBインスタンスのマイグレーション開始                   |
| INSTC_60_01 | INSTANCE          | はい   | DBインスタンスのマイグレーション完了                   |
| INSTC_60_04 | INSTANCE          | はい   | DBインスタンスのマイグレーション失敗                   |
| INSTC_61_00 | INSTANCE          | はい   | 予備マスター再構築開始                           |
| INSTC_61_01 | INSTANCE          | はい   | 予備マスター再構築完了                           |
| INSTC_61_04 | INSTANCE          | はい   | 予備マスター再構築失敗                           |
| INSTC_62_00 | INSTANCE          | はい   | DBエンジンバージョンアップグレード開始                  |
| INSTC_62_01 | INSTANCE          | はい   | DBエンジンバージョンアップグレード完了                  |
| INSTC_62_04 | INSTANCE          | はい   | DBエンジンバージョンアップグレード失敗                  |
| INSTC_63_01 | INSTANCE          | はい   | DBインスタンスバイナリログ解読                      |
| INSTC_64_04 | INSTANCE          | はい   | DBエンジンバージョンアップグレード事前点検失敗              |
| INSTC_65_00 | INSTANCE          | はい   | 認証プラグイン有効化開始                          |
| INSTC_65_01 | INSTANCE          | はい   | 認証プラグイン有効化完了                          |
| INSTC_65_04 | INSTANCE          | はい   | 認証プラグイン有効化失敗                          |
| INSTC_66_00 | INSTANCE          | はい   | DBインスタンス強制昇格開始                        |
| INSTC_66_01 | INSTANCE          | はい   | DBインスタンス強制昇格完了                        |
| INSTC_66_04 | INSTANCE          | はい   | DBインスタンス強制昇格失敗                        |
| INSTC_67_00 | INSTANCE          | はい   | OSバージョンアップグレード開始                      |
| INSTC_67_01 | INSTANCE          | はい   | OSバージョンアップグレード終了                      |
| INSTC_67_04 | INSTANCE          | はい   | OSバージョンアップグレード失敗                      |
| INSTC_68_01 | INSTANCE          | はい   | ネットワーク通信失敗                            |
| INSTC_69_00 | INSTANCE          | はい   | フェイルオーバーの手動制御待機                       |
| INSTC_69_01 | INSTANCE          | はい   | フェイルオーバーの手動制御成功                       |
| INSTC_69_04 | INSTANCE          | はい   | フェイルオーバーの手動制御タイムアウト                   |
| INSTC_70_01 | INSTANCE          | はい   | 高可用性正常化                               |
| INSTC_71_01 | INSTANCE          | はい   | 高可用性中断                                |
| INSTC_73_00 | INSTANCE          | はい   | ストレージ自動拡張開始                           |
| INSTC_73_01 | INSTANCE          | はい   | ストレージ自動拡張完了                           |
| INSTC_73_04 | INSTANCE          | はい   | ストレージ自動拡張失敗                           |
| JOB_01_04   | JOB               | はい   | Job実行失敗                               |
| TENAT_01_04 | TENANT            | はい   | CPUコア数制限                              |
| TENAT_02_04 | TENANT            | はい   | RAM容量制限	                              |
| TENAT_03_04 | TENANT            | はい   | 個別ボリュームサイズ制限                          |
| TENAT_04_04 | TENANT            | はい   | プロジェクト全体のボリュームサイズ制限                   |
| TENAT_05_04 | TENANT            | はい   | Read Only Slave数制限                    |

## イベント購読

イベントタイプ、コード、ソースに分けてイベントを購読できます。イベントタイプで購読すると、イベントタイプに含まれるすべてのイベントコードの通知を受け取ります。通知が広範すぎる場合、イベントコードとソースに細分化して購読できます。プロジェクトメンバーのみ通知を受けるユーザーとして選択できます。基本的にはメールでイベント通知が送信され、実名認証した携帯電話番号が登録された場合のみSMSで追加イベント通知が送信されます。

![event_subscription_01_ja](https://static.toastoven.net/prod_rds/mariadb/23.04.11/event_subscription_01_ja.png)

* ❶ **イベント購読登録**を押すと、イベント購読を登録できるポップアップウィンドウが表示されます。
* ❷ 購読するイベントタイプを選択します。イベントタイプによって選択できるイベントコードが変更されます。
* ❸ 購読するイベントコードを選択します。
* ❹ 購読するイベントソースを選択します。
* ❺ イベント通知を受け取るユーザーグループを選択します。
* ❻ 有効にするかどうかを選択します。`いいえ`を選択した場合、イベント発生通知を送信しません。

## ユーザーグループ

通知を受けるユーザーをグループで管理できます。通知対象は必ずプロジェクトメンバーとして登録されている必要があります。ユーザーグループに属するユーザーがプロジェクトメンバーから除外されると、ユーザーグループに属していても通知を受けることができません。

> [注意]
> 実名認証を行っておらず、携帯電話情報がない場合、SMS通知を受けることができません。

### ユーザーグループの作成

![user_group_01_ja](https://static.toastoven.net/prod_rds/mariadb/23.06.13/user_group_01_ja.png)

* ❶ **ユーザーグループ作成**を押すと、ユーザーグループを作成できるポップアップウィンドウが表示されます。
* ❷ ユーザーグループに追加されたユーザーが表示されます。
* ❸ **x**を押すと、追加されたユーザーを除外できます。
* ❹ ユーザーリストにユーザーが多い場合、検索条件を入力して結果を制限できます。
* ❺ **全プロジェクトメンバー**を通知対象に追加します。 
  * 追加 すると、個別ユーザーの追加はキャンセルされます。
  * 該当ユーザーグループを利用してアラームを送信する場合、その時点で全プロジェクトメンバーを対象にアラームを送信します。
* ❻ **OK**を押してユーザーグループにユーザーを追加します。

## 通知グループ

通知グループを通じて、パフォーマンス指標に関する通知を受けることができます。指定します。-> 通知グループに監視対象インスタンスと通知を受けるユーザーグループを指定します。監視設定で通知を受けるパフォーマンス指標のしきい値と条件を設定します。設定された指標が監視設定の条件を満たすと、接続されたユーザーグループに通知が送信されます。通知グループに設定された通知タイプによって、SMSまたはメールで通知を送信します。

### 通知グループの作成

![notification_group_01_ja.png](https://static.toastoven.net/prod_rds/mariadb/23.04.11/notification_group_01_ja.png)

* ❶ **グループ作成**を押すと、通知グループを作成できるポップアップウィンドウが表示されます。
* ❷ 通知を受け取る方法を選択します。
* ❸ 有効になっていない通知グループは通知送信をしません。
* ❹ 監視対象DBインスタンスを選択します。
* ❺ 通知を受け取るユーザーグループを選択します。

## 監視設定

監視設定は、監視項目、比較方法、しきい値、および持続時間で構成されます。監視項目の性能指標値としきい値を比較し、条件を満たしているかどうかを判断します。持続時間以上連続して条件を満たした場合、通知を送信します。例えば、CPU使用率のしきい値が90%以上で持続時間が5分であれば、その通知グループと連動されたDBインスタンスのCPU使用率が90%以上の状態が5分以上続いた時、ユーザーグループに定義されたユーザーに通知を送信します。もし、CPU使用率が90%以上になっても、5分以内に90%未満になれば、通知は発生しません。

### 監視設定項目

監視可能な性能指標項目は次のとおりです。

| 項目                         | 単位              |
|----------------------------|-----------------|
| CPU使用率                     | %               |
| CPU使用率(IO Wait)            | %               |
| CPU使用率(Nice)               | %               |
| CPU使用率(System)             | %               |
| CPU使用率(User)               | %               |
| Load Average 1M            |                 |
| Load Average 5M            |                 |
| Load Average 15M           |                 |
| メモリ使用量                     | %               |
| メモリ使用量(バイト)                | MB              |
| メモリ空き容量(バイト)               | MB              |
| メモリバッファ(バイト)               | MB              |
| キャッシュされたメモリ(バイト)           | MB              |
| スワップ使用量                    | MB              |
| スワップ全体サイズ                  | MB              |
| Storage使用量                 | %               |
| Storageの空き容量               | MB              |
| Storage IO Read            | KB/sec          |
| Storage IO Write           | KB/sec          |
| データストレージ障害               | 異常: 0、正常: 1     |
| Network in BPS             | KB/sec          |
| Network out BPS            | KB/sec          |
| Database Connection Status | 接続不可: 0、接続可能: 1 |
| Queries Per Second         | counts/sec      |
| Connection Total           | counts          |
| Connection Running         | counts          |
| Connection Cached          | counts          |
| Connection Ratio           | counts          |
| Database Activity Select   | counts/sec      |
| Database Activity Insert   | counts/sec      |
| Database Activity Update   | counts/sec      |
| Database Activity Delete   | counts/sec      |
| Database Activity Replace  | counts/sec      |
| Database Activity Call     | counts/sec      |
| Buffer Pool Total          | MB              |
| Buffer Pool Used           | MB              |
| Slow Query                 | counts/min      |
| 複製ディレイ                     | sec             |
| Row Access Index           | counts/min      |
| Row Access Full scan       | counts/min      |
| Database Replication IO Thread Status  | 異常: 0、正常: 1     |
| Database Replication SQL Thread Status | 異常: 0、正常: 1     |
| Database Replication Threads Status    | 異常: 0、正常: 1     |

### 監視設定の追加

![notification_group_02_ja.png](https://static.toastoven.net/prod_rds/mariadb/23.04.11/notification_group_02_ja.png)

* ❶ **監視設定**を押すと、監視設定を変更できるポップアップウィンドウが表示されます。
* ❷ **監視設定の追加**を押して新規監視設定を追加します。
* ❸ 監視する項目と比較方法、しきい値、持続時間を入力した後、**追加**をクリックします。

### 監視設定の変更および削除

![notification_group_03_ja.png](https://static.toastoven.net/prod_rds/mariadb/23.04.11/notification_group_03_ja.png)

* ❶ ボタンをクリックすると、追加した監視設定を変更できます。
* ❷ ボタンをクリックすると、追加した監視設定を削除できます。
