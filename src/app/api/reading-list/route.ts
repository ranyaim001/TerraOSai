import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface ReadingListItem {
    id: string;
    userId: string;
    type: 'paper' | 'book' | 'article';
    itemId: string;
    title: string;
    author?: string;
    status: 'to-read' | 'reading' | 'completed';
    progress?: number; // 0-100
    notes?: string;
    rating?: number; // 1-5
    addedAt: string;
    startedAt?: string;
    completedAt?: string;
    tags?: string[];
    category: string;
}

// In-memory storage (in production, use a database)
let readingLists: ReadingListItem[] = [
    {
        id: '1',
        userId: 'user-1',
        type: 'book',
        itemId: 'life-3.0',
        title: 'Life 3.0: Being Human in the Age of Artificial Intelligence',
        author: 'Max Tegmark',
        status: 'reading',
        progress: 45,
        notes: 'Fascinating exploration of AI scenarios. Chapter 3 on consciousness is mind-blowing.',
        rating: 5,
        addedAt: '2025-12-01T10:00:00Z',
        startedAt: '2025-12-05T08:00:00Z',
        tags: ['ai', 'philosophy', 'future'],
        category: 'ai',
    },
    {
        id: '2',
        userId: 'user-1',
        type: 'paper',
        itemId: 'crispr-base-editing',
        title: 'CRISPR-Cas9 Base Editing: Precision Gene Therapy',
        author: 'Liu, D.R.',
        status: 'completed',
        progress: 100,
        notes: 'Revolutionary technique. Key insight: single-nucleotide changes without DSBs.',
        rating: 5,
        addedAt: '2025-11-28T14:00:00Z',
        startedAt: '2025-11-29T09:00:00Z',
        completedAt: '2025-11-30T16:00:00Z',
        tags: ['biology', 'crispr', 'genetics'],
        category: 'biology',
    },
    {
        id: '3',
        userId: 'user-1',
        type: 'book',
        itemId: 'lifespan',
        title: 'Lifespan: Why We Age and Why We Don\'t Have To',
        author: 'David Sinclair',
        status: 'to-read',
        progress: 0,
        addedAt: '2025-12-10T12:00:00Z',
        tags: ['health', 'longevity', 'science'],
        category: 'health',
    },
];

// GET - Fetch reading list
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId') || 'user-1';
        const status = searchParams.get('status');
        const category = searchParams.get('category');

        let filtered = readingLists.filter(item => item.userId === userId);

        if (status) {
            filtered = filtered.filter(item => item.status === status);
        }

        if (category && category !== 'all') {
            filtered = filtered.filter(item => item.category === category);
        }

        // Calculate statistics
        const stats = {
            total: filtered.length,
            toRead: filtered.filter(i => i.status === 'to-read').length,
            reading: filtered.filter(i => i.status === 'reading').length,
            completed: filtered.filter(i => i.status === 'completed').length,
            averageRating: filtered.filter(i => i.rating).reduce((acc, i) => acc + (i.rating || 0), 0) / filtered.filter(i => i.rating).length || 0,
        };

        return NextResponse.json({
            success: true,
            count: filtered.length,
            items: filtered,
            stats,
        });
    } catch (error) {
        console.error('Reading list GET error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch reading list' },
            { status: 500 }
        );
    }
}

// POST - Add item to reading list
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId = 'user-1', type, itemId, title, author, category, tags } = body;

        const newItem: ReadingListItem = {
            id: `item-${Date.now()}`,
            userId,
            type,
            itemId,
            title,
            author,
            status: 'to-read',
            progress: 0,
            addedAt: new Date().toISOString(),
            tags: tags || [],
            category,
        };

        readingLists.push(newItem);

        return NextResponse.json({
            success: true,
            item: newItem,
            message: 'Added to reading list',
        });
    } catch (error) {
        console.error('Reading list POST error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to add to reading list' },
            { status: 500 }
        );
    }
}

// PATCH - Update reading list item
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status, progress, notes, rating, tags } = body;

        const itemIndex = readingLists.findIndex(item => item.id === id);

        if (itemIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Item not found' },
                { status: 404 }
            );
        }

        const item = readingLists[itemIndex];

        // Update fields
        if (status) {
            item.status = status;
            if (status === 'reading' && !item.startedAt) {
                item.startedAt = new Date().toISOString();
            }
            if (status === 'completed') {
                item.completedAt = new Date().toISOString();
                item.progress = 100;
            }
        }
        if (progress !== undefined) item.progress = progress;
        if (notes !== undefined) item.notes = notes;
        if (rating !== undefined) item.rating = rating;
        if (tags !== undefined) item.tags = tags;

        readingLists[itemIndex] = item;

        return NextResponse.json({
            success: true,
            item,
            message: 'Reading list item updated',
        });
    } catch (error) {
        console.error('Reading list PATCH error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update reading list item' },
            { status: 500 }
        );
    }
}

// DELETE - Remove item from reading list
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Item ID required' },
                { status: 400 }
            );
        }

        const itemIndex = readingLists.findIndex(item => item.id === id);

        if (itemIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Item not found' },
                { status: 404 }
            );
        }

        readingLists.splice(itemIndex, 1);

        return NextResponse.json({
            success: true,
            message: 'Item removed from reading list',
        });
    } catch (error) {
        console.error('Reading list DELETE error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to remove from reading list' },
            { status: 500 }
        );
    }
}
