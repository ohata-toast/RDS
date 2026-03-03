## Database > RDS for MySQL > Release Notes

### January 13, 2026

#### Feature Updates

- Added maintenance feature
  - Applied various DB instance modifications during your scheduled maintenance duration
- Updated to grant ROLE_ADMIN privileges when the Direct Control for DB Schemas & Users setting is enabled
- Added MySQL 8.0.44, 8.4.7 version

#### Bug Fixes

- Fixed an issue where the authentication plugin was not selected by default when adding a user on MySQL 8.4 DB instances.

### November 11, 2025

#### Feature Updates

- Added version MySQL 8.4.6
- Improved to record the cause of backup failure due to Lock acquisition failure in the event log.
- Improved to display a warning message related to the password plugin when upgrading to version 8.4.
- Fixed to allow creation of cross-region read replicas in subnets that do not have region peering set up.

#### Bug Fixes

- Fixed an issue where the failover status persisted when failover failed.
- Fixed an issue where DB instances stopped before the July deployment could not be started.
- Fixed an issue where unusable values could be used in server_audit_events.
- Fixed an issue where the latest parameter group would not be applied after selecting multiple DB instances when using a different parameter group for read replicas.
- Fixed an issue where an error notification modal would be displayed when deselecting a master in a group with read replicas in a different region.
- Fixed an issue where unchangeable values would be changed when resetting a parameter group.

### September 09, 2025

#### Feature Updates

- Added MySQL 8.4 LTS version
- Added MySQL 8.0.41, 8.0.42, 8.0.43 version

#### Bug Fixes

- Fixed an issue where the standby master name was displayed with the current name entered when creating a high-availability instance after clicking on an already created high-availability instance.
- Fixed an issue where the name of a read replica added to high-availability could not be modified.
- Fixed an issue where the [Add VIP] drop-down menu was activated when adding a VIP to a DB instance was not possible.
- Fixed an issue where the internal IP would intermittently disappear when DHCP renewal failed.
- Fixed an issue where high-availability would stop functioning if a read replica creation failed on a high-availability instance.
- Fixed an issue where subscription notifications would not work when multiple events subscribed to by the same organization occurred.

### July 15, 2025

#### Added Features and Updates

- Improved to disallow specifying the DB port type in egress rules of DB security groups
- Changed to require entering the name of the candidate master for high-availability DB instances
- Improved to allow DB instance resources to be checked in Resource Watcher
- Fixed billing so that the failover master is charged normally until it is deleted
- Improved to display accurate error messages when failover masters cannot be recovered due to missing binary logs

#### Bug Fixes

- Fixed an issue where backup failed when special characters were included in the export path
- Fixed an issue where the user group was not deleted from event subscriptions when the user group was deleted
- Improved to display accurate error messages when deleting duplicate notification groups

### May 13, 2025

#### Added Features and Updates

* Improved to support using VIP (Virtual IP)
  * VIP is now issued for newly created DB instances and is always configured to point to the master DB instance. For existing DB instances, VIPs can be issued manually by clicking the [Add VIP] button in the console
* Improved to allow explicitly disabling High Availability via the console when it is in an abnormal state
* Improved to allow entering decimal values in monitoring settings
* Improved to allow entering Korean characters in user group names
* Improved the change history modal window to check whether to restart when changing parameter groups on DB instances

#### Bug Fixes

* Fixed an issue where you could enter invalid values in the event source when creating event subscriptions via the Open API
* Fixed an issue where the status of DB instances was intermittently not updated
* Fixed an issue where an unknown error modal window was sometimes exposed

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

* Added forced promotion of DB instances
* Improved to allow you to select notification type when subscribing to events
* API v3.0 additions and changes
  * Added the Export after backing up DB instance API

### August 29, 2023

#### New Releases

- Relational Database Service (RDS) provides Relational Database in the cloud environment.
- No complicated configuration is required to enable relational database.
