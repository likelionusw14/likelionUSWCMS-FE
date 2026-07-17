import { create } from 'zustand'
import type { BreadcrumbSegment } from '@types'

interface UiState {
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void

  topBarTitle: string
  topBarBreadcrumb: BreadcrumbSegment[]
  setTopBar: (title: string, breadcrumb: BreadcrumbSegment[]) => void
}

// 전역 UI 상태 (사이드바 토글 및 상단바 메타데이터).
export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

  topBarTitle: '',
  topBarBreadcrumb: [],
  setTopBar: (topBarTitle, topBarBreadcrumb) => set({ topBarTitle, topBarBreadcrumb }),
}))
