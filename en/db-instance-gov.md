## Database > RDS for MySQL > DB Instance

## DB Instance

DB instance is a concept that encompasses virtual equipment and installed MySQL, a unit of MySQL provided by RDS for MySQL.
You do not have direct access to the operating system of the DB instance, but only to the database through the port you entered when you created the DB instance. The available port ranges have the following restrictions.

* The available port range is between 3306 and 43306.

The DB instance is identified by the customer-assigned name and the automatically assigned 32-byte ID.
DB instance name has the following restrictions.

* DB instance name must be unique by region.
* DB instance name contains alphabets, numbers, and - _ between 1 and 100 characters. ,and the first character must be an alphabet.

When creating DB instance, you must set up a user account and password, and there are following restrictions.

* User account must be between 1 and 32 characters long.
* Password must be between 4 and 16 characters long.

### Availability Zone

NHN Cloud has divided the entire system into several availability zones to prepare for failures caused by physical hardware problems. These availability zones are storage systems, network switches, top surfaces, and power supplies, which are all configured separately for each zone. Failure within one availability zone does not affect other availability zones, increasing the availability of the entire service. Deploying DB instances across multiple availability zones can further increase the
service availability. Network communication is possible between DB instances that are scattered across multiple availability zones, and there is no network usage charge.

> [Caution]
> You cannot change the availability zone of DB instance that you have already created.

### DB Engine

You can use the versions specified below.

| Version      | Note                                                                                                              | 
|--------------|-------------------------------------------------------------------------------------------------------------------| 
| <strong>8.0</strong> ||
| MySQL 8.0.34 |                                                                                                                   | 
| MySQL 8.0.33 |                                                                                                                   |
| MySQL 8.0.32 |                                                                                                                   |
| MySQL 8.0.28 |                                                                                                                   | 
| MySQL 8.0.23 |                                                                                                                   | 
| MySQL 8.0.18 |                                                                                                                   | 
| <strong>5.7</strong> ||
| MySQL 5.7.37 |                                                                                                                   | 
| MySQL 5.7.33 | You cannot restore DB instance with an external backup copy.                                                      | 
| MySQL 5.7.26 |                                                                                                                   | 
| MySQL 5.7.19 |                                                                                                                   | 
| MySQL 5.7.15 |                                                                                                                   | 
| <strong>5.6</strong> ||
| MySQL 5.6.33 | Unable to create new DB instance. It only supports creating and restoring read replicas of existing DB instances. |

You can upgrade the version for DB engine by using the modification feature of the web consle after the engine is created.
For more details, see [DB Engine](db-engine/).

### DB Instance Type

DB instances have different CPU cores and memory capacity depending on the type.
When you create DB instance, you must select the appropriate DB instance type accoring to database workload.

| Type | Description                                                                                                                    | 
|------|--------------------------------------------------------------------------------------------------------------------------------| 
| m2   | Instance type that balances CPU and memory.                                                                                    | 
| c2   | Instance type with high CPU performance.                                                                                       | 
| r2   | Available when memory is busy compared to other resources.                                                                     | 
| x1   | Instance type that supports higher-end CPU and memory. Recommended for services or applications that require high performance. |

The type of DB instance that you have already created can be easily changed through the web console.

> [Caution]
> If you change the type of DB instance that you have already created, the DB instance will be terminated, resulting in a few minutes of downtime.

### DB Instance Status

The status of the DB instance consists of the following values and changes depending on the behavior of the user and the current status.

| Status | Description | |-------------------|------------------------------------------------|
| BEFORE_CREATE | before create|
| AVAILABLE | available to use |
| STORAGE_FULL | insufficient storage |
| FAIL_TO_CREATE | fail to create |
| FAIL_TO_CONNECT | fail to connect |
| REPLICATION_STOP | replication stop |
| FAILOVER | failover completed |
| FAILOVER_SHUTDOWN | failover completed (shutdown), DB Instances Failing Before April 11, 2023 |
| SHUTDOWN | shutdown |

