import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Code2, Smartphone, Palette, LineChart, Cpu, Wrench } from 'lucide-react';
import { portfolioData, AgencyService } from '../data/portfolio';

export const AgencyServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Engineering', 'Mobile', 'Design', 'AI & Automation', 'Growth'];

  const filteredServices = selectedCategory === 'All'
    ? portfolioData.agencyServices
    : portfolioData.agencyServices.filter((s) => s.category === selectedCategory);

  const getServiceIcon = (category?: string) => {
    switch (category) {
      case 'AI & Automation':
        return <Bot className="w-5 h-5 text-[#e50914]" />;
      case 'Mobile':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'Design':
        return <Palette className="w-5 h-5 text-[#e5b452]" />;
      case 'Growth':
        return <LineChart className="w-5 h-5 text-[#e0245e]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#e5b452]" />;
    }
  };

  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-5 sm:px-10 py-20 bg-gradient-to-b from-transparent via-[#130d1e]/30 to-transparent">
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.4em] text-[#e5b452] uppercase font-bold">
          EPISODE 05 · ANG DIGITAL AGENCY
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight">
            Services &amp; Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-[#9e9aa8] max-w-md">
            Full-lifecycle development, mobile applications, performance optimization, and autonomous AI agent workflows.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#e50914] text-white shadow-brand'
                : 'bg-white/5 text-[#9e9aa8] hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service, idx) => (
          <motion.div
            key={service.title}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.03 }}
            className="group rounded-xl border border-white/5 bg-[#130d1e] p-6 hover:border-[#e5b452]/40 transition-colors shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  {getServiceIcon(service.category)}
                </div>
                {service.category && (
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#9e9aa8] bg-white/5 px-2 py-0.5 rounded">
                    {service.category}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#e5b452] group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#9e9aa8] leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
