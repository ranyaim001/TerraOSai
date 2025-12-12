import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';

interface SummaryRequest {
    text: string;
    type: 'paper' | 'article' | 'book-chapter';
    length: 'short' | 'medium' | 'detailed';
}

interface SummaryResponse {
    summary: string;
    keyPoints: string[];
    concepts: string[];
    actionableInsights: string[];
    relatedTopics: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export async function POST(request: Request) {
    try {
        const body: SummaryRequest = await request.json();
        const { text, type = 'article', length = 'medium' } = body;

        if (!text || text.length < 100) {
            return NextResponse.json(
                { success: false, error: 'Text too short for summarization' },
                { status: 400 }
            );
        }

        // Check for Google AI API key
        const apiKey = process.env.GOOGLE_AI_API_KEY;

        if (!apiKey) {
            // Return mock summary if no API key
            return NextResponse.json({
                success: true,
                summary: generateMockSummary(text, type, length),
                note: 'Using mock summary - configure GOOGLE_AI_API_KEY for AI-powered summaries',
            });
        }

        // Initialize Google Generative AI
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Create prompt based on type and length
        const prompt = createSummaryPrompt(text, type, length);

        // Generate summary
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summaryText = response.text();

        // Parse the structured response
        const parsedSummary = parseSummaryResponse(summaryText);

        return NextResponse.json({
            success: true,
            ...parsedSummary,
            generatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('AI Summary error:', error);

        // Fallback to mock summary on error
        const body = await request.json();
        return NextResponse.json({
            success: true,
            ...generateMockSummary(body.text, body.type, body.length),
            note: 'Using fallback summary due to API error',
        });
    }
}

function createSummaryPrompt(text: string, type: string, length: string): string {
    const lengthMap = {
        short: '2-3 sentences',
        medium: '1 paragraph (5-7 sentences)',
        detailed: '2-3 paragraphs',
    };

    const targetLength = lengthMap[length as keyof typeof lengthMap];

    return `You are an expert research analyst. Analyze the following ${type} and provide a structured summary.

TEXT TO SUMMARIZE:
${text.substring(0, 4000)}

Please provide:
1. SUMMARY (${targetLength}): A clear, concise summary of the main content
2. KEY POINTS (3-5 bullet points): The most important takeaways
3. CONCEPTS (3-5 terms): Key concepts or terminology introduced
4. ACTIONABLE INSIGHTS (2-3 points): Practical applications or insights
5. RELATED TOPICS (3-5 topics): Related areas for further exploration
6. DIFFICULTY LEVEL: Rate as beginner, intermediate, or advanced

Format your response as JSON with these exact keys: summary, keyPoints, concepts, actionableInsights, relatedTopics, difficulty`;
}

function parseSummaryResponse(text: string): SummaryResponse {
    try {
        // Try to parse as JSON first
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        // Fallback: parse structured text
        return {
            summary: extractSection(text, 'SUMMARY') || text.substring(0, 500),
            keyPoints: extractList(text, 'KEY POINTS'),
            concepts: extractList(text, 'CONCEPTS'),
            actionableInsights: extractList(text, 'ACTIONABLE INSIGHTS'),
            relatedTopics: extractList(text, 'RELATED TOPICS'),
            difficulty: extractDifficulty(text),
        };
    } catch (error) {
        console.error('Error parsing summary:', error);
        return {
            summary: text.substring(0, 500),
            keyPoints: [],
            concepts: [],
            actionableInsights: [],
            relatedTopics: [],
            difficulty: 'intermediate',
        };
    }
}

function extractSection(text: string, section: string): string {
    const regex = new RegExp(`${section}[:\\s]+(.*?)(?=\\n\\n|KEY POINTS|CONCEPTS|$)`, 'is');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
}

function extractList(text: string, section: string): string[] {
    const regex = new RegExp(`${section}[:\\s]+(.*?)(?=\\n\\n|SUMMARY|CONCEPTS|ACTIONABLE|RELATED|DIFFICULTY|$)`, 'is');
    const match = text.match(regex);
    if (!match) return [];

    return match[1]
        .split('\n')
        .map(line => line.replace(/^[-*•]\s*/, '').trim())
        .filter(line => line.length > 0)
        .slice(0, 5);
}

function extractDifficulty(text: string): 'beginner' | 'intermediate' | 'advanced' {
    const lower = text.toLowerCase();
    if (lower.includes('beginner')) return 'beginner';
    if (lower.includes('advanced')) return 'advanced';
    return 'intermediate';
}

function generateMockSummary(text: string, type: string, length: string): SummaryResponse {
    const wordCount = text.split(' ').length;
    const difficulty: 'beginner' | 'intermediate' | 'advanced' =
        wordCount < 500 ? 'beginner' : wordCount < 1500 ? 'intermediate' : 'advanced';

    return {
        summary: `This ${type} explores important concepts in its field. The content provides valuable insights and presents research findings that contribute to our understanding of the topic. ${length === 'detailed' ? 'The work builds on previous research and offers new perspectives that advance the field. Key methodologies and findings are presented with supporting evidence.' : ''}`,
        keyPoints: [
            'Presents novel research findings and insights',
            'Builds on existing knowledge in the field',
            'Offers practical applications and implications',
            'Suggests directions for future research',
        ],
        concepts: [
            'Core theoretical framework',
            'Methodological approach',
            'Key findings and results',
            'Practical implications',
        ],
        actionableInsights: [
            'Apply findings to real-world scenarios',
            'Consider implications for your work',
            'Explore related research areas',
        ],
        relatedTopics: [
            'Related research methodologies',
            'Complementary theoretical frameworks',
            'Practical applications',
            'Future research directions',
        ],
        difficulty,
    };
}
