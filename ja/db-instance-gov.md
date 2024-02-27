## Database > RDS for MySQL > DBインスタンス

## DBインスタンス

DBインスタンスは仮想機器とインストールされたMySQLを包括する概念で、 RDS for MySQLが提供するMySQLの単位です。
DBインスタンスのOSに直接アクセスすることはできず、DBインスタンス作成時に入力したポートを介してデータベースにのみアクセスできます。使用できるポート範囲には以下のような制約事項があります。

* 使用できるポート範囲は3306～43306の間です。

DBインスタンスは、顧客が付与する名前と自動的に付与される32バイトのIDで識別されます。
DBインスタンス名は下記のような制約事項があります。

* DBインスタンス名はリージョンごとに一意でなければなりません。
* DBインスタンス名は1～100文字の間の英字、数字、一部の記号(-, _, .)のみ使用でき、最初の文字は英字のみ使用できます。

DBインスタンスは作成時にユーザーアカウントとパスワードを設定する必要があり、下記のような制約があります。

* ユーザーアカウントは1～32文字の間の文字でなければなりません。
* パスワードは4～16文字の間の文字でなければなりません。

### アベイラビリティゾーン

NHN Cloudは、物理的なハードウェアの問題で生じる障害に備えるため、システム全体を複数のアベイラビリティゾーンに分けています。このアベイラビリティゾーンごとに、ストレージシステム、ネットワークスイッチ、ラック、電源装置がすべて別々に構成されています。1つのアベイラビリティゾーン内で起こる障害は他のアベイラビリティゾーンに影響を与えないため、サービス全体の可用性が高くなります。DBインスタンスを複数のアベイラビリティゾーンに分けて構築すれば、サービスの可用性をさらに高めることができます。複数のアベイラビリティゾーンに分散して作成されたDBインスタンス同士でネットワーク通信が可能で、この時発生するネットワーク使用費用は請求されません。

> [注意]
> すでに作成したDBインスタンスのアベイラビリティゾーンは変更できません。

### DBエンジン

以下に明示されたバージョンを使用できます。

| バージョン        | 備考                                                   |
|--------------|------------------------------------------------------|
| <strong>8.0</strong> ||
| MySQL 8.0.35 |                                                      |
| MySQL 8.0.34 |                                                      | 
| MySQL 8.0.33 |                                                      |
| MySQL 8.0.32 |                                                      | 
| MySQL 8.0.28 |                                                      | 
| MySQL 8.0.23 |                                                      |
| MySQL 8.0.18 |                                                      |
| <strong>5.7</strong> ||
| MySQL 5.7.37 |                                                      |
| MySQL 5.7.33 | 外部のバックアップでDBインスタンスを復元できません。                          |
| MySQL 5.7.26 |                                                      |
| MySQL 5.7.19 |                                                      |
| MySQL 5.7.15 |                                                      |
| <strong>5.6</strong> ||
| MySQL 5.6.33 | 新規DBインスタンスを作成できません。既存DBインスタンスのリードレプリカ作成、復元のみサポートします。 |

DBエンジンの場合、作成後、Webコンソールの修正機能でバージョンアップが可能です。
DBエンジンの詳細は[DBエンジン](db-engine/)で確認できます。

### DBインスタンスタイプ

DBインスタンスはタイプごとに異なるCPUコア数とメモリ容量を持っています。
DBインスタンス作成時、データベースのワークロードに応じて適切なDBインスタンスタイプを選択する必要があります。

| タイプ | 説明                                                    |
|-----|-------------------------------------------------------|
| m2  | CPUとメモリをバランスよく設定したタイプです。                              |
| c2  | CPUのパフォーマンスを高く設定したインスタンスタイプです。                        |
| r2  | 他のリソースに比べてメモリの使用量が多い場合に使用できます。                        |
| x1  | 高スペックのCPUとメモリをサポートするタイプです。高性能が必要なサービスやアプリケーションに使用します。 |

作成済みのDBインスタンスのタイプはWebコンソールから簡単に変更できます。

> [注意]
> 作成済みのDBインスタンスのタイプを変更すると、DBインスタンスが終了するため、多少の中断時間が発生します。

### DBインスタンスの状態

DBインスタンスの状態は下記のような値で構成され、ユーザーの行為と現在の状態によって変更されます。

| 状態                | 説明                                              |
|-------------------|-------------------------------------------------|
| BEFORE_CREATE     | 作成前                                             |
| AVAILABLE         | 使用可能                                            |
| STORAGE_FULL      | 容量不足                                            |
| FAIL_TO_CREATE    | 作成失敗                                            |
| FAIL_TO_CONNECT   | 接続失敗                                            |
| REPLICATION_STOP  | 複製中断                                            |
| FAILOVER          | フェイルオーバー完了                                      |
| FAILOVER_SHUTDOWN | フェイルオーバー完了(停止), 2023年4月11日以前にフェイルオーバーしたDBインスタンス |
| SHUTDOWN          | 停止した                                            |

