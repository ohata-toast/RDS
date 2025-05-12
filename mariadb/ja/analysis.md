## Database > RDS for MariaDB > 分析

## Process List、InnoDB Status

データベースで実行されたクエリとInnoDBエンジンの状態を収集します。1秒に1回`information_schema.processlist`の結果と、`SHOW ENGINE INNODB STATUS`の結果を収集し、過去4日間のデータをコンソールの分析タブで照会できます。

> [参考]収集されたデータは、内部バックアップストレージに保存され、別途課金されることはありません。

収集する項目は次のとおりです。

| 項目            | 説明                                             |
|---------------|------------------------------------------------|
| LogTime       | 収集時刻                                           |
| PID           | プロセスID                                         |
| DB            | 使用中のDB                                         |
| User          | ユーザー                                           |
| Host          | ユーザーが接続しているホスト名、IPアドレス                         |
| Command       | Thread実行中のコマンドタイプ(Sleep、Query、Quit、Killなど)     |
| State         | Threadの状態(Starting、Rolling back、System lockなど) |
| ExecTime      | Threadが現在の状態を維持した時間(秒)                         |
| Query         | 実行中のクエリ                                        |
| InnoDB Status | InnoDBの状態情報                                    |

## Slow Query

データベースで発生したSlow Queryを分析して結果を収集します。Perconaが提供するクエリ分析ツールであるpt-query-digestを使用して、1分に1回分析することで過去30日間のデータをコンソールの分析タブで照会できます。

> [参考] DBインスタンスの修正画面でSlow Query分析機能を使用しないように設定できます。

収集する項目は次のとおりです。

| 項目             | 説明                          |
|----------------|-----------------------------|
| Checksum       | 抽象化されたクエリに対するChecksum       |
| Total ExecTime | 合計実行時間(秒)                   |
| Avg ExecTime   | 平均実行時間(秒)                   |
| Max ExecTime   | 最大実行時間(秒)                   |
| Min ExecTime   | 最小実行時間(秒)                   |
| Query Count    | 発生したクエリ数                    |
| Query          | 類似したクエリ同士を結合できるように抽象化されたクエリ |

> [注意]
> slow_query_logパラメータの値が0日の場合、Slow Queryログを残さず、分析結果も収集しません。
> DBインスタンスの負荷が大きい場合、Slow Query分析が遅延することや分析結果が消失することがあります。
