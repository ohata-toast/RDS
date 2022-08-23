## Database > RDS for MySQL > モニタリング

DBインスタンスの各種性能指標とDBインスタンスに関連する作業中に発生する各種イベントをモニタリングできます。
サーバーダッシュボードを通して性能指標をチャート形式で確認できます。
通知グループに監視設定を行うと、特定指標の変化を検知して、その変更事項をメールまたはSMSで受け取ることができます。

## イベント

イベントはRDS for MySQLやユーザーによって発生した重要な出来事を意味します。イベントはイベントタイプ、発生日時、イベントソースとメッセージで構成されます。イベントはWebコンソールで照会可能で、購読することでメール、SMSでイベント発生通知を受け取ることができます。イベントのタイプと発生するイベントは以下の通りです。

| イベントタイプ | イベントコード | イベントメッセージ |
| --- | --- | --- |
| INSTANCE | INSTC_02_01 | DB Instance起動 |
| INSTANCE | INSTC_03_01 | DB Instance終了 |
| INSTANCE | INSTC_04_00 | DB Instance削除開始 |
| INSTANCE | INSTC_04_01 | DB Instance削除完了 |
| INSTANCE | INSTC_04_04 | DB Instance削除失敗 |
| INSTANCE | INSTC_05_00 | DB Instanceバックアップ開始 |
| INSTANCE | INSTC_05_01 | DB Instanceバックアップ完了 |
| INSTANCE | INSTC_05_04 | DB Instanceバックアップ失敗 |
| INSTANCE | INSTC_06_00 | DB Instance復元開始 |
| INSTANCE | INSTC_06_01 | DB Instance復元完了 |
| INSTANCE | INSTC_06_04 | DB Instance復元失敗 |
| INSTANCE | INSTC_07_01 | 自動バックアップ設定の有効化 |
| INSTANCE | INSTC_08_01 | 自動バックアップ設定の無効化 |
| INSTANCE | INSTC_09_00 | 詳細設定の変更開始 |
| INSTANCE | INSTC_09_01 | 詳細設定の変更完了 |
| INSTANCE | INSTC_09_04 | 詳細設定の変更失敗 |
| INSTANCE | INSTC_10_00 | バックアップ設定の変更開始 |
| INSTANCE | INSTC_10_01 | バックアップ設定の変更完了 |
| INSTANCE | INSTC_10_04 | バックアップ設定の変更失敗 |
| INSTANCE | INSTC_11_01 | ユーザーアクセス制御の変更完了 |
| INSTANCE | INSTC_12_00 | DB構成の変更開始 |
| INSTANCE | INSTC_12_01 | DB構成の変更完了 |
| INSTANCE | INSTC_12_04 | DB構成の変更失敗 |
| INSTANCE | INSTC_13_01 | Floating IP接続 |
| INSTANCE | INSTC_14_01 | Floating IP接続解除 |
| INSTANCE | INSTC_15_00 | DB Instance複製開始 |
| INSTANCE | INSTC_15_01 | DB Instance複製完了 |
| INSTANCE | INSTC_15_04 | DB Instance複製失敗 |
| INSTANCE | INSTC_16_00 | DB Instance昇格開始 |
| INSTANCE | INSTC_16_01 | DB Instance昇格完了 |
| INSTANCE | INSTC_16_04 | DB Instance昇格失敗 |
| INSTANCE | INSTC_21_01 | DB Instance正常化 |
| INSTANCE | INSTC_22_01 | DB Instance容量不足 |
| INSTANCE | INSTC_23_01 | DB Instance接続失敗 |
| INSTANCE | INSTC_24_00 | インスタンスタイプの変更開始 |
| INSTANCE | INSTC_24_01 | インスタンスタイプの変更完了 |
| INSTANCE | INSTC_24_04 | インスタンスタイプの変更失敗 |
| INSTANCE | INSTC_25_00 | Storage拡張開始 |
| INSTANCE | INSTC_25_01 | Storage拡張完了 |
| INSTANCE | INSTC_25_04 | Storage拡張失敗 |
| INSTANCE | INSTC_26_00 | failover発生 |
| INSTANCE | INSTC_26_01 | failover完了 |
| INSTANCE | INSTC_26_04 | failover失敗 |
| INSTANCE | INSTC_27_01 | DB Instance容量確保 |
| INSTANCE | INSTC_28_01 | HA DB Instance起動 |
| INSTANCE | INSTC_29_01 | HA DB Instance終了 |
| INSTANCE | INSTC_30_01 | 複製中断 |
| INSTANCE | INSTC_34_01 | 高可用性の一時停止 |
| INSTANCE | INSTC_34_04 | 高可用性の一時停止失敗 |
| INSTANCE | INSTC_35_01 | 高可用性の再開始 |
| INSTANCE | INSTC_35_04 | 高可用性の再開始失敗 |
| INSTANCE | INSTC_36_01 | フェイルオーバーを利用したインスタンスの再起動完了 |
| INSTANCE | INSTC_36_04 | フェイルオーバーを利用したインスタンスの再起動失敗 |
| INSTANCE | INSTC_37_01 | DB User作成 |
| INSTANCE | INSTC_37_04 | DB User作成失敗 |
| INSTANCE | INSTC_38_01 | DB User変更 |
| INSTANCE | INSTC_38_04 | DB User変更失敗 |
| INSTANCE | INSTC_39_01 | DB User削除 |
| INSTANCE | INSTC_40_01 | DBスキーマ作成 |
| INSTANCE | INSTC_40_04 | DBスキーマ作成失敗 |
| INSTANCE | INSTC_41_01 | DBスキーマ削除 |
| INSTANCE | INSTC_47_00 | DBインスタンスのバックアップおよびエクスポート開始 |
| INSTANCE | INSTC_47_01 | DBインスタンスのバックアップおよびエクスポート完了 |
| INSTANCE | INSTC_47_04 | DBインスタンスのバックアップおよびエクスポート失敗 |
| INSTANCE | INSTC_48_00 | オブジェクトストレージにあるバックアップでDBインスタンス復元開始 |
| INSTANCE | INSTC_48_01 | オブジェクトストレージにあるバックアップでDBインスタンス復元完了 |
| INSTANCE | INSTC_48_04 | オブジェクトストレージにあるバックアップでDBインスタンス復元失敗 |
| INSTANCE | INSTC_49_00 | DBインスタンス強制再起動実行 |
| INSTANCE | INSTC_50_00 | バックアップのエクスポート開始 |
| INSTANCE | INSTC_50_01 | バックアップのエクスポート完了 |
| INSTANCE | INSTC_50_04 | バックアップのエクスポート失敗 |
| INSTANCE | INSTC_51_01 | ユーザークエリ遅延によるバックアップ失敗 |
| INSTANCE | INSTC_52_01 | ユーザークエリ遅延によるバックアップおよびエクスポート失敗 |
| BACKUP | BACUP_02_01 | バックアップ削除完了 |
| BACKUP | BACUP_04_00 | Object Storageアップロード開始 |
| BACKUP | BACUP_04_01 | Object Storageアップロード完了 |
| BACKUP | BACUP_04_04 | Object Storageアップロード失敗 |
| BACKUP | BACUP_05_00 | バックアップのエクスポート開始 |
| BACKUP | BACUP_05_01 | バックアップのエクスポート完了 |
| BACKUP | BACUP_05_04 | バックアップのエクスポート失敗 |
| BACKUP | BACUP_06_01 | ユーザークエリ遅延によるバックアップ失敗 |
| TENANT | TENAT_01_04 | CPUコア数制限 |
| TENANT | TENAT_02_04 | RAM容量制限 |
| TENANT | TENAT_03_04 | 個別ボリュームサイズ制限 |
| TENANT | TENAT_04_04 | プロジェクト全体ボリュームサイズ制限 |
| TENANT | TENAT_05_04 | Read Only Slave数制限 |

