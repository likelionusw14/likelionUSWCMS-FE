import { useLayoutEffect, useRef, useState } from 'react'
import { Button } from '@atoms'
import { cn } from '@utils'
import type { SchedulePopupProps } from '@types'

const XR = 20.9668 // 꼬리 깊이 — 본문(둥근 사각형) 변에서 뾰족점까지
const R = 16 // 모서리 반경
const TAIL = 31.667 // 꼬리 밑변 절반 (곡선이 변에 접해 실제 보이는 폭은 ≈51.15 — Figma 1249:19832)
const BODY_MIN = 326 // 본문 최소 폭 (일정명 짧을 때 기본, 총 폭 347)
// 제목행 필요 폭 = px-24×2 + 점(12) + 점gap(8) + 제목-날짜 gap(8).
const HEADER_EXTRA = 24 * 2 + 12 + 8 + 8
// 말풍선이 화면 밖으로 나가지 않도록 남겨 둘 좌우 여백(24+24).
const VIEWPORT_GUTTER = 48

// 꼬리는 Figma 좌 꼬리(1249:19832, 20.97×51.15) 곡선 하나만 정의하고 네 방향을 파생시킨다.
// 좌표계 (d, s) — d: 본문 변에서 뾰족점 쪽으로 파고든 깊이(0=변, XR=끝), s: 변을 따라간 거리(중앙 0).
// 방향별 매퍼는 전부 좌 꼬리의 '회전'이다(거울 아님 — 행렬식 부호가 같다). 그래서 위/아래/좌/우
// 꼬리 실루엣이 완전히 동일하다. Figma 모바일 시안의 위 꼬리는 좌 꼬리와 곡률이 달라 쓰지 않는다.
const TAIL_PTS = [
  [0, -TAIL],
  [XR, 0],
  [0, TAIL],
] as const
const TAIL_CTRL = [
  [
    [0.0001, -13.889],
    [20.9674, -12.234],
  ],
  [
    [20.9656, 13.345],
    [0, 9.444],
  ],
] as const

type TailSide = NonNullable<SchedulePopupProps['tail']>
type TailPoint = (d: number, s: number) => readonly [number, number]

function tailMapper(side: TailSide, w: number, h: number, at: number): TailPoint {
  switch (side) {
    case 'left':
      return (d, s) => [XR - d, at + s]
    case 'right':
      return (d, s) => [w - XR + d, at - s]
    case 'top':
      return (d, s) => [at - s, XR - d]
    case 'bottom':
      return (d, s) => [at + s, h - XR + d]
  }
}

// 외곽선은 시계방향으로 도는데 네 방향 모두 그 진행이 s 가 줄어드는 쪽이라 역방향으로만 편다.
function tailCurve(pt: TailPoint): string {
  const cmds: string[] = []
  for (let i = TAIL_CTRL.length - 1; i >= 0; i -= 1) {
    const [c1, c2] = TAIL_CTRL[i]
    const end = TAIL_PTS[i]
    const [ax, ay] = pt(c2[0], c2[1])
    const [bx, by] = pt(c1[0], c1[1])
    const [ex, ey] = pt(end[0], end[1])
    cmds.push(`C${ax} ${ay} ${bx} ${by} ${ex} ${ey}`)
  }
  return cmds.join(' ')
}

// 말풍선 외곽선 path — 직선 변(가로 w·세로 h)만 늘어나고 모서리(16)·꼬리는 고정.
// at = 꼬리가 붙는 변 위에서 뾰족점의 좌표(가로 변이면 x, 세로 변이면 y).
function bubblePath(w: number, h: number, side: TailSide, at: number): string {
  const pt = tailMapper(side, w, h, at)
  const [sx, sy] = pt(0, TAIL)
  const tail = `${side === 'top' || side === 'bottom' ? `H${sx}` : `V${sy}`} ${tailCurve(pt)}`
  const l = side === 'left' ? XR : 0
  const t = side === 'top' ? XR : 0
  const r = side === 'right' ? w - XR : w
  const b = side === 'bottom' ? h - XR : h
  return [
    `M${l + R} ${t}`,
    side === 'top' ? tail : '',
    `H${r - R}`,
    `A${R} ${R} 0 0 1 ${r} ${t + R}`,
    side === 'right' ? tail : '',
    `V${b - R}`,
    `A${R} ${R} 0 0 1 ${r - R} ${b}`,
    side === 'bottom' ? tail : '',
    `H${l + R}`,
    `A${R} ${R} 0 0 1 ${l} ${b - R}`,
    side === 'left' ? tail : '',
    `V${t + R}`,
    `A${R} ${R} 0 0 1 ${l + R} ${t}`,
    'Z',
  ]
    .filter(Boolean)
    .join(' ')
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
  onMeasure,
  onEdit,
  onDelete,
  className,
}: SchedulePopupProps) {
  const showActions = Boolean(onEdit || onDelete)
  const minH = showActions ? 260 : 210
  const isVertical = tail === 'top' || tail === 'bottom'

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
      const maxBody = Math.max(0, limit - (isVertical ? 0 : XR))
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
  }, [minH, isVertical, maxWidth, event.title, event.dateTime, event.place, event.description])

  // 꼬리를 뺀 본문 사각형 기준 전체 크기.
  const w = isVertical ? bodyW : bodyW + XR
  const h = isVertical ? height + XR : height
  // 꼬리 뾰족점은 꼬리가 붙는 변 위에서 모서리(16) + 꼬리 밑변(31.667) 안쪽으로만 갈 수 있다.
  const span = isVertical ? w : h
  const at = Math.min(Math.max(tailOffset ?? span / 2, R + TAIL), span - R - TAIL)

  // 부모(ScheduleCalendar)가 실제 크기를 알아야 화면 밖으로 안 나가게 배치·뒤집기를 정할 수 있다.
  useLayoutEffect(() => {
    onMeasure?.({ width: w, height: h })
  }, [onMeasure, w, h])

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
      >
        <path d={bubblePath(w, h, tail, at)} fill="white" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div
        ref={contentRef}
        className={cn(
          'relative flex max-w-full flex-col gap-[10px] px-24 py-[19px]',
          tail === 'top'
            ? 'mt-[21px]'
            : tail === 'bottom'
              ? 'mb-[21px]'
              : tail === 'right'
                ? 'mr-[21px]'
                : 'ml-[21px]',
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
