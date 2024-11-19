import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    console.log('Filename is missing');
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      console.log('File is missing from form data');
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const blob = await put(filename, file, {
      access: 'public',
    });

    console.log('File uploaded successfully:', blob.url);
    return NextResponse.json(blob);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}