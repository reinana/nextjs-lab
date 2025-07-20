import React from 'react'
import { SkillItem } from '../types/skill'

interface SkillDetailInputProps {
    initialSkills: SkillItem[]; // 初期スキルの配列
    onNext: (selectedSkills: SkillItem[]) => void;
    onBack?: () => void; // 戻るボタンのハンドラ
}
// SkillDetailInputコンポーネントの定義

export default function SkillDetailInput({initialSkills, onNext, onBack }: SkillDetailInputProps) {
    const [skills, setSkills] = React.useState<SkillItem[]>(initialSkills);
    // console.log('SkillDetailInput skills:', skills);
    const handleNext = () => {

        onNext(skills);
    }
    return (
        <div>SkillDetailInput
            <div>
                {skills.map(skill => (
                    <>
                        <div key={skill.id} className="mb-4">{skill.name}</div>
                        <input
                            type="text"
                            placeholder="習得期間"
                            value={skill.learningPeriod}
                            onChange={(e) => {
                                const newSkills = skills.map(s => s.id === skill.id ? { ...s, learningPeriod: e.target.value } : s);
                                setSkills(newSkills);
                            }}
                            className="border rounded p-2 w-full mb-2" 
                        />
                    </>
                ))}
            </div>

            <div className="flex justify-between mt-8">


                <button
                    onClick={onBack}
                    className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    戻る (スキル選択)
                </button>
                <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    次へ (スキル詳細入力)
                </button>
            </div>
        </div>
    )
}
