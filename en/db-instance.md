## Database > RDS for MySQL > DB Instance

## DB Instance

DB instance is a concept that encompasses virtual equipment and installed MySQL, a unit of MySQL provided by RDS for MySQL.
You do not have direct access to the operating system of the DB instance, but only to the database through the port you entered when you created the DB instance. The available port ranges have the following restrictions.

* The available port range is between 3306 and 43306.

The DB instance is identified by the customer-assigned name and the automatically assigned 32-byte ID.
DB instance name has the following restrictions.

* DB instance name must be unique by region.
* DB instance name contains alphabets, numbers, and - _ between 1 and 100 characters. ,and the first character must be an alphabet.

## DB 인스턴스 생성

아래 설정들을 통하여 DB 인스턴스를 생성할 수 있습니다.

### Availability Zone

NHN Cloud has divided the entire system into several availability zones to prepare for failures caused by physical hardware problems. These availability zones are storage systems, network switches, top surfaces, and power supplies, which are all configured separately for each zone. Failure within one availability zone does not affect other availability zones, increasing the availability of the entire service. Deploying DB instances across multiple availability zones can further increase the
service availability. Network communication is possible between DB instances that are scattered across multiple availability zones, and there is no network usage charge.

> [Caution]
> You cannot change the availability zone of DB instance that you have already created.

### DB Engine

You can use the versions specified below.

| Version      | Note                                                                                                              | 
|--------------|-------------------------------------------------------------------------------------------------------------------| 
| <strong>8.0</strong> ||
| MySQL 8.0.35 |                                                                                                                   |
| MySQL 8.0.34 |                                                                                                                   | 
| MySQL 8.0.33 |                                                                                                                   |
| MySQL 8.0.32 |                                                                                                                   |
| MySQL 8.0.28 |                                                                                                                   | 
| MySQL 8.0.23 |                                                                                                                   | 
| MySQL 8.0.18 |                                                                                                                   | 
| <strong>5.7</strong> ||
| MySQL 5.7.37 |                                                                                                                   | 
| MySQL 5.7.33 | You cannot restore DB instance with an external backup copy.                                                      | 
| MySQL 5.7.26 |                                                                                                                   | 
| MySQL 5.7.19 |                                                                                                                   | 
| MySQL 5.7.15 |                                                                                                                   | 
| <strong>5.6</strong> ||
| MySQL 5.6.33 | Unable to create new DB instance. It only supports creating and restoring read replicas of existing DB instances. |

You can upgrade the version for DB engine by using the modification feature of the web consle after the engine is created.
For more details, see [DB Engine](db-engine/).

### DB Instance Type

DB instances have different CPU cores and memory capacity depending on the type.
When you create DB instance, you must select the appropriate DB instance type accoring to database workload.

| Type | Description                                                                                                                    | 
|------|--------------------------------------------------------------------------------------------------------------------------------| 
| m2   | Instance type that balances CPU and memory.                                                                                    | 
| c2   | Instance type with high CPU performance.                                                                                       | 
| r2   | Available when memory is busy compared to other resources.                                                                     | 
| x1   | Instance type that supports higher-end CPU and memory. Recommended for services or applications that require high performance. |

The type of DB instance that you have already created can be easily changed through the web console.

> [Caution]
> If you change the type of DB instance that you have already created, the DB instance will be terminated, resulting in a few minutes of downtime.

### 데이터 스토리지

데이터 스토리지에 데이터베이스의 데이터 파일을 저장합니다. DB 인스턴스는 HDD, SSD의 2가지 데이터 스토리지 유형을 지원합니다. 데이터 스토리지 유형에 따라 성능과 가격이 다르므로 데이터베이스 워크로드에 따라 알맞은 유형을 선택해야 합니다. 데이터 스토리지는 20GB~2TB로 생성할 수 있습니다.

> [주의]
> 이미 생성한 DB 인스턴스의 데이터 스토리지 유형은 변경할 수 없습니다.

> [참고]
> 데이터 스토리지를 2TB 이상 사용하려면 NHN Cloud 고객 센터로 연락하십시오.

아래 작업은 데이터 스토리지의 I/O 용량을 사용하기 때문에 진행되는 동안 DB 인스턴스의 성능이 저하될 수 있습니다.

* 단일 DB 인스턴스의 백업
* 단일 DB 인스턴스의 고가용성 구성
* 읽기 복제본 생성
* 읽기 복제본 재구축
* 예비 마스터 재구축
* 특정 시점으로 복원
* 오브젝트 스토리지로 백업 내보내기

### High Availability

