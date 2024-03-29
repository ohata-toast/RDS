## Database > RDS for MySQL > DBインスタンス

## DBインスタンス

DBインスタンスは仮想機器とインストールされたMySQLを包括する概念で、 RDS for MySQLが提供するMySQLの単位です。
DBインスタンスのOSに直接アクセスすることはできず、DBインスタンス作成時に入力したポートを介してデータベースにのみアクセスできます。使用できるポート範囲には以下のような制約事項があります。

* 使用できるポート範囲は3306～43306の間です。

DBインスタンスは、顧客が付与する名前と自動的に付与される32バイトのIDで識別されます。
DBインスタンス名は下記のような制約事項があります。

* DBインスタンス名はリージョンごとに一意でなければなりません。
* DBインスタンス名は1～100文字の間の英字、数字、一部の記号(-, _, .)のみ使用でき、最初の文字は英字のみ使用できます。

## DB 인스턴스 생성

아래 설정들을 통하여 DB 인스턴스를 생성할 수 있습니다.

### アベイラビリティゾーン

NHN Cloudは、物理的なハードウェアの問題で生じる障害に備えるため、システム全体を複数のアベイラビリティゾーンに分けています。このアベイラビリティゾーンごとに、ストレージシステム、ネットワークスイッチ、ラック、電源装置がすべて別々に構成されています。1つのアベイラビリティゾーン内で起こる障害は他のアベイラビリティゾーンに影響を与えないため、サービス全体の可用性が高くなります。DBインスタンスを複数のアベイラビリティゾーンに分けて構築すれば、サービスの可用性をさらに高めることができます。複数のアベイラビリティゾーンに分散して作成されたDBインスタンス同士でネットワーク通信が可能で、この時発生するネットワーク使用費用は請求されません。

> [注意]
> すでに作成したDBインスタンスのアベイラビリティゾーンは変更できません。

### DBエンジン

以下に明示されたバージョンを使用できます。

| バージョン        | 備考                                                   |
|--------------|------------------------------------------------------|
| <strong>8.0</strong> ||
| MySQL 8.0.35 |                                                      |
| MySQL 8.0.34 |                                                      | 
| MySQL 8.0.33 |                                                      |
| MySQL 8.0.32 |                                                      | 
| MySQL 8.0.28 |                                                      | 
| MySQL 8.0.23 |                                                      |
| MySQL 8.0.18 |                                                      |
| <strong>5.7</strong> ||
| MySQL 5.7.37 |                                                      |
| MySQL 5.7.33 | 外部のバックアップでDBインスタンスを復元できません。                          |
| MySQL 5.7.26 |                                                      |
| MySQL 5.7.19 |                                                      |
| MySQL 5.7.15 |                                                      |
| <strong>5.6</strong> ||
| MySQL 5.6.33 | 新規DBインスタンスを作成できません。既存DBインスタンスのリードレプリカ作成、復元のみサポートします。 |

DBエンジンの場合、作成後、Webコンソールの修正機能でバージョンアップが可能です。
DBエンジンの詳細は[DBエンジン](db-engine/)で確認できます。

### DBインスタンスタイプ

DBインスタンスはタイプごとに異なるCPUコア数とメモリ容量を持っています。
DBインスタンス作成時、データベースのワークロードに応じて適切なDBインスタンスタイプを選択する必要があります。

| タイプ | 説明                                                    |
|-----|-------------------------------------------------------|
| m2  | CPUとメモリをバランスよく設定したタイプです。                              |
| c2  | CPUのパフォーマンスを高く設定したインスタンスタイプです。                        |
| r2  | 他のリソースに比べてメモリの使用量が多い場合に使用できます。                        |
| x1  | 高スペックのCPUとメモリをサポートするタイプです。高性能が必要なサービスやアプリケーションに使用します。 |

作成済みのDBインスタンスのタイプはWebコンソールから簡単に変更できます。

> [注意]
> 作成済みのDBインスタンスのタイプを変更すると、DBインスタンスが終了するため、多少のダウンタイムが発生します。

### 데이터 스토리지

데이터 스토리지에 데이터베이스의 데이터 파일을 저장합니다. DB 인스턴스는 HDD, SSD의 2가지 데이터 스토리지 유형을 지원합니다. 데이터 스토리지 유형에 따라 성능과 가격이 다르므로 데이터베이스 워크로드에 따라 알맞은 유형을 선택해야 합니다. 데이터 스토리지는 20GB~2TB로 생성할 수 있습니다. 

> [참고]
> 2TB 이상의 크기를 사용하시려면 NHN Cloud 고객 센터로 연락해 주세요.

아래 작업은 데이터 스토리지의 I/O 용량을 사용하기 때문에 진행되는 동안 DB 인스턴스의 성능이 저하될 수 있습니다.

* 단일 DB 인스턴스의 백업
* 단일 DB 인스턴스의 고가용성 구성
* 읽기 복제본 생성
* 읽기 복제본 재구축
* 예비 마스터 재구축
* 특정 시점으로 복원
* 오브젝트 스토리지로 백업 내보내기

### 高可用性

