## Database > RDS for MariaDB > Notification

## Event

Event refers to an important event that occurs either by RDS for MariaDB or by user. Event consists of the event type, the date and time of occurrence, the original source and the message. Event can be viewed from the console, and you can receive notifications of event occurrence by email or SMS through subscription. The event type and the possible events are as follows.

| Event Code  | Event Category    | Availability | Description                                                                   |
|-------------|-------------------|--------------|-------------------------------------------------------------------------------|
| BACUP_01_00 | BACKUP            | No           | Backup of DB instance started                                                 |
| BACUP_01_01 | BACKUP            | No           | Backup of DB instance completed                                               |
| BACUP_01_04 | BACKUP            | No           | Backup of DB instance failed                                                  |
| BACUP_02_01 | BACKUP            | Yes          | Backup deleted                                                                |
| BACUP_04_00 | BACKUP            | Yes          | Object storage upload started                                                 |
| BACUP_04_01 | BACKUP            | Yes          | Object storage upload completed                                               |
| BACUP_04_04 | BACKUP            | Yes          | Object storage upload failed                                                  |
| BACUP_05_00 | BACKUP            | Yes          | Backup export started                                                         |
| BACUP_05_01 | BACKUP            | Yes          | Backup exported                                                               |
| BACUP_05_04 | BACKUP            | Yes          | Backup export failed                                                          |
| BACUP_06_01 | BACKUP            | No           | Backup of DB instance failed (Known cause)                                    |
| SECGP_01_01 | DB_SECURITY_GROUP | No           | DB security group created                                                     |
| SECGP_02_00 | DB_SECURITY_GROUP | No           | Changing DB security group started                                            |
| SECGP_02_01 | DB_SECURITY_GROUP | No           | Changing DB security group completed                                          |
| SECGP_02_04 | DB_SECURITY_GROUP | No           | Changing DB security group failed                                             |
| SECGP_03_01 | DB_SECURITY_GROUP | No           | DB security group deleted                                                     |
| INSTC_01_00 | INSTANCE          | No           | Creating DB instance started                                                  |
| INSTC_01_01 | INSTANCE          | No           | Creating DB instance completed                                                |
| INSTC_01_04 | INSTANCE          | No           | Creating DB instance failed                                                   |
| INSTC_02_01 | INSTANCE          | Yes          | DB instance started                                                           |
| INSTC_03_01 | INSTANCE          | Yes          | DB instanced ended                                                            |
| INSTC_04_00 | INSTANCE          | Yes          | Deleting DB instance started                                                  |
| INSTC_04_01 | INSTANCE          | Yes          | Deleting DB instance completed                                                |
| INSTC_04_04 | INSTANCE          | Yes          | Deleting DB instance failed                                                   |
| INSTC_05_00 | INSTANCE          | Yes          | Backup of DB instance started                                                 |
| INSTC_05_01 | INSTANCE          | Yes          | Backup of DB instance completed                                               |
| INSTC_05_04 | INSTANCE          | Yes          | Backup of DB instance failed                                                  |
| INSTC_06_00 | INSTANCE          | Yes          | Restoring DB instance started                                                 |
| INSTC_06_01 | INSTANCE          | Yes          | Restoring DB instance completed                                               |
| INSTC_06_04 | INSTANCE          | Yes          | Restoring DB instance failed                                                  |
| INSTC_07_01 | INSTANCE          | Yes          | Automated backup setting enabled                                              |
| INSTC_08_01 | INSTANCE          | Yes          | Automated backup setting disabled                                             |
| INSTC_09_00 | INSTANCE          | Yes          | Modifying detailed settings started                                           |
| INSTC_09_01 | INSTANCE          | Yes          | Detailed settings modified                                                    |
| INSTC_09_04 | INSTANCE          | Yes          | Detailed settings modification failed                                         |
| INSTC_10_00 | INSTANCE          | Yes          | Changing backup and user access control settings started                      |
| INSTC_10_01 | INSTANCE          | Yes          | Changing backup and user access control settings completed                    |
| INSTC_10_04 | INSTANCE          | Yes          | Changing backup and user access control settings failed                       |
| INSTC_11_01 | INSTANCE          | Yes          | User access control modified                                                  |
| INSTC_13_01 | INSTANCE          | Yes          | Associate Floating IP                                                         |
| INSTC_14_01 | INSTANCE          | Yes          | Disconnected to floating IP                                                   |
| INSTC_15_00 | INSTANCE          | Yes          | Replicating DB instance started                                               |
| INSTC_15_01 | INSTANCE          | Yes          | Replicating DB instance completed                                             |
| INSTC_15_04 | INSTANCE          | Yes          | Replicating DB instance failed                                                |
| INSTC_16_00 | INSTANCE          | Yes          | Promoting DB instance started                                                 |
| INSTC_16_01 | INSTANCE          | Yes          | Promoting DB instance completed                                               |
| INSTC_16_04 | INSTANCE          | Yes          | Promoting DB instance failed                                                  |
| INSTC_21_01 | INSTANCE          | Yes          | DB instance normalized                                                        |
| INSTC_22_01 | INSTANCE          | Yes          | Not enough DB instance storage                                                |
| INSTC_23_01 | INSTANCE          | Yes          | Connecting DB instance failed                                                 |
| INSTC_24_00 | INSTANCE          | Yes          | Changing DB instance type started                                             |
| INSTC_24_01 | INSTANCE          | Yes          | Changing DB instance type completed                                           |
| INSTC_24_04 | INSTANCE          | Yes          | Changing DB instance type failed                                              |
| INSTC_25_00 | INSTANCE          | Yes          | Storage expansion started                                                     |
| INSTC_25_01 | INSTANCE          | Yes          | Storage expanded                                                              |
| INSTC_25_04 | INSTANCE          | Yes          | Storage expansion failed                                                      |
| INSTC_26_00 | INSTANCE          | Yes          | DB instance failover occurred                                                 |
| INSTC_26_01 | INSTANCE          | Yes          | DB instance failover completed                                                |
| INSTC_26_04 | INSTANCE          | Yes          | DB instance failover failed                                                   |
| INSTC_27_01 | INSTANCE          | Yes          | DB instance storage secured                                                   |
| INSTC_27_04 | INSTANCE          | Yes          | Securing DB instance storage failed                                           |
| INSTC_28_01 | INSTANCE          | Yes          | High Availability DB Instance started                                         |
| INSTC_29_01 | INSTANCE          | Yes          | High Availability DB Instance ended                                           |
| INSTC_30_01 | INSTANCE          | Yes          | Replication stopped                                                           |
| INSTC_31_00 | INSTANCE          | Yes          | High availability recovery of DB instance with a completed failover started   |
| INSTC_31_01 | INSTANCE          | Yes          | High availability recovery of DB instance with a completed failover completed |
| INSTC_31_04 | INSTANCE          | Yes          | High availability recovery of DB instance with a completed failover failed    |
| INSTC_32_00 | INSTANCE          | Yes          | High availability rebuilding DB instance with a completed failover started    |
| INSTC_32_01 | INSTANCE          | Yes          | High availability rebuilding DB instance with a completed failover completed  |
| INSTC_32_04 | INSTANCE          | Yes          | High availability rebuilding DB instance with a completed failover failed     |
| INSTC_33_00 | INSTANCE          | Yes          | High availability removal of DB instance with a completed failover started    |
| INSTC_33_01 | INSTANCE          | Yes          | High availability removal of DB instance with a completed failover completed  |
| INSTC_33_04 | INSTANCE          | Yes          | High availability removal of DB instance with a completed failover failed     |
| INSTC_34_01 | INSTANCE          | Yes          | High availability suspended                                                   |
| INSTC_34_04 | INSTANCE          | Yes          | High availability suspension failed                                           |
| INSTC_35_01 | INSTANCE          | Yes          | High availability restarted                                                   |
| INSTC_35_04 | INSTANCE          | Yes          | High availability restart failed                                              |
| INSTC_36_01 | INSTANCE          | Yes          | Instance restart using failover                                               |
| INSTC_36_04 | INSTANCE          | Yes          | Instance restart using failover failed                                        |
| INSTC_37_01 | INSTANCE          | Yes          | DB User created                                                               |
| INSTC_37_04 | INSTANCE          | Yes          | DB user creation failed                                                       |
| INSTC_38_01 | INSTANCE          | Yes          | DB user updated                                                               |
| INSTC_38_04 | INSTANCE          | Yes          | DB user update failed                                                         |
| INSTC_39_01 | INSTANCE          | Yes          | DB user deleted                                                               |
| INSTC_40_01 | INSTANCE          | Yes          | DB schema created                                                             |
| INSTC_40_04 | INSTANCE          | Yes          | DB schema creation failed                                                     |
| INSTC_41_01 | INSTANCE          | Yes          | DB schema deleted                                                             |
| INSTC_42_04 | INSTANCE          | No           | CPU cores limit                                                               |
| INSTC_43_04 | INSTANCE          | No           | RAM capacity limit                                                            |
| INSTC_44_04 | INSTANCE          | No           | Individual volume limit                                                       |
| INSTC_45_04 | INSTANCE          | No           | Total project volume limit                                                    |
| INSTC_46_04 | INSTANCE          | No           | Read-only slaves limit                                                        |
| INSTC_47_00 | INSTANCE          | Yes          | DB instance backup and export started                                         |
| INSTC_47_01 | INSTANCE          | Yes          | DB instance backed up and exported                                            |
| INSTC_47_04 | INSTANCE          | Yes          | DB instance backup and export failed                                          |
| INSTC_48_00 | INSTANCE          | Yes          | DB instance restoration using backup from the object storage started          |
| INSTC_48_01 | INSTANCE          | Yes          | DB instance using backup from the object storage restored                     |
| INSTC_48_04 | INSTANCE          | Yes          | DB instance restoration using backup from the object storage failed           |
| INSTC_49_00 | INSTANCE          | Yes          | DB instance force restart                                                     |
| INSTC_50_00 | INSTANCE          | Yes          | Backup export started                                                         |
| INSTC_50_01 | INSTANCE          | Yes          | Backup exported                                                               |
| INSTC_50_04 | INSTANCE          | Yes          | Backup export failed                                                          |
| INSTC_51_01 | INSTANCE          | Yes          | Backup of DB instance failed                                                  |
| INSTC_52_01 | INSTANCE          | Yes          | DB instance backup and export failed                                          |
| INSTC_53_00 | INSTANCE          | Yes          | Stopping DB instance started                                                  |
| INSTC_53_01 | INSTANCE          | Yes          | Stopping DB instance completed                                                |
| INSTC_53_04 | INSTANCE          | Yes          | Stopping DB instance failed                                                   |
| INSTC_54_00 | INSTANCE          | Yes          | DB instance replication rebuilding started                                    |
| INSTC_54_01 | INSTANCE          | Yes          | DB instance replication rebuilding completed                                  |
| INSTC_54_04 | INSTANCE          | Yes          | DB instance replication rebuilding failed                                     |
| INSTC_55_01 | INSTANCE          | Yes          | Failover restart due to replication delay failed                              |
| INSTC_56_00 | INSTANCE          | Yes          | Changing DB instance security group started                                   |
| INSTC_56_01 | INSTANCE          | Yes          | Changing DB instance security group completed                                 |
| INSTC_56_04 | INSTANCE          | Yes          | Changing DB instance security group failed                                    |
| INSTC_57_00 | INSTANCE          | Yes          | Changing DB instance with a completed failover to normal instance started     |
| INSTC_57_01 | INSTANCE          | Yes          | Changing DB instance with a completed failover to normal instance completed   |
| INSTC_57_04 | INSTANCE          | Yes          | Changing DB instance with a completed failover to normal instance failed      |
| INSTC_58_00 | INSTANCE          | Yes          | Changing parameter group started                                              |
| INSTC_58_01 | INSTANCE          | Yes          | Changing parameter group completed                                            |
| INSTC_58_04 | INSTANCE          | Yes          | Changing parameter group failed                                               |
| INSTC_59_00 | INSTANCE          | Yes          | Applying parameter group changes started                                      |
| INSTC_59_01 | INSTANCE          | Yes          | Applying parameter group changes completed                                    |
| INSTC_59_04 | INSTANCE          | Yes          | Applying parameter group changes failed                                       |
| INSTC_60_00 | INSTANCE          | Yes          | DB instance migration started                                                 |
| INSTC_60_01 | INSTANCE          | Yes          | DB instance migration completed                                               |
| INSTC_60_04 | INSTANCE          | Yes          | DB instance migration failed                                                  |
| INSTC_61_00 | INSTANCE          | Yes          | Candidate master rebuilding started                                           |
| INSTC_61_01 | INSTANCE          | Yes          | Candidate master rebuilding completed                                         |
| INSTC_61_04 | INSTANCE          | Yes          | Candidate master rebuilding failed                                            |
| INSTC_62_00 | INSTANCE          | Yes          | DB engine version upgrade started                                             |
| INSTC_62_01 | INSTANCE          | Yes          | DB engine version upgrade completed                                           |
| INSTC_62_04 | INSTANCE          | Yes          | DB engine version upgrade failed                                              |
| INSTC_63_01 | INSTANCE          | Yes          | Decrypt DB instance binary logs                                               |
| INSTC_64_04 | INSTANCE          | Yes          | DB engine version upgrade pre-check failed                                    |
| INSTC_65_00 | INSTANCE          | Yes          | Authentication plugin activation started                                      |
| INSTC_65_01 | INSTANCE          | Yes          | Authentication plugin activation completed                                    |
| INSTC_65_04 | INSTANCE          | Yes          | Authentication plugin activation failed                                       |
| INSTC_66_00 | INSTANCE          | Yes          | Force promoting DB instance started                                           |
| INSTC_66_01 | INSTANCE          | Yes          | Force promoting DB instance completed                                         |
| INSTC_66_04 | INSTANCE          | Yes          | Force promoting DB instance failed                                            |
| INSTC_67_00 | INSTANCE          | Yes          | OS version upgrade started                                                    |
| INSTC_67_01 | INSTANCE          | Yes          | OS version upgrade ended                                                      |
| INSTC_67_04 | INSTANCE          | Yes          | OS version upgrade failed                                                     |
| INSTC_68_01 | INSTANCE          | Yes          | Network communication failed                                                  |
| INSTC_69_00 | INSTANCE          | Yes          | Waiting for manual control of failover                                        |
| INSTC_69_01 | INSTANCE          | Yes          | Manual control of failover succeeded                                          |
| INSTC_69_04 | INSTANCE          | Yes          | Manual control of failover timeout                                            |
| INSTC_70_01 | INSTANCE          | Yes          | High availability normalized                                                  |
| INSTC_71_01 | INSTANCE          | Yes          | High availability stopped                                                     |
| INSTC_73_00 | INSTANCE          | Yes          | Auto scale storage started                                                    |
| INSTC_73_01 | INSTANCE          | Yes          | Auto scale storage completed                                                  |
| INSTC_73_04 | INSTANCE          | Yes          | Auto scale storage failed                                                     |
| JOB_01_04   | JOB               | Yes          | Job execution failed                                                          |
| TENAT_01_04 | TENANT            | Yes          | CPU cores limit                                                               |
| TENAT_02_04 | TENANT            | Yes          | RAM capacity limit	                                                           |
| TENAT_03_04 | TENANT            | Yes          | Individual volume limit                                                       |
| TENAT_04_04 | TENANT            | Yes          | Total project volume limit                                                    |
| TENAT_05_04 | TENANT            | Yes          | Read-only slaves limit                                                        |

