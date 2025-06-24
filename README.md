# 🧪 Next.js Lab - 100日チャレンジ

これは『#100日チャレンジ』という本を読んで触発され、私も100日チャレンジすることにしました。  
仕事・育児があるので 1日1個のアプリ作成は物理的に不可能ですが、ゆっくりでも確実に 100個のアプリを作成していきます。

---

## 🔍 目的

- Next.js 15 (App Router) の機能を体系的に学ぶ
- 小さなプロジェクトを日々積み上げて実装力を強化
- 公開された成果物をポートフォリオとして活用する

---

## 📅 Day List

| Day | タイトル                       | 技術要素                                                                 | デモ                                                                 | コード                                                                                      |
|-----|--------------------------------|--------------------------------------------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| 01  | ポケモンガチャ                 | `useActionState`, `Server Actions`, `startTransition`, `next/image`      | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day01) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day01) |
| 02  | ガチャ + コレクション追加     | `useActionState`, `Server Actions`, コレクションの状態管理               | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day02) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day02) |
| 03  | フォーム追加による検索機能     | `useActionState`, `Server Actions`, フォーム送信, 条件分岐（ランダム/名前検索） | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day03) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day03) |

> ※ 今後、チャレンジが増えるたびに上の表に追記してください。
---

## 🛠 使用技術

- [Next.js 15](https://nextjs.org/docs) (App Router構成)
- React 19
- Tailwind CSS
- TypeScript
- Server Actions
- useActionState / revalidatePath / router.replace / 他

---

## 📝 学習メモ

### Day 01: ポケモンガチャ

- `useActionState` を使う場合、`runAction()` は `startTransition()` 内で呼ぶ必要がある。
- `next/image` で外部画像を扱うには `next.config.js` に `images.remotePatterns` を設定する。
- PokeAPI（https://pokeapi.co）から取得したポケモンの名前・画像・タイプを表示。

### Day 02: ガチャ + コレクション追加

- Day01 に取得したポケモンを記録できるコレクション機能を追加。
- `useActionState` を利用し、状態として複数ポケモンを保持。
- ページ遷移なしでカードをどんどん追加する仕組みを実現。

### Day 03: ポケモンコレクション

- `useActionState` に `FormData` を渡してフォームの分岐処理を実装。
- フォーム未入力ならランダム、入力ありなら名前検索。
- 重複登録を防ぎながら、取得したポケモンをコレクションとして蓄積。

---

## ✨ 今後の予定

- Day 04: `formAction` + バリデーション付きフォーム
- Day 05: 非同期セレクトボックス + 検索補完
- Day 06: ローカルストレージ or Cookie への状態保存
- Day 10: 10個到達時にトップページへページネーション追加（予定）

---

## 📮 お問い合わせ・SNS

- X (Twitter): [@reinana](https://twitter.com/reinana)

---

## 🚀 デモサイト

https://nextjs-lab-psi.vercel.app/
