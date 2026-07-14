import { useEffect, useRef, useState } from 'react'
import chevronDown from '@/assets/icons/chevron-down.svg'
import { cn } from '@utils'
import type { DropdownProps } from '@types'

// 목록 상단 필터용 드롭다운 (Figma 파트·기수·주차 드롭다운).
// 열림 상태의 선택지 패널이 디자인에 정의돼 있어 네이티브 select 의 OS 팝업 대신 직접 그린다.
const PANEL_BOX = 'w-full rounded-8 border border-secondary-1 bg-background-1 px-16 py-8'

export function Dropdown({ value, onChange, options, placeholder, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 바깥을 누르거나 Esc 를 치면 닫는다.
  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const selected = options.find((option) => option.value === value)

  return (
    <div ref={containerRef} className={cn('relative w-[120px]', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn('flex h-32 items-center justify-between text-m-14 text-black', PANEL_BOX)}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <img src={chevronDown} alt="" className="ml-8 h-8 w-12 shrink-0" />
      </button>
      {isOpen ? (
        <div
          role="listbox"
          className={cn('absolute left-0 top-full z-10 mt-4 flex flex-col gap-8', PANEL_BOX)}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className="flex w-full items-center text-left text-m-14 text-black"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
