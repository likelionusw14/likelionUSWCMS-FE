import { useNavigate } from 'react-router-dom'
import { Checkbox } from '@atoms'
import { DataTable } from '@molecules'
import { ListSection } from '@organisms'
import type { Column, Notice, NoticeListProps } from '@types'

// 공지 목록 — Notice 라벨 + 건수·등록 + 표(필독·제목·태그·작성일) + 페이지네이션. 행 클릭 시 상세. Figma 563:8345.
// 모바일(375) 대응 — 제목 열 minWidth 를 Figma 모바일(1205:18908, 제목 280px + 표 가로스크롤)에 맞춰 280 으로 올린다.
// 64 이면 375 폭에서 제목이 64px 로 찌그러져 읽을 수 없다. maxWidth 가 이미 280 이라 데스크톱 폭은 그대로다.
const COLUMNS: Column<Notice>[] = [
  {
    id: 'mustRead',
    width: 37,
    align: 'center',
    cell: (n) =>
      n.mustRead ? (
        <span className="pointer-events-none">
          <Checkbox checked onChange={() => {}} variant="round" ariaLabel="필독" />
        </span>
      ) : null,
  },
  { id: 'title', header: '제목', accessor: (n) => n.title, minWidth: 280, align: 'center' },
  // 태그 열은 Figma 가 48px(더미 '000' 기준)이지만 실제 라벨은 '홍보·이벤트' 73px 라 96px 로 넓힌다
  // (주차·파트·작성일과 같은 스케일). 48 이면 두 줄로 접혀 40px 행을 넘친다.
  { id: 'tag', header: '태그', accessor: (n) => n.tag, width: 96, align: 'center' },
  { id: 'createdAt', header: '작성일', accessor: (n) => n.createdAt, width: 96, align: 'center' },
]

export function NoticeList({
  notices,
  totalCount,
  page,
  totalPages,
  onPageChange,
}: NoticeListProps) {
  const navigate = useNavigate()

  return (
    <ListSection
      header={<p className="text-m-20 text-primary">Notice</p>}
      totalCount={totalCount}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onAdd={() => navigate('/admin/notices/new')}
    >
      <DataTable
        columns={COLUMNS}
        rows={notices}
        rowKey={(n) => n.id}
        getRowHref={(n) => `/admin/notices/${n.id}`}
        ariaLabel="공지 목록"
        tightMobileEdge
      />
    </ListSection>
  )
}
