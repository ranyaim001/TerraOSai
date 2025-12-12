import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    subcategory?: string;
    reason: string;
    priority: 'essential' | 'high' | 'medium' | 'low';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    pages?: number;
    year?: number;
    isbn?: string;
    keyTakeaways?: string[];
    relatedTopics?: string[];
}

// Comprehensive book recommendations across all learning domains
const bookLibrary: Book[] = [
    // Biology
    {
        id: 'bio-001',
        title: 'The Gene: An Intimate History',
        author: 'Siddhartha Mukherjee',
        category: 'biology',
        subcategory: 'genetics',
        reason: 'Masterful narrative of genetics from Mendel to CRISPR. Essential for understanding modern biotechnology and personalized medicine.',
        priority: 'essential',
        difficulty: 'intermediate',
        pages: 592,
        year: 2016,
        keyTakeaways: [
            'History of genetic discovery',
            'CRISPR revolution explained',
            'Ethical implications of gene editing',
            'Future of personalized medicine',
        ],
        relatedTopics: ['CRISPR', 'genomics', 'biotechnology', 'ethics'],
    },
    {
        id: 'bio-002',
        title: 'I Contain Multitudes: The Microbes Within Us',
        author: 'Ed Yong',
        category: 'biology',
        subcategory: 'microbiology',
        reason: 'Reveals the hidden world of microbiomes and their profound impact on health, behavior, and evolution.',
        priority: 'high',
        difficulty: 'beginner',
        pages: 368,
        year: 2016,
        keyTakeaways: [
            'Microbiome-health connection',
            'Gut-brain axis',
            'Evolutionary partnerships',
            'Personalized probiotics',
        ],
    },
    {
        id: 'bio-003',
        title: 'The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race',
        author: 'Walter Isaacson',
        category: 'biology',
        subcategory: 'biotechnology',
        reason: 'Inside story of CRISPR discovery and its revolutionary potential. Written by master biographer.',
        priority: 'high',
        difficulty: 'beginner',
        pages: 560,
        year: 2021,
    },

    // AI & Machine Learning
    {
        id: 'ai-001',
        title: 'Life 3.0: Being Human in the Age of Artificial Intelligence',
        author: 'Max Tegmark',
        category: 'ai',
        subcategory: 'ai-philosophy',
        reason: 'Comprehensive exploration of AI\'s impact on humanity, from near-term applications to existential scenarios. Essential reading for understanding AI alignment.',
        priority: 'essential',
        difficulty: 'intermediate',
        pages: 384,
        year: 2017,
        keyTakeaways: [
            'AI safety and alignment',
            'Future scenarios analysis',
            'Consciousness and intelligence',
            'Ethical frameworks for AI',
        ],
        relatedTopics: ['AGI', 'AI safety', 'consciousness', 'future studies'],
    },
    {
        id: 'ai-002',
        title: 'The Alignment Problem: Machine Learning and Human Values',
        author: 'Brian Christian',
        category: 'ai',
        subcategory: 'ai-ethics',
        reason: 'Deep dive into how we ensure AI systems align with human values. Critical for anyone working with AI.',
        priority: 'essential',
        difficulty: 'intermediate',
        pages: 496,
        year: 2020,
    },
    {
        id: 'ai-003',
        title: 'Deep Learning',
        author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
        category: 'ai',
        subcategory: 'technical',
        reason: 'The definitive technical textbook on deep learning. Comprehensive coverage from fundamentals to cutting-edge research.',
        priority: 'high',
        difficulty: 'advanced',
        pages: 800,
        year: 2016,
    },
    {
        id: 'ai-004',
        title: 'Human Compatible: Artificial Intelligence and the Problem of Control',
        author: 'Stuart Russell',
        category: 'ai',
        subcategory: 'ai-safety',
        reason: 'Leading AI researcher proposes new paradigm for beneficial AI. Essential for understanding AI alignment challenges.',
        priority: 'essential',
        difficulty: 'intermediate',
        pages: 352,
        year: 2019,
    },

    // Technology
    {
        id: 'tech-001',
        title: 'The Innovators: How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution',
        author: 'Walter Isaacson',
        category: 'tech',
        subcategory: 'history',
        reason: 'Comprehensive history of computing from Ada Lovelace to modern internet. Understand the shoulders you stand on.',
        priority: 'high',
        difficulty: 'beginner',
        pages: 560,
        year: 2014,
    },
    {
        id: 'tech-002',
        title: 'Quantum Computing: An Applied Approach',
        author: 'Jack Hidary',
        category: 'tech',
        subcategory: 'quantum',
        reason: 'Practical introduction to quantum computing with hands-on examples. Perfect for understanding the coming quantum revolution.',
        priority: 'high',
        difficulty: 'advanced',
        pages: 380,
        year: 2021,
    },
    {
        id: 'tech-003',
        title: 'The Network State: How To Start a New Country',
        author: 'Balaji Srinivasan',
        category: 'tech',
        subcategory: 'future',
        reason: 'Visionary exploration of how technology enables new forms of governance and community organization.',
        priority: 'medium',
        difficulty: 'intermediate',
        pages: 400,
        year: 2022,
    },

    // Finance
    {
        id: 'fin-001',
        title: 'The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness',
        author: 'Morgan Housel',
        category: 'finance',
        subcategory: 'behavioral-finance',
        reason: 'Brilliant insights on how psychology drives financial decisions. More important than technical knowledge for long-term wealth.',
        priority: 'essential',
        difficulty: 'beginner',
        pages: 256,
        year: 2020,
        keyTakeaways: [
            'Behavior matters more than intelligence',
            'Compounding and patience',
            'Risk and uncertainty',
            'Wealth vs. riches',
        ],
    },
    {
        id: 'fin-002',
        title: 'The Bitcoin Standard: The Decentralized Alternative to Central Banking',
        author: 'Saifedean Ammous',
        category: 'finance',
        subcategory: 'cryptocurrency',
        reason: 'Comprehensive case for Bitcoin as sound money. Essential for understanding cryptocurrency\'s role in future finance.',
        priority: 'high',
        difficulty: 'intermediate',
        pages: 304,
        year: 2018,
    },
    {
        id: 'fin-003',
        title: 'A Random Walk Down Wall Street',
        author: 'Burton Malkiel',
        category: 'finance',
        subcategory: 'investing',
        reason: 'Classic guide to passive investing and market efficiency. Timeless wisdom for building wealth.',
        priority: 'high',
        difficulty: 'beginner',
        pages: 454,
        year: 2019,
    },
    {
        id: 'fin-004',
        title: 'The Intelligent Investor',
        author: 'Benjamin Graham',
        category: 'finance',
        subcategory: 'value-investing',
        reason: 'Warren Buffett\'s favorite book. Foundation of value investing philosophy.',
        priority: 'essential',
        difficulty: 'intermediate',
        pages: 640,
        year: 2006,
    },

    // Health & Longevity
    {
        id: 'health-001',
        title: 'Lifespan: Why We Age—and Why We Don\'t Have To',
        author: 'David Sinclair',
        category: 'health',
        subcategory: 'longevity',
        reason: 'Leading Harvard researcher reveals cutting-edge longevity science. Actionable strategies for extending healthspan.',
        priority: 'essential',
        difficulty: 'intermediate',
        pages: 432,
        year: 2019,
        keyTakeaways: [
            'Information theory of aging',
            'NAD+ and sirtuins',
            'Practical longevity interventions',
            'Future of aging research',
        ],
        relatedTopics: ['NAD+', 'sirtuins', 'metformin', 'resveratrol'],
    },
    {
        id: 'health-002',
        title: 'Why We Sleep: Unlocking the Power of Sleep and Dreams',
        author: 'Matthew Walker',
        category: 'health',
        subcategory: 'sleep',
        reason: 'Comprehensive science of sleep from world\'s leading expert. Will transform how you prioritize rest.',
        priority: 'essential',
        difficulty: 'beginner',
        pages: 368,
        year: 2017,
    },
    {
        id: 'health-003',
        title: 'Outlive: The Science and Art of Longevity',
        author: 'Peter Attia',
        category: 'health',
        subcategory: 'longevity',
        reason: 'Practical framework for extending healthspan through exercise, nutrition, sleep, and emotional health.',
        priority: 'essential',
        difficulty: 'intermediate',
        pages: 496,
        year: 2023,
    },
    {
        id: 'health-004',
        title: 'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma',
        author: 'Bessel van der Kolk',
        category: 'health',
        subcategory: 'mental-health',
        reason: 'Groundbreaking work on trauma and healing. Essential for understanding mind-body connection.',
        priority: 'high',
        difficulty: 'intermediate',
        pages: 464,
        year: 2014,
    },

    // Energy & Sustainability
    {
        id: 'energy-001',
        title: 'Drawdown: The Most Comprehensive Plan Ever Proposed to Reverse Global Warming',
        author: 'Paul Hawken',
        category: 'energy',
        subcategory: 'climate',
        reason: 'Data-driven solutions ranked by impact. Optimistic, actionable roadmap for climate action.',
        priority: 'essential',
        difficulty: 'beginner',
        pages: 256,
        year: 2017,
        keyTakeaways: [
            'Top 100 climate solutions',
            'Renewable energy potential',
            'Carbon sequestration methods',
            'Economic opportunities',
        ],
    },
    {
        id: 'energy-002',
        title: 'The Future of Fusion Energy',
        author: 'Jason Parisi, Justin Ball',
        category: 'energy',
        subcategory: 'fusion',
        reason: 'Comprehensive overview of fusion energy science and engineering. Understand the holy grail of clean energy.',
        priority: 'high',
        difficulty: 'advanced',
        pages: 250,
        year: 2019,
    },
    {
        id: 'energy-003',
        title: 'Energy and Civilization: A History',
        author: 'Vaclav Smil',
        category: 'energy',
        subcategory: 'history',
        reason: 'Magisterial history of energy use and its impact on civilization. Essential context for energy transition.',
        priority: 'high',
        difficulty: 'intermediate',
        pages: 552,
        year: 2017,
    },

    // Style & Personal Development
    {
        id: 'style-001',
        title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
        author: 'James Clear',
        category: 'style',
        subcategory: 'habits',
        reason: 'Science-backed system for building better habits. Practical framework for personal transformation.',
        priority: 'essential',
        difficulty: 'beginner',
        pages: 320,
        year: 2018,
    },
    {
        id: 'style-002',
        title: 'The Art of Learning: An Inner Journey to Optimal Performance',
        author: 'Josh Waitzkin',
        category: 'style',
        subcategory: 'learning',
        reason: 'Chess prodigy and martial arts champion reveals principles of mastery. Meta-learning at its finest.',
        priority: 'high',
        difficulty: 'intermediate',
        pages: 288,
        year: 2008,
    },
    {
        id: 'style-003',
        title: 'Range: Why Generalists Triumph in a Specialized World',
        author: 'David Epstein',
        category: 'style',
        subcategory: 'learning',
        reason: 'Compelling case for broad learning and diverse experiences. Perfect for polymaths.',
        priority: 'high',
        difficulty: 'beginner',
        pages: 352,
        year: 2019,
    },
];

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') || 'all';
        const priority = searchParams.get('priority');
        const difficulty = searchParams.get('difficulty');

        let filteredBooks = category === 'all'
            ? bookLibrary
            : bookLibrary.filter(book => book.category === category);

        if (priority) {
            filteredBooks = filteredBooks.filter(book => book.priority === priority);
        }

        if (difficulty) {
            filteredBooks = filteredBooks.filter(book => book.difficulty === difficulty);
        }

        // Sort by priority
        const priorityOrder = { essential: 0, high: 1, medium: 2, low: 3 };
        filteredBooks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

        return NextResponse.json({
            success: true,
            count: filteredBooks.length,
            category,
            books: filteredBooks,
            categories: ['biology', 'ai', 'tech', 'finance', 'health', 'energy', 'style'],
        });
    } catch (error) {
        console.error('Books API error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch books' },
            { status: 500 }
        );
    }
}
