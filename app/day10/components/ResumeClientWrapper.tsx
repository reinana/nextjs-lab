// app/day10/components/ResumeClientWrapper.tsx
'use client'; // Client Component であることを明示

import { useState, useEffect, useCallback } from 'react';
import {
    ResumeData,
    initialResumeData,
    EducationEntry,
    WorkExperienceEntry,
    QualificationEntry,
} from '../types/resume'; // 各リストエントリの型もインポート
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
// import PdfDownloadButton from './PdfDownloadButton';

const LOCAL_STORAGE_KEY = 'day10_resume_data'; // localStorageのキーを定義

export default function ResumeClientWrapper() {
    // 履歴書データの状態を管理
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

    // ページロード時にlocalStorageからデータを読み込む
    useEffect(() => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
            try {
                setResumeData(JSON.parse(savedData));
            } catch (e) {
                console.error('Failed to parse resume data from localStorage', e);
                // パース失敗時は初期データに戻す
                setResumeData(initialResumeData);
            }
        }
    }, []); // 空の依存配列で初回レンダリング時のみ実行

    // resumeDataが変更されるたびにlocalStorageに保存
    useEffect(() => {
        // initialResumeData のままの初回ロード時には保存しないようにする
        // ただし、ユーザーが何も入力しなくても初期データは保存したいケースもあるため、
        // 必要に応じて条件を調整してください。
        // 今回は「変更があったら保存」の意図で、初期データそのものとの比較を行っています。
        if (resumeData !== initialResumeData) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
        }
    }, [resumeData]); // resumeDataが変更されるたびに実行

    /**
     * 基本情報、自己PR、志望動機、補足情報など、オブジェクトや文字列のフィールドを更新するハンドラ
     * @param newData 更新するデータの部分オブジェクト
     */
    const handleDataChange = useCallback(
        (newData: Partial<ResumeData>) => {
            setResumeData((prevData) => ({
                ...prevData,
                // basicInfo はネストされているため、既存のbasicInfoをスプレッドしてから新しい値を適用
                // basicInfoがundefinedのときのために{}
                basicInfo: { ...prevData.basicInfo, ...(newData.basicInfo || {}) },
                // その他のトップレベルのフィールドは直接適用
                // fromEntries {}に戻す entries [キー、値]の配列に変換
                ...(Object.fromEntries(
                    Object.entries(newData).filter(([key]) => key !== 'basicInfo')
                ) as Partial<ResumeData>),
            }));
        },
        []
    );

    /**
     * 学歴、職務経歴、資格・免許など、リスト（配列）形式のフィールドを更新するハンドラ
     * @param field 更新対象のリストフィールド名
     * @param updatedList 更新されたリスト（新しい配列）
     */
    const handleListChange = useCallback(
        <
            T extends
            | EducationEntry[]
            | WorkExperienceEntry[]
            | QualificationEntry[]
        >(
            field: 'education' | 'workExperience' | 'qualifications',
            updatedList: T // ジェネリック型Tを使用して、fieldに応じた厳密な型を保証
        ) => {
            setResumeData((prevData) => ({
                ...prevData,
                [field]: updatedList, // 該当フィールドのリストをまるごと更新
            }));
        },
        []
    );

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* フォームセクション */}
            <div className="lg:w-1/2 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <ResumeForm
                    resumeData={resumeData}
                    onDataChange={handleDataChange}
                    onListChange={handleListChange}
                />
            </div>

            {/* プレビューとダウンロードボタンセクション */}
            <div className="lg:w-1/2 flex flex-col gap-6">
                <div className="flex-grow p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-y-auto max-h-[80vh] lg:max-h-none">
                    <ResumePreview resumeData={resumeData} />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center">
                    {/* <PdfDownloadButton resumeData={resumeData} /> */}
                </div>
            </div>
        </div>
    );
}