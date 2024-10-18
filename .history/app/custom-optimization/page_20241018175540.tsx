"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCode, FaUpload, FaRocket } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CustomOptimization() {
  const [contractCode, setContractCode] = useState('');
  const [showError, setShowError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        editorRef.current.style.height = `${window.innerHeight - 400}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOptimize = () => {
    if (!contractCode.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    sessionStorage.setItem('contractCode', contractCode);
    window.location.href = '/optimization-details';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.sol')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setContractCode(content);
      };
      reader.readAsText(file);
    } else {
      alert('请上传.sol文件');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
      <Navbar />
      <div className="mt-24 w-full max-w-7xl mx-auto flex flex-col items-center">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaCode className="inline-block mr-2 mb-1" />
          自定义优化
        </motion.h1>
        <motion.p 
          className="text-xl mb-12 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          输入或上传智能合约反编译输出代码，获取优化后的反编译输出代码
        </motion.p>

        <motion.div 
          className="w-full mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div ref={editorRef} className="w-full bg-gray-800 rounded-lg mb-4 overflow-auto">
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              showLineNumbers={true}
              wrapLines={true}
              customStyle={{
                fontSize: 14,
                backgroundColor: 'transparent',
              }}
            >
              {contractCode || '// 在此输入智能合约反编译输出代码...'}
            </SyntaxHighlighter>
          </div>
          <div className="flex justify-between">
            <label className="bg-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors font-bold">
              <FaUpload className="inline-block mr-2 mb-1" />
              上传合约文件
              <input
                type="file"
                className="hidden"
                accept=".sol"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </label>
            <AnimatedButton onClick={handleOptimize}>
              <FaRocket className="inline-block mr-2 mb-1" />
              开始优化
            </AnimatedButton>
          </div>
          {showError && (
            <motion.p
              className="text-red-500 text-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              请输入或上传合约代码
            </motion.p>
          )}
        </motion.div>
      </div>
    </main>
  );
}
