import { useNavigate } from 'react-router-dom'
import topbarUserIcon from '@/assets/icons/topbar-user.svg'
import { useAuth } from '@hooks'
import type { AdminTopBarProps } from '@types'

// 관리 페이지 상단바 — 브레드크럼 + 페이지 제목 + 계정 아이콘.
// 계정 아이콘은 임시로 로그아웃이다 (디자인에 계정 메뉴가 아직 없다).
export function AdminTopBar({ breadcrumb, title }: AdminTopBarProps) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-[100px] w-full items-center justify-between overflow-hidden bg-white px-32 py-24">
      <div className="flex flex-col gap-8">
        <p className="text-r-14 text-primary/60">{breadcrumb}</p>
        <h1 className="text-sm-22 text-black">{title}</h1>
      </div>
      <button type="button" onClick={handleLogout} aria-label="로그아웃" title="로그아웃">
        <img src={topbarUserIcon} alt="" className="h-40 w-40" />
      </button>
    </div>
  )
}
