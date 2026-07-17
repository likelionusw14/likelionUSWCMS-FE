import { useState, useEffect } from 'react'
import type { UsePaginationOptions, UsePaginationResult } from '@types'

export function usePagination({
  totalItems,
  pageSize = 20,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationResult {
  const [page, setPage] = useState(initialPage)
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  // 필터로 인해 전체 개수가 줄었을 때 현재 페이지 보정
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [totalPages, page])

  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize

  function slice<T>(array: T[]): T[] {
    return array.slice(startIndex, endIndex)
  }

  return {
    page,
    setPage,
    totalPages,
    startIndex,
    endIndex,
    slice,
  }
}
