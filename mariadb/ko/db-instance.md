## Database > RDS for MariaDB > DB 인스턴스

## DB 인스턴스

DB 인스턴스는 가상 장비와 설치된 MariaDB을 아우르는 개념으로, RDS for MariaDB에서 제공하는 MariaDB의 단위입니다.
DB 인스턴스의 운영체제에 직접 접근할 수 없으며, 오직 DB 인스턴스 생성 시 입력하신 포트를 통해서 데이터베이스로만 접근할 수 있습니다. 사용할 수 있는 포트 범위는 아래와 같은 제약 사항이 있습니다.

* 사용할 수 있는 포트 범위는 3306~43306 사이입니다.

DB 인스턴스는 고객이 부여하는 이름과 자동으로 부여되는 32바이트 아이디로 식별됩니다.
DB 인스턴스 이름은 아래와 같은 제약 사항이 있습니다.

* DB 인스턴스 이름은 리전별로 고유해야 합니다.
* DB 인스턴스 이름은 1~100 사이의 영문자, 숫자, 일부 기호(-, _, .)만 사용할 수 있으며, 첫 번째 글자는 영문자만 사용할 수 있습니다.

## DB 인스턴스 생성

아래 설정들을 통하여 DB 인스턴스를 생성할 수 있습니다.

### 가용성 영역

NHN Cloud는 물리 하드웨어 문제로 생기는 장애에 대비하기 위해 전체 시스템을 여러 개의 가용성 영역으로 나누어 두었습니다. 이 가용성 영역별로 저장 시스템, 네트워크 스위치, 상면, 전원 장치가 모두 별도로 구성돼 있습니다. 한 가용성 영역 내에서 생기는 장애는 다른 가용성 영역에 영향을 주지 않으므로 서비스 전체의 가용성이 높아집니다. DB 인스턴스를 여러 가용성 영역에 나눠 구축한다면 서비스의 가용성을 더욱 높일 수 있습니다. 여러 가용성 영역에 흩어져서 생성된 DB 인스턴스끼리 네트워크 통신이 가능하며 이때 발생하는 네트워크 사용 비용은 부과되지 않습니다.

> [주의]
> 이미 생성한 DB 인스턴스의 가용성 영역은 변경할 수 없습니다.

### DB 엔진

아래에 명시된 버전을 사용할 수 있습니다.
| 버전              | 비고 |
|-----------------|----|
| MariaDB 10.11.8 |    |
| MariaDB 10.11.7 |    |
| MariaDB 10.6.16 |    |
| MariaDB 10.6.12 |    |
| MariaDB 10.6.11 |    |
| MariaDB 10.3.30 |    |

### DB 인스턴스 타입

DB 인스턴스는 타입에 따라 서로 다른 CPU 코어 수와 메모리 용량을 가지고 있습니다.
DB 인스턴스 생성 시 데이터베이스 워크로드에 따라 알맞은 DB 인스턴스 타입을 선택해야 합니다.

| 타입 | 설명                                                        |
|----|-----------------------------------------------------------|
| m2 | CPU와 메모리를 균형 있게 설정한 타입입니다.                                |
| c2 | CPU의 성능을 높게 설정한 인스턴스 타입입니다.                               |
| r2 | 다른 자원에 비해 메모리의 사용량이 많은 경우 사용할 수 있습니다.                     |
| x1 | 고사양의 CPU와 메모리를 지원하는 타입입니다. 높은 성능이 필요한 서비스나 애플리케이션에 사용합니다. |

이미 생성한 DB 인스턴스의 타입은 콘솔을 통해 손쉽게 변경 가능합니다.

> [주의]
> 이미 생성한 DB 인스턴스의 타입 변경 시 DB 인스턴스가 종료되므로 수분의 중단 시간이 발생합니다.

### 데이터 스토리지

데이터 스토리지에 데이터베이스의 데이터 파일을 저장합니다. DB 인스턴스는 HDD, SSD의 2가지 데이터 스토리지 유형을 지원합니다. 데이터 스토리지 유형에 따라 성능과 가격이 다르므로 데이터베이스 워크로드에 따라 알맞은 유형을 선택해야 합니다. 데이터 스토리지는 20GB~2TB로 생성할 수 있습니다.

> [주의]
> 이미 생성한 DB 인스턴스의 데이터 스토리지 유형은 변경할 수 없습니다.

> [참고]
> 데이터 스토리지를 2TB 이상 사용하려면 NHN Cloud 고객 센터로 연락하십시오.

아래 작업은 데이터 스토리지의 I/O 사용률이 높아지기 때문에 진행되는 동안 DB 인스턴스의 성능이 저하될 수 있습니다.

* 단일 DB 인스턴스의 백업
* 단일 DB 인스턴스의 고가용성 구성
* 읽기 복제본 생성
* 읽기 복제본 재구축
* 예비 마스터 재구축
* 특정 시점으로 복원
* 단일 DB인스턴스에서 백업 후 오브젝트 스토리지로 백업 파일 내보내기

### 고가용성

