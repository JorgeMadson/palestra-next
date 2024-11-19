// import { useState, useEffect } from 'react'
import { cookies } from 'next/headers'

async function authenticate() {
  "use server";
  const cookieStore = await cookies()
  cookieStore.set('auth', 'true', { maxAge: 3600 })
}

async function deauthenticate() {
  "use server";
  (await cookies()).delete('auth')
}


export default async function AuthPage() {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has('auth');

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
              <p className={`text-xl font-bold ${hasCookie ? 'text-green-700' : 'text-red-700'}`}>
                {hasCookie ? 'Autenticado' : 'Não Autenticado'}
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={authenticate}
                className="bg-black hover:bg-red-700 text-white font-bold py-3 px-8 transition-colors duration-200"
                aria-label={hasCookie ? "Já autenticado" : "Autenticar"}
                disabled={hasCookie}
              >
                {hasCookie ? 'Já Autenticado' : 'Autenticar'}
              </button>
            </div>
            <br />
            <div className="text-center">
              <button
                onClick={deauthenticate}
                className="bg-red-700 hover:bg-black text-white font-bold py-3 px-8 transition-colors duration-200"
                aria-label={hasCookie ? "Já autenticado" : "Autenticar"}
                disabled={!hasCookie}
              >
                {hasCookie ? 'Remover autenticação' : 'Não autenticado'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}