## Database > RDS for MySQL > 开发人员指南

## 迁移

使用mysqldump可向NHN Cloud RDS外部导出数据或从外部导入数据。mysqldump实用程序在安装mysql时默认提供。

### 使用mysqldump导出

* 准备NHN Cloud RDS的实例。
* 确认用于保存导出数据的外部实例，或安装了本地客户端的计算机的容量是否充足。
* 要向NHN Cloud外部导出数据时，创建浮动IP，连接到将要导出数据的RDS实例。

使用以下mysqldump命令将数据导出到外部。

####  以文件形式导出时
```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

#### 以NHN Cloud RDS外部的mysql db形式导出时
```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port}
```

### 使用mysqldump导入

* 准备要导入数据的NHN Cloud RDS外部的DB。
* 确认要导入的NHN Cloud RDS实例的容量是否充足。
* 创建浮动IP，连接到NHN Cloud RDS实例。
* 使用以下mysqldump命令从外部导入数据。

```
mysqldump -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} 
```

### 使用复制导出

* 可以使用复制将NHN Cloud RDS的数据导出至外部DB。
* 外部DB版本应与NHN Cloud RDS版本相同或为更新的版本。
* 准备要导出数据的NHN Cloud RDS Master或Read Only Slave实例。
* 创建浮动IP，连接到要导出数据的NHN Cloud RDS实例。
* 使用以下命令，从NHN Cloud RDS实例中将数据以文件形式导出。

#### 从Master RDS实例中导出时

```
mysqldump -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

#### 从Read Only Slave RDS实例中导出时

```
mysqldump -h{rds_read_only_slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* 打开备份文件，另外记录写在注释中的MASTER_LOG_FILE及MASTER_LOG_POS。
* 确认从NHN Cloud RDS实例中接收备份数据的外部本地客户端或安装了DB的计算机的容量是否充足。
* 在外部DB的my.cnf（为Winodws时，my.ini）文件中添加如下选项。
* server-id输入与NHN Cloud RDS实例的DB Configuration项目的server-id不同的值。

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* 重启外部DB。
* 使用如下命令将备份的文件输入外部DB。

```
mysql -h{external_db_host} -u{exteranl_db_id} -p{external_db_password} --port={exteranl_db_port} < {local_path_and_file_name}
```

* 在NHN Cloud RDS实例中创建要用于复制的账户。
* 设置新的复制前，若想要对或许存在的原有复制信息进行初始化，执行以下查询。此时，若执行RESET SLAVE，原有复制信息将被初始化。

```
STOP SLAVE;

RESET SLAVE;
```

* 使用复制中要使用的账号信息和之前另外记录的MASTER_LOG_FILE与MASTER_LOG_POS，对外部DB执行如下查询。

```
CHANGE MASTER TO master_host = '{rds_master_instance_floating_ip}', master_user='{user_id_for_replication}', master_password='{password_forreplication_user}', master_port ={rds_master_instance_port}, master_log_file ='{MASTER_LOG_FILE}', master_log_pos = {MASTER_LOG_POS};

START SLAVE;
```

* 在外部DB中完成NHN Cloud RDS实例的源数据复制后，使用STOP SLAVE命令终止外部DB的复制。