High availability DB instances increase availability, data durability, and provide fault tolerant databases. High availability DB instances consist of master and candidate master and are created in different availability zones. Candidate master is a DB instance for failover and is not normally available.  고가용성 DB 인스턴스의 경우 예비 마스터에서 백업이 수행되기 때문에 백업으로 인한 성능 저하를 회피할 수 있습니다. 고가용성 DB 인스턴스가 제공하는 여러 기능들은 [고가용성 DB 인스턴스](db-instance/#_1)에서 확인할 수 있습니다.

### Network

When create DB instance, you have to select the VPC subnet to connect to. 동일한 서브넷에 연결된 Compute 서비스의 인스턴스 간에는 별도의 플로팅 IP 없이 통신할 수 있으며, 네트워크 트래픽에 대한 비용이 청구되지 않습니다. DB 인스턴스는 기본적으로 모든 네트워크 접근을 차단하므로 접속을 원하는 경우 DB 보안 그룹을 적용해야 합니다.

> [Caution]
> You cannot change the subnet of DB instance that you have already created.

### Floating IP

To access DB instance from the outside, you must connect the floating IP to DB instance. You can create a floating IP only if you connect the subnet to which the Internet Gateway is connected. Floating IP is charged upon use, and separately, if traffic is directed to the Internet through floating IP, it is charged separately.

### 파라미터 그룹

파라미터 그룹은 DB 인스턴스에 설치된 데이터베이스를 설정할 수 있는 파라미터의 집합입니다. DB 인스턴스 생성 시 반드시 하나의 파라미터 그룹을 선택해야 합니다. 파라미터 그룹은 생성 이후에도 자유롭게 변경이 가능합니다. 파라미터 그룹에 대한 자세한 설명은 [파라미터 그룹](parameter-group/) 항목을 참고합니다.

### DB Security Group

DB security groups are used to restrict access in case of external intrusion. You can allow access to specific port ranges or database ports for incoming and outgoing traffic. You can apply multiple DB security groups to DB instance. For more details on DB security groups, see the [DB security groups](db-security-group/).

### Backup

You can set up periodic backups of the databases in your DB instance, or you can create backups at any time through the web console. Performance may degrade during backups. To avoid affecting service, it is better to perform back up at a time when the service is under low load. If you do not want the backup to degrade performance, you can use a high-availability configuration or perform backups from read replica. Backup files are stored on internal object storage and are charged based on the
size of backup storage. You can export to user object storage in NHN Cloud if necessary. To prepare for unexpected failures, we recommend that you set up backups to conduct periodically. For more details on backup, see [Backup and Restore](backup-and-restore/).

### Default Notification

When you create a DB instance, you can set default notifications. If setting default notifications, it will create a new notification group with the name `{DB instance name}-default` and will automatically set the notification items below. You can freely modify and delete alert groups that are created as default notification. For more details on notification group, see the [ notification group ](notification/).

| Item                       | How to compare | Threshold value | Duration  | 
|----------------------------|----------------|-----------------|-----------| 
| CPU usage                  | &gt;=          | 80%             | 5 minutes | 
| Storage remaining usage    | &lt;=          | 5,120MB         | 5 minutes | 
| Database connection status | &lt;=          | 0               | 0 minutes | 
| Storage usage              | &gt;=          | 95%             | 5 minutes | 
| Storage defects            | &lt;=          | 0               | 0 minute  | 
| Connection ratio           | &gt;=          | 85%             | 5 minutes | 
| Memory usage               | &gt;=          | 90%             | 5 minutes | 
| Slow query                 | &gt;=          | 60 counts/min   | 5 minutes |

### 삭제 보호

삭제 보호를 활성화하면 실수로 DB 인스턴스가 삭제되지 않도록 보호할 수 있습니다.

## DB 인스턴스 목록

웹 콘솔에서 생성된 DB 인스턴스를 확인할 수 있습니다. DB 인스턴스 그룹 단위로 묶어서 보거나, 개별 DB 인스턴스로 볼 수 있습니다.

![db-instance-list_en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-list_en.png)

❶ DB 인스턴스 화면 모드를 변경할 수 있습니다.
❷ 버튼을 클릭하여 그룹 안에 속한 DB 인스턴스를 펼치거나 접을 수 있습니다.
❸ 가장 최근 수집된 모니터링 지표를 보여줍니다.
❹ 현재 상태를 볼 수 있습니다.
❺ 진행 중인 작업이 있으면 스피너가 나타납니다.
❻ 검색 조건을 변경할 수 있습니다.

The status of the DB instance consists of the following values and changes depending on the behavior of the user and the current status.

| Status | Description | |-------------------|------------------------------------------------|
| BEFORE_CREATE | before create|
| AVAILABLE | available to use |
| STORAGE_FULL | insufficient storage |
| FAIL_TO_CREATE | fail to create |
| FAIL_TO_CONNECT | fail to connect |
| REPLICATION_STOP | replication stop |
| FAILOVER | failover completed |
| FAILOVER_SHUTDOWN | failover completed (shutdown), DB Instances Failing Before April 11, 2023 |
| SHUTDOWN | shutdown |

변경할 수 있는 검색 조건은 아래와 같습니다.

![db-instance-filter_en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-filter_en.png)

❶ 파라미터 변경 사항 적용이 필요한 DB 인스턴스를 필터링 조건으로 검색할 수 있습니다.

## DB 인스턴스 상세

DB 인스턴스를 선택하면 상세 정보를 볼 수 있습니다.

![db-instance-detail_en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail_en.png)

❶ 접속 정보의 도메인을 클릭하면 IP 주소를 확인할 수 있는 팝업 창이 나타납니다.
❷ DB 보안 그룹을 클릭하면 DB 보안 규칙을 확인할 수 있는 팝업 창이 나타납니다.
❸ 파라미터 그룹을 클릭하면 파라미터를 확인할 수 있는 화면으로 이동합니다.
❹ 마우스로 드래그 앤드 드롭 하여 상세 정보 패널의 높이를 조절할 수 있습니다.
❺ 상세 정보 패널의 높이를 미리 지정된 높이로 조절할 수 있습니다.

### 접속 정보

DB 인스턴스 생성 시 내부 도메인을 발급합니다. 내부 도메인은 사용자 VPC 서브넷에 속한 IP 주소를 가리킵니다. 고가용성 DB 인스턴스의 경우 장애 조치가 되어 예비 마스터가 새로운 마스터로 변경되더라도 내부 도메인은 변경되지 않습니다. 따라서 특별한 이유가 없으면 응용 프로그램의 접속 정보는 반드시 내부 도메인을 이용해야 합니다.

플로팅 IP를 생성한 경우 외부 도메인을 추가로 발급합니다. 외부 도메인은 플로팅 IP의 주소를 가리킵니다. 외부 도메인 또는 플로팅 IP는 외부에서 접근이 가능하므로 DB 보안 그룹의 규칙을 적절히 설정하여 DB 인스턴스를 보호해야 합니다.

### 로그

DB 인스턴스의 로그 탭에서는 각종 로그 파일을 보거나 다운로드할 수 있습니다. 로그 파일은 아래와 같이 정해진 설정으로 로테이트 됩니다. 일부 로그 파일은 파라미터 그룹에서 활성화하거나 비활성화할 수 있습니다.

| 항목               | 로테이트 설정   | 변경 여부 | 연관 파라미터                                                                |
|------------------|-----------|-------|------------------------------------------------------------------------|
| error.log        | 100MB 10개 | 고정    |                                                                        |
| slow_query.log   | 100MB 40개 | 고정    | `slow_query_log`                                                       |
| general_log.log  | 100MB 40개 | 고정    | `general_log`                                                          |
| server_audit.log | 20MB 30개  | 변경 가능 | `server_audit_logging`<br />`server_audit_file_rotations`              | 
| mysql-bin.xxxxxx | 5일        | 변경 가능 | `binlog_expire_logs_seconds` (8.X 버전)<br />`expire_logs_days` (5.X 버전) |

![db-instance-detail-log_en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-log_en.png)

❶ **로그 보기**를 클릭하면 로그 파일의 내용을 확인할 수 있는 팝업 화면이 나타납니다. 최대 65,535Bytes의 로그를 확인할 수 있습니다.
❷ **가져오기**를 클릭하면 DB 인스턴스의 로그 파일을 다운로드할 수 있도록 요청합니다.
❸ 다운로드가 준비되면 **다운로드** 버튼이 노출됩니다. 클릭하면 로그를 내려받습니다.

> [주의]
> **가져오기**를 클릭하면 약 5분간 로그 파일이 백업 스토리지에 업로드되며 로그 파일의 크기만큼 백업 스토리지 용량이 과금됩니다.
> **다운로드**를 클릭하면 로그 파일의 크기만큼 인터넷 트래픽이 과금됩니다.

❹ 바이너리 로그(binary log)의 경우 2가지 형태로 내려받을 수 있습니다. **가져오기**를 클릭하면 바이너리 로그 형태를 선택할 수 있는 팝업 화면이 나타납니다.

![db-instance-detail-log-bin_en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-log-bin_en.png)

❺ mysqlbinlog 유틸리티를 이용하여 바이너리 로그(binary log)를 SQL 파일로 변환 후 내려받으려면 선택합니다.

### DB 스키마 & 사용자

DB 인스턴스의 **DB 스키마 & 사용자** 탭에서는 데이터베이스에 생성된 스키마와 사용자를 조회 및 제어할 수 있습니다.

#### DB 스키마 생성

![db-instance-detail-schema-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-schema_en.png)

❶ **+ 생성**을 클릭하면 사용자 추가 팝업 화면이 나타납니다.
❷ DB 스키마 이름을 입력한 뒤 **확인**을 클릭하여 DB 스키마를 생성할 수 있습니다.

DB 스키마 이름은 아래와 같은 제약 사항이 있습니다.

* 1~64자 사이의 알파벳, 숫자, _만 사용할 수 있으며, 첫 번째 글자는 영문자만 사용할 수 있습니다.
* `information_schema`, `performance_schema`, `db_helper`, `sys`, `mysql`, `rds_maintenance`는 DB 스키마 이름으로 사용할 수 없습니다.

생성된 DB 스키마의 이름은 수정할 수 없습니다.

#### DB 스키마 삭제

![db-instance-detail-schema-delete-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-schema-delete-en.png)

❶ 삭제할 DB 스키마를 선택 후 드롭다운 메뉴를 클릭합니다.
❷ **삭제** 메뉴를 클릭하면 삭제 확인 팝업 화면이 나타납니다. **확인**을 클릭하여 삭제를 요청할 수 있습니다.

#### 사용자 생성

![db-instance-detail-user-create-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-user-create-en.png)

❶ **+ 생성**을 클릭하면 사용자 추가 팝업 화면이 나타납니다.
❷ 사용자 ID를 입력합니다.

사용자 ID는 아래와 같은 제약 사항이 있습니다.

* 1~32자 사이의 글자이어야 합니다.
* `mysql.session`, `mysql.sys`, `mysql.infoschema`, `sqlgw`, `admin`, `etladm`, `alertman`, `prom`, `rds_admin`, `rds_mha`, `rds_repl`은 사용자 ID로 사용할 수 없습니다.

❸ Password를 입력합니다.
❹ 접속을 허용할 Host IP를 입력합니다. `%` 문자를 이용하면 허용할 Host IP를 범위로 지정할 수 있습니다. 예를 들어 `1.1.1.%`는 `1.1.1.0`~`1.1.1.255` 사이의 모든 IP를 의미합니다.
❺ 사용자에게 부여할 권한을 선택합니다. 부여할 수 있는 권한과 설명은 다음과 같습니다.

**READ**
* You have permission to view.

```sql
GRANT SELECT, SHOW VIEW, PROCESS, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO '{user_id}'@'{host}';
GRANT SELECT ON `mysql`.* TO '{user_id}'@'{host}';
GRANT SELECT, EXECUTE ON `sys`.* TO '{user_id}'@'{host}';
GRANT SELECT ON `performance_schema`.* TO '{user_id}'@'{host}';
```

**CRUD**
* Includes READ permission, and has permission to modify data.

```sql
GRANT INSERT, UPDATE, DELETE, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE ON *.* TO '{user_id}'@'{host}';
```

**DDL**
* Includes CRUD permissions, and has permissions to execute DDL queries.

```sql
GRANT CREATE, DROP, INDEX, ALTER, CREATE VIEW, REFERENCES, EVENT, ALTER ROUTINE, CREATE ROUTINE, TRIGGER, RELOAD ON *.* TO '{user_id}'@'{host}';
GRANT EXECUTE ON `mysql`.* TO '{user_id}'@'{host}';
```

**CUSTOM**
* When restoring a DB instance from an external database backup, all users that exist in the database are represented with the CUSTOM permission.
* You cannot check what permissions are in the CUSTOM permission template.
* If you change from one CUSTOM permission template to another permission template, you cannot change back to a CUSTOM permission template.

In MySQL 5.7.33 or higher, you can specify the authentication plugin and TLS Option when creating or changing users. If you change the authentication plugin, you must change the password as well. If you do not change the password, the existing password is used. Applicable authentication plugins by version are as follows.

❻ 사용자 인증에 적용할 플러그인을 선택합니다. 선택할 수 있는 버전별 플러그인은 다음과 같습니다.

| 인증 플러그인               | 지원 버전                  |
|-----------------------|------------------------|
| mysql_native_password | 모든 버전                  |
| sha256_password       | 5.7.33 버전 이상 8.0 버전 미만 |
| caching_sha2_password | 8.0 버전 이상              |

❼ DB 인스턴스에 대한 연결 암호화 옵션을 선택합니다.

| TLS Option | 설명                                                                                                                                                       |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| NONE       | Encrypted connections are not applied.                                                                                                                   |
| SSL        | Encrypted connections are applied.                                                                                                                       |
| X509       | An encrypted connection is applied and a certificate is required for access. The certificate required for access can be downloaded from the web console. |

> [참고]
> 사용자 인증 플러그인과 TLS Option은 MySQL 5.7.33 버전 이상에서 지원합니다.

#### 인증서 다운로드

사용자 계정의 TLS Option을 X509로 설정한 경우 DB 인스턴스에 접속하려면 인증서가 필요합니다.

![db-instance-detail-user-cert-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-user-cert-en.png)
![db-instance-detail-user-cert-down-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-user-cert-down-en.png)

❶ 인증서를 내려받을 DB 인스턴스를 선택합니다.
❷ 드롭다운 메뉴를 클릭합니다.
❸ **인증서 다운로드**를 클릭하면 인증서를 내려받을 수 있는 팝업 화면이 나타납니다.
❹ 내려받을 파일 하단의 **가져오기**를 클릭합니다.
❺ 내려받을 준비가 되면 **다운로드** 버튼이 나타납니다. 클릭하면 인증서 파일을 내려받을 수 있습니다.

> [주의]
> **가져오기**를 클릭하면 약 5분간 인증서 파일이 백업 스토리지에 업로드되며, 인증서 파일의 크기만큼 백업 스토리지 용량이 과금됩니다.
> **다운로드**를 클릭하면 인증서 파일의 크기만큼 인터넷 트래픽이 과금됩니다.

#### 사용자 수정

![db-instance-detail-user-modify-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-user-modify-en.png)

❶ 수정할 사용자 행의 **수정**을 클릭하면 사용자 정보를 수정할 수 있는 팝업 화면이 나타납니다.
❷ Password를 입력하지 않으면 변경되지 않습니다.
❸ 사용자 인증에 적용할 플러그인을 변경하려면 반드시 Password를 변경해야 합니다.

#### 사용자 삭제

![db-instance-detail-user-delete-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-user-delete-en.png)

❶ 삭제할 사용자를 선택 후 드롭다운 메뉴를 클릭합니다.
❷ **삭제**를 클릭하면 **삭제 확인** 팝업 화면이 나타납니다. **확인**을 클릭하여 삭제를 요청할 수 있습니다.

## DB 인스턴스 수정

웹 콘솔을 통해 생성된 DB 인스턴스의 다양한 항목을 손쉽게 변경할 수 있습니다. 변경 요청한 항목은 순차적으로 DB 인스턴스에 적용합니다. 적용 과정에서 재시작이 필요할 경우 모든 변경을 적용한 후 DB 인스턴스를 재시작합니다. 변경 불가능한 항목과 재시작이 필요한 항목은 다음과 같습니다.

| 항목           | 변경 가능 여부 | 재시작 필요 여부               |
|--------------|----------|-------------------------|
| 가용성 영역       | 아니오      |                         |
| DB 엔진        | 예        | 예                       |
| DB 인스턴스 타입   | 예        | 예                       |
| 데이터 스토리지 종류  | 아니오      |                         |
| 데이터 스토리지 크기  | 예        | 예                       |
| 고가용성 여부      | 예        | 아니오                     |
| Ping 간격      | 예        | 아니오                     | 
| 이름           | 예        | 아니오                     |
| 설명           | 예        | 아니오                     |
| DB 포트        | 예        | 예                       |
| VPC 서브넷      | 아니오      |                         |
| 플로팅 IP       | 예        | 아니오                     |
| 파라미터 그룹      | 예        | 변경된 파라미터의 재시작 여부에 따라 결정 |
| DB 보안 그룹     | 예        | 아니오                     |
| 백업 설정        | 예        | 아니오                     |
| 스키마 & 사용자 제어 | 예        | 아니오                     |

고가용성 DB 인스턴스의 경우 재시작이 필요한 항목의 변경이 있으면 안정성을 높이고 순단 시간을 줄이기 위하여 장애 조치를 이용한 재시작 기능을 제공합니다.

![db-instance-modify-ha-en.png](https://static.toastoven.net/prod_rds/24.03.12/db-instance-modify-ha-en.png)

장애 조치를 이용한 재시작을 사용하지 않으면 마스터와 예비 마스터에 변경 사항을 순차적으로 적용한 후 DB 인스턴스를 재시작합니다. 자세한 사항은 고가용성 DB 인스턴스의 [수동 장애 조치 항목](backup-and-restore/#mysql)을 참고합니다.

### DB Schema & Direct User Control

RDS for MySQL provides management features in the web console to make it easy to manage DB schemas and users, but it also provides the feature to set up direct user control. This can be set via the DB Schema & User Direct Control item on the Modify DB Instance screen in the web console. With direct control, all currently created users are granted the following permissions

```sql
GRANT CREATE,DROP,LOCK TABLES,REFERENCES,EVENT,ALTER,INDEX,INSERT,SELECT,UPDATE,DELETE,CREATE VIEW,SHOW VIEW,CREATE ROUTINE,ALTER ROUTINE,EXECUTE,CREATE USER,PROCESS,RELOAD,REPLICATION SLAVE,REPLICATION CLIENT,SHOW DATABASES, CREATE TEMPORARY TABLES,TRIGGER ON *.* TO '{user_id}'@'{host}' WITH GRANT OPTION;
```

> [Cautions]
> when you enable direct control and then disable it again
> * Already granted permissions are not revoked. If you use the command to add DB schema or users at this time, the data in the web console may not match.
> * All users that exist in the database, regardless of the permissions granted to them, are represented by CUSTOM permissions.

## DB 인스턴스 삭제

더 이상 사용하지 않는 DB 인스턴스는 삭제할 수 있습니다. 마스터를 삭제하면 해당 복제 그룹에 속한 예비 마스터와 읽기 복제본도 모두 함께 삭제됩니다. 삭제된 DB 인스턴스는 복구할 수 없으므로 중요한 DB 인스턴스는 삭제 보호 설정을 활성화하는 것을 권장합니다.

## Backup

You can prepare in advance to recover the database of DB instance in case of failure. You can perform backups through the web console whenever necessary, and you can configure to perform backups periodically. 자세한 사항은 [백업](backup-and-restore/#_1) 항목을 참고합니다.

## Restoration

Backups allow you to restore data to any point in time. Restoration always creates new DB instance and cannot be restored to the existing DB instance. 자세한 사항은 [복원](backup-and-restore/#_6) 항목을 참고합니다.

### Secure Capacity

If your storage is running out of capacity due to sudden heavy loads, you can delete the binary log with the ability to free up space in the web console. If you select securing capacity in the Web Console, a pop-up screen will be displayed where you can select the binary log for DB instance. Select Binary log and press the **Confirm** button to delete all binary logs generated before the selected binary log. Securing Capacity is a feature to temporarily secure capacity. If you continue to run
out of capacity, you may need to set a storage period for binary logs or expand the size of your storage to match the service load.

> [Note]
> You can set the storage period for binary logs with the `expire_logs_days` in MySQL 5.7 and later and the `binlog_expire_logs_seconds` parameter in MySQL 5.8 and later.

> [Caution]
> Depending on the deleted binary log, restoring to a certain point in time may not be possible.

## Applying parameter group changes

DB 인스턴스에 연결된 파라미터 그룹의 설정이 변경되어도 이 변경 사항은 DB 인스턴스에 자동으로 적용되지 않습니다. 만약 DB 인스턴스에 적용된 파라미터와 연결된 파라미터 그룹의 설정이 서로 다를 경우 웹 콘솔에 **파라미터** 버튼이 표시됩니다.

다음 방법 중 하나를 사용하여 DB 인스턴스에 파라미터 그룹의 변경 사항을 적용할 수 있습니다.

![db-instance-list-parameter-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-list-parameter-en.png)

❶ 대상 DB 인스턴스의 **파라미터**를 클릭하거나
❷ 대상 DB 인스턴스를 선택한 후 드롭다운 메뉴에서 **파라미터 그룹 변경 사항 적용** 메뉴를 클릭하거나
❸ 대상 DB 인스턴스의 **기본 정보** 탭에서 **파라미터 그룹 변경 사항 적용**을 클릭합니다.

파라미터 그룹에서 재시작을 필요로 하는 파라미터가 변경된 경우, 변경 사항을 적용하는 과정에서 DB 인스턴스가 재시작됩니다.

고가용성 DB 인스턴스의 경우 안정성을 높이고 순단 시간을 줄이기 위하여 장애 조치를 이용한 재시작 기능을 제공합니다.

![db-instance-parameter-ha-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-parameter-ha-en.png)

장애 조치를 이용한 재시작을 사용하지 않으면 마스터와 예비 마스터에 변경 사항을 순차적으로 적용한 후 DB 인스턴스를 재시작합니다. 자세한 사항은 고가용성 DB 인스턴스의 [수동 장애 조치 항목](backup-and-restore/#mysql)을 참고합니다.

## 오브젝트 스토리지에 있는 백업으로 복원

외부 MySQL 백업 파일을 NHN Cloud의 사용자 오브젝트 스토리지에 업로드하여 RDS for MySQL의 DB 인스턴스로 복원할 수 있습니다. 자세한 사항은 [외부 MySQL 백업을 이용한 복원](backup-and-restore/#mysql) 항목을 참고합니다.

## 오브젝트 스토리지로 백업 내보내기

백업을 수행함과 동시에 백업 파일을 NHN Cloud의 사용자 오브젝트 스토리지로 내보낼 수 있습니다. 자세한 사항은 [백업 내보내기](backup-and-restore/#_5) 항목을 참고합니다.

## Read Replica

To improve read performance, you can create a read replica which can be used for read-only. You can create maximum five read replicas for one master. You cannot create a read replica of a read replica.

### Create Read Replica

읽기 복제본을 생성하려면 복제 그룹에 속한 DB 인스턴스 중 테이블 잠금 사용 옵션으로 생성된 백업 파일 및 바이너리 로그(binary log)가 필요합니다. 백업 파일이 없는 경우 다음 순서에 따라 백업을 수행할 DB 인스턴스를 선택합니다.

❶ 자동 백업 설정한 읽기 복제본
❷ 자동 백업 설정한 예비 마스터
❸ 자동 백업 설정한 마스터

조건에 맞는 DB 인스턴스가 없을 경우 읽기 복제본 생성 요청은 실패합니다.

> [Caution]
> When creating a read replica, the master's I/O performance may be lower than usual. The time to create read replica can increase in proportion to the size of the master's database.
> 백업이 수행되는 DB 인스턴스의 경우 읽기 복제본 생성 과정에서 스토리지 I/O 성능 하락이 있을 수 있습니다.

> [Note]
> Object storage pricing may occur as much as the binary log size required for the process of creating read replica.

읽기 복제본을 생성하려면 웹 콘솔에서

![db-instance-replica-create-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-replica-create-en.png)

❶ 원본 DB 인스턴스를 선택한 뒤 **읽기 복제본 생성**을 클릭하면

아래 설정들을 통하여 읽기 복제본을 생성할 수 있습니다.

#### 변경 불가 항목

읽기 복제본을 생성할 때 아래 나열된 항목들은 원본 DB 인스턴스의 설정을 따르기 때문에 변경할 수 없습니다.

* DB Engine
* Data Storage Type
* User VPC Subnet

#### 읽기 복제본 리전

읽기 복제본을 생성할 리전을 선택할 때 리전 피어링을 지원하는 경우 서로 다른 리전에 존재하는 VPC 간 리전 피어링을 연결하면 다른 리전 VPC에 속한 서브넷에 읽기 복제본을 생성할 수 있습니다. 단, 원본 DB 인스턴스의 리전과 다른 리전을 선택하면 복제 지연이 발생할 수 있으며, DB 버전 업그레이드를 지원하지 않습니다.

> [주의]
> 리전 피어링이 연결되어 있더라도 라우트 설정이 올바르지 않을 경우 읽기 복제본 생성에 실패하거나 복제가 중단될 수 있습니다.

#### Availability Zone

읽기 복제본의 가용성 영역을 선택합니다. 자세한 설명은 [가용성 영역](./#_1) 항목을 참고합니다.

#### DB Instance Type

We recommend that you make the read replica the same or higher specification as the master. Creating with low specifications may cause to delay replication.

#### Data Storage Size

원본 DB 인스턴스와 동일한 크기로 만드는 것을 권장합니다. 크기를 작게 설정할 경우, 데이터 스토리지 용량 부족으로 복제 과정이 중단될 수 있습니다.

#### Floating IP

읽기 복제본의 플로팅 IP 사용 여부를 선택합니다. 자세한 설명은 [플로팅 IP](./#_1) 항목을 참고합니다.

#### Parameter Group

읽기 복제본의 파라미터 그룹을 선택할 때 복제 관련 설정 변경이 필요 없다면 원본 DB 인스턴스와 동일한 파라미터 그룹을 선택하는 것을 권장합니다. 파라미터 그룹에 대한 자세한 설명은 [파라미터 그룹](parameter-group/) 항목을 참고합니다.

#### DB Security Group

읽기 복제본에 적용할 DB 보안 그룹을 선택합니다. 복제에 필요한 규칙은 자동으로 적용되기 때문에 DB 보안 그룹에 별도로 복제 관련 규칙을 추가할 필요가 없습니다. DB 보안 그룹에 대한 자세한 설명은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.

#### Backup

읽기 복제본의 백업 설정을 선택합니다. 백업에 대한 자세한 설명은 [백업 및 복원](backup-and-restore/) 항목을 참고합니다.

#### Default Alarm

기본 알림 사용 여부를 선택합니다. 자세한 설명은 [기본 알림](./#_1) 항목을 참고합니다.

#### Deletion Protection

삭제 보호 사용 여부를 선택합니다. 자세한 설명은 [삭제 보호](./#_1) 항목을 참고합니다.

### Promote Read Replica

마스터와의 복제 관계를 해제하고 읽기 복제본을 독립된 마스터로 전환하는 과정을 승격이라고 합니다. 승격된 마스터는 독립된 DB 인스턴스로서 작동하게 됩니다. 승격을 원하는 읽기 복제본과 마스터 사이에 복제 지연이 존재하는 경우 해당 지연이 해결될 때까지 승격이 이루어지지 않습니다. 한 번 승격된 DB 인스턴스는 이전의 복제 관계로 되돌릴 수 없습니다.

> [주의]
> 마스터 DB 인스턴스의 상태가 비정상일 경우에는 승격 작업을 진행할 수 없습니다.

> [참고]
> 읽기 복제본이 위치한 리전과 동일한 리전의 웹 콘솔을 통해 승격 작업을 수행할 수 있습니다.

### Force Promote Read Replica

마스터나 원본 리전의 상태와 관계없이 읽기 복제본의 현재 시점 데이터를 기반으로 강제 승격을 진행합니다. 복제 지연이 있는 경우 데이터 유실이 발생할 수 있습니다. 따라서 읽기 복제본을 긴급하게 서비스에 투입해야 하는 상황이 아니라면 이 기능의 사용은 권장하지 않습니다.

### Stop Replication of Read Replicas

Read replicas can be stopped for several reasons. If the status of the read replica is `Replication stopped`, you must quickly determine the cause and perform normalization. If the ` Replication stopped` status persists for a long time, the replication delay will increase. If you do not have the binary log required for normalization, you must rebuild the read replica. The reason for replication stop can be determined by the `SHOW SLAVE STATUS` command in the read replica. If the value
of `Last_Errno` is 1062, you can call the Procedure below until the error disappears.

``` 
mysql> CALL mysql.tcrds_repl_skip_repl_error(); 
```

### Rebuild Read Replica

읽기 복제본의 복제 문제를 해결할 수 없는 경우 재구축을 통해 정상 상태로 복원할 수 있습니다. 이 과정에서 읽기 복제본의 모든 데이터베이스를 삭제하고, 마스터 데이터베이스를 기반으로 새롭게 재구축합니다. 재구축하는 동안 읽기 복제본은 사용할 수 없습니다. 읽기 복제본을 재구축 하려면 복제 그룹에 속한 DB 인스턴스 중 테이블 잠금 사용 옵션으로 생성된 백업 파일 및 바이너리 로그(binary log)가 필요합니다. 백업 파일이 없는 경우 동작 및 주의 사항은 [읽기 복제본 생성](./#_1) 항목을 참고합니다.

> [참고]
> 재구축 후에도 접속 정보(도메인, IP)는 변경되지 않습니다

## DB 인스턴스 재시작

MySQL을 재시작하거나 고가용성 DB 인스턴스를 수동으로 장애 조치하고자 할 때, DB 인스턴스를 재시작할 수 있습니다. 재시작 시간을 최소화하기 위해 서비스 부하가 낮은 시간대에 수행하는 것이 좋습니다. 고가용성 DB 인스턴스의 경우 장애 조치를 이용한 재시작을 사용하지 않을 경우 예비 마스터를 먼저 재시작한 뒤 마스터를 재시작합니다. 장애 조치 기능을 이용한 재시작의 경우 [수동 장애 조치](./#_1) 항목을 참고합니다.

DB 인스턴스 재시작을 하려면 웹 콘솔에서

![db-instance-restart-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-restart-en.png)

❶ 재시작을 원하는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **DB 인스턴스 재시작** 메뉴를 클릭합니다.

## DB 인스턴스 강제 재시작

DB 인스턴스의 MySQL이 정상 동작하지 않는 경우 강제로 재시작할 수 있습니다. 강제 재시작의 경우 MySQL에 SIGTERM 명령을 내려 정상 종료되기를 10분간 기다립니다. 10분 안에 MySQL이 정상 종료되면 이후 가상 머신을 재부팅합니다. 10분 안에 정상 종료되지 않으면 가상 머신을 강제로 재부팅합니다. 가상 머신이 강제로 재부팅되면 작업 중인 일부 트랜잭션이 유실될 수 있으며, 데이터 볼륨이 손상되어 복구가 불가능해질 수 있습니다. 강제 재시작 이후 DB 인스턴스의 상태가 사용 가능 상태로 돌아오지 않을 수 있습니다. 해당 상황 발생 시 고객 센터로 문의하십시오.

> [주의]
> 데이터가 유실되거나 데이터 볼륨이 손상될 가능성이 있으므로 해당 기능은 긴급하고 불가피한 상황 이외에는 사용을 지양해야 합니다.

> [참고]
> 고가용성 DB 인스턴스의 경우 강제 재시작할 수 없습니다.

DB 인스턴스 강제 재시작을 하려면 웹 콘솔에서

![db-instance-restart-force-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-restart-force-en.png)

❶ 강제 재시작을 원하는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **DB 인스턴스 강제 재시작** 메뉴를 클릭합니다.

## 삭제 보호 설정 변경

삭제 보호를 활성화하면 실수로 DB 인스턴스가 삭제되지 않도록 보호할 수 있습니다. 삭제 보호를 비활성화할 때까지 해당 DB 인스턴스를 삭제할 수 없습니다. 삭제 보호 설정을 변경하려면

![db-instance-deletion-protection-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-deletion-protection-en.png)

❶ 삭제 보호 설정을 변경하려는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **삭제 보호 설정 변경** 메뉴를 클릭하면 팝업 창이 나타납니다.

![deletion-protection-popup-en](https://static.toastoven.net/prod_rds/24.03.12/deletion-protection-popup-en.png)

❷ 삭제 보호 설정을 변경한 후 **확인**을 클릭합니다.

## High Availability DB instances

High availability DB instances increase availability, data durability, and provide fault tolerant databases. High availability DB instances consist of master and candidate master and are created in different availability zones. Candidate master is a DB instance for failover and is not normally available. For high availability DB instances, backups are performed on the sample master.

> [Note]
> For high availability DB instances, if you set to use MySQL query statement to force replication from another DB instance or from a master in external MySQL, high availability and some features do not work properly.

### Failure Detection

Candidate master has a process for detecting failures, which periodically detects the state of the master. This detection period is called ping interval and takes failover if four consecutive health checks fail. The shorter the ping interval, the more sensitive to the fault respond is, and the longer the ping interval, the less insensitive the fault respond is. It is important to set the appropriate ping interval for the service load accordingly.

> [Note]
> When the master's storage usage is full, the high availability monitoring process detects it as a failure and takes action, which you should be taken note of.

### Automatic Failover

When the candidate master fails the master's health check four times in a row, it determines that the master is unable to provide service and automatically performs a failover. In order to prevent split brains, disconnect all user security groups assigned to the failed master to block external connections, and the preliminary master will take over the role of the master. A record in the internal domain for access are changed from the failed master to the preliminary master, so no changes to the
application are required. When failover is completed, the type of failed over master changes to the failed over master and the type of candidate master changes to the master. No failover is performed until the failed over master is recovered or rebuilt. Promoted master takes over all automatic backups of the failover master. Point-in-time restoration using existing backups is not supported because the master changes during failover and all binary logs are deleted. You can restore point-in-time
from the time the new backup was performed on the promoted master.

> [Note]
> As the high availability feature is based on a domain, if a client trying to connect is in a network environment where the DNS server cannot be reached, the DB instance cannot be accessed through the domain, and normal connection is not possible in the event of failover. It takes approximately 3 seconds for the changes to A record in the internal domain to take effect, but may vary depending on the DNS Cache policy in the client environment where attempting to connect.

> [Caution]
> If the position number value of the binary log between master and candidate master differs by more than 100,000,000, there is no failover.

### Failed over Master

A master that fails and conducts failover is called failover master. Backups of failed over master are not automatically performed, and all other features other than failed over master recovery, rebuild, separate, and delete are not performed.

### Recover Failed Over Master

If the data is not consistent during failover and the binary log is not lost from the point of failure to the point of attempting recovery, the failed over and promoted masters can be recovered back to the high availability configuration. Because it re-configure replication relationships with the promoted master in the database of the failed over master, recovery fails once the data became inconsistent or once the binary log required for recovery was lost.

If the failed over master fails to recover, you can re-enable the high availability feature by rebuilding.

> [Note]
> Recovery is not supported for DB instances where failover occurred before April 11, 2023.

장애 조치된 마스터를 복구하려면 웹 콘솔에서

![db-instance-failover-repair-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-failover-repair-en.png)

❶ 복구를 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 복구** 메뉴를 클릭합니다.

### Rebuild Failed over Master

If the failed over master fails to recover, you can re-enable the high availability feature by rebuilding. Unlike recovery, rebuild removes all databases from the failed over master and rebuilds them based on the promoted master's database. In this process, 백업 파일이 없는 경우 다음 순서에 따라 백업을 수행할 DB 인스턴스를 선택합니다.

❶ 자동 백업 설정한 읽기 복제본
❷ 자동 백업 설정한 마스터

조건에 맞는 DB 인스턴스가 없을 경우 장애 조치된 마스터 재구축 요청은 실패합니다.

> [주의]
> 마스터의 데이터베이스 크기에 비례하여 장애 조치된 마스터 재구축 시간이 늘어날 수 있습니다.
> 백업이 수행되는 DB 인스턴스의 경우 장애 조치된 마스터 재구축 과정에서 스토리지 I/O 성능 하락이 있을 수 있습니다.

> [참고]
> 장애 조치된 마스터 재구축 과정에 필요한 바이너리 로그(binary log) 크기만큼 백업 스토리지 과금이 발생할 수 있습니다.

장애 조치된 마스터를 재구축하려면 웹 콘솔에서

![db-instance-failover-rebuild-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-failover-rebuild-en.png)

❶ 재구축을 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 재구축** 메뉴를 클릭합니다.

### Separate Failed over Master

If recovery of a failed over master fails and data correction is required, you can disable the high availability feature by separating that master. The replication relationship between the separated master and the promoted master is broken, and each behaves as a normal DB instance. After separation, you cannot recover to the existing configuration.

### 장애 조치된 마스터 분리

장애 조치된 마스터 복구에 실패하여 데이터 보정이 필요할 경우 장애 조치된 마스터를 분리하여 고가용성 기능을 비활성화할 수 있습니다. 분리된 마스터와 승격된 마스터 간의 복제 관계가 끊어지며 각각 일반 DB 인스턴스로 동작합니다. 분리된 이후에는 다시 원래 구성으로 복구가 불가능합니다.

장애 조치된 마스터를 분리하려면 웹 콘솔에서

![db-instance-failover-split-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-failover-split-en.png)

❶ 분리를 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 분리** 메뉴를 클릭합니다.

### Manual Failover

For high-availability DB instances, when performing an action that accompanies restart, you can choose whether to restart with failover, and the tasks are as follows.

* Restart DB instance
* 재시작이 필요한 항목의 변경
* 재시작이 필요한 파라미터의 변경을 적용
* 하이퍼바이저 점검을 위한 DB 인스턴스 마이그레이션

When you restart with failover, the candidate master is restarted first. Failover will then promote the candidate master to the master, and the existing master will serve as a candidate master. Upon promotion, a record of the internal domain for access changes from master to candidate master, hence no changes to the application are required. The promoted master takes over all automatic backups of the previous master. Point-in-time restoration using existing backups is not supported because the
master changes during failover and all binary logs are deleted. You can restore point-in-time from the time the new backup was performed on the promoted master.

> [주의]
> 예비 마스터와 복제 그룹에 포함된 읽기 복제본의 Seconds_Behind_Master 값이 1 이상일 경우 복제 지연이 발생한 것으로 간주하며, 이때 수동 장애 조치는 실패합니다. 부하가 적은 시간에 수동 장애 조치를 진행하는 것이 좋습니다. 복제 지연으로 인한 재시작 실패는 이벤트 화면을 통해 확인할 수 있습니다.

장애 조치를 이용한 재시작 시 다음의 항목을 추가로 선택하여 안정성을 높일 수 있습니다.

#### 현재 시점 백업 진행

장애 조치 과정에서 바이너리 로그(binary log)가 모두 삭제되기 때문에 장애 조치를 이용한 재시작이 완료된 후 곧바로 수동 백업을 진행할 수 있습니다.

#### 장애 조치 수동 제어

예비 마스터에 변경 사항을 먼저 적용한 뒤 그 추이를 관찰하거나, 정확한 시간에 장애 조치를 실행하고자 할 때 웹 콘솔에서 장애 조치 시점을 직접 제어할 수 있습니다. 장애 조치 수동 제어를 선택하면 예비 마스터가 재시작된 후 ❶ 웹 콘솔에 **장애 조치** 버튼이 표시됩니다. 이 버튼을 클릭하면 장애 조치가 실행되며, 최대 5일간 실행을 대기할 수 있습니다. 5일 이내에 장애 조치를 실행하지 않을 경우 해당 작업은 자동으로 취소됩니다.

![db-instance-ha-wait-manual-failover-en](https://static.toastoven.net/prod_rds/24.03.12/db-instance-ha-wait-manual-failover-en.png)

> [주의]
> 장애 조치를 대기하는 동안에는 자동 장애 조치가 되지 않습니다.

#### 복제 지연 해소 대기

복제 지연 해소 대기 옵션을 활성화하면 예비 마스터와 복제 그룹에 포함된 읽기 복제본의 복제 지연이 사라질 때까지 대기할 수 있습니다.

#### 쓰기 부하 차단

복제 지연을 해소하는 동안 쓰기 부하를 추가로 차단하는 선택이 가능합니다. 쓰기 부하를 차단하면 장애 조치를 수행하기 바로 전에 마스터가 읽기 전용 모드로 전환되어 모든 변경 쿼리가 실패하도록 설정됩니다.

### Pause High Availability

You can temporarily stop the high availability feature in situations where temporary interruption of connectivity or high load is expected. If the high availability feature is paused, it does not detect failures, and therefore does not fail. Even if a task that requires a restart while the high availability feature is paused do not resume the paused high availability feature. Data replication occurs normal when high availability is paused, but we do not recommend that you pause for a long time
as no failures are to be detected.

## MySQL Procedure

RDS for MySQL provides its own procedures for performing some of the features that are restricted from user accounts to provide user convenience.

### tcrds_active_process

* Retrieves queries in the Processlist that are in the ACTIVE state, not the Sleep state.
* The execution times are printed in the chronological order, and the query contents (SQL) are only printed maximum 100 digits.

``` 
mysql> CALL mysql.tcrds_active_process();
```

### tcrds_process_kill

* Forces to end a specific process.
* The process ID to be terminated can be checked in information_schema, you can use the tcrds_active_process and tcrds_current_lock procedures to refer to the information about the process.

``` 
mysql> CALL mysql.tcrds_process_kill(processlist_id ); 
```

### tcrds_current_lock

* Checks the processes currently waiting for a lock and the process information occupying the lock.
* (w) Process information that column information waits to obtain locks
* (w) Process information that column information waits to obtain locks
* To force end the process occupying a lock , after checking the (B) PROCESS column, perform call tcrds_process_kill(process_id).

``` 
mysql> CALL mysql.tcrds_current_lock();
```

### tcrds_repl_changemaster

* Imports external MySQL DBs into NHN Cloud RDS using replication.
* **Create Replica** on the console can be used to configure replication of NHN Cloud RDS.

``` 
mysql> CALL mysql. tcrds_repl_changemaster (master_instance_ip, master_instance_port, user_id_for_replication, password_for_replication_user, MASTER_LOG_FILE, MASTER_LOG_POS); 
```

* Parameter description
  * master_instance_ip: IP of replication target (Master) server
  * master_instance_port: MySQL Port on the replication target (Master) Server
  * user_id_for_replication: Account for replication to access MySQL on the replication target (Master) server
  * password_for_replication_user: Account password for replication
  * MASTER_LOG_FILE: The binary log file name of the replication target (Master)
  * MASTER_LOG_POS: The binary log position of the replication target (Master)

```
ex) call mysql.tcrds_repl_changemaster('10.162.1.1',10000,'db_repl','password','mysql-bin.000001',4); 
```

> [Caution]
> The account for replication has to be created in the replication target (Master) MySQL.

### tcrds_repl_init

* Initializes MySQL replication information.

``` 
mysql> CALL mysql.tcrds_repl_init(); 
```

### tcrds_repl_slave_stop

* Stops MySQL replication.

``` 
mysql> CALL mysql.tcrds_repl_slave_stop(); 
```

### tcrds_repl_slave_start

* Starts MySQL replication.

``` 
mysql> CALL mysql.tcrds_repl_slave_start();

```

### tcrds_repl_skip_repl_error

* Performs SQL_SLAVE_SKIP_COUNTER=1. The following Duplicate key errors can be resolved by running the tcrds_repl_skip_repl_error procedure.
* `MySQL error code 1062: 'Duplicate entry ? for key ?'`

``` 
mysql> CALL mysql.tcrds_repl_skip_repl_error(); 
```

### tcrds_repl_next_changemaster

* Changes the replication information in order to read the following binary log on the Master.
* The following Duplicate errors can be resolved by running the tcrds_repl_next_changemaster procedure.
* example) MySQL error code 1236 (ER_MASTER_FATAL_ERROR_READING_BINLOG): Got fatal error from master when reading data from binary log

``` 
mysql> CALL mysql.tcrds_repl_next_changemaster(); 
```

### tcrds_innodb_monitor_reset
* A procedure to run the innodb_monitor_reset variables, which reset the counter in the information_schema.INNODB_METRICS table to zero.
* Execute `SET GLOBAL innodb_monitor_reset = '{counter-name|module_name|pattern|all}';`.
* innodb_monitor_enable, innodb_monitor_disable are provided as RDS parameters.

```
mysql> CALL mysql.tcrds_innodb_monitor_reset('{counter-name|module_name|pattern|all}');
```

```
ex) CALL mysql.tcrds_innodb_monitor_reset('dml_reads');
CALL mysql.tcrds_innodb_monitor_reset('module_dml');
```

### tcrds_innodb_monitor_reset_all
* A procedure to run innodb_monitor_reset_all variables that reset the value of counter.
* To use innodb_monitor_reset_all, the counter must be in the disable state.
* Execute `SET GLOBAL innodb_monitor_reset_all = '{counter-name|module_name|pattern|all}';`.

```
mysql> CALL mysql.tcrds_innodb_monitor_reset_all('{counter-name|module_name|pattern|all}');
```

## Data Migration

* RDS can be exported as data to or imported from NHN Cloud RDS using mysqldump.
* The mysqldump utility is provided by default when mysql is installed.

### Export using mysqldump

* Prepare and use an instance of NHN Cloud RDS.
* Check that the external instance on which you want to store the data to be exported, or the computer on which the local client is installed, has sufficient capacity.
* If you need to export data outside of NHN Cloud, create Floating IP and connect it to the RDS instance where you want to export the data.
* Export data externally using the mysqldump command below.

#### When exporting files

``` 
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name} 
```

#### Export to mysqldb outside NHN Cloud RDS.

``` 
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} 
```

### Export using mysqldump

* Prepare db outside NHN Cloud RDS to import data.
* Check that the NHN Cloud RDS instance that you import has sufficient capacity.
* Create a Floating IP to connect to the NHN Cloud RDS instance.
* Import data from outside using the mysqldump command below.

``` 
mysqldump -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} --single-transaction --set-gtid-purged=off --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} 
```

#### When `ERROR 1227` occurs during data importing

* `ERROR 1227` occurs when a stored object (trigger, view, function, or event) in the mysqldump file has DEFINER definition.
* To resolve this, delete the `DEFINER` part of the mysqldump file and proceed.

#### When `ERROR 1418` occurs during data importing

* `ERROR 1418` occurs when the function declaration in the mysqldump file does not contain NO SQL, READS SQL DATA, or DETERMINISTIC and binary logging is enabled.
  * For detailed information, refer to [The Binary Log](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html) MySQL document.
* To resolve this, Parameter value of `log_bin_trust_function_creators` of DB instance to which you want to apply mysqldump file should be changed to `1`.

### Export by using replication

* Replication allows you export data from NHN Cloud RDS to external DB.
* The external db version has to be the same as or later than the version of NHN Cloud RDS.
* Prepare an instance of NHN Cloud RDS Master or Read Only Slave to export data.
* Create Floating IP to connect to NHN Cloud RDS instances to export data.
* Create Floating IP to connect to NHN Cloud RDS instances to export data.
* When exporting from Master RDS instance.

``` 
mysqldump -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
 ```

* When exporting from Read Only Slave RDS.

``` 
mysqldump -h{rds_read_only_slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name} 
```

* Open the backed up file and record the MASTER_LOG_FILE and MASTER_LOG_POS written in the annotation separately.
* Check that the external local client or computer on which db is installed has sufficient capacity to back up data from the NHN Cloud RDS instance.
* Add the following options to my.cnf (for winodws my.ini) file in external DB.
* For server-id, enter a value different from the server-id of the DB Configuration entry for the NHN Cloud RDS instance.

``` 
... 
[mysqld] 
... 
server-id={server_id} 
replicate-ignore-db=rds_maintenance 
... 
```

* Restart external DB.
* Enter the backed up file into an external DB using the command below.

``` 
mysql -h{external_db_host} -u{exteranl_db_id} -p{external_db_password} --port={exteranl_db_port} < {local_path_and_file_name} 
```

* Create an account for replication on the NHN Cloud RDS instance.
* Before setting up a new replication, run the query below to initialize existing replication information that may exist. When you run RESET SLAVE, the existing replication information is initialized.

```
 STOP SLAVE;

RESET SLAVE;
```

* Run the query on the external DB as shown below, using the account information to be used for replication and the MASTER_LOG_FILE and MSATER_LOG_POS that recorded earlier.

```
 CHANGE MASTER TO master_host = '{rds_master_instance_floating_ip}', master_user='{user_id_for_replication}', master_password='{password_forreplication_user}', master_port ={rds_master_instance_port}, master_log_file ='{MASTER_LOG_FILE}', master_log_pos = {MASTER_LOG_POS};

START SLAVE;
```

* If the source data of the external DB and the NHN Cloud RDS instance are identical, use the STOP SLAVE command to the external DB to terminate the replication

### Import with Replication

* You can import external DBs into NHN Cloud RDS using replication.
* NHN Cloud RDS version has to be the same as or later than the external DB version.
* Connect the data to an external MySQL instance to which it is exported.
* Use the command below to back up data from an external MySQL instance.
* When importing from an external MySQL instance (master)

``` 
mysqldump -h{master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name} 
```

* When importing from an external MySQL instance (slave)

``` 
mysqldump -h{slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name} 
```

* Open the backed up file and record the MASTER_LOG_FILE and MASTER_LOG_POS in the annotation separately.
* Check that you have enough space on the client or computer to back up data from the NHN Cloud RDS instance.
* Add the following options to my.cnf (for winodws my.ini) file in external DB.
* For server-id, enter a value different from the server-id of the DB Configuration entry for the NHN Cloud RDS instance.

```
 ... 
 [mysqld] 
 ... 
 server-id={server_id} 
 replicate-ignore-db=rds_maintenance 
 ... 
 ```

* Restart external DB.
* As importing over an external network can take a long time,
* We recommend that you create an internal NHN Cloud Image, copy the backup file, and import it into NHN Cloud.
* Enter the backed up file into NHN Cloud RDS with the command below.
* Replication configuration does not support DNS, so convert to IP and run.

``` 
mysql -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} < {local_path_and_file_name} 
```

* Create an account for replication on an external MySQL instance.

``` 
mysql> CREATE USER 'user_id_for_replication'@'{external_db_host}' IDENTIFIED BY '<password_forreplication_user>'; mysql> GRANT REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'user_id_for_replication'@'{external_db_host}'; 
```

* Run a query on NHN Cloud RDS as follows,
  using the account information to be used for replication and the MASTER_LOG_FILE and MSATER_LOG_POS that recorded earlier.

``` 
mysql> call mysql.tcrds_repl_changemaster ('rds_master_instance_floating_ip',rds_master_instance_port,'user_id_for_replication','password_forreplication_user','MASTER_LOG_FILE',MASTER_LOG_POS ); 
```

* To start replication, run the procedure below.

``` 
mysql> call mysql.tcrds_repl_slave_start; 
```

* When the source data of the external DB and NHN Cloud RDS instance become the same, use the command below to end the replication.

```
mysql> call mysql.tcrds_repl_init(); 
```

## Appendix

### Appendix 1. Guide for DB instance Migration for Hypervisor Maintenance

NHN Cloud updates hypervisor software on a regular basis to enhance security and stability of its infrastructure services.
Instances that are running on a target hypervisor for maintenance must be migrated to a hypervisor which is completed with maintenance.

Migration of DB instance can start on a NHN Cloud console.
Depending on database configuration, select a particular instance to migrate it as well, if its relevant DB instance (e.g. slave instance) is also the target of maintenance.
Follow the guide as below, to use the migration service on console.
Go to the project in which a DB instance for maintenance is located.

#### 1. Check DB instances which are the maintenance targets.

Those with the migration button next to name are the maintenance targets.

![rds_planed_migration_0](https://static.toastoven.net/prod_rds/planned_migration_alarm/image0_en.png)

Put a cursor on the migration button, and you can find its maintenance schedule.

![rds_planed_migration_1](https://static.toastoven.net/prod_rds/planned_migration_alarm/image1_en.png)

#### 2. Make sure you close any application programs that are running on the DB instance.

It is recommended to take appropriate measures so as impact on relevant services can be limited.
Nevertheless, if impact on service is inevitable, contact NHN Cloud Customer Center to be guided further.

#### 3. Select a DB instance for maintenance, click migration, and click OK on window asking of migration.

![rds_planed_migration_2](https://static.toastoven.net/prod_rds/planned_migration_alarm/image2_en.png)

#### 4. Wait until database migration is over.

If instance status remains the same, try 'Refresh'.

![rds_planed_migration_3](https://static.toastoven.net/prod_rds/planned_migration_alarm/image3_en.png)

While migration is underway, operation is not permitted.
An abnormal closure of DB instance migration shall be automatically reported to administrator, and it such case, you'll be contacted by NHN Cloud.

### Appendix 2. Configuration guide for using Federated Storage Engine with RDS

When using Federated Storage Engine, make sure you consider the following.

#### For configuration using RDS as a local node

* Make sure you need to allow the outbound direction to remote nodes.
  * DB 보안 그룹에서 규칙을 추가할 수 있습니다.
  * 자세한 사항은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.
* When using a configuration that adds Read Only Slave to RDS that serves as a local node, you need to specify a federated table in replicate-ignore-table of DB Configuration.
  * When configuring Read Only Slave, the federated table is also replicated so that Master and Read Only Slave look at the remote nodes together.
  * In this case, the data input performed in Master is performed in the remote nodes according to the federated settings, and the same input is also performed in Read Only Slave, so replication may be suspended due to a duplicate key error, etc.
  * Make sure you need to configure the settings of replicate-ignore-table so that Read Only Save does not replicate a federated table.

#### For configuration using RDS as a remote node

* Make sure you need to allow the inbound direction to local nodes.
  * DB 보안 그룹에서 규칙을 추가할 수 있습니다.
  * 자세한 사항은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.