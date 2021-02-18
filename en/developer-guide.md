## Database > RDS for MySQL > Developer's Guide

## Migration 

Data can be exported or imported to or from out of NHN Cloud RDS, by using mysqldump. The mysqldump utility is provided by default along with mysql installation. 

### Export by mysqldump 

* Get NHN Cloud RDS instances prepared. 
* See if the capacity is sufficient at an external instance to save exporting data, or a computer where local client is installed.  
* To export data out of NHN Cloud, create and associate a floating IP with an RDS instance to export data. 

Use mysqldump commands as below, to export data. 

####  Exporting in Files 
```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

#### Exporting in mysql db out of NHN Cloud RDS
```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port}
```

### Import by using mysqldump 

* Get database prepared out of NHN Cloud RDS to import data. 
* See if NHN Cloud RDS instance to import has sufficient capacity. 
* Create and associate a floating IP with NHN Cloud RDS instance.  
* Use the mysqldump command as below to import data. 

```
mysqldump -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} 
```

### Export by Replication 

* NHN Cloud RDS data can be exported to external database, by using replication. 
* External database must have the same or later version than NHN Cloud RDS. 
* Get instances prepared for NHN Cloud RDS Master or Read Only Slave to export data. 
* Create a floating IP to connect to NHN Cloud RDS instance to export data. 
* Use commands as below, to export data in file, out of NHN Cloud RDS instance.  

#### Exporting out of Master RDS Instances 

```
mysqldump -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

#### Exporting out of Read Only Slave RDS Instances 

```
mysqldump -h{rds_read_only_slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* Open backed up files and record MASTER_LOG_FILE and MASTER_LOG_POS written on footnotes. 
* See if external local client to back up data from NHN Cloud RDS instance, or a computer where database is installed has enough capacity. 
* Add options as below to my.cnf (or my.ini for Windows) of external database.  
* Put a different value for Server ID, from the Server ID of DB Configuration of NHN Cloud RDS Instance. 

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* Restart external database. 
* Use the command as below to enter backup file to external database. 

```
mysql -h{external_db_host} -u{exteranl_db_id} -p{external_db_password} --port={exteranl_db_port} < {local_path_and_file_name}
```

* Create an account from NHN Cloud RDS Instance for replication. 
* Before configuring new replication, execute the query as below to initialize replication information that might have existed. Execute RESET SLAVE, and any existing replication information is initialized. 

```
STOP SLAVE;

RESET SLAVE;
```

* Execute the query as below to external database, by using account information for replication, as well as MASTER_LOG_FILE and MASTER_LOG_POS, recorded previously. 

```
CHANGE MASTER TO master_host = '{rds_master_instance_floating_ip}', master_user='{user_id_for_replication}', master_password='{password_forreplication_user}', master_port ={rds_master_instance_port}, master_log_file ='{MASTER_LOG_FILE}', master_log_pos = {MASTER_LOG_POS};

START SLAVE;
```

* After original data of NHN Cloud RDS instance become same as the external database, replication is closed by using the STOP SLAVE command to the external database. 

### Import by Replication 

* External database can be imported to NHN Cloud RDS by using replication. 
* NHN Cloud RDS must have the same or later version than that of the external database.  
* Connect to an external MySQL instance to import data. 
* Use the command as below to back up data from the exteranl MySQL instance. 
* To import data from external MySQL instance (master)

```
mysqldump -h{master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* To import data from external MySQL instance (slave) 

```
mysqldump -h{slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* Open the backup file to record MASTER_LOG_FILE and MASTER_LOG_POS from the footnote. 
* Check if the client or computer has enough volume to get data backed up from NHN Cloud RDS instance. 
* Add below option to the my.cnf (or my.ini for Windows) file of the external database. 
* For server-id, enter a different value from the server-id of DB Configuration of NHN Cloud RDS instance. 

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* Restart external database. 
* It takes more time to import from an external network. 
* It is, therefore, recommended to create NHN Cloud Image internally and copy and import backup files to NHN Cloud. 
* Enter backed up files to NHN Cloud RDS by using the command as below. 
* Since replication configuration does not support DNS, convert to IP before execution.  

```
mysql -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} < {local_path_and_file_name}
```

* Create an account for replication from internal MySQL instance.  

```
mysql> CREATE USER 'user_id_for_replication'@'{external_db_host}' IDENTIFIED BY '<password_forreplication_user>';
mysql> GRANT REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'user_id_for_replication'@'{external_db_host}';
```

* By using the account information for replication, and MASTER_LOG_FILE and MSATER_LOG_POS that were previously recorded, execute the query to NHN Cloud RDS like follows. 

```
mysql> call mysql.tcrds_repl_changemaster ('rds_master_instance_floating_ip',rds_master_instance_port,'user_id_for_replication','password_forreplication_user','MASTER_LOG_FILE',MASTER_LOG_POS );
```

* To start replication, execute the following procedure. 

```
mysql> call mysql.tcrds_repl_slave_start;
```

* When original data of NHN Cloud RDS instance become same as the external database, close replication by using the command as below. 

```
mysql> call mysql.tcrds_repl_init();
```