고가용성 DB 인스턴스는 가용성과 데이터 내구성을 증가시키고, 장애 허용이 가능한 데이터베이스를 제공합니다. 고가용성 DB 인스턴스는 마스터, 예비 마스터로 구성되며 서로 다른 가용성 영역에 생성됩니다. 예비 마스터는 장애에 대비한 DB 인스턴스로 평소에는 사용할 수 없습니다. 고가용성 DB 인스턴스의 경우 예비 마스터에서 백업이 수행되기 때문에 백업으로 인한 성능 저하를 회피할 수 있습니다. 고가용성 DB 인스턴스가 제공하는 여러 기능들은 [고가용성 DB 인스턴스](db-instance/#ha-db-instance)에서 확인할 수 있습니다.

### 네트워크

DB 인스턴스에 연결할 VPC 서브넷을 선택해야 합니다. 동일한 서브넷에 연결된 Compute 서비스의 인스턴스 간에는 별도의 플로팅 IP 없이 통신할 수 있으며, 네트워크 트래픽에 대한 비용이 청구되지 않습니다. DB 인스턴스는 기본적으로 모든 네트워크 접근을 차단하므로 접속을 원하는 경우 DB 보안 그룹을 적용해야 합니다.

> [주의]
> 이미 생성한 DB 인스턴스의 서브넷은 변경할 수 없습니다.

### 플로팅 IP

외부에서 DB 인스턴스에 접근하려면 플로팅 IP를 DB 인스턴스에 연결해야 합니다. Internet Gateway가 연결된 서브넷을 연결할 경우에만 플로팅 IP를 생성할 수 있습니다. 플로팅 IP는 사용과 동시에 과금이 되며, 이와 별개로 플로팅 IP를 통한 인터넷 방향의 트래픽이 발생할 경우 별도 과금합니다.

### 파라미터 그룹

파라미터 그룹은 DB 인스턴스에 설치된 데이터베이스를 설정할 수 있는 파라미터의 집합입니다. DB 인스턴스 생성 시 반드시 하나의 파라미터 그룹을 선택해야 합니다. 파라미터 그룹은 생성 이후에도 자유롭게 변경이 가능합니다. 파라미터 그룹에 대한 자세한 설명은 [파라미터 그룹](parameter-group/) 항목을 참고합니다.

### DB 보안 그룹

DB 보안 그룹은 외부 침입에 대비해 접속을 제한하기 위해서 사용합니다. 송수신 트래픽에 대해서 특정 포트 범위 또는 데이터베이스 포트에 대해서 접근을 허용할 수 있습니다. DB 인스턴스에 여러 개의 DB 보안 그룹을 적용할 수 있습니다. DB 보안 그룹에 대한 자세한 설명은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.

### 백업

DB 인스턴스의 데이터베이스를 주기적으로 백업하도록 설정하거나, 콘솔을 통해 원하는 시기에 백업을 생성할 수 있습니다. 백업이 수행되는 동안 성능 저하가 발생할 수 있습니다. 서비스에 영향을 주지 않기 위해 서비스의 부하가 적은 시간에 백업하는 것을 권장합니다. 백업으로 인한 성능 저하를 원치 않으면 고가용성 구성을 사용하거나, 이전 백업 이후 데이터의 증분만 백업할 수 있으며, 읽기 복제본에서 백업을 수행할 수 있습니다. 백업 파일은 내부 백업 스토리지에 저장되며, 백업 용량에 따라 과금됩니다. 필요한 경우 NHN Cloud의 사용자 오브젝트 스토리지로 내보낼 수 있습니다. 예상치 못한 장애에 대비하기 위해서 주기적으로 백업을 수행하도록 설정하는 것을 권장합니다. 백업에 대한 자세한 설명은 [백업 및 복원](backup-and-restore/) 항목을 참고합니다.

### 기본 알림

DB 인스턴스 생성 시 기본 알림을 설정할 수 있습니다. 기본 알림을 설정하면 `{DB 인스턴스 이름}-default` 이름으로 새로운 알림 그룹이 생성되며 아래 알림 항목들이 자동으로 설정됩니다. 기본 알림으로 생성된 알림 그룹은 자유롭게 수정, 삭제할 수 있습니다. 알림 그룹에 대한 자세한 설명은 [알림 그룹](notification/) 항목을 참고합니다.

| 항목                         | 비교 방법 | 임겟값           | 지속 시간 |
|----------------------------|-------|---------------|-------|
| CPU 사용률                    | &gt;= | 80%           | 5분    |
| Storage 남은 사용량             | &lt;= | 5,120MB       | 5분    |
| Database Connection Status | &lt;= | 0             | 0분    |
| Storage 사용량                | &gt;= | 95%           | 5분    |
| 데이터 스토리지 결함                | &lt;= | 0             | 0분    |
| Connection Ratio           | &gt;= | 85%           | 5분    |
| 메모리 사용량                    | &gt;= | 90%           | 5분    |
| Slow Query                 | &gt;= | 60 counts/min | 5분    |

### 삭제 보호

삭제 보호를 활성화하면 실수로 DB 인스턴스가 삭제되지 않도록 보호할 수 있습니다.

## DB 인스턴스 목록

콘솔에서 생성된 DB 인스턴스를 확인할 수 있습니다. DB 인스턴스 그룹 단위로 묶어서 보거나, 개별 DB 인스턴스로 볼 수 있습니다.

![db-instance-list_ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-list_ko.png)

❶ DB 인스턴스 화면 모드를 변경할 수 있습니다.
❷ 버튼을 클릭하여 그룹 안에 속한 DB 인스턴스를 펼치거나 접을 수 있습니다.
❸ 가장 최근 수집된 모니터링 지표를 보여줍니다.
❹ 현재 상태를 볼 수 있습니다.
❺ 진행 중인 작업이 있으면 스피너가 나타납니다.
❻ 검색 조건을 변경할 수 있습니다.

DB 인스턴스의 상태는 아래와 같은 값들로 구성되며, 사용자의 행위와 현재 상태에 따라 변경됩니다.

| 상태                | 설명                                            |
|-------------------|-----------------------------------------------|
| BEFORE_CREATE     | 생성 이전                                         |
| AVAILABLE         | 사용 가능                                         |
| STORAGE_FULL      | 용량 부족                                         |
| FAIL_TO_CREATE    | 생성 실패                                         |
| FAIL_TO_CONNECT   | 연결 실패                                         |
| REPLICATION_STOP  | 복제 중단                                         |
| FAILOVER          | 장애 조치 완료                                      |
| SHUTDOWN          | 중지됨                                           |

변경할 수 있는 검색 조건은 아래와 같습니다.

![db-instance-filter_ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-filter_ko.png)

❶ 파라미터 변경 사항 적용이 필요한 DB 인스턴스를 필터링 조건으로 검색할 수 있습니다.

## DB 인스턴스 상세

DB 인스턴스를 선택하면 상세 정보를 볼 수 있습니다.

![db-instance-detail_ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-detail_ko.png)

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
| mysql-bin.xxxxxx | 5일        | 변경 가능 | `binlog_expire_logs_seconds`                              |

![db-instance-detail-log_ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-detail-log_ko.png)

❶ **로그 보기**를 클릭하면 로그 파일의 내용을 확인할 수 있는 팝업 화면이 나타납니다. 최대 65,535Bytes의 로그를 확인할 수 있습니다.
❷ **가져오기**를 클릭하면 DB 인스턴스의 로그 파일을 다운로드할 수 있도록 요청합니다.
❸ 다운로드가 준비되면 **다운로드** 버튼이 노출됩니다. 클릭하면 로그를 내려받습니다.

> [주의]
> **가져오기**를 클릭하면 약 5분간 로그 파일이 백업 스토리지에 업로드되며 로그 파일의 크기만큼 백업 스토리지 용량이 과금됩니다.
> **다운로드**를 클릭하면 로그 파일의 크기만큼 인터넷 트래픽이 과금됩니다.

❹ 바이너리 로그(binary log)의 경우 2가지 형태로 내려받을 수 있습니다. **가져오기**를 클릭하면 바이너리 로그 형태를 선택할 수 있는 팝업 화면이 나타납니다.

![db-instance-detail-log-bin_ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-detail-log-bin_ko.png)

❺ mysqlbinlog 유틸리티를 이용하여 바이너리 로그(binary log)를 SQL 파일로 변환 후 내려받으려면 선택합니다.

### DB 스키마 & 사용자

DB 인스턴스의 **DB 스키마 & 사용자** 탭에서는 데이터베이스에 생성된 스키마와 사용자를 조회 및 제어할 수 있습니다.

#### DB 스키마 생성

![db-instance-detail-schema_ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-detail-schema_ko.png)

❶ **생성**을 클릭하면 DB 스키마의 이름을 입력할 수 있는 팝업 창이 나타납니다.
❷ DB 스키마 이름을 입력한 뒤 **확인**을 클릭하여 DB 스키마를 생성할 수 있습니다.

DB 스키마 이름은 아래와 같은 제약 사항이 있습니다.

* 1~64자 사이의 알파벳, 숫자, _만 사용할 수 있으며, 첫 번째 글자는 영문자만 사용할 수 있습니다.
* `information_schema`, `performance_schema`, `db_helper`, `sys`, `mysql`, `rds_maintenance`는 DB 스키마 이름으로 사용할 수 없습니다.

생성된 DB 스키마의 이름은 수정할 수 없습니다.

#### DB 스키마 삭제

![db-instance-detail-schema-delete-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-detail-schema-delete-ko.png)

❶ 삭제할 DB 스키마를 선택 후 드롭다운 메뉴를 클릭합니다.
❷ **삭제** 메뉴를 클릭하면 삭제 확인 팝업 화면이 나타납니다. **확인**을 클릭하여 삭제를 요청할 수 있습니다.

#### 사용자 생성

![db-instance-detail-user-create-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-detail-user-create-ko.png)

❶ **+ 생성**을 클릭하면 사용자 추가 팝업 화면이 나타납니다.
❷ 사용자 ID를 입력합니다.

사용자 ID는 아래와 같은 제약 사항이 있습니다.

* 1~32자 사이의 글자이어야 합니다.
* `mysql.session`, `mysql.sys`, `mysql.infoschema`, `sqlgw`, `admin`, `etladm`, `alertman`, `prom`, `rds_admin`, `rds_mha`, `rds_repl`은 사용자 ID로 사용할 수 없습니다.

❸ Password를 입력합니다.
❹ 접속을 허용할 Host IP를 입력합니다. `%` 문자를 이용하면 허용할 Host IP를 범위로 지정할 수 있습니다. 예를 들어 `1.1.1.%`는 `1.1.1.0`~`1.1.1.255` 사이의 모든 IP를 의미합니다.
❺ 사용자에게 부여할 권한을 선택합니다. 부여할 수 있는 권한과 설명은 다음과 같습니다.

**READ**
* 조회 권한을 가지고 있습니다.

```sql
GRANT SELECT, SHOW VIEW, PROCESS, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO '{user_id}'@'{host}';
GRANT SELECT ON `mysql`.* TO '{user_id}'@'{host}';
GRANT SELECT, EXECUTE ON `sys`.* TO '{user_id}'@'{host}';
GRANT SELECT ON `performance_schema`.* TO '{user_id}'@'{host}';
```

**CRUD**
* READ 권한을 포함하며, 데이터를 변경할 수 있는 권한을 가지고 있습니다.

```sql
GRANT INSERT, UPDATE, DELETE, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE ON *.* TO '{user_id}'@'{host}';
```

**DDL**
* CRUD 권한을 포함하며, DDL 쿼리를 실행할 수 있는 권한을 가지고 있습니다.

```sql
GRANT CREATE, DROP, INDEX, ALTER, CREATE VIEW, REFERENCES, EVENT, ALTER ROUTINE, CREATE ROUTINE, TRIGGER, RELOAD ON *.* TO '{user_id}'@'{host}';
GRANT EXECUTE ON `mysql`.* TO '{user_id}'@'{host}';
```

**CUSTOM**
* 외부 데이터베이스 백업으로부터 DB 인스턴스를 복원한 경우, 데이터베이스에 존재하는 모든 사용자는 CUSTOM 권한으로 표현됩니다.
* CUSTOM 권한 템플릿에는 어떤 권한이 있는지 알 수 없습니다.
* CUSTOM 권한 템플릿에서 다른 권한 템플릿으로 변경한 경우 다시 CUSTOM 권한 템플릿으로 변경할 수 없습니다.


#### 사용자 수정

![db-instance-detail-user-modify-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-detail-user-modify-ko.png)

❶ 수정할 사용자 행의 **수정**을 클릭하면 사용자 정보를 수정할 수 있는 팝업 화면이 나타납니다.
❷ Password를 입력하지 않으면 변경되지 않습니다.
❸ 사용자 인증에 적용할 플러그인을 변경하려면 반드시 Password를 변경해야 합니다.

#### 사용자 삭제

![db-instance-detail-user-delete-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-detail-user-delete-ko.png)

❶ 삭제할 사용자를 선택 후 드롭다운 메뉴를 클릭합니다.
❷ **삭제**를 클릭하면 **삭제 확인** 팝업 화면이 나타납니다. **확인**을 클릭하여 삭제를 요청할 수 있습니다.

## DB 인스턴스 수정

콘솔을 통해 생성된 DB 인스턴스의 다양한 항목을 손쉽게 변경할 수 있습니다. 변경 요청한 항목은 순차적으로 DB 인스턴스에 적용합니다. 적용 과정에서 재시작이 필요할 경우 모든 변경을 적용한 후 DB 인스턴스를 재시작합니다. 변경 불가능한 항목과 재시작이 필요한 항목은 다음과 같습니다.

| 항목           | 변경 가능 여부 | 재시작 필요 여부               |
|--------------|----------|-------------------------|
| 가용성 영역       | 아니오      |                         |
| DB 엔진        | 예        | 예                       |
| DB 인스턴스 타입   | 예        | 예                       |
| 데이터 스토리지 종류  | 아니오      |                         |
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
| 자동 스토리지 확장   | 예        | 아니오                     |
| 스키마 & 사용자 제어 | 예        | 아니오                     |

고가용성 DB 인스턴스의 경우 재시작이 필요한 항목의 변경이 있으면 안정성을 높이고 순단 시간을 줄이기 위하여 장애 조치를 이용한 재시작 기능을 제공합니다.

![modify-ha-popup-ko](https://static.toastoven.net/prod_rds/mariadb/24.11.12/modify-ha-popup-ko.png)

장애 조치를 이용한 재시작을 사용하지 않으면 마스터와 예비 마스터에 변경 사항을 순차적으로 적용한 후 DB 인스턴스를 재시작합니다. 자세한 사항은 고가용성 DB 인스턴스의 [수동 장애 조치 항목](db-instance/#manual-failover)을 참고합니다.

### DB 스키마 & 사용자 직접 제어

RDS for MariaDB에서는 DB 스키마와 사용자를 손쉽게 관리할 수 있도록 콘솔에서 관리 기능을 제공하지만, 사용자가 직접 제어할 수 있도록 설정하는 기능도 제공하고 있습니다. 직접 제어를 사용하면 현재 생성되어 있는 모든 유저에게 아래 권한을 부여합니다.

```sql
GRANT CREATE,DROP,LOCK TABLES,REFERENCES,EVENT,ALTER,INDEX,INSERT,SELECT,UPDATE,DELETE,CREATE VIEW,SHOW VIEW,CREATE ROUTINE,ALTER ROUTINE,EXECUTE,CREATE USER,PROCESS,RELOAD,REPLICATION SLAVE,REPLICATION CLIENT,SHOW DATABASES, CREATE TEMPORARY TABLES,TRIGGER ON *.* TO '{user_id}'@'{host}' WITH GRANT OPTION;
```

> [주의]
> 직접 제어 사용 이후 다시 사용 안 함으로 변경하면
> * 기존에 부여했던 권한들을 회수하지 않습니다. 이때 명령어를 사용해 DB 스키마나 사용자를 추가한다면 콘솔의 데이터와 정합성이 맞지 않을 수 있습니다.
> * 사용자에게 부여된 권한과 상관없이 데이터베이스에 존재하는 모든 사용자는 CUSTOM 권한으로 표현됩니다.


## DB 인스턴스 삭제

더 이상 사용하지 않는 DB 인스턴스는 삭제할 수 있습니다. 마스터를 삭제하면 해당 복제 그룹에 속한 예비 마스터와 읽기 복제본도 모두 함께 삭제됩니다. 삭제된 DB 인스턴스는 복구할 수 없으므로 중요한 DB 인스턴스는 삭제 보호 설정을 활성화하는 것을 권장합니다.

## 백업

장애 상황에 대비하여 DB 인스턴스의 데이터베이스를 복구할 수 있도록 미리 준비할 수 있습니다. 필요할 때마다 콘솔에서 백업을 수행하거나, 주기적으로 백업이 수행되도록 설정할 수 있습니다. 자세한 사항은 [백업](backup-and-restore/#overview) 항목을 참고합니다.

## 복원

백업을 이용하여 원하는 시점으로 데이터를 복원할 수 있습니다. 복원 시 항상 새로운 DB 인스턴스가 생성되며, 기존 DB 인스턴스에 복원할 수 없습니다. 자세한 사항은 [복원](backup-and-restore/#restore) 항목을 참고합니다.

## 용량 확보

급격한 부하로 바이너리 로그(binary log)가 과도하게 생성되어 데이터 스토리지의 용량이 부족할 경우 콘솔의 용량 확보 기능을 이용해 바이너리 로그를 삭제할 수 있습니다. 콘솔에서 용량 확보를 선택하면 DB 인스턴스의 바이너리 로그를 선택할 수 있는 팝업 화면이 표시됩니다. 바이너리 로그를 선택한 뒤 **확인**을 눌러 선택한 항목 이전에 생성된 모든 바이너리 로그를 삭제합니다. 용량 확보 기능은 일시적으로 용량을 확보하는 기능입니다. 계속해서 용량이 부족하다면 서비스 부하에 맞게 바이너리 로그의 저장 기간을 설정하거나 데이터 스토리지의 크기를 확장해야 합니다.

> [참고]
> `binlog_expire_logs_seconds` 파라미터로 바이너리 로그(binary log)의 저장 기간을 설정할 수 있습니다.

> [주의]
> 삭제된 바이너리 로그(binary log)에 따라 특정 시점으로 복원되지 않을 수 있습니다.

## 스토리지 크기 확장

DB 인스턴스의 데이터 스토리지 크기를 확장할 수 있습니다. 확장 시 DB 인스턴스의 재시작 과정 없이 즉시 적용됩니다.

## 자동 스토리지 확장

DB 인스턴스의 데이터 스토리지 크기를 자동으로 확장할 수 있습니다. 자동 스토리지 확장을 사용하면 데이터 스토리지의 용량이 부족할 때 자동으로 확장하여 데이터베이스의 가용성을 유지할 수 있습니다.

자동 스토리지 확장을 사용하려면 DB 인스턴스 생성 및 수정 시 **자동 스토리지 확장**을 활성화해야 합니다. 

자동 스토리지 확장을 활성화하면 세 가지 옵션을 설정할 수 있습니다.
* 스토리지 자동 확장 조건: 스토리지 사용률이 설정한 값 이상으로 5분 이상 지속될 때 자동으로 스토리지를 확장합니다.
* 스토리지 자동 확장 최대값: 스토리지 자동 확장으로 확장될 수 있는 최대 크기입니다.
* 스토리지 자동 확장 쿨다운: 스토리지 자동 확장 기능이 한번 실행된 후, 다시 기능이 활성화되기까지의 시간을 설정합니다.

자동 스토리지 확장 기능이 실행될 때의 증가량은 다음 값들 중 가장 큰 값으로 설정됩니다.
* 10GB
* 스토리지 크기의 10%
* 직전 한시간의 데이터 스토리지 사용량 증가분 * 쿨다운(시간으로 환산)

## 파라미터 그룹 변경 사항 적용

DB 인스턴스에 연결된 파라미터 그룹의 설정이 변경되어도 이 변경 사항은 DB 인스턴스에 자동으로 적용되지 않습니다. 만약 DB 인스턴스에 적용된 파라미터와 연결된 파라미터 그룹의 설정이 서로 다를 경우 콘솔에 **파라미터** 버튼이 표시됩니다.

다음 방법 중 하나를 사용하여 DB 인스턴스에 파라미터 그룹의 변경 사항을 적용할 수 있습니다.

![db-instance-list-parameter-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-list-parameter-ko.png)

❶ 대상 DB 인스턴스의 **파라미터**를 클릭하거나
❷ 대상 DB 인스턴스를 선택한 후 드롭다운 메뉴에서 **파라미터 그룹 변경 사항 적용** 메뉴를 클릭하거나
❸ 대상 DB 인스턴스의 **기본 정보** 탭에서 **파라미터 그룹 변경 사항 적용**을 클릭합니다.

파라미터 그룹에서 재시작을 필요로 하는 파라미터가 변경된 경우, 변경 사항을 적용하는 과정에서 DB 인스턴스가 재시작됩니다.

고가용성 DB 인스턴스의 경우 안정성을 높이고 순단 시간을 줄이기 위하여 장애 조치를 이용한 재시작 기능을 제공합니다.

![db-instance-parameter-ha-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-parameter-ha-ko.png)

장애 조치를 이용한 재시작을 사용하지 않으면 마스터와 예비 마스터에 변경 사항을 순차적으로 적용한 후 DB 인스턴스를 재시작합니다. 자세한 사항은 고가용성 DB 인스턴스의 [수동 장애 조치 항목](db-instance/#manual-failover)을 참고합니다.

## 오브젝트 스토리지에 있는 백업으로 복원

외부 MariaDB 백업 파일을 NHN Cloud의 사용자 오브젝트 스토리지에 업로드하여 RDS for MariaDB의 DB 인스턴스로 복원할 수 있습니다. 자세한 사항은 [외부 MariaDB 백업을 이용한 복원](backup-and-restore/#restore-from-external) 항목을 참고합니다.

## 백업 후 오브젝트 스토리지로 백업 파일 내보내기

백업 후 백업 파일을 사용자 오브젝트 스토리지로 내보낼 수 있습니다. 자세한 사항은 [백업 내보내기](backup-and-restore/#export) 항목을 참고합니다.

## 읽기 복제본

읽기 성능을 높이기 위해서 읽기 전용으로 사용할 수 있는 읽기 복제본을 생성할 수 있습니다. 읽기 복제본은 하나의 마스터에 대해서 최대 5대까지 생성할 수 있습니다. 읽기 복제본의 읽기 복제본은 생성할 수 없습니다.

### 읽기 복제본 생성

읽기 복제본을 생성하려면 복제 그룹에 속한 DB 인스턴스 중 테이블 잠금 사용 옵션으로 생성된 백업 파일 및 바이너리 로그(binary log)가 필요합니다. 백업 파일이 없는 경우 다음 순서에 따라 백업을 수행할 DB 인스턴스를 선택합니다.

❶ 자동 백업 설정한 읽기 복제본
❷ 자동 백업 설정한 예비 마스터
❸ 자동 백업 설정한 마스터

조건에 맞는 DB 인스턴스가 없을 경우 읽기 복제본 생성 요청은 실패합니다.

> [주의]
> 마스터의 데이터베이스 크기에 비례하여 읽기 복제본 생성 시간이 늘어날 수 있습니다.
> 백업이 수행되는 DB 인스턴스의 경우 읽기 복제본 생성 과정에서 스토리지 I/O 성능 하락이 있을 수 있습니다.

> [참고]
> 읽기 복제본 생성 과정에 필요한 바이너리 로그(binary log) 크기만큼 백업 스토리지 과금이 발생할 수 있습니다.

읽기 복제본을 생성하려면 콘솔에서

![db-instance-replica-create-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-replica-create-ko.png)

❶ 원본 DB 인스턴스를 선택한 뒤 **읽기 복제본 생성**을 클릭하면

아래 설정들을 통하여 읽기 복제본을 생성할 수 있습니다.

#### 변경 불가 항목

읽기 복제본을 생성할 때 아래 나열된 항목들은 원본 DB 인스턴스의 설정을 따르기 때문에 변경할 수 없습니다.

* DB 엔진
* 데이터 스토리지 종류
* 사용자 VPC 서브넷

#### 읽기 복제본 리전

읽기 복제본을 생성할 리전을 선택할 때 리전 피어링을 지원하는 경우 서로 다른 리전에 존재하는 VPC 간 리전 피어링을 연결하면 다른 리전 VPC에 속한 서브넷에 읽기 복제본을 생성할 수 있습니다. 단, 원본 DB 인스턴스의 리전과 다른 리전을 선택하면 복제 지연이 발생할 수 있으며, DB 버전 업그레이드를 지원하지 않습니다.

> [주의]
> 리전 피어링이 연결되어 있더라도 라우트 설정이 올바르지 않을 경우 읽기 복제본 생성에 실패하거나 복제가 중단될 수 있습니다.

#### 가용성 영역

읽기 복제본의 가용성 영역을 선택합니다. 자세한 설명은 [가용성 영역](#_1) 항목을 참고합니다.

#### DB 인스턴스 타입

읽기 복제본은 마스터와 동일한 사양 또는 더 높은 사양으로 만드는 것을 권장합니다. 낮은 사양으로 생성 시 복제 지연이 발생할 수 있습니다.

#### 데이터 스토리지 크기

원본 DB 인스턴스와 동일한 크기로 만드는 것을 권장합니다. 크기를 작게 설정할 경우, 데이터 스토리지 용량 부족으로 복제 과정이 중단될 수 있습니다.

#### 플로팅 IP

읽기 복제본의 플로팅 IP 사용 여부를 선택합니다. 자세한 설명은 [플로팅 IP](#ip) 항목을 참고합니다.

#### 파라미터 그룹

읽기 복제본의 파라미터 그룹을 선택할 때 복제 관련 설정 변경이 필요 없다면 원본 DB 인스턴스와 동일한 파라미터 그룹을 선택하는 것을 권장합니다. 파라미터 그룹에 대한 자세한 설명은 [파라미터 그룹](parameter-group/) 항목을 참고합니다.

#### DB 보안 그룹

읽기 복제본에 적용할 DB 보안 그룹을 선택합니다. 복제에 필요한 규칙은 자동으로 적용되기 때문에 DB 보안 그룹에 별도로 복제 관련 규칙을 추가할 필요가 없습니다. DB 보안 그룹에 대한 자세한 설명은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.

#### 백업

읽기 복제본의 백업 설정을 선택합니다. 백업에 대한 자세한 설명은 [백업 및 복원](backup-and-restore/) 항목을 참고합니다.

#### 기본 알림

기본 알림 사용 여부를 선택합니다. 자세한 설명은 [기본 알림](#_7) 항목을 참고합니다.

#### 삭제 보호

삭제 보호 사용 여부를 선택합니다. 자세한 설명은 [삭제 보호](#_8) 항목을 참고합니다.

### 읽기 복제본 승격

마스터와의 복제 관계를 해제하고 읽기 복제본을 독립된 마스터로 전환하는 과정을 승격이라고 합니다. 승격된 마스터는 독립된 DB 인스턴스로서 작동하게 됩니다. 승격을 원하는 읽기 복제본과 마스터 사이에 복제 지연이 존재하는 경우 해당 지연이 해결될 때까지 승격이 이루어지지 않습니다. 한 번 승격된 DB 인스턴스는 이전의 복제 관계로 되돌릴 수 없습니다.

> [주의]
> 마스터 DB 인스턴스의 상태가 비정상일 경우에는 승격 작업을 진행할 수 없습니다.

> [참고]
> 읽기 복제본이 위치한 리전과 동일한 리전의 콘솔을 통해 승격 작업을 수행할 수 있습니다.

### 읽기 복제본 강제 승격

마스터나 원본 리전의 상태와 관계없이 읽기 복제본의 현재 시점 데이터를 기반으로 강제 승격을 진행합니다. 복제 지연이 있는 경우 데이터 유실이 발생할 수 있습니다. 따라서 읽기 복제본을 긴급하게 서비스에 투입해야 하는 상황이 아니라면 이 기능의 사용은 권장하지 않습니다.

### 읽기 복제본의 복제 중단

읽기 복제본은 여러 이유로 복제가 중단될 수 있습니다. 읽기 복제본의 상태가 `복제 중단`인 경우 빠르게 원인을 확인하여 정상화해야 합니다. `복제 중단` 상태가 장시간 지속될 경우 복제 딜레이가 늘어나게 됩니다. 정상화에 필요한 바이너리 로그(binary log)가 없는 경우 읽기 복제본을 재구축해야 합니다. 복제가 중단된 원인은 읽기 복제본에서 `SHOW SLAVE STATUS` 명령어를 통해 확인할 수 있습니다. `Last_Errno` 값이 1062인 경우 아래 Procedure를 오류가 사라질 때까지 호출할 수 있습니다.

```
mariadb> CALL mysql.tcrds_repl_skip_repl_error();
```

### 읽기 복제본의 재구축

읽기 복제본의 복제 문제를 해결할 수 없는 경우 재구축을 통해 정상 상태로 복원할 수 있습니다. 이 과정에서 읽기 복제본의 모든 데이터베이스를 삭제하고, 마스터 데이터베이스를 기반으로 새롭게 재구축합니다. 재구축하는 동안 읽기 복제본은 사용할 수 없습니다. 읽기 복제본을 재구축하려면 복제 그룹에 속한 DB 인스턴스 중 테이블 잠금 사용 옵션으로 생성된 백업 파일 및 바이너리 로그(binary log)가 필요합니다. 백업 파일이 없는 경우 동작 및 주의 사항은 [읽기 복제본 생성](#_22) 항목을 참고합니다.

> [참고]
> 재구축 후에도 접속 정보(도메인, IP)는 변경되지 않습니다.

## DB 인스턴스 재시작

MariaDB을 재시작하거나 고가용성 DB 인스턴스를 수동으로 장애 조치하고자 할 때, DB 인스턴스를 재시작할 수 있습니다. 재시작 시간을 최소화하기 위해 서비스 부하가 낮은 시간대에 수행하는 것이 좋습니다. 고가용성 DB 인스턴스의 경우 장애 조치를 이용한 재시작을 사용하지 않을 경우 예비 마스터를 먼저 재시작한 뒤 마스터를 재시작합니다. 장애 조치 기능을 이용한 재시작의 경우 [수동 장애 조치](#_42) 항목을 참고합니다.

DB 인스턴스 재시작을 하려면 콘솔에서

![db-instance-restart-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-restart-ko.png)

❶ 재시작을 원하는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **DB 인스턴스 재시작** 메뉴를 클릭합니다.

## DB 인스턴스 강제 재시작

DB 인스턴스의 MariaDB이 정상 동작하지 않는 경우 강제로 재시작할 수 있습니다. 강제 재시작의 경우 MariaDB에 SIGTERM 명령을 내려 정상 종료되기를 10분간 기다립니다. 10분 안에 MariaDB이 정상 종료되면 이후 가상 머신을 재부팅합니다. 10분 안에 정상 종료되지 않으면 가상 머신을 강제로 재부팅합니다. 가상 머신이 강제로 재부팅되면 작업 중인 일부 트랜잭션이 유실될 수 있으며, 데이터 볼륨이 손상되어 복구가 불가능해질 수 있습니다. 강제 재시작 이후 DB 인스턴스의 상태가 사용 가능 상태로 돌아오지 않을 수 있습니다. 해당 상황 발생 시 고객 센터로 문의하십시오.

> [주의]
> 데이터가 유실되거나 데이터 볼륨이 손상될 가능성이 있으므로 해당 기능은 긴급하고 불가피한 상황 이외에는 사용을 지양해야 합니다.

> [참고]
> 고가용성 DB 인스턴스의 경우 강제 재시작할 수 없습니다.

DB 인스턴스 강제 재시작을 하려면 콘솔에서

![db-instance-restart-force-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-restart-force-ko.png)

❶ 강제 재시작을 원하는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **DB 인스턴스 강제 재시작** 메뉴를 클릭합니다.

## 삭제 보호 설정 변경

삭제 보호를 활성화하면 실수로 DB 인스턴스가 삭제되지 않도록 보호할 수 있습니다. 삭제 보호를 비활성화할 때까지 해당 DB 인스턴스를 삭제할 수 없습니다. 삭제 보호 설정을 변경하려면

![db-instance-deletion-protection-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-deletion-protection-ko.png)

❶ 삭제 보호 설정을 변경하려는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **삭제 보호 설정 변경** 메뉴를 클릭하면 팝업 창이 나타납니다.

![deletion-protection-popup-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/deletion-protection-popup-ko.png)

❷ 삭제 보호 설정을 변경한 후 **확인**을 클릭합니다.


<a id="ha-db-instance"></a>
## 고가용성 DB 인스턴스

고가용성 DB 인스턴스는 가용성과 데이터 내구성을 증가시키고, 장애 허용이 가능한 데이터베이스를 제공합니다. 고가용성 DB 인스턴스는 마스터, 예비 마스터로 구성되며 서로 다른 가용성 영역에 생성됩니다. 예비 마스터는 장애에 대비한 DB 인스턴스로 평소에는 사용할 수 없습니다. 고가용성 DB 인스턴스의 경우 예비 마스터에서 백업이 수행됩니다.

> [참고]
> 고가용성 DB 인스턴스의 경우, MariaDB 쿼리문을 사용해 다른 DB 인스턴스 또는 외부 MariaDB의 Master로부터 강제로 복제하도록 설정하면 고가용성 및 일부 기능들이 정상적으로 동작하지 않습니다.

### 장애 감지

예비 마스터에는 장애를 감지하기 위한 프로세스가 존재하여 주기적으로 마스터의 상태를 감지합니다. 이러한 감지 주기를 Ping 간격이라고 하며 4회 연속 상태 체크에 실패할 경우 장애 조치를 수행합니다. Ping 간격이 짧을수록 장애에 민감하게 반응하며, Ping 간격이 길수록 장애에 둔감하게 반응합니다. 서비스 부하에 맞게 적절한 Ping 간격을 설정하는 것이 중요합니다.

> [참고]
> 마스터의 데이터 스토리지 사용량이 가득 차면 고가용성 감시 프로세스가 장애로 감지해 장애 조치를 수행하므로 주의하십시오.

### 자동 장애 조치

예비 마스터에서 마스터의 상태 체크에 4회 연속 실패할 경우 마스터가 서비스를 제공하지 못한다고 판단하여 자동으로 장애 조치를 수행합니다. 스플릿 브레인 방지를 위해 장애가 발생한 마스터에 할당된 모든 사용자 보안 그룹의 연결을 해제하여 외부의 접속을 차단하며, 예비 마스터가 마스터의 역할을 대신합니다. 접속을 위한 내부 도메인의 A record는 장애가 발생한 마스터에서 예비 마스터로 변경되므로, 응용 프로그램의 변경은 필요하지 않습니다. 장애 조치가 완료되면 장애가 발생한 마스터의 종류는 장애 조치된 마스터로, 예비 마스터의 종류는 마스터로 변경됩니다. 장애 조치된 마스터를 복구하거나 재구축하기 전까지 장애 조치가 수행되지 않습니다. 승격된 마스터는 장애 조치된 마스터의 모든 자동 백업을 승계합니다. 장애 조치 과정에서 마스터가 변경되면 바이너리 로그가 모두 삭제되므로 기존 백업을 이용한 시점 복원은 지원하지 않습니다. 승격된 마스터에서 신규로 백업이 수행된 시각부터 시점 복원을
할 수 있습니다.

> [참고]
> 고가용성 기능은 도메인을 기반으로 하고 있기 때문에 접속을 시도하는 클라이언트가 DNS 서버에 접속할 수 없는 네트워크 환경일 경우 도메인을 통해 DB 인스턴스에 접속할 수 없고, 장애 조치 발생 시 정상적인 접속이 불가능합니다.
> 내부 도메인의 A record 변경이 반영되는 데 약 3초 정도 소요됩니다. 소요 시간은 접속을 시도하는 클라이언트 환경의 DNS Cache 정책에 따라 달라질 수 있습니다.

> [주의]
> 마스터와 예비 마스터 간의 바이너리 로그(binary log)의 position number 값이 100,000,000 이상 차이가 날 경우 장애 조치가 되지 않습니다.
> `replicate-ignore-db` 혹은 `replicate-ignore-table` 이 적용된 경우, 해당 DB 혹은 테이블의 변경 사항은 복제되지 않으므로 장애 조치에 실패할 수 있습니다.


### 장애 조치된 마스터

장애가 발생하여 장애 조치가 된 마스터를 장애 조치된 마스터라고 합니다. 장애 조치된 마스터의 자동 백업은 수행되지 않으며, 장애 조치된 마스터 복구, 재구축, 분리, 삭제를 제외한 다른 모든 기능은 수행할 수 없습니다.

### 장애 조치된 마스터 복구

장애 조치 과정에서 데이터의 정합성이 깨지지 않았고, 장애가 발생한 시점부터 복구를 시도하는 시점까지 바이너리 로그(binary log)가 유실되지 않았다면 장애 조치된 마스터와 승격된 마스터를 다시 고가용성 구성으로 복구할 수 있습니다. 장애 조치된 마스터의 데이터베이스 그대로 승격된 마스터와 복제 관계를 다시 설정하므로 데이터의 정합성이 깨졌거나 복구에 필요한 바이너리 로그(binary log)가 유실되었다면 복구는 실패합니다. 장애 조치된 마스터 복구에 실패할 경우 재구축을 통해 다시 고가용성 기능을 활성화할 수 있습니다.

> [참고]
> 2023년 4월 11일 이전에 장애 조치가 발생한 DB 인스턴스의 경우 복구를 지원하지 않습니다.

장애 조치된 마스터를 복구하려면 콘솔에서

![db-instance-failover-repair-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-failover-repair-ko.png)

❶ 복구를 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 복구** 메뉴를 클릭합니다.

### 장애 조치된 마스터 재구축

장애 조치된 마스터 복구에 실패할 경우 재구축을 이용해 다시 고가용성 기능을 활성화할 수 있습니다. 재구축은 복구와 달리 장애 조치된 마스터의 데이터베이스를 모두 제거하고, 승격된 마스터의 데이터베이스를 토대로 재구축합니다. 장애 조치된 마스터를 재구축하려면 복제 그룹에 속한 DB 인스턴스 중 테이블 잠금 사용 옵션으로 생성된 백업 파일 및 바이너리 로그(binary log)가 필요합니다. 백업 파일이 없는 경우 다음 순서에 따라 백업을 수행할 DB 인스턴스를 선택합니다.

❶ 자동 백업 설정한 읽기 복제본
❷ 자동 백업 설정한 마스터

조건에 맞는 DB 인스턴스가 없을 경우 장애 조치된 마스터 재구축 요청은 실패합니다.

> [주의]
> 마스터의 데이터베이스 크기에 비례하여 장애 조치된 마스터 재구축 시간이 늘어날 수 있습니다.
> 백업이 수행되는 DB 인스턴스의 경우 장애 조치된 마스터 재구축 과정에서 스토리지 I/O 성능 하락이 있을 수 있습니다.

> [참고]
> 장애 조치된 마스터 재구축 과정에 필요한 바이너리 로그(binary log) 크기만큼 백업 스토리지 과금이 발생할 수 있습니다.

장애 조치된 마스터를 재구축하려면 콘솔에서

![db-instance-failover-rebuild-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-failover-rebuild-ko.png)

❶ 재구축을 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 재구축** 메뉴를 클릭합니다.

### 장애 조치된 마스터 분리

장애 조치된 마스터 복구에 실패하여 데이터 보정이 필요할 경우 장애 조치된 마스터를 분리하여 고가용성 기능을 비활성화할 수 있습니다. 분리된 마스터와 승격된 마스터 간의 복제 관계가 끊어지며 각각 일반 DB 인스턴스로 동작합니다. 분리된 이후에는 다시 원래 구성으로 복구가 불가능합니다.

장애 조치된 마스터를 분리하려면 콘솔에서

![db-instance-failover-split-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-failover-split-ko.png)

❶ 분리를 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 분리** 메뉴를 클릭합니다.

<a id="manual-failover"></a>
### 수동 장애 조치

고가용성 DB 인스턴스의 경우 재시작이 동반되는 작업을 수행하면 장애 조치를 이용한 재시작 여부를 선택할 수 있으며, 해당 작업은 아래와 같습니다.

* DB 인스턴스 재시작
* 재시작이 필요한 항목의 변경
* 재시작이 필요한 파라미터의 변경을 적용
* 하이퍼바이저 점검을 위한 DB 인스턴스 마이그레이션

장애 조치를 이용한 재시작을 하게 되면 예비 마스터를 먼저 재시작합니다. 이후 장애 조치를 통해 예비 마스터를 마스터로 승격시키고 기존 마스터는 예비 마스터 역할을 하게 됩니다. 승격 시, 접속을 위한 내부 도메인의 A record는 마스터에서 예비 마스터로 변경되므로, 응용 프로그램의 변경은 필요하지 않습니다. 승격된 마스터는 이전 마스터의 모든 자동 백업을 승계합니다. 장애 조치 과정에서 마스터가 변경되며 바이너리 로그(binary log)가 모두 삭제되기 때문에 기존 백업을 이용한 시점 복원은 지원하지 않습니다. 승격된 마스터에서 신규로 백업이 수행된 시각부터 시점 복원을 할 수 있습니다.

> [참고]
> 고가용성 기능은 도메인을 기반으로 하고 있기 때문에 접속을 시도하는 클라이언트가 DNS 서버에 접속할 수 없는 네트워크 환경일 경우 도메인을 통해 DB 인스턴스에 접속할 수 없고, 장애 조치 발생 시 정상적인 접속이 불가능합니다.
> 내부 도메인의 A record 변경이 반영되는 데 약 3초 정도 소요됩니다. 소요 시간은 접속을 시도하는 클라이언트 환경의 DNS Cache 정책에 따라 달라질 수 있습니다.

> [주의]
> 예비 마스터와 복제 그룹에 포함된 읽기 복제본의 Seconds_Behind_Master 값이 1 이상일 경우 복제 지연이 발생한 것으로 간주하며, 이때 수동 장애 조치는 실패합니다. 부하가 적은 시간에 수동 장애 조치를 진행하는 것이 좋습니다. 복제 지연으로 인한 재시작 실패는 이벤트 화면을 통해 확인할 수 있습니다.

장애 조치를 이용한 재시작 시 다음의 항목을 추가로 선택하여 안정성을 높일 수 있습니다.

#### 현재 시점 백업 진행

장애 조치 과정에서 바이너리 로그(binary log)가 모두 삭제되기 때문에 장애 조치를 이용한 재시작이 완료된 후 곧바로 수동 백업을 진행할 수 있습니다.

#### 장애 조치 수동 제어

예비 마스터에 변경 사항을 먼저 적용한 뒤 그 추이를 관찰하거나, 정확한 시간에 장애 조치를 실행하고자 할 때 콘솔에서 장애 조치 시점을 직접 제어할 수 있습니다. 장애 조치 수동 제어를 선택하면 예비 마스터가 재시작된 후 ❶ 콘솔에 **장애 조치** 버튼이 표시됩니다. 이 버튼을 클릭하면 장애 조치가 실행되며, 최대 5일간 실행을 대기할 수 있습니다. 5일 이내에 장애 조치를 실행하지 않을 경우 해당 작업은 자동으로 취소됩니다.

![db-instance-ha-wait-manual-failover-ko](https://static.toastoven.net/prod_rds/mariadb/24.03.12/db-instance-ha-wait-manual-failover-ko.png)

> [주의]
> 장애 조치를 대기하는 동안에는 자동 장애 조치가 되지 않습니다.

#### 복제 지연 해소 대기

복제 지연 해소 대기 옵션을 활성화하면 예비 마스터와 복제 그룹에 포함된 읽기 복제본의 복제 지연이 사라질 때까지 대기할 수 있습니다.

#### 쓰기 부하 차단

복제 지연을 해소하는 동안 쓰기 부하를 추가로 차단하는 선택이 가능합니다. 쓰기 부하를 차단하면 장애 조치를 수행하기 바로 전에 마스터가 읽기 전용 모드로 전환되어 모든 변경 쿼리가 실패하도록 설정됩니다.

### 고가용성 일시 중지

일시적인 작업으로 인한 연결 중단 또는 대량의 부하가 예상되는 상황에서 일시적으로 고가용성 기능을 중지할 수 있습니다. 고가용성 기능이 일시 중지되면 장애를 감지하지 않으므로 장애 조치를 수행하지 않습니다. 고가용성 기능이 일시 중지된 상태에서 재시작이 필요한 작업을 수행해도 일시 중지된 고가용성 기능이 재개되지 않습니다. 고가용성 기능이 일시 중지되어도 데이터 복제는 정상적으로 이루어지거나, 장애가 감지되지 않기 때문에 장시간 일시 중지 상태로 유지하는 것을 권장하지 않습니다.

### 예비 마스터 재구축

네트워크의 단절, 잘못된 FEDERATED 엔진 사용, 다른 마스터로부터의 복제 설정과 같은 다양한 원인으로 예비 마스터 복제가 중단될 수 있습니다. 복제 중단 상태의 예비 마스터는 자동 장애 조치가 실행되지 않습니다. 예비 마스터의 복제 중단을 해결하려면 예비 마스터를 재구축해야 합니다. 예비 마스터 재구축 시에는 예비 마스터의 데이터베이스를 모두 제거하며, 마스터의 데이터베이스를 토대로 재구축합니다. 이 과정에서 재구축에 필요한 백업 파일이 마스터 데이터베이스에 존재하지 않을 경우 마스터에서 백업이 수행되며, 백업으로 인한 성능 저하가 발생할 수 있습니다.

## MariaDB Procedure

RDS for MariaDB은 사용자의 편의를 제공하기 위하여 사용자 계정에서 제한되는 몇몇 기능들을 수행하는 프로시저들을 자체적으로 제공하고 있습니다.

### tcrds_active_process

* Processlist에서 Sleep 상태가 아닌 ACTIVE 상태의 쿼리를 조회합니다.
* 수행 시간이 오래된 순서로 출력되며 쿼리 내용(SQL)은 100자리까지만 출력됩니다.

```
mariadb> CALL mysql.tcrds_active_process();
```

### tcrds_process_kill

* 특정 프로세스를 강제 종료합니다.
* 종료할 프로세스 아이디는 information_schema.processlist에서 확인할 수 있으며 tcrds_active_process와 tcrds_current_lock 프로시저를 이용해서 프로세스의 정보를 확인할 수 있습니다.

```
mariadb> CALL mysql.tcrds_process_kill(processlist_id );
```

### tcrds_current_lock

* 현재 락을 기다리고 있는 프로세스와 락을 점유하고 있는 프로세스 정보를 확인합니다.
* (w) 칼럼 정보가 락을 획득하기 위해 대기하는 프로세스 정보
* (B) 칼럼 정보가 락을 점유하고 있는 프로세스 정보
* 락을 점유하는 프로세스를 강제로 종료하려면 (B)PROCESS 칼럼을 확인한 후, call tcrds_process_kill(process_id)를 수행합니다.

```
mariadb> CALL mysql.tcrds_current_lock();
```

### tcrds_repl_changemaster

* 복제를 이용해 외부 MariaDB DB를 NHN Cloud RDS로 가져올 때 사용합니다.
* NHN Cloud RDS의 복제 구성은 콘솔의 **복제본 생성**으로 할 수 있습니다.

```
mariadb> CALL mysql.tcrds_repl_changemaster (master_instance_ip, master_instance_port, user_id_for_replication, password_for_replication_user, MASTER_LOG_FILE, MASTER_LOG_POS);
```

* 파라미터 설명
  * master_instance_ip: 복제 대상(Master) 서버의 IP
  * master_instance_port: 복제 대상(Master) 서버의 MariaDB 포트
  * user_id_for_replication: 복제 대상(Master) 서버의 MariaDB에 접속할 복제용 계정
  * password_for_replication_user: 복제용 계정 패스워드
  * MASTER_LOG_FILE: 복제 대상(Master)의 binary log 파일명
  * MASTER_LOG_POS: 복제 대상(Master)의 binary log 포지션

```
ex) call mysql.tcrds_repl_changemaster('10.162.1.1',10000,'db_repl','password','mysql-bin.000001',4);
```

> [주의] 복제용 계정이 복제 대상(Master) MariaDB에 생성되어 있어야 합니다.

### tcrds_repl_init

* MariaDB 복제 정보를 초기화합니다.

```
mariadb> CALL mysql.tcrds_repl_init();
```

### tcrds_repl_slave_stop

* MariaDB 복제를 멈춥니다.

```
mariadb> CALL mysql.tcrds_repl_slave_stop();
```

### tcrds_repl_slave_start

* MariaDB 복제를 시작합니다.

```
mariadb> CALL mysql.tcrds_repl_slave_start();

```

### tcrds_repl_skip_repl_error

* SQL_SLAVE_SKIP_COUNTER=1를 수행합니다. 다음과 같은 Duplicate key 오류 발생 시 tcrds_repl_skip_repl_error 프로시저를 실행하면 복제 오류를 해결할 수 있습니다.
* `MariaDB error code 1062: 'Duplicate entry ? for key ?'`

```
mariadb> CALL mysql.tcrds_repl_skip_repl_error();
```

### tcrds_repl_next_changemaster

* Master의 다음 바이너리(binary log) 로그를 읽을 수 있도록 복제 정보를 변경합니다.
* 다음과 같은 복제 오류 발생 시 tcrds_repl_next_changemaster 프로시저를 실행하면 복제 오류를 해결할 수 있습니다.

예) MariaDB error code 1236 (ER_MASTER_FATAL_ERROR_READING_BINLOG): Got fatal error from master when reading data from binary log

```
mariadb> CALL mysql.tcrds_repl_next_changemaster();
```

### tcrds_innodb_monitor_reset

* information_schema.INNODB_METRICS 테이블의 counter를 0으로 재설정하는 innodb_monitor_reset variables를 실행하는 프로시저입니다.
* `SET GLOBAL innodb_monitor_reset = '{counter-name|module_name|pattern|all}';` 쿼리를 실행합니다.
* innodb_monitor_enable, innodb_monitor_disable는 RDS 파라미터로 제공합니다.

```
mariadb> CALL mysql.tcrds_innodb_monitor_reset('{counter-name|module_name|pattern|all}');
```

```
ex) CALL mysql.tcrds_innodb_monitor_reset('dml_reads');
CALL mysql.tcrds_innodb_monitor_reset('module_dml');
```

### tcrds_innodb_monitor_reset_all

* counter 값을 재설정하는 innodb_monitor_reset_all variables를 실행하는 프로시저입니다.
* innodb_monitor_reset_all을 사용하려면 counter가 disable 상태여야 합니다.
* `SET GLOBAL innodb_monitor_reset_all = '{counter-name|module_name|pattern|all}';` 쿼리를 실행합니다.

```
mariadb> CALL mysql.tcrds_innodb_monitor_reset_all('{counter-name|module_name|pattern|all}');
```

### tcrds_foreign_key_checks
* foreign key 제약 조건을 체크하는 'foreign_key_checks' 변수를 제어하는 프로시저입니다.
* `SET GLOBAL foreign_key_checks ='ON|OFF';` 쿼리를 실행합니다.

```
mariadb> CALL mysql.tcrds_foreign_key_checks('{0|1|'OFF'|'ON'}');
```

## 데이터 마이그레이션

* RDS는 mysqldump를 이용하여 NHN Cloud RDS의 외부로 데이터로 내보내거나 외부로부터 가져올 수 있습니다.
* mysqldump 유틸리티는 MariaDB을 설치했을 때 기본으로 제공됩니다.

### mysqldump를 이용하여 내보내기

* NHN Cloud RDS의 인스턴스를 준비하여 사용합니다.
* 내보낼 데이터를 저장하게 될 외부 인스턴스, 또는 로컬 클라이언트가 설치된 컴퓨터의 용량이 충분히 확보되어 있는지 확인합니다.
* NHN Cloud의 외부로 데이터를 내보내야 할 경우 Floating IP를 생성하여 데이터를 내보낼 RDS 인스턴스에 연결합니다.
* 아래의 mysqldump 명령어를 통하여 외부로 데이터를 내보냅니다.

#### 파일로 내보낼 경우

```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

#### NHN Cloud RDS 외부의 MariaDB DB로 내보낼 경우

```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port}
```

### mysqldump를 이용하여 가져오기

* 데이터를 가져올 NHN Cloud RDS 외부의 DB를 준비합니다.
* 가져올 NHN Cloud RDS 인스턴스의 용량이 충분한지 확인합니다.
* Floating IP를 생성하여 NHN Cloud RDS 인스턴스에 연결합니다.
* 아래의 mysqldump 명령어를 통하여 외부로부터 데이터를 가져옵니다.

```
mysqldump -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} --single-transaction --set-gtid-purged=off --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port}
```

#### 데이터 가져오는 도중 `ERROR 1227` 오류가 발생할 경우

* `ERROR 1227` 오류는 mysqldump 파일의 저장된 객체(트리거, 뷰, 함수 또는 이벤트)에 DEFINER 정의가 되어 있을 때 발생합니다. 이를 해결하기 위해서는 mysqldump 파일에서 `DEFINER`부분을 삭제 후 진행합니다.

#### 데이터 가져오는 도중 `ERROR 1418` 오류가 발생할 경우

* `ERROR 1418` 오류는 mysqldump 파일의 함수 선언에 NO SQL, READS SQL DATA, DETERMINISTIC이 없으며 바이너리 로그가 활성화된 상태일 때 발생합니다.
  * 자세한 설명은 [The Binary Log](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html) 문서를 참고합니다.
* 이를 해결하기 위해서는 mysqldump 파일을 적용할 DB 인스턴스의 `log_bin_trust_function_creators` 파라미터의 값을 `1`로 변경해야 합니다.

### 복제를 이용하여 내보내기

* 복제를 이용하여 NHN Cloud RDS의 데이터를 외부의 DB로 내보낼 수 있습니다.
* 외부의 DB 버전은 NHN Cloud RDS의 버전과 같거나 그보다 최신 버전이어야합니다.
* 데이터를 내보낼 NHN Cloud RDS Master 또는 Read Only Slave 인스턴스를 준비합니다.
* Floating IP를 생성하여 데이터를 내보낼 NHN Cloud RDS 인스턴스들에 연결합니다.
* 아래의 명령어를 통해 NHN Cloud RDS 인스턴스로부터 데이터를 파일로 내보냅니다.
* Master RDS 인스턴스로부터 내보낼 경우

```
mysqldump -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* Read Only Slave RDS 인스턴스로부터 내보낼 경우

```
mysqldump -h{rds_read_only_slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* 백업된 파일을 열어 주석에 쓰여진 MASTER_LOG_FILE 및 MASTER_LOG_POS를 따로 기록합니다.
* NHN Cloud RDS 인스턴스로부터 데이터를 백업할 외부 로컬 클라이언트 또는 DB가 설치된 컴퓨터의 용량이 충분한지 확인합니다.
* 외부 DB의 my.cnf(Windows의 경우 my.ini) 파일에 아래와 같은 옵션을 추가합니다.
* server-id의 경우 NHN Cloud RDS 인스턴스의 파라미터 항목의 server-id와 다른 값으로 입력합니다.

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* 외부 DB를 재시작합니다.
* 백업된 파일을 아래의 명령어를 통해 외부의 DB에 입력합니다.

```
mysql -h{external_db_host} -u{exteranl_db_id} -p{external_db_password} --port={exteranl_db_port} < {local_path_and_file_name}
```

* NHN Cloud RDS 인스턴스에서 복제에 사용할 계정을 생성합니다.
* 새롭게 복제를 설정하기에 앞서 혹시 존재할 수도 있는 기존 복제 정보를 초기화하기 위하여 아래의 쿼리를 실행합니다. 이 때, RESET SLAVE를 실행할 경우 기존 복제 정보가 초기화됩니다.

```
STOP SLAVE;

RESET SLAVE;
```

* 복제에 사용할 계정 정보와 아까 따로 기록해 두었던 MASTER_LOG_FILE과 MASTER_LOG_POS를 이용하여 외부 DB에 아래와 같이 쿼리를 실행합니다.

```
CHANGE MASTER TO master_host = '{rds_master_instance_floating_ip}', master_user='{user_id_for_replication}', master_password='{password_forreplication_user}', master_port ={rds_master_instance_port}, master_log_file ='{MASTER_LOG_FILE}', master_log_pos = {MASTER_LOG_POS};

START SLAVE;
```

* 외부 DB와 NHN Cloud RDS 인스턴스의 원본 데이터가 같아지면 외부 DB에 STOP SLAVE 명령을 이용해 복제를 종료합니다.

### 복제를 이용하여 가져오기

* 복제를 이용해 외부 DB를 NHN Cloud RDS로 가져올 수 있습니다.
* NHN Cloud RDS 버전은 외부 DB 버전과 같거나 그보다 최신 버전이어야 합니다.
* 데이터를 내보낼 외부 MariaDB 인스턴스에 연결합니다.
* 아래의 명령어를 통해 외부 MariaDB 인스턴스로부터 데이터를 백업합니다.
* 외부 MariaDB 인스턴스(마스터)로부터 가져올 경우

```
mysqldump -h{master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* 외부 MariaDB 인스턴스(슬레이브)로부터 가져올 경우

```
mysqldump -h{slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* 백업된 파일을 열어 주석의 MASTER_LOG_FILE 및 MASTER_LOG_POS를 따로 기록합니다.
* NHN Cloud RDS 인스턴스로부터 데이터를 백업할 클라이언트나 컴퓨터의 용량이 충분한지 확인합니다.
* 외부 DB의 my.cnf(Winodws의 경우 my.ini) 파일에 아래 옵션을 추가합니다.
* server-id의 경우 NHN Cloud RDS 인스턴스의 파라미터 항목의 server-id와 다른 값으로 입력합니다.

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* 외부 DB를 재시작합니다.
* 외부 네트워크를 통해 가져오면(import) 오래 걸릴 수 있기 때문에, 내부 NHN Cloud Image를 생성하고 백업 파일을 복사한 후, NHN Cloud로 가져오기를 권장합니다.
* 백업된 파일을 아래의 명령어로 NHN Cloud RDS에 입력합니다.
* 복제 구성은 DNS를 지원하지 않으므로 IP로 변환해 실행합니다.

```
mysql -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} < {local_path_and_file_name}
```

* 외부 MariaDB 인스턴스에서 복제에 사용할 계정을 생성합니다.

```
mariadb> CREATE USER 'user_id_for_replication'@'{external_db_host}' IDENTIFIED BY '<password_forreplication_user>';
mariadb> GRANT REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'user_id_for_replication'@'{external_db_host}';
```

* 복제에 사용할 계정 정보와 앞에서 따로 기록해 두었던 MASTER_LOG_FILE, MASTER_LOG_POS를 이용하여 NHN Cloud RDS에 다음과 같이 쿼리를 실행합니다.

```
mariadb> call mysql.tcrds_repl_changemaster ('rds_master_instance_floating_ip',rds_master_instance_port,'user_id_for_replication','password_forreplication_user','MASTER_LOG_FILE',MASTER_LOG_POS );
```

* 복제를 시작하려면 아래 프로시저를 실행합니다.

```
mariadb> call mysql.tcrds_repl_slave_start;
```

* 외부 DB와 NHN Cloud RDS 인스턴스의 원본 데이터가 같아지면 아래 명령을 이용해 복제를 종료합니다.

```
mariadb> call mysql.tcrds_repl_init();
```

## 부록

### 부록1. 하이퍼바이저 점검을 위한 DB 인스턴스 마이그레이션 가이드

NHN Cloud는 주기적으로 DB 인스턴스의 하이퍼바이저 소프트웨어를 업데이트하여 보안과 안정성을 향상시키고 있습니다.
점검 대상 하이퍼바이저에서 구동 중인 DB 인스턴스는 마이그레이션을 통해 점검이 완료된 하이퍼바이저로 이동해야 합니다.

DB 인스턴스 마이그레이션은 NHN Cloud 콘솔에서 시작할 수 있습니다.
DB 구성에 따라 특정 DB 인스턴스를 선택하여 마이그레이션 시, 연관된 DB 인스턴스(예를 들면 Slave 인스턴스)도 점검 대상이면 같이 마이그레이션을 진행합니다.
아래 가이드에 따라 콘솔에 있는 마이그레이션 기능을 이용하십시오.
점검 대상으로 지정된 DB 인스턴스가 있는 프로젝트로 이동합니다.

#### 1. 점검 대상 DB 인스턴스를 확인합니다.

이름 옆에 마이그레이션 버튼이 있는 DB 인스턴스가 점검 대상 인스턴스입니다.

![rds_planed_migration_0](https://static.toastoven.net/prod_rds/mariadb/planned_migration_alarm/image0_kr.png)

마이그레이션 버튼 위에 마우스 포인터를 올리면 자세한 점검 일정을 확인할 수 있습니다.

![rds_planed_migration_1](https://static.toastoven.net/prod_rds/mariadb/planned_migration_alarm/image1_kr.png)

#### 2. 점검 대상 DB 인스턴스에 접속 중인 응용 프로그램을 종료해야 합니다.

DB에 연결된 서비스에 영향을 주지 않도록 적절한 조치를 취하십시오.
서비스에 영향을 줄 수밖에 없을 때는 NHN Cloud 고객 센터로 연락해 주시면 적합한 조치를 안내해 드리겠습니다.

#### 3. 점검 대상 DB 인스턴스를 선택하고 마이그레이션 버튼을 클릭한 후 DB 인스턴스 마이그레이션 확인을 묻는 창이 나타나면 확인 버튼을 클릭합니다.

![rds_planed_migration_2](https://static.toastoven.net/prod_rds/mariadb/planned_migration_alarm/image2_kr.png)

#### 4. DB 인스턴스 마이그레이션이 끝날 때까지 대기합니다.

DB 인스턴스 상태가 변경되지 않는다면 '새로 고침'하십시오.

![rds_planed_migration_3](https://static.toastoven.net/prod_rds/mariadb/planned_migration_alarm/image3_kr.png)

DB 인스턴스가 마이그레이션되는 동안에는 아무런 조작을 할 수 없습니다.
DB 인스턴스 마이그레이션이 정상적으로 완료되지 않으면 자동으로 관리자에게 보고되며, NHN Cloud에서 별도로 연락을 드립니다.

### 부록2. RDS를 이용하여 Federated Storage Engine 사용 시 구성 가이드

Federated Storage Engine을 사용하는 경우 다음을 고려해야 합니다.

#### 로컬 노드로써 RDS를 이용하는 구성의 경우

* 리모트 노드로의 송신을 허용하는 설정이 필요합니다.
  * DB 보안 그룹에서 규칙을 추가할 수 있습니다.
  * 자세한 사항은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.
* 만약 로컬 노드 역할의 RDS에 Read Only Slave를 추가한 구성으로 사용할 경우 파라미터의 replicate-ignore-table에 federated 설정된 테이블을 명시해야 합니다.
  * Read Only Slave를 구성할 경우 federated 테이블 또한 복제되어 Master와 Read Only Slave가 리모트 노드를 함께 바라보게 됩니다.
  * 이 경우 Master에 수행한 데이터 입력이 federated 설정에 따라 리모트 노드에도 수행되고, Read Only Slave에서도 마찬가지로 동일한 입력이 수행되어 중복 키 오류 등으로 인한 복제 중단이 발생할 수 있습니다.
  * Read Only Slave가 federated 테이블은 복제하지 않도록 replicate-ignore-table에 설정이 필요합니다.

#### 리모트 노드로써 RDS를 이용하는 구성의 경우

* 로컬 노드에서의 수신을 허용하는 설정이 필요합니다.
  * DB 보안 그룹에서 규칙을 추가할 수 있습니다.
  * 자세한 사항은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.