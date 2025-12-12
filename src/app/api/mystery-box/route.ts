import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';

interface Surprise {
    type: 'joke' | 'fact' | 'puzzle' | 'challenge' | 'quote' | 'riddle' | 'story';
    content: string;
    emoji: string;
    category?: string;
}

// Fallback surprises if AI is unavailable
const fallbackSurprises: Surprise[] = [
    {
        type: 'joke',
        content: "Why don't scientists trust atoms? Because they make up everything!",
        emoji: '😄',
    },
    {
        type: 'fact',
        content: "Honey never spoils. Archaeologists have found 3000-year-old honey in Egyptian tombs that's still perfectly edible!",
        emoji: '🍯',
    },
    {
        type: 'puzzle',
        content: "I am always hungry and will die if not fed, but whatever I touch will soon turn red. What am I? (Answer: Fire)",
        emoji: '🔥',
    },
    {
        type: 'challenge',
        content: "Try to write your name with your non-dominant hand while looking in a mirror. It's harder than you think!",
        emoji: '🎯',
    },
    {
        type: 'quote',
        content: '"The only way to do great work is to love what you do." - Steve Jobs',
        emoji: '💡',
    },
    {
        type: 'fact',
        content: "Octopuses have three hearts! Two pump blood to the gills, while the third pumps it to the rest of the body.",
        emoji: '🐙',
    },
    {
        type: 'riddle',
        content: "What has hands but cannot clap? (Answer: A clock)",
        emoji: '🎭',
    },
    {
        type: 'joke',
        content: "Why did the scarecrow win an award? Because he was outstanding in his field!",
        emoji: '🌾',
    },
    {
        type: 'fact',
        content: "Bananas are berries, but strawberries aren't! In botanical terms, a berry is a fruit produced from a single flower with one ovary.",
        emoji: '🍌',
    },
    {
        type: 'challenge',
        content: "Can you name 10 things you're grateful for in the next 60 seconds? Go!",
        emoji: '🙏',
    },
    {
        type: 'story',
        content: "Once upon a time, a tiny seed fell into a crack in the sidewalk. Everyone said it would never grow. But with just a little rain and sunlight, it became a beautiful flower, proving that even in the toughest conditions, life finds a way.",
        emoji: '🌱',
    },
    {
        type: 'puzzle',
        content: "If you have me, you want to share me. If you share me, you don't have me. What am I? (Answer: A secret)",
        emoji: '🤫',
    },
    {
        type: 'fact',
        content: "The shortest war in history lasted only 38-45 minutes! It was between Britain and Zanzibar on August 27, 1896.",
        emoji: '⏱️',
    },
    {
        type: 'quote',
        content: '"In the middle of difficulty lies opportunity." - Albert Einstein',
        emoji: '✨',
    },
    {
        type: 'joke',
        content: "What do you call a bear with no teeth? A gummy bear!",
        emoji: '🐻',
    },
];

export async function GET() {
    try {
        const apiKey = process.env.GOOGLE_AI_API_KEY;

        // If no API key, return random fallback
        if (!apiKey) {
            const randomSurprise = fallbackSurprises[Math.floor(Math.random() * fallbackSurprises.length)];
            return NextResponse.json({
                success: true,
                ...randomSurprise,
                source: 'curated',
            });
        }

        // Use AI to generate a surprise
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const surpriseTypes = ['joke', 'fact', 'puzzle', 'challenge', 'quote', 'riddle', 'story'];
        const randomType = surpriseTypes[Math.floor(Math.random() * surpriseTypes.length)];

        const prompts: { [key: string]: string } = {
            joke: "Tell me a clever, family-friendly joke that will make someone smile. Keep it short and punchy.",
            fact: "Share a fascinating, mind-blowing fact about science, nature, history, or the universe. Make it interesting and surprising!",
            puzzle: "Create a short, clever brain teaser or logic puzzle with the answer included at the end in parentheses.",
            challenge: "Give me a fun, creative challenge someone can do right now to break up their day. Make it playful and engaging!",
            quote: "Share an inspiring, thought-provoking quote from a notable person. Include the author's name.",
            riddle: "Create a clever riddle with the answer included at the end in parentheses. Make it challenging but solvable!",
            story: "Tell a very short (2-3 sentences), uplifting micro-story that inspires or brings joy.",
        };

        const prompt = prompts[randomType] || prompts.joke;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const content = response.text().trim();

        const emojiMap: { [key: string]: string } = {
            joke: '😄',
            fact: '🤯',
            puzzle: '🧩',
            challenge: '🎯',
            quote: '💡',
            riddle: '🎭',
            story: '📖',
        };

        return NextResponse.json({
            success: true,
            type: randomType,
            content,
            emoji: emojiMap[randomType] || '🎁',
            source: 'ai-generated',
        });
    } catch (error) {
        console.error('Mystery Box error:', error);

        // Fallback to random curated surprise
        const randomSurprise = fallbackSurprises[Math.floor(Math.random() * fallbackSurprises.length)];
        return NextResponse.json({
            success: true,
            ...randomSurprise,
            source: 'curated',
        });
    }
}
