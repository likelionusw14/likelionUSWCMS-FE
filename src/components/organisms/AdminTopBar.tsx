import { Link, useLocation, useNavigate } from 'react-router-dom'
import topbarLogoutIcon from '@/assets/icons/topbar-logout.svg'
import { useAuth } from '@hooks'
import { getAdminBreadcrumb } from '@routes/admin/nav'

// 셸(AdminSidebarShell)이 상단에 고정하는 UI 컴포넌트.
// location.pathname 이 바뀔 때 딜레이 없이 즉시 정보를 갱신한다.
export function AdminTopBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const { title, breadcrumb } = getAdminBreadcrumb(location.pathname)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex w-full items-center justify-between overflow-hidden bg-white px-32 py-16 shrink-0">
      <div className="flex flex-col gap-4">
        <p className="text-r-14 text-primary/60">
          {breadcrumb.map((segment, index) => (
            <span key={`${segment.label}-${index}`}>
              {index > 0 && <span className="px-4"> / </span>}
              <Link to={segment.to || location.pathname} className="transition-colors hover:text-primary">
                {segment.label}
              </Link>
            </span>
          ))}
        </p>
        <h1 className="text-sm-22 text-black">{title}</h1>
      </div>
      <button type="button" onClick={handleLogout} aria-label="로그아웃" title="로그아웃">
        <img src={topbarLogoutIcon} alt="" className="h-24 w-24" />
      </button>
    </div>
  )
}
