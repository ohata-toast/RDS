## Database > RDS for MySQL > Backup and Restoration

## Backup

You can prepare in advance to recover the database of DB instance in case of failure. You can perform backups through the web console whenever necessary, and you can configure to perform backups periodically. During backup, storage performance of the DB instance on which the backup is performed can be degraded. To avoid affecting service, it is better to perform back up at a time when the service is under low load. If you do not want the backup to degrade performance, you can use a
high-availability configuration or perform backups from read replica.

> [Note]
> High availability DB instances are backed up on the extra master without compromising the master's storage performance.

RDS for MySQL uses Percona XtraBackup to back up databases. You have to use the same version of Percona XtraBackup that RDS for MySQL uses to restore to backup of external MySQL or to restore to backup of RDS for MySQL Percona XtraBackup version in line with DB engine version is as follows.

| MySQL version | XtraBackup version |
|---------------|--------------------|
| 5.7.15        | 2.4.28             |
| 5.7.19        | 2.4.28             |
| 5.7.26        | 2.4.28             |
| 5.7.33        | 2.4.28             |
| 5.7.37        | 2.4.28             |
| 8.0.18        | 8.0.32             |
| 8.0.23        | 8.0.32             |
| 8.0.28        | 8.0.32             |
| 8.0.32        | 8.0.32             |
| 8.0.33        | 8.0.33             |
| 8.0.34        | 8.0.34             |
| 8.0.35        | 8.0.35             |

* For detailed information about installing XtraBackup, visit the Percona home page.
  * https://www.percona.com/doc/percona-xtrabackup/2.4/index.html
  * https://www.percona.com/doc/percona-xtrabackup/8.0/index.html

> [Note]
> On August 17, 2023, the version of the XtraBackup utility was upgraded. The XtraBackup version used for the previous backup can be found in the web console.

백업 시에 적용되는 설정 항목은 다음과 같으며, 자동 백업 및 수동 백업 시에 모두 적용됩니다.

**Use Table Lock**

* `FLUSH TABLES WITH READ LOCK` ets whether the syntax is enabled or disabled.
* Table lock enables the `FLUSH TABLES WITH READ LOCK` syntax periodically during backups to ensure consistency in backup data. If `FLUSH TABLES WITH READ LOCK` syntax fails to run, the backup will fail.
* You can disable table locking if the DML query load is high during a backup. If you do not use table lock, `FLUSH TABLES WITH READ LOCK` syntax will not run, so a high DML load does not cause the backup to fail. 하지만 테이블 잠금을 사용하지 않은 백업은 백업 데이터의 일관성이 보장되지 않을 수 있으며, 이에 따라 테이블 잠금을 사용하지 않고 생성된 백업 및 테이블 잠금을 사용하지 않도록 설정된 DB 인스턴스에 대해 복원 및 복제 과정을 포함한 일부 작업을 지원하지 않습니다.

** Query Latency Dash Time (second)**

* When using table lock, set the wait time for `FLUSH TABLES WITH READ LOCK` syntax. `FLUSH TABLES WITH READ LOCK` syntax will wait for the query latency dash time. It can be set from 0 to 21,600 seconds. Longer settings reduce the likelihood of backup failures due to DML query load, but may result in longer overall backup times.

### Manual Backup

If you need to permanently store databases at a certain point in time, you can perform backups manually from the web console. Unlike automatic backups, manual backups are not deleted, unless you explicitly delete the backup, as they are when DB instance is deleted Manual backups require you to enter a name for the backup and have the following limitations.

* Backup name has to be unique for each region.
* Backup names are alphabetic, numeric, and - _ between 1 and 100 Only, and the first character has to be an alphabet.

### Auto Backup

수동으로 백업을 수행하는 경우 외에도 복원 작업을 위해 필요한 경우 또는 자동 백업 스케줄 설정에 따라 자동 백업이 수행될 수 있습니다. 자동 백업은 DB 인스턴스와 생명 주기가 동일합니다. DB 인스턴스가 삭제되면 보관된 자동 백업은 모두 삭제됩니다. 자동 백업에서 지원하는 설정 항목은 아래와 같습니다.

