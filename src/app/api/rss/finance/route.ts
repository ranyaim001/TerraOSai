import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Curated RSS feeds for financial news and stock market
        const feeds = [
            {
                id: 1,
                source: 'Bloomberg Markets',
                url: 'https://www.bloomberg.com/feed/markets',
                category: 'markets',
                articles: [
                    {
                        title: 'AI Stocks Rally as Tech Sector Leads Market Gains',
                        summary: 'NVIDIA, AMD, and other AI chip makers surge on strong earnings reports and future guidance.',
                        url: 'https://www.bloomberg.com/ai-stocks-rally-2024',
                        publishedDate: new Date(Date.now() - 3600000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=AI+Stocks',
                    },
                    {
                        title: 'Federal Reserve Signals Interest Rate Stability',
                        summary: 'Fed maintains current rates, citing balanced inflation and employment data.',
                        url: 'https://www.bloomberg.com/fed-rates-2024',
                        publishedDate: new Date(Date.now() - 86400000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=Fed+Rates',
                    },
                ],
            },
            {
                id: 2,
                source: 'Financial Times',
                url: 'https://www.ft.com/rss/markets',
                category: 'investing',
                articles: [
                    {
                        title: 'Sustainable Investing Reaches $35 Trillion Globally',
                        summary: 'ESG funds see record inflows as investors prioritize climate-conscious portfolios.',
                        url: 'https://www.ft.com/sustainable-investing-2024',
                        publishedDate: new Date(Date.now() - 172800000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=ESG+Investing',
                    },
                ],
            },
            {
                id: 3,
                source: 'The Motley Fool',
                url: 'https://www.fool.com/feed/',
                category: 'stock-analysis',
                articles: [
                    {
                        title: 'Top Dividend Stocks for Long-Term Investors',
                        summary: 'Analysis of high-yield dividend aristocrats with 25+ years of consistent payouts.',
                        url: 'https://www.fool.com/dividend-stocks-2024',
                        publishedDate: new Date(Date.now() - 259200000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=Dividend+Stocks',
                    },
                ],
            },
            {
                id: 4,
                source: 'Seeking Alpha',
                url: 'https://seekingalpha.com/feed.xml',
                category: 'market-insights',
                articles: [
                    {
                        title: 'Emerging Markets Show Strong Growth Potential',
                        summary: 'India and Southeast Asian markets outperform expectations with tech sector expansion.',
                        url: 'https://seekingalpha.com/emerging-markets-2024',
                        publishedDate: new Date(Date.now() - 345600000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=Emerging+Markets',
                    },
                ],
            },
            {
                id: 5,
                source: 'Investopedia',
                url: 'https://www.investopedia.com/feed/',
                category: 'education',
                articles: [
                    {
                        title: 'Understanding Portfolio Diversification in 2024',
                        summary: 'Expert strategies for balancing risk and return across asset classes.',
                        url: 'https://www.investopedia.com/diversification-guide-2024',
                        publishedDate: new Date(Date.now() - 432000000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=Diversification',
                    },
                ],
            },
        ];

        return NextResponse.json({ feeds });
    } catch (error) {
        console.error('Error fetching financial RSS feeds:', error);
        return NextResponse.json(
            { error: 'Failed to fetch RSS feeds' },
            { status: 500 }
        );
    }
}
