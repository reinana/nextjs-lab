-----

ありがとうございます！要件定義書にご承認いただけたとのこと、承知いたしました。
これで「何を開発するのか」が明確になりましたので、次のフェーズである**基本設計**に進みましょう。

基本設計では、要件定義で決まった内容を「どのように実現するか」という視点で、アプリケーションの全体像と主要なコンポーネント、データフローなどを具体的に設計していきます。

-----

## 履歴書作成アプリ：基本設計（詳細版）

### 1\. データモデルの最終定義と初期値

要件定義で洗い出した項目を網羅し、TypeScriptのインターフェースとして詳細に定義します。

```typescript
// Next_lab/app/day10/types/resume.ts

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
    position: string; // 役職・部署 (例: 営業部 主任)
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
// 各リスト項目にはユニークなIDを付与するため、uuidなどのライブラリを検討
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
```

**変更点と理由**:

  * 一般的な履歴書項目として、**性別、郵便番号、住所、通勤時間、扶養家族数、配偶者の有無、配偶者の扶養義務**を追加しました。
  * `education`, `workExperience`, `qualifications` の各項目に `id: string` を追加しました。これは、動的に項目を追加・削除・編集する際に、React が各要素を効率的に識別し、キーとして利用するために重要です。`uuid` などのライブラリで生成することを想定します。
  * `photo` は `localStorage` に保存するため、Base64エンコードされた文字列を想定します。

-----

### 2\. 画面設計とコンポーネント構成

単一のページ (`/app/resume/page.tsx`) 内で、フォームとプレビューを左右に配置するレイアウトを基本とします。

#### 2.1. 画面レイアウト

```
+-------------------------------------------------------------------+
| ヘッダー (例: 履歴書作成アプリ)                                   |
+-------------------------------------------------------------------+
|                                                                   |
| +-----------------------------------+   +-----------------------+ |
| | ResumeClientWrapper (use client)  |   | ResumePreview         | |
| |                                   |   |                       | |
| | +-------------------------------+ |   | (リアルタイムプレビュー)| |
| | | ResumeForm                    | |   |                       | |
| | |                               | |   |                       | |
| | |   基本情報入力                | |   |                       | |
| | |   学歴入力 (追加/削除ボタン)  | |   |                       | |
| | |   職務経歴入力 (追加/削除ボタン)| |   |                       | |
| | |   資格入力 (追加/削除ボタン)  | |   |                       | |
| | |   自己PR入力                  | |   |                       | |
| | |   志望動機入力                | |   |                       | |
| | |   証明写真アップロード        | |   |                       | |
| | |                               | |   |                       | |
| | +-------------------------------+ |   |                       | |
| |                                   |   |                       | |
| | +-------------------------------+ |   |                       | |
| | | PdfDownloadButton             | |   |                       | |
| | | (useFormStatusでローディング表示) |   |                       | |
| | +-------------------------------+ |   |                       | |
| +-----------------------------------+   +-----------------------+ |
|                                                                   |
+-------------------------------------------------------------------+
```

#### 2.2. コンポーネントツリーと役割

  * **`/app/resume/page.tsx` (Server Component)**

      * 役割: アプリのルートページ。静的なレイアウト、タイトル表示。
      * 子コンポーネント: `ResumeClientWrapper` をインポートし、クライアントサイドの機能全体をラップします。

  * **`/app/resume/components/ResumeClientWrapper.tsx` (Client Component - `'use client'`)**

      * 役割:
          * 履歴書データ (`ResumeData`) の状態管理 (`useState`)。
          * `localStorage` からのデータ読み込みと保存 (`useEffect`)。
          * フォームの入力値変更ハンドリング。
          * `ResumeForm` と `ResumePreview` へのデータ渡し。
          * PDFダウンロード Server Action の呼び出し。
      * 子コンポーネント: `ResumeForm`, `ResumePreview`, `PdfDownloadButton`。

  * **`/app/resume/components/ResumeForm.tsx` (Client Component)**

      * 役割: 履歴書情報の入力フォームUI。
      * Props: `ResumeData` の一部（または全体）、データ更新用のコールバック関数。
      * 内部: 各入力フィールド (`<input>`, `<textarea>`, `<select>`)。
      * **動的リスト項目**: `EducationInput`, `WorkExperienceInput`, `QualificationInput` などのサブコンポーネントを配置し、それぞれに「追加」「削除」ボタンを設けます。

  * **`/app/resume/components/ResumePreview.tsx` (Client Component)**

      * 役割: 入力された履歴書データを整形し、PDF出力に近い形で表示する。
      * Props: `ResumeData` 全体。
      * 内部: HTMLとTailwind CSSで構成された履歴書レイアウト。日付のフォーマットなど。

  * **`/app/resume/components/PdfDownloadButton.tsx` (Client Component - `'use client'`)**

      * 役割: PDFダウンロードをトリガーするボタン。
      * Props: ダウンロード対象の `ResumeData`。
      * 内部:
          * `useFormStatus` を使用し、PDF生成中のローディング表示やボタンの無効化。
          * ボタンクリック時に `generateResumePdf` Server Action を呼び出す。
          * Server Action から返された Base64 PDF データを Blob に変換し、ダウンロードをトリガーする。

  * **`/app/resume/actions/resume.ts` (Server Action - `'use server'`)**

      * 役割: クライアントから送られた `ResumeData` を元に、サーバーサイドでPDFを生成し、Base64文字列としてクライアントに返す。
      * 依存: `puppeteer`。
      * エラーハンドリング: PDF生成失敗時のエラーを適切に返す。

