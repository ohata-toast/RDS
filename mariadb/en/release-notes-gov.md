## Database > RDS for MariaDB > Release Notes

### April 16, 2025

#### Added Features and Updates

* Added and modified API v3.0
  * Added the API to list Log files
  * Added the Export Log file API

### February 13, 2025

#### Bug Fixes
* Fixed an issue where deleted notification group information appears on the view DB instance details screen

### November 14, 2024

#### Added Features and Updates

* Added the feature to auto-scale storage
* Improved to avoid restarting DB instances when scaling storage size
* Separated the scale storage size feature from the modify DB instance feature into a drop-down menu
* Changed the high availability pause status to stay when rebuilding a candidate master
* Removed the backup retry expiration time setting during auto backup setup and improved to allow users to retry backups within the backup window time range.
* Added the versions of MariaDB 10.11.7 and MariaDB 10.11.8

### September 12, 2024

#### Added Features and Updates

* Added the incremental backup feature
* Improved to allow users to choose whether to delete automatic backups when deleting a DB instance

### July 11, 2024

#### Added Features

* Add the procedure that controls foreign_key_checks

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

### January 11, 2024

#### New Releases

- Relational Database Service (RDS) provides Relational Database in the cloud environment.
- No complicated configuration is required to enable relational database.
