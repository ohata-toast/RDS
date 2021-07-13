## Database > RDS for MySQL > Console Guide 

## Getting Started 

To use RDS for MySQL, a DB instance must be created first, in the following method. 

* Go to **Console > Database > RDS for MySQL** and **DB Instance**, and click **+ Create** on top left, and the screen shows at the bottom of the page.   

![rds_01_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_01_20210112_en.png)

* Fill out required information on **Detail Setting**, and click **Next** on the top right.  
    * DB Instance: Enter name of a DB instance. 
    * Description: Enter description of DB instance.  
    * DB Engine: Select engine version of the database to create. 
    * DB Port: Enter port number of database, between 10000 and 12000. 
    * DB User ID: Enter account ID for administrator to create when database is created.  
    * DB Password: Enter account password for administrator to create when database is created.  
    * VPC Subnet: Select a subnet of Compute & Network to communicate with DB instance to create, via private network.
    * Floating IP: Enable Floating IP, to connect with external networks of NHN Cloud. 
    * Flavor: Select a type of DB instance. 
    * Storage Type: Specify volume type of DB instance.
        * Either HDD or SSD.
    * Storage: Enter volume size of DB instance.
        * It can be anywhere between 20 GB and 2 TB.  
    * Availability Zone: Select an area where DB instance is to be created.
    * High Availability: To create database instances, the candidate master is created at a different availability zone from the master.
    * Ping Interval: Sets the interval for checking the status of the master instance when using the high availability feature. An error occurs after 4 failed attempts.
        * It can be anywhere between 1 and 600 seconds.
    * Database File Encryption: User data files and backup files are encrypted.
    * Default Alarm: Register alarms for pre-defined events of a database instance.
      * To enable default alarm, a recipient group must be selected.
> [Note] Unless a selected VPC subnet of Compute & Network is connected with internet gateway, floating IP is not available.  
> [Note] VPC subnet, once selected, cannot be changed.
> [Note] The candidate master instance is created at a different availability zone from the master, and it does not show on the list.
> [Note] Instances on the list are arranged in the order of creation, but the order may change after measures are taken against failure, since the candidate master is created when the high availability option is enabled for the master.
> [Note] By enabling database file encryption, performance may be degraded more or less.
> [Note] With default alarm setting, alarms for the instance are automatically registered, in the name of "{instance name}-default". Registered alarms can be changed or deleted, and applied instances can also be changed.

Specify backup information on the **Backup & Access Control** page. 

![rds_02_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_02_20210112_en.png)

* Set auto backup and access control, and click **Next**. 
* Query Latency: FLUSH TABLES WITH READ LOCK latency can be set when performing a backup.
  * It can be anywhere between 0 and 21,600.
* Backup Retention Period: Select more than a day, to allow auto backups. 
    Select **N/A**, and auto backup is not enabled. 
* Backup Start Time: Auto backup starts at some point between start time and duration.  
    Duration refers to time when backup starts: but, not that backup ends within duration.  
* User Access Control: Enter accessible users to DB instance in the CIDR format. 
    Unregistered IPs for user access control are not accessible. 
    Selects whether or not to allow `inbound/outbound` in the Direction setting for access control.

Values can be changed on DB Configuration. 

![rds_03_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_03_20210112_en.png)

* Change values, and click **Create**. 
* Click **Confirm**, and a DB instance is created. 
* It takes minutes to complete creation. 

### Access to DB Instances 

* Select a DB instance which is created, to find its detail setting. Instances that are not associated with floating IP are not allowed for external access. 
* Go to [Detail Settings] and [Access Information] of an instance to check accessible domain information.
* Database instances of which floating IP is not ‘Enabled’ cannot be accessed from outside.

