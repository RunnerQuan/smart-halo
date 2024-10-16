import Image from "next/image";
import Link from "next/link";
import AnimatedSection from '../components/AnimatedSection';
import AnimatedNavLink from '../components/AnimatedNavLink';
import IconCloud from '../components/ui/icon-cloud';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-[#121212] text-white font-song">
      <nav className="fixed top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/icons/logo.png" alt="SmartHalo Logo" width={40} height={40} />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <AnimatedNavLink href="/">主页</AnimatedNavLink>
            <AnimatedNavLink href="/contract-optimization">合约地址优化</AnimatedNavLink>
            <AnimatedNavLink href="/custom-optimization">自定义优化</AnimatedNavLink>
            <AnimatedNavLink href="/tutorials">使用教程</AnimatedNavLink>
          </div>
        </div>
      </nav>

      <div className="mt-20 w-full max-w-7xl mx-auto">
        <AnimatedSection>
          <section className="flex flex-col md:flex-row items-center justify-between mt-32">
            <div className="md:w-1/2 text-left">
              <h1 className="text-5xl font-bold mb-6 text-purple-300 leading-tight">
                SmartHalo 智能合约反编译输出优化工具
              </h1>
              <p className="text-xl text-white mb-8 max-w-xl">
                SmartHalo - 让您的智能合约代码更清晰、更易读、更安全
              </p>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  使用我们经验丰富的审计团队帮助您自信地启动项目
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  使用我们先进的智能合约分析和监控技术保护您的Web3操作
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  反编译和分析合约 - 即使没有源代码或ABI - 以Solidity风格的可读格式查看
                </li>
              </ul>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition transform hover:scale-105">
                开始优化
              </button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
              <IconCloud />
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            {[
              { title: "快速优化", desc: "在几秒钟内完成智能合约的反编译和优化", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { title: "安全可靠", desc: "采用先进的安全措施保护您的合约代码", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
              { title: "灵活定制", desc: "根据您的需求自定义优化参数和输出格式", icon: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-gray-800 rounded-lg">
                <div className="bg-purple-900 rounded-full p-6 inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-white">{item.desc}</p>
              </div>
            ))}
          </section>
        </AnimatedSection>

        <AnimatedSection>
          <section className="mt-32 text-center w-full">
            <h2 className="text-4xl font-bold mb-12 text-white">
              为什么选择 SmartHalo?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "直观的用户界面", desc: "简洁明了的设计,让您轻松上手使用" },
                { title: "强大的优化引擎", desc: "采用最新的AI技术,提供卓越的优化效果" },
                { title: "全面的合约支持", desc: "支持多种智能合约语言和区块链平台" },
                { title: "持续的更新与支持", desc: "定期更新优化算法,提供及时的技术支持" }
              ].map((item, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg transform hover:scale-105 transition duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-white">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>

      <footer className="mt-32 text-center text-white">
        <p>&copy; 2024 SmartHalo. 保留所有权利。</p>
      </footer>
    </main>
  );
}
