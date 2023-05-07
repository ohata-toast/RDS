## Database > RDS for MySQL > Notification

## Event

Event refers to an important event that occurs either by RDS for MySQL or by user. Event consists of the event type, the date and time of occurrence, the original source and the message. Event can be viewed from the web console, and you can receive notifications of event occurrence by email or SMS through subscription. The event type and the possible events are as follows.

## Subscribe to Event

You can subscribe to events by event type, code, and source. When you subscribe by event type, you will be notified of all the event codes included in the event type. If the notification is too broad, you can subscribe by event code and source. You can select only project members as the users to receive notifications. By default, event notifications are sent by email, and additional event notifications are sent by SMS only if mobile phone number with real name authentication is registered.

![event_subscription_01_ko](https://static.toastoven.net/prod_rds/23.04.11/event_subscription_01_en.png)

* ❶ When you click**Register Event Subscription**, a pop-up window appears to subscribe to events.
* ❷ Select the event type you want to subscribe to. Event code that you can select can be changed depending on the event type. 
* ❸ Select the event code you want to subscribe to.
* ❹ Select the event source you want to subscribe to.
* ❺ Select the user group to receive event notifications.
* ❻ Select whether to enable or not. If it is not enabled, no event notification is to be sent.

## User Group

You can manage users as groups to receive notifications. Notification target must be registered as a project member. If the users in the user group are excluded from the project members, they will not be notified even if they belong to the user group.

> [Caution] If there is no mobile phone information for the reason of not performing real name authentication, you will not receive SMS notifications.

### Create User Group

![user_group_01_en](https://static.toastoven.net/prod_rds/23.04.11/user_group_01_en.png)

* ❶ When you click**Create user group**, a pop-up screen appears where you can create user groups.
* ❷ Users added to the user group appear.
* ❸ Press **x** to exclude added users.
* ❹ If there are many users in the user list, you can limit the results by entering search criteria.
* ❺ Click **Add All** to add all project members to the user group.
* ❻ Click **Add** to add a user to the user group.

## Notification Group

Notification group allows you to receive notifications about performance metrics. Specify which instances are monitored in the notification group and which user groups are notified. Set the thresholds and conditions for performance metrics to be notified through the monitoring settings. Once the set metrics meet the conditions in the monitoring settings, notifications to the associated user groups are sent. Notifications are sent by SMS or email, depending on the type of notification set in the notification group.

### Create Notification Group

![notification_group_01_en.png](https://static.toastoven.net/prod_rds/23.04.11/notification_group_01_en.png)

* ❶ When you click **Create Group**, a pop-up appears where you can create an notification group.
* ❷ Select how you want to be notified.
* ❸ Notification groups that are not enabled do not send notifications.
* ❹ Select a DB instance to be monitored.
* ❺ Select a group of users to be notified.

## Monitoring Settings

The monitoring settings consist of items, comparison method, threshold, and duration. Compare the performance metrics and threshold values of monitoring items to determine if the conditions are met. Notification is sent if the condition is met continuously for longer than the duration. For example, if the CPU usage rate is greater than 90% and the duration is 5 minutes, sends notifications to users defined in user groups, when the DB instance linked with that notification group has sustained CPU usage rate of 90% or higher for more than 5 minutes. Notification is not sent, even though CPU usage rate reaches 90% or higher but it falls below 90% within 5 minutes. 

### Monitoring Settings Items

Performance metrics items that can be monitored are as follows.

### Add Monitoring Setting

![notification_group_02_en.png](https://static.toastoven.net/prod_rds/23.04.11/notification_group_02_en.png)

* ❶ When you click **Monitoring Settings**, a pop-up appears where you can change the monitoring settings.
* ❷ Click **Add Monitoring Settings** to add new monitoring settings.
* ❸ Enter the items you want to monitor and the comparison method, threshold value, and the duration, and then click **Add**.

### Change and Delete Monitoring Settings

![notification_group_03_en.png](https://static.toastoven.net/prod_rds/23.04.11/notification_group_03_en.png)

* ❶ Click the button to change the added monitoring settings.
* ❷ Click the button to delete the added monitoring settings. 