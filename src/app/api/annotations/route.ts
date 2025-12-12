import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface Annotation {
    id: string;
    userId: string;
    itemId: string; // paper/book ID
    itemType: 'paper' | 'book' | 'article';
    type: 'highlight' | 'note' | 'bookmark' | 'question';
    content: string;
    selectedText?: string; // For highlights
    pageNumber?: number;
    position?: { start: number; end: number };
    tags?: string[];
    color?: string;
    createdAt: string;
    updatedAt: string;
}

// In-memory storage (in production, use a database)
let annotations: Annotation[] = [
    {
        id: 'ann-1',
        userId: 'user-1',
        itemId: 'life-3.0',
        itemType: 'book',
        type: 'highlight',
        content: 'Key insight about AI consciousness',
        selectedText: 'Consciousness is not a binary property but exists on a spectrum',
        pageNumber: 42,
        tags: ['consciousness', 'important'],
        color: '#ffb800',
        createdAt: '2025-12-08T14:30:00Z',
        updatedAt: '2025-12-08T14:30:00Z',
    },
    {
        id: 'ann-2',
        userId: 'user-1',
        itemId: 'life-3.0',
        itemType: 'book',
        type: 'note',
        content: 'This reminds me of the Chinese Room argument. Need to explore the connection between syntactic processing and semantic understanding.',
        pageNumber: 45,
        tags: ['philosophy', 'todo'],
        createdAt: '2025-12-08T15:00:00Z',
        updatedAt: '2025-12-08T15:00:00Z',
    },
    {
        id: 'ann-3',
        userId: 'user-1',
        itemId: 'crispr-base-editing',
        itemType: 'paper',
        type: 'question',
        content: 'What are the long-term effects of base editing on off-target sites? Need to research this further.',
        tags: ['research-question', 'follow-up'],
        color: '#ff0055',
        createdAt: '2025-11-29T10:15:00Z',
        updatedAt: '2025-11-29T10:15:00Z',
    },
];

// GET - Fetch annotations
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId') || 'user-1';
        const itemId = searchParams.get('itemId');
        const type = searchParams.get('type');

        let filtered = annotations.filter(ann => ann.userId === userId);

        if (itemId) {
            filtered = filtered.filter(ann => ann.itemId === itemId);
        }

        if (type) {
            filtered = filtered.filter(ann => ann.type === type);
        }

        // Sort by creation date (newest first)
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json({
            success: true,
            count: filtered.length,
            annotations: filtered,
        });
    } catch (error) {
        console.error('Annotations GET error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch annotations' },
            { status: 500 }
        );
    }
}

// POST - Create annotation
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            userId = 'user-1',
            itemId,
            itemType,
            type,
            content,
            selectedText,
            pageNumber,
            position,
            tags,
            color,
        } = body;

        if (!itemId || !type || !content) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newAnnotation: Annotation = {
            id: `ann-${Date.now()}`,
            userId,
            itemId,
            itemType,
            type,
            content,
            selectedText,
            pageNumber,
            position,
            tags: tags || [],
            color,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        annotations.push(newAnnotation);

        return NextResponse.json({
            success: true,
            annotation: newAnnotation,
            message: 'Annotation created',
        });
    } catch (error) {
        console.error('Annotations POST error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create annotation' },
            { status: 500 }
        );
    }
}

// PATCH - Update annotation
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, content, tags, color } = body;

        const annIndex = annotations.findIndex(ann => ann.id === id);

        if (annIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Annotation not found' },
                { status: 404 }
            );
        }

        const annotation = annotations[annIndex];

        if (content !== undefined) annotation.content = content;
        if (tags !== undefined) annotation.tags = tags;
        if (color !== undefined) annotation.color = color;
        annotation.updatedAt = new Date().toISOString();

        annotations[annIndex] = annotation;

        return NextResponse.json({
            success: true,
            annotation,
            message: 'Annotation updated',
        });
    } catch (error) {
        console.error('Annotations PATCH error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update annotation' },
            { status: 500 }
        );
    }
}

// DELETE - Remove annotation
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Annotation ID required' },
                { status: 400 }
            );
        }

        const annIndex = annotations.findIndex(ann => ann.id === id);

        if (annIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Annotation not found' },
                { status: 404 }
            );
        }

        annotations.splice(annIndex, 1);

        return NextResponse.json({
            success: true,
            message: 'Annotation deleted',
        });
    } catch (error) {
        console.error('Annotations DELETE error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete annotation' },
            { status: 500 }
        );
    }
}
