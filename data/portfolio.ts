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

export type HobbyCategory = 'gaming' | 'fitness'

export interface Hobby {
  name: string
  category: HobbyCategory
  detail: string
  icon: string
}

export const contact: Contact = {
  name: 'Ernest De-Graft Hayford',
  title: 'Senior Full-Stack Engineer',
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
  headline: 'Senior Full-Stack Engineer',
  subheadline:
    'Microservices · Serverless · Micro-Frontends · Vue / React / Svelte across fintech & distributed systems',
  summary:
    '8+ years shipping full-stack products from UI to infrastructure. Sole architect of HustleSasa platform ($50K→$900K+/mo payments). Module federation, edge/serverless, and production-grade systems across fintech, agritech, and automotive.',
  avatar: '/me.png',
}

export const engineeringLanes: EngineeringLane[] = [
  {
    layer: 'Interface',
    tagline: 'Composable UIs, design systems, and micro-frontend surfaces',
    stack: ['Vue', 'Nuxt', 'React', 'Svelte'],
    icon: 'mdi:monitor-dashboard',
  },
  {
    layer: 'Services',
    tagline: 'APIs, event-driven workflows, and distributed backends',
    stack: ['Node.js', 'TypeScript', 'GraphQL', 'Hono'],
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
    tagline: 'Serverless, observability, and global delivery infrastructure',
    stack: ['AWS', 'Cloudflare', 'Kubernetes', 'Serverless'],
    icon: 'mdi:cloud-sync-outline',
  },
]

export const resumeLink =
  'https://docs.google.com/document/d/1Qpblrp82H-Cpgz1eRfoqbGezkNoiR8B0-rxU9fvdHL4/edit?usp=sharing'

export const capabilities: string[] = [
  'Module Federation',
  'Serverless Architecture',
  'Microservices',
  'Edge Computing',
  'GraphQL APIs',
  'Micro-Frontends',
  'Event-Driven Systems',
  'Payment Infrastructure',
  'Cloud-Native Delivery',
  'Full-Stack TypeScript',
]

