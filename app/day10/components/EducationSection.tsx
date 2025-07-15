// app/day10/components/EducationSection.tsx
import React from 'react';
import { EducationEntry, createNewEducationEntry } from '../types/resume';

interface EducationSectionProps {
    education: EducationEntry[];
    onListChange: (updatedList: EducationEntry[]) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, onListChange }) => {

    // 個々の学歴項目の変更をハンドル
    const handleEntryChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        id: string
    ) => {
        const { name, value } = e.target;
        const updatedEducation = education.map(entry =>
            entry.id === id ? { ...entry, [name]: value } : entry
        );
        onListChange(updatedEducation);
    };

    // 学歴項目を追加
    const handleAddEntry = () => {
        onListChange([...education, createNewEducationEntry()]);
    };

    // 学歴項目を削除
    const handleRemoveEntry = (id: string) => {
        onListChange(education.filter(entry => entry.id !== id));
    };

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 border-b pb-2">学歴</h2>
            <div className="space-y-6">
                {education.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400">学歴情報を追加してください。</p>
                )}
                {education.map(entry => (
                    <div key={entry.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-750">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor={`edu-startDate-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">開始年月</label>
                                <input
                                    type="month"
                                    id={`edu-startDate-${entry.id}`}
                                    name="startDate"
                                    value={entry.startDate}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor={`edu-endDate-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">終了年月</label>
                                <input
                                    type="month"
                                    id={`edu-endDate-${entry.id}`}
                                    name="endDate"
                                    value={entry.endDate}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor={`edu-schoolName-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">学校名</label>
                                <input
                                    type="text"
                                    id={`edu-schoolName-${entry.id}`}
                                    name="schoolName"
                                    value={entry.schoolName}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                    placeholder="例: 〇〇大学"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor={`edu-degree-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">学部・学科・専攻など</label>
                                <input
                                    type="text"
                                    id={`edu-degree-${entry.id}`}
                                    name="degree"
                                    value={entry.degree}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                    placeholder="例: 経済学部 経済学科"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor={`edu-memo-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">備考 (任意)</label>
                                <input
                                    type="text"
                                    id={`edu-memo-${entry.id}`}
                                    name="memo"
                                    value={entry.memo || ''}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                    placeholder="例: 卒業見込み"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveEntry(entry.id)}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-600 dark:hover:bg-red-700"
                        >
                            削除
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={handleAddEntry}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 w-full"
            >
                学歴を追加
            </button>
        </section>
    );
};

export default EducationSection;