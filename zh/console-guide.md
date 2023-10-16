## Database > RDS for MySQL > Console Guide

## Getting Started

* To use RDS for MySQL, a DB instance must be created first, in the following method.
* Go to **Console > Database > RDS for MySQL** and **DB Instance**, and click **+ Create** on top left, and the screen shows at the bottom of the page.

![rds_01_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_01_20210112_en.png)

* Fill out required information on **Detail Setting**, and click **Next** on the top right.
    * DB Instance: Enter name of a DB instance.
    * Description: Enter description of DB instance.
    * DB Engine: Select engine version of the database to create.
    * DB Port: Enter port number of database.
        * It can be set to a value between 10000 and 12000.
    * DB User ID: Enter account ID for administrator to create when database is created.
    * DB Password: Enter account password for administrator to create when database is created.
    * VPC Subnet: Select a subnet of Compute & Network to communicate with DB instance to create, via private network.
    * Floating IP: Enable Floating IP, to connect with external networks of NHN Cloud.
    * Flavor: Select a type of DB instance.
    * Storage Type: Specify volume type of DB instance.
        * Either HDD or SSD can be selected.
    * Storage: Enter volume size of DB instance.
        * It can be set to a value between 20 GB and 2 TB.
    * Availability Zone: Select an area where DB instance is to be created.
    * High Availability: When creating a DB instance, create a candidate master in a different availability zone from the master.
    * Ping Interval: Sets the interval for checking the status of the master instance when using the high availability feature. An error occurs after 4 failed attempts.
        * It can be set to a value between 1 and 600 seconds.
    * Default Alarm: Register alarms for pre-defined events of a DB instance.
        * To enable default alarm, a recipient group must be selected.

> [Note] Unless a selected VPC subnet of Compute & Network is connected with internet gateway, floating IP is not available.
> [Note] VPC subnet, once selected, cannot be changed.
> [Note] The candidate master instance is created at a different availability zone from the master, and it does not show on the list.
> [Note] The instance list is sorted in the order of creation. The order may change after failover, since the candidate master is created when the high availability option is enabled for the master.
> [Note] With default alarm setting, alarms for the instance are automatically registered, in the name of "{instance name}-default". Registered alarms can be changed or deleted, and applied instances can also be changed.

