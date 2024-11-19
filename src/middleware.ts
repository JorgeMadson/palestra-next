import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Exemplo: redirecionar usuários não autenticados
  const isAuthenticated = request.cookies.get('auth')?.value === "true";

  // Nosso feature flag
  const featureFlag = process.env.FEATURE_FLAG;
  const isChat = request.nextUrl.pathname === '/chat';

  // Poderia mandar para um serviço de log 
  console.log(`Exemplo de log do middleware! isAuthenticated: ${isAuthenticated}, ${new Date(Date.now()).toISOString().replace('T', ' ')}`);

  if (!isAuthenticated && !isChat) {
    return NextResponse.redirect(new URL('/autenticar', request.url));
  }

  // Teste A/B  para página '/criar-produto'
  if (request.nextUrl.pathname === '/criar-produto') {
    const abTestCookie = request.cookies.get('ab-test-produtos');
    console.log('entrou na /criar-produto olha o cookie:', abTestCookie);
    const response = NextResponse.next();

    if (!abTestCookie) {
      // Determine which version to show (30% chance for version B)
      const showVersionB = Math.random() < 0.3;
      const version = showVersionB ? 'B' : 'A';

      // Set the A/B test cookie
      response.cookies.set('ab-test-produtos', version, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      // Redirect to the appropriate version
      if (showVersionB) {
        return NextResponse.redirect(new URL('/criar-produto-b', request.url));
      }
    } else if (abTestCookie.value === 'B') {
      // Redirect to version B if the cookie is already set
      return NextResponse.redirect(new URL('/criar-produto-b', request.url));
    }

    return response;
  }

  if (isChat) {
    console.log('entrou no /chat e tem o feture flag:',featureFlag);
    if (!featureFlag) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/criar-produto/:path*', '/produtos/:path*', '/criar-produto-b/:path*', '/chat'],
}