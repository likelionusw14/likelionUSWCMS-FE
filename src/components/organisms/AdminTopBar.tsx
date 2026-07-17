import { Link, useLocation, useNavigate } from 'react-router-dom'
import topbarUserIcon from '@/assets/icons/topbar-user.svg'
import { useAuth } from '@hooks'
import type { BreadcrumbSegment } from '@types'

// 현재 경로(location.pathname)에 대응되는 상단바 메타데이터(타이틀, 브레드크럼)를 반환한다.
// react-router-dom 의 데이터 라우터 미지원 환경(BrowserRouter)에서 경로 전환 즉시
// 타이틀과 브레드크럼을 딜레이 없이 변경하기 위해 클라이언트 라우트 정보를 자체 매핑한다.
function getTopBarMeta(pathname: string): { title: string; breadcrumb: BreadcrumbSegment[] } {
  // 1. 프로젝트
  if (pathname === '/admin/projects') {
    return {
      title: '프로젝트 관리',
      breadcrumb: [{ label: '홈', to: '/admin' }, { label: '프로젝트 관리' }],
    }
  }
  if (pathname === '/admin/projects/new') {
    return {
      title: '프로젝트 작성',
      breadcrumb: [
        { label: '홈', to: '/admin' },
        { label: '프로젝트 관리', to: '/admin/projects' },
        { label: '프로젝트 작성' },
      ],
    }
  }
  if (pathname.startsWith('/admin/projects/') && pathname.endsWith('/edit')) {
    return {
      title: '프로젝트 수정',
      breadcrumb: [
        { label: '홈', to: '/admin' },
        { label: '프로젝트 관리', to: '/admin/projects' },
        { label: '프로젝트 수정' },
      ],
    }
  }
  if (pathname.startsWith('/admin/projects/')) {
    return {
      title: '프로젝트 상세',
      breadcrumb: [
        { label: '홈', to: '/admin' },
        { label: '프로젝트 관리', to: '/admin/projects' },
        { label: '프로젝트 상세' },
      ],
    }
  }

  // 2. 세션자료
  if (pathname === '/admin/sessions') {
    return {
      title: '세션자료 관리',
      breadcrumb: [{ label: '홈', to: '/admin' }, { label: '세션자료 관리' }],
    }
  }
  if (pathname === '/admin/sessions/new') {
    return {
      title: '세션자료 작성',
      breadcrumb: [
        { label: '홈', to: '/admin' },
        { label: '세션자료 관리', to: '/admin/sessions' },
        { label: '세션자료 작성' },
      ],
    }
  }
  if (pathname.startsWith('/admin/sessions/') && pathname.endsWith('/edit')) {
    return {
      title: '세션자료 수정',
      breadcrumb: [
        { label: '홈', to: '/admin' },
        { label: '세션자료 관리', to: '/admin/sessions' },
        { label: '세션자료 수정' },
      ],
    }
  }
  if (pathname.startsWith('/admin/sessions/')) {
    return {
      title: '세션자료 상세',
      breadcrumb: [
        { label: '홈', to: '/admin' },
        { label: '세션자료 관리', to: '/admin/sessions' },
        { label: '세션자료 상세' },
      ],
    }
  }

  // 3. 출결
  if (pathname === '/admin/attendance') {
    return {
      title: '출결 관리',
      breadcrumb: [{ label: '홈', to: '/admin' }, { label: '출결 관리' }],
    }
  }

  // 4. 일정
  if (pathname === '/admin/schedule') {
    return {
      title: '일정 관리',
      breadcrumb: [{ label: '홈', to: '/admin' }, { label: '일정 관리' }],
    }
  }

  // 5. 공지
  if (pathname === '/admin/notices') {
    return {
      title: '공지 관리',
      breadcrumb: [{ label: '홈', to: '/admin' }, { label: '공지 관리' }],
    }
  }
  if (pathname === '/admin/notices/new') {
    return {
      title: '공지 작성',
      breadcrumb: [
        { label: '홈', to: '/admin' },
        { label: '공지 관리', to: '/admin/notices' },
        { label: '공지 작성' },
      ],
    }
  }
  if (pathname.startsWith('/admin/notices/') && pathname.endsWith('/edit')) {
    return {
      title: '공지 수정',
      breadcrumb: [
        { label: '홈', to: '/admin' },
        { label: '공지 관리', to: '/admin/notices' },
        { label: '공지 수정' },
      ],
    }
  }
  if (pathname.startsWith('/admin/notices/')) {
    return {
      title: '공지 상세',
      breadcrumb: [
        { label: '홈', to: '/admin' },
        { label: '공지 관리', to: '/admin/notices' },
        { label: '공지 상세' },
      ],
    }
  }

  // 6. 회원(사자)
  if (pathname === '/admin/members') {
    return {
      title: '회원 관리',
      breadcrumb: [{ label: '홈', to: '/admin' }, { label: '회원 관리' }],
    }
  }

  return { title: '', breadcrumb: [] }
}

// 셸(AdminSidebarShell)이 상단에 고정하는 UI 컴포넌트.
// location.pathname 이 바뀔 때 딜레이 없이 즉시 정보를 갱신한다.
export function AdminTopBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const { title, breadcrumb } = getTopBarMeta(location.pathname)

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
        <img src={topbarUserIcon} alt="" className="h-24 w-24" />
      </button>
    </div>
  )
}
