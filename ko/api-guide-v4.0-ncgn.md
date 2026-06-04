## Database > RDS for MySQL > API v4.0 가이드

## RDS for MySQL API 공통 정보

### API 엔드포인트

| 리전 | 엔드포인트 |
|------|----------|
| 한국(판교) 리전 | https://kr1-rds-mysql.api.gncloud.go.kr |


### 인증 및 권한

RDS for MySQL은(는) API 호출 시 인증/인가를 위해 User Access Key 토큰을 사용합니다. User Access Key 토큰은 User Access Key를 기반으로 발급되는 Bearer 타입의 일시적 액세스 토큰입니다. User Access Key 토큰 발급 및 사용에 대한 자세한 내용은 [User Access Key 토큰](/nhncloud/ko/public-api/user-access-key-token)을 참고하세요.
발급 받은 토큰은 Appkey와 함께 요청 Header에 포함해야 합니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| X-TC-APP-KEY | Header | String | O | RDS for MySQL 서비스의 Appkey 또는 프로젝트 통합 Appkey |
| X-NHN-AUTHORIZATION | Header | String | O | Public API로 발급 받은 Bearer 유형 토큰 |

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

#### 응답 본문
```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    }
}
```

#### 필드
| 이름 | 형식 | 설명 |
|-----|-----|-----|
| resultCode | Number | 결과 코드<br/>- 성공: `0`<br/>- 실패: `0`이 아닌 값 |
| resultMessage | String | 결과 메시지 |
| isSuccessful | Boolean | 성공 여부 |

### DB 엔진 유형

| DB 엔진 유형 | 생성 가능 여부 | OBS로부터 복원 가능 여부 | 인증 플러그인 지원 |
|------------|----------|------------------|------------|
| MYSQL_V5633 | X | X | NATIVE |
| MYSQL_V5715 | O | O | NATIVE |
| MYSQL_V5719 | O | O | NATIVE |
| MYSQL_V5726 | O | O | NATIVE |
| MYSQL_V5731 | X | X | NATIVE |
| MYSQL_V5733 | O | X | NATIVE, SHA256 |
| MYSQL_V5737 | O | O | NATIVE, SHA256 |
| MYSQL_V8018 | X | X | NATIVE, CACHING_SHA2 |
| MYSQL_V8023 | X | X | NATIVE, CACHING_SHA2 |
| MYSQL_V8028 | X | X | NATIVE, CACHING_SHA2 |
| MYSQL_V8032 | X | X | NATIVE, CACHING_SHA2 |
| MYSQL_V8033 | X | X | NATIVE, CACHING_SHA2 |
| MYSQL_V8034 | X | X | NATIVE, CACHING_SHA2 |
| MYSQL_V8035 | O | O | NATIVE, CACHING_SHA2 |
| MYSQL_V8036 | O | O | NATIVE, CACHING_SHA2 |
| MYSQL_V8040 | O | O | NATIVE, CACHING_SHA2 |
| MYSQL_V8041 | O | O | NATIVE, CACHING_SHA2 |
| MYSQL_V8042 | O | O | NATIVE, CACHING_SHA2 |
| MYSQL_V8043 | O | O | NATIVE, CACHING_SHA2 |
| MYSQL_V8044 | O | O | NATIVE, CACHING_SHA2 |
| MYSQL_V8045 | O | O | NATIVE, CACHING_SHA2 |
| MYSQL_V8405 | O | O | CACHING_SHA2 |
| MYSQL_V8406 | O | O | CACHING_SHA2 |
| MYSQL_V8407 | O | O | CACHING_SHA2 |
| MYSQL_V8408 | O | O | CACHING_SHA2 |

* ENUM 타입의 dbVersion 필드에 대해 해당 값을 사용할 수 있습니다.
* 버전에 따라 생성 또는 복원이 불가능한 경우가 있을 수 있습니다.

## 프로젝트 정보

### 프로젝트 멤버 목록 보기

```http
GET /v4.0/project/members
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| members | Body | Array | 프로젝트 멤버 목록 |
| members.memberId | Body | String | 프로젝트 멤버의 식별자 |
| members.memberName | Body | String | 프로젝트 멤버의 이름 |
| members.emailAddress | Body | String | 프로젝트 멤버의 이메일 주소 |
| members.phoneNumber | Body | String | 프로젝트 멤버의 전화번호 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "members": [
        {
            "memberId": "memberId-example",
            "memberName": "memberName-example",
            "emailAddress": "emailAddress-example",
            "phoneNumber": "phoneNumber-example"
        }
    ]
}
```

</p>
</details>

---

### 리전 목록 보기

```http
GET /v4.0/project/regions
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| regions | Body | Array | 리전 목록 |
| regions.regionCode | Body | Enum | 리전 코드<br/>- KR1: `한국(판교)` |
| regions.isEnabled | Body | Boolean | 리전의 활성화 여부 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "regions": [
        {
            "regionCode": "KR1",
            "isEnabled": false
        }
    ]
}
```

</p>
</details>

---

## DB 인스턴스 사양

### DB 인스턴스 사양 목록 보기

```http
GET /v4.0/db-flavors
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbFlavors | Body | Array | DB 인스턴스 사양 목록 |
| dbFlavors.dbFlavorId | Body | String | DB 인스턴스 사양의 식별자 |
| dbFlavors.dbFlavorName | Body | String | DB 인스턴스 사양 이름 |
| dbFlavors.ram | Body | Number | 메모리 용량(MB) |
| dbFlavors.vcpus | Body | Number | CPU 코어 수 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbFlavors": [
        {
            "dbFlavorId": "dbFlavorId-example",
            "dbFlavorName": "dbFlavorName-example",
            "ram": 1,
            "vcpus": 1
        }
    ]
}
```

</p>
</details>

---

## 네트워크

### 서브넷 목록 보기

```http
GET /v4.0/network/subnets
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| subnets | Body | Array | 서브넷 목록 |
| subnets.subnetId | Body | UUID | 서브넷의 식별자 |
| subnets.subnetName | Body | String | 서브넷을 식별할 수 있는 이름 |
| subnets.subnetCidr | Body | String | 서브넷의 CIDR |
| subnets.usingGateway | Body | Boolean | 게이트웨이 사용 여부 |
| subnets.availableIpCount | Body | Number | 사용 가능한 IP 수 |

<details><summary>예시</summary>
<p>

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
            "subnetCidr": "subnetCidr-example",
            "usingGateway": false,
            "availableIpCount": 1
        }
    ]
}
```

</p>
</details>

---

## DB 엔진

### DB 엔진 목록 보기

```http
GET /v4.0/db-versions
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbVersions | Body | Array | DB 엔진 목록 |
| dbVersions.dbVersion | Body | String | DB 엔진 유형 |
| dbVersions.dbVersionName | Body | String | DB 엔진 이름 |
| dbVersions.restorableFromObs | Body | Boolean | 오브젝트 스토리지로부터 복원 가능 여부 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbVersions": [
        {
            "dbVersion": "dbVersion-example",
            "dbVersionName": "dbVersionName-example",
            "restorableFromObs": false
        }
    ]
}
```

</p>
</details>

---

## 데이터 스토리지

### 스토리지 타입 목록 보기

```http
GET /v4.0/storage-types
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| storageTypes | Body | Array | 스토리지 타입 목록 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "storageTypes": []
}
```

</p>
</details>

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