### DBインスタンス作業

DBインスタンスで実行される作業は下記のような値で構成され、Webコンソールの操作または事前に指定された自動化バッチに基づいて作業が始まります。

| 作業                      | 説明              |
|--------------------------|------------------|
| APPLYING_PARAMETER_GROUP | パラメータグループの適用中    |
| BACKING_UP               | バックアップ中            |
| CANCELING                | キャンセル中            |
| CREATING                 | 作成中            |
| CREATING_SCHEMA          | DBスキーマの作成中	     |
| CREATING_USER            | ユーザーの作成中	        |
| DELETING                 | 削除中            |
| DELETING_SCHEMA          | DBスキーマの削除中     |
| DELETING_USER            | ユーザーの削除中        |
| EXPORTING_BACKUP         | バックアップのエクスポート中       |
| FAILING_OVER             | フェイルオーバー中         |
| MIGRATING                | マイグレーション中        |
| MODIFYING                | 修正中            |
| NONE                     | なし               |
| PREPARING                | 準備中            |
| PROMOTING                | 昇格中            |
| PROMOTING_FORCIBLY       | 強制昇格中         |
| REBUILDING               | 再構築中           |
| REPAIRING                | 復旧中            |
| REPLICATING              | 複製中            |
| RESTARTING               | 再起動中           |
| RESTARTING_FORCIBLY      | 強制再起動中        |
| RESTORING                | 復元中            |
| STARTING                 | 起動中            |
| STOPPING                 | 停止中            |
| SYNCING_SCHEMA           | DBスキーマの同期中    |
| SYNCING_USER             | ユーザーの同期中	       |
| UPDATING_USER            | ユーザーの修正中	        |
| WAIT_MANUAL_CONTROL      | フェイルオーバー手動制御待機中 |

> [注意]
> DBインスタンスは一度に1つの作業しか処理できません。
> 同時に作業をリクエストした場合、先にリクエストした作業のみ成功し、後にリクエストした作業はすべて失敗することになります。
> リクエストに失敗した作業は、イベント画面で確認できます。

### データストレージ

DBインスタンスはHDD、SSDの2種類のデータストレージタイプをサポートします。データストレージの種類によって性能と価格が異なるため、データベースのワークロードに応じて適切なタイプを選択する必要があります。データストレージは20GB～2TBで作成できます。

### データストレージサイズの拡張

DBインスタンスのストレージの種類は変更できませんが、ストレージサイズはWebコンソールで簡単に拡張できます。ストレージサイズの拡張過程でDBインスタンスが終了し、サービス負荷に応じて多少のダウンタイムが発生します。リードレプリカが存在する場合、マスターのストレージサイズ拡張時にリードレプリカのストレージサイズも一緒に拡張されます。読み取りレプリカが複数台ある場合、ストレージサイズの拡張は順次行われます。ストレージサイズの拡張中にエラーが発生した場合、一部のリードレプリカのストレージサイズが拡張されない場合があり、拡張に失敗したリードレプリカの場合、その後個別に拡張できます。ストレージサイズは現在のサイズより小さく変更することはできません。

### ネットワーク

DBインスタンスのデータストレージの種類は変更できませんが、データストレージのサイズはWebコンソールで簡単に拡張できます。データストレージサイズの拡張過程でDBインスタンスが終了し、サービス負荷によって多少のダウンタイムが発生します。 リードレプリカが存在する場合、マスターのデータストレージサイズを拡張すると、リードレプリカのデータストレージサイズも一緒に拡張されます。リードレプリカが複数ある場合、データストレージサイズの拡張は順次行われます。データストレージサイズの拡張中にエラーが発生した場合、一部のリードレプリカのデータストレージサイズが拡張されない場合があり、拡張に失敗したリードレプリカの場合、その後個別に拡張可能です。データストレージのサイズは、現在のサイズより小さく変更することはできません。

> [注意]
> 作成済みのDBインスタンスのサブネットは変更できません。

### Floating IP

外部からDBインスタンスにアクセスするには、Floating IPをDBインスタンスに接続する必要があります。Internet Gatewayが接続されたサブネットを接続する場合のみFloating IPを作成できます。Floating IPは使用と同時に課金され、これとは別にFloating IPを介したインターネット方向のトラフィックが発生する場合は別途課金されます。

### DBセキュリティグループ

DBセキュリティグループは、外部からの侵入に備えて接続を制限するために使用します。送受信トラフィックに対して特定のポート範囲あるいはデータベースポートに対してアクセスを許可できます。DBインスタンスに複数のDBセキュリティグループを適用できます。DBセキュリティグループの詳しい説明は[DBセキュリティグループ](db-security-group.md)を参照してください。

### バックアップ

