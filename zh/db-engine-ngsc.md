## Database > RDS for MySQL > DB Engine

## DB Engine
For MySQL, the version number consists of version = X.Y.Z. In NHN Cloud RDS terminology, X.Y represents the major version and Z represents the minor version number.


### DB engine version provided by RDS

The versions specified below are available.

| Version           | Note                                                        |
|--------------|-----------------------------------------------------------|
| <strong>8.0</strong> ||
| MySQL 8.0.34 |                                                           | 
| MySQL 8.0.33 |                                                           |
| MySQL 8.0.32 |                                                           | 
| MySQL 8.0.28 |                                                           | 
| MySQL 8.0.23 |                                                           |
| MySQL 8.0.18 |                                                           |
| <strong>5.7</strong> ||
| MySQL 5.7.37 |                                                           |
| MySQL 5.7.33 | You cannot restore a DB instance from an external backup.                   |
| MySQL 5.7.26 |                                                           |
| MySQL 5.7.19 |                                                           |
| MySQL 5.7.15 |                                                           |
| <strong>5.6</strong> ||
| MySQL 5.6.33 | A new DB instance cannot be created. Only supports creating and restoring read replicas of existing DB instances. |

In MySQL, the version number consists of version = `X.Y.Z.` In NHN Cloud's RDS for MySQL, `X.Y` represents the major version and `Z` represents the minor version.

### Manage DB Engine Version
After creating the DB instance, you can change the DB engine version along with modifying the DB instance.

> [Caution]
When attempting to change the DB version, only upgrade is supported, downgrade is not supported.

When upgrading the DB engine version, if only the major version number is changed, it is considered a major version upgrade, and if only the minor version number is changed, it is considered a minor version upgrade.
When attempting to upgrade the DB engine major version, you can upgrade to the next major version of the DB engine.

#### Pre-inspection for upgrading from MySQL 5.7 to MySQL 8.0

MySQL 8.0 and MySQL 5.7 contain a number of incompatibilities. So if you are doing a major version DB engine upgrade from `5.7` to version `8.0` you may run into issues. Therefore, a pre-inspection process is required for some items that are expected to cause problems. The following items require prior inspection.

- There must be no version upgrade disqualifications via `mysqlcheck`.
- When checked through `INFORMATION_SCHEMA.VIEWS`, the column name must not exceed 64 characters.
- There must not be a table with the same name as the table used in the data dictionary.
- There must be no tables or stored procedures with individual ENUM, SET column elements that exceed 255 characters or 1020 bytes in length.
- There must be no tables with foreign key constraint names longer than 64 characters.
- If you want to change the `lower_case_table_names` setting to 1, make sure the schema names are lower case.
- If you want to change the `lower_case_table_names` setting to 1, make sure the table names are lower case.
- There must be no partition table extracted through a specific partition check.
- No table partitions must reside in shared tablespaces, including the InnoDB system tablespace and regular tablespaces.

DB 버전 업그레이드 사전 점검에 대해서는 다음과 같은 방법으로 결과 확인이 가능합니다.
- `5.7에서 8.0으로 업그레이드 하기 위한 체크리스트 세부사항`(https://static.toastoven.net/prod_rds/23.08.17/Check_5.7_to_8.0_en.xlsx)을 활용한 직접 확인
- 콘솔에서 DB 버전 업그레이드 시도 시 `DB 엔진 업그레이드 사전 확인` 버튼을 이용한 결과 확인
- DB 버전 업그레이드 시도를 통한 결과 확인

콘솔에서 `DB 엔진 업그레이드 사전 확인`을 통한 결과 및 DB 버전 업그레이드 시도를 통한 결과의 경우 개별 DB 인스턴스의 로그 탭에 생성된 `db_version_upgrade_compatibility.log`를 통해 세부 내역 확인이 가능합니다. 세부 내역 항목은 각각 다음의 의미를 가집니다.
- `CHECK_BY_MYSQL_CHECK` : Must not include disqualifications for version upgrades via `mysqlcheck`.
- `COLUMN_LENGHT_LIMIT_CHECK` : The column name must not exceed 64 characters when checked through `INFORMATION_SCHEMA.VIEWS`.
- `DUPLICATE_NAME_WITH_DATA_DICT` : Must not include a table with the same name as the tables used in the data dictionary.
- `ENUM_SET_SIZE_CHECK` : Must not include tables or stored procedures with individual ENUM, SET column elements that exceed 255 characters or 1020 bytes.
- `FOREIGN_KEY_LENGTH_LIMIT_CHECK` : Must not include tables with foreign key length longer than 64 characters.
- `LOWER_CASE_SCHEMAS_NAMES_CHECK` : If you want to change the `lower_case_table_names` setting to 1, make sure the schema names are lower case.
- `LOWER_CASE_TABLE_NAMES_CHECK` : If you want to change the `lower_case_table_names` setting to 1, make sure the table names are lower case.
- `PARTITION_TABLE_CHECK` : Must not include partition tables extracted through a specific partition check.
- `PROPERTY_LENGTH_LIMIT_CHECK` : Must not include table partitions that reside in shared tablespaces including the InnoDB system tablespace and regular tablespaces.
Also, you must check items that have been removed or changed in 8.0.
- [Changes in SQL](https://dev.mysql.com/doc/refman/8.0/en/upgrading-from-previous-series.html#upgrade-sql-changes)
- [Features Removed in MySQL8.0](https://dev.mysql.com/doc/refman/8.0/en/mysql-nutshell.html#mysql-nutshell-removals)



#### Upgrading the DB Engine Version Using a Dummy DB Instance

When trying to change the DB engine version in the Modify DB Instance window, you can select whether to use a dummy DB instance to ensure high availability during the version upgrade process. If you choose to use a dummy DB instance, a candidate master for DB version upgrade is created.

> [Caution]
For dummy DB instances, a temporary candidate master is created during the upgrade process, so this option is only available for non-high availability configurations.


## MySQL을 위한 옵션

### MySQL을 위한 MariaDB 서버 감사 플러그인 지원

- RDS for MySQL에서는 MariaDB 감사 플러그인을 사용하여 MySQL DB 인스턴스용 감사 플러그인을 제공합니다. 

> [주의]
> 일부 MySQL 버전에서는 지원하지 않을 수 있으며, 지원하지 않는 버전으로의 버전 업그레이드 진행 시 해당 플러그인을 사용할 수 없습니다.

#### 지원 버전
| MySQL 버전 | 서버 감사 플러그인 지원 여부 |
| --- | --- |
| <strong>8.0</strong> ||
| MySQL 8.0.34 |O| 
| MySQL 8.0.33 |O| 
| MySQL 8.0.32 |O| 
| MySQL 8.0.28 |O| 
| MySQL 8.0.23 |O|
| MySQL 8.0.18 |O|
| <strong>5.7</strong> ||
| MySQL 5.7.37 |X|
| MySQL 5.7.33 |O|
| MySQL 5.7.26 |O|
| MySQL 5.7.19 |O|
| MySQL 5.7.15 |X|
| <strong>MySQL 5.6</strong> ||
| MySQL 5.6.33 |O|
