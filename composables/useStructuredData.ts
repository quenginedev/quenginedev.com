import { contact } from '~/data/portfolio'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/ernest-hayford/'

const SCHEMA_CONTEXT = 'https://schema.org'

const AREA_SERVED = [
  { '@type': 'City', name: 'Accra' },
  { '@type': 'Country', name: 'Ghana' },
  { '@type': 'Place', name: 'Remote' },
]

export type FaqItem = {
  question: string
  answer: string
}

export function buildServiceJsonLd(opts: {
  name: string
  description: string
  url: string
}) {
  const providerId = `${contact.site}/#provider`

  return {
    '@context': SCHEMA_CONTEXT,
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': providerId,
        name: contact.name,
        url: contact.site,
        areaServed: AREA_SERVED,
        sameAs: [LINKEDIN_URL],
      },
      {
        '@type': 'Service',
        name: opts.name,
        description: opts.description,
        url: opts.url,
        provider: { '@id': providerId },
        areaServed: AREA_SERVED,
      },
    ],
  }
}

export function buildFaqPageJsonLd(faqs: FaqItem[]) {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function jsonLdScript(graph: Record<string, unknown> | null) {
  if (!graph) return []
  return [{ type: 'application/ld+json', innerHTML: JSON.stringify(graph) }]
}
