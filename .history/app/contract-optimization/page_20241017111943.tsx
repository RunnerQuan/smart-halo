"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from '../../components/ui/animated-button';

const networks = ['Ethereum', 'Bitcoin', 'Binance Smart Chain'];

export default function ContractOptimization() {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [contractAddress, setContractAddress] = useState('');

  const handleSearch = () => {
    // 这里应该是跳转到优化详情页的逻辑
    // 目前我们只是简单地跳转到一个固定的URL
    window.location.href = '/optimization-details';
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        合约地址优化
      </motion.h1>
      <motion.p 
        className="text-xl mb-12 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        输入合约地址，查看反编译输出优化详细信息
      </motion.p>

      <motion.div 
        className="w-full max-w-3xl mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex space-x-4 mb-4">
          <select 
            className="flex-grow bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
          >
            <option value="">选择网络</option>
            {networks.map((network) => (
              <option key={network} value={network}>{network}</option>
            ))}
          </select>
          <input 
            type="text"
            placeholder="0x 请输入合约地址"
            className="flex-grow bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
          <AnimatedButton onClick={handleSearch}>
            搜索
          </AnimatedButton>
        </div>
      </motion.div>

      <motion.div 
        className="bg-gray-800 rounded-lg p-6 mb-12 max-w-3xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">功能介绍</h2>
        <p className="mb-4">
          本界面提供按合约地址进行优化的功能，用户可以输入合约地址并选择相应的区块链网络，系统将提供针对该合约地址的优化建议。
        </p>
        <p>
          优化后，您可以查看该反编译输出的性能提升和相关信息。该工具帮助研究人员根据合约地址优化反编译输出，提高效率。
        </p>
      </motion.div>

      <motion.div 
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-purple-400">示例合约</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { address: "0x1234567890123456789012345678901234567890", info: "合约A的详细信息" },
            { address: "0x5678901234567890123456789012345678901234", info: "合约B的详细信息" },
          ].map((contract, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-lg overflow-hidden relative group"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-lg font-semibold mb-2 text-cyan-300">合约地址:</h3>
              <p className="text-sm text-gray-300 mb-2 font-mono">{contract.address}</p>
              <p className="text-gray-400 mb-4">{contract.info}</p>
              <Link href="/optimization-details" passHref>
                <AnimatedButton className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
                  查看详情
                </AnimatedButton>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
