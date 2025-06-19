export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="font-sans text-gray-800 bg-gray-50">{children}</body>
    </html>
  )
}
