import { useEffect, useState } from 'react'
import calendarIcon from '@/assets/icons/calendar.svg'
import clockIcon from '@/assets/icons/clock.svg'
import { Button, WindowPanel } from '@atoms'
import { cn } from '@utils'
import type { CalendarEvent, ScheduleFormModalProps, ScheduleFormValues } from '@types'
import { Modal } from '@molecules'
import { DatePickerModal } from '@molecules'
import { TimePickerModal } from '@molecules'

const EMPTY: ScheduleFormValues = { title: '', place: '', date: '', time: '', description: '' }

// CalendarEvent(수정 대상) → 폼 값. date 'YYYY-MM-DD'→'YYYY.MM.DD', time 은 dateTime 의 'HH:MM' 패턴에서 추출.
function toFormValues(event: CalendarEvent | null | undefined): ScheduleFormValues {
  if (!event) return EMPTY
  return {
    title: event.title,
    place: event.place ?? '',
    date: event.date ? event.date.replace(/-/g, '.') : '',
    time: event.dateTime?.match(/(\d{1,2}:\d{2})/)?.[1] ?? '',
    description: event.description ?? '',
  }
}

// 필드 공통 — bg-background-1 + secondary-1 테두리 + 8px 모서리 (Figma 일정 작성 인풋).
const FIELD =
  'h-32 w-full rounded-8 border border-secondary-1 bg-background-1 px-16 text-m-14 text-black placeholder:text-primary/50'

