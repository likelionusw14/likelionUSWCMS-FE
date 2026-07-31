import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@utils'

// 홈 "리뷰" 캐러셀 데이터 — Figma 원문 문구 그대로. 배열 가운데 카드가 첫 화면의 강조 카드다.
// 강조/흐림은 카드 데이터가 아니라 "스크롤포트 가운데와의 거리"로 계산하므로
// 배열만 갈아끼우면(추후 API 연동) 카드 수가 바뀌어도 그대로 동작한다.
const REVIEWS = [
  {
    id: 'review-1',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '세미나 퀄리티에 너무 만족했어요! 자료도 너무 좋았고, 하나부터 친절하게 설명해주셔서 얻어가는 부분이 굉장히 많았습니다 :)',
  },
  {
    id: 'review-2',
    name: '김ㅇㅇ',
    part: '기획',
    content: '코딩데이 때 배운 것을 직접 적용해보는 과정에서 상당히 얻어가는 게 많다고 느꼈어요.',
  },
  {
    id: 'review-3',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '오피스투어 때 현직자 분들과 이야기를 나눌 수 있어 좋았습니다! 또한 고려대 멋사 분들과 여러 활동을 함께하며 보다 넓은 시각을 가지게 된 것 같아요!',
  },
  {
    id: 'review-4',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '아이디어를 직접 내고 실제 서비스로 구현해내는 과정이 다른 어떤 곳에서도 쉽게 경험할 수 없는 것이라 굉장히 소중하고 의미 있게 다가왔어요.',
  },
  {
    id: 'review-5',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '오피스투어 때 현직자 분들과 이야기를 나눌 수 있어 좋았습니다! 또한 고려대 멋사 분들과 여러 활동을 함께하며 보다 넓은 시각을 가지게 된 것 같아요!',
  },
  {
    id: 'review-6',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '세미나 퀄리티에 너무 만족했어요! 자료도 너무 좋았고, 하나부터 친절하게 설명해주셔서 얻어가는 부분이 굉장히 많았습니다 :)',
  },
  {
    id: 'review-7',
    name: '김ㅇㅇ',
    part: '기획',
    content:
      '세미나 퀄리티에 너무 만족했어요! 자료도 너무 좋았고, 하나부터 친절하게 설명해주셔서 얻어가는 부분이 굉장히 많았습니다 :)',
  },
] as const

// 첫 화면에서 스크롤포트 가운데에 두는 카드 (배열 중앙).
const INITIAL_INDEX = Math.floor(REVIEWS.length / 2)

