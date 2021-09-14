## Database > RDS for MySQL > Developer's Guide

## Migration 

* Data can be exported or imported to or from out of NHN Cloud RDS, by using mysqldump.
* The mysqldump utility is provided by default along with mysql installation. 

### Export by using mysqldump 

* Get NHN Cloud RDS instances prepared. 
* See if the capacity is sufficient at an external instance to save exporting data, or a computer where local client is installed.  
* To export data out of NHN Cloud, create and associate a floating IP with an RDS instance to export data. 
* Use mysqldump commands as below, to export data. 

####  Exporting in Files 
```
mysqldump -h{rds_instance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

#### Exporting in mysql db out of NHN Cloud RDS
```
mysqldump -h{rds_instance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port}
```

### Import by using mysqldump 

* Get database prepared out of NHN Cloud RDS to import data. 
* See if NHN Cloud RDS instance to import has sufficient capacity. 
* Create and associate a floating IP with NHN Cloud RDS instance.  
* Use the mysqldump command as below to import data. 

```
mysqldump -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{rds_instance_floating_ip} -u{db_id} -p{db_password} --port={db_port} 
```

### Export by Replication 

* NHN Cloud RDS data can be exported to external database, by using replication. 
* External database must have the same or later version than NHN Cloud RDS. 
* Get instances prepared for NHN Cloud RDS Master or Read Only Slave to export data. 
* Create a floating IP to connect to NHN Cloud RDS instance to export data. 
* Use commands as below, to export data in file, out of NHN Cloud RDS instance.  
* Exporting out of Master RDS Instances 

```
mysqldump -h{rds_master_instance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* Exporting out of Read Only Slave RDS Instances 

```
mysqldump -h{rds_read_only_slave_instance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
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
mysql -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} < {local_path_and_file_name}
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
* Use the command as below to back up data from the external MySQL instance. 
* To import data from external MySQL instance (master)

```
mysqldump -h{master_instance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* To import data from external MySQL instance (slave) 

```
mysqldump -h{slave_instance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
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
mysql -h{rds_master_instance_floating_ip} -u{db_id} -p{db_password} --port={db_port} < {local_path_and_file_name}
```

* Create an account for replication from internal MySQL instance.  

```
mysql> CREATE USER 'user_id_for_replication'@'{external_db_host}' IDENTIFIED BY '<password_forreplication_user>';
mysql> GRANT REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'user_id_for_replication'@'{external_db_host}';
```

* By using the account information for replication, and MASTER_LOG_FILE and MASTER_LOG_POS that were previously recorded, execute the query to NHN Cloud RDS like follows. 

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

## Backup and restoration using object storage

* RDS for MySQL backup files can be exported to object storage, and DB instances can be restored using backup files in object storage.
* RDS for MySQL uses Percona XtraBackup for backup and restoration, so the recommended XtraBackup version for each MySQL version must be used to use the backup files in object storage.

| MySQL version | XtraBackup version |
| --- | --- |
| 5.6.33 | 2.4.20 |
| 5.7.15 | 2.4.20 |
| 5.7.19 | 2.4.20 |
| 5.7.26 | 2.4.20 |
| 8.0.18 | 8.0.12 |
| 8.0.22 | 8.0.12 |

* Refer to the Percona's website for detailed descriptions on installing XtraBackup
    * https://www.percona.com/doc/percona-xtrabackup/2.4/index.html
    * https://www.percona.com/doc/percona-xtrabackup/8.0/index.html

> [Caution] In MySQL 5.7.33, restoring DB instances using the backup file of object storage is limited.
> [Caution] It might not work properly if you use an XtraBackup version other than the ones recommended.
> [Caution] When using DB file encryption feature, backup cannot be exported to object storage.
> [Caution] The backup file of the object storage and the MySQL to restore must have the same version.

### Export backup to object storage

* You may export an RDS for MySQL backup to the NHN Cloud object storage
* After choosing DB Instance on **Instance** tab of the web console, go to the **Additional Functions** menu and click the **Export Backup to Object Storage** for a manual backup. The backup file can be uploaded to the object storage designated by the user right away.
* Moreover, choose the existing backup file on **Control Backup and Access** tab of the DB instance detail screen and click on the **Export Backup to Object Storage** to upload to the object storage designated by the user.
* Backup files are uploaded onto the object storage designated by the user in the form of a multi-part object.

### Restore manually using backup files in object storage

* You can restore MySQL manually using backup files in object storage.
* Let's suppose that the MySQL for restoration and XtraBackup are installed.
* Download the object storage file onto the server you wish to restore.
* Stop the MySQL service.
* Delete all files in the MySQL data storage path.

```
rm -rf {MySQL data storage path}/*
```  

* Decompress and restore the downloaded backup file.
* XtraBackup 2.4.20 example

```
cat {backup file storage path} | xbstream -x -C {MySQL data storage path}
innobackupex --decompress {MySQL data storage path}
innobackupex --defaults-file={my.cnf path} --apply-log {MySQL data storage path}
```
* XtraBackup 8.0.12 example

```
cat {backup file storage path} | xbstream -x -C {MySQL data storage path}
xtrabackup --decompress --target-dir={MySQL data storage path}
xtrabackup --prepare --target-dir={MySQL data storage path}
xtrabackup --defaults-file={my.cnf path} --copy-back --target-dir={MySQL data storage path}
```

* Delete unnecessary files after decompression.

```
find {MySQL data storage path} -name "*.qp" -print0 | xargs -0 rm
```

* Start MySQL service.

### Use RDS for MySQL backup file of object storage to create DB instance

* You can use RDS for MySQL backup file of object storage in order to restore to RDS for MySQL of the same region and different project.
* Export the backup file to object storage by referring to [Export backup to object storage](./developer-guide/#_5 ). 
* Access the web console of the project to restore, and click the Restore from Backup in Object Storage button in the Instance tab.
* Enter the information of the object storage where the backup file is stored and the DB instance, and click the **Create** button.

### Create a DB instance using external MySQL backup file of object storage

* You can use a normal MySQL backup file to restore to the DB instance of RDS for MySQL.

> [Caution] If the setting value of innodb_data_file_path is not ibdata1:12M:autoextend, you cannot restore to the DB instance of RDS for MySQL.

* In a server with MySQL installed, perform backup using the following command.
* XtraBackup 2.4.20 example

```
innobackupex --defaults-file={my.cnf path} --user {username} --password '{password}' --socket {MySQL socket file path} --compress --compress-threads=1 --stream=xbstream {directory to create a backup file} 2>>{backup log file path} > {backup file path}
```
* XtraBackup 8.0.12 example

```
xtrabackup --defaults-file={my.cnf path} --user={username} --password='{password}' --socket={MySQL socket file path} --compress --compress-threads=1 --stream=xbstream --backup {directory to create a backup file} 2>>{backup log file path} > {backup file path}
```
* Make sure that `completed OK!` exists at the last line of the backup log file.
    * If completed OK! does not exist, it indicates that backup was not properly finished, so proceed with backup again by referring to the error message in the log file.
* Update completed backup file to object storage.
    * The maximum file size that can be uploaded at a time is 5 GB.
    * If the size of backup file is larger than 5 GB, use a utility such as split to split the backup file to a size below 5 GB and perform multipart uploading.
    * For more details, see https://docs.toast.com/ko/Storage/Object%20Storage/ko/api-guide/#_43.
* Access the web console of the project to restore, and click the Restore from Backup in Object Storage button in the Instance tab.
* Enter the information of the object storage where the backup file is stored and the DB instance, and click the **Create** button.

## Procedure

* RDS for MySQL provides its own procedures for user convenience that perform several features that are otherwise limited on user accounts.

### tcrds_active_process

* Retrieves queries in ACTIVE status instead of Sleep status from Processlist.
* Data output is displayed in order of longest performance time to shortest, and the query value (SQL) is displayed up to hundred digits.

```
mysql> CALL mysql.tcrds_active_process();
```

### tcrds_process_kill

* Force shutdown a specific process.
* Process ID to end can be checked in information_schema.processlist, and the process information can be checked using the tcrds_active_process and tcrds_current_lock procedures.

```
mysql> CALL mysql.tcrds_process_kill(processlist_id );
```

### tcrds_current_lock

* Checks the information of the process waiting for a lock and the process that holds a lock.
* (w) Process information where column information waits to acquire a lock.
* (B) Process information where column information holds a lock.
* To force shutdown a process that occupies a lock, check the (B)PROCESS column and perform call tcrds_process_kill(process_id).

```
mysql> CALL mysql.tcrds_current_lock();
```

### tcrds_repl_changemaster

* Used to bring external MySQL DB to NHN Cloud RDS through replication.
* Replication configuration of NHN Cloud RDS is done with **Create replication** of the console.

```
mysql> CALL mysql. tcrds_repl_changemaster (master_instance_ip, master_instance_port, user_id_for_replication, password_for_replication_user, MASTER_LOG_FILE, MASTER_LOG_POS);
```

* Explaining parameter
    * master_instance_ip : IP of replication target (Master) server
    * master_instance_port : MySQL Port of replication target (Master) server
    * user_id_for_replication : Account for replication to access the MySQL of replication target (Master) server
    * password_for_replication_user : Password of account for replication
    * MASTER_LOG_FILE : Binary log file name of replication target (Master)
    * MASTER_LOG_POS : Binary log file position of replication target (Master)

```
ex) call mysql.tcrds_repl_changemaster('10.162.1.1',10000,'db_repl','password','mysql-bin.000001',4);
```

> [Caution] The account for replication must be created in MySQL of the replication target (Master).

### tcrds_repl_init

* Reset MySQL replication information.

```
mysql> CALL mysql.tcrds_repl_init();
```

### tcrds_repl_slave_stop

* Stop MySQL replication.

```
mysql> CALL mysql.tcrds_repl_slave_stop();
```

### tcrds_repl_slave_start

* Start MySQL replication.

```
mysql> CALL mysql.tcrds_repl_slave_start();
```

### tcrds_repl_skip_repl_error

* Perform SQL_SLAVE_SKIP_COUNTER=1. Resolve replication error by performing tcrds_repl_skip_repl_error procedure when Duplicate key error occurs as shown below.
* MySQL error code 1062: 'Duplicate entry ? for key ?'

```
mysql> CALL mysql. tcrds_repl_skip_repl_error();
```

### tcrds_repl_next_changemaster

* Changes replication information to read the next binary log of master.
* Resolve replication error by performing tcrds_repl_next_changemaster procedure when replication error occurs as shown below.
    * e.g. MySQL error code 1236 (ER_MASTER_FATAL_ERROR_READING_BINLOG): Got fatal error from master when reading data from binary log

```
mysql> CALL mysql.tcrds_repl_next_changemaster();
```
