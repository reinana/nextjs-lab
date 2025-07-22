'use client';

import React, { useState, useEffect } from 'react';
import { SkillItem, ProficiencyLevel } from '../types/skill';

interface SkillDetailInputProps {
    initialSkills: SkillItem[];
    onDetailsChange: (updatedSkills: SkillItem[]) => void; // ★ データ更新用のpropsを追加
    onNext: () => void;
    onBack: () => void;
}

// 習熟度の選択肢を定義
const proficiencyOptions: ProficiencyLevel[] = [5, 4, 3, 2, 1];

const SkillDetailInput: React.FC<SkillDetailInputProps> = ({ initialSkills, onDetailsChange, onNext, onBack }) => {
    // 親から渡されたデータで内部状態を初期化
    const [skills, setSkills] = useState<SkillItem[]>(initialSkills);

    // 親のデータが変更されたら、内部状態も同期させる（「戻る」などで再表示された際に必須）
    useEffect(() => {
        setSkills(initialSkills);
    }, [initialSkills]);

    // スキルの入力値を更新する、タイプセーフな関数
    const handleSkillChange = (
        id: string,
        field: keyof Omit<SkillItem, 'id' | 'name' | 'relatedProjectIds'>,
        value: string | ProficiencyLevel
    ) => {
        const updatedSkills = skills.map(skill =>
            skill.id === id ? { ...skill, [field]: value } : skill
        );

        setSkills(updatedSkills); // 自分のstateを更新
        onDetailsChange(updatedSkills); // ★ 親のstateもリアルタイムで更新！
    };



    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Step 2: スキルの詳細を入力してください</h2>
            <p className="mb-6 text-gray-700 text-center">
                選択した各スキルについて、習熟度と学習期間を記入してください。
            </p>

            {/* ユーザーが入力しやすいように習熟度基準を表示 */}
            <section className="mb-8 p-4 shadow-lg rounded-lg bg-yellow-50">
                <h3 className="text-xl font-bold mb-4 text-yellow-700">習熟度基準</h3>
                <ol reversed className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                    <li> 高度な作業や設定が自力で可能。複雑な問題も解決できる。後進指導やアドバイスができる。</li>
                    <li> 中規模なタスクや問題解決が可能。新しい機能や設定もドキュメントを参照しながら試せる。</li>
                    <li> 基本的なタスクを1人で完遂可能。一般的な問題には自力で対応可。基本を理解し一定の応用も可能。</li>
                    <li> 基本的な操作や設定を理解しており、簡単なタスクを実行可能だが複雑な作業にはサポートが必要。</li>
                    <li> 触れたことがある程度。チュートリアルを参考にしながら基本操作を実行できる。</li>
                </ol>
            </section>

            {/* 入力フォーム（テーブルレイアウト） */}
            <div className="overflow-x-auto shadow-lg rounded-lg mb-8">
                <table className="min-w-full bg-slate-100 shadow-lg rounded-lg border-gray-300 ">
                    <thead className="">
                        <tr>
                            <th className="py-2 px-4 text-left">スキル名</th>
                            <th className="py-2 px-4 text-left">習熟度</th>
                            <th className="py-2 px-4 text-left">学習期間 / 経験年数</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="py-4 text-center text-gray-500">
                                    Step 1でスキルが選択されていません。
                                </td>
                            </tr>
                        ) : (
                            skills.map(skill => (
                                <tr key={skill.id}>
                                    <td className="py-2 px-4  font-medium">{skill.name}</td>
                                    <td className="py-2 px-4 ">
                                        <select
                                            className="w-full p-2 rounded inset-shadow-sm bg-white"
                                            value={skill.proficiency}
                                            onChange={(e) =>
                                                handleSkillChange(skill.id, 'proficiency', e.target.value === '' ? '' : parseInt(e.target.value, 10) as ProficiencyLevel)
                                            }
                                        >
                                            <option value="">選択してください</option>
                                            {proficiencyOptions.map(level => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="py-2 px-4 ">
                                        <input
                                            type="text"
                                            className="w-full p-2 rounded inset-shadow-sm bg-white"
                                            value={skill.learningPeriod}
                                            onChange={(e) => handleSkillChange(skill.id, 'learningPeriod', e.target.value)}
                                            placeholder="例: 1年、6ヶ月"
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ナビゲーションボタン */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={onBack}
                    className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400"
                >
                    戻る (スキル選択)
                </button>
                <button
                    onClick={onNext}
                    className="px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={skills.length === 0}
                >
                    次へ (プロジェクト入力)
                </button>
            </div>
        </div>
    );
};

export default SkillDetailInput;