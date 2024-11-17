import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    // Exemplo: redirecionar usuários não autenticados
    const isAuthenticated = request.cookies.get('auth')?.value === "true";

    console.log('olha o middleware!', isAuthenticated, Date.now());

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/autenticar', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/criar-produto/:path*', '/produtos/:path*'],
}