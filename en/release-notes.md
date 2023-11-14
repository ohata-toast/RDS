## Database > RDS for MySQL > Release Notes

### November 14, 2023.

#### Added Features

* Added the feature to create read replicas on subnets in other regions with region peering connections
* Added forced promotion of DB instances
* Improved to allow you to select notification type when subscribing to events
* API v3.0 additions and changes
    * Added the Export after backing up DB instance API

### October 17, 2023

#### Added Features and Updates

* Improved to create instances by using read replica backups when configuring high availability and adding read replicas
* Added the feature to enable previously created high availability instances of MySQL 5.7.33 or later to use the authentication plugin and TLS option.
* Added the versions of MySQL 8.0.33 and MySQL 8.0.34
* Added and modified API v3.0
    * Added the API to list the last query to be restored
    * Added `dbVersion` and `useDummy` fields to the Modify DB Instance API request
    * Added `needToApplyParameterGroup`, `needMigration`, and `supportDbVersionUpgrade` fields to the List DB Instance API response.

### September 12, 2023

#### Added Features

  * Added a feature to upgrade DB engine version
  * Added support for pre-checks for compatibility when upgrading the DB Engine version from MySQL 5.7 to MySQL 8.0. 
  * Added support for upgrading DB Engine version using a dummy DB instance

### August 17,  2023

#### Added Features

* Upgrading the version of the xtrabackup utility used for backup
* Improved to check the version of the xtrabackup utility used for backup in the web console
* Added a feature to use authentication plugin when creating or modifying users in MySQL 5.7.33 or higher
* Added a feature to upgrade the DB engine version when modifying a DB instance
* Added a feature to use authentication plugins and TLS options when creating or modifying users in MySQL 5.7.33 or higher

### July 11, 2023

#### Added Features and Updates

* Added DB instance deletion protection feature

### June 13, 2023

#### Added Features and Updates

* Added rebuild support when a candidate master fails
  * The DB instance on the candidate master does not change, so the fixed IP address does not change
  * All data in the database are deleted, and restored with the data of the master
* Made improvements so that, when adding a user to user groups, all users of organizatons and projects can be added

### May 16, 2023

#### Added Features and Updates

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
* Displayed candidate master to web console
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

#### Bug Fixes

* Fixed an issue where point-in-time recovery is not possible with a read replica backup

### February 14, 2023

#### Feature Updates

* Made modifications so that the Max Connection value is displayed on the Connection chart in MySQL metrics of the server dashboard

#### Bug Fixes

* Fixed an issue where, when an error occurs in the IAM console, the page is not moved to an appropirate error page
* Fixed an issue where, when changing the DB instance type or expanding storage using failover, the Ping interval is set to default

### January 10, 2023

#### Feature Updates

* Made modifications not to allow duplicate notification group names

#### Bug Fixes

* Fixed an issue where, when continuously modifying the monitoring setting popup, the modifications are applied abnormally
* Fixed an issue where the refresh setting does not work in the server dashboard page
* Fixed an issue where an event of backup failure caused by DDL query execution is not logged properly

### December 13, 2022

#### Feature Updates

* Made modifications so that, when backup fails due to DML overload, the cause is left in the event message

#### Bug Fixes

* Fixed an issue where, when synchronizing DB schemas, schemas that cannot be deleted are intermittently registered
* Fixed an issue where another host with the same name as the deleted account cannot be added
* Fixed an issue where, when restarting an existing failed-over master, user access control cannot be modified

### November 15, 2022

#### Bug Fixes

* Fixed an issue where, when `sha256_password` is set under the `default_authentication_plugin` parameter, high availability configuration is turned off.

### October 11, 2022

#### Feature Updates

* Changed the version displayed by default when creating a DB instance to version 8.0.28
* Changed the domain change tooltip displayed on the instance details screen

#### Bug Fixes

* Removed no longer used event codes
* Fixed an issue where a read replica cannot be deleted intermittently under certain conditions

#### Others

* Made modifications so that instances can no longer be created in version 5.6.33

### September 14, 2022

#### Added Features

* Added MySQL 5.7.37, MySQL 8.0.28 versions

#### Bug Fixes

* Fixed an issue where an error message is left on the browser’s developer console
* Fixed an issue where backup fails when a single instance in a **Not Use** status for **Use table locking** is changed to a high availability instance

### August 9, 2022

#### Added Features

* Added a feature to export event lists to Excel

#### Feature Updates

* Made modifications so that the DB Configuration of an instance where high availability is paused can be changed
* Changed the maximum backup retention period from 30 days to 2 years
* Made improvements so that, when backup fails due to DDL execution, the cause is left in the event message

