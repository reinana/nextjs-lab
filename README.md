-----

承知いたしました。先ほどまでのやり取りで完成したREADMEの内容を、そのままMarkdown形式で提供します。

-----

# 🧪 Next.js Lab - 100日チャレンジ

『\#100日チャレンジ』という本を読んで触発され、私も100日チャレンジすることにしました。
仕事・育児があるので 1日1個のアプリ作成は物理的に不可能ですが、ゆっくりでも確実に 100個のアプリを作成していきます。

-----

## 🔍 目的

  * **Next.js 15 (App Router)** の機能を体系的に学ぶ
  * 小さなプロジェクトを日々積み上げて実装力を強化
  * 公開された成果物をポートフォリオとして活用する

-----

## 📅 Day List

| Day | タイトル | 技術要素 | デモ | コード |
|---|---|---|---|---|
| 01 | ポケモンガチャ | `useActionState`, `Server Actions`, `startTransition`, `next/image` | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day01) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day01) |
| 02 | ガチャ + コレクション追加 | `useActionState`, `Server Actions`, コレクションの状態管理 | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day02) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day02) |
| 03 | フォーム追加による検索機能 | `useActionState`, `Server Actions`, フォーム送信, 条件分岐（ランダム/名前検索） | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day03) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day03) |
| 04 | DataLoaderによる投稿と著者表示 | `DataLoader`, `React.cache`, `N+1解消`, `dummyjson API` | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day04) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day04) |
| 05 | ダークモード切り替え | `cookie`, `Server Component`, `Client Component`, `html class="dark"` 対応 | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day05) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day05) |
| 06 | 三目並べ (Tic-Tac-Toe) ゲーム | `useTransition` (アクション対応), `Server Actions`, `J-Quants API`, 環境変数 | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day06) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day06) |
| 07 | J-Quants株価データ遅延ロード | `Client Component` (`use client`), `useState`, `Immutable Data`, `クロージャ` | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day07) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day07) |
| 08 | useActionStateによるTODOリスト | `useActionState`, `Server Actions`, `useRef`, `useEffect`, フォーム処理 | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day08) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day08) |
| 09 | Next.jsで簡易ブログアプリ | Server Components, SSG, 動的ルーティング, generateStaticParams, gray-matter, remark | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day09) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day09) |
| 10 | 履歴書フォームとリアルタイム表示 | `Server Actions`, `Client Components`, フォームの状態管理, リアルタイムプレビュー | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day10) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day10) |

> ※ 今後、チャレンジが増えるたびに上の表に追記してください。

-----

