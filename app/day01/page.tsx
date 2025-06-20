'use client'

import { useActionState, startTransition } from 'react'
import { getRandomPokemon, type Pokemon } from './actions'
import Image from 'next/image'

const initial: Pokemon = {
    name: '？？？',
    image: '',
    types: [],
}

export default function Day01() {
    const [pokemon, runAction, isPending] = useActionState(getRandomPokemon, initial)

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-100 p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">🎲 ポケモンガチャ</h1>
            <p className="text-gray-500 mb-6">ボタンを押してランダムなポケモンをゲット！</p>

            <button
                onClick={() => {
                    startTransition(() => runAction())
                }}
                disabled={isPending}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow mb-8"
            >
                {isPending ? '検索中…' : 'ポケモンを引く'}
            </button>

            <div className="text-center">
                {pokemon.image && (
                    <Image src={pokemon.image} alt={pokemon.name} width={500} height={500} className="mx-auto mb-4 w-40 h-40" />
                )}
                <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
                <p className="text-sm text-gray-600">
                    タイプ: {pokemon.types.map((t) => t).join(' / ') || '???'}
                </p>
            </div>
        </main>
    )
}
