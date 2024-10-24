import Link from "next/link";
import { FaHome, FaTools, FaChartLine, FaBook, FaDatabase } from 'react-icons/fa';

const navItems = [
  { name: '首页', href: '/', icon: <FaHome className="mr-2" /> },
  { name: '合约优化器', href: '/custom-optimization', icon: <FaChartLine className="mr-2" /> },
  { name: '链上合约优化', href: '/contract-optimization', icon: <FaTools className="mr-2" /> },
  { name: '合约库', href: '/library', icon: <FaDatabase className="mr-2" /> },
  { name: '使用教程', href: '/help', icon: <FaBook className="mr-2" /> },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-[#1A1A1A] bg-opacity-80 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 font-tech">
            SmartHalo
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-12 text-lg">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="flex items-center">
              <span className="flex items-center">
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
