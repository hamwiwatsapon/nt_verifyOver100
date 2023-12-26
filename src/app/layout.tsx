import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'

const ntFont = localFont({
  src: '../../public/fonts/NT_Bold.otf',
  display: 'auto',
})

export const metadata: Metadata = {
  title: 'NT Verify multiple mobile number.',
  description: 'ระบบยืนยันตัวตน สำหรับผู้มีหลายหมายเลขในระบบ NT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={ntFont.className}>{children}</body>
    </html>
  )
}
