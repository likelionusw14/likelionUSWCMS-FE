import { MenuCard } from '@molecules'

// 대시보드 홈의 관리 메뉴 카드. 설명 문구는 Figma 의 임시 문구를 그대로 옮긴 것이다.
const PLACEHOLDER_DESCRIPTION =
  '시장 분석, 사용자 조사, 서비스 기획, 프로젝트 매니지먼트를 배웁니다. 팀의 비전을 설정하고 목표 달성을 이끄는 리더십을 기릅니다.'

const MENU_CARDS = [
  { id: 'projects', title: '프로젝트 관리', description: PLACEHOLDER_DESCRIPTION },
  { id: 'sessions', title: '세션자료 관리', description: PLACEHOLDER_DESCRIPTION },
  { id: 'schedule', title: '일정 관리', description: PLACEHOLDER_DESCRIPTION },
  { id: 'notices', title: '공지 관리', description: PLACEHOLDER_DESCRIPTION },
  { id: 'attendance', title: '출결 관리', description: PLACEHOLDER_DESCRIPTION },
  { id: 'members', title: '회원 관리', description: PLACEHOLDER_DESCRIPTION },
]

export function AdminMenuGrid() {
  return (
    <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-x-40 gap-y-[36px] px-64 pb-[120px] pt-32 md:grid-cols-2 lg:grid-cols-3">
      {MENU_CARDS.map((card) => (
        <MenuCard key={card.id} title={card.title} description={card.description} />
      ))}
    </div>
  )
}
