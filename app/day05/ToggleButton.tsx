'use client'

import { useTransition } from 'react'
import { setThemeCookie } from './actions/action'

export function ThemeToggleButton({ theme }: { theme: 'light' | 'dark' }) {
    const [isPending, startTransition] = useTransition()

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        startTransition(() => {
            setThemeCookie(newTheme)

        })
    }

    return (
        <button
            onClick={toggleTheme}
            disabled={isPending}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
            {theme === 'light' ? 'Dark 🌙' : 'Light ☀️' }
        </button>
    )
}