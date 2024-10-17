import Link from "next/link";
import AnimatedNavLink from './AnimatedNavLink';

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
          <AnimatedNavLink href="/">主页</AnimatedNavLink>
          <AnimatedNavLink href="/contract-optimization">合约地址优化</AnimatedNavLink>
          <AnimatedNavLink href="/custom-optimization">自定义优化</AnimatedNavLink>
          <AnimatedNavLink href="/tutorials">使用教程</AnimatedNavLink>
        </div>
      </div>
    </nav>
  );
}
