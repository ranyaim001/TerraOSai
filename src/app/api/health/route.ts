import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Simulated health data - Replace with real health tracking APIs
        const healthData = {
            healthScore: 92,
            metrics: {
                heartRate: {
                    current: 72,
                    resting: 58,
                    max: 185,
                    trend: 'stable',
                },
                steps: {
                    today: 8547,
                    goal: 10000,
                    weekly: 67234,
                },
                sleep: {
                    lastNight: 7.5,
                    quality: 85,
                    deep: 2.1,
                    rem: 1.8,
                },
                stress: {
                    level: 32,
                    trend: 'decreasing',
                },
                nutrition: {
                    calories: 1847,
                    protein: 95,
                    carbs: 185,
                    fats: 62,
                    water: 2.1, // liters
                },
            },
            recommendations: [
                {
                    category: 'exercise',
                    priority: 'medium',
                    message: 'Increase daily steps by 1,500 to reach your goal',
                    action: 'Take a 15-minute walk after dinner',
                },
                {
                    category: 'nutrition',
                    priority: 'high',
                    message: 'Low water intake detected',
                    action: 'Drink 2 more glasses of water today',
                },
                {
                    category: 'sleep',
                    priority: 'low',
                    message: 'Great sleep quality! Keep it up',
                    action: 'Maintain current bedtime routine',
                },
            ],
            kushiResearch: {
                dietaryBalance: {
                    grains: 45,
                    vegetables: 30,
                    beans: 10,
                    seaVegetables: 5,
                    other: 10,
                },
                recommendations: [
                    'Increase whole grain intake for better energy balance',
                    'Add more sea vegetables for mineral content',
                    'Consider miso soup for gut health',
                ],
                macrobioticScore: 78,
            },
            vitals: {
                bloodPressure: {
                    systolic: 118,
                    diastolic: 76,
                    status: 'normal',
                },
                temperature: 98.2,
                oxygenSaturation: 98,
                weight: 165,
                bmi: 23.4,
            },
        };

        return NextResponse.json(healthData);
    } catch (error) {
        console.error('Error fetching health data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch health data' },
            { status: 500 }
        );
    }
}
