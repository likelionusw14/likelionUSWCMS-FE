import { useLayoutEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import topbarUserIcon from '@/assets/icons/topbar-user.svg'
import { useAuth } from '@hooks'
import { useUiStore } from '@store'
import type { AdminTopBarProps, BreadcrumbSegment } from '@types'

// 1. 선언형 메타데이터 컴포넌트 (각 페이지가 렌더).
// DOM 을 직접 그리지 않고, mount/update 시 전역 uiStore 에 title/breadcrumb 를 세팅한다.
// 화면 플리커링(이전 타이틀이 잠깐 보이는 현상)을 방지하기 위해 useLayoutEffect 사용.
export function AdminTopBar({ breadcrumb, title }: AdminTopBarProps) {
  const setTopBar = useUiStore((state) => state.setTopBar)

  useLayoutEffect(() => {
    const normalized: BreadcrumbSegment[] =
      typeof breadcrumb === 'string' ? [{ label: breadcrumb }] : breadcrumb
    setTopBar(title, normalized)
  }, [title, breadcrumb, setTopBar])

  return null
}

// 2. 셸(AdminSidebarShell)이 실제로 상단에 그리는 UI 컴포넌트 (스크롤 고정 영역).
export function AdminTopBarRender() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()
  const title = useUiStore((state) => state.topBarTitle)
  const breadcrumb = useUiStore((state) => state.topBarBreadcrumb)
  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-[100px] w-full items-center justify-between overflow-hidden bg-white px-32 py-24 shrink-0">
      <div className="flex flex-col gap-8">
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
        <img src={topbarUserIcon} alt="" className="h-40 w-40" />
      </button>
    </div>
  )
}
