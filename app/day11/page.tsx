'use client'

import React, { useState } from 'react'
import SkillSelection from './components/SkillSelection'
import SkillDetailInput from './components/SkillDetailInput'
import { ProjectExperience, SkillItem, SkillSheetData } from './types/skill'
import ProjectForm from './components/ProjectForm'
import SkillSheetPreview from './components/SkillSheetPreview'
import Link from 'next/link'

type Step = 'selection' | 'details' | 'projects' | 'preview'

export default function SkillSheetPage() {
    const [currentStep, setCurrentStep] = useState<Step>('selection')
    // ★ selectedSkillsを廃止し、skillDetailsに一本化
    const [skillDetails, setSkillDetails] = useState<SkillItem[]>([])
    const [projects, setProjects] = useState<ProjectExperience[]>([])
    const [finalSkillSheetData, setFinalSkillSheetData] = useState<SkillSheetData | null>(null)

    // ★ Step 1 → 2: スキル選択後の処理
    const handleSkillSelectionNext = (selectedRawSkills: SkillItem[]) => {
        // 既存の詳細情報を維持しつつ、新しい選択を反映させる
        const updatedDetails = selectedRawSkills.map(newSkill => {
            const existingDetail = skillDetails.find(d => d.id === newSkill.id);
            // 既に詳細があればそれを使い、なければ新しいスキルを追加
            return existingDetail || newSkill;
        });
        setSkillDetails(updatedDetails);
        setCurrentStep('details');
    }

    // ★ Step 2: スキル詳細が変更されるたびに呼び出される関数を新設
    const handleDetailsChange = (updatedSkills: SkillItem[]) => {
        setSkillDetails(updatedSkills);
    }

    // ★ Step 2 → 3: 次のステップへ進むだけの関数に変更
    const handleSkillDetailNext = () => {
        setCurrentStep('projects');
    }

    // ★ Step 3 → 4: プロジェクト入力後の処理
    const handleProjectFormNext = (newProjects: ProjectExperience[]) => {
        setProjects(newProjects);
        // プレビュー用に最終的なデータを作成
        const updatedSkillDetails = skillDetails.map(skill => {
            // 新しい関連プロジェクトIDを格納する配列
            const newRelatedProjectIds: string[] = [];

            // 全ての新しいプロジェクトをチェック
            newProjects.forEach(project => {
                // もしプロジェクトがこのスキルを使っていたら、IDを追加
                if (project.techUsedSkillIds.includes(skill.id)) {
                    newRelatedProjectIds.push(project.id);
                }
            });

            // 更新された関連プロジェクトIDを持つ新しいスキルオブジェクトを返す
            return { ...skill, relatedProjectIds: newRelatedProjectIds };
        });

        // 更新されたスキル詳細でstateを更新
        setSkillDetails(updatedSkillDetails);
        // --- ここまで ---

        // 最終的なプレビューデータを作成
        setFinalSkillSheetData({
            skills: updatedSkillDetails, // ★ 更新されたスキルデータを渡す
            projects: newProjects,
        });

        setCurrentStep('preview');
    }

    // 戻るボタンの処理
    const handleBack = () => {
        if (currentStep === 'details') {
            setCurrentStep('selection')
        } else if (currentStep === 'projects') {
            setCurrentStep('details')
        } else if (currentStep === 'preview') {
            setCurrentStep('projects')
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-8">
            <div>
                {currentStep === 'selection' && (<SkillSelection initialSkills={skillDetails} onNext={handleSkillSelectionNext} />)}
                {currentStep === 'details' && (<SkillDetailInput initialSkills={skillDetails} onDetailsChange={handleDetailsChange} onNext={handleSkillDetailNext} onBack={handleBack} />)}
                {currentStep === 'projects' && (<ProjectForm initialSkills={skillDetails} initialProjects={projects} onNext={handleProjectFormNext} onBack={handleBack} />)}
                {currentStep === 'preview' && (<SkillSheetPreview skillData={finalSkillSheetData} onBack={handleBack} />)}
            </div>
            <Link href="/" className="mt-10 text-blue-600 text-sm hover:underline">
                ← 一覧に戻る
            </Link>
        </main>
    )
}


