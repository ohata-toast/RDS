
## Database > RDS for MySQL > API Guide

> [Caution] For data that has been monitored after June 15, 2021, v2.0 API must be called.

| Region | Endpoint |
|---|---|
| Korea (Pangyo) region | https://kr1-mysql.api.nhncloudservice.com |
| Korea (Pyeongchon) region | https://kr2-mysql.api.nhncloudservice.com |
| Japan region | https://jp1-mysql.api.nhncloudservice.com |

## Monitoring

### View metric

- View the (metrics) necessary for viewing statistical information.

```
GET /rds/api/v1.0/appkeys/{appkey}/monitoring/metrics
```

#### Request

| Name | Type | Format | Required | Description |
|---|---|---|---|---|
| appkey | URL | String | O | Product Appkey or integrated Appkey for project |

#### Request

```json
{
  "metrics": [
    {
      "metricName": "CPU_USAGE",
      "unit": "percent"
    },
    {
      "metricName": "NETWORK_SENT",
      "unit": "bps"
    }
  ]
}
```

### View stats

- Views the statistical information collected on a regular basis.

```
GET /rds/api/v1.0/appkeys/{appkey}/monitoring/metric-statistics
```

#### Request

| Name | Type | Format | Required | Description | Constraints |
|---|---|---|---|---|---|
| appkey | URL | String | O | Product Appkey or integrated Appkey for project | |
| instanceId | Query | Array | O | List of DB instance IDs | Min:1, Max: 20 |
| metricName | Query | Enum | O | Statistics item(metric) name | |
| period | Query | Enum | O | View cycle | |
| statisticsType | Query | Enum | O | Statistics type | |
| from | Query | Datetime | O | Start date | yyyy-MM-dd HH:mm:ss |
| to | Query | Datetime | O | End date | yyyy-MM-dd HH:mm:ss |

- period

| Period | View cycle | Data retention period |
|---|---| --- |
| `ONE_MINUTE` | 1 minute | 7 days |
| `TEN_MINUTES` | 10 minutes | 60 days |
| `ONE_HOUR` | 1 hour | 1 year |
| `SIX_HOURS` | 6 hours | 5 years |
| `ONE_DAY` | 1 day | 5 years |

- statisticsType

| StatisticsType | Description |
|---|---|
| `MAX` | Maximum value within view cycle |
| `AVERAGE` | Average value within view cycle |

#### Response

```json
{
  "metricStatistics": [
    {
      "instanceId": "72b5f839-9faf-4243-9410-27072656caa3",
      "metrics": [
        {
          "metricName": "CPU_USAGE",
          "unit": "percent",
          "dataList": [
            {
              "datetime": "2020-08-06T13:30:00.000+0900",
              "value": 10
            },
            {
              "datetime": "2020-08-06T13:31:00.000+0900",
              "value": 15
            }
          ]
        }
      ]
    }
  ]
}
```
