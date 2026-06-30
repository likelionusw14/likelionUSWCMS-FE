export type ClassValue = string | number | false | null | undefined

// 조건부 className 합성 헬퍼. falsy 값은 제외하고 공백으로 join 한다.
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