### DB Instance Task

Tasks performed on DB instance consist of the following values and are initiated by web console operations or pre-specified automation deployments.

| Task                     | Description              | 
|--------------------------|--------------------------| 
| APPLYING_PARAMETER_GROUP | applying parameter group | 
| BACKING_UP               | backing up               | 
| CANCELING                | canceling                | 
| CREATING                 | creating                 | 
| CREATING_SCHEMA          | creating DB schema       | 
| CREATING_USER            | creating user            | 
| DELETING                 | deleting                 | 
| DELETING_SCHEMA          | deleting DB schema       | 
| DELETING_USER            | deleting user            | 
| EXPORTING_BACKUP         | exporting backup         | 
| FAILING_OVER             | failing over             | 
| MIGRATING                | migrating                | 
| MODIFYING                | modifying                | 
| PREPARING                | preparing                | 
| PROMOTING                | promoting                | 
| REBUILDING               | rebuilding               | 
| REPAIRING                | repairing                | 
| REPLICATING              | replicating              | 
| RESTARTING               | restarting               | 
| RESTARTING_FORCIBLY      | restarting forcibly      | 
| RESTORING                | restoring                | 
| STARTING                 | starting                 | 
| STOPPING                 | stopping                 | 
| SYNCING_SCHEMA           | syncing DB schema        | 
| SYNCING_USER             | syncing user             | 
| UPDATING_USER            | updating user            |

> [Caution]
> DB instance can handle only one task at a time.
> If you request tasks at the same time, only the first requested task succeeds, and all subsequent requested tasks fail.
> Tasks that fail the request can be found on the Event screen.

### Storage

DB instances support two types of storage: HDD and SSD. As performance and price vary by storage type, you should choose the right storage type for your database workload. You can create at least 20GB to 2TB of storage.

### Scale Storage Size

You cannot change the storage type of DB instance, but the storage size is easily scalable through the web console. DB instances are terminated during storage size scale out, resulting in minutes of downtime depending on the service load. If a read replica exists, expanding the storage size of the master also expands the storage size of the read replica. If you have multiple read replicas, the storage size expansion will be sequential. If an error occurs while expanding the storage size, some
read replicas might not be able to scale, and for read replicas that fail to scale, they can be scaled individually afterward. The storage size cannot be changed to be smaller than the current size.

### Network

When create DB instance, you have to select the VPC subnet to connect to. You can communicate between instances of Compute services connected to the same subnet without separate floating IPs.

> [Caution]
> You cannot change the subnet of DB instance that you have already created.

### Floating IP

To access DB instance from the outside, you must connect the floating IP to DB instance. You can create a floating IP only if you connect the subnet to which the Internet Gateway is connected. Floating IP is charged upon use, and separately, if traffic is directed to the Internet through floating IP, it is charged separately.

### DB Security Group

DB security groups are used to restrict access in case of external intrusion. You can allow access to specific port ranges or database ports for incoming and outgoing traffic. You can apply multiple DB security groups to DB instance. For more details on DB security groups, see the [DB security groups](db-security-group/).

### Backup

You can set up periodic backups of the databases in your DB instance, or you can create backups at any time through the web console. Performance may degrade during backups. To avoid affecting service, it is better to perform back up at a time when the service is under low load. If you do not want the backup to degrade performance, you can use a high-availability configuration or perform backups from read replica. Backup files are stored on internal object storage and are charged based on the
size of backup storage. You can export to user object storage in NHN Cloud if necessary. To prepare for unexpected failures, we recommend that you set up backups to conduct periodically. For more details on backup, see [Backup and Restore](backup-and-restore/).

### Restoration

You can use a backup to create a new DB instance. If the DB instance and binary log that performed the backup exist, you can restore it to a specific time point or to the desired binary log position. It can also be restored as a backup of external MySQL rather than RDS for MySQL. A new DB instance is always created during restoration, and the database of an existing DB instance cannot be deleted and restored. For more details on restoration, see the [Backup and Restore](backup-and-restore/).