![backup_and_access_en](https://static.toastoven.net/prod_rds/22.08.09/backup_and_access_en.png)

* Set auto backup and access control, and click **Next**.
* Query Latency: FLUSH TABLES WITH READ LOCK latency can be set when performing a backup.
    * It can be set to a value between 0 and 21,600.
* Backup Retention Period: Select more than a day, to allow auto backups.
    * It can be set to a value between 0 and 730.
    * If you enter 0, auto backup is not executed.
* Use Table Locking: Set whether to lock the table with the FLUSH TABLES WITH READ LOCK statement when performing backup.
* Backup Replication Region: Set to replicate backup files to another region when auto backup is executed.
* Backup Retry Count: Set the number of retries to make when backup fails.
    * Retry is performed when you enter 1 or higher.
    * Retry is performed only when performing auto backup.
* Backup Execution Cycle: Set the cycle to execute auto backup.
    * You can add multiple sets of backup start time, duration, and backup retry expiration time by clicking the Add button.
    * Each cycle can be added from the backup start time to the time set by duration so that they do not overlap.
    * If the previously executed backup is not completed, the backup in that time period will not be executed.
* Backup Start Time: Auto backup starts at some point between the backup start time and duration.
    * Duration refers to the time when backup starts.
    * It does not mean that backup ends within the duration.
* Backup Retry Expiration Time: If backup fails, attempts are made as many times as the retry count, but only until the configured time so that it does not affect the next backup time.
* User Access Control: Enter accessible users to DB instance in the CIDR format.
    * Unregistered IPs for user access control are not accessible.
    * Selects whether or not to allow `inbound/outbound` in the Direction setting for access control.
        * Inboud: Direction into the instance.
        * Outbound: Direction out of the instance.

> [Note] The Backup Replication Region feature is not provided for banking networks.

![db_configuration_0_en](https://static.toastoven.net/prod_rds/22.03.15/db_configuration_0_en.png)

* Change the setting values, and click **Create**.
    * For items whose **Use Expression** is set to **Y**, you can enter an expression in **Parameter Value**.
    * Variables that can be used in expressions are as follows. (case sensitive)
        * ramSizeByte: Memory allocated to the DB instance (in bytes)
        * storageSizeByte: Size of the DB instance volume (in bytes)
        * vCPU: Number of CPUs
        * dbPort
    * Operators that can be used in expressions are as follows.
        * \* \/ + - , ( ) [ ]
    * Functions that can be used in expressions are as follows. (case sensitive)
        * min([a, b, ..., z])
        * max([a, b, ..., z])
        * sum([a, b, ..., z])
    * The result of rounding up to 8 decimal places of the value calculated by the expression is applied to the DB instance.
    * For parameters that do not support fractions, the result of truncating the decimal point of the value calculated by the expression is applied to the DB instance.
* Click **Confirm**, and a DB instance is created.
* It takes minutes to tens of minutes to complete creation.

### Access to DB Instances

* Select a DB instance which is created, to find its detail setting. Instances that are not associated with floating IP are not allowed for external access.
* Go to [Detail Settings] and [Access Information] of an instance to check accessible domain information.
* DB instances of which floating IP is not ‘Enabled’ cannot be accessed from outside.

![instance_detail_0_en](https://static.toastoven.net/prod_rds/22.06.14/instance_detail_0_en.png)

* To test external access, click **Edit** on top right.
* Modify to **Enable** for floating IP.
* Click **Confirm** to apply changes.

![instance_detail_1_en](https://static.toastoven.net/prod_rds/22.06.14/instance_detail_1_en.png)

* After setting, you can find a floating IP is created to allow external access.

![rds_06_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_06_20210112_en.png)

* Below is an example of connecting to MySQL Workbench.

#### Constraints

* If user's compute instance lies in the network environment which cannot access DNS server, the instance cannot access RDS instance via domain.
* The user's ISP may block a well-known port for security purposes. In such cases, the user cannot access NHN Cloud's RDS and must use a different port number.

## DB Instances

### High Availability

* By creating a candidate master in a different availability zone, failover can be performed in the event of failure.
* For instances using high availability, access information does not change when some options are changed, but the master and the candidate master instance may be switched.
* When a failure occurs and failover is performed on a high availability instance, the newly changed master instance does not inherit the backup of the existing master instance.

> [Note] When using high availability instances, if you use MySQL query statement to perform force replication from other instances or master of external MySQL, high availability and some features do not work properly.
> [Note] When the storage usage of the DB instance becomes full, the high availability monitoring process detects it as a failure and performs failover, so caution is required.

#### High Availability Pause and Resume

* High Availability can be temporarily stopped if disconnection or a massive volume of workload is expected due to temporary work in the Master instance.
* If High Availability is paused, failure won't be detected; therefore, no failover will take place.
* Even if you perform a task that requires High Availability in the paused state to resume, it does not resume.
* Even if High Availability is paused, data replication works fine. However, since no failure will be detected during the pause, it is not recommended to keep the paused state for a long time.

#### Constraints

* For high availability instances, initial one-time failover is guaranteed. If failover occurs in the event of a failure, the candidate master instance is changed to a general master for which high availability is not enabled.
* The newly changed master instance inherits a domain allowed to access the existing master instance.
* The high availability option can also be newly specified for service.
* For the existing master instance on which failover was performed, access information is changed and the status is converted to ‘Suspended’.
* For the existing master instance on which failover was performed, restarting may be attempted by using Restart Instances. However, restarting may not work or properly operate due to reasons, including data loss out of failure.
* The Read Only Slave instance is not provided with the high availability feature.
* While restarting or changing options are underway for instances with high availability, the Read Only Slave is not operational.
* The high availability feature is based on each domain. Therefore, if a user instance for Compute cannot access a dns serer, the instance cannot access RDS instances via domain, which may cause trouble in accessing for failover.

### Flavor

* DB instances can be created in some of specifications provided by NHN Cloud Compute & Network.

### Restart

* When you perform DB instance restart, MySQL installed on the DB instance is restarted.
* Restarting MySQL may take a long time depending on the status of the MySQL engine, and RDS for MySQL waits until MySQL is normally stopped and started without a specific time limit.
* When MySQL is restarted, `Stop Instance` and `Start Instance` events are generated.
* For read replicas, replication is suspended during restart, and replication resumes automatically when restart is complete.

#### Restart of High Availability DB Instances

* For high availability DB instances, two options that are not provided for normal instances are provided.

![restart_ha_instance_en](https://static.toastoven.net/prod_rds/21.11.09/restart_ha_instance_en.png)

* ❶ If you select the [Restart Using Failover] option, you can proceed with the restart with the minimal downtime.
    * Since the master instance is replaced and all binary logs are deleted, it is impossible to perform point-in-time restoration to the time before the restart.
    * If the master instance has a lock or the replication latency is long, failover does not occur or takes a lot of time, so make sure that all transactions are terminated and there is no replication latency.
* ❶ If you do not select the [Restart Using Failover] option, the high availability feature is paused, and restart is performed sequentially in the following order: master instance -> candidate master instance.
    * After the restart is complete, the high availability feature will work again.
* ❷ If you select the [Proceed with Current Point-In-Time Backup] option, the backup starts immediately after the restart is completed.
    * If you select the [Restart Using Failover] option, it is not possible to restore to the time before the restart, so it is recommended to select this option together if possible.

### Force Restart

* If you perform a force restart of DB instance, the DB instance itself is restarted.
* High availability instances do not support the force restart feature.
* First, issue the SIGTERM command to MySQL and wait for 10 minutes for normal shutdown.
* If a normal shutdown occurs within 10 minutes, the instance's OS is restarted afterwards.
* If a normal shutdown does not occur within 10 minutes, the OS is forcibly restarted.
    * If the OS is forcibly restarted, some transactions in operation may be lost, and the data volume may become corrupted and unrecoverable.
* The state of the instance may not return to normal after a forced restart. If this situation occurs, please contact the Customer Center.

> [Caution] Because there is a possibility of data loss or data volume corruption, this feature should not be used except in urgent and unavoidable circumstances.

### Stop

* For a DB instance that is not used for a while but needs to be used again in the near future, you can stop the function of the DB instance.
* When you request a stop, the DB instance is immediately terminated. When the stop is completed, the DB instance status is changed to `Terminated`.
    * In addition, for high availability instances, the old master is stopped when failover occurs.
* Instances in a stopped state will be charged at a discounted rate for 90 days from the moment they are stopped, and will be charged at the normal rate after 90 days have passed.
* Be sure to delete unused instances to avoid unnecessary charges.

> [Note] High availability instances, master instances with read replicas, and read replicas cannot be stopped.

### Backups

* RDS executes all backups, and then uploads and saves newly created backups on its own object storage.
* For auto backups, backup volume is provided for free, as much as the data volume of the original instance.
* If you don't want extra charges, be aware of the backup cycle.
* Performance may be degraded during backups.
* It is recommended to back up during when service load is low.
* NHN Cloud RDS supports restoration at a specified point of time.
    * If the size of binary logs and retention period is too short, restoring to a specific time may be difficult.
* DB instances under restoration cannot be backed up.

#### Auto Backups

* If the backup cycle of DB instance is more than a day, auto backup is enabled.
    * Immediately after backup cycle is changed from more than a day to none, all auto backups are deleted from the server.
    * Deleted backups cannot be restored.
* Backup files are retained as much as configured backup cycle.
* Auto backups start at some point between backup start time and duration.
* Duration refers to time when backup starts.
    * It does not mean that backup is completed within the duration.
    * Even if a backup is not complete within duration, the backup is not closed.
* Auto backups are deleted along with the original instances.
* When backup fails, if Backup Retry Count is set to a value of 1 or higher, attempts are made as many times as the specified value.

> [Note] For MySQL 5.7 or higher, creating or building an index again during backup causes failure in the backup.
> [Note] If a DDL query is executed during a backup, the backup will fail.

#### Manual Backups

* Manual backups are always available, except auto backups.
* Manual backups are not deleted, unless specified.

### Restoration

* DB instances can be restored at a specific point of time, by using retained backups.
* For a restoration, a new DB instance is created, without changing the original DB instance.
* If the storage size of the DB instance to restore is set tp a value smaller than the storage size of the original DB instance, the restoration may fail.

> [Note] While restoration is underway, object storage volume may be incurred as much as the size of a binary log file.
> [Note] Restoring to a point in time is not available when there is no binary log file.

#### Restore Snapshot

* You can restore to the point of backup using a manual backup or auto backup.
* After selecting the DB instance where the backup to restore was performed, click **Additional Features > Restore**.

![restore_menu_en](https://static.toastoven.net/prod_rds/22.03.15/restore_menu_en.png)

* Enter the information of the DB instance to restore.

![restore_by_snapshot_en](https://static.toastoven.net/prod_rds/22.03.15/restore_by_snapshot_en.png)

* Select ❶ [Restore Snapshot].
* ❷ Select manual backup or auto backup to restore.

#### Restore Point-In-Time

* You can restore to a specific point in time using a manual or auto backup and a binary log file.
* The point of time to restore can be specified using the timestamp to restore or the position of the binary log file.

![restore_by_time_en](https://static.toastoven.net/prod_rds/22.03.15/restore_by_time_en.png)

* Select ❶ [Restore Point-In-Time (by timestamp)].
* ❷ Select the timestamp to restore.

![restore_by_position_en](https://static.toastoven.net/prod_rds/22.03.15/restore_by_position_en.png)

* Select ❶ [Restore Point-In-Time (by binlog)].
* ❷ Select a backup file to use for restoration.
* ❸ Select the last binary log file to be restored.
* ❹ Enter the position information of the last binary log file to be restored.
    * Changes up to immediately before the entered position are restored. (The entered position is not restored.)
    * You can view the position information of the binary log file using the mysqlbinlog utility.
    * For more information on how to use the utility, see [mysqlbinlog](https://dev.mysql.com/doc/refman/8.0/en/mysqlbinlog.html).

### Replication

* For better read performances, create Read Only Slave supported by MySQL.
* To create Read Only Slave, select an original DB instance and click **Additional Functions > Create Replica**.

![additional_function_0_en](https://static.toastoven.net/prod_rds/22.06.14/additional_function_0_en.png)

* Fill out settings to create a replica, and click **Replicate**, and the replica is created.
* It is recommended to create a replica whose specification is the same as or higher than that of the original DB instance, because using a lower specification may result in replication latency.
* When a replica is created, the I/O performance of the original DB instance may be lower than usual.
* Replica creation time may increase in proportion to the size of the original DB instance.

> [Note] While replication is underway, object storage volume may be incurred as much as the size of a binary log file.
> [Note] When replication is completed, the Read Only Slave rule is added to the access rule of the master instance.

#### Constraints

* One original instance can create up to 5 replicas.
* Further replicas of a replica cannot be created.

### Promotion

* Promotion refers to upgrading Read Only Slave to Master, ceasing replication relations.
* Promoted replicas do not automatically reflect modifications of DB instances, any more.
* A promoted replica operates as a standalone DB instance.
* If replication latency exists between a replica to promote and the original DB instance, it cannot be promoted until such latency is resolved.

### Secure Capacity

* Disk capacity can be secured by removing resources of DB instance.

#### Deleting Binary Logs

![rds_08_20220614](https://static.toastoven.net/prod_rds/22.06.14/rds_08_20220614_en.png)

* Delete binary log files to secure more disk space.

> [Caution] Selected binary log files and previously-created log files are all deleted.
> [Caution] Depending on the binary log files that are deleted, restoration may not be available to a certain point in time.
> [Caution] If all binary log files are deleted, point-in-time restoration is not available.

### Scaling Storage

![rds_09_20220614](https://static.toastoven.net/prod_rds/22.06.14/rds_09_20220614_en.png)

* Scale up storage of a DB instance.
* If Read Only Slave exists, the storage is scaled to the same size of Master.
* DB instance is restarted.
* A high availability instance can be restarted using failover.
    * When you scale up storage using failover, the master is replaced. This reduces downtime, but overall operations can take longer.
    * If the master is replaced, all binary log files are deleted and it becomes impossible to perform point-in-time restoration to a time before replacement.
    * If there is a lock on the master or replication latency is long, failover does not work properly or takes a lot of time, so make sure that all transactions are finished and there is no replication latency.

### DB Schema & DB User Management

* Web console can manage DB Schema and DB User.

> [Note] You can no longer create, modify, or delete DB Schema or DB User with a query.

![db_schema_and_user_list_20210209_en](https://static.toastoven.net/prod_rds/21.03.09/rds_01_20210309_en.png)

* Clicking the **Change**  button enables it so that DB Schema and User can be changed.

![db_schema_and_user_modify_20210209_en](https://static.toastoven.net/prod_rds/21.03.09/rds_02_20210309_en.png)

* Clicking the **Add**  button applies the changes in DB Schema and DB User all at once.
* Renaming of DB Schema is not supported.
* DB User is given four permissions.
    * READ: Can read data.
    * CRUD: In addition to READ permission, DML can be inquired.
    * DDL: In addition to CRUD permission, DDL can be inquired.
    * CUSTOM: The permissions for existing users already in use. Cannot be changed to CUSTOM permissions, and users with CUSTOM permissions can delete only.
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

## Log Files

* View or download log files without accessing DB instances.
* Select **DB Instances** then click **Events & Logs** tab to see error.log, slow_query.log, general.log, and server_audit.log files depending on the settings.

![rds_13_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_13_20210112_en.png)

* Make sure, though, to leave logs by configuring in DB Configuration.
* Click **View** to view log files on a pop-up window.
* You can view as many lines as entered for a log length, and logs of 512KB size from the end are available.

![rds_14_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_14_20210112_en.png)

* To view the entire log files, click **Download** to directly download files.

![rds_15_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_15_20210112_en.png)

* Click **Download** and a pop-up will show up.
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

![event_list_0_en](https://static.toastoven.net/prod_rds/22.08.09/event_list_0_en.png)

The results of monitoring settings can be checked for various events and notification groups that occur during various tasks related to DB instances.

* ❶ Retrieve by selecting the event type.
* ❷ Search the event source or message.
* ❸ Select the event period.
* ❹ Save the filtered events to a CSV file.

### Event Subscription

![event_sub_list_0_en](https://static.toastoven.net/prod_rds/22.03.15/event_sub_list_0_en.png)

The event subscription status can be checked.

* ❶ Search by the **subscription name** or **event source**.
* ❷ Create new event subscription.
* ❸ Modify the subscription by selecting the subscription to be modified.
* ❹ Delete the subscription by selecting the subscription to be deleted.

### Register and Modify Event Subscription

![event_sub_popup_0_en](https://static.toastoven.net/prod_rds/22.03.15/event_sub_popup_0_en.png)

* ❶ Enter the event subscription name.
* ❷ Select the type of event to subscribe to. Depending on the type, the event code and event source available are limited.
* ❸ Select the event code to subscribe.
* ❹ Select the event source to subscribe.
* ❺ Select the user group to send the notification to. No notification will be sent if no group is selected.
* ❻ Choose whether or not to enable.

## Server Dashboard

![server_dashboard_1_en](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_1_en.png)

Various performance indicators can be checked in charts.

* ❶ Search by the instance name or IP address.
* ❷ Servers that meet the criteria are displayed. The color of the icon on the right changes depending on the server status.
    * Green: Normal
    * Red: Error
    * Gray: Deleted server
* ❸ Select the layout.
* ❹ Modify or delete the layout.
* ❺ The **Create Layout** window is displayed.
* ❻ Add a chart to the layout.
* ❼ Add a group to compare multiple servers to the layout.
    * Group charts are unified as line charts for data comparison between servers.
    * Make sure you add group charts separately because they do not share the existing chart information previously saved.
* ❽ The chart is updated after setting the search period to the current time.
* ❾ The search period can be modified.
* ➓ The chart is displayed.

### Add Layout

![server_dashboard_layout_create_1_en](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_layout_create_1_en.png)

* ❶ Click the **Create Layout** button.
* ❷ Enter the layout name.

### Modify and Delete Layout

![server_dashboard_layout_modify_1_en](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_layout_modify_1_en.png)

* ❶ Click the **Manage** button.
* ❷ Changes to the edit screen where the layout can be modified.
* ❸ The layout can be deleted.

![server_dashboard_layout_modify_2_en](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_layout_modify_2_en.png)

* ❶ Click the **OK** button to save the modifications.
* ❷ Click the **Cancel** button to cancel the modifications.

### Add Chart

![server_dashboard_chart_add_1_en](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_chart_add_1_en.png)

* ❶ First, select the desired layout to add a chart.
* ❷ Click the **Add Chart** button and a popup is displayed to **add the chart** as shown below.

![server_dashboard_chart_add_2_en](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_chart_add_2_en.png)

* ❶ The chart to be added is displayed.
* ❷ Select the desired chart to add.

### Modify Chart

![server_dashboard_1_en](https://static.toastoven.net/prod_rds/22.03.15/server_dashboard_1_en.png)

* ❶ Move the chart by dragging the top area of the chart with the mouse.
* ❷ The chart can be deleted.
* ❸ Change the chart size by dragging the lower right corner of the chart with the mouse.

### Add Group

![server_dashboard_chart_group_add_1_en](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_chart_group_add_1_en.png)

* ❶ First, select the desired layout to add a group.
* ❷ Click the **Add Group** button and a popup is displayed to **add the group** as shown below.

![server_dashboard_chart_group_add_2_en](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_chart_group_add_2_en.png)

* ❶ Enter the group name.
* ❷ Select the instance to be viewed on the chart.
    * Up to 10 instances can be registered to be viewed.

### Modify and Delete Group

![server_dashboard_chart_group_modify_delete_1_en.png](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_chart_group_modify_delete_1_en.png)

* ❶ Click **View More** of the group to modify or delete, a drop-down menu is displayed.
* ❷ Click **Edit**, the **Modify Group** window is displayed.
* ❸ Click **Delete** to delete a group.

![server_dashboard_chart_group_modify_delete_2_en.png](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_chart_group_modify_delete_2_en.png)

* ❶ After modifications, click the OK button.

### Add Group Chart

![server_dashboard_chart_group_add_chart_1_en](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_chart_group_add_chart_1_en.png)

* ❶ Add multiple charts by selecting them with the checkbox.
* ❷ Preview the chart you want to add by clicking the text area.

### Change Group Chart Line Color

![server_dashboard_chart_group_modify_series_color_1_en.png](https://static.toastoven.net/prod_rds/22.07.12/server_dashboard_chart_group_modify_series_color_1_en.png)

* ❶ Click the server whose color you want to change from the list, the color change window is displayed.
* ❷ Change the color by clicking the color you want in the color palette at the top.
    * Default colors are specified in the order of the color palette.
* ❸ Change the color by manually entering the color code.
    * 3-digit or 6-digit color codes are supported for manual input.
    * Example) #000 or #000000
* ❹ Change the color by selecting the color you want from the color picker.

## User Group

The users who receive notifications through notification groups and event subscriptions can be managed in groups.

### Create User Group

![user_group_create_0_en](https://static.toastoven.net/prod_rds/22.03.15/user_group_create_0_en.png)

* ❶ Click the **Create User Group** to display a popup to **create a user group**.

![user_group_create_1_en](https://static.toastoven.net/prod_rds/23.06.13/user_group_create_1_en.png)

* ❷ Enter the group name.
* ❸ The notified users are displayed. Clicking the **x** button will exclude notified users.
* ❹ Add users to notified users.
* ❺ Add **all project members** to the notified users.
  * You cannot add individual users. If you do, it is canceled.
  * When sending an alrm using the user group, the alarm is sent to all project members at the time.

### Modify User Group

![user_group_modify_0_en](https://static.toastoven.net/prod_rds/22.03.15/user_group_modify_0_en.png)

* ❶ Click the **Edit** button of the user group to be modified and a popup will appear to **modify the user group**.

![user_group_modify_1_en](https://static.toastoven.net/prod_rds/23.06.13/user_group_modify_1_en.png)

* ❷ After modifying the items, click the **OK** button to modify the user group.

### Delete User Group

![user_group_delete_0_en](https://static.toastoven.net/prod_rds/22.03.15/user_group_delete_0_en.png)

* ❶ Click the **Delete** button of the user group to be deleted.

## Notification Group

Notifications can be received by adding the monitoring settings to the performance indicators of the instance.

### Create Notification Group

![notification_group_create_0_en](https://static.toastoven.net/prod_rds/22.03.15/notification_group_create_0_en.png)

* ❶ Click the **Create Group** button.

![notification_group_create_1_en](https://static.toastoven.net/prod_rds/22.03.15/notification_group_create_1_en.png)

* ❷ Enter the notification group name.
* ❸ Select the notification type. Multiple selections can be made.
* ❹ Set whether or not to enable.
* ❺ Select the instance to be monitored.
* ❻ Select the user group.

### Modify Notification Group

![notification_group_modify_0_en](https://static.toastoven.net/prod_rds/22.03.15/notification_group_modify_0_en.png)

* ❶ Click the **Edit** button of the notification group to be modified.

![notification_group_modify_1_en](https://static.toastoven.net/prod_rds/22.03.15/notification_group_modify_1_en.png)

* ❷ After modifications, click the **OK** button.

### Delete Notification Group

![notification_group_delete_0_en](https://static.toastoven.net/prod_rds/22.03.15/notification_group_delete_0_en.png)

* ❶ The registered notification group can be deleted by clicking the **Delete** button.

### Add Monitoring Setting

![notification_group_watchdog_en](https://static.toastoven.net/prod_rds/22.03.15/notification_group_watchdog_0_en.png)

* ❶ Click the Monitoring Settings button of the notification group to modify the **monitoring settings**.

![notification_group_watchdog_1_en](https://static.toastoven.net/prod_rds/22.03.15/notification_group_watchdog_1_en.png)

* ❷ Click the **Monitoring Settings** button.

![notification_group_watchdog_2_en](https://static.toastoven.net/prod_rds/22.03.15/notification_group_watchdog_2_en.png)

* ❸ Select the item to monitor.
* ❹ Select the comparison method.
* ❺ Enter the threshold. The max allowed value is different depending on the item.
* ❻ Enter the duration.
* ❼ Clicking the Add button registers the monitoring setting. If you click the Cancel button, the monitoring setting won't register.

### Modify and Delete Monitoring Settings

![notification_group_watchdog_3_en](https://static.toastoven.net/prod_rds/22.03.15/notification_group_watchdog_3_en.png)

* ❶ The Monitoring Settings can be modified by clicking the **Edit** button.
* ❷ Clicking the **Delete** button will delete the monitoring setting.

## Separating user permission

* Project members can be granted separate permissions either as RDS for MySQL ADMIN / RDS for MySQL MEMBER.
* RDS for MySQL ADMIN permission holders can use all available features as before.
* RDS for MySQL MEMBER permission holders can use read-only feature.
    * Cannot use any features aimed at instances or create, modify, or delete any instance.
    * Can use alarm-related features on the Notification tab.

## Processlist

### Basic Data Retrieval

![processlist_1_en](https://static.toastoven.net/prod_rds/22.07.12/processlist_1_en.png)

You can view the process list and InnoDB status collected from the DB in the form of chart and table.
The chart shows the count of items collected over time, and you can check the details in the table.

* ❶ Search by the instance name or IP address.
* ❷ Servers that meet the criteria are displayed. The color of the icon on the right changes depending on the server status.
    * Green: Normal
    * Red: Error
    * Gray: Deleted server
* ❸ Select the Process List or InnoDB Status tab to retrieve the information.
* ❹ The chart is updated after setting the retrieval period to the current time.
* ❺ The retrieval period can be modified.
    * The retrieval period must be set within the range of 1 hour.
* ❻ Enter search keywords to search for data within the retrieval period.
* ❼ Set the number of data to retrieve in one page (default: 20).
* ❽ Click **Save CSV** to save all the retrieved data in CSV file format.
* ❾ The collected process list information is displayed after being sorted in descending order of time.
* ➓ Click **Show Details** to check the details for the line.
* ⓫ Click **View** to check the InnoDB Status information for the time.

### Keyword Search

![processlist_search_1_en](https://static.toastoven.net/prod_rds/22.07.12/processlist_search_1_en.png)

* ❶ Enter search keywords to browse through the data fields.
    * Search keywords are not case-sensitive, and multiple keywords can be entered by separating them with a space.
    * If you need to search for a phrase, enclose it in quotation marks ("",'').
        * Example: "for semi-sync" slave
* ❷ The search period is automatically set in the order of the most recent time. The period is set in the unit of 10 minutes, or if there is a lot of collected data, set in a limited unit by limiting to the point in time with more than 1,000 items.
* ❸ Click **Search More** to retrieve additional data with the same unit as above.
* ❹ Click **Reset** to reset all entered search keywords and search period.
* ❺ If you click **Save CSV**, the retrieved result for the entire period is saved regardless of the automatically set search period.

### Chart Retrieval Range Setting

![processlist_zoom_1_en](https://static.toastoven.net/prod_rds/22.07.12/processlist_zoom_1_en.png)

* ❶ You can set the retrieval range by dragging the chart.

![processlist_zoom_2_en](https://static.toastoven.net/prod_rds/22.07.12/processlist_zoom_2_en.png)

* ❶ You can reset the zoom state.
* ❷ When searching in a zoomed-in state, the search is performed only in the zoomed-in range.
* ❸ Click **Save CSV** to save all data in the zoomed-in range.

### Chart Point-in-Time Retrieval

![processlist_select_1_en](https://static.toastoven.net/prod_rds/22.07.12/processlist_select_1_en.png)

* ❶ If you select chart data, only the data at that point in time is retrieved.
* ❷ When searching with chart data selected, the search is performed only in the selected point in time.
* ❸ Click **Save CSV** to save all data in the selected point in time.

## Appendix

### Appendix 1. Guide for DB instance Migration for Hypervisor Maintenance

NHN Cloud updates hypervisor software on a regular basis to enhance security and stability of its infrastructure services.
Instances that are running on a target hypervisor for maintenance must be migrated to a hypervisor which is completed with maintenance.

Migration of DB instance can start on a NHN Cloud console.
Depending on database configuration, select a particular instance to migrate it as well, if its relevant DB instance (e.g. slave instance) is also the target of maintenance.
Follow the guide as below, to use the migration service on console.
Go to the project in which a DB instance for maintenance is located.

#### 1. Check DB instances which are the maintenance targets.

Those with the migration button next to name are the maintenance targets.

![rds_planed_migration_0](https://static.toastoven.net/prod_rds/planned_migration_alarm/image0_en.png)

Put a cursor on the migration button, and you can find its maintenance schedule.

![rds_planed_migration_1](https://static.toastoven.net/prod_rds/planned_migration_alarm/image1_en.png)

#### 2. Make sure you close any application programs that are running on the DB instance.

It is recommended to take appropriate measures so as impact on relevant services can be limited.
Nevertheless, if impact on service is inevitable, contact NHN Cloud Customer Center to be guided further.

#### 3. Select a DB instance for maintenance, click migration, and click OK on window asking of migration.

![rds_planed_migration_2](https://static.toastoven.net/prod_rds/planned_migration_alarm/image2_en.png)

#### 4. Wait until database migration is over.

If instance status remains the same, try 'Refresh'.

![rds_planed_migration_3](https://static.toastoven.net/prod_rds/planned_migration_alarm/image3_en.png)

While migration is underway, operation is not permitted.
An abnormal closure of DB instance migration shall be automatically reported to administrator, and it such case, you'll be contacted by NHN Cloud.

### Appendix 2. Configuration guide for using Federated Storage Engine with RDS

When using Federated Storage Engine, make sure you consider the following.

#### For configuration using RDS as a local node

* Make sure you need to allow the outbound direction to remote nodes.
    * It can be set in the **Backup and Access Control** tab of the DB instance detailed configuration.
    * Please refer to ‘User Access Control’ in ‘#Getting Started’.
* When using a configuration that adds Read Only Slave to RDS that serves as a local node, you need to specify a federated table in replicate-ignore-table of DB Configuration.
    * When configuring Read Only Slave, the federated table is also replicated so that Master and Read Only Slave look at the remote nodes together.
    * In this case, the data input performed in Master is performed in the remote nodes according to the federated settings, and the same input is also performed in Read Only Slave, so replication may be suspended due to a duplicate key error, etc.
    * Make sure you need to configure the settings of replicate-ignore-table so that Read Only Save does not replicate a federated table.
    * It can be set in the DB Configuration tab of the DB instance detailed configuration.

#### For configuration using RDS as a remote node

* Make sure you need to allow the inbound direction to local nodes.
    * It can be set in the **Backup and Access Control** tab of the DB instance detailed configuration.
    * Please refer to 'User Access Control' in '#Getting Started'.