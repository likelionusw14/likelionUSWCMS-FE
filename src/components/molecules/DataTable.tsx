import { Link } from 'react-router-dom'
import { cn } from '@utils'
import type { Column, DataTableProps } from '@types'

// 정렬별 셀 class (텍스트 정렬 + flex 정렬 동시).
const ALIGN = {
  left: 'justify-start text-left',
  center: 'justify-center text-center',
  right: 'justify-end text-right',
} as const

function templateColumns<T>(columns: Column<T>[]): string {
  return columns.map((c) => (c.width ? `${c.width}px` : `minmax(${c.minWidth ?? 0}px, 1fr)`)).join(' ')
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
  const grid = { gridTemplateColumns: templateColumns(columns) }
  const rowBase = 'grid h-40 items-center gap-16 border-b border-secondary-1 px-32 text-m-14 text-black'
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
          className="grid h-32 items-center gap-16 border-y border-secondary-1 px-32 text-m-14 text-primary"
          style={grid}
        >
          {columns.map((col) => (
            <span
              key={col.id}
              role="columnheader"
              className={cn('flex min-w-0 items-center', ALIGN[col.align ?? 'left'], col.headerClassName)}
            >
              <span className="truncate">{col.header}</span>
            </span>
          ))}
        </div>

        {isLoading ? (
          Array.from({ length: loadingRowCount }).map((_, i) => (
            <div key={i} className={rowBase} style={grid} aria-hidden>
              {Array.from({ length: columns.length }).map((__, j) => (
                <span key={j} className="h-14 animate-pulse rounded-4 bg-gray-100" />
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
                <Link key={id} to={href} role="row" className={cls} style={grid}>
                  {cells}
                </Link>
              )
            }
            return (
              <div key={id} role="row" className={cn(rowBase, rowClassName?.(row))} style={grid}>
                {cells}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
