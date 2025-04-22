## Database > RDS for MariaDB > Release Notes

### April 15, 2025

#### Added Features and Updates

* Added and modified API v3.0
  * Added the API to list Log files
  * Added the Export Log file API

### February 11, 2025

#### Bug Fixes
* Fixed an issue where deleted notification group information appears on the view DB instance details screen

### November 12, 2024

#### Added Features and Updates

* Added the feature to auto-scale storage
* Improved to avoid restarting DB instances when scaling storage size
* Separated the scale storage size feature from the modify DB instance feature into a drop-down menu
* Changed the high availability pause status to stay when rebuilding a candidate master
* Removed the backup retry expiration time setting during auto backup setup and improved to allow users to retry backups within the backup window time range.
* Added the versions of MariaDB 10.11.7 and MariaDB 10.11.8

### September 10, 2024

#### Added Features and Updates

* Added the incremental backup feature
* Improved to allow users to choose whether to delete automatic backups when deleting a DB instance

### July 9, 2024

#### Added Features

* Add the procedure that controls foreign_key_checks

#### Bug Fixes

* Fixed an issue where snapshot restoration with a backup of a deleted DB instance was not possible

### June 11, 2024

#### Added Features

* Added the feature to upgrade DB instance OS

### May 14, 2024

#### Added Features

* Added Slow Query analytics
  * Provided the Analytics tab with Slow Query analysis, Process List, and InnoDB Status monitoring features
  * Provided the feature to disable Slow Query Analytics on the Edit DB Instance screen
* Improved to see which parameter items actually change when applying parameter group changes
* Improved to expose warning text and raise an event when high availability status is abnormal
* Improved to select a storage type when creating read replicas
* Added and modified API v3.0
  * Added the `storage.storageType` field to DB instance replicate API request
  * Added the `notificationGroupIds` field to DB instance detail API response
  * Improved the ability to use project integration appkeys when calling API v3.0

### March 12, 2024

#### Added Features

* Added the feature to promote candidate masters
* Added the feature to force promote candidate masters
* Added the feature to wait for replication delay on restart with failover
* Added the feature to turn off DB schema & user direct control settings

### February 15, 2024

#### Added Features

* Added DB schema & user-directed control settings
* Improved to better identify connected notification groups
  * Exposed connected notification group information on the DB instance view details screen

### January 9, 2024

#### Added Features

* Improved to control the timing of failover whe upgrading the DB engine version for high availability instances
* Improved to allow you to operate the hypervisor migration feature for each DB instance

### December 19, 2023

#### Added Features

* Improved to make it easier to identify DB instances to which the changed parameter will be applied
  * Added the 'Apply' button in front of the target name to apply the changed parameter on the DB instance list screen.
  * Added the 'Apply' button to the parameter group item on the detail view screen of the DB instance to which the changed parameter will be applied.
  * Add filter option that requires application of changed parameters
* Changed to retrieve servers that have been deleted within the last month when checking the View deleted servers on the server dashboard screen

### November 14, 2023.

#### Added Features

* Added forced promotion of DB instances
* Improved to allow you to select notification type when subscribing to events
* API v3.0 additions and changes
  * Added the Export after backing up DB instance API

### October 17, 2023

#### Added Features and Updates

* Improved to create instances by using read replica backups when configuring high availability and adding read replicas
* Added the versions of MariaDB 10.6.11 and MariaDB 10.6.12
* Added and modified API v3.0
    * Added the API to list the last query to be restored
    * Added `needToApplyParameterGroup`, `needMigration`, and `supportDbVersionUpgrade` fields to the List DB Instance API response.


### July 11, 2023

#### Added Features and Updates

* Added DB instance deletion protection feature

### June 13, 2023

#### Added Features and Updates

* Rebuilding candidate master is available when an issue occur
    * The fixed IP does not change because DB instance of the candidate master remain unchanged
    * All data in the database is deleted, and recovered with the data of the master
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

#### Bug Fixes

* Fixed an issue where point-in-time recovery is not possible with a read replica backup

### February 14, 2023

#### Feature Updates

* Made modifications so that the Max Connection value is displayed on the Connection chart in MariaDB metrics of the server dashboard

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

* Changed the domain change tooltip displayed on the instance details screen

#### Bug Fixes

* Removed no longer used event codes
* Fixed an issue where a read replica cannot be deleted intermittently under certain conditions

### September 14, 2022

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

#### Feature Updates

* Changed the error log storage location to the data volume
* Made changes so that error logs are rotated up to 10 logs with a size of 100 MB
* Made modifications so that, when a forced restart is executed, the console cannot be operated until it can be used again
* Made modifications so that, after failover starts, the target instance cannot be manipulated in the console
* Improved usability so that you can view the innodb status in the processlist
* Made improvements so that you can move to other pages by numbers in the processlist
* Made improvements so that you can zoom in the chart in the processlist to view only the corresponding section
* Made improvements so that you can search by keywords in the processlist
* Made improvements so that you can download the results searched in the processlist in CSV format

#### Bug Fixes

* Fixed an issue where, when performing point-in-time restoration with a backup of a read replica, a wrong restoration available time could be selected
* Fixed an issue where the monitoring graph is not visible in Safari
* Fixed an issue where, after changing the parameters of the master instance, changing the parameters of a read replica failed

### April 12, 2022

#### Feature Updates

* Made improvements so that, when changing a read replica or normal instance to a high availability instance, replication is configured without additional backup if there is an existing backup available

#### Bug Fixes

* Fixed an issue where, if instance stop and instance volume scaling are performed at the same time, the instance volume scaling operation does not end indefinitely
* Fixed an issue where an error occurs while restarting when the remaining space of the data volume is less than 1%
* Fixed an issue where an event of backup failure is logged intermittently even after successful backup

### March 15, 2022

#### Added Features

* Added a feature to use variables in **DB configuration**

#### Bug Fixes

* Fixed an issue where monitoring data is not collected under certain conditions
* Fixed an issue where an automatic backup of failed-over instance is not deleted
* Fixed an issue where an automatic backup that has failed to be created is not deleted when it reaches its expiration date
* Fixed an issue where restoration fails when there are too many users registered in MariaDB
* Fixed an issue where a backup settings modification event is logged even when the access rule is modified

### January 11, 2022

#### Added Features

* Added a feature to check the running process list and InnoDB status in MariaDB

#### Feature Updates

* Changed the minimum length of the name that can be entered when creating a DB schema in the console to 1 character, which is the same as that of MariaDB

### December 14, 2021

#### New Releases

- Relational Database Service (RDS) provides Relational Database in the cloud environment.
- No complicated configuration is required to enable relational database.
- Supports MariaDB 10.3.30.  
