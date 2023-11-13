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

For DB version upgrade pre-check, you can check the result in the following ways.
- Check for `the detailed checklist for upgrading from 5.7 to 8.0`
- When attempting to upgrade the DB version in the console, check the result using the `DB Engine Upgrade Pre-Check` button.
- Check the results of DB version upgrade attempts

For the results of `DB Engine upgrade pre-check`in the console and the results of DB version upgrade attempts, you can check the details through `db_version_upgrade_compatibility.log`generated on the Log tab of each DB instance. The detailed history items have the following meanings respectively.
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
- [Features Removed in MySQL8.0](https://dev.mysql.com/doc/refman/8.0/en/mysql-nutshell.html#mysql-nutshell-removals)



#### Upgrading the DB Engine Version Using a Dummy DB Instance

When trying to change the DB engine version in the Modify DB Instance window, you can select whether to use a dummy DB instance to ensure high availability during the version upgrade process. If you choose to use a dummy DB instance, a candidate master for DB version upgrade is created.

> [Caution]
For dummy DB instances, a temporary candidate master is created during the upgrade process, so this option is only available for non-high availability configurations.

### When using an Outdated Operating System

For DB instances created before May 10, 2022, the DB instance will be replaced when the internal operating system is outdated so the DB version is upgraded. During the replacement process, the DB instance's identifier and internal IP address will be changed. The monitored instances in notification groups and event sources in event subscriptions are automatically replaced with the changed identifiers. For a single DB instance, you must use a dummy DB instance when changing DB versions. For high-availability DB instances, the roles of the master and spare master are changed using failover during the DB instance replacement process. Failover may fail if the master is heavily loaded, so it is recommended that you perform DB version change during off-peak hours.

> [Caution]
> Be careful when using the internal IP of an existing DB instance directly in an IP ACL or security group.

## Options for MySQL

### Support for the MariaDB Server Audit plugin for MySQL

- RDS for MySQL uses the MariaDB Audit plug-in to provide an auditing plug-in for MySQL DB instances.

> [Caution]
This plugin may not be supported by all versions of MySQL and will be unavailable when upgrading to an unsupported version.

#### Supported Versions
| MySQL version | Whether to support server audit plugins |
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
| <strong>5.6</strong> ||
| MySQL 5.6.33 |O|
