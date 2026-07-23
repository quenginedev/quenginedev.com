export interface Contact {
  name: string
  title: string
  location: string
  email: string
  site: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
  handle?: string
}

export interface Hero {
  headline: string
  subheadline: string
  summary: string
  avatar: string
}

export interface EngineeringLane {
  layer: string
  tagline: string
  stack: string[]
  icon: string
}

export interface Experience {
  role: string
  company: string
  period: string
  startDate: string
  endDate: string | null
  highlights: string[]
  logo?: string
  url?: string
}

export interface Project {
  name: string
  description: string
  stack: string[]
  url?: string
  repo?: string
  logo?: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export type TechCategory = 'frontend' | 'backend' | 'infra' | 'platform'

export interface TechOrbitItem {
  name: string
  category: TechCategory
}

export interface ArchitecturePillar {
  title: string
  description: string
  icon: string
}

export type LanguageProficiency = 'production' | 'active' | 'experimenting' | 'exploring'

export interface PolyglotLanguage {
  name: string
  proficiency: LanguageProficiency
  focus: string
  icon: string
}

export interface AiInterest {
  title: string
  description: string
  icon: string
}

export interface AiEngineering {
  headline: string
  summary: string
  interests: AiInterest[]
}

export interface GtmInterest {
  title: string
  description: string
  icon: string
}

export interface GtmEngineering {
  headline: string
  summary: string
  interests: GtmInterest[]
}

export interface Overview {
  kicker: string[]
}

export interface ContactSection {
  headline: string[]
  subline: string
}

export interface LinkedInProfile {
  headline: string
  about: string
  featuredSkills: string[]
}

export interface LinkedInExperience {
  title: string
  company: string
  employmentType: string
  period: string
  location: string
  description: string
  bullets: string[]
  skills: string[]
}

export type HobbyCategory = 'gaming' | 'fitness'

export interface Hobby {
  name: string
  category: HobbyCategory
  detail: string
  icon: string
}

export const contact: Contact = {
  name: 'Ernest De-Graft Hayford',
  title: 'Lead Back-End · AI · GTM Engineer',
  location: 'Accra, Ghana',
  email: 'quenginedev@gmail.com',
  site: 'https://quenginedev.com',
}

export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/quenginedev',
    icon: 'mdi:github',
    handle: 'quenginedev',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ernest-hayford/',
    icon: 'mdi:linkedin',
    handle: 'ernest-hayford',
  },
]


export const hero: Hero = {
  headline: 'Lead Back-End · AI · GTM Engineer',
  subheadline:
    'APIs, payments & event-driven platforms at scale · AI systems · GTM automation',
  summary:
    '8+ years owning backend architecture, APIs, and production reliability — sole architect of HustleSasa services that scaled payments of 1M+ transactions daily with 99%+ uptime. I design Node/TypeScript microservices, payment rails, and cloud-native infrastructure for high-traffic platforms across African markets, with affinity for live entertainment and online ticketing workloads. AI engineering and GTM automation remain secondary lanes: agent workflows, eval gates, and revenue systems that give teams 5–10× leverage.',
  avatar: '/me.png',
}

export const overview: Overview = {
  kicker: ['Back-End Platforms', 'APIs & Scale', 'AI · GTM'],
}

export const architectureLead =
  'From Node/TypeScript APIs, payment services, and event-driven backends on Postgres, Mongo, Redis, and AWS/Kubernetes to Vue, React, and Svelte surfaces — plus AI agent pipelines and GTM automations when the problem needs them. I build systems that scale across every layer — platform first, commercial and technical.'

export const contactSection: ContactSection = {
  headline: ['Build', 'Platform', 'Systems'],
  subline:
    'Open to Lead Back-End and platform engineering roles first; AI engineering and GTM automation consulting still welcome.',
}

