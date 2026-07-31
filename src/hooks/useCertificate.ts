import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchCertificatePreview, issueCertificate } from '@api'
import type { ApiCertificatePreviewResponse, ApiPartType } from '@api'
import { isBackendConnected } from '@config'
import type { CertificateFlowState, CertificateInfo } from '@types'

const PART_LABEL: Record<ApiPartType, string> = {
  PLANNING: '기획',
  DESIGN: '디자인',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  COMMON: '공통',
}

// mock 본인 정보(preview 는 모든 필드를 제공 — 그대로 채운다).
const MOCK_PREVIEW: ApiCertificatePreviewResponse = {
  name: '김멋사',
  department: '컴퓨터학부',
  studentId: '23099009',
  cohort: { cohortId: 14, number: 14, name: '14기' },
  part: 'FRONTEND',
  activityStartedAt: '2026-03-01',
  activityEndedAt: '2026-08-31',
}

// 'YYYY-MM-DD' → 'YYYY.MM'.
function toYearMonth(date: string | null | undefined): string {
  if (!date) return ''
  const [year, month] = date.split('-')
  return `${year}.${month}`
}

function toCertificateInfo(response: ApiCertificatePreviewResponse): CertificateInfo {
  const start = toYearMonth(response.activityStartedAt)
  const end = toYearMonth(response.activityEndedAt)
  const activityPeriod = start && end ? `${start} ~ ${end}` : start || end || '-'
  return {
    name: response.name,
    studentId: response.studentId,
    part: PART_LABEL[response.part],
    cohort: response.cohort.name,
    activityPeriod,
  }
}

// 활동증명서 반영 정보 조회. 미연동 시 mock.
export function useCertificatePreview(): { data: CertificateInfo | undefined; isLoading: boolean } {
  const request = useQuery({
    queryKey: ['certificate-preview'],
    queryFn: fetchCertificatePreview,
    enabled: isBackendConnected,
  })
  const response = isBackendConnected ? request.data : MOCK_PREVIEW
  return {
    data: response ? toCertificateInfo(response) : undefined,
    isLoading: isBackendConnected && request.isLoading,
  }
}

// mock 발급 소요 시간(지침: 5초 타임아웃).
const MOCK_ISSUE_MS = 5000

// 발급 플로우 상태머신 — 발급(5초 로딩) → 완료 → 다운로드 완료 → 홈.
export function useCertificateIssue(): {
  state: CertificateFlowState
  issue: () => void
  download: () => void
  goHome: () => void
} {
  const navigate = useNavigate()
  const [state, setState] = useState<CertificateFlowState>('idle')
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const issue = useCallback(() => {
    setState('issuing')
    if (!isBackendConnected) {
      timerRef.current = window.setTimeout(() => setState('issued'), MOCK_ISSUE_MS)
      return
    }
    issueCertificate()
      .then(() => setState('issued'))
      .catch(() => setState('idle'))
  }, [])

  // 지침: 실제 다운로드 없이 다음 팝업으로 이동.
  const download = useCallback(() => setState('downloaded'), [])

  const goHome = useCallback(() => {
    setState('idle')
    navigate('/app')
  }, [navigate])

  return { state, issue, download, goHome }
}
