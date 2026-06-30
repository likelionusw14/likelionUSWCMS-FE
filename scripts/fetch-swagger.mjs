// 백엔드 OpenAPI(Swagger) 스키마를 내려받아 openapi/openapi.json 으로 저장한다.
// 사용: SWAGGER_URL=https://api.example.com/openapi.json npm run api:fetch
// 이후 `npm run api:types` 로 src/api/types.generated.ts 를 생성한다. (api:sync = 둘 다)
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const url = process.env.SWAGGER_URL
if (!url) {
  console.error('[api:fetch] SWAGGER_URL 환경 변수가 필요합니다.')
  console.error('  예) SWAGGER_URL=https://api.example.com/openapi.json npm run api:fetch')
  process.exit(1)
}

const out = resolve('openapi/openapi.json')

const res = await fetch(url)
if (!res.ok) {
  console.error(`[api:fetch] 다운로드 실패: HTTP ${res.status}`)
  process.exit(1)
}

const json = await res.json()
await mkdir(dirname(out), { recursive: true })
await writeFile(out, JSON.stringify(json, null, 2) + '\n', 'utf8')
console.log(`[api:fetch] 저장 완료 → ${out}`)