export const linkedInProfile: LinkedInProfile = {
  headline:
    'Lead Back-End · AI · GTM Engineer | APIs, payments & scalable platforms — plus AI systems and revenue automations',
  about: `I own backend architecture — APIs, services, payments, and reliability — and still ship AI and GTM systems when teams need leverage.

Lead back-end / platform engineer first: Node/TypeScript microservices, REST and GraphQL APIs, event-driven messaging, Postgres/Mongo/Redis, and AWS/Docker/Kubernetes delivery. AI engineer and GTM engineer in the same seat when the bottleneck is automation, agents, or revenue ops.

What that looks like in practice:
→ Backend platforms: payment rails, campaign/messaging services, caching and rate limiting, observability, and high-traffic reliability
→ Production AI systems with eval gates — not chatbots bolted onto features
→ GTM automation stacks: Clay enrichment, n8n/Make orchestration, HubSpot CRM wiring, LLM agents for research and personalization

Proof points:
→ Sole architect of HustleSasa backend services on a fintech platform serving African markets — scaled payments from $50K to $900K+/mo, 1M+ transactions/month, 99%+ uptime; experience that maps cleanly to live-entertainment and online-ticketing scale patterns
→ Mentored up to 4 engineers on practices, reviews, and service ownership
→ AI Operator Consultant at Invisible Technologies — LLM evaluation frameworks and QA pipelines for production AI
→ 8+ years shipping across fintech, agritech, automotive, and client GTM engagements

I engineer systems companies can run on — services, data, and infra first; AI and GTM as retained secondary lanes.

Open to: Lead Back-End and platform roles first; AI automation consulting, fractional GTM engineering, and partnerships where engineering moves revenue.

Accra, Ghana · quenginedev.com`,
  featuredSkills: [
    'Backend Architecture',
    'Microservices',
    'API Design',
    'Payment Infrastructure',
    'Event-Driven Systems',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'AWS',
    'Docker',
    'Kubernetes',
    'GraphQL',
    'Full-Stack Development',
    'AI Engineering',
    'GTM Engineering',
    'LLM Evaluation',
    'Workflow Automation',
    'Serverless Architecture',
  ],
}

