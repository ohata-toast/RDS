## Database > RDS for MariaDB > 분석

## Process List, InnoDB Status

데이터베이스에서 수행된 쿼리와 InnoDB 엔진의 상태를 수집합니다. 1초에 한 번씩 `information_schema.processlist`의 결과와, `SHOW ENGINE INNODB STATUS`의 결과를 수집하며 최근 4일간의 데이터를 콘솔의 분석 탭에서 조회할 수 있습니다.

> [참고] 수집된 데이터는 내부 백업 스토리지에 저장되며 별도로 과금하지 않습니다.

수집하는 항목은 다음과 같습니다.

| 항목            | 설명                                                |
|---------------|---------------------------------------------------|
| LogTime       | 수집 시각                                             |
| PID           | 프로세스 ID                                           |
| DB            | 사용 중인 DB                                          |
| User          | 사용자                                               |
| Host          | 사용자가 접속하고 있는 호스트명, IP 주소                          |
| Command       | Thread 실행 중인 명령 타입(Sleep, Query, Quit, Kill 등)    |
| State         | Thread의 상태(Starting, Rolling back, System lock 등) |
| ExecTime      | Thread가 현재 상태를 유지한 시간(초)                          |
| Query         | 실행 중인 쿼리                                          |
| InnoDB Status | InnoDB 상태 정보                                      |

## Slow Query

데이터베이스에서 발생한 Slow Query를 분석하여 결과를 수집합니다. Percona에서 제공하는 쿼리 분석 도구인 pt-query-digest를 사용하여 1분에 한 번씩 분석하며 최근 30일간의 데이터를 콘솔의 분석 탭에서 조회할 수 있습니다.

> [참고] DB 인스턴스 수정 화면에서 Slow Query 분석 기능을 사용하지 않도록 설정할 수 있습니다.

수집하는 항목은 다음과 같습니다.

| 항목             | 설명                        |
|----------------|---------------------------|
| Checksum       | 추상화된 쿼리에 대한 Checksum      |
| Total ExecTime | 전체 수행 시간(초)               |
| Avg ExecTime   | 평균 수행 시간(초)               |
| Max ExecTime   | 최대 수행 시간(초)               |
| Min ExecTime   | 최소 수행 시간(초)               |
| Query Count    | 발생한 쿼리 수                  |
| Query          | 유사한 쿼리끼리 묶을 수 있도록 추상화된 쿼리 |

> [주의]
> slow_query_log 파라미터의 값이 0일 경우 Slow Query 로그를 남기지 않으며 분석 결과 또한 수집하지 않습니다.
> DB 인스턴스에 부하가 심할 경우 Slow Query 분석이 지연되거나 분석 결과가 유실될 수 있습니다.