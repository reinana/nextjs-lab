// day09で使う記事データ読み込みユーティリティ
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// 記事データのディレクトリ cwd:Current Working Directory
// process.cwd() は Node.js の現在の作業ディレクトリを返します
// process.cwd() で、home/maki/dev/next-lab という文字列を返す
// path.join() でpostsと結合して、絶対パスを作る
const postsDirectory = path.join(process.cwd(), "posts");

// 記事のメタデータを含む型定義
export interface PostMetaData {
    id: string;
    title: string;
    date: string;
    author: string;
}

export interface PostData extends PostMetaData {
    contentHtml: string;
}

export function getSortedPostsData(): PostMetaData[] {
    // postsディレクトリ内の全ファイル名を取得 リストで返す。サブディレクトリ名は取るが、中身はとらない
    // Syncがついてたら同期的（終わるまでまつ）
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData: PostMetaData[] = fileNames.map((fileName) => {
        // ファイル名から拡張子を除去してIDを取得
        const id = fileName.replace(/\.md$/, "");

        // ファイルのパスを生成
        const fullPath = path.join(postsDirectory, fileName);

        // ファイルの内容を読み込み、メタデータとコンテンツを取得
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        // メタデータをPostMetaData型に変換
        return {
            id,
            ...matterResult.data,
        } as PostMetaData;
    });

    // 日付でソート（新しい記事が上に来るように降順）
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

/**
 * 特定のIDの記事の全データを取得する関数
 * (記事の詳細ページなどで使用)
 */

export async function getPostData(id: string): Promise<PostData> {
    // idはファイル名の拡張子なし
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // remarkはMarkdownのテキストをツリー構造にする
    const processContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    } as PostData;
}

/**
 * すべての記事のID（ファイル名）を取得する関数
 * (静的パス生成 (generateStaticParams) で使用)
 */
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    // [{ params: { id: 'first-post' } }, { params: { id: 'second-post' } }]
    // のような形式で返す (Next.jsのgenerateStaticParamsの要件に合わせる)
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}