### Default Notification

When you create a DB instance, you can set default notifications. If setting default notifications, it will create a new notification group with the name `{DB instance name}-default` and will automatically set the notification items below. You can freely modify and delete alert groups that are created as default notification. For more details on notification group, see the [ notification group ](notification/).

| Item                       | How to compare | Threshold value | Duration  | 
|----------------------------|----------------|-----------------|-----------| 
| CPU usage                  | &gt;=          | 80%             | 5 minutes | 
| Storage remaining usage    | &lt;=          | 5,120MB         | 5 minutes | 
| Database connection status | &lt;=          | 0               | 0 minutes | 
| Storage usage              | &gt;=          | 95%             | 5 minutes | 
| Storage defects            | &lt;=          | 0               | 0 minute  | 
| Connection ratio           | &gt;=          | 85%             | 5 minutes | 
| Memory usage               | &gt;=          | 90%             | 5 minutes | 
| Slow query                 | &gt;=          | 60 counts/min   | 5 minutes |

### Stop DB Instance

If you do not use DB instance for a certain period of time, but you do not want to delete it, you can stop it. The virtual appliance of the stopped DB instance is shut down and will not be available until restarted. DB instances in a stopped state are charged at the discounted rate for 90 days from the moment they are stopped, and at the regular rate after 90 days. Make sure to delete unused DB instances to avoid unnecessary charges.

> [Note]
> High availability DB instances, masters with read replicas, and read replicas cannot be stopped. If the DB instance is using Floating IP, the Floating IP pricing is charged whether it is stopped or not.

### Create Read Replica

To improve read performance, you can create a read replica which can be used for read-only. You can create maximum five read replicas for one master. You cannot create a read replica of a read replica. We recommend that you make the read replica the same or higher specification as the master. Creating with low specifications may cause to delay replication.

> [Caution]
> When creating a read replica, the master's I/O performance may be lower than usual. The time to create read replica can increase in proportion to the size of the master's database.

> [Note]
> Object storage pricing may occur as much as the binary log size required for the process of creating read replica.