### イベント購読

イベントを購読すると、イベント発生時にメールおよびSMSで通知を受け取ることができます。イベント購読に接続されたユーザーグループのユーザーに通知を送信します。イベントタイプ、イベントコード、イベントソースに細分化して購読できます。通知を中断するにはイベント購読の有効/無効を修正します。有効になっていなければ通知を送信しません。

## サーバーダッシュボード

サーバーダッシュボードで性能指標をチャート形式で視覚化して確認できます。指標は1分に1回収集され、最大1年間保管されます。指標データは1分、5分、30分、2時間、1日単位の平均値で集計されます。

### レイアウト

チャートを表示するためにレイアウトを先に構成する必要があります。レイアウトは複数のチャートで構成され、各チャートの位置とサイズを保存します。 
RDS for MySQLは**基本システム指標**、**基本MySQL指標**2個の基本レイアウトを提供します。基本レイアウトはユーザーが修正、削除できません。

### チャート

DBインスタンスの各種性能指標をチャート形式で確認できます。性能指標ごとに異なる形式のチャートで構成されています。
RDS for MySQLでサポートするチャートは以下の通りです。

| チャート | 指標(単位) |
| --- | --- |
| CPU使用率 | cpu used (%) |
| CPU詳細 | cpu user (%)<br> cpu system (%)<br>cpu nice (%)<br>cpu IO wait(%) |
| メモリ使用量 | memory used (%) |
| メモリ詳細 | memory used (bytes)<br> memory buffers (bytes)<br> memory cached (bytes)<br> memory free (bytes) |
| スワップ使用量 | swap used (bytes)<br> swap total (bytes) |
| Storage使用量 | storage used (%) |
| Storage IO | disk read (bytes)<br> disk write (bytes) |
| ネットワークデータ送受信 | nic incoming (bytes)<br> nic outgoing (bytes) |
| CPU平均負荷 | 1m<br> 5m<br> 15m |
| Queries Per Second | qps |
| Connection | total<br> running<br> cached |
| Connection Ratio | ratio (%) |
| Database Activity | select<br> insert<br> update<br> delete<br> replace<br> call<br> |
| Buffer Pool | buffer pool total (bytes)<br> buffer pool used (%) |
| Slow Query | counts |
| 複製ディレイ | sec (秒) |
| Row Access | index<br> full scan |