DBインスタンスのデータベースを定期的にバックアップするように設定したり、Webコンソールから好きなタイミングでバックアップを作成できます。バックアップが実行されている間、パフォーマンスの低下が発生する場合があります。サービスに影響を与えないように、サービスの負荷が少ない時間にバックアップすることを推奨します。バックアップによる性能低下を望まない場合は、高可用性構成を使用するか、読み取りレプリカでバックアップを実行できます。バックアップファイルは内部バックアップストレージに保存され、バックアップ容量に応じて課金されます。必要に応じて、NHN Cloudのユーザーオブジェクトストレージにエクスポートできます。予期せぬ障害に備えるため、定期的にバックアップを行うように設定することを推奨します。バックアップの詳細については、[バックアップと復元](backup-and-restore.md)を参照してください。

### 復元

バックアップを利用して新しいDBインスタンスを作成できます。バックアップを実行したDBインスタンスとバイナリログ(binary log)が存在する場合、特定の時点あるいは希望のバイナリログ(binary log) positionに復元が可能です。RDS for MySQLではなく、外部MySQLのバックアップでも復元が可能です。復元時には常に新しいDBインスタンスが作成され、既存のDBインスタンスのデータベースを消去して復元することはできません。復元に関する詳しい説明は[バックアップと復元](backup-and-restore.md)を参照してください。

### 基本通知

DBインスタンス作成時、基本通知を設定できます。基本通知を設定すると、`{{DBインスタンス名}-default`という名前で新しい通知グループが作成され、下記の通知項目が自動で設定されます。基本通知として作成された通知グループは自由に修正、削除できます。通知グループについての詳しい説明は[通知グループ](notification-group.md)を参照してください。

| 項目                         | 比較方法  | しきい値          | 持続時間 |
|----------------------------|-------|---------------|------|
| CPU使用率                     | &gt;= | 80%           | 5分   |
| Storageの空き容量               | &lt;= | 5,120MB       | 5分   |
| Database Connection Status | &lt;= | 0             | 0分   |
| Storage使用量                 | &gt;= | 95%           | 5分   |
| データストレージ障害                   | &lt;= | 0             | 0分  |
| Connection Ratio           | &gt;= | 85%           | 5分   |
| メモリ使用量                     | &gt;= | 90%           | 5分   |
| Slow Query                 | &gt;= | 60 counts/min | 5分   |

### DBインスタンスの停止

DBインスタンスを一定時間使用しないが、削除を望まない場合、停止することができます。停止されたDBインスタンスの仮想機器は終了され、再起動するまでは使用できません。停止した状態のDBインスタンスは、停止した瞬間から90日間割引された料金が課金され、90日が過ぎた時点からは通常料金が課金されます。不要な料金が請求されないように、使用しないDBインスタンスは必ず削除してください。

> [参考]
> 高可用性DBインスタンス、読み取りレプリカを持っているマスター、読み取りレプリカは停止できません。
> DBインスタンスがFloating IPを使用している場合、停止に関係なくFloating IPの料金が課金されます。

### リードレプリカの作成

読み取り性能を高めるために、読み取り専用に使用できるリードレプリカを作成できます。リードレプリカは1つのマスターに対して最大5台まで作成できます。リードレプリカのリードレプリカは作成できません。リードレプリカは、マスターと同じ仕様またはより高い仕様で作成することを推奨します。低い仕様で作成すると、複製遅延が発生する場合があります。

> [注意]
> リードレプリカ作成時、マスターのI/O性能が通常より低くなることがあります。
> マスターのデータベースサイズに比例して、リードレプリカの作成時間が長くなることがあります。

> [参考]
> リードレプリカの作成過程で必要なバイナリログ(binary log)サイズ分、バックアップストレージ課金が発生する可能性があります。

