import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function authenticate() {
  "use server"
  const cookieStore =await  cookies()
  cookieStore.set('auth', 'true', { maxAge: 3600 })
  revalidatePath('/autenticar')
}

async function deauthenticate() {
  "use server"
  const cookieStore = await cookies()
  cookieStore.delete('auth')
  revalidatePath('/autenticar')
}

async function clearAbTestCookie() {
  "use server"
  const cookieStore = await cookies()
  cookieStore.delete('ab-test-produtos')
  revalidatePath('/autenticar')
}

export default async function AuthPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.has('auth')
  const abTestVersion = cookieStore.has('auth') && cookieStore.get('ab-test-produtos')?.value

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="relative">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-black" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-black" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black" />

          <div className="bg-white p-8 border-2 border-black">
            <h1 className="text-4xl mb-8 text-center font-pirata">
              Portal de Autenticação
            </h1>

            <div className="mb-6 text-center">
              <p className="text-lg mb-4">
                Status de Autenticação:
              </p>
              <p className={`text-xl font-bold ${isAuthenticated ? 'text-green-700' : 'text-red-700'}`}>
                {isAuthenticated ? 'Autenticado' : 'Não Autenticado'}
              </p>
            </div>

            <form className="text-center mb-6">
              <button
                formAction={authenticate}
                className="bg-black hover:bg-red-700 text-white font-bold py-3 px-8 transition-colors duration-200"
                aria-label={isAuthenticated ? "Já autenticado" : "Autenticar"}
                disabled={isAuthenticated}
              >
                {isAuthenticated ? 'Já Autenticado' : 'Autenticar'}
              </button>
            </form>

            <form className="text-center mb-6">
              <button
                formAction={deauthenticate}
                className="bg-red-700 hover:bg-black text-white font-bold py-3 px-8 transition-colors duration-200"
                aria-label={isAuthenticated ? "Remover autenticação" : "Não autenticado"}
                disabled={!isAuthenticated}
              >
                {isAuthenticated ? 'Remover autenticação' : 'Não autenticado'}
              </button>
            </form>

            {abTestVersion && <><div className="mb-6 text-center">
              <p className="text-lg mb-4">
                Versão A/B Test:
              </p>
              <p className="text-xl font-bold">
                {abTestVersion || 'Não definido'}
              </p>
            </div>

            <form className="text-center">
              <button
                formAction={clearAbTestCookie}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 transition-colors duration-200"
                aria-label="Limpar cookie A/B Test"
              >
                Limpar cookie A/B Test
              </button>
            </form></>}
          </div>
        </div>
      </div>
    </div>
  )
}