'use client'

import { useActionState } from 'react'
import { type Pokemon, getPokemonByName, getRandomPokemon } from './action'
import Image from 'next/image'
import Link from 'next/link'




const initialCollection: Pokemon[] = []

export default function Day03() {
    const [collection, addToCollection, isPending] = useActionState(
        async (prev: Pokemon[], formData: FormData) => {
            const name = formData.get('name')?.toString().trim()

            const pokemon = name
                ? await getPokemonByName(name)
                : await getRandomPokemon()

            if (!pokemon) return prev // not found or fetch failed
            const alreadyExists = prev.some((p) => p.name === pokemon.name)
            if (alreadyExists) return prev // 重複防止
            return [...prev, pokemon]
        },
        initialCollection
    )

    return (
        <main className="min-h-screen p-8 bg-gradient-to-b from-white to-emerald-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2">🎁 Day 03: ポケモン検索＆ガチャ＋コレクション</h1>
            <p className="mb-6 text-gray-600">ポケモンを名前で検索してコレクションを作ろう！</p>


            {/* ランダムで追加 */}
            <form action={addToCollection}>
                <button
                    type="submit"
                    className="bg-amber-100 hover:bg-amber-300 text-black font-bold px-6 py-3 my-3 rounded-full shadow"
                    disabled={isPending}
                >
                    {isPending ? '追加中...' : 'ランダムに追加'}
                </button>
            </form>


            {/* 名前で追加 */}
            <form action={addToCollection} className="flex items-center gap-2">
                <input
                    name="name"
                    type="text"
                    placeholder="ポケモン名（例: pikachu）"
                    className="border px-4 py-2 rounded shadow"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
                    disabled={isPending}
                >
                    {isPending ? '検索中...' : '名前で追加'}
                </button>
            </form>



            <h3 className="text-xl font-bold mt-8 mb-4">📚 コレクション</h3>
            {/* コレクション表示 */}
            <section className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-5xl">
                {collection.map((pokemon, i) => (
                    <div key={i} className="border p-4 rounded shadow text-center bg-gray-50">
                        {pokemon.image && (
                            <Image
                                src={pokemon.image}
                                alt={pokemon.name}
                                width={120}
                                height={120}
                                className="mx-auto mb-2"
                            />
                        )}
                        <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
                        <p className="text-sm text-gray-600">
                            タイプ: {pokemon.types.join(' / ')}
                        </p>
                    </div>
                ))}
            </section>

            <Link href="/" className="mt-10 text-blue-600 text-sm hover:underline">
                ← 一覧に戻る
            </Link>
        </main>
    )
}