#### 異なるリージョンのサブネットにリードレプリカ作成
* 異なるリージョンに存在するVPC間のリージョンピアリングを接続すると、他のリージョンVPCに属するサブネットにリードレプリカを作成できます。
* リージョンピアリングが接続されていても、ルート設定が正しくない場合、リードレプリカの作成に失敗したり、複製が中断されることがあります。
* リージョンピアリングの接続に関する詳細については、[リージョンピアリング](https://docs.nhncloud.com/ja/Network/Peering%20Gateway/ja/console-guide/#_2)項目を参照してください。

### リードレプリカの昇格

マスターとの複製関係を切って、リードレプリカをマスターに変更することを昇格と呼びます。昇格したマスターは、独立したDBインスタンスとして動作します。昇格しようとするリードレプリカとマスターの間に複製遅延がある場合、その遅延がなくなるまで昇格されません。

### リードレプリカの強制昇格

マスターや原本リージョンの状態に関係なく、リードレプリカの現時点のデータで強制昇格します。

### リードレプリカの複製中断

リードレプリカは、さまざまな理由で複製が中断されることがあります。リードレプリカの状態が`複製中断`の場合、すぐに原因を確認して正常化する必要があります。`複製中断`状態が長時間続く場合、複製ディレイが長くなります。正常化に必要なバイナリログ(binary log)がない場合、リードレプリカを再構築する必要があります。複製が中断した原因はリードレプリカで`SHOW SLAVE STATUS`コマンドを使用して確認できます。`Last_Errno`の値が1062の場、以下のProcedureをエラーが消えるまで呼び出せます。

```
mysql> CALL mysql.tcrds_repl_skip_repl_error();
```

### リードレプリカの再構築

リードレプリカの複製中断を解決できない状況の場合、再構築により正常化できます。リードレプリカの再構築時、リードレプリカのデータベースをすべて削除し、マスターのデータベースを基に再構築します。この過程で再構築に必要なバックアップファイルがマスターに存在しない場合、マスターでバックアップが行われ、バックアップによる性能低下が発生する可能性があります。

### 強制再起動

DBインスタンスのMySQLが正常に動作しない場合、強制的に再起動できます。強制再起動の場合、MySQLにSIGTERMコマンドを実行して正常終了するのを10分間待ちます。10分以内にMySQLが正常終了したら仮想マシンを再起動します。 10分以内に正常終了しない場合は仮想マシンを強制的に再起動します。仮想マシンが強制的に再起動されると、作業中の一部のトランザクションが失われる可能性があり、データボリュームが破損して復旧ができなくなる可能性があります。強制再起動後、DBインスタンスの状態が使用可能な状態に戻らない場合があります。このような状況が発生した場合は、カスタマーセンターにお問い合わせください。

> [注意]
> データが失われたり、データボリュームが破損する可能性があるため、この機能は緊急かつ不可避な状況以外では使用を控えてください。

> [参考]
> 高可用性DBインスタンスの場合は強制再起動できません。

### 容量確保

急激な負荷でバイナリログ(binary log)が過剰に生成され、データストレージの容量が不足する場合、Webコンソールの容量確保機能を利用してバイナリログを削除できます。Webコンソールで容量確保を選択すると、DBインスタンスのバイナリログを選択できるポップアップ画面が表示されます。バイナリログを選択した後、OKを押して選択した項目より前に生成された全てのバイナリログを削除します。容量確保機能は一時的に容量を確保する機能です。継続して容量が不足する場合は、サービス負荷に合わせてバイナリログの保存期間を設定するか、データストレージのサイズを拡張する必要があります。

> [参考]
> MySQL 5.7バージョン以下では`expire_logs_days`、MySQL 5.8バージョン以上では`binlog_expire_logs_seconds`パラメータでバイナリログ(binary log)の保存期間を設定できます。

> [注意]
> 削除されたバイナリログ(binary log)によっては、特定の時点への復元ができない場合があります。

### パラメータグループの変更内容を適用

DBインスタンスに接続されたパラメータグループのパラメータが修正された場合、その修正を反映する必要があります。変更されたパラメータを適用するために再起動が必要な場合、DBインスタンスが再起動されます。パラメータグループの詳細については、[パラメータグループ](parameter-group.md)を参照してください。

### DBスキーマ&ユーザー直接制御

RDS for MySQLではDBスキーマとユーザーを簡単に管理できるようにWebコンソールで管理機能を提供していますが、ユーザーが直接制御できるように設定する機能も提供しています。WebコンソールのDBインスタンス修正画面でDBスキーマ＆ユーザー直接制御の項目で設定できます。
* 直接制御を使用すると、現在作成されているすべてのユーザーに下記の権限を付与します。

```sql
GRANT CREATE,DROP,LOCK TABLES,REFERENCES,EVENT,ALTER,INDEX,INSERT,SELECT,UPDATE,DELETE,CREATE VIEW,SHOW VIEW,CREATE ROUTINE,ALTER ROUTINE,EXECUTE,CREATE USER,PROCESS,RELOAD,REPLICATION SLAVE,REPLICATION CLIENT,SHOW DATABASES, CREATE TEMPORARY TABLES,TRIGGER ON *.* TO '{user_id}'@'{host}' WITH GRANT OPTION;
```

직접 제어 사용 이후 다시 사용 안 함으로 변경했을 때 주의할 점
* 기존에 부여했던 권한들을 회수하지 않습니다. 이때 명령어를 사용해 DB 스키마나 사용자를 추가한다면 웹 콘솔의 데이터와 정합성이 맞지 않을 수 있습니다.
* 사용자에게 부여된 권한과 상관없이 데이터베이스에 존재하는 모든 사용자는 CUSTOM 권한으로 표현됩니다.

## 高可用性DBインスタンス

高可用性DBインスタンスは可用性とデータ耐久性を増加させ、障害許容が可能なデータベースを提供します。高可用性DBインスタンスはマスター、予備マスターで構成され、異なるアベイラビリティゾーンに作成されます。予備マスターは障害に備えたDBインスタンスで、通常は使用できません。高可用性DBインスタンスの場合、予備マスターでバックアップが行われます。

> [参考]
> 高可用性DBインスタンスの場合、MySQLクエリ文を使用して他のDBインスタンスまたは外部MySQLのMasterから強制的に複製するように設定すると、高可用性および一部の機能が正常に動作しません。

### 障害検出

予備マスターには障害を検出するためのプロセスが存在し、定期的にマスターの状態を検出します。このような検出周期をPing間隔と呼び、4回連続状態チェックに失敗した場合、フェイルオーバーを実行します。Ping間隔が短いほど障害に敏感に反応し、Ping間隔が長いほど障害に鈍感に反応します。サービス負荷に合わせて適切なPing間隔を設定することが重要です。

> [参考]
> マスターのデータストレージ使用量がいっぱいになると、高可用性監視プロセスが障害として検出し、フェイルオーバーを実行するので注意してください。

### 自動フェイルオーバー

予備マスターでマスターの状態チェックに4回連続失敗した場合、マスターがサービスを提供できないと判断し、自動的にフェイルオーバーを実行します。スプリットブレイン防止のため、障害が発生したマスターに割り当てられたすべてのユーザーセキュリティグループの接続を解除して外部からの接続を遮断し、予備マスターがマスターの役割を代行します。接続のための内部ドメインのA
recordは障害が発生したマスターから予備マスターに変更されるので、アプリケーションの変更は必要ありません。フェイルオーバーが完了すると、障害が発生したマスターの種類はフェイルオーバーが発生したマスターに、予備マスターの種類はマスターに変更されます。フェイルオーバーが発生したマスターを復旧または再構築するまでフェイルオーバーは実行されません。昇格されたマスターは、フェイルオーバーが発生したマスターのすべての自動バックアップを継承します。フェイルオーバーの過程でマスターが変更されると、バイナリログがすべて削除されるため、既存のバックアップを利用した時点復元はサポートされません。昇格されたマスターで新規にバックアップが行われた時点から時点復元を行うことができます。

> [参考]
> 高可用性機能はドメインに基づいているため、接続をしようとするクライアントがDNSサーバーに接続できないネットワーク環境の場合、ドメインを介してDBインスタンスに接続することができず、フェイルオーバー発生時、正常な接続ができません。
> 内部ドメインのA recordの変更が反映されるのに約3秒程度かかります。所要時間は、接続を試みるクライアント環境のDNS Cacheポリシーによって異なる場合があります。

> [注意]
> マスターと予備マスター間のバイナリログ(binary log)のposition numberの値が100,000,000,000以上差がある場合、フェイルオーバーが行われません。

### フェイルオーバーが発生したマスター

障害が発生してフェイルオーバーが発生したマスターをフェイルオーバーが発生したマスターといいます。フェイルオーバーが発生したマスターの自動バックアップは行われず、フェイルオーバーが発生したマスターの復旧、再構築、分離、削除を除く他のすべての機能は実行できません。

### フェイルオーバーが発生したマスターの復旧

フェイルオーバーの過程でデータの整合性が崩れず、障害が発生した時点から復旧を試みる時点までバイナリログ(binary log)が失われなければフェイルオーバーが発生したマスターと昇格したマスターを再び高可用性構成で復旧できます。フェイルオーバーが発生したマスターのデータベースをそのまま昇格されたマスターと複製関係を再設定するため、データの整合性が崩れたり復旧に必要なバイナリログ(binary log)が失われた場合、復旧は失敗します。フェイルオーバーが発生したマスターの復旧に失敗した場合、再構築を通じて再び高可用性機能を有効にできます。

> [参考]
> 2023年4月11日以前にフェイルオーバーが発生したDBインスタンスの場合、復旧をサポートしません。

### フェイルオーバーが発生したマスターの再構築

フェイルオーバーが発生したマスターの復旧に失敗した場合、再構築を利用して再び高可用性機能を有効にできます。再構築は復旧とは異なり、フェイルオーバーが発生したマスターのデータベースを全て削除し、昇格されたマスターのデータベースを基に再構築します。この過程で再構築に必要なバックアップファイルが昇格されたマスターに存在しない場合、バックアップが行われ、バックアップによる性能低下が発生する可能性があります。

### フェイルオーバーが発生したマスター分離

フェイルオーバーが発生したマスターの復旧に失敗してデータ補正が必要な場合、そのマスターを分離して高可用性機能を無効にできます。分離されたマスターと昇格されたマスター間の複製関係が切断され、それぞれ一般DBインスタンスとして動作します。分離後は既存の構成に戻せません。

### 手動フェイルオーバー

高可用性DBインスタンスの場合、再起動を伴う作業を実行すると、フェイルオーバーを利用した再起動を行うかどうかを選択でき、その作業は次のとおりです。

* DBインスタンスの再起動
* DBインスタンスタイプの変更
* パラメータグループの変更
* 再起動が必要なパラメータが変更された場合
* パラメータグループの変更事項反映
* データストレージサイズの変更

フェイルオーバーを利用した再起動を行うと、予備マスターを先に再起動します。その後、フェイルオーバーにより予備マスターをマスターに昇格させ、既存のマスターは予備マスターの役割をすることになります。昇格時に接続のための内部ドメインのA recordはマスターから予備マスターに変更されるので、アプリケーションの変更は必要ありません。昇格されたマスターは、以前のマスターのすべての自動バックアップを継承します。フェイルオーバーの過程でマスターが変更され、バイナリログ(binary log)がすべて削除されるため、既存のバックアップを利用した時点復元はサポートしません。昇格されたマスターで新規にバックアップが行われた時点から時点復元を行うことができます。

> [参考]
> フェイルオーバーを利用して再起動を行わなければ、マスターと予備マスターが順次再起動します。

> [注意]
> 予備マスターの複製ディレイ`Seconds_Behind_Master`の値が1以上の場合、手動フェイルオーバーが失敗します。複製ディレイにより再起動が失敗した場合はイベント画面で確認できます。

### 高可用性の一時停止

一時的な作業による接続中断や大量の負荷が予想される状況で、一時的に高可用性機能を停止できます。高可用性機能が一時停止されると、障害を検出しないため、フェイルオーバーを実行しません。高可用性機能が一時停止した状態で再起動が必要な作業を実行しても一時停止された高可用性機能が再開されません。高可用性機能が一時停止するとデータ複製は正常に行われず、障害が検出されないため、長時間一時停止状態に維持することは推奨しません。

### 予備マスター再構築

ネットワークの切断、誤ったFEDERATEDエンジンの使用、他のマスターからの複製設定など、さまざまな原因で予備マスター複製が中断されることがあります。複製中断状態の予備マスターは自動フェイルオーバーが実行されません。予備マスターの複製中断を解決するには予備マスターを再構築する必要があります。予備マスターの再構築時には予備マスターのデータベースをすべて削除し、マスターのデータベースを基に再構築します。この過程で再構築に必要なバックアップファイルがマスターデータベースに存在しない場合、マスターでバックアップが行われ、バックアップによる性能低下が発生する可能性があります。

### 예비 마스터 승격

예비 마스터도 읽기 복제본과 마찬가지로 마스터와의 복제 관계를 끊고 마스터로 승격시킬 수 있습니다. 고가용성을 해제하고 읽기 복제본으로 변경 후, 읽기 복제본 승격과 동일한 작업을 진행합니다. 승격하려는 예비 마스터와 마스터 사이에 복제 지연이 있는 경우, 해당 지연이 없어질 때까지 승격되지 않습니다.

### 예비 마스터 강제 승격

마스터의 상태와 상관없이 예비 마스터의 현재 시점 데이터로 강제 승격합니다.

## MySQL Procedure

RDS for MySQLはユーザーに利便性を提供するため、ユーザーアカウントで制限されるいくつかの機能を実行するプロシージャを独自に提供しています。

### tcrds_active_process

* ProcesslistでSleep状態ではなくACTIVE状態のクエリを照会します。
* 実行時間が古い順に出力され、クエリ内容(SQL)は100桁までしか出力されません。

```
mysql> CALL mysql.tcrds_active_process();
```

### tcrds_process_kill

* 特定のプロセスを強制終了します。
* 終了するプロセスIDはinformation_schema.processlistで確認でき、tcrds_active_processとtcrds_current_lockプロシージャを使ってプロセスの情報を確認できます。

```
mysql> CALL mysql.tcrds_process_kill(processlist_id );
```

### tcrds_current_lock

* 現在ロックを待っているプロセスとロックを占有しているプロセス情報を確認します。
* (w)カラム情報がロックを獲得するために待機しているプロセス情報。
* (B)カラム情報がロックを占有しているプロセス情報。
* ロックを占有しているプロセスを強制終了するには、(B)PROCESS列を確認した後、call tcrds_process_kill(process_id)を実行します。

```
mysql> CALL mysql.tcrds_current_lock();
```

### tcrds_repl_changemaster

* 複製を利用して外部MySQL DBをNHN Cloud RDSにインポートする時使います。
* NHN Cloud RDSの複製構成は、コンソールの**複製の作成**で行うことができます。

```
mysql> CALL mysql. tcrds_repl_changemaster (master_instance_ip, master_instance_port, user_id_for_replication, password_for_replication_user, MASTER_LOG_FILE, MASTER_LOG_POS);
```

* パラメータの説明
  * master_instance_ip:複製対象(Master)サーバーのIP
  * master_instance_port:複製対象(Master)サーバーのMySQLポート
  * user_id_for_replication:複製対象(Master)サーバーのMySQLに接続する複製用アカウント
  * password_for_replication_user:複製用アカウントパスワード
  * MASTER_LOG_FILE:複製対象(Master)のbinary logファイル名
  * MASTER_LOG_POS:複製対象(Master)のbinary logポジション

```
ex) call mysql.tcrds_repl_changemaster('10.162.1.1',10000,'db_repl','password','mysql-bin.000001',4);
```

> [注意]複製用アカウントが複製対象(Master) MySQLに作成されている必要があります。

### tcrds_repl_init

* MySQL複製情報を初期化します。

```
mysql> CALL mysql.tcrds_repl_init();
```

### tcrds_repl_slave_stop

* MySQLの複製を止めます。

```
mysql> CALL mysql.tcrds_repl_slave_stop();
```

### tcrds_repl_slave_start

* MySQLの複製を開始します。

```
mysql> CALL mysql.tcrds_repl_slave_start();

```

### tcrds_repl_skip_repl_error

* SQL_SLAVE_SKIP_COUNTER=1を実行します。次のようなDuplicate keyエラー発生時、tcrds_repl_skip_repl_errorプロシージャを実行すると、複製エラーを解決できます。
* `MySQL error code 1062: 'Duplicate entry ? for key ?'`

```
mysql> CALL mysql.tcrds_repl_skip_repl_error();
```

### tcrds_repl_next_changemaster

* Masterの次のバイナリ(binary log)ログを読めるように複製情報を変更します。
* 次のような複製エラーが発生した場合、tcrds_repl_next_changemasterプロシージャを実行すると、複製エラーを解決できます。

例) MySQL error code 1236 (ER_MASTER_FATAL_ERROR_READING_BINLOG): Got fatal error from master when reading data from binary log

