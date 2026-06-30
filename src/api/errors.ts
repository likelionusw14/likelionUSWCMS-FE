import axios from 'axios'

export interface NormalizedError {
  /** HTTP 상태 코드. 네트워크/비-HTTP 오류면 null. */
  status: number | null
  /** 사용자에게 보여줄 한국어 메시지. */
  message: string
}

// 어떤 형태의 오류든 화면에서 쓰기 좋은 { status, message } 로 정규화한다.
export function normalizeError(error: unknown): NormalizedError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    return {
      status: error.response?.status ?? null,
      message: data?.message ?? error.message,
    }
  }
  if (error instanceof Error) {
    return { status: null, message: error.message }
  }
  return { status: null, message: '알 수 없는 오류가 발생했습니다.' }
}
