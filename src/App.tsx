import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { OpeningSequence } from './components/OpeningSequence';
import { Navbar } from './components/Navbar';
import { HeroBillboard } from './components/HeroBillboard';
import { AboutSection } from './components/AboutSection';
import { SeasonsJourney } from './components/SeasonsJourney';
import { OriginalsRail } from './components/OriginalsRail';
import { ProjectsSection } from './components/ProjectsSection';
import { AgencyServicesSection } from './components/AgencyServicesSection';
import { BannerSection } from './components/BannerSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StoryReelModal } from './components/StoryReelModal';
import { ProjectModal } from './components/ProjectModal';
import { ProfileSwitcherModal } from './components/ProfileSwitcherModal';
import { ResumeResourceModal } from './components/ResumeResourceModal';
import { ShortcutsHUD, HUDMessage } from './components/ShortcutsHUD';
import { ShortcutsGuideModal } from './components/ShortcutsGuideModal';
import { portfolioData, ProjectItem, OriginalItem, ViewerProfile } from './data/portfolio';

export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [activeProfile, setActiveProfile] = useState<ViewerProfile>(portfolioData.viewerProfiles[0]);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState<ProjectItem | OriginalItem | null>(null);
  const [isProfileSwitcherOpen, setIsProfileSwitcherOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [resumeModalTab, setResumeModalTab] = useState<'resume' | 'students'>('resume');
  const [isShortcutsGuideOpen, setIsShortcutsGuideOpen] = useState(false);
  const [focusedOriginalIndex, setFocusedOriginalIndex] = useState<number | null>(null);
  const [hudMessage, setHudMessage] = useState<HUDMessage | null>(null);

  const hudTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showHUD = (keyLabel: string, text: string, icon?: HUDMessage['icon']) => {
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    setHudMessage({
      id: Math.random().toString(),
      keyLabel,
      text,
      icon,
    });
    hudTimerRef.current = setTimeout(() => {
      setHudMessage(null);
    }, 1800);
  };

  const allItems: (ProjectItem | OriginalItem)[] = [
    ...portfolioData.originals,
    ...portfolioData.projects,
  ];

  const handleNavigateModalItem = (direction: 'prev' | 'next') => {
    if (!activeModalItem) return;
    const currentIdx = allItems.findIndex((it) => it.id === activeModalItem.id);
    if (currentIdx === -1) return;
    const nextIdx =
      direction === 'next'
        ? (currentIdx + 1) % allItems.length
        : (currentIdx - 1 + allItems.length) % allItems.length;
    const nextItem = allItems[nextIdx];
    setActiveModalItem(nextItem);
    showHUD(direction === 'next' ? '→' : '←', nextItem.title, direction === 'next' ? 'right' : 'left');
  };

  const handleNavigateRail = (direction: 'left' | 'right') => {
    const originals = portfolioData.originals;
    setFocusedOriginalIndex((prev) => {
      let nextIndex =
        prev === null
          ? direction === 'right'
            ? 0
            : originals.length - 1
          : direction === 'right'
          ? prev + 1
          : prev - 1;
      if (nextIndex >= originals.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = originals.length - 1;

      const card = document.getElementById(`original-card-${nextIndex}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        const rail = document.getElementById('originals-rail-container');
        if (rail) {
          rail.scrollBy({ left: direction === 'right' ? 340 : -340, behavior: 'smooth' });
        }
      }
      showHUD(direction === 'right' ? '→' : '←', `Rail: ${originals[nextIndex].title}`, direction === 'right' ? 'right' : 'left');
      return nextIndex;
    });
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs or textareas
      const el = document.activeElement;
      if (el) {
        const tagName = el.tagName.toLowerCase();
        if (
          tagName === 'input' ||
          tagName === 'textarea' ||
          tagName === 'select' ||
          (el as HTMLElement).isContentEditable
        ) {
          return;
        }
      }

      // 1. ESCAPE: Close any open modal in order
      if (e.key === 'Escape') {
        if (isShortcutsGuideOpen) {
          setIsShortcutsGuideOpen(false);
          showHUD('Esc', 'Closed Shortcuts Guide', 'close');
          return;
        }
        if (isResumeModalOpen) {
          setIsResumeModalOpen(false);
          showHUD('Esc', 'Closed Resume & Hub', 'close');
          return;
        }
        if (isProfileSwitcherOpen) {
          setIsProfileSwitcherOpen(false);
          showHUD('Esc', 'Closed Profile Switcher', 'close');
          return;
        }
        if (activeModalItem) {
          setActiveModalItem(null);
          showHUD('Esc', 'Closed Project Details', 'close');
          return;
        }
        if (isStoryModalOpen) {
          setIsStoryModalOpen(false);
          showHUD('Esc', 'Closed Story Reel', 'close');
          return;
        }
        if (showOpening) {
          setShowOpening(false);
          showHUD('Esc', 'Skipped Intro', 'close');
          return;
        }
      }

      // 2. SPACE: Play / Pause Video Reel
      if (e.key === ' ') {
        e.preventDefault();
        if (showOpening) {
          setShowOpening(false);
          showHUD('Space', 'Skipped Intro', 'play');
          return;
        }
        if (isStoryModalOpen) {
          // Handled inside StoryReelModal (which toggles isPaused)
          showHUD('Space', 'Story Reel: Play / Pause', 'pause');
          return;
        }
        // If not open, launch the story reel!
        setIsStoryModalOpen(true);
        showHUD('Space', 'Playing Story Reel', 'play');
        return;
      }

      // 3. ARROW KEYS: Navigate horizontal project rails & modal items
      if (e.key === 'ArrowRight') {
        if (activeModalItem) {
          e.preventDefault();
          handleNavigateModalItem('next');
          return;
        }
        if (!isStoryModalOpen && !isResumeModalOpen && !isProfileSwitcherOpen) {
          e.preventDefault();
          handleNavigateRail('right');
          return;
        }
      }

      if (e.key === 'ArrowLeft') {
        if (activeModalItem) {
          e.preventDefault();
          handleNavigateModalItem('prev');
          return;
        }
        if (!isStoryModalOpen && !isResumeModalOpen && !isProfileSwitcherOpen) {
          e.preventDefault();
          handleNavigateRail('left');
          return;
        }
      }

      // 4. ENTER: Open focused rail card if selected
      if (e.key === 'Enter') {
        if (
          focusedOriginalIndex !== null &&
          !activeModalItem &&
          !isStoryModalOpen &&
          !isResumeModalOpen &&
          !isProfileSwitcherOpen &&
          !isShortcutsGuideOpen
        ) {
          const item = portfolioData.originals[focusedOriginalIndex];
          if (item) {
            e.preventDefault();
            setActiveModalItem(item);
            showHUD('Enter', `Opened: ${item.title}`, 'play');
            return;
          }
        }
      }

      // 5. '?' or '/': Toggle Shortcuts Remote Guide
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsGuideOpen((prev) => {
          const next = !prev;
          showHUD('?', next ? 'Shortcuts Guide' : 'Closed Guide', 'keyboard');
          return next;
        });
        return;
      }

      // 6. 'r' or 'R': Quick open Resume & Student Hub
      if ((e.key === 'r' || e.key === 'R') && !e.metaKey && !e.ctrlKey) {
        if (!activeModalItem && !isStoryModalOpen) {
          e.preventDefault();
          setIsResumeModalOpen(true);
          showHUD('R', 'Resume & Student Hub', 'resume');
          return;
        }
      }

      // 7. 'p' or 'P': Quick switch Viewer Profile
      if ((e.key === 'p' || e.key === 'P') && !e.metaKey && !e.ctrlKey) {
        if (!activeModalItem && !isStoryModalOpen) {
          e.preventDefault();
          setIsProfileSwitcherOpen(true);
          showHUD('P', 'Viewer Profile Switcher', 'profile');
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    showOpening,
    isStoryModalOpen,
    activeModalItem,
    isProfileSwitcherOpen,
    isResumeModalOpen,
    isShortcutsGuideOpen,
    focusedOriginalIndex,
  ]);

  const handleOpenResumeModal = (tab: 'resume' | 'students' = 'resume') => {
    setResumeModalTab(tab);
    setIsResumeModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0612] text-[#f7f4ee] font-sans selection:bg-[#e50914] selection:text-white">
      {/* Subtle Film Grain Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Cinematic Opening Sequence */}
      <AnimatePresence>
        {showOpening && (
          <OpeningSequence onComplete={() => setShowOpening(false)} />
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <Navbar
        onOpenStory={() => setIsStoryModalOpen(true)}
        onOpenProfileSwitcher={() => setIsProfileSwitcherOpen(true)}
        activeProfileName={activeProfile.name}
        onOpenResumeModal={handleOpenResumeModal}
        onOpenShortcutsGuide={() => {
          setIsShortcutsGuideOpen(true);
          showHUD('?', 'Shortcuts Remote', 'keyboard');
        }}
      />

      {/* Main Streaming Feed */}
      <main>
        {/* Billboard Hero */}
        <HeroBillboard onPlayStory={() => setIsStoryModalOpen(true)} />

        {/* Episode 01: The Man Behind the Vision */}
        <AboutSection />

        {/* Episode 02: Seasons & Journey */}
        <SeasonsJourney />

        {/* Episode 03: Al Nibras Originals */}
        <OriginalsRail
          onSelectOriginal={(orig) => setActiveModalItem(orig)}
          focusedIndex={focusedOriginalIndex}
        />

        {/* Episode 04: Shipped Works */}
        <ProjectsSection onSelectProject={(proj) => setActiveModalItem(proj)} />

        {/* Episode 05: ANG Digital Agency Capabilities */}
        <AgencyServicesSection />

        {/* Full-width Cinematic Banner */}
        <BannerSection onOpenStudentHub={() => handleOpenResumeModal('students')} />

        {/* Final Episode: Contact & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Keyboard Shortcuts Trigger Pill */}
      <div className="fixed bottom-5 right-5 z-40 hidden sm:block">
        <button
          onClick={() => {
            setIsShortcutsGuideOpen(true);
            showHUD('?', 'Shortcuts Remote', 'keyboard');
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#110b1a]/90 hover:bg-[#160f22] border border-white/10 hover:border-[#e5b452]/50 shadow-2xl backdrop-blur-md text-[11px] font-mono text-[#9e9aa8] hover:text-white transition-all cursor-pointer group"
          title="Streaming Keyboard Shortcuts (Press ?)"
        >
          <span className="w-2 h-2 rounded-full bg-[#e5b452] animate-pulse" />
          <span className="font-semibold text-white/90 group-hover:text-[#e5b452] transition-colors">Remote</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-[#e5b452] font-mono border border-white/10 font-bold">?</kbd>
        </button>
      </div>

      {/* Interactive Story Reel Modal */}
      <StoryReelModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />

      {/* Project & Initiative Deep Dive Modal with Arrow Key Navigation */}
      <ProjectModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
        onNavigate={handleNavigateModalItem}
      />

      {/* Profile Switcher Modal */}
      <ProfileSwitcherModal
        isOpen={isProfileSwitcherOpen}
        onClose={() => setIsProfileSwitcherOpen(false)}
        activeProfileId={activeProfile.id}
        onSelectProfile={(p) => setActiveProfile(p)}
      />

      {/* Resume & Student Entrepreneur Resources Hub Modal */}
      <ResumeResourceModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        defaultTab={resumeModalTab}
      />

      {/* Streaming Keyboard Shortcuts Remote Guide */}
      <ShortcutsGuideModal
        isOpen={isShortcutsGuideOpen}
        onClose={() => setIsShortcutsGuideOpen(false)}
      />

      {/* On-Screen Display HUD Toast */}
      <ShortcutsHUD message={hudMessage} />
    </div>
  );
}
