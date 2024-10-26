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
  const [editableCode, setEditableCode] = useState(code);
  const preRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const syncScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = event.target.value;
    setEditableCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = event.currentTarget.selectionStart;
      const end = event.currentTarget.selectionEnd;

      // 插入两个空格作为缩进
      const newCode = editableCode.substring(0, start) + '  ' + editableCode.substring(end);
      setEditableCode(newCode);
      if (onCodeChange) {
        onCodeChange(newCode);
      }

      // 移动光标到插入的空格之后
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  useEffect(() => {
    if (preRef.current) {
      preRef.current.innerHTML = highlightSolidityCode(editableCode);
    }
  }, [editableCode]);

  return (
    <div className="code-editor-container">
      <pre
        ref={preRef}
        className="hljs language-solidity code-content"
        aria-hidden="true"
      />
      <textarea
        ref={textareaRef}
        value={editableCode}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onScroll={syncScroll}
        className="code-textarea"
        spellCheck="false"
      />
    </div>
  );
};

export default function OptimizationDetails() {
  const [isCopied, setIsCopied] = useState(false);
  const [isReoptimizing, setIsReoptimizing] = useState(false);
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
            setIsReoptimizing(false);
            setTaskId(null);
          } else if (data.state === 'FAILURE') {
            console.error('Task failed:', data.status);
            alert(`优化失败: ${data.status}`);
            setIsReoptimizing(false);
            setTaskId(null);
          } else {
            // 如果任务还在进行中，继续轮询
            setTimeout(checkTaskStatus, 2000);
          }
        } catch (error) {
          console.error('Error checking task status:', error);
          setIsReoptimizing(false);
          setTaskId(null);
        }
      };

      checkTaskStatus();
    }
  }, [taskId]);

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
        .code-editor-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .code-editor-container pre,
        .code-editor-container textarea {
          font-family: 'Fira Code', monospace;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
          padding: 10px;
          white-space: pre-wrap;
          word-break: break-all;
          overflow: auto;
        }
        .code-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-color: transparent !important;
        }
        .code-textarea {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          resize: none;
          border: none;
          background: transparent;
          color: transparent;
          caret-color: white;
          outline: none;
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
