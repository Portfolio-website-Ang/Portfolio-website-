import React, { useState, useEffect } from 'react';
import { Menu, X, Play, Users, MessageSquare, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface NavbarProps {
  onOpenStory: () => void;
  onOpenProfileSwitcher: () => void;
  activeProfileName: string;
  onOpenResumeModal: (tab?: 'resume' | 'students') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStory,
  onOpenProfileSwitcher,
  activeProfileName,
  onOpenResumeModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#seasons', label: 'Seasons' },
    { href: '#originals', label: 'Originals' },
    { href: '#projects', label: 'Shipped Works' },
    { href: '#services', label: 'ANG Agency' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0612]/92 backdrop-blur-md border-b border-white/5 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#0a0612]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-serif font-black text-lg sm:text-xl tracking-wider text-white hover:text-[#e5b452] transition-colors"
          >
            <span className="w-7 h-7 rounded bg-[#e50914] text-white flex items-center justify-center font-sans font-bold text-xs tracking-tight shadow-sm">
              N
            </span>
            <span className="tracking-wide uppercase font-serif">
              Faizan <span className="text-[#e50914] group-hover:text-[#e5b452] transition-colors">Gillani</span>
            </span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#9e9aa8]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#e5b452] transition-colors whitespace-nowrap py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e50914] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Resume & Resource Hub */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => onOpenResumeModal('resume')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#e5b452] hover:text-[#f4d48a] bg-[#e5b452]/10 hover:bg-[#e5b452]/20 border border-[#e5b452]/30 hover:border-[#e5b452]/60 rounded-md transition-all shadow-sm whitespace-nowrap cursor-pointer"
              title="View & Download Resume (PDF)"
            >
              <Download className="w-3.5 h-3.5 text-[#e5b452]" />
              <span>Resume</span>
            </button>
            <button
              onClick={() => onOpenResumeModal('students')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-white/85 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all whitespace-nowrap cursor-pointer"
              title="Student Entrepreneur Guides & Incubation Frameworks"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5b452] animate-pulse" />
              <span>Student Hub</span>
            </button>
          </div>

          {/* Story Reel Button */}
          <button
            onClick={onOpenStory}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#f7f4ee] bg-white/10 hover:bg-white/20 rounded-md transition-all border border-white/10"
            title="Play Highlight Reel"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#e50914]" />
            <span>Story</span>
          </button>

          {/* Profile Switcher Button */}
          <button
            onClick={onOpenProfileSwitcher}
            className="flex items-center gap-2 px-2.5 py-1 text-xs font-medium text-[#9e9aa8] hover:text-white rounded-md transition-colors border border-white/5 hover:border-white/20 bg-white/5"
            title="Switch Viewer Lens"
          >
            <img
              src={portfolioData.profile.logoImage}
              alt=""
              className="w-5 h-5 rounded-full object-cover ring-1 ring-[#e5b452]"
            />
            <span className="hidden xl:inline text-[11px] font-sans truncate max-w-[100px]">
              {activeProfileName}
            </span>
            <Users className="w-3.5 h-3.5 text-[#e5b452]" />
          </button>

          {/* Direct Contact Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-white bg-[#e50914] hover:bg-[#c20811] rounded-md transition-all shadow-brand whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inquire</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-md text-[#9e9aa8] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0612]/98 border-b border-white/10 px-6 py-5 space-y-3 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#9e9aa8] hover:text-[#e5b452] py-1.5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal('resume');
              }}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#e5b452] bg-[#e5b452]/10 hover:bg-[#e5b452]/20 border border-[#e5b452]/30 rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#e5b452]" />
              <span>Download Resume (PDF)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal('students');
              }}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#e50914]/40 to-[#e5b452]/30 border border-white/10 rounded-md transition-colors cursor-pointer"
            >
              <span>🚀 Student Entrepreneur Hub</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStory();
              }}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-md"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#e50914]" />
              <span>▶ Play Story Reel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
