import type { components, paths } from './types.generated'

// 생성 타입(types.generated.ts)에서 자주 쓰는 형태를 골라 재노출하는 위치.
export type ApiPaths = paths

// 공통 enum / 페이지
export type ApiPartType = components['schemas']['PartType']
export type ApiSystemRole = components['schemas']['SystemRole']
export type ApiAccountStatus = components['schemas']['AccountStatus']
export type ApiAttendanceStatus = components['schemas']['AttendanceStatus']
export type ApiProjectType = components['schemas']['ProjectType']
export type ApiNoticeTag = components['schemas']['NoticeTag']
export type ApiFilePurpose = components['schemas']['FilePurpose']
export type ApiPageMeta = components['schemas']['PageMeta']

// Cohorts
export type ApiCohortSummary = components['schemas']['CohortSummary']
export type ApiCohortListResponse = components['schemas']['CohortListResponse']

// Files
export type ApiFileUploadUrlRequest = components['schemas']['FileUploadUrlRequest']
export type ApiFileUploadUrlResponse = components['schemas']['FileUploadUrlResponse']
export type ApiFileAssetRequest = components['schemas']['FileAssetRequest']
export type ApiFileAssetResponse = components['schemas']['FileAssetResponse']
export type ApiFileView = components['schemas']['FileView']

// Accounts (회원)
export type ApiAccountResponse = components['schemas']['AccountResponse']
export type ApiAccountPage = components['schemas']['AccountPage']
export type ApiUpdateAccountRequest = components['schemas']['UpdateAccountRequest']
export type ApiUpdateAccountStatusRequest = components['schemas']['UpdateAccountStatusRequest']
export type ApiUpdateRoleRequest = components['schemas']['UpdateRoleRequest']

// Projects
export type ApiProjectResponse = components['schemas']['ProjectResponse']
export type ApiProjectPage = components['schemas']['ProjectPage']
export type ApiCreateProjectRequest = components['schemas']['CreateProjectRequest']
export type ApiUpdateProjectRequest = components['schemas']['UpdateProjectRequest']
export type ApiProjectParticipantRequest = components['schemas']['ProjectParticipantRequest']

// Lions (사자)
export type ApiLionResponse = components['schemas']['LionResponse']
export type ApiLionPage = components['schemas']['LionPage']

// Resources (세션자료)
export type ApiLearningResourceResponse = components['schemas']['LearningResourceResponse']
export type ApiResourcePage = components['schemas']['ResourcePage']
export type ApiCreateLearningResourceRequest =
  components['schemas']['CreateLearningResourceRequest']
export type ApiUpdateLearningResourceRequest =
  components['schemas']['UpdateLearningResourceRequest']
export type ApiDownloadUrlResponse = components['schemas']['DownloadUrlResponse']

// Certificates (활동증명서)
export type ApiCertificatePreviewResponse = components['schemas']['CertificatePreviewResponse']
export type ApiCertificateResponse = components['schemas']['CertificateResponse']

// Notices
export type ApiNoticeResponse = components['schemas']['NoticeResponse']
export type ApiNoticePage = components['schemas']['NoticePage']
export type ApiCreateNoticeRequest = components['schemas']['CreateNoticeRequest']
export type ApiUpdateNoticeRequest = components['schemas']['UpdateNoticeRequest']

// Schedules (일정)
export type ApiScheduleResponse = components['schemas']['ScheduleResponse']
export type ApiCreateScheduleRequest = components['schemas']['CreateScheduleRequest']
export type ApiUpdateScheduleRequest = components['schemas']['UpdateScheduleRequest']

// Attendances (출결)
export type ApiAttendanceResponse = components['schemas']['AttendanceResponse']
export type ApiAttendancePage = components['schemas']['AttendancePage']
export type ApiUpdateAttendanceRequest = components['schemas']['UpdateAttendanceRequest']
export type ApiAttendanceCodeResponse = components['schemas']['AttendanceCodeResponse']
