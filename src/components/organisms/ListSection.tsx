import plusIcon from '@/assets/icons/plus.svg'
import { Pagination } from '@molecules'
import { cn } from '@utils'
import type { ListSectionProps } from '@types'

// 목록 카드 셸 — 제목 슬롯 + 총건수(+선택 페이지정보)·추가버튼 + 콘텐츠(DataTable) + 페이지네이션.
export function ListSection({
  header,
  totalCount,
  page,
  totalPages,
  onPageChange,
  onAdd,
  children,
  className,
}: ListSectionProps) {
  const countText =
    page !== undefined && totalPages !== undefined
      ? `총 ${totalCount}건 (${page}/${totalPages} page)`
      : `총 ${totalCount}건`

  return (
    <section className={cn('flex w-full flex-col gap-24 rounded-16 bg-white px-32 py-24', className)}>
      {header}
      <div className="flex items-center justify-between">
        <p className="text-m-14 text-black">{countText}</p>
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            aria-label="추가"
            className="flex h-24 w-40 items-center justify-center"
          >
            <img src={plusIcon} alt="" className="h-16 w-16" />
          </button>
        )}
      </div>
      {children}

      {page !== undefined && totalPages !== undefined && onPageChange !== undefined && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </section>
  )
}
