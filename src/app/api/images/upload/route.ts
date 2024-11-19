import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    console.log('cadê o filename?');
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  const body = request.body;
  if (!body) {
    console.log('o body tá vazio meu irmão!');
    return NextResponse.json({ error: 'Request body is empty or missing' }, { status: 400 });
  }

  console.log(filename);
  const blob = await put(filename, request.body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
