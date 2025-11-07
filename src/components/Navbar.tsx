'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simplified animations without hiding elements
    gsap.from('.nav-logo', {
      x: -20,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.from('.nav-link', {
      y: -10,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.2,
    });
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/upload', label: 'Upload', icon: '📤' },
    { href: '/chat', label: 'Chat', icon: '💬' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/40 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl' 
          : 'bg-black/20 backdrop-blur-md border-b border-gray-800/30'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="nav-logo flex items-center space-x-3 group relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-white blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative text-3xl font-black tracking-tight">
                  <span className="gradient-accent">RAG</span>
                  <span className="text-white">ster</span>
                </div>
              </div>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider hidden md:block">
                Custom RAG Platform
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 opacity-100">
              {navLinks.map((link, index) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`nav-link relative group px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 opacity-100 ${
                    pathname === link.href 
                      ? 'class="text-xs text-gray-400 font-medium bg-white/20 border border-white/30 shadow-lg' 
                      : 'text-white hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40'
                  }`}
                >
                  <span className="flex items-center gap-2 relative z-10 opacity-100">
                    <span className="text-base opacity-100">{link.icon}</span>
                    <span className="opacity-100">{link.label}</span>
                  </span>
                  {pathname === link.href && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5"></div>
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link 
                href="/auth" 
                className="nav-link relative group px-8 py-3 bg-white text-black rounded-full font-bold text-sm overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Get Started</span>
                  <span className="text-lg">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 group z-10"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div 
          className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className={`relative h-full flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-3xl font-bold transition-all duration-300 ${
                pathname === link.href ? 'text-white scale-110' : 'text-gray-400 hover:text-white hover:scale-105'
              }`}
              style={{ transitionDelay: mobileMenuOpen ? `${index * 100}ms` : '0ms' }}
            >
              <span className="flex items-center gap-4">
                <span className="text-4xl">{link.icon}</span>
                <span>{link.label}</span>
              </span>
            </Link>
          ))}
          <Link
            href="/auth"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 px-12 py-4 bg-white text-black rounded-full font-bold text-xl hover:bg-gray-200 transition-all"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </>
  );
}
