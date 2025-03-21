import Link from "next/link";
import Image from "next/image";
import { FaHome, FaTools, FaChartLine, FaBook, FaDatabase } from 'react-icons/fa';

const navItems = [
  { name: '首页', href: '/', icon: <FaHome className="mr-2 text-xl" /> },
  { name: '合约优化器', href: '/custom-optimization', icon: <FaChartLine className="mr-2 text-xl" /> },
  { name: '链上合约优化', href: '/contract-optimization', icon: <FaTools className="mr-2 text-xl" /> },
  { name: '智能合约反编译代码库', href: '/library', icon: <FaDatabase className="mr-2 text-xl" /> },
  { name: '使用教程', href: '/help', icon: <FaBook className="mr-2 text-xl" /> },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-[#1A1A1A] bg-opacity-80 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-auto relative -mt-9">
            <Image
              src="/icons/logo.png"
              alt="SmartHalo Logo"
              width={200}
              height={60}
              className="object-contain invert brightness-200 hover:brightness-150 transition-all duration-300"
              priority
            />
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-12 text-xl">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center text-gray-300 hover:text-white transition-colors py-2">
              <span className="flex items-center font-medium">
                {item.icon}
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
