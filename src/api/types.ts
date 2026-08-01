import type { components, paths } from './types.generated'

// 생성 타입(types.generated.ts)에서 자주 쓰는 형태를 골라 재노출하는 위치.
export type ApiPaths = paths

type Schemas = components['schemas']

// 운영 서버 스펙(springdoc /v3/api-docs)은 응답 스키마에 required 를 하나도 싣지 않아
// 모든 응답 필드가 optional 로 생성된다. 실제 응답에는 값이 채워져 오므로 응답 타입은
// 이 헬퍼로 optional 을 벗겨 재노출하고, 화면 코드가 매 필드마다 undefined 를 다루지 않게 한다.
// (요청 바디는 required 가 정상이라 그대로 쓴다.)
// 없을 수 있는 필드가 실제로 생기면 여기서 개별 타입에 다시 optional 을 준다.
type Res<T> = T extends (infer U)[]
  ? Res<U>[]
  : T extends object
    ? { [K in keyof T]-?: Res<NonNullable<T[K]>> }
    : T

// 스펙이 nullable 을 전혀 표현하지 않는다(springdoc 이 Java 의 null 허용을 안 싣는다).
// 실제로 null 이 오는 응답 필드는 Nullable 로 되살리고, 요청 바디의 선택 필드는 Req 로
// null 을 허용한다 — PATCH 에서 null 은 '미전달(유지)'과 다른 '값 비우기' 신호다.
type Nullable<T, K extends keyof T> = Omit<T, K> & { [P in K]: T[P] | null }

type Req<T> = { [K in keyof T]: undefined extends T[K] ? T[K] | null : T[K] }

// 공통 enum / 페이지
// 스펙에 이름 붙은 enum 스키마가 없어(인라인 생성) 사용처 속성에서 유니온을 끌어온다.
export type ApiPartType = NonNullable<Schemas['AccountResponse']['part']>
export type ApiSystemRole = NonNullable<Schemas['AccountResponse']['role']>
export type ApiAccountStatus = NonNullable<Schemas['AccountResponse']['status']>
export type ApiAttendanceStatus = NonNullable<Schemas['AttendanceResponse']['status']>
export type ApiProjectType = NonNullable<Schemas['ProjectResponse']['projectType']>
export type ApiNoticeTag = NonNullable<Schemas['NoticeResponse']['tag']>
export type ApiFilePurpose = NonNullable<Schemas['FileAssetRequest']['purpose']>
export type ApiPageMeta = Res<Schemas['PageMeta']>

// Cohorts
export type ApiCohortSummary = Res<Schemas['CohortSummary']>
// GET /cohorts 는 배열을 그대로 돌려준다. fetchCohorts 가 { items } 로 정규화하므로
// 스펙에 대응 스키마가 없어 여기서 정의한다.
export interface ApiCohortListResponse {
  items: ApiCohortSummary[]
}

// Files
export type ApiFileUploadUrlRequest = Req<Schemas['FileUploadUrlRequest']>
export type ApiFileUploadUrlResponse = Res<Schemas['FileUploadUrlResponse']>
export type ApiFileAssetRequest = Req<Schemas['FileAssetRequest']>
export type ApiFileAssetResponse = Res<Schemas['FileAssetResponse']>
export type ApiFileView = Res<Schemas['FileView']>

// Auth (카카오 OIDC)
export type ApiAccessTokenResponse = Res<Schemas['AccessTokenResponse']>

// Accounts (회원)
export type ApiCreateAccountRequest = Req<Schemas['CreateAccountRequest']>
export type ApiAccountResponse = Nullable<Res<Schemas['AccountResponse']>, 'rejectionReason'>
export interface ApiAccountPage {
  items: ApiAccountResponse[]
  page: ApiPageMeta
}
export type ApiUpdateAccountRequest = Req<Schemas['UpdateAccountRequest']>
export type ApiUpdateRoleRequest = Req<Schemas['UpdateRoleRequest']>
export type ApiApproveAccountRequest = Req<Schemas['ApproveAccountRequest']>
export type ApiRejectAccountRequest = Req<Schemas['RejectAccountRequest']>

// Projects
export type ApiProjectResponse = Nullable<
  Res<Schemas['ProjectResponse']>,
  'deployUrl' | 'githubUrl' | 'thumbnail'
>
export interface ApiProjectPage {
  items: ApiProjectResponse[]
  page: ApiPageMeta
}
export type ApiCreateProjectRequest = Req<Schemas['CreateProjectRequest']>
export type ApiUpdateProjectRequest = Req<Schemas['UpdateProjectRequest']>
export type ApiProjectParticipantResponse = Res<Schemas['ProjectParticipantResponse']>
export type ApiProjectParticipantRequest = Req<Schemas['ProjectParticipantRequest']>

// Lions (사자)
export type ApiLionResponse = Res<Schemas['LionResponse']>
export interface ApiLionPage {
  items: ApiLionResponse[]
  page: ApiPageMeta
}

// Resources (세션자료)
export type ApiLearningResourceResponse = Res<Schemas['LearningResourceResponse']>
export interface ApiResourcePage {
  items: ApiLearningResourceResponse[]
  page: ApiPageMeta
}
export type ApiCreateLearningResourceRequest = Req<Schemas['CreateLearningResourceRequest']>
export type ApiUpdateLearningResourceRequest = Req<Schemas['UpdateLearningResourceRequest']>
export type ApiDownloadUrlResponse = Res<Schemas['DownloadUrlResponse']>

// Certificates (활동증명서)
export type ApiCertificatePreviewResponse = Res<Schemas['CertificatePreviewResponse']>
export type ApiCertificateResponse = Res<Schemas['CertificateResponse']>

// Notices
// image 는 첨부가 없는 공지에서 비어 온다.
export type ApiNoticeResponse = Nullable<Res<Schemas['NoticeResponse']>, 'externalUrl' | 'image'>
export interface ApiNoticePage {
  items: ApiNoticeResponse[]
  page: ApiPageMeta
}
export type ApiCreateNoticeRequest = Req<Schemas['CreateNoticeRequest']>
export type ApiUpdateNoticeRequest = Req<Schemas['UpdateNoticeRequest']>

// Schedules (일정)
export type ApiScheduleResponse = Nullable<
  Res<Schemas['ScheduleResponse']>,
  'description' | 'startTime' | 'location'
>
export type ApiCreateScheduleRequest = Req<Schemas['CreateScheduleRequest']>
export type ApiUpdateScheduleRequest = Req<Schemas['UpdateScheduleRequest']>

// Attendances (출결)
export type ApiAttendanceResponse = Nullable<
  Res<Schemas['AttendanceResponse']>,
  'checkedAt' | 'memo'
>
export interface ApiAttendancePage {
  items: ApiAttendanceResponse[]
  page: ApiPageMeta
}
export type ApiUpdateAttendanceRequest = Req<Schemas['UpdateAttendanceRequest']>
export type ApiAttendanceCodeResponse = Res<Schemas['AttendanceCodeResponse']>
