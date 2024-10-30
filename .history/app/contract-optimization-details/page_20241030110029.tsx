"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCopy, FaShieldAlt } from 'react-icons/fa';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/vs2015.css';
import hljsDefineSolidity from 'highlightjs-solidity';
import { useSearchParams, useRouter } from 'next/navigation';

// 注册 Solidity 语言
hljsDefineSolidity(hljs);

const CUSTOM_HIGHLIGHT_PLACEHOLDER = '___CUSTOM_HIGHLIGHT___';

const highlightSolidityCode = (code: string) => {
  // 步骤 1: 将 **code** 替换为特殊标记
  let processedCode = code.replace(/\*\*(.*?)\*\*/g, `${CUSTOM_HIGHLIGHT_PLACEHOLDER}$1${CUSTOM_HIGHLIGHT_PLACEHOLDER}`);

  // 步骤 2: 进行 Solidity 语法高亮
  const highlightedCode = hljs.highlight(processedCode, { language: 'solidity' }).value;

  // 步骤 3: 将特殊标记替换回自定义高亮样式
  return highlightedCode.replace(
    new RegExp(`${CUSTOM_HIGHLIGHT_PLACEHOLDER}(.*?)${CUSTOM_HIGHLIGHT_PLACEHOLDER}`, 'g'),
    '<span class="custom-highlight">$1</span>'
  );
};

const HighlightedCode = ({ code }: { code: string }) => {
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = highlightSolidityCode(code);
    }
  }, [code]);

  return <code ref={codeRef} className="hljs language-solidity" />;
};

export default function ContractOptimizationDetails() {
  const [isCopied, setIsCopied] = useState(false);
  const [decompileCode, setDecompileCode] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [activeTab, setActiveTab] = useState('decompile');
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

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
          // 删除第一行和最后一行
          const lines = data.result_code.split('\n');
          setOptimizedCode(lines.slice(1, -1).join('\n'));
        } catch (error) {
          console.error('获取合约详情时出错:', error);
        }
      } else {
        const storedDecompileCode = sessionStorage.getItem('decompileCode');
        const storedSourceCode = sessionStorage.getItem('sourceCode');
        const storedOptimizedCode = sessionStorage.getItem('optimizedCode');

        if (storedDecompileCode) setDecompileCode(storedDecompileCode);
        if (storedSourceCode) setSourceCode(storedSourceCode);
        if (storedOptimizedCode) {
          const lines = storedOptimizedCode.split('\n');
          setOptimizedCode(lines.slice(1, -1).join('\n'));
        }
        
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

  const handleVulnerabilityDetection = async () => {
    try {
      // 获取合约地址
      let address = searchParams.get('address');
      if (!address) {
        // 如果URL中没有address参数，尝试从sessionStorage获取
        address = sessionStorage.getItem('originalAddress');
      }
      if (!address) {
        throw new Error('未找到合约地址');
      }

      // 获取字节码（可能为null）
      const bytecode = sessionStorage.getItem('bytecode');

      // 发送地址和字节码到后端进行漏洞检测
      const response = await fetch('http://172.18.197.84:2525/run_inter_task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          address,
          bytecode  // 如果bytecode为null，后端会收到null值
        }),
      });

      if (!response.ok) {
        throw new Error('漏洞检测请求失败');
      }

      const data = await response.json();
      
      // 将优化后的代码和漏洞检测结果存储到 sessionStorage
      sessionStorage.setItem('vulnerabilityCode', optimizedCode);
      sessionStorage.setItem('vulnerabilityResult', data.result);
      
      // 跳转到漏洞检测页面
      router.push('/vulnerability-detection');
    } catch (error) {
      console.error('Error during vulnerability detection:', error);
      alert('漏洞检测过程中出现错误');
    }
  };

  const CustomSyntaxHighlighter = ({ code, language }: { code: string; language: string }) => {
    return (
      <pre className="syntax-highlighter">
        <HighlightedCode code={code} />
      </pre>
    );
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-[#1A1A1A] text-white font-sans">
      <Navbar />
      <div className="mt-12 w-full max-w-[95%] mx-auto">
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
            <p className="ml-4 text-xl">正在加载合约中...</p>
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
                <CustomSyntaxHighlighter
                  code={activeTab === 'decompile' ? decompileCode : sourceCode}
                  language="solidity"
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
                <div className="flex space-x-4">
                  <motion.button
                    onClick={handleVulnerabilityDetection}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FaShieldAlt className="mr-2" />
                    漏洞检测
                  </motion.button>
                  <motion.button
                    onClick={handleCopy}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FaCopy className="mr-2" />
                    一键复制
                  </motion.button>
                </div>
              </div>
              <div className="w-full h-[calc(100vh-220px)] overflow-auto">
                <CustomSyntaxHighlighter
                  code={optimizedCode}
                  language="solidity"
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
      <style jsx global>{`
        .custom-highlight {
          background-color: yellow !important;
          color: black !important;
          text-shadow: none !important;
          font-weight: bold;
          padding: 1px 4px;
          border-radius: 4px;
          display: inline-block;
          line-height: 1;
        }
        .syntax-highlighter {
          font-family: 'Fira Code', monospace;
          font-size: 14px;
          line-height: 1.5;
          overflow-x: auto;
          background-color: transparent !important;
          width: 100%;
          height: 100%;
          padding: 1rem;
        }
        .syntax-highlighter code {
          background-color: transparent !important;
        }
        /* 确保自定义高亮样式优先级高于 highlight.js 样式 */
        .hljs .custom-highlight,
        .hljs .custom-highlight * {
          background-color: yellow !important;
          color: black !important;
          text-shadow: none !important;
          font-weight: bold;
          padding: 1px 4px;
          border-radius: 4px;
          display: inline-block;
          line-height: 1;
        }
      `}</style>
    </main>
  );
}
