
import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'

export async function POST(request: Request) {
    const body = await request.json()
    const { password } = body

    const correctPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (password === correctPassword) {
        const secret = new TextEncoder().encode(
            process.env.ADMIN_SECRET || 'default-secret-change-me'
        )

        const token = await new SignJWT({ 'urn:example:claim': true })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secret)

        const response = NextResponse.json({ success: true })
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        })

        return response
    }

    return NextResponse.json({ success: false }, { status: 401 })
}
