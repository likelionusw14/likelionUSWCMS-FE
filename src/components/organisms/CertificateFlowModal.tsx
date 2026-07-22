import { Button, WindowPanel } from '@atoms'
import { Modal } from '@molecules'
import type { CertificateFlowModalProps } from '@types'

// 완료 체크 아이콘(checkmark.circle, primary/80) — Figma 14:327/14:316.
const CHECK_PATH =
  'M60 110C87.3529 110 110 87.3039 110 60C110 32.6471 87.3039 10 59.951 10C32.6471 10 10 32.6471 10 60C10 87.3039 32.6961 110 60 110ZM60 101.667C36.8627 101.667 18.3824 83.1373 18.3824 60C18.3824 36.8627 36.8137 18.3333 59.951 18.3333C83.0882 18.3333 101.667 36.8627 101.667 60C101.667 83.1373 83.1373 101.667 60 101.667ZM54.6078 83.2843C56.2255 83.2843 57.598 82.5 58.5784 80.9804L80.9804 45.7353C81.5196 44.7549 82.1569 43.6765 82.1569 42.598C82.1569 40.3922 80.1961 38.9706 78.1373 38.9706C76.9118 38.9706 75.6863 39.7549 74.7549 41.1765L54.4118 73.8235L44.7549 61.3235C43.5784 59.7549 42.5 59.3627 41.1274 59.3627C39.0196 59.3627 37.3529 61.0784 37.3529 63.2353C37.3529 64.3137 37.7941 65.3431 38.4804 66.2745L50.4412 80.9804C51.6667 82.598 52.9902 83.2843 54.6078 83.2843Z'

// 발급 중 스피너 — primary 캡슐 8개가 방사형으로 놓여 회전(뒤로 갈수록 옅어짐). Figma 14:339.
function IssuingSpinner() {
  return (
    <svg viewBox="0 0 120 120" className="h-[120px] w-[120px] animate-spin text-primary" aria-hidden>
      {Array.from({ length: 8 }, (_, index) => (
        <rect
          key={index}
          x="55"
          y="6"
          width="10"
          height="33"
          rx="5"
          fill="currentColor"
          opacity={(8 - index) / 8}
          transform={`rotate(${index * 45} 60 60)`}
        />
      ))}
    </svg>
  )
}

// 완료 체크 원 아이콘.
function CheckCircle() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="h-[120px] w-[120px]" aria-hidden>
      <path className="fill-primary/80" d={CHECK_PATH} />
    </svg>
  )
}

// 발급 플로우 팝업 — 상태에 따라 발급 중(스피너+로딩바) / 발급 완료(체크+다운로드) / 다운로드 완료(체크+홈).
// idle 은 렌더하지 않는다. 버튼으로만 진행(바깥클릭·ESC 무시). 창(맥 헤더) 모양은 WindowPanel.
export function CertificateFlowModal({ state, onDownload, onGoHome }: CertificateFlowModalProps) {
  return (
    <Modal
      open={state !== 'idle'}
      onClose={() => {}}
      dismissable={false}
      ariaLabel="활동증명서 발급"
      panelClassName="w-[640px] max-w-full"
    >
      <WindowPanel className="w-full" bodyClassName="flex flex-col items-center gap-40 py-40">
        {state === 'issuing' && (
          <>
            <IssuingSpinner />
            <p className="text-center text-m-16-home text-black">
              증명서를 발급하는 중 입니다.
              <br />
              잠시만 기다려주세요.
            </p>
            <div className="flex w-full flex-col items-center gap-8">
              <div className="h-12 w-full rounded-full bg-primary" />
              <p className="text-m-16 text-black">100%</p>
            </div>
          </>
        )}
        {state === 'issued' && (
          <>
            <CheckCircle />
            <p className="text-center text-m-16-home text-black">증명서 발급이 완료되었습니다.</p>
            <Button variant="primary" onClick={onDownload}>
              PDF 다운로드
            </Button>
          </>
        )}
        {state === 'downloaded' && (
          <>
            <CheckCircle />
            <p className="text-center text-m-16-home text-black">증명서 다운로드가 완료되었습니다.</p>
            <Button variant="primary" onClick={onGoHome}>
              홈으로 돌아가기
            </Button>
          </>
        )}
      </WindowPanel>
    </Modal>
  )
}
