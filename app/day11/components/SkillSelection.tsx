'use client';

import React, { useState, useEffect } from 'react'; // ★ useEffect をインポート
import { SkillItem, initialAllSkills, skillCategories } from '../types/skill';

// ★ propsの型名を page.tsx に合わせる (initialSelectedSkills -> initialSkills)
interface SkillSelectionProps {
    initialSkills: SkillItem[];
    onNext: (selectedSkills: SkillItem[]) => void;
}

const SkillSelection: React.FC<SkillSelectionProps> = ({ initialSkills, onNext }) => {
    // ★ 親から渡された initialSkills を基に、選択状態のSetを初期化
    const [selectedSkillIds, setSelectedSkillIds] = useState<Set<string>>(
        new Set(initialSkills.map(skill => skill.id))
    );

    // ★ 親から渡される initialSkills が変更されたら、内部の選択状態も同期させる
    useEffect(() => {
        setSelectedSkillIds(new Set(initialSkills.map(skill => skill.id)));
    }, [initialSkills]);

    const handleCheckboxChange = (skillId: string) => {
        setSelectedSkillIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(skillId)) {
                newSet.delete(skillId);
            } else {
                newSet.add(skillId);
            }
            return newSet;
        });
    };

    const handleNext = () => {
        // 選択されたIDを基に、マスターデータから完全なSkillItemオブジェクトの配列を作成
        const selectedSkills = initialAllSkills.filter(skill => selectedSkillIds.has(skill.id));
        onNext(selectedSkills);
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Step 1: 経験のあるスキルを選択してください</h2>
            <p className="mb-6 text-gray-700 text-center">
                経験がある、または学習したことのあるスキルにチェックを入れてください。
            </p>

            {Object.entries(skillCategories).map(([categoryName, skillIdsInThisCategory]) => (
                <div key={categoryName} className="mb-8 p-4 shadow-sm rounded-lg bg-slate-100">
                    <h3 className="text-xl font-bold mb-4 text-slate-900">{categoryName}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {skillIdsInThisCategory.map(skillId => {
                            const skill = initialAllSkills.find(s => s.id === skillId);
                            if (!skill) return null;

                            return (
                                <label key={skill.id} className="flex items-center space-x-2 p-2 bg-white  rounded-md inset-shadow-sm hover:bg-gray-100 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                                        checked={selectedSkillIds.has(skill.id)}
                                        onChange={() => handleCheckboxChange(skill.id)}
                                    />
                                    <span className="text-gray-800 font-medium">{skill.name}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div className="flex justify-end mt-8">
                <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    次へ (スキル詳細入力)
                </button>
            </div>
        </div>
    );
};

export default SkillSelection;