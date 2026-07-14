import { BRAND_NAME, BRAND_TAGLINE, FOOTER_COLUMNS, SOCIAL_LINKS } from '@constants'

// 관리자(밝은 배경) 푸터 — 브랜드/소셜 + 링크 칼럼 3개.
export function AdminFooter() {
  return (
    <footer className="w-full border-t border-secondary-1 bg-secondary-1/80">
      <div className="mx-auto flex h-[360px] w-full max-w-[1280px] items-start justify-center gap-[120px] px-64 py-[60px]">
        <div className="flex flex-1 flex-col gap-48">
          <div className="flex flex-col gap-8">
            <p className="text-sm-22 text-primary">{BRAND_NAME}</p>
            <p className="text-m-18 text-primary/60">{BRAND_TAGLINE}</p>
          </div>
          <div className="relative opacity-80">
            <nav className="flex h-48 w-[194px] items-center justify-center gap-8 overflow-hidden rounded-full bg-white px-[15px]">
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
            {/* 말풍선 꼬리 — 원 두 개로 이어지는 장식. */}
            <span className="absolute left-[17px] top-[42px] h-12 w-12 rounded-full bg-white" />
            <span className="absolute left-[11px] top-[53px] h-[6px] w-[6px] rounded-full bg-white" />
          </div>
        </div>
        <div className="flex items-start gap-40">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.id} className="flex w-[136px] flex-col justify-center gap-16">
              <p className="text-sm-16 text-primary">{column.title}</p>
              <div className="flex flex-col gap-8">
                {column.items.map((item) => (
                  <p key={item} className="text-m-16 text-primary/60">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
