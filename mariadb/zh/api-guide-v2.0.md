## Database > RDS for MariaDB > API Guide

| Region                    | Endpoint                                      |
|---------------------------|-----------------------------------------------|
| Korea (Pangyo) region | https://kr1-rds-mariadb.api.nhncloudservice.com |

## Monitoring

### View metric

- View the metrics necessary for viewing statistical information.

```http
GET /v2.0/metrics
```

#### Request header

| Name         | Type | Format | Required | Description                                     |
|--------------|------|--------|----------|-------------------------------------------------|
| X-TC-APP-KEY | URL  | String | O        | Product Appkey or integrated Appkey for project |

#### Response

```json
{
  "metrics": [
    {
      "measureName": "CPU_USAGE",
      "unit": "%"
    },
    {
      "measureName": "NETWORK_SENT",
      "unit": "Bytes/min"
    }
  ]
}
```

### View stats

- Views the statistical information collected on a regular basis.

```http
GET /rds/api/v2.0/metric-statistics
```

#### Request header

| Name         | Type | Format | Required | Description                                     |
|--------------|------|--------|----------|-------------------------------------------------|
| X-TC-APP-KEY | URL  | String | O        | Product Appkey or integrated Appkey for project |

#### Request

| Name        | Type  | Format   | Required | Description             | Constraints                                 |
|-------------|-------|----------|----------|-------------------------|---------------------------------------------|
| instanceId  | Query | Array    | O        | List of DB instance IDs | Min:1, Max: 20                              |
| measureName | Query | Array    | O        | Metric list             | Min:1                                       |
| from        | Query | Datetime | O        | Start date              | yyyy-MM-dd'T'HH:mm:ss.SSSXXX (ISO Datetime) |
| to          | Query | Datetime | O        | End date                | yyyy-MM-dd'T'HH:mm:ss.SSSXXX (ISO Datetime) |
| interval    | Query | Integer  | X        | View interval           | 1, 5, 30, 120, 1440 (minutes)               |

- interval: when default is used, it automatically selects a value appropriate for the from/to value
    - Date range is 1 day or less, and Start date has not exceeded 8 days yet - Raw data for every minute
    - Date range is 7 days or less, and Start date has not exceeded 40 days yet - Average data for every 5 minutes
    - Date range is 30 days or less, and Start date has not exceeded 186 days yet - Average data for every 30 minutes
    - Date range is 180 days or less, and Start date has not exceeded 730 days yet - Average data for every 2 hours
    - Other - Average daily data
- from, to: ISO Datetime format example
    - UTC: 2021-01-01T00:00:00.000Z
    - KST, JST: 2021-01-01T00:00:00.000+09:00

#### Response

```json
{
    "metricStatistics": [
        {
            "instanceId": "9a978085-0dc4-4da6-974c-bc6822b06a7c",
            "metrics": [
                {
                    "measureName": "NETWORK_RECV",
                    "unit": "Bytes/min",
                    "values": [
                        [
                            1623817800,
                            "3949.0200000000004"
                        ],
                        [
                            1623819600,
                            "3951.3122222222228"
                        ],
                        [
                            1623821400,
                            "3955.8588888888894"
                        ]
                    ]
                },
                {
                    "measureName": "NETWORK_SENT",
                    "unit": "Bytes/min",
                    "values": [
                        [
                            1623817800,
                            "4356.027777777778"
                        ],
                        [
                            1623819600,
                            "4261.1322222222225"
                        ],
                        [
                            1623821400,
                            "4312.244444444445"
                        ]
                    ]
                }
            ]
        }
    ]
}
```
