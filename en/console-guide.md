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
    * Floating IP: Enable Floating IP, to connect with external networks of TOAST Cloud. 
    * Flavor: Select a type of DB instance. 
    * Storage Type: Specify volume type of DB instance.
        * Either HDD or SSD.
    * Storage: Enter volume size of DB instance.
        * Between 20GB and 2,000GB  
    * Availability Zone: Select an area where DB instance is to be created.
    * High Availability: To create database instances, the candidate master is created at a different availability zone from the master.
    * Ping Interval: 고가용성 사용 시, Master 인스턴스 상태를 확인하는 시간 간격을 설정합니다. 4회 실패 시 장애로 식별합니다.
        * 1초~600초 사이로 설정할 수 있습니다.
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
* 쿼리 지연 대기 시간: 백업 수행 시에 FLUSH TABLES WITH READ LOCK 지연 대기 시간을 설정할 수 있습니다. 
  * 0~21600 사이 값으로 설정할 수 있습니다.
* Backup Retention Period: Select more than a day, to allow auto backups. 
    Select **N/A**, and auto backup is not enabled. 
* Backup Start Time: Auto backup starts at some point between start time and duration.  
    Duration refers to time when backup starts: but, not that backup ends within duration.  
* User Access Control: Enter accessible users to DB instance in the CIDR format. 
    Unregistered IPs for user access control are not accessible. 
    접근 제어 시, 방향 설정에서 `수신/송신`에 대해 각각 허용 여부를 선택합니다.

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

## DB Instances

### High Availability 

* Measures can be taken against failure which occurs when a candidate master is created at a different availability zone.
* To restart a highly available instance, select [Restart by Taking Measures against Failure] to replace the master with the candidate master.
* For those instances using high availability, access information does not change with partial changes in option, but the master and the candidate master instances may be interchanged.
* With a failover for high availability instance, the new master instance does not inherit the backup of the existing master instance.

> [Note] For high availability instances, use MySQL query statement to force replication of other instances or master of external MySQL, and then high availability and some features do not operate.    

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

* DB instances can be created in all types provided by TOAST Compute & Network.  

### Backups 

* RDS executes all backups, and then uploads and saves newly created backups on its own object storage.
* For auto backups, backup volume is provided for free, as much as the data volume of the original instance.
* If you don't want extra charges, be aware of the backup cycle. 
* Performance may be degraded during backups. 
* It is recommended to back up during when service load is low. 
* TOAST RDS supports restoration at a specified point of time. 
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

## Monitor 

* RDS periodically collects monitoring items required for database operations and usage, and shows them on a chart. 
* To check monitoring items of a particular DB instance, select a particular DB instance from the **DB Instance List** and select **Monitoring**. 

![rds_10_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_10_20210112_en.png)

* To check monitoring items of all DB instances, select a DB instance on the **Monitoring** tab and click **Add**. 
* Any change in chart range, interval, type and item affects all DB instances where changes are added.  

![rds_11_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_11_20210112_en.png)

* Buttons are available to easily adjust chart ranges. 
* At each press of the button, like 1 hour or 6 hours, it is automatically calculated and updated as of the current time.
<br/>
* Chart intervals become available depending on the chart range: 
    * Within 2 hours: 1 minute, 10 minutes
    * Within 12 hours: 10 minutes, 1 hour
    * Within 4 days: 1 hour, 6 hours
    * Within 2 weeks: 6 hours, 1 day
    * Others: 1 day
* Chart type supports values at the maximum and on average.

> [Note] Monitoring Data for Each RDS DB are temporarily saved and in a database called 'rds_maintenace' of user DB instance, and then deleted. Hence, even if such instance shows no sign of operations after created, its graph may show periodic movement by some monitoring items. 
> [Note] If data on rds_maintenance database is manipulated, collected monitoring data may not be precise. 

### Monitoring Items 

* RDS supports the monitoring items as follows: 

![rds_12_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_12_20210112_en.png)

### Log Files 

* View or download log files without accessing DB instances. 
* Select **DB Instances** and click **Events & Logs**, to find error.log, slow_query.log, and general.log files. 

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


## Events 

* RDS automatically leaves significant events that occur in DB instances. 
* To check events that occur at a particular database instance, select a DB instance and go to **Events & Logs** on **Detail Setting**.  
* To look through all events that occur in my DB instances, check on the **Event** tab. 

![rds_16_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_16_20210112_en.png)

* **Type** shows the resource an event is occurred.  
    * INSTANCE: An event related to DB instances. 
    * BACKUP: An event related to backups. 
* **Identifier**refers to a resource where an event occurs. 
    * If the type is INSTANCE, DB instance name shows.
    * If the type is BACKUP, backup ID shows. 

## Notification

RDS delivers notifications on particular events occurring  at a resource to group of receivers. 

1. To set a notification, click **Create** on the **Notification** tab. 
2. Enter name of notification and select events and resources to set from **Notification Setting**. 
   * After setting is done, click **Add**. 
3. To create a group of receivers, click **Create**. 
4. On the pop-up of [Receiving Target], enter name of a recipient group. Click and select a project member to receive notification messages.
   * After adding is done, click **Add**. 
5. Then, click **Create** at the bottom. 
6. After setting is completed, click **Create**.  

![rds_17_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_17_20210112_en.png)

Now, when conditions are met as configured, notifications are sent via mail addresses and phone numbers of the receivers. 

![rds_18_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_18_20210112_en.png)

> [Note] Unless receivers are checked to select, mail or SMS messages cannot be sent.  

## Appendix 1. Guide for Database Instance Migration for Hypervisor Maintenance

TOAST updates hypervisor software on a regualr basis to enhance security and stability of its infrastructure services. Instances that are running on a target hypervisor for maintenance must be migrated to a hypervisor which is completed with maintenance.

Migration of database instance can start on a TOAST console.
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
Nevertheless, if impact on service is inevitable, contact TOAST Customer Center to be guided further.

### 3. Select a database instance for maintenance, click migration, and click OK on window asking of migration.

![rds_planed_migration_2](https://static.toastoven.net/prod_rds/planned_migration_alarm/image2_en.png)

### 4. Wait until database migration is over.

If instance status remains the same, try ‘Refresh’.

![rds_planed_migration_3](https://static.toastoven.net/prod_rds/planned_migration_alarm/image3_en.png)

While migration is underway, operation is not permitted.
An abnormal closure of database instance migration shall be automatically reported to administrator, and it such case, you’ll be contacted by TOAST.
