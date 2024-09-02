## Database > RDS for MySQL > Backup and Restoration

## Backup 개요

You can prepare in advance to recover the database of DB instance in case of failure. You can perform backups through the web console whenever necessary, and you can configure to perform backups periodically. During backup, storage performance of the DB instance on which the backup is performed can be degraded. To avoid affecting service, it is better to perform back up at a time when the service is under low load. 백업으로 인한 성능 저하를 원치 않을 경우 고가용성 구성을 사용하거나, 이전 백업 이후 데이터의 증분만 백업하거나, 읽기 복제본에서 백업을 수행할 수도 있습니다.

> [Note]
> High availability DB instances are backed up on the extra master without compromising the master's storage performance.
> 단, 다음의 경우 고가용성 DB 인스턴스이더라도 마스터에서 백업이 수행될 수 있습니다.
> * 예비 마스터 장애로 인해 백업 수행이 불가능한 상태인 경우
> * 예비 마스터 재구축을 위해 예비 마스터가 아닌 다른 DB 인스턴스에서 수행한 백업이 필요한 상황에서 읽기 복제본이 없는 경우

RDS for MySQL uses Percona XtraBackup to back up databases. You have to use the same version of Percona XtraBackup that RDS for MySQL uses to restore to backup of external MySQL or to restore to backup of RDS for MySQL.
Percona XtraBackup version in line with DB engine version is as follows.

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
| 8.0.36        | 8.0.35             |

* For detailed information about installing XtraBackup, visit the Percona home page.
  * https://www.percona.com/doc/percona-xtrabackup/2.4/index.html
  * https://www.percona.com/doc/percona-xtrabackup/8.0/index.html

> [Note]
> On August 17, 2023, the version of the XtraBackup utility was upgraded. The XtraBackup version used for the previous backup can be found in the web console.

## 백업 종류

백업은 수동 백업과 자동 백업으로 구분할 수 있습니다.

### Manual Backup

If you need to permanently store databases at a certain point in time, you can perform backups manually from the web console. Unlike auto backups, manual backups are not deleted, unless you explicitly delete the backup, as they are when DB instance is deleted.
수동 백업 생성 시에는 백업 이름을 지정해야 하며, 다음과 같은 제약 사항이 있습니다.
* Backup name has to be unique for each region.
* Backup names are alphabetic, numeric, and - _ between 1 and 100 Only, and the first character has to be an alphabet.

