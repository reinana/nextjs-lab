import { revalidatePath } from "next/cache";
import PostListTraditional from "./components/PostListTraditional";
import PostListOptimistic from "./components/PostListOptimistic";
import { Post } from "./types";
import Link from "next/link";

const posts: Post[] = [
    { id: 1, title: 'Next.jsの基本', likes: 10 },
    { id: 2, title: 'ReactのHooks入門', likes: 5 },
    { id: 3, title: 'TypeScriptの基礎', likes: 8 },
    { id: 4, title: 'Tailwind CSSでスタイリング', likes: 12 },
    { id: 5, title: 'Node.jsとExpressの使い方', likes: 7 }
]

async function getPosts() {
    return posts;
}

async function likePostAction(postId: number) {
    'use server';

    await new Promise(res => setTimeout(res, 1000)); // 模擬的な遅延

    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
    }
    revalidatePath('/day12'); // ページを再検証して最新の状態に更新
}

export default async function Day12Page() {
    const initialPosts = await getPosts();

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-8">
            <div className="w-full max-w-2xl space-y-12">
                <header className="text-center">
                    <h1 className="text-3xl font-bold text-slate-800">Day12: useOptimistic いいね機能</h1>
                    <p className="text-slate-600 mt-2">
                        従来の方法とuseOptimisticを使った方法のUIの反応速度を比較します。
                    </p>
                </header>

                {/* 従来の方法 */}
                <section>
                    <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">従来の方法 (ローディング表示)</h2>
                    <PostListTraditional
                        initialPosts={JSON.parse(JSON.stringify(initialPosts))} // データをディープコピーして影響を防ぐ
                        likePostAction={likePostAction}
                    />
                </section>

                {/* useOptimisticを使う方法 */}
                <section>
                    <h2 className="text-2xl font-bold text-center mb-4 text-pink-600">useOptimisticを使う方法</h2>
                    <PostListOptimistic
                        initialPosts={JSON.parse(JSON.stringify(initialPosts))} // データをディープコピー
                        likePostAction={likePostAction}
                    />
                </section>

            </div>
            <Link href="/" className="mt-10 text-blue-600 text-sm hover:underline">
                ← 一覧に戻る
            </Link>
        </main>
    )
}