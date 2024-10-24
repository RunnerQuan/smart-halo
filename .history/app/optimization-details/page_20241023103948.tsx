"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCopy, FaSync } from 'react-icons/fa';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';

export default function OptimizationDetails() {
  const [isCopied, setIsCopied] = useState(false);
  const [isReoptimized, setIsReoptimized] = useState(false);
  const [decompileCode, setDecompileCode] = useState('// 这里是原始反编译代码');
  const [optimizedCode, setOptimizedCode] = useState('// 这里是优化后的代码');
  const [contractSourceCode, setContractSourceCode] = useState('// 这里是合约源码');
  const [decompileOptimizedCode, setDecompileOptimizedCode] = useState('// 这里是反编译优化后代码');

  useEffect(() => {
    const storedOriginalCode = sessionStorage.getItem('originalCode');
    const storedOptimizedCode = sessionStorage.getItem('optimizedCode');
    if (storedOriginalCode) {
      setDecompileCode(storedOriginalCode);
    }
    if (storedOptimizedCode) {
      setOptimizedCode(storedOptimizedCode);
    }
    // 清除sessionStorage中的数据
    sessionStorage.removeItem('originalCode');
    sessionStorage.removeItem('optimizedCode');
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReoptimize = async () => {
    setIsReoptimized(true);
    try {
      const response = await fetch('/api/process_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: decompileCode }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOptimizedCode(data.process_code); // 注意这里改为 data.result
    } catch (error) {
      console.error('Error:', error);
      alert('重新优化过程中出现错误,请稍后再试');
    } finally {
      setTimeout(() => setIsReoptimized(false), 2000);
    }
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
          优化详情
        </motion.h1>

        <div className="w-full flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 h-[calc(100vh-200px)]">
            {/* 反编译代码框 */}
            <motion.div 
              className="flex-1 bg-gray-800 rounded-lg p-4 relative flex flex-col"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-purple-400">反编译代码</h2>
                <AnimatedButton onClick={handleReoptimize} className="flex items-center">
                  <FaSync className="mr-2" />
                  重新优化
                </AnimatedButton>
              </div>
              <Editor
                value={decompileCode}
                onValueChange={code => setDecompileCode(code)}
                highlight={code => highlight(code, languages.js, 'javascript')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  height: '100%',
                }}
                className="flex-grow overflow-auto"
                textareaClassName="focus:outline-none"
                readOnly
              />
            </motion.div>

            {/* 优化后代码框 */}
            <motion.div 
              className="flex-1 bg-gray-800 rounded-lg p-4 relative flex flex-col"
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
              <Editor
                value={optimizedCode}
                onValueChange={code => setOptimizedCode(code)}
                highlight={code => highlight(code, languages.js, 'javascript')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  height: '100%',
                }}
                className="flex-grow overflow-auto"
                textareaClassName="focus:outline-none"
                readOnly
              />
            </motion.div>
          </div>

          {/* 新增的两个代码框 */}
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 h-[calc(100vh-200px)]">
            {/* 合约源码 */}
            <motion.div 
              className="flex-1 bg-gray-800 rounded-lg p-4 relative flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">合约源码</h2>
              <Editor
                value={contractSourceCode}
                onValueChange={code => setContractSourceCode(code)}
                highlight={code => highlight(code, languages.js, 'javascript')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  height: '100%',
                }}
                className="flex-grow overflow-auto"
                textareaClassName="focus:outline-none"
                readOnly
              />
            </motion.div>

            {/* 反编译优化后代码 */}
            <motion.div 
              className="flex-1 bg-gray-800 rounded-lg p-4 relative flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">反编译优化后代码</h2>
              <Editor
                value={decompileOptimizedCode}
                onValueChange={code => setDecompileOptimizedCode(code)}
                highlight={code => highlight(code, languages.js, 'javascript')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  height: '100%',
                }}
                className="flex-grow overflow-auto"
                textareaClassName="focus:outline-none"
                readOnly
              />
            </motion.div>
          </div>
        </div>

        {/* 提示信息保持不变 */}
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

        {isReoptimized && (
          <motion.div 
            className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            重新优化完成！
          </motion.div>
        )}
      </div>
    </main>
  );
}
