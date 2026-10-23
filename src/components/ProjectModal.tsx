import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Layers, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { ProjectItem, OriginalItem } from '../data/portfolio';

interface ProjectModalProps {
  item: ProjectItem | OriginalItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const isProject = 'url' in item;
  const project = isProject ? (item as ProjectItem) : null;
  const original = !isProject ? (item as OriginalItem) : null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#130d1e] shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header Media Banner */}
        <div className="relative h-44 sm:h-52 w-full bg-[#0a0612] shrink-0 overflow-hidden">
          <img
            src={item.image || '/assets/faizan/alnibras-banner.jpg'}
            alt={item.title}
            className="w-full h-full object-cover brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#130d1e] via-[#130d1e]/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Title */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-mono font-bold tracking-widest text-[#e5b452] uppercase">
              {item.genre}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white mt-0.5">
              {item.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto no-scrollbar">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-[#9e9aa8] uppercase mb-2">
              Overview &amp; Purpose
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#f7f4ee]/90">
              {project?.longDescription || item.description}
            </p>
          </div>

          {/* Technical highlights for Projects */}
          {project && (
            <>
              {project.architectureHighlights && project.architectureHighlights.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono tracking-widest text-[#9e9aa8] uppercase mb-3">
                    Architecture &amp; Features
                  </h3>
                  <ul className="space-y-2.5">
                    {project.architectureHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f7f4ee]/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stack & Metrics */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#e5b452] mb-1">
                    <Layers className="w-3.5 h-3.5 text-[#e50914]" />
                    <span>Technology Stack</span>
                  </div>
                  <p className="text-xs text-white/90 font-medium">
                    {project.stack}
                  </p>
                </div>

                {project.metrics && (
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Key Metrics</span>
                    </div>
                    <p className="text-xs text-white/90 font-medium">
                      {project.metrics}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Original Initiative Impact */}
          {original && original.impactMetrics && (
            <div className="p-4 rounded-xl bg-[#e5b452]/10 border border-[#e5b452]/20">
              <p className="text-xs font-mono text-[#e5b452] uppercase font-bold">
                Impact Metric
              </p>
              <p className="text-base font-serif font-bold text-white mt-1">
                {original.impactMetrics}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-white/10 bg-black/40 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-[#9e9aa8] hover:text-white transition-colors"
          >
            Close
          </button>

          {project && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#e50914] hover:bg-[#c20811] text-white font-semibold text-xs sm:text-sm transition-all shadow-brand"
            >
              <span>▶ Launch Application</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};
