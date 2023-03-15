## Database > RDS for MySQL > 이벤트

## 이벤트

이벤트는 RDS for MySQL이나 사용자에 의해 발생한 중요한 사건을 의미합니다. 이벤트는 이벤트 유형, 발생 일시, 원본 소스와 메시지로 구성됩니다. 이벤트는 웹 콘솔에서 조회 가능하며, 구독을 통해 이메일, SMS으로 이벤트 발생 알림을 받을 수 있습니다. 이벤트의 유형과 발생 가능한 이벤트는 아래와 같습니다.

| 이벤트 코드      | 이벤트 유형            | 구독 가능 여부 | 설명                                   |
|-------------|-------------------|----------|--------------------------------------|
| BACUP_01_00 | BACKUP            | 아니오      | DB 인스턴스 백업 시작                        |
| BACUP_01_01 | BACKUP            | 아니오      | DB 인스턴스 백업 완료                        |
| BACUP_01_04 | BACKUP            | 아니오      | DB 인스턴스 백업 실패                        |
| BACUP_02_01 | BACKUP            | 예        | 백업 삭제 완료                             |
| BACUP_04_00 | BACKUP            | 예        | 오브젝트 스토리지 업로드 시작                     |
| BACUP_04_01 | BACKUP            | 예        | 오브젝트 스토리지 업로드 완료                     |
| BACUP_04_04 | BACKUP            | 예        | 오브젝트 스토리지 업로드 실패                     |
| BACUP_05_00 | BACKUP            | 예        | 백업 내보내기 시작                           |
| BACUP_05_01 | BACKUP            | 예        | 백업 내보내기 완료                           |
| BACUP_05_04 | BACKUP            | 예        | 백업 내보내기 실패                           |
| BACUP_06_01 | BACKUP            | 아니오      | DB 인스턴스 백업 실패 (알려진 원인)               |
| SECGP_01_01 | DB_SECURITY_GROUP | 아니오      | DB 보안 그룹 생성                          |
| SECGP_02_00 | DB_SECURITY_GROUP | 아니오      | DB 보안 그룹 변경 시작                       |
| SECGP_02_01 | DB_SECURITY_GROUP | 아니오      | DB 보안 그룹 변경 완료                       |
| SECGP_02_04 | DB_SECURITY_GROUP | 아니오      | DB 보안 그룹 변경 실패                       |
| SECGP_03_01 | DB_SECURITY_GROUP | 아니오      | DB 보안 그룹 삭제                          |
| INSTC_01_00 | INSTANCE          | 아니오      | DB 인스턴스 생성 시작                        |
| INSTC_01_01 | INSTANCE          | 아니오      | DB 인스턴스 생성 완료                        |
| INSTC_01_04 | INSTANCE          | 아니오      | DB 인스턴스 생성 실패                        |
| INSTC_02_01 | INSTANCE          | 예        | DB 인스턴스 시작                           |
| INSTC_03_01 | INSTANCE          | 예        | DB 인스턴스 종료                           |
| INSTC_04_00 | INSTANCE          | 예        | DB 인스턴스 삭제 시작                        |
| INSTC_04_01 | INSTANCE          | 예        | DB 인스턴스 삭제 완료                        |
| INSTC_04_04 | INSTANCE          | 예        | DB 인스턴스 삭제 실패                        |
| INSTC_05_00 | INSTANCE          | 예        | DB 인스턴스 백업 시작                        |
| INSTC_05_01 | INSTANCE          | 예        | DB 인스턴스 백업 완료                        |
| INSTC_05_04 | INSTANCE          | 예        | DB 인스턴스 백업 실패                        |
| INSTC_06_00 | INSTANCE          | 예        | DB 인스턴스 복원 시작                        |
| INSTC_06_01 | INSTANCE          | 예        | DB 인스턴스 복원 완료                        |
| INSTC_06_04 | INSTANCE          | 예        | DB 인스턴스 복원 실패                        |
| INSTC_07_01 | INSTANCE          | 예        | 자동 백업 설정 활성화                         |
| INSTC_08_01 | INSTANCE          | 예        | 자동 백업 설정 비활성화                        |
| INSTC_09_00 | INSTANCE          | 예        | 상세 설정 변경 시작                          |
| INSTC_09_01 | INSTANCE          | 예        | 상세 설정 변경 완료                          |
| INSTC_09_04 | INSTANCE          | 예        | 상세 설정 변경 실패                          |
| INSTC_10_00 | INSTANCE          | 예        | 백업 및 사용자 접근 제어 설정 변경 시작              |
| INSTC_10_01 | INSTANCE          | 예        | 백업 및 사용자 접근 제어 설정 변경 완료              |
| INSTC_10_04 | INSTANCE          | 예        | 백업 및 사용자 접근 제어 설정 변경 실패              |
| INSTC_11_01 | INSTANCE          | 예        | 사용자 접근 제어 변경 완료                      |
| INSTC_13_01 | INSTANCE          | 예        | 플로팅 IP 연결                            |
| INSTC_14_01 | INSTANCE          | 예        | 플로팅 IP 연결 해제                         |
| INSTC_15_00 | INSTANCE          | 예        | DB 인스턴스 복제 시작                        |
| INSTC_15_01 | INSTANCE          | 예        | DB 인스턴스 복제 완료                        |
| INSTC_15_04 | INSTANCE          | 예        | DB 인스턴스 복제 실패                        |
| INSTC_16_00 | INSTANCE          | 예        | DB 인스턴스 승격 시작                        |
| INSTC_16_01 | INSTANCE          | 예        | DB 인스턴스 승격 완료                        |
| INSTC_16_04 | INSTANCE          | 예        | DB 인스턴스 승격 실패                        |
| INSTC_21_01 | INSTANCE          | 예        | DB 인스턴스 정상화                          |
| INSTC_22_01 | INSTANCE          | 예        | DB 인스턴스 용량 부족                        |
| INSTC_23_01 | INSTANCE          | 예        | DB 인스턴스 연결 실패                        |
| INSTC_24_00 | INSTANCE          | 예        | DB 인스턴스 타입 변경 시작                     |
| INSTC_24_01 | INSTANCE          | 예        | DB 인스턴스 타입 변경 완료                     |
| INSTC_24_04 | INSTANCE          | 예        | DB 인스턴스 타입 변경 실패                     |
| INSTC_25_00 | INSTANCE          | 예        | Storage 확장 시작                        |
| INSTC_25_01 | INSTANCE          | 예        | Storage 확장 완료                        |
| INSTC_25_04 | INSTANCE          | 예        | Storage 확장 실패                        |
| INSTC_26_00 | INSTANCE          | 예        | DB 인스턴스 장애조치 발생                      |
| INSTC_26_01 | INSTANCE          | 예        | DB 인스턴스 장애조치 완료                      |
| INSTC_26_04 | INSTANCE          | 예        | DB 인스턴스 장애조치 실패                      |
| INSTC_27_01 | INSTANCE          | 예        | DB 인스턴스 용량 확보                        |
| INSTC_27_04 | INSTANCE          | 예        | DB 인스턴스 용량 확보 실패                     |
| INSTC_28_01 | INSTANCE          | 예        | 고가용성 DB 인스턴스 시작                      |
| INSTC_29_01 | INSTANCE          | 예        | 고가용성 DB 인스턴스 종료                      |
| INSTC_30_01 | INSTANCE          | 예        | 복제 중단                                |
| INSTC_31_00 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스 고가용성 복구 시작         |
| INSTC_31_01 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스 고가용성 복구 완료         |
| INSTC_31_04 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스 고가용성 복구 실패         |
| INSTC_32_00 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스 고가용성 재구축 시작        |
| INSTC_32_01 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스 고가용성 재구축 완료        |
| INSTC_32_04 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스 고가용성 재구축 실패        |
| INSTC_33_00 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스 고가용성 제거 시작         |
| INSTC_33_01 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스 고가용성 제거 완료         |
| INSTC_33_04 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스 고가용성 제거 실패         |
| INSTC_34_01 | INSTANCE          | 예        | 고가용성 일시 중지                           |
| INSTC_34_04 | INSTANCE          | 예        | 고가용성 일시 중지 실패                        |
| INSTC_35_01 | INSTANCE          | 예        | 고가용성 다시 시작                           |
| INSTC_35_04 | INSTANCE          | 예        | 고가용성 다시 시작 실패                        |
| INSTC_36_01 | INSTANCE          | 예        | 장애 조치를 이용한 인스턴스 재시작 완료               |
| INSTC_36_04 | INSTANCE          | 예        | 장애 조치를 이용한 인스턴스 재시작 실패               |
| INSTC_37_01 | INSTANCE          | 예        | DB User 생성                           |
| INSTC_37_04 | INSTANCE          | 예        | DB User 생성 실패                        |
| INSTC_38_01 | INSTANCE          | 예        | DB User 변경                           |
| INSTC_38_04 | INSTANCE          | 예        | DB User 변경 실패                        |
| INSTC_39_01 | INSTANCE          | 예        | DB User 삭제                           |
| INSTC_40_01 | INSTANCE          | 예        | DB 스키마 생성                            |
| INSTC_40_04 | INSTANCE          | 예        | DB 스키마 생성 실패                         |
| INSTC_41_01 | INSTANCE          | 예        | DB 스키마 삭제                            |
| INSTC_42_04 | INSTANCE          | 아니오      | CPU 코어 수 제한                          |
| INSTC_43_04 | INSTANCE          | 아니오      | RAM 용량 제한                            |
| INSTC_44_04 | INSTANCE          | 아니오      | 개별 볼륨 크기 제한                          |
| INSTC_45_04 | INSTANCE          | 아니오      | 프로젝트 전체 볼륨 크기 제한                     |
| INSTC_46_04 | INSTANCE          | 아니오      | Read Only Slave 개수 제한                |
| INSTC_47_00 | INSTANCE          | 예        | DB 인스턴스 백업 및 내보내기 시작                 |
| INSTC_47_01 | INSTANCE          | 예        | DB 인스턴스 백업 및 내보내기 완료                 |
| INSTC_47_04 | INSTANCE          | 예        | DB 인스턴스 백업 및 내보내기 실패                 |
| INSTC_48_00 | INSTANCE          | 예        | 오브젝트 스토리지에 있는 백업으로 DB 인스턴스 복원 시작     |
| INSTC_48_01 | INSTANCE          | 예        | 오브젝트 스토리지에 있는 백업으로 DB 인스턴스 복원 완료     |
| INSTC_48_04 | INSTANCE          | 예        | 오브젝트 스토리지에 있는 백업으로 DB 인스턴스 복원 실패     |
| INSTC_49_00 | INSTANCE          | 예        | DB 인스턴스 강제 재시작 실행                    |
| INSTC_50_00 | INSTANCE          | 예        | 백업 내보내기 시작                           |
| INSTC_50_01 | INSTANCE          | 예        | 백업 내보내기 완료                           |
| INSTC_50_04 | INSTANCE          | 예        | 백업 내보내기 실패                           |
| INSTC_51_01 | INSTANCE          | 예        | DB 인스턴스 백업 실패                        |
| INSTC_52_01 | INSTANCE          | 예        | DB 인스턴스 백업 및 내보내기 실패                 |
| INSTC_53_00 | INSTANCE          | 예        | DB 인스턴스 중지 시작                        |
| INSTC_53_01 | INSTANCE          | 예        | DB 인스턴스 중지 완료                        |
| INSTC_53_04 | INSTANCE          | 예        | DB 인스턴스 중지 실패                        |
| INSTC_54_00 | INSTANCE          | 예        | DB 인스턴스 복제 재구축 시작                    |
| INSTC_54_01 | INSTANCE          | 예        | DB 인스턴스 복제 재구축 완료                    |
| INSTC_54_04 | INSTANCE          | 예        | DB 인스턴스 복제 재구축 실패                    |
| INSTC_55_01 | INSTANCE          | 예        | 복제 딜레이로 인한 장애 조치 재시작 실패              |
| INSTC_56_00 | INSTANCE          | 예        | DB 인스턴스 보안 그룹 변경 시작                  |
| INSTC_56_01 | INSTANCE          | 예        | DB 인스턴스 보안 그룹 변경 완료                  |
| INSTC_56_04 | INSTANCE          | 예        | DB 인스턴스 보안 그룹 변경 실패                  |
| INSTC_57_00 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스를 일반 DB 인스턴스로 변경 시작 |
| INSTC_57_01 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스를 일반 DB 인스턴스로 변경 완료 |
| INSTC_57_04 | INSTANCE          | 예        | 장애 조치 완료된 DB 인스턴스를 일반 DB 인스턴스로 변경 실패 |
| INSTC_58_00 | INSTANCE          | 예        | 파라미터 그룹 변경 시작                        |
| INSTC_58_01 | INSTANCE          | 예        | 파라미터 그룹 변경 완료                        |
| INSTC_58_04 | INSTANCE          | 예        | 파라미터 그룹 변경 실패                        |
| INSTC_59_00 | INSTANCE          | 예        | 파라미터 그룹 변경 사항 적용 시작                  |
| INSTC_59_01 | INSTANCE          | 예        | 파라미터 그룹 변경 사항 적용 완료                  |
| INSTC_59_04 | INSTANCE          | 예        | 파라미터 그룹 변경 사항 적용 실패                  |
| INSTC_60_00 | INSTANCE          | 예        | DB 인스턴스 마이그레이션 시작                    |
| INSTC_60_01 | INSTANCE          | 예        | DB 인스턴스 마이그레이션 완료                    |
| INSTC_60_04 | INSTANCE          | 예        | DB 인스턴스 마이그레이션 실패                    |
| JOB_01_04   | JOB               | 예        | Job 실행 실패                            |
| TENAT_01_04 | TENANT            | 예        | CPU 코어 수 제한                          |
| TENAT_02_04 | TENANT            | 예        | RAM 용량 제한	                           |
| TENAT_03_04 | TENANT            | 예        | 개별 볼륨 크기 제한                          |
| TENAT_04_04 | TENANT            | 예        | 프로젝트 전체 볼륨 크기 제한                     |
| TENAT_05_04 | TENANT            | 예        | Read Only Slave 개수 제한                |

## 이벤트 구독

이벤트 유형, 코드 및 소스로 구분하여 이벤트를 구독할 수 있습니다. 이벤트 유형으로 구독하면 이벤트 유형에 포함된 모든 이벤트 코드의 알림을 받습니다. 알림이 너무 광범위할 경우 이벤트 코드와 소스로 세분화해 구독할 수 있습니다. 프로젝트 멤버만 알림을 받을 사용자로 선택할 수 있습니다. 기본적으로 이메일로 이벤트 알림이 발송되며, 실명을 인증한 휴대전화 번호가 등록된 경우에만 SMS로 추가 이벤트 알림이 발송됩니다.

