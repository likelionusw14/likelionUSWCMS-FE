import { apiClient, endpoints } from '@api'
import type {
  ApiFileAssetRequest,
  ApiFileAssetResponse,
  ApiFilePurpose,
  ApiFileUploadUrlResponse,
} from '@api'

// 관리자 파일 업로드 3단계 흐름:
// 1) createFileUploadUrl 로 Presigned PUT URL 발급
// 2) 발급된 URL 에 파일 바이트를 직접 PUT (requiredHeaders 포함)
// 3) completeFileUpload 로 업로드 검증 + FileAsset 등록 → fileAssetId 획득
// 프로젝트 썸네일·세션자료·공지 이미지가 이 흐름으로 fileAssetId 를 얻는다.

export async function requestFileUploadUrl(params: {
  purpose: ApiFilePurpose
  file: File
  checksumSha256?: string
}): Promise<ApiFileUploadUrlResponse> {
  const body = {
    purpose: params.purpose,
    originalFileName: params.file.name,
    mimeType: params.file.type || 'application/octet-stream',
    sizeBytes: params.file.size,
    ...(params.checksumSha256 ? { checksumSha256: params.checksumSha256 } : {}),
  }
  const { data } = await apiClient.post<ApiFileUploadUrlResponse>(endpoints.fileUploadUrls, body)
  return data
}

export async function putFileToStorage(
  upload: ApiFileUploadUrlResponse,
  file: File,
): Promise<void> {
  // Presigned URL 은 외부(S3) 주소이므로 공용 apiClient(Authorization/baseURL) 대신 fetch 로 직접 PUT.
  await fetch(upload.uploadUrl, {
    method: 'PUT',
    headers: { ...upload.requiredHeaders },
    body: file,
  })
}

export async function completeFileUpload(
  body: ApiFileAssetRequest,
): Promise<ApiFileAssetResponse> {
  const { data } = await apiClient.post<ApiFileAssetResponse>(endpoints.files, body)
  return data
}

// 편의 함수: 업로드 URL 발급 → PUT → 완료 검증까지 한 번에 처리하고 fileAssetId 를 반환한다.
export async function uploadFile(purpose: ApiFilePurpose, file: File): Promise<number> {
  const upload = await requestFileUploadUrl({ purpose, file })
  await putFileToStorage(upload, file)
  const asset = await completeFileUpload({
    purpose,
    objectKey: upload.objectKey,
    originalFileName: file.name,
    mimeType: file.type || 'application/octet-stream',
    sizeBytes: file.size,
  })
  return asset.fileAssetId
}
