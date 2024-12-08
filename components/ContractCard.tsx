"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedButton from './ui/animated-button';

interface Contract {
  file_name: string;
  date: string | null;
  name: string | null;
}

interface ContractCardProps {
  contract: Contract;
  index: number;
}

export default function ContractCard({ contract, index }: ContractCardProps) {
  return (
    <motion.div
      key={index}
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-md overflow-hidden relative group flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
    >
      {/* 背景动画效果 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"
        animate={{
          background: [
            "linear-gradient(to right, rgba(6, 182, 212, 0.05), rgba(59, 130, 246, 0.05))",
            "linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(6, 182, 212, 0.05))",
            "linear-gradient(to right, rgba(6, 182, 212, 0.05), rgba(59, 130, 246, 0.05))",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* 顶部闪烁的点 */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-500"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <h3 className="text-xl font-bold mb-3 text-cyan-300 truncate w-full text-center">
        {contract.name || `合约 ${contract.file_name.substring(0, 6)}...`}
      </h3>
      
      {/* 合约地址背景动画 */}
      <motion.div 
        className="bg-black/20 rounded-lg p-3 mb-4 w-full max-w-[90%] mx-auto overflow-hidden relative"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(6, 182, 212, 0)",
            "0 0 0 4px rgba(6, 182, 212, 0.1)",
            "0 0 0 0 rgba(6, 182, 212, 0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-white font-mono text-xs whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700 text-center">
          {contract.file_name}
        </p>
      </motion.div>

      <p className="text-gray-400 mb-5 text-sm text-center">
        {contract.date || '未知时间'}
      </p>
      
      <div className="flex justify-center w-full">
        <Link href={{
          pathname: '/contract-optimization-details',
          query: { address: contract.file_name }
        }} passHref>
          <AnimatedButton className="w-auto px-8 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-base rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/50">
            查看详情
          </AnimatedButton>
        </Link>
      </div>

      {/* 底部动画线条 */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
        animate={{
          width: ["0%", "100%", "0%"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
} 