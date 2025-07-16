// app/day10/components/QualificationSection.tsx
import React from 'react';
import { QualificationEntry, createNewQualificationEntry } from '../types/resume';

interface QualificationSectionProps {
    qualifications: QualificationEntry[];
    onListChange: (updatedList: QualificationEntry[]) => void;
}

const QualificationSection: React.FC<QualificationSectionProps> = ({ qualifications, onListChange }) => {

    // 個々の資格・免許項目の変更をハンドル
    const handleEntryChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        const { name, value } = e.target;
        const updatedQualifications = qualifications.map(entry =>
            entry.id === id ? { ...entry, [name]: value } : entry
        );
        onListChange(updatedQualifications);
    };

    // 資格・免許項目を追加
    const handleAddEntry = () => {
        onListChange([...qualifications, createNewQualificationEntry()]);
    };

    // 資格・免許項目を削除
    const handleRemoveEntry = (id: string) => {
        onListChange(qualifications.filter(entry => entry.id !== id));
    };

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 border-b pb-2">資格・免許</h2>
            <div className="space-y-6">
                {qualifications.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400">資格・免許情報を追加してください。</p>
                )}
                {qualifications.map(entry => (
                    <div key={entry.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm bg-gray-50 dark:bg-gray-750">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor={`qual-date-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">取得年月</label>
                                <input
                                    type="month"
                                    id={`qual-date-${entry.id}`}
                                    name="date"
                                    value={entry.date}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                />
                            </div>
                            <div className="md:col-span-2"> {/* こちらは幅を広くするためcol-span-2 */}
                                <label htmlFor={`qual-name-${entry.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">資格・免許名</label>
                                <input
                                    type="text"
                                    id={`qual-name-${entry.id}`}
                                    name="name"
                                    value={entry.name}
                                    onChange={(e) => handleEntryChange(e, entry.id)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                                    placeholder="例: TOEIC 800点"
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
                資格・免許を追加
            </button>
        </section>
    );
};

export default QualificationSection;