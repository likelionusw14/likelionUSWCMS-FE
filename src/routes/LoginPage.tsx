import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@atoms'
import { useAuthStore } from '@store'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [id, setId] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // 백엔드 연동 전 임시 처리: 입력값을 토큰처럼 저장하고 대시보드로 이동.
    login(id || 'demo-token')
    navigate('/')
  }

  return (
    <div className="flex h-screen items-center justify-center bg-surface-subtle">
      <form
        onSubmit={handleSubmit}
        className="w-80 rounded-card-lg border border-surface-border bg-surface-base p-8"
      >
        <h1 className="text-lg font-bold text-content">멋사 USW CMS</h1>
        <p className="mb-6 mt-1 text-sm text-content-muted">관리자 로그인</p>
        <input
          value={id}
          onChange={(event) => setId(event.target.value)}
          placeholder="아이디"
          className="mb-3 w-full rounded-card border border-surface-border px-3 py-2 text-sm outline-none focus:border-brand"
        />
        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>
    </div>
  )
}
