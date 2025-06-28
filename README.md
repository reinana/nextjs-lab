ご指定ありがとうございます！先ほどのREADMEの更新内容を、マークダウン形式で整形します。

-----

# 🧪 Next.js Lab - 100日チャレンジ

これは『\#100日チャレンジ』という本を読んで触発され、私も100日チャレンジすることにしました。  
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

* `useTransition` フックを使って、時間のかかる非同期処理（今回はJ-Quants APIからのデータ取得）中にUIがブロックされないように実装しました。
* `isPending` フラグを利用して、トランジションが保留中であることをユーザーに通知するUIを表示しました。
* J-Quants APIからのデータ取得は **Server Actions** として実装し、APIキーなどの機密情報を安全に扱えるようにしました。
* `.env.local` ファイルでAPI認証情報を環境変数として管理する方法を学びました。
* J-Quants APIの無料プランのデータ遅延（12週間）を考慮し、日付範囲の入力を調整しました。
-----

## 📮 お問い合わせ・SNS

  * X (Twitter): [@reinana](https://twitter.com/reinana)

-----

## 🚀 デモサイト

[https://nextjs-lab-psi.vercel.app/](https://nextjs-lab-psi.vercel.app/)

-----