```
mysql> CALL mysql.tcrds_repl_next_changemaster();
```

### tcrds_innodb_monitor_reset

* information_schema.INNODB_METRICSテーブルのcounterを0にリセットするinnodb_monitor_reset variablesを実行するプロシージャです。
* `SET GLOBAL innodb_monitor_reset = '{counter-name|module_name|pattern|all}';`クエリを実行します。
* innodb_monitor_enable、innodb_monitor_disableはRDSパラメータで提供します。

```
mysql> CALL mysql.tcrds_innodb_monitor_reset('{counter-name|module_name|pattern|all}');
```

```
ex) CALL mysql.tcrds_innodb_monitor_reset('dml_reads');
CALL mysql.tcrds_innodb_monitor_reset('module_dml');
```

### tcrds_innodb_monitor_reset_all

* counter値をリセットするinnodb_monitor_reset_all variablesを実行するプロシージャです。
* innodb_monitor_reset_allを使用するには、counterがdisable状態である必要があります。
* `SET GLOBAL innodb_monitor_reset_all = '{counter-name|module_name|pattern|all}';`クエリを実行します。

```
mysql> CALL mysql.tcrds_innodb_monitor_reset_all('{counter-name|module_name|pattern|all}');
```

## データマイグレーション

* RDSはmysqldumpを利用してNHN Cloud RDSの外部にデータをエクスポートしたり、外部からインポートできます。
* mysqldumpユーティリティはMySQLをインストールした時、基本的に提供されます。

