import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Simulated governance simulation data
        const simulationData = {
            activeScenarios: [
                {
                    id: 1,
                    title: 'Global Climate Action Fund',
                    description: 'Allocate $500B for renewable energy transition',
                    category: 'environment',
                    participants: 2847563,
                    votesFor: 2156789,
                    votesAgainst: 690774,
                    timeRemaining: 172800000, // 2 days in ms
                    impact: {
                        co2Reduction: '2.3 GT/year',
                        jobsCreated: '15M',
                        energyTransition: '35%',
                    },
                },
                {
                    id: 2,
                    title: 'Universal Education Initiative',
                    description: 'Free quality education for all children globally',
                    category: 'education',
                    participants: 3245678,
                    votesFor: 2987654,
                    votesAgainst: 258024,
                    timeRemaining: 432000000, // 5 days in ms
                    impact: {
                        childrenReached: '1.2B',
                        literacyIncrease: '45%',
                        economicGrowth: '3.2%',
                    },
                },
                {
                    id: 3,
                    title: 'Peace Mediation Protocol',
                    description: 'AI-assisted conflict resolution framework',
                    category: 'peace',
                    participants: 1876543,
                    votesFor: 1654321,
                    votesAgainst: 222222,
                    timeRemaining: 259200000, // 3 days in ms
                    impact: {
                        conflictsResolved: '12',
                        livesProtected: '5M',
                        refugeesReturned: '2.3M',
                    },
                },
            ],
            userStats: {
                participationScore: 87,
                scenariosVoted: 45,
                proposalsCreated: 3,
                impactPoints: 12847,
                rank: 2847,
                achievements: [
                    'Early Adopter',
                    'Climate Champion',
                    'Peace Advocate',
                    'Education Supporter',
                ],
            },
            recentDecisions: [
                {
                    id: 101,
                    title: 'Ocean Cleanup Initiative',
                    result: 'approved',
                    votes: 4567890,
                    implemented: true,
                    impact: 'Removed 2.5M tons of plastic',
                    date: new Date(Date.now() - 2592000000).toISOString(),
                },
                {
                    id: 102,
                    title: 'Global Healthcare Access',
                    result: 'approved',
                    votes: 5678901,
                    implemented: true,
                    impact: '500M people gained healthcare access',
                    date: new Date(Date.now() - 5184000000).toISOString(),
                },
            ],
            globalMetrics: {
                totalParticipants: 8100000000,
                activeVoters: 4567000000,
                scenariosCompleted: 1247,
                successRate: 78.5,
                globalCooperationIndex: 82.3,
            },
        };

        return NextResponse.json(simulationData);
    } catch (error) {
        console.error('Error fetching simulation data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch simulation data' },
            { status: 500 }
        );
    }
}
