## Database > RDS for MariaDB > Backup and Restoration

<a id="overview"></a>
## Backup Overview

You can prepare in advance to recover the database of DB instance in case of failure. You can perform backups through the console whenever necessary, and you can configure to perform backups periodically. During backup, storage performance of the DB instance on which the backup is performed can be degraded. To avoid affecting service, it is better to perform back up at a time when the service is under low load. If you do not want the backup to degrade performance, you can use a
high-availability configuration or back up only increments of data since the previous backup, or perform backups from read replica.

> [Note]
> High availability DB instances perform backups on the redundant master so that the storage performance of the master is not degraded.
> However, backups can be performed on the master even if it is a high availability DB instance in the following cases.
> * If a backup cannot be performed due to a candidate master failure.
> * If you do not have a read replica in a situation where you need a backup taken from a DB instance other than the candidate master for rebuilding the candidate master and you do not have a read replica


## Backup Type

Backups can be categorized into manual and automa backups.

### Manual Backup

You can perform a manual backup from the console to permanently save a database at a specific point in time. Unlike auto backups, manual backups are not deleted when the DB instance is deleted, unless you explicitly delete the backup.
When creating a manual backup, you must specify a name for the backup, with the following limitations.
* Backup name has to be unique for each region.
* Backup names are alphabetic, numeric, and - _ between 1 and 100 Only, and the first character has to be an alphabet.

