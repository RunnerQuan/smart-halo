"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { FaSearch, FaCopy } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Contract {
  file_name: string;
  date: string | null;
  name: string | null;
}

export default function ContractLibrary() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch('http://172.18.197.84:2525/list_source_files');
        if (!response.ok) {
          throw new Error('无法获取合约列表');
        }
        const data = await response.json();
        console.log('Received contracts data:', data.files_info);
        setContracts(data.files_info);
        setFilteredContracts(data.files_info);
      } catch (error) {
        console.error('获取合约列表时出错:', error);
        setShowError(true);
        setErrorMessage(`获取合约列表时出错: ${error instanceof Error ? error.message : '未知错误'}`);
      }
    };

    fetchContracts();
  }, []);

  useEffect(() => {
    const results = contracts.filter(contract =>
      (contract.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      contract.file_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      alert('地址已复制到剪贴板');
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-gray-900 text-white font-sans">
      <Navbar />
      <div className="mt-24 w-full max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
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
            placeholder="搜索合约名称或地址..."
            className="w-full bg-gray-800 text-white rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-12 text-lg shadow-lg transition duration-300 ease-in-out hover:bg-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-xl" />
        </motion.div>

        {showError && (
          <motion.p
            className="text-red-500 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.p>
        )}

        <motion.div 
          className="bg-gray-800 rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <table className="w-full">
            <thead>
              <tr className="bg-purple-600">
                <th className="px-6 py-4 text-center text-lg font-bold text-white uppercase tracking-wider">合约名称</th>
                <th className="px-6 py-4 text-center text-lg font-bold text-white uppercase tracking-wider">合约地址</th>
                <th className="px-6 py-4 text-center text-lg font-bold text-white uppercase tracking-wider">部署时间</th>
                <th className="px-6 py-4 text-center text-lg font-bold text-white uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract, index) => (
                <motion.tr
                  key={contract.file_name}
                  className="hover:bg-gray-700 cursor-pointer transition-colors duration-150 ease-in-out"
                  onClick={() => handleViewDetails(contract.file_name)}
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="font-semibold text-lg text-purple-300">
                      {contract.name || `合约 ${contract.file_name.substring(0, 6)}...`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="font-mono text-base text-gray-300">{contract.file_name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-gray-300">{contract.date || '未知'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <FaCopy 
                      className="inline-block text-purple-400 hover:text-purple-300 cursor-pointer text-xl transition-colors duration-200"
                      onClick={(e) => copyToClipboard(contract.file_name, e)}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </main>
  );
}
