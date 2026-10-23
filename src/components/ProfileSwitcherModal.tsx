import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Check, Users, Sparkles } from 'lucide-react';
import { portfolioData, ViewerProfile } from '../data/portfolio';

interface ProfileSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfileId: string;
  onSelectProfile: (profile: ViewerProfile) => void;
}

export const ProfileSwitcherModal: React.FC<ProfileSwitcherModalProps> = ({
  isOpen,
  onClose,
  activeProfileId,
  onSelectProfile
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#130d1e] p-6 sm:p-10 text-center shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
          aria-label="Close profile switcher"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="font-mono text-xs tracking-[0.4em] text-[#e5b452] uppercase font-bold">
          STREAMING PERSPECTIVE
        </p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-extrabold text-white">
          Who&apos;s Watching?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#9e9aa8] max-w-md mx-auto">
          Tailor the series lens to emphasize what matters most to you.
        </p>

        {/* Profiles Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {portfolioData.viewerProfiles.map((p) => {
            const isSelected = p.id === activeProfileId;
            return (
              <button
                key={p.id}
                onClick={() => {
                  onSelectProfile(p);
                  onClose();
                }}
                className={`group flex flex-col items-center p-5 rounded-2xl border transition-all text-center cursor-pointer ${
                  isSelected
                    ? 'border-[#e50914] bg-[#e50914]/10 shadow-brand ring-1 ring-[#e50914]'
                    : 'border-white/5 bg-white/5 hover:border-[#e5b452]/40 hover:bg-white/10'
                }`}
              >
                <div className="relative mb-3">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center font-serif text-2xl font-black text-white shadow-lg transition-transform group-hover:scale-105 ${p.avatarColor}`}
                  >
                    {p.name.charAt(0)}
                  </div>
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <p className="font-serif font-bold text-white text-base group-hover:text-[#e5b452] transition-colors">
                  {p.name}
                </p>
                <p className="text-[11px] font-mono text-[#e5b452] mt-0.5">
                  {p.role}
                </p>
                <p className="text-xs text-[#9e9aa8] mt-2 leading-relaxed">
                  {p.focus}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-[#9e9aa8]">
          <Sparkles className="w-3.5 h-3.5 text-[#e5b452]" />
          <span>Switch lenses anytime from the top navigation bar</span>
        </div>
      </motion.div>
    </div>
  );
};
