// app/day04/page.tsx
import { getPosts, getUser } from './fetcher'
import { Post } from './types'

export const dynamic = 'force-dynamic'

export default async function day04() {
    const { posts } = await getPosts()

    return (
        <main className="min-h-screen p-10 bg-slate-50">
            <h1 className="text-2xl font-bold mb-6">📝 投稿一覧（著者付き）</h1>
            <ul className="space-y-6">
                {posts.map((post: Post) => (
                    <li key={post.id} className="p-4 rounded shadow bg-white">
                        <PostItem post={post} />
                    </li>
                ))}
            </ul>
        </main>
    )
}

async function PostItem({ post }: { post: Post }) {
    const user = await getUser(post.userId)

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">👤 著者: {user?.username ?? '不明'}</p>
            <p className="text-gray-700 text-sm whitespace-pre-line">{post.body}</p>
        </div>
    )
}
