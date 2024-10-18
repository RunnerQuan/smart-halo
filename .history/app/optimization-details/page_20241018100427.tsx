"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';

export default function OptimizationDetails() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    // 这里应该是复制代码的逻辑
    // 目前我们只是模拟复制操作
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
      <Navbar />
      <div className="mt-24 w-full max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          优化详情
        </motion.h1>

        <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <motion.div 
            className="flex-1 bg-gray-800 rounded-lg p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">反编译代码</h2>
            <div className="bg-gray-900 p-4 rounded-lg h-[calc(100vh-300px)] overflow-auto">
              <pre className="text-gray-300">
                {/* 这里应该显示实际的反编译代码 */}

              </pre>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 bg-gray-800 rounded-lg p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">优化后代码</h2>
            <div className="bg-gray-900 p-4 rounded-lg h-[calc(100vh-300px)] overflow-auto relative">
              <pre className="text-gray-300">
                {/* 这里应该显示实际的优化后代码 */}
              </pre>
              <div className="absolute bottom-4 right-4">
                <AnimatedButton onClick={handleCopy}>
                  一键复制
                </AnimatedButton>
              </div>
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
      </div>
    </main>
  );
}
