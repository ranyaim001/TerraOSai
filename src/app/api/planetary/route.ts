import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Simulated planetary data - Replace with real API calls
        const planetaryData = {
            globalHealth: {
                airQuality: 72,
                waterQuality: 68,
                forestCoverage: 31,
                biodiversity: 65,
                carbonEmissions: 85, // Higher is worse
                temperature: 1.2, // Degrees above pre-industrial
            },
            alerts: [
                {
                    id: 1,
                    type: 'natural',
                    severity: 'high',
                    location: 'Pacific Northwest',
                    description: 'Wildfire Alert',
                    affectedPopulation: 2500000,
                    resourcesNeeded: ['Water bombers', 'Firefighters', 'Medical supplies'],
                    timestamp: new Date().toISOString(),
                },
                {
                    id: 2,
                    type: 'human',
                    severity: 'medium',
                    location: 'South Asia',
                    description: 'Flooding due to heavy monsoon',
                    affectedPopulation: 5000000,
                    resourcesNeeded: ['Emergency shelters', 'Food supplies', 'Medical aid'],
                    timestamp: new Date(Date.now() - 86400000).toISOString(),
                },
                {
                    id: 3,
                    type: 'natural',
                    severity: 'low',
                    location: 'Caribbean',
                    description: 'Tropical Storm Watch',
                    affectedPopulation: 500000,
                    resourcesNeeded: ['Emergency supplies', 'Evacuation support'],
                    timestamp: new Date(Date.now() - 172800000).toISOString(),
                },
            ],
            resourceAllocation: {
                available: 847200000000, // $847.2B
                allocated: 125000000000, // $125B
                pending: 45000000000, // $45B
            },
            regions: [
                { name: 'North America', health: 75, population: 579000000 },
                { name: 'South America', health: 68, population: 430000000 },
                { name: 'Europe', health: 78, population: 748000000 },
                { name: 'Africa', health: 62, population: 1400000000 },
                { name: 'Asia', health: 70, population: 4700000000 },
                { name: 'Oceania', health: 76, population: 44000000 },
            ],
        };

        return NextResponse.json(planetaryData);
    } catch (error) {
        console.error('Error fetching planetary data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch planetary data' },
            { status: 500 }
        );
    }
}
