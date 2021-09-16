## Database > RDS for MySQL > 開発者ガイド

## マイグレーション

mysqldumpを利用してNHN Cloud RDSの外部にデータでエクスポートしたり、外部からデータをインポートすることができます。mysqldumpユーティリティはmysqlをインストールした時、デフォルトで提供されます。

### mysqldumpを利用してエクスポート

* NHN Cloud RDSのインスタンスを準備します。
* エクスポートするデータを保存する外部インスタンス、またはローカルクライアントがインストールされたコンピュータの容量が十分にあるか確認します。
* NHN Cloudの外部にデータをエクスポートする必要がある時、Floating IPを作成してデータをエクスポートするRDSインスタンスに接続します。

下記のmysqldumpコマンドを使用して外部にデータをエクスポートします。

#### ファイルでエクスポートする場合
```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

#### NHN Cloud RDS外部のmysql dbにエクスポートする場合
```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port}
```

### mysqldumpを利用してインポート

* データをインポートするNHN Cloud RDS外部のデータベースを準備します。
* インポートするNHN Cloud RDSインスタンスの容量が十分にあるか確認します。
* Floating IPを作成してNHN Cloud RDSインスタンスに接続します。
* 下記のmysqldumpコマンドを使用して外部からデータをインポートします。

```
mysqldump -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} 
```

### コピーを利用してエクスポート

* コピーを利用してNHN Cloud RDSのデータを外部データベースにエクスポートできます。
* 外部データベースのバージョンはNHN Cloud RDSのバージョンと同じか、それより新しいバージョンでなければいけません。
* データをエクスポートするNHN Cloud RDS MasterまたはRead Only Slaveインスタンスを準備します。
* Floating IPを作成して、データをエクスポートするNHN Cloud RDSインスタンスに接続します。
* 下記のコマンドを使用してNHN Cloud RDSインスタンスからデータをファイルでエクスポートします。

#### Master RDSインスタンスからエクスポートする場合

```
mysqldump -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

#### Read Only Slave RDSインスタンスからエクスポートする場合

```
mysqldump -h{rds_read_only_slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* バックアップされたファイルを開き、コメントに書かれたMASTER_LOG_FILEおよびMASTER_LOG_POSを別途記録します。
* NHN Cloud RDSインスタンスからデータをバックアップする外部ローカルクライアント、またはデータベースがインストールされたコンピュータの容量が十分にあるか確認します。
* 外部データベースのmy.cnf (Winodwsの場合my.ini)ファイルに下記のようなオプションを追加します。
* server-idの場合、NHN Cloud RDSインスタンスのDB Configuration項目のserver-idと異なる値を入力します。

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* 外部データベースを再起動します。
* バックアップされたファイルを下記のコマンドを使用して外部データベースに入力します。

```
mysql -h{external_db_host} -u{exteranl_db_id} -p{external_db_password} --port={exteranl_db_port} < {local_path_and_file_name}
```

* NHN Cloud RDSインスタンスでコピーに使用するアカウントを作成します。
* 新規コピーを設定する前に、もしかするとあるかもしれない既存コピー情報を初期化するには、下記のクエリーを実行します。この時、RESET SLAVEを実行すると既存コピー情報が初期化されます。

```
STOP SLAVE;

RESET SLAVE;
```

* コピーに使用するアカウント情報と、別途記録しておいたMASTER_LOG_FILEとMASTER_LOG_POSを利用して、外部データベースに下記のようにクエリーを実行します。

```
CHANGE MASTER TO master_host = '{rds_master_instance_floating_ip}', master_user='{user_id_for_replication}', master_password='{password_forreplication_user}', master_port ={rds_master_instance_port}, master_log_file ='{MASTER_LOG_FILE}', master_log_pos = {MASTER_LOG_POS};

