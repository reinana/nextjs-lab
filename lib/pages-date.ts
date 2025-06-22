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
        date: "2025-06-19",
        description:
            "PokeAPIを使ってランダムにポケモンを取得し表示するアプリ。useActionStateとServer Actionを利用。",
    },
    // Day 02 以降はここに追加していく
    {
        day: "02",
        title: "ポケモンコレクション機能",
        path: "/day02",
        date: "2025-06-20",
        description:
            "ランダムに取得したポケモンをコレクションに追加し、一覧で表示する機能を実装。useActionStateで状態管理。",
    },
];
