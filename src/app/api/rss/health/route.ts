import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Curated RSS feeds for health, wellness, and Michio Kushi's macrobiotic philosophy
        const feeds = [
            {
                id: 1,
                source: 'Kushi Institute',
                url: 'https://www.shimacrobiotics.org/feed/',
                category: 'macrobiotic',
                articles: [
                    {
                        title: 'The Macrobiotic Approach to Holistic Wellness',
                        summary: 'Michio Kushi\'s principles of balancing yin and yang through whole foods and mindful living.',
                        url: 'https://www.shimacrobiotics.org/macrobiotics/what-is-macrobiotics/',
                        publishedDate: new Date(Date.now() - 86400000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Macrobiotic+Wellness',
                    },
                    {
                        title: 'Whole Grains: The Foundation of Macrobiotic Diet',
                        summary: 'Understanding the importance of brown rice, millet, and other whole grains in achieving optimal health.',
                        url: 'https://www.shimacrobiotics.org/macrobiotics/macrobiotic-diet/',
                        publishedDate: new Date(Date.now() - 172800000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Whole+Grains',
                    },
                ],
            },
            {
                id: 2,
                source: 'Harvard Health',
                url: 'https://www.health.harvard.edu/feed',
                category: 'medical',
                articles: [
                    {
                        title: 'The Science Behind Plant-Based Diets',
                        summary: 'New research confirms benefits of whole food, plant-based nutrition for longevity and disease prevention.',
                        url: 'https://www.health.harvard.edu/plant-based-diet-2024',
                        publishedDate: new Date(Date.now() - 259200000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Plant+Based',
                    },
                ],
            },
            {
                id: 3,
                source: 'Nutrition Facts',
                url: 'https://nutritionfacts.org/feed/',
                category: 'nutrition',
                articles: [
                    {
                        title: 'Sea Vegetables: Nutrient Powerhouses from the Ocean',
                        summary: 'Exploring the health benefits of kombu, wakame, and nori in traditional and modern diets.',
                        url: 'https://nutritionfacts.org/sea-vegetables-2024',
                        publishedDate: new Date(Date.now() - 345600000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Sea+Vegetables',
                    },
                ],
            },
            {
                id: 4,
                source: 'Mindful Magazine',
                url: 'https://www.mindful.org/feed/',
                category: 'mindfulness',
                articles: [
                    {
                        title: 'Mindful Eating: Connecting Food and Consciousness',
                        summary: 'How awareness and gratitude transform our relationship with food and health.',
                        url: 'https://www.mindful.org/mindful-eating-2024',
                        publishedDate: new Date(Date.now() - 432000000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Mindful+Eating',
                    },
                ],
            },
            {
                id: 5,
                source: 'Journal of Holistic Health',
                url: 'https://www.holistichealth.org/feed',
                category: 'holistic',
                articles: [
                    {
                        title: 'Traditional Fermented Foods and Gut Health',
                        summary: 'The role of miso, tempeh, and other fermented foods in supporting digestive wellness.',
                        url: 'https://www.holistichealth.org/fermented-foods-2024',
                        publishedDate: new Date(Date.now() - 518400000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Fermented+Foods',
                    },
                ],
            },
        ];

        return NextResponse.json({ feeds });
    } catch (error) {
        console.error('Error fetching health RSS feeds:', error);
        return NextResponse.json(
            { error: 'Failed to fetch RSS feeds' },
            { status: 500 }
        );
    }
}
