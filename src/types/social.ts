// 푸터 소셜 링크. 아이콘은 배경에 따라 두 벌(밝은 배경 / 어두운 배경)이다.
export interface SocialLink {
  id: string
  label: string
  href: string
  icon: string
  iconOnDark: string
}

// 푸터 링크 칼럼.
export interface FooterColumn {
  id: string
  title: string
  items: string[]
}
