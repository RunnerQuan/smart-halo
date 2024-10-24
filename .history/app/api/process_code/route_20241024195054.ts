import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);

    const response = await fetch('http://172.18.197.84:2525/process_code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status);

    if (!response.ok) {
      throw new Error(`后端服务器错误: ${response.status}`);
    }

    const data = await response.json();
    console.log('Backend response data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { message: '服务器内部错误', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
