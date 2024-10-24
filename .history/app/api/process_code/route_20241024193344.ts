import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: '缺少代码内容' }, { status: 400 });
    }

    // 将代码发送到后端进行处理
    const backendResponse = await fetch('http://localhost:8080/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!backendResponse.ok) {
      throw new Error('后端处理请求失败');
    }

    const processingResult = await backendResponse.json();

    // 假设后端返回的结果包含 task_id
    if (processingResult.task_id) {
      return NextResponse.json({ task_id: processingResult.task_id }, { status: 200 });
    } else {
      throw new Error('后端未返回有效的 task_id');
    }
  } catch (error) {
    console.error('处理代码时出错:', error);
    return NextResponse.json({ error: '处理代码时出错' }, { status: 500 });
  }
}
