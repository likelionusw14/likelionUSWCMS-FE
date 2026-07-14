import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@utils'

// 가운데 강조 카드 — Figma 원문 문구 그대로.
const FEATURED_REVIEW = {
  id: 'review-featured',
  name: '김ㅇㅇ',
  part: '기획',
  content:
    '아이디어를 직접 내고 실제 서비스로 구현해내는 과정이 다른 어떤 곳에서도 쉽게 경험할 수 없는 것이라 굉장히 소중하고 의미 있게 다가왔어요.',
} as const

// 강조 카드 좌우로 흐릿하게 깔리는 배경 카드 6장 (앞 3장이 왼쪽, 뒤 3장이 오른쪽).
// 디자인상 바깥쪽일수록 블러가 강하다(4px) / 안쪽은 약하다(1.5px).
const SIDE_REVIEWS = [
  {
    id: 'review-left-1',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '세미나 퀄리티에 너무 만족했어요! 자료도 너무 좋았고, 하나부터 친절하게 설명해주셔서 얻어가는 부분이 굉장히 많았습니다 :)',
    blurClassName: 'blur-[4px]',
  },
  {
    id: 'review-left-2',
    name: '김ㅇㅇ',
    part: '기획',
    content: '코딩데이 때 배운 것을 직접 적용해보는 과정에서 상당히 얻어가는 게 많다고 느꼈어요.',
    blurClassName: 'blur-[4px]',
  },
  {
    id: 'review-left-3',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '오피스투어 때 현직자 분들과 이야기를 나눌 수 있어 좋았습니다! 또한 고려대 멋사 분들과 여러 활동을 함께하며 보다 넓은 시각을 가지게 된 것 같아요!',
    blurClassName: 'blur-[1.5px]',
  },
  {
    id: 'review-right-1',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '오피스투어 때 현직자 분들과 이야기를 나눌 수 있어 좋았습니다! 또한 고려대 멋사 분들과 여러 활동을 함께하며 보다 넓은 시각을 가지게 된 것 같아요!',
    blurClassName: 'blur-[1.5px]',
  },
  {
    id: 'review-right-2',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '세미나 퀄리티에 너무 만족했어요! 자료도 너무 좋았고, 하나부터 친절하게 설명해주셔서 얻어가는 부분이 굉장히 많았습니다 :)',
    blurClassName: 'blur-[4px]',
  },
  {
    id: 'review-right-3',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '세미나 퀄리티에 너무 만족했어요! 자료도 너무 좋았고, 하나부터 친절하게 설명해주셔서 얻어가는 부분이 굉장히 많았습니다 :)',
    blurClassName: 'blur-[4px]',
  },
] as const

// 홈 "리뷰" 섹션 — 가운데 카드만 크고 선명하게 강조하고 좌우 카드는 흐리게 깔아 안쪽으로 시선을 모은다.
export function HomeReviews() {
  const reduceMotion = useReducedMotion()

  // 좌우 배경 카드 한 장. 디자인의 80% 불투명도는 클래스 대신 모션 목표값으로 둔다
  // (framer 가 인라인 opacity 를 쓰기 때문에 opacity-80 클래스와 충돌한다).
  const renderSideCard = (review: (typeof SIDE_REVIEWS)[number], index: number) => (
    <motion.li
      key={review.id}
      className={cn('flex w-[272px] shrink-0 flex-col', review.blurClassName)}
      initial={reduceMotion ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 0.8, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.06 }}
    >
      <div className="flex w-full flex-col gap-[2px] rounded-t-16 bg-primary px-16 py-8 text-white">
        {/* 이름 12px Semibold / 파트 10px Medium — 10px 토큰이 없어 가장 가까운 text-r-12 로 근사 */}
        <span className="text-r-12 font-semibold">{review.name}</span>
        <span className="truncate text-r-12 font-medium">{review.part}</span>
      </div>
      <div className="flex w-full items-center justify-center rounded-b-16 bg-secondary-1 px-16 py-24">
        {/* 본문 14px Medium / 줄간격 20px — 14px 본문 토큰이 없어 text-m-14 + leading 임의값 */}
        <p className="text-m-14 leading-[20px] text-black">{review.content}</p>
      </div>
    </motion.li>
  )

  return (
    // 디자인 상하 여백은 90 / 180 — 둘 다 spacing 토큰에 없는 고정 치수라 임의값으로 정확히 맞춘다.
    <section className="relative w-full overflow-hidden bg-background-1 pb-[180px] pt-[90px]">
      {/* 배경 방사형 글로우 — Figma 의 640x640 그라디언트 효과(1280 프레임 기준 left 808 / top -128)를 blur 로 근사 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[calc(50%+168px)] top-[-128px] h-[640px] w-[640px] rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-96">
        <motion.div
          className="flex flex-col items-center gap-12 whitespace-nowrap px-64"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <h2 className="text-h1 text-black">리뷰</h2>
          <p className="text-m-18 text-secondary-2">리뷰를 확인해보세요!</p>
        </motion.div>

        {/* 카드 줄은 좌우 여백(px-64) 없이 프레임 폭 그대로 쓰고, 넘치는 카드는 잘라낸다 (디자인의 overflow clip). */}
        <ul className="flex w-full items-center justify-center gap-32 overflow-hidden">
          {SIDE_REVIEWS.slice(0, 3).map((review, index) => renderSideCard(review, index))}

          {/* 강조 카드 — 디자인 모서리는 24px 이지만 radius 토큰(4/8/16)에 없어 rounded-16 으로 맞춘다.
              헤더 위 흰 하이라이트 + 본문 아래 primary 음영은 shadow-emboss-light 한 쌍으로 재현한다. */}
          <motion.li
            className="flex w-[380px] shrink-0 flex-col"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.12 }}
          >
            <div className="flex w-full flex-col gap-4 rounded-t-16 bg-primary px-24 py-8 text-white shadow-emboss-light">
              <span className="text-sm-16 font-bold">{FEATURED_REVIEW.name}</span>
              <span className="truncate text-m-14">{FEATURED_REVIEW.part}</span>
            </div>
            {/* 본문 배경 — Figma: 흰색 베이스 위 primary 25% → secondary-1 0% 세로(180°) 그라디언트.
                등록된 4종 그라디언트 스타일이 아니라(bg-gradient-white 는 우하단 방사형이라 방향이 다르다)
                팔레트 토큰 + 불투명도 유틸로 같은 값을 재현한다. */}
            <div className="flex w-full flex-col rounded-b-16 bg-white bg-gradient-to-b from-primary/25 to-secondary-1/0 px-24 py-32 shadow-emboss-light">
              <p className="text-m-18-body text-black">{FEATURED_REVIEW.content}</p>
            </div>
          </motion.li>

          {SIDE_REVIEWS.slice(3).map((review, index) => renderSideCard(review, index + 3))}
        </ul>
      </div>
    </section>
  )
}
