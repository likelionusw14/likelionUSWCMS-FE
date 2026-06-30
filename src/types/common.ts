// 모든 엔티티의 공통 형태 (컨벤션: 모든 엔티티는 id: string 필수).
export interface Entity {
  id: string
}

// 백엔드 seam 훅의 표준 반환 형태. 컴포넌트는 이 모양에만 의존한다.
export interface QueryResult<T> {
  data: T
  isLoading: boolean
}
