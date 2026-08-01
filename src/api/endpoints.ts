// 백엔드 엔드포인트 경로 모음. 도메인 추가 시 여기에 정리한다.
// 스펙 기준 경로(/auth, /accounts, /admin/... 등). 공용 apiClient 의 baseURL 이 호스트를 담당한다.
export const endpoints = {
  // Health
  health: '/health',
  login: '/auth/login',

  // Auth (카카오 OIDC — 교환·검증은 백엔드가 수행하는 BFF 구조)
  // kakaoLogin 은 fetch 대상이 아니라 브라우저를 통째로 보내는 이동 목적지다.
  kakaoLogin: '/api/auth/kakao/login',
  authTokens: '/api/auth/tokens',
  authSession: '/api/auth/session',

  // Accounts (가입 신청 — onboarding 세션으로 추가정보 제출)
  accounts: '/api/accounts',

  // Cohorts (기수 선택지)
  cohorts: '/api/cohorts',

  // Certificates (활동증명서 — 사용자)
  certificatePreview: '/api/certificates/preview',
  certificates: '/api/certificates',
  certificateDownloadUrl: (certificateId: string) =>
    `/api/certificates/${certificateId}/download-url`,

  // Lions (사자 목록 — 사용자 조회)
  lions: '/api/lions',

  // Files (관리자 파일 업로드)
  fileUploadUrls: '/api/admin/file-upload-urls',
  files: '/api/admin/files',

  // Projects (사용자 조회)
  projects: '/api/projects',
  project: (projectId: string) => `/api/projects/${projectId}`,
  // Projects (관리자 CRUD)
  adminProjects: '/api/admin/projects',
  adminProject: (projectId: string) => `/api/admin/projects/${projectId}`,

  // Resources (세션자료) — 사용자 조회
  resources: '/api/resources',
  resource: (resourceId: string) => `/api/resources/${resourceId}`,
  resourceDownloadUrl: (resourceId: string) => `/api/resources/${resourceId}/download-url`,
  // Resources (관리자 CRUD)
  adminResources: '/api/admin/resources',
  adminResource: (resourceId: string) => `/api/admin/resources/${resourceId}`,

  // Notices — 사용자 조회
  notices: '/api/notices',
  notice: (noticeId: string) => `/api/notices/${noticeId}`,
  // Notices (관리자 CRUD)
  adminNotices: '/api/admin/notices',
  adminNotice: (noticeId: string) => `/api/admin/notices/${noticeId}`,

  // Accounts (관리자 회원 관리)
  adminAccounts: '/api/admin/accounts',
  adminAccount: (userId: string) => `/api/admin/accounts/${userId}`,
  // 가입 승인·거절은 상태 단일 엔드포인트(/status)에서 동작별 두 경로로 분리됐다.
  adminAccountApproval: (userId: string) => `/api/admin/accounts/${userId}/approval`,
  adminAccountRejection: (userId: string) => `/api/admin/accounts/${userId}/rejection`,
  adminAccountRole: (userId: string) => `/api/admin/accounts/${userId}/role`,

  // Schedules — 사용자 조회
  schedules: '/api/schedules',
  schedule: (scheduleId: string) => `/api/schedules/${scheduleId}`,
  // Schedules (관리자 CRUD)
  adminSchedules: '/api/admin/schedules',
  adminSchedule: (scheduleId: string) => `/api/admin/schedules/${scheduleId}`,

  // Attendances (사용자 — 본인 출결/코드 인증)
  attendances: '/api/attendances',
  attendanceCheckIn: (scheduleId: string) => `/api/schedules/${scheduleId}/attendance-check-ins`,

  // Attendances (관리자)
  adminAttendances: '/api/admin/attendances',
  adminAttendance: (attendanceId: string) => `/api/admin/attendances/${attendanceId}`,
  adminAttendanceCode: (scheduleId: string) => `/api/admin/schedules/${scheduleId}/attendance-code`,
} as const
