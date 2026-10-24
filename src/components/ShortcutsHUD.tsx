import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, Play, Pause, X, ChevronLeft, ChevronRight, FileText, Users } from 'lucide-react';

export interface HUDMessage {
  id: string;
  keyLabel: string;
  text: string;
  icon?: 'play' | 'pause' | 'close' | 'left' | 'right' | 'resume' | 'profile' | 'keyboard';
}

interface ShortcutsHUDProps {
  message: HUDMessage | null;
}

export const ShortcutsHUD: React.FC<ShortcutsHUDProps> = ({ message }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#160f22]/95 border border-[#e5b452]/40 shadow-2xl backdrop-blur-xl text-white font-sans text-xs tracking-wide"
          >
            {/* Keycap badge */}
            <span className="px-2 py-0.5 rounded bg-white/15 border border-white/20 font-mono font-bold text-[11px] text-[#e5b452] shadow-sm">
              {message.keyLabel}
            </span>

            {/* Icon */}
            {message.icon === 'play' && <Play className="w-3.5 h-3.5 fill-current text-[#e50914]" />}
            {message.icon === 'pause' && <Pause className="w-3.5 h-3.5 fill-current text-[#e5b452]" />}
            {message.icon === 'close' && <X className="w-3.5 h-3.5 text-white/80" />}
            {message.icon === 'left' && <ChevronLeft className="w-3.5 h-3.5 text-[#e5b452]" />}
            {message.icon === 'right' && <ChevronRight className="w-3.5 h-3.5 text-[#e5b452]" />}
            {message.icon === 'resume' && <FileText className="w-3.5 h-3.5 text-[#e5b452]" />}
            {message.icon === 'profile' && <Users className="w-3.5 h-3.5 text-[#e5b452]" />}
            {message.icon === 'keyboard' && <Keyboard className="w-3.5 h-3.5 text-[#e5b452]" />}

            {/* Description */}
            <span className="font-medium text-[#f7f4ee]">{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
