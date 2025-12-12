import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface Discussion {
    id: string;
    itemId: string; // paper/book ID
    itemTitle: string;
    itemType: 'paper' | 'book' | 'article';
    userId: string;
    userName: string;
    userAvatar?: string;
    title: string;
    content: string;
    tags: string[];
    likes: number;
    replies: number;
    views: number;
    createdAt: string;
    updatedAt: string;
    isPinned?: boolean;
    isSolved?: boolean;
}

interface Reply {
    id: string;
    discussionId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    likes: number;
    isAnswer?: boolean;
    createdAt: string;
    updatedAt: string;
}

// Mock discussions data
let discussions: Discussion[] = [
    {
        id: 'disc-1',
        itemId: 'life-3.0',
        itemTitle: 'Life 3.0: Being Human in the Age of Artificial Intelligence',
        itemType: 'book',
        userId: 'user-2',
        userName: 'Alex Chen',
        userAvatar: '👨‍💻',
        title: 'Thoughts on the Omega Team scenario in Chapter 2?',
        content: 'I found the Omega Team thought experiment fascinating but also terrifying. The idea that a superintelligent AI could recursively self-improve to the point of outsmarting humanity is both exciting and concerning. What are your thoughts on the likelihood of this scenario?',
        tags: ['ai-safety', 'superintelligence', 'discussion'],
        likes: 24,
        replies: 8,
        views: 156,
        createdAt: '2025-12-09T14:30:00Z',
        updatedAt: '2025-12-10T09:15:00Z',
        isPinned: true,
    },
    {
        id: 'disc-2',
        itemId: 'crispr-base-editing',
        itemTitle: 'CRISPR-Cas9 Base Editing: Precision Gene Therapy',
        itemType: 'paper',
        userId: 'user-3',
        userName: 'Dr. Sarah Kim',
        userAvatar: '👩‍🔬',
        title: 'Question about off-target effects in base editing',
        content: 'The paper mentions significantly reduced off-target effects compared to traditional CRISPR. Has anyone found follow-up studies that quantify this more precisely? I\'m particularly interested in long-term stability data.',
        tags: ['crispr', 'question', 'research'],
        likes: 15,
        replies: 5,
        views: 89,
        createdAt: '2025-12-08T11:20:00Z',
        updatedAt: '2025-12-08T16:45:00Z',
        isSolved: true,
    },
    {
        id: 'disc-3',
        itemId: 'lifespan',
        itemTitle: 'Lifespan: Why We Age and Why We Don\'t Have To',
        itemType: 'book',
        userId: 'user-4',
        userName: 'Maria Rodriguez',
        userAvatar: '👩‍⚕️',
        title: 'NAD+ supplementation - anyone tried it?',
        content: 'Sinclair talks a lot about NAD+ boosters like NMN and NR. Has anyone here actually tried supplementing? What were your experiences? I\'m curious about the practical implementation of these longevity interventions.',
        tags: ['longevity', 'NAD+', 'practical'],
        likes: 42,
        replies: 18,
        views: 312,
        createdAt: '2025-12-07T09:00:00Z',
        updatedAt: '2025-12-11T14:20:00Z',
    },
    {
        id: 'disc-4',
        itemId: 'gpt-5-architecture',
        itemTitle: 'GPT-5 Architecture: Multimodal Reasoning',
        itemType: 'paper',
        userId: 'user-5',
        userName: 'James Park',
        userAvatar: '🧑‍💼',
        title: 'Implications for AI alignment research',
        content: 'The emergent capabilities described in this paper are impressive, but they also raise important questions about alignment. How do we ensure these more powerful models remain aligned with human values?',
        tags: ['ai-alignment', 'gpt', 'ethics'],
        likes: 31,
        replies: 12,
        views: 203,
        createdAt: '2025-12-11T10:30:00Z',
        updatedAt: '2025-12-11T18:45:00Z',
    },
];

let replies: Reply[] = [
    {
        id: 'reply-1',
        discussionId: 'disc-1',
        userId: 'user-6',
        userName: 'Emily Watson',
        userAvatar: '👩‍🎓',
        content: 'I think the key question is whether we can maintain control during the recursive self-improvement phase. Stuart Russell\'s work on value alignment might offer some solutions here.',
        likes: 12,
        createdAt: '2025-12-09T15:45:00Z',
        updatedAt: '2025-12-09T15:45:00Z',
    },
    {
        id: 'reply-2',
        discussionId: 'disc-2',
        userId: 'user-7',
        userName: 'Dr. Michael Lee',
        userAvatar: '👨‍🔬',
        content: 'Check out the Nature paper from October 2025 - "Long-term genomic stability of base-edited cells". They tracked edited cells for 2 years with minimal off-target effects (<0.1%).',
        likes: 8,
        isAnswer: true,
        createdAt: '2025-12-08T13:30:00Z',
        updatedAt: '2025-12-08T13:30:00Z',
    },
    {
        id: 'reply-3',
        discussionId: 'disc-3',
        userId: 'user-8',
        userName: 'David Thompson',
        userAvatar: '🧑‍⚕️',
        content: 'I\'ve been taking NMN for 6 months. Subjectively, I feel more energetic and my sleep quality has improved. Of course, this is anecdotal - would love to see more rigorous studies.',
        likes: 18,
        createdAt: '2025-12-07T11:15:00Z',
        updatedAt: '2025-12-07T11:15:00Z',
    },
];

