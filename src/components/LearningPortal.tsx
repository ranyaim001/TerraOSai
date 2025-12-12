'use client';

import { useState, useEffect } from 'react';
import styles from './LearningPortal.module.css';

interface LearningTopic {
    id: string;
    name: string;
    icon: string;
    color: string;
    progress: number;
}

interface Resource {
    id: string;
    title: string;
    type: 'paper' | 'book' | 'article' | 'video' | 'course';
    category: string;
    date: string;
    source: string;
    summary: string;
    url: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    readingTime?: number;
    featured?: boolean;
}

interface BookRecommendation {
    title: string;
    author: string;
    category: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
    coverUrl?: string;
}

export default function LearningPortal() {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [resources, setResources] = useState<Resource[]>([]);
    const [bookRecommendations, setBookRecommendations] = useState<BookRecommendation[]>([]);
    const [loading, setLoading] = useState(true);

    const learningTopics: LearningTopic[] = [
        { id: 'biology', name: 'Biology', icon: '🧬', color: '#00ff9d', progress: 45 },
        { id: 'ai', name: 'AI & ML', icon: '🤖', color: '#00f0ff', progress: 67 },
        { id: 'tech', name: 'Technology', icon: '💻', color: '#7000ff', progress: 52 },
        { id: 'finance', name: 'Finance', icon: '💰', color: '#ffb800', progress: 38 },
        { id: 'health', name: 'Health', icon: '❤️', color: '#ff0055', progress: 71 },
        { id: 'style', name: 'Style', icon: '✨', color: '#ff69b4', progress: 29 },
        { id: 'energy', name: 'Energy', icon: '⚡', color: '#ffd700', progress: 55 },
    ];

    useEffect(() => {
        loadResources();
        loadBookRecommendations();
    }, [activeCategory]);

    const loadResources = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/research?category=${activeCategory}&limit=20`);
            const data = await response.json();

            if (data.success) {
                setResources(data.research);
            }
        } catch (error) {
            console.error('Failed to load resources:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadBookRecommendations = async () => {
        try {
            const response = await fetch(`/api/books?category=${activeCategory}`);
            const data = await response.json();

            if (data.success) {
                setBookRecommendations(data.books);
            }
        } catch (error) {
            console.error('Failed to load books:', error);
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'paper': return '📄';
            case 'book': return '📚';
            case 'article': return '📰';
            case 'video': return '🎥';
            case 'course': return '🎓';
            default: return '📌';
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return '#00ff9d';
            case 'intermediate': return '#ffb800';
            case 'advanced': return '#ff0055';
            default: return '#00f0ff';
        }
    };

    return (
        <div className={styles.portal}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <span className={styles.gradient}>Learning Portal</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Your personal gateway to cutting-edge knowledge across all domains
                    </p>
                </div>
            </div>

            {/* Learning Topics Grid */}
            <div className={styles.topicsGrid}>
                <div
                    className={`${styles.topicCard} glass-panel ${activeCategory === 'all' ? styles.active : ''}`}
                    onClick={() => setActiveCategory('all')}
                >
                    <div className={styles.topicIcon}>🌐</div>
                    <div className={styles.topicInfo}>
                        <h3>All Topics</h3>
                        <p>Everything</p>
                    </div>
                </div>
                {learningTopics.map(topic => (
                    <div
                        key={topic.id}
                        className={`${styles.topicCard} glass-panel ${activeCategory === topic.id ? styles.active : ''}`}
                        onClick={() => setActiveCategory(topic.id)}
                        style={{ '--topic-color': topic.color } as React.CSSProperties}
                    >
                        <div className={styles.topicIcon}>{topic.icon}</div>
                        <div className={styles.topicInfo}>
                            <h3>{topic.name}</h3>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${topic.progress}%`, backgroundColor: topic.color }}
                                />
                            </div>
                            <p>{topic.progress}% mastery</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Latest Research & Articles */}
                <div className={styles.resourcesSection}>
                    <div className={styles.sectionHeader}>
                        <h2>📡 Latest Research & Insights</h2>
                        <p>Curated from top journals and publications</p>
                    </div>

                    {loading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Loading latest research...</p>
                        </div>
                    ) : (
                        <div className={styles.resourcesList}>
                            {resources.map(resource => (
                                <div
                                    key={resource.id}
                                    className={`${styles.resourceCard} glass-panel ${resource.featured ? styles.featured : ''}`}
                                >
                                    {resource.featured && (
                                        <div className={styles.featuredBadge}>⭐ Featured</div>
                                    )}
                                    <div className={styles.resourceHeader}>
                                        <span className={styles.resourceType}>{getTypeIcon(resource.type)}</span>
                                        <span className={styles.resourceSource}>{resource.source}</span>
                                        <span className={styles.resourceDate}>{resource.date}</span>
                                    </div>
                                    <h3 className={styles.resourceTitle}>{resource.title}</h3>
                                    <p className={styles.resourceSummary}>{resource.summary}</p>
                                    <div className={styles.resourceFooter}>
                                        <div className={styles.resourceMeta}>
                                            <span
                                                className={styles.difficulty}
                                                style={{ color: getDifficultyColor(resource.difficulty) }}
                                            >
                                                {resource.difficulty}
                                            </span>
                                            {resource.readingTime && (
                                                <span className={styles.readingTime}>
                                                    ⏱️ {resource.readingTime} min read
                                                </span>
                                            )}
                                        </div>
                                        <button className={styles.readButton}>
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Book Recommendations */}
                <div className={styles.booksSection}>
                    <div className={styles.sectionHeader}>
                        <h2>📚 Recommended Reading</h2>
                        <p>Books curated for your learning journey</p>
                    </div>

                    <div className={styles.booksList}>
                        {bookRecommendations
                            .filter(book => activeCategory === 'all' || book.category === activeCategory)
                            .map((book, index) => (
                                <div key={index} className={`${styles.bookCard} glass-panel`}>
                                    <div className={styles.bookPriority} data-priority={book.priority}>
                                        {book.priority === 'high' ? '🔥' : '📖'}
                                    </div>
                                    <div className={styles.bookContent}>
                                        <h3 className={styles.bookTitle}>{book.title}</h3>
                                        <p className={styles.bookAuthor}>by {book.author}</p>
                                        <p className={styles.bookReason}>{book.reason}</p>
                                        <div className={styles.bookActions}>
                                            <button className={styles.addToList}>Add to Reading List</button>
                                            <button className={styles.preview}>Preview</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className={styles.statsBar}>
                <div className={`${styles.stat} glass-panel`}>
                    <div className={styles.statValue}>{resources.length}</div>
                    <div className={styles.statLabel}>New Resources</div>
                </div>
                <div className={`${styles.stat} glass-panel`}>
                    <div className={styles.statValue}>{bookRecommendations.length}</div>
                    <div className={styles.statLabel}>Books Recommended</div>
                </div>
                <div className={`${styles.stat} glass-panel`}>
                    <div className={styles.statValue}>7</div>
                    <div className={styles.statLabel}>Learning Domains</div>
                </div>
                <div className={`${styles.stat} glass-panel`}>
                    <div className={styles.statValue}>
                        {Math.round(learningTopics.reduce((acc, t) => acc + t.progress, 0) / learningTopics.length)}%
                    </div>
                    <div className={styles.statLabel}>Overall Progress</div>
                </div>
            </div>
        </div>
    );
}
