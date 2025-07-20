import React from 'react'
import { SkillItem } from '../types/skill'

export default function SkillDetailInput({ onNext }: { onNext: (selectedSkills: SkillItem[]) => void }) {
    const [skills, setSkills] = React.useState<SkillItem[]>([]);
    const handleNext = () => {
        
        onNext(skills);
    }
    return (
        <div>SkillDetailInput

            <div className="flex justify-end mt-8">
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
