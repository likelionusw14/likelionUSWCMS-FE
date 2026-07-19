import { Link } from 'react-router-dom'
import errorIcon from '@/assets/icons/error-bubble.svg'
import { roleHome } from '@constants'
import { useAuth } from '@hooks'

// 404 안내 섹션. "홈으로 이동"은 게스트/아기사자/운영진 각자의 역할 홈으로 보낸다
// (예전에는 무조건 "/" 로 고정돼 있어, 운영진이 눌러도 관리자 홈이 아닌 게스트 홈으로 갔다).
export function NotFoundPanel() {
  const { role } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center gap-24 py-[76px]">
      <img src={errorIcon} alt="" className="h-[80px] w-[80px]" />
      <h1 className="text-h1 text-black">404 접속오류</h1>
      <p className="text-center text-m-20 leading-[1.5] text-black">
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
