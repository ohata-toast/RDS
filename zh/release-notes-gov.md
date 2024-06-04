## Database > RDS for MySQL > Release Notes

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

* Added the feature to create read replicas on subnets in other regions with region peering connections
* Added forced promotion of DB instances
* Improved to allow you to select notification type when subscribing to events
* API v3.0 additions and changes
  * Added the Export after backing up DB instance API

### September 27, 2022

#### New Releases

- Relational Database Service (RDS) provides Relational Database in the cloud environment.
- No complicated configuration is required to enable relational database.