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

const HighlightedCode = ({ code, onCodeChange }: { code: string; onCodeChange?: (code: string) => void }) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const [editableCode, setEditableCode] = useState(code);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = highlightSolidityCode(editableCode);
    }
  }, [editableCode]);

  const handleInput = useCallback(() => {
    if (codeRef.current) {
      const newCode = codeRef.current.textContent || '';
      setEditableCode(newCode);
      if (onCodeChange) {
        onCodeChange(newCode);
      }
    }
  }, [onCodeChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLPreElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.execCommand('insertLineBreak');
    }
  }, []);

  return (
    <pre
      ref={codeRef}
      className="hljs language-solidity"
      contentEditable={!!onCodeChange}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      style={{ outline: 'none', caretColor: 'white' }}
      suppressContentEditableWarning={true}
    />
  );
};

export default function OptimizationDetails() {
  const [isCopied, setIsCopied] = useState(false);
  const [isReoptimizing, setIsReoptimizing] = useState(false);
  const [originalCode, setOriginalCode] = useState('// 这里是原始反编译代码');
  const [optimizedCode, setOptimizedCode] = useState('// **这里是优化后的代码**function main(){}');
  const [taskId, setTaskId] = useState<string | null>(null);

  useEffect(() => {
    const storedOriginalCode = sessionStorage.getItem('originalCode');
    const storedOptimizedCode = sessionStorage.getItem('optimizedCode');
    if (storedOriginalCode) setOriginalCode(storedOriginalCode);
    if (storedOptimizedCode) setOptimizedCode(storedOptimizedCode);
    sessionStorage.removeItem('originalCode');
    sessionStorage.removeItem('optimizedCode');
  }, []);

  const handleCopy = () => {
    // 移除 **code** 中的 ** 符号
    const sanitizedCode = optimizedCode.replace(/\*\*(.*?)\*\*/g, '$1');
    navigator.clipboard.writeText(sanitizedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReoptimize = useCallback(async () => {
    setIsReoptimizing(true);
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
      setIsReoptimizing(false);
    }
  }, [originalCode]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkTaskStatus = async () => {
      if (taskId) {
        try {
          const response = await fetch(`http://localhost:2525/task_status/${taskId}`);
          const data = await response.json();

          if (data.state === 'SUCCESS') {
            setOptimizedCode(data.result);
            setIsReoptimizing(false);
            setTaskId(null);
          } else if (data.state === 'FAILURE') {
            console.error('Task failed:', data.status);
            alert(`重新优化失败: ${data.status}`);
            setIsReoptimizing(false);
            setTaskId(null);
          }
        } catch (error) {
          console.error('Error checking task status:', error);
          setIsReoptimizing(false);
          setTaskId(null);
        }
      }
    };

    if (taskId) {
      intervalId = setInterval(checkTaskStatus, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [taskId]);

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
              <AnimatedButton onClick={handleReoptimize} disabled={isReoptimizing} className="flex items-center">
                {isReoptimizing ? (
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
              <HighlightedCode code={originalCode} onCodeChange={setOriginalCode} />
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
              <HighlightedCode code={optimizedCode} />
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
      <style jsx global>{`
        .custom-highlight {
          background-color: yellow !important;
          color: black !important;
          padding: 0 4px;
          border-radius: 3px;
          display: inline;
          line-height: 1.2;
        }
        .syntax-highlighter {
          font-family: 'Fira Code', monospace;
          font-size: 14px;
          line-height: 1.5;
          overflow-x: auto;
          background-color: transparent !important;
          width: 100%;
          height: 100%;
        }
        .syntax-highlighter pre {
          background-color: transparent !important;
          padding: 0;
          margin: 0;
          height: 100%;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .hljs {
          background-color: transparent !important;
          padding: 0;
          height: 100%;
        }
        .hljs .custom-highlight,
        .hljs .custom-highlight * {
          background-color: yellow !important;
          color: black !important;
        }
      `}</style>
    </main>
  );
}
