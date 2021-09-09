## Database > RDS for MySQL > 控制台使用指南

## 开始

若欲使用RDS for MysQL，应先创建DB实例。可利用如下方法创建DB实例。

* 在**Console > Database > RDS for MySQL**的**DB Instance **标签中单击左上端的**+创建**按钮，如下图所示，在页面下端出现输入界面。

![rds_01_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_01_20210112_zh.png)

* **具体设置**界面中显示的必需项目全部输入完成后，单击界面右上端的**下一步**按钮。
    * DB Instance:输入DB实例名。
    * 说明：输入DB实例的说明。
    * DB Engine:选择要创建的数据库引擎版本。
    * DB Port:输入数据库端口号。可在10000~12000之间进行设置。
    * DB User ID:创建数据库时，输入要创建的管理员账号ID。
    * DB Password:创建数据库时，输入要创建的管理员账号密码。
    * VPC Subnet:选择要创建的DB实例与要进行private network通信的Compute & Network服务的子网。
    * Floating IP:若欲与NHN Cloud云外部网络连接，设置为使用Floating IP。
    * Flavor:选择DB实例的类型。
    * Storage类型：指定DB实例卷的类型。
        * 可选择HDD及SSD。
    * Storage:输入DB实例卷的大小。
        * 可创建为20GB~2,000GB的大小。
    * Availabillity Zone:选择要创建DB实例的区域。
    * 高可用性：创建DB实例时，在与Master不同的Availability Zone创建Candidate Master。
    * Ping Interval: 고가용성 사용 시, Master 인스턴스 상태를 확인하는 시간 간격을 설정합니다. 4회 실패 시 장애로 식별합니다.
        * 1초~600초 사이로 설정할 수 있습니다.
    * DB文件加密：加密用户数据文件及备份文件。
    * 默认警报：可登记DB实例事件中与提前定义事件相关的警报。
        * 使用默认警报时，应选择接收组。

> [参考] 若所选Compute & Network服务的VPC子网未与互联网网关连接，则无法使用浮动IP。
> [参考] VPC子网一经选择无法更改。
> [参考] Candidate Master实例必须创建于与Master不同的Availability Zone，不显示在列表中。
> [参考] 实例列表按照各实例的创建顺序排列，Candidate Master在Master的高可用性选项使用时创建，因此进行故障处理后实例的顺序可能发生更改。
> [参考] 若使用DB文件加密功能，性能会有所减少。
> [参考] 使用默认警报时，自动登记相应实例的警报，名称设置为”{实例名}-default”。登记的警报可更改及删除，应用的实例也可更改。


在**备份&Access控制**界面中指定备份信息。

