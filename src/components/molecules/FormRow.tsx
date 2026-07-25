import { cn } from '@utils'
import type { FormRowProps } from '@types'

// 관리 폼의 표 형태 행 — 라벨 셀(secondary-1) + 입력 셀.
// 반응형: Figma 모바일 실측(1181:20587 / 24892 / 24145) 기준 375 에서도 가로 표 배치를 유지한다.
// 라벨은 152px 고정 그대로 두되 좌우 패딩만 모바일 16 / sm 이상 24 로 줄여 라벨 텍스트가 줄바꿈되지 않게 하고,
// 입력 셀은 flex-1 + min-w-px 로 남는 폭(375 기준 175px)을 채운다 — 고정폭이 아니라 더 좁아져도 안 깨진다.
// labelClassName 은 마지막에 합성되므로 모서리 라운드 등 기존 오버라이드는 그대로 동작한다.
export function FormRow({ label, children, className, labelClassName }: FormRowProps) {
  return (
    <div className={cn('flex min-w-px flex-1 items-stretch', className)}>
      <span
        className={cn(
          'flex w-[152px] shrink-0 items-center bg-secondary-1 px-16 text-m-14 text-black sm:px-24',
          labelClassName,
        )}
      >
        {label}
      </span>
      <div className="flex min-w-px flex-1 items-center py-8 pl-16 pr-24 sm:px-24">{children}</div>
    </div>
  )
}
