export interface HireOffering {
  name: string
  scope: string
  stack: string
  engagementType: string
}

export interface HireFaq {
  question: string
  answer: string
}

export interface HirePageMeta {
  title: string
  description: string
  h1: string
}

export const hireMeta: HirePageMeta = {
  title: 'Work With Me | Backend, GTM & AI Engineering Consulting',
  description:
    'I consult on backend architecture, GTM automation, and LLM eval work. Based in Accra (GMT), available remote. Node.js, AWS, n8n, HubSpot, Clay, and production AI QA.',
  h1: 'Work With Me: Backend, GTM and AI Engineering',
}

export const hireOfferings: HireOffering[] = [
  {
    name: 'Advisory',
    scope:
      'I provide architecture reviews, technical due diligence, roadmap prioritization, and async guidance on backend, payments, GTM automation, or AI eval strategy.',
    stack: 'Node.js, AWS, PostgreSQL, n8n, HubSpot, Clay, LLM APIs',
    engagementType: 'Retainer or hourly, async-first with scheduled sync calls',
  },
  {
    name: 'Fractional Backend Lead',
    scope:
      'I lead Node.js microservices, payment infrastructure, AWS platform design, and team mentorship. I own architecture decisions and ship critical path services.',
    stack: 'Node.js, TypeScript, AWS, Kubernetes, PostgreSQL, Redis, event-driven pipelines',
    engagementType: 'Part-time embedded, typically 2-3 days per week',
  },
  {
    name: 'Project-based GTM Pipeline',
    scope:
      'I build Clay enrichment, n8n orchestration, and HubSpot CRM automation end to end. Deliverables include eval gates on data quality before outbound triggers.',
    stack: 'n8n, HubSpot, Clay, Slack, webhooks, TypeScript',
    engagementType: 'Fixed-scope project, 4-8 week delivery windows',
  },
]

export const hireFaqs: HireFaq[] = [
  {
    question: 'What timezone do you work in?',
    answer:
      'I am based in Accra, Ghana (GMT / UTC+0). I overlap with US Eastern mornings and European afternoons. Remote async work is my default; I schedule live calls in advance.',
  },
  {
    question: 'What stacks do you work with?',
    answer:
      'Backend: Node.js, TypeScript, PostgreSQL, MongoDB, Redis, AWS, Kubernetes. GTM: n8n, HubSpot, Clay, Slack, webhooks. AI: LLM APIs, Python eval harnesses, agent orchestration, production QA pipelines.',
  },
  {
    question: 'How does engagement work?',
    answer:
      'I offer three models: Advisory (retainer or hourly async guidance), Fractional Backend Lead (part-time embedded leadership), and Project-based GTM Pipeline (fixed-scope automation builds). Pick the model that matches your timeline and ownership needs.',
  },
  {
    question: 'Are you available for remote contracts?',
    answer:
      'Yes. Remote is my default. I have delivered for US, European, and African teams without on-site requirements. Message me on LinkedIn to discuss scope and availability.',
  },
]
