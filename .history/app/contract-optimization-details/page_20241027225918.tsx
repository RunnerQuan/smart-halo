"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-solidity';
import 'prismjs/themes/prism-dark.css';
import AnimatedButton from '../../components/ui/animated-button';
import { FaCopy, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ContractOptimizationDetails() {
  const [originalCode, setOriginalCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    const original = sessionStorage.getItem('originalCode');
    const optimized = sessionStorage.getItem('optimizedCode');
    if (original) setOriginalCode(original);
    if (optimized) setOptimizedCode(optimized);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('代码已复制到剪贴板');
    }).catch(err => {
      console.error('复制失败:', err);
    });
  };

  const handleVulnerabilityDetection = async () => {
    try {
      // 这里应该是发送优化后的代码到后端进行漏洞检测的逻辑
      // 暂时使用模拟数据
      const response = await fetch('http://localhost:2525/vulnerability_detection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: optimizedCode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // 将检测结果存储到 sessionStorage
      sessionStorage.setItem('vulnerabilityResult', JSON.stringify(result));

      // 跳转到漏洞检测页面
      router.push('/vulnerability-detection');
    } catch (error) {
      console.error('漏洞检测失败:', error);
      alert('漏洞检测过程中出现错误，请稍后再试。');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
      <Navbar />
      <div className="mt-24 w-full max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          合约优化详情
        </motion.h1>

        <div className="flex space-x-4">
          <motion.div 
            className="w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">原始代码</h2>
            <div className="bg-gray-800 rounded-lg p-4 h-[600px] overflow-auto">
              <Editor
                value={originalCode}
                onValueChange={setOriginalCode}
                highlight={code => highlight(code, languages.solidity, 'solidity')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  minHeight: '100%',
                }}
                className="min-h-full"
                textareaClassName="focus:outline-none"
                readOnly={true}
              />
            </div>
          </motion.div>

          <motion.div 
            className="w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">优化后代码</h2>
              <div className="flex space-x-2">
                <AnimatedButton onClick={() => copyToClipboard(optimizedCode)} className="flex items-center">
                  <FaCopy className="mr-2" />
                  一键复制
                </AnimatedButton>
                <AnimatedButton onClick={handleVulnerabilityDetection} className="flex items-center">
                  <FaSearch className="mr-2" />
                  漏洞检测
                </AnimatedButton>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 h-[600px] overflow-auto">
              <Editor
                value={optimizedCode}
                onValueChange={setOptimizedCode}
                highlight={code => highlight(code, languages.solidity, 'solidity')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  minHeight: '100%',
                }}
                className="min-h-full"
                textareaClassName="focus:outline-none"
                readOnly={true}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