#### Create Read Replica on Subnet in Different Region
* When you connect a region peering between VPCs that exist in different regions, you can create a read replica on a subnet that belongs to a VPC in a different region.
* Even if region peering is connected, if the route settings are incorrect, read replica creation might fail or replication might stop.
* For more information about connecting to region peering, see [Region peering](https://docs.nhncloud.com/ko/Network/Peering%20Gateway/ko/console-guide/#_2).

### Promote Read Replica

Breaking the replication relationship with the master and changing the read replica to the master is called promotion. The promoted master acts as an independent DB instance. If any replication delay between the read replica and the master that you want to promote, it will not be promoted until the delay is gone.

### Force Promote Read Replica

Force promotion to the read replica's point-in-time data, regardless of the state of the master or source region.

### Stop Replication of Read Replicas

Read replicas can be stopped for several reasons. If the status of the read replica is `Replication stopped`, you must quickly determine the cause and perform normalization. If the ` Replication stopped` status persists for a long time, the replication delay will increase. If you do not have the binary log required for normalization, you must rebuild the read replica. The reason for replication stop can be determined by the `SHOW SLAVE STATUS` command in the read replica. If the value
of `Last_Errno` is 1062, you can call the Procedure below until the error disappears.

``` 
mysql> CALL mysql.tcrds_repl_skip_repl_error(); 
```

### Rebuild Read Replica

If you can't resolve the replication stop of read replica, you can rebuild it to normalize it. When rebuilding a read replica, you remove all databases in the read replica and rebuild them based on the master's database. In this process, if the backup file required for the rebuild does not exist on the master, the backup will be performed on the master, which may result in performance degradation.

### Force Restart

You can force restart if MySQL on DB instance is not working properly. For force restart, give the SIGTERM command to MySQL to wait 10 minutes for normal shutdown. If MySQL shuts down successfully within 10 minutes, reboot the virtual machine thereafter. If it does not shut down properly within 10 minutes, force to reboot the virtual machine. If virtual machine is forcibly rebooted, some of the transactions you are working on can be lost, and the data volume may be corrupted and may not be
recovered. After force restart, the state of the DB instance might not return to the available state. In case of this situation, please contact the Customer Center.

> [Caution]  
> Due to the potential for data loss or data volume corruption, this feature should be avoided except in urgent and unavoidable circumstances.

> [Note]
> For high availability DB instances, you cannot force restart.

### Secure Capacity

If your storage is running out of capacity due to sudden heavy loads, you can delete the binary log with the ability to free up space in the web console. If you select securing capacity in the Web Console, a pop-up screen will be displayed where you can select the binary log for DB instance. Select Binary log and press the **Confirm** button to delete all binary logs generated before the selected binary log. Securing Capacity is a feature to temporarily secure capacity. If you continue to run
out of capacity, you may need to set a storage period for binary logs or expand the size of your storage to match the service load.

> [Note]
> You can set the storage period for binary logs with the `expire_logs_days` in MySQL 5.7 and later and the `binlog_expire_logs_seconds` parameter in MySQL 5.8 and later.

> [Caution]
> Depending on the deleted binary log, restoring to a certain point in time may not be possible.

### Apply Parameter Group Changes

When the parameters of parameter group associated with DB instance are modified, they should be reflected. If restart is required to apply the changed parameters, the DB instance is restarted. For more details on the parameter group, see the [Parameter Group](parameter-group/).

### Manage Users

RDS for MySQL provides a feature to easily manage users who access the database through the web console. Users are created when you create a DB instance, and you can freely create, modify, or delete users in an already created DB instance. To this end, It is not allowed to create, modify, or delete users directly via queries in the database. Instead, you can grant permissions to users using predefined permission templates. The following permission templates can be granted to users.

* **READ**
  * You have permission to view.

```sql
GRANT SELECT, SHOW VIEW, PROCESS, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO '{user_id}'@'{host}';
GRANT SELECT ON `mysql`.* TO '{user_id}'@'{host}';
GRANT SELECT, EXECUTE ON `sys`.* TO '{user_id}'@'{host}';
GRANT SELECT ON `performance_schema`.* TO '{user_id}'@'{host}';
```

* **CRUD**
  * Includes READ permission, and has permission to modify data.

```sql
GRANT INSERT, UPDATE, DELETE, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE ON *.* TO '{user_id}'@'{host}';
```

* **DDL**
  * Includes CRUD permissions, and has permissions to execute DDL queries.

```sql
GRANT CREATE, DROP, INDEX, ALTER, CREATE VIEW, REFERENCES, EVENT, ALTER ROUTINE, CREATE ROUTINE, TRIGGER, RELOAD ON *.* TO '{user_id}'@'{host}';
GRANT EXECUTE ON `mysql`.* TO '{user_id}'@'{host}';
```

* **CUSTOM**
  * When restoring a DB instance from an external database backup, all users that exist in the database are represented with the CUSTOM permission.
  * You cannot check what permissions are in the CUSTOM permission template.
  * If you change from one CUSTOM permission template to another permission template, you cannot change back to a CUSTOM permission template.

In MySQL 5.7.33 or higher, you can specify the authentication plugin and TLS Option when creating or changing users. If you change the authentication plugin, you must change the password as well. If you do not change the password, the existing password is used. Applicable authentication plugins by version are as follows.

* Version 5.7

| Authentication Plugin | Description                                   |
|---------|--------------------------------------|
| NATIVE  | Authenticate using `mysql_native_password`. |
| SHA256  | Authenticate using `sha256_password`.       |

* Version 8.0

| Authentication Plugin      | Description                                   |
|--------------|--------------------------------------|
| NATIVE       | Authenticate using `mysql_native_password`. |
| CACHING_SHA2 | Authenticate using `caching_sha2_password`. |

You can encrypt the connection between the client and the database by specifying the TLS Option.

| TLS Option | Description                                                                 |
|------------|--------------------------------------------------------------------|
| NONE       | Encrypted connections are not applied.                                                |
| SSL        | Encrypted connections are applied.                                                    |
| X509       | An encrypted connection is applied and a certificate is required for access. The certificate required for access can be downloaded from the web console. |

## High Availability DB instances

High availability DB instances increase availability, data durability, and provide fault tolerant databases. High availability DB instances consist of master and candidate master and are created in different availability zones. Candidate master is a DB instance for failover and is not normally available. For high availability DB instances, backups are performed on the sample master.

> [Note]
> For high availability DB instances, if you set to use MySQL query statement to force replication from another DB instance or from a master in external MySQL, high availability and some features do not work properly.

### Failure Detection

Candidate master has a process for detecting failures, which periodically detects the state of the master. This detection period is called ping interval and takes failover if four consecutive health checks fail. The shorter the ping interval, the more sensitive to the fault respond is, and the longer the ping interval, the less insensitive the fault respond is. It is important to set the appropriate ping interval for the service load accordingly.

> [Note]
> When the master's storage usage is full, the high availability monitoring process detects it as a failure and takes action, which you should be taken note of.

### Automatic Failover

When the candidate master fails the master's health check four times in a row, it determines that the master is unable to provide service and automatically performs a failover. In order to prevent split brains, disconnect all user security groups assigned to the failed master to block external connections, and the preliminary master will take over the role of the master. A record in the internal domain for access are changed from the failed master to the preliminary master, so no changes to the
application are required. When failover is completed, the type of failed over master changes to the failed over master and the type of candidate master changes to the master. No failover is performed until the failed over master is recovered or rebuilt. Promoted master takes over all automatic backups of the failover master. Point-in-time restoration using existing backups is not supported because the master changes during failover and all binary logs are deleted. You can restore point-in-time
from the time the new backup was performed on the promoted master.

> [Note]
> As the high availability feature is based on a domain, if a client trying to connect is in a network environment where the DNS server cannot be reached, the DB instance cannot be accessed through the domain, and normal connection is not possible in the event of failover. It takes approximately 3 seconds for the changes to A record in the internal domain to take effect, but may vary depending on the DNS Cache policy in the client environment where attempting to connect.

> [Caution]
> If the position number value of the binary log between master and candidate master differs by more than 100,000,000, there is no failover.

### Failed over Master

A master that fails and conducts failover is called failover master. Backups of failed over master are not automatically performed, and all other features other than failed over master recovery, rebuild, separate, and delete are not performed.

### Recover Failed Over Master

If the data is not consistent during failover and the binary log is not lost from the point of failure to the point of attempting recovery, the failed over and promoted masters can be recovered back to the high availability configuration. Because it re-configure replication relationships with the promoted master in the database of the failed over master, recovery fails once the data became inconsistent or once the binary log required for recovery was lost.

If the failed over master fails to recover, you can re-enable the high availability feature by rebuilding.

> [Note]
> Recovery is not supported for DB instances where failover occurred before April 11, 2023.

### Rebuild Failed over Master

If the failed over master fails to recover, you can re-enable the high availability feature by rebuilding. Unlike recovery, rebuild removes all databases from the failed over master and rebuilds them based on the promoted master's database. In this process, if the backup file required for the rebuild does not exist on the promoted master, the backup will be performed, which may result in degrading performance.

### Separate Failed over Master

If recovery of a failed over master fails and data correction is required, you can disable the high availability feature by separating that master. The replication relationship between the separated master and the promoted master is broken, and each behaves as a normal DB instance. After separation, you cannot recover to the existing configuration.

### Manual Failover

For high-availability DB instances, when performing an action that accompanies restart, you can choose whether to restart with failover, and the tasks are as follows.

* Restart DB instance
* Change DB instance type
* Change parameter group
* When parameters that require a restart have changed
* Reflect parameter group changes
* Change storage size

When you restart with failover, the candidate master is restarted first. Failover will then promote the candidate master to the master, and the existing master will serve as a candidate master. Upon promotion, a record of the internal domain for access changes from master to candidate master, hence no changes to the application are required. The promoted master takes over all automatic backups of the previous master. Point-in-time restoration using existing backups is not supported because the
master changes during failover and all binary logs are deleted. You can restore point-in-time from the time the new backup was performed on the promoted master.

> [Note]
> If failover restart is not performed, the master and the candidate master are restarted sequentially.

> [Caution]
> Manual failover will fail if the replication delay `Seconds_Behind_Master` value of spare master is greater than or equal to 1. If the restart fails due to replication delay, you can check it on the event screen.

### Pause High Availability

You can temporarily stop the high availability feature in situations where temporary interruption of connectivity or high load is expected. If the high availability feature is paused, it does not detect failures, and therefore does not fail. Even if a task that requires a restart while the high availability feature is paused do not resume the paused high availability feature. Data replication occurs normal when high availability is paused, but we do not recommend that you pause for a long time
as no failures are to be detected.

## MySQL Procedure

RDS for MySQL provides its own procedures for performing some of the features that are restricted from user accounts to provide user convenience.

### tcrds_active_process

* Retrieves queries in the Processlist that are in the ACTIVE state, not the Sleep state.
* The execution times are printed in the chronological order, and the query contents (SQL) are only printed maximum 100 digits.

``` 
mysql> CALL mysql.tcrds_active_process();
```

### tcrds_process_kill

* Forces to end a specific process.
* The process ID to be terminated can be checked in information_schema, you can use the tcrds_active_process and tcrds_current_lock procedures to refer to the information about the process.

``` 
mysql> CALL mysql.tcrds_process_kill(processlist_id ); 
```

### tcrds_current_lock

* Checks the processes currently waiting for a lock and the process information occupying the lock.
* (w) Process information that column information waits to obtain locks
* (w) Process information that column information waits to obtain locks
* To force end the process occupying a lock , after checking the (B) PROCESS column, perform call tcrds_process_kill(process_id).

``` 
mysql> CALL mysql.tcrds_current_lock();
```

### tcrds_repl_changemaster

* Imports external MySQL DBs into NHN Cloud RDS using replication.
* **Create Replica** on the console can be used to configure replication of NHN Cloud RDS.

``` 
mysql> CALL mysql. tcrds_repl_changemaster (master_instance_ip, master_instance_port, user_id_for_replication, password_for_replication_user, MASTER_LOG_FILE, MASTER_LOG_POS); 
```

* Parameter description
  * master_instance_ip: IP of replication target (Master) server
  * master_instance_port: MySQL Port on the replication target (Master) Server
  * user_id_for_replication: Account for replication to access MySQL on the replication target (Master) server
  * password_for_replication_user: Account password for replication
  * MASTER_LOG_FILE: The binary log file name of the replication target (Master)
  * MASTER_LOG_POS: The binary log position of the replication target (Master)

```
ex) call mysql.tcrds_repl_changemaster('10.162.1.1',10000,'db_repl','password','mysql-bin.000001',4); 
```

> [Caution]
> The account for replication has to be created in the replication target (Master) MySQL.

### tcrds_repl_init

* Initializes MySQL replication information.

``` 
mysql> CALL mysql.tcrds_repl_init(); 
```

### tcrds_repl_slave_stop

* Stops MySQL replication.

``` 
mysql> CALL mysql.tcrds_repl_slave_stop(); 
```

### tcrds_repl_slave_start

* Starts MySQL replication.

``` 
mysql> CALL mysql.tcrds_repl_slave_start();

```

### tcrds_repl_skip_repl_error

* Performs SQL_SLAVE_SKIP_COUNTER=1. The following Duplicate key errors can be resolved by running the tcrds_repl_skip_repl_error procedure.
* `MySQL error code 1062: 'Duplicate entry ? for key ?'`

``` 
mysql> CALL mysql.tcrds_repl_skip_repl_error(); 
```

### tcrds_repl_next_changemaster

* Changes the replication information in order to read the following binary log on the Master.
* The following Duplicate errors can be resolved by running the tcrds_repl_next_changemaster procedure.
* example) MySQL error code 1236 (ER_MASTER_FATAL_ERROR_READING_BINLOG): Got fatal error from master when reading data from binary log

