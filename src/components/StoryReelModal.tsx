import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Pause, Play, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { portfolioData, StorySlide } from '../data/portfolio';

interface StoryReelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryReelModal: React.FC<StoryReelModalProps> = ({ isOpen, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const slides = portfolioData.storySlides;
  const currentSlide = slides[currentSlideIndex];
  const slideDuration = 6000; // 6 seconds per slide

  const handleNext = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentSlideIndex, slides.length, onClose]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setProgress(0);
    }
  }, [currentSlideIndex]);

  // Reset state when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setCurrentSlideIndex(0);
      setProgress(0);
      setIsPaused(false);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Timer loop: only increments progress
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const intervalTime = 50;
    const increment = (intervalTime / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + increment));
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, slideDuration]);

  // Separate effect to handle slide completion without setState in render
  useEffect(() => {
    if (!isOpen) return;
    if (progress >= 100) {
      if (currentSlideIndex < slides.length - 1) {
        setCurrentSlideIndex((prev) => prev + 1);
        setProgress(0);
      } else {
        onClose();
      }
    }
  }, [progress, isOpen, currentSlideIndex, slides.length, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl select-none">
      {/* Tap zones for desktop/mobile navigation */}
      <div
        onClick={handlePrev}
        className="absolute top-0 bottom-0 left-0 w-1/4 z-10 cursor-w-resize"
        aria-label="Previous story slide"
      />
      <div
        onClick={handleNext}
        className="absolute top-0 bottom-0 right-0 w-1/4 z-10 cursor-e-resize"
        aria-label="Next story slide"
      />

      {/* Main Reel Card */}
      <div className="relative w-full max-w-xl h-full max-h-[90vh] sm:max-h-[820px] mx-4 rounded-3xl overflow-hidden bg-[#130d1e] border border-white/10 shadow-2xl flex flex-col justify-between z-20">
        {/* Top Progress Bars */}
        <div className="absolute top-4 inset-x-4 z-30 flex items-center gap-1.5">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
                style={{
                  width:
                    idx < currentSlideIndex
                      ? '100%'
                      : idx === currentSlideIndex
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Controls Bar */}
        <div className="relative z-30 pt-8 px-6 pb-4 flex items-center justify-between text-white bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2.5">
            <img
              src={portfolioData.profile.logoImage}
              alt=""
              className="w-7 h-7 rounded-full object-cover ring-1 ring-[#e5b452]"
            />
            <div>
              <p className="text-xs font-bold font-serif text-white leading-tight">
                Faizan Gillani
              </p>
              <p className="text-[10px] text-[#e5b452] font-mono">
                {currentSlide.badge}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPaused(!isPaused);
              }}
              className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              title="Close Story"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Content with Cinematic Fade */}
        <div className="relative flex-1 overflow-hidden flex flex-col justify-end p-6 sm:p-8">
          {/* Background image for slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <img
                src={currentSlide.image || portfolioData.profile.heroImage}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.4]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/60 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Foreground text content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative z-10 space-y-4"
            >
              <span className="inline-block px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest text-[#e5b452] bg-[#e5b452]/10 border border-[#e5b452]/30 rounded-md">
                {currentSlide.badge}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-black text-white leading-tight">
                {currentSlide.title}
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-[#e50914] uppercase tracking-wider font-mono">
                {currentSlide.subtitle}
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-[#f7f4ee]/90 font-sans">
                {currentSlide.highlightText}
              </p>

              {currentSlide.quote && (
                <div className="pt-2 flex items-start gap-2.5 text-xs sm:text-sm text-[#e5b452] italic border-t border-white/10 mt-3">
                  <Quote className="w-4 h-4 shrink-0 text-[#e50914] not-italic" />
                  <span>&ldquo;{currentSlide.quote}&rdquo;</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Hint Bar */}
        <div className="relative z-30 px-6 py-4 flex items-center justify-between text-xs text-[#9e9aa8] border-t border-white/5 bg-black/40">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          <span className="font-mono text-[11px] text-white/50">
            {currentSlideIndex + 1} of {slides.length}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>{currentSlideIndex === slides.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
