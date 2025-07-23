// app/day10/page.tsx

import Link from 'next/link';
import ResumeClientWrapper from './components/ResumeClientWrapper';

export default function ResumePage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <div className="max-w-7xl mx-auto py-8">
                <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-8">
                    履歴書作成アプリ
                </h1>
                <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-12">
                    あなたの情報を入力して、プロフェッショナルな履歴書を簡単に作成・ダウンロードしましょう。
                </p>

                {/* ここにClient Componentを配置し、全てのインタラクティブな機能を含めます */}
                <ResumeClientWrapper />
            </div>
            <Link href="/" className="mt-10 text-blue-600 text-sm hover:underline">
                ← 一覧に戻る
            </Link>
        </div>
    );
}