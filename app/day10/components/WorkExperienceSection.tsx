// app/day10/components/WorkExperienceSection.tsx
import React from 'react';
import { WorkExperienceEntry, createNewWorkExperienceEntry } from '../types/resume';

interface WorkExperienceSectionProps {
    workExperience: WorkExperienceEntry[];
    onListChange: (updatedList: WorkExperienceEntry[]) => void;
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({ workExperience, onListChange }) => {

    // 個々の職務経歴項目の変更をハンドル
    const handleEntryChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        id: string
    ) => {
        const { name, value } = e.target;
        const updatedWorkExperience = workExperience.map(entry =>
            entry.id === id ? { ...entry, [name]: value } : entry
        );
        onListChange(updatedWorkExperience);
    };

    // 職務経歴項目を追加
    const handleAddEntry = () => {
        onListChange([...workExperience, createNewWorkExperienceEntry()]);
    };

    // 職務経歴項目を削除
    const handleRemoveEntry = (id: string) => {
        onListChange(workExperience.filter(entry => entry.id !== id));
    };

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 border-b pb-2">職務経歴</h2>
            <div className="space-y-6">
                {workExperience.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400">職務経歴情報を追加してください。</p>
                )}
                {workExperience.map(entry => (
                    <div key={entry.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-750">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor={`work-startDate-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">開始年月</label>
                                <input
                                    type="month"
                                    id={`work-startDate-${entry.id}`}
                                    name="startDate"
                                    value={entry.startDate}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor={`work-endDate-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">終了年月</label>
                                <input
                                    type="month"
                                    id={`work-endDate-${entry.id}`}
                                    name="endDate"
                                    value={entry.endDate}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                    placeholder="現在の場合は空欄"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor={`work-companyName-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">会社名</label>
                                <input
                                    type="text"
                                    id={`work-companyName-${entry.id}`}
                                    name="companyName"
                                    value={entry.companyName}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                    placeholder="例: 株式会社〇〇"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor={`work-position-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">役職・部署など</label>
                                <input
                                    type="text"
                                    id={`work-position-${entry.id}`}
                                    name="position"
                                    value={entry.position}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                    placeholder="例: 営業部 主任"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor={`work-jobDescription-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">業務内容</label>
                                <textarea
                                    id={`work-jobDescription-${entry.id}`}
                                    name="jobDescription"
                                    rows={4}
                                    value={entry.jobDescription}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                    placeholder="担当業務の詳細を具体的に記述してください。"
                                ></textarea>
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
                職務経歴を追加
            </button>
        </section>
    );
};

export default WorkExperienceSection;