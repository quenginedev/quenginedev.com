export interface BlogPost {
	_path: string
	title: string
	description?: string
	tldr?: string
	date: string
	updated?: string
	tags?: string[]
	cover?: string
	draft?: boolean
	ogImage?: string
	canonical?: string
	text?: string
	body?: {
		toc?: {
			links?: BlogTocLink[]
		}
	}
}

export interface BlogTocLink {
	id: string
	depth: number
	text: string
	children?: BlogTocLink[]
}

export function filterPublishedPosts<T extends { draft?: boolean }>(posts: T[]): T[] {
	return posts.filter((post) => post.draft !== true)
}

export function tagToSlug(tag: string): string {
	return tag.toLowerCase().replace(/\s+/g, '-')
}

export function slugToTag(slug: string, tags: string[]): string | undefined {
	const normalized = slug.toLowerCase()
	return tags.find((tag) => tagToSlug(tag) === normalized)
}

export async function fetchPublishedBlogPosts(): Promise<BlogPost[]> {
	const posts = await queryContent<BlogPost>('blog').sort({ date: -1 }).find()
	return filterPublishedPosts(posts)
}

export function postAbsoluteUrl(path: string, site: string): string {
	const base = site.replace(/\/$/, '')
	return `${base}${path}`
}

export function postOgImage(post: BlogPost, site: string): string | undefined {
	const image = post.ogImage ?? post.cover
	if (!image) return undefined
	if (image.startsWith('http')) return image
	return postAbsoluteUrl(image, site)
}
