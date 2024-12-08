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
              className="md:w-1/2 text-left relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[120px] pointer-events-none" />
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[120px] pointer-events-none" />
              
              <h1 className="text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 relative">
                SmartHalo
              </h1>
              <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                智能合约反编译代码增强与优化工具
              </h2>
              <p className="text-xl text-white mb-8 max-w-xl">
                SmartHalo - 让智能合约反编译输出更清晰、更准确、更易读
              </p>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center text-white">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  通过静态分析和大语言模型的结合，有效解决变量类型恢复、函数边界识别等问题
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
                  desc: "输入智能合约反编译代码，选择合约里指定的函数进行优化",
                  href: "/custom-optimization" 
                },
                { 
                  title: "链上合约优化", 
                  icon: <FaTools className="w-8 h-8" />, 
                  desc: "输入合约地址，与智能合约平台交互，优化整个智能合约的反编译代码",
                  href: "/contract-optimization" 
                },
                { 
                  title: "智能合约库", 
                  icon: <FaDatabase className="w-8 h-8" />, 
                  desc: "浏览和搜索已优化的智能合约集合，为用户提供便捷的合约优化查询",
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
              测试结果
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
                {/* GPT-3.5 vs GPT-4 对比 - 折线图 */}
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

                {/* 重入漏洞检测性能 - 环形图 */}
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

              {/* 整数溢出漏洞检测性能 */}
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
                { title: "轻量化设计", desc: "采用轻量化设计，运行高效、资源占用低；并且可以集成不同的大型语言模型，能够适应不同的应用场景", icon: "/icons/speed.svg" },
                { title: "精准优化反编译输出", desc: "结合静态分析和大型语言模型，能够更准确地识别函数边界、变量类型和合约属性，著提升反编译输出准确性和可读性", icon: "/icons/accurate.svg" },
                { title: "多维度依赖关系分析", desc: "利用依赖关系（控制流依赖、类型依赖和状态依赖）构建合约依赖图，更全面地捕捉代码中的关键语义信息", icon: "/icons/customize.svg" }
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
        <p>&copy; 2024 SmartHalo. 保留所有权利。</p>
      </footer>
    </main>
  );
}
