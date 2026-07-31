import { apiClient, endpoints } from '@api'
import type {
  ApiCertificatePreviewResponse,
  ApiCertificateResponse,
  ApiDownloadUrlResponse,
} from '@api'

// 활동증명서 반영 정보(본인) 조회.
export async function fetchCertificatePreview(): Promise<ApiCertificatePreviewResponse> {
  const { data } = await apiClient.get<ApiCertificatePreviewResponse>(endpoints.certificatePreview)
  return data
}

// 활동증명서 발급 — 서버가 최신 정보를 스냅샷. 중복 방지 Idempotency-Key 동봉.
export async function issueCertificate(): Promise<ApiCertificateResponse> {
  const { data } = await apiClient.post<ApiCertificateResponse>(endpoints.certificates, undefined, {
    headers: { 'Idempotency-Key': crypto.randomUUID() },
  })
  return data
}

// 다운로드 URL(짧은 만료 Presigned) 조회.
export async function fetchCertificateDownloadUrl(
  certificateId: string,
): Promise<ApiDownloadUrlResponse> {
  const { data } = await apiClient.get<ApiDownloadUrlResponse>(
    endpoints.certificateDownloadUrl(certificateId),
  )
  return data
}
