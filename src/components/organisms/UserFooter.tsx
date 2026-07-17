import { BRAND_NAME, BRAND_TAGLINE, SOCIAL_LINKS } from '@constants'

// 사용자 영역 푸터 — 브랜드 정보 + 저작권 + 소셜 링크.
export function UserFooter() {
  return (
    <footer className="w-full bg-secondary-1">
      <div className="mx-auto flex h-[360px] w-full max-w-[1280px] flex-col items-start gap-40 px-64 py-64">
        <div className="flex flex-col gap-8 text-primary">
          <p className="text-sm-22">{BRAND_NAME}</p>
          <p className="text-m-18">{BRAND_TAGLINE}</p>
          <p className="text-m-18">© LIKELION USW ALL RIGHT RESERVED</p>
        </div>

        <div className="relative">
          <nav className="flex h-48 items-center justify-center gap-8 rounded-full bg-white px-16">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-40 w-40 items-center justify-center"
              >
                <img src={social.icon} alt="" className="h-24 w-24" />
              </a>
            ))}
          </nav>
          <span className="absolute left-16 top-40 h-12 w-12 rounded-full bg-white" />
          <span className="absolute left-8 top-[51px] h-[6px] w-[6px] rounded-full bg-white" />
        </div>
      </div>
    </footer>
  )
}