### mysqldumpを利用してエクスポート

* NHN Cloud RDSのインスタンスを準備して使用します。
* エクスポートするデータを保存する外部インスタンス、もしくはローカルクライアントがインストールされたコンピュータの容量が十分に確保されていることを確認します。
* NHN Cloudの外部にデータをエクスポートする場合、Floating IPを作成してデータをエクスポートするRDSインスタンスに接続します。
* 下記のmysqldumpコマンドを使って外部にデータをエクスポートします。

#### ファイルにエクスポートする場合

```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

#### NHN Cloud RDS外部のMySQL DBにエクスポートする場合

```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port}
```

### mysqldumpを利用してインポート

* データをインポートするNHN Cloud RDS外部のDBを準備します。
* インポートするNHN Cloud RDSインスタンスの容量が十分か確認します。
* Floating IPを作成してNHN Cloud RDSインスタンスに接続します。
* 下記のmysqldumpコマンドで外部からデータをインポートします。

```
mysqldump -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} --single-transaction --set-gtid-purged=off --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port}
```

#### データのインポート中に`ERROR 1227`エラーが発生した場合

* `ERROR 1227`エラーはmysqldumpファイルの保存されたオブジェクト(トリガー、ビュー、関数またはイベント)にDEFINERが定義されている時に発生します。これを解決するためには、mysqldumpファイルで`DEFINER`部分を削除してください。

#### データのインポート中に`ERROR 1418`エラーが発生する場合

* `ERROR 1418`エラーはmysqldumpファイルの関数宣言にNO SQL、READS SQL DATA, DETERMINISTICがなく、バイナリログが有効な状態の時に発生します。
  * 詳細については[The Binary Log](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html) MySQL文書を参照してください。
* これを解決するためには、mysqldumpファイルを適用するDBインスタンスの`log_bin_trust_function_creators`パラメータの値を`1`に変更する必要があります。

### 複製を利用してエクスポート

* 複製を利用してNHN Cloud RDSのデータを外部DBにエクスポートできます。
* 外部DBのバージョンは、NHN Cloud RDSのバージョンと同じか、それより新しいバージョンである必要があります。
* データをエクスポートするNHN Cloud RDS MasterまたはRead Only Slaveインスタンスを準備します。
* Floating IPを生成してデータをエクスポートするNHN Cloud RDSインスタンスに接続します。
* 下記のコマンドでNHN Cloud RDSインスタンスからデータをファイルにエクスポートします。
* Master RDSインスタンスからエクスポートする場合

```
mysqldump -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* Read Only Slave RDSインスタンスからエクスポートする場合

