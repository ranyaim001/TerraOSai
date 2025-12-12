import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface UserProgress {
    userId: string;
    domains: {
        [key: string]: {
            mastery: number; // 0-100
            papersRead: number;
            booksRead: number;
            timeSpent: number; // minutes
            lastActivity: string;
            achievements: string[];
        };
    };
    overall: {
        totalPapersRead: number;
        totalBooksRead: number;
        totalTimeSpent: number;
        currentStreak: number; // days
        longestStreak: number;
        level: number;
        xp: number;
        nextLevelXp: number;
    };
    goals: {
        id: string;
        type: 'daily' | 'weekly' | 'monthly';
        target: number;
        current: number;
        description: string;
        deadline: string;
    }[];
    achievements: {
        id: string;
        name: string;
        description: string;
        icon: string;
        unlockedAt: string;
    }[];
}

// Mock user progress data
const userProgress: UserProgress = {
    userId: 'user-1',
    domains: {
        biology: {
            mastery: 45,
            papersRead: 12,
            booksRead: 2,
            timeSpent: 1240,
            lastActivity: '2025-12-10T14:30:00Z',
            achievements: ['First Paper', 'Biology Enthusiast'],
        },
        ai: {
            mastery: 67,
            papersRead: 28,
            booksRead: 4,
            timeSpent: 3200,
            lastActivity: '2025-12-11T09:15:00Z',
            achievements: ['AI Pioneer', 'Deep Learning Master', 'Paper Marathon'],
        },
        tech: {
            mastery: 52,
            papersRead: 18,
            booksRead: 3,
            timeSpent: 1850,
            lastActivity: '2025-12-09T16:45:00Z',
            achievements: ['Tech Explorer', 'Quantum Curious'],
        },
        finance: {
            mastery: 38,
            papersRead: 8,
            booksRead: 2,
            timeSpent: 920,
            lastActivity: '2025-12-08T11:20:00Z',
            achievements: ['Money Matters'],
        },
        health: {
            mastery: 71,
            papersRead: 22,
            booksRead: 5,
            timeSpent: 2650,
            lastActivity: '2025-12-11T20:00:00Z',
            achievements: ['Health Advocate', 'Longevity Seeker', 'Wellness Warrior'],
        },
        energy: {
            mastery: 55,
            papersRead: 15,
            booksRead: 2,
            timeSpent: 1420,
            lastActivity: '2025-12-07T13:30:00Z',
            achievements: ['Clean Energy Champion'],
        },
        style: {
            mastery: 29,
            papersRead: 5,
            booksRead: 1,
            timeSpent: 480,
            lastActivity: '2025-12-05T10:00:00Z',
            achievements: ['Style Starter'],
        },
    },
    overall: {
        totalPapersRead: 108,
        totalBooksRead: 19,
        totalTimeSpent: 11760, // ~196 hours
        currentStreak: 12,
        longestStreak: 28,
        level: 15,
        xp: 14250,
        nextLevelXp: 16000,
    },
    goals: [
        {
            id: 'goal-1',
            type: 'daily',
            target: 2,
            current: 1,
            description: 'Read 2 research papers',
            deadline: '2025-12-12T23:59:59Z',
        },
        {
            id: 'goal-2',
            type: 'weekly',
            target: 10,
            current: 7,
            description: 'Read 10 papers this week',
            deadline: '2025-12-15T23:59:59Z',
        },
        {
            id: 'goal-3',
            type: 'monthly',
            target: 1,
            current: 0,
            description: 'Complete 1 book',
            deadline: '2025-12-31T23:59:59Z',
        },
    ],
    achievements: [
        {
            id: 'ach-1',
            name: 'First Steps',
            description: 'Read your first research paper',
            icon: '🎯',
            unlockedAt: '2025-11-15T10:00:00Z',
        },
        {
            id: 'ach-2',
            name: 'Polymath',
            description: 'Read papers from all 7 domains',
            icon: '🌟',
            unlockedAt: '2025-11-28T14:30:00Z',
        },
        {
            id: 'ach-3',
            name: 'Dedicated Learner',
            description: 'Maintain a 7-day learning streak',
            icon: '🔥',
            unlockedAt: '2025-12-01T09:00:00Z',
        },
        {
            id: 'ach-4',
            name: 'Knowledge Seeker',
            description: 'Read 100 research papers',
            icon: '📚',
            unlockedAt: '2025-12-10T16:45:00Z',
        },
        {
            id: 'ach-5',
            name: 'AI Specialist',
            description: 'Reach 50% mastery in AI domain',
            icon: '🤖',
            unlockedAt: '2025-12-05T11:20:00Z',
        },
    ],
};

// GET - Fetch user progress
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId') || 'user-1';
        const domain = searchParams.get('domain');

        if (domain && domain !== 'all') {
            return NextResponse.json({
                success: true,
                userId,
                domain,
                progress: userProgress.domains[domain] || null,
            });
        }

        return NextResponse.json({
            success: true,
            userId,
            progress: userProgress,
        });
    } catch (error) {
        console.error('Progress GET error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch progress' },
            { status: 500 }
        );
    }
}

// POST - Update progress (e.g., after reading a paper)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId = 'user-1', domain, action, value } = body;

        if (!domain || !action) {
            return NextResponse.json(
                { success: false, error: 'Domain and action required' },
                { status: 400 }
            );
        }

        // Update domain progress
        if (!userProgress.domains[domain]) {
            userProgress.domains[domain] = {
                mastery: 0,
                papersRead: 0,
                booksRead: 0,
                timeSpent: 0,
                lastActivity: new Date().toISOString(),
                achievements: [],
            };
        }

        const domainProgress = userProgress.domains[domain];

        switch (action) {
            case 'paper_read':
                domainProgress.papersRead++;
                userProgress.overall.totalPapersRead++;
                domainProgress.mastery = Math.min(100, domainProgress.mastery + 2);
                userProgress.overall.xp += 50;
                break;
            case 'book_completed':
                domainProgress.booksRead++;
                userProgress.overall.totalBooksRead++;
                domainProgress.mastery = Math.min(100, domainProgress.mastery + 5);
                userProgress.overall.xp += 200;
                break;
            case 'time_spent':
                domainProgress.timeSpent += value || 0;
                userProgress.overall.totalTimeSpent += value || 0;
                break;
        }

        domainProgress.lastActivity = new Date().toISOString();

        // Check for level up
        while (userProgress.overall.xp >= userProgress.overall.nextLevelXp) {
            userProgress.overall.level++;
            userProgress.overall.nextLevelXp = userProgress.overall.level * 1000 + 1000;
        }

        return NextResponse.json({
            success: true,
            progress: userProgress,
            message: 'Progress updated',
            levelUp: false, // Would check if level increased
        });
    } catch (error) {
        console.error('Progress POST error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update progress' },
            { status: 500 }
        );
    }
}
