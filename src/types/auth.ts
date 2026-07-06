import type { Entity } from './common'

// 사용자 역할. 백엔드 역할 문자열은 로그인 seam 에서 이 식별자로 매핑한다.
export type Role = 'GUEST' | 'MEMBER' | 'STAFF'

// 라우팅 영역.
export type AreaType = 'common' | 'user' | 'admin'

// 로그인된 사용자 (Entity: id 필수).
export interface User extends Entity {
  name: string
  role: Role
}
