import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import closeIcon from '@/assets/icons/close.svg'
import { BRAND_NAME } from '@constants'
import { cn } from '@utils'
import type { AdminMobileMenuProps } from '@types'

// lg 미만 관리자 메뉴 — 상단바 아래로 펼쳐지는 전체폭 패널 (Figma 1356:10691).
// 데스크톱 사이드바(AdminSidebar)와 달리 배경이 background-1 이라, 활성 항목은
// bg-background-1 대신 bg-primary + 흰 글자로 강조한다.
// 부모가 relative 컨테이너를 제공하고 이 컴포넌트는 그 아래(top-full)에 절대배치된다.
const MENU_ITEM =
  'flex h-40 items-center rounded-8 px-24 text-sm-16 text-black outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary'
const MENU_ITEM_ACTIVE = 'bg-primary text-white'

export function AdminMobileMenu({ id, open, onClose, homeItem, navItems }: AdminMobileMenuProps) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence initial={false}>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="메뉴 닫기"
            onClick={onClose}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="fixed inset-0 top-full z-10 cursor-default bg-black/30 lg:hidden"
          />

          <motion.nav
            id={id}
            aria-label="관리자 모바일 메뉴"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full z-20 flex flex-col gap-24 rounded-b-16 bg-background-1 px-4 pb-8 pt-24 shadow-drop lg:hidden"
          >
            <div className="flex items-center justify-between px-24">
              <NavLink
                to={homeItem.to}
                end
                onClick={onClose}
                className="rounded-8 text-sm-22 text-secondary-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary-2"
              >
                {BRAND_NAME}
              </NavLink>
              <button
                type="button"
                aria-label="메뉴 닫기"
                onClick={onClose}
                className="flex h-24 w-24 items-center justify-center rounded-8 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <img src={closeIcon} alt="" className="h-24 w-24" />
              </button>
            </div>

            <div className="flex flex-col">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => cn(MENU_ITEM, isActive && MENU_ITEM_ACTIVE)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
