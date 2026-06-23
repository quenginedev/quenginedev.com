import { serverQueryContent } from '#content/server'
import { contact } from '~/data/portfolio'
import { filterPublishedPosts, postAbsoluteUrl, type BlogPost } from '~/composables/useBlogPosts'

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
	const posts = filterPublishedPosts(
		await serverQueryContent(event, 'blog').sort({ date: -1 }).find<BlogPost>(),
	)

	const site = contact.site.replace(/\/$/, '')
	const items = posts
		.map((post) => {
			const link = postAbsoluteUrl(post._path, site)
			const pubDate = new Date(post.date).toUTCString()
			return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <pubDate>${pubDate}</pubDate>
  <description>${escapeXml(post.description ?? '')}</description>
</item>`
		})
		.join('\n')

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>quenginedev — Blog</title>
  <link>${site}/blog</link>
  <description>Tutorials and architecture notes on systems, agents, and full-stack engineering.</description>
  <language>en-us</language>
  ${items}
</channel>
</rss>`

	setHeader(event, 'content-type', 'application/xml; charset=utf-8')
	return xml
})
