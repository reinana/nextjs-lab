export type PageEntry = {
    day: string;
    title: string;
    path: string;
    date: string;
    description: string;
};

export const pages: PageEntry[] = [
    {
        day: "01",
        title: "ポケモンガチャ",
        path: "/day01",
        date: "2025-06-26",
        description:
            "PokeAPIを使ってランダムにポケモンを取得し表示するアプリ。useActionStateとServer Actionを利用。",
    },
    // Day 02 以降はここに追加していく
    {
        day: "02",
        title: "ポケモンコレクション機能",
        path: "/day02",
        date: "2025-06-27",
        description:
            "ランダムに取得したポケモンをコレクションに追加し、一覧で表示する機能を実装。useActionStateで状態管理。",
    },
    {
        day: "03",
        title: "ポケモン検索フォーム追加",
        path: "/day03",
        date: "2025-06-28",
        description:
            "フォームからポケモン名を入力して検索し、コレクションに追加できる機能を実装。未入力ならランダム取得。",
    },
    {
        day: "04",
        title: "DataLoaderによる投稿と著者表示",
        path: "/day04",
        date: "2025-06-29",
        description:
            "投稿と著者情報をそれぞれのコンポーネントで取得しつつ、DataLoaderとReact.cacheを使ってN+1フェッチを解消。dummyjson APIを活用。",
    },
    {
        day: "05",
        title: "クッキーでテーマを保存する機能",
        path: "/day05",
        date: "2025-06-30",
        description:
            "ユーザーが選択したテーマ（ライト/ダーク）をクッキーに保存し、次回以降の表示でもテーマを保持。`cookies()` を使って `html` にクラスを設定し、Tailwind の `dark:` スタイルを切り替える仕組みを実装。",
    },
    {
        day: "06",
        title: "三目並べ (Tic-Tac-Toe) ゲーム",
        path: "/day06",
        date: "2025-07-01", // 今日の日付に合わせて調整
        description:
            "React公式チュートリアルを参考に、Next.jsのApp RouterとClient Componentsで実装したシンプルな三目並べゲーム。状態管理とイベントハンドリングを学習。",
    },
    {
        day: "07",
        title: "J-Quants株価データ遅延ロード",
        path: "/day07",
        date: "2025-07-02", // 今日の日付に合わせて調整
        description:
            "J-Quants APIから株価データを取得する際、useTransitionを使ってUIの応答性を保ち、ローディング中も入力が可能なアプリ。Server Actionsと組み合わせ。",
    },
    {
        day: "08",
        title: "useActionStateによるTODOリスト",
        path: "/day08",
        date: "2025-07-03", // 今日の日付に合わせて調整
        description:
            "React 19の**useActionState**フックを活用し、**Server Actions**と連携したフォーム処理を体験するシンプルなTODOリストアプリ。非同期アクションの状態（ローディング、結果）を効率的に管理し、**useRef**と**useEffect**を使ってフォーム送信後のUI操作も実装します。",
    },
    {
        day: "09",
        title: "Next.jsで簡易ブログアプリ",
        path: "/day09",
        date: "2025-07-04", // 今日の日付は7月4日なのでこちらに調整
        description:
            "Next.jsの**Server Components**、**静的サイト生成 (SSG)**、**動的ルーティング**を学び、Markdownファイルをデータソースとしたシンプルなブログアプリを構築。`generateStaticParams`を活用した事前HTML生成と、`lib`ディレクトリでのデータ処理を実装。",
    },
    {
        day: "10",
        title: "履歴書フォームとリアルタイム表示",
        path: "/day10",
        date: "2025-07-17", // 今日の日付
        description:
            "ユーザーが入力した履歴書データを**Server Actions**でサーバーサイドに保存し、そのデータを元に**Client Components**でリアルタイムにHTML形式の履歴書プレビューを表示します。フォームの状態管理とServer Actionsの連携を学習します。",
    },
    {
        day: "11",
        title: "スキルシート作成アプリ",
        path: "/day11",
        date: "2025-07-22",
        description:
            "複数ステップのフォームでスキルやプロジェクト経験を入力し、一枚のスキルシートを生成するアプリ。状態を一元管理する親コンポーネントと、propsやコールバックで連携する子コンポーネントで構成。動的なフォームの扱い方や、状態管理のベストプラクティスを学びます。",
    },
    {
        day: "12",
        title: "useOptimistic いいね機能",
        path: "/day12",
        date: "2025-07-23",
        description:
            "React 19の新フック`useOptimistic`を使い、UIが即座に更新される「いいね」機能を実装。Server Actionsと連携し、ユーザーの体感速度を向上させるOptimistic UIパターンを学びます。",
    },
];
