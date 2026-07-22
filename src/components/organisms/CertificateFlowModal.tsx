import { Button } from '@atoms'
import { Modal } from '@molecules'
import type { CertificateFlowModalProps } from '@types'

// 발급 플로우 팝업 — 상태에 따라 발급 중(로딩) / 발급 완료(다운로드) / 다운로드 완료(홈).
// idle 은 렌더하지 않는다. 버튼으로만 진행(바깥클릭·ESC 무시).
export function CertificateFlowModal({ state, onDownload, onGoHome }: CertificateFlowModalProps) {
  return (
    <Modal
      open={state !== 'idle'}
      onClose={() => {}}
      dismissable={false}
      ariaLabel="활동증명서 발급"
      panelClassName="w-[640px] max-w-full overflow-hidden rounded-16 bg-white"
    >
      <div className="flex flex-col items-center gap-24 px-40 py-40">
        {state === 'issuing' && (
          <>
            <span className="h-[120px] w-[120px] rounded-full bg-secondary-1" />
            <p className="text-center text-sm-18 text-black">
              증명서를 발급하는 중 입니다.
              <br />
              잠시만 기다려주세요.
            </p>
            <div className="h-12 w-full overflow-hidden rounded-full bg-secondary-1">
              <div className="h-full w-full animate-pulse bg-primary" />
            </div>
          </>
        )}
        {state === 'issued' && (
          <>
            <span className="h-[120px] w-[120px] rounded-full bg-secondary-1" />
            <p className="text-center text-sm-18 text-black">증명서 발급이 완료되었습니다.</p>
            <Button variant="primary" onClick={onDownload}>
              PDF 다운로드
            </Button>
          </>
        )}
        {state === 'downloaded' && (
          <>
            <span className="h-[120px] w-[120px] rounded-full bg-secondary-1" />
            <p className="text-center text-sm-18 text-black">증명서 다운로드가 완료되었습니다.</p>
            <Button variant="primary" onClick={onGoHome}>
              홈으로 돌아가기
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}
