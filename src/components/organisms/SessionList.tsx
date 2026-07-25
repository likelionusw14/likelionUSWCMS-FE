import { useNavigate } from 'react-router-dom'
import { DataTable } from '@molecules'
import { ListSection } from '@organisms'
import type { Column, Session, SessionListProps } from '@types'

// 세션자료 목록 — Session 라벨 + 건수·등록 + 표(파일명·주차·파트) + 페이지네이션. 행 클릭 시 상세.
// 모바일(375) 대응 — 파일명 열 minWidth 를 Figma 모바일(1205:16562, 파일명 280px + 표 가로스크롤)에 맞춰 280 으로 올린다.
// 64 이면 375 폭에서 파일명이 64px 로 찌그러져 읽을 수 없다. maxWidth 가 이미 280 이라 데스크톱 폭은 그대로다.
const COLUMNS: Column<Session>[] = [
  { id: 'fileName', header: '파일명', accessor: (s) => s.fileName, minWidth: 280 },
  { id: 'week', header: '주차', accessor: (s) => s.week, width: 96, align: 'center' },
  { id: 'part', header: '파트', accessor: (s) => s.part, width: 96, align: 'center' },
]

export function SessionList({
  sessions,
  totalCount,
  page,
  totalPages,
  onPageChange,
}: SessionListProps) {
  const navigate = useNavigate()

  return (
    <ListSection
      header={<p className="text-m-20 text-primary">Session</p>}
      totalCount={totalCount}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onAdd={() => navigate('/admin/sessions/new')}
    >
      <DataTable
        columns={COLUMNS}
        rows={sessions}
        rowKey={(s) => s.id}
        getRowHref={(s) => `/admin/sessions/${s.id}`}
        ariaLabel="세션자료 목록"
      />
    </ListSection>
  )
}
