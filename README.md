# Next.js 예제 애플리케이션

이 저장소는 '프런트엔드 개발자를 위한 테스트 입문'의 7장부터 10장까지의 내용이 담긴 저장소입니다. CRUD기능을 가진 웹 애플리케이션을 대상으로 실무적인 테스트 방법을 설명합니다.

- 7장 웹 애플리케이션 통합 테스트
- 8장 UI 컴포넌트 탐색기
- 9장 시각적 회귀 테스트
- 10장 E2E 테스트
- 부록 A 깃허브 액션에서 UI 컴포넌트 테스트 실행하기
- 부록 B 깃허브 액션에서 E2E 테스트 실행하기

프런트엔드 프레임워크（Next.js）의 고유기능은 되도록 7장에서만 제한적으로 다룹니다. 최대한 다른 프레임워크를 사용하는 독자분들도 응용할 수 있도록 내용을 검토했습니다. 부록 A, B에서 설명하는 깃허브 액션 관련 예제 코드도 포함되어 있습니다.

## 7장 웹 애플리케이션 통합 테스트

Next.js나 리액트의 고유기능에 대한 통합 테스트를 다룹니다. 리액트의 Context API나 Next.js Router와 연계된 통합 테스트를 중점적으로 설명합니다. 후반부에는 MSW도 등장합니다.

【예제 코드】`src/components/**/*.test.tsx`

```
$ npm test
```

## 8장 UI 컴포넌트 탐색기

스토리북을 테스트 도구로 사용하는 방법을 다룹니다. a11y 애드온을 활용한 디버깅이나 테스트 실행기를 활용한 브라우저 테스트를 학습합니다.

【예제 코드】`src/components/**/*.stories.tsx`

```
$ npm run storybook:build
$ npm run storybook:ci
```

## 9장 시각적 회귀 테스트(Visual Regression Test)

reg-suit을 사용한 실무적인 VRT 사용법을 다룹니다. 이 저장소에도 VRT가 있지만 주된 내용은 보다 간결하게 작성한 아래의 저장소에서 설명합니다.

【예제 코드】https://github.com/frontend-testing-book/vrt

## 10장 E2E 테스트

Playwright를 사용한 E2E 테스트를 다룹니다. DB/Redis/S3와 연계된 기능을 대상으로 E2E 테스트 작성법을 설명합니다. 테스트 작성법을 다룬다는 취지상 Playwright, Next.js, Prisma의 사용법은 자세히 다루지 않습니다. 최소한의 이해를 돕는 정도로만 설명합니다.

【예제 코드】`e2e/**.spec.ts`

```
$ npm run docker:e2e:build
$ npm run docker:e2e:ci
```

## 부록 A 깃허브 액션에서 UI 컴포넌트 테스트 실행하기

지금까지 소개한 테스트 자동화 방법을 깃허브 액션에서 실행합니다. 워크플로와 액션의 사용법을 다룹니다.

【예제 코드】`.github/workflows/*.yaml`

## 부록 B 깃허브 액션에서 E2E 테스트 실행하기

깃허브 액션에서 테스트하기 위한 도커 및 도커 컴포즈 파일의 작성법을 다룹니다.

【예제 코드】`Dockerfile.*, doceker-compose.*.yaml`

# Installation

Node.js가 설치되어 있는 개발환경에 필요한 모듈을 설치합니다.

```bash
$ npm i
```

## Create MinIO Bucket with MinIO Client

개발환경에서는 S3에 직접 접속하지 않고, S3와 호환이 가능하면서 로컬환경에서 사용할 수 있는 MinIO를 사용합니다.  
MinIO Client가 설치되어 있지 않다면 테스트를 실행하기 전에 먼저 설치해야 합니다.

```bash
$ brew install minio/stable/mc
```

개발환경에 있는 MinIO에 버킷을 생성합니다. 도커 컴포즈로 MinIO 서버를 실행한 뒤 버킷 생성 스크립트를 실행합니다.

```bash
$ docker compose up -d
$ sh create-image-bucket.sh
```

## DB 마이그레이션 실행하기

```bash
$ docker compose up -d
$ npm run prisma:migrate
```

## 개발서버 실행하기

```bash
$ docker compose up -d
$ npm run dev
```

## UI 컴포넌트 테스트를 로컬에서 실행하기

```bash
$ npm run storybook:build && npm run storybook:ci
```

## E2E 테스트를 로컬에서 실행하기

```bash
$ npm run docker:e2e:build && npm run docker:e2e:ci
```
