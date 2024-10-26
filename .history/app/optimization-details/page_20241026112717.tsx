"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCopy, FaSync } from 'react-icons/fa';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/vs2015.css';
import hljsDefineSolidity from 'highlightjs-solidity';
import { ClipLoader } from 'react-spinners';
import Editor from 'react-simple-code-editor';

hljsDefineSolidity(hljs);

const CUSTOM_HIGHLIGHT_PLACEHOLDER = '___CUSTOM_HIGHLIGHT___';

const highlightSolidityCode = (code: string) => {
  let processedCode = code.replace(/\*\*(.*?)\*\*/g, `${CUSTOM_HIGHLIGHT_PLACEHOLDER}$1${CUSTOM_HIGHLIGHT_PLACEHOLDER}`);
  const highlightedCode = hljs.highlight(processedCode, { language: 'solidity' }).value;
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

export default function OptimizationDetails() {
  const [isCopied, setIsCopied] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [originalCode, setOriginalCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [taskId, setTaskId] = useState<string | null>(null);

  useEffect(() => {
    const storedOriginalCode = sessionStorage.getItem('originalCode');
    const storedOptimizedCode = sessionStorage.getItem('optimizedCode');
    const storedTaskId = sessionStorage.getItem('taskId');

    if (storedOriginalCode) setOriginalCode(storedOriginalCode);
    if (storedOptimizedCode) {
      const lines = storedOptimizedCode.split('\n');
      setOptimizedCode(lines.slice(1, -1).join('\n')); // 删除第一行和最后一行
    }
    if (storedTaskId) setTaskId(storedTaskId);

    // 清除 sessionStorage
    sessionStorage.removeItem('originalCode');
    sessionStorage.removeItem('optimizedCode');
    sessionStorage.removeItem('taskId');

    console.log('Stored Original Code:', storedOriginalCode);
    console.log('Stored Optimized Code:', storedOptimizedCode);
    console.log('Stored Task ID:', storedTaskId);
  }, []);

  useEffect(() => {
    if (taskId) {
      const checkTaskStatus = async () => {
        try {
          const response = await fetch(`http://localhost:2525/task_status/${taskId}`);
          const data = await response.json();

          if (data.state === 'SUCCESS') {
            console.log('Task completed, setting optimized code:', data.result);
            const lines = data.result.split('\n');
            setOptimizedCode(lines.slice(1, -1).join('\n')); // 删除第一行和最后一行
            setIsOptimizing(false);
            setTaskId(null);
          } else if (data.state === 'FAILURE') {
            console.error('Task failed:', data.status);
            alert(`优化失败: ${data.status}`);
            setIsOptimizing(false);
            setTaskId(null);
          } else {
            // 如果任务还在进行中，继续轮询
            setTimeout(checkTaskStatus, 2000);
          }
        } catch (error) {
          console.error('Error checking task status:', error);
          setIsOptimizing(false);
          setTaskId(null);
        }
      };

      checkTaskStatus();
    }
  }, [taskId]);

  const handleReoptimize = useCallback(async () => {
    setIsOptimizing(true);
    setOptimizedCode(''); // 清空右侧代码框
    try {
      const response = await fetch('http://localhost:2525/process_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: originalCode }),
      });

      if (!response.ok) {
        throw new Error(`网络响应不正常: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setTaskId(data.task_id);
    } catch (error) {
      console.error('详细错误:', error);
      alert(`重新优化过程中出现错误: ${error instanceof Error ? error.message : '未知错误'}`);
      setIsOptimizing(false);
    }
  }, [originalCode]);

  const handleCopy = () => {
    const sanitizedCode = optimizedCode.replace(/\*\*(.*?)\*\*/g, '$1');
    navigator.clipboard.writeText(sanitizedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
          优化详情
        </motion.h1>

        <div className="w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <motion.div 
            className="flex-1 bg-gray-800 rounded-lg p-4 relative flex flex-col w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-400">反编译代码</h2>
              <AnimatedButton onClick={handleReoptimize} disabled={isOptimizing} className="flex items-center">
                {isOptimizing ? (
                  <>
                    <ClipLoader color="#ffffff" size={20} className="mr-2" />
                    <span>处理中...</span>
                  </>
                ) : (
                  <>
                    <FaSync className="mr-2" />
                    重新优化
                  </>
                )}
              </AnimatedButton>
            </div>
            <div className="w-full h-[calc(100vh-220px)] overflow-auto">
              <Editor
                value={originalCode}
                onValueChange={setOriginalCode}
                highlight={code => highlightSolidityCode(code)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  minHeight: '100%',
                  height: 'auto',
                  overflow: 'auto',
                }}
                className="min-h-full syntax-highlighter"
                textareaClassName="focus:outline-none"
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
              {isOptimizing ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
              ) : (
                <pre className="syntax-highlighter">
                  <HighlightedCode code={optimizedCode} />
                </pre>
              )}
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
      {isOptimizing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-xl font-semibold">合约优化中...</p>
            <p className="text-sm text-gray-400 mt-2">请耐心等待，这可能需要一些时间</p>
          </div>
        </div>
      )}
      <style jsx global>{`
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
        .hljs {
          background-color: transparent !important;
          padding: 0;
          height: 100%;
        }
        .hljs .custom-highlight,
        .hljs .custom-highlight * {
          background-color: #ffff00 !important; // 恢复到明亮的荧光黄色
          color: #000000 !important; // 文字颜色改为黑色，以提高可读性
          text-shadow: none !important;
          font-weight: normal;
          padding: 1px 2px; // 减小内边距以降低高度
          border-radius: 3px;
          margin: 0 -1px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          display: inline-block; // 使用 inline-block 来更好地控制高度
          line-height: 1.2; // 减小行高
        }
        /* 添加以下样式 */
        .code-editor-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
        }
        .code-editor-container textarea {
          min-height: 100%;
          resize: none;
        }
      `}</style>
    </main>
  );
}