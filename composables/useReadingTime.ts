export function estimateReadingTime(text: string, wordsPerMinute = 200): number {
	const words = text.trim().split(/\s+/).filter(Boolean).length
	return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export function readingTimeLabel(minutes: number): string {
	return `${minutes} min read`
}