![rds_04_20191008](https://static.toastoven.net/prod_rds/19.10.08/rds_04_20191008.png)

* To test external access, click **Change** on top right.  
* Modify to **Enable** for floating IP. 
* Click **Confirm** to apply changes. 

![rds_04_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_04_20210112_en.png)

After setting, you can find a floating IP is created to allow external access.  

![rds_05_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_05_20210112_en.png)

Below is an example of access to MySQL Workbench. 

![rds_06_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_06_20210112_en.png)

#### Constraints 

* If user's compute instance lies in the network environment which cannot access DNS server, the instance cannot access RDS instance via domain.
* The user's ISP may block a well-known port for security purposes. In such cases, the user cannot access NHN Cloud's RDS and must use a different port number.

## DB Instances

### High Availability 

* Measures can be taken against failure which occurs when a candidate master is created at a different availability zone.
* To restart a highly available instance, select [Restart by Taking Measures against Failure] to replace the master with the candidate master.
* For those instances using high availability, access information does not change with partial changes in option, but the master and the candidate master instances may be interchanged.
* With a failover for high availability instance, the new master instance does not inherit the backup of the existing master instance.

> [Note] For high availability instances, use MySQL query statement to force replication of other instances or master of external MySQL, and then high availability and some features do not operate.    

#### High Availability Pause and Resume

* High Availability can be temporarily stopped if disconnection or a massive volume of workload is expected due to temporary work in the Master instance.
* If High Availability is paused, fault won't be detected; therefore, no failover will take place.
* If the instance is changed or restarted while High Availability is paused, the paused High Availability function will resume.
* Even if High Availability is paused, data duplication works fine. However, since no fault will be detected during the pause, it is not recommended to keep the paused state for a long time.

#### Constraints 

* Highly available instances are ensured for the initial one-time measure against failure. If a measure is taken against failure, the candidate master instance is changed into a general master for which high availability is not enabled.
* The newly changed master instance inherits a domain allowed to access the existing master instance.
* The high availability option can also be newly specified for service.
* For the existing master instance in which failure measure was taken, access information is changed and the status is converted to ‘Suspended’.
* For the existing master instance in which failure measure was taken, restarting may be attempted by using Restart Instances. However, restarting may not work or properly operate due to reasons, including data loss out of failure.
* The Read Only Slave instance is not provided with the high availability feature.
* While restarting or changing options are underway for instances with high availability, the Read Only Slave is not operational. 
* The high-availability feature is based on each domain. Therefore, if a user instance for Compute cannot access a dns serer, the instance cannot access RDS intances via domain, which may cause trouble in accessing for a failover. 


### Instance Type 

* DB instances can be created in all types provided by NHN Cloud Compute & Network.  

### Backups 

* RDS executes all backups, and then uploads and saves newly created backups on its own object storage.
* For auto backups, backup volume is provided for free, as much as the data volume of the original instance.
* If you don't want extra charges, be aware of the backup cycle. 
* Performance may be degraded during backups. 
* It is recommended to back up during when service load is low. 
* NHN Cloud RDS supports restoration at a specified point of time. 
    If the size of binary logs and retention period is too short, restoring to a specific time may be difficult. 
* DB instances under restoration cannot be backed up. 

#### Auto Backups

* If the backup cycle of DB instance is more than a day, auto backup is enabled. 
    * Immediately after backup cycle is changed from more than a day to none, all auto backups are deleted from the server. 
    * Deleted backups cannot be restored. 
* Backup files are retained as much as configured backup cycle. 
* Auto backups start at some point between backup start time and duration. 
* Duration refers to time when backup starts: not that a backup is completed within it. 
    Even if a backup is not complete within duration, the backup is not closed. 
* Auto backups are deleted along with the original instances.

> [Note] For MySQL 5.7 or higher, creating or building an index again during backup causes failure in the backup.   

#### Manual Backups 

* Manual backups are always available, except auto backups. 
* Manual backups are not deleted, unless specified.

### Restoration 

* DB instances can be restored at a specific point of time, by using retained backups. 
* For a restoration, a new DB instance is created, without changing original DB instances. 
* It takes more time if the location to save backups is object storage. 
* Cannot restore by using DB instances that are currently under backup. 
> [Note] While restoration is underway, object storage volume may be incurred as much as the size of a binary log file.
> [Caution] Restoring to a point in time is not available when there is no binary log file.

### Replication 

* For better read performances, create Read Only Slave supported by MySQL. 
* To create Read Only Slave, select an original DB instance and click **Additional Functions > Create Replica**. 

![rds_07_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_07_20210112_en.png)

* Fill out settings to create replica, and click **Replicate**, and its replication is created. 
* It is recommended to create the same or higher type than an original database instance, since using a lower type may cause delays in replication. 
* When a replica is created, the I/O performance of the original database instance may be lower than usual. 
* It make take more time to create a replica, in proportion of the size of original DB instance. 
> [Note] While replication is underway, object storage volume may be incurred as much as the size of a binary log file.
> [Note] When replication is completed, the Read Only Slave rule is added to the access rule of the master instance.

#### Constraints 

* One original instance can create up to 5 replicas. 
* Further replicas of a replica cannot be created. 

### Promotion 

* Promotion refers to upgrading Read Only Slave to Master, ceasing replication relations. 
* Promoted replicas do not automatically reflect modifications of DB instances, any more. 
* A promoted replica operates as a standalone DB instance. 
* If a delay occurs between a promoting replica and original DB instance, it cannot be promoted until such delay is resolved. 

### Secure Capacity 

*  Disk capacity can be secured by removing resources of DB instance. 

#### Deleting Binary Logs 

![rds_08_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_08_20210112_en.png)

* Delete a binary log file to secure more disk space. 

> [Caution] Selected binary log files and previously-created log files are all deleted. 
> [Caution] Depending on the binary log files that are deleted, restoration may not be available to a certain point in time.
> [Caution] If all binary log files are deleted, point-in-time restoration is not available.

### Scaling Storage  

![rds_09_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_09_20210112_en.png)

* Scale up storage of a DB instance. 
* If Read Only Slave exists, the storage is scaled to the same size of Master. 
* DB instance is restarted. 

### Database File Encryption 

* Files for database where user data is saved, as well as backup files, are encrypted.

> [For Reference] Since encryption is performed in real time, performance may be degraded for database instances.

#### Constraints 

* Database file encryption cannot be enabled for the restoration or replication of instances, for which database file encryption is not enabled.
* Database file encryption cannot be disabled for the restoration or replication of instances, for which database file encryption is enabled.

### DB Schema & DB User Management

* Web console can manage DB Schema and DB User.

> [Note] You can no longer create, modify, or delete DB Schema or DB User with a query.
> ![db_schema_and_user_list_20210209_ko](https://static.toastoven.net/prod_rds/21.03.09/rds_01_20210309_en.png)

* Clicking the **Change**  button enables it so that DB Schema and User can be changed.

![db_schema_and_user_modify_20210209_ko](https://static.toastoven.net/prod_rds/21.03.09/rds_02_20210309_en.png)

* Clicking the **Add**  button applies the changes in DB Schema and DB User all at once.
* Renaming of DB Schema is not supported.
* DB User is given four permissions.
  * READ: Can read data.
  * CRUD: In addition to READ permission, DML can be inquired.
  * DDL: In addition to CRUD permission, DDL can be inquired.
  * CUSTOM: The permissions for existing users already in use. Cannot be changed to CUSTOM permissions, and users with CUSTOM permissions can delete only.

> [Caution] If you have Read Only Slave, or in the case of a high availability instance, if you have done a task related to `CREATE USER`, `ALTER USER`, or `GRANT` with an existing DB User, you must execute `flush privileges` syntax. Otherwise, backup could fail. This is a known MySQL bug.

* The DB User shown below cannot be used due to the policy:
  * mysql.session
  * mysql.sys
  * sqlgw
  * admin
  * etladm
  * alertman
  * prom
  * rds_admin
  * rds_mha
  * rds_repl

* If you click the **Synchronize** button for DB schema and DB User, you can get the information of DB schema and DB User created in the DB instance.
  
### Monitoring Items 

* RDS supports the monitoring items as follows: 

![rds_12_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_12_20210112_en.png)

## Log Files 

* View or download log files without accessing DB instances. 
* Select **DB Instances** then click **Events & Logs** tab to see error.log, slow_query.log, general.log, and server_audit.log files depending on the settings. 

![rds_13_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_13_20210112_en.png)

* Make sure, though, to leave logs by configuring in **DB Configuration**.  
* Click **View** to find log files on a new window. 
* You can find as many lines as entered for a log length, and logs as big as 1MB are available.  (*원문 의미 확인요망: '끌에서부터')

![rds_14_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_14_20210112_en.png)

* To view the entire log files, click **Download** to directly download files. 

![rds_15_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_15_20210112_en.png)

* Click **Download** and a new window pops up. 
* Click **Import** and wait, then the **Download** button is enabled.  
* Log files are uploaded to temporary object storage, and remain to be downloaded for the maximum 5 minutes. 
> [Note] For the 5 minutes while it is uploaded to object storage and deleted, object storage may be charged. 

### Audit Log

* Can leave an audit log using the DB Configuration settings.
* Generated audit log file can be checked or downloaded from the Event & Log tab.
* For detailed settings, please check the website below.
  * https://mariadb.com/kb/en/mariadb-audit-plugin-options-and-system-variables

> [Caution] MySQL 5.7.15, 8.0.18, 8.0.23 version is not supported.

## Event

![event_list_0_ko](https://static.toastoven.net/prod_rds/210615/event_list_0_ko.png)

The results of monitoring settings can be checked for various events and notification groups that occur during various tasks related to DB instances.

* ❶ Retrieve by selecting the event type.
* ❷ Search the event source or message.
* ❸ Select the event period.

### Event Subscription

![event_sub_list_0_ko](https://static.toastoven.net/prod_rds/210615/event_sub_list_0_ko.png)

The event subscription status can be checked..

* ❶ Search by the **subscription name** or **event source**.
* ❷ Create new event subscription.
* ❸ Modify the subscription by selecting the subscription to be modified.
* ❹ Delete the subscription by selecting the subscription to be deleted.

### Register and Modify Event Subscription

![event_sub_popup_0_ko](https://static.toastoven.net/prod_rds/210615/event_sub_popup_0_ko.png)

* ❶ Enter the event subscription name.
* ❷ Select the type of event to subscribe to. Depending on the type, the event code and event source available are limited.
* ❸ Select the event code to subscribe.
* ❹ Select the event source to subscribe.
* ❺ Select the user group to send the notification to. No notification will be sent if no group is selected.
* ❻ Choose whether or not to enable.

## Server Dashboard

![server_dashboard_0_ko](https://static.toastoven.net/prod_rds/210615/server_dashboard_0_ko.png)

Various performance indicators can be checked in charts.

* ❶ * Search by instance name or IP address.
* ❷ Servers that meet the criteria are displayed. The color of the icon in the upper right corner changes depending on the server status.
  * Green: Normal
  * Red: Error
  * Gray: Server deleted
* ❸ Select the layout.
* ❹ Modify or delete the layout. 
* ❺ Popup that **generates the layout** is displayed.
* ❻ Add chart in layout.
* ❼ Chart is updated after setting the search period to the current time.
* ❽ The search period can be modified.
* ❾ The chart is displayed.

### Add Chart

![server_dashboard_chart_add_1_ko](https://static.toastoven.net/prod_rds/210615/server_dashboard_chart_add_1_ko.png)

* ❶ First, select the desired layout to add a chart.
* ❷ Click the **Add Chart** button and a popup is displayed to **add the chart** as shown below.

![server_dashboard_chart_add_2_ko](https://static.toastoven.net/prod_rds/210615/server_dashboard_chart_add_2_ko.png)

* ❶ The chart to be added is displayed.
* ❷ Select the desired chart to add.

### Modify Chart

![server_dashboard_1_ko](https://static.toastoven.net/prod_rds/210615/server_dashboard_1_ko.png)

* ❶ *Move the chart by dragging the top area of the chart with the mouse.
* ❷ The chart can be deleted.
* ❸ Change the chart size by dragging the lower right corner of the chart with the mouse. 

### Add Layout

![server_dashboard_layout_create_0_ko](https://static.toastoven.net/prod_rds/210615/server_dashboard_layout_create_0_ko.png)

* ❶ Click the **Create Layout** button.
* ❷ Enter the layout name.

### Modify and Delete Layout

![server_dashboard_layout_modify_0_ko](https://static.toastoven.net/prod_rds/210615/server_dashboard_layout_modify_0_ko.png)

* ❶ Click the **Manage** button.
* ❷ Changes to the edit screen where the layout can be modified.
* ❸ The layout can be deleted

![server_dashboard_layout_modify_1_ko](https://static.toastoven.net/prod_rds/210615/server_dashboard_layout_modify_1_ko.png)

* ❶ Click the **OK** button to save the modifications.
* ❷ Click the **Cancel** button to cancel the modifications.

## User Group

The users who receive notifications through notification groups and event subscriptions can be managed in groups.

### Create User Group

![user_group_create_0_ko](https://static.toastoven.net/prod_rds/210615/user_group_create_0_ko.png)

* ❶ Click the **Create User Group** to display a popup to **create a user group**.

![user_group_create_1_ko](https://static.toastoven.net/prod_rds/210615/user_group_create_1_ko.png)  

* ❷ Enter the group name.
* ❸ The notified users are displayed. Clicking the **x** button will exclude notified users.
* ❹ Add users to notified users.
* ❺ All users in the user list are added to the notified users.

### Modify User Group

![user_group_modify_0_ko](https://static.toastoven.net/prod_rds/210615/user_group_modify_0_ko.png)

* ❶ Click the **Edit** button of the user group to be modified and a popup will appear to **modify the user group**.

![user_group_modify_1_ko](https://static.toastoven.net/prod_rds/210615/user_group_modify_1_ko.png)

* ❷ After modifying the items, click the **OK** button to modify the user group.

### Delete User Group

![user_group_delete_0_ko](https://static.toastoven.net/prod_rds/210615/user_group_delete_0_ko.png)

* ❶ Click the **Delete** button of the user group to be deleted.

## Notification Group

Notifications can be received by adding the monitoring settings to the performance indicators of the instance.

### Create Notification Group

![notification_group_create_0_ko](https://static.toastoven.net/prod_rds/210615/notification_group_create_0_ko.png)

* ❶ Click the **Create Group** button.

![notification_group_create_1_ko](https://static.toastoven.net/prod_rds/210615/notification_group_create_1_ko.png)

* ❷ Enter the notification group name.
* ❸ Select the notification type. Multiple selections can be made.
* ❹ Set whether or not to enable.
* ❺ Select the instance to be monitored.
* ❻ Select the user group.

### Modify Notification Group

![notification_group_modify_0_ko](https://static.toastoven.net/prod_rds/210615/notification_group_modify_0_ko.png)

* ❶ 수Click the **Edit** button of the notification group to be modified.

![notification_group_modify_1_ko](https://static.toastoven.net/prod_rds/210615/notification_group_modify_1_ko.png)

* ❷  After modifications, click the **OK** button.

### Delete Notification Group

![notification_group_modify_2_ko](https://static.toastoven.net/prod_rds/210615/notification_group_modify_2_ko.png)

* ❶ The registered notification group can be deleted by clicking the **Delete** button.

### Add Monitoring Setting

![notification_group_watchdog_0_ko](https://static.toastoven.net/prod_rds/210615/notification_group_watchdog_0_ko.png)

* ❶ Click the Monitoring Settings button of the notification group to modify the **monitoring settings**.

![notification_group_watchdog_1_ko](https://static.toastoven.net/prod_rds/210615/notification_group_watchdog_1_ko.png)

* ❷ Click the **Monitoring Settings** button.

![notification_group_watchdog_2_ko](https://static.toastoven.net/prod_rds/210615/notification_group_watchdog_2_ko.png)

* ❸ Select the item to monitor.
* ❹ Select the comparison method.
* ❺ Enter the threshold. The max allowed value is different depending on the item.
* ❻ Enter the duration.
* ❼ Clicking the Add button registers the monitoring setting. If you click the Cancel button, the monitoring setting won't register.

### Modify and Delete Monitoring Settings

![notification_group_watchdog_3_ko](https://static.toastoven.net/prod_rds/210615/notification_group_watchdog_3_ko.png)

* ❶ The Monitoring Settings can be modified by clicking the **Edit** button.
* ❷ Clicking the **Delete** button will delete the monitoring setting.

## Separating user permission

* Project members can be granted separate permissions either as RDS for MySQL ADMIN / RDS for MySQL MEMBER.
* RDS for MySQL ADMIN permission holders can use all available features as before.
* RDS for MySQL MEMBER permission holders can use read-only feature.
  * Cannot use any features aimed at instances or create, modify, or delete any instance.
  * Can use alarm-related features on the Notification tab.

## Appendix 1. Guide for Database Instance Migration for Hypervisor Maintenance

NHN Cloud updates hypervisor software on a regualr basis to enhance security and stability of its infrastructure services. Instances that are running on a target hypervisor for maintenance must be migrated to a hypervisor which is completed with maintenance.

Migration of database instance can start on a NHN Cloud console.
Depending on database configuration, select a particular instance to migrate it as well, if its relevant database instance (e.g. slave instance) is also the target of maintenance.
Follow the guide as below, to use the migration service on console.
Go to the project in which a database instance for maintenance is located.

### 1. Check database instances which are the maintenance targets.

Those with the migration button next to name are the maintenance targets.

![rds_planed_migration_0](https://static.toastoven.net/prod_rds/planned_migration_alarm/image0_en.png)

Put a cursor on the migration button, and you can find its maintenance schedule.

![rds_planed_migration_1](https://static.toastoven.net/prod_rds/planned_migration_alarm/image1_en.png)

### 2. Make sure to close any application programs that are running on the database instance.

It is recommended to take appropriate measures so as impact on relevant services can be limited.
Nevertheless, if impact on service is inevitable, contact NHN Cloud Customer Center to be guided further.

### 3. Select a database instance for maintenance, click migration, and click OK on window asking of migration.

![rds_planed_migration_2](https://static.toastoven.net/prod_rds/planned_migration_alarm/image2_en.png)

### 4. Wait until database migration is over.

If instance status remains the same, try ‘Refresh’.

![rds_planed_migration_3](https://static.toastoven.net/prod_rds/planned_migration_alarm/image3_en.png)

While migration is underway, operation is not permitted.
An abnormal closure of database instance migration shall be automatically reported to administrator, and it such case, you’ll be contacted by NHN Cloud.
