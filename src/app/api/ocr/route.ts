import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { image } = await request.json();

        if (!image) {
            return NextResponse.json(
                { error: 'No image provided' },
                { status: 400 }
            );
        }

        // Check for API key
        const apiKey = process.env.OPENAI_API_KEY?.trim();
        if (!apiKey) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            );
        }

        console.log('Starting OCR processing with OpenAI...');

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: 'Please transcribe the handwritten notes in this image exactly as they appear. If there are diagrams, briefly describe them in brackets [Diagram: ...]. Output ONLY the transcribed text.',
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: image,
                                },
                            },
                        ],
                    },
                ],
                max_tokens: 1000,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('OpenAI API Error Status:', response.status);
            console.error('OpenAI API Error Body:', JSON.stringify(data));

            const errorMessage = data.error?.message || 'Failed to process image with OpenAI';

            // Handle specific error cases
            if (response.status === 401) {
                return NextResponse.json(
                    { error: 'Invalid API Key. Please check your OpenAI configuration.' },
                    { status: 401 }
                );
            }

            return NextResponse.json(
                { error: errorMessage },
                { status: response.status }
            );
        }

        const text = data.choices[0]?.message?.content || 'No text found.';

        console.log('OCR processing complete.');

        return NextResponse.json({ text });

    } catch (error) {
        console.error('Error in OCR route:', error);
        return NextResponse.json(
            { error: 'Internal Server Error during processing' },
            { status: 500 }
        );
    }
}