```
mysqldump -h{rds_read_only_slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* バックアップされたファイルを開いて、コメントに書かれたMASTER_LOG_FILE及びMASTER_LOG_POSを別に記録します。
* NHN Cloud RDSインスタンスからデータをバックアップする外部ローカルクライアントまたはDBがインストールされたコンピュータの容量が十分であることを確認します。
* 外部DBのmy.cnf(Windowsの場合my.ini)ファイルに下記のようなオプションを追加します。
* server-idの場合、NHN Cloud RDSインスタンスのDB Configuration項目のserver-idと違う値を入力します。

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* 外部DBを再起動します。
* バックアップされたファイルを下記のコマンドで外部DBに入力します。

```
mysql -h{external_db_host} -u{exteranl_db_id} -p{external_db_password} --port={exteranl_db_port} < {local_path_and_file_name}
```

* NHN Cloud RDSインスタンスで複製に使用するアカウントを作成します。
* 新しく複製を設定する前に、もしかしたら存在するかもしれない既存のレプリケーション情報を初期化するために下記のクエリを実行します。この時、RESET SLAVEを実行すると、既存の複製情報が初期化されます。

```
STOP SLAVE;

RESET SLAVE;
```

* 複製に使うアカウント情報と、先ほど別に記録しておいたMASTER_LOG_FILEとMSATER_LOG_POSを使って外部DBに下記のようにクエリを実行します。

```
CHANGE MASTER TO master_host = '{rds_master_instance_floating_ip}', master_user='{user_id_for_replication}', master_password='{password_forreplication_user}', master_port ={rds_master_instance_port}, master_log_file ='{MASTER_LOG_FILE}', master_log_pos = {MASTER_LOG_POS};

