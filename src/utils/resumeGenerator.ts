import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { portfolioData } from '../data/portfolio';

export async function generateAndDownloadResume(): Promise<void> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4 size
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const primaryColor = rgb(0.06, 0.04, 0.09); // ink
  const brandRed = rgb(0.9, 0.04, 0.08); // crimson #e50914
  const goldColor = rgb(0.82, 0.62, 0.25); // gold #d4a03c
  const mutedColor = rgb(0.35, 0.35, 0.38); // slate

  let y = 805;

  // Header Title
  page.drawText("SYED MUHAMMAD FAIZAN GILLANI", {
    x: 40,
    y,
    size: 18,
    font: fontBold,
    color: primaryColor,
  });

  y -= 16;
  page.drawText("Founder & CEO, Al Nibras Group  |  Full-Stack Developer & ANG Agency Lead", {
    x: 40,
    y,
    size: 10,
    font: fontBold,
    color: brandRed,
  });

  y -= 14;
  page.drawText("Lahore, Pakistan   |   mustafaischoolpakistan@gmail.com   |   https://alnibras.pk", {
    x: 40,
    y,
    size: 8.5,
    font: fontRegular,
    color: mutedColor,
  });

  y -= 10;
  page.drawLine({
    start: { x: 40, y },
    end: { x: 555, y },
    thickness: 1.5,
    color: goldColor,
  });

  y -= 18;

  function drawSectionHeading(title: string) {
    page.drawText(title.toUpperCase(), {
      x: 40,
      y,
      size: 10.5,
      font: fontBold,
      color: primaryColor,
    });
    page.drawLine({
      start: { x: 40, y: y - 3 },
      end: { x: 555, y: y - 3 },
      thickness: 0.6,
      color: rgb(0.8, 0.8, 0.82),
    });
    y -= 16;
  }

  function drawParagraph(text: string, size = 9, indent = 40, maxWidth = 515) {
    const words = text.split(" ");
    let line = "";
    for (const w of words) {
      const testLine = line ? line + " " + w : w;
      const width = fontRegular.widthOfTextAtSize(testLine, size);
      if (width > maxWidth) {
        page.drawText(line, { x: indent, y, size, font: fontRegular, color: primaryColor });
        y -= 12;
        line = w;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x: indent, y, size, font: fontRegular, color: primaryColor });
      y -= 14;
    }
  }

  // Executive Summary
  drawSectionHeading("Executive Summary");
  const summaryText =
    "Visionary entrepreneur, full-stack software engineer, and agency director with deep expertise in modern web systems, autonomous AI agent pipelines, and social venture incubation. Founder & CEO of Al Nibras Group, bridging the gap between academic education and real-world venture creation across Pakistan. Leading innovative initiatives that empower students to innovate, inspire, and create tangible social and economic impact.";
  drawParagraph(summaryText);
  y -= 4;

  // Core Competencies
  drawSectionHeading("Core Competencies & Technical Skills");
  page.drawText("Full-Stack Web:", { x: 40, y, size: 9, font: fontBold, color: primaryColor });
  page.drawText(" React 19, TypeScript, Node.js, Express, Next.js, Tailwind CSS, REST APIs, Microservices", {
    x: 120,
    y,
    size: 8.5,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 13;

  page.drawText("AI & Automation:", { x: 40, y, size: 9, font: fontBold, color: primaryColor });
  page.drawText(" Autonomous Agentic Workflows, LLM APIs, System Integration, Automated Pipelines", {
    x: 120,
    y,
    size: 8.5,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 13;

  page.drawText("Leadership & Strategy:", { x: 40, y, size: 9, font: fontBold, color: primaryColor });
  page.drawText(" Venture Incubation, Mentorship & Bootcamps, Product Roadmap, Sharia-Compliant Finance UX", {
    x: 140,
    y,
    size: 8.5,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 13;

  page.drawText("Mobile & Design:", { x: 40, y, size: 9, font: fontBold, color: primaryColor });
  page.drawText(" iOS (SwiftUI), Android (Jetpack Compose), UI/UX Systems (Figma), Performance & SEO", {
    x: 120,
    y,
    size: 8.5,
    font: fontRegular,
    color: primaryColor,
  });
  y -= 18;

  // Work Experience
  drawSectionHeading("Professional Experience & Ventures");

  page.drawText("Founder & Chief Executive Officer", { x: 40, y, size: 10, font: fontBold, color: primaryColor });
  page.drawText("2024 - Present  |  Lahore, Pakistan", { x: 410, y, size: 8.5, font: fontOblique, color: mutedColor });
  y -= 12;
  page.drawText("Al Nibras Group (NGO & Social Enterprise)", { x: 40, y, size: 9, font: fontBold, color: brandRed });
  y -= 12;

  const exp1Bullets = [
    "Established Pakistan first structured School-to-Business pipeline, delivering mentorship and incubation to 1,000+ ambitious students across urban and regional academic institutions.",
    "Formulated the 4 foundational pillars (Innovate, Empower, Execute, Elevate) guiding raw student ideas into validated, scalable ventures.",
    "Directed community outreach programs, nationwide innovation bootcamps, and institutional partnerships.",
  ];
  for (const b of exp1Bullets) {
    page.drawText("-", { x: 45, y, size: 9, font: fontBold, color: brandRed });
    drawParagraph(b, 8.5, 55, 500);
  }
  y -= 4;

  page.drawText("Lead Full-Stack Architect & Agency Director", { x: 40, y, size: 10, font: fontBold, color: primaryColor });
  page.drawText("2024 - Present  |  Global", { x: 440, y, size: 8.5, font: fontOblique, color: mutedColor });
  y -= 12;
  page.drawText("ANG Digital Agency", { x: 40, y, size: 9, font: fontBold, color: brandRed });
  y -= 12;

  const exp2Bullets = [
    "Leading an agile digital agency delivering full-lifecycle engineering across 12 disciplines including React web applications, native mobile apps, and autonomous AI systems.",
    "Engineered robust CI/CD pipelines, dark-mode design systems, and SEO/Core-Web-Vitals architectures delivering sub-second response times and 99.9% production uptime.",
  ];
  for (const b of exp2Bullets) {
    page.drawText("-", { x: 45, y, size: 9, font: fontBold, color: brandRed });
    drawParagraph(b, 8.5, 55, 500);
  }
  y -= 6;

  // Key Shipped Projects
  drawSectionHeading("Key Shipped Projects & Platforms");

  const projects = [
    {
      title: "Al Nibras Finance",
      tech: "React, TypeScript, Tailwind CSS, Islamic Finance UX",
      desc: "Built a Sharia-compliant family banking platform with parent controls, child wallets, 0% interest halal ledger balancing, and interactive youth financial courses (https://al-nibras.vercel.app/).",
    },
    {
      title: "Al Nibras Group Flagship Platform",
      tech: "React, TypeScript, i18n, Motion Design",
      desc: "Architected bilingual corporate portal showcasing student venture cohorts, dynamic storytelling, and direct incubation enrollment funnels (https://al-nibras-website.vercel.app/).",
    },
    {
      title: "Syed Ejaz Gillani - Author Portfolio",
      tech: "React, Tailwind, Responsive Architecture",
      desc: "Designed and deployed comprehensive literary portfolio featuring book catalog, reader review showcases, dynamic lighting themes, and author contact funnels (https://syedejaz.com/).",
    },
    {
      title: "Umrah Ride Buddy",
      tech: "React, TypeScript, Booking Engine, Mobile UX",
      desc: "Engineered pilgrim transport booking system covering Makkah, Madinah, and Jeddah with multi-currency fares and automated dispatch integration (https://project-ma81j.vercel.app/).",
    },
  ];

  for (const p of projects) {
    page.drawText(p.title + "  |  " + p.tech, { x: 40, y, size: 9, font: fontBold, color: primaryColor });
    y -= 11;
    drawParagraph(p.desc, 8.5, 48, 507);
    y -= 2;
  }

  // Footer Note
  y = 35;
  page.drawLine({
    start: { x: 40, y: y + 8 },
    end: { x: 555, y: y + 8 },
    thickness: 0.5,
    color: rgb(0.85, 0.85, 0.85),
  });
  page.drawText("Generated from Syed Muhammad Faizan Gillani - The Series Portfolio (https://alnibras.pk)", {
    x: 40,
    y,
    size: 7.5,
    font: fontOblique,
    color: mutedColor,
  });

  const pdfBytes = await doc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const downloadUrl = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'Syed_Muhammad_Faizan_Gillani_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
}
