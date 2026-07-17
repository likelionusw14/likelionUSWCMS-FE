import type { ReactNode } from 'react'

// 공통 데이터 테이블 — Figma 관리자 목록 5종(회원·승인대기·출결·공지·세션)을 하나로 커버.
// 화면마다 열 구성/셀 종류(텍스트·링크·상태·버튼·체크박스)가 달라 컬럼 config 로 구동한다.

export type ColumnAlign = 'left' | 'center' | 'right'

export interface Column<T> {
  // React key + 정렬 식별자.
  id: string
  // 헤더 라벨. 생략 시 빈 헤더(체크박스/액션 열 등).
  header?: ReactNode
  // 기본 텍스트 셀 값. cell 이 있으면 무시된다.
  accessor?: (row: T) => ReactNode
  // 커스텀 셀 — 링크/상태 배지/버튼 그룹/체크박스 등.
  cell?: (row: T, rowIndex: number) => ReactNode
  // 고정 너비(px). 없으면 남는 폭을 차지(fill)한다.
  width?: number
  // fill 열의 최소 너비(px).
  minWidth?: number
  // 셀·헤더 정렬. 기본 left (메타 열은 center 로 지정).
  align?: ColumnAlign
  // 넘칠 때 말줄임. 기본값: fill 열이면 true.
  truncate?: boolean
  // 셀 공통 class (조건부 색 등은 cell 에서 처리).
  className?: string
  // 헤더 셀 class.
  headerClassName?: string
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  // 행 고유 키(선택 상태·React key).
  rowKey: (row: T) => string

  // 행 클릭 → 상세로 이동(Link).
  getRowHref?: (row: T) => string

  // 로딩 중 스켈레톤 행 표시(팀 데이터훅 { data, isLoading } 계약과 연동).
  isLoading?: boolean
  loadingRowCount?: number
  // 데이터 없음 표시.
  emptyMessage?: ReactNode

  // 조건부 행 스타일(예: 필독 강조).
  rowClassName?: (row: T) => string
  // 컨테이너 class.
  className?: string
  // 접근성 라벨.
  ariaLabel?: string
  // 이보다 좁아지면 가로 스크롤(스크롤바 숨김). 미지정 시 컬럼 폭 합으로 자동 계산.
  minWidth?: number
}
