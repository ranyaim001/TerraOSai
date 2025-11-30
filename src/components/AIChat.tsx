'use client';

import { useState } from 'react';
import styles from './AIChat.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function AIChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hello! I\'m your TerraOS AI Assistant powered by the latest AI models. How can I help you today?',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages([...messages, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response (in production, this would call an actual AI API)
        setTimeout(() => {
            const aiMessage: Message = {
                role: 'assistant',
                content: getAIResponse(input),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const getAIResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('planetary') || lowerQuery.includes('environment')) {
            return 'Based on current data, our planet is facing several challenges including climate change and deforestation. The Planetary HUD shows real-time metrics. Would you like me to provide specific recommendations for environmental action?';
        } else if (lowerQuery.includes('dividend') || lowerQuery.includes('money') || lowerQuery.includes('income')) {
            return 'Your current dividend balance is $2,847.50. The universal basic income system distributes resources fairly across all global citizens. You can view detailed transaction history in the My Dividend section.';
        } else if (lowerQuery.includes('health') || lowerQuery.includes('bio')) {
            return 'Your Bio-Twin shows an overall health score of 87/100. Your vitals are within normal ranges. I recommend maintaining your current sleep schedule and increasing daily water intake. Would you like personalized health insights from Michio Kushi\'s research?';
        } else if (lowerQuery.includes('simulation') || lowerQuery.includes('vote') || lowerQuery.includes('governance')) {
            return 'There are currently 3 active governance proposals in The Simulation. The Global Carbon Tax Initiative is leading with 69% approval. Your participation score is 87/100. Would you like to review and vote on active proposals?';
        } else {
            return 'I\'m here to help you navigate TerraOS and provide insights on planetary health, your dividend, governance participation, and personal wellness. What would you like to know more about?';
        }
    };

    return (
        <div className={`${styles.chatContainer} glass-panel`}>
            <div className={styles.chatHeader}>
                <div className={styles.headerInfo}>
                    <span className={styles.headerIcon}>🤖</span>
                    <div>
                        <h3 className={styles.headerTitle}>AI Assistant</h3>
                        <p className={styles.headerSubtitle}>Powered by latest AI models</p>
                    </div>
                </div>
                <div className={styles.statusIndicator}>
                    <span className={styles.statusDot}></span>
                    <span className={styles.statusText}>Online</span>
                </div>
            </div>

            <div className={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage
                            }`}
                    >
                        <div className={styles.messageAvatar}>
                            {message.role === 'user' ? '👤' : '🤖'}
                        </div>
                        <div className={styles.messageContent}>
                            <div className={styles.messageText}>{message.content}</div>
                            <div className={styles.messageTime}>
                                {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className={`${styles.message} ${styles.assistantMessage}`}>
                        <div className={styles.messageAvatar}>🤖</div>
                        <div className={styles.messageContent}>
                            <div className={styles.typingIndicator}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.inputContainer}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Ask me anything about TerraOS..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className={styles.sendButton} onClick={handleSend}>
                    <span>Send</span>
                    <span className={styles.sendIcon}>📤</span>
                </button>
            </div>

            <div className={styles.suggestions}>
                <button
                    className={styles.suggestionChip}
                    onClick={() => setInput('What is my current health score?')}
                >
                    Health Status
                </button>
                <button
                    className={styles.suggestionChip}
                    onClick={() => setInput('Show me active governance proposals')}
                >
                    Governance
                </button>
                <button
                    className={styles.suggestionChip}
                    onClick={() => setInput('What is my dividend balance?')}
                >
                    My Dividend
                </button>
            </div>
        </div>
    );
}
