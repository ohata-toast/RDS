## Database > RDS for MySQL > Monitoring

Various events that occur during various tasks related to DB instance and various performance indicators of DB instance can be monitored.
Various performance indicators can be checked in charts using the server dashboard.
When configuring the monitoring settings of the notification group, notifications will be received via email or SMS regarding the modifications after detecting the changes.

## Event

An event refers to important incident incurred by RDS for MySQL or the user. An event is comprised of a type, date of occurrence, event source, and message. It can be checked on the web console, and notification can be received via email and SMS through subscription. The event types and event occurrences are as follows.

| Event Type | Event Code | Event Message |
| --- | --- | --- |
| INSTANCE | INSTC_02_01 | DB instance started |
| INSTANCE | INSTC_03_01 | DB instance stopped |
| INSTANCE | INSTC_04_00 | DB instance deletion started |
| INSTANCE | INSTC_04_01 | DB instance deleted |
| INSTANCE | INSTC_04_04 | DB instance deletion failed |
| INSTANCE | INSTC_05_00 | DB instance backup started |
| INSTANCE | INSTC_05_01 | DB instance backed up |
| INSTANCE | INSTC_05_04 | DB instance backup failed |
| INSTANCE | INSTC_06_00 | DB instance restoration started |
| INSTANCE | INSTC_06_01 | DB instance restored |
| INSTANCE | INSTC_06_04 | DB instance restoration failed |
| INSTANCE | INSTC_07_01 | Automated backup setting enabled |
| INSTANCE | INSTC_08_01 | Automated backup setting disabled |
| INSTANCE | INSTC_09_00 | Modifying detailed settings started |
| INSTANCE | INSTC_09_01 | Detailed settings modified |
| INSTANCE | INSTC_09_04 | Detailed settings modification failed |
| INSTANCE | INSTC_10_00 | Backup settings modification started |
| INSTANCE | INSTC_10_01 | Backup settings modified |
| INSTANCE | INSTC_10_04 | Backup settings modification failed |
| INSTANCE | INSTC_11_01 | User access control modified |
| INSTANCE | INSTC_12_00 | DB configuration modification started |
| INSTANCE | INSTC_12_01 | DB configuration modified |
| INSTANCE | INSTC_12_04 | DB configuration modification failed |
| INSTANCE | INSTC_13_01 | Connected to floating IP |
| INSTANCE | INSTC_14_01 | Disconnected to floating IP |
| INSTANCE | INSTC_15_00 | DB instance replication started |
| INSTANCE | INSTC_15_01 | DB instance replicated |
| INSTANCE | INSTC_15_04 | DB instance replication failed |
| INSTANCE | INSTC_16_00 | DB instance promotion started |
| INSTANCE | INSTC_16_01 | DB instance promoted |
| INSTANCE | INSTC_16_04 | DB instance promotion failed |
| INSTANCE | INSTC_21_01 | DB instance normalized |
| INSTANCE | INSTC_22_01 | Insufficient DB instance storage |
| INSTANCE | INSTC_23_01 | DB instance connection failed |
| INSTANCE | INSTC_24_00 | Instance type modification started |
| INSTANCE | INSTC_24_01 | Instance type modified |
| INSTANCE | INSTC_24_04 | Instance type modification failed |
| INSTANCE | INSTC_25_00 | Storage expansion started |
| INSTANCE | INSTC_25_01 | Storage expanded |
| INSTANCE | INSTC_25_04 | Storage expansion failed |
| INSTANCE | INSTC_26_00 | failover occurred |
| INSTANCE | INSTC_26_01 | failover ended |
| INSTANCE | INSTC_26_04 | failover failed |
| INSTANCE | INSTC_27_01 | DB instance storage secured |
| INSTANCE | INSTC_28_01 | HA DB instance started |
| INSTANCE | INSTC_29_01 | HA DB instance stopped |
| INSTANCE | INSTC_30_01 | Replication stopped |
| INSTANCE | INSTC_34_01 | High availability suspended |
| INSTANCE | INSTC_34_04 | High availability suspension failed |
| INSTANCE | INSTC_35_01 | High availability restarted |
| INSTANCE | INSTC_35_04 | High availability restart failed |
| INSTANCE | INSTC_36_01 | Instance restart using failover |
| INSTANCE | INSTC_36_04 | Instance restart using failover failed |
| INSTANCE | INSTC_37_01 | DB User created |
| INSTANCE | INSTC_37_04 | DB user creation failed |
| INSTANCE | INSTC_38_01 | DB user updated |
| INSTANCE | INSTC_38_04 | DB user update failed |
| INSTANCE | INSTC_39_01 | DB user deleted |
| INSTANCE | INSTC_40_01 | DB schema created |
| INSTANCE | INSTC_40_04 | DB schema creation failed |
| INSTANCE | INSTC_41_01 | DB schema deleted |
| INSTANCE | INSTC_47_00 | DB instance backup and export started |
| INSTANCE | INSTC_47_01 | DB instance backed up and exported |
| INSTANCE | INSTC_47_04 | DB instance backup and export failed |
| INSTANCE | INSTC_48_00 | DB instance restoration using backup from the object storage started |
| INSTANCE | INSTC_48_01 | DB instance using backup from the object storage restored |
| INSTANCE | INSTC_48_04 | DB instance restoration using backup from the object storage failed |
| INSTANCE | INSTC_49_00 | DB instance force restart |
| INSTANCE | INSTC_50_00 | Backup export started |
| INSTANCE | INSTC_50_01 | Backup exported |
| INSTANCE | INSTC_50_04 | Backup export failed |
| BACKUP | BACUP_02_01 | Backup deleted |
| BACKUP | BACUP_04_00 | Object storage upload started |
| BACKUP | BACUP_04_01 | Object storage uploaded |
| BACKUP | BACUP_04_04 | Object storage upload failed |
| BACKUP | BACUP_05_00 | Backup export started |
| BACKUP | BACUP_05_01 | Backup exported |
| BACKUP | BACUP_05_04 | Backup export failed |
| TENANT | TENAT_01_04 | CPU cores limit |
| TENANT | TENAT_02_04 | RAM capacity limit |
| TENANT | TENAT_03_04 | Individual volume limit |
| TENANT | TENAT_04_04 | Total project volume limit |
| TENANT | TENAT_05_04 | Read-only slaves limit |

