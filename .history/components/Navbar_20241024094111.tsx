import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FaHome, FaTools, FaChartLine, FaBook, FaDatabase } from 'react-icons/fa';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '首页', icon: FaHome },
    { href: '/custom-optimization', label: '合约优化器', icon: FaTools },
    { href: '/contract-optimization', label: '链上合约优化', icon: FaChartLine },
    { href: '/library', label: '合约库', icon: FaDatabase },
    { href: '/help', label: '使用教程', icon: FaBook },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img className="h-8 w-8" src="/logo.png" alt="Logo" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${
                        pathname === item.href
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } px-3 py-2 rounded-md text-sm font-medium flex items-center`}
                    >
                      <Icon className="mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
