import type { Project } from '@types'

// 백엔드 연동 전 목데이터. 연동 시 이 훅 안에서 apiClient 호출로 교체한다
// (컴포넌트는 { data, isLoading } 모양에만 의존한다).
const MOCK_DESCRIPTION =
  '시장 분석, 사용자 조사, 서비스 기획, 프로젝트 매니지먼트를 배웁니다. 팀의 비전을 설정하고 목표 달성을 이끄는 리더십을 기릅니다.'

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: '프로젝트명',
    category: '프로젝트',
    startDate: '2026.06',
    endDate: '2026.08',
    githubUrl: '000',
    projectUrl: '000',
    participants: ['김ㅇㅇ(14기,기획)', '김ㅇㅇ(14기,기획)', '김ㅇㅇ(14기,기획)'],
    description: MOCK_DESCRIPTION,
    tags: ['Service Planning', 'Data Analysis'],
    imageUrls: [],
  },
  {
    id: '2',
    name: '프로젝트명',
    category: '프로젝트',
    startDate: '2026.06',
    endDate: '2026.08',
    githubUrl: '000',
    projectUrl: '000',
    participants: ['김ㅇㅇ(14기,기획)'],
    description: MOCK_DESCRIPTION,
    tags: ['Service Planning', 'Data Analysis'],
    imageUrls: [],
  },
  {
    id: '3',
    name: '프로젝트명',
    category: '해커톤',
    startDate: '2026.06',
    endDate: '2026.08',
    githubUrl: '000',
    projectUrl: '000',
    participants: ['김ㅇㅇ(14기,기획)'],
    description: MOCK_DESCRIPTION,
    tags: ['Service Planning', 'Data Analysis'],
    imageUrls: [],
  },
  {
    id: '4',
    name: '프로젝트명',
    category: '프로젝트',
    startDate: '2026.06',
    endDate: '2026.08',
    githubUrl: '000',
    projectUrl: '000',
    participants: ['김ㅇㅇ(14기,기획)'],
    description: MOCK_DESCRIPTION,
    tags: ['Service Planning', 'Data Analysis'],
    imageUrls: [],
  },
]

// 프로젝트 목록 조회.
export function useProjects(): { data: Project[]; isLoading: boolean } {
  return { data: MOCK_PROJECTS, isLoading: false }
}

// 프로젝트 단건 조회.
export function useProject(id: string | undefined): {
  data: Project | undefined
  isLoading: boolean
} {
  return { data: MOCK_PROJECTS.find((project) => project.id === id), isLoading: false }
}
