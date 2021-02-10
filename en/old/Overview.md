## Upcoming Products > RDS > Overview

NHN Cloud Relational Database Service (RDS) 는 Relational Database 를 클라우드 환경에서 제공하는 상품입니다.
복잡한 설정 없이 고가용성의 Relational Database 사용할 수 있습니다.

## 특징 및 기능 

### DB 인스턴스

* 원하는 즉시 생성할 수 있는 Database 서버입니다.

### Management

* 원하는 시간에 자동으로 백업을 수행합니다.
* 서비스에 영향을 가지 않는 시각에 여러 관리 작업을 할 수 있습니다.

### High Availability

*  복잡한 설정없이 마우스 클릭 몇번으로 고가용성 기능을 제공합니다.
*  Master DB Instance 의 장애 발생 시, Candidate Master DB Instance 로 자동으로 Failover 됩니다.

### Monitoring

* 별도의 설치 과정없이 DB Instance 의 하드웨어 및 Database 의 상태를 모니터링할 수 있습니다. 이상 징후에 대해 알림을 설정함으로써 빠르게 대응할 수 있습니다.

## 용어 설명

### DB 인스턴스

* RDS 에서 제공하는 Relational Database 의 단위입니다.
* DB 인스턴스는 가상 장비와 설치된 Relational Database 를 아우르는 개념입니다.
* NHN Cloud 의 Compute & Network 상품에서 제공하는 모든 사양의 가상 장비로 DB 인스턴스를 생성 할 수 있습니다.
* DB 인스턴스는 최소 20 GB ~ 600 GB 크기의 HDD 스토리지를 지원합니다.
* 더 나은 성능을 원하면 Fusion I/O 사양의 가상장비를 선택 할 수 있습니다.
* DB 인스턴스의 운영체제에 직접 접근 할 수 없으며, 오직 DB 인스턴스 생성 시 입력하신 port 를 통해서 Database 로만 접근 할 수 있습니다.
* DB 인스턴스는 외부 네트워크와 단절되어 있습니다. 외부에서 연결을 원하면 Floating IP 를 붙여야 합니다.
* 만약 Compute & Network 상품을 이용 중이라면, DB 인스턴스 생성 시, 연결을 원하시는 subnet 을 설정 할 수 있습니다.
* 연결된 subnet 에 있는 DB 인스턴스와 인스턴스 간에는 네트워크 연결이 활성화 됩니다.

### Availability Zone

* DB 인스턴스가 생성될 논리적인 구역을 의미합니다.

### Floating IP

* 외부와 통신하기 위한 유동 IP 입니다.
* Floating IP 가 연결된 DB 인스턴스의 Database 는 외부에서 접속이 가능합니다.
* Floating IP 는 생성하는 즉시 DB 인스턴스와는 별도로 요금이 부과됩니다.