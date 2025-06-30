'use client'

import { useActionState, useEffect, useRef } from "react";
import { addTodo, resetTodos } from "./actions";
import Link from "next/link";

// アクションの実行結果を返す型を定義 (actions.ts と同じ)
interface AddTodoResult {
    success: boolean;
    message: string;
    newTodo?: { id: number; text: string; completed: boolean };
    todos?: { id: number; text: string; completed: boolean }[];
}
export default function TodoApp() {
    const [state, formAction, isPending] = useActionState<AddTodoResult, FormData>(
        addTodo,
        { success: false, message: "", todos: [] }
    );

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success && state.newTodo) {
            formRef.current?.reset();
            console.log("新しいTODOが追加されました:", state.newTodo);
        } else if (!state.success && state.message) {
            console.error("エラー:", state.message);
        }
    }, [state]);
    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">シンプルなTODOリスト</h1>

            {/* TODO追加フォーム */}
            <form ref={formRef} action={formAction} className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="mb-4">
                    <label htmlFor="todoText" className="block text-sm font-medium text-gray-700 mb-2">新しいタスク</label>
                    <input
                        type="text"
                        id="todoText"
                        name="todoText" // ★重要: FormDataでアクセスするためにname属性が必要
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="例: 牛乳を買う"
                        required
                        disabled={isPending} // 送信中は入力不可
                    />
                </div>

                {/* メッセージ表示エリア */}
                {state.message && (
                    <p className={`text-sm mb-4 ${state.success ? 'text-green-600' : 'text-red-600'}`}>
                        {state.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending} // 送信中はボタンを無効化
                >
                    {isPending ? '追加中...' : 'タスクを追加'}
                </button>
            </form>

            {/* TODOリスト表示 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">現在のタスク</h2>
                {state.todos && state.todos.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {state.todos.map(todo => (
                            <li key={todo.id} className="py-3 flex items-center justify-between">
                                <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                    {todo.text}
                                </span>
                                {/* 完了ボタンや削除ボタンなどを追加できますが、今回はシンプルにするため省略 */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">まだタスクはありません。</p>
                )}
            </div>

            {/* デバッグ用のリセットボタン (任意) */}
            <div className="text-center mt-4">
                <button
                    onClick={() => {
                        resetTodos(); // Server Actionを直接呼び出し
                        // state を手動でリセットするか、ページをリロードして初期状態に戻す
                        // 今回はページリロードで対応
                        window.location.reload();
                    }}
                    className="text-sm text-gray-500 hover:bg-gray-200 rounded py-2 px-4"
                >
                    タスクをリセット (デバッグ用)
                </button>
            </div>
            <Link href="/" className="mt-10 text-blue-600 text-sm hover:underline">
                ← 一覧に戻る
            </Link>
        </div>
    );
}