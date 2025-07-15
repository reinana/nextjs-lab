// app/day10/types/resume.ts

import { v4 as uuidv4 } from "uuid";

/**
 * 各リスト項目の型を定義し、エクスポート
 */
export interface EducationEntry {
    id: string;
    startDate: string;
    endDate: string;
    schoolName: string;
    degree: string;
    memo?: string;
}

export interface WorkExperienceEntry {
    id: string;
    startDate: string;
    endDate: string;
    companyName: string;
    position: string;
    jobDescription: string;
}

export interface QualificationEntry {
    id: string;
    date: string;
    name: string;
}

/**
 * 履歴書全体のデータ構造
 */
export interface ResumeData {
    basicInfo: {
        fullName: string;
        fullNameKana: string;
        dateOfBirth: string;
        age: number | null;
        gender: "male" | "female" | "other" | "" | null;
        phoneNumber: string;
        email: string;
        postalCode: string;
        address: string;
    };
    education: EducationEntry[]; // 型を適用
    workExperience: WorkExperienceEntry[]; // 型を適用
    qualifications: QualificationEntry[]; // 型を適用
    selfPromotion: string;
    motivation: string;
    photo: string | null;
    commutingTime: string;
    dependentFamilyMembers: number | null;
    spouse: "yes" | "no" | "" | null;
    dependentSpouse: "yes" | "no" | "" | null;
}

// 初期データ（新規作成時やリセット時に利用）
export const initialResumeData: ResumeData = {
    basicInfo: {
        fullName: "",
        fullNameKana: "",
        dateOfBirth: "",
        age: null,
        gender: "",
        phoneNumber: "",
        email: "",
        postalCode: "",
        address: "",
    },
    education: [],
    workExperience: [],
    qualifications: [],
    selfPromotion: "",
    motivation: "",
    photo: null,
    commutingTime: "",
    dependentFamilyMembers: null,
    spouse: "",
    dependentSpouse: "",
};

// リスト項目を生成するヘルパー関数
export const createNewEducationEntry = (): EducationEntry => ({
    id: uuidv4(),
    startDate: "",
    endDate: "",
    schoolName: "",
    degree: "",
    memo: "",
});

export const createNewWorkExperienceEntry = (): WorkExperienceEntry => ({
    id: uuidv4(),
    startDate: "",
    endDate: "",
    companyName: "",
    position: "",
    jobDescription: "",
});

export const createNewQualificationEntry = (): QualificationEntry => ({
    id: uuidv4(),
    date: "",
    name: "",
});
