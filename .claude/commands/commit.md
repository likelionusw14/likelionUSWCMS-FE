---
description: 변경 사항을 [type]: 설명 커밋 컨벤션으로 커밋
argument-hint: '[커밋 의도(선택)]'
---

# /commit

현재 작업 트리의 변경 사항을 프로젝트 커밋 컨벤션에 맞춰 커밋한다.

절차:

1. `git status` 와 `git diff` 로 변경 사항을 파악한다.
2. 변경 성격에 맞는 type 을 고른다: `feat` | `fix` | `refactor` | `style` | `chore` | `docs`.
3. 관련 파일만 `git add` 한다 (관련 없는 변경은 같은 커밋에 섞지 않는다).
4. `[type]: 한국어 요약` 형식으로 커밋한다. 제목은 50자 이내, 부연이 필요하면 빈 줄 뒤 본문.
   - 예) `feat: 동아리 목록 페이지 추가`
5. `--no-verify` 금지. 훅이 실패하면 원인을 고친 뒤 다시 커밋한다.

`$ARGUMENTS` 가 있으면 커밋 의도로 참고한다.
