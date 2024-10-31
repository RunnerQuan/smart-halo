"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { FaRocket, FaCode, FaSearch, FaDownload, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

export default function Help() {
  const steps = [
    { 
      title: "1. 选择优化方式", 
      desc: "根据您的需求，选择和使用合约优化器或链上合约优化",
      icon: <FaRocket className="text-4xl mb-4 text-cyan-500" />
    },
    { 
      title: "2. 输入或上传合约", 
      desc: "输入合约地址或上传合约代码文件",
      icon: <FaCode className="text-4xl mb-4 text-cyan-500" />
    },
    { 
      title: "3. 查看优化结果", 
      desc: "优化完成后，您可以查看优化后的合约代码，了解所做的更改和提升",
      icon: <FaSearch className="text-4xl mb-4 text-cyan-500" />
    },
    { 
      title: "4. 漏洞检测", 
      desc: "优化完成后，您可以对优化后的合约代码进行漏洞检测，确保合约的安全性",
      icon: <FaDownload className="text-4xl mb-4 text-cyan-500" />
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
      <Navbar />

      <motion.div 
        className="mt-24 w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-tech"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          SmartHalo 使用教程
        </motion.h1>

        <motion.p 
          className="text-xl mb-16 text-center max-w-3xl mx-auto text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          SmartHalo 是一款轻量化的智能合约反编译优化工具，旨在帮助开发者提升反编译合约的可读性和准确性。
          按照以下简单步骤，开始您的智能合约反编译输出优化之旅。
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.1 * index,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col items-center mb-4">
                {step.icon}
                <h3 className="text-2xl font-semibold mt-2 text-cyan-300 text-center">{step.title}</h3>
              </div>
              <p className="text-gray-300 text-center">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/custom-optimization" passHref>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              开始优化 <FaChevronRight className="inline-block ml-2" />
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="mt-24 bg-gray-800 p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-cyan-300">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400">SmartHalo 支持哪些区块链平台？</h3>
              <p className="text-gray-300">SmartHalo 支持 Ethereum、BSC、Polygon 等主流区块链平台的智能合约优化。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400">优化过程需要多长时间？</h3>
              <p className="text-gray-300">大多数合约的优化过程只需要几秒钟。对于特别复杂的合约，可能需要稍长一些的时间。</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400">优化后的代码是否安全？</h3>
              <p className="text-gray-300">是的，我们的优化过程保证不会改变合约的功能和安全性。我们的 AI 系统经过严格训练，只进行安全的优化操作。</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
