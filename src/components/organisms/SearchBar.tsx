import searchIcon from '@/assets/icons/search.svg'
import type { SearchBarProps } from '@types'

// 목록 상단 공용 검색바 — 흰 카드(rounded-16) + 좌측 필터 슬롯(children) + 우측 검색 아이콘.
// 프로젝트·세션·공지·출결 목록이 공유. 검색 동작은 백엔드 연동 시 채운다(디자인에 입력창 없음). Figma 671:3520.
export function SearchBar({ children, onSearch }: SearchBarProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-16 bg-white px-32 py-12">
      <div className="flex items-center gap-16">{children}</div>
      <button type="button" onClick={onSearch} aria-label="검색">
        <img src={searchIcon} alt="" className="h-40 w-24" />
      </button>
    </div>
  )
}
