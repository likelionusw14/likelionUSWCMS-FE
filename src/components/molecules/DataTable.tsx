import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@utils'
import type { Column, DataTableProps } from '@types'

// 정렬별 셀 class (텍스트 정렬 + flex 정렬 동시).
const ALIGN = {
  left: 'justify-start text-left',
  center: 'justify-center text-center',
  right: 'justify-end text-right',
} as const

// 열 폭 — 고정폭(px)이면 w=width·shrink-0, 없으면 남는 폭 차지(fill, minWidth~280 사이).
// Figma 목록은 flex justify-between + 셀 고정폭 구조라 grid 대신 flex 로 재현한다.
function cellStyle<T>(col: Column<T>): CSSProperties {
  return col.width !== undefined
    ? { width: col.width, flexShrink: 0 }
    : { flex: '1 1 0', minWidth: col.minWidth ?? 64, maxWidth: 280 }
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  getRowHref,
  isLoading = false,
  loadingRowCount = 5,
  emptyMessage = '데이터가 없습니다.',
  rowClassName,
  className,
  ariaLabel,
  minWidth,
}: DataTableProps<T>) {
  const rowBase =
    'flex h-40 items-center justify-between border-b border-secondary-1 px-32 text-m-14 text-black'
  const autoMinWidth = columns.reduce((sum, c) => sum + (c.width ?? c.minWidth ?? 120), 0) + 64
  const tableMinWidth = minWidth ?? autoMinWidth

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div
        className={cn('flex w-full flex-col', className)}
        role="table"
        aria-label={ariaLabel}
        style={{ minWidth: tableMinWidth }}
      >
        <div
          role="row"
          className="flex h-32 items-center justify-between border-y border-secondary-1 px-32 text-m-14 text-primary"
        >
          {columns.map((col) => (
            <span
              key={col.id}
              role="columnheader"
              className={cn('flex min-w-0 items-center', ALIGN[col.align ?? 'left'], col.headerClassName)}
              style={cellStyle(col)}
            >
              <span className="truncate">{col.header}</span>
            </span>
          ))}
        </div>

        {isLoading ? (
          Array.from({ length: loadingRowCount }).map((_, i) => (
            <div key={i} className={rowBase} aria-hidden>
              {columns.map((col) => (
                <span key={col.id} style={cellStyle(col)} className="flex min-w-0 items-center">
                  <span className="h-14 w-full animate-pulse rounded-4 bg-gray-100" />
                </span>
              ))}
            </div>
          ))
        ) : rows.length === 0 ? (
          <div className="flex h-40 items-center justify-center border-b border-secondary-1 px-32 text-m-14 text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          rows.map((row, rowIndex) => {
            const id = rowKey(row)
            const cells = columns.map((col) => (
              <span
                key={col.id}
                role="cell"
                className={cn('flex min-w-0 items-center', ALIGN[col.align ?? 'left'], col.className)}
                style={cellStyle(col)}
              >
                <span className={cn('min-w-0', (col.truncate ?? col.width === undefined) && 'truncate')}>
                  {col.cell ? col.cell(row, rowIndex) : col.accessor?.(row)}
                </span>
              </span>
            ))
            const href = getRowHref?.(row)
            if (href) {
              const cls = cn(rowBase, 'transition-colors hover:bg-background-1', rowClassName?.(row))
              return (
                <Link key={id} to={href} role="row" className={cls}>
                  {cells}
                </Link>
              )
            }
            return (
              <div key={id} role="row" className={cn(rowBase, rowClassName?.(row))}>
                {cells}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
