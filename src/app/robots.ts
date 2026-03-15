import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Bingbot', 'Googlebot'],
                allow: '/',
            },
            {
                userAgent: '*',
                disallow: ['/admin', '/admin-login'],
            }
        ],
        sitemap: 'https://yourbrandbuilders.com/sitemap.xml',
    }
}