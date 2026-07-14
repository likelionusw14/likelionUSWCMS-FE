import githubIcon from '@/assets/icons/github.svg'
import githubIconOnDark from '@/assets/icons/github-white.svg'
import instagramIcon from '@/assets/icons/instagram.svg'
import instagramIconOnDark from '@/assets/icons/instagram-white.svg'
import notionIcon from '@/assets/icons/notion.svg'
import notionIconOnDark from '@/assets/icons/notion-white.svg'
import type { SocialLink } from '@types'

// 푸터 소셜 링크 — 주소는 여기서만 관리한다 (밝은/어두운 푸터가 함께 쓴다).
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: '깃허브',
    href: 'https://github.com/likelionusw14',
    icon: githubIcon,
    iconOnDark: githubIconOnDark,
  },
  {
    id: 'notion',
    label: '노션',
    href: 'https://app.notion.com/p/14-2f8ab5205e98810c9855d2918c0f7032?source=copy_link',
    icon: notionIcon,
    iconOnDark: notionIconOnDark,
  },
  {
    id: 'instagram',
    label: '인스타그램',
    href: 'https://www.instagram.com/likelion_suwon/',
    icon: instagramIcon,
    iconOnDark: instagramIconOnDark,
  },
]
