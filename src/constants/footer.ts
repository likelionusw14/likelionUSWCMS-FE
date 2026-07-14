import type { FooterColumn } from '@types'

// 푸터 링크 칼럼 — 밝은/어두운 푸터가 함께 쓴다. 링크 URL 은 아직 디자인에 없다.
export const FOOTER_COLUMNS: FooterColumn[] = [
  { id: 'features', title: 'Features', items: ['Core features', 'Pro experience', 'Integrations'] },
  {
    id: 'learn-more',
    title: 'Learn more',
    items: ['Blog', 'Case studies', 'Customer stories', 'Best practices'],
  },
  { id: 'support', title: 'Support', items: ['Contact', 'Support', 'Legal'] },
]
