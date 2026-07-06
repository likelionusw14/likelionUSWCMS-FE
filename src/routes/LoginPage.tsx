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
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[320px] rounded border border-gray-300 bg-white p-32"
      >
        <h1 className="text-lg font-bold text-gray-900">멋사 USW CMS</h1>
        <p className="mb-24 mt-4 text-sm text-gray-700">관리자 로그인</p>
        <input
          value={id}
          onChange={(event) => setId(event.target.value)}
          placeholder="아이디"
          className="mb-12 w-full rounded border border-gray-300 px-12 py-8 text-sm outline-none focus:border-primary"
        />
        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>
    </div>
  )
}
