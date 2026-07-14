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
  PublicFooter,
  PublicHeader,
} from '@organisms'
import { PUBLIC_APPLY, PUBLIC_NAV } from './nav'

// 사용자(공개) 홈 — 디자인 순서대로 섹션을 쌓는다. 게스트/비로그인 포함 누구나 접근.
export function CommonHomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-2">
      <PublicHeader navItems={PUBLIC_NAV} applyItem={PUBLIC_APPLY} />
      <main className="flex-1">
        <HomeHero />
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
      <PublicFooter />
    </div>
  )
}
