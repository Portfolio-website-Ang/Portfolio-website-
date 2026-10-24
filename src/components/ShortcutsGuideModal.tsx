import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Keyboard, Play, Pause, ChevronLeft, ChevronRight, CornerDownLeft, Sparkles } from 'lucide-react';

interface ShortcutsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsGuideModal: React.FC<ShortcutsGuideModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    {
      keys: ['Space'],
      label: 'Play / Pause Video Reel',
      detail: 'Toggles the cinematic highlight reel from anywhere or pauses current playback',
    },
    {
      keys: ['Esc'],
      label: 'Close Active Modal',
      detail: 'Closes any open overlay, story viewer, project sheet, or profile selector',
    },
    {
      keys: ['←', '→'],
      label: 'Navigate Horizontal Rails & Slides',
      detail: 'Scrolls smoothly through the Originals project rail or flips story slides',
    },
    {
      keys: ['Enter'],
      label: 'Open Focused Card',
      detail: 'Launches deep-dive details for the currently highlighted rail item',
    },
    {
      keys: ['R'],
      label: 'Resume & Student Hub',
      detail: 'Opens the verified PDF resume generator and entrepreneur incubation guides',
    },
    {
      keys: ['P'],
      label: 'Switch Viewer Profile',
      detail: 'Cycles perspective between Founder, Tech Lead, Recruiter, and Student',
    },
    {
      keys: ['?'],
      label: 'Shortcuts Remote',
      detail: 'Toggles this interactive keyboard shortcuts reference overlay',
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#120b1c] shadow-2xl overflow-hidden text-white"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[#0e0817] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e50914]/20 border border-[#e50914]/40 flex items-center justify-center text-[#e50914]">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-black text-white">
                Streaming Keyboard Remote
              </h3>
              <p className="text-xs text-[#e5b452] font-mono mt-0.5">
                Al Nibras Series · Global Navigation Controls
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close shortcuts guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto no-scrollbar">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-[#e5b452]/30 transition-colors"
            >
              <div className="flex-1 pr-2">
                <p className="text-sm font-semibold text-white">
                  {sc.label}
                </p>
                <p className="text-xs text-[#9e9aa8] mt-0.5 leading-relaxed">
                  {sc.detail}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {sc.keys.map((k, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="min-w-8 h-8 px-2.5 rounded-lg bg-[#1e152d] border border-white/20 text-[#e5b452] font-mono font-bold text-xs flex items-center justify-center shadow-sm"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}

          {/* Form input safety note */}
          <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#9e9aa8]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Shortcuts are automatically disabled when typing in form inputs.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0a0612]/60 flex items-center justify-between text-xs text-[#9e9aa8]">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">Esc</kbd> to dismiss</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
