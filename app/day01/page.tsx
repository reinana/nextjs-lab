'use client'

import { useActionState } from 'react'
import { drawOmikuji } from './actions'

export default function Day01() {
    const initialResult = 'まだ占っていません'
    const [result, runAction, isPending] = useActionState(drawOmikuji, initialResult)

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
            <h1 className="text-2xl font-bold mb-2">Day 01: useActionState おみくじ</h1>
            <p className="mb-4 text-gray-600">Server Actions の基本練習</p>

            <a
                href="https://github.com/your-username/nextjs-lab/tree/main/app/day01"
                target="_blank"
                className="text-blue-600 underline mb-6"
            >
                → GitHubでコードを見る
            </a>

            <button
                onClick={() => runAction()}
                disabled={isPending}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
            >
                {isPending ? '占い中…' : 'おみくじを引く'}
            </button>

            <p className="mt-6 text-xl">{result}</p>
        </main>
    )
}
