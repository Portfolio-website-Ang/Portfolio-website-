import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface StudentResource {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  keyPoints: string[];
}

export const studentResources: StudentResource[] = [
  {
    id: 'startup-canvas',
    title: 'Al Nibras Student Startup Canvas (Zero-to-One)',
    category: 'Venture Incubation',
    badge: 'Framework',
    description: 'A 1-page structured validation framework designed for university and college students to test startup viability before spending capital.',
    keyPoints: [
      'Problem definition & target community interview checklist',
      'Value proposition testing with zero budget',
      'Customer acquisition funnel & revenue validation'
    ]
  },
  {
    id: 'four-pillars-guide',
    title: 'The 4 Pillars Playbook: Innovate, Empower, Execute, Elevate',
    category: 'Leadership & Mindset',
    badge: 'Guidebook',
    description: 'The core leadership philosophy of Al Nibras Group detailing how young founders transition from classroom theory to market execution.',
    keyPoints: [
      'Innovate: Identifying latent friction in Pakistani markets',
      'Empower: Building co-founder trust and student peer networks',
      'Execute: Agile 14-day shipping sprints',
      'Elevate: Sustainable social impact and community value'
    ]
  },
  {
    id: 'pitch-deck-template',
    title: 'Student Venture Seed Pitch Deck Guide',
    category: 'Fundraising & Competitions',
    badge: 'Template',
    description: 'A 10-slide standard pitch structure optimized for Pakistani incubator competitions, grant applications, and angel rounds.',
    keyPoints: [
      'Slide-by-slide narrative structure and design guidelines',
      'Financial projections formula for early-stage student founders',
      'Common pitching pitfalls and Q&A defense strategies'
    ]
  },
  {
    id: 'sharia-ethical-checklist',
    title: 'Sharia-Compliant Ethical Business Blueprint',
    category: 'Halal Enterprise',
    badge: 'Compliance',
    description: 'Essential guidelines for launching 0% interest, fully transparent, and halal-aligned financial and commercial platforms.',
    keyPoints: [
      'Riba (interest) elimination in modern digital transactions',
      'Fair partner contracts & profit-loss sharing structures',
      'Ethical governance, data privacy, and community charity (Zakat/Sadaqah)'
    ]
  }
];

export async function downloadStudentResourcePdf(resource: StudentResource): Promise<void> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const primaryColor = rgb(0.06, 0.04, 0.09);
  const brandRed = rgb(0.9, 0.04, 0.08);
  const goldColor = rgb(0.82, 0.62, 0.25);
  const mutedColor = rgb(0.35, 0.35, 0.38);

  let y = 800;

  // Header Title
  page.drawText("AL NIBRAS GROUP - STUDENT ENTREPRENEUR HUB", {
    x: 40,
    y,
    size: 15,
    font: fontBold,
    color: primaryColor,
  });

  y -= 16;
  page.drawText("Incubation Series  |  Resource & Action Guide", {
    x: 40,
    y,
    size: 10,
    font: fontBold,
    color: brandRed,
  });

  y -= 14;
  page.drawText("Curated by Syed Muhammad Faizan Gillani (Founder & CEO, Al Nibras Group)", {
    x: 40,
    y,
    size: 8.5,
    font: fontOblique,
    color: mutedColor,
  });

  y -= 10;
  page.drawLine({
    start: { x: 40, y },
    end: { x: 555, y },
    thickness: 1.5,
    color: goldColor,
  });

  y -= 25;

  page.drawText(resource.title.toUpperCase(), {
    x: 40,
    y,
    size: 13,
    font: fontBold,
    color: brandRed,
  });

  y -= 14;
  page.drawText(`Category: ${resource.category}   |   Badge: ${resource.badge}`, {
    x: 40,
    y,
    size: 9,
    font: fontBold,
    color: goldColor,
  });

  y -= 20;

  // Overview Paragraph
  const words = resource.description.split(" ");
  let line = "";
  for (const w of words) {
    const testLine = line ? line + " " + w : w;
    const width = fontRegular.widthOfTextAtSize(testLine, 10);
    if (width > 515) {
      page.drawText(line, { x: 40, y, size: 10, font: fontRegular, color: primaryColor });
      y -= 14;
      line = w;
    } else {
      line = testLine;
    }
  }
  if (line) {
    page.drawText(line, { x: 40, y, size: 10, font: fontRegular, color: primaryColor });
    y -= 18;
  }

  y -= 10;
  page.drawText("KEY FRAMEWORK PRINCIPLES:", {
    x: 40,
    y,
    size: 10.5,
    font: fontBold,
    color: primaryColor,
  });
  y -= 16;

  for (const point of resource.keyPoints) {
    page.drawText(">", { x: 45, y, size: 10, font: fontBold, color: brandRed });
    
    // wrap point text
    const pWords = point.split(" ");
    let pLine = "";
    for (const pw of pWords) {
      const testP = pLine ? pLine + " " + pw : pw;
      const width = fontRegular.widthOfTextAtSize(testP, 9.5);
      if (width > 490) {
        page.drawText(pLine, { x: 60, y, size: 9.5, font: fontRegular, color: primaryColor });
        y -= 14;
        pLine = pw;
      } else {
        pLine = testP;
      }
    }
    if (pLine) {
      page.drawText(pLine, { x: 60, y, size: 9.5, font: fontRegular, color: primaryColor });
      y -= 18;
    }
  }

  y = 40;
  page.drawLine({
    start: { x: 40, y: y + 8 },
    end: { x: 555, y: y + 8 },
    thickness: 0.5,
    color: rgb(0.85, 0.85, 0.85),
  });
  page.drawText("Al Nibras Group — Lahore, Pakistan | https://alnibras.pk | Empowering Student Entrepreneurs", {
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
  link.download = `${resource.id}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
}
