// 활동증명서 반영 정보(화면모델).
export interface CertificateInfo {
  name: string
  // 학번.
  studentId: string
  // 파트 라벨.
  part: string
  // 기수 라벨 ("14기").
  cohort: string
  // 활동기간 표시 ("2026.03 ~ 2026.03", 없으면 '-').
  activityPeriod: string
}

// 발급 플로우 상태. idle=발급 전, issuing=발급 중(로딩), issued=발급 완료, downloaded=다운로드 완료.
export type CertificateFlowState = 'idle' | 'issuing' | 'issued' | 'downloaded'
