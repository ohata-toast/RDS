## Database > RDS for {{engine.pascalCase}} > DB Engine

{{#if (eq engine.lowerCase "mysql")}}
## DB Engine

In MySQL, the version number consists of version = `X.Y.Z` In NHN Cloud's RDS for MySQL, `X.Y` represents the major version and `Z` represents the minor version.

### DB engine version provided by RDS

The versions specified below are available. New DB instance creation and read replicas are supported only for the top 7 minor versions per major version.
Support for MySQL versions below 8.0.34 has ended in accordance with the MySQL LTS policy. We recommend upgrading your DB instances to the latest version.

- Note: [https://blogs.oracle.com/mysql/introducing-mysql-innovation-and-longterm-support-lts-versions](https://blogs.oracle.com/mysql/introducing-mysql-innovation-and-longterm-support-lts-versions)

| Version              | Note                                                      |
|----------------------|-----------------------------------------------------------|
| <strong>8.4</strong> |                                                           |
| MySQL 8.4.7          |                                                           |
| MySQL 8.4.6          |                                                           |
| MySQL 8.4.5          |                                                           |
| <strong>8.0</strong> |                                                           |
| MySQL 8.0.44         |                                                           |
| MySQL 8.0.43         |                                                           |
| MySQL 8.0.42         |                                                           |
| MySQL 8.0.41         |                                                           |
| MySQL 8.0.40         |                                                           |
| MySQL 8.0.36         |                                                           |
| MySQL 8.0.35         | Creation and read replicas unsupported                    |
| MySQL 8.0.34         | Creation and read replicas unsupported                    | 
| MySQL 8.0.33         | Creation and read replicas unsupported                    | 
| MySQL 8.0.32         | Creation and read replicas unsupported                    | 
| MySQL 8.0.28         | Creation and read replicas unsupported                    | 
| MySQL 8.0.23         | Creation and read replicas unsupported                    |
| MySQL 8.0.18         | Creation and read replicas unsupported                    |
| <strong>5.7</strong> |                                                           |
| MySQL 5.7.37         |                                                           |
| MySQL 5.7.33         | You cannot restore a DB instance from an external backup. |
{{#if (eq env "public")}}
| MySQL 5.7.26         |                                                           |
| MySQL 5.7.19         |                                                           |
| MySQL 5.7.15         |                                                           |
| <strong>5.6</strong> |                                                           |
| MySQL 5.6.33         | This version is no longer supported.                      |
{{/if}}

### Manage DB Engine Version
After creating the DB instance, you can change the DB engine version and modify the DB instance.

> [Caution]
> When attempting to change the DB version, only an upgrade is supported. A downgrade is not supported.

When upgrading the database engine version, a major version upgrade occurs if only the major version number is changed, and a minor version upgrade occurs if only the minor version number is changed.
When attempting to upgrade the DB engine major version, you can upgrade to the next major version of the DB engine.

#### Pre-inspection for upgrading from MySQL 5.7 to MySQL 8.0

MySQL 8.0 and MySQL 5.7 contain a number of incompatibilities. So if you are doing a major version DB engine upgrade from `5.7` to version `8.0`, you may run into issues. Therefore, a pre-inspection process is required for some items that are expected to cause problems. The following items require prior inspection.

- There must be no version upgrade disqualifications via `mysqlcheck`.
- When checked through `INFORMATION_SCHEMA.VIEWS`, the column name must not exceed 64 characters.
- There must not be a table with the same name as the table used in the data dictionary.
- There must be no tables or stored procedures with individual ENUM, SET column elements that exceed 255 characters or 1020 bytes in length.
- There must be no tables with foreign key constraint names longer than 64 characters.
- If you want to change the `lower_case_table_names` setting to 1, make sure the schema names are lower case.
- If you want to change the `lower_case_table_names` setting to 1, make sure the table names are lower case.
- There must be no partition table extracted through a specific partition check.
- No table partitions must reside in shared tablespaces, including the InnoDB system tablespace and regular tablespaces.

For DB version upgrade pre-check, you can check the result in the following ways.
- Check for `the detailed checklist for upgrading from 5.7 to 8.0`({{url.cdn}}/23.08.17/Check_5.7_to_8.0_en.xlsx)
- When attempting to upgrade the DB version in the console, check the result using the `DB Engine Upgrade Pre-Check` button.
- Check the results of DB version upgrade attempts

For the results of `DB Engine upgrade pre-check`in the console and the results of DB version upgrade attempts, you can check the details through `db_version_upgrade_compatibility.log`generated on the Log tab of each DB instance. The detailed history items have the following meanings, respectively.
- `CHECK_BY_MYSQL_CHECK`:  There must be no version upgrade disqualifications via `mysqlcheck`.
- `COLUMN_LENGHT_LIMIT_CHECK`: When checked through INFORMATION_SCHEMA.VIEWS, the column name must not exceed 64 characters.
- `DUPLICATE_NAME_WITH_DATA_DICT`: No table should have the same name as a table used in the data dictionary.
- `ENUM_SET_SIZE_CHECK`: There must be no tables or stored procedures with individual ENUM, SET column elements that exceed 255 characters or 1020 bytes in length.
- `FOREIGN_KEY_LENGTH_LIMIT_CHECK`: No table should have a foreign key constraint name longer than 64 characters.
- `LOWER_CASE_SCHEMAS_NAMES_CHECK`: If you want to change the lower_case_table_names setting to 1, make sure the schema names are lower case.
- `LOWER_CASE_TABLE_NAMES_CHECK`: If you want to change the lower_case_table_names setting to 1, make sure the table names are lower case.
- `PARTITION_TABLE_CHECK`: There must be no partition table extracted through a specific partition check.
- `PROPERTY_LENGTH_LIMIT_CHECK`: No table partitions must reside in shared tablespaces, including the InnoDB system tablespace and regular tablespaces.

Also, you must check items that have been removed or changed in 8.0.
- [Changes in SQL](https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-sql-changes)
- [Features Removed in MySQL 8.0](https://dev.mysql.com/doc/refman/8.0/en/mysql-nutshell.html#mysql-nutshell-removals)


#### Pre-check for Upgrading MySQL 8.0 to MySQL 8.4

To upgrade to MySQL 8.4, you must have already upgraded to MySQL 8.0. When upgrading a major version of the DB engine from `8.0` to `8.4`, a pre-check process is required for some items that are expected to cause problems.

You can check the items detected by the upgrade checker through `DB Engine Upgrade Pre-Check` in the console, and any items detected as errors must be addressed. For more details, please refer to the MySQL homepage.
- [Upgrade Checker Guide](https://dev.mysql.com/doc/mysql-shell/8.4/en/mysql-shell-utilities-upgrade.html#mysql-utilities-upgrade-checks)

Also, you must check what has been removed or changed in 8.4.
- [Guide to Incompatible Changes](https://dev.mysql.com/doc/refman/8.4/en/upgrading-from-previous-series.html#upgrade-incompatible-changes)
- [Guide to Features Removed in 8.4](https://dev.mysql.com/doc/refman/8.4/en/mysql-nutshell.html#mysql-nutshell-removals)

#### MySQL Version Upgrade Constraints

Direct upgrade from version 8.0.18 to MySQL 8.4 is not supported.
The following conditions must be met to upgrade from 8.0.18 to 8.4:

Upgrade Path
1.	First, upgrade to MySQL 8.0.23 or higher
2.	Then, upgrade to MySQL 8.4

This is because the minimum compatible version required by MySQL 8.4 is 8.0.23 or higher, and compatibility of metadata and internal schema structure is not guaranteed in environments lower than that version.

#### Upgrading the DB Engine Version Using a Dummy DB Instance 

When trying to change the DB engine version in the Modify DB Instance window, you can select whether to use a dummy DB instance to ensure high availability during the version upgrade process. If you choose to use a dummy DB instance, a candidate master for DB version upgrade is created. 

> [Caution]
> For dummy DB instances, a temporary candidate master is created during the upgrade process, so this option is only available for non-high-availability configurations.

#### Manual Control of Failover When Upgrading High Availability DB Instances

When a DB instance is configured for high availability, the engine version of the candidate master is upgraded first, and then failover is used to promote the candidate master to master. Because failover briefly interrupts the service on the master, you can initiate failover at any time.
The manual control of failover during version upgrade allows you to initiate failover directly from the console.

> [Caution]
> If manual control of failover is not triggered for more than 60 hours, the upgrade operation is automatically cancelled.

### When using an Outdated Operating System

For DB instances created before May 10, 2022, the DB instance will be replaced when the internal operating system is outdated so the DB version is upgraded. During the replacement process, the DB instance's identifier and internal IP address will be changed. The monitored instances in notification groups and event sources in event subscriptions are automatically replaced with the changed identifiers. For a single DB instance, you must use a dummy DB instance when changing DB versions. For high-availability DB instances, the roles of the master and spare master are changed using failover during the DB instance replacement process. Failover may fail if the master is heavily loaded, so it is recommended that you perform DB version change during off-peak hours.  

> [Caution]
> Be careful when using the internal IP of an existing DB instance directly in an IP ACL or security group.

## Options for MySQL

### Support for the MariaDB Server Audit plugin for MySQL

- RDS for MySQL uses the MariaDB Audit plug-in to provide an auditing plug-in for MySQL DB instances. 

> [Caution]
> This plugin may not be supported by all versions of MySQL and will be unavailable when upgrading to an unsupported version.

#### Supported Versions
| MySQL version        | Whether to support server audit plugins |
|----------------------|-----------------------------------------|
| <strong>8.4</strong> |                                         |
| MySQL 8.4.7          | O                                       |
| MySQL 8.4.6          | O                                       |
| MySQL 8.4.5          | O                                       |
| <strong>8.0</strong> |                                         |
| MySQL 8.0.44         | O                                       |
| MySQL 8.0.43         | O                                       |
| MySQL 8.0.42         | O                                       |
| MySQL 8.0.41         | O                                       |
| MySQL 8.0.40         | O                                       |
| MySQL 8.0.36         | O                                       |
| MySQL 8.0.35         | O                                       |
| MySQL 8.0.34         | O                                       | 
| MySQL 8.0.33         | O                                       | 
| MySQL 8.0.32         | O                                       | 
| MySQL 8.0.28         | O                                       | 
| MySQL 8.0.23         | O                                       |
| MySQL 8.0.18         | X                                       |
| <strong>5.7</strong> |                                         |
| MySQL 5.7.37         | X                                       |
| MySQL 5.7.33         | O                                       |
| MySQL 5.7.26         | O                                       |
| MySQL 5.7.19         | O                                       |
| MySQL 5.7.15         | X                                       |
| <strong>MySQL 5.6</strong> |                                         |
| MySQL 5.6.33         | O                                       |
{{/if}}

{{#if (eq engine.lowerCase "mariadb")}}
## DB 엔진

MariaDB에서 버전 번호는 버전 = `X.Y.Z`로 구성됩니다. NHN Cloud의 RDS for MariaDB에서는 `X.Y`의 경우 메이저 버전을, `Z`는 마이너 버전을 나타냅니다.

### RDS에서 제공하는 DB 엔진 버전

아래에 명시된 버전을 사용할 수 있습니다. 신규 DB 인스턴스 생성 및 읽기 복제본 추가는 메이저 버전당 상위 7개 마이너 버전까지만 지원합니다.

| 버전                     | 비고 |
|------------------------|----|
| <strong>11.8</strong>  |    |
| MariaDB 11.8.6         |    |
| <strong>11.4</strong>  |    |
| MariaDB 11.4.10        |    |
| MariaDB 11.4.7         |    |
| <strong>10.11</strong> |    |
| MariaDB 10.11.16       |    |
| MariaDB 10.11.13       |    |
| MariaDB 10.11.8        |    |
| MariaDB 10.11.7        |    |
| <strong>10.6</strong>  |    |
| MariaDB 10.6.25        |    |
| MariaDB 10.6.22        |    |
| MariaDB 10.6.16        |    |
| MariaDB 10.6.12        |    |
| MariaDB 10.6.11        |    |
| <strong>10.3</strong>  |    |
| MariaDB 10.3.30        |    |

### DB 엔진 버전 관리

DB 인스턴스 생성 이후, 해당 DB 인스턴스 수정과 함께 DB 엔진 버전 변경을 진행할 수 있습니다.

> [주의]
> DB 버전 변경 시도 시 업그레이드만 지원하며, 다운그레이드는 지원하지 않습니다.

DB 엔진 버전 업그레이드가 진행될 경우, 메이저 버전 번호만 변경되는 경우는 메이저 버전 업그레이드로, 마이너 버전 번호만 변경되는 경우는 마이너 버전 업그레이드로 간주합니다.
DB 엔진 메이저 버전 업그레이드 시도 시에는 바로 다음의 메이저 버전의 DB 엔진 버전에 대해 업그레이드가 가능합니다.

#### 사전 점검

DB 엔진 메이저 버전 업그레이드를 진행하기 전에, 다음 사항을 사전에 확인하는 것을 권장합니다.

- `mariadb-check --check-upgrade`를 통해 버전에 종속되는 테이블이 없는지 확인합니다. 버전 종속 테이블이 발견되면 `--auto-repair` 옵션으로 자동 업데이트할 수 있습니다.
- 공식 업그레이드 문서를 참고하여 대상 버전의 비호환 변경 사항을 확인합니다.

콘솔에서 DB 버전 업그레이드 시도 시 `DB 엔진 업그레이드 사전 확인` 버튼을 이용하여 사전 점검 결과를 확인할 수 있습니다. 개별 DB 인스턴스의 로그 탭에 생성된 `db_version_upgrade_compatibility.log`를 통해 세부 내역 확인이 가능합니다.

#### MariaDB 11.4에서 MariaDB 11.8로 업그레이드 시 확인 사항

MariaDB 11.8로 업그레이드하려면 먼저 MariaDB 11.4로 업그레이드된 상태여야 합니다. `11.4`에서 `11.8` 버전으로 메이저 버전 업그레이드를 진행하는 경우 아래 사항을 확인해야 합니다.

- **System-Versioned 테이블**: System-Versioned 테이블이 존재하는 경우 업그레이드는 가능하지만, 확장된 타임스탬프 범위로의 업데이트가 필요하여 업그레이드 시간이 길어질 수 있습니다.

자세한 내용은 아래 공식 문서를 참고합니다.
- [MariaDB 11.4에서 11.8로 업그레이드 경로](https://mariadb.com/docs/server/server-management/install-and-upgrade-mariadb/upgrading/mariadb-community-server-upgrade-paths/upgrading-from-mariadb-11-4-to-mariadb-11-8)
- [MariaDB 11.8 릴리스 노트](https://mariadb.com/docs/release-notes/community-server/11.8/what-is-mariadb-118#upgrading)

#### 더미 DB 인스턴스를 사용한 DB 엔진 버전 업그레이드 

DB 인스턴스 수정 화면에서 DB 엔진 버전 변경을 시도할 때 더미 DB 인스턴스 사용 여부를 선택해 버전 업그레이드 과정에서의 고가용성을 가져올 수 있습니다. 더미 DB 인스턴스 사용을 선택하면 DB 버전 업그레이드를 위한 예비 마스터가 생성됩니다. 

> [주의]
> 더미 DB 인스턴스의 경우 업그레이드 과정 중 임시 예비 마스터를 생성하므로, 해당 옵션은 고가용성 구성이 아닌 경우에만 사용할 수 있습니다.

#### 고가용성 DB 인스턴스 업그레이드 시 장애 조치 수동 제어

DB 인스턴스가 고가용성으로 구성되어 있을 때 예비 마스터의 엔진 버전을 먼저 업그레이드한 뒤 장애 조치를 사용하여 예비 마스터를 마스터로 승격시킵니다. 장애 조치는 마스터의 서비스를 잠깐 중단시키기 때문에 사용자가 원하는 시점에 장애 조치를 시작할 수 있습니다.
버전 업그레이드 시 장애 조치 수동 제어 설정을 사용하면 사용자가 콘솔에서 직접 장애 조치를 시작할 수 있습니다.

> [주의]
> 장애 조치 수동 제어는 60시간 이상 트리거 되지 않으면 자동으로 업그레이드 작업이 취소됩니다.
{{/if}}
