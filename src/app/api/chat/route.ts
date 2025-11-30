import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { message, context } = await request.json();

        // Simulated AI responses - Replace with real AI API (OpenAI, Anthropic, etc.)
        const responses: { [key: string]: string } = {
            planetary: "I can help you understand global health metrics. The current air quality index is 72, which is moderate. Would you like specific recommendations for your region?",
            dividend: "Your portfolio is performing well with a 12.4% yearly return. Based on current market trends, I recommend considering AMD stock for AI chip exposure. Would you like more details?",
            simulation: "The Global Climate Action Fund scenario has strong support with 76% approval. Your vote could help push this initiative forward. Would you like to see the detailed impact analysis?",
            health: "Your health score of 92 is excellent! However, I notice your water intake is below optimal. Increasing hydration by 2 glasses daily could improve your energy levels by 15%.",
            general: "Hello! I'm your TerraOS AI assistant. I can help you with:\n\n🌍 Planetary health insights\n💰 Investment recommendations\n🎮 Governance scenarios\n🧬 Personal health tracking\n\nWhat would you like to explore?",
        };

        // Simple keyword matching - Replace with actual AI model
        let responseText = responses.general;
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('planet') || lowerMessage.includes('climate') || lowerMessage.includes('environment')) {
            responseText = responses.planetary;
        } else if (lowerMessage.includes('stock') || lowerMessage.includes('invest') || lowerMessage.includes('dividend')) {
            responseText = responses.dividend;
        } else if (lowerMessage.includes('vote') || lowerMessage.includes('scenario') || lowerMessage.includes('governance')) {
            responseText = responses.simulation;
        } else if (lowerMessage.includes('health') || lowerMessage.includes('fitness') || lowerMessage.includes('sleep')) {
            responseText = responses.health;
        }

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({
            response: responseText,
            timestamp: new Date().toISOString(),
            context: context || 'general',
        });
    } catch (error) {
        console.error('Error in AI chat:', error);
        return NextResponse.json(
            { error: 'Failed to process chat message' },
            { status: 500 }
        );
    }
}

// GET endpoint for chat history (future implementation)
export async function GET() {
    return NextResponse.json({
        message: 'Chat history endpoint - to be implemented',
        suggestions: [
            'How is the planet doing today?',
            'What stocks should I invest in?',
            'Show me active governance scenarios',
            'How can I improve my health score?',
        ],
    });
}
