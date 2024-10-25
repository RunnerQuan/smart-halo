"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { FaSearch, FaFileContract, FaCopy } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ContractLibrary() {
  const [contracts, setContracts] = useState<string[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch('http://172.18.197.84:2525/list_source_files');
        if (!response.ok) {
          throw new Error('无法获取合约地址列表');
        }
        const data = await response.json();
        setContracts(data.file_names);
        setFilteredContracts(data.file_names);
      } catch (error) {
        console.error('获取合约地址时出错:', error);
        setShowError(true);
        setErrorMessage(`获取合约地址时出错: ${error instanceof Error ? error.message : '未知错误'}`);
      }
    };

    fetchContracts();
  }, []);

  useEffect(() => {
    const results = contracts.filter(contract =>
      contract.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContracts(results);
  }, [searchTerm, contracts]);

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

  const getRandomColor = () => {
    const colors = ['from-purple-400 to-pink-600', 'from-blue-400 to-indigo-600', 'from-green-400 to-teal-600', 'from-yellow-400 to-orange-600', 'from-red-400 to-pink-600'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('地址已复制到剪贴板');
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-gradient-to-b from-[#1A1A1A] to-[#2D2D2D] text-white font-sans">
      <Navbar />
      <div className="mt-24 w-full max-w-7xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          智能合约库
        </motion.h1>

        <motion.div 
          className="mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input 
            type="text"
            placeholder="搜索合约地址..."
            className="w-full bg-gray-800 text-white rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </motion.div>

        {showError && (
          <motion.p
            className="text-red-500 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.p>
        )}

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredContracts.map((address, index) => (
            <motion.div
              key={address}
              className={`bg-gradient-to-br ${getRandomColor()} rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer relative`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleViewDetails(address)}
            >
              <div className="p-8">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <FaFileContract className="text-3xl text-white" />
                  <FaCopy 
                    className="text-2xl text-white cursor-pointer hover:text-yellow-300 transition-colors duration-200" 
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(address);
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">合约名称</h3>
                <p className="text-white font-mono text-lg mb-4 break-all">{address}</p>
                <div className="mt-4">
                  <span className="inline-block bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                    #智能合约
                  </span>
                  <span className="inline-block bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                    #区块链
                  </span>
                </div>
              </div>
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-2 bg-white opacity-50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
