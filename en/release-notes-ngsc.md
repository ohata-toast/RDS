## Database > RDS for MySQL > Release Notes

## July 25, 2026

### Feature Updates

* Added MySQL 8.0.44, 8.0.45, 8.4.6, 8.4.7, 8.4.8 version
* Improved to record the cause of backup failure due to Lock acquisition failure in the event log.
* Improved to display a warning message related to the password plugin when upgrading to version 8.4.
* Fixed to allow creation of cross-region read replicas in subnets that do not have region peering set up.
* Added maintenance feature
  * Applied various DB instance modifications during your scheduled maintenance duration
* Updated to grant ROLE_ADMIN privileges when the Direct Control for DB Schemas & Users setting is enabled
* Added API v4.0
  * For more information, see [API v4.0 guide](/Database/RDS%20for%20MySQL/en/api-guide-v4.0/) document.
* Added snapshot backup feature
  * Perform backups using Cinder storage snapshots with zero impact on DB performance
* Added security patch feature
  * Security patches for security vulnerabilities (CVEs) discovered in the OS can be performed as maintenance tasks.
  * For more information, refer to the [Security patch](/Database/RDS%20for%20MySQL/ko/db-instance/#security-patch) documentation.
* Added `SELECT` option in addition to the existing `INSERT` option for high availability Ping check method

## November 28, 2025

### Feature Updates

* Added MySQL 8.4 LTS version
* Added MySQL 8.0.41, 8.0.42, 8.0.43 version

### Bug Fixes

* Fixed an issue where the standby master name was displayed with the current name entered when creating a high-availability instance after clicking on an already created high-availability instance.
* Fixed an issue where the name of a read replica added to high-availability could not be modified.
* Fixed an issue where the [Add VIP] drop-down menu was activated when adding a VIP to a DB instance was not possible.
* Fixed an issue where the internal IP would intermittently disappear when DHCP renewal failed.
* Fixed an issue where high-availability would stop functioning if a read replica creation failed on a high-availability instance.
* Fixed an issue where subscription notifications would not work when multiple events subscribed to by the same organization occurred.

## July 17, 2025

### Feature Updates

* Improved to disallow specifying the DB port type in egress rules of DB security groups
* Changed to require entering the name of the candidate master for high-availability DB instances
* Improved to allow DB instance resources to be checked in Resource Watcher
* Fixed billing so that the failover master is charged normally until it is deleted
* Improved to display accurate error messages when failover masters cannot be recovered due to missing binary logs

### Bug Fixes

* Fixed an issue where backup failed when special characters were included in the export path
* Fixed an issue where the user group was not deleted from event subscriptions when the user group was deleted
* Improved to display accurate error messages when deleting duplicate notification groups

## May 13, 2025

### Feature Updates

* Improved to support using VIP (Virtual IP)
    * VIP is now issued for newly created DB instances and is always configured to point to the master DB instance. For existing DB instances, VIPs can be issued manually by clicking the [Add VIP] button in the console
* Improved to allow explicitly disabling High Availability via the console when it is in an abnormal state
* Improved to allow entering decimal values in monitoring settings
* Improved to allow entering Korean characters in user group names
* Improved the change history modal window to check whether to restart when changing parameter groups on DB instances

### Bug Fixes

* Fixed an issue where you could enter invalid values in the event source when creating event subscriptions via the Open API
* Fixed an issue where the status of DB instances was intermittently not updated
* Fixed an issue where an unknown error modal window was sometimes exposed

## February 13, 2025

### Feature Updates

* Added the MySQL 8.0.40 version

### Bug Fixes

* Fixed an issue where deleted notification group information appears on the view DB instance details screen

## January 24, 2025

### New Releases

* Relational Database Service (RDS) provides Relational Database in the cloud environment.
* No complicated configuration is required to enable relational database.