// GET - Fetch discussions
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const itemId = searchParams.get('itemId');
        const discussionId = searchParams.get('discussionId');
        const sort = searchParams.get('sort') || 'recent'; // recent, popular, unanswered

        // Get specific discussion with replies
        if (discussionId) {
            const discussion = discussions.find(d => d.id === discussionId);
            if (!discussion) {
                return NextResponse.json(
                    { success: false, error: 'Discussion not found' },
                    { status: 404 }
                );
            }

            const discussionReplies = replies.filter(r => r.discussionId === discussionId);

            return NextResponse.json({
                success: true,
                discussion,
                replies: discussionReplies,
            });
        }

        // Filter by item
        let filtered = itemId
            ? discussions.filter(d => d.itemId === itemId)
            : discussions;

        // Sort
        switch (sort) {
            case 'popular':
                filtered.sort((a, b) => (b.likes + b.replies * 2) - (a.likes + a.replies * 2));
                break;
            case 'unanswered':
                filtered = filtered.filter(d => !d.isSolved);
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            default: // recent
                filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        }

        return NextResponse.json({
            success: true,
            count: filtered.length,
            discussions: filtered,
        });
    } catch (error) {
        console.error('Discussions GET error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch discussions' },
            { status: 500 }
        );
    }
}

// POST - Create discussion or reply
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, userId = 'user-1', userName = 'You' } = body;

        if (type === 'discussion') {
            const { itemId, itemTitle, itemType, title, content, tags } = body;

            if (!itemId || !title || !content) {
                return NextResponse.json(
                    { success: false, error: 'Missing required fields' },
                    { status: 400 }
                );
            }

            const newDiscussion: Discussion = {
                id: `disc-${Date.now()}`,
                itemId,
                itemTitle,
                itemType,
                userId,
                userName,
                title,
                content,
                tags: tags || [],
                likes: 0,
                replies: 0,
                views: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            discussions.push(newDiscussion);

            return NextResponse.json({
                success: true,
                discussion: newDiscussion,
                message: 'Discussion created',
            });
        } else if (type === 'reply') {
            const { discussionId, content } = body;

            if (!discussionId || !content) {
                return NextResponse.json(
                    { success: false, error: 'Missing required fields' },
                    { status: 400 }
                );
            }

            const discussion = discussions.find(d => d.id === discussionId);
            if (!discussion) {
                return NextResponse.json(
                    { success: false, error: 'Discussion not found' },
                    { status: 404 }
                );
            }

            const newReply: Reply = {
                id: `reply-${Date.now()}`,
                discussionId,
                userId,
                userName,
                content,
                likes: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            replies.push(newReply);
            discussion.replies++;
            discussion.updatedAt = new Date().toISOString();

            return NextResponse.json({
                success: true,
                reply: newReply,
                message: 'Reply added',
            });
        }

        return NextResponse.json(
            { success: false, error: 'Invalid type' },
            { status: 400 }
        );
    } catch (error) {
        console.error('Discussions POST error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create discussion/reply' },
            { status: 500 }
        );
    }
}

// PATCH - Like discussion/reply or mark as solved
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { type, id, action } = body;

        if (type === 'discussion') {
            const discussion = discussions.find(d => d.id === id);
            if (!discussion) {
                return NextResponse.json(
                    { success: false, error: 'Discussion not found' },
                    { status: 404 }
                );
            }

            if (action === 'like') {
                discussion.likes++;
            } else if (action === 'solve') {
                discussion.isSolved = true;
            } else if (action === 'pin') {
                discussion.isPinned = !discussion.isPinned;
            }

            return NextResponse.json({
                success: true,
                discussion,
                message: 'Discussion updated',
            });
        } else if (type === 'reply') {
            const reply = replies.find(r => r.id === id);
            if (!reply) {
                return NextResponse.json(
                    { success: false, error: 'Reply not found' },
                    { status: 404 }
                );
            }

            if (action === 'like') {
                reply.likes++;
            } else if (action === 'mark-answer') {
                reply.isAnswer = true;
                // Mark discussion as solved
                const discussion = discussions.find(d => d.id === reply.discussionId);
                if (discussion) discussion.isSolved = true;
            }

            return NextResponse.json({
                success: true,
                reply,
                message: 'Reply updated',
            });
        }

        return NextResponse.json(
            { success: false, error: 'Invalid type' },
            { status: 400 }
        );
    } catch (error) {
        console.error('Discussions PATCH error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update' },
            { status: 500 }
        );
    }
}
