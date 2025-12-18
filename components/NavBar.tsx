
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

export default function NavBar() {
    const pathname = usePathname()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                D
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-800">
                                Dental<span className="text-cyan-600">Eco</span>Survey
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink href="/" active={pathname === '/'}>Home</NavLink>
                        <NavLink href="/dashboard" active={pathname.startsWith('/dashboard')}>Dashboard</NavLink>
                        <Link
                            href="/survey"
                            className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                        >
                            Take Survey
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
    return (
        <Link
            href={href}
            className={clsx(
                "relative text-sm font-medium transition-colors duration-200",
                active ? "text-cyan-700" : "text-slate-600 hover:text-slate-900"
            )}
        >
            {children}
            {active && (
                <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-600 rounded-full"
                />
            )}
        </Link>
    )
}