export const linkedInExperience: LinkedInExperience[] = [
  {
    title: 'Lead Back-End / Full-Stack Engineer',
    company: 'HustleSasa',
    employmentType: 'Full-time',
    period: 'Jun 2023 – Present',
    location: 'Nairobi County, Kenya · Remote',
    description:
      'Sole architect of 5+ core backend services (and micro-frontend surfaces) on a fintech platform serving African markets — scaled from $50K to $900K+ in monthly transaction volume. Owned payment, campaign, and messaging infrastructure with the reliability patterns that map to high-traffic live-entertainment and online-ticketing workloads.',
    bullets: [
      'Designed and built end-to-end payment processing infrastructure from scratch — scaled to $900K+ monthly volume, 1M+ transactions/month, 99%+ uptime',
      'Owned REST/service APIs and domain services for customers, products, notifications, and payments across a multi-service backend',
      'Built Campaign delivery service (email/SMS) on AWS Step Functions and SQS for high-volume async messaging — event-driven outreach at scale',
      'Integrated WhatsApp Business API (360dialog) for transactional and campaign messaging at scale',
      'Reduced system latency by 65% through Redis caching strategy and CDN optimisation',
      'Designed distributed rate limiting using Token Bucket algorithm for API stability at scale',
      'Built real-time observability stack (ELK + Grafana) monitoring health across all services',
      'Strengthened data handling and access controls across payment and customer services — privacy-aware handling of financial and PII workloads',
      'Managed and mentored a team of up to 4 engineers on service ownership, reviews, and delivery practices',
      'Co-developed Customers, Notifications, and Products services alongside the core engineering team',
      'Led migration to micro-frontend architecture using Module Federation, improving deployment frequency by 300%',
      'Implemented streaming CSV customer export to S3 using Step Functions and S3 multipart upload',
    ],
    skills: ['AWS', 'Microservices', 'TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'MongoDB', 'Serverless', 'Module Federation'],
  },
  {
    title: 'AI Operator Consultant',
    company: 'Invisible Technologies',
    employmentType: 'Part-time',
    period: 'Sep 2023 – May 2025',
    location: 'United States · Remote',
    description:
      'Contract role focused on production AI systems: LLM evaluation, safety testing, quality benchmarking, and eval frameworks for models shipping to real users — the same rigor applied to GTM agent workflows and automations.',
    bullets: [
      'Developed structured evaluation frameworks to benchmark LLM output accuracy, factual grounding, and reasoning quality',
      'Built QA pipelines and eval gates for model output validation before production release',
      'Red-teamed models to identify failure modes, safety gaps, and adversarial edge cases',
      'Documented model breaks with detailed reproduction steps and recommended targeted improvements',
      'Collaborated with ML engineers on iterative model refinement and safety protocol design',
    ],
    skills: ['LLM Evaluation', 'AI Engineering', 'Python', 'JavaScript', 'AWS'],
  },
  {
    title: 'Automation & Frontend Engineer',
    company: 'Simple Dealer',
    employmentType: 'Full-time',
    period: 'Sep 2021 – Jun 2023',
    location: 'Atlanta, Georgia, United States · Remote',
    description:
      'US automotive lending automation platform — helps auto dealerships submit loan applications to multiple lenders automatically without re-filling forms manually. Built the workflow automation engine that eliminated repetitive manual work and drove platform revenue growth.',
    bullets: [
      'Automation Team (Jun 2021 – Sep 2021): Co-developed the core Autofill Engine (with 2 engineers) — a multi-threaded system that reads JSON instruction templates to automatically fill lender websites, eliminating manual form duplication across lenders',
      'Contributed to maintaining the in-house autofill core library using clean architecture principles',
      'Wrote integration and unit tests achieving 97% coverage',
      'Built automation services generating 250%+ revenue growth for the platform',
      'Frontend Team (Sep 2021 – Jun 2023): Shipped a new web application that accelerated product development by 400%',
      'Built UI components using React.js with full unit and integration test coverage of 99%',
      'Took additional roles across QA tooling, documentation, and customer success',
    ],
    skills: ['Workflow Automation', 'React.js', 'Microservices', 'TypeScript', 'Rust'],
  },
  {
    title: 'Full Stack Engineer → Technical Lead',
    company: 'Agro Innova Ltd',
    employmentType: 'Full-time',
    period: 'Jan 2020 – Jun 2021',
    location: 'Accra, Greater Accra Region, Ghana · Hybrid',
    description:
      'Agriculture startup serving smallholder farmers, buyers, and sellers across Ghana. Built outreach automation, offline-first systems, and marketplace infrastructure at scale.',
    bullets: [
      'Technical Lead (Mar 2021 – Jun 2021): Led infrastructure scaling to handle 3× traffic spikes with zero downtime',
      'Implemented blue-green deployment strategy reducing deployment risk',
      'Built CI/CD pipelines for AkokoMarket and FBSInnova using GCP',
      'Backend Engineer (Jul 2020 – Mar 2021): Solo-built USSD integration — enabling users without internet access to buy and sell goods. Still in production today',
      'Built bulk notification service that increased platform interactions by 170%',
      'Led design and implementation of services powering the Farmer Business School (FBS) platform',
      'Contributed to an offline-first mobile app helping farmers manage farm activities',
      'Frontend Developer (Jan 2020 – Jul 2020): Designed and implemented UI/UX for the AkokoMarket web platform',
      'Built Sellers and Admin dashboards for AkokoMarket',
    ],
    skills: ['TypeScript', 'GCP', 'Infrastructure as Code', 'USSD', 'CI/CD'],
  },
  {
    title: 'Freelance Software Engineer · AI & GTM Automation Consultant',
    company: 'Self Employed',
    employmentType: 'Part-time',
    period: 'Jan 2019 – Present',
    location: 'Accra, Ghana · Remote',
    description:
      'Independent consulting alongside full-time roles — full-stack products, AI agent workflows, and GTM automations for startups and SMEs across West Africa and remote US/EU clients.',
    bullets: [
      'Design GTM automation stacks: Clay enrichment, n8n/Make orchestration, HubSpot CRM wiring, LLM agents for lead research and personalized outbound',
      'Build department workflows and internal tools that deliver 5–10× operational leverage for marketing, sales, and ops teams',
      'Shipped My Approval — serverless platform for automating approval and workflow routing across departments (myapproval.app)',
      'Deliver full-stack solutions: API design, payment integrations, cloud infrastructure, and production AI systems with eval gates',
    ],
    skills: ['GTM Engineering', 'Clay', 'n8n', 'HubSpot', 'AI Engineering', 'TypeScript', 'Python'],
  },
  {
    title: 'Freelance Software Developer',
    company: 'Self Employed',
    employmentType: 'Self-employed',
    period: 'Jan 2017 – Jan 2019',
    location: 'Accra, Greater Accra Region, Ghana · On-site',
    description:
      'Independent software development for small businesses across Ghana during university and early career.',
    bullets: [
      'Delivered e-commerce builds, feature work, and code fixes for clients including MyKanta (e-commerce storefront) and House Party app',
      'Worked across frontend and backend on client projects from 2017 through university and into full-time employment',
    ],
    skills: ['TypeScript', 'JavaScript', 'Full-Stack Development'],
  },
]

export const engineeringLanes: EngineeringLane[] = [
  {
    layer: 'Services',
    tagline: 'Node/TypeScript APIs, event-driven workflows, and distributed backends',
    stack: ['Node.js', 'TypeScript', 'Express', 'GraphQL', 'REST', 'Hono'],
    icon: 'mdi:server-network',
  },
  {
    layer: 'Data',
    tagline: 'Schema design, caching layers, and data integrity at scale',
    stack: ['PostgreSQL', 'MongoDB', 'Redis', 'Drizzle'],
    icon: 'mdi:database-outline',
  },
  {
    layer: 'Cloud & Edge',
    tagline: 'AWS, containers, observability, and global delivery infrastructure',
    stack: ['AWS', 'Docker', 'Kubernetes', 'Cloudflare', 'Serverless'],
    icon: 'mdi:cloud-sync-outline',
  },
  {
    layer: 'Interface',
    tagline: 'Composable UIs, design systems, and micro-frontend surfaces',
    stack: ['Vue', 'Nuxt', 'React', 'Svelte'],
    icon: 'mdi:monitor-dashboard',
  },
]

export const resumeLink =
  'https://docs.google.com/document/d/1Qpblrp82H-Cpgz1eRfoqbGezkNoiR8B0-rxU9fvdHL4/edit?usp=sharing'

export const capabilities: string[] = [
  'Backend Architecture',
  'Microservices',
  'GraphQL & REST APIs',
  'Event-Driven Systems',
  'Payment Infrastructure',
  'Cloud-Native Delivery',
  'Serverless Architecture',
  'Full-Stack TypeScript',
  'AI Agent Systems',
  'GTM Automation',
  'Workflow Orchestration',
  'LLM Evaluation',
  'Module Federation',
  'Micro-Frontends',
  'Edge Computing',
]

export const techOrbit: TechOrbitItem[] = [
  { name: 'Node.js', category: 'backend' },
  { name: 'TypeScript', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  { name: 'AWS', category: 'infra' },
  { name: 'Docker', category: 'infra' },
  { name: 'Kubernetes', category: 'infra' },
  { name: 'Python', category: 'backend' },
  { name: 'LLMs', category: 'platform' },
  { name: 'Agents', category: 'platform' },
  { name: 'Vue', category: 'frontend' },
  { name: 'Nuxt', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Svelte', category: 'frontend' },
  { name: 'Rust', category: 'backend' },
  { name: 'Cloudflare', category: 'infra' },
]

export const architecturePillars: ArchitecturePillar[] = [
  {
    title: 'APIs & Microservices',
    description:
      'Node/TypeScript services with clear domain boundaries — REST and GraphQL APIs, resilient messaging, and observable pipelines that stay reliable under load.',
    icon: 'mdi:graph-outline',
  },
  {
    title: 'Payments & Reliability',
    description:
      'Payment rails, rate limiting, caching, and uptime discipline for high-traffic platforms — the same patterns that keep ticketing and live-event surges healthy.',
    icon: 'mdi:shield-check-outline',
  },
  {
    title: 'Serverless & Cloud',
    description:
      'Event-driven architectures on AWS with Docker/Kubernetes delivery — API gateways, background workers, and infra that scales without idle waste.',
    icon: 'mdi:cloud-outline',
  },
  {
    title: 'AI & GTM Systems',
    description:
      'Agent workflows, enrichment pipelines, and cross-department automations that wire CRMs, outbound tools, and LLMs into one revenue engine with guardrails and measurable outcomes.',
    icon: 'mdi:robot-outline',
  },
  {
    title: 'Micro-Frontends',
    description:
      'Module federation and independent frontend teams shipping Vue, React, and Svelte apps that compose into a unified product surface.',
    icon: 'mdi:view-grid-plus',
  },
]

export const polyglotLanguages: PolyglotLanguage[] = [
  {
    name: 'TypeScript',
    proficiency: 'production',
    focus:
      'Home base for full-stack delivery: typed Vue/React frontends, Node services, shared contracts, and the layer where most production systems are designed and shipped.',
    icon: 'mdi:language-typescript',
  },
  {
    name: 'Rust',
    proficiency: 'experimenting',
    focus:
      'Hands-on experimentation with systems programming: memory safety, concurrency, and performance patterns before committing them to production paths.',
    icon: 'mdi:language-rust',
  },
  {
    name: 'Python',
    proficiency: 'active',
    focus:
      'Heavy use when the problem calls for it: AI agent pipelines, GTM automations, data scripting, and fast backend prototyping — the default reach for LLM-powered systems.',
    icon: 'mdi:language-python',
  },
  {
    name: 'Mojo',
    proficiency: 'exploring',
    focus:
      'Early exploration for machine learning workloads: Python-like ergonomics with a path toward bare-metal performance for model-centric systems.',
    icon: 'mdi:lightning-bolt-outline',
  },
]

export const aiEngineering: AiEngineering = {
  headline: 'AI engineer, not AI user',
  summary:
    'I do not sprinkle GPT calls on features. I engineer AI systems on top of solid platform foundations: agent orchestration, evaluation frameworks, inference pipelines, and the reliability layer that turns demos into production. Current work includes LLM eval and QA at Invisible Technologies — the same rigor I bring to client automations.',
  interests: [
    {
      title: 'Agent orchestration',
      description:
        'Multi-step LLM workflows for research, enrichment, routing, and follow-up — with tool use, guardrails, and human handoff when confidence is low.',
      icon: 'mdi:robot-outline',
    },
    {
      title: 'Evaluation & benchmarking',
      description:
        'Designing rigorous eval frameworks for LLM outputs: quality scoring, regression detection, and production safety gates before anything ships.',
      icon: 'mdi:chart-timeline-variant-shimmer',
    },
    {
      title: 'Inference engineering',
      description:
        'Latency, context windows, batching, and deployment patterns for making models fast, observable, and dependable in real products.',
      icon: 'mdi:speedometer',
    },
    {
      title: 'Model mechanics',
      description:
        'Transformers, attention, embeddings, and how architecture choices shape capability and cost — so production systems are designed with limits in mind.',
      icon: 'mdi:brain',
    },
  ],
}

export const gtmEngineering: GtmEngineering = {
  headline: 'Revenue infrastructure, not more headcount',
  summary:
    'GTM engineering is where commercial instinct meets platform code. I build the automated systems behind outbound, inbound routing, CRM enrichment, approval workflows, and cross-department ops — wired with LLMs and APIs so marketing, sales, and operations run faster without hiring linearly.',
  interests: [
    {
      title: 'Cross-department automation',
      description:
        'Marketing, sales, CS, finance, HR — any team with repetitive workflows gets custom tooling. I map the bottleneck and ship the system, not a one-size template.',
      icon: 'mdi:sitemap-outline',
    },
    {
      title: 'AI-native GTM plays',
      description:
        'Lead research, personalization, enrichment cascades, and signal-triggered outbound — encoded as agent workflows with eval gates, not one-off prompts.',
      icon: 'mdi:target-account',
    },
    {
      title: 'Revenue stack integration',
      description:
        'CRM, enrichment, outbound, analytics, internal APIs — composed into one pipeline. Data flows in, qualified action flows out.',
      icon: 'mdi:pipe',
    },
    {
      title: '5–10× operational leverage',
      description:
        'Replace weeks of manual work with autonomous workflows. Outcomes: hours saved, pipeline velocity, conversion lift — engineered, measured, iterated.',
      icon: 'mdi:chart-arc',
    },
  ],
}

export const hobbies: Hobby[] = [
  {
    name: 'Apex Legends',
    category: 'gaming',
    detail: 'Fast-paced BR: movement mechanics and team coordination.',
    icon: 'mdi:crosshairs-gps',
  },
  {
    name: 'FIFA',
    category: 'gaming',
    detail: 'Football on the couch: tactics, seasons, and the occasional rage quit.',
    icon: 'mdi:soccer',
  },
  {
    name: 'Rainbow Six Siege',
    category: 'gaming',
    detail: 'Tactical FPS: map knowledge, operator synergy, and clutch rounds.',
    icon: 'mdi:shield-half-full',
  },
  {
    name: 'Swimming',
    category: 'fitness',
    detail: 'Laps for clarity: low-impact cardio and a reset from the screen.',
    icon: 'mdi:pool',
  },
  {
    name: 'Football',
    category: 'fitness',
    detail: 'Pickup matches with friends, the real kind, on grass.',
    icon: 'mdi:soccer-field',
  },
  {
    name: 'Basketball',
    category: 'fitness',
    detail: 'Casual runs and shoot-arounds: competition without the league fees.',
    icon: 'mdi:basketball',
  },
  {
    name: 'Jogging',
    category: 'fitness',
    detail: 'Early morning or evening runs to clear the head and stay sharp.',
    icon: 'mdi:run',
  },
]

export const experience: Experience[] = [
  {
    role: 'Lead Back-End / Full-Stack Engineer',
    company: 'HustleSasa',
    period: 'Jul 2023 – Present',
    startDate: '2023-07',
    endDate: null,
    highlights: [
      'Architect and own 5+ core backend services and APIs powering payment, campaign, and messaging infrastructure across African markets',
      'Scaled payment volume from $50K to $900K+/mo — 1M+ transactions/month with 99%+ uptime under high-traffic load',
      'Built event-driven delivery on AWS Step Functions and SQS; cut API latency 65% via Redis caching and query optimization',
      'Mentored up to 4 engineers on service ownership, reviews, and delivery practices',
      'Strengthened data handling and access controls for financial and customer PII workloads',
      'Shipped micro-frontend surfaces with Module Federation alongside core backend ownership',
    ],
    logo: '/logos/hustlesasa.png',
    url: 'https://hustlesasa.com',
  },
  {
    role: 'AI Operator Consultant',
    company: 'Invisible Technologies',
    period: 'Oct 2024 – Present',
    startDate: '2024-10',
    endDate: null,
    highlights: [
      'Design and implement LLM evaluation frameworks for production AI systems',
      'Build quality assurance pipelines for model output validation',
      'Architect agent workflows with eval gates for reliable GTM and ops automation',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Simple Dealer',
    period: 'Sep 2021 – Jul 2023',
    startDate: '2021-09',
    endDate: '2023-07',
    highlights: [
      'Built Autofill Engine processing 1,000+ transactions/minute',
      'Achieved 97% test coverage across core services',
      'Designed high-throughput automotive data ingestion pipelines',
      'Delivered full-stack features across Vue frontends and Node.js/Rust backends',
    ],
    logo: '/logos/simple-dealer.jpeg',
  },
  {
    role: 'Technical Lead',
    company: 'Agro Innova',
    period: 'Feb 2021 – Jun 2021',
    startDate: '2021-02',
    endDate: '2021-06',
    highlights: [
      'Led engineering team through product pivot and platform consolidation',
      'Defined technical roadmap and architecture for agritech products',
    ],
    logo: '/logos/agroinnova.jpeg',
  },
  {
    role: 'Full Stack Engineer',
    company: 'Agro Innova',
    period: 'Jan 2020 – Feb 2021',
    startDate: '2020-01',
    endDate: '2021-02',
    highlights: [
      'Built USSD platform for farmer engagement at scale',
      'Developed Akoko Market marketplace and Farm Business School (FBS)',
      'Implemented Bulk SMS notification system for agricultural outreach',
    ],
    logo: '/logos/agroinnova.jpeg',
  },
  {
    role: 'Freelance Software Engineer',
    company: 'Independent',
    period: '2017 – Present',
    startDate: '2017-01',
    endDate: null,
    highlights: [
      'Deliver full-stack and AI automation solutions for startups and SMEs across West Africa',
      'Build GTM systems, internal tools, and department workflows that multiply team output',
      'Specialized in API design, agent orchestration, cloud infrastructure, and payment integrations',
    ],
    logo: '/logos/quengiendev.jpeg',
  },
]

export const projects: Project[] = [
  {
    name: 'HMS',
    description:
      'Full-stack hospital management system for clinics in Ghana: patient registration, OPD triage, billing, and role-based access',
    stack: ['Vue 3', 'Hono', 'PostgreSQL', 'Drizzle', 'Better Auth', 'Cloudflare R2'],
    logo: '/logos/quengiendev.jpeg',
  },
  {
    name: 'Standalone Autofill Engine',
    description: 'High-performance automotive data autofill engine rewritten in Rust',
    stack: ['Rust'],
    logo: '/logos/simple-dealer.jpeg',
  },
  {
    name: 'Agent Revenue Pipeline',
    description:
      'Consulting GTM system: Clay enrichment and signal triggers feed n8n orchestration and HubSpot CRM, with LLM agents handling lead research, personalized outbound, and inbound routing — eval gates before anything reaches a prospect.',
    stack: ['Clay', 'n8n', 'Make', 'HubSpot', 'Python', 'TypeScript', 'LLM APIs'],
    logo: '/logos/quengiendev.jpeg',
  },
  {
    name: 'My Approval',
    description: 'Serverless platform for automating approval and workflow routing across departments',
    stack: ['Nuxt', 'Serverless', 'AWS'],
    url: 'https://myapproval.app',
    logo: '/logos/my-approval.png',
  },
  {
    name: 'Hami Express',
    description: 'GraphQL library for building schema-first APIs with minimal boilerplate',
    stack: ['GraphQL', 'Node.js', 'TypeScript'],
    repo: 'https://github.com/quenginedev/hami-express',
    logo: '/logos/quengiendev.jpeg',
  },
  {
    name: 'SST Deploy',
    description: 'GitHub Action for deploying SST applications to AWS with zero config',
    stack: ['GitHub Actions', 'SST', 'AWS'],
    repo: 'https://github.com/quenginedev/sst-deploy',
    logo: '/logos/quengiendev.jpeg',
  },
]

export const skills: SkillCategory[] = [
  {
    category: 'Languages & Frameworks',
    items: [
      'TypeScript',
      'Node.js',
      'Express',
      'Hono',
      'GraphQL',
      'Python',
      'Rust',
      'Mojo',
      'Vue',
      'Nuxt',
      'React',
      'Svelte',
    ],
  },
  {
    category: 'Databases & Caching',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB'],
  },
  {
    category: 'Cloud & Infrastructure',
    items: [
      'AWS',
      'Docker',
      'Kubernetes',
      'Serverless',
      'SST',
      'Cloudflare',
      'Edge Computing',
    ],
  },
  {
    category: 'Architecture & Patterns',
    items: [
      'Microservices',
      'Event-Driven',
      'Distributed Systems',
      'Payment Infrastructure',
      'REST & GraphQL APIs',
      'Serverless',
      'Micro-Frontends',
      'Module Federation',
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      'AI Engineering',
      'GTM Engineering',
      'Agent Orchestration',
      'LLM Evaluation',
      'Workflow Automation',
      'Prompt Engineering',
    ],
  },
  {
    category: 'GTM Stack',
    items: ['Clay', 'n8n', 'Make', 'HubSpot'],
  },
  {
    category: 'Practices & Domains',
    items: [
      'Fintech',
      'Payment Infrastructure',
      'CI/CD',
      'Test-Driven Development',
      'Data Security & Privacy',
      'GTM Systems',
      'AI Engineering',
    ],
  },
]
