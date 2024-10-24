import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const taskId = params.taskId;

  try {
    const response = await fetch(`http://172.18.197.84:2525/task_status/${taskId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { message: '服务器内部错误', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
