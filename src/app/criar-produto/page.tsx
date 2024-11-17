import FormularioProdutoPirata from '@/components/FormularioProdutoPirata';

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-8 font-pirata">Cadastro de Produto Pirata</h1>
      <FormularioProdutoPirata />
    </div>
  )
}