// 가입 추가정보 입력 폼 값.
// 입력·셀렉트에서 오는 값이라 전부 문자열로 담고, 제출 시 API 타입(cohortId: number,
// part: PartType)으로 변환한다.
// - cohortId: 백엔드 기수 식별자 (표시용 "14기" 가 아니라 id)
// - part: 백엔드 PartType enum 값 (PLANNING/DESIGN/FRONTEND/BACKEND)
export interface SignupProfile {
  name: string
  department: string
  studentId: string
  cohortId: string
  part: string
}