// 일정 작성·수정 팝업 — 일정명·장소·날짜·시간·설명. 날짜/시간 필드는 내부에서 선택 팝업을 띄운다.
// initialEvent 가 있으면 수정 모드(기존 값 하이드레이트), 없으면 신규 등록(빈 폼).
export function ScheduleFormModal({
  open,
  onClose,
  onSubmit,
  initialEvent,
}: ScheduleFormModalProps) {
  const [values, setValues] = useState<ScheduleFormValues>(() => toFormValues(initialEvent))
  const [dateOpen, setDateOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)
  const [descError, setDescError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [placeError, setPlaceError] = useState(false)

  useEffect(() => {
    if (open) {
      setValues(toFormValues(initialEvent))
      setDescError(false)
      setTitleError(false)
      setPlaceError(false)
    }
  }, [open, initialEvent])

  function set<K extends keyof ScheduleFormValues>(key: K, value: ScheduleFormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  function handleSave() {
    const nextTitle = !values.title.trim()
    const nextPlace = !values.place.trim()
    const nextDesc = !values.description.trim()
    setTitleError(nextTitle)
    setPlaceError(nextPlace)
    setDescError(nextDesc)
    if (nextTitle || nextPlace || nextDesc) return
    onSubmit(values)
  }

  return (
    // 폭은 Modal 패널에 건다 — Modal 의 패널 div 는 shrink-to-fit 이라 WindowPanel 쪽 w-full 만으로는 640px 이 서지 않는다.
    // 오버레이 px-24 덕분에 모바일에서는 자동으로 화면폭-48 로 줄어든다.
    <Modal
      open={open}
      onClose={onClose}
      panelClassName="w-full max-w-[640px]"
      ariaLabel="일정 작성"
    >
      {/* 본문 패딩 32 — Figma 모바일 팝업(330)도 콘텐츠 266 이라 좌우 32 로, 아톰 기본값(모바일 24)을 덮는다. */}
      <WindowPanel className="w-full" bodyClassName="flex flex-col items-center gap-40 !p-32">
        <h2 className="w-full text-sm-22 text-black">일정 작성</h2>

        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full flex-col gap-8">
            <span className="px-8 text-m-16 text-black">일정명</span>
            <div className="flex h-48 flex-col gap-4">
              <input
                className={FIELD}
                value={values.title}
                onChange={(event) => {
                  set('title', event.target.value)
                  if (titleError) setTitleError(false)
                }}
                placeholder="일정명을 적어주세요"
              />
              {titleError && (
                <p className="text-r-12 font-normal leading-normal text-error">
                  일정명을 다시 확인해주세요
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col gap-8">
            <span className="px-8 text-m-16 text-black">장소</span>
            <div className="flex h-48 flex-col gap-4">
              <input
                className={FIELD}
                value={values.place}
                onChange={(event) => {
                  set('place', event.target.value)
                  if (placeError) setPlaceError(false)
                }}
                placeholder="장소"
              />
              {placeError && (
                <p className="text-r-12 font-normal leading-normal text-error">
                  장소를 다시 확인해주세요
                </p>
              )}
            </div>
          </div>

          {/* 날짜 + 시간 — 모바일(내부폭 279px)에서는 두 필드가 나란히 못 들어가 전체폭 세로 스택. Figma 1249:20752/20761. */}
          <div className="flex w-full flex-col gap-8 sm:flex-row sm:gap-32">
            <div className="flex flex-1 flex-col gap-8">
              <span className="px-8 text-m-16 text-black">날짜</span>
              <div className="flex h-48 flex-col">
                <button
                  type="button"
                  onClick={() => setDateOpen(true)}
                  className="flex h-32 w-full items-center justify-between rounded-8 border border-secondary-1 bg-background-1 px-8"
                >
                  <span className={cn('text-m-14', values.date ? 'text-black' : 'text-primary/50')}>
                    {values.date || 'YYYY.MM.DD'}
                  </span>
                  <img src={calendarIcon} alt="" className="h-24 w-24" />
                </button>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-8">
              <span className="px-8 text-m-16 text-black">시간</span>
              <div className="flex h-48 flex-col">
                <button
                  type="button"
                  onClick={() => setTimeOpen(true)}
                  className="flex h-32 w-full items-center justify-between rounded-8 border border-secondary-1 bg-background-1 px-8"
                >
                  <span className={cn('text-m-14', values.time ? 'text-black' : 'text-primary/50')}>
                    {values.time || '00:00'}
                  </span>
                  <img src={clockIcon} alt="" className="h-24 w-24" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <span className="px-8 text-m-16 text-black">설명</span>
            <textarea
              className="no-scrollbar h-[63px] w-full resize-none rounded-8 border border-secondary-1 bg-background-1 px-16 py-8 text-m-14 text-black placeholder:text-primary/50"
              value={values.description}
              onChange={(event) => {
                set('description', event.target.value)
                if (descError) setDescError(false)
              }}
              maxLength={150}
              placeholder="일정에 대한 설명을 적어주세요 (최대 150자)"
            />
            {descError ? (
              <p className="text-r-12 font-normal leading-normal text-error">
                일정 설명을 다시 확인해주세요
              </p>
            ) : (
              values.description.length > 0 && (
                <p
                  className={cn(
                    'text-right text-r-12 font-normal leading-normal',
                    values.description.length >= 150 ? 'text-error' : 'text-primary',
                  )}
                >
                  {values.description.length} / 150
                </p>
              )
            )}
          </div>
        </div>

        {/* 저장/취소 — 모바일에서도 가로 2열 유지. flex-1 로 폭을 나눠 min-w-128 두 개가 들어간다(Figma 1249:20778 = 128+16+128). */}
        <div className="flex w-full justify-center gap-16">
          <Button variant="primary" onClick={handleSave} className="flex-1 sm:flex-none">
            저장
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
            취소
          </Button>
        </div>
      </WindowPanel>

      <DatePickerModal
        open={dateOpen}
        onClose={() => setDateOpen(false)}
        value={values.date}
        onConfirm={(value) => {
          set('date', value)
          setDateOpen(false)
        }}
      />
      <TimePickerModal
        open={timeOpen}
        onClose={() => setTimeOpen(false)}
        value={values.time}
        onConfirm={(value) => {
          set('time', value)
          setTimeOpen(false)
        }}
      />
    </Modal>
  )
}
