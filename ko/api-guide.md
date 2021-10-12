## Database > RDS for MySQL > API 가이드

> [주의] 2021년 6월 15일 이후 모니터링 데이터는 v2.0 API를 호출해야 합니다.

| 리전 | 엔드포인트 |
|---|---|
| 한국(판교) 리전 | https://kr1-mysql.api.nhncloudservice.com |
| 한국(평촌) 리전 | https://kr2-mysql.api.nhncloudservice.com |
| 일본 리전 | https://jp1-mysql.api.nhncloudservice.com |

## Monitoring

### Metric 조회

- 통계 정보 조회에 필요한 통계 항목(metric)을 조회합니다.

```
GET /rds/api/v1.0/appkeys/{appkey}/monitoring/metrics
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|---|---|---|---|---|
| appkey | URL | String | O | 상품 Appkey 또는 프로젝트 통합 Appkey |

#### 응답

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

### 통계 정보 조회

- 일정 주기마다 수집된 통계 정보들을 조회합니다.

```
GET /rds/api/v1.0/appkeys/{appkey}/monitoring/metric-statistics
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 | 제약 사항 |
|---|---|---|---|---|---|
| appkey | URL | String | O | 상품 Appkey 또는 프로젝트 통합 Appkey | |
| instanceId | Query | Array | O | DB 인스턴스 ID 목록 | Min:1, Max: 20 |
| metricName | Query | Enum | O | 통계 항목(metric) 이름 | |
| period | Query | Enum | O | 조회 주기 | |
| statisticsType | Query | Enum | O | 통계 타입 | |
| from | Query | Datetime | O | 시작 일시 | yyyy-MM-dd HH:mm:ss |
| to | Query | Datetime | O | 종료 일시 | yyyy-MM-dd HH:mm:ss |

- period

| Period | 조회 주기 | 데이터 보관 주기 |
|---|---| --- |
| `ONE_MINUTE` | 1분 | 7일 |
| `TEN_MINUTES` | 10분 | 60일 |
| `ONE_HOUR` | 1시간 | 1년 |
| `SIX_HOURS` | 6시간 | 5년 |
| `ONE_DAY` | 1일 | 5년 |

- statisticsType

| StatisticsType | 설명 |
|---|---|
| `MAX` | 조회 주기 내 최댓값 |
| `AVERAGE` | 조회 주기 내 평균값 |

#### 응답

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
