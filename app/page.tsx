"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedButton from '../components/ui/animated-button';
import Navbar from '../components/Navbar';
import { FaCode, FaQuestionCircle, FaChartLine, FaTools, FaDatabase } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Radar, Doughnut } from 'react-chartjs-2';

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

// 注册组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// 定义通用图表配置
const commonChartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: function(value: number): string {
          return value + '%';
        }
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

// 修改图表的通用配置
const commonTooltipStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  padding: 12,
  bodyFont: {
    size: 14,
    family: 'system-ui'
  },
  titleFont: {
    size: 16,
    weight: 'bold',
    family: 'system-ui'
  },
  bodySpacing: 8,
  boxPadding: 6
};

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

      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-900/20 via-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="mt-32 w-full max-w-7xl mx-auto relative">
        <AnimatedSection>
          <section className="flex flex-col md:flex-row items-start justify-between mt-16">
            <motion.div 
              className="md:w-1/2 text-left relative flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[120px] pointer-events-none" />
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[120px] pointer-events-none" />
              
              <h1 className="text-8xl font-bold mb-6 relative">
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 font-[Cinzel] tracking-wider">
                  SmartHalo
                </span>
              </h1>

              <motion.h2 
                className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                智能合约反编译代码增强与优化工具
              </motion.h2>

              <motion.p 
                className="text-xl text-white mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                SmartHalo - 让智能合约反编译代码更清晰、更准确、更易读
              </motion.p>

              <motion.div 
                className="mb-8 w-full max-w-[400px] mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
                  反编译代码增强和优化的内容
                </h3>
                <div className="space-y-3">
                  <motion.div 
                    className="group relative flex items-center justify-center bg-gradient-to-r from-purple-900/20 to-transparent p-3 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute -inset-2 bg-purple-500/20 blur-3xl group-hover:bg-purple-500/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    </div>
                    <div className="flex items-center w-fit relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mr-4 backdrop-blur-sm relative overflow-hidden group-hover:bg-purple-500/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                        <Image 
                          src="/icons/variable.svg"
                          alt="变量类型"
                          width={36}
                          height={36}
                          className="relative z-10"
                        />
                      </div>
                      <span className="text-xl font-black text-purple-100/90 group-hover:text-purple-200 transition-colors duration-300 relative z-10 font-noto-sans tracking-wider">变量类型</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="group relative flex items-center justify-center bg-gradient-to-r from-pink-900/20 to-transparent p-3 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute -inset-2 bg-pink-500/20 blur-3xl group-hover:bg-pink-500/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    </div>
                    <div className="flex items-center w-fit relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mr-4 backdrop-blur-sm relative overflow-hidden group-hover:bg-pink-500/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                        <Image 
                          src="/icons/attribute.svg"
                          alt="合约属性"
                          width={28}
                          height={28}
                          className="relative z-10"
                        />
                      </div>
                      <span className="text-xl font-black text-pink-100/90 group-hover:text-pink-200 transition-colors duration-300 relative z-10 font-noto-sans tracking-wider">合约属性</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="group relative flex items-center justify-center bg-gradient-to-r from-blue-900/20 to-transparent p-3 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute -inset-2 bg-blue-500/20 blur-3xl group-hover:bg-blue-500/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    </div>
                    <div className="flex items-center w-fit relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mr-4 backdrop-blur-sm relative overflow-hidden group-hover:bg-blue-500/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                        <Image 
                          src="/icons/function.svg"
                          alt="函数边界"
                          width={28}
                          height={28}
                          className="relative z-10"
                        />
                      </div>
                      <span className="text-xl font-black text-blue-100/90 group-hover:text-blue-200 transition-colors duration-300 relative z-10 font-noto-sans tracking-wider">函数边界</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
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
          <section className="mt-32 w-full">
            <motion.h2 
              className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              initial="hidden"
              animate="visible"
              variants={titleAnimation}
            >
              功能模块
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "合约优化器", 
                  icon: <FaChartLine className="w-8 h-8" />, 
                  desc: "输入智能合约反编译代码，选择合约里定的函数进行优化",
                  href: "/custom-optimization" 
                },
                { 
                  title: "链上合约优化", 
                  icon: <FaTools className="w-8 h-8" />, 
                  desc: "输入合约地址，与智能合约平台交互，优化整个智能合约的反编译代码",
                  href: "/contract-optimization" 
                },
                { 
                  title: "智能合约反编译代码库", 
                  icon: <FaDatabase className="w-8 h-8" />, 
                  desc: "浏览和搜索已优化的智能合约反编译代码集合，为用户提供便捷的合约优化查询",
                  href: "/library" 
                }
              ].map((item, index) => (
                <Link href={item.href} key={index}>
                  <motion.div
                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 cursor-pointer group h-[280px] flex flex-col justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      background: "linear-gradient(to bottom right, #1e293b, #0f172a)"
                    }}
                  >
                    <motion.div 
                      className="flex flex-col items-center text-center space-y-6"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full p-4 mb-4 group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        {item.icon}
                      </motion.div>
                      <motion.h3 
                        className="text-2xl font-semibold text-cyan-300 group-hover:text-cyan-400 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-300 group-hover:text-white transition-colors"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.desc}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mt-32 w-full">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              initial="hidden"
              animate="visible"
              variants={titleAnimation}
            >
              优化效果可视化
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* 左侧：SmartHalo vs Dedaub 对比 - 雷达图 */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-cyan-300 text-center">SmartHalo vs Dedaub反编译器效果对比</h3>
                <Radar
                  data={{
                    labels: ['函数边界', '变量类型', '合约属性'],
                    datasets: [
                      {
                        label: 'Dedaub反编译器',
                        data: [50.48, 62.25, 0],
                        backgroundColor: 'rgba(255, 99, 132, 0.3)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                        pointRadius: 5,
                        pointHoverRadius: 7
                      },
                      {
                        label: 'SmartHalo',
                        data: [80.51, 84.26, 68.06],
                        backgroundColor: 'rgba(54, 162, 235, 0.3)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
                        pointRadius: 5,
                        pointHoverRadius: 7
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          callback: (value) => `${value}%`,
                          color: '#FFFFFF',
                          font: {
                            size: 16
                          },
                          backdropColor: 'transparent'
                        },
                        grid: {
                          color: 'rgba(255, 255, 255, 0.3)',
                          circular: true,
                          lineWidth: 1.5
                        },
                        angleLines: {
                          color: 'rgba(255, 255, 255, 0.3)',
                          lineWidth: 1.5
                        },
                        pointLabels: {
                          color: '#FFFFFF',
                          font: {
                            size: 18,
                            weight: 'bold'
                          }
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: '#FFFFFF',
                          font: {
                            size: 16,
                            weight: 'bold'
                          }
                        }
                      },
                      tooltip: {
                        ...commonTooltipStyle,
                        callbacks: {
                          label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>

              {/* 右侧：GPT对比和重入漏洞检测的垂直布局 */}
              <div className="flex flex-col gap-8">
                {/* GPT-3.5 vs GPT-4 对比 - 线图 */}
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-300 text-center">使用GPT-3.5 vs 使用GPT-4o 效果对比</h3>
                  <Line
                    data={{
                      labels: ['函数边界', '变量类型', '合约属性'],
                      datasets: [
                        {
                          label: 'GPT-3.5',
                          data: [78.99, 71.52, 73.13],
                          borderColor: 'rgba(255, 159, 64, 1)',
                          backgroundColor: 'rgba(255, 159, 64, 0.2)',
                          fill: true,
                          tension: 0.4
                        },
                        {
                          label: 'GPT-4o',
                          data: [87.39, 90.39, 80.65],
                          borderColor: 'rgba(75, 192, 192, 1)',
                          backgroundColor: 'rgba(75, 192, 192, 0.2)',
                          fill: true,
                          tension: 0.4
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: true
                          },
                          ticks: {
                            callback: (value) => `${value}%`,
                            color: '#FFFFFF',
                            font: {
                              size: 16
                            },
                            padding: 8
                          },
                          border: {
                            display: true,
                            color: 'rgba(255, 255, 255, 0.3)'
                          }
                        },
                        x: {
                          grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                          },
                          ticks: {
                            color: '#FFFFFF',
                            font: {
                              size: 16
                            }
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          labels: {
                            color: '#FFFFFF',
                            font: {
                              size: 16,
                              weight: 'bold'
                            },
                            padding: 20
                          }
                        },
                        tooltip: {
                          ...commonTooltipStyle,
                          callbacks: {
                            label: function(context) {
                              return `${context.dataset.label}: ${context.raw}%`;
                            }
                          }
                        }
                      },
                      layout: {
                        padding: {
                          top: 20,
                          right: 20
                        }
                      }
                    }}
                  />
                </div>

                {/* 重入漏洞检测性能 - 环图 */}
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-300 text-center">下游任务有效性 - 重入漏洞检测</h3>
                  <div className="relative" style={{ maxHeight: '300px' }}>
                    <Doughnut
                      data={{
                        labels: ['SliSE+SmartHalo 准确率', 'SmartHalo 准确率'],
                        datasets: [
                          {
                            data: [72.16, 80.41],
                            backgroundColor: [
                              'rgba(153, 102, 255, 0.8)',
                              'rgba(54, 162, 235, 0.8)'
                            ],
                            borderColor: [
                              'rgba(153, 102, 255, 1)',
                              'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                            align: 'center',
                            labels: {
                              color: '#FFFFFF',
                              font: {
                                size: 16,
                                weight: 'bold'
                              },
                              padding: 20,
                              boxWidth: 15
                            }
                          },
                          tooltip: {
                            ...commonTooltipStyle,
                            callbacks: {
                              label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 合约攻击识别性能对比 */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700" style={{ height: '500px' }}>
                <h3 className="text-xl font-semibold mb-4 text-cyan-300 text-center">下游任务有效性 - 合约攻击识别</h3>
                <Bar
                  data={{
                    labels: ['BlockWatchdog', 'BlockWatchdog+SmartHalo'],
                    datasets: [
                      {
                        label: '真阳性',
                        data: [15, 18],
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                      },
                      {
                        label: '假阳性',
                        data: [3, 0],
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                      },
                      {
                        label: '准确率',
                        data: [83.33, 100],
                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 3,
                        type: 'line',
                        yAxisID: 'percentage',
                        tension: 0.4
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                      padding: {
                        bottom: 25,
                        top: 20,
                        right: 20,
                        left: 10
                      }
                    },
                    plugins: {
                      legend: {
                        position: 'top' as const,
                        align: 'center' as const,
                        labels: {
                          color: '#FFFFFF',
                          font: {
                            size: 14,
                            weight: 'bold'
                          },
                          padding: 15,
                          boxWidth: 12
                        }
                      },
                      tooltip: {
                        ...commonTooltipStyle,
                        callbacks: {
                          label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            if (context.dataset.yAxisID === 'percentage' || label.includes('率')) {
                              return `${label}: ${value}%`;
                            }
                            return `${label}: ${value}`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 20,
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                          drawBorder: true,
                          drawOnChartArea: true
                        },
                        border: {
                          display: true,
                          color: 'rgba(255, 255, 255, 0.3)',
                          width: 2
                        },
                        ticks: {
                          stepSize: 5,
                          color: '#FFFFFF',
                          font: {
                            size: 14
                          }
                        }
                      },
                      percentage: {
                        position: 'right',
                        beginAtZero: true,
                        max: 100,
                        grid: {
                          display: false
                        },
                        border: {
                          display: true,
                          color: 'rgba(255, 255, 255, 0.3)',
                          width: 2
                        },
                        ticks: {
                          stepSize: 20,
                          callback: (value) => `${value}%`,
                          color: '#FFFFFF',
                          font: {
                            size: 14
                          }
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                          drawBorder: true,
                          drawOnChartArea: true
                        },
                        border: {
                          display: true,
                          color: 'rgba(255, 255, 255, 0.3)',
                          width: 2
                        },
                        ticks: {
                          color: '#FFFFFF',
                          font: {
                            size: 16,
                            weight: 'bold'
                          },
                          padding: 10
                        }
                      }
                    }
                  }}
                />
              </div>

              {/* 整数溢出漏洞检测���能 */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700" style={{ height: '500px' }}>
                <h3 className="text-xl font-semibold mb-4 text-cyan-300 text-center">下游任务有效性 - 整数溢出漏洞检测</h3>
                <Bar
                  data={{
                    labels: ['Mythril', 'Mythril+SmartHalo'],
                    datasets: [
                      {
                        label: '准确率-真阳性',
                        data: [13, 32],
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                      },
                      {
                        label: '准确率-假阳性',
                        data: [5, 2],
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                      },
                      {
                        label: '准确率',
                        data: [72.22, 94.18],
                        backgroundColor: 'rgba(255, 206, 86, 0.8)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 3,
                        type: 'line',
                        yAxisID: 'percentage',
                        tension: 0.4
                      },
                      {
                        label: '召回率-真阳性',
                        data: [13, 32],
                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                      },
                      {
                        label: '召回率-假阴性',
                        data: [37, 18],
                        backgroundColor: 'rgba(153, 102, 255, 0.8)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                      },
                      {
                        label: '召回率',
                        data: [26.00, 64.00],
                        backgroundColor: 'rgba(255, 159, 64, 0.8)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 3,
                        type: 'line',
                        yAxisID: 'percentage',
                        tension: 0.4
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                      padding: {
                        bottom: 25,
                        top: 20,
                        right: 20,
                        left: 10
                      }
                    },
                    plugins: {
                      legend: {
                        position: 'top' as const,
                        align: 'center' as const,
                        labels: {
                          color: '#FFFFFF',
                          font: {
                            size: 14,
                            weight: 'bold'
                          },
                          padding: 15,
                          boxWidth: 12
                        }
                      },
                      tooltip: {
                        ...commonTooltipStyle,
                        callbacks: {
                          label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            if (context.dataset.yAxisID === 'percentage' || (label.includes('率') && label.length == 3)) {
                              return `${label}: ${value}%`;
                            }
                            return `${label}: ${value}`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 40,  // 调整最大值以适应数据
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                          drawOnChartArea: true
                        },
                        ticks: {
                          stepSize: 10,
                          color: '#FFFFFF',
                          font: {
                            size: 14
                          }
                        }
                      },
                      percentage: {
                        position: 'right',
                        beginAtZero: true,
                        max: 100,
                        grid: {
                          display: false
                        },
                        border: {
                          display: true,
                          color: 'rgba(255, 255, 255, 0.3)',
                          width: 2
                        },
                        ticks: {
                          stepSize: 20,
                          callback: (value) => `${value}%`,
                          color: '#FFFFFF',
                          font: {
                            size: 14
                          }
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                          drawBorder: true,
                          drawOnChartArea: true
                        },
                        border: {
                          display: true,
                          color: 'rgba(255, 255, 255, 0.3)',
                          width: 2
                        },
                        ticks: {
                          color: '#FFFFFF',
                          font: {
                            size: 16,
                            weight: 'bold'
                          },
                          padding: 15
                        }
                      }
                    }
                  }}
                />
              </div>
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
              项目特色
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "轻量化的工具设计", desc: "集成大模型的强大能力，避免高开销的模型训练；实现局部代码自定义优化", icon: "/icons/speed.svg" },
                { title: "高精度的反编译码优化与漏洞检测", desc: "函数边界精度超过80%，变量类型准确率超过80%，合约属性准确率提升超过5倍，支持下游任务", icon: "/icons/accurate.svg" },
                { title: "海量的查询数据库与广泛平台支持", desc: "海量同步的链上合约优化反编译码，支持Ethereum BNB等5个主流区块链平台", icon: "/icons/customize.svg" }
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
      </div>

      <footer className="mt-32 text-center text-gray-500">
        <p>&copy; 2024 SmartHalo. 保留所有权利</p>
      </footer>
    </main>
  );
}
