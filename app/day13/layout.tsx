import React from 'react';

export default function Day13Layout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        // ★ childrenとmodalの両方をレンダリングする
        <div>
            {children}
            {modal}
        </div>
    );
}