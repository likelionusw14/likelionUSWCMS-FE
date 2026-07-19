// 유리 알약 메뉴(GlassNavMenu) 캡슐 슬라이딩용 공유 트랜지션 — UserHeader/PublicHeader 가
// 알약 안쪽에 계정 버튼 등을 children 으로 꽂을 때도 같은 리듬으로 layout 애니메이트하도록
// 여기서 공유한다. reduce(prefers-reduced-motion) 이면 duration 0.
export function glassNavTransition(reduce: boolean) {
  return { duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const }
}
