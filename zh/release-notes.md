## Database > RDS for MySQL > Release Notes

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

### Dec. 10, 2019

#### More Features

- Added the feature of database file encryption (Korea Region)

### Nov. 12, 2019 

#### Feature Updates

- Updated failure detection and restoration of candidate master 

#### Bug Fixes

- Fixed infrequent backup failures 

### Sept. 24, 2019 

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

### 2019.03.12

#### 기능 개선

- 의미가 모호하고 보기 불편한 에러 메시지 개선
- 콘솔에서 transaction-isolation 값을 수정 할 수 있도록 개선

#### 버그 수정

- 1TB 의 DB 의 백업 시간이 하루 이상 걸릴 수 있는 가능성 제거

### 2019.02.26

#### 기능 추가

- 인스턴스 데이터 저장소로 SSD 볼륨 사용 기능 추가.

#### 기능 개선

- Notification 수신 대상을 프로젝트 멤버로 설정하도록 기능 개선.
- x1, u2 flavor 사용 가능 기능 개선.

### 2019.01.29

#### 기능 개선

- 인스턴스 볼륨 사이즈 최대값 1000G으로 변경

### 2018.12.14

#### 버그 수정

- r2.c8m64 flavor 미노출 수정
- general log 안보이는 현상 수정
- VPC Subnet 선택 버그 수정

### 2018.12.11

#### 기능 개선

- Peering 기능 제거
- 사용자 VPC Subnet을 이용한 네트워크 통신 방식으로 기능 개선

### 2018.10.23

#### 기능 개선

- 인스턴스 생성/복원/복제 시 입력 항목 설명문구 노출
- mysql transaction_isolation 옵션 노출

### 2018.10.16

#### 기능 추가

- 인스턴스 Flavor 변경 기능 추가
- 인스턴스 Storage 확장 기능 추가

### 2018.08.28

#### 기능 추가

- Binary Log 파일 삭제을 통한 인스턴스 용량 확보 기능 추가

### 2018.07.24

#### 기능 추가

- MySQL 5.7.15 버전을 추가 지원

#### 버그 수정

- MySQL 5.7.19 버전 인스턴스 생성 시, floating ip 를 붙이지 않으면 생성하지 못하는 현상 수정
- 특정 상황에서 자동 백업의 시간이 평소의 2배 소요되는 현상 수정

### 2018.05.29

#### 기능 추가

- MySQL 5.7 버전 신규 지원

### 2018.04.24

#### 기능 개선

- master의 port 변경 시, read only slave의 master 접속 정보 자동 변경
- 백업 후, 불필요하게 남는 로그 삭제

#### 버그 수정

- 검색결과 페이지 > 인스턴스 생성 후 페이지 이동 시도 시, 검색 결과 페이지로 이동되는 현상 수정
- 비밀번호 확인란을 공백으로 인스턴스 생성 시도 시 경고문구가 뜨지 않는 현상 수정

### 2018.03.22

#### 버그 수정

- 백업 보관 기관 '없음'으로 변경 시, 일정 시간동안 리스트에서 보이는 현상 수정
- 인스턴스 설정 수정을 하지 않았음에도 인스턴스의 상태가 변경 중으로 보이는 버그 수정
- 인스턴스 재시작 시, QPS 가 음수로 보이는 현상 수정
- Monitoring 화면에서 기간 설정 버튼 클릭 시, 화면의 날짜 및 시각의 갱신 없이 데이터만 갱신 되는 버그 수정

### 2018.02.22

#### 신규 상품 출시

- TOAST Cloud Relational Database Service (RDS) 는 Relational Database 를 클라우드 환경에서 제공하는 상품입니다.
- 복잡한 설정 없이 Relational Database 사용할 수 있습니다.
- MySQL 5.6.33 버전을 제공합니다.
