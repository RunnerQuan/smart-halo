"use client";

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import ContractCard from '@/components/ContractCard';
import Navbar from '@/components/Navbar';
import AnimatedSection from '@/components/AnimatedSection';

interface Contract {
  file_name: string;
  date: string | null;
  name: string | null;
}

export default function Library() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch('http://172.18.197.84:2525/list_source_files');
        if (!response.ok) {
          throw new Error('无法获取合约列表');
        }
        const data = await response.json();
        setContracts(data.files_info);
        setLoading(false);
      } catch (error) {
        console.error('获取合约列表时出错:', error);
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const filteredContracts = contracts.filter(contract => 
    contract.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contract.name && contract.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white">
      <Navbar />
      
      <div className="mt-24 w-full max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              智能合约库
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              浏览和搜索我们提前优化好的智能合约集合
            </motion.p>
          </div>

          <div className="mb-8">
            <input
              type="text"
              placeholder="请输入合约名称或合约地址..."
              className="w-full max-w-xl mx-auto block px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContracts.map((contract, index) => (
                <ContractCard key={contract.file_name} contract={contract} index={index} />
              ))}
            </div>
          )}
        </AnimatedSection>
      </div>
    </main>
  );
}
