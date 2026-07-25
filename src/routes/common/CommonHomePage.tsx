import {
  HomeApply,
  HomeBrandMarquee,
  HomeCurriculum,
  HomeHero,
  HomeIntro,
  HomeMarquee,
  HomeParts,
  HomeProjects,
  HomeReviews,
  HomeStats,
  PublicHeader,
  SiteFooter,
} from '@organisms'
import { PUBLIC_NAV } from './nav'

// 사용자(공개) 홈 — 디자인 순서대로 섹션을 쌓는다. 게스트/비로그인 포함 누구나 접근.
// 헤더가 배경 없는 backdrop-blur 유리판(PublicHeader)이라, 히어로를 헤더 높이(80px)만큼
// 끌어올려 처음부터 다크 히어로가 헤더 블러 뒤로 비치게 한다.
export function CommonHomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-2">
      <PublicHeader navItems={PUBLIC_NAV} tone="dark" />
      <main className="flex-1">
        <div className="-mt-[80px]">
          <HomeHero />
        </div>
        <HomeIntro />
        <HomeStats />
        <HomeMarquee />
        <HomeParts />
        <HomeBrandMarquee />
        <HomeCurriculum />
        <HomeProjects />
        <HomeReviews />
        <HomeApply />
      </main>
      <SiteFooter variant="dark" />
    </div>
  )
}
