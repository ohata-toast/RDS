## Database > RDS for MySQL > Release Notes

### 2024. 02. 15.

#### 기능 추가 및 개선

* DB 스키마 & 사용자 직접 제어 설정 기능 추가
* 연결된 알림 그룹을 식별하기 쉽도록 개선
  * DB 인스턴스 상세 보기 화면에서 연결된 알림 그룹 정보 노출
* MySQL 8.0.35 버전 추가

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