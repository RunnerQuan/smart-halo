'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function AnimatedNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={href} 
      className={`text-white transition-all duration-300 ease-in-out relative overflow-hidden ${isHovered ? 'text-blue-400' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform transition-transform duration-300 ${isHovered ? 'translate-x-0' : '-translate-x-full'}`}></span>
    </Link>
  );
}
