import { Link, useNavigate } from 'react-router-dom'
import topbarUserIcon from '@/assets/icons/topbar-user.svg'
import { useAuth } from '@hooks'
import type { AdminTopBarProps, BreadcrumbSegment } from '@types'

// 관리 페이지 상단바 — 브레드크럼 + 페이지 제목 + 계정 아이콘. 스크롤 시 상단 고정(sticky).
// 계정 아이콘은 임시로 로그아웃이다 (디자인에 계정 메뉴가 아직 없다).
export function AdminTopBar({ breadcrumb, title }: AdminTopBarProps) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  // 문자열이면 링크 없는 단일 세그먼트로 정규화한다(기존 호출 호환).
  const segments: BreadcrumbSegment[] =
    typeof breadcrumb === 'string' ? [{ label: breadcrumb }] : breadcrumb

  return (
    <div className="sticky top-0 z-20 flex h-[100px] w-full items-center justify-between overflow-hidden bg-white px-32 py-24">
      <div className="flex flex-col gap-8">
        <p className="text-r-14 text-primary/60">
          {segments.map((segment, index) => (
            <span key={`${segment.label}-${index}`}>
              {index > 0 && <span className="px-4"> / </span>}
              {segment.to ? (
                <Link to={segment.to} className="transition-colors hover:text-primary">
                  {segment.label}
                </Link>
              ) : (
                segment.label
              )}
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
