"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCopy } from 'react-icons/fa';
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github-dark.css'; // 使用合适的主题
import hljsDefineSolidity from 'highlightjs-solidity';
import { useSearchParams } from 'next/navigation';

// 定义 Solidity 语言高亮
hljsDefineSolidity(hljs);

export default function ContractOptimizationDetails() {
  const [isCopied, setIsCopied] = useState(false);
  const [decompileCode, setDecompileCode] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [activeTab, setActiveTab] = useState('decompile');
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  const processOptimizedCode = (code: string) => {
    const lines = code.split('\n');
    if (lines.length > 2) {
      return lines.slice(1, -1).join('\n');
    }
    return code;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const address = searchParams.get('address');
      
      if (address) {
        try {
          const response = await fetch(`http://172.18.197.84:2525/get_code/${address}`);
          if (!response.ok) {
            throw new Error('无法获取合约详情');
          }
          const data = await response.json();
          setDecompileCode(data.decompiled_code);
          setSourceCode(data.source_code);
          setOptimizedCode(processOptimizedCode(data.result_code));
        } catch (error) {
          console.error('获取合约详情时出错:', error);
        }
      } else {
        const storedDecompileCode = sessionStorage.getItem('decompileCode');
        const storedSourceCode = sessionStorage.getItem('sourceCode');
        const storedOptimizedCode = sessionStorage.getItem('optimizedCode');

        if (storedDecompileCode) setDecompileCode(storedDecompileCode);
        if (storedSourceCode) setSourceCode(storedSourceCode);
        if (storedOptimizedCode) setOptimizedCode(processOptimizedCode(storedOptimizedCode));
        
        sessionStorage.removeItem('decompileCode');
        sessionStorage.removeItem('sourceCode');
        sessionStorage.removeItem('optimizedCode');
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams]);

  const handleCopy = () => {
    const sanitizedCode = optimizedCode.replace(/\*\*(.*?)\*\*/g, '$1');
    navigator.clipboard.writeText(sanitizedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const highlightSolidityCode = (code: string) => {
    // 首先处理 **code** 标记，包括嵌套在函数内部的情况
    let processedCode = code.replace(
      /\*\*([\s\S]*?)\*\*/g,
      '<mark class="bg-yellow-300 text-black px-1 rounded">$1</mark>'
    );

    // 然后使用 hljs 进行 Solidity 语法高亮
    let highlightedCode = hljs.highlight(processedCode, { language: 'solidity' }).value;

    return highlightedCode;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-[#1A1A1A] text-white font-sans">
      <Navbar />
      <div className="mt-12 w-full max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          链上合约优化详情
        </motion.h1>

        {isLoading ? (
          <motion.div
            className="flex justify-center items-center h-[calc(100vh-200px)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <p className="ml-4 text-xl">正在加载合约数据...</p>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <motion.div 
              className="flex-1 bg-gray-800 rounded-lg p-4 relative flex flex-col w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex">
                  <button
                    className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${activeTab === 'decompile' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setActiveTab('decompile')}
                  >
                    反编译代码
                  </button>
                  <button
                    className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${activeTab === 'source' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setActiveTab('source')}
                  >
                    合约源代码
                  </button>
                </div>
              </div>
              <div className="w-full h-[calc(100vh-220px)] overflow-auto">
                <Editor
                  value={activeTab === 'decompile' ? decompileCode : sourceCode}
                  onValueChange={() => {}}
                  highlight={highlightSolidityCode}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    backgroundColor: 'transparent',
                    minHeight: '100%',
                    width: '100%',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                  className="min-h-full"
                  textareaClassName="focus:outline-none"
                  readOnly
                />
              </div>
            </motion.div>

            <motion.div 
              className="flex-1 bg-gray-800 rounded-lg p-4 relative flex flex-col w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-purple-400">优化后代码</h2>
                <AnimatedButton onClick={handleCopy} className="flex items-center">
                  <FaCopy className="mr-2" />
                  一键复制
                </AnimatedButton>
              </div>
              <div className="w-full h-[calc(100vh-220px)] overflow-auto">
                <Editor
                  value={optimizedCode}
                  onValueChange={() => {}}
                  highlight={highlightSolidityCode}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    backgroundColor: 'transparent',
                    minHeight: '100%',
                    width: '100%',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                  className="min-h-full"
                  textareaClassName="focus:outline-none"
                  readOnly
                />
              </div>
            </motion.div>
          </div>
        )}

        {isCopied && (
          <motion.div 
            className="fixed bottom-8 right-8 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            优化后代码已复制到剪贴板
          </motion.div>
        )}
      </div>
    </main>
  );
}
