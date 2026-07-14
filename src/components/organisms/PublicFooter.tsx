import { BRAND_NAME, BRAND_TAGLINE, FOOTER_COLUMNS, SOCIAL_LINKS } from '@constants'

// 로그인 전(공통) 다크 푸터.
export function PublicFooter() {
  return (
    <footer className="w-full border-t border-secondary-1/30 bg-background-2">
      <div className="mx-auto flex w-full max-w-[1280px] items-start justify-center gap-[120px] px-64 py-[90px]">
        <div className="flex flex-1 flex-col gap-48">
          <div className="flex flex-col gap-8 text-secondary-1">
            <p className="text-sm-22">{BRAND_NAME}</p>
            <p className="text-m-18">{BRAND_TAGLINE}</p>
          </div>
          <nav className="flex items-center gap-8">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-48 w-48 items-center justify-center"
              >
                <img src={social.iconOnDark} alt="" className="h-24 w-24" />
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-start gap-40">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.id} className="flex w-[136px] flex-col justify-center gap-16">
              <p className="text-sm-16 text-background-1">{column.title}</p>
              <div className="flex flex-col gap-8">
                {column.items.map((item) => (
                  <p key={item} className="text-m-16 text-background-1">
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
