---
description: Figma 노드(디자인)를 프로젝트 컨벤션에 맞는 React 컴포넌트로 가져오기
argument-hint: '<Figma 노드 URL> [atom|molecule|organism]'
---

# /figma-import

Figma Dev Mode MCP 로 디자인을 읽어와 이 프로젝트의 Atomic Design + Tailwind 컨벤션에 맞는 컴포넌트로 변환한다.

**사전 조건**: Figma 데스크톱 앱에서 해당 파일을 Dev Mode 로 열고 Figma MCP 가 연결돼 있어야 한다. 연결돼 있지 않으면 사용자에게 안내하고 중단한다.

입력: `$ARGUMENTS` = `<Figma 노드 URL> [레이어]`

절차:

1. Figma MCP 도구를 로드한다 (`get_design_context`, `get_screenshot`, `get_metadata`). 필요하면 `figma-use` 스킬을 함께 로드.
2. 노드 URL(또는 현재 Figma 선택)로 `get_design_context` 를 호출해 레이아웃·텍스트·스페이싱·색·계층을 가져온다. 시각 확인이 필요하면 `get_screenshot`.
3. 디자인을 **프로젝트 토큰으로 매핑**한다 (1:1 픽셀 복제보다 토큰/컨벤션 우선):
   - 색 → `tailwind.config.js` 의 Figma 토큰 `primary`/`secondary`/`gray`(100·300·500·700·900)/`navy`/`white`/`black`/`success`/`error`/`warning`/`info`. 가장 가까운 토큰을 쓰고 톤 조절은 불투명도 유틸(`bg-primary/10`), 새 토큰이 꼭 필요하면 사용자 확인 후 추가.
   - 폰트 → `font-sans`(영문=Inter Medium, 한글=Pretendard). 텍스트 스타일 토큰: `text-h1`/`text-h2`, `text-sm-16~22`, `text-m-14~20`, `text-r-14`.
   - 간격 → px 키 spacing(`p-16`=16px, `gap-8`=8px; 4·8·12·16·24·32·40·48·64·96). 반경 → `rounded`(8px)·`rounded-full`(999px).
4. 레이어를 정한다(인자 우선, 없으면 복잡도로 추론): 단일 표현 요소 → `atom`, atom 조합 → `molecule`, 화면 섹션 → `organism`.
5. `src/components/<layer>/<Name>.tsx` 생성:
   - props 타입은 `src/types/` 에 정의하고 import 한다 (컴포넌트 파일 인라인 정의 금지).
   - `className` + `cn`(`@utils`) 사용, 인라인 `style` 금지. `atom` 은 다른 컴포넌트를 import 하지 않는다.
   - 고정 문구는 한국어 라벨, 동적 값은 props 로.
6. `src/components/<layer>/index.ts` 배럴에 `export * from './<Name>'` 추가.
7. `npm run typecheck` 로 검증하고, `get_screenshot` 결과와 비교해 차이를 사용자에게 보고한다.

주의: 임의 색/폰트를 새로 만들지 말고 토큰에 맞춘다. 디자인에 없는 동작/상태를 추측해 추가하지 않는다.
