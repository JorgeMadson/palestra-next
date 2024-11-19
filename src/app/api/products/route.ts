import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Handler for the POST request to save a new product
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse JSON body from the incoming request
    const body = await request.json();

    const { nome, descricao, imagem, preco } = body;

    // Basic validation
    if (!nome || !preco || !imagem) {
      return NextResponse.json(
        { error: 'Nome, preço e imagem são obrigatórios.' },
        { status: 400 }
      );
    }

    // Insert product into the database
    const result = await sql`
      INSERT INTO products (nome, telefone, descricao, imagem, preco)
      VALUES (${nome}, NULL, ${descricao}, ${imagem}, ${preco})
      RETURNING id, nome, descricao, imagem, preco;
    `;

    // Return the inserted product data (excluding sensitive data like 'id' if needed)
    const insertedProduct = result.rows[0];

    return NextResponse.json(insertedProduct, { status: 201 });
  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao salvar o produto.' },
      { status: 500 }
    );
  }
}