#### Bug Fixes

* Fixed an issue where backup fails intermittently due to communication issues with internal agents

### July 12, 2022

#### Added Features

* Added a feature to view charts by grouping them per server on Server Dashboard

#### Feature Updates

* Made modifications so that the DB Configuration of a read replica in a **replication stopped** status can be changed

#### Bug Fixes

* Fixed an issue where DB instances in a **connection failed** status are displayed as **normal** intermittently
* Fixed an issue where, when creating a read replica, backup execution is left in event logs even if the execution is not performed
* Fixed an issue where volume scaling fails intermittently

### June 14, 2022

#### Feature Updates

* Made improvements so that an event is logged when restart fails due to replication delay
* Changed the access information domain from cloud.toast.com to nhncloudservice.com

#### Bug Fixes

* Fixed an issue where high availability configuration is not possible when the validate password plugin is used
* Fixed an issue where, even though the type change of the high availability instance has failed, the type of the candidate master is displayed as the type after the change

### May 10, 2022

#### Added Features

* For automatic backup, added a feature to prepare for failures of a region by replicating the backup files to another region.

#### Feature Updates

* Changed the error log storage location to the data volume
* Made changes so that error logs are rotated up to 10 logs with a size of 100 MB
* Made modifications so that, when a forced restart is executed, the web console cannot be operated until it can be used again
* Made modifications so that, after failover starts, the target instance cannot be manipulated in the web console
* Improved usability so that you can view the innodb status in the processlist
* Made improvements so that you can move to other pages by numbers in the processlist
* Made improvements so that you can zoom in the chart in the processlist to view only the corresponding section
* Made improvements so that you can search by keywords in the processlist
* Made improvements so that you can download the results searched in the processlist in CSV format

#### Bug Fixes

* Fixed an issue where, when performing point-in-time restoration with a backup of a read replica, a wrong restoration available time could be selected
* Fixed an issue where the monitoring graph is not visible in Safari
* Fixed an issue where, after changing the parameters of the master instance, changing the parameters of a read replica failed
* Fixed an issue where, when repeatedly creating or deleting read replicas in version 5.6.33, creating a read replica failed intermittently

### April 12, 2022

#### Feature Updates

* Made improvements so that, when changing a read replica or normal instance to a high availability instance, replication is configured without additional backup if there is an existing backup available

#### Bug Fixes

* Fixed an issue where, if instance stop and instance volume scaling are performed at the same time, the instance volume scaling operation does not end indefinitely
* Fixed an issue where the promotion of read replicas fails intermittently in version 5.6.33
* Fixed an issue where an error occurs while restarting when the remaining space of the data volume is less than 1%
* Fixed an issue where an event of backup failure is logged intermittently even after successful backup

### March 15, 2022

#### Added Features

* Added a feature to use variables in **DB configuration**

#### Bug Fixes

* Fixed an issue where monitoring data is not collected under certain conditions
* Fixed an issue where an automatic backup of failed-over instance is not deleted
* Fixed an issue where an automatic backup that has failed to be created is not deleted when it reaches its expiration date
* Fixed an issue where restoration fails when there are too many users registered in MySQL
* Fixed an issue where a backup settings modification event is logged even when the access rule is modified

### January 11, 2022

#### Added Features

* Added a feature to check the running process list and InnoDB status in MySQL

#### Feature Updates

* Changed the minimum length of the name that can be entered when creating a DB schema in the web console to 1 character, which is the same as that of MySQL

### December 14, 2021

#### Feature Updates

* Stopped providing monitoring query API v1
* Stopped providing data encryption feature

#### Bug Fixes

* Fixes an issue where a replication stop event is logged immediately after completion of instance replication
* Fixed a bug that caused items in the monitoring settings to be covered when the mouse pointer hovers over the notification group
* Fixed an issue where, when subscribing to an event, notifications of internal event codes that cannot be subscribed are received if the event code is 'Select all'
* Fixed a bug where an unknown error occurred when selecting the created instance immediately after instance creation
* Made modifications so that an event is logged when the DB instance is stopped

### November 9, 2021

#### Added Features

* Added a feature to enable performing of automatic backups multiple times a day
* Added a feature to restore to a specific binlog position when restoring to a point in time
* Added a feature to stop normal instances for 90 days

#### Feature Updates

* Improved a feature to enable modifying instances even in the status of insufficient capacity
* Mitigated an issue where MySQL does not run properly intermittently when a force restart is performed
* Made modifications so that MySQL is restarted when it is terminated due to out of memory

