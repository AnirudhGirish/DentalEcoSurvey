
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DemographicsForm, { Demographics } from './DemographicsForm'
import QuestionsForm from './QuestionsForm'
import { questions } from '@/lib/questions'
import { supabase } from '@/lib/supabase'

export type Answers = Record<number, string> // questionId -> selectedOption (A, B, C, D)

export default function SurveyContainer() {
    const [step, setStep] = useState<0 | 1 | 2>(0) // 0: Demo, 1: Questions, 2: Results (Review)
    const [demographics, setDemographics] = useState<Demographics | null>(null)

    const handleDemographicsComplete = async (data: Demographics) => {
        setDemographics(data)
        setStep(1)
    }

    const handleSurveySubmit = async (answers: Answers) => {
        // 1. Save to Supabase
        if (!demographics) return

        try {
            // Create Participant
            const { data: participant, error: pError } = await supabase
                .from('participants')
                .insert({
                    name: demographics.name,
                    role: demographics.role,
                    institution: demographics.institution,
                    mobile: demographics.mobile,
                    email: demographics.email
                })
                .select()
                .single()

            if (pError) throw pError
            if (!participant) throw new Error('Failed to create participant')

            // Create Answers
            const answersData = Object.entries(answers).map(([qId, option]) => {
                const question = questions.find(q => q.id === parseInt(qId))
                return {
                    participant_id: participant.id,
                    question_id: parseInt(qId),
                    selected_option: option,
                    is_correct: option === question?.correctAnswer,
                    section: question?.section || 'Unknown'
                }
            })

            const { error: aError } = await supabase
                .from('answers')
                .insert(answersData)

            if (aError) throw aError

            // Move to results view
            setStep(2)

        } catch (error) {
            console.error('Submission Error:', error)
            console.error('Submission Error JSON:', JSON.stringify(error, null, 2))
            alert('Failed to submit survey. Please try again.')
        }
    }

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <DemographicsForm key="demo" onComplete={handleDemographicsComplete} />
                )}
                {(step === 1 || step === 2) && (
                    <QuestionsForm
                        key="questions"
                        isReview={step === 2}
                        onSubmit={handleSurveySubmit}
                        participantName={demographics?.name}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
