import { cn } from '@utils'

interface StatCardProps {
  label: string
  value: string | number
  hint?: string
  className?: string
}

// 대시보드 지표 카드 (atom 조합 단위).
export function StatCard({ label, value, hint, className }: StatCardProps) {
  return (
    <div
      className={cn('rounded-card-lg border border-surface-border bg-surface-base p-5', className)}
    >
      <p className="text-sm text-content-muted">{label}</p>
      <p className="mt-2 text-2xl font-bold text-content">{value}</p>
      {hint ? <p className="mt-1 text-xs text-content-subtle">{hint}</p> : null}
    </div>
  )
}