``` 
mysql> CALL mysql.tcrds_repl_next_changemaster(); 
```

### tcrds_innodb_monitor_reset
* A procedure to run the innodb_monitor_reset variables, which reset the counter in the information_schema.INNODB_METRICS table to zero.
* Execute `SET GLOBAL innodb_monitor_reset = '{counter-name|module_name|pattern|all}';`.
* innodb_monitor_enable, innodb_monitor_disable are provided as RDS parameters.

```
mysql> CALL mysql.tcrds_innodb_monitor_reset('{counter-name|module_name|pattern|all}');
```

```
ex) CALL mysql.tcrds_innodb_monitor_reset('dml_reads');
CALL mysql.tcrds_innodb_monitor_reset('module_dml');
```

### tcrds_innodb_monitor_reset_all
* A procedure to run innodb_monitor_reset_all variables that reset the value of counter.
* To use innodb_monitor_reset_all, the counter must be in the disable state.
* Execute `SET GLOBAL tcrds_innodb_monitor_reset_all = '{counter-name|module_name|pattern|all}';`.

```
mysql> CALL mysql.tcrds_innodb_monitor_reset_all('{counter-name|module_name|pattern|all}');
```

## Data Migration

* RDS can be exported as data to or imported from NHN Cloud RDS using mysqldump.
* The mysqldump utility is provided by default when mysql is installed.

