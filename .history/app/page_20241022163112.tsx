// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Suspense, lazy } from 'react';
// import AnimatedSection from '../components/AnimatedSection';
// import AnimatedButton from '../components/ui/animated-button';
// import Navbar from '../components/Navbar';
// import { FaCode, FaQuestionCircle } from 'react-icons/fa';

// const IconCloud = lazy(() => import('../components/ui/icon-cloud'));

// const titleAnimation = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { 
//       duration: 0.6, 
//       ease: "easeOut" 
//     } 
//   }
// };

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
//       <Navbar />

//       <div className="mt-16 w-full max-w-7xl mx-auto">
//         <AnimatedSection>
//           <section className="flex flex-col md:flex-row items-start justify-between mt-16">
//             <motion.div 
//               className="md:w-1/2 text-left"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             >
//               <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-tight">
//                 SmartHalo 智能合约反编译输出优化工具
//               </h1>
//               <p className="text-xl text-white mb-8 max-w-xl">
//                 SmartHalo - 让智能合约反编译输出更清晰、更准确、更易读
//               </p>
//               <ul className="mb-8 space-y-2">
//                 <li className="flex items-center text-white">
//                   <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
//                   通过静态分析和大语言模型的结合，有效解决变量类型恢复、方法边界识别等问题
//                 </li>
//                 <li className="flex items-center text-white">
//                   <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
//                   优化现有反编译器输出，帮助用户更好地理解智能合约字节码
//                 </li>
//                 <li className="flex items-center text-white">
//                   <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
//                   支持代码重编译，验证输出准确性，确保反编译输出优化结果与原始程序行为一致
//                 </li>
//               </ul>
//               <div className="flex space-x-8">
//                 <Link href="/custom-optimization" passHref>
//                   <AnimatedButton>
//                     <FaCode className="inline-block mr-2 mb-1" />
//                     开始优化
//                   </AnimatedButton>
//                 </Link>
//                 <Link href="/help" passHref>
//                   <AnimatedButton>
//                     <FaQuestionCircle className="inline-block mr-2 mb-1" />
//                     使用教程
//                   </AnimatedButton>
//                 </Link>
//               </div>
//             </motion.div>
//             <div className="md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
//               <Suspense fallback={
//                 <div className="w-full h-[400px] flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
//                 </div>
//               }>
//                 <IconCloud />
//               </Suspense>
//             </div>
//           </section>
//         </AnimatedSection>

//         <AnimatedSection>
//           <section className="mt-32 w-full flex flex-col items-center">
//             <motion.h2 
//               className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
//               initial="hidden"
//               animate="visible"
//               variants={titleAnimation}
//             >
//               工具特色
//             </motion.h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//               {[
//                 { title: "轻量化设计", desc: "采用轻量化设计，运行高效、资源占用低，能够快速处理智能合约的反编译和优化任务", icon: "/icons/speed.svg" },
//                 { title: "精准优化反编译输出", desc: "结合静态分析和大语言模型，显著提升反编译输出的准确性和可读性", icon: "/icons/accurate.svg" },
//                 { title: "深度智能合约分析", desc: "能够识别复杂的智能合约结构，恢复合约中丢失的关键属性，尤其适用于安全分析任务", icon: "/icons/customize.svg" }
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 text-center"
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.2 }}
//                   whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
//                 >
//                   <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full p-4 inline-block mb-6">
//                     <Image src={item.icon} alt={item.title} width={40} height={40} className="filter invert" />
//                   </div>
//                   <h3 className="text-2xl font-semibold mb-4 text-cyan-300">{item.title}</h3>
//                   <p className="text-white">{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </section>
//         </AnimatedSection>

//         <AnimatedSection>
//           <section className="mt-32 text-center w-full flex flex-col items-center">
//             <motion.h2 
//               className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
//               initial="hidden"
//               animate="visible"
//               variants={titleAnimation}
//             >
//               示例合约
//             </motion.h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {[
//                 { address: "0x1234567890123456789012345678901234567890", info: "合约A的详细信息" },
//                 { address: "0x5678901234567890123456789012345678901234", info: "合约B的详细信息" },
//                 { address: "0x9abcdef012345678901234567890123456789012", info: "合约C的详细信息" },
//                 { address: "0xfabcdef123456789012345678901234567890123", info: "合约D的详细信息" }
//               ].map((contract, index) => (
//                 <motion.div
//                   key={index}
//                   className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg overflow-hidden relative group"
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ scale: 1.03 }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
//                   <h3 className="text-xl font-semibold mb-2 text-cyan-300">合约地址:</h3>
//                   <p className="text-white mb-4 font-mono text-base">{contract.address}</p>
//                   <p className="text-white mb-4 text-lg">{contract.info}</p>
//                   <Link href="/optimization-details" passHref>
//                     <AnimatedButton className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
//                       查看详情
//                     </AnimatedButton>
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           </section>
//         </AnimatedSection>
//       </div>

//       <footer className="mt-32 text-center text-gray-500">
//         <p>&copy; 2024 SmartHalo. 保留所有权利。</p>
//       </footer>
//     </main>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense, lazy } from 'react';
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

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-8 pt-24 bg-[#1A1A1A] text-white font-sans">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto flex-grow flex flex-col justify-center"> 
        {/* 保持标题和IconCloud垂直居中 */}
        <AnimatedSection>
          <section className="flex flex-col md:flex-row items-start justify-center">
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
            <div className="md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
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
      </div>

      {/* 工具特色 Section */}
      <div className="w-full max-w-7xl mx-auto">
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
              {[{
                title: "轻量化设计", desc: "采用轻量化设计，运行高效、资源占用低，能够快速处理智能合约的反编译和优化任务", icon: "/icons/speed.svg"
              }, {
                title: "精准优化反编译输出", desc: "结合静态分析和大语言模型，显著提升反编译输出的准确性和可读性", icon: "/icons/accurate.svg"
              }, {
                title: "深度智能合约分析", desc: "能够识别复杂的智能合约结构，恢复合约中丢失的关键属性，尤其适用于安全分析任务", icon: "/icons/customize.svg"
              }].map((item, index) => (
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

        {/* 示例合约 Section */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[{
                address: "0x1234567890123456789012345678901234567890", info: "合约A的详细信息"
              }, {
                address: "0x5678901234567890123456789012345678901234", info: "合约B的详细信息"
              }, {
                address: "0x9abcdef012345678901234567890123456789012", info: "合约C的详细信息"
              }, {
                address: "0xfabcdef123456789012345678901234567890123", info: "合约D的详细信息"
              }].map((contract, index) => (
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
        </AnimatedSection>
      </div>

      <footer className="mt-32 text-center text-gray-500">
        <p>&copy; 2024 SmartHalo. 保留所有权利。</p>
      </footer>
    </main>
  );
}
