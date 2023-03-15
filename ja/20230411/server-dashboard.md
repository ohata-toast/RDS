## Database > RDS for MySQL > 서버 대시보드

## 서버 대시보드

서버 대시보드에서 성능 지표를 차트 형태로 시각화해 볼 수 있습니다. 차트는 미리 설정된 레이아웃에 따라 배치됩니다. 지표는 1분에 한 번씩 수집되며 최대 5년간 보관됩니다. 지표 데이터는 5분, 30분, 2시간, 1일 단위의 평균값으로 집계됩니다. 집계 단위별 보관 기간은 아래와 같습니다.

| 집계 단위 | 보관 기간 |
|-------|-------|
| 1분    | 7일    |
| 5분    | 1개월   |
| 30분   | 6개월   |
| 2시간   | 2년    |
| 1일    | 5년    |

### 레이아웃

레이아웃을 이용해 차트의 크기와 위치를 나타낼 수 있습니다. 서비스 활성화 시, `기본 시스템 지표`, `기본 MySQL 지표` 2개의 기본 레이아웃을 제공합니다. 기본 레이아웃은 변경 및 삭제할 수 없으며, 차트를 추가하거나 추가된 차트를 변경, 삭제할 수 없습니다. 기본 레이아웃 이외에 자유롭게 차트를 보고 싶으면 레이아웃을 만들어 차트를 추가할 수 있습니다. 



레이아웃에 추가된 차트의 상단 영역을 마우스로 누른 후 원하는 곳으로 드래그 앤 드롭하여 차트의 위치를 이동할 수 있습니다. 차트의 우측 하단 영역을 드래그 앤 드롭하여 차트의 크기를 변경할 수 있습니다. 차트의 위치 및 크기는 드래그 앤 드롭하는 그 즉시 상태가 저장됩니다.

### 차트

DB 인스턴스의 각종 성능 지표를 차트 형태로 볼 수 있습니다. 성능 지표마다 각기 다른 형태의 차트로 구성되어 있습니다. 기본적인 시스템 지표 이외에, MySQL에서 제공하는 각종 성능 지표를 차트로 제공하고 있습니다. 차트별로 확인할 수 있는 지표는 아래와 같습니다.

| 차트                         | 지표 (단위)                                                                                                                              | 비고                                |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| CPU 사용률                    | cpu used (%)                                                                                                                         |                                   |
| CPU 상세                     | cpu user (%)<br/>cpu system (%)<br/>cpu nice (%)<br/>cpu IO wait (%)                                                                 |                                   |
| 메모리 사용량                    | memory used (%)                                                                                                                      |                                   |
| 메모리 상세                     | memory used (bytes)<br/>memory free (bytes)                                                                                          |                                   |
| 스왑 사용량                     | swap used (bytes)<br> swap total (bytes)                                                                                             |                                   |
| Storage 사용량                | storage used (%)                                                                                                                     |                                   |
| Storage 남은 사용량             | storage free (%)                                                                                                                     |                                   |
| Storage IO                 | disk read (bytes)<br> disk write (bytes)                                                                                             |                                   |
| 네트워크 데이터 송수신               | nic incoming (bytes)<br> nic outgoing (bytes)                                                                                        | MySQL에서 사용하는 기본적인 네트워크 전송이 발생합니다. |
| CPU 평균 부하                  | 1m<br/>5m<br/>15m                                                                                                                    |                                   |
| Queries Per Second         | qps (count/sec)                                                                                                                      |                                   |
| Database Activity          | select (count/sec)<br/>insert (count/sec)<br/>update (count/sec)<br/>delete (count/sec)<br/>replace (count/sec)<br/>call (count/sec) |                                   |
| Buffer Pool                | Buffer Pool Total (MB)<br/>Buffer Pool Used (MB)                                                                                     |                                   |
| Slow Query                 | counts/min                                                                                                                           |                                   |
| 복제 딜레이                     | sec                                                                                                                                  |                                   |
| Row Access                 | index (counts/sec)<br/>full scan (counts/sec)                                                                                        |                                   |
| Database Connection Status | mysql status                                                                                                                         | 접속 불가: 0, 접속 가능: 1                |
| 스토리지 결함                    | disk fault status                                                                                                                    | 비정상: 0, 정상: 1                     |

### 차트 그룹

차트 그룹을 이용하면 하나의 차트에서 여러 DB 인스턴스의 성능 지표를 확인할 수 있습니다. 웹콘솔에서 **그룹 추가** 버튼을 눌러 차트 그룹을 추가할 수 있습니다. 차트 그룹에 한꺼번에 보고 싶은 DB 인스턴스를 추가합니다. 선택된 DB 인스턴스 별로 성능 지표가 하나의 차트에 나타납니다. 여러개의 성능 지표로 이루어진 차트는 차트 그룹에서는 모두 개별 성능 지표로 변경됩니다.