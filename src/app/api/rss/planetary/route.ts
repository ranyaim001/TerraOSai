import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Curated RSS feeds for planetary/environmental news
        const feeds = [
            {
                id: 1,
                source: 'NASA Earth Observatory',
                url: 'https://earthobservatory.nasa.gov/feeds/earth-observatory.rss',
                category: 'climate',
                articles: [
                    {
                        title: 'Global Temperature Reaches New Record High',
                        summary: 'Latest data shows 2024 on track to be warmest year on record, with significant implications for climate action.',
                        url: 'https://earthobservatory.nasa.gov/article/global-temp-2024',
                        publishedDate: new Date(Date.now() - 86400000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/16c79a?text=Climate+Data',
                    },
                    {
                        title: 'Arctic Ice Melt Accelerates Beyond Predictions',
                        summary: 'Satellite imagery reveals faster than expected ice loss in polar regions, raising sea level concerns.',
                        url: 'https://earthobservatory.nasa.gov/article/arctic-ice-2024',
                        publishedDate: new Date(Date.now() - 172800000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/16c79a?text=Arctic+Ice',
                    },
                ],
            },
            {
                id: 2,
                source: 'UN Environment Programme',
                url: 'https://www.unep.org/news-and-stories/rss',
                category: 'environment',
                articles: [
                    {
                        title: 'Renewable Energy Adoption Surges Globally',
                        summary: 'New report shows 45% increase in renewable energy capacity, led by solar and wind installations.',
                        url: 'https://www.unep.org/news/renewable-energy-2024',
                        publishedDate: new Date(Date.now() - 259200000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/16c79a?text=Renewable+Energy',
                    },
                ],
            },
            {
                id: 3,
                source: 'World Resources Institute',
                url: 'https://www.wri.org/feed',
                category: 'sustainability',
                articles: [
                    {
                        title: 'Ocean Cleanup Initiatives Show Promising Results',
                        summary: 'Latest efforts remove 500,000 tons of plastic from Pacific Ocean, with new technologies scaling up.',
                        url: 'https://www.wri.org/ocean-cleanup-2024',
                        publishedDate: new Date(Date.now() - 345600000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/16c79a?text=Ocean+Cleanup',
                    },
                ],
            },
            {
                id: 4,
                source: 'Climate Action Tracker',
                url: 'https://climateactiontracker.org/feed/',
                category: 'climate-policy',
                articles: [
                    {
                        title: 'Countries Commit to Net-Zero by 2050',
                        summary: '127 nations pledge carbon neutrality, representing 85% of global emissions.',
                        url: 'https://climateactiontracker.org/net-zero-2024',
                        publishedDate: new Date(Date.now() - 432000000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/16c79a?text=Net+Zero',
                    },
                ],
            },
        ];

        return NextResponse.json({ feeds });
    } catch (error) {
        console.error('Error fetching planetary RSS feeds:', error);
        return NextResponse.json(
            { error: 'Failed to fetch RSS feeds' },
            { status: 500 }
        );
    }
}
