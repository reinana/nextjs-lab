## フォルダ構成
Next.jsは、このフォルダ構造を読み取って、Intercepting Routesを自動的に有効にします。

```text
app/
└── day13/
    ├── @modal/                 # Parallel Route用のフォルダ
    │   └── (..)photos/
    │       └── [id]/
    │           └── page.tsx    # モーダルの中身
    ├── photos/
    │   └── [id]/
    │       └── page.tsx        # 画像の詳細ページ
    ├── components/
    ├── photos-data.ts
    ├── layout.tsx              # ページとモーダルを並列表示するレイアウト
    └── page.tsx                # 画像一覧ページ

```


