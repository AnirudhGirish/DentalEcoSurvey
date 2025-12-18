'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Users, FileDown, LogOut, Loader2, Sparkles, Search, GraduationCap, ClipboardCheck } from 'lucide-react'
import DashboardCharts from '@/components/dashboard/DashboardCharts'
import AiInsightChart from '@/components/dashboard/AiInsightChart'
import { motion } from 'framer-motion'

export default function DashboardPage() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [analysisData, setAnalysisData] = useState<any>(null)
    const [analyzing, setAnalyzing] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetch('/api/admin/data')
            .then(res => {
                if (res.status === 401) router.push('/dashboard/login')
                if (res.ok) return res.json()
                throw new Error('Failed to fetch')
            })
            .then(d => setData(d))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [router])

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/dashboard/login')
    }

    const downloadCSV = () => {
        if (!data) return
        const headers = ['ID', 'Name', 'Role', 'Institution', 'Mobile', 'Email', 'Score', 'Total Questions', 'Date']
        const rows = data.participants.map((p: any) => [
            p.id, p.name, p.role, p.institution, p.mobile, p.email, p.score, p.total, new Date(p.created_at).toLocaleDateString()
        ])

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map((e: any[]) => e.join(",")).join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "dental_survey_participants.csv")
        document.body.appendChild(link)
        link.click()
    }

    const generateAnalysis = async () => {
        if (!data) return
        setAnalyzing(true)
        try {
            await fetch('/api/auth/login')
            const response = await fetch('/api/admin/analysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stats: data })
            })
            const result = await response.json()
            if (result.error) {
                alert(result.error)
            } else {
                setAnalysisData(result)
            }
        } catch (e) {
            console.error(e)
            alert('Failed to generate analysis')
        } finally {
            setAnalyzing(false)
        }
    }

    // Filter participants
    const filteredParticipants = useMemo(() => {
        if (!data?.participants) return []
        return data.participants.filter((p: any) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.institution.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [data, searchTerm])

    // Calculate Average Score
    const averageScore = useMemo(() => {
        if (!data?.participants?.length) return 0
        const total = data.participants.reduce((acc: number, p: any) => acc + (p.score || 0), 0)
        return Math.round((total / data.participants.length) * 10) / 10
    }, [data])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="min-h-screen bg-slate-50 p-6 sm:p-12 pb-24">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Research Dashboard</h1>
                        <p className="text-slate-500">Real-time insights and analytics</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium text-sm w-fit"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card-premium p-6 flex items-center gap-4 border-l-4 border-cyan-500">
                        <div className="p-3 bg-cyan-100 rounded-full text-cyan-700">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Participants</p>
                            <p className="text-3xl font-bold text-slate-900">{data.total_participants}</p>
                        </div>
                    </div>
                    <div className="card-premium p-6 flex items-center gap-4 border-l-4 border-indigo-500">
                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-700">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Average Score</p>
                            <p className="text-3xl font-bold text-slate-900">{averageScore}</p>
                        </div>
                    </div>
                    <div className="card-premium p-6 flex items-center gap-4 border-l-4 border-emerald-500">
                        <div className="p-3 bg-emerald-100 rounded-full text-emerald-700">
                            <ClipboardCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Questions Loaded</p>
                            <p className="text-3xl font-bold text-slate-900">44</p>
                        </div>
                    </div>
                </div>

                {/* Controls & Table */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search participants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                            />
                        </div>
                        <button
                            onClick={downloadCSV}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors shadow-sm font-medium"
                        >
                            <FileDown className="w-4 h-4" /> Export CSV
                        </button>
                    </div>

                    <div className="card-premium overflow-hidden">
                        <div className="overflow-x-auto max-h-96">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Institution</th>
                                        <th className="px-6 py-4">Score</th>
                                        <th className="px-6 py-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredParticipants.length > 0 ? (
                                        filteredParticipants.slice(0, 50).map((p: any) => (
                                            <tr key={p.id} onClick={() => router.push(`/dashboard/participants/${p.id}`)} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                                                <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-cyan-700">{p.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                        {p.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">{p.institution}</td>
                                                <td className="px-6 py-4 text-slate-900 font-bold">{p.score}<span className="text-slate-400 font-normal">/{p.total}</span></td>
                                                <td className="px-6 py-4 text-slate-500">{new Date(p.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                                No participants found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <DashboardCharts data={data} />

                {/* AI Analysis Section */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-3xl -z-10 blur-xl" />

                    <div className="card-premium p-8 border border-purple-100/50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-purple-200">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">AI Research Insights</h2>
                                    <p className="text-slate-500">Powered by Gemini 1.5 Flash</p>
                                </div>
                            </div>

                            <button
                                onClick={generateAnalysis}
                                disabled={analyzing}
                                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 disabled:opacity-70 disabled:scale-100 transition-all font-medium flex items-center gap-2"
                            >
                                {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-purple-200" />}
                                {analyzing ? 'Analyzing Data...' : 'Generate New Report'}
                            </button>
                        </div>

                        {analysisData ? (
                            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {/* Text Section */}
                                <div className="prose prose-lg prose-slate max-w-none">
                                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm leading-relaxed text-slate-600">
                                        {analysisData.summary.split('\n').map((line: string, i: number) => {
                                            const cleanLine = line.replace(/^#+\s*/, '').replace(/\*\*/g, '')
                                            if (!cleanLine.trim()) return <br key={i} />
                                            if (line.trim().startsWith('#')) return <h3 key={i} className="text-lg font-bold text-slate-900 mt-4 mb-2">{cleanLine}</h3>
                                            if (line.trim().startsWith('-')) return <li key={i} className="ml-4 list-disc marker:text-cyan-500">{cleanLine.replace(/^-\s*/, '')}</li>
                                            return <p key={i} className="mb-2">{cleanLine}</p>
                                        })}
                                    </div>
                                </div>

                                {/* Chart Section */}
                                <div className="w-full">
                                    <AiInsightChart data={analysisData} />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                                <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500 font-medium">Click "Generate New Report" to analyze trends and create custom charts.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
