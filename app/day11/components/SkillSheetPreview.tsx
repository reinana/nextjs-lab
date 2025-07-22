'use client';

import React from 'react';
import {
    SkillSheetData,
    skillCategories,
} from '../types/skill';

// propsとコンポーネントの基本構造は変更なし
interface SkillSheetPreviewProps {
    skillData: SkillSheetData | null;
    onBack: () => void;
}

const SkillSheetPreview: React.FC<SkillSheetPreviewProps> = ({ skillData, onBack }) => {

    if (!skillData) {
        return (
            <div className="p-8 text-center">
                <p>プレビューデータを生成中です...</p>
                <button onClick={onBack} className="mt-4 px-6 py-2 bg-gray-200 rounded">戻る</button>
            </div>
        );
    }

    const { skills, projects } = skillData;

    const PROFICIENCY_STANDARD = {
        level5: "高度な作業や設定が自力で可能。複雑な問題も解決できる。後進指導やアドバイスができる。",
        level4: "中規模なタスクや問題解決が可能。新しい機能や設定もドキュメントを参照しながら試せる。",
        level3: "基本的なタスクを1人で完遂可能。一般的な問題には自力で対応可。基本を理解し一定の応用も可能。",
        level2: "基本的な操作や設定を理解しており、簡単なタスクを実行可能だが複雑な作業にはサポートが必要。",
        level1: "触れたことがある程度。チュートリアルを参考にしながら基本操作を実行できる。",
    };

    const getSkillsByCategory = (categoryName: string) => {
        const skillIds = skillCategories[categoryName] || [];
        return skills.filter(skill => skillIds.includes(skill.id));
    };

    const handlePrint = () => {
        window.print();
    };

    // ★ このコンポーネントは key を受け取れないため、renderSkillTable は削除し、
    //    JSX内で直接マッピングするのが最も安全でReactの作法に沿っています。

    return (
        // ★ 全体を囲むdivに影と角丸を再追加
        <div className="p-4 md:p-8 bg-white text-gray-900 shadow-lg rounded-lg break-words print:shadow-none print:p-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-slate-800 print:text-black">スキルシート</h1>

            {/* 習熟度基準セクション */}
            <section className="mb-10 break-inside-avoid">
                <h2 className="text-xl font-bold mb-3 text-slate-800 border-b-2 border-slate-300 pb-1">習熟度基準</h2>
                <table className="min-w-full text-sm">
                    <tbody>
                        {/* ★ 罫線とpaddingを整理 */}
                        <tr><td className="py-1 px-2 border border-slate-200 font-bold text-center w-10">5</td><td className="py-1 px-2 border border-slate-200">{PROFICIENCY_STANDARD.level5}</td></tr>
                        <tr><td className="py-1 px-2 border border-slate-200 font-bold text-center w-10">4</td><td className="py-1 px-2 border border-slate-200">{PROFICIENCY_STANDARD.level4}</td></tr>
                        <tr><td className="py-1 px-2 border border-slate-200 font-bold text-center w-10">3</td><td className="py-1 px-2 border border-slate-200">{PROFICIENCY_STANDARD.level3}</td></tr>
                        <tr><td className="py-1 px-2 border border-slate-200 font-bold text-center w-10">2</td><td className="py-1 px-2 border border-slate-200">{PROFICIENCY_STANDARD.level2}</td></tr>
                        <tr><td className="py-1 px-2 border border-slate-200 font-bold text-center w-10">1</td><td className="py-1 px-2 border border-slate-200">{PROFICIENCY_STANDARD.level1}</td></tr>
                    </tbody>
                </table>
            </section>

            {/* 技術スキルセクション */}
            <section className="mb-10 break-inside-avoid">
                <h2 className="text-xl font-bold mb-4 text-slate-800 border-b-2 border-slate-300 pb-1">技術スキル</h2>
                <div className="space-y-6">
                    {Object.keys(skillCategories).map(categoryName => {
                        const skillsToRender = getSkillsByCategory(categoryName);
                        const relevantSkills = skillsToRender.filter(s => s.proficiency || (s.learningPeriod && s.learningPeriod.trim() !== ''));
                        if (relevantSkills.length === 0) return null;

                        return (
                            // ★ key はここに設定
                            <div key={categoryName}>
                                <h3 className="text-md font-semibold mb-2 text-slate-700">{categoryName}</h3>
                                <table className="min-w-full bg-white text-sm border border-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="py-1 px-3 border-b border-slate-200 text-left font-semibold w-60">スキル名</th>
                                            <th className="py-1 px-3 border-b border-slate-200 text-center w-24 font-semibold">習熟度</th>
                                            <th className="py-1 px-3 border-b border-slate-200 text-left w-36 font-semibold">学習期間</th>
                                            <th className="py-1 px-3 border-b border-slate-200 text-left font-semibold">関連プロジェクト</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {relevantSkills.map(item => (
                                            <tr key={item.id} className="hover:bg-slate-50">
                                                <td className="py-1 px-3 border-t border-slate-200">{item.name}</td>
                                                <td className="py-1 px-3 border-t border-slate-200 text-center">{item.proficiency || '-'}</td>
                                                <td className="py-1 px-3 border-t border-slate-200">{item.learningPeriod || '-'}</td>
                                                <td className="py-1 px-3 border-t border-slate-200">{projects.filter(p => item.relatedProjectIds.includes(p.id)).map(p => p.projectName).join(', ') || 'なし'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ★ プロジェクト経験セクション */}
            <section className="break-inside-avoid-page">
                <h2 className="text-xl font-bold mb-4 text-slate-800 border-b-2 border-slate-300 pb-1">プロジェクト経験</h2>
                {projects.length === 0 ? (
                    <p className="text-gray-600">プロジェクト経験がありません。</p>
                ) : (
                    // ★ 以前のdivの代わりに、space-y-8でテーブル間のスペースを確保
                    <div className="space-y-8">
                        {projects.map(project => (
                            // ★ 各プロジェクトを一つのテーブルとしてレンダリング
                            <table key={project.id} className="min-w-full text-sm border border-slate-200 break-inside-avoid">
                                <thead className="bg-slate-50">
                                    <tr>
                                        {/* プロジェクト名をテーブルヘッダーとして表示 */}
                                        <th colSpan={2} className="p-1 text-left text-md font-semibold text-slate-700 border-b border-slate-200">
                                            {project.projectName}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {/* 各項目をテーブルの行として表示 */}
                                    <tr>
                                        <td className="p-1 border-t border-slate-200 font-semibold text-slate-600 align-top w-32">期間</td>
                                        <td className="p-1 border-t border-slate-200">{project.period || '未入力'}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-1 border-t border-slate-200 font-semibold text-slate-600 align-top">使用スキル</td>
                                        <td className="p-1 border-t border-slate-200">
                                            {project.techUsedSkillIds.map(skillId => skills.find(s => s.id === skillId)?.name).filter(name => name).join(', ') || 'なし'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-1 border-t border-slate-200 font-semibold text-slate-600 align-top">概要</td>
                                        <td className="p-1 border-t border-slate-200 whitespace-pre-wrap">{project.overview || '未入力'}</td>
                                    </tr>
                                    {project.responsibilities && (
                                        <tr>
                                            <td className="p-1 border-t border-slate-200 font-semibold text-slate-600 align-top">担当業務</td>
                                            <td className="p-1 border-t border-slate-200 whitespace-pre-wrap">{project.responsibilities}</td>
                                        </tr>
                                    )}
                                    {project.innovations && (
                                        <tr>
                                            <td className="p-1 border-t border-slate-200 font-semibold text-slate-600 align-top">工夫した点</td>
                                            <td className="p-1 border-t border-slate-200 whitespace-pre-wrap">{project.innovations}</td>
                                        </tr>
                                    )}
                                    {project.learnings && (
                                        <tr>
                                            <td className="p-1 border-t border-slate-200 font-semibold text-slate-600 align-top">成果・学び</td>
                                            <td className="p-1 border-t border-slate-200 whitespace-pre-wrap">{project.learnings}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ))}
                    </div>
                )}
            </section>

            {/* ボタン部分は変更なし */}
            <div className="flex justify-between mt-8 print:hidden">
                <button onClick={onBack} className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">
                    プロジェクト入力に戻る
                </button>
                <button onClick={handlePrint} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    <span>PDFでダウンロード</span>
                </button>
            </div>
        </div>
    );
};

export default SkillSheetPreview;