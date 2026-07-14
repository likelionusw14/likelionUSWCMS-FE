import { Link } from 'react-router-dom'
import errorIcon from '@/assets/icons/error-bubble.svg'

// 404 안내 섹션.
export function NotFoundPanel() {
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
        to="/"
        className="flex h-48 min-w-[128px] items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
      >
        홈으로 이동
      </Link>
    </div>
  )
}
