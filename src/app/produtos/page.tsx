import { sql } from "@vercel/postgres";
import Image from "next/image";

type Product = {
  id: number;
  nome: string;
  telefone?: string;
  descricao?: string;
  imagem: string;
  preco: number;
};

export default async function ProductCatalog(): Promise<JSX.Element> {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const { rows } = await sql<Product>`SELECT * from PRODUCTS`;
    products = rows;
  } catch (e) {
    console.log(e);
    error = "Falha ao carregar os produtos. Por favor, tente novamente mais tarde.";
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 font-pirata">
          Catálogo de Produtos 
        </h1>

        {error && (
          <p className="text-red-700 text-center mb-8 font-bold">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white border-2 border-black p-6 relative">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black" />

              <h2 className="text-2xl font-bold mb-4">{product.nome}</h2>
              
              <div className="aspect-w-1 aspect-h-1 mb-4">
                <Image
                  src={product.imagem || "/placeholder.svg"}
                  alt={product.nome}
                  width={300}
                  height={300}
                  className="object-cover rounded-md"
                />
              </div>

              <p className="text-gray-700 mb-2">
                <span className="font-bold">Descrição:</span> {product.descricao}
              </p>
              
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Preço:</span> R$ {product.preco}
              </p>
              
              <p className="text-gray-700">
                <span className="font-bold">Contato:</span> {product.telefone}
              </p>
            </div>
          ))}
        </div>

        {products.length === 0 && !error && (
          <p className="text-center text-xl">
            Nenhum produto encontrado no momento.
          </p>
        )}
      </div>
    </div>
  );
}