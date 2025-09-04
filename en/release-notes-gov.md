## Database > RDS for MySQL > Release Notes

### 2025. 09. 09.

#### 기능 추가 및 개선

- MySQL 8.4 LTS 버전 추가
- MySQL 8.0.41, 8.0.42, 8.0.43 버전 추가

#### 버그 수정

- 이미 생성된 고가용성 인스턴스 클릭 후, 고가용성 인스턴스 생성 시 예비 마스터 이름이 입력된 채로 노출되는 현상 수정
- 고가용성에 추가된 읽기 복제본 이름을 수정할 수 없는 현상 수정
- DB 인스턴스에 VIP 추가가 불가능한 상황에서 드롭다운 메뉴의 [VIP 추가] 메뉴가 활성화되는 현상 수정
- DHCP 갱신 실패 시 내부 IP가 간헐적으로 사라지는 현상 수정
- 고가용성 인스턴스에 읽기 복제본 생성 중 실패할 경우 고가용성이 중단되는 현상 수정
- 같은 조직에서 구독한 이벤트가 여러 개 발생할 경우, 구독 알림이 동작하지 않는 현상 수정

### 2025. 07. 15.

#### 기능 추가 및 개선

- DB 보안 그룹의 송신 규칙으로 DB 포트 타입을 지정할 수 없도록 개선
- 고가용성 DB 인스턴스의 예비 마스터 이름도 입력하도록 수정
- Resource Watcher 서비스에서 DB 인스턴스 리소스 확인이 가능하도록 개선
- 장애 조치된 마스터도 삭제하기 전까지 정상 과금하도록 수정
- 바이너리 로그가 없어서 장애 조치된 마스터를 복구하지 못하는 경우 정확한 오류 메시지를 노출하도록 개선

#### 버그 수정

- 백업 내보내기 시 경로에 특수 문자가 포함되면 백업이 실패하는 문제 수정
- 사용자 그룹 삭제 시 이벤트 구독에서 해당 사용자 그룹이 삭제되지 않는 문제 수정
- 중복된 알림 그룹 삭제 시 정확한 오류 메시지를 노출하도록 개선

### 2025. 05. 15.

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

* Added the feature to create read replicas on subnets in other regions with region peering connections
* Added forced promotion of DB instances
* Improved to allow you to select notification type when subscribing to events
* API v3.0 additions and changes
  * Added the Export after backing up DB instance API

### September 27, 2022

#### New Releases

- Relational Database Service (RDS) provides Relational Database in the cloud environment.
- No complicated configuration is required to enable relational database.