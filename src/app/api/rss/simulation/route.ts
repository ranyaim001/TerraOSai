import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Curated RSS feeds for governance, peace, and global cooperation
        const feeds = [
            {
                id: 1,
                source: 'United Nations News',
                url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml',
                category: 'global-governance',
                articles: [
                    {
                        title: 'Global Peace Index Shows Improvement in Conflict Resolution',
                        summary: 'New diplomatic frameworks reduce active conflicts by 15% through AI-assisted mediation.',
                        url: 'https://news.un.org/peace-index-2024',
                        publishedDate: new Date(Date.now() - 86400000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/00d4ff?text=Peace+Index',
                    },
                ],
            },
            {
                id: 2,
                source: 'World Economic Forum',
                url: 'https://www.weforum.org/feed',
                category: 'cooperation',
                articles: [
                    {
                        title: 'Digital Democracy Platforms Transform Civic Engagement',
                        summary: 'Blockchain-based voting systems increase participation by 40% in pilot programs.',
                        url: 'https://www.weforum.org/digital-democracy-2024',
                        publishedDate: new Date(Date.now() - 172800000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/00d4ff?text=Digital+Democracy',
                    },
                ],
            },
            {
                id: 3,
                source: 'Institute for Economics and Peace',
                url: 'https://www.economicsandpeace.org/feed/',
                category: 'peace-studies',
                articles: [
                    {
                        title: 'Economic Interdependence Reduces Conflict Risk',
                        summary: 'Study shows trade partnerships decrease likelihood of armed conflict by 60%.',
                        url: 'https://www.economicsandpeace.org/trade-peace-2024',
                        publishedDate: new Date(Date.now() - 259200000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/00d4ff?text=Trade+Peace',
                    },
                ],
            },
        ];

        return NextResponse.json({ feeds });
    } catch (error) {
        console.error('Error fetching simulation RSS feeds:', error);
        return NextResponse.json(
            { error: 'Failed to fetch RSS feeds' },
            { status: 500 }
        );
    }
}