#### Bug Fixes

* Improved an issue where instance creation fails intermittently because the file required for instance creation cannot be downloaded
* Fixed a bug where, in case of a long-running backup, an event is logged as a general backup failure even if the backup failed due to user query latency

### October 12, 2021

#### Feature Updates

* Changed to not expose a period for which point-in-time restoration is impossible

#### Bug Fixes

* Fixed an issue where restoration intermittently fails when creating a high availability instance using data encryption immediately after service activation
* Fixed an issue where the page is not updated after storage scale-up

### September 14, 2021

#### Feature Updates

* Improved backup event start, success, failure cases
* Additional MySQL 5.7.33 version support
* Added a feature to scale up the volume of a high availability instance without using failover

#### Bug Fixes

* Fixed a bug where restoration is not performed properly when performing restoration using backup in the object storage
* Fixed a logic bug where it checks whether the file and directory exist when exporting backup to the object storage
* Fixed a bug where an unknown error window shows up intermittently when selecting an instance

### August 25, 2021

#### Feature Updates

* Changed the way of using a volume disk for backup and improved the performance
* Improved the information synchronization per region when the service is enabled

#### Bug Fixes

* Fixed the bug of recording a wrong event type that is irrelevant to the behavior
* Fixed the bug of recording an event that does not match the status of an instance during failover of the high availability instance
* Fixed the bug of Database Activity chart having no insert field

### July 13, 2021

#### Feature Updates

* Additional MySQL 8.0.23 version support
* Improved to allow checking the Enable status in the event subscription list
* Improved to display the notification that there are no instances created in the dashboard when no instances are created

#### Bug Fixes

* Fixed a bug in which some monitoring data is not being collected
* Fixed a bug in which long user group names extend beyond the UI when the event subscription registration and notification groups are added
* Fixed a bug in which the menu remains visible when the dashboard dropdown is selected

### June 15, 2021

#### Feature Updates

* Monitoring system reorganized

#### Bug Fixes

* Fixed a problem where restoration is not possible when restoring a backup with a size close to the storage size
* Fixed a problem where it did not properly operate when there is Korean in the container or path when exporting or importing the backup to object storage

### May 11, 2021

#### Added Features

* Exporting and importing backup using object storage provided
* Force restart provided

#### Feature Updates

* Improved feature to check and download xtrabackup log file

#### Bug Fixes

* Fixed the bug where intermittently instances would not be created when multiple instances are created simultaneously after the service is enabled
* Fixed the bug where changes would fail when changing the high availability instance port and instance type at the same time

### April 13, 2021

#### Added Features

* Provides audit log function for MySQL versions 5.6.33 to 5.7.26

#### Feature Updates

* Permission of project members subdivided into RDS for MySQL ADMIN / RDS for MySQL MEMBER
* Modified the system to allow restart during MySQL down
* Modified system to allow users to select any availability zones
* Modified quarter limit text displayed when setting alarms
* Added user guide for procedures provided from RDS

#### Bug Fixes

* Fixed an issue where status of instance with a completed failover intermittently becomes normalized
* Fixed an issue where some features of master instance does not work due to failed Read Only Slave
* Fixed an issue where MySQL cannot run properly when data encryption instance is forced to reboot

### March 9, 2021

#### Feature Updates

- Improved the feature to limit the resource quota per project

#### Bug Fixes

- Fixed a bug where instance restart is not performed properly in certain situations

### February 16, 2021

#### Added Features

- Added a feature that controls DB User and DB Schema through web console

#### Feature Updates

- Tooltip provided when the DB file encryption feature is selected
- Verification message displayed if query latency value is abnormal

#### Bug Fixes

- Fixed a bug where project members cannot be registered as a Notification member if there are 20 or more project members

### January 19, 2021

#### Added Features

- Added a feature to set Ping Interval (an interval to check the status of master instance) when using the high availability (HA) feature
- Added HA suspend/resume features
- Added a feature to set access control direction (inbound/outbound) in the **Access Control Settings** dialog box
- Changed so that t2.c1m1 Flavor instance cannot be created anymore.
- Changed so that the normal instances created with t2.c1m1 Flavor can no longer be switched to HA instances

### December 15, 2020

#### Added Features

- Added a feature that enables users to set the --ftwrl-wait-timeout option value

### November 10, 2020

#### Bug Fixes

- Fixed an issue where automatic backup generation occasionally failed
- Fixed an issue where automatic deletion of expired backup occasionally failed

### October 13, 2020

#### Bug Fixes

