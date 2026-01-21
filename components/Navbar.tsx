import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const links = [
    { name: 'INDEX', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'CASES', href: '#cases' },
    { name: 'ARCH', href: '#architecture' },
    { name: 'LOG', href: '#log' },
    { name: 'EDU', href: '#education' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-mono text-xs font-bold tracking-tighter cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          SD_ARCH <span className="text-blue-500">v2.4.0</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-mono text-[10px] font-bold tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, '#contact')} 
            className="hidden sm:block text-[9px] font-bold tracking-[0.2em] px-4 py-1.5 border border-blue-500 text-blue-500 hover:border-2 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300"
          >
            SIGNAL_CONNECT
          </a>
          <button 
            className="lg:hidden text-slate-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen border-b border-[#1a1a1a]' : 'max-h-0'}`}>
        <div className="flex flex-col p-6 gap-4 bg-[#0c0c0c]">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-mono text-[10px] font-bold tracking-[0.2em] text-slate-400"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;