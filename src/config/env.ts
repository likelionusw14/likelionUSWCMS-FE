// 환경 변수 단일 접근 지점. 컴포넌트/모듈에서 import.meta.env 를 직접 읽지 말고 여기서 가져온다.
export const env = {
  /** 백엔드 API Base URL. 빈 문자열이면 백엔드 미연동 상태로 간주. */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
} as const

/** 백엔드 연동 여부 (VITE_API_BASE_URL 설정 시 true) */
export const isBackendConnected = env.apiBaseUrl.length > 0
