import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, FileText, BookOpen, Sparkles, CheckCircle2, ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { generateAndDownloadResume } from '../utils/resumeGenerator';
import { studentResources, downloadStudentResourcePdf, StudentResource } from '../utils/studentResourceGenerator';

interface ResumeResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'resume' | 'students';
}

export const ResumeResourceModal: React.FC<ResumeResourceModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'resume',
}) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'students'>(defaultTab);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadPersonalResume = async () => {
    try {
      setIsDownloading(true);
      await generateAndDownloadResume();
    } catch (err) {
      console.error('Failed to generate resume PDF', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadStudentPdf = async (resource: StudentResource) => {
    try {
      setDownloadingId(resource.id);
      await downloadStudentResourcePdf(resource);
    } catch (err) {
      console.error('Failed to download student resource PDF', err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl animate-in fade-in duration-200"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl border border-white/10 bg-[#110b1a] shadow-2xl flex flex-col overflow-hidden text-white"
      >
        {/* Top Header & Tab Switcher */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-[#0e0817] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e50914]/20 border border-[#e50914]/40 flex items-center justify-center text-[#e50914]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-black text-white leading-tight">
                Resume &amp; Resources Hub
              </h2>
              <p className="text-xs text-[#e5b452] font-mono mt-0.5">
                Al Nibras Group · Syed Muhammad Faizan Gillani
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Tabs */}
            <div className="flex items-center p-1 bg-black/40 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setActiveTab('resume')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTab === 'resume'
                    ? 'bg-[#e50914] text-white shadow-brand'
                    : 'text-[#9e9aa8] hover:text-white'
                }`}
              >
                Faizan&apos;s Resume
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'students'
                    ? 'bg-[#e5b452] text-[#0a0612] font-bold shadow-glow'
                    : 'text-[#9e9aa8] hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#e5b452]" />
                <span>Student Hub</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 no-scrollbar bg-[#0d0715]">
          {activeTab === 'resume' ? (
            /* Tab 1: Personal Resume Viewer & Actions */
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Action Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#160f22] border border-[#e5b452]/20 shadow-md">
                <div className="flex items-center gap-2 text-xs font-mono text-[#9e9aa8]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Standard A4 PDF · Verified Clean Format · 0 Cookie Dependency</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleDownloadPersonalResume}
                    disabled={isDownloading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e50914] hover:bg-[#c20811] text-white font-semibold text-xs transition-all shadow-brand cursor-pointer disabled:opacity-60"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isDownloading ? 'Generating PDF…' : 'Download PDF Resume'}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Styled In-App Resume Sheet Preview */}
              <div className="rounded-2xl border border-white/10 bg-[#160f22] p-6 sm:p-10 shadow-xl space-y-6 text-[#f7f4ee]">
                {/* Header */}
                <div className="border-b border-white/10 pb-5">
                  <h1 className="font-serif text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    {portfolioData.profile.name}
                  </h1>
                  <p className="font-serif font-bold text-sm text-[#e50914] mt-1">
                    {portfolioData.profile.headline} &nbsp;|&nbsp; {portfolioData.profile.secondaryHeadline}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#9e9aa8] font-mono mt-2">
                    <span>{portfolioData.profile.location}</span>
                    <span>·</span>
                    <span>{portfolioData.profile.email}</span>
                    <span>·</span>
                    <a href={portfolioData.profile.socialLinks.website} target="_blank" rel="noreferrer" className="text-[#e5b452] underline">
                      alnibras.pk
                    </a>
                  </div>
                </div>

                {/* Executive Summary */}
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-[#e5b452] uppercase font-bold mb-2">
                    Executive Summary
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#f7f4ee]/85">
                    Visionary entrepreneur, full-stack software engineer, and agency director with deep expertise in modern web systems, autonomous AI agent pipelines, and social venture incubation. Founder &amp; CEO of Al Nibras Group, bridging the gap between academic education and real-world venture creation across Pakistan. Leading innovative initiatives that empower students to innovate, inspire, and create tangible social and economic impact.
                  </p>
                </div>

                {/* Core Competencies */}
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-[#e5b452] uppercase font-bold mb-2">
                    Core Competencies &amp; Technical Stack
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-[#9e9aa8]">
                    <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                      <span className="font-bold text-white">Full-Stack Web: </span>
                      React 19, TypeScript, Node.js, Express, Tailwind CSS, REST APIs, Microservices
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                      <span className="font-bold text-white">AI &amp; Automation: </span>
                      Autonomous Agentic Workflows, LLM APIs, System Integration, Automated Pipelines
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                      <span className="font-bold text-white">Leadership: </span>
                      Venture Incubation, Mentorship &amp; Bootcamps, Product Roadmap, Sharia Finance UX
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
                      <span className="font-bold text-white">Mobile &amp; Design: </span>
                      iOS (SwiftUI), Android (Jetpack Compose), UI/UX Systems (Figma), Performance &amp; SEO
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-[#e5b452] uppercase font-bold mb-3">
                    Professional Experience &amp; Ventures
                  </h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-[#e50914] pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <p className="font-serif font-bold text-white text-sm">
                          Founder &amp; Chief Executive Officer
                        </p>
                        <span className="text-[11px] font-mono text-[#9e9aa8]">2024 – Present · Lahore, PK</span>
                      </div>
                      <p className="text-xs text-[#e50914] font-semibold">Al Nibras Group (NGO &amp; Social Enterprise)</p>
                      <ul className="mt-2 space-y-1 text-xs text-[#9e9aa8]">
                        <li>• Established Pakistan&apos;s premier school-to-business pipeline, mentoring 1,000+ students.</li>
                        <li>• Spearheaded incubation cohorts across 4 pillars: Innovate, Empower, Execute, and Elevate.</li>
                      </ul>
                    </div>

                    <div className="border-l-2 border-[#e5b452] pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <p className="font-serif font-bold text-white text-sm">
                          Lead Full-Stack Architect &amp; Agency Director
                        </p>
                        <span className="text-[11px] font-mono text-[#9e9aa8]">2024 – Present · Global</span>
                      </div>
                      <p className="text-xs text-[#e5b452] font-semibold">ANG Digital Agency</p>
                      <ul className="mt-2 space-y-1 text-xs text-[#9e9aa8]">
                        <li>• Directing full-lifecycle technical delivery across 12 digital agency disciplines.</li>
                        <li>• Delivered client software architectures with 99.9% uptime and sub-second performance.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Shipped Works Highlights */}
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-[#e5b452] uppercase font-bold mb-2">
                    Key Shipped Software &amp; Platforms
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                      <p className="font-bold text-white">Al Nibras Finance</p>
                      <p className="text-[11px] text-[#e5b452]">Islamic Fintech · React, TypeScript</p>
                      <p className="text-[#9e9aa8] mt-1">Sharia-compliant family banking with 0% interest halal ledger.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                      <p className="font-bold text-white">Al Nibras Group Portal</p>
                      <p className="text-[11px] text-[#e5b452]">Social Enterprise · React, i18n</p>
                      <p className="text-[#9e9aa8] mt-1">Bilingual school-to-business incubation pipeline.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                      <p className="font-bold text-white">Syed Ejaz Gillani Portfolio</p>
                      <p className="text-[11px] text-[#e5b452]">Author Showcase · Responsive UI</p>
                      <p className="text-[#9e9aa8] mt-1">Literary catalog, review archives, and book purchasing funnels.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                      <p className="font-bold text-white">Umrah Ride Buddy</p>
                      <p className="text-[11px] text-[#e5b452]">Pilgrim Transport · Booking Engine</p>
                      <p className="text-[#9e9aa8] mt-1">Airport-to-Haram transfer dispatch across Makkah &amp; Madinah.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Student Entrepreneur Resources Slot */
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#e50914]/20 via-[#e5b452]/10 to-transparent border border-[#e5b452]/30">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e5b452] font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Al Nibras Incubation Launchpad</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-black text-white mt-1">
                  Student Entrepreneur Guides &amp; Frameworks
                </h3>
                <p className="text-xs sm:text-sm text-[#9e9aa8] mt-1.5 max-w-2xl">
                  Curated frameworks, validation tools, and pitch deck templates formulated by Al Nibras Group to help ambitious students turn classroom theory into living ventures.
                </p>
              </div>

              {/* Resource Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {studentResources.map((res) => (
                  <div
                    key={res.id}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#160f22] p-5 sm:p-6 hover:border-[#e5b452]/50 transition-colors shadow-lg group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono tracking-widest text-[#e50914] uppercase font-bold">
                          {res.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#e5b452] bg-[#e5b452]/10 border border-[#e5b452]/20 px-2 py-0.5 rounded">
                          {res.badge}
                        </span>
                      </div>

                      <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#e5b452] transition-colors">
                        {res.title}
                      </h4>

                      <p className="text-xs text-[#9e9aa8] leading-relaxed mt-2">
                        {res.description}
                      </p>

                      <ul className="mt-3 space-y-1.5 border-t border-white/5 pt-3">
                        {res.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-[#f7f4ee]/80">
                            <span className="text-[#e5b452] font-bold">›</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => handleDownloadStudentPdf(res)}
                        disabled={downloadingId === res.id}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#e5b452] hover:text-[#0a0612] text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{downloadingId === res.id ? 'Generating…' : 'Download PDF Guide'}</span>
                      </button>
                      <span className="text-[11px] font-mono text-[#9e9aa8]">PDF Format</span>
                    </div>
                  </div>
                ))}

                {/* Research Slot Card */}
                <div className="rounded-2xl border-2 border-dashed border-[#e5b452]/30 bg-[#160f22]/50 p-6 flex flex-col justify-center items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#e5b452]/10 border border-[#e5b452]/30 flex items-center justify-center text-[#e5b452] mb-3">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Future Research Slot
                  </h4>
                  <p className="text-xs text-[#9e9aa8] mt-2 max-w-xs">
                    More researched incubation guides, case studies, and grant application blueprints will be plugged directly into this slot.
                  </p>
                  <span className="mt-4 text-[10px] font-mono text-[#e5b452] uppercase tracking-widest bg-[#e5b452]/10 px-3 py-1 rounded-full border border-[#e5b452]/20">
                    Cohort 2026 In Progress
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
