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
    <div className={cn('rounded border border-gray-300 bg-white p-24', className)}>
      <p className="text-sm text-gray-700">{label}</p>
      <p className="mt-8 text-2xl font-bold text-gray-900">{value}</p>
      {hint ? <p className="mt-4 text-xs text-gray-500">{hint}</p> : null}
    </div>
  )
}
