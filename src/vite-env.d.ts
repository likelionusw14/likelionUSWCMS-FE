/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 백엔드 API Base URL (.env 의 VITE_API_BASE_URL) */
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
