/**
 * Central, editable configuration for every contact surface on the site.
 * Swap these values for the real details when they are supplied — no code changes needed.
 */
export const site = {
  name: "Struvoo",
  tagline: "Digital Growth & Creative Agency",
  email: "hello@struvoo.com",
  phone: "+1 (555) 018-2470",
  phoneHref: "tel:+15550182470",
  location: "Studio 04 — Remote worldwide",
  availability: "Currently booking new projects",
  socials: [
    { label: "Instagram", href: "https://instagram.com/", short: "IG" },
    { label: "LinkedIn", href: "https://linkedin.com/", short: "IN" },
    { label: "YouTube", href: "https://youtube.com/", short: "YT" },
    { label: "Behance", href: "https://behance.net/", short: "BE" },
  ],
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export const services = [
  {
    index: "01",
    id: "performance-marketing",
    title: "Performance Marketing",
    lede: "Campaigns engineered around the numbers that actually move a business.",
    body: "Campaign strategy, paid advertising, audience targeting, conversion optimisation and performance analysis — built as one continuous loop rather than a monthly report.",
    points: ["Campaign strategy", "Paid media", "Audience targeting", "Conversion optimisation", "Performance analysis"],
  },
  {
    index: "02",
    id: "web-design-development",
    title: "Web Design & Development",
    lede: "Interfaces that feel inevitable — and are built to convert.",
    body: "High-end website experiences, responsive interfaces, frontend development and conversion-focused design, produced with the same rigour on a phone as on a studio display.",
    points: ["Experience design", "Responsive interfaces", "Frontend development", "Design systems", "Conversion-focused UX"],
  },
  {
    index: "03",
    id: "video-editing",
    title: "Video Editing",
    lede: "Story first. Rhythm always. Every frame earns its place.",
    body: "Professional video editing, branded content, storytelling and social-first video production — cut for the platform it lives on, not adapted to it afterwards.",
    points: ["Branded content", "Story editing", "Colour & sound", "Social-first cuts", "Versioning at scale"],
  },
  {
    index: "04",
    id: "motion-graphics",
    title: "Motion Graphics",
    lede: "Design that behaves — typography, form and light in movement.",
    body: "Animated typography, dynamic visuals, motion design and engaging digital experiences that give a brand a recognisable way of moving.",
    points: ["Animated typography", "Logo animation", "2D & 3D motion", "Title sequences", "Motion systems"],
  },
  {
    index: "05",
    id: "social-media-management",
    title: "Social Media Management",
    lede: "A consistent presence, planned like a campaign and published like clockwork.",
    body: "Content strategy, creative planning, account management, publishing and brand consistency across every channel your audience actually uses.",
    points: ["Content strategy", "Creative planning", "Account management", "Publishing", "Brand consistency"],
  },
] as const;

export type Project = {
  id: string;
  title: string;
  industry: string;
  services: string;
  year: string;
  summary: string;
  detail: string;
  deliverables: string[];
  image: string;
  tone: string;
};

/** Sample / demonstration projects — replace with real case studies when supplied. */
export const projects: Project[] = [
  {
    id: "aurora-commerce",
    title: "Aurora Commerce",
    industry: "Retail & E-commerce",
    services: "Performance Marketing · Web Design",
    year: "Sample",
    summary: "A demonstration commerce brand rebuilt around a single question: what actually makes a shopper finish?",
    detail:
      "This entry is an illustrative placeholder that shows how a Struvoo case study is structured: the commercial problem, the creative response, and the system that keeps improving after launch. Replace the copy, imagery and figures with the real Aurora Commerce case study when client approval is received.",
    deliverables: ["Paid media framework", "Storefront redesign", "Landing page system", "Creative testing matrix"],
    image: "images/work-aurora.jpg",
    tone: "Conversion systems",
  },
  {
    id: "meridian-studios",
    title: "Meridian Studios",
    industry: "Media & Entertainment",
    services: "Video Editing · Motion Graphics",
    year: "Sample",
    summary: "A demonstration content studio identity carried through edit, motion and release.",
    detail:
      "An illustrative placeholder showing the shape of a production-led case study: an editorial identity, a title system, and a repeatable edit pipeline designed for volume without losing craft. Swap in the real project material when it is available.",
    deliverables: ["Title system", "Edit pipeline", "Motion identity", "Release templates"],
    image: "images/work-meridian.jpg",
    tone: "Motion identity",
  },
  {
    id: "northwave-fitness",
    title: "Northwave Fitness",
    industry: "Health & Fitness",
    services: "Social Media Management · Performance",
    year: "Sample",
    summary: "A demonstration membership brand with a content engine built for consistency.",
    detail:
      "An illustrative placeholder demonstrating how a always-on social and performance engagement is documented: content pillars, publishing rhythm, creative direction and the measurement loop behind it. Replace with the approved case study material.",
    deliverables: ["Content pillars", "Publishing system", "Campaign creative", "Reporting framework"],
    image: "images/work-northwave.jpg",
    tone: "Content engines",
  },
  {
    id: "lumen-finance",
    title: "Lumen Finance",
    industry: "Fintech",
    services: "Web Design & Development · Brand Systems",
    year: "Sample",
    summary: "A demonstration fintech platform where clarity is the product feature.",
    detail:
      "An illustrative placeholder for a platform-scale case study: information architecture, interface system, and a design language engineered for trust. Replace with the real Lumen Finance engagement once it is cleared for publication.",
    deliverables: ["Interface system", "Design language", "Marketing site", "Component library"],
    image: "images/work-lumen.jpg",
    tone: "Product design",
  },
];

export const principles = [
  {
    index: "01",
    title: "Strategy before execution",
    body: "Nothing is designed before the business, the audience and the outcome are understood. Direction first, decoration never.",
  },
  {
    index: "02",
    title: "Creativity backed by data",
    body: "Ideas are judged twice — once on whether they are unforgettable, once on whether they performed. We keep both scores.",
  },
  {
    index: "03",
    title: "Design focused on experience",
    body: "Every interface decision is a user decision. We design for clarity, speed and the feeling of being understood.",
  },
  {
    index: "04",
    title: "Content built for engagement",
    body: "Content is planned as a system — formats, rhythm and voice — so the brand shows up consistently instead of occasionally.",
  },
  {
    index: "05",
    title: "Marketing measured on outcomes",
    body: "Activity is not achievement. We measure the work against the goals it was built to move, and we refine relentlessly.",
  },
];

export const processSteps = [
  {
    index: "01",
    title: "Discover",
    body: "We understand the business, the audience and the goals — then define what success actually looks like.",
    meta: "Audit · Research · Positioning",
  },
  {
    index: "02",
    title: "Strategize",
    body: "We develop the creative and performance roadmap: message, channels, formats and the measurement plan behind them.",
    meta: "Roadmap · Messaging · Media plan",
  },
  {
    index: "03",
    title: "Create",
    body: "We design, develop, edit and execute — building the assets and experiences the strategy depends on.",
    meta: "Design · Build · Production",
  },
  {
    index: "04",
    title: "Optimize",
    body: "We measure, refine and improve. What works gets scaled, what doesn't gets rebuilt — continuously.",
    meta: "Measure · Test · Scale",
  },
];
