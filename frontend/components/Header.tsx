'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, Github } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { name: '서비스 소개', path: '/about' },
        { name: '개인정보처리방침', path: '/privacy' },
        { name: '문의하기', path: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-naver-green p-1.5 rounded-lg text-white group-hover:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        Naver Crawler
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`text-sm font-medium transition-colors duration-200 ${isActive(item.path)
                                    ? 'text-naver-green'
                                    : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* External Link */}
                    <a
                        href="https://github.com/Start-to-End/naver_Review_Crawler"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`block py-2 text-base font-medium ${isActive(item.path)
                                    ? 'text-naver-green'
                                    : 'text-gray-500'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
