export default function Home() {
    const pages = [
        { day: '01', title: 'useActionState おみくじ', path: '/day01' },
        // 今後の追加分もここに追記
    ]

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">🧪 Next.js Lab - 100日チャレンジ</h1>
            <ul className="space-y-4">
                {pages.map((p) => (
                    <li key={p.day}>
                        <a href={p.path} className="text-blue-600 underline">
                            Day {p.day}: {p.title}
                        </a>
                    </li>
                ))}
            </ul>
        </main>
    )
}
