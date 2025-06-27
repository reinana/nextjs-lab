"use client"

import Game from "./components/Game"
// import Square from "./components/Square"

// import { Board } from "./components/Board"

export default function Page() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">🎮 三目並べ</h1>
                <Game />
            </div>
        </main>
    )
}
