import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteAccount,
  fetchAccounts,
  updateAccount,
  updateAccountRole,
  updateAccountStatus,
} from '@api'
import type {
  AdminAccountQuery,
  ApiAccountPage,
  ApiAccountResponse,
  ApiAccountStatus,
  ApiPartType,
  ApiSystemRole,
} from '@api'
import { isBackendConnected } from '@config'
import type { Member, MemberPage, PendingMember } from '@types'

// enum → 한국어 라벨 매핑 (공유 계약).
const PART_LABEL: Record<ApiPartType, string> = {
  PLANNING: '기획',
  DESIGN: '디자인',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  COMMON: '공통',
}

const ROLE_LABEL: Record<ApiSystemRole, string> = {
  MEMBER: '아기사자',
  ADMIN: '운영진',
}

const STATUS_LABEL: Record<ApiAccountStatus, string> = {
  PENDING: '승인대기',
  ACTIVE: '활동중',
  REJECTED: '거절',
}

// 한국어 라벨 → enum 역변환 (모달이 라벨 기반으로 값을 넘기므로).
const PART_CODE: Record<string, ApiPartType> = {
  기획: 'PLANNING',
  디자인: 'DESIGN',
  프론트엔드: 'FRONTEND',
  백엔드: 'BACKEND',
  공통: 'COMMON',
}

const ROLE_CODE: Record<string, ApiSystemRole> = {
  아기사자: 'MEMBER',
  운영진: 'ADMIN',
}

// 라벨 → PartType enum. 매칭 실패 시 COMMON 으로 폴백.
export function toPartCode(label: string): ApiPartType {
  return PART_CODE[label] ?? 'COMMON'
}

// 라벨 → SystemRole enum. 매칭 실패 시 MEMBER 로 폴백.
export function toRoleCode(label: string): ApiSystemRole {
  return ROLE_CODE[label] ?? 'MEMBER'
}

// mock 데이터 생성. 백엔드 미연동 시 fallback 으로 사용한다.
const MOCK_PARTS: ApiPartType[] = ['PLANNING', 'DESIGN', 'FRONTEND', 'BACKEND']
const MOCK_ROLES: ApiSystemRole[] = ['MEMBER', 'ADMIN']
const MOCK_NAMES = ['김멋사', '이사자', '박수원', '최운영', '정기획', '한디자', '오프론', '서백엔']

function createMockAccounts(): ApiAccountResponse[] {
  return Array.from({ length: 30 }, (_, index) => {
    const status: ApiAccountStatus = index < 3 ? 'PENDING' : 'ACTIVE'
    const cohortNumber = 14 + (index % 4)
    return {
      userId: index + 1,
      name: MOCK_NAMES[index % MOCK_NAMES.length],
      department: '컴퓨터학부',
      studentId: `2023${String(index + 1).padStart(4, '0')}`,
      cohort: { cohortId: cohortNumber, number: cohortNumber, name: `${cohortNumber}기` },
      part: MOCK_PARTS[index % MOCK_PARTS.length],
      role: MOCK_ROLES[index % MOCK_ROLES.length],
      status,
      rejectionReason: null,
      version: 0,
      createdAt: '2026-03-01T00:00:00Z',
      updatedAt: '2026-03-01T00:00:00Z',
    }
  })
}

const MOCK_ACCOUNTS = createMockAccounts()

// 백엔드 미연동 시 서버 페이지네이션을 흉내내는 mock 페이지.
function createMockAccountPage(query: AdminAccountQuery): ApiAccountPage {
  const page = query.page ?? 0
  const size = query.size ?? 20
  const filtered = MOCK_ACCOUNTS.filter((account) => !query.status || account.status === query.status)
  const totalElements = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalElements / size))
  const start = page * size
  const items = filtered.slice(start, start + size)

  return {
    items,
    page: { page, size, totalElements, totalPages, hasNext: start + size < totalElements },
  }
}

