import { WindowPanel } from '@atoms'

// 가입 거절 안내 패널 (Figma 541:6903).
// 거절 사유(AccountResponse.rejectionReason)는 디자인에 없어 노출하지 않고, 관리자 문의로 안내한다.
export function SignupRejectedPanel() {
  return (
    <WindowPanel
      className="w-full max-w-[993px]"
      bodyClassName="flex h-[406px] flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-24 text-center text-black">
        <h1 className="text-h1">LOGIN</h1>
        <p className="text-m-20 leading-[1.5]">
          가입이 거절되었습니다.
          <br />
          자세한 내용은 관리자를 통해 문의해주세요.
        </p>
      </div>
    </WindowPanel>
  )
}
