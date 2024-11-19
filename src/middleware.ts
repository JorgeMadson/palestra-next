import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTHENTICATION_COOKIE = 'auth'
const AB_TEST_COOKIE = 'ab-test-produtos'
const CHAT_PATH = '/chat'
const CREATE_PRODUCT_PATH = '/criar-produto'
const CREATE_PRODUCT_B_PATH = '/criar-produto-b'
const AUTH_PATH = '/autenticar'

export function middleware(request: NextRequest) {
  logMiddlewareExecution(request)

  if (!isAuthenticated(request)) {
    if (isChatPath(request)) {
      return handleChatFeatureFlag(request)
    }
    return redirectToAuth(request)
  }

  if (isCreateProductPath(request)) {
    return handleCreateProductABTest(request)
  }

  return NextResponse.next()
}

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.get(AUTHENTICATION_COOKIE)?.value === "true"
}

function isChatPath(request: NextRequest): boolean {
  return request.nextUrl.pathname === CHAT_PATH
}

function isCreateProductPath(request: NextRequest): boolean {
  return request.nextUrl.pathname === CREATE_PRODUCT_PATH
}

function logMiddlewareExecution(request: NextRequest): void {
  console.log(`Middleware executed: isAuthenticated: ${isAuthenticated(request)}, ${new Date().toISOString().replace('T', ' ')}`)
}

function redirectToAuth(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(AUTH_PATH, request.url))
}

function handleChatFeatureFlag(request: NextRequest): NextResponse | undefined {
  const featureFlag = process.env.FEATURE_FLAG
  console.log('Accessed /chat. Feature flag:', featureFlag)

  if (!featureFlag) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

function handleCreateProductABTest(request: NextRequest): NextResponse {
  const abTestCookie = request.cookies.get(AB_TEST_COOKIE)
  console.log('Accessed /criar-produto. AB test cookie:', abTestCookie)

  if (!abTestCookie) {
    return setNewABTestCookie(request)
  }

  if (abTestCookie.value === 'B') {
    return redirectToVersionB(request)
  }

  return NextResponse.next()
}

function setNewABTestCookie(request: NextRequest): NextResponse {
  const showVersionB = Math.random() < 0.3
  const version = showVersionB ? 'B' : 'A'

  const response = showVersionB ? redirectToVersionB(request) : NextResponse.next()

  response.cookies.set(AB_TEST_COOKIE, version, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  return response
}

function redirectToVersionB(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(CREATE_PRODUCT_B_PATH, request.url))
}

export const config = {
  matcher: ['/criar-produto/:path*', '/produtos/:path*', '/criar-produto-b/:path*', '/chat'],
}