export interface ServiceOffering {
  slug: string
  path: string
  title: string
  description: string
  h1: string
  problem: string
  agitate: string
  solution: string
  deliverables: string[]
  stack: string[]
  keywords: string[]
}

export const services: ServiceOffering[] = [
  {
    slug: 'gtm-engineering',
    path: '/services/gtm-engineering',
    title: 'GTM Engineering Contractor | n8n, HubSpot & Clay Automation',
    description:
      'I build n8n and HubSpot integrations, Clay lead enrichment pipelines, and outbound workflows that scale your pipeline without adding headcount.',
    h1: 'GTM Automation Contractor: Build Pipelines That Run While You Sell',
    problem:
      'Your sales team spends hours copying leads between tools, chasing stale CRM data, and running manual enrichment before anyone picks up the phone. Every hour on ops is an hour not closing.',
    agitate:
      'Missed follow-ups stack up. HubSpot records drift out of sync with Clay and your outbound stack. You hire another ops person, or you keep burning founder time on workflows that should run themselves.',
    solution:
      'I design and ship production GTM automation: n8n orchestration wired to HubSpot, Clay enrichment that feeds qualified leads into your CRM, and eval gates so bad data never hits outbound. You get a pipeline that enriches, routes, and triggers follow-up without daily babysitting.',
    deliverables: [
      'Clay-to-HubSpot enrichment pipeline with dedupe and field mapping',
      'n8n workflows for lead routing, Slack alerts, and CRM sync',
      'HubSpot custom properties, lists, and lifecycle triggers aligned to your ICP',
      'Outbound sequence triggers gated on data quality checks',
      'Runbook and handoff docs so your team can operate and extend flows',
    ],
    stack: ['n8n', 'HubSpot', 'Clay', 'Slack', 'Webhooks', 'TypeScript'],
    keywords: [
      'GTM automation contractor',
      'n8n HubSpot integrations',
      'Clay lead enrichment',
      'GTM engineering',
      'sales pipeline automation',
    ],
  },
  {
    slug: 'backend-architecture',
    path: '/services/backend-architecture',
    title: 'Fractional Backend Lead | Node.js Payments & AWS Microservices',
    description:
      'I lead Node.js payment infrastructure and AWS microservices builds. Scale APIs, payment rails, and event-driven backends without a full-time hire.',
    h1: 'Fractional Backend Lead: Ship Payment Rails and Microservices That Scale',
    problem:
      'Your product outgrew the MVP backend. Payment flows are brittle, services are tangled, and every release feels like a gamble. You need senior backend leadership, not another feature factory.',
    agitate:
      'Downtime costs revenue and trust. A single hotfix can break three downstream services. Hiring a full-time architect takes months; your roadmap cannot wait.',
    solution:
      'I architect Node.js payment infrastructure at scale: microservices on AWS, event-driven pipelines, and reliability patterns for high-traffic workloads. You get my architecture decisions, implementation leadership, and production-ready services without full-time overhead.',
    deliverables: [
      'Architecture review and target-state roadmap for your backend',
      'Node.js/TypeScript microservice design with clear service boundaries',
      'Payment rail integration, idempotency, and reconciliation patterns',
      'AWS infrastructure layout: ECS/EKS, queues, caching, observability',
      'CI/CD and release gates aligned to your team\'s delivery cadence',
    ],
    stack: ['Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Redis', 'Kubernetes'],
    keywords: [
      'Fractional Backend Lead',
      'Node.js payment infrastructure',
      'AWS microservices architect',
      'backend architecture consultant',
      'payment rails',
    ],
  },
  {
    slug: 'ai-engineering-evals',
    path: '/services/ai-engineering-evals',
    title: 'LLM Evaluation Consultant | AI Agent Orchestration & Production QA',
    description:
      'I build eval frameworks, AI agent orchestration pipelines, and Production LLM QA gates before models ship to users.',
    h1: 'LLM Evaluation Consultant: Gate AI Output Before It Reaches Production',
    problem:
      'Your team shipped an LLM feature on demo-quality prompts. Now hallucinations, drift, and edge-case failures show up in production, and you have no systematic way to catch them before release.',
    agitate:
      'Every bad model response erodes user trust. Manual spot-checking does not scale. Regressions slip through because evals live in spreadsheets, not in your CI pipeline.',
    solution:
      'I build Production LLM QA into your delivery flow: structured eval suites, AI agent orchestration with guardrails, and release gates that block regressions. You ship AI features with the same rigor you apply to backend services.',
    deliverables: [
      'Eval framework design: datasets, scoring rubrics, and regression baselines',
      'AI agent orchestration workflows with tool use and human handoff points',
      'CI-integrated eval gates for pre-merge and pre-release checks',
      'Production monitoring hooks for drift detection and quality alerts',
      'Documentation and runbooks for your team to extend eval coverage',
    ],
    stack: ['Python', 'TypeScript', 'LLM APIs', 'Eval harnesses', 'CI/CD', 'AWS'],
    keywords: [
      'LLM evaluation consultant',
      'AI agent orchestration',
      'Production LLM QA',
      'LLM eval frameworks',
      'AI engineering consultant',
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceOffering | undefined {
  return services.find((s) => s.slug === slug)
}
