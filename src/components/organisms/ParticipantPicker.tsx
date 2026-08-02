import { useState } from 'react'
import { Input } from '@atoms'
import { useAccountSearch } from '@hooks'
import type { ParticipantPickerProps } from '@types'

// 프로젝트 참여자 선택 — 회원을 검색해 고르고, 역할은 고른 사람의 파트로 자동 채운다.
// API(ProjectParticipantRequest)는 userId 가 필수라 자유 텍스트로는 참여자를 저장할 수 없다.
// 역할은 자유 텍스트(maxLength 100)라 담당자가 '팀장' 등으로 고쳐도 된다.
export function ParticipantPicker({ value, onChange }: ParticipantPickerProps) {
  const [keyword, setKeyword] = useState('')
  const { data: candidates } = useAccountSearch(keyword)

  // 이미 고른 사람은 후보에서 뺀다.
  const selectable = candidates.filter(
    (candidate) => !value.some((participant) => participant.userId === candidate.userId),
  )

  function add(userId: number) {
    const picked = candidates.find((candidate) => candidate.userId === userId)
    if (!picked) return
    onChange([...value, picked])
    setKeyword('')
  }

  function setRole(userId: number, role: string) {
    onChange(
      value.map((participant) =>
        participant.userId === userId ? { ...participant, role } : participant,
      ),
    )
  }

  function remove(userId: number) {
    onChange(value.filter((participant) => participant.userId !== userId))
  }

  return (
    <div className="flex w-full min-w-px flex-col gap-8 py-8">
      <div className="relative">
        <Input
          variant="form"
          className="min-w-px"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="이름으로 회원 검색"
        />
        {selectable.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-20 mt-4 flex max-h-[192px] flex-col overflow-y-auto rounded-8 border border-secondary-1 bg-background-1 py-8">
            {selectable.map((candidate) => (
              <li key={candidate.userId}>
                <button
                  type="button"
                  onClick={() => add(candidate.userId)}
                  className="flex w-full items-center gap-8 px-16 py-8 text-left text-m-14 text-black"
                >
                  <span className="truncate">{candidate.name}</span>
                  <span className="shrink-0 text-r-12 text-primary/50">
                    {candidate.cohortNumber}기 · {candidate.part}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {value.length > 0 && (
        <ul className="flex flex-col gap-8">
          {value.map((participant) => (
            <li key={participant.userId} className="flex items-center gap-8">
              <span className="w-[92px] shrink-0 truncate text-m-14 text-black">
                {participant.name}
              </span>
              {/* 역할은 파트로 자동 입력되며 그대로 수정할 수 있다. */}
              <Input
                variant="form"
                className="min-w-px flex-1"
                value={participant.role}
                onChange={(event) => setRole(participant.userId, event.target.value)}
                placeholder="역할"
              />
              <button
                type="button"
                onClick={() => remove(participant.userId)}
                aria-label={`${participant.name} 제외`}
                className="flex h-32 shrink-0 items-center rounded-8 border border-error px-16 text-m-14 text-error"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
