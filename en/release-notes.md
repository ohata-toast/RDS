## Database > RDS for MySQL > Release Notes

### 2021. 08. 25.

#### Feature Updates

* Changed the way of using a volume disk for backup and improved the performance
* Improved the information synchronization per region when the service is enabled

#### Bug Fixes

* Fixed the bug of recording a wrong event type that is irrelevant to the behavior
* Fixed the bug of recording an event that does not match with the status of an instance during failover of the high-availability instance
* Fixed the bug of Database Activity chart having no insert field

### 2021. 07. 13.

#### Feature Updates

* Additional MySQL 8.0.23 version support
* Improved to allow checking the Enable status in the event subscription list
* Improved to display the notification that there are no instances created in the dashboard when no instances are created

#### Bug Fixes

* Fixed a bug in which some monitoring data was not being collected
* Fixed a bug in which long user group names extend beyond the UI when the event subscription registration and notification groups are added
* Fixed a bug in which the menu remains visible when the dashboard dropdown is selected

### 2021. 06. 15.

#### Feature Improvements

* Monitoring system reorganized

#### Bug Fixes

* Fixed a problem where restoration was not possible when restoring a backup with a size close to the storage size
* Fixed a problem where it did not properly operate when there is Korean in the container or path when exporting or importing the backup to object storage

### 2021. 05. 11.

#### More Features

* Exporting and importing backup using object storage provided
* Force restart provided

#### Feature Updates

* Improved feature to check and download xtrabackup log file

#### Bug Fixes

* Fixed the bug where intermittently instances would not be created when multiple instances are created simultaneously after the service is enabled
* Fixed the bug where changes would fail when changing the high-availability instance port and instance type at the same time

### April 13, 2021

#### More Features

* Provides audit log function for MySQL versions 5.6.33 to 5.7.26

#### Feature Updates

* Permission of project members subdivided into RDS for MySQL ADMIN / RDS for MySQL MEMBER
* Modified the system to allow restart during MySQL down
* Modified system to allow users to select any availability areas
* Modified quarter limit text displayed when setting alarms
* Added user guide for procedures provided from RDS

#### Bug Fixes  

* Fixed an issue where status of instance with a completed failover intermittently becomes normalized
* Fixed an issue where some features of master instance does not work due to failed Read Only Slave
* Fixed an issue where MySQL cannot run properly when data encryption instance is forced to reboot

### 2021. 03. 09.

#### 기능 개선
- 프로젝트 별 리소스 쿼터 제한 기능 개선

#### 버그 수정
- 특정한 경우에서 인스턴스 재시작이 정상적으로 이루어지지 않는 버그 수정

### February 16, 2021

#### More Features

- Added a feature that controls DB User and DB Schema through web console

#### Feature Updates

- Tooltip provided when the DB file encryption feature is selected
- Verification message displayed if query latency value is abnormal

#### Bug Fixes

-  Fixed a bug where project members cannot be registered as a Notification member if there are 20 or more project members

### 2021. 01. 19.

#### 기능 추가

- 고가용성(HA) 기능 사용 시, Ping Interval(Master 인스턴스 상태를 확인하는 시간 간격)을 설정할 수 있도록 기능 추가
- 고가용성(HA) 일시 중지/다시 시작 기능 추가
- **Access 제어 설정** 대화 상자에서, 접근 제어 방향(수신/송신)을 설정할 수 있도록 기능 추가
- t2.c1m1 Flavor 인스턴스 생성 불가 변경.
- t2.c1m1 Flavor로 기존에 생성한 일반 인스턴스의 경우, 고가용성으로 변경하지 못하도록 변경.

### 2020. 12. 15.

#### 기능 추가

- --ftwrl-wait-timeout 옵션 값을 사용자가 설정할 수 있도록 기능 추가

### 2020. 11. 10.

#### 버그 수정

- 간헐적으로 자동 백업 생성에 실패하는 현상 수정
- 간헐적으로 기간이 만료된 자동 백업 삭제에 실패하는 현상 수정

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
- Updated UX to allow new backups for time restoration, at the restart by using failover 
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

- Point-in-time recovery is available from when restoration is possible.

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
