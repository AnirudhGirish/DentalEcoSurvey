
'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { questions, Question } from '@/lib/questions'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { Answers } from './SurveyContainer'

interface Props {
    isReview: boolean
    onSubmit: (answers: Answers) => void
    participantName?: string
}

export default function QuestionsForm({ isReview, onSubmit, participantName }: Props) {
    const [answers, setAnswers] = useState<Answers>({})
    const [showError, setShowError] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (isReview) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [isReview])

    // Group questions by section
    const sections = useMemo(() => {
        const grouped: Record<string, Question[]> = {
            'Knowledge': [],
            'Attitude': [],
            'Practice': []
        }
        questions.forEach(q => {
            if (grouped[q.section]) grouped[q.section].push(q)
        })
        return grouped
    }, [])

    const handleOptionSelect = (qId: number, option: string) => {
        if (isReview) return
        setAnswers(prev => ({ ...prev, [qId]: option }))
        if (showError) setShowError(false)
    }

    const handleSubmit = () => {
        // Validate all questions answered
        const answeredCount = Object.keys(answers).length
        if (answeredCount < questions.length) {
            setShowError(true)
            // Scroll to first error
            const firstUnanswered = questions.find(q => !answers[q.id])
            if (firstUnanswered) {
                document.getElementById(`q-${firstUnanswered.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            return
        }
        onSubmit(answers)
    }

    // Redirect on review complete
    useEffect(() => {
        if (isReview) {
            const timer = setTimeout(() => {
                router.push('/')
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [isReview, router])

    if (isReview) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 px-4 text-center max-w-2xl mx-auto h-[60vh]"
            >
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-emerald-100/50">
                    <CheckCircle className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Thank You!</h2>
                <p className="text-xl text-slate-600 leading-relaxed max-w-lg mb-12">
                    Thanks for participating in the survey. We are moving to a better ecosystem and handling medical and dental sustainability.
                </p>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-400 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    Redirecting to home in 3 seconds...
                </div>
            </motion.div>
        )
    }

    return (
        <div className="space-y-12 pb-12">


            {Object.entries(sections).map(([sectionName, sectionQuestions], secIdx) => (
                <div key={sectionName} className="space-y-8">
                    <div className="flex items-center gap-4 py-4">
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                        <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest px-6 py-2 bg-white rounded-full shadow-sm border border-slate-100 text-center min-w-[200px]">
                            <span className="text-cyan-600 mr-2">Part {secIdx + 1}</span>
                            {sectionName}
                        </h3>
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    </div>

                    {sectionQuestions.map((q) => {
                        const isAnswered = !!answers[q.id]
                        const selected = answers[q.id]
                        // Removed distinct correct/wrong logic for styling

                        return (
                            <motion.div
                                key={q.id}
                                id={`q-${q.id}`}
                                layout
                                className={clsx(
                                    "bg-white rounded-2xl shadow-sm border-2 p-6 sm:p-8 transition-all duration-300",
                                    showError && !isAnswered && !isReview
                                        ? "border-red-300 shadow-red-100 ring-4 ring-red-50/50"
                                        : "border-transparent hover:border-slate-200 hover:shadow-md"
                                    // Removed conditional correct/wrong border styles
                                )}
                            >
                                <div className="flex gap-4 sm:gap-6">
                                    <div className="flex-shrink-0">
                                        <div className={clsx(
                                            "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm transition-colors",
                                            // Always show as answered blue since we are in review or it is answered
                                            (isAnswered || isReview) ? "bg-cyan-100 text-cyan-700" : "bg-slate-100 text-slate-500"
                                        )}>
                                            {q.id}
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-6">
                                        <p className="font-semibold text-lg text-slate-900 leading-relaxed">{q.text}</p>

                                        <div className="grid grid-cols-1 gap-3">
                                            {Object.entries(q.options).map(([key, label]) => {
                                                const isSelected = selected === key
                                                let itemClass = "border-slate-200 hover:border-cyan-400 hover:bg-slate-50"
                                                let ringClass = "border-slate-300"

                                                if (isReview) {
                                                    // In review, just highlight the selected one neutrally (cyan), same as active state but maybe static
                                                    if (isSelected) {
                                                        itemClass = "border-cyan-500 bg-cyan-50/50 text-cyan-900 shadow-md shadow-cyan-100"
                                                        ringClass = "border-cyan-500 bg-cyan-500"
                                                    } else {
                                                        itemClass = "border-slate-100 opacity-60" // Dim non-selected ones slightly
                                                    }
                                                } else if (isSelected) {
                                                    itemClass = "border-cyan-500 bg-cyan-50/50 text-cyan-900 shadow-md shadow-cyan-100"
                                                    ringClass = "border-cyan-500 bg-cyan-500"
                                                }

                                                return (
                                                    <button
                                                        key={key}
                                                        onClick={() => handleOptionSelect(q.id, key)}
                                                        disabled={isReview}
                                                        className={clsx(
                                                            "relative p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 group",
                                                            itemClass
                                                        )}
                                                    >
                                                        <div className={clsx(
                                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                            ringClass,
                                                            isReview && isSelected ? "text-white" : "text-transparent"
                                                        )}>
                                                            {/* Just show a checkmark or dot for the selected one in review, or just the filled circle */}
                                                            {isReview && isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                                            {!isReview && isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                                        </div>
                                                        <span className="flex-1 font-medium">{label}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        {isReview && (
                                            <div className="mt-4 p-5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-sm flex items-start gap-3 shadow-sm">
                                                <div className="p-1 bg-indigo-100 rounded-lg">
                                                    <AlertCircle className="w-5 h-5 text-indigo-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="font-bold block mb-1 text-indigo-700">Expert Explanation</span>
                                                    <p className="leading-relaxed opacity-90">{q.explanation}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            ))}

            {!isReview && (
                <div className="sticky bottom-6 z-20">
                    <div className="max-w-4xl mx-auto px-4">
                        <button
                            onClick={handleSubmit}
                            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-cyan-500/30 transform hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3"
                        >
                            <span>Submit Survey Answers</span>
                            <CheckCircle className="w-6 h-6" />
                        </button>
                        {showError && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mt-3"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm font-medium shadow-sm">
                                    <AlertCircle className="w-4 h-4" /> Please complete all questions to proceed
                                </span>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
