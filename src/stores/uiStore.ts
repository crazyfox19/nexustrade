import { create } from 'zustand';
import type { Toast } from '@/types';

interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  activeModal: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  sidebarOpen: false,
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  activeModal: null,
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
