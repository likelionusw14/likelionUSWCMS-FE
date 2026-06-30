---
description: Atomic Design 컴포넌트 생성 + 배럴(index.ts) 갱신
argument-hint: '<atom|molecule|organism> <ComponentName>'
---

# /scaffold-component

Atomic Design 레이어에 새 컴포넌트를 만들고 배럴에 등록한다.

입력: `$ARGUMENTS` = `<레이어> <컴포넌트명(PascalCase)>` 예) `molecule MemberCard`

절차:

1. 레이어 디렉터리 결정: atom → `src/components/atoms`, molecule → `src/components/molecules`,
   organism → `src/components/organisms`.
2. `<디렉터리>/<ComponentName>.tsx` 생성:
   - props 인터페이스를 파일 상단에 정의 (도메인 타입이 필요하면 `src/types/` 에 추가).
   - 스타일은 Tailwind `className` + `cn`(`@utils`). 인라인 `style` 금지.
   - atom 은 다른 컴포넌트를 import 하지 않는다.
3. `<디렉터리>/index.ts` 배럴에 `export * from './<ComponentName>'` 추가.
4. import 는 절대경로 alias(`@atoms`/`@molecules`/...)만 사용.