### Export using mysqldump

* Prepare and use an instance of NHN Cloud RDS.
* Check that the external instance on which you want to store the data to be exported, or the computer on which the local client is installed, has sufficient capacity.
* If you need to export data outside of NHN Cloud, create Floating IP and connect it to the RDS instance where you want to export the data.
* Export data externally using the mysqldump command below.

#### When exporting files

``` 
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name} 
```

#### Export to mysqldb outside NHN Cloud RDS.

``` 
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} 
```

### Export using mysqldump

* Prepare db outside NHN Cloud RDS to import data.
* Check that the NHN Cloud RDS instance that you import has sufficient capacity.
* Create a Floating IP to connect to the NHN Cloud RDS instance.
* Import data from outside using the mysqldump command below.

``` 
mysqldump -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} --single-transaction --set-gtid-purged=off --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} 
```

#### When `ERROR 1227` occurs during data importing

* `ERROR 1227` occurs when a stored object (trigger, view, function, or event) in the mysqldump file has DEFINER definition.
* To resolve this, delete the `DEFINER` part of the mysqldump file and proceed.

#### When `ERROR 1418` occurs during data importing

* `ERROR 1418` occurs when the function declaration in the mysqldump file does not contain NO SQL, READS SQL DATA, or DETERMINISTIC and binary logging is enabled.
  * For detailed information, refer to [The Binary Log](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html) MySQL document.
