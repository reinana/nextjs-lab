'use client'

import React, { useState } from 'react'
import SkillSelection from './components/SkillSelection'
import SkillDetailInput from './components/SkillDetailInput'
import { ProjectExperience, SkillItem, SkillSheetData } from './types/skill'
import ProjectForm from './components/ProjectForm'
import SkillSheetPreview from './components/SkillSheetPreview'

type Step = 'selection' | 'details' | 'projects' | 'preview'

export default function SkillSheetPage() {
    const [currentStep, setCurrentStep] = useState<Step>('selection')
    const [selectedSkills, setSelectedSkills] = useState<SkillItem[]>([])
    const [skillDetails, setSkillDetails] = useState<SkillItem[]>([])
    const [projects, setProjects] = useState<ProjectExperience[]>([])

    const [finalSkillSheetData, setFinalSkillSheetData] = useState<SkillSheetData | null>(null)

    const handleSkillSelectionNext = (skills: SkillItem[]) => {
        setSelectedSkills(skills)
        setCurrentStep('details')
    }

    const handleSkillDetailNext = (skills: SkillItem[]) => {
        setSelectedSkills(skills)
        setCurrentStep('projects')
    }
    const handleProjectFormNext = (skills: SkillItem[]) => {
        setSelectedSkills(skills)
        setCurrentStep('preview')
    }
    
  return (
    <div>
        {currentStep === 'selection' && (<SkillSelection onNext={handleSkillSelectionNext}/>)}
        {currentStep === 'details' && (<SkillDetailInput onNext={handleSkillDetailNext}/>)}
        {currentStep === 'projects' && (<ProjectForm onNext={handleProjectFormNext}/>)}
        {currentStep === 'preview' && (<SkillSheetPreview skillData={finalSkillSheetData}/>)}
    </div>
  )
}
// このアプリのステップ
// →スキルをチェックする
// →スキルの詳細を書く
// →プロジェクトを書く

// ルートpage.tsx：全てのステートを記録するページ
// 現在のステップを記録

// スキル選択肢シートで選択する チェックボックス useStateでスキルを配列に
// 次へを押すと、その配列がリフトアップされて、page.tsxに
// コールバックonNext = {handleSkillSlectionNext} onNextがプロップス
// リフトアップしてきスキルをsetSelectedSkillsでセット
// ステップを'details'に変更

// detailsが表示 {&&}とかで切り替える
// detailsコンポーネントのprops oneNext = {handleSkillDetailsNext} initialSelectedSkillsを渡す
// initialSelectedSkillsをuseStateの初期値


