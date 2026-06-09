## Database > RDS for MySQL > Release Notes

<a id="may-12-2026"></a>

## May 12, 2026

<a id="feature-updates"></a>

### Feature Updates

* Added security patch feature
    * Security patches for security vulnerabilities (CVEs) discovered in the OS can be performed as maintenance tasks.
    * For more information, refer to the [Security patch](/Database/RDS%20for%20MySQL/ko/db-instance/#security-patch) documentation.
* Added `SELECT` option in addition to the existing `INSERT` option for high availability Ping check method
* Added and updated API v4.0
    * Added the View High Availability Information API.

<a id="march-10-2026"></a>

## March 10, 2026

<a id="feature-updates-2"></a>

### Feature Updates

* Added API v4.0
    * For more information, see [API v4.0 guide](/Database/RDS%20for%20MySQL/en/api-guide-v4.0/) document.
* Added snapshot backup feature
    * Perform backups using Cinder storage snapshots with zero impact on DB performance
* Added MySQL 8.0.45, 8.4.8 version

<a id="january-13-2026"></a>

## January 13, 2026

<a id="feature-updates-3"></a>

### Feature Updates

* Added maintenance feature
    * Applied various DB instance modifications during your scheduled maintenance duration
* Updated to grant ROLE_ADMIN privileges when the Direct Control for DB Schemas & Users setting is enabled
* Added MySQL 8.0.44, 8.4.7 version

<a id="bug-fixes"></a>

### Bug Fixes

* Fixed an issue where the authentication plugin was not selected by default when adding a user on MySQL 8.4 DB instances.

<a id="november-11-2025"></a>

## November 11, 2025

<a id="feature-updates-4"></a>

### Feature Updates

* Added version MySQL 8.4.6
* Improved to record the cause of backup failure due to Lock acquisition failure in the event log.
* Improved to display a warning message related to the password plugin when upgrading to version 8.4.
* Fixed to allow creation of cross-region read replicas in subnets that do not have region peering set up.

<a id="bug-fixes-2"></a>

### Bug Fixes

* Fixed an issue where the failover status persisted when failover failed.
* Fixed an issue where DB instances stopped before the July deployment could not be started.
* Fixed an issue where unusable values could be used in server_audit_events.
* Fixed an issue where the latest parameter group would not be applied after selecting multiple DB instances when using a different parameter group for read replicas.
* Fixed an issue where an error notification modal would be displayed when deselecting a master in a group with read replicas in a different region.
* Fixed an issue where unchangeable values would be changed when resetting a parameter group.

<a id="september-09-2025"></a>

## September 09, 2025

<a id="feature-updates-5"></a>

### Feature Updates

* Added MySQL 8.4 LTS version
* Added MySQL 8.0.41, 8.0.42, 8.0.43 version

<a id="bug-fixes-3"></a>

### Bug Fixes

* Fixed an issue where the standby master name was displayed with the current name entered when creating a high-availability instance after clicking on an already created high-availability instance.
* Fixed an issue where the name of a read replica added to high-availability could not be modified.
* Fixed an issue where the [Add VIP] drop-down menu was activated when adding a VIP to a DB instance was not possible.
* Fixed an issue where the internal IP would intermittently disappear when DHCP renewal failed.
* Fixed an issue where high-availability would stop functioning if a read replica creation failed on a high-availability instance.
* Fixed an issue where subscription notifications would not work when multiple events subscribed to by the same organization occurred.

<a id="july-15-2025"></a>

## July 15, 2025

<a id="added-features-and-updates"></a>

### Added Features and Updates

* Improved to disallow specifying the DB port type in egress rules of DB security groups
* Changed to require entering the name of the candidate master for high-availability DB instances
* Improved to allow DB instance resources to be checked in Resource Watcher
* Fixed billing so that the failover master is charged normally until it is deleted
* Improved to display accurate error messages when failover masters cannot be recovered due to missing binary logs

<a id="bug-fixes-4"></a>

### Bug Fixes

* Fixed an issue where backup failed when special characters were included in the export path
* Fixed an issue where the user group was not deleted from event subscriptions when the user group was deleted
* Improved to display accurate error messages when deleting duplicate notification groups

<a id="may-13-2025"></a>

## May 13, 2025

<a id="added-features-and-updates-2"></a>

### Added Features and Updates

* Improved to support using VIP (Virtual IP)
    * VIP is now issued for newly created DB instances and is always configured to point to the master DB instance. For existing DB instances, VIPs can be issued manually by clicking the [Add VIP] button in the console
* Improved to allow explicitly disabling High Availability via the console when it is in an abnormal state
* Improved to allow entering decimal values in monitoring settings
* Improved to allow entering Korean characters in user group names
* Improved the change history modal window to check whether to restart when changing parameter groups on DB instances

<a id="bug-fixes-5"></a>

### Bug Fixes

* Fixed an issue where you could enter invalid values in the event source when creating event subscriptions via the Open API
* Fixed an issue where the status of DB instances was intermittently not updated
* Fixed an issue where an unknown error modal window was sometimes exposed

<a id="april-15-2025"></a>

## April 15, 2025

<a id="added-features-and-updates-3"></a>

### Added Features and Updates

* Added and modified API v3.0
    * Added the API to list Log files
    * Added the Export Log file API

<a id="february-11-2025"></a>

## February 11, 2025

<a id="added-features-and-updates-4"></a>

### Added Features and Updates
* Added the MySQL 8.0.40 version

<a id="bug-fixes-6"></a>

### Bug Fixes
* Fixed an issue where deleted notification group information appears on the view DB instance details screen

<a id="november-12-2024"></a>

## November 12, 2024

<a id="added-features-and-updates-5"></a>

### Added Features and Updates

* Added the feature to auto-scale storage
* Improved to avoid restarting DB instances when scaling storage size
* Separated the scale storage size feature from the modify DB instance feature into a drop-down menu
* Changed the high availability pause status to stay when rebuilding a candidate master
* Removed the backup retry expiration time setting during auto backup setup and improved to allow users to retry backups within the backup window time range.

<a id="september-10-2024"></a>

## September 10, 2024

<a id="added-features-and-updates-6"></a>

### Added Features and Updates

* Added the incremental backup feature
* Improved to allow users to choose whether to delete automatic backups when deleting a DB instance

<a id="july-9-2024"></a>

## July 9, 2024

<a id="added-features"></a>

### Added Features

* Add the procedure that controls foreign_key_checks
* Added new parameters (MySQL 8.0.28 or later)
    * `innodb_ddl_threads`
    * `innodb_parallel_read_threads`

<a id="bug-fixes-7"></a>

### Bug Fixes

* Fixed an issue where snapshot restoration with a backup of a deleted DB instance was not possible

<a id="june-11-2024"></a>

## June 11, 2024

<a id="added-features-2"></a>

### Added Features

* Added the feature to upgrade DB instance OS

<a id="may-14-2024"></a>

## May 14, 2024

<a id="added-features-3"></a>

### Added Features

* Added Slow Query analytics
    * Provided the Analytics tab with Slow Query analysis, Process List, and InnoDB Status monitoring features
    * Provided the feature to disable Slow Query Analytics on the Edit DB Instance screen
* Improved to see which parameter items actually change when applying parameter group changes
* Improved to expose warning text and raise an event when high availability status is abnormal
* Improved to select a storage type when creating read replicas
* Added MySQL 8.0.36 version
* Added and modified API v3.0
    * Added the `storage.storageType` field to DB instance replicate API request
    * Added the `notificationGroupIds` field to DB instance detail API response
    * Improved the ability to use project integration appkeys when calling API v3.0

<a id="march-12-2024"></a>

## March 12, 2024

<a id="added-features-4"></a>

### Added Features

* Added the feature to promote candidate masters
* Added the feature to force promote candidate masters
* Added the feature to wait for replication delay on restart with failover
* Added the feature to turn off DB schema & user direct control settings

<a id="february-15-2024"></a>

## February 15, 2024

<a id="added-features-5"></a>

### Added Features

* Added DB schema & user-directed control settings
* Improved to better identify connected notification groups
    * Exposed connected notification group information on the DB instance view details screen
* `Added MySQL 8.0.35 version`

<a id="january-9-2024"></a>

## January 9, 2024

<a id="added-features-6"></a>

### Added Features

* Improved to control the timing of failover whe upgrading the DB engine version for high availability instances
* Improved to allow you to operate the hypervisor migration feature for each DB instance

<a id="december-19-2023"></a>

## December 19, 2023

<a id="added-features-7"></a>

### Added Features

* Improved to make it easier to identify DB instances to which the changed parameter will be applied
    * Added the 'Apply' button in front of the target name to apply the changed parameter on the DB instance list screen.
    * Added the 'Apply' button to the parameter group item on the detail view screen of the DB instance to which the changed parameter will be applied.
    * Add filter option that requires application of changed parameters
* Changed to retrieve servers that have been deleted within the last month when checking the View deleted servers on the server dashboard screen

<a id="november-14-2023"></a>

## November 14, 2023.

<a id="added-features-8"></a>

### Added Features

* Added the feature to create read replicas on subnets in other regions with region peering connections
* Added forced promotion of DB instances
* Improved to allow you to select notification type when subscribing to events
* API v3.0 additions and changes
    * Added the Export after backing up DB instance API

<a id="october-17-2023"></a>

## October 17, 2023

<a id="added-features-and-updates-7"></a>

### Added Features and Updates

* Improved to create instances by using read replica backups when configuring high availability and adding read replicas
* Added the feature to enable previously created high availability instances of MySQL 5.7.33 or later to use the authentication plugin and TLS option.
* Added the versions of MySQL 8.0.33 and MySQL 8.0.34
* Added and modified API v3.0
    * Added the API to list the last query to be restored
    * Added `dbVersion` and `useDummy` fields to the Modify DB Instance API request
    * Added `needToApplyParameterGroup`, `needMigration`, and `supportDbVersionUpgrade` fields to the List DB Instance API response.

<a id="september-12-2023"></a>

## September 12, 2023

<a id="added-features-9"></a>

### Added Features

* Added a feature to upgrade DB engine version
* Added support for pre-checks for compatibility when upgrading the DB Engine version from MySQL 5.7 to MySQL 8.0.
* Added support for upgrading DB Engine version using a dummy DB instance

<a id="august-17-2023"></a>

## August 17,  2023

<a id="added-features-10"></a>

### Added Features

* Upgrading the version of the xtrabackup utility used for backup
* Improved to check the version of the xtrabackup utility used for backup in the console
* Added a feature to use authentication plugin when creating or modifying users in MySQL 5.7.33 or higher
* Added a feature to upgrade the DB engine version when modifying a DB instance
* Added a feature to use authentication plugins and TLS options when creating or modifying users in MySQL 5.7.33 or higher

<a id="july-11-2023"></a>

## July 11, 2023

<a id="added-features-and-updates-8"></a>

### Added Features and Updates

* Added DB instance deletion protection feature

<a id="june-13-2023"></a>

## June 13, 2023

<a id="added-features-and-updates-9"></a>

### Added Features and Updates

* Added rebuild support when a candidate master fails
    * The DB instance on the candidate master does not change, so the fixed IP address does not change
    * All data in the database are deleted, and restored with the data of the master
* Made improvements so that, when adding a user to user groups, all users of organizatons and projects can be added

<a id="may-16-2023"></a>

## May 16, 2023

<a id="added-features-and-updates-10"></a>

### Added Features and Updates

* Made improvements so that the user interface is consistent with NHN Cloud services
* Made modifications so that manual backup is not deleted even when DB instances are deleted
* Added parameter group feature
    * The database settings of DB instance can be freely changed
    * Applicable to multiple instances
    * Changes to settings in an existing DB instance are migrated to a parameter group with the same name as the DB instance
* Added DB security group feature
    * The access control of DB instance can be freely set
    * Applicable to multiple instances
    * Access control rules set on existing DB instances are migrated to the DB security group named as `{DB instance name}__{DB instance ID}` rule
* Provided a screen to view DB instances grouped by replication arrangements
* Displayed candidate master to console
    * Available to secure storage by deleting the binary log of candidate master
    * Various logs of candidate master can be checked and downloaded
* Rebuilding read replica is available
    * The fixed IP address does not change because the DB instance of the read replica remain unchanged
    * All data in the database is deleted, and recovered with the data of the master
* Recovery of master with a completed failover
    * High availability recovery of a new master and a master with a completed failover is available
    * Recovery can fail, and an unrecoverable master with a completed failover can be rebuilt
* Rebuilding master with a completed failover
    * The fixed IP does not change because DB instance of the master with a completed failover remain unchanged
    * All data in the database is deleted, and recovered with the data of the master
* Added MySQL 8.0.32 version

<a id="bug-fixes-8"></a>

### Bug Fixes

* Fixed an issue where point-in-time recovery is not possible with a read replica backup

<a id="february-14-2023"></a>

## February 14, 2023

<a id="feature-updates-6"></a>

### Feature Updates

* Made modifications so that the Max Connection value is displayed on the Connection chart in MySQL metrics of the server dashboard

<a id="bug-fixes-9"></a>

### Bug Fixes

* Fixed an issue where, when an error occurs in the IAM console, the page is not moved to an appropirate error page
* Fixed an issue where, when changing the DB instance type or expanding storage using failover, the Ping interval is set to default

<a id="january-10-2023"></a>

## January 10, 2023

<a id="feature-updates-7"></a>

### Feature Updates

* Made modifications not to allow duplicate notification group names

<a id="bug-fixes-10"></a>

### Bug Fixes

* Fixed an issue where, when continuously modifying the monitoring setting popup, the modifications are applied abnormally
* Fixed an issue where the refresh setting does not work in the server dashboard page
* Fixed an issue where an event of backup failure caused by DDL query execution is not logged properly

<a id="december-13-2022"></a>

## December 13, 2022

<a id="feature-updates-8"></a>

### Feature Updates

* Made modifications so that, when backup fails due to DML overload, the cause is left in the event message

<a id="bug-fixes-11"></a>

### Bug Fixes

* Fixed an issue where, when synchronizing DB schemas, schemas that cannot be deleted are intermittently registered
* Fixed an issue where another host with the same name as the deleted account cannot be added
* Fixed an issue where, when restarting an existing failed-over master, user access control cannot be modified

<a id="november-15-2022"></a>

## November 15, 2022

<a id="bug-fixes-12"></a>

### Bug Fixes

* Fixed an issue where, when `sha256_password` is set under the `default_authentication_plugin` parameter, high availability configuration is turned off.

<a id="october-11-2022"></a>

## October 11, 2022

<a id="feature-updates-9"></a>

### Feature Updates

* Changed the version displayed by default when creating a DB instance to version 8.0.28
* Changed the domain change tooltip displayed on the instance details screen

<a id="bug-fixes-13"></a>

### Bug Fixes

* Removed no longer used event codes
* Fixed an issue where a read replica cannot be deleted intermittently under certain conditions

<a id="others"></a>

### Others

* Made modifications so that instances can no longer be created in version 5.6.33

<a id="september-14-2022"></a>

## September 14, 2022

<a id="added-features-11"></a>

### Added Features

* Added MySQL 5.7.37, MySQL 8.0.28 versions

<a id="bug-fixes-14"></a>

### Bug Fixes

* Fixed an issue where an error message is left on the browser’s developer console
* Fixed an issue where backup fails when a single instance in a **Not Use** status for **Use table locking** is changed to a high availability instance

<a id="august-9-2022"></a>

## August 9, 2022

<a id="added-features-12"></a>

### Added Features

* Added a feature to export event lists to Excel

<a id="feature-updates-10"></a>

### Feature Updates

* Made modifications so that the DB Configuration of an instance where high availability is paused can be changed
* Changed the maximum backup retention period from 30 days to 2 years
* Made improvements so that, when backup fails due to DDL execution, the cause is left in the event message

<a id="bug-fixes-15"></a>

### Bug Fixes

* Fixed an issue where backup fails intermittently due to communication issues with internal agents

<a id="july-12-2022"></a>

## July 12, 2022

<a id="added-features-13"></a>

### Added Features

* Added a feature to view charts by grouping them per server on Server Dashboard

<a id="feature-updates-11"></a>

### Feature Updates

* Made modifications so that the DB Configuration of a read replica in a **replication stopped** status can be changed

<a id="bug-fixes-16"></a>

### Bug Fixes

* Fixed an issue where DB instances in a **connection failed** status are displayed as **normal** intermittently
* Fixed an issue where, when creating a read replica, backup execution is left in event logs even if the execution is not performed
* Fixed an issue where volume scaling fails intermittently

<a id="june-14-2022"></a>

## June 14, 2022

<a id="feature-updates-12"></a>

### Feature Updates

* Made improvements so that an event is logged when restart fails due to replication delay
* Changed the access information domain from cloud.toast.com to nhncloudservice.com

<a id="bug-fixes-17"></a>

### Bug Fixes

* Fixed an issue where high availability configuration is not possible when the validate password plugin is used
* Fixed an issue where, even though the type change of the high availability instance has failed, the type of the candidate master is displayed as the type after the change

<a id="may-10-2022"></a>

## May 10, 2022

<a id="added-features-14"></a>

### Added Features

* For automatic backup, added a feature to prepare for failures of a region by replicating the backup files to another region.

<a id="feature-updates-13"></a>

### Feature Updates

* Changed the error log storage location to the data volume
* Made changes so that error logs are rotated up to 10 logs with a size of 100 MB
* Made modifications so that, when a forced restart is executed, the console cannot be operated until it can be used again
* Made modifications so that, after failover starts, the target instance cannot be manipulated in the console
* Improved usability so that you can view the innodb status in the processlist
* Made improvements so that you can move to other pages by numbers in the processlist
* Made improvements so that you can zoom in the chart in the processlist to view only the corresponding section
* Made improvements so that you can search by keywords in the processlist
* Made improvements so that you can download the results searched in the processlist in CSV format

<a id="bug-fixes-18"></a>

### Bug Fixes

* Fixed an issue where, when performing point-in-time restoration with a backup of a read replica, a wrong restoration available time could be selected
* Fixed an issue where the monitoring graph is not visible in Safari
* Fixed an issue where, after changing the parameters of the master instance, changing the parameters of a read replica failed
* Fixed an issue where, when repeatedly creating or deleting read replicas in version 5.6.33, creating a read replica failed intermittently

<a id="april-12-2022"></a>

## April 12, 2022

<a id="feature-updates-14"></a>

### Feature Updates

* Made improvements so that, when changing a read replica or normal instance to a high availability instance, replication is configured without additional backup if there is an existing backup available

<a id="bug-fixes-19"></a>

### Bug Fixes

* Fixed an issue where, if instance stop and instance volume scaling are performed at the same time, the instance volume scaling operation does not end indefinitely
* Fixed an issue where the promotion of read replicas fails intermittently in version 5.6.33
* Fixed an issue where an error occurs while restarting when the remaining space of the data volume is less than 1%
* Fixed an issue where an event of backup failure is logged intermittently even after successful backup

<a id="march-15-2022"></a>

## March 15, 2022

<a id="added-features-15"></a>

### Added Features

* Added a feature to use variables in **DB configuration**

<a id="bug-fixes-20"></a>

### Bug Fixes

* Fixed an issue where monitoring data is not collected under certain conditions
* Fixed an issue where an automatic backup of failed-over instance is not deleted
* Fixed an issue where an automatic backup that has failed to be created is not deleted when it reaches its expiration date
* Fixed an issue where restoration fails when there are too many users registered in MySQL
* Fixed an issue where a backup settings modification event is logged even when the access rule is modified

<a id="january-11-2022"></a>

## January 11, 2022

<a id="added-features-16"></a>

### Added Features

* Added a feature to check the running process list and InnoDB status in MySQL

<a id="feature-updates-15"></a>

### Feature Updates

* Changed the minimum length of the name that can be entered when creating a DB schema in the console to 1 character, which is the same as that of MySQL

<a id="december-14-2021"></a>

## December 14, 2021

<a id="feature-updates-16"></a>

### Feature Updates

* Stopped providing monitoring query API v1
* Stopped providing data encryption feature

<a id="bug-fixes-21"></a>

### Bug Fixes

* Fixes an issue where a replication stop event is logged immediately after completion of instance replication
* Fixed a bug that caused items in the monitoring settings to be covered when the mouse pointer hovers over the notification group
* Fixed an issue where, when subscribing to an event, notifications of internal event codes that cannot be subscribed are received if the event code is 'Select all'
* Fixed a bug where an unknown error occurred when selecting the created instance immediately after instance creation
* Made modifications so that an event is logged when the DB instance is stopped

<a id="november-9-2021"></a>

## November 9, 2021

<a id="added-features-17"></a>

### Added Features

* Added a feature to enable performing of automatic backups multiple times a day
* Added a feature to restore to a specific binlog position when restoring to a point in time
* Added a feature to stop normal instances for 90 days

<a id="feature-updates-17"></a>

### Feature Updates

* Improved a feature to enable modifying instances even in the status of insufficient capacity
* Mitigated an issue where MySQL does not run properly intermittently when a force restart is performed
* Made modifications so that MySQL is restarted when it is terminated due to out of memory

<a id="bug-fixes-22"></a>

### Bug Fixes

* Improved an issue where instance creation fails intermittently because the file required for instance creation cannot be downloaded
* Fixed a bug where, in case of a long-running backup, an event is logged as a general backup failure even if the backup failed due to user query latency

<a id="october-12-2021"></a>

## October 12, 2021

<a id="feature-updates-18"></a>

### Feature Updates

* Changed to not expose a period for which point-in-time restoration is impossible

<a id="bug-fixes-23"></a>

### Bug Fixes

* Fixed an issue where restoration intermittently fails when creating a high availability instance using data encryption immediately after service activation
* Fixed an issue where the page is not updated after storage scale-up

<a id="september-14-2021"></a>

## September 14, 2021

<a id="feature-updates-19"></a>

### Feature Updates

* Improved backup event start, success, failure cases
* Additional MySQL 5.7.33 version support
* Added a feature to scale up the volume of a high availability instance without using failover

<a id="bug-fixes-24"></a>

### Bug Fixes

* Fixed a bug where restoration is not performed properly when performing restoration using backup in the object storage
* Fixed a logic bug where it checks whether the file and directory exist when exporting backup to the object storage
* Fixed a bug where an unknown error window shows up intermittently when selecting an instance

<a id="august-25-2021"></a>

## August 25, 2021

<a id="feature-updates-20"></a>

### Feature Updates

* Changed the way of using a volume disk for backup and improved the performance
* Improved the information synchronization per region when the service is enabled

<a id="bug-fixes-25"></a>

### Bug Fixes

* Fixed the bug of recording a wrong event type that is irrelevant to the behavior
* Fixed the bug of recording an event that does not match the status of an instance during failover of the high availability instance
* Fixed the bug of Database Activity chart having no insert field

<a id="july-13-2021"></a>

## July 13, 2021

<a id="feature-updates-21"></a>

### Feature Updates

* Additional MySQL 8.0.23 version support
* Improved to allow checking the Enable status in the event subscription list
* Improved to display the notification that there are no instances created in the dashboard when no instances are created

<a id="bug-fixes-26"></a>

### Bug Fixes

* Fixed a bug in which some monitoring data is not being collected
* Fixed a bug in which long user group names extend beyond the UI when the event subscription registration and notification groups are added
* Fixed a bug in which the menu remains visible when the dashboard dropdown is selected

<a id="june-15-2021"></a>

## June 15, 2021

<a id="feature-updates-22"></a>

### Feature Updates

* Monitoring system reorganized

<a id="bug-fixes-27"></a>

### Bug Fixes

* Fixed a problem where restoration is not possible when restoring a backup with a size close to the storage size
* Fixed a problem where it did not properly operate when there is Korean in the container or path when exporting or importing the backup to object storage

<a id="may-11-2021"></a>

## May 11, 2021

<a id="added-features-18"></a>

### Added Features

* Exporting and importing backup using object storage provided
* Force restart provided

<a id="feature-updates-23"></a>

### Feature Updates

* Improved feature to check and download xtrabackup log file

<a id="bug-fixes-28"></a>

### Bug Fixes

* Fixed the bug where intermittently instances would not be created when multiple instances are created simultaneously after the service is enabled
* Fixed the bug where changes would fail when changing the high availability instance port and instance type at the same time

<a id="april-13-2021"></a>

## April 13, 2021

<a id="added-features-19"></a>

### Added Features

* Provides audit log function for MySQL versions 5.6.33 to 5.7.26

<a id="feature-updates-24"></a>

### Feature Updates

* Permission of project members subdivided into RDS for MySQL ADMIN / RDS for MySQL MEMBER
* Modified the system to allow restart during MySQL down
* Modified system to allow users to select any availability zones
* Modified quarter limit text displayed when setting alarms
* Added user guide for procedures provided from RDS

<a id="bug-fixes-29"></a>

### Bug Fixes

* Fixed an issue where status of instance with a completed failover intermittently becomes normalized
* Fixed an issue where some features of master instance does not work due to failed Read Only Slave
* Fixed an issue where MySQL cannot run properly when data encryption instance is forced to reboot

<a id="march-9-2021"></a>

## March 9, 2021

<a id="feature-updates-25"></a>

### Feature Updates

* Improved the feature to limit the resource quota per project

<a id="bug-fixes-30"></a>

### Bug Fixes

* Fixed a bug where instance restart is not performed properly in certain situations

<a id="february-16-2021"></a>

## February 16, 2021

<a id="added-features-20"></a>

### Added Features

* Added a feature that controls DB User and DB Schema through console

<a id="feature-updates-26"></a>

### Feature Updates

* Tooltip provided when the DB file encryption feature is selected
* Verification message displayed if query latency value is abnormal

<a id="bug-fixes-31"></a>

### Bug Fixes

* Fixed a bug where project members cannot be registered as a Notification member if there are 20 or more project members

<a id="january-19-2021"></a>

## January 19, 2021

<a id="added-features-21"></a>

### Added Features

* Added a feature to set Ping Interval (an interval to check the status of master instance) when using the high availability (HA) feature
* Added HA suspend/resume features
* Added a feature to set access control direction (inbound/outbound) in the **Access Control Settings** dialog box
* Changed so that t2.c1m1 Flavor instance cannot be created anymore.
* Changed so that the normal instances created with t2.c1m1 Flavor can no longer be switched to HA instances

<a id="december-15-2020"></a>

## December 15, 2020

<a id="added-features-22"></a>

### Added Features

* Added a feature that enables users to set the --ftwrl-wait-timeout option value

<a id="november-10-2020"></a>

## November 10, 2020

<a id="bug-fixes-32"></a>

### Bug Fixes

* Fixed an issue where automatic backup generation occasionally failed
* Fixed an issue where automatic deletion of expired backup occasionally failed

<a id="october-13-2020"></a>

## October 13, 2020

<a id="bug-fixes-33"></a>

### Bug Fixes

* Fixed an issue in which innodb_buffer_pool_size cannot be modified as intended
* Fixed failed copy of the ha candidate master instance, when the require_secure_transport is on
* Fixed delays in the backup of large-scale instance

<a id="september-22-2020"></a>

## September 22, 2020

<a id="added-features-23"></a>

### Added Features

* New region opened in Korea (Pyeongchon)

<a id="september-15-2020"></a>

## September 15, 2020

<a id="added-features-24"></a>

### Added Features

* Supports Monitoring API

<a id="august-11-2020"></a>

## August 11, 2020

<a id="bug-fixes-34"></a>

### Bug Fixes

* Fixed an issue in which an invalid subnet appears on the list when user VPC subnet is unavailable

<a id="july-14-2020"></a>

## July 14, 2020

<a id="added-features-25"></a>

### Added Features

* Further supports MySQL 8.0.18

<a id="december-10-2019"></a>

## December 10, 2019

<a id="added-features-26"></a>

### Added Features

* Added the feature of database file encryption (Korea Region)

<a id="november-12-2019"></a>

## November 12, 2019

<a id="feature-updates-27"></a>

### Feature Updates

* Updated failure detection and restoration of candidate master

<a id="bug-fixes-35"></a>

### Bug Fixes

* Fixed infrequent backup failures

<a id="september-24-2019"></a>

## September 24, 2019

<a id="feature-updates-28"></a>

### Feature Updates

* Improved speed for creating an instance (About 28 minutes -> 13 minutes, for HA instances)
* Updated UX to allow new backups for point-in-time restoration, at the restart by using failover
* Changed UI for enabling default alarm

<a id="august-13-2019"></a>

## August 13, 2019

<a id="feature-updates-29"></a>

### Feature Updates

* Allowed to view event logs related to high availability more intuitively

<a id="bug-fixes-36"></a>

### Bug Fixes

* Fixed the occasional failure in creating or restoring DB instances
* Fixed failed delivery of mails, notifying the deletion of DB instances

<a id="july-23-2019"></a>

## July 23, 2019

<a id="added-features-27"></a>

### Added Features

* Default Alarm added
* Monitoring Item added

<a id="feature-updates-30"></a>

### Feature Updates

* Backup-related events no longer support alarms.

<a id="june-27-2019"></a>

## June 27, 2019

<a id="added-features-28"></a>

### Added Features

* Japan Region added

<a id="june-25-2019"></a>

## June 25, 2019

<a id="added-features-29"></a>

### Added Features

* High Availability added

<a id="feature-updates-31"></a>

### Feature Updates

* Event period exposed on the page of instance details changed from 1 day to 7 days

<a id="bug-fixes-37"></a>

### Bug Fixes

* Fixed so that, when performing point-in-time restoration, the restoration can be performed from the time that can be recovered.

<a id="may-14-2019"></a>

## May 14, 2019

<a id="feature-updates-32"></a>

### Feature Updates

* Stronger authentication when instance is created or modified
* Added UX to select/unselect all notification events

<a id="bug-fixes-38"></a>

### Bug Fixes

* Fixed an issue where instances cannot be deleted intermittently when they are being created
* Fixed an issue in which data volume is not properly changed when data storage is full

<a id="march-12-2019"></a>

## March 12, 2019

<a id="feature-updates-33"></a>

### Feature Updates

* Updated error messages that are vague with unpleasant looks.
* Updated to allow modifying transaction-isolation on the console

<a id="bug-fixes-39"></a>

### Bug Fixes

* Removed the probability of long backup time which may take more than a day for 1TB database

<a id="february-26-2019"></a>

## February 26, 2019

<a id="added-features-30"></a>

### Added Features

* Added the feature of SSD volume as storage for instance data

<a id="feature-updates-34"></a>

### Feature Updates

* Updated to set recipients of notification from project members
* Updated features for x1, u2 flavor

<a id="january-29-2019"></a>

## January 29, 2019

<a id="feature-updates-35"></a>

### Feature Updates

* Changed the maximum instance volume to 1000G

<a id="december-14-2018"></a>

## December 14, 2018

<a id="bug-fixes-40"></a>

### Bug Fixes

* Fixed failed exposure of r2.c8m64
* Fixed general logs that are not visible
* Fixed bugs in the VPC subnet selection

<a id="december-11-2018"></a>

## December 11, 2018

<a id="feature-updates-36"></a>

### Feature Updates

* Removed the peering feature
* Feature updated to the method of network communication by using user VPC subnet

<a id="october-23-2018"></a>

## October 23, 2018

<a id="feature-updates-37"></a>

### Feature Updates

* Shows description message for input items when instance is created/restored/replicated
* Shows the mysql transaction_isolation option

<a id="october-16-2018"></a>

## October 16, 2018

<a id="added-features-31"></a>

### Added Features

* Added the feature of changing instance flavor
* Added the feature of extending instance storage

<a id="august-28-2018"></a>

## August 28, 2018

<a id="added-features-32"></a>

### Added Features

* Allows to secure instance volume by deleting binary log files

<a id="july-24-2018"></a>

## July 24, 2018

<a id="added-features-33"></a>

### Added Features

* Also supports MySQL 5.7.15

<a id="bug-fixes-41"></a>

### Bug Fixes

* Fixed an issue in which an instance of the MySQL 5.7.19 version cannot be created, without floating IP
* Fixed auto backups at particular situations, in which it takes twice the usual time

<a id="may-29-2018"></a>

## May 29, 2018

<a id="added-features-34"></a>

### Added Features

* Newly supports MySQL 5.7

<a id="april-24-2018"></a>

## April 24, 2018

<a id="feature-updates-38"></a>

### Feature Updates

* With port change of the master, the master access information is automatically changed for read only slave
* Delete unnecessary logs after backup

<a id="bug-fixes-42"></a>

### Bug Fixes

* Fixed pagination, in which Search Result > Create instance takes you to the search result page
* Fixed the missing of a warning sign when it is tried to create an instance with Confirm Password left in blank

<a id="march-22-2018"></a>

## March 22, 2018

<a id="bug-fixes-43"></a>

### Bug Fixes

* Fixed an issue in which backup retention period remains on the list, even after it is changed to 'N/A'
* Fixed the bug in which instance status shows Changing, even without instance setting updated
* Fixed an issue in which QPS shows as negative number when an instance restarts
* Fixed the bug in which only data is updated without date or time updates, at the click of Period Setting on the Monitoring page

<a id="february-22-2018"></a>

## February 22, 2018

<a id="new-releases"></a>

### New Releases

* Relational Database Service (RDS) provides Relational Database in the cloud environment.
* No complicated configuration is required to enable relational database.
* Supports MySQL 5.6.33.