-----

### 3\. データフローと機能連携（詳細）

1.  **ページロード**:

      * `app/resume/page.tsx` がレンダリング開始。
      * `ResumeClientWrapper` がロードされ、その中で `localStorage` から `ResumeData` を読み込む。
      * 読み込んだデータ（または `initialResumeData`）が `ResumeClientWrapper` の `resumeData` State にセットされる。
      * `resumeData` State が `ResumeForm` と `ResumePreview` に `props` として渡され、初期UIが描画される。

2.  **フォーム入力**:

      * ユーザーが `ResumeForm` 内の各入力フィールドを操作。
      * 各入力フィールドの `onChange` イベントハンドラが `ResumeClientWrapper` 内の `setResumeData` を呼び出し、`resumeData` State を更新。
      * `resumeData` State の更新により、`ResumeForm` と `ResumePreview` が再レンダリングされ、リアルタイムプレビューが実現される。
      * `useEffect` を利用し、`resumeData` State の変更を検知して、自動的に `localStorage.setItem('resumeData', JSON.stringify(resumeData))` を実行し、データを保存。

3.  **証明写真アップロード**:

      * `input type="file"` でファイル選択。
      * `FileReader` API を使用して選択された画像を読み込み、Base64形式の文字列に変換。
      * 変換されたBase64文字列を `resumeData.basicInfo.photo` にセットし、`localStorage` に保存。プレビューにも表示。

4.  **PDFダウンロード**:

      * ユーザーが `PdfDownloadButton` をクリック。
      * ボタンのクリックイベントハンドラ内で、`generateResumePdf(resumeData)` Server Action を呼び出す。
      * `useFormStatus` を使用して、Server Action の実行中はボタンを無効化し、「PDF生成中...」などのメッセージを表示。
      * Server Action が成功すると、Base64エンコードされたPDFデータが返される。
      * クライアントサイドで、受け取った Base64 データを `Uint8Array` にデコードし、`Blob` オブジェクトを作成。
      * `URL.createObjectURL()` を使って Blob の URL を生成し、`<a>` タグを作成して `click()` イベントをトリガーすることで、PDFファイルをダウンロードさせる。

-----

### 4\. 技術要素の適用

  * **React 19 `useFormState` / `useActionState`**:
      * フォームの入力値の State 管理に利用。特に、PDF生成Server Action の結果をフォームの状態と連携させる場合に活用できます。
      * `PdfDownloadButton` のローディング状態管理には `useFormStatus` を直接利用します。
  * **Server Components**: `app/resume/page.tsx` の静的な部分と、`ResumeClientWrapper` をラップする役割。
  * **Client Components**: `ResumeClientWrapper` 以下、すべてのインタラクティブなUIとロジック。
  * **Server Actions**: PDF生成処理の実行。
  * **`localStorage`**: ユーザー入力データの一時的な永続化。
  * **`puppeteer`**: Server Action 内でのPDF生成。
  * **Tailwind CSS**: 全体のスタイリング。

-----

### 次の作業

この基本設計案をご確認いただき、ご意見や追加のご要望、疑問点などがあれば、ぜひ教えてください。

特に、

  * **データモデル**に不足や修正が必要な項目はありませんか？
  * **コンポーネントの役割分担**や**データフロー**はイメージ通りでしょうか？
  * PDFのレイアウトやデザインについて、さらに具体的な要望（例: フォント、余白、罫線など）があれば、この段階で教えていただけると助かります。

この設計にご承認いただけましたら、いよいよ実装フェーズに入っていきます。
よろしくお願いいたします。