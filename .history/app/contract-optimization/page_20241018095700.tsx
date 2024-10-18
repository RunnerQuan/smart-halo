"use client";

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaSearch, FaInfoCircle } from 'react-icons/fa';

export default function ContractOptimization() {
  const [contractAddress, setContractAddress] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSearch = () => {
    if (!contractAddress) {
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
          <FaSearch className="inline-block mr-2 mb-1" />
          合约地址优化
        </motion.h1>
        <motion.p 
          className="text-xl mb-12 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          输入合约地址，查看反编译输出优化详细信息
        </motion.p>

        <motion.div 
          className="w-full max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex space-x-4 mb-4">
            <input 
              type="text"
              placeholder="0x 请输入合约地址"
              className="flex-grow bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
            />
            <AnimatedButton onClick={handleSearch} className="flex items-center justify-center">
              <FaSearch className="mr-2" />
              <span>搜索</span>
            </AnimatedButton>
          </div>
          {showError && (
            <motion.p
              className="text-red-500 text-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              请输入合约地址
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
            本界面提供按合约地址进行优化的功能，用户可以输入合约地址并选择相应的区块链网络，系统将提供针对该合约地址的优化建议。
          </p>
          <p className="text-gray-300">
            优化后，您可以查看该反编译输出的性能提升和相关信息。该工具帮助研究人员根据合约地址优化反编译输出，提高效率。
          </p>
        </motion.div>

        <section className="mt-32 text-center w-full">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            示例合约
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { address: "0x1234567890123456789012345678901234567890", info: "合约A的详细信息" },
              { address: "0x5678901234567890123456789012345678901234", info: "合约B的详细信息" },
              { address: "0x9abcdef012345678901234567890123456789012", info: "合约C的详细信息" },
              { address: "0xfabcdef123456789012345678901234567890123", info: "合约D的详细信息" }
            ].map((contract, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg overflow-hidden relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <h3 className="text-xl font-semibold mb-2 text-cyan-300">合约地址:</h3>
                <p className="text-white mb-4 font-mono text-base">{contract.address}</p>
                <p className="text-white mb-4 text-lg">{contract.info}</p>
                <Link href="/optimization-details" passHref>
                  <AnimatedButton className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
                    查看详情
                  </AnimatedButton>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
