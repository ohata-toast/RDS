## Database > RDS for MySQL > 개요

NHN Cloud Cloud Relational Database Service (RDS) 는 Relational Database 를 클라우드 환경에서 제공하는 상품입니다.
복잡한 설정 없이 고가용성의 Relational Database 사용할 수 있습니다.

## 특징 및 기능 

* RDS for MySQL은 사용자의 Compute & Network 상품을 활성화해야만 사용할 수 있습니다.

### DB 인스턴스

* 원하는 즉시 생성할 수 있는 Database 서버입니다.

### Management

* 원하는 시간에 자동으로 백업을 수행합니다.
* 서비스에 영향을 가지 않는 시각에 여러 관리 작업을 할 수 있습니다.

### Monitoring

* 별도의 설치 과정없이 DB Instance 의 하드웨어 및 Database 의 상태를 모니터링할 수 있습니다. 이상 징후에 대해 알림을 설정함으로써 빠르게 대응할 수 있습니다.

## 용어 설명

### DB 인스턴스

* RDS 에서 제공하는 Relational Database 의 단위입니다.
* DB 인스턴스는 가상 장비와 설치된 Relational Database 를 아우르는 개념입니다.
* NHN Cloud 의 Compute & Network 상품에서 제공하는 모든 사양의 가상 장비로 DB 인스턴스를 생성 할 수 있습니다.
* DB 인스턴스는 최소 20GB~2TB 크기의 HDD 및 SSD 스토리지를 지원합니다.
* DB 인스턴스의 운영체제에 직접 접근 할 수 없으며, 오직 DB 인스턴스 생성 시 입력하신 port 를 통해서 Database 로만 접근 할 수 있습니다.
* DB 인스턴스는 사용자의 Compute & Network 상품의 VPC Subnet을 선택해야만 생성할 수 있으며, 이를 통하여 사용자의 Compute & Network 상품의 Instance들과 통신이 가능합니다.
* DB 인스턴스는 사용자의 Subnet 이외의 외부 네트워크와 단절되어 있습니다. 외부에서 연결을 원하면 Floating IP 를 붙여야 합니다.
* 만약 Compute & Network 상품을 이용 중이라면, DB 인스턴스 생성 시, 연결을 원하시는 subnet 을 설정 할 수 있습니다.
* 연결된 subnet 에 있는 DB 인스턴스와 인스턴스 간에는 네트워크 연결이 활성화 됩니다.
* Master는 read, write가 가능한 일반적인 인스턴스입니다.
* Read Only Slave는 Master를 실시간으로 복제(replication)하는 인스턴스로, read만 가능합니다.
* Candidate Master는 고가용성 기능을 사용했을 때, 장애를 대비해 Master와 서로 다른 Availability Zone에 만들어 놓은 장애 대비용 인스턴스입니다.

### Availability Zone

* DB 인스턴스가 생성될 논리적인 구역을 의미합니다.

### Floating IP

* 외부와 통신하기 위한 유동 IP 입니다.
* Floating IP는 설정하고자 하는 DB 인스턴스와 연결된 사용자 VPC Subnet에 Internet Gateway가 연결되어 있어야 사용이 가능합니다.
* Floating IP 가 연결된 DB 인스턴스의 Database 는 외부에서 접속이 가능합니다.
* Floating IP 는 생성하는 즉시 DB 인스턴스와는 별도로 요금이 부과됩니다.

### 고가용성

* 고가용성 기능을 사용하면 현재 사용 중인 인스턴스나 해당 인스턴스가 있는 Availability Zone에 문제가 발생했을 때, 다른 Availability Zone에 만들어 놓은 Candidate Master 인스턴스에서 자동으로 장애 조치를 수행합니다. 따라서 데이터베이스의 장애 시간을 최대한 단축할 수 있습니다.
* Master 인스턴스에 대한 고가용성을 보장합니다.

### DB 파일 암호화

* DB 파일 암호화 기능을 사용하면 사용자 데이터가 저장되는 데이터베이스의 파일 및 백업 파일을 암호화할 수 있습니다. 
* 악의의 사용자가 DB 인스턴스를 탈취해도 사용자 데이터가 유출될 일 없이 안전하게 사용할 수 있습니다.