* To resolve this, Parameter value of `log_bin_trust_function_creators` of DB instance to which you want to apply mysqldump file should be changed to `1`.

### Export by using replication

* Replication allows you export data from NHN Cloud RDS to external DB.
* The external db version has to be the same as or later than the version of NHN Cloud RDS.
* Prepare an instance of NHN Cloud RDS Master or Read Only Slave to export data.
* Create Floating IP to connect to NHN Cloud RDS instances to export data.
* Create Floating IP to connect to NHN Cloud RDS instances to export data.
* When exporting from Master RDS instance.

``` 
mysqldump -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
 ```

* When exporting from Read Only Slave RDS.

``` 
mysqldump -h{rds_read_only_slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name} 
```

* Open the backed up file and record the MASTER_LOG_FILE and MASTER_LOG_POS written in the annotation separately.
* Check that the external local client or computer on which db is installed has sufficient capacity to back up data from the NHN Cloud RDS instance.
* Add the following options to my.cnf (for winodws my.ini) file in external DB.
* For server-id, enter a value different from the server-id of the DB Configuration entry for the NHN Cloud RDS instance.

``` 
... 
[mysqld] 
... 
server-id={server_id} 
replicate-ignore-db=rds_maintenance 
... 
```

* Restart external DB.
* Enter the backed up file into an external DB using the command below.

