/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, XCircle, Download } from 'lucide-react'
import { questions } from '@/lib/questions'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function ParticipantDetails() {
    const { id } = useParams()
    const router = useRouter()
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/admin/participant/${id}`)
            .then(res => {
                if (res.status === 401) router.push('/dashboard/login')
                if (res.ok) return res.json()
                throw new Error('Failed to load')
            })
            .then(d => setData(d))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [id, router])

    const downloadPDF = () => {
        if (!data) return
        const doc = new jsPDF()

        doc.setFontSize(18)
        doc.setTextColor(14, 116, 144)
        doc.text('Individual Participant Report', 20, 20)

        doc.setFontSize(12)
        doc.setTextColor(0)
        doc.text(`Name: ${data.participant.name}`, 20, 35)
        doc.text(`Role: ${data.participant.role}`, 20, 42)
        doc.text(`Institution: ${data.participant.institution}`, 20, 49)
        doc.text(`Email: ${data.participant.email}`, 20, 56)

        const headers = [['Q#', 'Question', 'Answer', 'Status']]
        const rows = data.answers.map((a: any) => {
            const q = questions.find((q: any) => q.id === a.question_id)
            return [
                a.question_id,
                q?.text.substring(0, 40) + '...',
                `${a.selected_option} (${q?.options[a.selected_option as keyof typeof q.options]?.substring(0, 20) || ''}...)`,
                a.is_correct ? 'Correct' : 'Wrong'
            ]
        })

        autoTable(doc, {
            startY: 65,
            head: headers,
            body: rows,
            theme: 'grid',
            headStyles: { fillColor: [14, 116, 144] },
            styles: { fontSize: 8 }
        })

        doc.save(`report-${data.participant.name}.pdf`)
    }

    if (loading) return <div className="p-12 text-center text-slate-500">Loading details...</div>
    if (!data) return <div className="p-12 text-center text-red-500">Participant not found</div>

    return (
        <div className="min-h-screen bg-slate-50 p-6 sm:p-12">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>

                <div className="card-premium p-8 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">{data.participant.name}</h1>
                            <div className="flex gap-4 mt-2 text-slate-500">
                                <span>{data.participant.role}</span>
                                <span>•</span>
                                <span>{data.participant.institution}</span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div className="px-3 py-1 bg-slate-100 rounded-lg inline-block">
                                    Phone: <span className="font-semibold text-slate-900">{data.participant.mobile}</span>
                                </div>
                                <div className="px-3 py-1 bg-slate-100 rounded-lg inline-block">
                                    Email: <span className="font-semibold text-slate-900">{data.participant.email}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={downloadPDF}
                            className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
                        >
                            <Download className="w-4 h-4" /> PDF Report
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-800">Detailed Responses</h2>
                    {data.answers.sort((a: any, b: any) => a.question_id - b.question_id).map((ans: any) => {
                        const question = questions.find((q: any) => q.id === ans.question_id)
                        if (!question) return null

                        return (
                            <div key={ans.question_id} className={`card-premium p-6 border-l-4 ${ans.is_correct ? 'border-green-500' : 'border-red-500'}`}>
                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        {ans.is_correct ? (
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        ) : (
                                            <XCircle className="w-6 h-6 text-red-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-sm font-bold text-slate-400">Q{question.id} • {question.section}</span>
                                        <p className="text-lg font-medium text-slate-900 mt-1 mb-3">{question.text}</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className={`p-3 rounded-lg border ${ans.is_correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                                <span className="text-xs uppercase tracking-wide opacity-70 block mb-1">Participants Answer</span>
                                                <span className="font-semibold">{ans.selected_option}: {question.options[ans.selected_option as keyof typeof question.options]}</span>
                                            </div>
                                            {!ans.is_correct && (
                                                <div className="p-3 rounded-lg border bg-green-50 border-green-200">
                                                    <span className="text-xs uppercase tracking-wide opacity-70 block mb-1">Correct Answer</span>
                                                    <span className="font-semibold">{question.correctAnswer}: {question.options[question.correctAnswer as keyof typeof question.options]}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
