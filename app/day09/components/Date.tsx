// Next_lab/app/day09/components/Date.tsx

import { parseISO, format } from 'date-fns';
import { ja } from 'date-fns/locale'; // 日本語ロケールをインポート


export default function Date({ dateString }: { dateString: string | Date }) {
    let date: Date;

    // dateString がすでに Date オブジェクトであるかを確認
    if (dateString instanceof global.Date) { // Date オブジェクトであるかチェック
        date = dateString;
    } else {
        date = parseISO(dateString); // そうでなければ、文字列からパース
    }

    // dateString が Date オブジェクトの場合、toString() で文字列に変換。
    return <time dateTime={dateString.toString()}>{format(date, 'yyyy年MM月dd日', { locale: ja })}</time>;
}