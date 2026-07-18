import { useId } from 'react'
import type { SpeechBubbleProps } from '@types'

// 말풍선 벡터 — 흰 배경 + primary 그라디언트 오버레이(안쪽 그림자 포함).
// 부모의 group-hover 시 배경이 흰→primary 로 전환된다(색만 바뀌고 형태는 동일).
// SVG 내부 filter/gradient/clip id 는 인스턴스마다 useId 로 네임스페이스해 중복을 피한다.
export function SpeechBubble({ className }: SpeechBubbleProps) {
  const uid = useId()
  const filterId = `bubble-shadow-${uid}`
  const gradientId = `bubble-grad-${uid}`
  const clipId = `bubble-clip-${uid}`

  const bubblePath =
    'M45.959 0C26.5186 0 10.7588 15.7598 10.7588 35.2002V112.8C10.7588 116.545 11.3463 120.153 12.4297 123.538C10.8469 135.359 3.86108 143.252 0 146.15C9.59149 148.175 22.6457 145.735 29.4375 143.887C34.3643 146.511 39.9875 148 45.959 148H404.8C424.24 148 440 132.24 440 112.8V35.2002C440 15.7598 424.24 0 404.8 0H45.959Z'

  return (
    <svg
      viewBox="0 0 440 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g clipPath={`url(#${clipId})`}>
        <g filter={`url(#${filterId})`}>
          {/* 베이스 — 호버 시 흰→primary 로 전환 */}
          <path
            d={bubblePath}
            className="fill-white transition-colors duration-300 group-hover:fill-primary motion-reduce:transition-none"
          />
          {/* primary 그라디언트 오버레이(깊이감) */}
          <path d={bubblePath} fill={`url(#${gradientId})`} fillOpacity="0.5" />
        </g>
      </g>
      <defs>
        <filter
          id={filterId}
          x="0"
          y="-4"
          width="440"
          height="156"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.227451 0 0 0 0 0.376471 0 0 0 0 0.984314 0 0 0 0.5 0"
          />
          <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow" />
        </filter>
        <linearGradient
          id={gradientId}
          x1="220"
          y1="0"
          x2="220"
          y2="148"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3A60FB" stopOpacity="0.5" />
          <stop offset="1" stopColor="#D7E2FF" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect width="440" height="148" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
