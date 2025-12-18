
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'
import { supabase } from '@/lib/supabase'

export async function GET() {
    const cookieStore = (await headers()).get('cookie') || ''
    const token = cookieStore.match(/admin_token=([^;]+)/)?.[1]

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const secret = new TextEncoder().encode(
            process.env.ADMIN_SECRET || 'default-secret-change-me'
        )
        await jwtVerify(token, secret)

        // 1. Fetch Participants
        const { data: participants, error: pError } = await supabase
            .from('participants')
            .select('*')
            .order('created_at', { ascending: false })

        if (pError) throw pError

        // 2. Fetch Answers
        const { data: answers, error: aError } = await supabase
            .from('answers')
            .select('*')

        if (aError) throw aError

        // 3. Calculate Stats in JS (User requested simplicity)
        const total_participants = participants?.length || 0

        // Role Distribution
        const roleCounts: Record<string, number> = {}
        participants?.forEach((p) => {
            const r = p.role || 'Unknown'
            roleCounts[r] = (roleCounts[r] || 0) + 1
        })
        const role_distribution = Object.entries(roleCounts).map(([role, value]) => ({ role, value }))

        // Section Stats
        const sectionStatsMap: Record<string, { correct: number, total: number }> = {}
        answers?.forEach((a) => {
            const s = a.section || 'Unknown'
            if (!sectionStatsMap[s]) sectionStatsMap[s] = { correct: 0, total: 0 }
            sectionStatsMap[s].total++
            if (a.is_correct) sectionStatsMap[s].correct++
        })
        const section_stats = Object.entries(sectionStatsMap).map(([section, stats]) => ({
            section,
            correct_count: stats.correct,
            total_count: stats.total
        }))

        const participantsWithScores = participants?.map(p => {
            const pAnswers = answers?.filter(a => a.participant_id === p.id) || []
            const correctCount = pAnswers.filter(a => a.is_correct).length
            return {
                ...p,
                score: correctCount,
                total: pAnswers.length > 0 ? pAnswers.length : 22 // Default to 22 if no answers found yet
            }
        }) || []

        return NextResponse.json({
            total_participants,
            role_distribution,
            section_stats,
            participants: participantsWithScores.slice(0, 50)
        })

    } catch (err: any) {
        console.error('Admin API Error:', err)
        console.error('Admin API Error Stack:', err?.stack)
        console.error('Admin API Error Details:', JSON.stringify(err, null, 2))
        return NextResponse.json({ error: 'Failed to fetch data', details: err.message }, { status: 500 })
    }
}
