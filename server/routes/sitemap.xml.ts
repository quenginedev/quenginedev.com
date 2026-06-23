import { serverQueryContent } from '#content/server'
import { contact } from '~/data/portfolio'
import { filterPublishedPosts, postAbsoluteUrl, tagToSlug, type BlogPost } from '~/composables/useBlogPosts'

function loc(site: string, path: string): string {
	return `<url><loc>${postAbsoluteUrl(path, site)}</loc></url>`
}

export default defineEventHandler(async (event) => {
	const posts = filterPublishedPosts(
		await serverQueryContent(event, 'blog').sort({ date: -1 }).find<BlogPost>(),
	)

	const site = contact.site.replace(/\/$/, '')
	const tags = new Set<string>()
	for (const post of posts) {
		for (const tag of post.tags ?? []) tags.add(tag)
	}

	const urls = [
		loc(site, '/'),
		loc(site, '/blog'),
		...posts.map((post) => loc(site, post._path)),
		...[...tags].map((tag) => loc(site, `/blog/tags/${tagToSlug(tag)}`)),
	].join('\n  ')

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`

	setHeader(event, 'content-type', 'application/xml; charset=utf-8')
	return xml
})
