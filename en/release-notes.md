## Database > RDS for MySQL > Release Notes

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

* Fixed a bug in which some monitoring data was not being collected
* Fixed a bug in which long user group names extend beyond the UI when the event subscription registration and notification groups are added
* Fixed a bug in which the menu remains visible when the dashboard dropdown is selected

### June 15, 2021

#### Feature Improvements

* Monitoring system reorganized

#### Bug Fixes

* Fixed a problem where restoration was not possible when restoring a backup with a size close to the storage size
* Fixed a problem where it did not properly operate when there is Korean in the container or path when exporting or importing the backup to object storage

### May 11, 2021

#### More Features

* Exporting and importing backup using object storage provided
* Force restart provided

#### Feature Updates

* Improved feature to check and download xtrabackup log file

#### Bug Fixes

* Fixed the bug where intermittently instances would not be created when multiple instances are created simultaneously after the service is enabled
* Fixed the bug where changes would fail when changing the high availability instance port and instance type at the same time

### April 13, 2021

#### More Features

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

#### More Features

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

#### More Features

- New region opened in Korea (Pyeongchon) 

### September 15, 2020

#### More Features 

- Supports Monitoring API 

### August 11, 2020

#### Bug Fixes

- Fixed an issue in which an invalid subnet appears on the list when user VPC subnet is unavailable 

### July 14, 2020

#### More Features 

- Further supports MySQL 8.0.18  

### December 10, 2019

#### More Features

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

- Fixed the occasional failure in creating or restoring database instances
- Fixed failed delivery of mails, notifying the deletion of database instances 

### July 23, 2019

#### More Features

- Default Alarm added
- Monitoring Item added

#### Updates

- Backup-related events no longer support alarms.

### June 27, 2019

#### More Features

- Japan Region added

### June 25, 2019

#### More Features

- High Availability added

#### Updates

- Event period exposed on the page of instance details changed from 1 day to 7 days

#### Bug Fixes

- Fixed so that, when performing point-in-time restoration, the restoration can be performed from the time that can be recovered.

### May 14, 2019

#### Updates

- Stronger authentication when instance is created or modified
- Added UX to select/unselect all notification events

#### Bug Fixes

- Fixed instances, which were sometimes unavailable to be deleted while they were being created
- Fixed the issue in which data volume was not properly changed when data storage was full

### March 12, 2019 

#### Feature Updates 

- Updated error messages that are vague with unpleasant looks. 
- Updated to allow modifying transaction-isolation on the console 

#### Bug Fixes

- Removed the probability of long backup time which may take more than a day for 1TB database

### February 26, 2019 

#### More Features 

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

#### More Features 

- Added the feature of changing instance flavor 
- Added the feature of extending instance storage 

### August 28, 2018

#### More Features 

- Allows to secure instance volume by deleting binary log files 

### July 24, 2018

#### More Features

- Also supports MySQL 5.7.15 

#### Bug Fixes

- Fixed an issue in which an instance of the MySQL 5.7.19 version cannot be created, without floating IP 
- Fixed auto backups at particular situations, in which it takes twice the usual time 

### May 29, 2018

#### More Features

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

- Fixed an issue in which backup retention period remains on the list, even after it was changed to 'N/A'
- Fixed the bug in which instance status shows Changing, even without instance setting updated 
- Fixed an issue in which QPS shows as negative number when an instance restarts 
- Fixed the bug in which only data is updated without date or time updates, at the click of Period Setting on the Monitoring page 

### February 22, 2018 

#### New Releases 

- TOAST Relational Database Service (RDS) provides Relational Database in the cloud environment. 
- No complicated configuration is required to enable relational database. 
- Supports MySQL 5.6.33.  
