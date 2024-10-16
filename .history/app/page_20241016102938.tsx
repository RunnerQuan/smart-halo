import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl text-blue-600">SmartHalo</Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">主页</Link>
            <Link href="/contract-optimization" className="text-gray-700 hover:text-blue-600 transition">合约地址优化</Link>
            <Link href="/custom-optimization" className="text-gray-700 hover:text-blue-600 transition">自定义优化</Link>
            <Link href="/tutorials" className="text-gray-700 hover:text-blue-600 transition">使用教程</Link>
          </div>
        </div>
      </nav>

      <section className="text-center mt-20">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">智能合约反编译优化的未来</h1>
        <p className="text-xl text-gray-600 mb-8">SmartHalo - 让您的智能合约代码更清晰、更易读、更安全</p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition">开始优化</button>
      </section>

      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="text-center">
          <div className="bg-blue-100 rounded-full p-6 inline-block mb-4">
            <Image src="/icons/speed.svg" alt="速度图标" width={40} height={40} />
          </div>
          <h3 className="text-xl font-semibold mb-2">快速优化</h3>
          <p className="text-gray-600">在几秒钟内完成智能合约的反编译和优化</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 rounded-full p-6 inline-block mb-4">
            <Image src="/icons/security.svg" alt="安全图标" width={40} height={40} />
          </div>
          <h3 className="text-xl font-semibold mb-2">安全可靠</h3>
          <p className="text-gray-600">采用先进的安全措施保护您的合约代码</p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 rounded-full p-6 inline-block mb-4">
            <Image src="/icons/customize.svg" alt="自定义图标" width={40} height={40} />
          </div>
          <h3 className="text-xl font-semibold mb-2">灵活定制</h3>
          <p className="text-gray-600">根据您的需求自定义优化参数和输出格式</p>
        </div>
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-6">为什么选择 SmartHalo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">直观的用户界面</h3>
            <p className="text-gray-600">简洁明了的设计,让您轻松上手使用</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">强大的优化引擎</h3>
            <p className="text-gray-600">采用最新的AI技术,提供卓越的优化效果</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">全面的合约支持</h3>
            <p className="text-gray-600">支持多种智能合约语言和区块链平台</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">持续的更新与支持</h3>
            <p className="text-gray-600">定期更新优化算法,提供及时的技术支持</p>
          </div>
        </div>
      </section>

      <footer className="mt-20 text-center text-gray-500">
        <p>&copy; 2024 SmartHalo. 保留所有权利。</p>
      </footer>
    </main>
  );
}
