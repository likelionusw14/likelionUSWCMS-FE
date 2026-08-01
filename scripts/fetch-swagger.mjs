// 백엔드 OpenAPI(Swagger) 스키마를 내려받아 openapi/openapi.yaml 로 저장한다.
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

const out = resolve('openapi/openapi.yaml')

const res = await fetch(url)
if (!res.ok) {
  console.error(`[api:fetch] 다운로드 실패: HTTP ${res.status}`)
  process.exit(1)
}

const schema = await res.text()

// springdoc(/v3/api-docs)은 한 줄짜리 JSON 을 돌려준다. 그대로 저장하면 diff 가 통째로
// 한 줄이라 리뷰가 불가능하므로 들여쓴다 — JSON 은 YAML 의 부분집합이라 .yaml 로 둬도 파싱된다.
function formatted(text) {
  try {
    return `${JSON.stringify(JSON.parse(text), null, 2)}\n`
  } catch {
    // YAML 응답(SwaggerHub export 등)은 손대지 않고 그대로 쓴다.
    return text.endsWith('\n') ? text : `${text}\n`
  }
}

await mkdir(dirname(out), { recursive: true })
await writeFile(out, formatted(schema), 'utf8')
console.log(`[api:fetch] 저장 완료 → ${out}`)
