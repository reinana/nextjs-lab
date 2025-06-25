import { cookies } from 'next/headers'
import { ThemeToggleButton } from './ToggleButton'

export async function ThemeToggle() {
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')?.value === 'dark' ? 'dark' : 'light'

    return (
        <div>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
                現在のテーマ: <strong>{theme}</strong>
            </p>
            <ThemeToggleButton theme={theme} />
        </div>
    )
}