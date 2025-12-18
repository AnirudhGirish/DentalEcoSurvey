
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (request.nextUrl.pathname === '/dashboard/login') {
            return NextResponse.next()
        }

        const token = request.cookies.get('admin_token')?.value

        if (!token) {
            return NextResponse.redirect(new URL('/dashboard/login', request.url))
        }

        try {
            const secret = new TextEncoder().encode(
                process.env.ADMIN_SECRET || 'default-secret-change-me'
            )
            await jwtVerify(token, secret)
            return NextResponse.next()
        } catch (e) {
            return NextResponse.redirect(new URL('/dashboard/login', request.url))
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard/:path*',
}
