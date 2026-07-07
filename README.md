# likelionUSWCMS-FE

[Web] 멋쟁이사자처럼 수원대학교 **동아리 관리 시스템(Club Management System)** 프론트엔드.

## 기술 스택

| 영역      | 사용 기술                                              |
| --------- | ------------------------------------------------------ |
| 빌드/런타임 | Vite + React 19 + TypeScript(strict), SPA            |
| 라우팅    | React Router v7                                         |
| 스타일    | Tailwind CSS v3 (Atomic Design, 직접 컴포넌트 구축)    |
| 데이터/API | TanStack Query + axios, `openapi-typescript` 생성 타입 |
| 전역 상태 | zustand                                                |
| 린트/포맷 | oxlint + Prettier                                      |
| 배포      | Cloudflare Pages (정적)                                |

## 시작하기

```bash
# Node 20 사용 (.nvmrc)
npm install
cp .env.example .env   # VITE_API_BASE_URL 채우기 (없으면 백엔드 미연동 모드)
npm run dev            # http://localhost:5173
```

## 스크립트

| 명령              | 설명                                            |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | 개발 서버                                       |
| `npm run build`   | 타입 검사 + 프로덕션 빌드 → `dist/`             |
| `npm run preview` | 빌드 결과 미리보기                              |
| `npm run lint`    | oxlint                                           |
| `npm run typecheck` | 타입 검사 (`tsc -b`)                          |
| `npm run format`  | Prettier 포맷                                   |
| `npm run api:sync` | 백엔드 OpenAPI → `src/api/types.generated.ts`  |

## 프로젝트 구조

```
src/
  main.tsx              # 진입점 (QueryClientProvider + BrowserRouter)
  App.tsx               # 라우트 정의
  routes/               # 페이지(라우트) — organisms/templates/hooks 만 조합
  components/           # Atomic Design
    atoms/  molecules/  organisms/  templates/
  api/                  # axios client, endpoints, errors, 생성 타입
  hooks/                # 데이터 훅 ({ data, isLoading } seam)
  store/                # zustand (auth, ui)
  types/                # 모든 타입/인터페이스 (id: string 필수)
  constants/            # 색/레이아웃 토큰
  config/               # env 래핑
  utils/                # cn 등 유틸
  styles/               # Tailwind + 폰트
scripts/fetch-swagger.mjs   # OpenAPI 스키마 다운로드
```

## Convention

### Branch Strategy

- **`main`** — 프로덕션 배포 브랜치
- **`develop`** — 개발 통합 브랜치 (대부분의 feature PR base)
- 기능 브랜치는 `develop` 에서 분기 → PR 로 병합
- `sync-main-to-develop.yml` 이 main 핫픽스를 develop 으로 자동 sync

### Commit Message

`[type]: 설명` 형식. (`feat` `fix` `chore` `refactor` `style` `docs`)

### Code Convention

- **언어** — 코드는 영어, UI 라벨·주석은 한국어
- **컴포넌트** — Atomic Design (atoms → molecules → organisms → templates)
- **타입** — 모두 `src/types/` 에 정의, 엔티티는 `id: string` 필수
- **데이터 훅** — `{ data, isLoading }` 반환 (백엔드 seam)
- **스타일** — Tailwind `className` 전용, 조건부는 `cn`
- **Import** — 절대경로 alias + barrel, 상대경로 `../` 금지

자세한 내용은 [`CLAUDE.md`](./CLAUDE.md) 참고.

## 배포 (Cloudflare Pages)

`main`/`develop` push 시 `deploy.yml` 이 자동 배포한다. 아래 시크릿이 설정돼야 동작하며,
없으면 배포 잡은 자동으로 skip 된다 (CI 는 영향 없음).

GitHub repo → Settings → Secrets and variables → Actions 에 등록:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VITE_API_BASE_URL` (빌드 타임 주입)

선택: `GITGUARDIAN_API_KEY` (시크릿 스캔).

## AI 에이전트 협업 (Claude / Codex)

컨벤션 단일 출처는 [`AGENTS.md`](./AGENTS.md) 다. Claude 는 `CLAUDE.md` 가 이를 `@AGENTS.md` 로 import 하고, Codex 는 `AGENTS.md` 를 직접 읽는다.

프로젝트 슬래시 명령(스킬)은 두 곳에 동일 내용으로 둔다:

| 명령                  | Claude               | Codex             |
| --------------------- | -------------------- | ----------------- |
| `/commit`             | `.claude/commands/`  | `.codex/prompts/` |
| `/pr`                 | `.claude/commands/`  | `.codex/prompts/` |
| `/scaffold-component` | `.claude/commands/`  | `.codex/prompts/` |
| `/figma-import`       | `.claude/commands/`  | `.codex/prompts/` |

**Codex 에서 슬래시 명령 활성화** — Codex 는 전역 `~/.codex/prompts/` 만 자동 인식하므로 프로젝트 명령을 복사(또는 심링크)한다:

```bash
# macOS / Linux (심링크)
ln -s "$(pwd)/.codex/prompts/"*.md ~/.codex/prompts/
# Windows (복사)
copy .codex\prompts\*.md %USERPROFILE%\.codex\prompts\
```

`/figma-import` 는 Figma Dev Mode MCP 연결이 필요하다 (Codex 는 별도 설정).

## 라이선스

[MIT](./LICENSE)