**자동 백업 허용**

* 자동 백업을 허용하지 않을 시 모든 자동 백업의 수행이 차단되며, 필요에 의해 백업이 수행될 가능성이 있는 복원, 복제 과정을 포함한 일부 작업을 지원하지 않습니다. 또한 아래의 자동 백업 관련 항목들에 대해 설정이 불가능합니다.

**자동 백업 보관 기간**

* 자동 백업을 백업 스토리지에 저장하는 기간을 설정합니다. 최대 730일까지 보관할 수 있으며, 자동 백업 보관 기간이 변경되면 보관 기간이 지난 자동 백업 파일은 바로 삭제됩니다.

**자동 백업 재시도 횟수**

* DML 쿼리 부하 또는 여러 다양한 이유로 자동 백업이 실패한 경우 재시도하도록 설정할 수 있습니다. 최대 10회까지 재시도할 수 있습니다. 재시도 횟수가 남아 있더라도 자동 백업 수행 시간 설정에 따라 재시도하지 않을 수 있습니다.

**자동 백업 스케줄 사용**

* 자동 백업 스케줄 사용 시 설정한 자동 백업 수행 시간에 자동으로 백업이 수행됩니다.

**자동 백업 수행 시간**

* 백업이 자동으로 수행되는 시간을 설정할 수 있습니다. It consists of the backup start time, the backup window, and the backup retry expiration time. You can set the backup run time multiple times so that it does not overlap. Performs backup at any point in the backup window based on the start time of the backup. The backup window is not related to the total running time of the backup. Backup time is proportional to the size of the database and the service load. If the backup fails, retry the
  backup based on the number of backups retries if it does not exceed the backup retries times.

Auto backup name is given in the format of `{DB instance name} yyyy-MM-dd-HH-mm`.

> [Caution]
> If you are unable to perform backup, for example, if the previous backup does not end, the backup may not be performed.

### Backup Storage and Pricing

All backup files are uploaded to the internal object storage and stored. For manual backups, they are stored permanently until you delete them separately, and object storage charges are incurred depending on the backup capacity. For automatic backups, it is stored for the set retention period and charges for the full size of the automatic backup file, which exceeds the storage size of the DB instance. If you do not have direct access to the internal object storage where the backup file is
stored, and when you need backup file, you can export the backup file to the object storage in NHN Cloud.

### Export Backup

You can export backup files stored on internal object storage to user object storage on NHN Cloud. You can also export a manual or automatic backup file, or export the backup file to user object storage at the same time as you perform the backup. While exporting backups, network performance of the source DB instance may degrade.

> [Note]
> For manual backups, if the source DB instance that performed the backup was deleted, you cannot export the backup.

## Restoration

Backups allow you to restore data to any point in time. Restoration always creates new DB instance and cannot be restored to the existing DB instance. You can restore only to the same DB engine version as the source DB instance from which you performed the backup. Supports restoring snapshots to the point in time when the backup was created, and restoring point in time to a specific point in time. You can restore it as backup of external MySQL as well as backup that you created in RDS for MySQL.

> [Caution]
> Restoration might fail if the storage size of the DB instance that you want to restore is smaller than the storage size of the source DB instance that you backed up, or if you use a different parameter group than the parameter group of the source DB instance.

### Snapshot Restoration

Restoring a backup to a point in time is called snapshot restoration. Restoration is done with only backup files, you do not need the source DB instance from which you performed the backup.

### Point-in-time Restoration

Restoring to a particular point in time is called point-in-time restoration. You can restore to a specific position in the binary log, as well as to restore to a specific time. Point-in-time restoration requires backup file and binary log from the time you performed the backup to the time you wanted the restore. Binary logs are stored in the storage of the source DB instance where the backup is performed. Shorter binary log retention period allows you to use more storage capacity, but it may be
difficult to restore to the desired point in time. For the cases listed below, you may not be able to restore to the desired point in time because there is no binary log required for point-in-time restoration.

