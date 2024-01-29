import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup'
    const userPath = path === '/profile'

    // get the tokens from cookies
    const token = request.cookies.get('token')?.value || ''

    // if user having some token, send him to the homepage '/'
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    // if user not having any token, send him to login '/login'
    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // for profile

    if(!userPath && !token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:path*', // Incomplete (create to prevent going to "profile/user")
    '/login',
    '/signup'
  ]
}