import { pages } from '@/lib/pages-date'
import Link from 'next/link'



export default function Home() {
return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                    🧪 Next.js Lab
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg">
                    100日間でNext.jsを徹底的に学ぶチャレンジ型ポートフォリオ
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                    {pages.map((p) => (
                        <Link key={p.day} href={p.path}>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                                <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">
                                    Day {p.day} ・ {p.date}
                                </p>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {p.title}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                    {p.description}
                                </p>
                                <span className="inline-block mt-4 text-blue-600 dark:text-blue-400 text-sm hover:underline">
                                    → チャレンジを見る
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}
