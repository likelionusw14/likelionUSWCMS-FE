import { Link } from 'react-router-dom'
import { cn } from '@utils'
import type { Column, DataTableProps } from '@types'

// 정렬별 셀 class (텍스트 정렬 + flex 정렬 동시).
const ALIGN = {
  left: 'justify-start text-left',
  center: 'justify-center text-center',
  right: 'justify-end text-right',
} as const

const SELECT_COL = '40px'

function templateColumns<T>(columns: Column<T>[], selectable?: boolean): string {
  const cols = columns.map((c) => (c.width ? `${c.width}px` : `minmax(${c.minWidth ?? 0}px, 1fr)`))
  return (selectable ? [SELECT_COL, ...cols] : cols).join(' ')
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  getRowHref,
  onRowClick,
  isLoading = false,
  loadingRowCount = 5,
  emptyMessage = '데이터가 없습니다.',
  showHeader = true,
  stickyHeader = false,
  rowClassName,
  className,
  ariaLabel,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  sortBy,
  sortDir,
  onSortChange,
}: DataTableProps<T>) {
  const grid = { gridTemplateColumns: templateColumns(columns, selectable) }
  const totalCols = columns.length + (selectable ? 1 : 0)
  const rowBase = 'grid h-40 items-center gap-16 border-b border-secondary-1 px-32 text-m-14 text-black'

  const allSelected = rows.length > 0 && rows.every((r) => selectedIds.includes(rowKey(r)))

  function toggleAll() {
    if (!onSelectionChange) return
    onSelectionChange(allSelected ? [] : rows.map(rowKey))
  }

  function toggleOne(id: string) {
    if (!onSelectionChange) return
    onSelectionChange(
      selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id],
    )
  }

  function handleSort(col: Column<T>) {
    if (!col.sortable || !onSortChange) return
    const next = sortBy === col.id && sortDir === 'asc' ? 'desc' : 'asc'
    onSortChange(col.id, next)
  }

  return (
    <div className={cn('flex w-full flex-col', className)} role="table" aria-label={ariaLabel}>
      {showHeader && (
        <div
          role="row"
          className={cn(
            'grid h-32 items-center gap-16 border-y border-secondary-1 px-32 text-m-14 text-primary',
            stickyHeader && 'sticky top-0 z-10 bg-white',
          )}
          style={grid}
        >
          {selectable && (
            <span className="flex justify-center">
              <input
                type="checkbox"
                className="h-16 w-16 accent-primary"
                checked={allSelected}
                onChange={toggleAll}
                aria-label="전체 선택"
              />
            </span>
          )}
          {columns.map((col) => {
            const active = sortBy === col.id
            return (
              <span
                key={col.id}
                role="columnheader"
                className={cn('flex min-w-0 items-center', ALIGN[col.align ?? 'left'], col.headerClassName)}
              >
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => handleSort(col)}
                    className="flex items-center gap-4"
                  >
                    <span className="truncate">{col.header}</span>
                    <span aria-hidden>{active ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </button>
                ) : (
                  <span className="truncate">{col.header}</span>
                )}
              </span>
            )
          })}
        </div>
      )}

      {isLoading ? (
        Array.from({ length: loadingRowCount }).map((_, i) => (
          <div key={i} className={rowBase} style={grid} aria-hidden>
            {Array.from({ length: totalCols }).map((__, j) => (
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
          const cells = (
            <>
              {selectable && (
                <span className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="h-16 w-16 accent-primary"
                    checked={selectedIds.includes(id)}
                    onChange={() => toggleOne(id)}
                    aria-label="행 선택"
                  />
                </span>
              )}
              {columns.map((col) => (
                <span
                  key={col.id}
                  role="cell"
                  className={cn('flex min-w-0 items-center', ALIGN[col.align ?? 'left'], col.className)}
                >
                  <span className={cn('min-w-0', (col.truncate ?? col.width === undefined) && 'truncate')}>
                    {col.cell ? col.cell(row, rowIndex) : col.accessor?.(row)}
                  </span>
                </span>
              ))}
            </>
          )
          const cls = cn(rowBase, 'transition-colors hover:bg-background-1', rowClassName?.(row))
          const href = getRowHref?.(row)
          if (href) {
            return (
              <Link key={id} to={href} role="row" className={cls} style={grid}>
                {cells}
              </Link>
            )
          }
          if (onRowClick) {
            return (
              <div
                key={id}
                role="row"
                tabIndex={0}
                onClick={() => onRowClick(row)}
                className={cn(cls, 'cursor-pointer')}
                style={grid}
              >
                {cells}
              </div>
            )
          }
          return (
            <div key={id} role="row" className={rowBase} style={grid}>
              {cells}
            </div>
          )
        })
      )}
    </div>
  )
}