## Subscribe to Event

You can subscribe to events by event type, code, and source. When you subscribe by event type, you will be notified of all the event codes included in the event type. If the notification is too broad, you can subscribe by event code and source. You can select only project members as the users to receive notifications. By default, event notifications are sent by email, and additional event notifications are sent by SMS only if mobile phone number with real name authentication is registered.

![event_subscription_01_en](https://static.toastoven.net/prod_rds/mariadb/23.04.11/event_subscription_01_en.png)

* ❶ When you click **Register Event Subscription**, a pop-up window appears to subscribe to events.
* ❷ Select the event type you want to subscribe to. Event code that you can select can be changed depending on the event type.
* ❸ Select the event code you want to subscribe to.
* ❹ Select the event source you want to subscribe to.
* ❺ Select the user group to receive event notifications.
* ❻ Select whether to enable or not. If it is not enabled, no event notification is to be sent.

## User Group

You can manage users as groups to receive notifications. Notification target must be registered as a project member. If the users in the user group are excluded from the project members, they will not be notified even if they belong to the user group.

> [Caution] If there is no mobile phone information for the reason of not performing real name authentication, you will not receive SMS notifications.

### Create User Group

![user_group_01_en](https://static.toastoven.net/prod_rds/mariadb/23.06.13/user_group_01_en.png)

* ❶ When you click**Create user group**, a pop-up screen appears where you can create user groups.
* ❷ Users added to the user group appear.
* ❸ Press **x** to exclude added users.
* ❹ If there are many users in the user list, you can limit the results by entering search criteria.
* ❺ Add **all project members** to the notified users.
  * You cannot add individual users. If you do, it is canceled.
  * When sending an alrm using the user group, the alarm is sent to all project members at the time.
* ❻ Click **Add** to add a user to the user group.

## Notification Group

Notification group allows you to receive notifications about performance metrics. Specify which instances are monitored in the notification group and which user groups are notified. Set the thresholds and conditions for performance metrics to be notified through the monitoring settings. Once the set metrics meet the conditions in the monitoring settings, notifications to the associated user groups are sent. Notifications are sent by SMS or email, depending on the type of notification set in the
notification group.

### Create Notification Group

![notification_group_01_en.png](https://static.toastoven.net/prod_rds/mariadb/23.04.11/notification_group_01_en.png)

* ❶ When you click **Create Group**, a pop-up appears where you can create an notification group.
* ❷ Select how you want to be notified.
* ❸ Notification groups that are not enabled do not send notifications.
* ❹ Select a DB instance to be monitored.
* ❺ Select a group of users to be notified.

## Monitoring Settings

The monitoring settings consist of items, comparison method, threshold, and duration. Compare the performance metrics and threshold values of monitoring items to determine if the conditions are met. Notification is sent if the condition is met continuously for longer than the duration. For example, if the CPU usage rate is greater than 90% and the duration is 5 minutes, sends notifications to users defined in user groups, when the DB instance linked with that notification group has sustained CPU
usage rate of 90% or higher for more than 5 minutes. Notification is not sent, even though CPU usage rate reaches 90% or higher but it falls below 90% within 5 minutes.

### Monitoring Settings Items

Performance metrics items that can be monitored are as follows.

### Add Monitoring Setting

![notification_group_02_en.png](https://static.toastoven.net/prod_rds/mariadb/23.04.11/notification_group_02_en.png)

* ❶ When you click **Monitoring Settings**, a pop-up appears where you can change the monitoring settings.
* ❷ Click **Add Monitoring Settings** to add new monitoring settings.
* ❸ Enter the items you want to monitor and the comparison method, threshold value, and the duration, and then click **Add**.

### Change and Delete Monitoring Settings

![notification_group_03_en.png](https://static.toastoven.net/prod_rds/mariadb/23.04.11/notification_group_03_en.png)

* ❶ Click the button to change the added monitoring settings.
* ❷ Click the button to delete the added monitoring settings. 
