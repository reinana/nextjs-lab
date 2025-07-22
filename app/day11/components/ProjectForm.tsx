'use client';

import React, { useState, useEffect } from 'react';
import { ProjectExperience, SkillItem } from '../types/skill';

interface ProjectFormProps {
    initialSkills: SkillItem[];
    initialProjects: ProjectExperience[];
    onNext: (projects: ProjectExperience[]) => void;
    onBack: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialSkills, initialProjects, onNext, onBack }) => {
    const [projects, setProjects] = useState<ProjectExperience[]>(initialProjects);

    // 親から渡されるデータと同期
    useEffect(() => {
        setProjects(initialProjects);
    }, [initialProjects]);

    // 新しいプロジェクトを追加
    const handleAddProject = () => {
        const newProject: ProjectExperience = {
            id: `proj_${Date.now()}`, // ユニークなIDを生成
            projectName: '',
            period: '',
            overview: '',
            techUsedSkillIds: [],
            type: 'personal', // デフォルト値
        };
        setProjects(prev => [...prev, newProject]);
    };

    // プロジェクトを削除
    const handleRemoveProject = (projectId: string) => {
        setProjects(prev => prev.filter(p => p.id !== projectId));
    };

    // プロジェクトのテキストフィールドなどを更新
    const handleProjectChange = (
        projectId: string,
        field: keyof ProjectExperience,
        value: string
    ) => {
        setProjects(prev =>
            prev.map(p => (p.id === projectId ? { ...p, [field]: value } : p))
        );
    };

    // プロジェクトとスキルの紐付けを更新
    const handleSkillLinkChange = (
        projectId: string,
        skillId: string,
        isChecked: boolean
    ) => {
        setProjects(prevProjects =>
            prevProjects.map(project => {
                if (project.id === projectId) {
                    const newSkillIds = new Set(project.techUsedSkillIds);
                    if (isChecked) {
                        newSkillIds.add(skillId);
                    } else {
                        newSkillIds.delete(skillId);
                    }
                    return { ...project, techUsedSkillIds: Array.from(newSkillIds) };
                }
                return project;
            })
        );
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Step 3: プロジェクト経験を入力してください</h2>

            {/* プロジェクト追加ボタン */}
            <div className="mb-6 text-center">
                <button onClick={handleAddProject} className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">
                    ＋ プロジェクトを追加
                </button>
            </div>

            {/* プロジェクト入力フォームのリスト */}
            <div className="space-y-8">
                {projects.length === 0 ? (
                    <p className="text-center text-gray-500">プロジェクトを追加してください。</p>
                ) : (
                    projects.map((project, index) => (
                        <div key={project.id} className="p-6 shadow-lg rounded-lg relative bg-slate-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-slate-800">プロジェクト {index + 1}</h3>
                                <button onClick={() => handleRemoveProject(project.id)} className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded hover:bg-red-600">
                                    削除
                                </button>
                            </div>

                            {/* 各種入力フィールド */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">プロジェクト名</label>
                                    <input type="text" value={project.projectName} onChange={e => handleProjectChange(project.id, 'projectName', e.target.value)} className="mt-1 block w-full rounded-md bg-white inset-shadow-sm p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">期間</label>
                                    <input type="text" placeholder="例: 2024/01 ~ 2024/03" value={project.period} onChange={e => handleProjectChange(project.id, 'period', e.target.value)} className="mt-1 block w-full rounded-md bg-white inset-shadow-sm p-2" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">概要</label>
                                    <textarea value={project.overview} onChange={e => handleProjectChange(project.id, 'overview', e.target.value)} rows={4} className="mt-1 block w-full rounded-md bg-white inset-shadow-sm p-2" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">主な担当業務・役割</label>
                                    <textarea value={project.responsibilities || ''} onChange={e => handleProjectChange(project.id, 'responsibilities', e.target.value)} rows={3} className="mt-1 block w-full rounded-md bg-white inset-shadow-sm p-2" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">工夫した点・技術的な挑戦</label>
                                    <textarea value={project.innovations || ''} onChange={e => handleProjectChange(project.id, 'innovations', e.target.value)} rows={3} className="mt-1 block w-full rounded-md bg-white inset-shadow-sm p-2" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">成果・学んだこと</label>
                                    <textarea value={project.learnings || ''} onChange={e => handleProjectChange(project.id, 'learnings', e.target.value)} rows={3} className="mt-1 block w-full rounded-md bg-white inset-shadow-sm p-2" />
                                </div>
                            </div>

                            {/* 使用スキル連携 */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">使用スキル</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4 inset-shadow-sm rounded-md bg-white">
                                    {initialSkills.map(skill => (
                                        <label key={skill.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={project.techUsedSkillIds.includes(skill.id)}
                                                onChange={e => handleSkillLinkChange(project.id, skill.id, e.target.checked)}
                                                className="form-checkbox h-4 w-4 text-blue-600 rounded"
                                            />
                                            <span className="text-sm">{skill.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* ナビゲーションボタン */}
            <div className="flex justify-between mt-8">
                <button onClick={onBack} className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300">
                    戻る
                </button>
                <button onClick={() => onNext(projects)} className="px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700">
                    次へ (プレビュー)
                </button>
            </div>
        </div>
    );
};

export default ProjectForm;