![db-instance-backup-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-backup-en.png)
![backup-list-1-en](https://static.toastoven.net/prod_rds/24.09.10/backup-list-1-en.png)

**수동 전체 백업 생성하기**

❶ DB 인스턴스 목록에서 백업할 DB 인스턴스 선택 후 **백업**을 클릭하여 수동으로 전체 백업을 생성할 수 있습니다.
❷ 백업 목록에서 **전체 백업 생성**을 클릭하고 백업할 DB 인스턴스를 지정하여 수동으로 전체 백업을 생성할 수 있습니다.

**수동 증분 백업 생성하기**

❸ 백업 목록에서 기준 백업을 선택 후 **증분 백업 생성**을 클릭하여 증분 백업을 생성할 수 있습니다. 일부 백업은 기준 백업으로 선택할 수 없습니다. 기준 백업에 대한 자세한 설명은 [기준 백업](#기준-백업)을 참고합니다.

### Auto Backup

In addition to manually performing backups, auto backups can occur when needed for restore operations or based on auto backup schedule settings.
자동 백업 시에 적용되는 설정 항목은 [자동 백업 설정](#자동-백업-설정)을 참고합니다.

## 백업 방식

전체 백업과 증분 백업 방식이 제공됩니다.

### 전체 백업

DB 인스턴스의 모든 데이터를 백업합니다.

### 증분 백업

기준 백업이 수행된 이후의 데이터 변경분 만을 증분 방식으로 백업합니다. 변경이 잘 일어나지 않는 데이터가 대부분인 경우 추천됩니다.
증분 백업은 항상 기준 백업을 수행했던 DB 인스턴스에서 수행됩니다.
증분 백업으로 복원 시 최초 생성된 전체 백업 복원을 진행하고, 선택한 증분 백업에 도달할 때까지의 모든 증분이 순차적으로 반영됩니다.

> [주의]
> 증분 백업으로 복원 시에는 전체 백업으로 복원할 때보다 복원에 더 많은 시간이 소요될 수 있으며 이는 복원에 필요한 증분 백업들의 용량의 합에 비례합니다.

#### 기준 백업

증분 백업에는 데이터 변경사항의 기준이 될 백업이 필요합니다. 증분 백업도 새로운 증분 백업의 기준 백업이 될 수 있습니다.

증분 백업의 기준이 되는 백업에는 다음 제약사항이 존재합니다. 수동 및 자동으로 증분 백업 시에 공통으로 적용됩니다.
* 에러 상태의 백업은 기준 백업이 될 수 없습니다.
* 마지막 장애 조치 이전에 생성된 백업은 기준 백업이 될 수 없습니다.
* 마지막 DB 엔진 버전 업그레이드 이전에 생성된 백업은 기준 백업이 될 수 없습니다.
* 이미 해당 백업을 기준으로 한 증분 백업이 존재하는 경우 기준 백업이 될 수 없습니다. 단, 이전 증분이 실패한 경우에는 동일한 백업을 기준으로 증분이 가능합니다.
* 해당 백업을 수행했던 DB 인스턴스가 삭제되었거나 장애로 인해 백업을 수행할 수 없는 상태라면 기준 백업이 될 수 없습니다.
* 2024년 9월 정기 배포 이전에 생성된 백업은 기준 백업이 될 수 없습니다.

[자동 백업 스케줄 전략](#자동-백업-설정)에 따라 증분 백업이 스케줄 되는 경우 위 제약사항과 함께 다음 추가 제약사항을 만족하는 기준 백업이 자동으로 선택됩니다. 제약사항을 만족하는 기준 백업이 없는 경우 자동 백업 스케줄 전략과 관계 없이 전체 백업을 수행합니다.
* 복제 중단 상태인 예비 마스터, 읽기 복제본에서 수행된 백업은 기준 백업이 될 수 없습니다.
* 테이블 잠금을 사용하지 않은 상태에서 수행된 백업은 기준 백업이 될 수 없습니다.
* 해당 백업 생성 이후에 새로운 전체 백업이 생성된 경우 기준 백업이 될 수 없습니다.

## 백업 설정

DB 인스턴스 생성 및 수정 시 백업에 적용될 설정 항목들을 지정할 수 있습니다.

![db-instance-backup-en](https://static.toastoven.net/prod_rds/24.09.10/db-instance-backup-en.png)

### 공통 설정
The following settings are applied to backup, and also to auto and manual backups.

**Use Table Lock**

* `FLUSH TABLES WITH READ LOCK` ets whether the syntax is enabled or disabled.
* Table lock enables the `FLUSH TABLES WITH READ LOCK` syntax periodically during backups to ensure consistency in backup data. If `FLUSH TABLES WITH READ LOCK` syntax fails to run, the backup will fail.
* You can disable table locking if the DML query load is high during a backup. If you do not use table lock, `FLUSH TABLES WITH READ LOCK` syntax will not run, so a high DML load does not cause the backup to fail. However, backups without table lock may not ensure consistency of backup data, and as a result, some operations, including restore and replication processes, are not supported for backups created without table lock and for DB instances with table locking disabled.

**Query Latency Dash Time (second)**

* When using table lock, set the wait time for `FLUSH TABLES WITH READ LOCK` syntax. `FLUSH TABLES WITH READ LOCK` syntax will wait for the query latency dash time. It can be set from 0 to 21,600 seconds. Longer settings reduce the likelihood of backup failures due to DML query load, but may result in longer overall backup times.


### 자동 백업 설정

The following setting items are supported by auto backups.

**Allow Auto Backup**

* If you don't allow auto backups, all auto backups will be blocked from taking place, and some operations, including restore and replication processes, that might otherwise take place on demand, will not be supported. In addition, you won't be able to set the following auto backup-related items

**Auto Backup Retention Period**

* Sets the time period for storing auto backups on storage. It can be kept for up to 730 days, and if the auto backup archive period changes, the expired auto backup files will be deleted immediately.

  > [주의]
  > 증분 방식으로 생성된 백업은 자동 백업 보관 기간이 지나지 않았더라도 기준 백업이 삭제될 때 함께 삭제됩니다.

**Auto Backup Replication Region**

* Set the auto backup file to be replicated to backup storage in another region. Auto Backup replication regions are features for disaster recovery that replicate and manage auto backup files from the original region equally to the destination region. Replication occurs in the background at regular intervals. When you set up an auto backup replication region, you are charged with inter-regional replication traffic, and the destination region is charged additionally for backup storage usage.

**Number of Auto Backup Retries**

* You can set the auto backup to retry if it fails due to DML query load or for other various reasons. You can retry maximum 10 times. Depending on the auto backup run time setting, you might not try again even if there are still more retries.

**Use Auto Backup Schedule**

* When using an auto backup schedule, backups are performed automatically at the auto backup performance time you set.

**자동 백업 스케줄 전략**

* 자동 백업을 수행할 전략을 지정할 수 있습니다.
  * 매일 전체 백업 : 매일 전체 데이터를 백업합니다.
  * 매일 전체 및 증분 백업 : 매일 전체 데이터를 1회 백업하고, 수 회 증분을 백업합니다.
  * 주간 전체 백업 및 일일 증분 백업 : 특정 요일에 전체 데이터를 1회 백업하고, 나머지 요일에는 증분을 1회 백업합니다.

**전체 데이터 백업 요일**

* 주간 전체 백업 및 일일 증분 백업 전략 사용 시에만 지정 가능합니다. 최소 1개 ~ 최대 6개의 요일을 선택해야 하며, 선택한 요일에는 전체 백업이 진행되고 선택하지 않은 요일에는 증분 백업이 진행됩니다.

**Auto Backup Run Time**

* Allows you set the time that the backup automatically takes place. It consists of the backup start time, the backup window, and the backup retry expiration time. You can set the backup run time multiple times so that it does not overlap. Performs backup at any point in the backup window based on the start time of the backup. The backup window is not related to the total running time of the backup. Backup time is proportional to the size of the database and the service load. If the backup fails, retry the backup based on the number of backups retries if it does not exceed the backup retries times.

> [Caution]
> Backups may not be performed in some situations, such as when a previous backup fails to terminate.
> 스케줄 상 증분 백업을 수행할 차례이더라도 증분이 가능한 기준 백업이 존재하지 않는 경우 전체 백업이 수행될 수 있습니다.
> 증분 가능한 기준 백업에 대한 자세한 설명은 [기준 백업](#기준-백업) 항목을 참고합니다.

### Backup Storage and Pricing

All backup files are uploaded to the internal backup storage and stored. For manual backups, they are stored permanently until you delete them separately, and backup storage charges are incurred depending on the backup capacity. For auto backups, it is stored for the set retention period and charges for the full size of the auto backup file, which exceeds the storage size of the DB instance. If you do not have direct access to the internal backup storage where the backup file is stored, and when you need backup file, you can export the backup file to the object storage in NHN Cloud.

### Export Backup

#### 백업을 수행하면서 파일 내보내기

백업을 수행함과 동시에 백업 파일을 사용자 오브젝트 스토리지로 내보낼 수 있습니다. 증분 백업에 대해서는 지원되지 않습니다.

![db-instance-list-export-obs-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-list-export-obs-en.png)

![db-instance-list-export-obs-modal-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-list-export-obs-modal-en.png)

❶ Select the DB instance to back up and click **Export Backup to Object Storage**from the drop-down menu, and the settings pop-up screen will appear.
❷ Enter the tenant ID of the object storage where the backup will be saved. You can find the tenant ID in the API endpoint settings.
❸ Enter the NHN Cloud member or IAM member of the object storage where the backup will be saved.
❹ Enter the API password of the object storage where the backup will be saved.
❺ Enter the container of the object storage where the backup will be saved.
❻ Enter the path to the backup that will be stored in the container. The folder name can be up to 255 bytes, and the full path can be up to 1024 bytes. Certain forms (. or ..) are not allowed, and special characters (' " < > ;) and spaces are not allowed.

#### Export Backup Files

You can export backup files stored on your internal backup storage to user object storage in NHN Cloud. 증분 백업에 대해서는 지원되지 않습니다.

![db-instance-detail-backup-export-ko](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-backup-export-ko.png)

❶ On the Details tab of the source DB instance from which the backup was taken, select the backup file to export and click **Export Backup to Object Storage**, and a pop-up screen will appear to export the backup.

![backup-export-en](https://static.toastoven.net/prod_rds/24.03.12/backup-export-en.png)

Select the backup file to export from the **Backup** tab and click **Export to Object Storage**.

> [Note]
> For manual backups, if the source DB instance that performed the backup was deleted, you cannot export the backup.

## Restoration

Backups allow you to restore data to any point in time. Restoration always creates new DB instance and cannot be restored to the existing DB instance. You can restore only to the same DB engine version as the source DB instance from which you performed the backup. Supports restoring snapshots to the point in time when the backup was created, and restoring point in time to a specific point in time. You can restore it as backup of external MySQL as well as backup that you created in RDS for MySQL.

> [Caution]
> Restoration might fail if the data storage size of the DB instance that you want to restore is smaller than the data storage size of the source DB instance that you backed up, or if you use a different parameter group than the parameter group of the source DB instance.

### Snapshot Restoration

You can restore using only the backup file, so you don't need the original DB instance from which the backup was taken. To restore a snapshot from the web console,

![db-instance-snapshot-restoration-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-snapshot-restoration-en.png)

❶ Select the backup file you want to restore On the details tab of the dB instance, and then click **Restore Snapshot**to go to the Restore DB instance screen.

Or

![snapshot-restoration-en](https://static.toastoven.net/prod_rds/24.03.12/snapshot-restoration-en.png)

❶ On the Backup tab, select the backup file you want to restore, and then click **Restore Snapshot**.

### Point-in-time Restoration

Restoring to a particular point in time is called point-in-time restoration. You can restore to a specific position in the binary log, as well as to restore to a specific time. Point-in-time restoration requires backup file and binary log from the time you performed the backup to the time you wanted the restore. Binary logs are stored in the storage of the source DB instance where the backup is performed. Shorter binary log retention period allows you to use more storage capacity, but it may be
difficult to restore to the desired point in time. For the cases listed below, you may not be able to restore to the desired point in time because there is no binary log required for point-in-time restoration.

* When you have deleted the binary log of the source DB instance for securing capacity
* When the binary log is automatically deleted by MySQL based on the Binary log retention period
* When a binary log is deleted due to a failover of a high availability DB instance
* When binary logs are corrupted or deleted for various other reasons

To restore a point in time from the web console

![point-in-time-restoration-list-en](https://static.toastoven.net/prod_rds/24.03.12/point-in-time-restoration-list-en.png)

❶ Select the DB instance you want to restore to a point in time and click **\+ Restore Point-In-Time** to go to the page where you can set up a point in time restore.

#### Restore with Timestamp

When restoring with a timestamp, proceed with the restoration based on the backup file closest to the selected point in time, and then applies a binary log up to the desired point in time.

![point-in-time-restoration-01-en](https://static.toastoven.net/prod_rds/24.03.12/point-in-time-restoration-01-en.png)

❶ Select a restore method.

![point-in-time-restoration-02-en](https://static.toastoven.net/prod_rds/24.03.12/point-in-time-restoration-02-en.png)

❷ Select a restore time. You can restore to the most recent point in time, or you can enter a specific point in time.

![point-in-time-restoration-03-en](https://static.toastoven.net/prod_rds/24.03.12/point-in-time-restoration-03-en.png)

❸ Click **Confirm the last query to be restored** to display a pop-up screen where you can confirm the last query to be restored.


#### Restore using binary logs

The restore with binary log process first restores to the selected backup file and then applies the binary log to the desired location.

![point-in-time-restoration-04-en](https://static.toastoven.net/prod_rds/24.03.12/point-in-time-restoration-04-en.png)

❹ To restore to a binary log, you must first select a backup file.
❺ Select a binary log file.
❻ Enter a specific location for the binary log.

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

You can use the backup file in RDS for MySQL to restore the database in MySQL directly. 전체 백업에 대해서만 복원이 가능하며, 증분 백업 반영은 지원되지 않습니다. When restoring a RDS for MySQL backup file, refer to the [Backup](backup-and-restore/#_1) and use the same version as Percona XtraBackup used by RDS for MySQL.

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