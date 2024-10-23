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

      const { decompiled_code } = responseData;
      console.log('Decompiled code:', decompiled_code);

      // 添加这一行来保存原始的反编译代码
      sessionStorage.setItem('originalCode', decompiled_code);

      // 第二步：将反编译代码发送给服务器进行优化
      const optimizeResponse = await fetch('/api/process_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: decompiled_code }),
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
    // 注意：这里我们不再在finally块中设置isLoading为false
    // 因为我们希望在任务完成之前保持加载状态
  }, [contractAddress]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkTaskStatus = async () => {
      if (taskId) {
        try {
          const response = await fetch(`/api/task_status/${taskId}`);
          const data = await response.json();

          if (data.state === 'SUCCESS') {
            console.log('Task completed:', data.result);
            sessionStorage.setItem('originalAddress', contractAddress);
            sessionStorage.setItem('optimizedCode', data.result);
            setIsLoading(false);
            setTaskId(null);
            router.push('/optimization-details');
          } else if (data.state === 'FAILURE') {
            console.error('Task failed:', data.status);
            setShowError(true);
            setErrorMessage(`优化失败: ${data.status}`);
            setIsLoading(false);
            setTaskId(null);
          }
          // 如果任务仍在进行中，继续轮询
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
      intervalId = setInterval(checkTaskStatus, 2000); // 每2秒检查一次任务状态
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

        <section className="mt-16 text-center w-full">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            示例合约
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { address: "0x1234567890123456789012345678901234567890", info: "合约A的详细信息" },
              { address: "0x5678901234567890123456789012345678901234", info: "合约B的详细信息" },
              { address: "0x9abcdef012345678901234567890123456789012", info: "合约C的详细信息" },
              { address: "0xfabcdef123456789012345678901234567890123", info: "合约D的详细信息" }
            ].map((contract, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg overflow-hidden relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <h3 className="text-lg font-semibold mb-2 text-cyan-300">合约地址:</h3>
                <p className="text-white mb-3 font-mono text-sm">{contract.address}</p>
                <p className="text-white mb-4 text-sm">{contract.info}</p>
                <Link href="/optimization-details" passHref>
                  <AnimatedButton className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-sm">
                    <FaEye className="inline-block mr-2 mb-1" />
                    查看详情
                  </AnimatedButton>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
