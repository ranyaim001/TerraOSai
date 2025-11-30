'use client';

import { useState } from 'react';
import styles from './KnowledgeHub.module.css';
import RSSFeed from './RSSFeed';

export default function KnowledgeHub() {
    const [activeTab, setActiveTab] = useState('all');

    const resources = {
        health: [
            {
                type: 'Book',
                title: 'The Macrobiotic Way',
                author: 'Michio Kushi',
                description: 'The complete guide to macrobiotic living, covering diet, lifestyle, and the philosophy of balance between yin and yang for optimal health.',
                tags: ['Macrobiotic', 'Nutrition', 'Holistic Health'],
                url: 'https://www.amazon.com/Macrobiotic-Way-Definitive-Guide-Living/dp/1583331808',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Macrobiotic+Way',
            },
            {
                type: 'Book',
                title: 'The Cancer Prevention Diet',
                author: 'Michio Kushi with Alex Jack',
                description: 'Revolutionary approach to cancer prevention through whole foods and macrobiotic principles, based on decades of research and practice.',
                tags: ['Cancer Prevention', 'Diet', 'Prevention'],
                url: 'https://www.amazon.com/Cancer-Prevention-Diet-Michio-Kushi/dp/0312386301',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Cancer+Prevention',
            },
            {
                type: 'Article',
                title: 'Understanding Yin and Yang in Food',
                author: 'Kushi Institute',
                description: 'Learn how to balance your diet using the ancient principles of yin and yang, creating harmony in body and mind.',
                tags: ['Yin Yang', 'Balance', 'Food Energy'],
                url: 'https://www.shimacrobiotics.org/macrobiotics/yin-yang/',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Yin+Yang+Food',
            },
            {
                type: 'Research',
                title: 'Plant-Based Diets and Longevity',
                author: 'Harvard T.H. Chan School of Public Health',
                description: 'Comprehensive research on how whole food, plant-based diets contribute to increased lifespan and reduced chronic disease.',
                tags: ['Research', 'Longevity', 'Plant-Based'],
                url: 'https://www.hsph.harvard.edu/nutritionsource/plant-based-diets/',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Plant+Based+Research',
            },
            {
                type: 'Guide',
                title: 'Sea Vegetables: Nature\'s Mineral Treasure',
                author: 'Nutrition Facts',
                description: 'Discover the incredible health benefits of kombu, wakame, nori, and other sea vegetables rich in minerals and nutrients.',
                tags: ['Sea Vegetables', 'Minerals', 'Nutrition'],
                url: 'https://nutritionfacts.org/topics/sea-vegetables/',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Sea+Vegetables',
            },
        ],
        finance: [
            {
                type: 'Book',
                title: 'The Intelligent Investor',
                author: 'Benjamin Graham',
                description: 'The definitive book on value investing, teaching principles of sound investment strategy and financial decision-making.',
                tags: ['Investing', 'Value Investing', 'Classic'],
                url: 'https://www.amazon.com/Intelligent-Investor-Definitive-Investing-Essentials/dp/0060555661',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=Intelligent+Investor',
            },
            {
                type: 'Book',
                title: 'A Random Walk Down Wall Street',
                author: 'Burton Malkiel',
                description: 'Comprehensive guide to investment strategies, market efficiency, and building a diversified portfolio for long-term success.',
                tags: ['Portfolio', 'Diversification', 'Markets'],
                url: 'https://www.amazon.com/Random-Walk-Down-Wall-Street/dp/0393358380',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=Random+Walk',
            },
            {
                type: 'Guide',
                title: 'ESG Investing: A Comprehensive Guide',
                author: 'Investopedia',
                description: 'Learn how to align your investments with your values through environmental, social, and governance (ESG) criteria.',
                tags: ['ESG', 'Sustainable', 'Impact Investing'],
                url: 'https://www.investopedia.com/terms/e/environmental-social-and-governance-esg-criteria.asp',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=ESG+Investing',
            },
            {
                type: 'Article',
                title: 'The Psychology of Money',
                author: 'Morgan Housel',
                description: 'Understanding how emotions and behavior affect financial decisions, and how to make better choices with money.',
                tags: ['Psychology', 'Behavior', 'Decision Making'],
                url: 'https://www.collaborativefund.com/blog/the-psychology-of-money/',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=Psychology+of+Money',
            },
            {
                type: 'Research',
                title: 'Dividend Aristocrats: Long-Term Performance',
                author: 'S&P Dow Jones Indices',
                description: 'Analysis of companies with 25+ years of consecutive dividend increases and their superior long-term returns.',
                tags: ['Dividends', 'Long-Term', 'Performance'],
                url: 'https://www.spglobal.com/spdji/en/indices/strategy/sp-500-dividend-aristocrats/',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ffd700?text=Dividend+Aristocrats',
            },
        ],
        holistic: [
            {
                type: 'Philosophy',
                title: 'The Book of Macrobiotics',
                author: 'Michio Kushi',
                description: 'The universal way of health, happiness, and peace through understanding the order of the universe and living in harmony with nature.',
                tags: ['Philosophy', 'Macrobiotic', 'Universal Order'],
                url: 'https://www.amazon.com/Book-Macrobiotics-Universal-Health-Happiness/dp/0870406126',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Book+of+Macrobiotics',
            },
            {
                type: 'Book',
                title: 'One Peaceful World',
                author: 'Michio Kushi',
                description: 'Vision for creating world peace through individual health, dietary awareness, and understanding our connection to the environment.',
                tags: ['Peace', 'Global Health', 'Environment'],
                url: 'https://www.amazon.com/One-Peaceful-World-Michio-Kushi/dp/0312004786',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=One+Peaceful+World',
            },
            {
                type: 'Guide',
                title: 'Mindful Eating Practices',
                author: 'Center for Mindful Eating',
                description: 'Transform your relationship with food through awareness, gratitude, and conscious eating practices.',
                tags: ['Mindfulness', 'Eating', 'Awareness'],
                url: 'https://www.thecenterformindfuleating.org/',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Mindful+Eating',
            },
            {
                type: 'Article',
                title: 'The Gut-Brain Connection',
                author: 'Johns Hopkins Medicine',
                description: 'Understanding how digestive health affects mental well-being and decision-making capabilities.',
                tags: ['Gut Health', 'Mental Health', 'Connection'],
                url: 'https://www.hopkinsmedicine.org/health/wellness-and-prevention/the-brain-gut-connection',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Gut+Brain',
            },
            {
                type: 'Research',
                title: 'Fermented Foods and Cognitive Function',
                author: 'Journal of Nutritional Science',
                description: 'Scientific evidence linking traditional fermented foods like miso and tempeh to improved cognitive performance.',
                tags: ['Fermentation', 'Cognition', 'Research'],
                url: 'https://www.cambridge.org/core/journals/journal-of-nutritional-science',
                image: 'https://via.placeholder.com/400x200/1a1a2e/ff6b9d?text=Fermented+Foods',
            },
        ],
        tech: [
            {
                type: 'Book',
                title: 'Life 3.0: Being Human in the Age of AI',
                author: 'Max Tegmark',
                description: 'Explores the future of artificial intelligence and its impact on the fabric of human life, society, and the universe.',
                tags: ['AI', 'Future', 'Humanity'],
                url: 'https://www.amazon.com/Life-3-0-Being-Human-Artificial/dp/1101946598',
                image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Life+3.0',
            },
            {
                type: 'Book',
                title: 'Superintelligence: Paths, Dangers, Strategies',
                author: 'Nick Bostrom',
                description: 'A profound look at the potential risks and benefits of creating machine intelligence that surpasses human capabilities.',
                tags: ['AI Safety', 'Superintelligence', 'Strategy'],
                url: 'https://www.amazon.com/Superintelligence-Paths-Dangers-Strategies-Bostrom/dp/0199678111',
                image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Superintelligence',
            },
            {
                type: 'Article',
                title: 'The Case for Space Exploration',
                author: 'NASA',
                description: 'Why exploring the cosmos is essential for scientific advancement, technological innovation, and the future of humanity.',
                tags: ['Space', 'Exploration', 'Innovation'],
                url: 'https://www.nasa.gov/missions/solarsystem/why_we_explore.html',
                image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Space+Exploration',
            },
            {
                type: 'Research',
                title: 'Robotics in Healthcare: The Future of Surgery',
                author: 'Nature Medicine',
                description: 'How robotic systems are revolutionizing surgical procedures with greater precision, smaller incisions, and faster recovery times.',
                tags: ['Robotics', 'Healthcare', 'Surgery'],
                url: 'https://www.nature.com/subjects/robotics',
                image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Medical+Robotics',
            },
            {
                type: 'Guide',
                title: 'Introduction to Neural Networks',
                author: 'MIT OpenCourseWare',
                description: 'A fundamental guide to understanding how deep learning and neural networks power modern artificial intelligence.',
                tags: ['Deep Learning', 'Neural Networks', 'Education'],
                url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-034-artificial-intelligence-fall-2010/',
                image: 'https://via.placeholder.com/400x200/1a1a2e/00f2ff?text=Neural+Networks',
            },
        ],
    };

    const kushiPrinciples = [
        {
            title: 'Whole Grains as Foundation',
            text: '40-60% of daily diet should be whole grains like brown rice, millet, and barley for sustained energy and balance.',
        },
        {
            title: 'Seasonal & Local Foods',
            text: 'Eat foods grown in your climate and season to maintain harmony with your environment.',
        },
        {
            title: 'Yin-Yang Balance',
            text: 'Balance expansive (yin) and contractive (yang) foods to achieve physical and mental equilibrium.',
        },
        {
            title: 'Minimal Processing',
            text: 'Choose whole, unprocessed foods to preserve vital energy and nutritional integrity.',
        },
        {
            title: 'Mindful Preparation',
            text: 'Cook with gratitude and awareness, as the energy you bring to food preparation affects its quality.',
        },
        {
            title: 'Chew Thoroughly',
            text: 'Chew each mouthful 50-100 times to aid digestion and extract maximum nutrition.',
        },
    ];

    const filteredResources = activeTab === 'all'
        ? [...resources.health, ...resources.finance, ...resources.holistic, ...resources.tech]
        : resources[activeTab as keyof typeof resources] || [];

    return (
        <div className={styles.knowledgeHub}>
            <div className={styles.header}>
                <h1 className={styles.title}>Knowledge Hub</h1>
                <p className={styles.subtitle}>
                    Curated resources to help you make better decisions about health, finance, and holistic well-being.
                    Featuring the wisdom of Michio Kushi, modern research, and future technologies.
                </p>
            </div>

            {/* Michio Kushi Special Section */}
            <div className={styles.kushiSection}>
                <div className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>🌾</span>
                    Michio Kushi&apos;s Macrobiotic Wisdom
                </div>
                <div className={styles.kushiQuote}>
                    &quot;The greatest medicine is the food we eat every day. Through proper diet and lifestyle,
                    we can prevent disease, maintain health, and create a peaceful world.&quot;
                </div>
                <div className={styles.kushiAuthor}>— Michio Kushi</div>

                <div className={styles.principles}>
                    {kushiPrinciples.map((principle, index) => (
                        <div key={index} className={styles.principle}>
                            <div className={styles.principleTitle}>{principle.title}</div>
                            <div className={styles.principleText}>{principle.text}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Tabs */}
            <div className={styles.tabContainer}>
                <button
                    className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    All Resources
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'health' ? styles.active : ''}`}
                    onClick={() => setActiveTab('health')}
                >
                    🧬 Health & Nutrition
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'finance' ? styles.active : ''}`}
                    onClick={() => setActiveTab('finance')}
                >
                    💰 Finance & Investing
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'holistic' ? styles.active : ''}`}
                    onClick={() => setActiveTab('holistic')}
                >
                    🌿 Holistic Wellness
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'tech' ? styles.active : ''}`}
                    onClick={() => setActiveTab('tech')}
                >
                    🤖 AI, Space & Robotics
                </button>
            </div>

            {/* Resources Grid */}
            <div className={styles.section}>
                <div className={styles.resourceGrid}>
                    {filteredResources.map((resource, index) => (
                        <div key={index} className={styles.resourceCard}>
                            <img
                                src={resource.image}
                                alt={resource.title}
                                className={styles.resourceImage}
                                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
                            />
                            <div className={styles.resourceType}>{resource.type}</div>
                            <h3 className={styles.resourceTitle}>{resource.title}</h3>
                            <div className={styles.resourceAuthor}>by {resource.author}</div>
                            <p className={styles.resourceDescription}>{resource.description}</p>
                            <div className={styles.resourceTags}>
                                {resource.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.resourceLink}
                            >
                                Explore Resource →
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tech RSS Feed - Only shown when Tech tab is active or All */}
            {(activeTab === 'tech' || activeTab === 'all') && (
                <RSSFeed feedType="tech" title="Latest AI, Space & Robotics News" />
            )}
        </div>
    );
}
