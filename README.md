## 프로젝트 구조
- NestJS를 사용하여 헥사고날 아키텍처를 구현
- 클린 아키텍처 원칙을 따르며, 도메인 중심 개발을 지향 

### 헥사고날 아키텍처 구현
1. `application`: 유스케이스 구현 및 포트 정의
2. `domain`: 핵심 비즈니스 로직과 엔티티
3. `infrastructure`: 외부 시스템과의 통합 및 포트 구현

<h3>Directory Tree</h3><p>

```plaintext
📁 src
 ├── 📁 common
 ├── 📁 config
 ├── 📁 docs
 ├── 📁 modules
 └── 📄 main.ts
```
<h4> 레벨 1: 최상위 디렉터리 </h4>

- `common`: 프로젝트 전반에 걸쳐 사용되는 공통 기능 및 유틸리티
- `config`: 애플리케이션 설정 관련 파일 (데이터베이스, 환경 변수 등)
- `docs`: API 문서화 관련 파일 (Swagger 설정 등)
  - `api-description.decorator.ts`: API 엔드포인트 설명을 위한 데코레이터
- `main.ts`: 애플리케이션의 진입점
- `modules`: 각 도메인별 모듈



<h4> 주요 디렉토리 구조 </h4>
<h5> common 디렉토리 </h5>

```plaintext
📁 common
 ├── 📁 constants
 ├── 📁 decorator
 ├── 📁 dto
 ├── 📁 filters
 │   └── 📁 http-exception
 ├── 📁 interceptors
 ├── 📁 provider
 └── 📁 types
     └── 📁 error
```

- `constants`: 애플리케이션 전반에서 사용되는 상수 값들
- `decorator`: 커스텀 데코레이터
  - `response-data.decorator.ts`: 응답 데이터 형식을 정의하는 데코레이터
- `filters`:
  - `http-exception.filter.ts`: 일반적인 HTTP 예외 처리
  - `internal-server-exception.filter.ts`: 내부 서버 오류 처리
- `dto`: 공통으로 사용되는 데이터 전송 객체
- `filters`: 전역 예외 필터
- `interceptors`: 전역 인터셉터
- `provider`: 공통 서비스 제공자
- `types`: 공통 타입 정의

#### modules/user 디렉토리
```plaintext
📁 user
├── 📁 application
│   ├── 📁 repositories
│   │   └── 📄 user.repository.abstract.ts
│   ├── 📄 user.module.ts
│   └── 📄 user.service.ts
├── 📁 domain
│   ├── 📁 constants
│   └── 📄 user.ts
└── 📁 infrastructure
    ├── 📁 external
    ├── 📁 persistence
    │   └── 📁 orm
    │       ├── 📁 entities
    │       ├── 📁 repositories
    │       └── 📄 orm-user-persistence.module.ts
    └── 📁 presenters
        └── 📁 rest
            ├── 📁 dto
            ├── 📁 mappers
            └── 📄 user.controller.ts
```

- `application`: 비즈니스 로직과 유스케이스 구현
  - `abstracts`: 레포지토리 등의 추상 클래스
  - `user.module.ts`: NestJS 모듈 정의
  - `user.service.ts`: 비즈니스 로직 서비스
  <br>
- `domain`: 도메인 모델과 비즈니스 규칙
  - `constants`: 열거형(enum)과 상수
  <!-- - `events`: 도메인 이벤트 -->
  - `user.ts`: 도메인 모델
   <br>

- `infrastructure`: 외부 시스템과의 통합
  - `persistence`: 데이터 영속성 관련 구현
    - `orm`: ORM(Object-Relational Mapping) 관련 구현 
  - `presenters`: API 엔드포인트와 컨트롤러
    - `rest`: RESTful API 관련 구현
  - `external`: 외부 서비스 또는 API와의 통합
    - 예시: 이메일 서비스, 결제 게이트웨이, 외부 날씨 API 등


## 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run start
```