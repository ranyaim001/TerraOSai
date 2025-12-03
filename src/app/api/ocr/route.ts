import { NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';

export async function POST(request: Request) {
    try {
        const { image } = await request.json();

        if (!image) {
            return NextResponse.json(
                { error: 'No image provided' },
                { status: 400 }
            );
        }

        console.log('Starting OCR processing with Tesseract.js...');

        // Initialize Tesseract worker
        const worker = await createWorker('eng');

        // Perform OCR
        const { data: { text } } = await worker.recognize(image);

        // Clean up
        await worker.terminate();

        console.log('OCR processing complete.');

        if (!text || text.trim().length === 0) {
            return NextResponse.json({ text: 'No text found in the image.' });
        }

        return NextResponse.json({ text });

    } catch (error) {
        console.error('Error in OCR route:', error);
        return NextResponse.json(
            { error: 'Failed to process image with Tesseract.js' },
            { status: 500 }
        );
    }
}
