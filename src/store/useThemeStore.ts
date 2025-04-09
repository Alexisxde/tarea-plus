import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
	theme: "dark" | "light"
	setTheme: (theme: "dark" | "light") => void
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: "dark",
			setTheme: theme => {
        set({ theme })
			}
		}),
		{ name: "theme" }
	)
)
