import { useCertificateIssue, useCertificatePreview } from '@hooks'
import { CertificateFlowModal, CertificateInfoPanel } from '@organisms'

// 활동증명서 페이지 — 내 정보 확인 + 발급 플로우(발급중→완료→다운로드→홈).
export function UserCertificatePage() {
  const preview = useCertificatePreview()
  const flow = useCertificateIssue()

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-32 px-24 pb-96 pt-40 sm:gap-64 sm:px-32 sm:pt-48 lg:px-64">
      <header className="flex flex-col items-center gap-8">
        <div className="relative border-x border-secondary-2 bg-secondary-2/10 px-24 py-4">
          <span className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-secondary-2" />
          <span className="absolute -right-8 -bottom-8 h-16 w-16 rounded-full bg-secondary-2" />
          <h1 className="text-sm-22 text-black sm:text-h1">CERTIFICATE</h1>
        </div>
      </header>

      <CertificateInfoPanel
        info={preview.data}
        isLoading={preview.isLoading}
        onIssue={flow.issue}
      />

      <CertificateFlowModal state={flow.state} onDownload={flow.download} onGoHome={flow.goHome} />
    </div>
  )
}
