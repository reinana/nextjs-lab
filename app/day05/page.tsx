import React from 'react'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'


export default function day05() {

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 p-8">
            <h1 className="text-3xl font-bold mb-6">🌓 ダークモード切り替え</h1>
            <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
                クッキーに保存され、再読み込み後もテーマが維持されます。
            </p>
            <ThemeToggle />
            <Link href="/" className="mt-10 text-blue-600 text-sm hover:underline">
                ← 一覧に戻る
            </Link>
        </main>
    )
}