![db-instance-backup-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-backup-en.png)
![backup-list-en](https://static.toastoven.net/prod_rds/mariadb/24.11.12/backup-list-en.png)

**Create a manual full backup**

❶ You can create a full backup manually by selecting the DB instance to back up from the DB instances list and clicking **Backup**.
❷ You can create a full backup manually by clicking **Create Full Backup** in the backup list and specifying the DB instances to back up.

**Create a Manual Incremental Backup**

❸ You can create an incremental backup by selecting a baseline backup from the backup list and then clicking **Create incremental backup**. Some backups cannot be selected as a baseline backup; for a detailed description of baseline [backups](#기준-백업), see [Baseline backups](#기준-백업).


### Auto Backup

In addition to performing backups manually, auto backups can occur when required for restore operations or based on scheduled auto backup settings.
For settings that apply during auto backups, see [Auto Backup Settings](#자동-백업-설정).

## Backup Method

Full and incremental backups are available.

### Full Backup

Backs up all data in the DB instance.

### Incremental Backup

Incremental backups only back up data changes since the baseline backup was performed. Recommended if your data is mostly immutable.
Incremental backups are always performed on the DB instance that performed the baseline backup.
When restoring to an incremental backup, the restore proceeds from the first full backup created, and all increments are reflected sequentially until the selected incremental backup is reached.

> [Caution]
> Restoring from incremental backups may take more time than restoring from a full backup, which is proportional to the sum of the capacity of the incremental backups required for the restore.
#### Baseline Backup

Incremental backups require a backup to baseline data changes on. An incremental backup can also be the baseline backup for a new incremental backup.

The following limitations exist for backups that are the basis for incremental backups. They are common to both manual and auto incremental backups.
* A backup in an error state cannot be a baseline backup.
* A backup created before the last failover cannot be the baseline backup.
* A backup created before the last DB Engine version upgrade cannot be a baseline backup.
* If an incremental backup already exists that is based on that backup, it cannot be the baseline backup. However, if the previous increment failed, you can increment based on the same backup.
* If the DB instance that took that backup has been deleted or is unable to take a backup due to failure, it cannot be the baseline backup.
* Backups created before the September 2024 scheduled release cannot be baseline backups.

When incremental backups are scheduled according to [Auto Backup Strategy](#Set-Auto-Backup), a baseline backup that satisfies the above constraints, plus the following additional constraints, is automatically selected. If no baseline backup satisfies the constraints, a full backup is performed regardless of the auto backup strategy.
* A backup performed on a candidate master, read replica that is in a replication down state cannot be a baseline backup.
* A backup performed without table locks enabled cannot be a baseline backup.
* If a new full backup was created after that backup was created, it cannot be the baseline backup.

## Backup Settings

When creating and modifying DB instances, you can specify settings that will be applied to backups.

![db-instance-backup-form-en](https://static.toastoven.net/prod_rds/mariadb/24.11.12/db-instance-backup-form-en.png)

### Common Settings
The following topics are common to both auto and manual backups.

**Use Table Lock**

* `FLUSH TABLES WITH READ LOCK` ets whether the syntax is enabled or disabled.
* Table lock enables the `FLUSH TABLES WITH READ LOCK` syntax periodically during backups to ensure consistency in backup data. If `FLUSH TABLES WITH READ LOCK` syntax fails to run, the backup will fail.
* You can disable table locking if the DML query load is high during a backup. If you do not use table lock, `FLUSH TABLES WITH READ LOCK` syntax will not run, so a high DML load does not cause the backup to fail. However, backups without table lock may not ensure consistency of backup data, and as a result, some operations, including restore and replication processes, are not supported for backups created without table lock and for DB instances with table locking disabled.

**Query Latency Dash Time (second)**

* When using table lock, set the wait time for `FLUSH TABLES WITH READ LOCK` syntax. `FLUSH TABLES WITH READ LOCK` syntax will wait for the query latency dash time. It can be set from 0 to 21,600 seconds. Longer settings reduce the likelihood of backup failures due to DML query load, but may result in longer overall backup times.


### Set Auto Backup

The following items apply only to auto backups.

**Allow Auto Backup**

* If you don't allow auto backups, all auto backups will be blocked from taking place, and some operations, including restore and replication processes, that might otherwise take place on demand, will not be supported. In addition, you won't be able to set the following auto backup-related items

**Auto Backup Retention Period**

* Sets the time period for storing auto backups on storage. It can be kept for up to 730 days, and if the auto backup archive period changes, the expired auto backup files will be deleted immediately.

> [Caution]
> Incrementally created backups are deleted when the baseline backup is deleted, even if the auto backup retention period has not passed.

**Auto Backup Replication Region**

* Set the auto backup file to be replicated to backup storage in another region. Auto Backup replication regions are features for disaster recovery that replicate and manage auto backup files from the original region equally to the destination region. Replication occurs in the background at regular intervals. When you set up an auto backup replication region, you are charged with inter-regional replication traffic, and the destination region is charged additionally for backup storage usage.

**Number of Auto Backup Retries**

* You can set the auto backup to retry if it fails due to DML query load or for other various reasons. You can retry maximum 10 times. Depending on the auto backup run time setting, you might not try again even if there are still more retries.

**Use Scheduled Auto Backup**

* When using scheduled auto backups, backups are performed automatically at the auto backup performance time you set.

**Auto Backup Strategy**

* You can specify a strategy for performing auto backups.
  * Daily full backup: Back up your entire data every day.
  * Daily full and incremental backups: One full backup of your data each day, and multiple incremental backups.
  * Weekly full backups and daily incremental backups: One full backup of your data on certain days of the week, and one incremental backup on the remaining days of the week.

**All Data Backup Days**

* Can only be specified when using the weekly full backup and daily incremental backup strategies. You must select a minimum of one and a maximum of six days, and full backups will occur on the selected days and incremental backups will occur on the unselected days.

**Auto Backup Run Time**

* Allows you set the time that the backup automatically takes place. It consists of the backup start time and the backup window. You can set the backup run time multiple times so that it does not overlap. Performs backup at any point in the backup window based on the start time of the backup. The backup window is not related to the total running time of the backup. Backup time is proportional to the size of the database and the service load. If the backup fails, retry the backup based on the number of backups retries if it does not exceed the backup window.

> [Caution]
> A backup might not be performed in some situations, such as when a previous backup does not terminate.
> If no incremental baseline backup exists, a full backup might be performed even though it is the scheduled turn to perform an incremental backup.
> For a detailed description of incremental baseline backups, see [Baseline Backup](#기준-백업).

### Backup Storage and Pricing

All backup files are uploaded to the internal backup storage and stored. For manual backups, they are stored permanently until you delete them separately, and backup storage charges are incurred depending on the backup capacity. For auto backups, it is stored for the set retention period and charges for the full size of the auto backup file, which exceeds the storage size of the DB instance. If you do not have direct access to the internal backup storage where the backup file is stored, and when you need backup file, you can export the backup file to the object storage in NHN Cloud.

<a id="export"></a>
### Export Backup

#### Export Files While Performing Backup

After a backup, you can export the backup file to user object storage. This is not supported for incremental backups.

![db-instance-list-export-obs-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-list-export-obs-en.png)

![db-instance-list-export-obs-modal-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-list-export-obs-modal-en.png)

❶ Select the DB instance to back up and click **Export backup files to object storage** after backup from the drop-down menu, and the settings pop-up screen will appear.
❷ Enter the tenant ID of the object storage where the backup will be saved. You can find the tenant ID in the API endpoint settings.
❸ Enter the NHN Cloud member or IAM member of the object storage where the backup will be saved.
❹ Enter the API password of the object storage where the backup will be saved.
❺ Enter the container of the object storage where the backup will be saved.
❻ Enter the path to the backup that will be stored in the container. The folder name can be up to 255 bytes, and the full path can be up to 1024 bytes. Certain forms (. or ..) are not allowed, and special characters (' " < > ;) and spaces are not allowed.

#### Export Backup Files

You can export backup files stored in internal backup storage to user object storage. Not supported for incremental backups.

![db-instance-detail-backup-export-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-detail-backup-export-en.png)

❶ On the Details tab of the source DB instance from which the backup was taken, select the backup file to export and click **Export Backup to Object Storage**, and a pop-up screen will appear to export the backup.

![backup-export-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/backup-export-en.png)

Select the backup file to export from the **Backup** tab and click **Export to Object Storage**.

> [Note]
> For manual backups, if the source DB instance that performed the backup was deleted, you cannot export the backup.

<a id="restore"></a>
## Restoration

Backups allow you to restore data to any point in time. Restoration always creates new DB instance and cannot be restored to the existing DB instance. You can restore only to the same DB engine version as the source DB instance from which you performed the backup. Supports restoring snapshots to the point in time when the backup was created, and restoring point in time to a specific point in time. You can restore it as backup of external MySQL as well as backup that you created in RDS for MariaDB.

> [Caution]
> Restoration might fail if the data storage size of the DB instance that you want to restore is smaller than the data storage size of the source DB instance that you backed up, or if you use a different parameter group than the parameter group of the source DB instance.

### Snapshot Restoration

You can restore using only the backup file, so you don't need the original DB instance from which the backup was taken. To restore a snapshot from the console,

![db-instance-snapshot-restoration-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-snapshot-restoration-en.png)

❶ Select the backup file you want to restore On the details tab of the dB instance, and then click **Restore Snapshot**to go to the Restore DB instance screen.

Or

![snapshot-restoration-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/snapshot-restoration-en.png)

❶ On the Backup tab, select the backup file you want to restore, and then click **Restore Snapshot**.

### Point-in-time Restoration

Restoring to a particular point in time is called point-in-time restoration. You can restore to a specific position in the binary log, as well as to restore to a specific time. Point-in-time restoration requires backup file and binary log from the time you performed the backup to the time you wanted the restore. Binary logs are stored in the storage of the source DB instance where the backup is performed. Shorter binary log retention period allows you to use more storage capacity, but it may be
difficult to restore to the desired point in time. For the cases listed below, you may not be able to restore to the desired point in time because there is no binary log required for point-in-time restoration.

* When you have deleted the binary log of the source DB instance for securing capacity
* When the binary log is automatically deleted by MariaDB based on the Binary log retention period
* When a binary log is deleted due to a failover of a high availability DB instance
* When binary logs are corrupted or deleted for various other reasons

To restore a point in time from the console

![point-in-time-restoration-list-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/point-in-time-restoration-list-en.png)

❶ Select the DB instance you want to restore to a point in time and click **\+ Restore Point-In-Time** to go to the page where you can set up a point in time restore.

#### Restore with Timestamp

When restoring with a timestamp, proceed with the restoration based on the backup file closest to the selected point in time, and then applies a binary log up to the desired point in time.

![point-in-time-restoration-01-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/point-in-time-restoration-01-en.png)

❶ Select a restore method.

![point-in-time-restoration-02-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/point-in-time-restoration-02-en.png)

❷ Select a restore time. You can restore to the most recent point in time, or you can enter a specific point in time.

![point-in-time-restoration-03-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/point-in-time-restoration-03-en.png)

❸ Click **Confirm the last query to be restored** to display a pop-up screen where you can confirm the last query to be restored.


#### Restore using binary logs

The restore with binary log process first restores to the selected backup file and then applies the binary log to the desired location.

![point-in-time-restoration-04-en](https://static.toastoven.net/prod_rds/mariadb/24.03.12/point-in-time-restoration-04-en.png)

❹ To restore to a binary log, you must first select a backup file.
❺ Select a binary log file.
❻ Enter a specific location for the binary log.

<a id="restore-from-external"></a>
### Restoration with External MariaDB Backup

You can use an external MariaDB backup file to create a DB instance.

> [Caution]
> If the setting value of innodb\_data\_file\_path is not ibdata1:12M:autoextend, it is unable to restore to DB instance of RDS for MariaDB.

(1) Use the command below to perform a backup on the server where MariaDB is installed.

```
mariabackup --defaults-file={my.cnf path} --user {user} --password '{password}' --socket {MariaDB socket file path} --compress --compress-threads=1 --stream=xbstream {directory where create backup file} 2>>{backup log file path} > {backup file path}
```

(2) Check that `completed OK!` is in the last line of the backup log file. If there is no `completed OK!`, the backup did not end successfully, so refer to the error message in the log file to proceed with the backup again.

(3) Upload the completed backup file to the object storage.

* The maximum file size that can be uploaded at a time is 5GB.
* If the backup file is larger than 5GB, you have to use a utility such as split to cut the backup file to less than 5GB and upload it in multi-part.
* For detailed information, refer to [Multipart Upload](/Storage/Object%20Storage/ko/api-guide/#_44).

(4) After accessing the console of the project you want to restore, on the DB Instances tab, click the **Restore to Backup in Object Storage** button.


### Restoration by Using RDS for MariaDB Backup

You can use the backup file in RDS for MariaDB to restore the database in MariaDB directly. Only full backups can be restored; incremental backup reflection is not supported. When restoring a RDS for MariaDB backup file, refer to the [Backup](backup-and-restore/#_1) and use the same version as Percona XtraBackup used by RDS for MariaDB.

(1) Export backup of RDS for MariaDB to object storage with reference to the [Export Backup](backup-and-restore/#export).

(2) Download the backup of the object storage to the server on which you want to restore it.

(3) Stop the MariaDB service.

(4) Delete all files in the MariaDB data storage path.

```
rm -rf {MariaDB data storage path}/* 
```

(5) Unzip and restore the downloaded backup files.

```
cat {backup file storage path} | xbstream -x -C {MariaDB data storage  path} 
mariabackup --decompress {MariaDB data storage  path}
innobackupex --defaults-file={my.cnf path} --apply-log {MariaDB data storage path} 
```

(6) Delete unnecessary files after unzipping files.

``` 
find {MariaDB data storage  path } -name "*.qp" -print0 | xargs -0 rm 
```

(7) Start MariaDB service. 