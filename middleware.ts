import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    // Exemplo: redirecionar usuários não autenticados
    const isAuthenticated = request.cookies.get('auth')?.value === "true";

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}