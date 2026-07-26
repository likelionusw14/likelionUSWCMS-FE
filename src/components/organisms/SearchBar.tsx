import searchIcon from '@/assets/icons/search.svg'
import type { SearchBarProps } from '@types'

// 목록 상단 공용 검색바 — 흰 카드(rounded-16) + 좌측 필터 슬롯(children) + 우측 검색 아이콘.
// 프로젝트·세션·공지·출결 목록이 공유. 검색 동작은 백엔드 연동 시 채운다(디자인에 입력창 없음). Figma 671:3520.
export function SearchBar({ children, onSearch }: SearchBarProps) {
  return (
    <div className="flex w-full items-center justify-between gap-16 rounded-16 bg-white px-16 py-12 sm:px-32">
      {/* 모바일(<640): 좌우 패딩 16(Figma 375 시안)으로 줄여 필터 2개가 한 줄에 들어가게 한다. min-w-0 으로 넘침 방지. */}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-8 sm:gap-16">{children}</div>
      <button type="button" onClick={onSearch} aria-label="검색" className="shrink-0">
        <img src={searchIcon} alt="" className="h-40 w-24" />
      </button>
    </div>
  )
}
