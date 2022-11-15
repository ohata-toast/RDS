## Database > RDS for MySQL > 릴리스 노트

### 2022. 11. 29.

#### 기능 추가

* MySQL 5.7.37, MySQL 8.0.28 버전 추가

#### 버그 수정

* 웹 브라우저의 개발자 콘솔에 오류 메시지가 남는 현상 수정
* **테이블 잠금 사용 안함** 상태의 단일 인스턴스를 고가용성 인스턴스로 변경 시 백업이 실패하는 현상 수정
* 더 이상 사용하지 않는 이벤트 코드 제거
* 특정 조건에서 간헐적으로 읽기 복제본을 삭제할 수 없는 문제 수정
* `default_authentication_plugin`파라미터를 `sha256_password`로 설정하면 고가용성 구성이 풀리는 문제 수정

### 2022. 10. 04.

#### 신규 상품 출시

* TOAST Relational Database Service (RDS) 는 Relational Database 를 클라우드 환경에서 제공하는 상품입니다.
* 복잡한 설정 없이 Relational Database 사용할 수 있습니다.
