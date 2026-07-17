// 백엔드 엔드포인트 경로 모음. 도메인 추가 시 여기에 정리한다.
export const endpoints = {
  health: '/health',
  login: '/auth/login',
  projects: '/api/projects',
  project: (projectId: string) => `/api/projects/${projectId}`,
} as const
