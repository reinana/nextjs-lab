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

                <div className="space-y-3">
                    {pages.map((p) => (
                        <Link
                            key={p.day}
                            href={p.path}
                            className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                        >
                            <div className="flex items-center justify-between">
                                {/* 左側のコンテンツ (Day, Title, Description) */}
                                <div className="flex items-center">
                                    <span className="flex-shrink-0 w-12 text-center text-xl font-bold text-gray-400 dark:text-gray-500">
                                        {p.day}
                                    </span>
                                    <div className="ml-4">
                                        <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                                            {p.title}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 hidden sm:block">
                                            {p.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}
