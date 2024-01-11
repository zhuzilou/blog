import { devtools } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'

interface ThemeState {
  isDark: boolean
  toggleDark: () => void
}

export const useThemeStore = createWithEqualityFn<ThemeState>()(
  devtools(set => ({
    isDark: false,
    toggleDark: () => set(state => ({ isDark: !state.isDark })),
  }))
)
