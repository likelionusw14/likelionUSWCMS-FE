import { WindowPanel } from '@atoms'

// 가입 승인 대기 안내 패널.
export function SignupPendingPanel() {
  return (
    <WindowPanel
      className="w-full max-w-[960px]"
      bodyClassName="flex h-[406px] flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-24 text-center text-black">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-h1">LOGIN</h1>
          <p className="text-sm-18">가입 대기</p>
        </div>
        <p className="text-m-20">수원대학교 멋쟁이사자처럼 가입 승인 대기중입니다.</p>
      </div>
    </WindowPanel>
  )
}
