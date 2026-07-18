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
// 헤더가 배경 없는 backdrop-blur 유리판(UserHeader)이라, 히어로를 헤더 높이(80px)만큼
// 끌어올려 처음부터 다크 히어로가 헤더 블러 뒤로 비치게 한다(안 그러면 헤더 구간이
// 블러할 대상이 없어 밝은 페이지 배경이 그대로 노출된다).
export function UserHomePage() {
  return (
    <>
      <div className="-mt-[80px]">
        <HomeHero />
      </div>
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
