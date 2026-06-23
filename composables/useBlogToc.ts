import type { BlogPost, BlogTocLink } from '~/composables/useBlogPosts'

function nodeText(node: unknown): string {
	if (!node || typeof node !== 'object') return ''
	const record = node as { type?: string; value?: string; children?: unknown[] }
	if (record.type === 'text' && record.value) return record.value
	if (!record.children?.length) return ''
	return record.children.map(nodeText).join('')
}

function walkHeadings(node: unknown, links: BlogTocLink[] = []): BlogTocLink[] {
	if (!node || typeof node !== 'object') return links
	const record = node as { tag?: string; props?: { id?: string }; children?: unknown[] }
	if (record.tag?.match(/^h[2-3]$/) && record.props?.id) {
		links.push({
			id: record.props.id,
			depth: Number(record.tag[1]),
			text: nodeText(record),
		})
	}
	for (const child of record.children ?? []) {
		walkHeadings(child, links)
	}
	return links
}

export function extractTocFromPage(page: BlogPost | null | undefined): BlogTocLink[] {
	if (!page) return []
	const withToc = page as BlogPost & { toc?: { links?: BlogTocLink[] } }
	const direct = withToc.toc?.links ?? page.body?.toc?.links
	if (direct?.length) return direct
	return walkHeadings(page.body)
}

export function textFromPage(page: BlogPost | null | undefined): string {
	if (!page) return ''
	if (page.text) return page.text
	const bodyText = nodeText(page.body)
	if (bodyText) return bodyText
	return [page.title, page.description].filter(Boolean).join(' ')
}
