## Database > RDS for MariaDB > DB Engine

## DB Engine

The version number of MariaDB follows the `X.Y.Z` format. In NHN Cloud's RDS for MariaDB, `X.Y` represents the major version and `Z` represents the minor version.

### DB engine version provided by RDS

The versions specified below are available. New DB instance creation and read replicas are supported only for the top 7 minor versions per major version.

| Version                | Note                                   |
|------------------------|----------------------------------------|
| <strong>11.8</strong>  |                                        |
| MariaDB 11.8.8         |                                        |
| MariaDB 11.8.6         |                                        |
| <strong>11.4</strong>  |                                        |
| MariaDB 11.4.14        |                                        |
| MariaDB 11.4.10        |                                        |
| MariaDB 11.4.7         |                                        |
| <strong>10.11</strong> |                                        |
| MariaDB 10.11.18       |                                        |
| MariaDB 10.11.16       |                                        |
| MariaDB 10.11.13       |                                        |
| MariaDB 10.11.8        |                                        |
| MariaDB 10.11.7        |                                        |
| <strong>10.6</strong>  |                                        |
| MariaDB 10.6.25        | Creation and read replicas unsupported |
| MariaDB 10.6.22        | Creation and read replicas unsupported |
| MariaDB 10.6.16        | Creation and read replicas unsupported |
| MariaDB 10.6.12        | Creation and read replicas unsupported |
| MariaDB 10.6.11        | Creation and read replicas unsupported |
| <strong>10.3</strong>  |                                        |
| MariaDB 10.3.30        | Creation and read replicas unsupported |

### Manage DB Engine Version
After creating the DB instance, you can change the DB engine version and modify the DB instance.

> [Caution]
> When attempting to change the DB version, only an upgrade is supported. A downgrade is not supported.

When upgrading the database engine version, a major version upgrade occurs if only the major version number is changed, and a minor version upgrade occurs if only the minor version number is changed.
When attempting to upgrade the DB engine major version, you can upgrade to the next major version of the DB engine.


#### Pre-Check

Before proceeding with a DB engine major version upgrade, it is recommended to check the following in advance.

- Run `mariadb-check --check-upgrade` to verify that there are no version-dependent tables. If version-dependent tables are found, they can be automatically updated using the `--auto-repair` option.
- Refer to the official upgrade documentation to check for incompatible changes in the target version.

When attempting a DB version upgrade in the console, you can check the pre-check results using the **DB Engine Upgrade Pre-Check** button. Detailed information can also be found in the `db_version_upgrade_compatibility.log` file generated in the Log tab of the individual DB instance.

#### Notes on Upgrading from MariaDB 11.4 to MariaDB 11.8

To upgrade to MariaDB 11.8, the instance must first be upgraded to MariaDB 11.4. When performing a major version upgrade from `11.4` to `11.8`, the following must be checked.

- **System-Versioned tables**: If System-Versioned tables exist, the upgrade is possible, but the upgrade time may be longer due to the need to update to the extended timestamp range.

For more information, refer to the official documentation below:
- [Upgrade path from MariaDB 11.4 to 11.8](https://mariadb.com/docs/server/server-management/install-and-upgrade-mariadb/upgrading/mariadb-community-server-upgrade-paths/upgrading-from-mariadb-11-4-to-mariadb-11-8)
- [MariaDB 11.8 release notes](https://mariadb.com/docs/release-notes/community-server/11.8/what-is-mariadb-118#upgrading)

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

For DB instances with an outdated internal operating system, an operating system version upgrade accompanied by VM replacement is required before upgrading the DB version. Monitored instances in notification groups and event sources in event subscriptions automatically update to the changed identifiers. For single DB instances, it is recommended to use a dummy DB instance when changing the DB version. For high availability DB instances, the roles of the master and standby master are changed using failover during the DB instance replacement process. If the master is under heavy load, failover may fail, so it is recommended to perform DB version changes during periods of low load.

> [Caution]
> Be careful when using the internal IP of an existing DB instance directly in an IP ACL or security group.

