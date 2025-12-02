'use client';

import { useState, useRef } from 'react';
import styles from './NotesAI.module.css';

export default function NotesAI() {
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Resize image to avoid payload limits (max 1024px width/height)
    const resizeImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const MAX_SIZE = 1024;

                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.8));
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const resizedImage = await resizeImage(file);
                setImage(resizedImage);
                setText('');
                setError(null);
            } catch (err) {
                console.error('Error resizing image:', err);
                setError('Failed to process image. Please try another file.');
            }
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            try {
                const resizedImage = await resizeImage(file);
                setImage(resizedImage);
                setText('');
                setError(null);
            } catch (err) {
                console.error('Error resizing image:', err);
                setError('Failed to process image. Please try another file.');
            }
        }
    };

    const handleTranscribe = async () => {
        if (!image) return;

        setIsProcessing(true);
        setError(null);
        setText('');

        try {
            const response = await fetch('/api/ocr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setText(data.text);
            }
        } catch (error) {
            console.error('Transcription failed:', error);
            setError('Failed to connect to the server. Please check your internet connection.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        alert('Text copied to clipboard!');
    };

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'transcribed_notes.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.gradient}>Notes AI</span>
                </h1>
                <p className={styles.subtitle}>
                    Transform your handwritten notes into digital text instantly.
                </p>
            </header>

            <div className={styles.content}>
                <div className={styles.uploadSection}>
                    <div
                        className={styles.uploadArea}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        {image ? (
                            <>
                                <img src={image} alt="Preview" className={styles.previewImage} />
                                <button
                                    className={styles.removeButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImage(null);
                                        setText('');
                                        setError(null);
                                    }}
                                >
                                    ✕
                                </button>
                            </>
                        ) : (
                            <>
                                <span className={styles.uploadIcon}>📸</span>
                                <span className={styles.uploadText}>Click to upload or drag & drop</span>
                                <span className={styles.uploadSubtext}>Supports JPG, PNG, WEBP</span>
                            </>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className={styles.fileInput}
                            accept="image/*"
                            onChange={handleFileSelect}
                        />
                    </div>

                    <button
                        className={styles.transcribeButton}
                        onClick={handleTranscribe}
                        disabled={!image || isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <div className={styles.loadingSpinner}></div>
                                Processing...
                            </>
                        ) : (
                            <>✨ Transcribe Notes</>
                        )}
                    </button>

                    {error && (
                        <div className={styles.errorMessage}>
                            ⚠️ {error}
                        </div>
                    )}
                </div>

                <div className={styles.resultSection}>
                    <textarea
                        className={styles.textArea}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Your transcribed text will appear here..."
                        readOnly={isProcessing}
                    />

                    <div className={styles.actions}>
                        <button
                            className={styles.actionButton}
                            onClick={handleCopy}
                            disabled={!text}
                        >
                            📋 Copy to Clipboard
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={handleDownload}
                            disabled={!text}
                        >
                            💾 Download .txt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
