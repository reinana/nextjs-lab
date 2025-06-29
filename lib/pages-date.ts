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
];
