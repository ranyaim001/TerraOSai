import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Curated RSS feeds for fitness and workout content
        const feeds = [
            {
                id: 1,
                source: 'Muscle & Fitness',
                url: 'https://www.muscleandfitness.com/feed/',
                category: 'fitness',
                articles: [
                    {
                        title: 'The Science of 5-Minute Workouts: Why Short Bursts Work',
                        summary: 'Research shows that brief, high-intensity workouts can be as effective as longer sessions for improving cardiovascular health and building strength.',
                        url: 'https://www.muscleandfitness.com/5-minute-workouts-science',
                        publishedDate: new Date(Date.now() - 86400000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=5+Min+Workouts',
                    },
                    {
                        title: 'Calisthenics vs Weight Training: Which Builds More Muscle?',
                        summary: 'Exploring the benefits of bodyweight training and how it compares to traditional weightlifting for muscle growth and functional fitness.',
                        url: 'https://www.muscleandfitness.com/calisthenics-vs-weights',
                        publishedDate: new Date(Date.now() - 172800000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Calisthenics',
                    },
                ],
            },
            {
                id: 2,
                source: 'Breaking Muscle',
                url: 'https://breakingmuscle.com/feed/workouts',
                category: 'workouts',
                articles: [
                    {
                        title: 'Progressive Overload in Bodyweight Training',
                        summary: 'How to continuously challenge your muscles and build strength using only your bodyweight through strategic progression techniques.',
                        url: 'https://breakingmuscle.com/progressive-overload-bodyweight',
                        publishedDate: new Date(Date.now() - 259200000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Progressive+Overload',
                    },
                ],
            },
            {
                id: 3,
                source: '12 Minute Athlete',
                url: 'https://www.12minuteathlete.com/feed/',
                category: 'hiit',
                articles: [
                    {
                        title: 'HIIT Workouts for Busy Professionals',
                        summary: 'Time-efficient high-intensity interval training routines that fit into any schedule while delivering maximum results.',
                        url: 'https://www.12minuteathlete.com/hiit-busy-professionals',
                        publishedDate: new Date(Date.now() - 345600000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=HIIT+Training',
                    },
                ],
            },
            {
                id: 4,
                source: 'ACE Fitness',
                url: 'https://www.acefitness.org/feed/',
                category: 'expert-tips',
                articles: [
                    {
                        title: 'Proper Form in Bodyweight Exercises',
                        summary: 'Expert guidance on maintaining correct form during push-ups, squats, and other fundamental movements to prevent injury and maximize gains.',
                        url: 'https://www.acefitness.org/proper-form-bodyweight',
                        publishedDate: new Date(Date.now() - 432000000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Proper+Form',
                    },
                ],
            },
            {
                id: 5,
                source: 'Verywell Fit',
                url: 'https://www.verywellfit.com/feed/',
                category: 'wellness',
                articles: [
                    {
                        title: 'Recovery and Rest: The Missing Piece in Your Fitness Routine',
                        summary: 'Understanding the importance of recovery days and how proper rest enhances workout performance and muscle growth.',
                        url: 'https://www.verywellfit.com/recovery-rest-fitness',
                        publishedDate: new Date(Date.now() - 518400000).toISOString(),
                        image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Recovery',
                    },
                ],
            },
        ];

        return NextResponse.json({ feeds });
    } catch (error) {
        console.error('Error fetching fitness RSS feeds:', error);
        return NextResponse.json(
            { error: 'Failed to fetch RSS feeds' },
            { status: 500 }
        );
    }
}
