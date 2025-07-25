# 履歴書作成アプリ：要件定義書

## プロジェクトの概要と目的

このプロジェクトは、Next.js 15 (App Router) と React 19 の新機能を活用し、ユーザーが手軽にプロフェッショナルな履歴書を作成できるWebアプリケーションを開発することを目的とします。

解決したい課題:

ユーザー（新卒・中途採用の転職者）:

手書きや既存ツールの複雑さから解放され、履歴書作成の手間を大幅に省略したい。

転職エージェントへの申込時点で、完成された履歴書を準備できる状態にしたい。

転職エージェント（将来的な視点）:

ユーザーの個人情報や経歴情報をスムーズに取得し、選考プロセスを効率化したい。

将来的には、入力されたデータに基づくフィルターやマッチング機能を通じて、適切な人材紹介を強化したい。

## ターゲットユーザー
主たるターゲット: 新卒の学生、中途採用の転職者。

将来的なターゲット: 転職エージェント（データ利用、フィルター、マッチング機能など）。

## 機能要件
ユーザーがこのアプリを通じて実現できる主要な機能を以下に示します。

**1. 履歴書情報入力機能:**

* ユーザーが以下の項目をブラウザ上で簡単に入力できること。

    - 基本情報: 氏名、ふりがな、生年月日、年齢、連絡先（携帯電話、メールアドレス）。

    - 学歴: 学校名、学部・学科、在籍期間（複数登録可能）。

    - 職務経歴: 会社名、役職・部署、在籍期間、業務内容（複数登録可能）。

    - 資格・免許: 取得年月、名称（複数登録可能）。

    - 自己PR: 自由記述形式。

    - 志望動機: 自由記述形式。

    - 証明写真: 画像ファイルをアップロードし、プレビューに表示できること。

**2. 履歴書プレビュー機能:**
    
* 入力された履歴書情報が、リアルタイムで画面上にプレビューとして表示されること。

* プレビューは、一般的な日本の履歴書に近いシンプルなレイアウトであること。

**3. データ保存・復元機能**

- ユーザーが入力したデータは、ブラウザを閉じても情報が残っているよう、localStorage に自動的に保存されること。

- 次回アプリにアクセスした際に、localStorage に保存されたデータが自動で読み込まれ、入力フォームに反映されること。

**4. PDFダウンロード機能**
- 作成された履歴書のプレビュー内容が、PDF形式でダウンロードできること。

- ダウンロードは、ボタンクリックでトリガーされること。

**5. （将来的な拡張機能 - 現時点ではスコープ外）**
- アカウント登録・ログイン機能: ユーザーがアカウントを作成し、ログインすることで、複数の履歴書を管理したり、異なるデバイスでデータを同期したりできる機能。

- データ永続化: 入力データをデータベースに保存し、永続的に管理する機能。

- 印刷機能: 作成した履歴書をブラウザから直接印刷できる機能。

- オンライン共有機能: 作成した履歴書を特定のURLで共有できる機能。

- エージェント側管理機能: 入力された履歴書データに対し、転職エージェント側がフィルタリング（例: 学歴フィルタ）やマッチングを行える機能。

## 非機能要件
- デザイン: シンプルでクリーンなデザインであること。一般的な日本の履歴書の様式に準拠すること。

- 使いやすさ (UI/UX):
    - 直感的で分かりやすい操作性であること。
    - 入力フォームは、ユーザーがストレスなく情報を入力できるよう工夫されていること。
    - リアルタイムプレビューの更新がスムーズであること。

- パフォーマンス: PDF生成処理はサーバーサイドで実行し、クライアント側の負荷を軽減すること。

- セキュリティ: localStorage 利用においては、機密性の高い個人情報の扱いについて限界があることを理解し、将来的なデータベース移行時には適切なセキュリティ対策（SSL/TLS通信、認証・認可、データ暗号化など）を講じる計画とすること。

## 使用技術スタック（確定事項）
**フレームワーク**: Next.js 15 (App Router)

**UIライブラリ**: React 19

**スタイリング**: Tailwind CSS

**言語**: TypeScript

**主要機能技術**: Server Actions, useActionState (または useFormState), useFormStatus, useEffect, useRef

**PDF生成**: puppeteer (Server Actions内で利用)

**データ保存**: localStorage (クライアントサイド)