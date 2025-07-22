'use client';

import { useFormStatus } from 'react-dom';

// isOptimistic はボタンの色を変えるためだけのprops
export default function LikeButton({ isOptimistic }: { isOptimistic: boolean }) {
    const { pending } = useFormStatus();

    const baseClasses = "px-4 py-2 text-sm font-semibold text-white rounded-lg";
    const colorClasses = isOptimistic
        ? "bg-pink-500 hover:bg-pink-600"
        : "bg-blue-500 hover:bg-blue-600";
    const disabledClasses = "disabled:bg-gray-400 disabled:cursor-wait";

    return (
        <button type="submit" disabled={pending} className={`${baseClasses} ${colorClasses} ${disabledClasses}`}>
            {pending ? '処理中...' : 'いいね！'}
        </button>
    );
}