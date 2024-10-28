"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaSearch, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

export default function ContractOptimization() {
  const [contractAddress, setContractAddress] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [taskId, setTaskId] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = useCallback(async () => {
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) {
      setShowError(true);
      setErrorMessage('请输入有效的合约地址（以0x开头的42位字符）');
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsLoading(true);
    setShowError(false);

    try {
      // 第一步：向本地的get.py发送请求获取反编译代码
      const decompileResponse = await fetch('http://localhost:8080/decompile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: contractAddress }),
      });

      if (!decompileResponse.ok) {
        throw new Error('获取反编译代码失败');
      }
      const responseData = await decompileResponse.json();
      console.log('Decompile response data:', responseData);

      const { decompiled_code, source_code } = responseData;
      console.log('Decompiled code:', decompiled_code);
      console.log('Source code:', source_code);

      // 保存反编译代码和源代码
      sessionStorage.setItem('decompileCode', decompiled_code);
      sessionStorage.setItem('sourceCode', source_code);

      // 第二步：将反编译代码发送给服务器进行优化
      const optimizeResponse = await fetch('http://localhost:2525/process_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: decompiled_code,
          func_name: 'all_func'  // 添加 func_name 字段
        }),
      });

      if (!optimizeResponse.ok) {
        const errorData = await optimizeResponse.json().catch(() => ({}));
        throw new Error(`优化请求失败: ${errorData.message || optimizeResponse.statusText}`);
      }

      const optimizeData = await optimizeResponse.json();
      setTaskId(optimizeData.task_id);
    } catch (error: unknown) {
      console.error('处理请求时出错:', error);
      setShowError(true);
      setErrorMessage(`处理请求时出错: ${error instanceof Error ? error.message : '未知错误'}`);
      setTimeout(() => setShowError(false), 5000);
    }
  }, [contractAddress]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkTaskStatus = async () => {
      if (taskId) {
        try {
          // 使用 process_task_status 端点
          const response = await fetch(`http://localhost:2525/process_task_status/${taskId}`);
          const data = await response.json();

          if (data.state === 'SUCCESS') {
            console.log('Task completed:', data.result);
            sessionStorage.setItem('originalAddress', contractAddress);
            sessionStorage.setItem('optimizedCode', data.result);
            setIsLoading(false);
            setTaskId(null);
            router.push('/contract-optimization-details');
          } else if (data.state === 'FAILURE') {
            console.error('Task failed:', data.status);
            setShowError(true);
            setErrorMessage(`优化失败: ${data.status}`);
            setIsLoading(false);
            setTaskId(null);
          }
        } catch (error) {
          console.error('Error checking task status:', error);
          setShowError(true);
          setErrorMessage('检查任务状态时出错');
          setIsLoading(false);
          setTaskId(null);
        }
      }
    };

    if (taskId) {
      intervalId = setInterval(checkTaskStatus, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [taskId, contractAddress, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
      <Navbar />
      <div className="mt-24 w-full max-w-4xl mx-auto flex flex-col items-center">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          链上合约优化
        </motion.h1>
        <motion.p 
          className="text-xl mb-12 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          输入合约地址，查看反编译输出优化详细信息
        </motion.p>

        <motion.div 
          className="w-full max-w-2xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex space-x-4 mb-4">
            <input 
              type="text"
              placeholder="0x 请输入合约地址"
              className="flex-grow bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
            />
            <AnimatedButton onClick={handleSearch} className="flex items-center justify-center" disabled={isLoading}>
              {isLoading ? (
                <>
                  <ClipLoader color="#ffffff" size={20} className="mr-2" />
                  <span>处理中...</span>
                </>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  <span>搜索</span>
                </>
              )}
            </AnimatedButton>
          </div>
          {showError && (
            <motion.p
              className="text-red-500 text-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errorMessage}
            </motion.p>
          )}
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-12 w-full max-w-2xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-400 text-center">功能介绍</h2>
          <p className="mb-4 text-gray-300">
          用户输入任意的智能合约地址，系统会从 Dedaub 平台上找到对应的合约，并对其进行反编译，生成反编译输出。随后，SmartHalo 工具会对该反编译输出进行深度优化，确保变量类型准确、合约属性恢复完整、方法边界清晰。
          </p>
          <p className="text-gray-300">
            优化后，您可以查看该反编译输出的性能提升和相关信息。该工具帮助研究人员根据合约地址优化反编译输出，提高效率。
          </p>
        </motion.div>
      </div>
    </main>
  );
}
