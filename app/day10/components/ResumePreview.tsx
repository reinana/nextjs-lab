// app/day10/components/ResumePreview.tsx
'use client';

import React from 'react';
import { ResumeData } from '../types/resume';
import Image from 'next/image'

interface ResumePreviewProps {
    resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
    const {
        basicInfo,
        education,
        workExperience,
        qualifications,
        selfPromotion,
        motivation,
        photo,
        commutingTime,
        dependentFamilyMembers,
        spouse,
        dependentSpouse
    } = resumeData;

    // 年齢を計算するヘルパー関数
    const calculateAge = (dateOfBirth: string): number | null => {
        if (!dateOfBirth) return null;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth(); // ここを修正しました
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const displayAge = calculateAge(basicInfo.dateOfBirth);

    return (
        <div className="p-8 bg-white text-gray-900 shadow-md rounded-lg break-words">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">履歴書</h1>

            {/* 基本情報 */}
            <section className="mb-8 border-b pb-4 border-gray-200">
                <h2 className="text-xl font-semibold mb-3 text-blue-700">基本情報</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="md:col-span-2">
                        <p className="mb-1"><span className="font-medium">氏名:</span> {basicInfo.fullName} ({basicInfo.fullNameKana})</p>
                        <p className="mb-1"><span className="font-medium">生年月日:</span> {basicInfo.dateOfBirth} ({displayAge !== null ? `${displayAge}歳` : '未入力'})</p>
                        <p className="mb-1">
                            <span className="font-medium">性別:</span>
                            {basicInfo.gender === 'male' ? '男' :
                                basicInfo.gender === 'female' ? '女' :
                                    basicInfo.gender === 'other' ? 'その他' : '未選択'}
                        </p>
                        <p className="mb-1"><span className="font-medium">電話番号:</span> {basicInfo.phoneNumber}</p>
                        <p className="mb-1"><span className="font-medium">メールアドレス:</span> {basicInfo.email}</p>
                        <p><span className="font-medium">住所:</span> 〒{basicInfo.postalCode} {basicInfo.address}</p>
                    </div>
                    {photo && (
                        <div className="md:col-span-1 flex justify-center items-center">
                            <Image src={photo} alt="証明写真" width={32} height={40} className="w-32 h-40 object-cover border border-gray-300 shadow-sm" />
                        </div>
                    )}
                </div>
            </section>

            {/* 学歴セクション */}
            <section className="mb-8 border-b pb-4 border-gray-200">
                <h2 className="text-xl font-semibold mb-3 text-blue-700">学歴</h2>
                <div className="space-y-3">
                    {education.length === 0 ? (
                        <p className="text-gray-600">学歴情報がありません。</p>
                    ) : (
                        <>
                            {education.map((entry, index) => (
                                <React.Fragment key={entry.id || index}>
                                    <div className="grid grid-cols-[80px_1fr] gap-x-4">
                                        <p>{entry.startDate.split('-')[0]}年</p>
                                        <p>{entry.startDate.split('-')[1]}月 {entry.schoolName} 入学</p>
                                    </div>
                                    {entry.endDate && (
                                        <div className="grid grid-cols-[80px_1fr] gap-x-4">
                                            <p>{entry.endDate.split('-')[0]}年</p>
                                            <p>
                                                {entry.endDate.split('-')[1]}月 {entry.schoolName} {entry.degree}
                                                {entry.memo ? ` ${entry.memo}` : ' 卒業'}
                                            </p>
                                        </div>
                                    )}
                                    {!entry.endDate && entry.memo && (
                                        <div className="grid grid-cols-[80px_1fr] gap-x-4">
                                            <p></p>
                                            <p className="text-sm text-gray-700">{entry.schoolName} {entry.memo}</p>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </>
                    )}
                </div>
            </section>

            {/* 職務経歴セクション */}
            <section className="mb-8 border-b pb-4 border-gray-200">
                <h2 className="text-xl font-semibold mb-3 text-blue-700">職務経歴</h2>
                <div className="space-y-4">
                    {workExperience.length === 0 ? (
                        <p className="text-gray-600">職務経歴情報がありません。</p>
                    ) : (
                        <>
                            {workExperience.map((entry, index) => (
                                <div key={entry.id || index} className="border-l-4 border-blue-400 pl-4">
                                    <div className="grid grid-cols-[80px_1fr] gap-x-4">
                                        <p>{entry.startDate.split('-')[0]}年</p>
                                        <p>{entry.startDate.split('-')[1]}月 {entry.companyName} 入社</p>
                                    </div>
                                    {entry.endDate && entry.endDate !== '現在' && (
                                        <div className="grid grid-cols-[80px_1fr] gap-x-4">
                                            <p>{entry.endDate.split('-')[0]}年</p>
                                            <p>{entry.endDate.split('-')[1]}月 {entry.companyName} 退社</p>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-[80px_1fr] gap-x-4 mt-2">
                                        <p></p>
                                        <div>
                                            <p className="font-semibold">{entry.position}</p>
                                            <p className="text-sm whitespace-pre-wrap">{entry.jobDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </section>

            {/* 資格・免許 */}
            <section className="mb-8 border-b pb-4 border-gray-200">
                <h2 className="text-xl font-semibold mb-3 text-blue-700">資格・免許</h2>
                {qualifications.length === 0 ? (
                    <p className="text-gray-600">資格・免許情報がありません。</p>
                ) : (
                    <div className="space-y-3">
                        {qualifications.map((entry, index) => (
                            <div key={entry.id || index} className="grid grid-cols-[80px_1fr] gap-x-4">
                                <p>{entry.date.split('-')[0]}年</p>
                                <p>{entry.date.split('-')[1]}月 {entry.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* 自己PR */}
            <section className="mb-8 border-b pb-4 border-gray-200">
                <h2 className="text-xl font-semibold mb-3 text-blue-700">自己PR</h2>
                {selfPromotion ? (
                    <p className="whitespace-pre-wrap">{selfPromotion}</p>
                ) : (
                    <p className="text-gray-600">自己PRが入力されていません。</p>
                )}
            </section>

            {/* 志望動機 */}
            <section className="mb-8 border-b pb-4 border-gray-200">
                <h2 className="text-xl font-semibold mb-3 text-blue-700">志望動機</h2>
                {motivation ? (
                    <p className="whitespace-pre-wrap">{motivation}</p>
                ) : (
                    <p className="text-gray-600">志望動機が入力されていません。</p>
                )}
            </section>

            {/* 補足情報 */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-blue-700">補足情報</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><span className="font-medium">通勤時間:</span> {commutingTime || '未入力'}</p>
                    <p><span className="font-medium">扶養家族数 (配偶者を除く):</span> {dependentFamilyMembers !== null ? `${dependentFamilyMembers}人` : '未入力'}</p>
                    <p><span className="font-medium">配偶者:</span> {spouse === 'yes' ? '有' : spouse === 'no' ? '無' : '未選択'}</p>
                    <p><span className="font-medium">配偶者の扶養義務:</span> {dependentSpouse === 'yes' ? '有' : dependentSpouse === 'no' ? '無' : '未選択'}</p>
                </div>
            </section>
        </div>
    );
};

export default ResumePreview;