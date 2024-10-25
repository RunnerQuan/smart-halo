"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
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

        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">合约地址</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((address, index) => (
                <tr
                  key={address}
                  className="bg-gray-900 hover:bg-gray-700 cursor-pointer transition-all duration-200"
                  onClick={() => handleViewDetails(address)}
                >
                  <td className="py-4 px-6 text-sm font-medium text-white">{address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
