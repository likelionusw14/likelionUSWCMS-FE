import { useLayoutEffect, useRef, useState } from 'react'
import { Button } from '@atoms'
import { cn } from '@utils'
import type { SchedulePopupProps } from '@types'

const XR = 20.9668 // 꼬리 폭 = 본문(둥근 사각형) 왼쪽 x offset
const R = 16 // 모서리 반경
const TAIL = 31.667 // 꼬리 절반 높이
const BODY_MIN = 326 // 본문 최소 폭 (일정명 짧을 때 기본, 총 폭 347)
// 제목행 필요 폭 = px-24×2 + 점(12) + 점gap(8) + 제목-날짜 gap(8).
const HEADER_EXTRA = 24 * 2 + 12 + 8 + 8
const COMPACT_WIDTH = 347
const TOP_TAIL_HEIGHT = 12

// 말풍선 외곽선 path 생성 — 직선 변(가로 w·세로 h)만 늘어나고, 모서리(16)·곡선 꼬리는 고정.
// 꼬리는 왼쪽·세로 중앙. (오른쪽 꼬리는 svg 를 scaleX(-1) 로 뒤집는다.)
function bubblePath(w: number, h: number): string {
  const yc = h / 2
  return [
    `M${XR + R} 0`,
    `H${w - R}`,
    `A${R} ${R} 0 0 1 ${w} ${R}`,
    `V${h - R}`,
    `A${R} ${R} 0 0 1 ${w - R} ${h}`,
    `H${XR + R}`,
    `A${R} ${R} 0 0 1 ${XR} ${h - R}`,
    `V${yc + TAIL}`,
    `C${XR} ${yc + 9.444} 0.00117 ${yc + 13.345} 0 ${yc}`,
    `C-0.00059 ${yc - 12.234} 20.9667 ${yc - 13.889} ${XR} ${yc - TAIL}`,
    `V${R}`,
    `A${R} ${R} 0 0 1 ${XR + R} 0`,
    'Z',
  ].join(' ')
}

function bottomBubblePath(w: number, h: number, tail: 'left' | 'right'): string {
  const tailX = tail === 'left' ? 36 : w - 36
  return [
    `M${R} ${TOP_TAIL_HEIGHT}`,
    `H${tailX - 10}`,
    `L${tailX} 0`,
    `L${tailX + 10} ${TOP_TAIL_HEIGHT}`,
    `H${w - R}`,
    `A${R} ${R} 0 0 1 ${w} ${TOP_TAIL_HEIGHT + R}`,
    `V${h - R}`,
    `A${R} ${R} 0 0 1 ${w - R} ${h}`,
    `H${R}`,
    `A${R} ${R} 0 0 1 0 ${h - R}`,
    `V${TOP_TAIL_HEIGHT + R}`,
    `A${R} ${R} 0 0 1 ${R} ${TOP_TAIL_HEIGHT}`,
    'Z',
  ].join(' ')
}

// 일정 팝업 — 캘린더 날짜 위 말풍선. Figma 588:1223/1222/1224/1225.
// 흰 말풍선(primary 1px 테두리, 곡선 꼬리 좌/우) — 하나의 SVG path 라 꼬리 포함 테두리가 균일하다.
// 세로: 내용이 길면 늘어나고 현재 높이(버튼O 260 / 버튼X 210)를 최소로 둔다.
// 가로: 일정명이 길면 제목행을 한 줄로 담을 만큼 본문 폭이 늘어난다(최소 326). 설명·장소는 그 폭 안에서 줄바꿈.
export function SchedulePopup({
  event,
  tail = 'left',
  placement = 'side',
  onEdit,
  onDelete,
  className,
}: SchedulePopupProps) {
  const showActions = Boolean(onEdit || onDelete)
  const minH = showActions ? 260 : 210
  const isRight = tail === 'right'
  const isBelow = placement === 'below'

  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  const dateRef = useRef<HTMLSpanElement>(null)
  const [height, setHeight] = useState(minH)
  const [bodyW, setBodyW] = useState(BODY_MIN)

  // 제목/날짜의 자연 폭(nowrap)으로 본문 폭을, 내용으로 높이를 맞춘다.
  useLayoutEffect(() => {
    const content = contentRef.current
    const title = titleRef.current
    const date = dateRef.current
    if (!content || !title || !date) return
    const measure = () => {
      const needed = HEADER_EXTRA + title.scrollWidth + date.scrollWidth
      setBodyW(isBelow ? COMPACT_WIDTH : Math.max(BODY_MIN, Math.ceil(needed)))
      setHeight(Math.max(minH, Math.round(content.getBoundingClientRect().height)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(content)
    return () => ro.disconnect()
  }, [isBelow, minH, event.title, event.dateTime, event.place, event.description])

  const w = isBelow ? COMPACT_WIDTH : bodyW + XR
  const totalHeight = isBelow ? height + TOP_TAIL_HEIGHT : height

  return (
    <div className={cn('relative', className)} style={{ width: w, height: totalHeight }}>
      <svg
        aria-hidden
        width={w}
        height={totalHeight}
        viewBox={`0 0 ${w} ${totalHeight}`}
        className="absolute inset-0 overflow-visible text-primary"
        style={!isBelow && isRight ? { transform: 'scaleX(-1)' } : undefined}
      >
        <path
          d={isBelow ? bottomBubblePath(w, totalHeight, tail) : bubblePath(w, height)}
          fill="white"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div
        ref={contentRef}
        className={cn(
          'relative flex flex-col gap-[10px] px-24 py-[19px]',
          isBelow ? 'top-12' : isRight ? 'mr-[21px]' : 'ml-[21px]',
        )}
        style={{ width: isBelow ? COMPACT_WIDTH : bodyW, minHeight: minH }}
      >
        {/* 제목 + 날짜시간 */}
        <div className="flex min-h-[21px] items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <span className="h-12 w-12 shrink-0 rounded-full bg-primary" />
            <span ref={titleRef} className="whitespace-nowrap text-sm-18 text-black">
              {event.title}
            </span>
          </div>
          <span ref={dateRef} className="shrink-0 whitespace-nowrap text-r-14 text-gray-700">
            {event.dateTime}
          </span>
        </div>

        <span className="h-px w-full shrink-0 bg-secondary-1" />

        {/* 장소 + 설명 */}
        <div className="flex flex-1 flex-col gap-12">
          <p className="text-m-14 text-black">{event.place}</p>
          <div className="flex flex-1 items-start rounded-16 bg-background-1 p-8">
            <p className="min-h-[85px] w-full whitespace-pre-line text-r-14 text-gray-700">
              {event.description}
            </p>
          </div>
        </div>

        {/* 수정 / 삭제 */}
        {showActions && (
          <div className="flex h-48 shrink-0 items-center justify-center gap-[10px]">
            {onEdit && (
              <Button size="sm" variant="primary" onClick={onEdit} className="overflow-hidden whitespace-nowrap px-16">
                수정
              </Button>
            )}
            {onDelete && (
              <Button size="sm" variant="danger" onClick={onDelete} className="overflow-hidden whitespace-nowrap px-16">
                삭제
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
