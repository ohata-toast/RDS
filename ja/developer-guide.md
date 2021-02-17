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