## 🛠 使用技術

  * [Next.js 15](https://nextjs.org/docs) (App Router構成)
  * React 19
  * Tailwind CSS
  * TypeScript
  * Server Actions
  * `useActionState` / `revalidatePath` / `router.replace` / 他

-----

## 📝 学習メモ

### Day 01: ポケモンガチャ

Day 01「ポケモンガチャ」は、ユーザーがボタンをクリックするとランダムなポケモンが画面に表示されるゲームです。表示されるポケモンは、PokeAPIから取得した名前、画像、タイプ情報を含みます。

  * `useActionState` を使う場合、`runAction()` は `startTransition()` 内で呼ぶ必要があります。
  * `next/image` で外部画像を扱うには `next.config.js` に `images.remotePatterns` を設定します。
  * PokeAPI（[https://pokeapi.co](https://pokeapi.co)）から取得したポケモンの名前・画像・タイプを表示しました。

### Day 02: ガチャ + コレクション追加

  * Day01 に取得したポケモンを記録できるコレクション機能を追加しました。
  * `useActionState` を利用し、状態として複数ポケモンを保持しています。
  * ページ遷移なしでカードをどんどん追加する仕組みを実現しました。

### Day 03: ポケモンコレクション

  * `useActionState` に `FormData` を渡してフォームの分岐処理を実装しました。
  * フォーム未入力ならランダム、入力ありなら名前検索をします。
  * 重複登録を防ぎながら、取得したポケモンをコレクションとして蓄積しています。

### Day 04: DataLoaderによる投稿と著者表示

  * 投稿リストは `getPosts()`、著者情報は `getUser()` を個別に取得しました。
  * `DataLoader` + `React.cache()` によって **`N+1フェッチ問題`** を回避しています。
  * `dummyjson API` を使って一覧表示と並列データ取得を両立しました。

### Day 05: ダークモード切り替え

  * クライアントコンポーネントでボタンのみを **`use client`** として定義しました。
  * サーバーコンポーネントで **`cookies()`** を利用し、現在のテーマ状態を取得しています。
  * ボタン押下時に Server Action を呼び出し、`Set-Cookie` ヘッダーでテーマを保存しました。
  * `html` タグの `className` に `dark` を付与して Tailwind の `dark:` バリアントを適用しています。

### Day 06: 三目並べ (Tic-Tac-Toe) ゲーム

  * React公式チュートリアルを参考に、Next.jsのApp Routerと**Client Components (`'use client'`)** で実装しました。
  * **`useState`** フックを用いたコンポーネントの**状態管理**の基本を習得しました。
  * 配列の\*\*`slice()` メソッド**を使って**イミュータブルなデータ更新\*\*を実践しました。
  * JavaScriptの**クロージャ**がコンポーネント内でどのように機能するかを理解しました。

### Day 07: J-Quants株価データ遅延ロード

  * **`useTransition`** フックを使って、時間のかかる非同期処理（今回はJ-Quants APIからのデータ取得）中にUIがブロックされないように実装しました。
  * **`isPending`** フラグを利用して、トランジションが保留中であることをユーザーに通知するUIを表示しました。
  * J-Quants APIからのデータ取得は **Server Actions** として実装し、APIキーなどの機密情報を安全に扱えるようにしました。
  * `.env.local` ファイルでAPI認証情報を環境変数として管理する方法を学びました。
  * J-Quants APIの無料プランのデータ遅延（12週間）を考慮し、日付範囲の入力を調整しました。

### Day 08: useActionStateによるTODOリスト

  * **`useActionState`** フックの基本的な使い方を学習し、Server Actionsと連携するフォーム処理に適用しました。
  * HTMLの `<form>` 要素の `action` プロパティに直接Server Actionを渡すことで、簡潔なフォーム送信ロジックを実装しました。
  * 非同期アクションの**ローディング状態 (`isPending`)** と、**結果の状態 (`state`)** を効率的に管理できることを確認しました。
  * **`useRef`** を使ってフォーム要素への直接参照を取得し、送信成功後にネイティブの `form.reset()` メソッドを呼び出して入力フィールドをクリアしました。
  * **`useEffect`** を利用して、`state` の変化（アクションの成功）をトリガーに、フォームのリセットという**副作用**を実行しました。
  * 開発環境におけるServer Actionsのインメモリ状態管理の限界（Fast Refreshによるリセット）と、永続的なデータベースの必要性を考察しました。

### Day 09: Next.jsで簡易ブログアプリ

  * **Server Components (async/await)**: サーバーサイドで直接データを取得し、レンダリングする基本を理解しました。
  * **静的サイト生成 (SSG)**: `generateStaticParams` 関数を使って、ビルド時にすべての動的ページを事前にHTMLとして生成する仕組みと、そのパフォーマンス上のメリット（高速表示、SEO）を学びました。
  * **動的ルーティング (`[id]`)**: URLのパスパラメータ（例: `/day09/first-post` の `first-post`）をコンポーネントで受け取り、それに基づいてコンテンツを表示する方法を実装しました。
  * **Markdownファイル処理**: `gray-matter` を使ってMarkdownのフロントマター（メタデータ）と本文を分離し、`remark` と `remark-html` を使ってMarkdown本文をHTMLに変換する方法を学びました。
  * **データ層の分離 (`lib` ディレクトリ)**: データ取得と整形に関するロジックを `lib/posts.ts` ファイルにカプセル化し、再利用性と保守性を高めました。
  * **日付の整形**: `date-fns` ライブラリと専用のコンポーネントを使って、日付をユーザーフレンドリーな形式で表示する方法を実践しました。

### Day 10: 履歴書フォームとリアルタイム表示

  * **Server Actions**: ユーザーが入力した履歴書データを**サーバーサイド**で JSON ファイルとして保存する処理を実装しました。
  * **Client Components**: 保存されたデータに基づいて、**リアルタイム**に HTML 形式の履歴書プレビューを表示するコンポーネントを構築しました。
  * **フォームの状態管理**: クライアントサイドでの入力フォームの状態を管理し、Server Actions との連携を通じてデータの送受信を行いました。
  * これにより、複雑な PDF 生成機能を切り離し、**Next.js の基本機能**であるデータの永続化と、Client/Server Components を組み合わせた UI 構築に焦点を当てた開発を体験しました。

-----

## 📮 お問い合わせ・SNS

  * X (Twitter): [@reinana](https://twitter.com/reinana)

-----

## 🚀 デモサイト

[https://nextjs-lab-psi.vercel.app/](https://nextjs-lab-psi.vercel.app/)

-----