高可用性DBインスタンスは可用性とデータ耐久性を増加させ、障害許容が可能なデータベースを提供します。高可用性DBインスタンスはマスター、予備マスターで構成され、異なるアベイラビリティゾーンに作成されます。予備マスターは障害に備えたDBインスタンスで、通常は使用できません。고가용성 DB 인스턴스의 경우 예비 마스터에서 백업이 수행되기 때문에 백업으로 인한 성능 저하를 회피할 수 있습니다. 고가용성 DB 인스턴스가 제공하는 여러 기능들은 [고가용성 DB 인스턴스](db-instance/#_1)에서 확인할 수 있습니다.

### ネットワーク

DBインスタンス作成時に接続するVPCサブネットを選択する必要があります。동일한 서브넷에 연결된 Compute 서비스의 인스턴스 간에는 별도의 플로팅 IP 없이 통신할 수 있으며, 네트워크 트래픽에 대한 비용이 청구되지 않습니다. DB 인스턴스는 기본적으로 모든 네트워크 접근을 차단 하므로 접속을 원하는 경우 DB 보안 그룹을 적용해야 합니다.

> [注意]
> 作成済みのDBインスタンスのサブネットは変更できません。

### Floating IP

外部からDBインスタンスにアクセスするには、Floating IPをDBインスタンスに接続する必要があります。Internet Gatewayが接続されたサブネットを接続する場合のみFloating IPを作成できます。Floating IPは使用と同時に課金され、これとは別にFloating IPを介したインターネット方向のトラフィックが発生する場合は別途課金されます。

### 파라미터 그룹

파라미터 그룹은 DB 인스턴스에 설치된 데이터베이스를 설정할 수 있는 파라미터의 집합입니다. DB 인스턴스 생성 시 반드시 하나의 파라미터 그룹을 선택해야 합니다. 파라미터 그룹은 생성 이후에도 자유롭게 변경이 가능합니다. 파라미터 그룹에 대한 자세한 설명은 [파라미터 그룹](parameter-group/) 항목을 참고합니다.

### DBセキュリティグループ

DBセキュリティグループは、外部からの侵入に備えて接続を制限するために使用します。送受信トラフィックに対して特定のポート範囲あるいはデータベースポートに対してアクセスを許可できます。DBインスタンスに複数のDBセキュリティグループを適用できます。DBセキュリティグループの詳しい説明は[DBセキュリティグループ](db-security-group.md)を参照してください。

### バックアップ

DBインスタンスのデータベースを定期的にバックアップするように設定したり、Webコンソールから好きなタイミングでバックアップを作成できます。バックアップが実行されている間、パフォーマンスの低下が発生する場合があります。サービスに影響を与えないように、サービスの負荷が少ない時間にバックアップすることを推奨します。バックアップによる性能低下を望まない場合は、高可用性構成を使用するか、読み取りレプリカでバックアップを実行できます。バックアップファイルは内部オブジェクトストレージに保存され、バックアップ容量に応じて課金されます。必要に応じて、NHN Cloudのユーザーオブジェクトストレージにエクスポートできます。予期せぬ障害に備えるため、定期的にバックアップを行うように設定することを推奨します。バックアップの詳細については、[バックアップと復元](backup-and-restore.md)を参照してください。

### 基本通知

DBインスタンス作成時、基本通知を設定できます。基本通知を設定すると、`{{DBインスタンス名}-default`という名前で新しい通知グループが作成され、下記の通知項目が自動で設定されます。基本通知として作成された通知グループは自由に修正、削除できます。通知グループについての詳しい説明は[通知グループ](notification-group.md)を参照してください。

| 項目                         | 比較方法  | しきい値          | 持続時間 |
|----------------------------|-------|---------------|------|
| CPU使用率                     | &gt;= | 80%           | 5分   |
| Storageの空き容量               | &lt;= | 5,120MB       | 5分   |
| Database Connection Status | &lt;= | 0             | 0分   |
| Storage使用量                 | &gt;= | 95%           | 5分   |
| ストレージ障害                    | &lt;= | 0             | 0分   |
| Connection Ratio           | &gt;= | 85%           | 5分   |
| メモリ使用量                     | &gt;= | 90%           | 5分   |
| Slow Query                 | &gt;= | 60 counts/min | 5分   |

### 삭제 보호

삭제 보호를 활성화하면 실수로 DB 인스턴스가 삭제되지 않도록 보호할 수 있습니다.

## DB 인스턴스 목록

웹 콘솔에서 생성된 DB 인스턴스를 확인 할 수 있습니다. 복제 그룹 단위로 묶어서 보거나, 개별 DB 인스턴스로 볼 수 있습니다.

![db-instance-list_ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-list_ja.png)

❶ DB 인스턴스 화면 모드를 변경할 수 있습니다.
❷ 버튼을 클릭하여 그룹 안에 속한 DB 인스턴스를 펼치거나 접을 수 있습니다.
❸ 가장 최근 수집된 모니터링 지표를 보여줍니다.
❹ 현재 상태를 볼 수 있습니다.
❺ 진행 중인 작업이 있으면 스피너가 나타납니다.

DBインスタンスの状態は下記のような値で構成され、ユーザーの行為と現在の状態によって変更されます。

| 状態                | 説明                                              |
|-------------------|-------------------------------------------------|
| BEFORE_CREATE     | 作成前                                             |
| AVAILABLE         | 使用可能                                            |
| STORAGE_FULL      | 容量不足                                            |
| FAIL_TO_CREATE    | 作成失敗                                            |
| FAIL_TO_CONNECT   | 接続失敗                                            |
| REPLICATION_STOP  | 複製中断                                            |
| FAILOVER          | フェイルオーバー完了                                      |
| FAILOVER_SHUTDOWN | フェイルオーバー完了(停止), 2023年4月11日以前にフェイルオーバーしたDBインスタンス |
| SHUTDOWN          | 停止した                                            |

변경 할 수 있는 검색 조건은 아래와 같습니다.

![db-instance-filter_ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-filter_ja.png)

❶ 파라미터 변경 사항 적용이 필요한 DB 인스턴스를 필터링 조건으로 검색할 수 있습니다.

## DB 인스턴스 상세

DB 인스턴스를 선택하면 상세 정보를 볼 수 있습니다.

![db-instance-detail_ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail_ja.png)

❶ 접속 정보의 도메인을 클릭하면 IP 주소를 확인할 수 있는 팝업이 나타납니다.
❷ DB 보안 그룹을 클릭하면 DB 보안 규칙을 확인할 수 있는 팝업이 나타납니다.
❸ 파라미터 그룹을 클릭하면 파라미터를 확인할 수 있는 화면으로 이동합니다.
❹ 마우스로 드래그 엔드 드롭 하여 상세 정보 패널의 높이를 조절할 수 있습니다.
❺ 상세 정보 패널의 높이를 미리 지정된 높이로 조절할 수 있습니다.

### 접속 정보

DB 인스턴스 생성 시 내부 도메인을 발급합니다. 내부 도메인은 사용자 VPC 서브넷에 속한 IP 주소를 가리킵니다. 고가용성 DB 인스턴스의 경우 장애 조치가 되어 예비 마스터가 새로운 마스터로 변경되더라도 내부 도메인은 변경되지 않습니다. 따라서 특별한 이유가 없으면 응용 프로그램의 접속 정보는 반드시 내부 도메인을 이용해야 합니다.

플로팅 IP를 생성한 경우 외부 도메인을 추가로 발급합니다. 외부 도메인은 플로팅 IP의 주소를 가리킵니다. 외부 도메인 혹은 플로팅 IP는 외부에서 접근이 가능하므로 DB 보안 그룹의 규칙을 적절히 설정하여 DB 인스턴스를 보호해야 합니다.

### 로그

DB 인스턴스의 로그 탭에서는 각종 로그 파일을 보거나 다운로드할 수 있습니다. 로그 파일은 아래와 같이 정해진 설정으로 로테이트 됩니다. 몇몇 로그 파일은 파라미터 그룹에서 활성화 하거나 비활성화 할 수 있습니다.

| 항목               | 로테이트 설정   | 변경 여부 | 연관 파라미터                                                                |
|------------------|-----------|-------|------------------------------------------------------------------------|
| error.log        | 100MB 10개 | 고정    |                                                                        |
| slow_query.log   | 100MB 40개 | 고정    | `slow_query_log`                                                       |
| general_log.log  | 100MB 40개 | 고정    | `general_log`                                                          |
| server_audit.log | 20MB 30개  | 변경 가능 | `server_audit_logging`<br />`server_audit_file_rotations`              | 
| mysql-bin.xxxxxx | 5일        | 변경 가능 | `binlog_expire_logs_seconds` (8.X 버전)<br />`expire_logs_days` (5.X 버전) |

![db-instance-detail-log_ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-log_ja.png)

❶ **로그 보기** 버튼을 클릭하면 로그 파일의 내용을 확인할 수 있는 팝업을 노출합니다. 최대 65,535 Bytes 의 로그를 확인할 수 있습니다.
❷ **가져오기** 버튼을 클릭하면 DB 인스턴스의 로그 파일을 다운로드 할 수 있도록 요청합니다.
❸ 다운로드 준비가 되면 **다운로드** 버튼을 노출합니다. **다운로드** 버튼을 클릭하면 로그를 내려받습니다.

> [주의]
> **가져오기** 버튼을 클릭하면 약 5분간 로그 파일이 백업 스토리지에 업로드되며 로그 파일의 크기만큼 백업 스토리지 용량이 과금됩니다.
> **다운로드** 버튼을 클릭하면 로그 파일의 크기만큼 인터넷 트래픽이 과금됩니다.

❹ 바이너리 로그(binary log)의 경우 2가지 형태로 내려받을 수 있습니다. **가져오기** 버튼을 클릭하면 어떤 형태로 내려받을 수 있을지 선택하는 팝업을 노출합니다.

![db-instance-detail-log-bin_ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-log-bin_ja.png)

❺ mysqlbinlog 유틸리티를 이용하여 바이너리 로그(binary log)를 SQL 파일로 변환 후 내려받으려면 선택합니다.

### DB 스키마 & 사용자

DB 인스턴스의 DB 스키마 & 사용자 탭에서는 데이터베이스에 생성된 스키마와 사용자를 조회 및 제어할 수 있습니다.

#### DB 스키마 생성

![db-instance-detail-schema_ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-schema_ja.png)

❶ **생성** 버튼을 클릭하면 DB 스키마의 이름을 입력할 수 있는 팝업 창이 나타납니다.
❷ DB 스키마 이름을 입력한 후 **확인** 버튼을 클릭하여 DB 스키마를 생성할 수 있습니다.

DB 스키마 이름은  아래와 같은 제약 사항이 있습니다.

* 1~64자 사이의 알파벳, 숫자, _만 사용할 수 있으며, 첫 번째 글자는 영문자만 사용할 수 있습니다.
* `information_schema`, `performance_schema`, `db_helper`, `sys`, `mysql`, `rds_maintenance` 는 DB 스키마 이름으로 사용할 수 없습니다.

생성된 DB 스키마의 이름은 수정할 수 없습니다.

#### DB 스키마 삭제

![db-instance-detail-schema-delete-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-schema-delete-ja.png)

❶ 삭제할 DB 스키마를 선택 후 드롭다운 메뉴를 클릭합니다.
❷ **삭제** 메뉴를 클릭하면 삭제 확인 팝업 창이 나타납니다. **확인** 버튼을 클릭하여 삭제 요청할 수 있습니다.

#### 사용자 생성

![db-instance-detail-user-create-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-user-create-ja.png)

❶ **생성** 버튼을 클릭하면 사용자 생성에 필요한 정보를 입력할 수 있는 팝업 창이 나타납니다.
❷ 사용자 ID를 입력합니다.

사용자 ID는 아래와 같은 제약 사항이 있습니다.

* 1~32자 사이의 글자이어야 합니다.
* `mysql.session`, `mysql.sys`, `mysql.infoschema`, `sqlgw`, `admin`, `etladm`, `alertman`, `prom`, `rds_admin`, `rds_mha`, `rds_repl` 은 사용자 ID로 사용할 수 없습니다.

❸ Password를 입력합니다.
❹ 접속을 허용할 Host IP를 입력합니다. `%` 문자를 이용하면 허용할 Host IP를 범위로 지정할 수 있습니다. 예를 들어 `1.1.1.%` 는 `1.1.1.0`~`1.1.1.255` 사이의 모든 IP를 의미합니다.
❺ 사용자에게 부여할 권한을 선택합니다. 부여할 수 있는 권한과 설명은 다음과 같습니다.

**READ**
* 조회 권한을 가지고 있습니다.

```sql
GRANT SELECT, SHOW VIEW, PROCESS, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO '{user_id}'@'{host}';
GRANT SELECT ON `mysql`.* TO '{user_id}'@'{host}';
GRANT SELECT, EXECUTE ON `sys`.* TO '{user_id}'@'{host}';
GRANT SELECT ON `performance_schema`.* TO '{user_id}'@'{host}';
```

**CRUD**
* READ 권한을 포함하며, 데이터를 변경할 수 있는 권한을 가지고 있습니다.

```sql
GRANT INSERT, UPDATE, DELETE, CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE ON *.* TO '{user_id}'@'{host}';
```

**DDL**
* CRUD 권한을 포함하며, DDL 쿼리를 실행할 수 있는 권한을 가지고 있습니다.

```sql
GRANT CREATE, DROP, INDEX, ALTER, CREATE VIEW, REFERENCES, EVENT, ALTER ROUTINE, CREATE ROUTINE, TRIGGER, RELOAD ON *.* TO '{user_id}'@'{host}';
GRANT EXECUTE ON `mysql`.* TO '{user_id}'@'{host}';
```

**CUSTOM**
* 외부 데이터베이스 백업으로부터 DB 인스턴스를 복원한 경우, 데이터베이스에 존재하는 모든 사용자는 CUSTOM 권한으로 표현됩니다.
* CUSTOM 권한 템플릿에는 어떤 권한이 있는지 알 수 없습니다.
* CUSTOM 권한 템플릿에서 다른 권한 템플릿으로 변경한 경우 다시 CUSTOM 권한 템플릿으로 변경할 수 없습니다.

❻ 사용자 인증에 적용할 플러그인을 선택합니다. 선택할 수 있는 버전별 플러그인은 다음과 같습니다.

| 인증 플러그인               | 지원 버전                  |
|-----------------------|------------------------|
| mysql_native_password | 모든 버전                  |
| sha256_password       | 5.7.33 버전 이상 8.0 버전 미만 |
| caching_sha2_password | 8.0 버전 이상              |

❼ DB 인스턴스에 대한 연결 암호화 옵션을 선택합니다.

| TLS Option | 설명                                                               |
|------------|------------------------------------------------------------------|
| NONE       | 암호화된 연결을 적용하지 않습니다.                                              |
| SSL        | 암호화된 연결을 적용합니다.                                                  |
| X509       | 암호화된 연결을 적용하며 접속 시 인증서가 필요합니다. 접속에 필요한 인증서는 웹 콘솔에서 다운로드할 수 있습니다. | 

> [참고]
> 사용자 인증 플러그인과 TLS Option은 MySQL 5.7.33 버전 이상에서 지원합니다.

#### 인증서 다운로드

사용자 계정의 TLS Option을 X509로 설정한 경우 DB 인스턴스에 접속하려면 인증서가 필요합니다.

![db-instance-detail-user-cert-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-user-cert-ja.png)
![db-instance-detail-user-cert-down-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-user-cert-down-ja.png)

❶ 인증서를 내려받을 DB 인스턴스를 선택합니다.
❷ 드롭다운 메뉴를 클릭합니다.
❸ **인증서 다운로드** 메뉴를 클릭하면 인증서를 내려받을 수 있는 팝업 창이 나타납니다.
❹ 내려받을 파일의 **가져오기** 버튼을 클릭하면 인증서 파일을 내려받을 수 있도록 준비합니다.
❺ 내려받을 준비가 되면 **다운로드** 버튼이 나타납니다. **다운로드** 버튼을 클릭하면 인증서 파일을 내려받을 수 있습니다.

> [주의]
> **가져오기** 버튼을 클릭하면 약 5분간 인증서 파일이 백업 스토리지에 업로드되며 인증서 파일의 크기만큼 백업 스토리지 용량이 과금됩니다.
> **다운로드** 버튼을 클릭하면 인증서 파일의 크기만큼 인터넷 트래픽이 과금됩니다.

#### 사용자 수정

![db-instance-detail-user-modify-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-user-modify-ja.png)

❶ 수정하고자 하는 사용자의 **수정** 버튼을 클릭하면 사용자를 수정할 수 있는 팝업 창이 나타납니다.
❷ Password를 입력하지 않으면 변경하지 않습니다.
❸ 사용자 인증에 적용할 플러그인을 변경하려면 반드시 Password를 변경해야 합니다.

#### 사용자 삭제

![db-instance-detail-user-delete-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-detail-user-delete-ja.png)

❶ 삭제할 사용자를 선택 후 드롭다운 메뉴를 클릭합니다.
❷ **삭제** 메뉴를 클릭하면 삭제 확인 팝업 창이 나타납니다. **확인** 버튼을 클릭하여 삭제 요청할 수 있습니다.

## DB 인스턴스 수정

웹 콘솔을 통해 생성된 DB 인스턴스의 다양한 항목을 손쉽게 변경할 수 있습니다. 변경 요청한 항목은 순차적으로 DB 인스턴스에 적용합니다. 적용 과정에서 재시작이 필요할 경우 모든 변경을 적용한 후 DB 인스턴스를 재시작합니다. 변경 불가능한 항목과 재시작이 필요한 항목은 다음과 같습니다.

| 항목           | 변경 가능 여부 | 재시작 필요 여부               |
|--------------|----------|-------------------------|
| 가용성 영역       | 아니오      |                         |
| DB 엔진        | 예        | 예                       |
| DB 인스턴스 타입   | 예        | 예                       |
| 데이터 스토리지 종류  | 아니오      |                         |
| 데이터 스토리지 크기  | 예        | 예                       |
| 고가용성 여부      | 예        | 아니오                     |
| Ping 간격      | 예        | 아니오                     | 
| 이름           | 예        | 아니오                     |
| 설명           | 예        | 아니오                     |
| DB 포트        | 예        | 예                       |
| VPC 서브넷      | 아니오      |                         |
| 플로팅 IP       | 예        | 아니오                     |
| 파라미터 그룹      | 예        | 변경된 파라미터의 재시작 여부에 따라 결정 |
| DB 보안 그룹     | 예        | 아니오                     |
| 백업 설정        | 예        | 아니오                     |
| 스키마 & 사용자 제어 | 예        | 아니오                     |

고가용성 DB 인스턴스의 경우 재시작이 필요한 항목의 변경이 있으면 안정성을 높이고 순단 시간을 줄이기 위하여 장애 조치를 이용한 재시작 기능을 제공합니다. 

![db-instance-modify-ha-ja.png](https://static.toastoven.net/prod_rds/24.03.12/db-instance-modify-ha-ja.png)

장애 조치를 이용한 재시작을 사용하지 않으면 마스터와 예비 마스터에 변경 사항을 순차적으로 적용한 후 DB 인스턴스를 재시작합니다. 자세한 사항은 고가용성 DB 인스턴스의 [수동 장애 조치 항목](backup-and-restore/#mysql)을 참고합니다.

### DBスキーマ&ユーザー直接制御

RDS for MySQLではDBスキーマとユーザーを簡単に管理できるようにWebコンソールで管理機能を提供していますが、ユーザーが直接制御できるように設定する機能も提供しています。WebコンソールのDBインスタンス修正画面でDBスキーマ＆ユーザー直接制御の項目で設定できます。直接制御を使用すると、現在作成されているすべてのユーザーに下記の権限を付与します。

```sql
GRANT CREATE,DROP,LOCK TABLES,REFERENCES,EVENT,ALTER,INDEX,INSERT,SELECT,UPDATE,DELETE,CREATE VIEW,SHOW VIEW,CREATE ROUTINE,ALTER ROUTINE,EXECUTE,CREATE USER,PROCESS,RELOAD,REPLICATION SLAVE,REPLICATION CLIENT,SHOW DATABASES, CREATE TEMPORARY TABLES,TRIGGER ON *.* TO '{user_id}'@'{host}' WITH GRANT OPTION;
```

> [直接]
> コントロールを使用した後、再度使用しないに変更した時の注意点
> * 既に付与した権限を回収しません。 この時、コマンドを使用してDBスキーマやユーザーを追加すると、Webコンソールのデータと整合性が合わなくなる場合があります。
> * ユーザーに付与された権限と関係なく、データベースに存在するすべてのユーザーはCUSTOM権限で表現されます。

## DB 인스턴스 삭제

더 이상 사용하지 않는 DB 인스턴스는 삭제할 수 있습니다. 마스터를 삭제하게 되면, 해당 복제 그룹에 속한 예비 마스터와 읽기 복제본도 모두 함께 삭제됩니다. 삭제된 DB 인스턴스는 복구할 수 없으므로, 중요한 DB 인스턴스에 대해서는 삭제 보호 설정을 활성화하는 것이 좋습니다.

## バックアップ

障害状況に備えて、DBインスタンスのデータベースを復旧できるように事前に準備することができます。必要な時にWebコンソールでバックアップを実行したり、定期的にバックアップが実行されるように設定できます。 자세한 사항은 [백업](backup-and-restore/#_1) 항목을 참고합니다.

## 復元

バックアップを利用して希望の時点にデータを復元できます。復元時には常に新しいDBインスタンスが作成され、既存のDBインスタンスに復元することはできません。 자세한 사항은 [복원](backup-and-restore/#_6) 항목을 참고합니다.

### 容量確保

急激な負荷でバイナリログ(binary log)が過剰に生成され、ストレージの容量が不足する場合、Webコンソールの容量確保機能を利用してバイナリログを削除できます。Webコンソールで容量確保を選択すると、DBインスタンスのバイナリログを選択できるポップアップ画面が表示されます。バイナリログを選択した後、OKを押して選択した項目より前に生成された全てのバイナリログを削除します。容量確保機能は一時的に容量を確保する機能です。継続して容量が不足する場合は、サービス負荷に合わせてバイナリログの保存期間を設定するか、ストレージのサイズを拡張する必要があります。

> [参考]
> MySQL 5.7バージョン以下では`expire_logs_days`、MySQL 5.8バージョン以上では`binlog_expire_logs_seconds`パラメータでバイナリログ(binary log)の保存期間を設定できます。

> [注意]
> 削除されたバイナリログ(binary log)によっては、特定の時点への復元ができない場合があります。

## パラメータグループの変更事項適用

DB 인스턴스에 연결된 파라미터 그룹의 설정이 변경되어도, 이 변경사항은 DB 인스턴스에 자동으로 적용되지 않습니다. 만약 DB 인스턴스에 적용된 파라미터와 연결된 파라미터 그룹의 설정이 서로 다를 경우, 웹 콘솔에서 파라미터 버튼이 표시됩니다.

다음 방법 중 하나를 사용하여 DB 인스턴스에 파라미터 그룹의 변경사항을 적용할 수 있습니다.

![db-instance-list-parameter-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-list-parameter-ja.png)

❶ 대상 DB 인스턴스의 **파라미터** 버튼을 클릭하거나
❷ 대상 DB 인스턴스를 선택한 후 드롭다운 메뉴에서 **파라미터 그룹 변경 사항 적용** 메뉴를 클릭하거나
❸ 대상 DB 인스턴스의 기본 정보 탭에서 **파라미터 그룹 변경 사항 적용** 버튼을 클릭합니다.

파라미터 그룹에서 재시작을 필요로 하는 파라미터가 변경된 경우, 변경 사항을 적용하는 과정에서 DB 인스턴스가 재시작됩니다.

고가용성 DB 인스턴스의 경우 안정성을 높이고 순단 시간을 줄이기 위하여 장애 조치를 이용한 재시작 기능을 제공합니다.

![db-instance-parameter-ha-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-parameter-ha-ja.png)

장애 조치를 이용한 재시작을 사용하지 않으면 마스터와 예비 마스터에 변경 사항을 순차적으로 적용한 후 DB 인스턴스를 재시작합니다. 자세한 사항은 고가용성 DB 인스턴스의 [수동 장애 조치 항목](backup-and-restore/#mysql)을 참고합니다.

## 오브젝트 스토리지에 있는 백업으로 복원

외부 MySQL 백업 파일을 NHN Cloud의 사용자 오브젝트 스토리지에 업로드 하여 RDS for MySQL의 DB 인스턴스로 복원할 수 있습니다. 자세한 사항은 [외부 MySQL 백업을 이용한 복원](backup-and-restore/#mysql) 항목을 참고합니다.

## 오브젝트 스토리지로 백업 내보내기

백업을 수행함과 동시에 백업 파일을 NHN Cloud의 사용자 오브젝트 스토리지로 내보낼 수 있습니다. 자세한 사항은 [백업 내보내기](backup-and-restore/#_5) 항목을 참고합니다.

## リードレプリカの

読み取り性能を高めるために、読み取り専用に使用できるリードレプリカを作成できます。リードレプリカは1つのマスターに対して最大5台まで作成できます。リードレプリカのリードレプリカは作成できません。

### リードレプリカの作成

읽기 복제본을 생성하려면 복제 그룹에 속한 DB 인스턴스 중 테이블 잠금 사용 옵션으로 생성된 백업 파일 및 바이너리 로그(binary log)가 필요합니다. 백업 파일이 없는 경우, 다음 순서에 따라 백업을 수행할 DB 인스턴스를 선택합니다.

❶ 자동 백업 설정한 읽기 복제본
❷ 자동 백업 설정한 예비 마스터
❸ 자동 백업 설정한 마스터

조건에 맞는 DB 인스턴스가 없을 경우 읽기 복제본 생성 요청은 실패합니다.

> [注意]
> リードレプリカ作成時、マスターのI/O性能が通常より低くなることがあります。
> 백업이 수행 되는 DB 인스턴스의 경우 읽기 복제본 생성 과정에서 스토리지 I/O 성능 하락이 있을 수 있습니다.

> [参考]
> リードレプリカの作成過程で必要なバイナリログ(binary log)サイズ分、オブジェクトストレージ課金が発生する可能性があります。

읽기 복제본을 생성하려면 웹 콘솔에서

![db-instance-replica-create-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-replica-create-ja.png)

❶ 원본 DB 인스턴스를 선택한 후 **읽기 복제본 생성** 버튼을 클릭하면 읽기 복제본을 생성하기 위한 페이지로 이동합니다.

아래 설정들을 통하여 읽기 복제본을 생성할 수 있습니다.

#### 변경 불가 항목

읽기 복제본을 생성할 때 아래 나열된 항목들은 원본 DB 인스턴스의 설정을 따르기 때문에 변경할 수 없습니다.

* DBエンジン
* 데이터 스토리지 종류
* 사용자 VPC 서브넷

#### 읽기 복제본 리전

읽기 복제본을 생성할 리전을 선택할 때, 리전 피어링을 지원하는 경우 서로 다른 리전에 존재하는 VPC 간 리전 피어링을 연결하면 다른 리전 VPC에 속한 서브넷에 읽기 복제본을 생성할 수 있습니다. 단, 원본 DB 인스턴스의 리전과 다른 리전을 선택하면 복제 지연이 발생할 수 있으며, DB 버전 업그레이드를 지원하지 않습니다.

> [주의]
> 리전 피어링이 연결되어 있더라도 라우트 설정이 올바르지 않을 경우 읽기 복제본 생성에 실패하거나 복제가 중단될 수 있습니다.

#### アベイラビリティゾーン

읽기 복제본의 가용성 영역을 선택합니다. 자세한 설명은 [가용성 영역](./#_1) 항목을 참고합니다.

#### DBインスタンスタイプ

リードレプリカは、マスターと同じ仕様またはより高い仕様で作成することを推奨します。低い仕様で作成すると、複製遅延が発生する場合があります。

#### 데이터 스토리지 크기

원본 DB 인스턴스와 동일한 크기로 만드는 것을 권장합니다. 크기를 작게 설정할 경우, 데이터 스토리지 용량 부족으로 복제 과정이 중단될 수 있습니다.

#### 弹性IP

읽기 복제본의 플로팅 IP 사용 여부를 선택합니다. 자세한 설명은 [플로팅 IP](./#_1) 항목을 참고합니다.

#### パラメータグループ

읽기 복제본의 파라미터 그룹을 선택할 때, 복제 관련 설정 변경이 필요 없다면 원본 DB 인스턴스와 동일한 파라미터 그룹을 선택하는 것을 권장합니다. 파라미터 그룹에 대한 자세한 설명은 [파라미터 그룹](parameter-group/) 항목을 참고합니다.

#### DBセキュリティグループ

읽기 복제본에 적용할 DB 보안 그룹을 선택합니다. 복제에 필요한 규칙은 자동으로 적용되기 때문에, DB 보안 그룹에 별도로 복제 관련 규칙을 추가할 필요가 없습니다. DB 보안 그룹에 대한 자세한 설명은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.

### リードレプリカの昇格

마스터와의 복제 관계를 해제하고 읽기 복제본을 독립된 마스터로 전환하는 과정을 승격이라고 합니다. 승격된 마스터는 독립된 DB 인스턴스로서 작동하게 됩니다. 승격을 원하는 읽기 복제본과 마스터 사이에 복제 지연이 존재하는 경우, 해당 지연이 해결될 때까지 승격이 이루어지지 않습니다. 한 번 승격된 DB 인스턴스는 이전의 복제 관계로 되돌릴 수 없습니다.

> [주의]
> 마스터 DB 인스턴스의 상태가 비정상일 경우에는 승격 작업을 진행할 수 없습니다.

> [참고]
> 읽기 복제본이 위치한 리전과 동일한 리전의 웹 콘솔을 통해 승격 작업을 수행할 수 있습니다.

### リードレプリカの強制昇格

마스터나 원본 리전의 상태와 관계없이, 읽기 복제본의 현재 시점 데이터를 기반으로 강제 승격을 진행합니다. 복제 지연이 있는 경우 데이터 유실이 발생할 수 있습니다. 따라서, 읽기 복제본을 긴급하게 서비스에 투입해야 하는 상황이 아니라면, 이 기능의 사용은 권장하지 않습니다.

### リードレプリカの複製中断

リードレプリカは、さまざまな理由で複製が中断されることがあります。リードレプリカの状態が`複製中断`の場合、すぐに原因を確認して正常化する必要があります。`複製中断`状態が長時間続く場合、複製ディレイが長くなります。正常化に必要なバイナリログ(binary log)がない場合、リードレプリカを再構築する必要があります。複製が中断した原因はリードレプリカで`SHOW SLAVE STATUS`コマンドを使用して確認できます。`Last_Errno`の値が1062の場、以下のProcedureをエラーが消えるまで呼び出せます。

```
mysql> CALL mysql.tcrds_repl_skip_repl_error();
```

### リードレプリカの再構築

읽기 복제본의 복제 문제를 해결할 수 없는 경우, 재구축을 통해 정상 상태로 복원할 수 있습니다. 이 과정에서 읽기 복제본의 모든 데이터베이스를 삭제하고, 마스터 데이터베이스를 기반으로 새롭게 재구축합니다. 재구축하는 동안 읽기 복제본은 사용할 수 없습니다. 읽기 복제본을 재구축 하려면 복제 그룹에 속한 DB 인스턴스 중 테이블 잠금 사용 옵션으로 생성된 백업 파일 및 바이너리 로그(binary log)가 필요합니다. 백업 파일이 없는 경우 동작 및 주의 사항은 [읽기 복제본 생성](./#_1) 항목을 참고합니다.

> [참고]
> 재구축 후에도 접속 정보(도메인, IP)는 변경되지 않습니다

## DB 인스턴스 재시작

MySQL을 재시작 하거나 고가용성 DB 인스턴스를 수동으로 장애 조치하고자 할 때, DB 인스턴스를 재시작할 수 있습니다. 재시작 시간을 최소화하기 위해, 서비스 부하가 낮은 시간대에 재시작을 수행하는 것이 좋습니다. 고가용성 DB 인스턴스의 경우 장애 조치를 이용한 재시작을 사용하지 않을 경우 예비 마스터를 먼저 재시작 한후, 마스터를 재시작합니다. 장애 조치 기능을 이용한 재시작의 경우, [수동 장애 조치](./#_1) 항목을 참고합니다.

DB 인스턴스 재시작을 하려면 웹 콘솔에서

![db-instance-restart-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-restart-ja.png)

❶ 재시작을 원하는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **DB 인스턴스 재시작** 메뉴를 클릭합니다.

## DB 인스턴스 강제 재시작

DB 인스턴스의 MySQL이 정상 동작하지 않는 경우 강제로 재시작할 수 있습니다. 강제 재시작의 경우 MySQL에 SIGTERM 명령을 내려 정상 종료되기를 10분간 기다립니다. 10분 안에 MySQL이 정상 종료되면 이후 가상 머신을 재부팅합니다. 10분 안에 정상 종료되지 않으면 가상 머신을 강제로 재부팅합니다. 가상 머신이 강제로 재부팅되면 작업 중인 일부 트랜잭션이 유실될 수 있으며, 데이터 볼륨이 손상되어 복구가 불가능해질 수 있습니다. 강제 재시작 이후 DB 인스턴스의 상태가 사용 가능 상태로 돌아오지 않을 수 있습니다. 해당 상황 발생 시 고객 센터로 문의해 주세요.

> [주의]
> 데이터가 유실되거나 데이터 볼륨이 손상될 가능성이 있으므로 해당 기능은 긴급하고 불가피한 상황 이외에는 사용을 지양해야 합니다.

> [참고]
> 고가용성 DB 인스턴스의 경우 강제 재시작할 수 없습니다.

DB 인스턴스 강제 재시작을 하려면 웹 콘솔에서

![db-instance-restart-force-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-restart-force-ja.png)

❶ 강제 재시작을 원하는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **DB 인스턴스 강제 재시작** 메뉴를 클릭합니다.

## 삭제 보호 설정 변경

삭제 보호를 활성화하면 실수로 DB 인스턴스가 삭제되지 않도록 보호할 수 있습니다. 삭제 보호를 비활성화할 때까지 해당 DB 인스턴스를 삭제할 수 없습니다. 삭제 보호 설정을 변경하려면

![db-instance-deletion-protection-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-deletion-protection-ja.png)

❶ 삭제 보호 설정을 변경하려는 DB 인스턴스를 선택 후 드롭다운 메뉴에서 **삭제 보호 설정 변경** 메뉴를 클릭하면 팝업 창이 나타납니다.

![deletion-protection-popup-ja](https://static.toastoven.net/prod_rds/24.03.12/deletion-protection-popup-ja.png)

❷ 삭제 보호 설정을 변경한 후 **확인** 버튼을 클릭합니다.

## 高可用性DBインスタンス

高可用性DBインスタンスは可用性とデータ耐久性を増加させ、障害許容が可能なデータベースを提供します。高可用性DBインスタンスはマスター、予備マスターで構成され、異なるアベイラビリティゾーンに作成されます。予備マスターは障害に備えたDBインスタンスで、通常は使用できません。高可用性DBインスタンスの場合、予備マスターでバックアップが行われます。

> [参考]
> 高可用性DBインスタンスの場合、MySQLクエリ文を使用して他のDBインスタンスまたは外部MySQLのMasterから強制的に複製するように設定すると、高可用性および一部の機能が正常に動作しません。

### 障害検出

予備マスターには障害を検出するためのプロセスが存在し、定期的にマスターの状態を検出します。このような検出周期をPing間隔と呼び、4回連続状態チェックに失敗した場合、フェイルオーバーを実行します。Ping間隔が短いほど障害に敏感に反応し、Ping間隔が長いほど障害に鈍感に反応します。サービス負荷に合わせて適切なPing間隔を設定することが重要です。

> [参考]
> マスターのストレージ使用量がいっぱいになると、高可用性監視プロセスが障害として検出し、フェイルオーバーを実行するので注意してください。

### 自動フェイルオーバー

予備マスターでマスターの状態チェックに4回連続失敗した場合、マスターがサービスを提供できないと判断し、自動的にフェイルオーバーを実行します。スプリットブレイン防止のため、障害が発生したマスターに割り当てられたすべてのユーザーセキュリティグループの接続を解除して外部からの接続を遮断し、予備マスターがマスターの役割を代行します。接続のための内部ドメインのA
recordは障害が発生したマスターから予備マスターに変更されるので、アプリケーションの変更は必要ありません。フェイルオーバーが完了すると、障害が発生したマスターの種類はフェイルオーバーが発生したマスターに、予備マスターの種類はマスターに変更されます。フェイルオーバーが発生したマスターを復旧または再構築するまでフェイルオーバーは実行されません。昇格されたマスターは、フェイルオーバーが発生したマスターのすべての自動バックアップを継承します。フェイルオーバーの過程でマスターが変更されると、バイナリログがすべて削除されるため、既存のバックアップを利用した時点復元はサポートされません。昇格されたマスターで新規にバックアップが行われた時点から時点復元を行うことができます。

> [参考]
> 高可用性機能はドメインに基づいているため、接続をしようとするクライアントがDNSサーバーに接続できないネットワーク環境の場合、ドメインを介してDBインスタンスに接続することができず、フェイルオーバー発生時、正常な接続ができません。
> 内部ドメインのA recordの変更が反映されるのに約3秒程度かかります。所要時間は、接続を試みるクライアント環境のDNS Cacheポリシーによって異なる場合があります。

> [注意]
> マスターと予備マスター間のバイナリログ(binary log)のposition numberの値が100,000,000,000以上差がある場合、フェイルオーバーが行われません。

### フェイルオーバーが発生したマスター

障害が発生してフェイルオーバーが発生したマスターをフェイルオーバーが発生したマスターといいます。フェイルオーバーが発生したマスターの自動バックアップは行われず、フェイルオーバーが発生したマスターの復旧、再構築、分離、削除を除く他のすべての機能は実行できません。

### フェイルオーバーが発生したマスターの復旧

フェイルオーバーの過程でデータの整合性が崩れず、障害が発生した時点から復旧を試みる時点までバイナリログ(binary log)が失われなければフェイルオーバーが発生したマスターと昇格したマスターを再び高可用性構成で復旧できます。フェイルオーバーが発生したマスターのデータベースをそのまま昇格されたマスターと複製関係を再設定するため、データの整合性が崩れたり復旧に必要なバイナリログ(binary log)が失われた場合、復旧は失敗します。フェイルオーバーが発生したマスターの復旧に失敗した場合、再構築を通じて再び高可用性機能を有効にできます。

> [参考]
> 2023年4月11日以前にフェイルオーバーが発生したDBインスタンスの場合、復旧をサポートしません。

장애 조치된 마스터를 복구하려면 웹 콘솔에서

![db-instance-failover-repair-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-failover-repair-ja.png)

❶ 복구를 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 복구** 메뉴를 클릭합니다.

### フェイルオーバーが発生したマスターの再構築

フェイルオーバーが発生したマスターの復旧に失敗した場合、再構築を利用して再び高可用性機能を有効にできます。再構築は復旧とは異なり、フェイルオーバーが発生したマスターのデータベースを全て削除し、昇格されたマスターのデータベースを基に再構築します。백업 파일이 없는 경우, 다음 순서에 따라 백업을 수행할 DB 인스턴스를 선택합니다.

❶ 자동 백업 설정한 읽기 복제본
❷ 자동 백업 설정한 마스터

조건에 맞는 DB 인스턴스가 없을 경우 장애 조치된 마스터 재구축 요청은 실패합니다.

> [주의]
> 마스터의 데이터베이스 크기에 비례하여 장애 조치된 마스터 재구축 시간이 늘어날 수 있습니다.
> 백업이 수행 되는 DB 인스턴스의 경우 장애 조치된 마스터 재구축 과정에서 스토리지 I/O 성능 하락이 있을 수 있습니다.

> [참고]
> 장애 조치된 마스터 재구축 과정에 필요한 바이너리 로그(binary log) 크기만큼 백업 스토리지 과금이 발생할 수 있습니다.

장애 조치된 마스터를 재구축하려면 웹 콘솔에서

![db-instance-failover-rebuild-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-failover-rebuild-ja.png)

❶ 재구축을 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 재구축** 메뉴를 클릭합니다.

### 장애 조치된 마스터 분리

장애 조치된 마스터 복구에 실패하여 데이터 보정이 필요할 경우 장애 조치된 마스터를 분리하여 고가용성 기능을 비활성화할 수 있습니다. 분리된 마스터와 승격된 마스터 간의 복제 관계가 끊어지며 각각 일반 DB 인스턴스로 동작합니다. 분리된 이후에는 다시 원래 구성으로 복구가 불가능합니다.

장애 조치된 마스터를 분리하려면 웹 콘솔에서

![db-instance-failover-split-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-failover-split-ja.png)

❶ 분리를 원하는 장애 조치된 마스터를 선택 후 드롭다운 메뉴에서 **장애 조치된 마스터 분리** 메뉴를 클릭합니다.

### フェイルオーバーが発生したマスター分離

フェイルオーバーが発生したマスターの復旧に失敗してデータ補正が必要な場合、そのマスターを分離して高可用性機能を無効にできます。分離されたマスターと昇格されたマスター間の複製関係が切断され、それぞれ一般DBインスタンスとして動作します。分離後は既存の構成に戻せません。

### 手動フェイルオーバー

高可用性DBインスタンスの場合、再起動を伴う作業を実行すると、フェイルオーバーを利用した再起動を行うかどうかを選択でき、その作業は次のとおりです。

* DBインスタンスの再起動
* 재시작이 필요한 항목의 변경
* 재시작이 필요한 파라미터의 변경을 적용
* 하이퍼바이저 점검을 위한 DB 인스턴스 마이그레이션

フェイルオーバーを利用した再起動を行うと、予備マスターを先に再起動します。その後、フェイルオーバーにより予備マスターをマスターに昇格させ、既存のマスターは予備マスターの役割をすることになります。昇格時に接続のための内部ドメインのA recordはマスターから予備マスターに変更されるので、アプリケーションの変更は必要ありません。昇格されたマスターは、以前のマスターのすべての自動バックアップを継承します。フェイルオーバーの過程でマスターが変更され、バイナリログ(binary log)がすべて削除されるため、既存のバックアップを利用した時点復元はサポートしません。昇格されたマスターで新規にバックアップが行われた時点から時点復元を行うことができます。

> [주의]
> 예비 마스터와 복제 그룹에 포함된 읽기 복제본의 Seconds_Behind_Master 값이 1 이상일 경우 복제 지연이 발생한 것으로 간주하며, 이때 수동 장애 조치는 실패합니다. 부하가 적은 시간에 수동 장애 조치를 진행하는 것이 좋습니다. 복제 지연으로 인한 재시작 실패는 이벤트 화면을 통해 확인할 수 있습니다.

장애 조치를 이용한 재시작 시 다음의 항목을 추가로 선택하여 안정성을 높일 수 있습니다.

#### 현재 시점 백업 진행

장애 조치 과정에서 바이너리 로그(binary log)가 모두 삭제되기 때문에 장애 조치를 이용한 재시작이 완료된 후 곧바로 수동 백업을 진행할 수 있습니다.

#### 장애 조치 수동 제어

예비 마스터에 변경 사항을 먼저 적용한 다음 그 추이를 관찰하고자 하거나, 정확한 시간에 장애 조치를 실행하고 싶을 때가 있습니다. 이러한 요구를 충족하기 위해, 웹 콘솔을 통해 장애 조치 시점을 직접 제어할 수 있습니다. 장애 조치 수동 제어를 선택하면 예비 마스터가 재시작된 후 ❶ 웹 콘솔에 **장애 조치** 버튼이 표시됩니다. 이 버튼을 클릭하면 장애 조치가 실행되며, 최대 5일간 실행을 대기할 수 있습니다. 5일 이내에 장애 조치를 실행하지 않을 경우, 해당 작업은 자동으로 취소됩니다.

![db-instance-ha-wait-manual-failover-ja](https://static.toastoven.net/prod_rds/24.03.12/db-instance-ha-wait-manual-failover-ja.png)

> [주의]
> 장애 조치를 대기 하는 동안에는 자동 장애 조치가 되지 않습니다.

#### 복제 지연 해소 대기

복제 지연 해소 대기 옵션을 활성화하면, 예비 마스터와 복제 그룹에 포함된 읽기 복제본의 복제 지연이 사라질 때까지 대기할 수 있습니다.

#### 쓰기 부하 차단

복제 지연을 해소하는 동안 쓰기 부하를 추가로 차단하는 선택이 가능합니다. 쓰기 부하를 차단하면, 장애 조치를 수행하기 바로 전에 마스터가 읽기 전용 모드로 전환되어, 모든 변경 쿼리가 실패하도록 설정됩니다.

### 高可用性の一時停止

一時的な作業による接続中断や大量の負荷が予想される状況で、一時的に高可用性機能を停止できます。高可用性機能が一時停止されると、障害を検出しないため、フェイルオーバーを実行しません。高可用性機能が一時停止した状態で再起動が必要な作業を実行しても一時停止された高可用性機能が再開されません。高可用性機能が一時停止するとデータ複製は正常に行われず、障害が検出されないため、長時間一時停止状態に維持することは推奨しません。

### 予備マスター再構築

ネットワークの切断、誤ったFEDERATEDエンジンの使用、他のマスターからの複製設定など、さまざまな原因で予備マスター複製が中断されることがあります。複製中断状態の予備マスターは自動フェイルオーバーが実行されません。予備マスターの複製中断を解決するには予備マスターを再構築する必要があります。予備マスターの再構築時には予備マスターのデータベースをすべて削除し、マスターのデータベースを基に再構築します。この過程で再構築に必要なバックアップファイルがマスターデータベースに存在しない場合、マスターでバックアップが行われ、バックアップによる性能低下が発生する可能性があります。

## MySQL Procedure

RDS for MySQLはユーザーに利便性を提供するため、ユーザーアカウントで制限されるいくつかの機能を実行するプロシージャを独自に提供しています。

### tcrds_active_process

* ProcesslistでSleep状態ではなくACTIVE状態のクエリを照会します。
* 実行時間が古い順に出力され、クエリ内容(SQL)は100桁までしか出力されません。

```
mysql> CALL mysql.tcrds_active_process();
```

### tcrds_process_kill

* 特定のプロセスを強制終了します。
* 終了するプロセスIDはinformation_schema.processlistで確認でき、tcrds_active_processとtcrds_current_lockプロシージャを使ってプロセスの情報を確認できます。

```
mysql> CALL mysql.tcrds_process_kill(processlist_id );
```

### tcrds_current_lock

* 現在ロックを待っているプロセスとロックを占有しているプロセス情報を確認します。
* (w)カラム情報がロックを獲得するために待機しているプロセス情報。
* (B)カラム情報がロックを占有しているプロセス情報。
* ロックを占有しているプロセスを強制終了するには、(B)PROCESS列を確認した後、call tcrds_process_kill(process_id)を実行します。

```
mysql> CALL mysql.tcrds_current_lock();
```

### tcrds_repl_changemaster

* 複製を利用して外部MySQL DBをNHN Cloud RDSにインポートする時使います。
* NHN Cloud RDSの複製構成は、コンソールの**複製の作成**で行うことができます。

```
mysql> CALL mysql. tcrds_repl_changemaster (master_instance_ip, master_instance_port, user_id_for_replication, password_for_replication_user, MASTER_LOG_FILE, MASTER_LOG_POS);
```

* パラメータの説明
    * master_instance_ip:複製対象(Master)サーバーのIP
    * master_instance_port:複製対象(Master)サーバーのMySQLポート
    * user_id_for_replication:複製対象(Master)サーバーのMySQLに接続する複製用アカウント
    * password_for_replication_user:複製用アカウントパスワード
    * MASTER_LOG_FILE:複製対象(Master)のbinary logファイル名
    * MASTER_LOG_POS:複製対象(Master)のbinary logポジション

```
ex) call mysql.tcrds_repl_changemaster('10.162.1.1',10000,'db_repl','password','mysql-bin.000001',4);
```

> [注意]複製用アカウントが複製対象(Master) MySQLに作成されている必要があります。

### tcrds_repl_init

* MySQL複製情報を初期化します。

```
mysql> CALL mysql.tcrds_repl_init();
```

### tcrds_repl_slave_stop

* MySQLの複製を止めます。

```
mysql> CALL mysql.tcrds_repl_slave_stop();
```

### tcrds_repl_slave_start

* MySQLの複製を開始します。

```
mysql> CALL mysql.tcrds_repl_slave_start();

```

### tcrds_repl_skip_repl_error

* SQL_SLAVE_SKIP_COUNTER=1を実行します。次のようなDuplicate keyエラー発生時、tcrds_repl_skip_repl_errorプロシージャを実行すると、複製エラーを解決できます。
* `MySQL error code 1062: 'Duplicate entry ? for key ?'`

```
mysql> CALL mysql.tcrds_repl_skip_repl_error();
```

### tcrds_repl_next_changemaster

* Masterの次のバイナリ(binary log)ログを読めるように複製情報を変更します。
* 次のような複製エラーが発生した場合、tcrds_repl_next_changemasterプロシージャを実行すると、複製エラーを解決できます。

例) MySQL error code 1236 (ER_MASTER_FATAL_ERROR_READING_BINLOG): Got fatal error from master when reading data from binary log

```
mysql> CALL mysql.tcrds_repl_next_changemaster();
```

### tcrds_innodb_monitor_reset

* information_schema.INNODB_METRICSテーブルのcounterを0にリセットするinnodb_monitor_reset variablesを実行するプロシージャです。
* `SET GLOBAL innodb_monitor_reset = '{counter-name|module_name|pattern|all}';`クエリを実行します。
* innodb_monitor_enable、innodb_monitor_disableはRDSパラメータで提供します。

```
mysql> CALL mysql.tcrds_innodb_monitor_reset('{counter-name|module_name|pattern|all}');
```

```
ex) CALL mysql.tcrds_innodb_monitor_reset('dml_reads');
CALL mysql.tcrds_innodb_monitor_reset('module_dml');
```

### tcrds_innodb_monitor_reset_all

* counter値をリセットするinnodb_monitor_reset_all variablesを実行するプロシージャです。
* innodb_monitor_reset_allを使用するには、counterがdisable状態である必要があります。
* `SET GLOBAL innodb_monitor_reset_all = '{counter-name|module_name|pattern|all}';`クエリを実行します。

```
mysql> CALL mysql.tcrds_innodb_monitor_reset_all('{counter-name|module_name|pattern|all}');
```

## データマイグレーション

* RDSはmysqldumpを利用してNHN Cloud RDSの外部にデータをエクスポートしたり、外部からインポートできます。
* mysqldumpユーティリティはMySQLをインストールした時、基本的に提供されます。

### mysqldumpを利用してエクスポート

* NHN Cloud RDSのインスタンスを準備して使用します。
* エクスポートするデータを保存する外部インスタンス、もしくはローカルクライアントがインストールされたコンピュータの容量が十分に確保されていることを確認します。
* NHN Cloudの外部にデータをエクスポートする場合、Floating IPを作成してデータをエクスポートするRDSインスタンスに接続します。
* 下記のmysqldumpコマンドを使って外部にデータをエクスポートします。

#### ファイルにエクスポートする場合

```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

#### NHN Cloud RDS外部のMySQL DBにエクスポートする場合

```
mysqldump -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port}
```

### mysqldumpを利用してインポート

* データをインポートするNHN Cloud RDS外部のDBを準備します。
* インポートするNHN Cloud RDSインスタンスの容量が十分か確認します。
* Floating IPを作成してNHN Cloud RDSインスタンスに接続します。
* 下記のmysqldumpコマンドで外部からデータをインポートします。

```
mysqldump -h{external_db_host} -u{external_db_id} -p{external_db_password} --port={external_db_port} --single-transaction --set-gtid-purged=off --routines --events --triggers --databases {database_name1, database_name2, ...} | mysql -h{rds_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port}
```

#### データのインポート中に`ERROR 1227`エラーが発生した場合

* `ERROR 1227`エラーはmysqldumpファイルの保存されたオブジェクト(トリガー、ビュー、関数またはイベント)にDEFINERが定義されている時に発生します。これを解決するためには、mysqldumpファイルで`DEFINER`部分を削除してください。

#### データのインポート中に`ERROR 1418`エラーが発生する場合

* `ERROR 1418`エラーはmysqldumpファイルの関数宣言にNO SQL、READS SQL DATA, DETERMINISTICがなく、バイナリログが有効な状態の時に発生します。
    * 詳細については[The Binary Log](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html) MySQL文書を参照してください。
* これを解決するためには、mysqldumpファイルを適用するDBインスタンスの`log_bin_trust_function_creators`パラメータの値を`1`に変更する必要があります。

### 複製を利用してエクスポート

* 複製を利用してNHN Cloud RDSのデータを外部DBにエクスポートできます。
* 外部DBのバージョンは、NHN Cloud RDSのバージョンと同じか、それより新しいバージョンである必要があります。
* データをエクスポートするNHN Cloud RDS MasterまたはRead Only Slaveインスタンスを準備します。
* Floating IPを生成してデータをエクスポートするNHN Cloud RDSインスタンスに接続します。
* 下記のコマンドでNHN Cloud RDSインスタンスからデータをファイルにエクスポートします。
* Master RDSインスタンスからエクスポートする場合

```
mysqldump -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* Read Only Slave RDSインスタンスからエクスポートする場合

```
mysqldump -h{rds_read_only_slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* バックアップされたファイルを開いて、コメントに書かれたMASTER_LOG_FILE及びMASTER_LOG_POSを別に記録します。
* NHN Cloud RDSインスタンスからデータをバックアップする外部ローカルクライアントまたはDBがインストールされたコンピュータの容量が十分であることを確認します。
* 外部DBのmy.cnf(Windowsの場合my.ini)ファイルに下記のようなオプションを追加します。
* server-idの場合、NHN Cloud RDSインスタンスのDB Configuration項目のserver-idと違う値を入力します。

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* 外部DBを再起動します。
* バックアップされたファイルを下記のコマンドで外部DBに入力します。

```
mysql -h{external_db_host} -u{exteranl_db_id} -p{external_db_password} --port={exteranl_db_port} < {local_path_and_file_name}
```

* NHN Cloud RDSインスタンスで複製に使用するアカウントを作成します。
* 新しく複製を設定する前に、もしかしたら存在するかもしれない既存のレプリケーション情報を初期化するために下記のクエリを実行します。この時、RESET SLAVEを実行すると、既存の複製情報が初期化されます。

```
STOP SLAVE;

RESET SLAVE;
```

* 複製に使うアカウント情報と、先ほど別に記録しておいたMASTER_LOG_FILEとMSATER_LOG_POSを使って外部DBに下記のようにクエリを実行します。

```
CHANGE MASTER TO master_host = '{rds_master_instance_floating_ip}', master_user='{user_id_for_replication}', master_password='{password_forreplication_user}', master_port ={rds_master_instance_port}, master_log_file ='{MASTER_LOG_FILE}', master_log_pos = {MASTER_LOG_POS};

START SLAVE;
```

* 外部DBとNHN Cloud RDSインスタンスの原本データが同じになったら、外部DBにSTOP SLAVEコマンドを利用して複製を終了します。

### 複製を利用してインポート

* 複製を利用して外部DBをNHN Cloud RDSにインポートできます。
* NHN Cloud RDSのバージョンは外部DBのバージョンと同じか、それより新しいバージョンでなければなりません。
* データをエクスポートする外部MySQLインスタンスに接続します。
* 下記のコマンドで外部MySQLインスタンスからデータをバックアップします。
* 外部MySQLインスタンス(マスター)からインポートする場合

```
mysqldump -h{master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --master-data=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* 外部MySQLインスタンス(スレーブ)からインポートする場合

```
mysqldump -h{slave_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} --single-transaction --dump-slave=2 --routines --events --triggers --databases {database_name1, database_name2, ...} > {local_path_and_file_name}
```

* バックアップされたファイルを開いて、コメントのMASTER_LOG_FILE及びMASTER_LOG_POSを別に記録します。
* NHN Cloud RDSインスタンスからデータをバックアップするクライアントやコンピュータの容量が十分か確認します。
* 外部DBのmy.cnf(Winodwsの場合はmy.ini)ファイルに下記のオプションを追加します。
* server-idの場合、NHN Cloud RDSインスタンスのDB Configuration項目のserver-idと異なる値を入力します。

```
...
[mysqld]
...
server-id={server_id}
replicate-ignore-db=rds_maintenance
...
```

* 外部DBを再起動します。
* 外部ネットワークからインポート(import)すると時間がかかる場合があるので、内部NHN Cloud Imageを作成してバックアップファイルをコピーした後、NHN Cloudにインポートすることを推奨します。
* バックアップされたファイルを下記のコマンドでNHN Cloud RDSに入力します。
* 複製構成はDNSをサポートしていないため、IPに変換して実行します。

```
mysql -h{rds_master_insance_floating_ip} -u{db_id} -p{db_password} --port={db_port} < {local_path_and_file_name}
```

* 外部MySQLインスタンスで複製に使うアカウントを作成します。

```
mysql> CREATE USER 'user_id_for_replication'@'{external_db_host}' IDENTIFIED BY '<password_forreplication_user>';
mysql> GRANT REPLICATION CLIENT, REPLICATION SLAVE ON *.* TO 'user_id_for_replication'@'{external_db_host}';
```

* レプリケーションに使うアカウント情報と先に記録しておいたMASTER_LOG_FILE, MSATER_LOG_POSを利用してNHN Cloud RDSに次のようにクエリを実行します。

```
mysql> call mysql.tcrds_repl_changemaster ('rds_master_instance_floating_ip',rds_master_instance_port,'user_id_for_replication','password_forreplication_user','MASTER_LOG_FILE',MASTER_LOG_POS );
```

* レプリケーションを開始するには下記のプロシージャを実行します。

```
mysql> call mysql.tcrds_repl_slave_start;
```

* 外部DBとNHN Cloud RDSインスタンスの元データが同じになったら、下記のコマンドを利用して複製を終了します。

```
mysql> call mysql.tcrds_repl_init();
```

## 付録

### 付録1. ハイパーバイザメンテナンスのためのDBインスタンスマイグレーションガイド

NHN Cloudは周期的にDBインスタンスのハイパーバイザソフトウェアをアップデートしてセキュリティと安定性を向上させています。
メンテナンス対象ハイパーバイザで起動中のDBインスタンスは、マイグレーションを通してメンテナンスが完了したハイパーバイザに移動する必要があります。

DBインスタンスのマイグレーションはNHN Cloudコンソールで開始できます。
DB構成に応じて特定DBインスタンスを選択してマイグレーションする時、関連するDBインスタンス(例えばSlaveインスタンス)もメンテナンス対象の場合は一緒にマイグレーションを進行します。
下記のガイドに従ってコンソールにあるマイグレーション機能を利用してください。
メンテナンス対象に指定されたDBインスタンスがあるプロジェクトに移動します。

#### 1. メンテナンス対象DBインスタンスを確認します。

名前の横にマイグレーションボタンがあるDBインスタンスがメンテナンス対象のインスタンスです。

![rds_planed_migration_0](https://static.toastoven.net/prod_rds/planned_migration_alarm/image0_ja.png)

マイグレーションボタンにマウスオーバーすると、メンテナンス日程の詳細を確認できます。

![rds_planed_migration_1](https://static.toastoven.net/prod_rds/planned_migration_alarm/image1_ja.png)

#### 2. メンテナンス対象DBインスタンスに接続中のアプリケーションソフトウェアを終了する必要があります。

DBに接続しているサービスに影響を与えないように、適切な措置を取ってください。
やむを得ずサービスに影響を与えてしまう時は、NHN Cloudサポートに連絡してくだされば、適切な措置を案内いたします。

#### 3. メンテナンス対象DBインスタンスを選択してマイグレーションボタンをクリックし、DBインスタンスマイグレーションの確認ウィンドウが表示されたら確認ボタンをクリックします。

![rds_planed_migration_2](https://static.toastoven.net/prod_rds/planned_migration_alarm/image2_ja.png)

#### 4. DBインスタンスのマイグレーションが終わるまで待機します。

DBインスタンスの状態が変更されない場合は「更新」を行ってください。

![rds_planed_migration_3](https://static.toastoven.net/prod_rds/planned_migration_alarm/image3_ja.png)

DBインスタンスのマイグレーション中は何も操作ができません。
DBインスタンスのマイグレーションが正常に完了しなかった場合、自動的に管理者に報告され、NHN Cloudから別途連絡いたします。

### 付録2. RDSを利用してFederated Storage Engine使用するときの構成ガイド

Federated Storage Engineを使用する場合、次を考慮する必要があります。

#### ローカルノードとしてRDSを利用する構成の場合

* リモートノードへの送信を許可する設定が必要です。
  * DB 보안 그룹에서 규칙을 추가할 수 있습니다.
  * 자세한 사항은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.
* ローカルノード役割のRDSにRead Only Slaveを追加した構成で使用する場合は、 DB Configurationのreplicate-ignore-tableにfederated設定されたテーブル名を指定する必要があります。
  * Read Only Slaveを構成する場合、 federatedテーブルも複製され、MasterとRead Only Slaveがリモートノードを一緒に見ます。
  * この場合、Masterに行ったデータ入力がfederated設定によってリモートノードにも行われ、Read Only Slaveでも同様に同じ入力が行われ、重複キーエラーなどによるレプリケーション中断が発生することがあります。
  * Read Only Slaveがfederatedテーブルを複製しないようにreplicate-ignore-tableに設定する必要があります。

#### リモートノードとしてRDSを利用する構成の場合

* ローカルノードでの受信を許可する設定が必要です。
  * DB 보안 그룹에서 규칙을 추가할 수 있습니다.
  * 자세한 사항은 [DB 보안 그룹](db-security-group/) 항목을 참고합니다.