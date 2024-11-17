'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Image from 'next/image'

export default function FormularioProduto() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [preco, setPreco] = useState('50')

  const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value)
  }

  const handleDescricaoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescricao(e.target.value)
  }

  const handleImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const arquivo = e.target.files[0]
      setImagem(arquivo)
      setPreviewUrl(URL.createObjectURL(arquivo))
    }
  }

  const handlePrecoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPreco(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!nome.trim()) {
      setErro('O nome do produto é obrigatório')
      return
    }
    if (!imagem) {
      setErro('A imagem do produto é obrigatória')
      return
    }
    console.log('Enviando:', { nome, descricao, imagem, preco })
    setNome('')
    setDescricao('')
    setImagem(null)
    setPreviewUrl(null)
    setErro(null)
  }

  // TODO: Terminar a subida das imagens

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-black" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-black" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black" />
        
        <form onSubmit={handleSubmit} className="bg-white p-8">
          <h2 className="text-3xl mb-8 text-center font-pirata">
            Formulário de Produto
          </h2>
          
          {erro && (
            <p className="text-red-700 text-sm text-center mb-4 font-medium border border-red-700 py-2">
              {erro}
            </p>
          )}
          
          <div className="mb-6">
            <label 
              className="block text-black font-bold mb-2 [font-family:MedievalSharp,cursive]" 
              htmlFor="nome"
            >
              Nome do Produto
            </label>
            <input
              className="w-full px-4 py-2 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-red-700"
              id="nome"
              type="text"
              placeholder="Vai ser usar para gerar o slug da url"
              value={nome}
              onChange={handleNomeChange}
              required
            />
          </div>
          
          <div className="mb-6">
            <label 
              className="block text-black font-bold mb-2 [font-family:MedievalSharp,cursive]" 
              htmlFor="descricao"
            >
              Descrição (Opcional)
            </label>
            <textarea
              className="w-full px-4 py-2 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-red-700"
              id="descricao"
              placeholder="Siga seu coração pode escrever o que quiser ou até não escrever nada"
              value={descricao}
              onChange={handleDescricaoChange}
              rows={4}
            />
          </div>
          
          <div className="mb-6">
            <label 
              className="block text-black font-bold mb-2 [font-family:MedievalSharp,cursive]" 
              htmlFor="preco"
            >
              Preço do Produto
            </label>
            <input
              className="w-full py-2 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-red-700"
              id="preco"
              type="range"
              min="0"
              max="1000"
              value={preco}
              onChange={handlePrecoChange}
            />
            <div className="mt-2 text-center font-bold">
              Preço: R$ {preco},00
            </div>
          </div>

          <div className="mb-6">
            <label 
              className="block text-black font-bold mb-2 [font-family:MedievalSharp,cursive]" 
              htmlFor="imagem"
            >
              Imagem do Produto
            </label>
            <input
              className="w-full px-4 py-2 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-red-700"
              id="imagem"
              type="file"
              accept="image/*"
              onChange={handleImagemChange}
              required
            />
          </div>
          
          {previewUrl && (
            <div className="mb-6">
              <div className="border-2 border-black p-2">
                <Image
                  src={previewUrl}
                  alt="Prévia do produto"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
            </div>
          )}
          
          <div className="text-center">
            <button
              className="bg-black hover:bg-red-700 text-white font-bold py-3 px-8 transition-colors duration-200 [font-family:MedievalSharp,cursive]"
              type="submit"
            >
              Cadastrar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}