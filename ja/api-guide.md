
## Database > RDS for MySQL > APIガイド

> [注意] 2021年6月15日以降のモニタリングデータはv2.0 APIを呼び出す必要があります。

| リージョン | エンドポイント |
|---|---|
| 韓国(パンギョ)リージョン | https://kr1-mysql.api.nhncloudservice.com |
| 韓国(坪村)リージョン | https://kr2-mysql.api.nhncloudservice.com |
| 日本リージョン | https://jp1-mysql.api.nhncloudservice.com |

## Monitoring

### Metric照会

- 統計情報照会に必要な統計項目(metric)を照会します。

```
GET /rds/api/v1.0/appkeys/{appkey}/monitoring/metrics
```

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 |
|---|---|---|---|---|
| appkey | URL | String | O | 商品Appkeyまたはプロジェクト統合Appkey |

#### レスポンス

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

### 統計情報照会

- 一定周期ごとに収集された統計情報を照会します。

```
GET /rds/api/v1.0/appkeys/{appkey}/monitoring/metric-statistics
```

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 | 制約事項 |
|---|---|---|---|---|---|
| appkey | URL | String | O | 商品Appkeyまたはプロジェクト統合Appkey | |
| instanceId | Query | Array | O | DBインスタンスIDリスト | Min:1, Max: 20 |
| metricName | Query | Enum | O | 統計項目(metric)名前 | |
| period | Query | Enum | O | 照会周期 | |
| statisticsType | Query | Enum | O | 統計タイプ | |
| from | Query | Datetime | O | 開始日時 | yyyy-MM-dd HH:mm:ss |
| to | Query | Datetime | O | 終了日時 | yyyy-MM-dd HH:mm:ss |

- period

| Period | 照会周期 | データ保管周期 |
|---|---| --- |
| `ONE_MINUTE` | 1分 | 7日 |
| `TEN_MINUTES` | 10分 | 60日 |
| `ONE_HOUR` | 1時間 | 1年 |
| `SIX_HOURS` | 6時間 | 5年 |
| `ONE_DAY` | 1日 | 5年 |

- statisticsType

| StatisticsType | 説明 |
|---|---|
| `MAX` | 照会周期内の最大値 |
| `AVERAGE` | 照会周期内の平均値 |

#### レスポンス

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
