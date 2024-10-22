"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCode, FaUpload, FaRocket, FaLightbulb, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';

export default function CustomOptimization() {
  const [contractCode, setContractCode] = useState('');
  const [showError, setShowError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const router = useRouter();
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // 连接到WebSocket服务器
    const newSocket = io('http://172.18.197.84:6666', {
      transports: ['websocket'],
      upgrade: false,
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('response', (data) => {
      console.log('Received response:', data);
      if (data.processed_code) {
        sessionStorage.setItem('originalCode', contractCode);
        sessionStorage.setItem('optimizedCode', data.processed_code);
        setIsLoading(false);
        router.push('/optimization-details');
      }
    });

    newSocket.on('progress', (data) => {
      console.log('Progress:', data.message);
      setProgress(data.message);
    });

    newSocket.on('error', (error) => {
      console.error('WebSocket error:', error);
      alert(`优化过程中出现错误: ${error.error}`);
      setIsLoading(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleOptimize = useCallback(() => {
    if (!contractCode.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (socket) {
      setIsLoading(true);
      setProgress('开始处理代码...');
      console.log('Sending request to backend with code:', contractCode);  // 添加这行
      socket.emit('process_code', { code: contractCode });
    } else {
      console.error('Socket is not connected');  // 添加这行
    }
  }, [contractCode, socket]);

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
            <AnimatedButton onClick={handleOptimize} disabled={isLoading}>
              {isLoading ? (
                <span>处理中...</span>
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
          {isLoading && (
            <motion.p
              className="text-green-500 text-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {progress}
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
            本界面提供自定义优化功能，用户可以直接输入或上传智能合约代码，系统将分析代码并提供优化建议。
          </p>
          <p className="text-gray-300">
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
              { title: "智能优化", desc: "基于依赖分析和大模型的优化，增强反编译精度", icon: <FaLightbulb className="text-3xl mb-2 text-yellow-400" /> },
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
    </main>
  );
}
