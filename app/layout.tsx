
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
    title: 'Dental Materials Recycling Survey',
    description: 'A survey on Knowledge, Attitude, and Practices regarding dental material recycling.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={outfit.variable}>
            <body className="font-sans antialiased min-h-screen bg-slate-50 selection:bg-cyan-200 selection:text-cyan-900">
                <NavBar />
                <main className="pt-20">
                    {children}
                </main>
            </body>
        </html>
    )
}
