import githubIcon from '@/assets/icons/github.svg'
import instagramIcon from '@/assets/icons/instagram.svg'
import notionIcon from '@/assets/icons/notion.svg'

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

// 관리자 하단 푸터 — 브랜드/소셜 + 링크 칼럼 3개.
export function AdminFooter() {
  return (
    <footer className="w-full border-t border-secondary-1 bg-secondary-1/80">
      <div className="mx-auto flex h-[360px] w-full max-w-[1280px] items-start justify-center gap-[120px] px-64 py-[60px]">
        <div className="flex flex-1 flex-col gap-48">
          <div className="flex flex-col gap-8">
            <p className="text-sm-22 text-primary">LIKELION USW</p>
            <p className="text-m-18 text-primary/60">수원대학교 멋쟁이사자처럼 00기</p>
          </div>
          <div className="relative opacity-80">
            <div className="flex h-48 w-[194px] items-center justify-center gap-8 overflow-hidden rounded-full bg-white px-[15px]">
              {SOCIAL_ICONS.map((social) => (
                <span key={social.id} className="flex h-48 w-48 items-center justify-center">
                  <img src={social.icon} alt={social.label} className="h-24 w-24" />
                </span>
              ))}
            </div>
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
