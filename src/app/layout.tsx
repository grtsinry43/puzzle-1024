import '@/app/globals.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1024 程序员节解密挑战',
  description: '一个高级的程序员节解密游戏',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="zh">
        <body className={inter.className}>{children}</body>
      </html>
  )
}
