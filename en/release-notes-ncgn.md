## Database > RDS for MySQL > Release Notes

### 2025. 05. 13.

#### 기능 추가 및 개선

* VIP(Virtual IP)를 사용할 수 있도록 개선
  * 신규로 생성하는 DB 인스턴스부터 VIP를 발급하며, VIP는 항상 마스터 DB 인스턴스를 바라보도록 설정됩니다. 기존 DB 인스턴스는 콘솔에서 [VIP 추가] 버튼을 클릭해 직접 발급할 수 있습니다.
* 고가용성이 비정상인 상황에서 콘솔을 통해 명시적으로 중지할 수 있도록 개선
* 감시 설정에 소수값을 입력할 수 있도록 개선
* 사용자 그룹 이름에 한글을 입력할 수 있도록 개선
* DB 인스턴스의 파라미터 그룹 변경 시 변경 내역 모달 창에서 재시작 여부를 확인할 수 있도록 개선

### April 16, 2025

#### Added Features and Updates

* Added and modified API v3.0
  * Added the API to list Log files
  * Added the Export Log file API

### February 13, 2025

#### Added Features and Updates
* Added the MySQL 8.0.40 version

#### Bug Fixes
* Fixed an issue where deleted notification group information appears on the view DB instance details screen

### November 14, 2024

#### Added Features and Updates

* Added the feature to auto-scale storage
* Improved to avoid restarting DB instances when scaling storage size
* Separated the scale storage size feature from the modify DB instance feature into a drop-down menu
* Changed the high availability pause status to stay when rebuilding a candidate master
* Removed the backup retry expiration time setting during auto backup setup and improved to allow users to retry backups within the backup window time range.

### September 12, 2024

#### Added Features and Updates

* Added the incremental backup feature
* Improved to allow users to choose whether to delete automatic backups when deleting a DB instance


### July 11, 2024

#### Added Features

* Add the procedure that controls foreign_key_checks
* Added new parameters (MySQL 8.0.28 or later)
  * `innodb_ddl_threads`
  * `innodb_parallel_read_threads`

#### Bug Fixes

* Fixed an issue where snapshot restoration with a backup of a deleted DB instance was not possible

### June 12, 2024

#### Added Features

* Added the feature to upgrade DB instance OS

### May 16, 2024

#### Added Features

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

### March 14, 2024

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
* Added MySQL 8.0.35 version

### January 11, 2024

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

### November 16, 2023.

#### Added Features

* Added forced promotion of DB instances
* Improved to allow you to select notification type when subscribing to events
* API v3.0 additions and changes
  * Added the Export after backing up DB instance API

### August 29, 2023

#### New Releases

- Relational Database Service (RDS) provides Relational Database in the cloud environment.
- No complicated configuration is required to enable relational database.
