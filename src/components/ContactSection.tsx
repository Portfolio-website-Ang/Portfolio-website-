import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Linkedin, Facebook, Globe, Mail, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { handleImageError } from '../utils/assets';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', details: '' });
  const [status, setStatus] = useState<'idle' | 'busy' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (form.details.trim().length < 10) {
      setError('Please tell me a bit more about your project (10+ characters)');
      return;
    }

    setStatus('busy');

    // Simulate sending & save locally
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('alnibras_inquiries') || '[]');
        stored.push({
          ...form,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('alnibras_inquiries', JSON.stringify(stored));
      } catch (err) {
        // ignore storage errors
      }
      setStatus('done');
    }, 900);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32 text-center">
      {/* Background radial glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914] opacity-20 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-2xl px-5"
      >
        {/* Circular Logo */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute -inset-2 rounded-full bg-[#e5b452] opacity-30 blur-lg animate-pulse" />
          <img
            src={portfolioData.profile.logoImage}
            onError={(e) => handleImageError(e, 'assets/faizan/alnibras-logo.jpg')}
            alt="Al Nibras Group"
            className="relative mx-auto h-24 w-24 rounded-full object-cover border-2 border-[#e5b452]/40 shadow-glow"
          />
        </div>

        <p className="font-mono text-xs tracking-[0.4em] text-[#e5b452] uppercase font-bold">
          FINAL EPISODE · TO BE CONTINUED
        </p>

        <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-black text-white leading-tight">
          Let&apos;s write the{' '}
          <span className="text-[#e50914] underline decoration-[#e5b452]/40 underline-offset-8">
            next season
          </span>{' '}
          together
        </h2>

        <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#9e9aa8] max-w-lg mx-auto">
          Available for new projects, agency consulting, and student incubation partnerships. Inquiries answered within 24 hours.
        </p>

        {/* Quick Social & Web Links */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={portfolioData.profile.socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:border-[#e5b452] hover:text-[#e5b452] hover:bg-white/10"
          >
            <Linkedin className="w-4 h-4 text-[#e50914]" />
            <span>LinkedIn</span>
          </a>
          <a
            href={portfolioData.profile.socialLinks.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:border-[#e5b452] hover:text-[#e5b452] hover:bg-white/10"
          >
            <Facebook className="w-4 h-4 text-[#e50914]" />
            <span>Facebook</span>
          </a>
          <a
            href={portfolioData.profile.socialLinks.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:border-[#e5b452] hover:text-[#e5b452] hover:bg-white/10"
          >
            <Globe className="w-4 h-4 text-[#e5b452]" />
            <span>AlNibras.pk</span>
          </a>
          <a
            href={`mailto:${portfolioData.profile.email}`}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:border-[#e5b452] hover:text-[#e5b452] hover:bg-white/10"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Direct Email</span>
          </a>
        </div>

        {/* Interactive Inquiry Form */}
        <div className="mt-10">
          {status === 'done' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-[#e5b452]/50 bg-[#130d1e] p-8 text-center shadow-xl"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="font-serif text-2xl font-bold text-[#e5b452]">
                Inquiry Received
              </p>
              <p className="mt-2 text-sm text-[#9e9aa8]">
                Thank you, {form.name} — your message has been saved and Syed Muhammad Faizan Gillani will follow up with you promptly.
              </p>
              <button
                onClick={() => {
                  setForm({ name: '', email: '', details: '' });
                  setStatus('idle');
                }}
                className="mt-6 px-5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-white/10 bg-[#130d1e]/90 p-6 sm:p-8 text-left backdrop-blur-xl shadow-2xl"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono text-[#9e9aa8] mb-1.5 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Tariq Khan"
                    maxLength={100}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#e5b452] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#9e9aa8] mb-1.5 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. tariq@company.com"
                    maxLength={255}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#e5b452] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9e9aa8] mb-1.5 uppercase">
                  Project or Incubation Details
                </label>
                <textarea
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  placeholder="Tell me about your web application, startup idea, or partnership goals…"
                  rows={4}
                  maxLength={3000}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#e5b452] transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-[#e0245e] font-medium bg-[#e0245e]/10 border border-[#e0245e]/20 p-2.5 rounded-lg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'busy'}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#e50914] hover:bg-[#c20811] text-white py-3.5 font-semibold text-sm transition-all duration-200 disabled:opacity-60 shadow-brand cursor-pointer"
              >
                {status === 'busy' ? (
                  <span>Sending inquiry…</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>▶ Submit Project Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};
