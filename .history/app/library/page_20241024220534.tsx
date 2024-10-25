"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ContractLibrary() {
  const [contracts, setContracts] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // 向后端请求合约地址列表
    const fetchContracts = async () => {
      try {
        const response = await fetch('http://172.18.197.84:2525/list_source_files');
        if (!response.ok) {
          throw new Error('无法获取合约地址列表');
        }
        const data = await response.json();
        setContracts(data.file_names);
      } catch (error) {
        console.error('获取合约地址时出错:', error);
        setShowError(true);
        setErrorMessage(`获取合约地址时出错: ${error instanceof Error ? error.message : '未知错误'}`);
      }
    };

    fetchContracts();
  }, []);

  const handleViewDetails = async (address: string) => {
    try {
      const response = await fetch(`http://172.18.197.84:2525/get_code/${address}`);
      if (!response.ok) {
        throw new Error('无法获取合约详情');
      }
      const data = await response.json();
      sessionStorage.setItem('sourceCode', data.source_code);
      sessionStorage.setItem('decompileCode', data.decompiled_code);
      sessionStorage.setItem('optimizedCode', data.result_code);
      router.push(`/contract-optimization-details?address=${address}`);
    } catch (error) {
      console.error('获取合约详情时出错:', error);
      setShowError(true);
      setErrorMessage(`获取合约详情时出错: ${error instanceof Error ? error.message : '未知错误'}`);
    }
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
          合约库
        </motion.h1>

        {showError && (
          <p className="text-center text-red-500 mt-8">
            {errorMessage}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map((address, index) => (
            <motion.div
              key={address}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg overflow-hidden relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <h3 className="text-xl font-semibold mb-2 text-cyan-300">合约地址:</h3>
              <p className="text-white mb-3 font-mono text-sm">{address}</p>
              <AnimatedButton onClick={() => handleViewDetails(address)} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-sm">
                <FaEye className="inline-block mr-2 mb-1" />
                查看详情
              </AnimatedButton>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
