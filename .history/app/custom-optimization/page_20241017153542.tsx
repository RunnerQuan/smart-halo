"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCode, FaUpload, FaRocket, FaInfoCircle } from 'react-icons/fa';

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
      <div className="mt-24 w-full max-w-7xl mx-auto">
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
          className="w-full max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <textarea 
            className="w-full h-64 bg-gray-800 text-white rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="在此输入智能合约代码..."
            value={contractCode}
            onChange={(e) => setContractCode(e.target.value)}
          ></textarea>
          <div className="flex justify-between">
            <label className="bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
              <FaUpload className="inline-block mr-2 mb-1" />
              上传合约文件
              <input type="file" className="hidden" onChange={(e) => {
                // 这里应该是处理文件上传的逻辑
                console.log("File uploaded:", e.target.files[0]);
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
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-12 max-w-3xl mx-auto shadow-lg"
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
          <h2 className="text-2xl font-semibold mb-6 text-center text-purple-400">优化示例</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "示例合约A", desc: "展示了常见的优化模式" },
              { name: "示例合约B", desc: "演示了高级优化技巧" },
            ].map((example, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg overflow-hidden relative group text-center"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-lg font-semibold mb-2 text-cyan-300">{example.name}</h3>
                <p className="text-gray-400 mb-4">{example.desc}</p>
                <Link href="/optimization-details" passHref>
                  <AnimatedButton className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
                    <FaInfoCircle className="inline-block mr-2 mb-1" />
                    查看详情
                  </AnimatedButton>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
