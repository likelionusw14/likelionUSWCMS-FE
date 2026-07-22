import { cn } from '@utils'
import type { LionProfileCardProps } from '@types'

// 폴더 본체 도형(좌상단 탭) — Figma 회원프로필의 Back(14:704). fill 은 primary/80.
const FOLDER_PATH =
  'M36.6434 251.773H262.357C275.183 251.773 281.596 251.773 286.495 249.283C290.805 247.094 294.308 243.599 296.504 239.302C299 234.416 299 228.02 299 215.228V61.1803C299 48.3884 299 41.9924 296.504 37.1065C294.308 32.8087 290.805 29.3145 286.495 27.1247C281.596 24.6353 275.183 24.6353 262.357 24.6353H120.838C115.799 24.6353 110.998 22.4928 107.632 18.7424L97.1866 7.10224C93.1305 2.58224 87.3438 2.24319e-05 81.2708 0H43.8957H20.6755C9.25675 0 0 9.25675 0 20.6755L0 47.0688V215.228C0 228.02 0 234.416 2.49618 239.302C4.69189 243.599 8.19547 247.094 12.5048 249.283C17.4038 251.773 23.817 251.773 36.6434 251.773Z'

// 사자 프로필 카드 — 폴더형 그래픽(폴더 본체 + 겹친 종이 3겹) 위 프로필 이미지(없으면 placeholder),
// 아래에 이름(좌) / 기수ㅣ파트(우) / 학과(우). Figma 회원프로필(14:702) 재현.
export function LionProfileCard({ lion, className }: LionProfileCardProps) {
  return (
    <div className={cn('flex w-full flex-col items-center', className)}>
      {/* 폴더 그래픽 — 폴더 본체(primary/80) 위에 종이 3겹, 맨 앞장에 프로필 이미지 */}
      <div className="relative aspect-[299/267] w-full">
        <svg
          viewBox="0 0 299 267"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <path className="fill-primary/80" d={FOLDER_PATH} />
        </svg>
        {/* 겹친 종이 (뒤 → 앞). 앞장이 프로필 이미지 영역. */}
        <div className="absolute left-[6.35%] top-[12.36%] h-[71.16%] w-[87.63%] rounded-16 bg-primary/50" />
        <div className="absolute left-[4.68%] top-[15.73%] h-[71.16%] w-[90.97%] rounded-16 bg-secondary-1" />
        <div className="absolute left-[3.68%] top-[19.48%] h-[71.16%] w-[92.98%] overflow-hidden rounded-16">
          {lion.imageUrl ? (
            <img
              src={lion.imageUrl}
              alt={`${lion.name} 프로필 이미지`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-100" />
          )}
        </div>
      </div>
      {/* 정보 */}
      <div className="flex w-full flex-col gap-4 px-16">
        <div className="flex w-full items-center justify-between whitespace-nowrap text-black">
          <span className="text-sm-18">{lion.name}</span>
          <span className="flex items-center gap-4 text-m-16">
            <span>{lion.cohort}</span>
            <span className="opacity-20">ㅣ</span>
            <span>{lion.part}</span>
          </span>
        </div>
        <div className="flex w-full justify-end">
          <span className="text-m-16 text-gray-500">{lion.department}</span>
        </div>
      </div>
    </div>
  )
}
