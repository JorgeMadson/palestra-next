'use client'

import { useState, useRef, useEffect } from 'react'

// Database of song snippets
const songSnippets = [
  // "Garota de Ipanema" - Tom Jobim e Vinícius de Moraes
  "Olha que coisa mais linda, mais cheia de graça... Ela é a menina que vem e que passa, num doce balanço, a caminho do mar.",

  // "Aquarela do Brasil" - Ary Barroso
  "Brasil, meu Brasil brasileiro, meu mulato inzoneiro, Brasil, Brasil!",

  // "Mas, Que Nada" - Jorge Ben Jor
  "Obá, obá, obá! Mas que nada, sai da minha frente que eu quero passar...",

  // "Ai, Se Eu Te Pego" - Michel Teló
  "Ai, se eu te pego, ai, ai, se eu te pego... Delícia, delícia!",

  // "Asa Branca" - Luiz Gonzaga e Humberto Teixeira
  "Quando olhei a terra ardendo, com a fogueira de São João, eu perguntei a Deus do céu, ai, por que tamanha judiação?",

  // "Pais e Filhos" - Legião Urbana
  "Mas é claro que o sol vai voltar amanhã, mais uma vez, eu sei...",

  // "Pescador de Ilusões" - O Rappa
  "Se meus joelhos. Não doessem mais. Diante de um bom motivo. Que me traga fé.",

  // "Fico Assim Sem Você" - Claudinho & Buchecha
  "Fico assim sem você, assim sem você, ah...",

  // "Não Quero Dinheiro" - Tim Maia
  "Eu não quero dinheiro, eu só quero amor!",

  // "Metamorfose Ambulante" - Raul Seixas
  "Eu prefiro ser essa metamorfose ambulante, do que ter aquela velha opinião formada sobre tudo."
];

export default function Component() {
  const [messages, setMessages] = useState([
    { text: "Olá! Eu sou o chét. Pergunte-me qualquer coisa e eu responderei!", isBot: true }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }])

    // Generate bot response
    setTimeout(() => {
      const randomSnippet = songSnippets[Math.floor(Math.random() * songSnippets.length)]
      setMessages(prev => [...prev, { text: randomSnippet, isBot: true }])
    }, 1000)

    setInput('')
  }

  return (
    <div className="flex flex-col h-[500px] max-w-md mx-auto border rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${message.isBot ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'
                }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Escreva sua messagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}