- Fixed an issue in which innodb_buffer_pool_size cannot be modified as intended
- Fixed failed copy of the ha candidate master instance, when the require_secure_transport is on
- Fixed delays in the backup of large-scale instance

### September 22, 2020

#### Added Features

- New region opened in Korea (Pyeongchon)

### September 15, 2020

#### Added Features

- Supports Monitoring API

### August 11, 2020

#### Bug Fixes

- Fixed an issue in which an invalid subnet appears on the list when user VPC subnet is unavailable

### July 14, 2020

#### Added Features

- Further supports MySQL 8.0.18

### December 10, 2019

#### Added Features

- Added the feature of database file encryption (Korea Region)

### November 12, 2019

#### Feature Updates

- Updated failure detection and restoration of candidate master

#### Bug Fixes

- Fixed infrequent backup failures

### September 24, 2019

#### Feature Updates

- Improved speed for creating an instance (About 28 minutes -> 13 minutes, for HA instances)
- Updated UX to allow new backups for point-in-time restoration, at the restart by using failover
- Changed UI for enabling default alarm

### August 13, 2019

#### Feature Updates

- Allowed to view event logs related to high availability more intuitively

#### Bug Fixes

- Fixed the occasional failure in creating or restoring DB instances
- Fixed failed delivery of mails, notifying the deletion of DB instances

### July 23, 2019

#### Added Features

- Default Alarm added
- Monitoring Item added

#### Feature Updates

- Backup-related events no longer support alarms.

### June 27, 2019

#### Added Features

- Japan Region added

### June 25, 2019

#### Added Features

- High Availability added

#### Feature Updates

- Event period exposed on the page of instance details changed from 1 day to 7 days

#### Bug Fixes

- Fixed so that, when performing point-in-time restoration, the restoration can be performed from the time that can be recovered.

### May 14, 2019

#### Feature Updates

- Stronger authentication when instance is created or modified
- Added UX to select/unselect all notification events

#### Bug Fixes

- Fixed an issue where instances cannot be deleted intermittently when they are being created
- Fixed an issue in which data volume is not properly changed when data storage is full

### March 12, 2019

#### Feature Updates

- Updated error messages that are vague with unpleasant looks.
- Updated to allow modifying transaction-isolation on the console

#### Bug Fixes

- Removed the probability of long backup time which may take more than a day for 1TB database

### February 26, 2019

#### Added Features

- Added the feature of SSD volume as storage for instance data

#### Feature Updates

- Updated to set recipients of notification from project members
- Updated features for x1, u2 flavor

### January 29, 2019

#### Feature Updates

- Changed the maximum instance volume to 1000G

### December 14, 2018

#### Bug Fixes

- Fixed failed exposure of r2.c8m64
- Fixed general logs that are not visible
- Fixed bugs in the VPC subnet selection

### December 11, 2018

#### Feature Updates

- Removed the peering feature
- Feature updated to the method of network communication by using user VPC subnet

### October 23, 2018

#### Feature Updates

- Shows description message for input items when instance is created/restored/replicated
- Shows the mysql transaction_isolation option

### October 16, 2018

#### Added Features

- Added the feature of changing instance flavor
- Added the feature of extending instance storage

### August 28, 2018

#### Added Features

- Allows to secure instance volume by deleting binary log files

### July 24, 2018

#### Added Features

- Also supports MySQL 5.7.15

#### Bug Fixes

- Fixed an issue in which an instance of the MySQL 5.7.19 version cannot be created, without floating IP
- Fixed auto backups at particular situations, in which it takes twice the usual time

### May 29, 2018

#### Added Features

- Newly supports MySQL 5.7

### April 24, 2018

#### Feature Updates

- With port change of the master, the master access information is automatically changed for read only slave
- Delete unnecessary logs after backup

#### Bug Fixes

- Fixed pagination, in which Search Result > Create instance takes you to the search result page
- Fixed the missing of a warning sign when it is tried to create an instance with Confirm Password left in blank

### March 22, 2018

#### Bug Fixes

- Fixed an issue in which backup retention period remains on the list, even after it is changed to 'N/A'
- Fixed the bug in which instance status shows Changing, even without instance setting updated
- Fixed an issue in which QPS shows as negative number when an instance restarts
- Fixed the bug in which only data is updated without date or time updates, at the click of Period Setting on the Monitoring page

### February 22, 2018

#### New Releases

- TOAST Relational Database Service (RDS) provides Relational Database in the cloud environment.
- No complicated configuration is required to enable relational database.
- Supports MySQL 5.6.33.