## 通知グループ

通知グループを通して性能指標の通知を受け取ることができます。
通知グループに監視対象インスタンスと通知を受け取るユーザーグループを指定します。
監視設定を通して通知を受け取る性能指標のしきい値と条件を設定します。
設定された指標が監視設定の条件を満たすと接続されたユーザーグループに通知を送信します。
通知グループに設定された通知タイプに基づいてSMSまたはメールで通知を送信します。

### 監視設定

監視設定は項目と比較方法、しきい値、持続時間で構成されます。監視設定の持続時間は重要な要素です。持続時間は監視対象が指定したしきい値に到達した後、その状態が持続する時間を条件に指定する時に使用します。例えば、CPU使用率のしきい値が90%以上で持続時間が5分の場合、該当通知グループと連動したサーバーのCPU使用率が90%以上の状態が5分以上持続した時、ユーザーグループに定義されたユーザーに通知を送ります。もしCPU使用率が90%以上になっても5分以内に90%未満に減少した場合は通知が発生しません。

## ユーザーグループ

通知を受け取るユーザーをグループで管理できます。通知対象は必ずプロジェクトメンバーに登録されている必要があります。
ユーザーグループに属すユーザーがプロジェクトメンバーから除外されると、ユーザーグループに属していたとしても通知を受け取れません。

> [注意]実名認証を行っておらず携帯電話情報がない場合はSMS通知を受け取れません。
