---
description: 현재 브랜치를 push 하고 develop 대상 PR 을 양식에 맞춰 생성
argument-hint: '[PR 제목(선택)]'
---

# /pr

현재 브랜치를 원격에 올리고 GitHub PR 을 프로젝트 양식대로 생성한다.

절차:

1. 현재 브랜치를 확인한다. `main` / `develop` 위에서 바로 작업했다면 중단하고
   `feat/...` 같은 작업 브랜치로 옮기도록 안내한다.
2. 커밋되지 않은 변경이 있으면 `/commit` 절차로 먼저 커밋한다.
3. `git push -u origin <현재 브랜치>`.
4. `.github/pull_request_template.md` 본문을 채워 `gh pr create` 를 실행한다:
   - `--base develop` (기본 통합 브랜치)
   - 제목 = 커밋 컨벤션 형식(`[type]: 설명`). `$ARGUMENTS` 가 있으면 우선 사용.
   - 본문 = 템플릿의 요약 / 변경 사항 / 변경 유형 / 테스트 / 체크리스트를 실제 diff 기준으로 작성.
   - 관련 이슈가 있으면 본문에 `Closes #N`.
5. 생성된 PR URL 을 사용자에게 보여준다.

주의: PR 생성은 외부에 반영되는 동작이다. 제목·base·본문을 사용자에게 한 번 확인받은 뒤 생성한다.
