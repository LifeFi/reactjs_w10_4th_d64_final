# 노마드코더 ReactJS w10 4th w64 졸업 과제 : 미니 트위터 클론

### 배포 경로

- https://lifefi-ox.vercel.app/
  - vercel PostgreDB

### 과제 제출

- 2024-04-28(월)

### (완료) 추가 작업

- (완료) 댓글

### (예정) 추가 작업

- (예정) 코드 정리
  - 타입을 Prisma, Zod, Cutom 등 원칙 없이 사용함.
  - actions, async fn 등 필요할때 만들어 사용하고 버려둠.
  - 언체 cache 를 쓸지 기준이 필요함.
  - 예외 처리, 유효성 검사 등
  - 좋아요 버튼 동작 버그 있음.
- (예정) 퀴즈 타입 트윗
- (예정) NPC 추가
- (예정) 최적화

### 추가적으로 궁금한 것들

- cloudFlare 이미지 업로드시, metadata 세팅하는 방법
- Production 환경에서, 개발 db, 리얼 db 환경을 어떻게 세팅하고, 마이그레이션을 어떻게 진행하면 좋을지
- Parallel Roues, Modal Route 체크 : 개념 이해가 잘 안됨.

### 알게된 점

- unstable_cache 사용시, data 가 변환되지 않는 경우가 있음. 정확한 케이스는 파악 안됨.
  - createdAt type 이 Date 인데, string으로 저장된다던가.. 상황 만남.
