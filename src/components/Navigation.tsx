'use client';

import { useState } from 'react';
import TerraOSLogo from './TerraOSLogo';
import styles from './Navigation.module.css';

const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'planetary-hud', label: 'Planetary HUD', icon: '🌍' },
    { id: 'my-dividend', label: 'My Dividend', icon: '💰' },
    { id: 'the-simulation', label: 'The Simulation', icon: '🎮' },
    { id: 'bio-twin', label: 'Bio-Twin', icon: '🧬' },
    { id: 'knowledge-hub', label: 'Knowledge Hub', icon: '📚' },
];

interface NavigationProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
    const [language, setLanguage] = useState('en');
    const [showFeedback, setShowFeedback] = useState(false);

    const handleFeedback = () => {
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 2000);
    };

    return (
        <nav className={styles.navigation}>
            <div className={styles.logo}>
                <TerraOSLogo width={40} height={40} />
                <div className={styles.logoTextContainer}>
                    <span className={styles.logoText}>TerraOS</span>
                    <span className={styles.logoVersion}>v1.0</span>
                </div>
            </div>

            <ul className={styles.navList}>
                {navItems.map((item) => (
                    <li key={item.id}>
                        <button
                            className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
                            onClick={() => onTabChange(item.id)}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navLabel}>{item.label}</span>
                        </button>
                    </li>
                ))}
            </ul>

            <div className={styles.footer}>
                <div className={styles.languageSelector}>
                    <label className={styles.languageLabel}>🌐</label>
                    <select
                        className={styles.languageDropdown}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="zh">中文</option>
                        <option value="ja">日本語</option>
                        <option value="ar">العربية</option>
                        <option value="hi">हिन्दी</option>
                    </select>
                </div>

                <button className={styles.feedbackButton} onClick={handleFeedback}>
                    💬 Feedback
                </button>

                {showFeedback && (
                    <div className={styles.feedbackToast}>
                        ✓ Thank you for your feedback!
                    </div>
                )}

                <div className={styles.status}>
                    <span className={styles.statusDot}></span>
                    <span className={styles.statusText}>Live</span>
                </div>
            </div>
        </nav>
    );
}
