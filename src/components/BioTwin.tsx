'use client';

import styles from './BioTwin.module.css';

export default function BioTwin() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.gradient}>Bio-Twin</span>
                </h1>
                <p className={styles.subtitle}>Your Digital Health Twin & Wellness Companion</p>
            </header>

            <div className={styles.twinCard + ' glass-panel'}>
                <div className={styles.twinVisual}>
                    <div className={styles.avatar}>
                        <div className={styles.avatarIcon}>🧬</div>
                        <div className={styles.pulseRing}></div>
                    </div>
                    <div className={styles.twinInfo}>
                        <h2 className={styles.twinName}>Your Bio-Twin</h2>
                        <p className={styles.twinStatus}>
                            <span className={styles.statusDot}></span>
                            Synced & Active
                        </p>
                    </div>
                </div>

                <div className={styles.healthScore}>
                    <div className={styles.scoreCircle}>
                        <svg className={styles.scoreRing} viewBox="0 0 200 200">
                            <circle
                                cx="100"
                                cy="100"
                                r="85"
                                fill="none"
                                stroke="rgba(255, 255, 255, 0.1)"
                                strokeWidth="12"
                            />
                            <circle
                                cx="100"
                                cy="100"
                                r="85"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="12"
                                strokeDasharray={`${85 * 2 * Math.PI * 0.87} ${85 * 2 * Math.PI}`}
                                strokeLinecap="round"
                                transform="rotate(-90 100 100)"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="var(--primary)" />
                                    <stop offset="100%" stopColor="var(--secondary)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className={styles.scoreValue}>87</div>
                    </div>
                    <div className={styles.scoreLabel}>Overall Health Score</div>
                </div>
            </div>

            <div className={styles.metricsGrid}>
                <div className={`${styles.metricCard} glass-panel`}>
                    <div className={styles.metricIcon}>❤️</div>
                    <div className={styles.metricLabel}>Heart Rate</div>
                    <div className={styles.metricValue}>72 <span className={styles.metricUnit}>bpm</span></div>
                    <div className={styles.metricStatus} style={{ color: 'var(--success)' }}>Normal</div>
                </div>

                <div className={`${styles.metricCard} glass-panel`}>
                    <div className={styles.metricIcon}>🏃</div>
                    <div className={styles.metricLabel}>Daily Steps</div>
                    <div className={styles.metricValue}>8,247</div>
                    <div className={styles.metricStatus} style={{ color: 'var(--success)' }}>82% of goal</div>
                </div>

                <div className={`${styles.metricCard} glass-panel`}>
                    <div className={styles.metricIcon}>😴</div>
                    <div className={styles.metricLabel}>Sleep Quality</div>
                    <div className={styles.metricValue}>7.5 <span className={styles.metricUnit}>hrs</span></div>
                    <div className={styles.metricStatus} style={{ color: 'var(--success)' }}>Good</div>
                </div>

                <div className={`${styles.metricCard} glass-panel`}>
                    <div className={styles.metricIcon}>🧘</div>
                    <div className={styles.metricLabel}>Stress Level</div>
                    <div className={styles.metricValue}>Low</div>
                    <div className={styles.metricStatus} style={{ color: 'var(--success)' }}>Optimal</div>
                </div>
            </div>

            <div className={styles.contentGrid}>
                <div className={`${styles.insights} glass-panel`}>
                    <h3 className={styles.sectionTitle}>AI Insights & Recommendations</h3>
                    <div className={styles.insightsList}>
                        <div className={styles.insight}>
                            <div className={styles.insightIcon}>💡</div>
                            <div className={styles.insightContent}>
                                <div className={styles.insightTitle}>Hydration Reminder</div>
                                <div className={styles.insightText}>
                                    You're 20% below your daily water intake goal. Consider drinking 2 more glasses today.
                                </div>
                            </div>
                        </div>

                        <div className={styles.insight}>
                            <div className={styles.insightIcon}>🌟</div>
                            <div className={styles.insightContent}>
                                <div className={styles.insightTitle}>Great Progress!</div>
                                <div className={styles.insightText}>
                                    Your sleep quality has improved by 15% this week. Keep up the consistent bedtime routine.
                                </div>
                            </div>
                        </div>

                        <div className={styles.insight}>
                            <div className={styles.insightIcon}>⚠️</div>
                            <div className={styles.insightContent}>
                                <div className={styles.insightTitle}>Activity Alert</div>
                                <div className={styles.insightText}>
                                    You've been sedentary for 3 hours. A 5-minute walk would boost your energy levels.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.vitals} glass-panel`}>
                    <h3 className={styles.sectionTitle}>Vital Signs</h3>
                    <div className={styles.vitalsList}>
                        <div className={styles.vitalItem}>
                            <span className={styles.vitalLabel}>Blood Pressure</span>
                            <span className={styles.vitalValue}>120/80</span>
                        </div>
                        <div className={styles.vitalItem}>
                            <span className={styles.vitalLabel}>Body Temperature</span>
                            <span className={styles.vitalValue}>98.6°F</span>
                        </div>
                        <div className={styles.vitalItem}>
                            <span className={styles.vitalLabel}>Blood Oxygen</span>
                            <span className={styles.vitalValue}>98%</span>
                        </div>
                        <div className={styles.vitalItem}>
                            <span className={styles.vitalLabel}>BMI</span>
                            <span className={styles.vitalValue}>22.4</span>
                        </div>
                    </div>

                    <div className={styles.lastSync}>
                        <span className={styles.syncIcon}>🔄</span>
                        <span className={styles.syncText}>Last synced: 2 minutes ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
