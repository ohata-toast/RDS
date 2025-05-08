## Database > RDS for MariaDB > Server Dashboard

## Server Dashboard
You can visualize performance metrics in chart form on the server dashboard. Charts are arranged according to a preset layout. Metrics are collected once every minute and kept for up to 1 year. Retention period by aggregation unit is as follows.

| Aggregate Unit | Retention Period |
|----------------|------------------| 
| 1 minute | 1 year |

## Layout

Use a layout to show the size and position of charts. When the service is enabled, 2 layouts are provided by default, `Default system index` and `Default MariaDB index`. Default layouts cannot be changed or deleted and you cannot add charts or change or delete charts that have been added. If you want to view charts in addition to the default layouts, you can create a layout and add charts.

![layout_01_en](https://static.toastoven.net/prod_rds/mariadb/23.04.11/layout_01_en.png)

* ❶ When you click **Create Layout**, a pop-up window appears where you can create a layout.
* ❷ Enter a layout name and click **Create** to create a layout.

### Add Charts to Layout

![layout_02_en](https://static.toastoven.net/prod_rds/mariadb/23.04.11/layout_02_en.png)

* ❶ Select the layout you want.
* ❷ When you click **Add Chart**, a pop-up window appears where you can add charts.

![layout_03_en](https://static.toastoven.net/prod_rds/mariadb/23.04.11/layout_03_en.png)

* ❶ You can select multiple charts that you want to add by checking the check box.
* ❷ When you click a chart name, a chart preview appears in the red square area on the left.
* ❸ Click **Add** to add all selected charts.

### Change and Delete Charts in Layout

![layout_04_en](https://static.toastoven.net/prod_rds/mariadb/23.04.11/layout_04_en.png)

* ❶ You can reposition the chart by clicking and holding the top area of the chart and dragging and dropping it wherever you want.
* ❷ You can resize the chart by dragging and dropping the bottom right area of the chart.
* ❸ When you click **x** in the upper right corner of the chart, the chart is deleted from the layout.

## Chart

You can view various performance metrics for DB instance in chart form. Each performance metric consists of a different type of chart. In addition to default system metrics, MariaDB provides various performance metrics in chart form. Metrics that can be found for each chart are as follows.

| Chart                      | Metrics(Unit)                                                                                                                        | Description                                                    |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| CPU Usage Rate             | cpu used (%)                                                                                                                         |                                                                |
| CPU Details                | cpu user (%)<br/>cpu system (%)<br/>cpu nice (%)<br/>cpu IO wait (%)                                                                 |                                                                |
| Memory Usage               | memory used (%)                                                                                                                      |                                                                |
| Memory Details             | memory used (bytes)<br/>memory free (bytes)                                                                                          |                                                                |
| Swap Usage                 | swap used (bytes)<br> swap total (bytes)                                                                                             |                                                                |
| Storage Usage              | storage used (%)                                                                                                                     |                                                                |
| Remaining Storage Usage    | storage free (%)                                                                                                                     |                                                                |
| Storage IO                 | disk read (bytes)<br> disk write (bytes)                                                                                             |                                                                |
| Network Data Transfer      | nic incoming (bytes)<br> nic outgoing (bytes)                                                                                        | Default network transfer used by MariaDB occurs. |
| CPU Average Load           | 1m<br/>5m<br/>15m                                                                                                                    |                                                                |
| Queries Per Second         | qps (count/sec)                                                                                                                      |                                                                |
| Database Activity          | select (count/sec)<br/>insert (count/sec)<br/>update (count/sec)<br/>delete (count/sec)<br/>replace (count/sec)<br/>call (count/sec) |                                                                |
| Buffer Pool                | Buffer Pool Total (MB)<br/>Buffer Pool Used (MB)                                                                                     |                                                                |
| Slow Query                 | counts/min                                                                                                                           |                                                                |
| Replication Delay          | sec                                                                                                                                  |                                                                |
| Row Access                 | index (counts/sec)<br/>full scan (counts/sec)                                                                                        |                                                                |
| Database Connection Status | mariadb status                                                                                                          | Unable to access: 0, Able to access: 1                         |
| Data Storage Defect        | disk fault status                                                                                                                    | Abnormal: 0, Normal: 1                                         |
| Replication Thread Status  | replication IO / SQL thread status                                                                                                   | Abnormal: 0, Normal: 1                                         |

## Server Group

Server group allows you to view performance metrics for multiple DB instances in a single chart. Performance metrics appear in a single chart for each DB instance that belongs to a server group. Charts that consist of multiple performance metrics are all changed to individual performance metrics across server groups.

### Create Server Group

![chart_01_en](https://static.toastoven.net/prod_rds/mariadb/23.04.11/chart_01_en.png)

* ❶ **Add Group** displays a pop-up window where you can create groups.
* ❷ Select DB instance to add to server groups.

### Server Group Settings

DB instances and server groups appear together in the list of servers on the left side of the server dashboard.

![server_group_01_en](https://static.toastoven.net/prod_rds/mariadb/23.04.11/server_group_01_en.png)

* ❶ Click **+**, **-** to unfold or close the server group.
* ❷ When you click DB instance that belongs to a server group, a color selection pop-up appears where you can change the color that will appear in the chart.

![server_group_02_en](https://static.toastoven.net/prod_rds/mariadb/23.04.11/server_group_02_en.png)

* ❶ **:You can change or delete the server group by clicking **.