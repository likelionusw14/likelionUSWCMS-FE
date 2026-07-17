import { MenuCard } from '@molecules'
import { ADMIN_SECTIONS } from '@routes/admin/nav'

// 대시보드 홈의 관리 메뉴 카드. 섹션 목록(라벨·경로·설명)은 ADMIN_SECTIONS 단일 출처에서 파생한다.
export function AdminMenuGrid() {
  return (
    <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-x-40 gap-y-[36px] px-64 pb-[120px] pt-32 md:grid-cols-2 lg:grid-cols-3">
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
