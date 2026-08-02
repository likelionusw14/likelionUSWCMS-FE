import { BRAND_NAME, BRAND_TAGLINE, SOCIAL_LINKS } from '@constants'
import { cn } from '@utils'
import type { SiteFooterProps } from '@types'

// 공용 사이트 푸터 — 브랜드 정보 + 저작권 + 흰색 소셜 알약(말풍선 꼬리).
// variant 는 배경·글자 색만 바꾼다: 'dark'=공개 홈(background-2), 'light'=사용자·관리자(secondary-1).
// (Figma: 843-2576 블랙 푸터 / 843-2120 라이트 푸터. 링크 칼럼 없는 단일 구성으로 통일.)
const VARIANTS = {
  dark: {
    footer: 'border-secondary-1/30 bg-background-2',
    container: 'py-[90px]',
    brand: 'text-secondary-1',
    sub: 'text-secondary-1',
  },
  light: {
    footer: 'border-secondary-1 bg-secondary-1',
    container: 'h-[360px] py-[60px]',
    brand: 'text-primary',
    sub: 'text-primary/60',
  },
} as const

export function SiteFooter({ variant }: SiteFooterProps) {
  const styles = VARIANTS[variant]

  return (
    <footer className={cn('w-full border-t', styles.footer)}>
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1280px] items-start justify-center px-24 sm:px-32 lg:px-64',
          styles.container,
        )}
      >
        <div className="flex flex-1 flex-col gap-48">
          {/* 브랜드 · 태그라인 · 저작권 */}
          <div className="flex flex-col gap-8">
            <p className={cn('text-sm-22', styles.brand)}>{BRAND_NAME}</p>
            <p className={cn('text-m-18', styles.sub)}>{BRAND_TAGLINE}</p>
            <div className={cn('flex items-center gap-8 text-m-18', styles.sub)}>
              <span>©</span>
              <span>LIKELION USW ALL RIGHTS RESERVED</span>
            </div>
          </div>

          {/* 소셜 알약 — 흰 배경이라 두 테마 모두 컬러 아이콘(icon)을 쓴다. */}
          <div className="relative">
            <nav className="flex h-48 w-[194px] items-center justify-center gap-8 rounded-full bg-white">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-48 w-48 items-center justify-center"
                >
                  <img src={social.icon} alt="" className="h-24 w-24" />
                </a>
              ))}
            </nav>
            {/* 말풍선 꼬리 — 알약 좌하단으로 이어지는 원 두 개(Figma 좌표). */}
            <span className="absolute left-[22px] top-[42px] h-12 w-12 rounded-full bg-white" />
            <span className="absolute left-16 top-[53px] h-[6px] w-[6px] rounded-full bg-white" />
          </div>
        </div>
      </div>
    </footer>
  )
}