// AccountResponse → Member 화면모델 변환.
function toMember(response: ApiAccountResponse): Member {
  return {
    id: String(response.userId),
    name: response.name,
    role: ROLE_LABEL[response.role],
    cohort: response.cohort.name,
    part: PART_LABEL[response.part],
    status: STATUS_LABEL[response.status],
    version: response.version,
    department: response.department,
    studentId: response.studentId,
    cohortId: response.cohort.cohortId,
    statusCode: response.status,
  }
}

// AccountResponse → PendingMember 화면모델 변환.
function toPendingMember(response: ApiAccountResponse): PendingMember {
  return {
    id: String(response.userId),
    name: response.name,
    cohort: response.cohort.name,
    part: PART_LABEL[response.part],
    version: response.version,
  }
}

const ADMIN_ACCOUNTS_KEY = 'admin-accounts'

// 회원 목록 조회 (useQuery + mock fallback). status 미지정 시 mock 은 전체 반환.
export function useMembers(query: AdminAccountQuery = {}): {
  data: MemberPage
  isLoading: boolean
} {
  const request = useQuery({
    queryKey: [ADMIN_ACCOUNTS_KEY, query],
    queryFn: () => fetchAccounts(query),
    enabled: isBackendConnected,
  })
  const response = request.data ?? createMockAccountPage(query)

  return {
    data: {
      content: response.items.map(toMember),
      ...response.page,
    },
    isLoading: isBackendConnected && request.isLoading,
  }
}

// 승인대기 회원 목록 조회 (useQuery + mock fallback).
export function usePendingMembers(): {
  data: PendingMember[]
  isLoading: boolean
} {
  const query: AdminAccountQuery = { status: 'PENDING', page: 0, size: 100 }
  const request = useQuery({
    queryKey: [ADMIN_ACCOUNTS_KEY, query],
    queryFn: () => fetchAccounts(query),
    enabled: isBackendConnected,
  })
  const response = request.data ?? createMockAccountPage(query)

  return {
    data: response.items.map(toPendingMember),
    isLoading: isBackendConnected && request.isLoading,
  }
}

// 가입상태 변경 (승인 = ACTIVE / 거절 = REJECTED + rejectionReason). version 필수.
export function useUpdateAccountStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      userId: string
      status: 'ACTIVE' | 'REJECTED'
      version: number
      rejectionReason?: string
    }) => {
      if (!isBackendConnected) return
      await updateAccountStatus(input.userId, {
        status: input.status,
        version: input.version,
        rejectionReason: input.status === 'REJECTED' ? input.rejectionReason : null,
      })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [ADMIN_ACCOUNTS_KEY] }),
  })
}

// 권한 변경 (MEMBER / ADMIN). version 필수.
export function useUpdateAccountRole() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { userId: string; role: ApiSystemRole; version: number }) => {
      if (!isBackendConnected) return
      await updateAccountRole(input.userId, { role: input.role, version: input.version })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [ADMIN_ACCOUNTS_KEY] }),
  })
}

// 회원정보 수정 (name/department/studentId/cohortId/part). version 필수.
export function useUpdateAccount() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      userId: string
      version: number
      name?: string
      department?: string
      studentId?: string
      cohortId?: number
      part?: ApiPartType
    }) => {
      if (!isBackendConnected) return
      const { userId, ...body } = input
      await updateAccount(userId, body)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [ADMIN_ACCOUNTS_KEY] }),
  })
}

// 회원 삭제.
export function useDeleteAccount() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (userId: string) => {
      if (!isBackendConnected) return
      await deleteAccount(userId)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [ADMIN_ACCOUNTS_KEY] }),
  })
}

const MEMBER_PAGE_SIZE = 20

// 회원 관리 페이지용 서버 페이지네이션 래퍼 (useUserNoticeListPage 패턴).
export function useMemberListPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useMembers({
    status: 'ACTIVE',
    page: page - 1,
    size: MEMBER_PAGE_SIZE,
  })

  return {
    data,
    isLoading,
    page,
    setPage,
    resetPage: () => setPage(1),
  }
}
