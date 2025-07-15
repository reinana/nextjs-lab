# 履歴書作成アプリ：実装フェーズの開始
ここからは、実際にコードを書きながらアプリを形にしていきます。以下のステップで進めていくのが効率的です。

**1. プロジェクトの準備**
まず、day10 用の新しいディレクトリを作成し、必要なファイルと依存関係をセットアップします。

day10 ディレクトリの作成:
app ディレクトリ内に day10 ディレクトリを作成します。

```Bash

mkdir app/day10
```
page.tsx の作成:
app/day10/page.tsx を作成し、基本的な Next.js ページとして設定します。
```TypeScript

// app/day10/page.tsx

import ResumeClientWrapper from './components/ResumeClientWrapper';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-8">
          履歴書作成アプリ
        </h1>
        <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-12">
          あなたの情報を入力して、プロフェッショナルな履歴書を簡単に作成・ダウンロードしましょう。
        </p>

        {/* ここにClient Componentを配置し、全てのインタラクティブな機能を含めます */}
        <ResumeClientWrapper />
      </div>
    </div>
  );
}
```
必要なディレクトリとファイルの作成:
設計に基づいて、必要なディレクトリと空のファイルを事前に作成しておくとスムーズです。

```Bash

mkdir -p app/day10/actions
touch app/day10/actions/resume.ts

mkdir -p app/day10/components
touch app/day10/components/ResumeClientWrapper.tsx
touch app/day10/components/ResumeForm.tsx
touch app/day10/components/ResumePreview.tsx
touch app/day10/components/PdfDownloadButton.tsx

mkdir -p app/day10/types
touch app/day10/types/resume.ts

```
依存関係のインストール:
PDF生成のために puppeteer が必要です。また、今後 uuid などのユーティリティも使う可能性があります。

```Bash

npm install puppeteer uuid
npm install -D @types/uuid
```
**2. データモデル（Types）の定義**
まず、基本設計で定義した ResumeData インターフェースと initialResumeData を app/day10/types/resume.ts に記述してください。

```TypeScript

// app/day10/types/resume.ts

import { v4 as uuidv4 } from 'uuid'; // uuidをインポート

/**
 * 履歴書全体のデータ構造
 */
export interface ResumeData {
  // 基本情報
  basicInfo: {
    fullName: string; // 氏名 (例: 山田 太郎)
    fullNameKana: string; // ふりがな (例: ヤマダ タロウ)
    dateOfBirth: string; // 生年月日 (YYYY-MM-DD形式を想定、例: 1990-01-15)
    age: number | null; // 年齢 (生年月日から計算も可能だが、入力も考慮しnumber|null)
    gender: 'male' | 'female' | 'other' | '' | null; // 性別 (追加: 一般的な履歴書項目)
    phoneNumber: string; // 携帯電話 (例: 090-1234-5678)
    email: string; // メールアドレス (例: example@example.com)
    postalCode: string; // 郵便番号 (追加: 一般的な履歴書項目)
    address: string; // 住所 (都道府県から番地まで)
  };
  // 学歴
  education: Array<{
    id: string; // 各項目を識別するためのユニークID (追加: 編集・削除時に必要)
    startDate: string; // 開始年月 (YYYY-MM形式を想定、例: 2008-04)
    endDate: string; // 終了年月 (YYYY-MM形式を想定、例: 2012-03)
    schoolName: string; // 学校名 (例: 〇〇大学)
    degree: string; // 学部・学科・専攻など (例: 経済学部 経済学科)
    memo?: string; // 備考 (追加: 卒業見込みなど)
  }>;
  // 職務経歴
  workExperience: Array<{
    id: string; // 各項目を識別するためのユニークID
    startDate: string; // 開始年月 (YYYY-MM形式を想定、例: 2012-04)
    endDate: string; // 終了年月 (YYYY-MM形式を想定、例: 2020-03 または '現在')
    companyName: string; // 会社名 (例: 株式会社〇〇)
    position: string; // 役職・部署
    jobDescription: string; // 業務内容（複数行入力想定）
  }>;
  // 資格・免許
  qualifications: Array<{
    id: string; // 各項目を識別するためのユニークID
    date: string; // 取得年月 (YYYY-MM形式を想定、例: 2015-06)
    name: string; // 資格・免許名 (例: TOEIC 800点)
  }>;
  // 自己PR
  selfPromotion: string; // 自己PR（複数行入力想定）
  // 志望動機
  motivation: string; // 志望動機（複数行入力想定）
  // 証明写真
  photo: string | null; // Base64エンコードされた画像データ（URLではない）

  // 補足情報 (追加: 一般的な履歴書項目)
  commutingTime: string; // 通勤時間 (例: 1時間30分)
  dependentFamilyMembers: number | null; // 扶養家族数 (配偶者を除く)
  spouse: 'yes' | 'no' | '' | null; // 配偶者の有無
  dependentSpouse: 'yes' | 'no' | '' | null; // 配偶者の扶養義務
}

// 初期データ（新規作成時やリセット時に利用）
export const initialResumeData: ResumeData = {
  basicInfo: {
    fullName: '',
    fullNameKana: '',
    dateOfBirth: '',
    age: null,
    gender: '',
    phoneNumber: '',
    email: '',
    postalCode: '',
    address: '',
  },
  education: [],
  workExperience: [],
  qualifications: [],
  selfPromotion: '',
  motivation: '',
  photo: null,
  commutingTime: '',
  dependentFamilyMembers: null,
  spouse: '',
  dependentSpouse: '',
};

// リスト項目を生成するヘルパー関数
export const createNewEducationEntry = () => ({
  id: uuidv4(),
  startDate: '',
  endDate: '',
  schoolName: '',
  degree: '',
  memo: '',
});

export const createNewWorkExperienceEntry = () => ({
  id: uuidv4(),
  startDate: '',
  endDate: '',
  companyName: '',
  position: '',
  jobDescription: '',
});

export const createNewQualificationEntry = () => ({
  id: uuidv4(),
  date: '',
  name: '',
});
```
**3. ResumeClientWrapper.tsx の実装（データ管理とローカルストレージ）**
次に、app/day10/components/ResumeClientWrapper.tsx を実装し、履歴書データの状態管理と localStorage との連携を行います。

