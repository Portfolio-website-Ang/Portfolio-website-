import React, { useState } from 'react';
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
import { portfolioData, ProjectItem, OriginalItem, ViewerProfile } from './data/portfolio';

export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [activeProfile, setActiveProfile] = useState<ViewerProfile>(portfolioData.viewerProfiles[0]);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState<ProjectItem | OriginalItem | null>(null);
  const [isProfileSwitcherOpen, setIsProfileSwitcherOpen] = useState(false);

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
        <OriginalsRail onSelectOriginal={(orig) => setActiveModalItem(orig)} />

        {/* Episode 04: Shipped Works */}
        <ProjectsSection onSelectProject={(proj) => setActiveModalItem(proj)} />

        {/* Episode 05: ANG Digital Agency Capabilities */}
        <AgencyServicesSection />

        {/* Full-width Cinematic Banner */}
        <BannerSection />

        {/* Final Episode: Contact & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Story Reel Modal */}
      <StoryReelModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />

      {/* Project & Initiative Deep Dive Modal */}
      <ProjectModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />

      {/* Profile Switcher Modal */}
      <ProfileSwitcherModal
        isOpen={isProfileSwitcherOpen}
        onClose={() => setIsProfileSwitcherOpen(false)}
        activeProfileId={activeProfile.id}
        onSelectProfile={(p) => setActiveProfile(p)}
      />
    </div>
  );
}
