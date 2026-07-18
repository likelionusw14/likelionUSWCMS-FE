// 백엔드 엔드포인트 경로 모음. 도메인 추가 시 여기에 정리한다.
// 스펙 기준 경로(/auth, /accounts, /admin/... 등). 공용 apiClient 의 baseURL 이 호스트를 담당한다.
export const endpoints = {
  // Health
  health: '/health',
  login: '/auth/login',

  // Cohorts (기수 선택지)
  cohorts: '/cohorts',

  // Files (관리자 파일 업로드)
  fileUploadUrls: '/admin/file-upload-urls',
  files: '/admin/files',

  // Projects (사용자 조회)
  projects: '/projects',
  project: (projectId: string) => `/projects/${projectId}`,
  // Projects (관리자 CRUD)
  adminProjects: '/admin/projects',
  adminProject: (projectId: string) => `/admin/projects/${projectId}`,

  // Resources (세션자료) — 사용자 조회
  resources: '/resources',
  resource: (resourceId: string) => `/resources/${resourceId}`,
  resourceDownloadUrl: (resourceId: string) => `/resources/${resourceId}/download-url`,
  // Resources (관리자 CRUD)
  adminResources: '/admin/resources',
  adminResource: (resourceId: string) => `/admin/resources/${resourceId}`,

  // Notices — 사용자 조회
  notices: '/notices',
  notice: (noticeId: string) => `/notices/${noticeId}`,
  // Notices (관리자 CRUD)
  adminNotices: '/admin/notices',
  adminNotice: (noticeId: string) => `/admin/notices/${noticeId}`,

  // Accounts (관리자 회원 관리)
  adminAccounts: '/admin/accounts',
  adminAccount: (userId: string) => `/admin/accounts/${userId}`,
  adminAccountStatus: (userId: string) => `/admin/accounts/${userId}/status`,
  adminAccountRole: (userId: string) => `/admin/accounts/${userId}/role`,

  // Schedules — 사용자 조회
  schedules: '/schedules',
  schedule: (scheduleId: string) => `/schedules/${scheduleId}`,
  // Schedules (관리자 CRUD)
  adminSchedules: '/admin/schedules',
  adminSchedule: (scheduleId: string) => `/admin/schedules/${scheduleId}`,

  // Attendances (관리자)
  adminAttendances: '/admin/attendances',
  adminAttendance: (attendanceId: string) => `/admin/attendances/${attendanceId}`,
  adminAttendanceCode: (scheduleId: string) => `/admin/schedules/${scheduleId}/attendance-code`,
} as const
