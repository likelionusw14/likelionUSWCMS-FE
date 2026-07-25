import { useLayoutEffect, useRef, useState } from 'react'
import { Button } from '@atoms'
import { cn } from '@utils'
import type { SchedulePopupProps } from '@types'

const XR = 20.9668 // 꼬리 깊이 = 본문(둥근 사각형) 왼쪽 x offset (top 꼬리에서는 위쪽 y offset)
const R = 16 // 모서리 반경
const TAIL = 31.667 // 꼬리 밑변 절반
const BODY_MIN = 326 // 본문 최소 폭 (일정명 짧을 때 기본, 총 폭 347)
// 제목행 필요 폭 = px-24×2 + 점(12) + 점gap(8) + 제목-날짜 gap(8).
const HEADER_EXTRA = 24 * 2 + 12 + 8 + 8
// 말풍선이 화면 밖으로 나가지 않도록 남겨 둘 좌우 여백(24+24).
const VIEWPORT_GUTTER = 48

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

// 상단 꼬리 버전 — 같은 곡선을 x/y 전치해 위로 세운다(Figma 모바일 꼬리 51.2×21).
// xc = 꼬리 뾰족점의 x. 본문 사각형은 y=XR 부터 시작한다.
function bubblePathTop(w: number, h: number, xc: number): string {
  return [
    `M${R} ${XR}`,
    `H${xc - TAIL}`,
    `C${xc - 9.444} ${XR} ${xc - 13.345} 0.00117 ${xc} 0`,
    `C${xc + 12.234} -0.00059 ${xc + 13.889} 20.9667 ${xc + TAIL} ${XR}`,
    `H${w - R}`,
    `A${R} ${R} 0 0 1 ${w} ${XR + R}`,
    `V${h - R}`,
    `A${R} ${R} 0 0 1 ${w - R} ${h}`,
    `H${R}`,
    `A${R} ${R} 0 0 1 0 ${h - R}`,
    `V${XR + R}`,
    `A${R} ${R} 0 0 1 ${R} ${XR}`,
    'Z',
  ].join(' ')
}

// 일정 팝업 — 캘린더 날짜 위 말풍선. Figma 588:1223/1222/1224/1225.
// 흰 말풍선(primary 1px 테두리, 곡선 꼬리) — 하나의 SVG path 라 꼬리 포함 테두리가 균일하다.
// 꼬리는 데스크탑에서 좌/우(21×51.2), 좌우로 놓을 자리가 없는 좁은 화면에서는 위(51.2×21).
// 세로: 내용이 길면 늘어나고 현재 높이(버튼O 260 / 버튼X 210)를 최소로 둔다.
// 가로: 일정명이 길면 제목행을 한 줄로 담을 만큼 본문 폭이 늘어난다(최소 326). 설명·장소는 그 폭 안에서 줄바꿈.
export function SchedulePopup({
  event,
  tail = 'left',
  tailOffset,
  maxWidth,
  onEdit,
  onDelete,
  className,
}: SchedulePopupProps) {
  const showActions = Boolean(onEdit || onDelete)
  const minH = showActions ? 260 : 210
  const isRight = tail === 'right'
  const isTop = tail === 'top'

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
      // 앵커 위치에 따라 남는 가로 공간이 다르므로 바깥에서 준 maxWidth 를 우선 쓰고,
      // 없으면 뷰포트 - 48 로 잡는다. SVG 외곽선이 같은 폭으로 그려져야 하므로
      // CSS max-width 가 아니라 계산값 자체를 clamp 한다.
      const limit = maxWidth ?? window.innerWidth - VIEWPORT_GUTTER
      const maxBody = Math.max(0, limit - (isTop ? 0 : XR))
      setBodyW(Math.min(maxBody, Math.max(BODY_MIN, Math.ceil(needed))))
      // getBoundingClientRect 는 등장 애니메이션(scale 0.95)의 영향을 받아 실제보다 작게 잡힌다.
      // ResizeObserver 는 레이아웃 크기만 보므로 그 값이 굳어버린다 → 변환 무관한 offsetHeight 를 쓴다.
      setHeight(Math.max(minH, content.offsetHeight))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(content)
    // 뷰포트 폭이 바뀌면 clamp 결과도 달라지므로 리사이즈에도 다시 잰다.
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [minH, isTop, maxWidth, event.title, event.dateTime, event.place, event.description])

  // 꼬리를 뺀 본문 사각형 기준 전체 크기.
  const w = isTop ? bodyW : bodyW + XR
  const h = isTop ? height + XR : height
  // 꼬리 뾰족점은 모서리(16) + 꼬리 밑변(31.667) 안쪽으로만 갈 수 있다.
  const xc = Math.min(Math.max(tailOffset ?? bodyW / 2, R + TAIL), bodyW - R - TAIL)

  return (
    // flow-root: 위 꼬리일 때 본문의 mt-[21px] 가 바깥으로 새어(마진 상쇄) 말풍선이 21px 밀리는 걸 막는다.
    // max-w 는 clamp 계산이 아직 반영되기 전(첫 페인트)에도 화면을 넘지 않게 하는 보조 장치다.
    <div
      className={cn('relative flow-root max-w-[calc(100vw-48px)]', className)}
      style={{ width: w, height: h }}
    >
      <svg
        aria-hidden
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0 overflow-visible text-primary"
        style={isRight ? { transform: 'scaleX(-1)' } : undefined}
      >
        <path
          d={isTop ? bubblePathTop(w, h, xc) : bubblePath(w, h)}
          fill="white"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div
        ref={contentRef}
        className={cn(
          'relative flex max-w-full flex-col gap-[10px] px-24 py-[19px]',
          isTop ? 'mt-[21px]' : isRight ? 'mr-[21px]' : 'ml-[21px]',
        )}
        style={{ width: bodyW, minHeight: minH }}
      >
        {/* 제목 + 날짜시간 */}
        <div className="flex min-h-[21px] items-center justify-between gap-8">
          {/* min-w-0 없이는 flex 자식의 min-width:auto 때문에 긴 제목이 줄바꿈되지 않고 말풍선을 밀어낸다. */}
          <div className="flex min-w-0 items-center gap-8">
            <span className="h-12 w-12 shrink-0 rounded-full bg-primary" />
            {/* 모바일에서는 폭이 잘리므로 제목이 줄바꿈되도록 nowrap 을 sm 이상에서만 건다. */}
            <span
              ref={titleRef}
              className="min-w-0 break-words text-sm-18 text-black sm:whitespace-nowrap"
            >
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
          <p className="break-words text-m-14 text-black">{event.place}</p>
          <div className="flex flex-1 items-start rounded-16 bg-background-1 p-8">
            <p className="min-h-[85px] w-full whitespace-pre-line break-words text-r-14 text-gray-700">
              {event.description}
            </p>
          </div>
        </div>

        {/* 수정 / 삭제 */}
        {showActions && (
          <div className="flex h-48 shrink-0 items-center justify-center gap-[10px]">
            {onEdit && (
              <Button
                size="sm"
                variant="primary"
                onClick={onEdit}
                className="overflow-hidden whitespace-nowrap px-16"
              >
                수정
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="danger"
                onClick={onDelete}
                className="overflow-hidden whitespace-nowrap px-16"
              >
                삭제
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
