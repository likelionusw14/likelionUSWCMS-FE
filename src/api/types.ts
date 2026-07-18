import type { components, paths } from './types.generated'

// 생성 타입(types.generated.ts)에서 자주 쓰는 형태를 골라 재노출하는 위치.
// 백엔드 스펙 확정 후 paths/components 기반 헬퍼 타입을 여기에 추가한다.
export type ApiPaths = paths
export type ApiProjectType = components['schemas']['ProjectType']
export type ApiProjectResponse = components['schemas']['ProjectResponse']
export type ApiProjectPage = components['schemas']['ProjectPage']
export type ApiPartType = components['schemas']['PartType']
export type ApiLearningResourceResponse = components['schemas']['LearningResourceResponse']
export type ApiResourcePage = components['schemas']['ResourcePage']
export type ApiDownloadUrlResponse = components['schemas']['DownloadUrlResponse']
export type ApiNoticeTag = components['schemas']['NoticeTag']
export type ApiNoticeResponse = components['schemas']['NoticeResponse']
export type ApiNoticePage = components['schemas']['NoticePage']
export type ApiScheduleResponse = components['schemas']['ScheduleResponse']
