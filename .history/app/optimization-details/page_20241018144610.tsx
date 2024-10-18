// "use client";

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import AnimatedButton from '../../components/ui/animated-button';
// import Navbar from '../../components/Navbar';
// import { FaCopy, FaSync } from 'react-icons/fa';

// export default function OptimizationDetails() {
//   const [isCopied, setIsCopied] = useState(false);
//   const [originalCode, setOriginalCode] = useState('// 这里是原始反编译代码');
//   const [optimizedCode, setOptimizedCode] = useState('// 这里是优化后的代码');

//   const handleCopy = () => {
//     navigator.clipboard.writeText(optimizedCode);
//     setIsCopied(true);
//     setTimeout(() => setIsCopied(false), 2000);
//   };

//   const handleReoptimize = () => {
//     // 这里应该是重新优化的逻辑
//     console.log("重新优化");
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
//       <Navbar />
//       <div className="mt-24 w-full max-w-7xl mx-auto">
//         <motion.h1 
//           className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           优化详情
//         </motion.h1>

//         <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
//           <motion.div 
//             className="flex-1 bg-gray-800 rounded-lg p-6 relative"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <h2 className="text-2xl font-semibold mb-4 text-purple-400 text-center">反编译代码</h2>
//             <textarea
//               className="w-full h-[calc(100vh-300px)] bg-gray-900 text-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               value={originalCode}
//               onChange={(e) => setOriginalCode(e.target.value)}
//             ></textarea>
//             <div className="absolute bottom-4 right-4">
//               <AnimatedButton onClick={handleReoptimize} className="flex items-center">
//                 <FaSync className="mr-2" />
//                 重新优化
//               </AnimatedButton>
//             </div>
//           </motion.div>

//           <motion.div 
//             className="flex-1 bg-gray-800 rounded-lg p-6"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <h2 className="text-2xl font-semibold mb-4 text-purple-400 text-center">优化后代码</h2>
//             <div className="relative">
//               <pre className="w-full h-[calc(100vh-300px)] bg-gray-900 text-gray-300 p-4 rounded-lg overflow-auto">
//                 {optimizedCode}
//               </pre>
//               <div className="absolute bottom-4 right-4">
//                 <AnimatedButton onClick={handleCopy} className="flex items-center">
//                   <FaCopy className="mr-2" />
//                   一键复制
//                 </AnimatedButton>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {isCopied && (
//           <motion.div 
//             className="fixed bottom-8 right-8 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//           >
//             优化后代码已复制到剪贴板
//           </motion.div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../components/ui/animated-button';
import Navbar from '../../components/Navbar';
import { FaCopy, FaSync } from 'react-icons/fa';

export default function OptimizationDetails() {
  const [isCopied, setIsCopied] = useState(false);
  const [originalCode, setOriginalCode] = useState('// 这里是原始反编译代码');
  const [optimizedCode, setOptimizedCode] = useState('// 这里是优化后的代码');

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReoptimize = () => {
    // 这里应该是重新优化的逻辑
    console.log("重新优化");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#1A1A1A] text-white font-sans">
      <Navbar />
      <div className="mt-24 w-full max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          优化详情
        </motion.h1>

        <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <motion.div 
            className="flex-1 bg-gray-800 rounded-lg p-6 relative flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-400 text-center">反编译代码</h2>
            <div className="relative flex-1">
              <textarea
                className="w-full h-full bg-gray-900 text-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={originalCode}
                onChange={(e) => setOriginalCode(e.target.value)}
              ></textarea>
              <div className="absolute bottom-4 right-4">
                <AnimatedButton onClick={handleReoptimize} className="flex items-center">
                  <FaSync className="mr-2" />
                  重新优化
                </AnimatedButton>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 bg-gray-800 rounded-lg p-6 relative flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-400 text-center">优化后代码</h2>
            <div className="relative flex-1">
              <pre className="w-full h-full bg-gray-900 text-gray-300 p-4 rounded-lg overflow-auto">
                {optimizedCode}
              </pre>
              <div className="absolute bottom-4 right-4">
                <AnimatedButton onClick={handleCopy} className="flex items-center">
                  <FaCopy className="mr-2" />
                  一键复制
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        </div>

        {isCopied && (
          <motion.div 
            className="fixed bottom-8 right-8 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            优化后代码已复制到剪贴板
          </motion.div>
        )}
      </div>
    </main>
  );
}
