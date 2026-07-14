import prevArrow from '@/assets/icons/page-arrow-prev.svg'
import nextArrow from '@/assets/icons/page-arrow-next.svg'
import { cn } from '@utils'
import type { PaginationProps } from '@types'

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex w-full items-center justify-center">
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="flex h-24 w-24 items-center justify-center disabled:opacity-50"
      >
        <img src={prevArrow} alt="" className="h-24 w-24 rotate-90" />
      </button>
      {pages.map((current) => (
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
      ))}
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
