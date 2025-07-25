'use client';

import { useRouter } from 'next/navigation';
import { MouseEventHandler, ReactNode } from 'react';

export default function Modal({ children }: { children: ReactNode }) {
    const router = useRouter();

    const onDismiss = () => {
        router.back();
    };

    // モーダルの背景をクリックした時だけ閉じるようにする
    const onClick: MouseEventHandler = (e) => {
        if (e.target === e.currentTarget) {
            onDismiss();
        }
    };

    return (
        <div
            onClick={onClick}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
            <div className="bg-white p-4 rounded-lg shadow-2xl relative">
                <button
                    onClick={onDismiss}
                    className="absolute -top-4 -right-4 bg-white rounded-full p-1 text-black"
                    aria-label="閉じる"
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
}