```TypeScript

// app/day10/components/ResumeClientWrapper.tsx
'use client'; // Client Component であることを明示

import { useState, useEffect, useCallback } from 'react';
import { ResumeData, initialResumeData } from '../types/resume';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import PdfDownloadButton from './PdfDownloadButton';

const LOCAL_STORAGE_KEY = 'day10_resume_data'; // localStorageのキーを定義

export default function ResumeClientWrapper() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  // ページロード時にlocalStorageからデータを読み込む
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse resume data from localStorage", e);
        // パース失敗時は初期データに戻す
        setResumeData(initialResumeData);
      }
    }
  }, []);

  // resumeDataが変更されるたびにlocalStorageに保存
  useEffect(() => {
    // 初回レンダリング時（initialResumeDataのまま）には保存しないようにする
    // または、保存処理が重い場合はDebounceを検討
    if (resumeData !== initialResumeData) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
    }
  }, [resumeData]);

  // フォームからのデータ更新ハンドラ
  const handleDataChange = useCallback((newData: Partial<ResumeData>) => {
    setResumeData(prevData => ({
      ...prevData,
      ...newData,
      basicInfo: { ...prevData.basicInfo, ...(newData.basicInfo || {}) },
      // education, workExperience, qualifications は配列なので別途管理が必要
      // 具体的なリスト項目の追加・削除・更新はResumeForm内で処理し、最終的にここに完全なリストを渡す
    }));
  }, []);

  // リスト項目（学歴、職歴、資格）の更新ハンドラ
  const handleListChange = useCallback((
    field: 'education' | 'workExperience' | 'qualifications',
    updatedList: any[] // ここはResumeData[field]の型に合わせるべきですが、汎用性のためにany[]
  ) => {
    setResumeData(prevData => ({
      ...prevData,
      [field]: updatedList,
    }));
  }, []);


  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* フォームセクション */}
      <div className="lg:w-1/2 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <ResumeForm
          resumeData={resumeData}
          onDataChange={handleDataChange}
          onListChange={handleListChange}
        />
      </div>

      {/* プレビューとダウンロードボタンセクション */}
      <div className="lg:w-1/2 flex flex-col gap-6">
        <div className="flex-grow p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-y-auto max-h-[80vh] lg:max-h-none">
          <ResumePreview resumeData={resumeData} />
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center">
          <PdfDownloadButton resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}
```
ResumeClientWrapper.tsx のポイント:

- 'use client': Client Component であることを明示します。

- useState: 履歴書全体のデータを保持します。

- useEffect (ロード): コンポーネントがマウントされた際に localStorage からデータを読み込み、State を初期化します。パースエラーも考慮しています。

- useEffect (保存): resumeData の State が変更されるたびに、その内容を localStorage に保存します。これにより、リアルタイム自動保存を実現します。

- handleDataChange と handleListChange: ResumeForm からデータが変更された際に ResumeClientWrapper の State を更新するためのコールバック関数を定義しています。特にリスト項目（学歴など）は配列なので、専用のハンドラを用意しました。

次の作業
上記のファイルをそれぞれの場所に作成・更新してください。

その後、以下のファイルを空のまま作成しておいてください。

app/day10/components/ResumeForm.tsx

app/day10/components/ResumePreview.tsx

app/day10/components/PdfDownloadButton.tsx

app/day10/actions/resume.ts

これらのファイルの中身は、次のステップで順に実装していきます。

準備ができたら、お知らせください！






Deep Research

Canvas