### Event Subscription

If subscribed to an event, a notification will be received via email and SMS when the event occurs. Notifications are sent to users of the user group subscribed to the event. Subscription can be subdivided by event type, event code, and event source. In order to temporarily stop the notifications, modify the enabled event subscription. If disabled, notifications are not sent.

## Server Dashboard

The performance indicators can be visualized in charts in the server dashboard. Indicators are collected once every minute and retained for up to a year. The indicator data is aggregated as average values in units of 1 minute, 5 minutes, 30 minutes, 2 hours, and 1 day.

### Layout

The layout must be first configured to view the chart. The layout consists of various charts and each chart location and size is saved. 
RDS for MySQL provides two default layouts: **default system index** and **default MySQL index**. The user cannot modify nor delete the default layout.

### Chart

Various performance indicators of DB instances can be viewed as charts. Each performance indicators consists of different chart forms.
Below are the charts supported by RDS for MySQL.

| Chart | Indicators (unit) |
| --- | --- |
| CPU usage | cpu used (%) |
| CPU details | cpu user (%)<br> cpu system (%)<br>cpu nice (%)<br>cpu IO wait(%) |
| Memory usage | memory used (%) |
| Memory details | memory used (bytes)<br> memory buffers (bytes)<br> memory cached (bytes)<br> memory free (bytes) |
| Swap usage | swap used (bytes)<br> swap total (bytes) |
| Storage usage | storage used (%) |
| Storage IO | disk read (bytes)<br> disk write (bytes) |
| Network data transfer | nic incoming (bytes)<br> nic outgoing (bytes) |
| CPU load average | 1m<br> 5m<br> 15m |
| Queries Per Second | qps |
| Connection | total<br> running<br> cached |
| Connection Ratio | ratio (%) |
| Database Activity | select<br> insert<br> update<br> delete<br> replace<br> call<br> |
| Buffer Pool | buffer pool total (bytes)<br> buffer pool used (%) |
| Slow Query | counts |
| Replication delay | sec (seconds) |
| Row Access | index<br> full scan |

## Notification Group

The notification group can receive notification regarding performance indicators.
Specify which instances to monitor and the user group to be notified in the notification group.
Set threshold and conditions for performance indicators to be notified through the monitoring settings.
A notification is sent when the configured indicators meet the conditions of the monitoring setting.
A notification is sent via SMS or email according to the configured notification type in the notification group,.

### Monitoring Settings

The monitoring settings consist of items, comparison method, threshold, and duration. Duration is used when the threshold specified by the monitoring target is reached and when that duration is designated as a condition. For example, if the CPU usage threshold is over 90% for 5 minutes, the user in the user group is notified when the CPU usage rate of the server linked to the notification group is over 90% for over 5 minutes. If the CPU usage is over 90% but falls below 90% within 5 minutes, the notification is not sent.

## User Group

Users who receive notifications can be managed in groups. The notification targets must be registered as project members.
If the users in the user group are excluded from the project members, they will not be notified even if they belong in the user group.

> [Caution] If there is no mobile phone information due to no user verification, SMS notifications cannot be received.
