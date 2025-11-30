'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './RSSFeed.module.css';

interface Article {
    title: string;
    summary: string;
    url: string;
    publishedDate: string;
    image?: string;
}

interface Feed {
    id: number;
    source: string;
    url: string;
    category: string;
    articles: Article[];
}

interface RSSFeedProps {
    feedType: 'planetary' | 'finance' | 'health' | 'simulation' | 'tech' | 'fitness';
    title?: string;
}

export default function RSSFeed({ feedType, title }: RSSFeedProps) {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFeeds = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/rss/${feedType}`);
            if (!response.ok) throw new Error('Failed to fetch feeds');
            const data = await response.json();
            setFeeds(data.feeds || []);
        } catch (err) {
            setError('Unable to load news feeds. Please try again later.');
            console.error('RSS Feed Error:', err);
        } finally {
            setLoading(false);
        }
    }, [feedType]);

    useEffect(() => {
        fetchFeeds();
    }, [fetchFeeds]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const allArticles = feeds.flatMap(feed =>
        feed.articles.map(article => ({
            ...article,
            source: feed.source,
            category: feed.category,
        }))
    );

    if (loading) {
        return <div className={styles.loading}>Loading latest news...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (allArticles.length === 0) {
        return <div className={styles.noArticles}>No articles available at this time.</div>;
    }

    return (
        <div className={styles.rssFeed}>
            <div className={styles.feedHeader}>
                <h2 className={styles.feedTitle}>{title || 'Latest News & Insights'}</h2>
                <button className={styles.refreshButton} onClick={fetchFeeds}>
                    🔄 Refresh
                </button>
            </div>

            <div className={styles.feedGrid}>
                {allArticles.map((article, index) => (
                    <div key={index} className={styles.articleCard}>
                        {article.image && (
                            <img
                                src={article.image}
                                alt={article.title}
                                className={styles.articleImage}
                            />
                        )}
                        <div className={styles.articleContent}>
                            <div className={styles.categoryBadge}>{article.category}</div>
                            <div className={styles.articleSource}>{article.source}</div>
                            <h3 className={styles.articleTitle}>{article.title}</h3>
                            <p className={styles.articleSummary}>{article.summary}</p>
                            <div className={styles.articleFooter}>
                                <span className={styles.articleDate}>
                                    {formatDate(article.publishedDate)}
                                </span>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.readMore}
                                >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
