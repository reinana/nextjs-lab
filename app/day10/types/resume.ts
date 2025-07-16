// Next_lab/app/day10/types/resume.ts

// uuidライブラリをインポートし、v4版のUUID生成関数を使用
import { v4 as uuidv4 } from "uuid";

/**
 * @interface BasicInfo
 * @description 履歴書の基本情報（氏名、連絡先、住所など）の型定義
 * 基本設計書に定義された内容に厳密に準拠します。
 */
export interface BasicInfo {
    fullName: string; // 氏名 (例: 山田 太郎)
    fullNameKana: string; // ふりがな (例: ヤマダ タロウ)
    dateOfBirth: string; // 生年月日 (YYYY-MM-DD形式を想定、例: 1990-01-15)
    gender: "male" | "female" | "other" | "" | null; // 性別 (一般的な履歴書項目)
    phoneNumber: string; // 携帯電話 (例: 090-1234-5678)
    email: string; // メールアドレス (例: example@example.com)
    postalCode: string; // 郵便番号 (一般的な履歴書項目)
    address: string; // 住所 (都道府県から番地まで)
}

/**
 * @interface EducationEntry
 * @description 学歴リストの各項目の型定義
 * 基本設計書の内容を独立したインターフェースとして定義します。
 */
export interface EducationEntry {
    id: string; // 各項目を識別するためのユニークID (編集・削除時に必要)
    startDate: string; // 開始年月 (YYYY-MM形式を想定、例: 2008-04)
    endDate: string; // 終了年月 (YYYY-MM形式を想定、例: 2012-03)
    schoolName: string; // 学校名 (例: 〇〇大学)
    degree: string; // 学部・学科・専攻など (例: 経済学部 経済学科)
    memo?: string; // 備考 (卒業見込みなど、オプショナル)
}

/**
 * @interface WorkExperienceEntry
 * @description 職務経歴リストの各項目の型定義
 * 基本設計書の内容を独立したインターフェースとして定義します。
 */
export interface WorkExperienceEntry {
    id: string; // 各項目を識別するためのユニークID
    startDate: string; // 開始年月 (YYYY-MM形式を想定、例: 2012-04)
    endDate: string; // 終了年月 (YYYY-MM形式を想定、例: 2020-03 または '現在')
    companyName: string; // 会社名 (例: 株式会社〇〇)
    position: string; // 役職・部署 (例: 営業部 主任)
    jobDescription: string; // 業務内容（複数行入力想定）
}

/**
 * @interface QualificationEntry
 * @description 資格・免許リストの各項目の型定義
 * 基本設計書の内容を独立したインターフェースとして定義します。
 */
export interface QualificationEntry {
    id: string; // 各項目を識別するためのユニークID
    date: string; // 取得年月 (YYYY-MM形式を想定、例: 2015-06)
    name: string; // 資格・免許名 (例: TOEIC 800点)
}

/**
 * @interface ResumeData
 * @description 履歴書全体のデータ構造を定義するメインインターフェース
 * 基本設計書に定義されたすべての項目を網羅し、上記で定義された独立したインターフェースを参照します。
 */
export interface ResumeData {
    basicInfo: BasicInfo; // 基本情報オブジェクト
    education: EducationEntry[]; // 学歴の配列
    workExperience: WorkExperienceEntry[]; // 職務経歴の配列
    qualifications: QualificationEntry[]; // 資格・免許の配列
    selfPromotion: string; // 自己PR（複数行入力想定）
    motivation: string; // 志望動機（複数行入力想定）
    photo: string | null; // 証明写真のBase64文字列（URLではない）

    // 補足情報 (一般的な履歴書項目)
    commutingTime: string; // 通勤時間 (例: 1時間30分)
    dependentFamilyMembers: number | null; // 扶養家族数 (配偶者を除く)
    spouse: "yes" | "no" | "" | null; // 配偶者の有無
    dependentSpouse: "yes" | "no" | "" | null; // 配偶者の扶養義務
}

// --- ヘルパー関数 ---

/**
 * @function createNewEducationEntry
 * @description 新しい空の学歴エントリを作成するためのヘルパー関数。
 * 各リスト項目にはユニークなIDを付与するため、uuidを生成します。
 * @returns {EducationEntry} 新しい学歴エントリ
 */
export const createNewEducationEntry = (): EducationEntry => ({
    id: uuidv4(),
    startDate: "",
    endDate: "",
    schoolName: "",
    // degreeとmemoは基本設計書のEducationEntryに存在するため追加
    degree: "",
    memo: "",
});

/**
 * @function createNewWorkExperienceEntry
 * @description 新しい空の職務経歴エントリを作成するためのヘルパー関数。
 * @returns {WorkExperienceEntry} 新しい職務経歴エントリ
 */
export const createNewWorkExperienceEntry = (): WorkExperienceEntry => ({
    id: uuidv4(),
    startDate: "",
    endDate: "",
    companyName: "",
    position: "",
    jobDescription: "",
});

/**
 * @function createNewQualificationEntry
 * @description 新しい空の資格・免許エントリを作成するためのヘルパー関数。
 * @returns {QualificationEntry} 新しい資格・免許エントリ
 */
export const createNewQualificationEntry = (): QualificationEntry => ({
    id: uuidv4(),
    date: "",
    name: "",
});

// --- 履歴書の初期データ ---

/**
 * @constant initialResumeData
 * @description 履歴書全体のデータ構造の初期値。
 * 基本設計書に完全に準拠した初期値を設定します。
 */
export const initialResumeData: ResumeData = {
    basicInfo: {
        fullName: "",
        fullNameKana: "",
        dateOfBirth: "",
        gender: "", // 基本設計書に合わせて空文字列
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
    spouse: "", // 基本設計書に合わせて空文字列
    dependentSpouse: "", // 基本設計書に合わせて空文字列
};