export const techOrbit: TechOrbitItem[] = [
  { name: 'Vue', category: 'frontend' },
  { name: 'Nuxt', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Svelte', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'Rust', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  { name: 'AWS', category: 'infra' },
  { name: 'Cloudflare', category: 'infra' },
  { name: 'Kubernetes', category: 'infra' },
]

export const architecturePillars: ArchitecturePillar[] = [
  {
    title: 'Microservices',
    description:
      'Decompose monoliths into independently deployable services with clear domain boundaries, resilient communication, and observable pipelines.',
    icon: 'mdi:graph-outline',
  },
  {
    title: 'Serverless',
    description:
      'Event-driven, pay-per-use architectures on AWS and edge runtimes — from API gateways to background workers with zero idle cost.',
    icon: 'mdi:cloud-outline',
  },
  {
    title: 'Micro-Frontends',
    description:
      'Module federation and independent frontend teams shipping Vue, React, and Svelte apps that compose into a unified product surface.',
    icon: 'mdi:view-grid-plus',
  },
  {
    title: 'Edge / Cloud',
    description:
      'Global delivery via Cloudflare Workers, CDN caching, and cloud-native infra — low latency from browser to database.',
    icon: 'mdi:earth',
  },
]

export const polyglotLanguages: PolyglotLanguage[] = [
  {
    name: 'TypeScript',
    proficiency: 'production',
    focus:
      'Home base for full-stack delivery — typed Vue/React frontends, Node services, shared contracts, and the layer where most production systems are designed and shipped.',
    icon: 'mdi:language-typescript',
  },
  {
    name: 'Rust',
    proficiency: 'experimenting',
    focus:
      'Hands-on experimentation with systems programming — memory safety, concurrency, and performance patterns before committing them to production paths.',
    icon: 'mdi:language-rust',
  },
  {
    name: 'Python',
    proficiency: 'active',
    focus:
      'Heavy use when the problem calls for it — AI pipelines, data scripting, and fast backend prototyping — but a deliberate reach, not the default stack.',
    icon: 'mdi:language-python',
  },
  {
    name: 'Mojo',
    proficiency: 'exploring',
    focus:
      'Early exploration for machine learning workloads — Python-like ergonomics with a path toward bare-metal performance for model-centric systems.',
    icon: 'mdi:lightning-bolt-outline',
  },
]

export const aiEngineering: AiEngineering = {
  headline: 'Beyond the API — into the machine',
  summary:
    'I build with AI models in production, but I am equally drawn to how they work under the hood: transformers, attention, training dynamics, evaluation methodology, and the engineering trade-offs that separate demos from reliable systems.',
  interests: [
    {
      title: 'Transformer internals',
      description:
        'Attention mechanisms, embeddings, positional encoding, and how architecture choices shape capability and cost at inference time.',
      icon: 'mdi:brain',
    },
    {
      title: 'Evaluation & benchmarking',
      description:
        'Designing rigorous eval frameworks for LLM outputs — quality scoring, regression detection, and production safety gates.',
      icon: 'mdi:chart-timeline-variant-shimmer',
    },
    {
      title: 'Inference engineering',
      description:
        'Latency, context windows, batching, and deployment patterns — making models fast, observable, and dependable in real products.',
      icon: 'mdi:speedometer',
    },
    {
      title: 'Model behavior & alignment',
      description:
        'Understanding failure modes, hallucination patterns, and how to reason about model limits when shipping AI-powered features.',
      icon: 'mdi:shield-search',
    },
  ],
}

export const hobbies: Hobby[] = [
  {
    name: 'Apex Legends',
    category: 'gaming',
    detail: 'Fast-paced BR — movement mechanics and team coordination.',
    icon: 'mdi:crosshairs-gps',
  },
  {
    name: 'FIFA',
    category: 'gaming',
    detail: 'Football on the couch — tactics, seasons, and the occasional rage quit.',
    icon: 'mdi:soccer',
  },
  {
    name: 'Rainbow Six Siege',
    category: 'gaming',
    detail: 'Tactical FPS — map knowledge, operator synergy, and clutch rounds.',
    icon: 'mdi:shield-half-full',
  },
  {
    name: 'Swimming',
    category: 'fitness',
    detail: 'Laps for clarity — low-impact cardio and a reset from the screen.',
    icon: 'mdi:pool',
  },
  {
    name: 'Football',
    category: 'fitness',
    detail: 'Pickup matches with friends — the real kind, on grass.',
    icon: 'mdi:soccer-field',
  },
  {
    name: 'Basketball',
    category: 'fitness',
    detail: 'Casual runs and shoot-arounds — competition without the league fees.',
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
    role: 'Lead Full-Stack Engineer',
    company: 'HustleSasa',
    period: 'Jul 2023 – Present',
    startDate: '2023-07',
    endDate: null,
    highlights: [
      'Architect and maintain more than 5 core backend services and micro-frontend surfaces powering fintech infrastructure',
      'Scaled transaction volume of 1M+ transactions / month (18× growth)',
      'Achieved 99%+ uptime across production services',
      'Reduced API latency by 65% through query optimization and caching',
      'Led micro-frontend migration with module federation, increasing deploy frequency by 300%',
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
      'Delivered full-stack solutions for startups and SMEs across West Africa',
      'Specialized in API design, cloud infrastructure, payment integrations, and modern frontends',
    ],
    logo: '/logos/quengiendev.jpeg',
  },
]

export const projects: Project[] = [
  {
    name: 'HMS',
    description:
      'Full-stack hospital management system for clinics in Ghana — patient registration, OPD triage, billing, and role-based access',
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
    name: 'My Approval',
    description: 'Serverless platform for automating approval workflows in organizations',
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
      'Rust',
      'Python',
      'Mojo',
      'Vue',
      'Nuxt',
      'React',
      'Svelte',
      'Hono',
      'Express',
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    items: [
      'AWS',
      'Kubernetes',
      'Docker',
      'Serverless',
      'SST',
      'Cloudflare',
      'Edge Computing',
    ],
  },
  {
    category: 'Databases & Caching',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB'],
  },
  {
    category: 'Architecture & Patterns',
    items: [
      'Microservices',
      'Micro-Frontends',
      'Module Federation',
      'Event-Driven',
      'Serverless',
      'Distributed Systems',
      'GraphQL',
    ],
  },
  {
    category: 'Practices & Domains',
    items: ['Fintech', 'AI Engineering', 'CI/CD', 'Test-Driven Development', 'Payment Infrastructure'],
  },
]
