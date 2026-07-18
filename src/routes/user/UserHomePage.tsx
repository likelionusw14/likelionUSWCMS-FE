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
} from '@organisms'

// 사용자 홈 — 사용자 전용 헤더·푸터 사이에 공개 홈과 동일한 콘텐츠를 조합한다.
export function UserHomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeStats />
      <HomeMarquee />
      <HomeParts />
      <HomeBrandMarquee />
      <HomeCurriculum />
      <HomeProjects moreHref="/app/projects" />
      <HomeReviews />
      <HomeApply />
    </>
  )
}
