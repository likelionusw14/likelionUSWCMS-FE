import { Button } from '@atoms'
import { ROLE_LABEL } from '@constants'
import type { LoginFormProps, Role } from '@types'

// AGENTS.md에 라우트에는 비즈니스 로직을 직접 넣지말고 훅만 조합하도록 명시되어있으므로 LoginPage 에서 분리한 폼 UI.
// 데모 로그인: 백엔드 연동 전, 역할을 선택해 각 영역을 확인한다.
const DEMO_ROLES: Role[] = ['GUEST', 'MEMBER', 'STAFF']

export function LoginForm({ role, onRoleChange, id, onIdChange, error, onSubmit }: LoginFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-[320px] rounded border border-gray-300 bg-white p-32"
    >
      <h1 className="text-sm-22 text-gray-900">멋사 USW CMS</h1>
      <p className="mb-24 mt-4 text-r-14 text-gray-700">로그인 (백엔드 연동 전 데모)</p>

      <label htmlFor="login-role" className="mb-4 block text-r-14 text-gray-700">
        역할 선택
      </label>
      <select
        id="login-role"
        value={role}
        onChange={(event) => onRoleChange(event.target.value as Role)}
        className="mb-12 w-full rounded border border-gray-300 px-12 py-8 text-r-14 outline-none focus:border-primary"
      >
        {DEMO_ROLES.map((r) => (
          <option key={r} value={r}>
            {ROLE_LABEL[r]}
          </option>
        ))}
      </select>

      <input
        value={id}
        onChange={(event) => onIdChange(event.target.value)}
        placeholder="아이디 (선택)"
        aria-label="아이디"
        className="mb-12 w-full rounded border border-gray-300 px-12 py-8 text-r-14 outline-none focus:border-primary"
      />
      {error ? <p className="mb-12 text-r-14 text-error">{error}</p> : null}
      <Button type="submit" className="w-full">
        {role === 'GUEST' ? '게스트로 둘러보기' : '로그인'}
      </Button>
    </form>
  )
}
