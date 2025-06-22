'use client'

import { useActionState, startTransition } from 'react'
import { fetchRandomPokemon, addToCollection, type Pokemon } from './action'
import Image from 'next/image'
import Link from 'next/link'


const initialPokemon: Pokemon | null = null
const initialCollection: Pokemon[] = []

export default function Day02() {
    const [current, getPokemon, getting] = useActionState(fetchRandomPokemon, initialPokemon)
    const [collection, add, adding] = useActionState(addToCollection, initialCollection)

    return (
        <main className="min-h-screen p-8 bg-gradient-to-b from-white to-emerald-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2">🎁 Day 02: ポケモンガチャ＋コレクション</h1>
            <p className="mb-6 text-gray-600">ランダムにポケモンを引いて、自分だけのコレクションを作ろう！</p>

            <button
                onClick={() => startTransition(() => getPokemon())}
                disabled={getting}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow mb-8"
            >
                {getting ? 'ガチャ中…' : 'ポケモンを引く！'}
            </button>

            {current && (
                <div className="text-center mb-8">
                    {current.image && (
                        <Image src={current.image} alt={current.name} width={120} height={120} className="mx-auto" />
                    )}
                    <h2 className="text-xl font-semibold capitalize mt-2">{current.name}</h2>
                    <p className="text-gray-500 text-sm mb-2">タイプ: {current.types.join(' / ')}</p>
                    <button
                        onClick={() => startTransition(() => add(current))}
                        disabled={adding}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded shadow"
                    >
                        {adding ? '追加中…' : 'コレクションに追加'}
                    </button>
                </div>
            )}

            <h3 className="text-xl font-bold mt-8 mb-4">📚 コレクション</h3>
            {collection.length === 0 ? (
                <p className="text-gray-400">まだ何も追加されていません</p>
            ) : (
                <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {collection.map((p) => (
                        <li key={p.name} className="bg-white rounded-xl p-3 shadow text-center">
                            {p.image && (
                                <Image src={p.image} alt={p.name} width={80} height={80} className="mx-auto" />
                            )}
                            <p className="mt-2 font-semibold capitalize">{p.name}</p>
                        </li>
                    ))}
                </ul>
            )}

            <Link href="/" className="mt-10 text-blue-600 text-sm hover:underline">
                ← 一覧に戻る
            </Link>
        </main>
    )
}
