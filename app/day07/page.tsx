// Next_lab/app/day07/page.tsx
'use client'; // Client Componentとしてマーク

import { useState, useTransition } from 'react';
// 同じディレクトリに作成したjquants-api.tsをインポート
import { fetchDailyPrices, DailyPrice } from './jquants-api';
import Link from 'next/link';

export default function JQuantsStockApp() {
    const [code, setCode] = useState('9984'); // デフォルト値: ソフトバンクグループ
    // J-Quants無料版は12週遅延なので、取得可能な過去の日付を設定
    const [startDate, setStartDate] = useState('2024-03-01');
    const [endDate, setEndDate] = useState('2024-03-31');
    const [prices, setPrices] = useState<DailyPrice[]>([]);
    const [error, setError] = useState<string | null>(null);

    // useTransition フックを初期化
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // エラーをリセット

        // startTransition で株価取得処理をラップ
        // isPending が true の間もUIは応答性を保つ
        startTransition(async () => {
            try {
                const fetchedPrices = await fetchDailyPrices(code, startDate, endDate);
                setPrices(fetchedPrices);
            } catch (err) {
                console.error("Failed to fetch stock data:", err);
                setError(err instanceof Error ? err.message : "An unknown error occurred.");
                setPrices([]); // エラー時はデータをクリア
            }
        });
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">J-Quants 株価データ</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">銘柄コード</label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">開始日</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">終了日</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending} // isPending が true の間はボタンを無効化
                >
                    {isPending ? 'データ取得中...' : '株価を取得'}
                </button>
            </form>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">エラー:</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                </div>
            )}

            {prices.length > 0 && (
                <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">株価データ ({code})</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">始値</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">高値</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">安値</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">終値</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">出来高</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {prices.map((price, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{price.Date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{price.Open}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{price.High}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{price.Low}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{price.Close}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{price.Volume}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {prices.length === 0 && !isPending && !error && (
                <p className="text-center text-gray-600 mt-4">検索条件を入力して株価を取得してください。</p>
            )}
            <Link href="/" className="mt-10 text-blue-600 text-sm hover:underline">
                ← 一覧に戻る
            </Link>
        </div>
    );
}