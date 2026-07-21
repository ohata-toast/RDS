## RDS for MySQL API 가이드

**Database > RDS for MySQL > API v3.0 가이드**

## RDS for MySQL API 공통 정보

### API 엔드포인트

| 리전 | 엔드포인트 |
|------|----------|
| 한국(대구) 리전 | https://ngoic-kr4-rds-proxy.cloud.toastoven.net |


### 인증 및 권한

RDS for MySQL API를 사용하려면 User Access Key가 필요합니다. User Access Key는 NHN Cloud 계정 또는 IAM 계정을 기반으로 발급되는 인증 키로, Secret Access Key와 함께 사용하여 API 요청에 대한 인증 수단으로 활용됩니다.

User Access Key와 Secret Access Key는 콘솔의 **API 보안 설정**에서 발급할 수 있습니다. User Access Key 발급 및 사용에 대한 자세한 내용은 [User Access Key](/nhncloud/ko/public-api/user-access-key)를 참고하세요.
생성된 Key는 Appkey와 함께 요청 헤더에 포함해야 합니다.

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| X-TC-APP-KEY | Header | String | Y | RDS for MySQL 서비스의 Appkey 또는 프로젝트 통합 Appkey |
| X-TC-AUTHENTICATION-ID | Header | String | Y | API 보안 설정 메뉴의 User Access Key ID |
| X-TC-AUTHENTICATION-SECRET | Header | String | Y | API 보안 설정 메뉴의 Secret Access Key |

또한 프로젝트 권한에 따라 호출할 수 있는 API가 제한됩니다. `RDS for MySQL ADMIN`, `RDS for MySQL VIEWER` 역할에는 아래처럼 기본 권한이 부여돼 있고 프로젝트 내 역할 그룹 관리 메뉴에서 필요한 권한만 부여할 수 있습니다.

* `RDS for MySQL ADMIN` 역할은 API 실행에 필요한 모든 권한이 부여됩니다.
* `RDS for MySQL VIEWER` 역할은 정보를 조회하는 권한만 부여됩니다.
    * DB 인스턴스를 생성, 수정, 삭제하거나, DB 인스턴스를 대상으로 하는 어떠한 기능도 사용할 수 없습니다.
    * 단, 알림 그룹과 사용자 그룹 관련된 기능은 사용할 수 있습니다.

API 요청 시 인증에 실패하거나 권한이 없을 경우 다음과 같은 오류가 발생합니다.

| resultCode | resultMessage | 설명 |
|------------|---------------|-----|
| 80401 | Unauthorized | 인증에 실패했습니다. |
| 80403 | Forbidden | 권한이 없습니다. |

### 응답 공통 정보

모든 API 요청에 '200 OK'로 응답합니다. 자세한 응답 결과는 응답 본문의 헤더를 참고합니다.

<details>
  <summary><strong>성공 응답</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

</details>

<details>
  <summary><strong>실패 응답</strong></summary>

