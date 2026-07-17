// 페이지 전환 프리셋 — 크로스페이드(이전 흐려짐 + 새 진해짐 동시). 두 셸이 동일 리듬을 공유한다.
// reduce(prefers-reduced-motion) 이면 duration 0.
export function pageFadeTransition(reduce: boolean) {
  return { duration: reduce ? 0 : 0.35, ease: 'easeInOut' as const }
}

export const pageFadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}
