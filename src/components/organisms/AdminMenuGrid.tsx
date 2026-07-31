import { MenuCard } from '@molecules'
import { ADMIN_SECTIONS } from '@routes/admin/nav'

// 대시보드 홈의 관리 메뉴 카드. 섹션 목록(라벨·경로·설명)은 ADMIN_SECTIONS 단일 출처에서 파생한다.
export function AdminMenuGrid() {
  return (
    // 모바일 1열 / 태블릿(sm~) 2열 / 데스크톱(lg~) 3열 — 데스크톱 열 수는 기존 유지.
    // 좌우 패딩도 모바일 24 → 태블릿 32 → 데스크톱 64 로 단계 축소해 375px 에서 넘치지 않게 한다.
    <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-x-40 gap-y-[36px] px-24 pb-[120px] pt-32 sm:grid-cols-2 sm:px-32 lg:grid-cols-3 lg:px-64">
      {ADMIN_SECTIONS.map((section) => (
        <MenuCard
          key={section.key}
          title={section.sidebarLabel}
          description={section.cardDescription}
          to={section.to}
        />
      ))}
    </div>
  )
}
