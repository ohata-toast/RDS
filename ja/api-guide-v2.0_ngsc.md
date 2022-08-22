## Database > RDS for MySQL > APIガイド

| リージョン | エンドポイント |
|---|---|
| 韓国(パンギョ)リージョン | https://kr1-mysql.api.nhncloudservice.com |
| 韓国(坪村)リージョン | https://kr2-mysql.api.nhncloudservice.com |
| 日本リージョン | https://jp1-mysql.api.nhncloudservice.com |

## Monitoring

### Metric照会

- 統計情報照会に必要な統計項目(metric)を照会します。

```
GET /rds/api/v2.0/metrics
```

#### リクエストヘッダ

| 名前 | 種類 | 形式 | 必須 | 説明 |
|---|---|---|---|---|
| X-TC-APP-KEY | URL | String | O | 商品Appkeyまたはプロジェクト統合Appkey |

#### レスポンス

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

### 統計情報照会

- 一定周期ごとに収集された統計情報を照会します。

```
GET /rds/api/v2.0/metric-statistics
```

#### リクエストヘッダ

| 名前 | 種類 | 形式 | 必須 | 説明 |
|---|---|---|---|---|
| X-TC-APP-KEY | URL | String | O | 商品Appkeyまたはプロジェクト統合Appkey |

#### リクエスト

| 名前 | 種類 | 形式 | 必須 | 説明 | 制約事項 |
|---|---|---|---|---|---|
| instanceId | Query | Array | O | DBインスタンスIDリスト | Min:1, Max: 20 |
| metricName | Query | Array | O | 照会指標(metric)リスト | Min:1 |
| from | Query | Datetime | O | 開始日時 | yyyy-MM-dd'T'HH:mm:ss.SSSXXX (ISO Datetime) |
| to | Query | Datetime | O | 終了日時 | yyyy-MM-dd'T'HH:mm:ss.SSSXXX (ISO Datetime) |
| interval | Query | Integer | X | 照会間隔 | 1、5、30、120、1440 (分) |

- interval ：デフォルト値を使用する時、from/to値に応じて適切な値を自動選択する
    - 日範囲が1日以下かつ開始日が8日経過前 - 1分単位rawデータ
    - 日範囲が7日以下かつ開始日が40日経過前 - 5分単位平均データ
    - 日範囲が30日以下かつ開始日が186日経過前 - 30分単位平均データ
    - 日範囲が180日以下かつ開始日が730日経過前 - 2時間単位平均データ
    - その他 - 1日単位平均データ
- from, to : ISO Datetime 形式の例
    - UTC : 2021-01-01T00:00:00.000Z
    - KST, JST : 2021-01-01T00:00:00.000+09:00

#### レスポンス

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
