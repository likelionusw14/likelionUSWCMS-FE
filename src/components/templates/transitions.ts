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

// 관리자 사이드바 오버레이 프리셋 — 드로어 슬라이드·스크림 페이드·상단바 햄버거 자리 접힘이
// 같은 리듬으로 움직여야 "사이드바가 밀려나가며 제목이 따라 붙는" 하나의 동작으로 보인다.
// 세 곳(AdminSidebarDrawer 의 스크림/패널, AdminTopBar 의 햄버거 슬롯)이 이 값을 공유한다.
export function sidebarTransition(reduce: boolean) {
  return { duration: reduce ? 0 : 0.25, ease: 'easeInOut' as const }
}
