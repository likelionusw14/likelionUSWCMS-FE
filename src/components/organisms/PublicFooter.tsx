import githubIcon from '@/assets/icons/github-white.svg'
import instagramIcon from '@/assets/icons/instagram-white.svg'
import notionIcon from '@/assets/icons/notion-white.svg'

// 소셜 아이콘 — 링크 URL 은 디자인에 없어 아직 걸지 않는다.
const SOCIAL_ICONS = [
  { id: 'github', label: '깃허브', icon: githubIcon },
  { id: 'notion', label: '노션', icon: notionIcon },
  { id: 'instagram', label: '인스타그램', icon: instagramIcon },
]

const FOOTER_COLUMNS = [
  { id: 'features', title: 'Features', items: ['Core features', 'Pro experience', 'Integrations'] },
  {
    id: 'learn-more',
    title: 'Learn more',
    items: ['Blog', 'Case studies', 'Customer stories', 'Best practices'],
  },
  { id: 'support', title: 'Support', items: ['Contact', 'Support', 'Legal'] },
]

// 로그인 전(공통) 다크 푸터.
export function PublicFooter() {
  return (
    <footer className="w-full border-t border-secondary-1/30 bg-background-2">
      <div className="mx-auto flex w-full max-w-[1280px] items-start justify-center gap-[120px] px-64 py-[90px]">
        <div className="flex flex-1 flex-col gap-48">
          <div className="flex flex-col gap-8 text-secondary-1">
            <p className="text-sm-22">LIKELION USW</p>
            <p className="text-m-18">수원대학교 멋쟁이사자처럼 00기</p>
          </div>
          <div className="flex items-center gap-8">
            {SOCIAL_ICONS.map((social) => (
              <span key={social.id} className="flex h-48 w-48 items-center justify-center">
                <img src={social.icon} alt={social.label} className="h-24 w-24" />
              </span>
            ))}
          </div>
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
