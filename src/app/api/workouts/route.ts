import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Curated YouTube workout videos from top fitness channels
        const workouts = {
            categories: ['Cardio', 'Strength', 'Flexibility', 'Full Body'],
            dailyPick: {
                id: 1,
                title: '5 Min Full Body Calisthenics Workout',
                channel: 'THENX',
                channelUrl: 'https://www.youtube.com/@OFFICIALTHENXSTUDIOS',
                videoId: '3p8EBPVZ2Iw', // Corrected THENX video ID
                duration: '5:00',
                category: 'Full Body',
                difficulty: 'Intermediate',
                description: 'Elite calisthenics workout targeting all major muscle groups with bodyweight exercises.',
                caloriesBurn: 50,
            },
            featured: [
                {
                    id: 1,
                    title: '5 Min Full Body Calisthenics Workout',
                    channel: 'THENX',
                    channelUrl: 'https://www.youtube.com/@OFFICIALTHENXSTUDIOS',
                    videoId: '3p8EBPVZ2Iw',
                    duration: '5:00',
                    category: 'Full Body',
                    difficulty: 'Intermediate',
                    description: 'Elite calisthenics workout targeting all major muscle groups.',
                    caloriesBurn: 50,
                },
                {
                    id: 2,
                    title: '5 Minute Fat Burning Workout',
                    channel: '5-Minute Fitness',
                    channelUrl: 'https://www.youtube.com/@5MinuteFitness',
                    videoId: 'gC_L9qAHVJ8',
                    duration: '5:00',
                    category: 'Cardio',
                    difficulty: 'Beginner',
                    description: 'Quick cardio routine to boost metabolism and burn calories.',
                    caloriesBurn: 45,
                },
                {
                    id: 3,
                    title: '5 Min Abs Workout',
                    channel: 'MadFit',
                    channelUrl: 'https://www.youtube.com/@MadFit',
                    videoId: '8z6v8vFjJ5o',
                    duration: '5:00',
                    category: 'Strength',
                    difficulty: 'Intermediate',
                    description: 'Apartment-friendly core workout with no equipment needed.',
                    caloriesBurn: 35,
                },
                {
                    id: 4,
                    title: '5 Min Morning Stretch',
                    channel: 'Pamela Reif',
                    channelUrl: 'https://www.youtube.com/@PamelaReif',
                    videoId: 'AnYl6Nk9GOA',
                    duration: '5:00',
                    category: 'Flexibility',
                    difficulty: 'Beginner',
                    description: 'Gentle stretching routine to start your day energized.',
                    caloriesBurn: 20,
                },
                {
                    id: 5,
                    title: '5 Minute Move',
                    channel: 'The Body Coach',
                    channelUrl: 'https://www.youtube.com/@thebodycoach1',
                    videoId: 'd3LPrhI0v-w',
                    duration: '5:00',
                    category: 'Cardio',
                    difficulty: 'Advanced',
                    description: 'High-intensity interval training for maximum calorie burn.',
                    caloriesBurn: 60,
                },
                {
                    id: 6,
                    title: '5 Min Bodyweight Strength',
                    channel: '12 Minute Athlete',
                    channelUrl: 'https://www.youtube.com/@12minuteathlete',
                    videoId: 'X1T87JbXWbA',
                    duration: '5:00',
                    category: 'Strength',
                    difficulty: 'Intermediate',
                    description: 'Efficient bodyweight exercises for building strength.',
                    caloriesBurn: 40,
                },
            ],
            userStats: {
                streak: 7,
                totalWorkouts: 42,
                totalCaloriesBurned: 1850,
                favoriteCategory: 'Full Body',
                averagePerWeek: 5.2,
            },
        };

        return NextResponse.json(workouts);
    } catch (error) {
        console.error('Error fetching workout data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch workout data' },
            { status: 500 }
        );
    }
}
