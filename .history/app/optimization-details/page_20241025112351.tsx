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
  const [originalCode, setOriginalCode] = useState('// 这里是原始反编译代码');
  const [optimizedCode, setOptimizedCode] = useState('// 这里是优化后的代码');

  const processOptimizedCode = (code: string) => {
    const lines = code.split('\n');
    if (lines.length > 2) {
      return lines.slice(1, -1).join('\n');
    }
    return code;
  };

  useEffect(() => {
    const storedOriginalCode = sessionStorage.getItem('originalCode');
    const storedOptimizedCode = sessionStorage.getItem('optimizedCode');
    if (storedOriginalCode) {
      setOriginalCode(storedOriginalCode);
    }
    if (storedOptimizedCode) {
      setOptimizedCode(processOptimizedCode(storedOptimizedCode));
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
        body: JSON.stringify({ code: originalCode }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOptimizedCode(processOptimizedCode(data.process_code));
    } catch (error) {
      console.error('Error:', error);
      alert('重新优化过程中出现错误,请稍后再试');
    } finally {
      setTimeout(() => setIsReoptimized(false), 2000);
    }
  };

  const highlightCode = (code: string) => {
    // 首先使用 Prism 进行 JavaScript 语法高亮
    const highlightedCode = highlight(code, languages.js, 'javascript');
    
    // 然后处理 **code** 标记
    return highlightedCode.replace(
      /\*\*(.*?)\*\*/g, 
      '<span class="bg-yellow-300 text-black px-1 rounded">$1</span>'
    );
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

        <div className="w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
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
            <div className="w-full h-[calc(100vh-220px)] overflow-auto">
              <Editor
                value={originalCode}
                onValueChange={code => setOriginalCode(code)}
                highlight={code => highlight(code, languages.js, 'javascript')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  minHeight: '100%',
                }}
                className="min-h-full"
                textareaClassName="focus:outline-none"
                readOnly
              />
            </div>
          </motion.div>

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
            <div className="w-full h-[calc(100vh-220px)] overflow-auto">
              <Editor
                value={optimizedCode}
                onValueChange={() => {}}
                highlight={highlightCode}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  minHeight: '100%',
                }}
                className="min-h-full"
                textareaClassName="focus:outline-none"
                readOnly
              />
            </div>
          </motion.div>
        </div>

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
