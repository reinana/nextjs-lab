import React from 'react'
import { SkillItem, SkillSheetData } from '../types/skill'

interface SkillSheetPreviewProps {
    skillData: SkillSheetData;
    onBack: () => void; // 戻るボタンのハンドラ
}   
export default function SkillSheetPreview({ skillData, onBack } : SkillSheetPreviewProps ) {

    const { proficiencyStandard, allSkills, projectExperiences } = skillData;
    // PDFをダウンロードするハンドラ
    const handleDownload = () => {
        if (!skillData) return;
    }
    return (
        <div>SkillSheetPreview
            <div className="flex justify-between mt-8">
                <button
                    onClick={onBack}
                    className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    戻る (プロジェクト入力)
                </button>
                <button
                    onClick={handleDownload}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    PDFダウンロード
                </button>
            </div>
        </div >
    )
}
