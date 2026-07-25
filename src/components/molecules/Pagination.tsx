import prevArrow from '@/assets/icons/page-arrow-prev.svg'
import nextArrow from '@/assets/icons/page-arrow-next.svg'
import { cn } from '@utils'
import type { PaginationProps } from '@types'

const ELLIPSIS = 'ellipsis'

// 디자인은 페이지가 많을 때 `1 2 3 ... 17 18 19` 로 접는다.
// 앞 3개·뒤 3개·현재 페이지 주변만 남기고 끊긴 구간에 말줄임을 넣는다.
function buildPages(page: number, totalPages: number): (number | typeof ELLIPSIS)[] {
  const shown = [1, 2, 3, page - 1, page, page + 1, totalPages - 2, totalPages - 1, totalPages]
    .filter((current) => current >= 1 && current <= totalPages)
    .sort((a, b) => a - b)

  return [...new Set(shown)].flatMap((current, index, pages) => {
    if (index === 0) return [current]
    const gap = current - pages[index - 1]
    if (gap === 1) return [current]
    // 한 페이지만 비면 말줄임 대신 그 숫자를 그대로 보여준다 (자리를 아끼지도 못하면서 클릭만 막는다).
    if (gap === 2) return [current - 1, current]
    return [ELLIPSIS, current]
  })
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const pages = buildPages(page, totalPages)

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-y-8">
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="flex h-24 w-24 items-center justify-center disabled:opacity-50"
      >
        <img src={prevArrow} alt="" className="h-24 w-24 rotate-90" />
      </button>
      {pages.map((current, index) =>
        current === ELLIPSIS ? (
          <span
            key={`${ELLIPSIS}-${index}`}
            className="flex h-24 w-24 items-center justify-center text-center text-r-14 text-primary"
          >
            ...
          </span>
        ) : (
          <button
            key={current}
            type="button"
            onClick={() => onPageChange(current)}
            className={cn(
              'flex h-24 w-24 items-center justify-center rounded-8 text-center text-r-14',
              current === page ? 'bg-primary text-white' : 'text-primary/80',
            )}
          >
            {current}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="다음 페이지"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex h-24 w-24 items-center justify-center disabled:opacity-50"
      >
        <img src={nextArrow} alt="" className="h-24 w-24 -rotate-90" />
      </button>
    </div>
  )
}
