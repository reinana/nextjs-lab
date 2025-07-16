'use server';

import { ResumeData } from '../types/resume';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * @function saveResumeData
 * @description クライアントから送られたResumeDataをサーバーサイドでJSONファイルとして保存するServer Action。
 * @param {ResumeData} resumeData - 保存する履歴書データ
 * @returns {Promise<{ success: boolean; data?: { id: string }; error?: string }>} 保存結果とID、またはエラー情報
 */
export async function saveResumeData(resumeData: ResumeData) {
  try {
    const dataId = uuidv4(); // ユニークなIDを生成

    // 保存ディレクトリのパスを解決
    const dataDir = path.join(process.cwd(), 'data', 'day10');
    // ディレクトリが存在しない場合は作成
    await fs.mkdir(dataDir, { recursive: true });

    // ファイルパスを定義
    const filePath = path.join(dataDir, `${dataId}.json`);

    // データをJSON文字列に変換してファイルに書き込む
    await fs.writeFile(filePath, JSON.stringify(resumeData, null, 2), 'utf8');

    console.log(`Resume data saved to ${filePath}`);

    return { success: true, data: { id: dataId } };
  } catch (error: unknown) { // any を unknown に変更
    console.error('Failed to save resume data:', error);
    // error が Error オブジェクトであることを確認してメッセージを取得
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました。';
    return { success: false, error: errorMessage };
  }
}