import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { portfolioData, ProjectItem } from '../data/portfolio';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-5 sm:px-10 py-20">
      <div className="mb-10 sm:mb-12">
        <p className="font-mono text-xs tracking-[0.4em] text-[#e5b452] uppercase font-bold">
          EPISODE 04 · SHIPPED WORKS
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight">
            Featured Projects &amp; Software
          </h2>
          <p className="text-xs sm:text-sm text-[#9e9aa8] max-w-md">
            Production full-stack web platforms built with React, TypeScript, modern state management, and cloud deployments.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {portfolioData.projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-[#130d1e] p-7 transition-all duration-300 hover:border-[#e5b452]/50 shadow-xl"
          >
            <div>
              {/* Genre & Role */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold tracking-widest text-[#e0245e] uppercase">
                  {project.genre}
                </span>
                {project.role && (
                  <span className="text-[11px] font-sans text-[#e5b452] bg-[#e5b452]/10 border border-[#e5b452]/20 px-2 py-0.5 rounded">
                    {project.role}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#e5b452] transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-[#9e9aa8]">
                {project.description}
              </p>

              {/* Tech Stack Pills/Text */}
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#e5b452] bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <Layers className="w-3.5 h-3.5 shrink-0 text-[#e50914]" />
                <span className="truncate">{project.stack}</span>
              </div>

              {/* Metrics Badge */}
              {project.metrics && (
                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{project.metrics}</span>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between gap-4">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-[#e5b452] transition-colors group/link"
              >
                <span>▶ View Live App</span>
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform text-[#e50914]" />
              </a>

              <button
                onClick={() => onSelectProject(project)}
                className="px-3.5 py-1.5 text-xs font-medium text-[#f7f4ee] bg-white/10 hover:bg-white/20 rounded-md border border-white/10 transition-colors"
              >
                Architecture &amp; Specs
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
