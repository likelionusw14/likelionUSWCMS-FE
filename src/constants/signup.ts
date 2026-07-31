import type { SelectOption } from '@types'
import { COHORT } from './brand'

// 기수·파트 선택지 — Figma 기수·파트 드롭다운의 선택지.
// 기수는 현재 기수 하나뿐이다 (지난 기수까지 다루게 되면 백엔드 값으로 채운다).
export const COHORT_OPTIONS: SelectOption[] = [{ value: `${COHORT}기`, label: `${COHORT}기` }]

// 관리 화면(세션·출결·회원)의 파트 필터·폼 선택지. value 가 한글 라벨이라
// 백엔드로 보낼 때는 toPartCode 로 PartType enum 으로 옮긴다.
export const PART_OPTIONS: SelectOption[] = [
  { value: '기획', label: '기획' },
  { value: '디자인', label: '디자인' },
  { value: '프론트엔드', label: '프론트엔드' },
  { value: '백엔드', label: '백엔드' },
]

// 가입 폼 전용 파트 선택지 — POST /accounts 가 PartType enum 을 그대로 받으므로
// value 를 enum 으로 둔다(변환 단계 없이 그대로 제출). COMMON(공통)은 운영진에게만
// 붙는 값이라 가입 폼에는 노출하지 않는다.
export const SIGNUP_PART_OPTIONS: SelectOption[] = [
  { value: 'PLANNING', label: '기획' },
  { value: 'DESIGN', label: '디자인' },
  { value: 'FRONTEND', label: '프론트엔드' },
  { value: 'BACKEND', label: '백엔드' },
]

// 가입 신청(POST /accounts) 실패 사유. 명세가 상태 코드로 구분한다.
// 401 은 명세에 없지만 onboarding_session 쿠키가 없거나 만료되면 올 수 있어 함께 받는다.
export const SIGNUP_ERROR_MESSAGE: Record<number, string> = {
  401: '가입 세션이 만료되었습니다. 카카오 로그인부터 다시 진행해주세요.',
  409: '이미 가입 신청이 접수된 계정입니다.',
  422: '입력값을 다시 확인해주세요.',
  429: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
}

export const SIGNUP_ERROR_FALLBACK = '가입 신청에 실패했습니다. 잠시 후 다시 시도해주세요.'

// 기수 선택지가 비어 제출 자체가 불가능한 상태 — 왜 저장이 눌리지 않는지 알려준다.
export const SIGNUP_COHORT_UNAVAILABLE =
  '기수 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'
