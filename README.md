# 🧪 Next.js Lab - 100日チャレンジ
これは#100日チャレンジという本を読んで触発され、私も100日チャレンジすることにしました。仕事、育児があるので1日1個のアプリ作成は物理的に不可能なので、これから100個のアプリを作成していきます。


---

## 🔍 目的

- Next.js 15 (App Router) の機能を体系的に学ぶ
- 小さなプロジェクトを日々積み上げて実装力を強化
- 公開された成果物をポートフォリオとして活用する

---

## 📅 Day List

| Day | タイトル        | 技術要素                                              | デモ                                                                 | コード                                                                                      |
|-----|------------------|--------------------------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| 01  | ポケモンガチャ   | `useActionState`, `Server Actions`, `startTransition`, `next/image` | [🔗 Demo](https://nextjs-lab-psi.vercel.app/day01) | [💻 Code](https://github.com/reinana/nextjs-lab/tree/main/app/day01) |

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

---

## ✨ 今後の予定

- Day 02: `revalidatePath` を使った投稿・更新後の一覧再取得
- Day 03: クエリパラメータ連動の検索フィルター (`router.replace`)
- Day 04: `formAction` + バリデーション付きフォーム
- Day 05: 非同期セレクトボックス + 検索補完

---

## 📮 お問い合わせ・SNS

- X (Twitter): [@reinana](https://twitter.com/reinana)

---

## 🚀 デモサイト

https://nextjs-lab-psi.vercel.app/