START SLAVE;
```

* 外部DBとNHN Cloud RDSインスタンスの原本データが同じになったら、外部DBにSTOP SLAVEコマンドを利用して複製を終了します。

### 複製を利用してインポート

* 複製を利用して外部DBをNHN Cloud RDSにインポートできます。
* NHN Cloud RDSのバージョンは外部DBのバージョンと同じか、それより新しいバージョンでなければなりません。
* データをエクスポートする外部MySQLインスタンスに接続します。
* 下記のコマンドで外部MySQLインスタンスからデータをバックアップします。
* 外部MySQLインスタンス(マスター)からインポートする場合

```
mysqldump -h{master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* 外部MySQLインスタンス(スレーブ)からインポートする場合

```
mysqldump -h{slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* バックアップされたファイルを開いて、コメントのMASTER_LOG_FILE及びMASTER_LOG_POSを別に記録します。
* NHN Cloud RDSインスタンスからデータをバックアップするクライアントやコンピュータの容量が十分か確認します。
* 外部DBのmy.cnf(Winodwsの場合はmy.ini)ファイルに下記のオプションを追加します。
* server-idの場合、NHN Cloud RDSインスタンスのDB Configuration項目のserver-idと異なる値を入力します。

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* 外部DBを再起動します。
* 外部ネットワークからインポート(import)すると時間がかかる場合があるので、内部NHN Cloud Imageを作成してバックアップファイルをコピーした後、NHN Cloudにインポートすることを推奨します。
* バックアップされたファイルを下記のコマンドでNHN Cloud RDSに入力します。
* 複製構成はDNSをサポートしていないため、IPに変換して実行します。

```
mysql -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} < {local_path_and_file_name}
```

* 外部MySQLインスタンスで複製に使うアカウントを作成します。

```
mysql> CREATE USER 'user_id_for_replication'@'{external_db_host}' IDENTIFIED BY '<password_forreplication_user>';
mysql> GRANT REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'user_id_for_replication'@'{external_db_host}';
```

* レプリケーションに使うアカウント情報と先に記録しておいたMASTER_LOG_FILE, MSATER_LOG_POSを利用してNHN Cloud RDSに次のようにクエリを実行します。

```
mysql> call mysql.tcrds_repl_changemaster ('rds_master_instance_floating_ip',rds_master_instance_port,'user_id_for_replication','password_forreplication_user','MASTER_LOG_FILE',MASTER_LOG_POS );
```

* レプリケーションを開始するには下記のプロシージャを実行します。

```
mysql> call mysql.tcrds_repl_slave_start;
```

* 外部DBとNHN Cloud RDSインスタンスの元データが同じになったら、下記のコマンドを利用して複製を終了します。

```
mysql> call mysql.tcrds_repl_init();
```
