export interface ProjectItem {
  id: string;
  title: string;
  genre: string;
  description: string;
  longDescription?: string;
  stack: string;
  url: string;
  featured?: boolean;
  metrics?: string;
  architectureHighlights?: string[];
  role?: string;
  image?: string;
}

export interface SeasonItem {
  seasonNumber: number;
  seasonLabel: string;
  title: string;
  description: string;
  keyMilestones?: string[];
  progressPercent: number;
}

export interface PillarItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface OriginalItem {
  id: string;
  title: string;
  genre: string;
  description: string;
  impactMetrics?: string;
  image?: string;
}

export interface AgencyService {
  title: string;
  description: string;
  category?: string;
}

export interface StorySlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  highlightText: string;
  quote?: string;
  image?: string;
}

export interface ViewerProfile {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  focus: string;
}

export const portfolioData = {
  profile: {
    name: "Syed Muhammad Faizan Gillani",
    shortName: "Faizan Gillani",
    headline: "Founder & CEO, Al Nibras Group",
    secondaryHeadline: "Full-Stack Developer & ANG Agency Lead",
    location: "Lahore, Pakistan",
    email: "mustafaischoolpakistan@gmail.com",
    officialEmail: "contact@alnibras.pk",
    originalLabel: "AN AL NIBRAS ORIGINAL",
    seriesBadge: "THE SERIES",
    heroImage: "/assets/faizan/faizan-hero.jpg",
    portraitImage: "/assets/faizan/faizan-portrait.jpg",
    logoImage: "/assets/faizan/alnibras-logo.jpg",
    bannerImage: "/assets/faizan/alnibras-banner.jpg",
    resumePdf: "/assets/faizan/Faizan_Gillani_Resume.pdf",
    bio: "Syed Muhammad Faizan Gillani is the Founder and CEO of Al Nibras Group — an organisation dedicated to education and entrepreneurship, based in Lahore, Pakistan. His mission is simple and bold: give every ambitious student the guidance, skills and network to turn ideas into ventures.",
    extendedBio: "Under his leadership, Al Nibras Group works at the meeting point of mentorship, training, and startup incubation — building solutions, creating impact and changing lives. As a Full-Stack Developer and Head of ANG Digital Agency, Faizan also architects production web apps, mobile systems, and autonomous agentic workflows for global clients.",
    tagline: "From idea to execution — building tomorrow's entrepreneurs today. Empowering students across Pakistan to innovate, inspire and create real impact.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/syed-muhammad-faizan-gillani-a21185401/",
      facebook: "https://www.facebook.com/profile.php?id=61574238254996",
      website: "https://alnibras.pk"
    }
  },

  pillars: [
    {
      title: "Innovate",
      description: "Turning raw ideas into ventures with a clear path to market."
    },
    {
      title: "Empower",
      description: "Giving students the confidence, network and tools to lead."
    },
    {
      title: "Execute",
      description: "From idea to execution — plans that actually ship."
    },
    {
      title: "Elevate",
      description: "Building sustainable growth for people and communities."
    }
  ] as PillarItem[],

  seasons: [
    {
      seasonNumber: 1,
      seasonLabel: "Season 1",
      title: "The Spark",
      description: "A vision takes shape: young Pakistanis need more than degrees — they need a launchpad.",
      keyMilestones: ["Identified the student-to-business gap", "Formulated core incubation model", "First community pilot in Lahore"],
      progressPercent: 25
    },
    {
      seasonNumber: 2,
      seasonLabel: "Season 2",
      title: "Al Nibras is Born",
      description: "Al Nibras Group is founded in Lahore as an NGO for education and entrepreneurship.",
      keyMilestones: ["Formal NGO & Social Enterprise incorporation", "Establishment of leadership curriculum", "Launch of school-to-business pipeline"],
      progressPercent: 50
    },
    {
      seasonNumber: 3,
      seasonLabel: "Season 3",
      title: "Building the Movement",
      description: "Mentorship, training and incubation programs reach students across Pakistan.",
      keyMilestones: ["500+ students mentored", "Launch of ANG Digital Agency", "Halal fintech & community platform deployments"],
      progressPercent: 75
    },
    {
      seasonNumber: 4,
      seasonLabel: "Season 4",
      title: "Tomorrow's Entrepreneurs",
      description: "Scaling impact — building solutions, creating impact, changing lives.",
      keyMilestones: ["Agentic AI workflow adoption", "Nationwide student incubation cohorts", "Global client product deliveries"],
      progressPercent: 100
    }
  ] as SeasonItem[],

  originals: [
    {
      id: "student-empowerment",
      title: "Student Empowerment",
      genre: "Education",
      description: "Programs that help students discover their potential and lead with purpose.",
      impactMetrics: "1,000+ Students Engaged across Pakistan",
      image: "/assets/faizan/alnibras-banner.jpg"
    },
    {
      id: "startup-incubation",
      title: "Startup Incubation",
      genre: "Entrepreneurship",
      description: "Guiding early ideas through validation, planning and launch.",
      impactMetrics: "Zero-to-One Launch Framework",
      image: "/assets/faizan/alnibras-banner.jpg"
    },
    {
      id: "business-development",
      title: "Business Development",
      genre: "Growth",
      description: "Practical strategy and partnerships for ventures ready to scale.",
      impactMetrics: "Sustainable Market-Ready Roadmaps",
      image: "/assets/faizan/alnibras-banner.jpg"
    },
    {
      id: "mentorship-training",
      title: "Mentorship & Training",
      genre: "Leadership",
      description: "Workshops and one-on-one guidance from people who have built before.",
      impactMetrics: "Practical Hands-on Bootcamps",
      image: "/assets/faizan/alnibras-banner.jpg"
    },
    {
      id: "sustainable-growth",
      title: "Sustainable Growth",
      genre: "Impact",
      description: "Long-term thinking that keeps ventures and communities thriving.",
      impactMetrics: "Ethical & Sharia-Aligned Foundation",
      image: "/assets/faizan/alnibras-banner.jpg"
    }
  ] as OriginalItem[],

  projects: [
    {
      id: "al-nibras-finance",
      title: "Al Nibras Finance",
      genre: "Islamic Finance",
      description: "Sharia-compliant family finance platform with parent dashboards, child wallets, courses and learning games — 0% interest, fully halal.",
      longDescription: "A groundbreaking fintech platform architected for Muslim families. Features secure dual-tier wallets, real-time parent controls, automated halal savings goals, gamified financial literacy courses for youth, and complete zero-interest ledger balancing.",
      stack: "React · TypeScript · Tailwind · Finance UX",
      url: "https://al-nibras.vercel.app/",
      featured: true,
      metrics: "0% Interest · 100% Halal Ledger · Interactive Learning",
      role: "Lead Full-Stack Architect & Product Designer",
      architectureHighlights: [
        "Interactive Parent & Child linked dashboard states",
        "Gamified Islamic financial literacy courses",
        "Zero-interest halal savings simulator"
      ],
      image: "/assets/faizan/alnibras-banner.jpg"
    },
    {
      id: "al-nibras-group",
      title: "Al Nibras Group",
      genre: "Social Enterprise",
      description: "Corporate website for Pakistan's first School-to-Business pipeline — storytelling, bilingual support and modern motion design.",
      longDescription: "The digital flagship for Al Nibras Group. Showcases student incubation cohorts, community outreach stories, impact statistics, and interactive program enrollment with bilingual Urdu/English accessibility.",
      stack: "React · TypeScript · Tailwind · i18n",
      url: "https://al-nibras-website.vercel.app/",
      featured: true,
      metrics: "Bilingual Pipeline · Dynamic Storytelling · 99.9% Uptime",
      role: "Founder & Technical Lead",
      architectureHighlights: [
        "Bilingual typography and localized UX flows",
        "High-performance animated hero with lightweight asset loading",
        "Direct student inquiry and mentorship booking pipeline"
      ],
      image: "/assets/faizan/alnibras-banner.jpg"
    },
    {
      id: "syed-ejaz-gillani",
      title: "Syed Ejaz Gillani",
      genre: "Author Portfolio",
      description: "Personal website for a Pakistani-Canadian writer — book catalog, categories, gallery and contact, with light/dark theming.",
      longDescription: "An elegant literary portfolio crafted for celebrated author Syed Ejaz Gillani. Features comprehensive book showcases, reader reviews, press archives, multi-category literary exploration, and seamless contact channels.",
      stack: "React · Tailwind · Responsive UI",
      url: "https://syedejaz.com/",
      featured: true,
      metrics: "Complete Literary Catalog · Dynamic Theming · Fast Global CDN",
      role: "Full-Stack Engineer & UI Designer",
      architectureHighlights: [
        "Light/Dark mood toggle tailored for long-form reading",
        "Interactive book preview modals and purchasing routing",
        "Photo gallery with responsive lightbox zoom"
      ],
      image: "/assets/faizan/alnibras-banner.jpg"
    },
    {
      id: "umrah-ride-buddy",
      title: "Umrah Ride Buddy",
      genre: "Pilgrim Transport",
      description: "Premium pilgrim transport booking for Makkah, Madinah & Jeddah — ride search, 24/7 support and multilingual experience.",
      longDescription: "A reliable, high-trust ride booking and transfer application designed for pilgrims performing Umrah and Hajj. Includes route estimators between airport, haram hotels, and holy sites, multi-currency display, and instant booking dispatch.",
      stack: "React · TypeScript · Tailwind · Booking UX",
      url: "https://project-ma81j.vercel.app/",
      featured: true,
      metrics: "Airport-to-Haram Booking · 24/7 Pilgrim Support · Instant Quotes",
      role: "Lead Frontend Engineer",
      architectureHighlights: [
        "Dynamic ride fare calculator across holy cities",
        "Multilingual interface with WhatsApp dispatch automation",
        "Mobile-first reservation funnel with instant verification"
      ],
      image: "/assets/faizan/alnibras-banner.jpg"
    }
  ] as ProjectItem[],

  agencyServices: [
    {
      title: "Web Applications",
      description: "Modern, responsive web apps with React, TypeScript & Tailwind — fast, accessible, production-ready.",
      category: "Engineering"
    },
    {
      title: "Landing Pages",
      description: "Conversion-focused landing pages with stunning animations and rock-solid performance.",
      category: "Engineering"
    },
    {
      title: "APIs & Backends",
      description: "REST & serverless APIs with Node.js, secure authentication and scalable database design.",
      category: "Engineering"
    },
    {
      title: "UI/UX Implementation",
      description: "Pixel-perfect Figma to code — design systems, components and dark-mode-ready interfaces.",
      category: "Design"
    },
    {
      title: "Performance & SEO",
      description: "Core Web Vitals, code splitting, lazy loading and SEO best practices from day one.",
      category: "Optimization"
    },
    {
      title: "Support & Maintenance",
      description: "Ongoing improvements, bug fixes, feature additions and tech upgrades.",
      category: "Support"
    },
    {
      title: "iOS App Build",
      description: "Native iOS apps with Swift and SwiftUI — App Store ready.",
      category: "Mobile"
    },
    {
      title: "Android App Build",
      description: "Native Android apps with Kotlin and Jetpack Compose — Play Store ready.",
      category: "Mobile"
    },
    {
      title: "Digital Marketing",
      description: "Data-driven SEO, PPC and content strategies that grow your brand.",
      category: "Growth"
    },
    {
      title: "Graphic Design",
      description: "Visuals, branding and UI assets crafted in Figma, Illustrator & Photoshop.",
      category: "Design"
    },
    {
      title: "Social Media Management",
      description: "End-to-end social strategy, content creation, scheduling and community growth.",
      category: "Growth"
    },
    {
      title: "Agentic Workflow Building",
      description: "Autonomous AI agent systems that automate complex business processes end-to-end.",
      category: "AI & Automation"
    }
  ] as AgencyService[],

  storySlides: [
    {
      id: 1,
      badge: "EPISODE 01 · THE VISION",
      title: "Bridging the Student-to-Business Gap",
      subtitle: "Degrees teach theory. True growth requires a launchpad.",
      highlightText: "Founded in Lahore, Al Nibras Group was created with a decisive mission: empower young students across Pakistan with practical entrepreneurship, tech skills, and early venture incubation.",
      quote: "Every ambitious student deserves the guidance, network, and tools to turn ideas into living ventures.",
      image: "/assets/faizan/faizan-portrait.jpg"
    },
    {
      id: 2,
      badge: "EPISODE 02 · LEADERSHIP",
      title: "Social Enterprise & Education",
      subtitle: "Innovate · Empower · Execute · Elevate",
      highlightText: "Through structured bootcamps, masterclasses, and one-on-one mentorship, Al Nibras Group guides students from conceptual ideation to customer validation and pitch readiness.",
      quote: "We don't just teach leadership — we practice it by building real solutions that solve community problems.",
      image: "/assets/faizan/alnibras-logo.jpg"
    },
    {
      id: 3,
      badge: "EPISODE 03 · THE CRAFT",
      title: "ANG Digital Agency",
      subtitle: "Full-Stack Web, Mobile & Agentic Workflows",
      highlightText: "As Technical Director of ANG Agency, Faizan architects enterprise web solutions, mobile applications, and AI agent pipelines for global clients, combining aesthetic elegance with bulletproof stability.",
      quote: "Great software isn't just code; it is a clear expression of purpose, speed, and usability.",
      image: "/assets/faizan/faizan-hero.jpg"
    },
    {
      id: 4,
      badge: "EPISODE 04 · SHIPPED WORKS",
      title: "Living Proof & Shipped Systems",
      subtitle: "From Sharia-compliant fintech to international logistics.",
      highlightText: "Proudly delivered Al Nibras Finance (0% interest halal family banking), Syed Ejaz literary portal, Umrah Ride Buddy transport dispatch, and the corporate Al Nibras pipeline.",
      quote: "Real builders are judged by what they ship and the value they create for real humans.",
      image: "/assets/faizan/alnibras-banner.jpg"
    },
    {
      id: 5,
      badge: "EPISODE 05 · THE NEXT SEASON",
      title: "Let's Build Together",
      subtitle: "Partnerships, Client Projects & Incubation Cohorts",
      highlightText: "Whether you represent an academic institution, seek agency engineering for your startup, or want to sponsor youth empowerment in Pakistan, the door is open.",
      quote: "The next season starts today.",
      image: "/assets/faizan/faizan-portrait.jpg"
    }
  ] as StorySlide[],

  viewerProfiles: [
    {
      id: "recruiter",
      name: "Partner & Recruiter",
      role: "Venture & Tech Hiring",
      avatarColor: "bg-red-600",
      focus: "Highlights shipped projects, agency tech stack, and rapid contact pipeline."
    },
    {
      id: "developer",
      name: "Engineering Peer",
      role: "Architecture & Code",
      avatarColor: "bg-amber-600",
      focus: "Emphasizes full-stack TypeScript, React architecture, and agentic workflows."
    },
    {
      id: "fellow",
      name: "Student & Founder",
      role: "Incubation & Mentorship",
      avatarColor: "bg-emerald-600",
      focus: "Focuses on Al Nibras student cohorts, pillars, and startup launchpad."
    }
  ] as ViewerProfile[]
};
