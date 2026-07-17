import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Entity } from '@types'

// 관리 폼(작성·수정) 공통 상태 훅.
// - toValues: 엔티티 → 폼 값 매핑 (엔티티 없으면 빈 폼).
// - toFileName: 엔티티 → 첨부 파일명 (edit 진입 시 기존 파일명 하이드레이트). 없으면 파일 필드 미사용.
// - redirectTo: 저장/취소 후 이동 경로.
// 엔티티가 뒤늦게 도착(백엔드 async)하거나 바뀌면 폼 값·파일명을 다시 채운다.
export function useEntityForm<TEntity extends Entity, TValues extends object>(options: {
  entity: TEntity | undefined
  toValues: (entity: TEntity | undefined) => TValues
  toFileName?: (entity: TEntity | undefined) => string
  redirectTo: string
}) {
  const { entity, toValues, toFileName, redirectTo } = options
  const navigate = useNavigate()

  const [values, setValues] = useState<TValues>(() => toValues(entity))
  const [fileName, setFileName] = useState(() => toFileName?.(entity) ?? '')

  // 엔티티 정체성이 바뀔 때만 재하이드레이트 (매 렌더 리셋 방지). 신규 폼(entity 없음)은 id ''.
  const hydratedId = useRef(entity?.id ?? '')
  useEffect(() => {
    const nextId = entity?.id ?? ''
    if (nextId === hydratedId.current) return
    hydratedId.current = nextId
    setValues(toValues(entity))
    setFileName(toFileName?.(entity) ?? '')
  }, [entity, toValues, toFileName])

  function setField<K extends keyof TValues>(field: K, value: TValues[K]) {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(redirectTo)
  }

  return { values, setField, handleSubmit, fileName, setFileName }
}
