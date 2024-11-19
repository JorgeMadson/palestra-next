import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const { nome, descricao, imagem, preco } = body;

    if (!nome || !preco || !imagem) {
      return NextResponse.json(
        { error: 'Nome, preço e imagem são obrigatórios.' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO products (nome, telefone, descricao, imagem, preco)
      VALUES (${nome}, NULL, ${descricao}, ${imagem}, ${preco})
      RETURNING id, nome, descricao, imagem, preco;
    `;

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