START SLAVE;
```

* 外部DBとNHN Cloud RDSインスタンスの原本データが同じ場合、外部DBにSTOP SLAVEコマンドを利用して複製を終了します。

### 複製を利用してインポートする

* 複製を利用して外部DBをNHN Cloud RDSにインポートします。
* NHN Cloud RDSバージョンは外部DBバージョンと同じか、それより新しいバージョンである必要があります。
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

* バックアップされたファイルを開き、コメントのMASTER_LOG_FILEおよびMASTER_LOG_POSを別途記録します。
* NHN Cloud RDSインスタンスからデータをバックアップするクライアントやコンピュータの容量が十分にあるかを確認します。
* 外部DBのmy.cnf(Winodwsの場合my.ini)ファイルに下記のオプションを追加します。
* server-idの場合、NHN Cloud RDSインスタンスのDB Configuration項目のserver-idと同じ値を入力します。

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* 外部DBを再起動します。
* 外部ネットワークからインポート(import)すると、時間がかかる場合があるため、
* 内部NHN Cloud Imageを作成してバックアップファイルをコピーした後、NHN Cloudにインポートすることを推奨します。
* バックアップされたファイルを、下記のコマンドでNHN Cloud RDSに入力します。
* 複製構成はDNSをサポートしないため、IPに変換して実行します。

```
mysql -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} < {local_path_and_file_name}
```

* 外部MySQLインスタンスで複製に使用するアカウントを作成します。

```
mysql> CREATE USER 'user_id_for_replication'@'{external_db_host}' IDENTIFIED BY '<password_forreplication_user>';
mysql> GRANT REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'user_id_for_replication'@'{external_db_host}';
```

* 複製に使用するアカウント情報と、別途記録しておいたMASTER_LOG_FILE、MSATER_LOG_POSを利用してNHN Cloud RDSに次のクエリーを実行します。

```
mysql> call mysql.tcrds_repl_changemaster ('rds_master_instance_floating_ip',rds_master_instance_port,'user_id_for_replication','password_forreplication_user','MASTER_LOG_FILE',MASTER_LOG_POS );
```

* 複製を開始するには、下記のプロシージャを実行します。

```
mysql> call mysql.tcrds_repl_slave_start;
```

* 外部DBとNHN Cloud RDSインスタンスの原本データが同じ場合、下記コマンドを利用して複製を終了します。

```
mysql> call mysql.tcrds_repl_init();
```

## オブジェクトストレージを利用したバックアップおよび復元

* RDS for MySQLのバックアップファイルをオブジェクトストレージへエクスポートしたり、オブジェクトストレージのバックアップファイルを利用してDBインスタンスを復元できます。
* RDS for MySQLはPercona XtraBackupを利用してバックアップおよび復元を行うため、オブジェクトストレージのバックアップファイルを使用するにはMySQLの各バージョンで推奨するXtraBackupを使用する必要があります。

| MySQLバージョン | XtraBackupバージョン |
| --- | --- |
| 5.6.33 | 2.4.20 |
| 5.7.15 | 2.4.20 |
| 5.7.19 | 2.4.20 |
| 5.7.26 | 2.4.20 |
| 8.0.18 | 8.0.12 |
| 8.0.22 | 8.0.12 |

* XtraBackupのインストール方法についてはPercona Webサイトを参照してください。
  * https://www.percona.com/doc/percona-xtrabackup/2.4/index.html
  * https://www.percona.com/doc/percona-xtrabackup/8.0/index.html

> [注意]現在5.7.33バージョンの場合はオブジェクトストレージのバックアップファイルで復元が制限されます。
> [注意]推奨するXtraBackup以外のバージョンを使用した場合、正常に動作しない場合があります。
> [注意] DBファイルの暗号化機能を使用する場合、バックアップをオブジェクトストレージへエクスポートできません。
> [注意]オブジェクトストレージのバックアップファイルと復元しようとしているMySQLのバージョンは同じである必要があります。

### オブジェクトストレージにバックアップをエクスポート

* NHN CloudのオブジェクトストレージにRDS for MySQLのバックアップをエクスポートできます。
* Webコンソールの**Instance**タブでDBインスタンスを選択した後、**追加機能**メニューから**オブジェクトストレージへバックアップをエクスポート**ボタンを押すと、手動バックアップを行います。バックアップされたファイルをすぐユーザーが指定したオブジェクトストレージにアップロードできます。
* また、DBインスタンス詳細画面の**バックアップ& Acess制御**タブで既存バックアップファイルを選択し、**オブジェクトストレージにバックアップをエクスポート**ボタンを押すと、ユーザーが指定したオブジェクトストレージにアップロードできます。
* バックアップファイルは、ユーザーが指定したオブジェクトストレージのコンテナにマルチパートで構成されたオブジェクトにアップロードされます。

### オブジェクトストレージのバックアップファイルを利用して手動で復元

* オブジェクトストレージのバックアップファイルを利用して直接MySQLを復元できます。
* 復元するMySQLおよびXtraBackupがインストールされていると仮定します。
* オブジェクトストレージのバックアップを復元したいサーバーにダウンロードします。
* MySQLサービスを停止します。
* MySQLデータ保存パスのすべてのファイルを削除します。

```
rm -rf {MySQLデータ保存パス}/*
```  

* ダウンロードしたバックアップファイルを解凍し、復元します。
* XtraBackup 2.4.20例

```
cat {バックアップファイル保存パス} | xbstream -x -C {MySQLデータ保存パス}
innobackupex --decompress {MySQLデータ保存パス}
innobackupex --defaults-file={my.cnfパス} --apply-log {MySQLデータ保存パス}
```
* XtraBackup 8.0.12例

```
cat {バックアップファイル保存パス} | xbstream -x -C {MySQLデータ保存パス}
xtrabackup --decompress --target-dir={MySQLデータ保存パス}
xtrabackup --prepare --target-dir={MySQLデータ保存パス}
xtrabackup --defaults-file={my.cnfパス} --copy-back --target-dir={MySQLデータ保存パス}
```

* 解凍後、不要なファイルを削除します。

```
find {MySQLデータ保存パス} -name "*.qp" -print0 | xargs -0 rm
```

* MySQLサービスを開始します。

### オブジェクトストレージのRDS for MySQLバックアップファイルを利用してDBインスタンス作成

* オブジェクトストレージのRDS for MySQLバックアップファイルを利用して同じリージョン、他のプロジェクトのRDS for MySQLに復元できます。
* [オブジェクトストレージにバックアップをエクスポート](./developer-guide/#_5 )を参考にしてバックアップファイルをオブジェクトストレージにエクスポートします。
* 復元するプロジェクトのWebコンソールに接続した後、 Instanceタブでオブジェクトストレージにあるバックアップから復元ボタンをクリックします。
* バックアップファイルが保存されたオブジェクトストレージの情報およびDBインスタンスの情報を入力した後、**作成**ボタンをクリックします。

### オブジェクトストレージの外部MySQLバックアップファイルを利用してDBインスタンス作成

* 一般MySQLバックアップファイルを利用してRDS for MySQLのDBインスタンスに復元できます。

> [注意] innodb_data_file_pathの設定値がibdata1:12M:autoextendではない場合、RDS for MySQLのDBインスタンスに復元できません。
* MySQLがインストールされたサーバーで以下のコマンドを利用してバックアップを行います。
* XtraBackup 2.4.20例

```
innobackupex --defaults-file={my.cnfパス} --user {ユーザー} --password '{パスワード}' --socket {MySQLソケットファイルパス} --compress --compress-threads=1 --stream=xbstream {バックアップファイルが作成されるディレクトリ} 2>>{バックアップログファイルパス} > {バックアップファイルパス}
```
* XtraBackup 8.0.12例

```
xtrabackup --defaults-file={my.cnfパス} --user={ユーザー} --password='{パスワード}' --socket={MySQLソケットファイルパス} --compress --compress-threads=1 --stream=xbstream --backup {バックアップファイルが作成されるディレクトリ} 2>>{バックアップログファイルパス} > {バックアップファイルパス}
```
* バックアップログファイルの最後の行に`completed OK!`があるかを確認します。
  * completed OK!がない場合、バックアップが正常に終了していないので、ログファイルにあるエラーメッセージを参考にしてバックアップを再度行います。
* 完了したバックアップファイルをオブジェクトストレージにアップロードします。
  * 一度にアップロードできる最大ファイルサイズは5GBです。
  * バックアップファイルのサイズが5GBより大きい場合、splitなどのユーティリティを利用してバックアップファイルを5GB以下に分割してマルチパートでアップロードする必要があります。
  * 詳細はhttps://docs.toast.com/ko/Storage/Object%20Storage/ko/api-guide/#_43を参照してください。
* 復元するプロジェクトのWebコンソールに接続した後、Instanceタブでオブジェクトストレージにあるバックアップから復元ボタンをクリックします。
* バックアップファイルが保存されたオブジェクトストレージの情報と、DBインスタンスの情報を入力した後、**作成**ボタンをクリックします。

## Procedure

* RDS for MySQLは、ユーザーの利便性を提供するために、ユーザーアカウントで制限されているいくつかの機能を実行するプロシージャを独自に提供しています。

### tcrds_active_process

* ProcesslistでSleep状態ではなく、ACTIVE状態のクエリを照会します。
* 実行時間が古い順に出力され、クエリー内容(SQL)は100桁まで出力されます。

```
mysql> CALL mysql.tcrds_active_process();
```

### tcrds_process_kill

* 特定のプロセスを強制終了します。
* 終了するプロセスIDはinformation_schema.processlistで確認することができ、tcrds_active_processとtcrds_current_lockプロシージャを利用して、プロセスの情報を確認できます。

```
mysql> CALL mysql.tcrds_process_kill(processlist_id );
```

### tcrds_current_lock

* 現在ロックを待っているプロセスと、ロックを専有しているプロセス情報を確認します。
* (w)カラム情報がロックを取得するために待機するプロセス情報
* (B)カラム情報がロックを専有しているプロセス情報
* ロックを専有しているプロセスを強制終了するには、(B)PROCESSカラムを確認した後、call tcrds_process_kill(process_id)を実行します。

```
mysql> CALL mysql.tcrds_current_lock();
```

### tcrds_repl_changemaster

* 複製を利用して外部MySQL DBをNHN Cloud RDSにインポートする時に使用します。
* NHN Cloud RDSの複製は、コンソールの **複製作成**で行うことができます。

```
mysql> CALL mysql. tcrds_repl_changemaster (master_instance_ip, master_instance_port, user_id_for_replication, password_for_replication_user, MASTER_LOG_FILE, MASTER_LOG_POS);
```

* パラメータ説明
    * master_instance_ip：複製対象(Master)サーバーのIP
    * master_instance_port：複製対象(Master)サーバーのMySQL Port
    * user_id_for_replication：複製対象(Master)サーバーのMySQLに接続する複製用のアカウント
    * password_for_replication_user：複製用アカウントのパスワード
    * MASTER_LOG_FILE：複製対象(Master)のbinary logファイル名
    * MASTER_LOG_POS：複製対象(Master)のbinary logポジション

```
ex) call mysql.tcrds_repl_changemaster('10.162.1.1',10000,'db_repl','password','mysql-bin.000001',4);
```

> [注意] 複製用アカウントが複製対象(Master) MySQLに作成されている必要があります。
### tcrds_repl_init

* MySQL 複製情報を初期化します。

```
mysql> CALL mysql.tcrds_repl_init();
```

### tcrds_repl_slave_stop

* MySQLの複製を停止します。

```
mysql> CALL mysql.tcrds_repl_slave_stop();
```

### tcrds_repl_slave_start

* MySQLの複製を開始します。

```
mysql> CALL mysql.tcrds_repl_slave_start();
```

### tcrds_repl_skip_repl_error

* SQL_SLAVE_SKIP_COUNTER=1を実行します。次のようなDuplicate keyエラー発生した時は、tcrds_repl_skip_repl_errorプロシージャを実行すると複製エラーを解決できます。
* MySQL error code 1062: 'Duplicate entry ? for key ?'

```
mysql> CALL mysql. tcrds_repl_skip_repl_error();
```

### tcrds_repl_next_changemaster

* Masterの次のバイナリ(binary log)ログを読み取れるように複製情報を変更します。
* 次のような複製エラーが発生した時は、tcrds_repl_next_changemasterプロシージャを実行すると複製エラーを解決できます。
    * 例) MySQL error code 1236 (ER_MASTER_FATAL_ERROR_READING_BINLOG): Got fatal error from master when reading data from binary log

```
mysql> CALL mysql.tcrds_repl_next_changemaster();
```
