"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCode, FaUpload, FaRocket, FaLightbulb, FaChartLine, FaShieldAlt } from 'react-icons/fa';

export default function CustomOptimization() {
  const [contractCode, setContractCode] = useState('');
  const [showError, setShowError] = useState(false);

  const handleOptimize = () => {
    if (!contractCode.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    // 这里应该是跳转到优化详情页的逻辑
    window.location.href = '/optimization-details';
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
          输入或上传智能合约代码，获取优化建议和详细信息
        </motion.p>

        <motion.div 
          className="w-full mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <textarea 
            className="w-full h-[400px] bg-gray-800 text-white rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="在此输入智能合约代码..."
            value={contractCode}
            onChange={(e) => setContractCode(e.target.value)}
          ></textarea>
          <div className="flex justify-between">
            <label className="bg-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors font-bold">
              <FaUpload className="inline-block mr-2 mb-1" />
              上传合约文件
              <input type="file" className="hidden" onChange={(e) => {
                // 这里应该是处理文件上传的逻辑
                console.log("File uploaded:", e.target.files?.[0]);
              }} />
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
              { title: "智能分析", desc: "AI驱动的代码分析，快速识别优化点", icon: <FaLightbulb className="text-3xl mb-2 text-yellow-400" /> },
              { title: "性能提升", desc: "显著降低Gas消耗，提高合约执行效率", icon: <FaChartLine className="text-3xl mb-2 text-green-400" /> },
              { title: "安全增强", desc: "自动检测并修复潜在的安全漏洞", icon: <FaShieldAlt className="text-3xl mb-2 text-blue-400" /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-xl text-center"
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
