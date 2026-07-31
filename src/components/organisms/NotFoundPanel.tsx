import { Link } from 'react-router-dom'
import errorIcon from '@/assets/icons/error-bubble.svg'
import { roleHome } from '@constants'
import { useAuth } from '@hooks'

// 404 안내 섹션 (Figma 594:1382 — 다크 배경 위 밝은 글자).
// "홈으로 이동"은 게스트/아기사자/운영진 각자의 자기 영역 홈으로 보낸다
// (예전에는 무조건 "/" 로 고정돼 있어, 운영진이 눌러도 관리자 홈이 아닌 게스트 홈으로 갔다.
// MEMBER 도 마케팅 홈(/)이 아니라 자기 영역(/app)으로 보낸다).
export function NotFoundPanel() {
  const { role } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center gap-24 px-24 py-[76px]">
      <img src={errorIcon} alt="" className="h-64 w-64 sm:h-[80px] sm:w-[80px]" />
      <h1 className="text-sm-22 text-background-1 sm:text-h1">404 접속오류</h1>
      <p className="text-center text-m-16 leading-[1.5] text-background-1 sm:text-m-20">
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        주소가 바뀌었거나 삭제되었을 수 있어요.
      </p>
      <Link
        to={roleHome(role)}
        className="flex h-48 min-w-[128px] items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
      >
        홈으로 이동
      </Link>
    </div>
  )
}
