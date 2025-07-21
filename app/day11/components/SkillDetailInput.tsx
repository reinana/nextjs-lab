import React, { useEffect } from 'react'
import { ProficiencyLevel, SkillItem } from '../types/skill'

interface SkillDetailInputProps {
    initialSkills: SkillItem[]; // 初期スキルの配列
    onNext: (selectedSkills: SkillItem[]) => void;
    onBack?: () => void; // 戻るボタンのハンドラ
}
const proficiencyOptions: ProficiencyLevel[] = [5, 4, 3, 2, 1];
// SkillDetailInputコンポーネントの定義

export default function SkillDetailInput({ initialSkills, onNext, onBack }: SkillDetailInputProps) {
    const [skills, setSkills] = React.useState<SkillItem[]>(initialSkills);
    // console.log('SkillDetailInput skills:', skills);

    // 初期スキルを受け取ってステートにセット
    // useEffectを使ってinitialSkillsが変わったときにskillsを更新 戻るボタンで戻ったらuseStateは呼ばれないから
    useEffect(() => {
        setSkills(initialSkills);
    }, [initialSkills]);

    const handleSkillChange = (id: string, field: keyof Omit<SkillItem, 'id' | 'name' | 'relatedProjectIds'>, value: string | ProficiencyLevel) => {
        setSkills(prevSkills =>
            prevSkills.map(skill =>
                skill.id === id ? { ...skill, [field]: value } : skill
            )
        );
    };
    const handleNext = () => {
        onNext(skills);
    }

    return (
        <div className='p-8 bg-white shadow-lg rounded-lg'>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Step 2: スキルの詳細を入力してください</h2>
            <p className="mb-6 text-gray-700 text-center">
                選択した各スキルについて、習熟度と学習期間を記入してください。
            </p>

            {/* 習熟度基準 */}
            <section className="mb-8 p-4 rounded-lg bg-yellow-50 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-yellow-700">習熟度基準</h3>
                <ol reversed className="list-decimal pl-6 space-y-2 text-gray-800">
                    <li>高度な作業や設定が自力で可能。複雑な問題も解決できる。後進指導やアドバイスができる。</li>
                    <li>中規模なタスクや問題解決が可能。新しい機能や設定もドキュメントを参照しながら試せる。</li>
                    <li>基本的なタスクを1人で完遂可能。一般的な問題には自力で対応可。基本を理解し一定の応用も可能。</li>
                    <li>基本的な操作や設定を理解しており、簡単なタスクを実行可能だが複雑な作業にはサポートが必要。</li>
                    <li>触れたことがある程度。チュートリアルを参考にしながら基本操作を実行できる。</li>
                </ol>
            </section>
            <div className="overflow-x-auto mb-8 shadow-sm rounded-lg p-4">
                <table className="min-w-full bg-white ">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">スキル名</th>
                            <th className="py-2 px-4 border-b">習熟度</th>
                            <th className="py-2 px-4 border-b">学習期間</th>
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
                                    <td className="py-2 px-4 font-medium">{skill.name}</td>
                                    <td className="py-2 px-4 ">
                                        <select
                                            className="w-full p-3 inset-shadow-sm rounded align-middle"
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
                                    <td className="py-2 px-4">
                                        <input
                                            type="text"
                                            className="w-full p-3 rounded inset-shadow-sm align-middle"
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
