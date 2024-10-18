"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import AnimatedButton from '../../components/ui/animated-button';
import { FaCopy } from 'react-icons/fa';

export default function OptimizationDetails() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // 可以添加一个提示，表示复制成功
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
      <Navbar />
      <div className="mt-24 w-full max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          优化详情
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-300">反编译代码</h2>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
              {`// 这里是反编译代码
function example() {
    // ...
}`}
            </pre>
            <div className="mt-4 text-center">
              <AnimatedButton onClick={() => handleCopy("// 反编译代码")} className="bg-purple-600 hover:bg-purple-700">
                <FaCopy className="inline-block mr-2 mb-1" />
                一键复制
              </AnimatedButton>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center text-cyan-300">优化后的代码</h2>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
              {`// 这里是优化后的代码
function optimizedExample() {
    // ...
}`}
            </pre>
            <div className="mt-4 text-center">
              <AnimatedButton onClick={() => handleCopy("// 优化后的代码")} className="bg-purple-600 hover:bg-purple-700">
                <FaCopy className="inline-block mr-2 mb-1" />
                一键复制
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