```http
GET /v4.0/jobs/{jobId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| jobId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | String | 작업의 식별자 |
| jobStatus | Body | Enum | 작업의 현재 상태<br/>- DELETED<br/>- CANNOT_PROGRESS<br/>- FAILED<br/>- ERROR<br/>- CANCELED<br/>- INTERRUPTED<br/>- COMPLETED<br/>- RUNNING<br/>- PREPARING<br/>- READY<br/>- CREATED<br/>- FAIL_TO_READY<br/>- REGISTERED<br/>- FAIL_TO_REGISTER<br/>- WAIT_TO_REGISTER |
| resourceRelations | Body | Array | 연관 리소스 목록 |
| resourceRelations.resourceType | Body | String | 연관 리소스 유형 |
| resourceRelations.resourceId | Body | String | 연관 리소스의 식별자 |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "jobId-example",
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

</p>
</details>

---

## DB 인스턴스 그룹

### DB 인스턴스 그룹 목록 보기

```http
GET /v4.0/db-instance-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbInstanceGroups | Body | Array | DB 인스턴스 그룹 목록 |
| dbInstanceGroups.dbInstanceGroupId | Body | String | DB 인스턴스 그룹의 식별자 |
| dbInstanceGroups.replicationType | Body | Enum | DB 인스턴스 그룹의 복제 형태<br/>- STANDALONE: `고가용성 사용 안함`<br/>- HIGH_AVAILABILITY: `고가용성 사용` |
| dbInstanceGroups.createdYmdt | Body | DateTime | 생성 일시 |
| dbInstanceGroups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceGroups": [
        {
            "dbInstanceGroupId": "dbInstanceGroupId-example",
            "replicationType": "STANDALONE",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### DB 인스턴스 그룹 상세 보기

```http
GET /v4.0/db-instance-groups/{dbInstanceGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceGroupId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbInstanceGroupId | Body | String | DB 인스턴스 그룹의 식별자 |
| replicationType | Body | Enum | DB 인스턴스 그룹의 복제 형태<br/>- STANDALONE: `고가용성 사용 안함`<br/>- HIGH_AVAILABILITY: `고가용성 사용` |
| dbInstances | Body | Array | DB 인스턴스 그룹에 속한 DB 인스턴스 목록 |
| dbInstances.dbInstanceId | Body | String | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceType | Body | Enum | DB 인스턴스의 역할 타입<br/>- MASTER: `마스터`<br/>- FAILED_MASTER: `장애 마스터`<br/>- CANDIDATE_MASTER: `예비 마스터`<br/>- READ_ONLY_SLAVE: `읽기 복제본` |
| dbInstances.dbInstanceStatus | Body | Enum | DB 인스턴스의 현재 상태<br/>- BEFORE_CREATE: `생성 이전 (회색)`<br/>- AVAILABLE: `사용 가능 (녹색)`<br/>- STORAGE_FULL: `용량 부족 (적색)`<br/>- FAIL_TO_CREATE: `생성 실패 (적색)`<br/>- FAIL_TO_CONNECT: `연결 실패 (적색)`<br/>- REPLICATION_STOP: `복제 중단 (적색)`<br/>- REPLICATION_DELAY: `복제 지연 (황색)`<br/>- FAILOVER: `장애 조치 완료 (적색)`<br/>- SHUTDOWN: `중지 됨 (회색)`<br/>- DELETED: `삭제됨 (회색)` |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceGroupId": "dbInstanceGroupId-example",
    "replicationType": "STANDALONE",
    "dbInstances": [
        {
            "dbInstanceId": "dbInstanceId-example",
            "dbInstanceType": "MASTER",
            "dbInstanceStatus": "BEFORE_CREATE"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</p>
</details>

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

```http
GET /v4.0/db-instances
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbInstances | Body | Array | DB 인스턴스 목록 |
| dbInstances.dbInstanceId | Body | String | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceGroupId | Body | String | DB 인스턴스 그룹의 식별자 |
| dbInstances.dbInstanceName | Body | String | DB 인스턴스를 식별할 수 있는 이름 |
| dbInstances.description | Body | String | DB 인스턴스에 대한 추가 정보 |
| dbInstances.dbVersion | Body | Enum | DB 엔진 유형 |
| dbInstances.dbPort | Body | Number | DB 포트 |
| dbInstances.dbInstanceType | Body | Enum | DB 인스턴스 역할 타입<br/>- MASTER: `마스터`<br/>- FAILED_MASTER: `장애 마스터`<br/>- CANDIDATE_MASTER: `예비 마스터`<br/>- READ_ONLY_SLAVE: `읽기 복제본` |
| dbInstances.dbInstanceStatus | Body | Enum | DB 인스턴스의 현재 상태<br/>- BEFORE_CREATE: `생성 이전 (회색)`<br/>- AVAILABLE: `사용 가능 (녹색)`<br/>- STORAGE_FULL: `용량 부족 (적색)`<br/>- FAIL_TO_CREATE: `생성 실패 (적색)`<br/>- FAIL_TO_CONNECT: `연결 실패 (적색)`<br/>- REPLICATION_STOP: `복제 중단 (적색)`<br/>- REPLICATION_DELAY: `복제 지연 (황색)`<br/>- FAILOVER: `장애 조치 완료 (적색)`<br/>- SHUTDOWN: `중지 됨 (회색)`<br/>- DELETED: `삭제됨 (회색)` |
| dbInstances.progressStatus | Body | Enum | DB 인스턴스의 현재 진행 상태<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbInstances.createdYmdt | Body | DateTime | 생성 일시 |
| dbInstances.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstances": [
        {
            "dbInstanceId": "dbInstanceId-example",
            "dbInstanceGroupId": "dbInstanceGroupId-example",
            "dbInstanceName": "dbInstanceName-example",
            "description": "description-example",
            "dbVersion": "ENUM_VALUE",
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

</p>
</details>

---

### DB 인스턴스 생성하기

```http
POST /v4.0/db-instances
```

#### 공통 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | O | DB 인스턴스를 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | Body | UUID | O | DB 인스턴스 사양의 식별자 |
| dbVersion | Body | Enum | O | DB 엔진 유형 |
| dbPort | Body | Number | O | DB 포트<br/>- 최솟값: 3306, 최댓값: 43306 |
| dbUserName | Body | String | O | DB 사용자 계정명<br/>- 최소 길이: `1`<br/>- 최대 길이: `32` |
| dbPassword | Body | String | O | DB 사용자 계정 암호<br/>- 최소 길이: `4`<br/>- 최대 길이: `256` |
| parameterGroupId | Body | UUID | O | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |
| useHighAvailability | Body | Boolean | X | 고가용성 사용 여부<br/>- 기본값: `false` |
| pingInterval | Body | Number | X | 고가용성 사용 시 Ping 간격(초)<br/>- 기본값: `3`<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| useDefaultNotification | Body | Boolean | X | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Body | Boolean | X | 삭제 보호 여부<br/>- 기본값: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query 분석 여부<br/>- 기본값: `true` |
| authenticationPlugin | Body | Enum | X | 인증 Plugin<br/>- NATIVE: `mysql_native_password 인증`<br/>- CACHING_SHA2: `caching_sha2_password 인증 (MySQL 전용)`<br/>- SHA256: `sha256_password 인증 (MySQL 전용)` |
| tlsOption | Body | Enum | X | TLS Option<br/>- 기본값: `NONE`<br/>- NONE: `TLS 미사용`<br/>- SSL: `SSL 인증`<br/>- X509: `X509 인증서 인증` |
| network | Body | Object | O | 네트워크 정보 객체 |
| network.subnetId | Body | UUID | O | 서브넷의 식별자 |
| network.usePublicAccess | Body | Boolean | X | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Body | Enum | O | DB 인스턴스를 생성할 가용성 영역 |
| storage | Body | Object | O | 스토리지 정보 객체 |
| storage.storageType | Body | Enum | O | 데이터 스토리지 타입 |
| storage.storageSize | Body | Number | O | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| storage.storageAutoscale | Body | Object | X | 데이터 스토리지 자동 확장 객체 |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | 스토리지 자동 확장 여부<br/>- 기본값: `false` |
| backup | Body | Object | O | 백업 정보 객체 |
| backup.backupPeriod | Body | Number | O | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Body | Number | X | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backup.replicationRegion | Body | Enum | X | 백업 복제 리전<br/>- KR1: `한국(판교)` |
| backup.useBackupLock | Body | Boolean | X | 테이블 잠금 사용 여부<br/>- 기본값: `true` |
| backup.backupSchedules | Body | Array | O | 백업 스케쥴 목록 |
| backup.backupSchedules.backupWndBgnTime | Body | String | O | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

#### 고가용성 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | DB 인스턴스를 식별할 수 있는 예비 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |

#### 스토리지 자동 확장 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | 자동 확장 조건(%)<br/>- 최솟값: `50`<br/>- 최댓값: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | 자동 확장 최대 크기(GB)<br/>- 최댓값: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | 자동 확장 쿨다운 시간(분)<br/>- 최솟값: `10`<br/>- 최댓값: `1440` |

<details><summary>예시</summary>
<p>

```json
{
    "dbInstanceName": "dbInstanceName",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbVersion": "ENUM_VALUE",
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
    "useSlowQueryAnalysis": true,
    "authenticationPlugin": "NATIVE",
    "tlsOption": "NONE",
    "network": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "usePublicAccess": false,
        "availabilityZone": "ENUM_VALUE"
    },
    "storage": {
        "storageType": "ENUM_VALUE",
        "storageSize": 20,
        "storageAutoscale": {
            "useStorageAutoscale": false
        }
    },
    "backup": {
        "backupPeriod": 0,
        "backupRetryCount": 0,
        "ftwrlWaitTimeout": 1800,
        "replicationRegion": "KR1",
        "useBackupLock": true,
        "backupSchedules": [
            {
                "backupWndBgnTime": "backupWndBgnTime-example",
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    }
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 오브젝트 스토리지를 이용한 DB 인스턴스 복원

```http
POST /v4.0/db-instances/restore-from-obs
```

#### 공통 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceName | Body | String | O | DB 인스턴스를 식별할 수 있는 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | Body | UUID | O | DB 인스턴스 사양의 식별자 |
| dbPort | Body | Number | O | DB 포트 |
| dbVersion | Body | Enum | O | DB 엔진 유형 |
| useHighAvailability | Body | Boolean | X | 고가용성 사용 여부<br/>- 기본값: `false` |
| pingInterval | Body | Number | X | 고가용성 사용 시 Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| storage | Body | Object | O | 스토리지 정보 객체 |
| storage.storageType | Body | Enum | O | 스토리지 타입 |
| storage.storageSize | Body | Number | O | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| storage.storageAutoscale | Body | Object | X | 데이터 스토리지 자동 확장 객체 |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | 스토리지 자동 확장 여부<br/>- 기본값: `false` |
| network | Body | Object | O | 네트워크 정보 객체 |
| network.subnetId | Body | UUID | O | 서브넷의 식별자 |
| network.usePublicAccess | Body | Boolean | X | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Body | Enum | O | DB 인스턴스를 생성할 가용성 영역 |
| backup | Body | Object | O | 백업 정보 객체 |
| backup.backupPeriod | Body | Number | O | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.ftwrlWaitTimeout | Body | Number | X | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backup.backupRetryCount | Body | Number | X | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.replicationRegion | Body | Enum | X | 백업 복제 리전<br/>- KR1: `한국(판교)` |
| backup.useBackupLock | Body | Boolean | X | 테이블 잠금 사용 여부<br/>- 기본값: `true` |
| backup.backupSchedules | Body | Array | O | 백업 스케쥴 목록 |
| backup.backupSchedules.backupWndBgnTime | Body | String | O | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |
| restore | Body | Object | O | 복원 정보 객체 |
| restore.tenantId | Body | String | O | 백업이 저장된 오브젝트 스토리지의 테넌트 ID |
| restore.username | Body | String | O | NHN Cloud 계정 혹은 IAM 멤버 ID |
| restore.password | Body | String | O | 백업이 저장된 오브젝트 스토리지의 API 비밀번호 |
| restore.targetContainer | Body | String | O | 백업이 저장된 오브젝트 스토리지의 컨테이너 |
| restore.objectPath | Body | String | O | 컨테이너에 저장된 백업의 경로 |
| useDefaultNotification | Body | Boolean | X | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query 분석 여부<br/>- 기본값: `true` |
| parameterGroupId | Body | UUID | O | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |
| useDeletionProtection | Body | Boolean | X | 삭제 보호 여부<br/>- 기본값: `false` |

#### 고가용성 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | DB 인스턴스를 식별할 수 있는 예비 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |

#### 스토리지 자동 확장 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | 자동 확장 조건(%)<br/>- 최솟값: `50`<br/>- 최댓값: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | 자동 확장 최대 크기(GB)<br/>- 최댓값: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | 자동 확장 쿨다운 시간(분)<br/>- 최솟값: `10`<br/>- 최댓값: `1440` |

<details><summary>예시</summary>
<p>

```json
{
    "dbInstanceName": "dbInstanceName",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbPort": 1,
    "dbVersion": "ENUM_VALUE",
    "useHighAvailability": false,
    "pingInterval": 3,
    "storage": {
        "storageType": "ENUM_VALUE",
        "storageSize": 20,
        "storageAutoscale": {
            "useStorageAutoscale": false
        }
    },
    "network": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "usePublicAccess": false,
        "availabilityZone": "ENUM_VALUE"
    },
    "backup": {
        "backupPeriod": 0,
        "ftwrlWaitTimeout": 1800,
        "backupRetryCount": 0,
        "replicationRegion": "KR1",
        "useBackupLock": true,
        "backupSchedules": [
            {
                "backupWndBgnTime": "backupWndBgnTime-example",
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    },
    "restore": {
        "tenantId": "tenantId-example",
        "username": "username-example",
        "password": "password-example",
        "targetContainer": "targetContainer-example",
        "objectPath": "objectPath-example"
    },
    "useDefaultNotification": false,
    "useSlowQueryAnalysis": true,
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbSecurityGroupIds": [],
    "userGroupIds": [],
    "useDeletionProtection": false
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 삭제하기

```http
DELETE /v4.0/db-instances/{dbInstanceId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| deleteAutoBackup | Body | Boolean | X | 자동 백업 삭제 여부<br/>- 기본값: `false` |

<details><summary>예시</summary>
<p>

```json
{
    "deleteAutoBackup": false
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 상세 보기

```http
GET /v4.0/db-instances/{dbInstanceId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbInstanceId | Body | String | DB 인스턴스의 식별자 |
| dbInstanceGroupId | Body | String | DB 인스턴스 그룹의 식별자 |
| dbInstanceName | Body | String | DB 인스턴스를 식별할 수 있는 이름 |
| description | Body | String | DB 인스턴스에 대한 추가 정보 |
| dbVersion | Body | Enum | DB 엔진 유형 |
| dbPort | Body | Number | DB 포트 |
| dbInstanceType | Body | Enum | DB 인스턴스 역할 타입<br/>- MASTER: `마스터`<br/>- FAILED_MASTER: `장애 마스터`<br/>- CANDIDATE_MASTER: `예비 마스터`<br/>- READ_ONLY_SLAVE: `읽기 복제본` |
| dbInstanceStatus | Body | Enum | DB 인스턴스의 현재 상태<br/>- BEFORE_CREATE: `생성 이전 (회색)`<br/>- AVAILABLE: `사용 가능 (녹색)`<br/>- STORAGE_FULL: `용량 부족 (적색)`<br/>- FAIL_TO_CREATE: `생성 실패 (적색)`<br/>- FAIL_TO_CONNECT: `연결 실패 (적색)`<br/>- REPLICATION_STOP: `복제 중단 (적색)`<br/>- REPLICATION_DELAY: `복제 지연 (황색)`<br/>- FAILOVER: `장애 조치 완료 (적색)`<br/>- SHUTDOWN: `중지 됨 (회색)`<br/>- DELETED: `삭제됨 (회색)` |
| progressStatus | Body | Enum | DB 인스턴스의 현재 진행 상태<br/>- NONE<br/>- APPLYING_PARAMETER_GROUP<br/>- BACKING_UP<br/>- CANCELING<br/>- CREATING<br/>- CREATING_SCHEMA<br/>- CREATING_USER<br/>- DELETING<br/>- DELETING_SCHEMA<br/>- DELETING_USER<br/>- EXPORTING_BACKUP<br/>- FAILING_OVER<br/>- MIGRATING<br/>- MODIFYING<br/>- PREPARING<br/>- PROMOTING<br/>- PROMOTING_FORCIBLY<br/>- REBUILDING<br/>- REPAIRING<br/>- REPLICATING<br/>- RESTARTING<br/>- RESTARTING_FORCIBLY<br/>- RESTORING<br/>- STARTING<br/>- STOPPING<br/>- SYNCING_SCHEMA<br/>- SYNCING_USER<br/>- UPDATING_USER<br/>- WAIT_MANUAL_CONTROL |
| dbFlavorId | Body | String | DB 인스턴스 사양의 식별자 |
| parameterGroupId | Body | String | DB 인스턴스에 적용된 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Body | Array | DB 인스턴스에 적용된 DB 보안 그룹의 식별자 목록 |
| notificationGroupIds | Body | Array | DB 인스턴스에 적용된 알림 그룹의 식별자 목록 |
| useDeletionProtection | Body | Boolean | DB 인스턴스 삭제 보호 여부 |
| useSlowQueryAnalysis | Body | Boolean | Slow query 분석 여부 |
| supportAuthenticationPlugin | Body | Boolean | 인증 plugin 지원 여부 |
| needToApplyParameterGroup | Body | Boolean | 최신 파라미터 그룹 적용 필요 여부 |
| needMigration | Body | Boolean | 마이그레이션 필요 여부 |
| supportDbVersionUpgrade | Body | Boolean | DB 버전 업그레이드 지원 여부 |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbInstanceId": "dbInstanceId-example",
    "dbInstanceGroupId": "dbInstanceGroupId-example",
    "dbInstanceName": "dbInstanceName-example",
    "description": "description-example",
    "dbVersion": "ENUM_VALUE",
    "dbPort": 1,
    "dbInstanceType": "MASTER",
    "dbInstanceStatus": "BEFORE_CREATE",
    "progressStatus": "NONE",
    "dbFlavorId": "dbFlavorId-example",
    "parameterGroupId": "parameterGroupId-example",
    "dbSecurityGroupIds": [],
    "notificationGroupIds": [],
    "useDeletionProtection": false,
    "useSlowQueryAnalysis": false,
    "supportAuthenticationPlugin": false,
    "needToApplyParameterGroup": false,
    "needMigration": false,
    "supportDbVersionUpgrade": false,
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</p>
</details>

---

### DB 인스턴스 수정하기

```http
PUT /v4.0/db-instances/{dbInstanceId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbInstanceName | Body | String | X | DB 인스턴스를 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| dbInstanceCandidateName | Body | String | X | DB 인스턴스를 식별할 수 있는 예비 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbPort | Body | Number | X | DB 포트<br/>- 최솟값: 3306, 최댓값: 43306 |
| dbFlavorId | Body | UUID | X | DB 인스턴스 사양의 식별자 |
| parameterGroupId | Body | UUID | X | 파라미터 그룹의 식별자 |
| dbVersion | Body | Enum | X | DB 엔진 버전 코드 |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query 분석 여부 |
| useDummy | Body | Boolean | X | 단일 DB 인스턴스의 DB 버전 업그레이드 시 더미 사용 여부<br/>- 기본값: `false` |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| executeBackup | Body | Boolean | X | 현재 시점 백업 진행 여부<br/>- 기본값: `false` |
| useOnlineFailover | Body | Boolean | X | 장애 조치를 이용한 재시작 여부<br/>- 기본값: `false` |
| waitReplicationDelay | Body | Boolean | X | 복제 지연 해소 대기<br/>- 기본값: `false` |
| useReadOnly | Body | Boolean | X | 쓰기 부하 차단<br/>- 기본값: `false` |

<details><summary>예시</summary>
<p>

```json
{
    "dbInstanceName": "dbInstanceName",
    "dbInstanceCandidateName": "dbInstanceCandidateName",
    "description": "description-example",
    "dbPort": 1,
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbVersion": "ENUM_VALUE",
    "useSlowQueryAnalysis": false,
    "useDummy": false,
    "dbSecurityGroupIds": [],
    "executeBackup": false,
    "useOnlineFailover": false,
    "waitReplicationDelay": false,
    "useReadOnly": false
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 백업 정보 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/backup-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| backupPeriod | Body | Number | 백업 보관 기간(일) |
| ftwrlWaitTimeout | Body | Number | 쿼리 지연 대기 시간(초) |
| backupRetryCount | Body | Number | 백업 재시도 횟수 |
| replicationRegion | Body | Enum | 백업 복제 리전<br/>- KR1: `한국(판교)` |
| useBackupLock | Body | Boolean | 테이블 잠금 사용 여부 |
| backupSchedules | Body | Array | 백업 스케쥴 목록 |
| backupSchedules.backupWndBgnTime | Body | String | 백업 시작 시각 |
| backupSchedules.backupWndDuration | Body | Enum | 백업 Duration<br/>- HALF_AN_HOUR<br/>- ONE_HOUR<br/>- ONE_HOUR_AND_HALF<br/>- TWO_HOURS<br/>- TWO_HOURS_AND_HALF<br/>- THREE_HOURS |

<details><summary>예시</summary>
<p>

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
    "replicationRegion": "KR1",
    "useBackupLock": false,
    "backupSchedules": [
        {
            "backupWndBgnTime": "backupWndBgnTime-example",
            "backupWndDuration": "HALF_AN_HOUR"
        }
    ]
}
```

</p>
</details>

---

### 백업 정보 수정하기

```http
PUT /v4.0/db-instances/{dbInstanceId}/backup-info
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| backupPeriod | Body | Number | X | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| ftwrlWaitTimeout | Body | Number | X | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backupRetryCount | Body | Number | X | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| replicationRegion | Body | Enum | X | 백업 복제 리전<br/>- KR1: `한국(판교)` |
| useBackupLock | Body | Boolean | X | 테이블 잠금 사용 여부 |
| backupSchedules | Body | Array | X | 백업 스케쥴 목록 |
| backupSchedules.backupWndBgnTime | Body | String | O | 백업 시작 시각 |
| backupSchedules.backupWndDuration | Body | Enum | O | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

<details><summary>예시</summary>
<p>

```json
{
    "backupPeriod": 0,
    "ftwrlWaitTimeout": 0,
    "backupRetryCount": 0,
    "replicationRegion": "KR1",
    "useBackupLock": false,
    "backupSchedules": [
        {
            "backupWndBgnTime": "backupWndBgnTime-example",
            "backupWndDuration": "HALF_AN_HOUR"
        }
    ]
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 바이너리 로그 목록 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/binlogs
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| binLogs | Body | Array | BinLog 파일 목록 |
| binLogs.binLogFileName | Body | String | BinLog 파일 이름 |
| binLogs.binLogFileSize | Body | Number | BinLog 파일 크기 (Byte) |
| binLogs.createdYmdt | Body | DateTime | 생성 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "binLogs": [
        {
            "binLogFileName": "binLogFileName-example",
            "binLogFileSize": 1,
            "createdYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 바이너리 로그 삭제

```http
POST /v4.0/db-instances/{dbInstanceId}/binlogs/purge
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| lastBinLogFileName | Body | String | O | 삭제할 마지막 BinLog 파일 이름 (해당 파일 직전까지 삭제됨) |

<details><summary>예시</summary>
<p>

```json
{
    "lastBinLogFileName": "mysql-bin.000010"
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 인증서 파일 목록 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/certificates
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| certificates | Body | Array | 인증서 파일 목록 |
| certificates.fileName | Body | String | 인증서 파일 이름 |
| certificates.certificateType | Body | Enum | 인증서 타입<br/>- CA_FILE<br/>- CERT_FILE<br/>- KEY_FILE |
| certificates.fileSize | Body | Number | 인증서 파일 크기(Byte) |
| certificates.createdYmdt | Body | DateTime | 생성 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "certificates": [
        {
            "fileName": "fileName-example",
            "certificateType": "CA_FILE",
            "fileSize": 1,
            "createdYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 인증서 파일 내보내기

```http
POST /v4.0/db-instances/{dbInstanceId}/certificates/upload
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| certificateTypes | Body | Array | O | 업로드할 인증서 타입 목록 |
| tenantId | Body | String | O | 인증서 파일이 저장될 오브젝트 스토리지의 테넌트 ID<br/>- 최소 길이: `32`<br/>- 최대 길이: `32` |
| username | Body | String | O | NHN Cloud 회원 또는 IAM 멤버 ID |
| password | Body | String | O | 인증서 파일이 저장될 오브젝트 스토리지의 API 비밀번호 |
| targetContainer | Body | String | O | 인증서 파일이 저장될 오브젝트 스토리지의 컨테이너 |
| objectPath | Body | String | O | 컨테이너에 저장될 인증서 파일의 경로 |

<details><summary>예시</summary>
<p>

```json
{
    "certificateTypes": [],
    "tenantId": "tenantId-example",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 스키마 목록 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/db-schemas
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbSchemas | Body | Array | DB 스키마 목록 |
| dbSchemas.dbSchemaId | Body | String | DB 스키마의 식별자 |
| dbSchemas.dbSchemaName | Body | String | DB 스키마 이름 |
| dbSchemas.dbSchemaStatus | Body | Enum | DB 스키마의 현재 상태<br/>- STABLE<br/>- CREATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbSchemas.createdYmdt | Body | DateTime | 생성 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSchemas": [
        {
            "dbSchemaId": "dbSchemaId-example",
            "dbSchemaName": "dbSchemaName-example",
            "dbSchemaStatus": "STABLE",
            "createdYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### DB 스키마 생성하기

```http
POST /v4.0/db-instances/{dbInstanceId}/db-schemas
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbSchemaName | Body | String | O | DB 스키마 이름<br/>- 최대 길이: `64`<br/>- 영문 시작, 영문/숫자/_ 허용, 1~64자, MySQL 예약어 불가 |

<details><summary>예시</summary>
<p>

```json
{
    "dbSchemaName": "dbSchemaName-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 스키마 삭제하기

```http
DELETE /v4.0/db-instances/{dbInstanceId}/db-schemas/{dbSchemaId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbSchemaId | URL | UUID | O | DB 스키마의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 사용자 목록 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/db-users
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbUsers | Body | Array | DB 사용자 목록 |
| dbUsers.dbUserId | Body | String | DB 사용자의 식별자 |
| dbUsers.dbUserName | Body | String | DB 사용자 계정 이름 |
| dbUsers.host | Body | String | DB 사용자 계정의 호스트 이름 |
| dbUsers.authorityType | Body | Enum | DB 사용자 권한 타입<br/>- CUSTOM: `사용자 정의 권한`<br/>- READ: `읽기 권한`<br/>- CRUD: `CRUD 권한`<br/>- DDL: `DDL 권한`<br/>- ALL: `전체 권한` |
| dbUsers.dbUserStatus | Body | Enum | DB 사용자의 현재 상태<br/>- STABLE<br/>- CREATING<br/>- UPDATING<br/>- SYNCING<br/>- DELETING<br/>- DELETED |
| dbUsers.createdYmdt | Body | DateTime | 생성 일시 |
| dbUsers.updatedYmdt | Body | DateTime | 수정 일시 |
| dbUsers.authenticationPlugin | Body | Enum | 사용자 인증 플러그인<br/>- NATIVE: `mysql_native_password 인증`<br/>- CACHING_SHA2: `caching_sha2_password 인증 (MySQL 전용)`<br/>- SHA256: `sha256_password 인증 (MySQL 전용)` |
| dbUsers.tlsOption | Body | Enum | 인증서 옵션<br/>- NONE: `TLS 미사용`<br/>- SSL: `SSL 인증`<br/>- X509: `X509 인증서 인증` |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbUsers": [
        {
            "dbUserId": "dbUserId-example",
            "dbUserName": "dbUserName-example",
            "host": "host-example",
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

</p>
</details>

---

### DB 사용자 생성하기

```http
POST /v4.0/db-instances/{dbInstanceId}/db-users
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbUserName | Body | String | O | DB 사용자 계정명<br/>- 최소 길이: `1`<br/>- 최대 길이: `32` |
| dbPassword | Body | String | O | DB 사용자 계정 암호<br/>- 최소 길이: `4`<br/>- 최대 길이: `256` |
| host | Body | String | O | DB 사용자 계정의 호스트명<br/>- 최대 길이: `45` |
| authorityType | Body | Enum | O | DB 사용자 권한 타입<br/>- CUSTOM: `사용자 정의 권한`<br/>- READ: `읽기 권한`<br/>- CRUD: `CRUD 권한`<br/>- DDL: `DDL 권한`<br/>- ALL: `전체 권한` |
| authenticationPlugin | Body | Enum | X | 사용자 인증 플러그인<br/>- NATIVE: `mysql_native_password 인증`<br/>- CACHING_SHA2: `caching_sha2_password 인증 (MySQL 전용)`<br/>- SHA256: `sha256_password 인증 (MySQL 전용)` |
| tlsOption | Body | Enum | X | 인증서 옵션<br/>- 기본값: `NONE`<br/>- NONE: `TLS 미사용`<br/>- SSL: `SSL 인증`<br/>- X509: `X509 인증서 인증` |

<details><summary>예시</summary>
<p>

```json
{
    "dbUserName": "dbUserName",
    "dbPassword": "dbPassword",
    "host": "host-example",
    "authorityType": "CUSTOM",
    "authenticationPlugin": "NATIVE",
    "tlsOption": "NONE"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 사용자 삭제하기

```http
DELETE /v4.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbUserId | URL | UUID | O | DB 사용자의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 사용자 수정하기

```http
PUT /v4.0/db-instances/{dbInstanceId}/db-users/{dbUserId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbUserId | URL | UUID | O | DB 사용자의 식별자 |
| dbPassword | Body | String | X | DB 사용자 계정 암호<br/>- 최소 길이: `4`<br/>- 최대 길이: `256` |
| authorityType | Body | Enum | X | DB 사용자 권한 타입<br/>- CUSTOM: `사용자 정의 권한`<br/>- READ: `읽기 권한`<br/>- CRUD: `CRUD 권한`<br/>- DDL: `DDL 권한`<br/>- ALL: `전체 권한` |
| authenticationPlugin | Body | Enum | X | 사용자 인증 플러그인<br/>- NATIVE: `mysql_native_password 인증`<br/>- CACHING_SHA2: `caching_sha2_password 인증 (MySQL 전용)`<br/>- SHA256: `sha256_password 인증 (MySQL 전용)` |
| tlsOption | Body | Enum | X | 인증서 옵션<br/>- NONE: `TLS 미사용`<br/>- SSL: `SSL 인증`<br/>- X509: `X509 인증서 인증` |

<details><summary>예시</summary>
<p>

```json
{
    "dbPassword": "dbPassword",
    "authorityType": "CUSTOM",
    "authenticationPlugin": "NATIVE",
    "tlsOption": "NONE"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 삭제 보호 설정 변경

```http
PUT /v4.0/db-instances/{dbInstanceId}/deletion-protection
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| useDeletionProtection | Body | Boolean | O | 삭제 보호 여부 |

<details><summary>예시</summary>
<p>

```json
{
    "useDeletionProtection": false
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 인스턴스 강제 재시작하기

```http
POST /v4.0/db-instances/{dbInstanceId}/force-restart
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 고가용성 정보 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/high-availability
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| useHighAvailability | Body | Boolean | 고가용성 사용 여부<br/>- 기본값: `false` |
| haStatus | Body | Enum | 고가용성 상태<br/>- CREATED: `생성됨`<br/>- STABLE: `정상`<br/>- PAUSING: `일시 중지 중`<br/>- DISABLE: `정지`<br/>- DISABLE_MASTER_IN_REPLICATION: `마스터 비정상 복제 감지로 인한 고가용성 중단`<br/>- DISABLE_MHA_PROCESS: `고가용성 프로세스 중단`<br/>- DISABLE_REPLICATION_STOP: `복제 중단으로 인한 고가용성 중단`<br/>- DISABLE_REPLICATION_DELAY: `복제 지연으로 인한 고가용성 중단`<br/>- FAILOVER_STARTED: `장애 조치 시작`<br/>- FAILOVER_FAILED: `장애 조치 실패`<br/>- FAILOVER_COMPLETED: `장애 조치 완료`<br/>- DELETED: `삭제됨`<br/>- PAUSED: `일시 중지`<br/>- PAUSED_DUE_TO_TASK: `작업으로 인한 일시 중지`<br/>- MASTER_FAILURE_DETECTION: `마스터 장애 감지` |
| pingInterval | Body | Number | Ping 간격(초) |
| pingType | Body | String | Ping 방식 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "useHighAvailability": false,
    "haStatus": "CREATED",
    "pingInterval": 1,
    "pingType": "pingType-example"
}
```

</p>
</details>

---

### 고가용성 수정하기

```http
PUT /v4.0/db-instances/{dbInstanceId}/high-availability
```

#### 공통 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| useHighAvailability | Body | Boolean | O | 고가용성 사용 여부 |
| pingInterval | Body | Number | X | 고가용성 사용 시 Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |

#### 고가용성 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | DB 인스턴스를 식별할 수 있는 예비 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |

<details><summary>예시</summary>
<p>

```json
{
    "useHighAvailability": false,
    "pingInterval": 1
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 고가용성 일시 중지하기

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/pause
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 고가용성 복구하기

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/repair
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 고가용성 다시 시작하기

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/resume
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 고가용성 분리하기

```http
POST /v4.0/db-instances/{dbInstanceId}/high-availability/split
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 로그 파일 목록 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/log-files
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| logFiles | Body | Array | 로그 파일 목록 |
| logFiles.logFileName | Body | String | 로그 파일 이름 |
| logFiles.logFileType | Body | Enum | 로그 파일 타입 종류<br/>- ERROR<br/>- BINLOG<br/>- GENERAL<br/>- SLOW_QUERY<br/>- AUDIT<br/>- BACKUP |
| logFiles.logFileSize | Body | Number | 로그 파일 크기(Byte) |
| logFiles.createdYmdt | Body | DateTime | 생성 일시 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 로그 파일 내보내기

```http
POST /v4.0/db-instances/{dbInstanceId}/log-files/export
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O |  |
| logFileNames | Body | Array | O | 로그 파일 이름 목록 |
| tenantId | Body | String | O | 로그 파일이 저장될 오브젝트 스토리지의 테넌트 ID<br/>- 최소 길이: `32`<br/>- 최대 길이: `32` |
| username | Body | String | O | NHN Cloud 회원 또는 IAM 멤버 ID |
| password | Body | String | O | 로그 파일이 저장될 오브젝트 스토리지의 API 비밀번호 |
| targetContainer | Body | String | O | 로그 파일이 저장될 오브젝트 스토리지의 컨테이너 |
| objectPath | Body | String | O | 컨테이너에 저장될 로그 파일의 경로 |

<details><summary>예시</summary>
<p>

```json
{
    "logFileNames": [],
    "tenantId": "tenantId-example",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 로그 파일 내용 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/log-files/{logFileName}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| logFileName | URL | UUID | O | 로그 파일 이름 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| content | Body | String | 로그 파일 내용 (최대 65533 bytes) |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "content": "content-example"
}
```

</p>
</details>

---

### DB 인스턴스 유지 관리 목록 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/maintenances
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| type | Query | String | X |  |
| statuses | Query | String | X |  |
| category | Query | String | X |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 유지 관리 목록 갯수 |
| maintenances | Body | Array | 유지 관리 목록 |
| maintenances.maintenanceId | Body | String | 유지 관리 아이디 |
| maintenances.dbInstanceId | Body | String | DB 인스턴스 아이디 |
| maintenances.category | Body | Enum | 유지 관리 카테고리<br/>- USER: `사용자 유지 관리 카테고리`<br/>- PROVIDER: `Provider 유지 관리 카테고리`<br/>- AUTO: `자동 유지 관리 카테고리` |
| maintenances.description | Body | String | 유지 관리 설명 |
| maintenances.type | Body | Enum | 유지 관리 타입<br/>- UPDATE_DB_INSTANCE: `DB 인스턴스 수정(사양 변경, 포트 변경, 파라미터 그룹 변경)`<br/>- UPGRADE_ENGINE_VERSION: `엔진 버전 업그레이드`<br/>- APPLY_CHANGE_PARAMETER: `파라미터 그룹의 파라미터 변경`<br/>- UPGRADE_OS: `운영체제 버전 업그레이드`<br/>- PATCH_SECURITY: `보안 업데이트`<br/>- MIGRATION: `하이퍼바이저 점검을 위한 마이그레이션`<br/>- CLEANUP_STORAGE: `스토리지 정리` |
| maintenances.payload | Body | Object | 유지 관리 타입에 따른 Payload |
| maintenances.required | Body | Boolean | 유지 관리 필수 여부 |
| maintenances.deadlineYmdt | Body | DateTime | 유지 관리 강제 적용 일시 |
| maintenances.status | Body | Enum | 유지 관리 상태<br/>- PENDING: `대기`<br/>- READY: `준비`<br/>- RUNNING: `실행 중`<br/>- COMPLETED: `완료`<br/>- FAILED: `실패`<br/>- EXCLUDED: `제외`<br/>- DELETED: `삭제`<br/>- UNKNOWN |
| maintenances.executionType | Body | Enum | 유지 관리 실행 타입<br/>- SCHEDULED: `예약 실행 (유지 관리 기간 자동 실행)`<br/>- MANUAL: `수동 실행 (즉시 실행)`<br/>- FORCED: `강제 실행 (데드라인 초과 자동 실행)` |
| maintenances.addedYmdt | Body | DateTime | 유지 관리 스케줄 등록 일시 |
| maintenances.executionStartedYmdt | Body | DateTime | 유지 관리 시작 일시 |
| maintenances.executionCompletedYmdt | Body | DateTime | 유지 관리 종료 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "totalCounts": 1,
    "maintenances": [
        {
            "maintenanceId": "maintenanceId-example",
            "dbInstanceId": "dbInstanceId-example",
            "category": "USER",
            "description": "description-example",
            "type": "UPDATE_DB_INSTANCE",
            "payload": {
            },
            "required": false,
            "deadlineYmdt": "2023-12-31T15:00:00+09:00",
            "status": "PENDING",
            "executionType": "SCHEDULED",
            "addedYmdt": "2023-12-31T15:00:00+09:00",
            "executionStartedYmdt": "2023-12-31T15:00:00+09:00",
            "executionCompletedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### DB 인스턴스 유지 관리 즉시 실행하기

```http
POST /v4.0/db-instances/{dbInstanceId}/maintenances/execute-now
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| configId | Body | String | O | 설정 아이디 |
| category | Body | Enum | O | 유지 관리 카테고리<br/>- USER: `사용자 유지 관리 카테고리`<br/>- PROVIDER: `Provider 유지 관리 카테고리`<br/>- AUTO: `자동 유지 관리 카테고리` |
| description | Body | String | X | 유지 관리 설명 |
| type | Body | Enum | O | 유지 관리 타입<br/>- UPDATE_DB_INSTANCE: `DB 인스턴스 수정(사양 변경, 포트 변경, 파라미터 그룹 변경)`<br/>- UPGRADE_ENGINE_VERSION: `엔진 버전 업그레이드`<br/>- APPLY_CHANGE_PARAMETER: `파라미터 그룹의 파라미터 변경`<br/>- UPGRADE_OS: `운영체제 버전 업그레이드`<br/>- PATCH_SECURITY: `보안 업데이트`<br/>- MIGRATION: `하이퍼바이저 점검을 위한 마이그레이션`<br/>- CLEANUP_STORAGE: `스토리지 정리` |
| payload | Body | String | O | 유지 관리 타입에 따른 Payload |

<details><summary>예시</summary>
<p>

```json
{
    "configId": "configId-example",
    "category": "USER",
    "description": "description-example",
    "type": "UPDATE_DB_INSTANCE",
    "payload": "payload-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 유지 관리 예약하기

```http
POST /v4.0/db-instances/{dbInstanceId}/maintenances/schedule
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| configId | Body | String | O | 설정 아이디 |
| category | Body | Enum | O | 유지 관리 카테고리<br/>- USER: `사용자 유지 관리 카테고리`<br/>- PROVIDER: `Provider 유지 관리 카테고리`<br/>- AUTO: `자동 유지 관리 카테고리` |
| description | Body | String | X | 유지 관리 설명 |
| type | Body | Enum | O | 유지 관리 타입<br/>- UPDATE_DB_INSTANCE: `DB 인스턴스 수정(사양 변경, 포트 변경, 파라미터 그룹 변경)`<br/>- UPGRADE_ENGINE_VERSION: `엔진 버전 업그레이드`<br/>- APPLY_CHANGE_PARAMETER: `파라미터 그룹의 파라미터 변경`<br/>- UPGRADE_OS: `운영체제 버전 업그레이드`<br/>- PATCH_SECURITY: `보안 업데이트`<br/>- MIGRATION: `하이퍼바이저 점검을 위한 마이그레이션`<br/>- CLEANUP_STORAGE: `스토리지 정리` |
| payload | Body | String | O | 유지 관리 타입에 따른 Payload |

<details><summary>예시</summary>
<p>

```json
{
    "configId": "configId-example",
    "category": "USER",
    "description": "description-example",
    "type": "UPDATE_DB_INSTANCE",
    "payload": "payload-example"
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 인스턴스 유지 관리 삭제하기

```http
DELETE /v4.0/db-instances/{dbInstanceId}/maintenances/{maintenanceId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| maintenanceId | URL | UUID | O | 유지 관리 아이디 |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 네트워크 정보 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/network-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| availabilityZone | Body | String | DB 인스턴스를 생성할 가용성 영역 |
| subnet | Body | Object | 서브넷 객체 |
| subnet.subnetId | Body | String | 서브넷의 식별자 |
| subnet.subnetName | Body | String | 서브넷을 식별할 수 있는 이름 |
| subnet.subnetCidr | Body | String | 서브넷의 CIDR |
| endPoints | Body | Array | 접속 정보 목록 |
| endPoints.domain | Body | String | 도메인 |
| endPoints.ipAddress | Body | String | IP 주소 |
| endPoints.endPointType | Body | String | 접속 정보 타입 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "availabilityZone": "availabilityZone-example",
    "subnet": {
        "subnetId": "subnetId-example",
        "subnetName": "subnetName-example",
        "subnetCidr": "subnetCidr-example"
    },
    "endPoints": [
        {
            "domain": "domain-example",
            "ipAddress": "ipAddress-example",
            "endPointType": "endPointType-example"
        }
    ]
}
```

</p>
</details>

---

### 네트워크 정보 수정하기

```http
PUT /v4.0/db-instances/{dbInstanceId}/network-info
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| usePublicAccess | Body | Boolean | O | 외부 접속 가능 여부 |

<details><summary>예시</summary>
<p>

```json
{
    "usePublicAccess": false
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 승격하기

```http
POST /v4.0/db-instances/{dbInstanceId}/promote
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 재구축하기

```http
POST /v4.0/db-instances/{dbInstanceId}/rebuild
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 복제하기

```http
POST /v4.0/db-instances/{dbInstanceId}/replicate
```

#### 공통 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbInstanceName | Body | String | O | DB 인스턴스를 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | Body | UUID | X | DB 인스턴스 사양의 식별자 |
| dbPort | Body | Number | X | DB 포트<br/>- 최솟값: 3306, 최댓값: 43306 |
| parameterGroupId | Body | UUID | X | 파라미터 그룹의 식별자 |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |
| useDefaultNotification | Body | Boolean | X | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Body | Boolean | X | 삭제 보호 여부<br/>- 기본값: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query 분석 여부<br/>- 기본값: `true` |
| network | Body | Object | O | 네트워크 정보 객체 |
| network.usePublicAccess | Body | Boolean | X | 외부 접속 가능 여부 |
| network.availabilityZone | Body | Enum | O | DB 인스턴스를 생성할 가용성 영역 |
| storage | Body | Object | X | 스토리지 정보 객체 |
| storage.storageType | Body | Enum | X | 데이터 스토리지 타입 |
| storage.storageSize | Body | Number | X | 데이터 스토리지 크기(GB)<br/>- 최솟값: `20` |
| storage.storageAutoscale | Body | Object | X | 데이터 스토리지 자동 확장 객체 |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | 스토리지 자동 확장 여부<br/>- 기본값: `false` |
| backup | Body | Object | X | 백업 정보 객체 |
| backup.backupPeriod | Body | Number | X | 백업 보관 기간(일)<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Body | Number | X | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backup.replicationRegion | Body | Enum | X | 백업 복제 리전<br/>- KR1: `한국(판교)` |
| backup.useBackupLock | Body | Boolean | X | 테이블 잠금 사용 여부 |
| backup.backupSchedules | Body | Array | X | 백업 스케쥴 목록 |
| backup.backupSchedules.backupWndBgnTime | Body | String | X | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Body | Enum | X | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

#### 스토리지 자동 확장 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | 자동 확장 조건(%)<br/>- 최솟값: `50`<br/>- 최댓값: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | 자동 확장 최대 크기(GB)<br/>- 최댓값: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | 자동 확장 쿨다운 시간(분)<br/>- 최솟값: `10`<br/>- 최댓값: `1440` |

<details><summary>예시</summary>
<p>

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
    "useSlowQueryAnalysis": true,
    "network": {
        "usePublicAccess": false,
        "availabilityZone": "ENUM_VALUE"
    },
    "storage": {
        "storageType": "ENUM_VALUE",
        "storageSize": 20,
        "storageAutoscale": {
            "useStorageAutoscale": false
        }
    },
    "backup": {
        "backupPeriod": 0,
        "backupRetryCount": 0,
        "ftwrlWaitTimeout": 0,
        "replicationRegion": "KR1",
        "useBackupLock": false,
        "backupSchedules": [
            {
                "backupWndBgnTime": "backupWndBgnTime-example",
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    }
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 재시작하기

```http
POST /v4.0/db-instances/{dbInstanceId}/restart
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| useOnlineFailover | Body | Boolean | X | 장애 조치를 이용한 재시작 여부<br/>- 기본값: `false` |
| executeBackup | Body | Boolean | X | 현재 시점 백업 진행 여부<br/>- 기본값: `false` |
| waitReplicationDelay | Body | Boolean | X | 복제 지연 해소 대기<br/>- 기본값: `false` |
| useReadOnly | Body | Boolean | X | 쓰기 부하 차단<br/>- 기본값: `false` |

<details><summary>예시</summary>
<p>

```json
{
    "useOnlineFailover": false,
    "executeBackup": false,
    "waitReplicationDelay": false,
    "useReadOnly": false
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 복원 정보 조회

```http
GET /v4.0/db-instances/{dbInstanceId}/restoration-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| oldestRestorableYmdt | Body | DateTime | 가장 오래된 복원 가능한 시각 |
| latestRestorableYmdt | Body | DateTime | 가장 최신의 복원 가능한 시각 |
| restorableBackups | Body | Array | 복원 가능한 백업 목록 |
| restorableBackups.backup | Body | Object | 백업 정보 객체 |
| restorableBackups.backup.backupId | Body | String | 백업의 식별자 |
| restorableBackups.backup.backupName | Body | String | 백업 이름 |
| restorableBackups.backup.backupStatus | Body | Enum | 백업 상태<br/>- BACKING_UP: `백업 중 (스피너)`<br/>- VERIFYING: `검증 중 (스피너)`<br/>- COMPLETED: `사용 가능 (녹색 아이콘)`<br/>- DELETING: `삭제 중 (스피너)`<br/>- DELETED: `삭제 됨 (회색 아이콘)`<br/>- ERROR: `에러 (적색 아이콘)` |
| restorableBackups.backup.dbInstanceId | Body | String | 원본 DB 인스턴스의 식별자 |
| restorableBackups.backup.dbInstanceName | Body | String | 원본 DB 인스턴스의 이름 |
| restorableBackups.backup.dbVersion | Body | Enum | DB 엔진 유형 |
| restorableBackups.backup.backupType | Body | Enum | 백업 유형<br/>- AUTO<br/>- MANUAL |
| restorableBackups.backup.backupSize | Body | Number | 백업 크기 |
| restorableBackups.backup.useBackupLock | Body | Boolean | 테이블 잠금 사용 여부 |
| restorableBackups.backup.failoverCount | Body | Number | 장애 조치 횟수 |
| restorableBackups.backup.binLogFileName | Body | String | 바이너리 로그 파일 이름 |
| restorableBackups.backup.binLogPosition | Body | Object | 바이너리 로그 파일 위치 |
| restorableBackups.backup.createdYmdt | Body | DateTime | 백업 생성 일시 |
| restorableBackups.backup.updatedYmdt | Body | DateTime | 백업 갱신 일시 |
| restorableBackups.restorableBinLogs | Body | Array | 해당 백업을 이용하여 복원 가능한 바이너리 로그 이름 목록 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "oldestRestorableYmdt": "2023-12-31T15:00:00+09:00",
    "latestRestorableYmdt": "2023-12-31T15:00:00+09:00",
    "restorableBackups": [
        {
            "backup": {
                "backupId": "backupId-example",
                "backupName": "backupName-example",
                "backupStatus": "BACKING_UP",
                "dbInstanceId": "dbInstanceId-example",
                "dbInstanceName": "dbInstanceName-example",
                "dbVersion": "ENUM_VALUE",
                "backupType": "AUTO",
                "backupSize": 1,
                "useBackupLock": false,
                "failoverCount": 1,
                "binLogFileName": "binLogFileName-example",
                "binLogPosition": {
                },
                "createdYmdt": "2023-12-31T15:00:00+09:00",
                "updatedYmdt": "2023-12-31T15:00:00+09:00"
            },
            "restorableBinLogs": []
        }
    ]
}
```

</p>
</details>

---

### 복원될 마지막 쿼리 조회

```http
GET /v4.0/db-instances/{dbInstanceId}/restoration-info/last-query
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| executedYmdt | Body | DateTime | 쿼리 수행 일시 |
| lastQuery | Body | String | 마지막 수행 쿼리 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 복원

```http
POST /v4.0/db-instances/{dbInstanceId}/restore
```

#### 공통 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| dbInstanceName | Body | String | O | DB 인스턴스를 식별할 수 있는 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | Body | UUID | X | DB 인스턴스 사양의 식별자. 미입력 시 원본 인스턴스의 사양이 적용됩니다. |
| dbPort | Body | Number | X | DB 포트 |
| useHighAvailability | Body | Boolean | X | 고가용성 사용 여부<br/>- 기본값: `false` |
| pingInterval | Body | Number | X | 고가용성 사용 시 Ping 간격(초)<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| storage | Body | Object | X | 스토리지 정보 객체. 미입력 시 원본 인스턴스의 스토리지 설정이 적용됩니다. |
| storage.storageType | Body | Enum | X | 스토리지 타입. 미입력 시 원본 인스턴스의 스토리지 타입이 적용됩니다. |
| storage.storageSize | Body | Number | X | 데이터 스토리지 크기(GB). 미입력 시 원본 인스턴스의 스토리지 크기가 적용됩니다.<br/>- 최솟값: `20` |
| storage.storageAutoscale | Body | Object | X | 데이터 스토리지 자동 확장 객체 |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | 스토리지 자동 확장 여부<br/>- 기본값: `false` |
| network | Body | Object | X | 네트워크 정보 객체. 미입력 시 원본 인스턴스의 네트워크 설정이 적용됩니다. |
| network.subnetId | Body | UUID | X | 서브넷의 식별자. 미입력 시 원본 인스턴스 값 사용 |
| network.usePublicAccess | Body | Boolean | X | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Body | Enum | X | DB 인스턴스를 생성할 가용성 영역. 미입력 시 랜덤 선택 |
| backup | Body | Object | X | 백업 정보 객체. 미입력 시 원본 인스턴스의 백업 설정이 적용됩니다. |
| backup.backupPeriod | Body | Number | X | 백업 보관 기간(일). 미입력 시 원본 인스턴스의 백업 보관 기간이 적용됩니다.<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.ftwrlWaitTimeout | Body | Number | X | 쿼리 지연 대기 시간(초)<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backup.backupRetryCount | Body | Number | X | 백업 재시도 횟수<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.replicationRegion | Body | Enum | X | 백업 복제 리전<br/>- KR1: `한국(판교)` |
| backup.useBackupLock | Body | Boolean | X | 테이블 잠금 사용 여부<br/>- 기본값: `true` |
| backup.backupSchedules | Body | Array | X | 백업 스케쥴 목록. 미입력 시 원본 인스턴스의 백업 스케쥴이 적용됩니다. |
| backup.backupSchedules.backupWndBgnTime | Body | String | X | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Body | Enum | X | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |
| restore | Body | Object | O | 복원 정보 객체 |
| restore.restoreType | Body | Enum | O | 복원 타입<br/>- TIMESTAMP: `복원 가능한 시간 이내의 시간을 이용한 시점 복원`<br/>- BINLOG: `복원 가능한 바이너리 로그 위치를 이용한 시점 복원`<br/>- BACKUP: `기존에 생성한 백업을 이용한 스냅숏 복원` |
| restore.binLog.binLogFileName | Body | String | X | 복원에 사용할 바이너리 로그 이름 |
| restore.binLog.binLogPosition | Body | Object | X | 복원에 사용할 바이너리 로그 위치 |
| useDefaultNotification | Body | Boolean | X | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query 분석 여부<br/>- 기본값: `true` |
| parameterGroupId | Body | UUID | X | 파라미터 그룹의 식별자. 미입력 시 원본 인스턴스의 파라미터 그룹이 적용됩니다. |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록. 미입력 시 원본 인스턴스의 보안 그룹이 적용됩니다. |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |
| useDeletionProtection | Body | Boolean | X | 삭제 보호 여부<br/>- 기본값: `false` |

#### 고가용성 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | DB 인스턴스를 식별할 수 있는 예비 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |

#### 스토리지 자동 확장 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | 자동 확장 조건(%)<br/>- 최솟값: `50`<br/>- 최댓값: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | 자동 확장 최대 크기(GB)<br/>- 최댓값: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | 자동 확장 쿨다운 시간(분)<br/>- 최솟값: `10`<br/>- 최댓값: `1440` |

#### Timestamp를 이용한 시점 복원 시 요청(restoreType이 `TIMESTAMP`인 경우)

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| restore.restoreYmdt | Body | DateTime | X | DB 인스턴스 복원 일시(YYYY-MM-DDThh:mm:ss.SSSTZD) |

복원 정보 조회로 조회한 가장 최신의 복원 가능한 시간 이전에 대해서만 복원이 가능합니다.

#### 바이너리 로그를 이용한 시점 복원 시 요청(restoreType이 `BINLOG`인 경우)

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| restore.backupId | Body | UUID | X | 복원에 사용할 백업의 식별자 |
| restore.binLog | Body | Object | X | 복원에 사용할 바이너리 로그 정보 객체 |

바이너리 로그를 이용한 시점 복원 시 기준 백업의 바이너리 로그 파일 및 위치를 기준으로 그 이후에 기록된 로그에 대해 복원이 가능합니다.

#### 백업을 이용한 복원 시 요청(restoreType이 `BACKUP`인 경우)

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| restore.backupId | Body | UUID | X | 복원에 사용할 백업의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "dbInstanceName": "dbInstanceName",
    "description": "description-example",
    "dbFlavorId": "550e8400-e29b-41d4-a716-446655440000",
    "dbPort": 1,
    "useHighAvailability": false,
    "pingInterval": 3,
    "storage": {
        "storageType": "ENUM_VALUE",
        "storageSize": 20,
        "storageAutoscale": {
            "useStorageAutoscale": false
        }
    },
    "network": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "usePublicAccess": false,
        "availabilityZone": "ENUM_VALUE"
    },
    "backup": {
        "backupPeriod": 0,
        "ftwrlWaitTimeout": 1800,
        "backupRetryCount": 0,
        "replicationRegion": "KR1",
        "useBackupLock": true,
        "backupSchedules": [
            {
                "backupWndBgnTime": "backupWndBgnTime-example",
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
    "useSlowQueryAnalysis": true,
    "parameterGroupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbSecurityGroupIds": [],
    "userGroupIds": [],
    "useDeletionProtection": false
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 시작하기

```http
POST /v4.0/db-instances/{dbInstanceId}/start
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### DB 인스턴스 정지하기

```http
POST /v4.0/db-instances/{dbInstanceId}/stop
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 스토리지 정보 보기

```http
GET /v4.0/db-instances/{dbInstanceId}/storage-info
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| storageType | Body | String | 데이터 스토리지 타입 |
| storageSize | Body | Number | 데이터 스토리지 크기(GB) |
| storageStatus | Body | Enum | 데이터 스토리지의 현재 상태<br/>- DELETED: `삭제됨`<br/>- PENDING_DELETION: `삭제 유예됨`<br/>- DELETION_RESERVED: `삭제 예약됨 (스냅샷 정리 대기)`<br/>- DETACHED: `해제됨`<br/>- ATTACHED: `할당됨` |
| storageAutoscale | Body | Object | 데이터 스토리지 자동 확장 객체 |
| storageAutoscale.useStorageAutoscale | Body | Boolean | 스토리지 자동 확장 여부 |
| storageAutoscale.threshold | Body | Number | 자동 확장 조건(%) |
| storageAutoscale.maxStorageSize | Body | Number | 자동 확장 최대 크기(GB) |
| storageAutoscale.cooldownTime | Body | Number | 자동 확장 쿨다운 시간(분) |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "storageType": "storageType-example",
    "storageSize": 1,
    "storageStatus": "DELETED",
    "storageAutoscale": {
        "useStorageAutoscale": false,
        "threshold": 1,
        "maxStorageSize": 1,
        "cooldownTime": 1
    }
}
```

</p>
</details>

---

### 스토리지 정보 수정하기

```http
PUT /v4.0/db-instances/{dbInstanceId}/storage-info
```

#### 공통 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceId | URL | UUID | O | DB 인스턴스의 식별자 |
| storageSize | Body | Number | O | 데이터 스토리지 크기(GB)<br/>- 최댓값: `2048` |
| storageAutoscale | Body | Object | X | 데이터 스토리지 자동 확장 객체 |
| storageAutoscale.useStorageAutoscale | Body | Boolean | X | 스토리지 자동 확장 여부 |

#### 스토리지 자동 확장 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| storageAutoscale.threshold | Body | Number | O | 자동 확장 조건(%)<br/>- 최솟값: `50`<br/>- 최댓값: `95` |
| storageAutoscale.maxStorageSize | Body | Number | O | 자동 확장 최대 크기(GB)<br/>- 최댓값: `4096` |
| storageAutoscale.cooldownTime | Body | Number | O | 자동 확장 쿨다운 시간(분)<br/>- 최솟값: `10`<br/>- 최댓값: `1440` |

<details><summary>예시</summary>
<p>

```json
{
    "storageSize": 1,
    "storageAutoscale": {
        "useStorageAutoscale": false
    }
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

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

```http
GET /v4.0/backups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 전체 백업 목록 수 |
| backups | Body | Array | 백업 목록 |
| backups.backupId | Body | String | 백업의 식별자 |
| backups.backupName | Body | String | 백업을 식별할 수 있는 이름 |
| backups.backupStatus | Body | Enum | 백업의 현재 상태<br/>- BACKING_UP: `백업 중 (스피너)`<br/>- VERIFYING: `검증 중 (스피너)`<br/>- COMPLETED: `사용 가능 (녹색 아이콘)`<br/>- DELETING: `삭제 중 (스피너)`<br/>- DELETED: `삭제 됨 (회색 아이콘)`<br/>- ERROR: `에러 (적색 아이콘)` |
| backups.dbInstanceId | Body | String | 원본 DB 인스턴스의 식별자 |
| backups.dbVersion | Body | Enum | DB 엔진 유형 |
| backups.utilVersion | Body | String | 유틸리티 버전 |
| backups.backupType | Body | Enum | 백업 유형<br/>- AUTO<br/>- MANUAL |
| backups.backupSize | Body | Number | 백업의 크기(Byte) |
| backups.createdYmdt | Body | DateTime | 생성 일시 |
| backups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

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
            "backupId": "backupId-example",
            "backupName": "backupName-example",
            "backupStatus": "BACKING_UP",
            "dbInstanceId": "dbInstanceId-example",
            "dbVersion": "ENUM_VALUE",
            "utilVersion": "utilVersion-example",
            "backupType": "AUTO",
            "backupSize": 1,
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 백업 생성하기

```http
POST /v4.0/backups
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupName | Body | String | O | 백업을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| baseBackupId | Body | UUID | X | 원본 백업의 식별자 |
| dbInstanceId | Body | UUID | X | DB 인스턴스의 식별자 |
| backupMethodType | Body | Enum | O | 백업 방식 타입<br/>- FULL: `전체 백업`<br/>- INCREMENTAL: `증분 백업`<br/>- SNAPSHOT: `스냅숏 백업` |

<details><summary>예시</summary>
<p>

```json
{
    "backupName": "backupName",
    "baseBackupId": "550e8400-e29b-41d4-a716-446655440000",
    "dbInstanceId": "550e8400-e29b-41d4-a716-446655440000",
    "backupMethodType": "FULL"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 백업 삭제하기

```http
DELETE /v4.0/backups/{backupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 백업 단건 조회

```http
GET /v4.0/backups/{backupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| backup | Body | Object | 백업 상세 정보 |
| backup.backupId | Body | String | 백업의 식별자 |
| backup.regionCode | Body | Enum | 리전 코드<br/>- KR1: `한국(판교)` |
| backup.backupName | Body | String | 백업을 식별할 수 있는 이름 |
| backup.backupStatus | Body | Enum | 백업의 현재 상태<br/>- BACKING_UP: `백업 중 (스피너)`<br/>- VERIFYING: `검증 중 (스피너)`<br/>- COMPLETED: `사용 가능 (녹색 아이콘)`<br/>- DELETING: `삭제 중 (스피너)`<br/>- DELETED: `삭제 됨 (회색 아이콘)`<br/>- ERROR: `에러 (적색 아이콘)` |
| backup.dbInstanceId | Body | String | 원본 DB 인스턴스의 식별자 |
| backup.dbInstanceName | Body | String | 원본 DB 인스턴스의 이름 |
| backup.dbVersion | Body | Enum | DB 엔진 버전 |
| backup.utilVersion | Body | String | 유틸리티 버전 |
| backup.backupType | Body | Enum | 백업 유형 (AUTO, MANUAL)<br/>- AUTO<br/>- MANUAL |
| backup.backupMethodType | Body | Enum | 백업 방식 (FULL, SNAPSHOT, INCREMENTAL)<br/>- FULL<br/>- INCREMENTAL<br/>- SNAPSHOT |
| backup.backupFileType | Body | Enum | 백업 파일 유형<br/>- XBSTREAM<br/>- TAR_ZSTD<br/>- TAR_LZ4<br/>- TAR_GZIP<br/>- SNAPSHOT |
| backup.backupSize | Body | Number | 백업의 크기(Byte) |
| backup.isReplicable | Body | Boolean | 복제 가능 여부 |
| backup.binLogFileName | Body | String | 바이너리 로그 파일명 |
| backup.binLogPosition | Body | Object | 바이너리 로그 위치 |
| backup.createdYmdt | Body | DateTime | 생성 일시 |
| backup.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "backup": {
        "backupId": "backupId-example",
        "regionCode": "KR1",
        "backupName": "backupName-example",
        "backupStatus": "BACKING_UP",
        "dbInstanceId": "dbInstanceId-example",
        "dbInstanceName": "dbInstanceName-example",
        "dbVersion": "ENUM_VALUE",
        "utilVersion": "utilVersion-example",
        "backupType": "AUTO",
        "backupMethodType": "FULL",
        "backupFileType": "XBSTREAM",
        "backupSize": 1,
        "isReplicable": false,
        "binLogFileName": "binLogFileName-example",
        "binLogPosition": {
        },
        "createdYmdt": "2023-12-31T15:00:00+09:00",
        "updatedYmdt": "2023-12-31T15:00:00+09:00"
    }
}
```

</p>
</details>

---

### 백업 내보내기

```http
POST /v4.0/backups/{backupId}/export
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |
| tenantId | Body | String | O | 백업이 저장될 오브젝트 스토리지의 테넌트 ID<br/>- 최소 길이: `32`<br/>- 최대 길이: `32` |
| username | Body | String | O | NHN Cloud 계정 혹은 IAM 회원 ID |
| password | Body | String | O | 백업이 저장될 오브젝트 스토리지의 API 비밀번호 |
| targetContainer | Body | String | O | 백업이 저장될 오브젝트 스토리지의 컨테이너 |
| objectPath | Body | String | O | 컨테이너에 저장될 백업의 경로 |

<details><summary>예시</summary>
<p>

```json
{
    "tenantId": "tenantId-example",
    "username": "username-example",
    "password": "password-example",
    "targetContainer": "targetContainer-example",
    "objectPath": "objectPath-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 백업 복원하기

```http
POST /v4.0/backups/{backupId}/restore
```

#### 공통 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| backupId | URL | UUID | O |  |
| dbInstanceName | Body | String | O | DB 인스턴스를 식별할 수 있는 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | DB 인스턴스에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbFlavorId | Body | UUID | X | DB 인스턴스 사양의 식별자. 미지정 시 원본 인스턴스 값 사용 |
| dbPort | Body | Number | X | DB 포트. 미지정 시 원본 인스턴스 값 사용<br/>- 최솟값: 3306, 최댓값: 43306 |
| parameterGroupId | Body | UUID | X | 파라미터 그룹의 식별자. 미지정 시 원본 인스턴스 값 사용 |
| dbSecurityGroupIds | Body | Array | X | DB 보안 그룹의 식별자 목록 |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |
| useHighAvailability | Body | Boolean | X | 고가용성 사용 여부<br/>- 기본값: `false` |
| pingInterval | Body | Number | X | 고가용성 사용 시 Ping 간격(초)<br/>- 기본값: `3`<br/>- 최솟값: `1`<br/>- 최댓값: `600` |
| useDefaultNotification | Body | Boolean | X | 기본 알림 사용 여부<br/>- 기본값: `false` |
| useDeletionProtection | Body | Boolean | X | 삭제 보호 여부<br/>- 기본값: `false` |
| useSlowQueryAnalysis | Body | Boolean | X | Slow query 분석 여부<br/>- 기본값: `true` |
| network | Body | Object | X | 네트워크 정보 객체. 미지정 시 원본 인스턴스 값 사용 |
| network.subnetId | Body | UUID | X | 서브넷의 식별자. 미지정 시 원본 인스턴스 값 사용 |
| network.usePublicAccess | Body | Boolean | X | 외부 접속 가능 여부<br/>- 기본값: `false` |
| network.availabilityZone | Body | Enum | X | DB 인스턴스를 생성할 가용성 영역. 미지정 시 랜덤 선택 |
| storage | Body | Object | X | 스토리지 정보 객체. 미지정 시 원본 인스턴스 값 사용 |
| storage.storageType | Body | Enum | X | 스토리지 타입. 미지정 시 원본 인스턴스 값 사용 |
| storage.storageSize | Body | Number | X | 데이터 스토리지 크기(GB). 미지정 시 원본 인스턴스 값 사용<br/>- 최솟값: `20` |
| storage.storageAutoscale | Body | Object | X | 데이터 스토리지 자동 확장 객체. 미지정 시 원본 인스턴스 값 사용 |
| storage.storageAutoscale.useStorageAutoscale | Body | Boolean | X | 스토리지 자동 확장 여부<br/>- 기본값: `false` |
| backup | Body | Object | X | 백업 정보 객체. 미지정 시 원본 인스턴스 백업 설정 사용 |
| backup.backupPeriod | Body | Number | X | 백업 보관 기간(일). 미지정 시 원본 인스턴스 값 사용<br/>- 최솟값: `0`<br/>- 최댓값: `730` |
| backup.backupRetryCount | Body | Number | X | 백업 재시도 횟수. 미지정 시 원본 인스턴스 값 사용<br/>- 최솟값: `0`<br/>- 최댓값: `10` |
| backup.ftwrlWaitTimeout | Body | Number | X | 쿼리 지연 대기 시간(초). 미지정 시 원본 인스턴스 값 사용<br/>- 최솟값: `0`<br/>- 최댓값: `21600` |
| backup.replicationRegion | Body | Enum | X | 백업 복제 리전<br/>- KR1: `한국(판교)` |
| backup.useBackupLock | Body | Boolean | X | 테이블 잠금 사용 여부. 미지정 시 원본 인스턴스 값 사용 |
| backup.backupSchedules | Body | Array | X | 백업 스케쥴 목록. 미지정 시 원본 인스턴스 값 사용 |
| backup.backupSchedules.backupWndBgnTime | Body | String | O | 백업 시작 시각 |
| backup.backupSchedules.backupWndDuration | Body | Enum | O | 백업 Duration<br/>- HALF_AN_HOUR: `30분`<br/>- ONE_HOUR: `1시간`<br/>- ONE_HOUR_AND_HALF: `1시간 30분`<br/>- TWO_HOURS: `2시간`<br/>- TWO_HOURS_AND_HALF: `2시간 30분`<br/>- THREE_HOURS: `3시간` |

#### 고가용성 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbInstanceCandidateName | Body | String | O | DB 인스턴스를 식별할 수 있는 예비 마스터 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |

#### 스토리지 자동 확장 사용 시

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| storage.storageAutoscale.threshold | Body | Number | O | 자동 확장 조건(%)<br/>- 최솟값: `50`<br/>- 최댓값: `95` |
| storage.storageAutoscale.maxStorageSize | Body | Number | O | 자동 확장 최대 크기(GB)<br/>- 최댓값: `4096` |
| storage.storageAutoscale.cooldownTime | Body | Number | O | 자동 확장 쿨다운 시간(분)<br/>- 최솟값: `10`<br/>- 최댓값: `1440` |

<details><summary>예시</summary>
<p>

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
    "useSlowQueryAnalysis": true,
    "network": {
        "subnetId": "550e8400-e29b-41d4-a716-446655440000",
        "usePublicAccess": false,
        "availabilityZone": "ENUM_VALUE"
    },
    "storage": {
        "storageType": "ENUM_VALUE",
        "storageSize": 20,
        "storageAutoscale": {
            "useStorageAutoscale": false
        }
    },
    "backup": {
        "backupPeriod": 0,
        "backupRetryCount": 0,
        "ftwrlWaitTimeout": 0,
        "replicationRegion": "KR1",
        "useBackupLock": false,
        "backupSchedules": [
            {
                "backupWndBgnTime": "backupWndBgnTime-example",
                "backupWndDuration": "HALF_AN_HOUR"
            }
        ]
    }
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | UUID | 요청한 작업의 식별자 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

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

```http
GET /v4.0/db-security-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 전체 DB 보안 그룹 목록 수 |
| dbSecurityGroups | Body | Array | DB 보안 그룹 목록 |
| dbSecurityGroups.dbSecurityGroupId | Body | String | DB 보안 그룹의 식별자 |
| dbSecurityGroups.dbSecurityGroupName | Body | String | DB 보안 그룹을 식별할 수 있는 이름 |
| dbSecurityGroups.description | Body | String | DB 보안 그룹에 대한 추가 정보 |
| dbSecurityGroups.progressStatus | Body | Enum | DB 보안 그룹의 현재 진행 상태<br/>- NONE: `없음`<br/>- CREATING_RULE: `규칙 생성중`<br/>- UPDATING_RULE: `규칙 수정중`<br/>- DELETING_RULE: `규칙 삭제중`<br/>- APPLYING_DEFAULT_RULE: `기본 규칙 적용중` |
| dbSecurityGroups.createdYmdt | Body | DateTime | 생성 일시 |
| dbSecurityGroups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "totalCounts": 1,
    "dbSecurityGroups": [
        {
            "dbSecurityGroupId": "dbSecurityGroupId-example",
            "dbSecurityGroupName": "dbSecurityGroupName-example",
            "description": "description-example",
            "progressStatus": "NONE",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### DB 보안 그룹 생성하기

```http
POST /v4.0/db-security-groups
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupName | Body | String | O | DB 보안 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | DB 보안 그룹에 대한 추가 정보<br/>- 최대 길이: `100` |
| rules | Body | Array | O | DB 보안 그룹 규칙 목록 |
| rules.direction | Body | Enum | O | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| rules.etherType | Body | Enum | O | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| rules.port | Body | Object | O | 포트 객체 |
| rules.port.portType | Body | Enum | O | 포트 타입<br/>- ALL: `포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| rules.port.minPort | Body | Number | X | 최소 포트 범위<br/>- 최솟값: `3306` |
| rules.port.maxPort | Body | Number | X | 최대 포트 범위<br/>- 최댓값: `65535` |
| rules.cidr | Body | String | O | CIDR |
| rules.description | Body | String | X | 보안 그룹 규칙에 대한 추가 정보 |

<details><summary>예시</summary>
<p>

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
            "cidr": "cidr-example",
            "description": "description-example"
        }
    ]
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbSecurityGroupId | Body | String | DB 보안 그룹의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroupId": "dbSecurityGroupId-example"
}
```

</p>
</details>

---

### DB 보안 그룹 삭제하기

```http
DELETE /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 보안 그룹 상세 보기

```http
GET /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| dbSecurityGroupId | Body | String | DB 보안 그룹의 식별자 |
| dbSecurityGroupName | Body | String | DB 보안 그룹을 식별할 수 있는 이름 |
| description | Body | String | DB 보안 그룹에 대한 추가 정보 |
| progressStatus | Body | Enum | DB 보안 그룹의 현재 진행 상태<br/>- NONE: `없음`<br/>- CREATING_RULE: `규칙 생성중`<br/>- UPDATING_RULE: `규칙 수정중`<br/>- DELETING_RULE: `규칙 삭제중`<br/>- APPLYING_DEFAULT_RULE: `기본 규칙 적용중` |
| rules | Body | Array | DB 보안 그룹 규칙 목록 |
| rules.ruleId | Body | String | DB 보안 그룹 규칙의 식별자 |
| rules.description | Body | String | DB 보안 그룹 규칙에 대한 추가 정보 |
| rules.direction | Body | Enum | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| rules.etherType | Body | Enum | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| rules.port | Body | Object | 포트 객체 |
| rules.port.portType | Body | Enum | 포트 타입<br/>- ALL: `포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| rules.port.minPort | Body | Number | 최소 포트 범위 |
| rules.port.maxPort | Body | Number | 최대 포트 범위 |
| rules.cidr | Body | String | CIDR |
| rules.createdYmdt | Body | DateTime | 생성 일시 |
| rules.updatedYmdt | Body | DateTime | 수정 일시 |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "dbSecurityGroupId": "dbSecurityGroupId-example",
    "dbSecurityGroupName": "dbSecurityGroupName-example",
    "description": "description-example",
    "progressStatus": "NONE",
    "rules": [
        {
            "ruleId": "ruleId-example",
            "description": "description-example",
            "direction": "INGRESS",
            "etherType": "IPV4",
            "port": {
                "portType": "ALL",
                "minPort": 1,
                "maxPort": 1
            },
            "cidr": "cidr-example",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</p>
</details>

---

### DB 보안 그룹 수정하기

```http
PUT /v4.0/db-security-groups/{dbSecurityGroupId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| dbSecurityGroupName | Body | String | X | DB 보안 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | DB 보안 그룹에 대한 추가 정보<br/>- 최대 길이: `100` |

<details><summary>예시</summary>
<p>

```json
{
    "dbSecurityGroupName": "dbSecurityGroupName",
    "description": "description-example"
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### DB 보안 그룹 규칙 삭제하기

```http
DELETE /v4.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| ruleIds | Query | String | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | String | 작업의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "jobId-example"
}
```

</p>
</details>

---

### DB 보안 그룹 규칙 생성하기

```http
POST /v4.0/db-security-groups/{dbSecurityGroupId}/rules
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| direction | Body | Enum | O | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| etherType | Body | Enum | O | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| port | Body | Object | O | 포트 객체 |
| port.portType | Body | Enum | O | 포트 타입<br/>- ALL: `포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| port.minPort | Body | Number | X | 최소 포트 범위<br/>- 최솟값: `3306` |
| port.maxPort | Body | Number | X | 최대 포트 범위<br/>- 최댓값: `65535` |
| cidr | Body | String | O | CIDR |
| description | Body | String | X | DB 보안 그룹 규칙에 대한 추가 정보<br/>- 최대 길이: `200` |

<details><summary>예시</summary>
<p>

```json
{
    "direction": "INGRESS",
    "etherType": "IPV4",
    "port": {
        "portType": "ALL",
        "minPort": 3306,
        "maxPort": 1
    },
    "cidr": "cidr-example",
    "description": "description-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | String | 작업의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "jobId-example"
}
```

</p>
</details>

---

### DB 보안 그룹 규칙 수정하기

```http
PUT /v4.0/db-security-groups/{dbSecurityGroupId}/rules/{ruleId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| dbSecurityGroupId | URL | UUID | O |  |
| ruleId | URL | UUID | O |  |
| direction | Body | Enum | O | 통신 방향<br/>- INGRESS: `수신`<br/>- EGRESS: `송신` |
| etherType | Body | Enum | O | Ether 타입<br/>- IPV4: `IPv4 형식`<br/>- IPV6: `IPv6 형식` |
| port | Body | Object | O | 포트 객체 |
| port.portType | Body | Enum | O | 포트 타입<br/>- ALL: `포트 범위 전체 (사용자 콘솔에서는 사용하지 않음)`<br/>- PORT: `특정 포트`<br/>- DB_PORT: `DB 수신 포트`<br/>- PORT_RANGE: `포트 범위` |
| port.minPort | Body | Number | X | 최소 포트 범위<br/>- 최솟값: `3306` |
| port.maxPort | Body | Number | X | 최대 포트 범위<br/>- 최댓값: `65535` |
| cidr | Body | String | O | CIDR |
| description | Body | String | X | DB 보안 그룹 규칙에 대한 추가 정보<br/>- 최대 길이: `200` |

<details><summary>예시</summary>
<p>

```json
{
    "direction": "INGRESS",
    "etherType": "IPV4",
    "port": {
        "portType": "ALL",
        "minPort": 3306,
        "maxPort": 1
    },
    "cidr": "cidr-example",
    "description": "description-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| jobId | Body | String | 작업의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "jobId": "jobId-example"
}
```

</p>
</details>

---

## 파라미터 그룹

### 파라미터 그룹 목록 보기

```http
GET /v4.0/parameter-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 전체 파라미터 그룹 수 |
| parameterGroups | Body | Array | 파라미터 그룹 목록 |
| parameterGroups.parameterGroupId | Body | String | 파라미터 그룹의 식별자 |
| parameterGroups.parameterGroupName | Body | String | 파라미터 그룹을 식별할 수 있는 이름 |
| parameterGroups.description | Body | String | 파라미터 그룹에 대한 추가 정보 |
| parameterGroups.dbVersion | Body | Enum | DB 엔진 유형 |
| parameterGroups.parameterGroupType | Body | Enum | 파라미터 그룹 유형<br/>- USER<br/>- ADMIN<br/>- DEFAULT<br/>- CLUSTER_USER |
| parameterGroups.parameterGroupStatus | Body | Enum | 파라미터 그룹의 현재 상태<br/>- STABLE: `적용 완료`<br/>- NEED_TO_APPLY: `적용 필요`<br/>- DELETED: `삭제됨` |
| parameterGroups.createdYmdt | Body | DateTime | 생성 일시 |
| parameterGroups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "totalCounts": 1,
    "parameterGroups": [
        {
            "parameterGroupId": "parameterGroupId-example",
            "parameterGroupName": "parameterGroupName-example",
            "description": "description-example",
            "dbVersion": "ENUM_VALUE",
            "parameterGroupType": "USER",
            "parameterGroupStatus": "STABLE",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 파라미터 그룹 생성하기

```http
POST /v4.0/parameter-groups
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupName | Body | String | O | 파라미터 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | 파라미터 그룹에 대한 추가 정보<br/>- 최대 길이: `100` |
| dbVersion | Body | Enum | O | DB 엔진 유형 |

<details><summary>예시</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example",
    "dbVersion": "ENUM_VALUE"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| parameterGroupId | Body | String | 파라미터 그룹의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "parameterGroupId-example"
}
```

</p>
</details>

---

### 파라미터 그룹 삭제하기

```http
DELETE /v4.0/parameter-groups/{parameterGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 파라미터 그룹 상세 보기

```http
GET /v4.0/parameter-groups/{parameterGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| parameterGroupId | Body | String | 파라미터 그룹의 식별자 |
| parameterGroupName | Body | String | 파라미터 그룹을 식별할 수 있는 이름 |
| description | Body | String | 파라미터 그룹에 대한 추가 정보 |
| dbVersion | Body | Enum | DB 엔진 유형 |
| parameterGroupStatus | Body | Enum | 파라미터 그룹의 현재 상태<br/>- STABLE: `적용 완료`<br/>- NEED_TO_APPLY: `적용 필요`<br/>- DELETED: `삭제됨` |
| parameters | Body | Array | 파라미터 목록 |
| parameters.parameterId | Body | String | 파라미터의 식별자 |
| parameters.parameterFileGroup | Body | Enum | 파라미터 파일 그룹 타입<br/>- CLIENT<br/>- MYSQL<br/>- MYSQLD |
| parameters.parameterName | Body | String | 파라미터 이름 |
| parameters.fileParameterName | Body | String | 파라미터 파일 이름 |
| parameters.value | Body | String | 현재 설정된 값 |
| parameters.defaultValue | Body | String | 기본값 |
| parameters.allowedValue | Body | String | 허용된 값 |
| parameters.updateType | Body | Enum | 수정 타입<br/>- VARIABLE<br/>- CONSTANT<br/>- INIT_VARIABLE |
| parameters.applyType | Body | Enum | 적용 타입<br/>- BOTH<br/>- SESSION<br/>- FILE |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "parameterGroupId-example",
    "parameterGroupName": "parameterGroupName-example",
    "description": "description-example",
    "dbVersion": "ENUM_VALUE",
    "parameterGroupStatus": "STABLE",
    "parameters": [
        {
            "parameterId": "parameterId-example",
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

</p>
</details>

---

### 파라미터 그룹 수정하기

```http
PUT /v4.0/parameter-groups/{parameterGroupId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |
| parameterGroupName | Body | String | X | 파라미터 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | 파라미터 그룹에 대한 추가 정보<br/>- 최대 길이: `100` |

<details><summary>예시</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example"
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 파라미터 그룹 복사하기

```http
POST /v4.0/parameter-groups/{parameterGroupId}/copy
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |
| parameterGroupName | Body | String | O | 파라미터 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| description | Body | String | X | 파라미터 그룹에 대한 추가 정보<br/>- 최대 길이: `100` |

<details><summary>예시</summary>
<p>

```json
{
    "parameterGroupName": "parameterGroupName",
    "description": "description-example"
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| parameterGroupId | Body | String | 파라미터 그룹의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "parameterGroupId": "parameterGroupId-example"
}
```

</p>
</details>

---

### 파라미터 수정하기

```http
PUT /v4.0/parameter-groups/{parameterGroupId}/parameters
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |
| modifiedParameters | Body | Array | O | 변경할 파라미터 목록 |
| modifiedParameters.parameterId | Body | UUID | O | 파라미터의 식별자 |
| modifiedParameters.value | Body | String | O | 변경할 파라미터 값 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 파라미터 그룹 재설정하기

```http
PUT /v4.0/parameter-groups/{parameterGroupId}/reset
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| parameterGroupId | URL | UUID | O |  |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## 사용자 그룹

### 사용자 그룹 목록 보기

```http
GET /v4.0/user-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 전체 사용자 그룹 목록 수 |
| userGroups | Body | Array | 사용자 그룹 목록 |
| userGroups.userGroupId | Body | String | 사용자 그룹의 식별자 |
| userGroups.userGroupName | Body | String | 사용자 그룹을 식별할 수 있는 이름 |
| userGroups.createdYmdt | Body | DateTime | 생성 일시 |
| userGroups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "totalCounts": 1,
    "userGroups": [
        {
            "userGroupId": "userGroupId-example",
            "userGroupName": "userGroupName-example",
            "createdYmdt": "2023-12-31T15:00:00+09:00",
            "updatedYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 사용자 그룹 생성하기

```http
POST /v4.0/user-groups
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupName | Body | String | O | 사용자 그룹을 식별할 수 있는 이름 |
| memberIds | Body | Array | O | 프로젝트 멤버의 식별자 목록 |
| selectAll | Body | Boolean | X | 프로젝트 멤버 전체 포함 여부<br/>- 기본값: `false` |

<details><summary>예시</summary>
<p>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAll": false
}
```

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| userGroupId | Body | String | 사용자 그룹의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "userGroupId": "userGroupId-example"
}
```

</p>
</details>

---

### 사용자 그룹 삭제하기

```http
DELETE /v4.0/user-groups/{userGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O |  |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 사용자 그룹 상세 보기

```http
GET /v4.0/user-groups/{userGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| userGroupId | Body | String | 사용자 그룹의 식별자 |
| userGroupName | Body | String | 사용자 그룹을 식별할 수 있는 이름 |
| userGroupTypeCode | Body | Enum | 사용자 그룹 종류<br/>- ENTIRE<br/>- INDIVIDUAL_MEMBER |
| members | Body | Array | 프로젝트 멤버 목록 |
| members.memberId | Body | String | 프로젝트 멤버의 식별자 |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "userGroupId": "userGroupId-example",
    "userGroupName": "userGroupName-example",
    "userGroupTypeCode": "ENTIRE",
    "members": [
        {
            "memberId": "memberId-example"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</p>
</details>

---

### 사용자 그룹 수정하기

```http
PUT /v4.0/user-groups/{userGroupId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| userGroupId | URL | UUID | O |  |
| userGroupName | Body | String | O | 사용자 그룹을 식별할 수 있는 이름 |
| memberIds | Body | Array | X | 프로젝트 멤버의 식별자 목록 |
| selectAll | Body | Boolean | X | 프로젝트 멤버 전체 포함 여부<br/>- 기본값: `false` |

<details><summary>예시</summary>
<p>

```json
{
    "userGroupName": "userGroupName-example",
    "memberIds": [],
    "selectAll": false
}
```

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## 알림 그룹

### 알림 그룹 목록 보기

```http
GET /v4.0/notification-groups
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| notificationGroups | Body | Array | 알림 그룹 목록 |
| notificationGroups.notificationGroupId | Body | String | 알림 그룹의 식별자 |
| notificationGroups.notificationGroupName | Body | String | 알림 그룹을 식별할 수 있는 이름 |
| notificationGroups.notifyEmail | Body | Boolean | 이메일 알림 여부 |
| notificationGroups.notifySms | Body | Boolean | SMS 알림 여부 |
| notificationGroups.isEnabled | Body | Boolean | 활성화 여부 |
| notificationGroups.createdYmdt | Body | DateTime | 생성 일시 |
| notificationGroups.updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroups": [
        {
            "notificationGroupId": "notificationGroupId-example",
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

</p>
</details>

---

### 알림 그룹 생성하기

```http
POST /v4.0/notification-groups
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupName | Body | String | O | 알림 그룹을 식별할 수 있는 이름<br/>- 최소 길이: `1`<br/>- 최대 길이: `100` |
| notifyEmail | Body | Boolean | X | 이메일 알림 여부<br/>- 기본값: `true` |
| notifySms | Body | Boolean | X | SMS 알림 여부<br/>- 기본값: `true` |
| isEnabled | Body | Boolean | X | 활성화 여부<br/>- 기본값: `true` |
| dbInstanceIds | Body | Array | O | 감시 대상 DB 인스턴스의 식별자 목록 |
| userGroupIds | Body | Array | O | 사용자 그룹의 식별자 목록 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| notificationGroupId | Body | String | 알림 그룹의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroupId": "notificationGroupId-example"
}
```

</p>
</details>

---

### 알림 그룹 삭제하기

```http
DELETE /v4.0/notification-groups/{notificationGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O |  |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 알림 그룹 상세 보기

```http
GET /v4.0/notification-groups/{notificationGroupId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O |  |

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| notificationGroupId | Body | String | 알림 그룹의 식별자 |
| notificationGroupName | Body | String | 알림 그룹을 식별할 수 있는 이름 |
| notifyEmail | Body | Boolean | 이메일 알림 여부 |
| notifySms | Body | Boolean | SMS 알림 여부 |
| isEnabled | Body | Boolean | 활성화 여부 |
| dbInstances | Body | Array | 감시 대상 DB 인스턴스 목록 |
| dbInstances.dbInstanceId | Body | String | DB 인스턴스의 식별자 |
| dbInstances.dbInstanceName | Body | String | DB 인스턴스를 식별할 수 있는 이름 |
| userGroups | Body | Array | 사용자 그룹 목록 |
| userGroups.userGroupId | Body | String | 사용자 그룹의 식별자 |
| userGroups.userGroupName | Body | String | 사용자 그룹을 식별할 수 있는 이름 |
| createdYmdt | Body | DateTime | 생성 일시 |
| updatedYmdt | Body | DateTime | 수정 일시 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "notificationGroupId": "notificationGroupId-example",
    "notificationGroupName": "notificationGroupName-example",
    "notifyEmail": false,
    "notifySms": false,
    "isEnabled": false,
    "dbInstances": [
        {
            "dbInstanceId": "dbInstanceId-example",
            "dbInstanceName": "dbInstanceName-example"
        }
    ],
    "userGroups": [
        {
            "userGroupId": "userGroupId-example",
            "userGroupName": "userGroupName-example"
        }
    ],
    "createdYmdt": "2023-12-31T15:00:00+09:00",
    "updatedYmdt": "2023-12-31T15:00:00+09:00"
}
```

</p>
</details>

---

### 알림 그룹 수정하기

```http
PUT /v4.0/notification-groups/{notificationGroupId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| notificationGroupId | URL | UUID | O |  |
| notificationGroupName | Body | String | X | 알림 그룹을 식별할 수 있는 이름 |
| notifyEmail | Body | Boolean | X | 이메일 알림 여부<br/>- 기본값: `false` |
| notifySms | Body | Boolean | X | SMS 알림 여부<br/>- 기본값: `false` |
| isEnabled | Body | Boolean | X | 활성화 여부<br/>- 기본값: `false` |
| dbInstanceIds | Body | Array | X | 감시 대상 DB 인스턴스의 식별자 목록 |
| userGroupIds | Body | Array | X | 사용자 그룹의 식별자 목록 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## 모니터링

### 통계 정보 조회

```http
GET /v4.0/metric-statistics
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### Metric 목록 보기

```http
GET /v4.0/metrics
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| metrics | Body | Array | Metric 목록 |
| metrics.measureName | Body | String | 조회 지표 유형 |
| metrics.unit | Body | String | 측정값 단위 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

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

```http
GET /v4.0/event-codes
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| eventCodes | Body | Array | 이벤트 코드 목록 |
| eventCodes.eventCode | Body | Enum | 이벤트 코드 |
| eventCodes.eventCategoryType | Body | Enum | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |

<details><summary>예시</summary>
<p>

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

</p>
</details>

---

### 이벤트 목록 조회

```http
GET /v4.0/events
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 전체 이벤트 목록 수 |
| events | Body | Array | 이벤트 목록 |
| events.eventCategoryType | Body | Enum | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| events.eventCode | Body | Enum | 발생한 이벤트의 유형 |
| events.sourceId | Body | String | 이벤트 소스의 식별자 |
| events.sourceName | Body | String | 이벤트 소스를 식별할 수 있는 이름 |
| events.messages | Body | Array | 이벤트 메세지 목록 |
| events.messages.langCode | Body | Enum | 언어 코드<br/>- KO<br/>- EN<br/>- JA<br/>- ZH |
| events.messages.message | Body | String | 이벤트 메세지 |
| events.eventYmdt | Body | DateTime | 이벤트 발생 일시 |

<details><summary>예시</summary>
<p>

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
            "sourceId": "sourceId-example",
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

</p>
</details>

---

## 이벤트 구독

### 이벤트 구독 목록 조회

```http
GET /v4.0/event-subscriptions
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| totalCounts | Body | Number | 전체 이벤트 구독 목록 수 |
| eventSubscriptions | Body | Array | 이벤트 구독 목록 |
| eventSubscriptions.eventSubscriptionId | Body | String | 이벤트 구독의 식별자 |
| eventSubscriptions.eventCategoryType | Body | Enum | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.eventSubscriptionName | Body | String | 이벤트 구독의 식별할 수 있는 이름 |
| eventSubscriptions.enabled | Body | Boolean | 활성화 여부 |
| eventSubscriptions.notifyEmail | Body | Boolean | 이메일 발송 여부 |
| eventSubscriptions.notifySms | Body | Boolean | SMS 발송 여부 |
| eventSubscriptions.eventCodes | Body | Array | 구독할 이벤트 코드 목록 |
| eventSubscriptions.sources | Body | Array | 구독할 이벤트 소스 목록 |
| eventSubscriptions.sources.sourceId | Body | String | 이벤트 소스의 식별자 |
| eventSubscriptions.sources.eventCategoryType | Body | Enum | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptions.userGroupIds | Body | Array | 이벤트 구독 중인 사용자 그룹의 식별자 목록 |
| eventSubscriptions.createdYmdt | Body | DateTime | 생성 일시 |

<details><summary>예시</summary>
<p>

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
            "eventSubscriptionId": "eventSubscriptionId-example",
            "eventCategoryType": "ALL",
            "eventSubscriptionName": "eventSubscriptionName-example",
            "enabled": false,
            "notifyEmail": false,
            "notifySms": false,
            "eventCodes": [],
            "sources": [
                {
                    "sourceId": "sourceId-example",
                    "eventCategoryType": "ALL"
                }
            ],
            "userGroupIds": [],
            "createdYmdt": "2023-12-31T15:00:00+09:00"
        }
    ]
}
```

</p>
</details>

---

### 이벤트 구독 생성하기

```http
POST /v4.0/event-subscriptions
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| eventCategoryType | Body | Enum | O | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | Body | String | O | 이벤트 구독을 식별할 수 있는 이름 |
| enabled | Body | Boolean | O | 활성화 여부 |
| notifyEmail | Body | Boolean | O | 이메일 발송 여부 |
| notifySms | Body | Boolean | O | SMS 발송 여부 |
| eventCodes | Body | Array | O | 구독할 이벤트 코드 목록 |
| sources | Body | Array | O | 구독할 이벤트 소스 목록 |
| sources.sourceId | Body | UUID | O | 이벤트 소스의 식별자 |
| sources.eventCategoryType | Body | Enum | O | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Body | Array | O | 이벤트 구독할 사용자 그룹의 식별자 목록 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| eventSubscriptionId | Body | String | 이벤트 구독의 식별자 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "eventSubscriptionId": "eventSubscriptionId-example"
}
```

</p>
</details>

---

### 이벤트 구독 삭제하기

```http
DELETE /v4.0/event-subscriptions/{eventSubscriptionId}
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | O |  |

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

### 이벤트 구독 수정하기

```http
PUT /v4.0/event-subscriptions/{eventSubscriptionId}
```

#### 요청

| 이름 | 종류 | 형식 | 필수 | 설명 |
|-----|-----|-----|-----|-----|
| eventSubscriptionId | URL | UUID | O |  |
| eventCategoryType | Body | Enum | X | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| eventSubscriptionName | Body | String | X | 이벤트 구독을 식별할 수 있는 이름 |
| enabled | Body | Boolean | X | 활성화 여부 |
| notifyEmail | Body | Boolean | X | 이메일 발송 여부 |
| notifySms | Body | Boolean | X | SMS 발송 여부 |
| eventCodes | Body | Array | X | 구독할 이벤트 코드 목록 |
| sources | Body | Array | X | 구독할 이벤트 소스 목록 |
| sources.sourceId | Body | UUID | O | 이벤트 소스의 식별자 |
| sources.eventCategoryType | Body | Enum | O | 이벤트 카테고리 유형<br/>- ALL<br/>- INSTANCE<br/>- DB_SECURITY_GROUP<br/>- MONITORING<br/>- JOB<br/>- BACKUP<br/>- TENANT |
| userGroupIds | Body | Array | X | 이벤트 구독할 사용자 그룹의 식별자 목록 |

<details><summary>예시</summary>
<p>

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

</p>
</details>

#### 응답

이 API는 응답 본문을 반환하지 않습니다.

---

## 가용성 영역

### 가용성 영역 목록 보기

```http
GET /v4.0/availability-zones
```

#### 요청

이 API는 요청 본문을 요구하지 않습니다.

#### 응답

| 이름 | 종류 | 형식 | 설명 |
|-----|-----|-----|-----|
| availabilityZones | Body | Array | 가용성 영역 목록 |
| availabilityZones.availabilityZoneName | Body | String | 가용성 영역 이름 |
| availabilityZones.zoneState | Body | Object | 가용성 영역 상태 |
| availabilityZones.zoneState.available | Body | Boolean | 가용성 영역의 사용 가능 여부 |

<details><summary>예시</summary>
<p>

```json
{
    "header": {
        "resultCode": 0,
        "resultMessage": "SUCCESS",
        "isSuccessful": true
    },
    "availabilityZones": [
        {
            "availabilityZoneName": "availabilityZoneName-example",
            "zoneState": {
                "available": false
            }
        }
    ]
}
```

</p>
</details>

---

