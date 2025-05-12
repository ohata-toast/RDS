## Database > RDS for MariaDB > Analysis

## Process List, InnoDB Status

RDS for MySQL collects queries performed on the database and the status of the InnoDB engine. The results of `information_schema.processlist`and `SHOW ENGINE INNODB STATUS`are collected once per second, and you can view the last four days of data in the Analytics tab of the console.

> [Note] The collected data is stored in internal backup storage and is not charged separately.

The following items are collected

| Item          | Description                                                  |
|---------------|--------------------------------------------------------------|
| LogTime       | Collected time                                               |
| PID           | Process ID                                                   |
| DB            | DB in use                                                    |
| User          | User                                                         |
| Host          | The hostname and IP address the user is connecting from      |
| Command       | Command type running thread (Sleep, Query, Quit, Kill, etc.) |
| State         | State of thread (Starting, Rolling back, System lock, etc.)  |
| ExecTime      | The seconds the thread has been in its current state.        |
| Query         | Running queries                                              |
| InnoDB Status | InnoDB status information                                    |

## Slow Query

RDS for MariaDB analyzes the slow queries that occurred in your database and collects the results. It performs analysis once a minute using pt-query-digest, a query analysis tool provided by Percona, and you can view the last 30 days of data in the Analysis tab of the console.

> [Note] You can disable the Slow Query analysis feature on the Modify DB Instance screen.

The following items are collected.

| Item           | Description                                                  |
|----------------|--------------------------------------------------------------|
| Checksum       | Checksum for abstracted queries                              |
| Total ExecTime | Total execution time (seconds)                               |
| Avg ExecTime   | Average time to perform (seconds)                            |
| Max ExecTime   | Maximum time to perform (in seconds)                         |
| Min ExecTime   | Minimum time to perform (in seconds)                         |
| Query Count    | Number of queries issued                                     |
| Query          | Abstracted queries so you can group similar queries together |

> [Caution]
> If the value of the slow_query_log parameter is 0, no Slow Query logs are left and no analysis results are collected.
> If the DB instance is heavily loaded, Slow Query analysis may be delayed or analysis results may be lost.