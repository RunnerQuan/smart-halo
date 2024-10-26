"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedButton from '../components/ui/animated-button';
import Navbar from '../components/Navbar';
import { FaCode, FaQuestionCircle } from 'react-icons/fa';

const IconCloud = lazy(() => import('../components/ui/icon-cloud'));

const titleAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

interface Contract {
  file_name: string;
  date: string | null;
  name: string | null;
}

export default function Home() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch('http://172.18.197.84:2525/list_source_files');
        if (!response.ok) {
          throw new Error('无法获取合约列表');
        }
        const data = await response.json();
        setContracts(data.files_info.slice(0, 9)); // 只取前9个合约
      } catch (error) {
        console.error('获取合约列表时出错:', error);
      }
    };

    fetchContracts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
      <Navbar />

      <div className="mt-40 w-full max-w-7xl mx-auto">
        <AnimatedSection>
          <section className="flex flex-col md:flex-row items-start justify-between mt-16">
            <motion.div 
              className="md:w-1/2 text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-tight">
                SmartHalo 智能合约反编译输出优化工具
              </h1>
              <p className="text-xl text-white mb-8 max-w-xl">
                SmartHalo - 让智能合约反编译输出更清晰、更准确、更易读
              </p>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center text-white">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  通过静态分析和大语言模型的结合，有效解决变量类型恢复、方法边界识别等问题
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  优化现有反编译器输出，帮助用户更好地理解智能合约字节码
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  支持代码重编译，验证输出准确性，确保反编译输出优化结果与原始程序行为一致
                </li>
              </ul>
              <div className="flex space-x-8">
                <Link href="/custom-optimization" passHref>
                  <AnimatedButton>
                    <FaCode className="inline-block mr-2 mb-1" />
                    开始优化
                  </AnimatedButton>
                </Link>
                <Link href="/help" passHref>
                  <AnimatedButton>
                    <FaQuestionCircle className="inline-block mr-2 mb-1" />
                    使用教程
                  </AnimatedButton>
                </Link>
              </div>
            </motion.div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex items-center justify-center" style={{ marginLeft: '50px' }}>
              <Suspense fallback={
                <div className="w-full h-[400px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              }>
                <IconCloud />
              </Suspense>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mt-32 w-full flex flex-col items-center">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              initial="hidden"
              animate="visible"
              variants={titleAnimation}
            >
              工具特色
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "轻量化设计", desc: "采用轻量化设计，运行高效、资源占用低，能够快速处理智能合约的反编译和优化任务", icon: "/icons/speed.svg" },
                { title: "精准优化反编译输出", desc: "结合静态分析和大语言模型，显著提升反编译输出的准确性和可读性", icon: "/icons/accurate.svg" },
                { title: "深度智能合约分析", desc: "能够识别复杂的智能合约结构，恢复合约中丢失的关键属性，尤其适用于安全分析任务", icon: "/icons/customize.svg" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                >
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full p-4 inline-block mb-6">
                    <Image src={item.icon} alt={item.title} width={40} height={40} className="filter invert" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-cyan-300">{item.title}</h3>
                  <p className="text-white">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mt-32 text-center w-full flex flex-col items-center">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              initial="hidden"
              animate="visible"
              variants={titleAnimation}
            >
              示例合约
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {contracts.map((contract, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-md overflow-hidden relative group"
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

                  <h3 className="text-lg font-semibold mb-2 text-cyan-300 truncate">{contract.name || `合约 ${contract.file_name.substring(0, 6)}...`}</h3>
                  
                  {/* 合约地址背景动画 */}
                  <motion.div 
                    className="bg-black/20 rounded-lg p-2 mb-3 overflow-hidden relative"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(6, 182, 212, 0)",
                        "0 0 0 4px rgba(6, 182, 212, 0.1)",
                        "0 0 0 0 rgba(6, 182, 212, 0)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <p className="text-white font-mono text-xs whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">{contract.file_name}</p>
                  </motion.div>

                  <p className="text-gray-400 mb-4 text-xs">{contract.date || '未知时间'}</p>
                  
                  <Link href={{
                    pathname: '/contract-optimization-details',
                    query: { address: contract.file_name }
                  }} passHref>
                    <AnimatedButton className="w-auto px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/50">
                      查看详情
                    </AnimatedButton>
                  </Link>

                  {/* 底部动画线条 */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"
                    animate={{
                      width: ["0%", "100%", "0%"],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>

      <footer className="mt-32 text-center text-gray-500">
        <p>&copy; 2024 SmartHalo. 保留所有权利。</p>
      </footer>
    </main>
  );
}