``` 
mysql -h{external_db_host} -u{exteranl_db_id} -p{external_db_password} --port={exteranl_db_port} < {local_path_and_file_name} 
```

* Create an account for replication on the NHN Cloud RDS instance.
* Before setting up a new replication, run the query below to initialize existing replication information that may exist. When you run RESET SLAVE, the existing replication information is initialized.

```
 STOP SLAVE;

RESET SLAVE;
```

* Run the query on the external DB as shown below, using the account information to be used for replication and the MASTER_LOG_FILE and MSATER_LOG_POS that recorded earlier.

```
 CHANGE MASTER TO master_host = '{rds_master_instance_floating_ip}', master_user='{user_id_for_replication}', master_password='{password_forreplication_user}', master_port ={rds_master_instance_port}, master_log_file ='{MASTER_LOG_FILE}', master_log_pos = {MASTER_LOG_POS};

START SLAVE;
```

* If the source data of the external DB and the NHN Cloud RDS instance are identical, use the STOP SLAVE command to the external DB to terminate the replication

### Import with Replication

* You can import external DBs into NHN Cloud RDS using replication.
* NHN Cloud RDS version has to be the same as or later than the external DB version.
* Connect the data to an external MySQL instance to which it is exported.
* Use the command below to back up data from an external MySQL instance.
* When importing from an external MySQL instance (master)

``` 
mysqldump -h{master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name} 
```

* When importing from an external MySQL instance (slave)

``` 
mysqldump -h{slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name} 
```

* Open the backed up file and record the MASTER_LOG_FILE and MASTER_LOG_POS in the annotation separately.
* Check that you have enough space on the client or computer to back up data from the NHN Cloud RDS instance.
* Add the following options to my.cnf (for winodws my.ini) file in external DB.
* For server-id, enter a value different from the server-id of the DB Configuration entry for the NHN Cloud RDS instance.

```
 ... 
 [mysqld] 
 ... 
 server-id={server_id} 
 replicate-ignore-db=rds_maintenance 
 ... 
 ```

* Restart external DB.
* As importing over an external network can take a long time,
* We recommend that you create an internal NHN Cloud Image, copy the backup file, and import it into NHN Cloud.
* Enter the backed up file into NHN Cloud RDS with the command below.
* Replication configuration does not support DNS, so convert to IP and run.

``` 
mysql -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} < {local_path_and_file_name} 
```

* Create an account for replication on an external MySQL instance.

``` 
mysql> CREATE USER 'user_id_for_replication'@'{external_db_host}' IDENTIFIED BY '<password_forreplication_user>'; mysql> GRANT REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'user_id_for_replication'@'{external_db_host}'; 
```

* Run a query on NHN Cloud RDS as follows,
  using the account information to be used for replication and the MASTER_LOG_FILE and MSATER_LOG_POS that recorded earlier.

``` 
mysql> call mysql.tcrds_repl_changemaster ('rds_master_instance_floating_ip',rds_master_instance_port,'user_id_for_replication','password_forreplication_user','MASTER_LOG_FILE',MASTER_LOG_POS ); 
```

* To start replication, run the procedure below.

``` 
mysql> call mysql.tcrds_repl_slave_start; 
```

* When the source data of the external DB and NHN Cloud RDS instance become the same, use the command below to end the replication.

```
mysql> call mysql.tcrds_repl_init(); 
```