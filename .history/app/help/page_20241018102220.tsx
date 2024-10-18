"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { FaUpload, FaCode, FaSearch, FaDownload } from 'react-icons/fa';

export default function Help() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
      <Navbar />

      <motion.div 
        className="mt-24 w-full max-w-4xl mx-auto"
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
          SmartHalo
        </motion.h1>

        <motion.h2 
          className="text-3xl font-semibold mb-8 text-cyan-300 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          使用指南
        </motion.h2>

        <div className="space-y-8">
          {[
            { 
              title: "上传合约", 
              desc: "将您的智能合约文件上传到我们的平台。支持多种文件格式，包括.sol, .json等。",
              icon: <FaUpload className="text-4xl mb-4 text-cyan-500" />
            },
            { 
              title: "选择优化选项", 
              desc: "根据您的需求，选择适合的优化选项。我们提供多种优化策略，以满足不同场景的需求。",
              icon: <FaCode className="text-4xl mb-4 text-cyan-500" />
            },
            { 
              title: "分析与优化", 
              desc: "我们的系统将自动分析您的合约，并应用选定的优化策略。这个过程通常只需要几秒钟。",
              icon: <FaSearch className="text-4xl mb-4 text-cyan-500" />
            },
            { 
              title: "下载优化结果", 
              desc: "优化完成后，您可以下载优化后的合约代码。我们还会提供详细的优化报告，说明所做的更改。",
              icon: <FaDownload className="text-4xl mb-4 text-cyan-500" />
            }
          ].map((step, index) => (
            <motion.div 
              key={index} 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg"
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
              <p className="text-white text-center">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
