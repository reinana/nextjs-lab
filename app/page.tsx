import Link from 'next/link'

const pages = [
    { day: '01', title: 'ポケモンガチャ', path: '/day01' },
    // 今後はここに追加していく
]

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">🧪 Next.js Lab</h1>
                <p className="text-gray-600 mb-10 text-lg">
                    100日間でNext.jsを徹底的に学ぶチャレンジ型ポートフォリオ
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                    {pages.map((p) => (
                        <Link key={p.day} href={p.path}>
                            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                                <p className="text-sm text-gray-400">Day {p.day}</p>
                                <h2 className="text-xl font-semibold text-gray-800 mt-1">{p.title}</h2>
                                <span className="inline-block mt-4 text-blue-600 text-sm hover:underline">
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