// 홈 "리뷰" 섹션 — 가로 스크롤 스냅 캐러셀.
// 가운데에 온 카드가 크고 선명한 강조 카드가 되고, 밀려난 카드는 거리에 비례해 흐려진다
// (한 칸 밖 1.5px / 두 칸 이상 4px — 디자인의 레이어 블러 값 그대로).
export function HomeReviews() {
  const reduceMotion = useReducedMotion()
  const listRef = useRef<HTMLUListElement>(null)
  const frameRef = useRef(0)
  // 스크롤포트 가운데에 가장 가까운 카드 인덱스 — 이 카드가 강조 카드다.
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX)

  // index 카드의 중심을 스크롤포트 가운데로 보낸다 (마운트 시 즉시 / 클릭 시 부드럽게).
  const centerCard = (index: number, behavior: ScrollBehavior) => {
    const list = listRef.current
    const card = list?.children.item(index)
    if (!list || !card) return
    const listBox = list.getBoundingClientRect()
    const cardBox = card.getBoundingClientRect()
    const delta = cardBox.left + cardBox.width / 2 - (listBox.left + listBox.width / 2)
    list.scrollTo({ left: list.scrollLeft + delta, behavior })
  }

  // 스냅 컨테이너는 스크롤 0 = 맨 왼쪽 카드이므로 레이아웃 직후 강조 카드를 가운데로 밀어준다.
  useLayoutEffect(() => {
    centerCard(INITIAL_INDEX, 'auto')
    return () => cancelAnimationFrame(frameRef.current)
    // eslint 의도: 마운트 1회만 실행
  }, [])

  // 스크롤 때마다(프레임당 1회로 스로틀) 가운데에 가장 가까운 카드를 찾아 강조를 옮긴다.
  const handleScroll = () => {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      const list = listRef.current
      if (!list) return
      const listBox = list.getBoundingClientRect()
      const center = listBox.left + listBox.width / 2
      let nearest = 0
      let minDistance = Number.POSITIVE_INFINITY
      Array.from(list.children).forEach((card, index) => {
        const cardBox = card.getBoundingClientRect()
        const distance = Math.abs(cardBox.left + cardBox.width / 2 - center)
        if (distance < minDistance) {
          minDistance = distance
          nearest = index
        }
      })
      setActiveIndex(nearest)
    })
  }

  return (
    // 디자인 상하 여백은 90 / 180 — 둘 다 spacing 토큰에 없는 고정 치수라 임의값으로 정확히 맞춘다.
    <section className="relative w-full overflow-hidden bg-background-1 pb-96 pt-[90px] lg:pb-[180px]">
      {/* 배경 방사형 글로우 — Figma 의 640x640 그라디언트 효과(1280 프레임 기준 left 808 / top -128)를 blur 로 근사 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[calc(50%+168px)] top-[-128px] h-[640px] w-[640px] rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="relative flex w-full flex-col items-center gap-64 lg:gap-96">
        <motion.div
          className="flex flex-col items-center gap-12 whitespace-nowrap px-24 sm:px-32 lg:px-64"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <h2 className="text-h1 text-black">리뷰</h2>
          <p className="text-m-18 text-secondary-2">리뷰를 확인해보세요!</p>
        </motion.div>

        {/* 카드 줄 — 가로 스크롤 스냅 캐러셀.
            카드 레이아웃 폭은 전부 동일(w-[320px])하게 고정하고 강조/축소는 안쪽 래퍼의
            transform·blur·opacity 로만 처리한다 — 스크롤 중 레이아웃이 변하면 스냅 지점이 밀려 튄다.
            좌우 패딩 (뷰포트-카드)/2 → 양 끝 카드도 가운데까지 와서 잘리지 않는다.
            세로 패딩은 blur 헤일로·엠보 그림자가 스크롤 영역에 잘리지 않게 두는 여백. */}
        <ul
          ref={listRef}
          onScroll={handleScroll}
          aria-label="리뷰 목록"
          tabIndex={0}
          className="no-scrollbar flex w-full snap-x snap-mandatory items-center gap-24 overflow-x-auto overscroll-x-contain px-[max(24px,calc((100%_-_min(320px,calc(100vw_-_64px)))/2))] py-16 sm:gap-48"
        >
          {REVIEWS.map((review, index) => {
            const distance = Math.abs(index - activeIndex)
            const isActive = distance === 0
            return (
              <motion.li
                key={review.id}
                onClick={() => centerCard(index, reduceMotion ? 'auto' : 'smooth')}
                className="w-[min(320px,calc(100vw-64px))] shrink-0 cursor-pointer snap-center snap-always"
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : index * 0.06,
                }}
              >
                {/* 강조 상태 전환은 이 래퍼에서만 처리: scale(강조 1.08 / 축소 0.92)·blur·opacity.
                    framer 는 li 의 등장 모션(opacity·y)만 다루므로 인라인 transform 충돌이 없다. */}
                <div
                  className={cn(
                    'flex w-full flex-col transition-[transform,filter,opacity] duration-300 ease-out motion-reduce:transition-none',
                    isActive ? 'scale-[1.08]' : 'scale-[0.92] opacity-80',
                    distance === 1 && 'blur-[1.5px]',
                    distance >= 2 && 'blur-[4px]',
                  )}
                >
                  {/* 헤더 — 강조: 16px Bold / 축소: 12px (10px 토큰이 없어 가장 가까운 text-r-12 로 근사) */}
                  <div
                    className={cn(
                      'flex w-full flex-col rounded-t-16 bg-primary text-white',
                      isActive ? 'gap-4 px-24 py-8 shadow-emboss-light' : 'gap-[2px] px-16 py-8',
                    )}
                  >
                    <span
                      className={cn(isActive ? 'text-sm-16 font-bold' : 'text-r-12 font-semibold')}
                    >
                      {review.name}
                    </span>
                    <span
                      className={cn('truncate', isActive ? 'text-m-14' : 'text-r-12 font-medium')}
                    >
                      {review.part}
                    </span>
                  </div>
                  {/* 본문 — 강조: Figma 의 흰색 베이스 위 primary 25% → secondary-1 0% 세로 그라디언트 + 엠보
                      (등록된 4종 그라디언트 스타일이 아니라 팔레트 토큰 + 불투명도 유틸로 재현).
                      축소: secondary-1 단색. 14px 본문 토큰이 없어 text-m-14 + leading 임의값. */}
                  <div
                    className={cn(
                      'flex w-full rounded-b-16',
                      isActive
                        ? 'bg-white bg-gradient-to-b from-primary/25 to-secondary-1/0 px-24 py-32 shadow-emboss-light'
                        : 'bg-secondary-1 px-16 py-24',
                    )}
                  >
                    <p
                      className={cn(
                        'text-black',
                        isActive ? 'text-m-18-body' : 'text-m-14 leading-[20px]',
                      )}
                    >
                      {review.content}
                    </p>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
