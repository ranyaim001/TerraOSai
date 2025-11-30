import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Simulated stock market data - Replace with real financial APIs
        const stockData = {
            portfolio: {
                totalValue: 125847.50,
                monthlyDividend: 2847.50,
                yearlyReturn: 12.4,
                riskScore: 3.2, // 1-10 scale
            },
            holdings: [
                {
                    symbol: 'AAPL',
                    name: 'Apple Inc.',
                    shares: 50,
                    currentPrice: 178.25,
                    totalValue: 8912.50,
                    dayChange: 2.3,
                    dividendYield: 0.52,
                },
                {
                    symbol: 'MSFT',
                    name: 'Microsoft Corporation',
                    shares: 40,
                    currentPrice: 372.45,
                    totalValue: 14898.00,
                    dayChange: -1.2,
                    dividendYield: 0.78,
                },
                {
                    symbol: 'GOOGL',
                    name: 'Alphabet Inc.',
                    shares: 75,
                    currentPrice: 141.80,
                    totalValue: 10635.00,
                    dayChange: 0.8,
                    dividendYield: 0.0,
                },
                {
                    symbol: 'NVDA',
                    name: 'NVIDIA Corporation',
                    shares: 30,
                    currentPrice: 495.20,
                    totalValue: 14856.00,
                    dayChange: 5.2,
                    dividendYield: 0.03,
                },
                {
                    symbol: 'VTI',
                    name: 'Vanguard Total Stock Market ETF',
                    shares: 200,
                    currentPrice: 245.30,
                    totalValue: 49060.00,
                    dayChange: 0.5,
                    dividendYield: 1.45,
                },
            ],
            recentTransactions: [
                {
                    id: 1,
                    type: 'dividend',
                    symbol: 'AAPL',
                    amount: 26.00,
                    date: new Date(Date.now() - 86400000).toISOString(),
                    description: 'Quarterly dividend payment',
                },
                {
                    id: 2,
                    type: 'buy',
                    symbol: 'NVDA',
                    shares: 5,
                    price: 492.10,
                    amount: -2460.50,
                    date: new Date(Date.now() - 172800000).toISOString(),
                    description: 'AI-recommended purchase',
                },
                {
                    id: 3,
                    type: 'dividend',
                    symbol: 'MSFT',
                    amount: 31.20,
                    date: new Date(Date.now() - 259200000).toISOString(),
                    description: 'Quarterly dividend payment',
                },
                {
                    id: 4,
                    type: 'sell',
                    symbol: 'TSLA',
                    shares: 10,
                    price: 238.45,
                    amount: 2384.50,
                    date: new Date(Date.now() - 432000000).toISOString(),
                    description: 'Portfolio rebalancing',
                },
            ],
            aiRecommendations: [
                {
                    action: 'buy',
                    symbol: 'AMD',
                    confidence: 0.85,
                    reasoning: 'Strong AI chip market growth, undervalued compared to NVDA',
                    targetPrice: 145.00,
                },
                {
                    action: 'hold',
                    symbol: 'AAPL',
                    confidence: 0.92,
                    reasoning: 'Stable dividend performer, good for long-term growth',
                    targetPrice: 195.00,
                },
                {
                    action: 'sell',
                    symbol: 'GOOGL',
                    confidence: 0.68,
                    reasoning: 'Consider taking profits, regulatory concerns',
                    targetPrice: 150.00,
                },
            ],
            globalPool: {
                total: 847200000000,
                yourShare: 0.000336, // Percentage
                monthlyDistribution: 2847.50,
            },
            dailyPicks: [
                {
                    symbol: 'PLTR',
                    name: 'Palantir Technologies',
                    currentPrice: 24.50,
                    predictedGrowth: '+15.2%',
                    reasoning: 'Strong government contract renewals and expanding commercial AI adoption make this a prime growth candidate. Our models predict a breakout above $28 within 30 days due to increased demand for AIP (Artificial Intelligence Platform).',
                    riskLevel: 'Moderate',
                    sector: 'Technology'
                },
                {
                    symbol: 'ENPH',
                    name: 'Enphase Energy',
                    currentPrice: 118.75,
                    predictedGrowth: '+12.8%',
                    reasoning: 'Oversold territory with strong fundamentals. As interest rates stabilize, residential solar demand is projected to rebound. AI sentiment analysis shows a 78% positive shift in institutional investor interest.',
                    riskLevel: 'Moderate',
                    sector: 'Energy'
                },
                {
                    symbol: 'CRWD',
                    name: 'CrowdStrike Holdings',
                    currentPrice: 295.40,
                    predictedGrowth: '+9.5%',
                    reasoning: 'Cybersecurity remains a top priority for enterprise budgets. CrowdStrike\'s Falcon platform dominance and new AI-native security features position it for continued market share gains despite broader tech volatility.',
                    riskLevel: 'Low',
                    sector: 'Technology'
                },
                {
                    symbol: 'PFE',
                    name: 'Pfizer Inc.',
                    currentPrice: 28.30,
                    predictedGrowth: '+8.4%',
                    reasoning: 'Currently undervalued with a high dividend yield. Our deep learning models identify a potential reversal based on new oncology drug pipeline progress and cost-cutting measures taking effect next quarter.',
                    riskLevel: 'Low',
                    sector: 'Healthcare'
                },
                {
                    symbol: 'PATH',
                    name: 'UiPath Inc.',
                    currentPrice: 22.15,
                    predictedGrowth: '+18.6%',
                    reasoning: 'High risk, high reward play. UiPath is integrating generative AI into its automation suite, which is expected to drive a 40% efficiency gain for clients. Technical indicators suggest a strong support level at $20.',
                    riskLevel: 'High',
                    sector: 'Technology'
                }
            ]
        };

        return NextResponse.json(stockData);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stock data' },
            { status: 500 }
        );
    }
}
