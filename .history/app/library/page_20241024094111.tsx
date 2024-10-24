"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaSearch, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// 模拟的合约数据
const mockContracts = [
  { address: "0x1234567890123456789012345678901234567890", name: "合约A", description: "这是合约A的描述" },
  { address: "0x2345678901234567890123456789012345678901", name: "合约B", description: "这是合约B的描述" },
  { address: "0x3456789012345678901234567890123456789012", name: "合约C", description: "这是合约C的描述" },
  { address: "0x4567890123456789012345678901234567890123", name: "合约D", description: "这是合约D的描述" },
  { address: "0x5678901234567890123456789012345678901234", name: "合约E", description: "这是合约E的描述" },
  { address: "0x6789012345678901234567890123456789012345", name: "合约F", description: "这是合约F的描述" },
];

export default function ContractLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContracts, setFilteredContracts] = useState(mockContracts);
  const [showNoResult, setShowNoResult] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const results = mockContracts.filter(contract =>
      contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContracts(results);
    setShowNoResult(searchTerm !== '' && results.length === 0);
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm && filteredContracts.length === 0) {
      router.push(`/contract-optimization-details?address=${searchTerm}`);
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

        <div className="mb-8 flex justify-center">
          <input 
            type="text"
            placeholder="搜索合约名称或地址"
            className="w-full max-w-xl bg-gray-800 text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AnimatedButton onClick={handleSearch} className="rounded-l-none">
            <FaSearch className="mr-2" />
            搜索
          </AnimatedButton>
        </div>

        {showNoResult ? (
          <p className="text-center text-gray-400 mt-8">
            当前地址的合约反编译输出尚未优化
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContracts.map((contract, index) => (
              <motion.div
                key={contract.address}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg overflow-hidden relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <h3 className="text-xl font-semibold mb-2 text-cyan-300">{contract.name}</h3>
                <p className="text-white mb-3 font-mono text-sm">{contract.address}</p>
                <p className="text-gray-300 mb-4">{contract.description}</p>
                <Link href={`/contract-optimization-details?address=${contract.address}`} passHref>
                  <AnimatedButton className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-sm">
                    <FaEye className="inline-block mr-2 mb-1" />
                    查看详情
                  </AnimatedButton>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