* When you have deleted the binary log of the source DB instance for securing capacity
* When the binary log is automatically deleted by MySQL based on the Binary log retention period
* When a binary log is deleted due to a failover of a high availability DB instance
* When binary logs are corrupted or deleted for various other reasons

### Restoration with External MySQL Backup

You can use an external MySQL backup file to create a DB instance. When creating an external MySQL backup file, refer to [Backup](backup-and-restore/#_1) and use the same version as the Percona XtraBackup used by RDS for MySQL.

> [Caution]
> If the setting value of innodb\_data\_file\_path is not ibdata1:12M:autoextend, it is unable to restore to DB instance of RDS for MySQL.

(1) Use the command below to perform a backup on the server where MySQL is installed.

**XtraBackup 2.4.xx Example**

``` 
innobackupex --defaults-file={my.cnf path} --user {user} --password '{password}' --socket {MySQL socket file path} --compress --compress-threads=1 --stream=xbstream {directory where create backup file} 2>>{backup log file path} > {backup file path} 
```

**XtraBackup 8.0.xx Example**

```
xtrabackup --defaults-file={my.cnf path} --user={ user } --password='{ password }' --socket={MySQL socket file path } --compress --compress-threads=1 --stream=xbstream --backup { directory where create backup file } 2>>{ backup log file path } > { backup file path } 
```

(2) Check that `completed OK!` is in the last line of the backup log file. If there is no `completed OK!`, the backup did not end successfully, so refer to the error message in the log file to proceed with the backup again.

(3) Upload the completed backup file to the object storage.

* The maximum file size that can be uploaded at a time is 5GB.
* If the backup file is larger than 5GB, you have to use a utility such as split to cut the backup file to less than 5GB and upload it in multi-part.
* For detailed information, refer to [Multipart Upload](/Storage/Object%20Storage/ko/api-guide/#_44).

(4) After accessing the web console of the project you want to restore, on the DB Instances tab, click the **Restore to Backup in Object Storage** button.

> [Caution]
> In the current version of 5.7.33, restoring DB instances using backup files on object storage is restricted.
> If use a version other than the recommended XtraBackup, it may not work properly.
> The backup file on the object storage has to be the same version of MySQL that you want to restore.

### Restoration by Using RDS for MySQL Backup

You can use the backup file in RDS for MySQL to restore the database in MySQL directly. When restoring a RDS for MySQL backup file, refer to the [Backup](backup-and-restore/#_1) and use the same version as Percona XtraBackup used by RDS for MySQL.

(1) Export backup of RDS for MySQL to object storage with reference to the [Export Backup](backup-and-restore/#_5).

(2) Download the backup of the object storage to the server on which you want to restore it.

(3) Stop the MySQL service.

(4) Delete all files in the MySQL data storage path.

``` 
rm -rf {MySQL data storage path}/* 
```

(5) Unzip and restore the downloaded backup files.

**XtraBackup 2.4.xx Example**

``` 
cat {backup file storage path} | xbstream -x -C {MySQL data storage  path} 
innobackupex --decompress {MySQL data storage path} 
innobackupex --defaults-file={my.cnf path} --apply-log {MySQL data storage path} 
```

**XtraBackup 8.0.xx Example**

``` 
cat { backup file storage path } | xbstream -x -C {MySQL data storage  path } 
xtrabackup --decompress --target-dir={MySQL data storage  path } 
xtrabackup --prepare --target-dir={MySQL data storage  path } 
xtrabackup --defaults-file={my.cnf path} --copy-back --target-dir={MySQL data storage  path } 
```

(6) Delete unnecessary files after unzipping files.

``` 
find {MySQL data storage  path } -name "*.qp" -print0 | xargs -0 rm 
```

(7) Start MySQL service. 