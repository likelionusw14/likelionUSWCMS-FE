import { Link } from 'react-router-dom'
import type { DetailActionsProps } from '@types'

// 상세 화면 헤더의 목록/수정 버튼 쌍 — 프로젝트·세션·공지 상세가 공유한다.
// 모바일 실측(Figma 375: 1205:14622 / 1205:17648 / 1205:20328)에서도 두 버튼은 57px + gap 8 = 122px 로
// 제목과 같은 줄에 남는다. 그래서 세로 스택 대신 가로 배치를 유지하되,
// shrink-0 + whitespace-nowrap 으로 좁은 화면에서 버튼이 찌그러지거나 글자가 줄바꿈되지 않게 고정한다.
// (제목이 길어 밀리는 문제는 소비자 쪽 h2 의 min-w-px + truncate 로 처리한다.)
export function DetailActions({ listHref, editHref }: DetailActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-8">
      <Link
        to={listHref}
        className="flex h-32 shrink-0 items-center justify-center whitespace-nowrap rounded-8 border border-primary px-16 text-m-14 text-primary"
      >
        목록
      </Link>
      <Link
        to={editHref}
        className="flex h-32 shrink-0 items-center justify-center whitespace-nowrap rounded-8 bg-primary px-16 text-m-14 text-white"
      >
        수정
      </Link>
    </div>
  )
}
