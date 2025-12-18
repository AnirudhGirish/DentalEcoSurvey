
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { jwtVerify } from 'jose'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const cookieStore = (await headers()).get('cookie') || ''
    const token = cookieStore.match(/admin_token=([^;]+)/)?.[1]

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const secret = new TextEncoder().encode(process.env.ADMIN_SECRET || 'default-secret-change-me')
        await jwtVerify(token, secret)

        const { data: participant, error: pError } = await supabase
            .from('participants')
            .select('*')
            .eq('id', id)
            .single()

        if (pError) throw pError

        const { data: answers, error: aError } = await supabase
            .from('answers')
            .select('*')
            .eq('participant_id', id)

        if (aError) throw aError

        return NextResponse.json({
            participant,
            answers: answers || []
        })
    } catch (err) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
