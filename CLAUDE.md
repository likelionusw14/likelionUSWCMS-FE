# CLAUDE.md

멋쟁이사자처럼 수원대학교 **동아리 관리 시스템(CMS)** 프론트엔드. 이 문서는 Claude Code 및 기여자가 따라야 할 프로젝트 컨벤션을 정의한다.

## 기술 스택

- **빌드/런타임**: Vite + React 19 + TypeScript(strict). SPA, 라우팅은 React Router v7.
- **스타일**: Tailwind CSS v3 (직접 컴포넌트 구축, 컴포넌트 라이브러리 미사용). 디자인 토큰은 `tailwind.config.js`.
- **데이터/API**: TanStack Query(`@tanstack/react-query`) + axios. 타입은 `openapi-typescript` 로 백엔드 OpenAPI 에서 생성.
- **전역 상태**: zustand (`src/store`).
- **패키지매니저**: npm. Node 20 고정 (`.nvmrc`).
- **린트/포맷**: oxlint + Prettier.

## 명령어

```bash
npm run dev         # 개발 서버 (http://localhost:5173)
npm run build       # tsc -b && vite build → dist/
npm run preview     # 빌드 결과 미리보기
npm run lint        # oxlint
npm run typecheck   # tsc -b (타입 검사)
npm run format      # prettier --write
npm run api:sync    # 백엔드 OpenAPI → src/api/types.generated.ts (SWAGGER_URL 필요)
```

## 브랜치 전략

- **`main`** — 프로덕션 배포 브랜치.
- **`develop`** — 개발 통합 브랜치. 대부분의 feature PR base.
- 기능 브랜치는 `develop` 에서 분기하여 PR 로 병합한다. (`feat/...`, `fix/...`)
- `.github/workflows/sync-main-to-develop.yml` 이 main 핫픽스를 develop 으로 자동 sync.

## 커밋 메시지

`[type]: 설명` 형식을 따른다. 제목은 한국어, 50자 이내.

| Type       | 용도                          |
| ---------- | ----------------------------- |
| `feat`     | 새로운 기능 추가              |
| `fix`      | 버그 수정                     |
| `chore`    | 빌드, 설정, 의존성 등 코드 외 변경 |
| `refactor` | 기능 변경 없는 코드 개선      |
| `style`    | UI/스타일 변경                |
| `docs`     | 문서 변경                     |

## 코드 컨벤션

- **언어** — 코드(식별자)는 영어, UI 라벨과 주석은 한국어.
- **컴포넌트 구조** — Atomic Design: `atoms → molecules → organisms → templates`.
  - `atoms` 는 프로젝트 의존성 없이 props 만 받는다 (다른 컴포넌트 import 금지).
  - `molecules` 는 atom 2개 이상을 조합.
  - `organisms` 는 화면 단위 기능 섹션.
  - `templates` 는 페이지 공통 셸.
- **라우트** — `src/routes/` 의 페이지에는 비즈니스 로직을 직접 넣지 않고 organisms/templates/hooks 만 조합.
- **타입** — 모든 인터페이스/타입은 `src/types/` 에 정의. 엔티티는 `id: string` 필수. 컴포넌트 파일에 인라인 정의 금지.
- **데이터 훅** — `src/hooks/` 의 훅은 `{ data, isLoading }` 형태를 반환한다 (백엔드 migration seam). 컴포넌트는 이 모양에만 의존한다.
- **스타일링** — Tailwind `className` 전용. 인라인 `style` 지양. 조건부 클래스는 `cn`(`@utils`) 사용.
- **Import** — 절대경로 alias 만 사용. 상대경로 `../` 금지. 배럴(`index.ts`) 경로로 import.

### Path Alias (tsconfig.app.json 와 동기화)

| Alias                                                   | 경로                       |
| ------------------------------------------------------- | -------------------------- |
| `@/*`                                                   | `src/*`                    |
| `@atoms` / `@molecules` / `@organisms` / `@templates`   | `src/components/<layer>/index.ts` |
| `@routes`, `@api`, `@hooks`, `@store`, `@types`, `@constants`, `@utils`, `@config` | 각 디렉터리 barrel |

```ts
// 금지 (상대경로)
import { Button } from '../atoms/Button'
// 권장 (절대경로 alias + barrel)
import { Button } from '@atoms'
import type { QueryResult } from '@types'
```

## API 타입 생성

백엔드 OpenAPI(Swagger) 스키마에서 타입을 생성한다.

```bash
SWAGGER_URL=https://api.example.com/openapi.json npm run api:sync
```

- `openapi/openapi.json` 으로 스키마를 받고 `src/api/types.generated.ts` 를 생성한다.
- `types.generated.ts` 는 생성물이므로 수동 편집 금지 (lint/format/PR 리뷰 제외 대상).

## 작업 안전 규칙

- 파일 삭제는 `rm` 대신 `.trash/` 로 이동(가역 삭제). 다중 파일/사용자 자산 삭제는 사용자 확인.
- git 파괴적 작업(`reset --hard`, `push --force`)은 명시적 요청 + 백업 후에만.
- git 훅을 건너뛰지 않는다 (`--no-verify` 금지). 훅 실패는 원인을 고친다.

## 프로젝트 스킬 (`.claude/commands`)

- `/commit` — `[type]: 설명` 컨벤션으로 커밋.
- `/pr` — 현재 브랜치를 push 하고 `develop` 대상 PR 을 양식대로 생성.
- `/scaffold-component` — Atomic Design 컴포넌트 + 배럴 생성.
