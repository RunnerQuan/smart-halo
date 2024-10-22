import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  const { address } = await request.json();

  if (!address) {
    return NextResponse.json({ error: '缺少合约地址' }, { status: 400 });
  }

  try {
    const { stdout, stderr } = await execAsync(`python get.py ${address}`);
    
    if (stderr) {
      console.error('Python脚本错误:', stderr);
      return NextResponse.json({ error: '反编译过程中出错' }, { status: 500 });
    }

    // 假设Python脚本将反编译后的代码输出到stdout
    const decompiled_code = stdout.trim();

    // 将反编译后的代码发送到后端
    const backendResponse = await fetch('http://localhost:8080/decompile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: decompiled_code }),
    });

    if (!backendResponse.ok) {
      throw new Error('后端优化请求失败');
    }

    const optimizationResult = await backendResponse.json();

    return NextResponse.json(optimizationResult);
  } catch (error) {
    console.error('处理请求时出错:', error);
    return NextResponse.json({ error: '处理请求时出错' }, { status: 500 });
  }
}
