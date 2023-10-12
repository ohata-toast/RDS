## Database > RDS for MySQL > 릴리스 노트

### 2023. 10. 31.

#### 기능 추가 및 개선

* 고가용성 구성 및 읽기 복제본 추가 시 읽기 복제본의 백업도 사용하여 생성할 수 있도록 개선
* 기존에 생성된 MySQL 5.7.33 버전 이상의 고가용성 인스턴스도 인증 플러그인과 TLS 옵션을 사용할 수 있도록 활성화 기능 추가
* MySQL 8.0.33, MySQL 8.0.34 버전 추가
* API v3.0 추가 및 변경
    * 복원될 마지막 쿼리 조회 API 추가
    * DB 인스턴스 수정하기 API 요청에 `dbVersion`, `useDummy` 필드 추가
    * DB 인스턴스 상세 보기 API 응답에 `needToApplyParameterGroup`, `needMigration`, `supportDbVersionUpgrade` 필드 추가

### 2023.05.30

#### 신규 상품 출시

* RDS for MySQL 서비스를 사용할 수 있음
