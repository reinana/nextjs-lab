import { getSortedPostsData, PostMetaData } from "@/lib/posts";
import Link from "next/link";

export const metadata = {
    title: 'My Blog - Day09',
    description: 'A simple blog built with Next.js',
};

export default function BlogHome() {
    // すべてのソート済み記事データを取得 (ビルド時に実行されるため、async/awaitは不要)
    // Server Componentなので、直接サーバーサイドの関数を呼び出せる
    const allPostsData: PostMetaData[] = getSortedPostsData();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-8">
                    My Simple Blog
                </h1>

                <section>
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
                        Recent Posts
                    </h2>
                    <ul className="space-y-4">
                        {allPostsData.map(({ id, date, title, author }) => (
                            <li key={id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                                <Link href={`/day09/${id}`} className="block">
                                    <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-1 hover:underline">
                                        {title}
                                    </h3>
                                    <small className="text-gray-600 dark:text-gray-400">
                                        {new Date(date).toLocaleDateString()} by {author}
                                    </small>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}