## Database > RDS for MariaDB > サーバーダッシュボード

## サーバーダッシュボード

サーバーダッシュボードでパフォーマンス指標をチャート形式で視覚化できます。チャートはあらかじめ設定されたレイアウトに従って配置されます。指標は1分に1回収集され、最大1年間保管されます。集計単位別の保管期間は以下の通りです。

| 集計単位 | 保管期間 |
|------|------|
| 1分   | 1年   |

## レイアウト

レイアウトを利用してチャートのサイズと位置を表示できます。サービス起動時に`基本システム指標`と`基本MariaDB指標`を基本レイアウトとして提供します。基本レイアウトは変更または削除できません。また、チャートを追加したり、追加されたチャートを変更または削除することもできません。チャートで基本レイアウトに含まれていない情報を表示するには、新しいレイアウトを作成してチャートを追加できます。

![layout_01_ja](https://static.toastoven.net/prod_rds/mariadb/23.04.11/layout_01_ja.png)

❶ **レイアウト作成**をクリックすると、レイアウトを作成できるポップアップウィンドウが表示されます。
❷ レイアウト名を入力した後、**作成**を押してレイアウトを作成します。

### レイアウトにチャートを追加

![layout_02_ja](https://static.toastoven.net/prod_rds/mariadb/23.04.11/layout_02_ja.png)

❶ レイアウトを選択します。
❷ **チャートの追加**を押すと、チャートを追加できるポップアップウィンドウが表示されます。

![layout_03_ja](https://static.toastoven.net/prod_rds/mariadb/23.04.11/layout_03_ja.png)
❶ チェックボックスを選択して追加するチャートを複数選択できます。
❷ チャート名をクリックすると、左側の領域にチャートのプレビューが表示されます。
❸ **追加**をクリックすると、選択したチャートがすべて追加されます。

### レイアウトのチャート変更および削除

![layout_04_ja](https://static.toastoven.net/prod_rds/mariadb/23.04.11/layout_04_ja.png)

❶チャートの上部領域をクリックした後、ドラッグ＆ドロップして位置を移動できます。
❷ チャートの右下の領域をドラッグ＆ドロップして、チャートのサイズを変更できます。
❸ チャートの右上の**x**をクリックすると、レイアウトからチャートを削除します。

## チャート

DBインスタンスの各種性能指標をチャート形式で見ることができます。性能指標ごとにそれぞれ違う形のチャートで構成されています。基本的なシステム指標以外にMariaDBで提供する各種性能指標をチャートで提供しています。チャート別に確認できる指標は下記の通りです。

| チャート                       | 指標(単位)                                                                                                                               | 備考                                            |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| CPU使用率                     | cpu used (%)                                                                                                                         |                                               |
| CPU詳細                      | cpu user (%)<br/>cpu system (%)<br/>cpu nice (%)<br/>cpu IO wait (%)                                                                 |                                               |
| メモリ使用量                     | memory used (%)                                                                                                                      |                                               |
| メモリ詳細                      | memory used (bytes)<br/>memory free (bytes)                                                                                          |                                               |
| スワップ使用量                    | swap used (bytes)<br> swap total (bytes)                                                                                             |                                               |
| Storage使用量                 | storage used (%)                                                                                                                     |                                               |
| Storageの空き容量               | storage free (%)                                                                                                                     |                                               |
| Storage IO                 | disk read (bytes)<br> disk write (bytes)                                                                                             |                                               |
| ネットワークデータ送受信               | nic incoming (bytes)<br> nic outgoing (bytes)                                                                                        | MariaDBで使用する基本的なネットワーク転送が発生します。 |
| CPU平均負荷                    | 1m<br/>5m<br/>15m                                                                                                                    |                                               |
| Queries Per Second         | qps (count/sec)                                                                                                                      |                                               |
| Database Activity          | select (count/sec)<br/>insert (count/sec)<br/>update (count/sec)<br/>delete (count/sec)<br/>replace (count/sec)<br/>call (count/sec) |                                               |
| Buffer Pool                | Buffer Pool Total (MB)<br/>Buffer Pool Used (MB)                                                                                     |                                               |
| Slow Query                 | counts/min                                                                                                                           |                                               |
| 複製ディレイ                     | sec                                                                                                                                  |                                               |
| Row Access                 | index (counts/sec)<br/>full scan (counts/sec)                                                                                        |                                               |
| Database Connection Status | mariadb status                                                                                                          | 接続不可: 0、接続可能: 1                               |
| データストレージ障害                 | disk fault status                                                                                                                    | 異常: 0、正常: 1                                   |
| Replication Thread Status  | replication IO / SQL thread status                                                                                                   | 異常: 0、正常: 1                                   |

## サーバーグループ

サーバーグループを利用すると、1つのチャートで複数のDBインスタンスの性能指標を確認できます。サーバーグループに属するDBインスタンスごとに性能指標が1つのチャートに表示されます。複数の性能指標で構成されたチャートは、サーバーグループでは全て個別性能指標に変更されます。

### サーバーグループの作成

![chart_01_ja](https://static.toastoven.net/prod_rds/mariadb/23.04.11/chart_01_ja.png)

❶ **グループ追加**をクリックすると、グループを作成できるポップアップウィンドウが表示されます。
❷ サーバーグループに追加するDBインスタンスを選択します。

### サーバーグループの設定

サーバーダッシュボードの左側のサーバーリストにDBインスタンスとサーバーグループが一緒に表示されます。

![server_group_01_ja](https://static.toastoven.net/prod_rds/mariadb/23.04.11/server_group_01_ja.png)

❶ **+**、**-**を押してサーバーグループを展開したり、閉じたりすることができます。
❷ サーバーグループに属するDBインスタンスをクリックすると、チャートに表示される色を変更できる色選択ポップアップが表示されます。

![server_group_02_ja](https://static.toastoven.net/prod_rds/mariadb/23.04.11/server_group_02_ja.png)

❶ **:** サーバーリストの各項目の右側に表示されるメニューアイコンをクリックしてサーバーグループの変更または削除を行うことができます。
