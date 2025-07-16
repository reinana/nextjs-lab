import { getAllPostIds, getPostData } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Date from '../components/Date';

import React from 'react'

// next.jsがビルド時にこの関数を見つけて静的に生成すると判断する
// 見つけて、呼び出し、 戻り値のリストにあるidでhtml生成まで自動でする
export async function generateStaticParams() {
    // lib/posts.ts にある getAllPostIds 関数を呼び出し、
    // すべてのブログ記事のIDリスト（Next.jsが期待する形式）を取得します。
    const paths = getAllPostIds();
    return paths;
}

export default async function page({ params }: { params: { id: string } }) {
    const { id } = params;
    const postData = await getPostData(id)

    if (!postData) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <article>
                    {/* 記事のタイトル */}
                    <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
                        {postData.title}
                    </h1>
                    {/* 記事の日付と著者 */}
                    <div className="text-gray-600 dark:text-gray-400 mb-6">
                        {/* Dateコンポーネントを使って日付を整形して表示 */}
                        <Date dateString={postData.date} /> by {postData.author}
                    </div>
                    {/* 記事の本文（HTML）を危険な形で挿入 */}
                    {/* dangerouslySetInnerHTMLは信頼できるソースのHTMLのみに使用 */}
                    <div
                        className="prose dark:prose-invert max-w-none mb-8" // Tailwind Typography プラグインを使用している場合
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                    />
                </article>

                <hr className="my-8 border-gray-200 dark:border-gray-700" />

                {/* 6. ブログ一覧に戻るリンク */}
                <div className="mt-8 text-center">
                    <Link href="/day09" className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-medium">
                        &larr; ブログ一覧に戻る
                    </Link>
                </div>
            </div>
        </div>
    )
}
