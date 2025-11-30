import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Curated RSS feeds for AI, Space, and Robotics
        const feeds = [
            {
                id: 1,
                source: 'MIT Technology Review',
                url: 'https://www.technologyreview.com/feed/',
                category: 'ai-robotics',
                articles: [
                    {
                        title: 'Generative AI Breakthroughs in 2024',
                        summary: 'New models demonstrate reasoning capabilities and multimodal understanding, transforming industries from healthcare to creative arts.',
                        url: 'https://www.technologyreview.com/topic/artificial-intelligence/',
                        publishedDate: new Date(Date.now() - 3600000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Generative+AI',
                    },
                    {
                        title: 'The Future of Humanoid Robots',
                        summary: 'Latest developments in bipedal robotics show improved balance, dexterity, and human-robot interaction capabilities.',
                        url: 'https://www.technologyreview.com/topic/robotics/',
                        publishedDate: new Date(Date.now() - 86400000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Humanoid+Robots',
                    },
                ],
            },
            {
                id: 2,
                source: 'NASA Space News',
                url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
                category: 'space',
                articles: [
                    {
                        title: 'Artemis Mission: Returning to the Moon',
                        summary: 'NASA prepares for the next phase of lunar exploration, establishing a sustainable human presence on the Moon.',
                        url: 'https://www.nasa.gov/specials/artemis/',
                        publishedDate: new Date(Date.now() - 172800000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Artemis+Mission',
                    },
                    {
                        title: 'James Webb Telescope Reveals Early Universe',
                        summary: 'New images capture the formation of the first galaxies, providing insights into cosmic history.',
                        url: 'https://webb.nasa.gov/',
                        publishedDate: new Date(Date.now() - 259200000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Webb+Telescope',
                    },
                ],
            },
            {
                id: 3,
                source: 'SpaceX Updates',
                url: 'https://www.spacex.com/news.xml',
                category: 'space-tech',
                articles: [
                    {
                        title: 'Starship Flight Test Success',
                        summary: 'Latest orbital flight test demonstrates successful stage separation and reentry capabilities.',
                        url: 'https://www.spacex.com/vehicles/starship/',
                        publishedDate: new Date(Date.now() - 345600000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Starship',
                    },
                ],
            },
            {
                id: 4,
                source: 'IEEE Spectrum',
                url: 'https://spectrum.ieee.org/feeds/feed.rss',
                category: 'robotics',
                articles: [
                    {
                        title: 'Soft Robotics for Medical Applications',
                        summary: 'New bio-inspired soft robots enable minimally invasive surgeries with unprecedented precision.',
                        url: 'https://spectrum.ieee.org/robotics',
                        publishedDate: new Date(Date.now() - 432000000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Soft+Robotics',
                    },
                ],
            },
            {
                id: 5,
                source: 'OpenAI Blog',
                url: 'https://openai.com/blog/rss.xml',
                category: 'ai-research',
                articles: [
                    {
                        title: 'Aligning Superintelligent AI',
                        summary: 'Research into scalable oversight and automated alignment techniques for future AI systems.',
                        url: 'https://openai.com/research',
                        publishedDate: new Date(Date.now() - 518400000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=AI+Alignment',
                    },
                ],
            },
        ];

        return NextResponse.json({ feeds });
    } catch (error) {
        console.error('Error fetching tech RSS feeds:', error);
        return NextResponse.json(
            { error: 'Failed to fetch RSS feeds' },
            { status: 500 }
        );
    }
}
