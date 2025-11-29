'use client';

import styles from './Navigation.module.css';

const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'planetary-hud', label: 'Planetary HUD', icon: '🌍' },
    { id: 'my-dividend', label: 'My Dividend', icon: '💰' },
    { id: 'the-simulation', label: 'The Simulation', icon: '🎮' },
    { id: 'bio-twin', label: 'Bio-Twin', icon: '🧬' },
];

interface NavigationProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
    return (
        <nav className={styles.navigation}>
            <div className={styles.logo}>
                <span className={styles.logoText}>TerraOS</span>
                <span className={styles.logoVersion}>v1.0</span>
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
                <div className={styles.status}>
                    <span className={styles.statusDot}></span>
                    <span className={styles.statusText}>Live</span>
                </div>
            </div>
        </nav>
    );
}