![backup_and_access_0_ko](https://static.toastoven.net/prod_rds/21.09.14/backup_and_access_0_ko.png)

* 设置自动备份及访问控制后，单击**下一步**按钮。
* 쿼리 지연 대기 시간: 백업 수행 시에 FLUSH TABLES WITH READ LOCK 지연 대기 시간을 설정할 수 있습니다. 
  * 0~21600 사이 값으로 설정할 수 있습니다.
* 备份保存期限：若欲进行自动备份，请选择1天以上。
    若选择**无**，则不进行自动备份。
* 备份开始时间：自动备份从备份开始时间至Duration之间任意的时间开始。
    Duration指开始备份的时间。不意味着在Duration中备份结束。
* 用户访问控制：以CIDR格式输入可访问DB实例的用户。
    未注册于用户访问控制中的IP无法连接。
    접근 제어 시, 방향 설정에서 `수신/송신`에 대해 각각 허용 여부를 선택합니다.

可在DB Configuration界面中更改设置值。

![db_configuration_0_zh](https://static.toastoven.net/prod_rds/21.09.14/db_configuration_0_zh.png)

* 更改所需设置值后，单击**创建**按钮。
* 最后单击**确认**按钮，创建DB实例。
* 创建需要几到几十分钟的时间。

### 连接DB实例

选择创建的DB实例，可确认详细设置。
在实例[具体设置]的[访问信息]中可以确认可访问的域信息。
Floating IP未设置为“使用”的DB实例无法从外部访问。

1.为测试从外部连接，单击右上方的**更改**按钮。
2.将浮动IP项目修改为**使用**。
3.单击**确定**按钮，反映修改项。

![instance_detail_0_zh](https://static.toastoven.net/prod_rds/21.09.14/instance_detail_0_zh.png)

设置后浮动IP生成，可确认是否能从外部连接。

![instance_detail_1_zh](https://static.toastoven.net/prod_rds/21.09.14/instance_detail_1_zh.png)

以下为MySQL Workbench连接示例。

![rds_06_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_06_20210112_zh.png)

#### 限制事项

* 在用户Compute商品的实例无法访问dns服务器的网络环境下，相应实例无法通过域访问RDS实例。

## DB实例

### 高可用性

* 在不同Availability Zone创建Candidate Master，发生故障时可进行故障处理。
* 重启高可用性实例时，选择[利用故障处理重启]选项，可置换Master与Candidate Master。
* 对于使用高可用性的实例，更改部分选项时访问信息不变，但Master与Candidate Master实例可能互换。 
* 发生故障，对高可用性实例执行故障处理时，更改的新Master实例不继承原有Master实例的备份。

#### 限制事项

* 高可用性实例保障最少1次的故障处理。发生故障进行故障处理时，Candidate Master实例更改为不使用高可用性功能的一般Master。
* 更改后的新Master实例继承原Master实例访问所使用的域名。
* 并且可以重新指定高可用性选项使用。
* 执行故障处理的原Master实例的访问信息更改，转换为“中断”状态。
* 执行故障处理的原Master实例可利用实例重启功能尝试重新驱动，但由于故障导致的数据损坏等原因，有可能无法重新驱动或无法正常运行。
* Read Only Slave实例不提供高可用性功能。
* 重启使用高可用性功能的实例或更改选项期间，该实例无法进行Read Only Slave操作。
* 高可用性功能基于域，因此若为用户Compute商品的实例无法访问dns服务器的网络环境，则相应实例无法通过域访问RDS实例，发生故障处理时，无法正常访问。

### 实例类型

* 可利用NHN Cloud Compute & Network服务提供的所有类型来创建DB实例。

### 备份


* 在RDS中执行所有备份后，创建的备份上传至自主Object Storage保管。
* 仅限自动备份，免费提供相当于原始实例数据卷大小的备份容量。
* 若不希望产生额外的费用，应调节备份周期。
* 备份执行期间，性能有可能降低。
* 若不希望影响服务，最好在服务负载较低的时间备份。
* NHN Cloud RDS支持时间点还原。
    若二进制日志（binary log）大小和存储周期过短，则可能难以还原至所需时间点。
* 正在还原的DB实例无法备份。

#### 自动备份

* 若DB实例的备份周期设置为1天以上，则启动自动备份。
    * 若将备份周期从1天以上更改为无，则所有自动备份立即从服务器上删除。
    * 删除的备份无法还原。
* 按照设置的备份周期保留备份文件。
* 自动备份从备份开始时间至Duration之间任意的时间开始。
* Duration指开始备份的时间。不意味着在Duration中完成备份。
    即使在Duration中无法完成备份，备份也不会结束。
* 自动备份在删除所有原始实例时一同删除。

#### 手动备份

* 除自动备份外，可随时进行手动备份。
* 手动备份在明确指示不删除的情况下不会被删除。

### 还原

* 利用保存的备份可将DB实例还原到需要的时间点。
* 还原时，不更改原始DB实例，创建新的DB实例。
* 若备份存储在Object Storage中，则需要更多时间。
* 不可使用正在备份的DB实例来进行还原。

>[参考] 还原进行过程中，Object Storage使用量可能达到与Binary Log文件相同的大小。
>[参考] 无二进制日志文件时，无法恢复时间。

### 复制

* 若欲提高读取性能，可以创建支持MySQL的Read Only Slave。
* 若欲创建Read Only Slave，选择原始DB实例后单击**附加功能>创建副本**。

![additional_function_0_zh](https://static.toastoven.net/prod_rds/21.09.14/additional_function_0_zh.png)

* 输入创建副本所需的设置，单击**复制**按钮，创建副本。
* 建议创建为与原始DB实例相同的类型或更高的类型，创建为较低的类型时，有可能发生复制延迟。
* 创建副本时，原始DB实例的I/O性能可能比平时有所降低。
* 根据原始DB实例的大小，创建副本的时间可能有所延长。

>[参考] 复制进行过程中，Object Storage使用量可能达到与二进制日志文件相同的大小。
>[参考] 复制完成后，Read Only Slave的规则添加至Master实例的访问规则(access rule)项目。 

#### 限制事项

* 一个原始实例最多可以创建5个副本。
* 副本无法创建副本。

### 升级

* 断开复制关系并从Read Only Slave更改为Master，称为升级。
* 升级的副本无法再自动反映DB实例的修改事项。
* 升级的副本作为独立的DB实例运行。
* 若欲升级的副本与原始DB实例之间存在复制延迟，则该延迟消失前不会升级。

### 确保容量

*  删除DB实例的资源，可确保磁盘容量。

#### 删除二进制日志

![rds_08_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_08_20210112_zh.png)

* 删除二进制日志文件，确保磁盘空间。

>[注意] 所选对象二进制日志文件与之前创建的二进制文件全部删除。
>[注意] 删除二进制日志文件时，根据删除的二进制日志文件，也可能无法恢复至特定时间。 
>[注意] 二进制日志文件全部删除时，无法使用时间恢复。

### 扩展存储

![rds_09_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_09_20210112_zh.png)

* 扩展DB实例的存储大小。
* 若存在Read Only Slave，则一同扩展为与Master相同的存储大小。
* 对象DB实例重启。

### DB文件加密

* 加密存储用户数据的数据库文件及备份文件。

> [参考] 实时执行加密，因此DB实例的性能会有所减少。

#### 限制事项

* 从不使用DB文件加密功能的实例恢复或复制时，无法打开DB文件加密功能。
* 从使用DB文件加密功能的实例恢复或复制时，无法关闭DB文件加密功能。

## 监控

* RDS定期收集DB运营及使用所需的监控项目，并以图表显示。
* 若欲查看特定DB实例的监控项目，在**DB Instance**列表中选择特定DB实例后，选择**Monitoring**标签。

![rds_10_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_10_20210112_zh.png)

* 若欲查看整体DB实例的监控项目，在**Monitoring**标签中选择所需DB实例后，单击**添加**按钮。
* 若更改图表范围、间距、种类及项目，更改的事项影响添加的所有DB实例。

![rds_11_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_11_20210112_zh.png)

* 可以使用能够轻松调整图表范围的按钮。
* 每按一次1小时、6小时等按钮，以当前时间为准自动计算from~to并更新。
<br/>
* 根据图表范围，可选图表的间距有所不同。
    * 2小时以内：1分钟、10分钟
    * 12小时以内：10分钟、1小时
    * 4天以内：1小时、6小时
    * 2周以内：6小时、一天
    * 其他：一天
* 图表类型支持最大值和平均值。

>[参考] 各RDS DB实例的监控数据临时保存在用户DB实例的名为“rds_maintenance”的数据库中，然后删除。因此，即使创建后未进行任何操作的实例，也会显示几个监控项目规则移动的图表状态。 
>[参考] 若操作rds_maintenance database的数据，可能会收集到错误的监控数据。

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

### 日志文件

* 无需访问DB实例，即可轻松查看或下载日志文件。
* 选择**DB Instance**后单击**Events & Log**标签，可查看error.log, slow_query.log, general.log文件。

![rds_13_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_13_20210112_zh.png)

* 但，应在**DB Configuration**中设置为保留该日志。
* 单击**查看**按钮，可在新窗口中确认日志文件。
* 可按照在日志长度中输入的行数查看，可从最后查看1MB大小的日志。

![rds_14_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_14_20210112_zh.png)

* 若欲查看整个日志文件，应单击**下载**按钮，直接下载日志文件。

![rds_15_20210112](https://static.toastoven.net/prod_rds/21.01.12/rds_15_20210112_zh.png)

* 单击**下载**按钮，可打开新窗口。
* 单击**加载**按钮后稍待片刻，**下载**按钮激活，可进行下载。
* 日志文件临时上传到Object Storage，最长保留5分钟以供下载。
>[参考] 可能收取上传到Object Storage至删除的5分钟内的Object Storage使用费用。

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
