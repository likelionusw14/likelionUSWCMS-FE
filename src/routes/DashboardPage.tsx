import { StatCard } from '@molecules'
import { useHealth } from '@hooks'

export function DashboardPage() {
  const { data: health, isLoading } = useHealth()

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-xl font-bold text-content">대시보드</h1>
        <p className="mt-1 text-sm text-content-muted">
          동아리 관리 시스템 현황 (백엔드 연동 전 예시 화면)
        </p>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="등록 동아리" value="—" hint="백엔드 연동 후 표시" />
        <StatCard label="활동 회원" value="—" hint="백엔드 연동 후 표시" />
        <StatCard
          label="API 상태"
          value={isLoading ? '확인 중…' : health.status}
          hint="useHealth() seam 예시"
        />
      </div>
    </div>
  )
}