```json
{
    "header": {
        "resultCode": -1,
        "resultMessage": "FAIL",
        "isSuccessful": false
    }
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| resultCode | Number | 결과 코드<br/>- 성공: `0`<br/>- 실패: `0`이 아닌 값 |
| resultMessage | String | 결과 메시지 |
| isSuccessful | Boolean | 성공 여부 |
### DB 엔진 유형

| DB 엔진 유형 | 생성 가능 여부 | OBS로부터 복원 가능 여부 | 인증 플러그인 지원 |
|------------|----------|------------------|------------|
| MYSQL_V5633 | X | X | NATIVE |
| MYSQL_V5715 | O | O | SHA256, NATIVE |
| MYSQL_V5719 | O | O | SHA256, NATIVE |
| MYSQL_V5726 | O | O | SHA256, NATIVE |
| MYSQL_V5731 | X | X | SHA256, NATIVE |
| MYSQL_V5733 | O | X | SHA256, NATIVE |
| MYSQL_V5737 | O | O | SHA256, NATIVE |
| MYSQL_V8018 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8023 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8028 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8032 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8033 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8034 | X | X | CACHING_SHA2, NATIVE |
| MYSQL_V8035 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8036 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8040 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8041 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8042 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8043 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8044 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8045 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8046 | O | O | CACHING_SHA2, NATIVE |
| MYSQL_V8405 | O | O | CACHING_SHA2 |
| MYSQL_V8406 | O | O | CACHING_SHA2 |
| MYSQL_V8407 | O | O | CACHING_SHA2 |
| MYSQL_V8408 | O | O | CACHING_SHA2 |
| MYSQL_V8409 | O | O | CACHING_SHA2 |

* ENUM 타입의 dbVersion 필드에 대해 해당 값을 사용할 수 있습니다.
* 버전에 따라 생성 또는 복원이 불가능한 경우가 있을 수 있습니다.

## 프로젝트 정보

### 프로젝트 멤버 목록 보기

#### 요청

```http
GET /v3.0/project/members
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "members": [
        {
            "memberId": "550e8400-e29b-41d4-a716-446655440000",
            "memberName": "memberName-example",
            "emailAddress": "user@example.com",
            "phoneNumber": "010-1234-5678"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| members | Array | 프로젝트 멤버 목록 |
| members.memberId | UUID | 프로젝트 멤버의 식별자 |
| members.memberName | String | 프로젝트 멤버의 이름 |
| members.emailAddress | String | 프로젝트 멤버의 이메일 주소 |
| members.phoneNumber | String | 프로젝트 멤버의 전화번호 |

---

### 리전 목록 보기

#### 요청

```http
GET /v3.0/project/regions
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "regions": [
        {
            "regionCode": "KR4",
            "isEnabled": false
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| regions | Array | 리전 목록 |
| regions.regionCode | Enum | 리전 코드<br/>- KR4: `한국(대구)` |
| regions.isEnabled | Boolean | 리전의 활성화 여부 |

---

## DB 인스턴스 사양

### DB 인스턴스 사양 목록 보기

#### 요청

```http
GET /v3.0/db-flavors
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbFlavors": [
        {
            "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
            "dbFlavorName": "dbFlavorName-example",
            "ram": 1,
            "vcpus": 1
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbFlavors | Array | DB 인스턴스 사양 목록 |
| dbFlavors.dbFlavorId | UUID | DB 인스턴스 사양의 식별자 |
| dbFlavors.dbFlavorName | String | DB 인스턴스 사양 이름 |
| dbFlavors.ram | Number | 메모리 용량(MB) |
| dbFlavors.vcpus | Number | CPU 코어 수 |

---

## 네트워크

### 서브넷 목록 보기

#### 요청

```http
GET /v3.0/network/subnets
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "subnets": [
        {
            "subnetId": "550e8400-e29b-41d4-a716-446655440000",
            "subnetName": "subnetName-example",
            "subnetCidr": "192.168.0.0/24",
            "usingGateway": false,
            "availableIpCount": 1
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| subnets | Array | 서브넷 목록 |
| subnets.subnetId | UUID | 서브넷의 식별자 |
| subnets.subnetName | String | 서브넷을 식별할 수 있는 이름 |
| subnets.subnetCidr | String | 서브넷의 CIDR |
| subnets.usingGateway | Boolean | 게이트웨이 사용 여부 |
| subnets.availableIpCount | Number | 사용 가능한 IP 수 |

---

## DB 엔진

### DB 엔진 목록 보기

#### 요청

```http
GET /v3.0/db-versions
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbVersions": [
        {
            "dbVersion": "MYSQL_V8036",
            "dbVersionName": "dbVersionName-example",
            "restorableFromObs": false
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbVersions | Array | DB 엔진 목록 |
| dbVersions.dbVersion | String | DB 엔진 유형 |
| dbVersions.dbVersionName | String | DB 엔진 이름 |
| dbVersions.restorableFromObs | Boolean | 오브젝트 스토리지로부터 복원 가능 여부 |

---

## 데이터 스토리지

### 스토리지 타입 목록 보기

#### 요청

```http
GET /v3.0/storage-types
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "storageTypes": [
        "General SSD",
        "General HDD"
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| storageTypes | Array | 스토리지 타입 목록 |

---

### 스토리지 목록 보기

#### 요청

```http
GET /v3.0/storages
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "storages": [
        "General SSD",
        "General HDD"
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| storages | Array | 스토리지 목록 |

---

## 작업 정보

### 작업 상태

| 상태명                | 설명                   |
|--------------------|----------------------|
| `PREPARING`        | 작업이 준비 중인 경우         |
| `READY`            | 작업이 준비 완료된 경우        |
| `RUNNING`          | 작업이 진행 중인 경우         |
| `COMPLETED`        | 작업이 완료된 경우           |
| `REGISTERED`       | 작업이 등록된 경우           |
| `WAIT_TO_REGISTER` | 작업 등록 대기 중인 경우       |
| `INTERRUPTED`      | 작업 진행 중 인터럽트가 발생한 경우 |
| `CANCELED`         | 작업이 취소된 경우           |
| `FAILED`           | 작업이 실패한 경우           |
| `ERROR`            | 작업 진행 중 오류가 발생한 경우   |
| `DELETED`          | 작업이 삭제된 경우           |
| `FAIL_TO_READY`    | 작업 준비에 실패한 경우        |

### 작업 정보 상세 보기

#### 요청

```http
GET /v3.0/jobs/{jobId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000",
    "jobStatus": "DELETED",
    "resourceRelations": [
        {
            "resourceType": "resourceType-example",
            "resourceId": "resourceId-example"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |
| jobStatus | Enum | 작업의 현재 상태<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- COMPLETED_WITH_ERROR<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Array | 연관 리소스 목록 |
| resourceRelations.resourceType | String | 연관 리소스 유형 |
| resourceRelations.resourceId | String | 연관 리소스의 식별자 |
| createdYmdt | DateTime | 생성 일시 |
| updatedYmdt | DateTime | 수정 일시 |

---

## DB 인스턴스 그룹

### DB 인스턴스 그룹 목록 보기

#### 요청

```http
GET /v3.0/db-instance-groups
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceGroups": [
        {
            "dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "replicationType": "STANDALONE",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbInstanceGroups | Array | DB 인스턴스 그룹 목록 |
| dbInstanceGroups.dbInstanceGroupId | UUID | DB 인스턴스 그룹의 식별자 |
| dbInstanceGroups.replicationType | Enum | DB 인스턴스 그룹의 복제 형태<br/>- STANDALONE: `고가용성 사용 안함`<br/>- HIGH_AVAILABILITY: `고가용성 사용` |
| dbInstanceGroups.createdYmdt | DateTime | 생성 일시 |
| dbInstanceGroups.updatedYmdt | DateTime | 수정 일시 |

---

### DB 인스턴스 그룹 상세 보기

#### 요청

```http
GET /v3.0/db-instance-groups/{dbInstanceGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "replicationType": "STANDALONE",
    "dbInstances": [
        {
            "dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
            "dbInstanceType": "MASTER",
            "dbInstanceStatus": "BEFORE_CREATE"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbInstanceGroupId | UUID | DB 인스턴스 그룹의 식별자 |
| replicationType | Enum | DB 인스턴스 그룹의 복제 형태<br/>- STANDALONE: `고가용성 사용 안함`<br/>- HIGH_AVAILABILITY: `고가용성 사용` |
| dbInstances | Array | DB 인스턴스 그룹에 속한 DB 인스턴스 목록 |
| dbInstances.dbInstanceId | UUID | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceType | Enum | DB 인스턴스의 역할 타입<br/>- MASTER: `마스터`<br/>- FAILED_MASTER: `장애 마스터`<br/>- CANDIDATE_MASTER: `예비 마스터`<br/>- READ_ONLY_SLAVE: `읽기 복제본` |
| dbInstances.dbInstanceStatus | Enum | DB 인스턴스의 현재 상태<br/>- BEFORE_CREATE: `생성 이전(회색)`<br/>- AVAILABLE: `사용 가능(녹색)`<br/>- STORAGE_FULL: `용량 부족(적색)`<br/>- FAIL_TO_CREATE: `생성 실패(적색)`<br/>- FAIL_TO_CONNECT: `연결 실패(적색)`<br/>- REPLICATION_STOP: `복제 중단(적색)`<br/>- REPLICATION_DELAY: `복제 지연(황색)`<br/>- FAILOVER: `장애 조치 완료(적색)`<br/>- SHUTDOWN: `중지됨(회색)`<br/>- DELETED: `삭제됨(회색)` |
| createdYmdt | DateTime | 생성 일시 |
| updatedYmdt | DateTime | 수정 일시 |

---

## DB 인스턴스

### DB 인스턴스 상태

| 상태                  | 설명                           |
|---------------------|------------------------------|
| `AVAILABLE`         | DB 인스턴스가 사용 가능한 경우           |
| `BEFORE_CREATE`     | DB 인스턴스가 생성 전인 경우            |
| `STORAGE_FULL`      | DB 인스턴스의 용량이 부족한 경우          |
| `FAIL_TO_CREATE`    | DB 인스턴스 생성에 실패한 경우           |
| `FAIL_TO_CONNECT`   | DB 인스턴스 연결에 실패한 경우           |
| `REPLICATION_STOP`  | DB 인스턴스의 복제가 중단된 경우          |
| `FAILOVER`          | DB 인스턴스가 고가용성 장애 조치된 경우      |
| `SHUTDOWN`          | DB 인스턴스가 중지된 경우              |
| `DELETED`           | DB 인스턴스가 삭제된 경우              |

### DB 인스턴스 진행 상태

| 상태                         | 설명           |
|----------------------------|--------------|
| `APPLYING_PARAMETER_GROUP` | 파라미터 그룹 적용 중 |
| `BACKING_UP`               | 백업 중         |
| `CANCELING`                | 취소 중         |
| `CREATING`                 | 생성 중         |
| `CREATING_SCHEMA`          | DB 스키마 생성 중  |
| `CREATING_USER`            | 사용자 생성 중     |
| `DELETING`                 | 삭제 중         |
| `DELETING_SCHEMA`          | DB 스키마 삭제 중  |
| `DELETING_USER`            | 사용자 삭제 중     |
| `EXPORTING_BACKUP`         | 백업을 내보내는 중   |
| `FAILING_OVER`             | 장애 조치 중      |
| `MIGRATING`                | 마이그레이션 중     |
| `MODIFYING`                | 수정 중         |
| `PREPARING`                | 준비 중         |
| `PROMOTING`                | 승격 중         |
| `REBUILDING`               | 재구축 중        |
| `REPAIRING`                | 복구 중         |
| `REPLICATING`              | 복제 중         |
| `RESTARTING`               | 재시작 중        |
| `RESTARTING_FORCIBLY`      | 강제 재시작 중     |
| `RESTORING`                | 복원 중         |
| `STARTING`                 | 시작 중         |
| `STOPPING`                 | 정지 중         |
| `SYNCING_SCHEMA`           | DB 스키마 동기화 중 |
| `SYNCING_USER`             | 사용자 동기화 중    |
| `UPDATING_USER`            | 사용자 수정 중     |

### DB 인스턴스 목록 보기

#### 요청

```http
GET /v3.0/db-instances
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstances": [
        {
            "dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
            "dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "dbInstanceName": "dbInstanceName-example",
            "description": "description-example",
            "dbVersion": "MYSQL_V8036",
            "dbPort": 1,
            "dbInstanceType": "MASTER",
            "dbInstanceStatus": "BEFORE_CREATE",
            "progressStatus": "NONE",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbInstances | Array | DB 인스턴스 목록 |
| dbInstances.dbInstanceId | UUID | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceGroupId | UUID | DB 인스턴스 그룹의 식별자 |
| dbInstances.dbInstanceName | String | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstances.description | String | DB 인스턴스에 대한 추가 정보 |
| dbInstances.dbVersion | String | DB 엔진 유형 |
| dbInstances.dbPort | Number | DB 포트 |
| dbInstances.dbInstanceType | Enum | DB 인스턴스 역할 타입<br/>- MASTER: `마스터`<br/>- FAILED_MASTER: `장애 마스터`<br/>- CANDIDATE_MASTER: `예비 마스터`<br/>- READ_ONLY_SLAVE: `읽기 복제본` |
| dbInstances.dbInstanceStatus | Enum | DB 인스턴스의 현재 상태<br/>- BEFORE_CREATE: `생성 이전(회색)`<br/>- AVAILABLE: `사용 가능(녹색)`<br/>- STORAGE_FULL: `용량 부족(적색)`<br/>- FAIL_TO_CREATE: `생성 실패(적색)`<br/>- FAIL_TO_CONNECT: `연결 실패(적색)`<br/>- REPLICATION_STOP: `복제 중단(적색)`<br/>- REPLICATION_DELAY: `복제 지연(황색)`<br/>- FAILOVER: `장애 조치 완료(적색)`<br/>- SHUTDOWN: `중지됨(회색)`<br/>- DELETED: `삭제됨(회색)` |
| dbInstances.progressStatus | Enum | DB 인스턴스의 현재 진행 상태<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbInstances.createdYmdt | DateTime | 생성 일시 |
| dbInstances.updatedYmdt | DateTime | 수정 일시 |

---

### DB 인스턴스 생성하기

#### 요청

```http
POST /v3.0/db-instances
```

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbInstanceName": "dbInstanceName",
    "dbInstanceCandidateName": "dbInstanceCandidateName",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbVersion": "MYSQL_V8036",
    "dbPort": 1,
    "dbUserName": "dbUserName",
    "dbPassword": "dbPassword",
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbSecurityGroupIds": [],
    "userGroupIds": [],
    "useHighAvailability": false,
    "pingInterval": 3,
    "useDefaultNotification": false,
    "useDeletionProtection": false,
    "authenticationPlugin": "NATIVE",
    "tlsOption": "NONE",
    "network": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "usePublicAccess": false,
        "availabilityZone": "kr-pub-a"
    },
    "storage": {
        "storageType": "General SSD",
        "storageSize": 20
    },
    "backup": {
        "backupPeriod": 0,
        "backupRetryCount": 0,
        "ftwrlWaitTimeout": 1800,
        "replicationRegion": "KR4",
        "useBackupLock": true,
        "backupSchedules": [
            {
                "backupWndBgnTime": "00:00:00",
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    }
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DB 인스턴스를 식별할 수 있는 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| dbInstanceCandidateName | String | N | DB 인스턴스를 식별할 수 있는 예비 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | UUID | Y | DB 인스턴스 사양의 식별자 |
| dbVersion | String | Y | DB 엔진 유형 |
| dbPort | Number | Y | DB 포트<br/>- 최솟값: 3306, 최댓값: 43306 |
| dbUserName | String | Y | DB 사용자 계정 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `32` |
| dbPassword | String | Y | DB 사용자 계정 암호<br/>- 최소 길이: `4`<br/>- 최대 길이: `256` |
| parameterGroupId | UUID | Y | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |
| useHighAvailability | Boolean | N | 고가용성 사용 여부<br/>- 기본값: `false` |
| pingInterval | Number | N | 고가용성 사용 시 Ping 간격(초)<br/>- 기본값: `3`<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| useDefaultNotification | Boolean | N | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Boolean | N | 삭제 보호 여부<br/>- 기본값: `false` |
| authenticationPlugin | Enum | N | 인증 플러그인<br/>- NATIVE: `mysql_native_password 인증`<br/>- CACHING_SHA2: `caching_sha2_password 인증(MySQL 전용)`<br/>- SHA256: `sha256_password 인증(MySQL 전용)` |
| tlsOption | Enum | N | TLS ìµì<br/>- 기본값: `NONE`<br/>- NONE: `TLS 미사용`<br/>- SSL: `SSL 인증`<br/>- X509: `X509 인증서 인증` |
| network | Object | Y | 네트워크 정보 객체 |
| network.subnetId | UUID | Y | 서브넷의 식별자 |
| network.usePublicAccess | Boolean | N | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Enum | Y | DB 인스턴스를 생성할 가용성 영역 |
| storage | Object | Y | 스토리지 정보 객체 |
| storage.storageType | Enum | Y | 스토리지 타입 |
| storage.storageSize | Number | Y | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| backup | Object | Y | 백업 정보 객체 |
| backup.backupPeriod | Number | Y | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.ftwrlWaitTimeout | Number | N | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backup.replicationRegion | Enum | N | 백업 복제 리전<br/>- KR4: `한국(대구)` |
| backup.useBackupLock | Boolean | N | 테이블 잠금 사용 여부<br/>- 기본값: `true` |
| backup.backupSchedules | Array | Y | 백업 스케줄 목록 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Enum | Y | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 오브젝트 스토리지를 이용한 DB 인스턴스 복원

#### 요청

```http
POST /v3.0/db-instances/restore-from-obs
```

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbInstanceName": "dbInstanceName",
    "dbInstanceCandidateName": "dbInstanceCandidateName",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbPort": 1,
    "dbVersion": "MYSQL_V8036",
    "useHighAvailability": false,
    "imageId": "550e8400-e29b-41d4-a716-446655440000",
    "pingInterval": 3,
    "storage": {
        "storageType": "General SSD",
        "storageSize": 20
    },
    "network": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "usePublicAccess": false,
        "availabilityZone": "kr-pub-a"
    },
    "backup": {
        "backupPeriod": 0,
        "ftwrlWaitTimeout": 1800,
        "backupRetryCount": 0,
        "replicationRegion": "KR4",
        "useBackupLock": true,
        "backupSchedules": [
            {
                "backupWndBgnTime": "00:00:00",
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    },
    "restore": {
        "tenantId": "0123456789abcdef0123456789abcdef",
        "username": "username-example",
        "password": "password-example",
        "targetContainer": "targetContainer-example",
        "objectPath": "objectPath-example"
    },
    "useDefaultNotification": false,
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbSecurityGroupIds": [],
    "userGroupIds": [],
    "useDeletionProtection": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DB 인스턴스를 식별할 수 있는 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| dbInstanceCandidateName | String | N | DB 인스턴스를 식별할 수 있는 예비 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | UUID | Y | DB 인스턴스 사양의 식별자 |
| dbPort | Number | N | DB 포트 |
| dbVersion | String | Y | DB 엔진 유형 |
| useHighAvailability | Boolean | N | 고가용성 사용 여부<br/>- 기본값: `false` |
| imageId | UUID | N | 이미지의 식별자 |
| pingInterval | Number | N | 고가용성 사용 시 Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| storage | Object | Y | 스토리지 정보 객체 |
| storage.storageType | Enum | Y | 스토리지 타입 |
| storage.storageSize | Number | Y | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| network | Object | Y | 네트워크 정보 객체 |
| network.subnetId | UUID | Y | 서브넷의 식별자 |
| network.usePublicAccess | Boolean | N | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Enum | Y | DB 인스턴스를 생성할 가용성 영역 |
| backup | Object | Y | 백업 정보 객체 |
| backup.backupPeriod | Number | Y | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.ftwrlWaitTimeout | Number | N | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backup.backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.replicationRegion | Enum | N | 백업 복제 리전<br/>- KR4: `한국(대구)` |
| backup.useBackupLock | Boolean | N | 테이블 잠금 사용 여부<br/>- 기본값: `true` |
| backup.backupSchedules | Array | Y | 백업 스케줄 목록 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Enum | Y | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |
| restore | Object | Y | 복원 정보 객체 |
| restore.tenantId | String | Y | 백업이 저장된 오브젝트 스토리지의 테넌트 ID |
| restore.username | String | Y | NHN Cloud 계정 또는 IAM 계정 ID |
| restore.password | String | Y | 백업이 저장된 오브젝트 스토리지의 API 비밀번호 |
| restore.targetContainer | String | Y | 백업이 저장된 오브젝트 스토리지의 컨테이너 |
| restore.objectPath | String | Y | 컨테이너에 저장된 백업의 경로 |
| useDefaultNotification | Boolean | N | 기본 알림 사용 여부<br/>- 기본값: `false` |
| parameterGroupId | UUID | Y | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |
| useDeletionProtection | Boolean | N | 삭제 보호 여부<br/>- 기본값: `false` |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 인스턴스 삭제하기

#### 요청

```http
DELETE /v3.0/db-instances/{dbInstanceId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 인스턴스 상세 보기

#### 요청

```http
GET /v3.0/db-instances/{dbInstanceId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
    "dbInstanceGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbInstanceName": "dbInstanceName-example",
    "description": "description-example",
    "dbVersion": "MYSQL_V8036",
    "dbPort": 1,
    "dbInstanceType": "MASTER",
    "dbInstanceStatus": "BEFORE_CREATE",
    "progressStatus": "NONE",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbSecurityGroupIds": [
        "550e8400-e29b-41d4-a716-446655440000"
    ],
    "notificationGroupIds": [
        "550e8400-e29b-41d4-a716-446655440000"
    ],
    "useDeletionProtection": false,
    "supportAuthenticationPlugin": false,
    "needToApplyParameterGroup": false,
    "needMigration": false,
    "supportDbVersionUpgrade": false,
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbInstanceId | UUID | DB 인스턴스의 식별자 |
| dbInstanceGroupId | UUID | DB 인스턴스 그룹의 식별자 |
| dbInstanceName | String | DB 인스턴스를 식별할 수 있는 이름 |
| description | String | DB 인스턴스에 대한 추가 정보 |
| dbVersion | String | DB 엔진 유형 |
| dbPort | Number | DB 포트 |
| dbInstanceType | Enum | DB 인스턴스 역할 타입<br/>- MASTER: `마스터`<br/>- FAILED_MASTER: `장애 마스터`<br/>- CANDIDATE_MASTER: `예비 마스터`<br/>- READ_ONLY_SLAVE: `읽기 복제본` |
| dbInstanceStatus | Enum | DB 인스턴스의 현재 상태<br/>- BEFORE_CREATE: `생성 이전(회색)`<br/>- AVAILABLE: `사용 가능(녹색)`<br/>- STORAGE_FULL: `용량 부족(적색)`<br/>- FAIL_TO_CREATE: `생성 실패(적색)`<br/>- FAIL_TO_CONNECT: `연결 실패(적색)`<br/>- REPLICATION_STOP: `복제 중단(적색)`<br/>- REPLICATION_DELAY: `복제 지연(황색)`<br/>- FAILOVER: `장애 조치 완료(적색)`<br/>- SHUTDOWN: `중지됨(회색)`<br/>- DELETED: `삭제됨(회색)` |
| progressStatus | Enum | DB 인스턴스의 현재 진행 상태<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbFlavorId | UUID | DB 인스턴스 사양의 식별자 |
| parameterGroupId | UUID | DB 인스턴스에 적용된 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | DB 인스턴스에 적용된 DB 보안 그룹의 식별자 목록 |
| notificationGroupIds | Array | DB 인스턴스에 적용된 알림 그룹의 식별자 목록 |
| useDeletionProtection | Boolean | DB 인스턴스 삭제 보호 여부 |
| supportAuthenticationPlugin | Boolean | 인증 플러그인 지원 여부 |
| needToApplyParameterGroup | Boolean | 최신 파라미터 그룹 적용 필요 여부 |
| needMigration | Boolean | 마이그레이션 필요 여부 |
| supportDbVersionUpgrade | Boolean | DB 버전 업그레이드 지원 여부 |
| createdYmdt | DateTime | 생성 일시 |
| updatedYmdt | DateTime | 수정 일시 |

---

### DB 인스턴스 수정하기

#### 요청

```http
PUT /v3.0/db-instances/{dbInstanceId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbInstanceName": "dbInstanceName",
    "dbInstanceCandidateName": "dbInstanceCandidateName",
    "description": "description-example",
    "dbPort": 1,
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbVersion": "MYSQL_V8036",
    "useDummy": false,
    "dbSecurityGroupIds": [],
    "executeBackup": false,
    "useOnlineFailover": false,
    "waitReplicationDelay": false,
    "useReadOnly": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DB 인스턴스를 식별할 수 있는 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| dbInstanceCandidateName | String | N | DB 인스턴스를 식별할 수 있는 예비 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbPort | Number | N | DB 포트<br/>- 최솟값: 3306, 최댓값: 43306 |
| dbFlavorId | UUID | N | DB 인스턴스 사양의 식별자 |
| parameterGroupId | UUID | N | 파라미터 그룹의 식별자 |
| dbVersion | String | N | DB 엔진 버전 코드 |
| useDummy | Boolean | N | 단일 DB 인스턴스의 DB 버전 업그레이드 시 더미 사용 여부<br/>- 기본값: `false` |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| executeBackup | Boolean | N | 현재 시점 백업 진행 여부<br/>- 기본값: `false` |
| useOnlineFailover | Boolean | N | 장애 조치를 이용한 재시작 여부<br/>- 기본값: `false` |
| waitReplicationDelay | Boolean | N | 복제 지연 해소 대기<br/>- 기본값: `false` |
| useReadOnly | Boolean | N | 쓰기 부하 차단<br/>- 기본값: `false` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 인스턴스 백업하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/backup
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "backupName": "backupName"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| backupName | String | Y | 백업을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 백업 정보 보기

#### 요청

```http
GET /v3.0/db-instances/{dbInstanceId}/backup-info
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "backupPeriod": 1,
    "ftwrlWaitTimeout": 1,
    "backupRetryCount": 1,
    "replicationRegion": "KR4",
    "useBackupLock": false,
    "backupSchedules": [
        {
            "backupWndBgnTime": "00:00:00",
            "backupWndDuration": "HALF_AN_HOUR"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| backupPeriod | Number | 백업 보관 기간(일) |
| ftwrlWaitTimeout | Number | 쿼리 지연 대기 시간(초) |
| backupRetryCount | Number | 백업 재시도 횟수 |
| replicationRegion | Enum | 백업 복제 리전<br/>- KR4: `한국(대구)` |
| useBackupLock | Boolean | 테이블 잠금 사용 여부 |
| backupSchedules | Array | 백업 스케줄 목록 |
| backupSchedules.backupWndBgnTime | Time | 백업 시작 시각 |
| backupSchedules.backupWndDuration | Enum | 백업 Duration<br/>- HALF_AN_HOUR<br/>- ONE_HOUR<br/>- ONE_HOUR_AND_HALF<br/>- TWO_HOURS<br/>- TWO_HOURS_AND_HALF<br/>- THREE_HOURS |

---

### 백업 정보 수정하기

#### 요청

```http
PUT /v3.0/db-instances/{dbInstanceId}/backup-info
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "backupPeriod": 0,
    "ftwrlWaitTimeout": 0,
    "backupRetryCount": 0,
    "replicationRegion": "KR4",
    "useBackupLock": false,
    "backupSchedules": [
        {
            "backupWndBgnTime": "00:00:00",
            "backupWndDuration": "HALF_AN_HOUR"
        }
    ]
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| backupPeriod | Number | N | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| ftwrlWaitTimeout | Number | N | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| replicationRegion | Enum | N | 백업 복제 리전<br/>- KR4: `한국(대구)` |
| useBackupLock | Boolean | N | 테이블 잠금 사용 여부 |
| backupSchedules | Array | N | 백업 스케줄 목록 |
| backupSchedules.backupWndBgnTime | Time | Y | 백업 시작 시각 |
| backupSchedules.backupWndDuration | Enum | Y | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 인스턴스 오브젝트 스토리지로 백업

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/backup-to-object-storage
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "tenantId": "0123456789abcdef0123456789abcdef",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| tenantId | String | Y | 백업이 저장될 오브젝트 스토리지의 테넌트 ID<br/>- 최소 길이: `32`<br/>- 최대 길이: `32` |
| username | String | Y | NHN Cloud 계정 또는 IAM 계정 ID |
| password | String | Y | 백업이 저장될 오브젝트 스토리지의 API 비밀번호 |
| targetContainer | String | Y | 백업이 저장될 오브젝트 스토리지의 컨테이너 |
| objectPath | String | Y | 컨테이너에 저장될 백업의 경로 |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 테스트용 DB 이미지 메타 변경

#### 요청

```http
PUT /v3.0/db-instances/{dbInstanceId}/change-image-meta
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 스키마 목록 보기

#### 요청

```http
GET /v3.0/db-instances/{dbInstanceId}/db-schemas
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSchemas": [
        {
            "dbSchemaId": "550e8400-e29b-41d4-a716-446655440000",
            "dbSchemaName": "dbSchemaName-example",
            "dbSchemaStatus": "STABLE",
            "createdYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbSchemas | Array | DB 스키마 목록 |
| dbSchemas.dbSchemaId | UUID | DB 스키마의 식별자 |
| dbSchemas.dbSchemaName | String | DB 스키마 이름 |
| dbSchemas.dbSchemaStatus | Enum | DB 스키마의 현재 상태<br/>- STABLE<br/>- CREATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbSchemas.createdYmdt | DateTime | 생성 일시 |

---

### DB 스키마 생성하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/db-schemas
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbSchemaName": "dbSchemaName-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbSchemaName | String | Y | DB 스키마 이름<br/>- 최대 길이: `64`<br/>- 영문 시작, 영문/숫자/_ 허용, 1~64자, MySQL 예약어 불가 |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 스키마 삭제하기

#### 요청

```http
DELETE /v3.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |
| dbSchemaId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 사용자 목록 보기

#### 요청

```http
GET /v3.0/db-instances/{dbInstanceId}/db-users
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbUsers": [
        {
            "dbUserId": "550e8400-e29b-41d4-a716-446655440000",
            "dbUserName": "dbUserName-example",
            "host": "192.168.0.1",
            "authorityType": "CUSTOM",
            "dbUserStatus": "STABLE",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00",
            "authenticationPlugin": "NATIVE",
            "tlsOption": "NONE"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbUsers | Array | DB 사용자 목록 |
| dbUsers.dbUserId | UUID | DB 사용자의 식별자 |
| dbUsers.dbUserName | String | DB 사용자 계정 이름 |
| dbUsers.host | String | DB 사용자 계정의 호스트 이름 |
| dbUsers.authorityType | Enum | DB 사용자 권한 타입<br/>- CUSTOM: `사용자 정의 권한`<br/>- READ: `읽기 권한`<br/>- CRUD: `CRUD 권한`<br/>- DDL: `DDL 권한`<br/>- ALL: `전체 권한` |
| dbUsers.dbUserStatus | Enum | DB 사용자의 현재 상태<br/>- STABLE<br/>- CREATING<br/>- UPDATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbUsers.createdYmdt | DateTime | 생성 일시 |
| dbUsers.updatedYmdt | DateTime | 수정 일시 |
| dbUsers.authenticationPlugin | Enum | 사용자 인증 플러그인<br/>- NATIVE: `mysql_native_password 인증`<br/>- CACHING_SHA2: `caching_sha2_password 인증(MySQL 전용)`<br/>- SHA256: `sha256_password 인증(MySQL 전용)` |
| dbUsers.tlsOption | Enum | 인증서 옵션<br/>- NONE: `TLS 미사용`<br/>- SSL: `SSL 인증`<br/>- X509: `X509 인증서 인증` |

---

### DB 사용자 생성하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/db-users
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbUserName": "dbUserName",
    "dbPassword": "dbPassword",
    "host": "192.168.0.1",
    "authorityType": "CUSTOM",
    "authenticationPlugin": "NATIVE",
    "tlsOption": "NONE"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbUserName | String | Y | DB 사용자 계정 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `32` |
| dbPassword | String | Y | DB 사용자 계정 암호<br/>- 최소 길이: `4`<br/>- 최대 길이: `256` |
| host | String | Y | DB 사용자 계정의 호스트 이름<br/>- 최대 길이: `45` |
| authorityType | Enum | Y | DB 사용자 권한 타입<br/>- CUSTOM: `사용자 정의 권한`<br/>- READ: `읽기 권한`<br/>- CRUD: `CRUD 권한`<br/>- DDL: `DDL 권한`<br/>- ALL: `전체 권한` |
| authenticationPlugin | Enum | N | 사용자 인증 플러그인<br/>- NATIVE: `mysql_native_password 인증`<br/>- CACHING_SHA2: `caching_sha2_password 인증(MySQL 전용)`<br/>- SHA256: `sha256_password 인증(MySQL 전용)` |
| tlsOption | Enum | N | 인증서 옵션<br/>- 기본값: `NONE`<br/>- NONE: `TLS 미사용`<br/>- SSL: `SSL 인증`<br/>- X509: `X509 인증서 인증` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 사용자 삭제하기

#### 요청

```http
DELETE /v3.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |
| dbUserId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 사용자 수정하기

#### 요청

```http
PUT /v3.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |
| dbUserId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbPassword": "dbPassword",
    "authorityType": "CUSTOM",
    "authenticationPlugin": "NATIVE",
    "tlsOption": "NONE"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbPassword | String | N | DB 사용자 계정 암호<br/>- 최소 길이: `4`<br/>- 최대 길이: `256` |
| authorityType | Enum | N | DB 사용자 권한 타입<br/>- CUSTOM: `사용자 정의 권한`<br/>- READ: `읽기 권한`<br/>- CRUD: `CRUD 권한`<br/>- DDL: `DDL 권한`<br/>- ALL: `전체 권한` |
| authenticationPlugin | Enum | N | 사용자 인증 플러그인<br/>- NATIVE: `mysql_native_password 인증`<br/>- CACHING_SHA2: `caching_sha2_password 인증(MySQL 전용)`<br/>- SHA256: `sha256_password 인증(MySQL 전용)` |
| tlsOption | Enum | N | 인증서 옵션<br/>- NONE: `TLS 미사용`<br/>- SSL: `SSL 인증`<br/>- X509: `X509 인증서 인증` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 인스턴스 삭제 보호 설정 변경

#### 요청

```http
PUT /v3.0/db-instances/{dbInstanceId}/deletion-protection
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "useDeletionProtection": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| useDeletionProtection | Boolean | Y | 삭제 보호 여부 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 인스턴스 강제 재시작하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/force-restart
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 고가용성 수정하기

#### 요청

```http
PUT /v3.0/db-instances/{dbInstanceId}/high-availability
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "useHighAvailability": false,
    "pingInterval": 1
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| useHighAvailability | Boolean | Y | 고가용성 사용 여부 |
| pingInterval | Number | N | 고가용성 사용 시 Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 고가용성 일시 중지하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 고가용성 복구하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 고가용성 다시 시작하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 고가용성 분리하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/high-availability/split
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 로그 파일 목록 보기

#### 요청

```http
GET /v3.0/db-instances/{dbInstanceId}/log-files
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "logFiles": [
        {
            "logFileName": "logFileName-example",
            "logFileType": "ERROR",
            "logFileSize": 1,
            "createdYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| logFiles | Array | 로그 파일 목록 |
| logFiles.logFileName | String | 로그 파일 이름 |
| logFiles.logFileType | Enum | 로그 파일 타입 종류<br/>- ERROR<br/>- BINLOG<br/>- GENERAL<br/>- SLOW_QUERY<br/>- AUDIT<br/>- BACKUP |
| logFiles.logFileSize | Number | 로그 파일 크기(Byte) |
| logFiles.createdYmdt | DateTime | 생성 일시 |

---

### 로그 파일 내보내기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/log-files/export
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "logFileNames": [],
    "tenantId": "0123456789abcdef0123456789abcdef",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| logFileNames | Array | Y | 로그 파일 이름 목록 |
| tenantId | String | Y | 로그 파일이 저장될 오브젝트 스토리지의 테넌트 ID<br/>- 최소 길이: `32`<br/>- 최대 길이: `32` |
| username | String | Y | NHN Cloud 계정 또는 IAM 계정 ID |
| password | String | Y | 로그 파일이 저장될 오브젝트 스토리지의 API 비밀번호 |
| targetContainer | String | Y | 로그 파일이 저장될 오브젝트 스토리지의 컨테이너 |
| objectPath | String | Y | 컨테이너에 저장될 로그 파일의 경로 |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 네트워크 정보 보기

#### 요청

```http
GET /v3.0/db-instances/{dbInstanceId}/network-info
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "availabilityZone": "kr-pub-a",
    "subnet": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "subnetName": "subnetName-example",
        "subnetCidr": "192.168.0.0/24"
    },
    "endPoints": [
        {
            "domain": "domain-example",
            "ipAddress": "192.168.0.1",
            "endPointType": "https://example.com"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| availabilityZone | String | DB 인스턴스를 생성할 가용성 영역 |
| subnet | Object | 서브넷 객체 |
| subnet.subnetId | UUID | 서브넷의 식별자 |
| subnet.subnetName | String | 서브넷을 식별할 수 있는 이름 |
| subnet.subnetCidr | String | 서브넷의 CIDR |
| endPoints | Array | 접속 정보 목록 |
| endPoints.domain | String | 도메인 |
| endPoints.ipAddress | String | IP 주소 |
| endPoints.endPointType | String | 접속 정보 타입 |

---

### 네트워크 정보 수정하기

#### 요청

```http
PUT /v3.0/db-instances/{dbInstanceId}/network-info
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "usePublicAccess": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| usePublicAccess | Boolean | Y | 외부 접속 가능 여부 |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 인스턴스 승격하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/promote
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 인스턴스 복제하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/replicate
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbInstanceName": "dbInstanceName",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbPort": 1,
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbSecurityGroupIds": [],
    "userGroupIds": [],
    "useDefaultNotification": false,
    "useDeletionProtection": false,
    "network": {
        "usePublicAccess": false,
        "availabilityZone": "kr-pub-a"
    },
    "storage": {
        "storageType": "General SSD",
        "storageSize": 20
    },
    "backup": {
        "backupPeriod": 0,
        "backupRetryCount": 0,
        "ftwrlWaitTimeout": 0,
        "replicationRegion": "KR4",
        "useBackupLock": false,
        "backupSchedules": [
            {
                "backupWndBgnTime": "00:00:00",
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    }
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DB 인스턴스를 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | UUID | N | DB 인스턴스 사양의 식별자 |
| dbPort | Number | Y | DB 포트<br/>- 최솟값: 3306, 최댓값: 43306 |
| parameterGroupId | UUID | N | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |
| useDefaultNotification | Boolean | N | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Boolean | N | 삭제 보호 여부<br/>- 기본값: `false` |
| network | Object | Y | 네트워크 정보 객체 |
| network.usePublicAccess | Boolean | N | 외부 접속 가능 여부 |
| network.availabilityZone | Enum | Y | DB 인스턴스를 생성할 가용성 영역 |
| storage | Object | N | 스토리지 정보 객체 |
| storage.storageType | Enum | N | 데이터 스토리지 타입 |
| storage.storageSize | Number | N | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| backup | Object | N | 백업 정보 객체 |
| backup.backupPeriod | Number | N | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.ftwrlWaitTimeout | Number | N | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backup.replicationRegion | Enum | N | 백업 복제 리전<br/>- KR4: `한국(대구)` |
| backup.useBackupLock | Boolean | N | 테이블 잠금 사용 여부 |
| backup.backupSchedules | Array | N | 백업 스케줄 목록 |
| backup.backupSchedules.backupWndBgnTime | Time | N | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Enum | N | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 인스턴스 재시작하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/restart
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "useOnlineFailover": false,
    "executeBackup": false,
    "waitReplicationDelay": false,
    "useReadOnly": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| useOnlineFailover | Boolean | N | 장애 조치를 이용한 재시작 여부<br/>- 기본값: `false` |
| executeBackup | Boolean | N | 현재 시점 백업 진행 여부<br/>- 기본값: `false` |
| waitReplicationDelay | Boolean | N | 복제 지연 해소 대기<br/>- 기본값: `false` |
| useReadOnly | Boolean | N | 쓰기 부하 차단<br/>- 기본값: `false` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 인스턴스 복원 정보 조회

#### 요청

```http
GET /v3.0/db-instances/{dbInstanceId}/restoration-info
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 복원될 마지막 쿼리 조회

#### 요청

```http
GET /v3.0/db-instances/{dbInstanceId}/restoration-info/last-query
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "executedYmdt": "2023-12-31T15:00:00+09:00",
    "lastQuery": "lastQuery-example"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| executedYmdt | DateTime | 쿼리 수행 일시 |
| lastQuery | String | 마지막 수행 쿼리 |

---

### DB 인스턴스 복원

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/restore
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbInstanceName": "dbInstanceName",
    "dbInstanceCandidateName": "dbInstanceCandidateName",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbPort": 1,
    "useHighAvailability": false,
    "imageId": "550e8400-e29b-41d4-a716-446655440000",
    "pingInterval": 3,
    "storage": {
        "storageType": "General SSD",
        "storageSize": 20
    },
    "network": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "usePublicAccess": false,
        "availabilityZone": "kr-pub-a"
    },
    "backup": {
        "backupPeriod": 0,
        "ftwrlWaitTimeout": 1800,
        "backupRetryCount": 0,
        "replicationRegion": "KR4",
        "useBackupLock": true,
        "backupSchedules": [
            {
                "backupWndBgnTime": "00:00:00",
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    },
    "restore": {
        "restoreType": "TIMESTAMP",
        "binLog": {
            "binLogFileName": "binLogFileName-example",
            "binLogPosition": {
            }
        }
    },
    "useDefaultNotification": false,
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbSecurityGroupIds": [],
    "userGroupIds": [],
    "useDeletionProtection": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | N | DB 인스턴스를 식별할 수 있는 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| dbInstanceCandidateName | String | N | DB 인스턴스를 식별할 수 있는 예비 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | UUID | Y | DB 인스턴스 사양의 식별자 |
| dbPort | Number | N | DB 포트 |
| useHighAvailability | Boolean | N | 고가용성 사용 여부<br/>- 기본값: `false` |
| imageId | UUID | N | 이미지의 식별자 |
| pingInterval | Number | N | 고가용성 사용 시 Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| storage | Object | Y | 스토리지 정보 객체 |
| storage.storageType | Enum | Y | 스토리지 타입 |
| storage.storageSize | Number | Y | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| network | Object | Y | 네트워크 정보 객체 |
| network.subnetId | UUID | Y | 서브넷의 식별자 |
| network.usePublicAccess | Boolean | N | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Enum | Y | DB 인스턴스를 생성할 가용성 영역 |
| backup | Object | Y | 백업 정보 객체 |
| backup.backupPeriod | Number | Y | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.ftwrlWaitTimeout | Number | N | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backup.backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.replicationRegion | Enum | N | 백업 복제 리전<br/>- KR4: `한국(대구)` |
| backup.useBackupLock | Boolean | N | 테이블 잠금 사용 여부<br/>- 기본값: `true` |
| backup.backupSchedules | Array | Y | 백업 스케줄 목록 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Enum | Y | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |
| restore | Object | Y | 복원 정보 객체 |
| restore.restoreType | Enum | Y | 복원 타입<br/>- TIMESTAMP: `복원 가능한 시간 이내의 시간을 이용한 시점 복원`<br/>- BINLOG: `복원 가능한 바이너리 로그 위치를 이용한 시점 복원`<br/>- BACKUP: `기존에 생성한 백업을 이용한 스냅숏 복원` |
| restore.binLog.binLogFileName | String | N | 복원에 사용할 바이너리 로그 이름 |
| restore.binLog.binLogPosition | Object | N | 복원에 사용할 바이너리 로그 위치 |
| useDefaultNotification | Boolean | N | 기본 알림 사용 여부<br/>- 기본값: `false` |
| parameterGroupId | UUID | Y | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |
| useDeletionProtection | Boolean | N | 삭제 보호 여부<br/>- 기본값: `false` |

#### Timestamp를 이용한 시점 복원 시 요청(restoreType이 `TIMESTAMP`인 경우)

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| restore.restoreYmdt | DateTime | N | DB 인스턴스 복원 일시 |

복원 정보 조회로 조회한 가장 최신의 복원 가능한 시간 이전에 대해서만 복원이 가능합니다.

#### 바이너리 로그를 이용한 시점 복원 시 요청(restoreType이 `BINLOG`인 경우)

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| restore.backupId | UUID | N | 복원에 사용할 백업의 식별자 |
| restore.binLog | Object | N | 복원에 사용할 바이너리 로그 정보 객체 |

바이너리 로그를 이용한 시점 복원 시 기준 백업의 바이너리 로그 파일 및 위치를 기준으로 그 이후에 기록된 로그에 대해 복원이 가능합니다.

#### 백업을 이용한 복원 시 요청(restoreType이 `BACKUP`인 경우)

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| restore.backupId | UUID | N | 복원에 사용할 백업의 식별자 |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 인스턴스 시작하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/start
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 인스턴스 정지하기

#### 요청

```http
POST /v3.0/db-instances/{dbInstanceId}/stop
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 스토리지 정보 보기

#### 요청

```http
GET /v3.0/db-instances/{dbInstanceId}/storage-info
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "storageType": "General SSD",
    "storageSize": 1,
    "storageStatus": "DELETED"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| storageType | Enum | 데이터 스토리지 타입 |
| storageSize | Number | 데이터 스토리지 크기(GB) |
| storageStatus | Enum | 데이터 스토리지의 현재 상태<br/>- DELETED: `삭제됨`<br/>- PENDING_DELETION: `삭제 유예됨`<br/>- DELETION_RESERVED: `삭제 예약됨(스냅숏 정리 대기)`<br/>- DETACHED: `해제됨`<br/>- ATTACHED: `할당됨` |

---

### 스토리지 정보 수정하기

#### 요청

```http
PUT /v3.0/db-instances/{dbInstanceId}/storage-info
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "storageSize": 1
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| storageSize | Number | Y | 데이터 스토리지 크기(GB)<br/>- 최댓값: `2048` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

## 백업

### 백업 상태

| 상태           | 설명           |
|--------------|--------------|
| `BACKING_UP` | 백업 중인 경우     |
| `COMPLETED`  | 백업이 완료된 경우   |
| `DELETING`   | 백업이 삭제 중인 경우 |
| `DELETED`    | 백업이 삭제된 경우   |
| `ERROR`      | 오류가 발생한 경우   |

### 백업 목록 조회

#### 요청

```http
GET /v3.0/backups
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "totalCounts": 1,
    "backups": [
        {
            "backupId": "550e8400-e29b-41d4-a716-446655440000",
            "backupName": "backupName-example",
            "backupStatus": "BACKING_UP",
            "dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
            "dbVersion": "MYSQL_V8036",
            "utilVersion": "utilVersion-example",
            "backupType": "AUTO",
            "backupSize": 1,
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| totalCounts | Number | 전체 백업 목록 수 |
| backups | Array | 백업 목록 |
| backups.backupId | UUID | 백업의 식별자 |
| backups.backupName | String | 백업을 식별할 수 있는 이름 |
| backups.backupStatus | Enum | 백업의 현재 상태<br/>- BACKING_UP: `백업 중(스피너)`<br/>- VERIFYING: `검증 중(스피너)`<br/>- COMPLETED: `사용 가능(녹색 아이콘)`<br/>- DELETING: `삭제 중(스피너)`<br/>- DELETED: `삭제됨(회색 아이콘)`<br/>- ERROR: `에러(적색 아이콘)` |
| backups.dbInstanceId | UUID | 원본 DB 인스턴스의 식별자 |
| backups.dbVersion | String | DB 엔진 유형 |
| backups.utilVersion | String | 유틸리티 버전 |
| backups.backupType | Enum | 백업 유형<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Number | 백업의 크기(Byte) |
| backups.createdYmdt | DateTime | 생성 일시 |
| backups.updatedYmdt | DateTime | 수정 일시 |

---

### 백업 삭제하기

#### 요청

```http
DELETE /v3.0/backups/{backupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 백업 내보내기

#### 요청

```http
POST /v3.0/backups/{backupId}/export
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "tenantId": "0123456789abcdef0123456789abcdef",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| tenantId | String | Y | 백업이 저장될 오브젝트 스토리지의 테넌트 ID<br/>- 최소 길이: `32`<br/>- 최대 길이: `32` |
| username | String | Y | NHN Cloud 계정 또는 IAM 계정 ID |
| password | String | Y | 백업이 저장될 오브젝트 스토리지의 API 비밀번호 |
| targetContainer | String | Y | 백업이 저장될 오브젝트 스토리지의 컨테이너 |
| objectPath | String | Y | 컨테이너에 저장될 백업의 경로 |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### 백업 복원하기

#### 요청

```http
POST /v3.0/backups/{backupId}/restore
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbInstanceName": "dbInstanceName",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbPort": 1,
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbSecurityGroupIds": [],
    "userGroupIds": [],
    "useHighAvailability": false,
    "pingInterval": 3,
    "useDefaultNotification": false,
    "useDeletionProtection": false,
    "network": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "usePublicAccess": false,
        "availabilityZone": "kr-pub-a"
    },
    "storage": {
        "storageType": "General SSD",
        "storageSize": 20
    },
    "backup": {
        "backupPeriod": 0,
        "backupRetryCount": 0,
        "ftwrlWaitTimeout": 1800,
        "replicationRegion": "KR4",
        "useBackupLock": true,
        "backupSchedules": [
            {
                "backupWndBgnTime": "00:00:00",
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    }
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbInstanceName | String | Y | DB 인스턴스를 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | UUID | Y | DB 인스턴스 사양의 식별자 |
| dbPort | Number | Y | DB 포트<br/>- 최솟값: 3306, 최댓값: 43306 |
| parameterGroupId | UUID | Y | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Array | N | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |
| useHighAvailability | Boolean | N | 고가용성 사용 여부<br/>- 기본값: `false` |
| pingInterval | Number | N | 고가용성 사용 시 Ping 간격(초)<br/>- 기본값: `3`<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| useDefaultNotification | Boolean | N | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Boolean | N | 삭제 보호 여부<br/>- 기본값: `false` |
| network | Object | Y | 네트워크 정보 객체 |
| network.subnetId | UUID | Y | 서브넷의 식별자 |
| network.usePublicAccess | Boolean | N | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Enum | Y | DB 인스턴스를 생성할 가용성 영역 |
| storage | Object | Y | 스토리지 정보 객체 |
| storage.storageType | Enum | Y | 스토리지 타입 |
| storage.storageSize | Number | Y | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| backup | Object | Y | 백업 정보 객체 |
| backup.backupPeriod | Number | Y | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Number | N | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.ftwrlWaitTimeout | Number | N | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backup.replicationRegion | Enum | N | 백업 복제 리전<br/>- KR4: `한국(대구)` |
| backup.useBackupLock | Boolean | N | 테이블 잠금 사용 여부<br/>- 기본값: `true` |
| backup.backupSchedules | Array | Y | 백업 스케줄 목록 |
| backup.backupSchedules.backupWndBgnTime | Time | Y | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Enum | Y | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

## DB 보안 그룹

### DB 보안 그룹 진행 상태

| 상태              | 설명           |
|-----------------|--------------|
| `NONE`          | 진행 중인 작업이 없음 |
| `CREATING_RULE` | 규칙 정책 생성 중   |
| `UPDATING_RULE` | 규칙 정책 수정 중   |
| `DELETING_RULE` | 규칙 정책 삭제 중   |

### DB 보안 그룹 목록 보기

#### 요청

```http
GET /v3.0/db-security-groups
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroups": [
        {
            "dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "dbSecurityGroupName": "dbSecurityGroupName-example",
            "description": "description-example",
            "progressStatus": "NONE",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbSecurityGroups | Array | DB 보안 그룹 목록 |
| dbSecurityGroups.dbSecurityGroupId | UUID | DB 보안 그룹의 식별자 |
| dbSecurityGroups.dbSecurityGroupName | String | DB 보안 그룹을 식별할 수 있는 이름 |
| dbSecurityGroups.description | String | DB 보안 그룹에 대한 추가 정보 |
| dbSecurityGroups.progressStatus | Enum | DB 보안 그룹의 현재 진행 상태<br/>- NONE: `없음`<br/>- CREATING_RULE: `규칙 생성 중`<br/>- UPDATING_RULE: `규칙 수정 중`<br/>- DELETING_RULE: `규칙 삭제 중`<br/>- APPLYING_DEFAULT_RULE: `기본 규칙 적용 중` |
| dbSecurityGroups.createdYmdt | DateTime | 생성 일시 |
| dbSecurityGroups.updatedYmdt | DateTime | 수정 일시 |

---

### DB 보안 그룹 생성하기

#### 요청

```http
POST /v3.0/db-security-groups
```

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbSecurityGroupName": "dbSecurityGroupName",
    "description": "description-example",
    "rules": [
        {
            "direction": "INGRESS",
            "etherType": "IPV4",
            "port": {
                "portType": "ALL",
                "minPort": 3306,
                "maxPort": 1
            },
            "cidr": "192.168.0.0/24",
            "description": "description-example"
        }
    ]
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | Y | DB 보안 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | DB 보안 그룹에 대한 추가 정보<br/>- 최대 길이: `100` |
| rules | Array | Y | DB 보안 그룹 규칙 목록 |
| rules.direction | Enum | Y | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| rules.etherType | Enum | Y | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| rules.port | Object | Y | 포트 객체 |
| rules.port.portType | Enum | Y | 포트 타입<br/>- ALL: `포트 범위 전체(사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| rules.port.minPort | Number | N | 최소 포트 범위<br/>- 최솟값: `3306` |
| rules.port.maxPort | Number | N | 최대 포트 범위<br/>- 최댓값: `65535` |
| rules.cidr | String | Y | CIDR |
| rules.description | String | N | 보안 그룹 규칙에 대한 추가 정보 |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbSecurityGroupId | UUID | DB 보안 그룹의 식별자 |

---

### DB 보안 그룹 삭제하기

#### 요청

```http
DELETE /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 보안 그룹 상세 보기

#### 요청

```http
GET /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroup": {
        "dbSecurityGroupId": "550e8400-e29b-41d4-a716-446655440000",
        "dbSecurityGroupName": "dbSecurityGroupName-example",
        "description": "description-example",
        "progressStatus": "NONE",
        "rules": [
            {
                "ruleId": "550e8400-e29b-41d4-a716-446655440000",
                "description": "description-example",
                "direction": "INGRESS",
                "etherType": "IPV4",
                "port": {
                    "portType": "ALL",
                    "minPort": 1,
                    "maxPort": 1
                },
                "cidr": "192.168.0.0/24",
                "createdYmdt": "2023-12-31T15:00:00+09:00",
                "updatedYmdt": "2023-12-31T15:00:00+09:00"
            }
        ],
        "createdYmdt": "2023-12-31T15:00:00+09:00",
        "updatedYmdt": "2023-12-31T15:00:00+09:00"
    }
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| dbSecurityGroup | Object | DB 보안 그룹 |
| dbSecurityGroup.dbSecurityGroupId | UUID | DB 보안 그룹의 식별자 |
| dbSecurityGroup.dbSecurityGroupName | String | DB 보안 그룹을 식별할 수 있는 이름 |
| dbSecurityGroup.description | String | DB 보안 그룹에 대한 추가 정보 |
| dbSecurityGroup.progressStatus | Enum | DB 보안 그룹의 현재 진행 상태<br/>- NONE: `없음`<br/>- CREATING_RULE: `규칙 생성 중`<br/>- UPDATING_RULE: `규칙 수정 중`<br/>- DELETING_RULE: `규칙 삭제 중`<br/>- APPLYING_DEFAULT_RULE: `기본 규칙 적용 중` |
| dbSecurityGroup.rules | Array | DB 보안 그룹 규칙 목록 |
| dbSecurityGroup.rules.ruleId | UUID | DB 보안 그룹 규칙의 식별자 |
| dbSecurityGroup.rules.description | String | DB 보안 그룹 규칙에 대한 추가 정보 |
| dbSecurityGroup.rules.direction | Enum | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| dbSecurityGroup.rules.etherType | Enum | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| dbSecurityGroup.rules.port | Object | 포트 객체 |
| dbSecurityGroup.rules.port.portType | Enum | 포트 타입<br/>- ALL: `포트 범위 전체(사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| dbSecurityGroup.rules.port.minPort | Number | 최소 포트 범위 |
| dbSecurityGroup.rules.port.maxPort | Number | 최대 포트 범위 |
| dbSecurityGroup.rules.cidr | String | CIDR |
| dbSecurityGroup.rules.createdYmdt | DateTime | 생성 일시 |
| dbSecurityGroup.rules.updatedYmdt | DateTime | 수정 일시 |
| dbSecurityGroup.createdYmdt | DateTime | 생성 일시 |
| dbSecurityGroup.updatedYmdt | DateTime | 수정 일시 |

---

### DB 보안 그룹 수정하기

#### 요청

```http
PUT /v3.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "dbSecurityGroupName": "dbSecurityGroupName",
    "description": "description-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| dbSecurityGroupName | String | N | DB 보안 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | DB 보안 그룹에 대한 추가 정보<br/>- 최대 길이: `100` |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 보안 그룹 규칙 삭제하기

#### 요청

```http
DELETE /v3.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleIds | Query | String | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 보안 그룹 규칙 생성하기

#### 요청

```http
POST /v3.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "direction": "INGRESS",
    "etherType": "IPV4",
    "port": {
        "portType": "ALL",
        "minPort": 3306,
        "maxPort": 1
    },
    "cidr": "192.168.0.0/24",
    "description": "description-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| direction | Enum | Y | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| etherType | Enum | Y | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| port | Object | Y | 포트 객체 |
| port.portType | Enum | Y | 포트 타입<br/>- ALL: `포트 범위 전체(사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| port.minPort | Number | N | 최소 포트 범위<br/>- 최솟값: `3306` |
| port.maxPort | Number | N | 최대 포트 범위<br/>- 최댓값: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | DB 보안 그룹 규칙에 대한 추가 정보<br/>- 최대 길이: `200` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

### DB 보안 그룹 규칙 수정하기

#### 요청

```http
PUT /v3.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | Y |  |
| ruleId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "direction": "INGRESS",
    "etherType": "IPV4",
    "port": {
        "portType": "ALL",
        "minPort": 3306,
        "maxPort": 1
    },
    "cidr": "192.168.0.0/24",
    "description": "description-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| direction | Enum | Y | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| etherType | Enum | Y | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| port | Object | Y | 포트 객체 |
| port.portType | Enum | Y | 포트 타입<br/>- ALL: `포트 범위 전체(사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| port.minPort | Number | N | 최소 포트 범위<br/>- 최솟값: `3306` |
| port.maxPort | Number | N | 최대 포트 범위<br/>- 최댓값: `65535` |
| cidr | String | Y | CIDR |
| description | String | N | DB 보안 그룹 규칙에 대한 추가 정보<br/>- 최대 길이: `200` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| jobId | UUID | 작업의 식별자 |

---

## 파라미터 그룹

### 파라미터 그룹 목록 보기

#### 요청

```http
GET /v3.0/parameter-groups
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroups": [
        {
            "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "parameterGroupName": "parameterGroupName-example",
            "description": "description-example",
            "dbVersion": "MYSQL_V8036",
            "parameterGroupStatus": "STABLE",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| parameterGroups | Array | 파라미터 그룹 목록 |
| parameterGroups.parameterGroupId | UUID | 파라미터 그룹의 식별자 |
| parameterGroups.parameterGroupName | String | 파라미터 그룹을 식별할 수 있는 이름 |
| parameterGroups.description | String | 파라미터 그룹에 대한 추가 정보 |
| parameterGroups.dbVersion | String | DB 엔진 유형 |
| parameterGroups.parameterGroupStatus | Enum | 파라미터 그룹의 현재 상태<br/>- STABLE: `적용 완료`<br/>- NEED_TO_APPLY: `적용 필요`<br/>- DELETED: `삭제됨` |
| parameterGroups.createdYmdt | DateTime | 생성 일시 |
| parameterGroups.updatedYmdt | DateTime | 수정 일시 |

---

### 파라미터 그룹 생성하기

#### 요청

```http
POST /v3.0/parameter-groups
```

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example",
    "dbVersion": "MYSQL_V8036"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | 파라미터 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | 파라미터 그룹에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbVersion | String | Y | DB 엔진 유형 |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| parameterGroupId | UUID | 파라미터 그룹의 식별자 |

---

### 파라미터 그룹 삭제하기

#### 요청

```http
DELETE /v3.0/parameter-groups/{parameterGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 파라미터 그룹 상세 보기

#### 요청

```http
GET /v3.0/parameter-groups/{parameterGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example",
    "dbVersion": "MYSQL_V8036",
    "parameterGroupStatus": "STABLE",
    "parameters": [
        {
            "parameterId": "550e8400-e29b-41d4-a716-446655440000",
            "parameterFileGroup": "CLIENT",
            "parameterName": "parameterName-example",
            "fileParameterName": "fileParameterName-example",
            "value": "value-example",
            "defaultValue": "defaultValue-example",
            "allowedValue": "allowedValue-example",
            "updateType": "VARIABLE",
            "applyType": "BOTH"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| parameterGroupId | UUID | 파라미터 그룹의 식별자 |
| parameterGroupName | String | 파라미터 그룹을 식별할 수 있는 이름 |
| description | String | 파라미터 그룹에 대한 추가 정보 |
| dbVersion | String | DB 엔진 유형 |
| parameterGroupStatus | Enum | 파라미터 그룹의 현재 상태<br/>- STABLE: `적용 완료`<br/>- NEED_TO_APPLY: `적용 필요`<br/>- DELETED: `삭제됨` |
| parameters | Array | 파라미터 목록 |
| parameters.parameterId | UUID | 파라미터의 식별자 |
| parameters.parameterFileGroup | Enum | 파라미터 파일 그룹 타입<br/>- CLIENT<br/>- MYSQL<br/>- MYSQLD |
| parameters.parameterName | String | 파라미터 이름 |
| parameters.fileParameterName | String | 파라미터 파일 이름 |
| parameters.value | String | 현재 설정된 값 |
| parameters.defaultValue | String | 기본값 |
| parameters.allowedValue | String | 허용된 값 |
| parameters.updateType | Enum | 수정 타입<br/>- VARIABLE<br/>- CONSTANT<br/>- INIT_VARIABLE |
| parameters.applyType | Enum | 적용 타입<br/>- BOTH<br/>- SESSION<br/>- FILE |
| createdYmdt | DateTime | 생성 일시 |
| updatedYmdt | DateTime | 수정 일시 |

---

### 파라미터 그룹 수정하기

#### 요청

```http
PUT /v3.0/parameter-groups/{parameterGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| parameterGroupName | String | N | 파라미터 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | 파라미터 그룹에 대한 추가 정보<br/>- 최대 길이: `100` |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 파라미터 그룹 복사하기

#### 요청

```http
POST /v3.0/parameter-groups/{parameterGroupId}/copy
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example"
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| parameterGroupName | String | Y | 파라미터 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | String | N | 파라미터 그룹에 대한 추가 정보<br/>- 최대 길이: `100` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| parameterGroupId | UUID | 파라미터 그룹의 식별자 |

---

### 파라미터 수정하기

#### 요청

```http
PUT /v3.0/parameter-groups/{parameterGroupId}/parameters
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "modifiedParameters": [
        {
            "parameterId": "550e8400-e29b-41d4-a716-446655440000",
            "value": "value-example"
        }
    ]
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| modifiedParameters | Array | Y | 변경할 파라미터 목록 |
| modifiedParameters.parameterId | UUID | Y | 파라미터의 식별자 |
| modifiedParameters.value | String | Y | 변경할 파라미터 값 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 파라미터 그룹 재설정하기

#### 요청

```http
PUT /v3.0/parameter-groups/{parameterGroupId}/reset
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## 사용자 그룹

### 사용자 그룹 목록 보기

#### 요청

```http
GET /v3.0/user-groups
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "userGroups": [
        {
            "userGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "userGroupName": "userGroupName-example",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| userGroups | Array | 사용자 그룹 목록 |
| userGroups.userGroupId | UUID | 사용자 그룹의 식별자 |
| userGroups.userGroupName | String | 사용자 그룹을 식별할 수 있는 이름 |
| userGroups.createdYmdt | DateTime | 생성 일시 |
| userGroups.updatedYmdt | DateTime | 수정 일시 |

---

### 사용자 그룹 생성하기

#### 요청

```http
POST /v3.0/user-groups
```

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAllYN": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| userGroupName | String | Y | 사용자 그룹을 식별할 수 있는 이름 |
| memberIds | Array | Y | 프로젝트 멤버의 식별자 목록 |
| selectAllYN | Boolean | N | 프로젝트 멤버 전체 포함 여부<br/>- 기본값: `false` |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "userGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| userGroupId | UUID | 사용자 그룹의 식별자 |

---

### 사용자 그룹 삭제하기

#### 요청

```http
DELETE /v3.0/user-groups/{userGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 사용자 그룹 상세 보기

#### 요청

```http
GET /v3.0/user-groups/{userGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "userGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "userGroupName": "userGroupName-example",
    "userGroupTypeCode": "ENTIRE",
    "members": [
        {
            "memberId": "550e8400-e29b-41d4-a716-446655440000"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| userGroupId | UUID | 사용자 그룹의 식별자 |
| userGroupName | String | 사용자 그룹을 식별할 수 있는 이름 |
| userGroupTypeCode | Enum | 사용자 그룹 종류<br/>- ENTIRE<br/>- INDIVIDUAL_MEMBER |
| members | Array | 프로젝트 멤버 목록 |
| members.memberId | UUID | 프로젝트 멤버의 식별자 |
| createdYmdt | DateTime | 생성 일시 |
| updatedYmdt | DateTime | 수정 일시 |

---

### 사용자 그룹 수정하기

#### 요청

```http
PUT /v3.0/user-groups/{userGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAllYN": false
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| userGroupName | String | Y | 사용자 그룹을 식별할 수 있는 이름 |
| memberIds | Array | N | 프로젝트 멤버의 식별자 목록 |
| selectAllYN | Boolean | N | 프로젝트 멤버 전체 포함 여부<br/>- 기본값: `false` |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## 알림 그룹

### 알림 그룹 목록 보기

#### 요청

```http
GET /v3.0/notification-groups
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroups": [
        {
            "notificationGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "notificationGroupName": "notificationGroupName-example",
            "notifyEmail": false,
            "notifySms": false,
            "isEnabled": false,
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| notificationGroups | Array | 알림 그룹 목록 |
| notificationGroups.notificationGroupId | UUID | 알림 그룹의 식별자 |
| notificationGroups.notificationGroupName | String | 알림 그룹을 식별할 수 있는 이름 |
| notificationGroups.notifyEmail | Boolean | 이메일 알림 여부 |
| notificationGroups.notifySms | Boolean | SMS 알림 여부 |
| notificationGroups.isEnabled | Boolean | 활성화 여부 |
| notificationGroups.createdYmdt | DateTime | 생성 일시 |
| notificationGroups.updatedYmdt | DateTime | 수정 일시 |

---

### 알림 그룹 생성하기

#### 요청

```http
POST /v3.0/notification-groups
```

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "notificationGroupName": "notificationGroupName",
    "notifyEmail": true,
    "notifySms": true,
    "isEnabled": true,
    "dbInstanceIds": [],
    "userGroupIds": []
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| notificationGroupName | String | Y | 알림 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| notifyEmail | Boolean | N | 이메일 알림 여부<br/>- 기본값: `true` |
| notifySms | Boolean | N | SMS 알림 여부<br/>- 기본값: `true` |
| isEnabled | Boolean | N | 활성화 여부<br/>- 기본값: `true` |
| dbInstanceIds | Array | Y | 감시 대상 DB 인스턴스의 식별자 목록 |
| userGroupIds | Array | Y | 사용자 그룹의 식별자 목록 |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroupId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| notificationGroupId | UUID | 알림 그룹의 식별자 |

---

### 알림 그룹 삭제하기

#### 요청

```http
DELETE /v3.0/notification-groups/{notificationGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 알림 그룹 상세 보기

#### 요청

```http
GET /v3.0/notification-groups/{notificationGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "notificationGroupName": "notificationGroupName-example",
    "notifyEmail": false,
    "notifySms": false,
    "isEnabled": false,
    "dbInstances": [
        {
            "dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
            "dbInstanceName": "dbInstanceName-example"
        }
    ],
    "userGroups": [
        {
            "userGroupId": "550e8400-e29b-41d4-a716-446655440000",
            "userGroupName": "userGroupName-example"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| notificationGroupId | UUID | 알림 그룹의 식별자 |
| notificationGroupName | String | 알림 그룹을 식별할 수 있는 이름 |
| notifyEmail | Boolean | 이메일 알림 여부 |
| notifySms | Boolean | SMS 알림 여부 |
| isEnabled | Boolean | 활성화 여부 |
| dbInstances | Array | 감시 대상 DB 인스턴스 목록 |
| dbInstances.dbInstanceId | UUID | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceName | String | DB 인스턴스를 식별할 수 있는 이름 |
| userGroups | Array | 사용자 그룹 목록 |
| userGroups.userGroupId | UUID | 사용자 그룹의 식별자 |
| userGroups.userGroupName | String | 사용자 그룹을 식별할 수 있는 이름 |
| createdYmdt | DateTime | 생성 일시 |
| updatedYmdt | DateTime | 수정 일시 |

---

### 알림 그룹 수정하기

#### 요청

```http
PUT /v3.0/notification-groups/{notificationGroupId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "notificationGroupName": "notificationGroupName-example",
    "notifyEmail": false,
    "notifySms": false,
    "isEnabled": false,
    "dbInstanceIds": [],
    "userGroupIds": []
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| notificationGroupName | String | N | 알림 그룹을 식별할 수 있는 이름 |
| notifyEmail | Boolean | N | 이메일 알림 여부<br/>- 기본값: `false` |
| notifySms | Boolean | N | SMS 알림 여부<br/>- 기본값: `false` |
| isEnabled | Boolean | N | 활성화 여부<br/>- 기본값: `false` |
| dbInstanceIds | Array | N | 감시 대상 DB 인스턴스의 식별자 목록 |
| userGroupIds | Array | N | 사용자 그룹의 식별자 목록 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## 모니터링

### 통계 정보 조회

#### 요청

```http
GET /v3.0/metric-statistics
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### Metric 목록 보기

#### 요청

```http
GET /v3.0/metrics
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "metrics": [
        {
            "measureName": "measureName-example",
            "unit": "unit-example"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| metrics | Array | Metric 목록 |
| metrics.measureName | String | 조회 지표 유형 |
| metrics.unit | String | 측정값 단위 |

---

## 이벤트

### 이벤트 카테고리

이벤트는 카테고리로 분류할 수 있으며 아래와 같습니다.

| 이벤트 카테고리    | 설명      |
|-------------|---------|
| ALL         | 전체      |
| BACKUP      | 백업      |
| DB_INSTANCE | DB 인스턴스 |
| JOB         | 작업      |
| TENANT      | 테넌트     |
| MONITORING  | 모니터링    |

### 구독 가능한 이벤트 코드 목록 보기

#### 요청

```http
GET /v3.0/event-codes
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "eventCodes": [
        {
            "eventCode": "ENUM_VALUE",
            "eventCategoryType": "ALL"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| eventCodes | Array | 이벤트 코드 목록 |
| eventCodes.eventCode | Enum | 이벤트 코드 |
| eventCodes.eventCategoryType | Enum | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |

---

### 이벤트 목록 조회

#### 요청

```http
GET /v3.0/events
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "totalCounts": 1,
    "events": [
        {
            "eventCategoryType": "ALL",
            "eventCode": "ENUM_VALUE",
            "sourceId": "550e8400-e29b-41d4-a716-446655440000",
            "sourceName": "sourceName-example",
            "messages": [
                {
                    "langCode": "KO",
                    "message": "message-example"
                }
            ],
            "eventYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| totalCounts | Number | 전체 이벤트 목록 수 |
| events | Array | 이벤트 목록 |
| events.eventCategoryType | Enum | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| events.eventCode | Enum | 발생한 이벤트의 유형 |
| events.sourceId | UUID | 이벤트 소스의 식별자 |
| events.sourceName | String | 이벤트 소스를 식별할 수 있는 이름 |
| events.messages | Array | 이벤트 메시지 목록 |
| events.messages.langCode | Enum | 언어 코드<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | String | 이벤트 메시지 |
| events.eventYmdt | DateTime | 이벤트 발생 일시 |

---

## 이벤트 구독

### 이벤트 구독 목록 조회

#### 요청

```http
GET /v3.0/event-subscriptions
```

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "totalCounts": 1,
    "eventSubscriptions": [
        {
            "eventSubscriptionId": "550e8400-e29b-41d4-a716-446655440000",
            "eventCategoryType": "ALL",
            "eventSubscriptionName": "eventSubscriptionName-example",
            "enabled": false,
            "notifyEmail": false,
            "notifySms": false,
            "eventCodes": [],
            "sources": [
                {
                    "sourceId": "550e8400-e29b-41d4-a716-446655440000",
                    "eventCategoryType": "ALL"
                }
            ],
            "userGroupIds": [
                "550e8400-e29b-41d4-a716-446655440000"
            ],
            "createdYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| totalCounts | Number | 전체 이벤트 구독 목록 수 |
| eventSubscriptions | Array | 이벤트 구독 목록 |
| eventSubscriptions.eventSubscriptionId | UUID | 이벤트 구독의 식별자 |
| eventSubscriptions.eventCategoryType | Enum | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.eventSubscriptionName | String | 이벤트 구독을 식별할 수 있는 이름 |
| eventSubscriptions.enabled | Boolean | 활성화 여부 |
| eventSubscriptions.notifyEmail | Boolean | 이메일 발송 여부 |
| eventSubscriptions.notifySms | Boolean | SMS 발송 여부 |
| eventSubscriptions.eventCodes | Array | 구독할 이벤트 코드 목록 |
| eventSubscriptions.sources | Array | 구독할 이벤트 소스 목록 |
| eventSubscriptions.sources.sourceId | UUID | 이벤트 소스의 식별자 |
| eventSubscriptions.sources.eventCategoryType | Enum | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.userGroupIds | Array | 이벤트 구독 중인 사용자 그룹의 식별자 목록 |
| eventSubscriptions.createdYmdt | DateTime | 생성 일시 |

---

### 이벤트 구독 생성하기

#### 요청

```http
POST /v3.0/event-subscriptions
```

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "eventCategoryType": "ALL",
    "eventSubscriptionName": "eventSubscriptionName-example",
    "enabled": false,
    "notifyEmail": false,
    "notifySms": false,
    "eventCodes": [],
    "sources": [
        {
            "sourceId": "550e8400-e29b-41d4-a716-446655440000",
            "eventCategoryType": "ALL"
        }
    ],
    "userGroupIds": []
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| eventCategoryType | Enum | Y | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | String | Y | 이벤트 구독을 식별할 수 있는 이름 |
| enabled | Boolean | Y | 활성화 여부 |
| notifyEmail | Boolean | Y | 이메일 발송 여부 |
| notifySms | Boolean | Y | SMS 발송 여부 |
| eventCodes | Array | Y | 구독할 이벤트 코드 목록 |
| sources | Array | Y | 구독할 이벤트 소스 목록 |
| sources.sourceId | UUID | Y | 이벤트 소스의 식별자 |
| sources.eventCategoryType | Enum | Y | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Array | Y | 이벤트 구독할 사용자 그룹의 식별자 목록 |

#### 응답

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "eventSubscriptionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

</details>

| 이름 | 타입 | 설명 |
|-----|-----|-----|
| eventSubscriptionId | UUID | 이벤트 구독의 식별자 |

---

### 이벤트 구독 삭제하기

#### 요청

```http
DELETE /v3.0/event-subscriptions/{eventSubscriptionId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | Y |  |

#### 요청 본문

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 이벤트 구독 수정하기

#### 요청

```http
PUT /v3.0/event-subscriptions/{eventSubscriptionId}
```

#### 요청 파라미터

| 이름 | 구분 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | Y |  |

#### 요청 본문

<details>
  <summary><strong>예시 코드</strong></summary>

```json
{
    "eventCategoryType": "ALL",
    "eventSubscriptionName": "eventSubscriptionName-example",
    "enabled": false,
    "notifyEmail": false,
    "notifySms": false,
    "eventCodes": [],
    "sources": [
        {
            "sourceId": "550e8400-e29b-41d4-a716-446655440000",
            "eventCategoryType": "ALL"
        }
    ],
    "userGroupIds": []
}
```

</details>

| 이름 | 타입 | 필수 | 설명 |
|-----|-----|-----|-----|
| eventCategoryType | Enum | N | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | String | N | 이벤트 구독을 식별할 수 있는 이름 |
| enabled | Boolean | N | 활성화 여부 |
| notifyEmail | Boolean | N | 이메일 발송 여부 |
| notifySms | Boolean | N | SMS 발송 여부 |
| eventCodes | Array | N | 구독할 이벤트 코드 목록 |
| sources | Array | N | 구독할 이벤트 소스 목록 |
| sources.sourceId | UUID | Y | 이벤트 소스의 식별자 |
| sources.eventCategoryType | Enum | Y | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Array | N | 이벤트 구독할 사용자 그룹의 식별자 목록 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

