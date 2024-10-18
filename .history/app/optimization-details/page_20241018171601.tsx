"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCopy, FaSync } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function OptimizationDetails() {
  const [isCopied, setIsCopied] = useState(false);
  const [isReoptimized, setIsReoptimized] = useState(false);
  const [originalCode, setOriginalCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('// 这里是优化后的代码');
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // 从 localStorage 获取合约代码
    const storedCode = localStorage.getItem('contractCode');
    if (storedCode) {
      setOriginalCode(storedCode);
    }

    const handleResize = () => {
      if (leftRef.current && rightRef.current) {
        rightRef.current.style.height = `${leftRef.current.clientHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [originalCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReoptimize = () => {
    console.log("重新优化");
    setIsReoptimized(true);
    setTimeout(() => setIsReoptimized(false), 2000);
  };

  const handleOriginalCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOriginalCode(e.target.value);
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
            ref={leftRef}
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
            <div className="w-full h-[calc(100vh-220px)] overflow-hidden relative">
              <textarea
                ref={textareaRef}
                className="w-full h-full bg-transparent text-transparent caret-white resize-none p-4 font-mono absolute top-0 left-0 z-10"
                value={originalCode}
                onChange={handleOriginalCodeChange}
                placeholder="// 这里是原始反编译代码"
              />
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  height: '100%',
                  backgroundColor: 'transparent',
                }}
                wrapLines={true}
                showLineNumbers={true}
              >
                {originalCode || '// 这里是原始反编译代码'}
              </SyntaxHighlighter>
            </div>
          </motion.div>

          <motion.div 
            ref={rightRef}
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
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  backgroundColor: 'transparent',
                }}
              >
                {optimizedCode}
              </SyntaxHighlighter>
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
