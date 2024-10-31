"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCode, FaUpload, FaRocket, FaLightbulb, FaChartLine, FaShieldAlt, FaSearch } from 'react-icons/fa';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

export default function CustomOptimization() {
  const [contractCode, setContractCode] = useState('');
  const [showError, setShowError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [taskId, setTaskId] = useState<string | null>(null);
  const [contractFunctions, setContractFunctions] = useState<string[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<string>('all_func');

  const handleAnalyzeContract = useCallback(async () => {
    if (!contractCode.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    try {
      const response = await fetch('http://172.18.197.84:2525/extract_functions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: contractCode }),
      });

      if (!response.ok) {
        throw new Error(`网络响应不正常: ${response.status}`);
      }

      const data = await response.json();
      if (data.function_names) {
        // 添加 "优化所有函数" 选项
        const allFunctions = ['all_func', ...data.function_names];
        setContractFunctions(allFunctions);
      }
    } catch (error) {
      console.error('分析合约函数失败:', error);
      alert(`分析合约函数失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }, [contractCode]);

  const handleOptimize = useCallback(async () => {
    if (!contractCode.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (!selectedFunction) {
      alert('请选择要优化的函数');
      return;
    }

    setIsLoading(true);
    try {
      console.log('正在发送优化请求，选中的函数是:', selectedFunction);

      const response = await fetch('http://172.18.197.84:2525/process_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: contractCode,
          func_name: selectedFunction
        }),
      });

      if (!response.ok) {
        throw new Error(`网络响应不正常: ${response.status}`);
      }

      const data = await response.json();
      console.log('收到任务ID:', data.task_id);
      setTaskId(data.task_id);
    } catch (error) {
      console.error('优化过程出错:', error);
      alert(`优化失败: ${error instanceof Error ? error.message : '未知错误'}`);
      setIsLoading(false);
    }
  }, [contractCode, selectedFunction]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkTaskStatus = async () => {
      if (taskId) {
        try {
          // 根据选择的函数使用不同的状态检查端点
          const endpoint = selectedFunction === 'all_func' 
            ? `/process_task_status/${taskId}`
            : `/method_task_status/${taskId}`;
            
          const response = await fetch(`http://172.18.197.84:2525${endpoint}`);
          const data = await response.json();

          if (data.state === 'SUCCESS') {
            console.log('Task completed:', data.result);
            sessionStorage.setItem('originalCode', contractCode);
            sessionStorage.setItem('optimizedCode', data.result);
            setIsLoading(false);
            setTaskId(null);
            router.push('/optimization-details');
          } else if (data.state === 'FAILURE') {
            console.error('Task failed:', data.status);
            alert(`优化失败: ${data.status}`);
            setIsLoading(false);
            setTaskId(null);
          }
        } catch (error) {
          console.error('Error checking task status:', error);
          setIsLoading(false);
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
  }, [taskId, contractCode, router, selectedFunction]);

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
          合约优化器
        </motion.h1>
        <motion.p 
          className="text-xl mb-12 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          输入或上传智能合约反编译输出代码，然后进行合约函数分析，选择指定的合约函数进行优化，最终获取优化后的反编译输出代码
        </motion.p>

        <motion.div 
          className="w-full mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-full h-[400px] bg-gray-800 rounded-lg mb-4 overflow-auto">
            <Editor
              value={contractCode}
              onValueChange={code => setContractCode(code)}
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
            />
          </div>
          <div className="flex justify-between items-center space-x-4">
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
            <AnimatedButton onClick={handleAnalyzeContract} className="flex items-center justify-center">
              <FaSearch className="inline-block mr-2 mb-1" />
              分析合约函数
            </AnimatedButton>
            <select
              className="w-64 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedFunction}
              onChange={(e) => {
                const value = e.target.value;
                console.log('选择的函数:', value);
                setSelectedFunction(value);
              }}
            >
              <option value="all_func">优化所有函数</option>
              {contractFunctions.filter(func => func !== 'all_func').map((func) => (
                <option key={func} value={func}>
                  {func}
                </option>
              ))}
            </select>
            <AnimatedButton onClick={handleOptimize} disabled={isLoading} className="flex items-center justify-center">
              {isLoading ? (
                <>
                  <ClipLoader color="#ffffff" size={20} className="mr-2" />
                  <span>合约优化中...</span>
                </>
              ) : (
                <>
                  <FaRocket className="inline-block mr-2 mb-1" />
                  开始优化
                </>
              )}
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

        <motion.div 
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-12 w-full max-w-3xl mx-auto shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-400 text-center">功能介绍</h2>
          <p className="mb-4 text-gray-300">
            本界面提供自定义优化功能，用户可以直接输入或上传智能合约代码，系统将分析代码并进行智能合约优化。
            优化后，您可以查看优化建议、性能提升和相关信息。该工具帮助开发者和研究人员提高智能合约的质量和效率。
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-8 text-purple-400 text-center">优化亮点</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "智能优化", desc: "基于静态分析和大模型的优化，增强反编译精度", icon: <FaLightbulb className="text-3xl mb-2 text-yellow-400" /> },
              { title: "性能提升", desc: "显著提升变量类型恢复及合约属性识别的准确性", icon: <FaChartLine className="text-3xl mb-2 text-green-400" /> },
              { title: "安全增强", desc: "优化反编译输出，助力漏洞检测", icon: <FaShieldAlt className="text-3xl mb-2 text-blue-400" /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-xl text-center flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {item.icon}
                <h3 className="text-xl font-semibold mb-2 text-cyan-300">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <ClipLoader color="#ffffff" size={50} className="mb-4" />
            <p className="text-xl font-semibold">合约优化中...</p>
            <p className="text-sm text-gray-400 mt-2">请耐心等待，这可能需要一些时间</p>
          </div>
        </div>
      )}
    </main>
  );
}
