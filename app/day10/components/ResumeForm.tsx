// app/day10/components/ResumeForm.tsx
import React, { ChangeEvent } from 'react';
import { ResumeData, EducationEntry, WorkExperienceEntry, QualificationEntry } from '../types/resume';
import EducationSection from './EducationSection';
import WorkExperienceSection from './WorkExperienceSection';
import QualificationSection from './QualificationSection';

// ResumeClientWrapperから渡されるPropsの型定義
interface ResumeFormProps {
    resumeData: ResumeData;
    onDataChange: (newData: Partial<ResumeData>) => void;
    onListChange: <T extends EducationEntry[] | WorkExperienceEntry[] | QualificationEntry[]>(
        field: 'education' | 'workExperience' | 'qualifications',
        updatedList: T
    ) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, onDataChange, onListChange }) => {

    // 基本情報の変更をハンドルする関数
    const handleBasicInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onDataChange({ basicInfo: { ...resumeData.basicInfo, [name]: value } });
    };

    // 自己PRや志望動機など、直接stringを更新するフィールドの変更をハンドル
    const handleStringFieldChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        onDataChange({ [name]: value });
    };

    // 数値フィールドの変更をハンドル (例: 年齢、扶養家族数)
    // const handleNumberFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     const numValue = value === '' ? null : Number(value); // 空文字はnull、そうでなければ数値に変換
    //     onDataChange({ basicInfo: { ...resumeData.basicInfo, [name]: numValue } });
    // };

    // 証明写真のアップロードをハンドル
    const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onDataChange({ photo: reader.result as string }); // Base64エンコードされた文字列として保存
            };
            reader.readAsDataURL(file); // ファイルをBase64として読み込む
        }
    };

    // 補足情報の変更をハンドル
    const handleSupplementalInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numValue = (name === 'dependentFamilyMembers' && value !== '') ? Number(value) : value; // 扶養家族数のみ数値変換
        onDataChange({ [name]: numValue });
    };


    return (
        <form className="space-y-8">
            {/* 基本情報セクション */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 border-b pb-2">基本情報</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">氏名</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={resumeData.basicInfo.fullName}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="fullNameKana" className="block text-sm font-medium text-gray-700 dark:text-gray-300">ふりがな</label>
                        <input
                            type="text"
                            id="fullNameKana"
                            name="fullNameKana"
                            value={resumeData.basicInfo.fullNameKana}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">生年月日</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={resumeData.basicInfo.dateOfBirth}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">性別</label>
                        <select
                            id="gender"
                            name="gender"
                            value={resumeData.basicInfo.gender || ''}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                        >
                            <option value="">選択してください</option>
                            <option value="male">男性</option>
                            <option value="female">女性</option>
                            <option value="other">その他</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">携帯電話</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={resumeData.basicInfo.phoneNumber}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={resumeData.basicInfo.email}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">郵便番号</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={resumeData.basicInfo.postalCode}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                            placeholder="例: 123-4567"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">住所</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={resumeData.basicInfo.address}
                            onChange={handleBasicInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                            placeholder="例: 東京都渋谷区神南1-2-3"
                        />
                    </div>
                </div>
            </section>

            {/* 自己PRセクション */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 border-b pb-2">自己PR</h2>
                <div>
                    <label htmlFor="selfPromotion" className="sr-only">自己PR</label>
                    <textarea
                        id="selfPromotion"
                        name="selfPromotion"
                        rows={5}
                        value={resumeData.selfPromotion}
                        onChange={handleStringFieldChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                        placeholder="あなたの強みや経験をアピールしてください。"
                    ></textarea>
                </div>
            </section>

            {/* 志望動機セクション */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 border-b pb-2">志望動機</h2>
                <div>
                    <label htmlFor="motivation" className="sr-only">志望動機</label>
                    <textarea
                        id="motivation"
                        name="motivation"
                        rows={5}
                        value={resumeData.motivation}
                        onChange={handleStringFieldChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                        placeholder="この企業や職種を選んだ理由を具体的に記述してください。"
                    ></textarea>
                </div>
            </section>

            {/* 証明写真セクション */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 border-b pb-2">証明写真</h2>
                <div className="flex items-center space-x-4">
                    <input
                        type="file"
                        id="photoUpload"
                        name="photo"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="block w-full text-sm text-gray-500 dark:text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
                    />
                    {resumeData.photo && (
                        <div className="w-24 h-32 flex-shrink-0 border rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={resumeData.photo} alt="証明写真プレビュー" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </section>

            {/* 補足情報セクション */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 border-b pb-2">補足情報</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="commutingTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">通勤時間</label>
                        <input
                            type="text"
                            id="commutingTime"
                            name="commutingTime"
                            value={resumeData.commutingTime}
                            onChange={handleSupplementalInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                            placeholder="例: 1時間30分"
                        />
                    </div>
                    <div>
                        <label htmlFor="dependentFamilyMembers" className="block text-sm font-medium text-gray-700 dark:text-gray-300">扶養家族数（配偶者を除く）</label>
                        <input
                            type="number"
                            id="dependentFamilyMembers"
                            name="dependentFamilyMembers"
                            value={resumeData.dependentFamilyMembers !== null ? resumeData.dependentFamilyMembers : ''}
                            onChange={handleSupplementalInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                            min="0"
                        />
                    </div>
                    <div>
                        <label htmlFor="spouse" className="block text-sm font-medium text-gray-700 dark:text-gray-300">配偶者の有無</label>
                        <select
                            id="spouse"
                            name="spouse"
                            value={resumeData.spouse || ''}
                            onChange={handleSupplementalInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                        >
                            <option value="">選択してください</option>
                            <option value="yes">あり</option>
                            <option value="no">なし</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dependentSpouse" className="block text-sm font-medium text-gray-700 dark:text-gray-300">配偶者の扶養義務</label>
                        <select
                            id="dependentSpouse"
                            name="dependentSpouse"
                            value={resumeData.dependentSpouse || ''}
                            onChange={handleSupplementalInfoChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-2"
                        >
                            <option value="">選択してください</option>
                            <option value="yes">あり</option>
                            <option value="no">なし</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* 学歴セクション (今後ここに追加) */}
            <EducationSection
                education={resumeData.education} // ★ ここで education プロパティを渡す
                onListChange={(updatedList) => onListChange('education', updatedList)} // ★ ここで onListChange プロパティを渡す
            />
            {/* 職務経歴セクション (今後ここに追加) */}
            <WorkExperienceSection
                workExperience={resumeData.workExperience} // ★ ここで workExperience プロパティを渡す
                onListChange={(updatedList) => onListChange('workExperience', updatedList)} // ★ ここで onListChange プロパティを渡す
            />

            {/* 資格・免許セクション (今後ここに追加) */}
            <QualificationSection
                qualifications={resumeData.qualifications} // ★ ここで qualifications プロパティを渡す
                onListChange={(updatedList) => onListChange('qualifications', updatedList)} // ★ ここで onListChange プロパティを渡す
            />
        </form>
    );
};

export default ResumeForm;