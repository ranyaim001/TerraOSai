'use client';

import styles from './PlanetaryHUD.module.css';
import RSSFeed from './RSSFeed';

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: string;
}

function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
    const trendColor = trend === 'up' ? 'var(--success)' : trend === 'down' ? 'var(--error)' : 'var(--warning)';

    return (
        <div className={`${styles.metricCard} glass-panel`}>
            <div className={styles.metricHeader}>
                <span className={styles.metricIcon}>{icon}</span>
                <span className={styles.metricTitle}>{title}</span>
            </div>
            <div className={styles.metricValue}>{value}</div>
            <div className={styles.metricChange} style={{ color: trendColor }}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {change}
            </div>
        </div>
    );
}

export default function PlanetaryHUD() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.gradient}>Planetary HUD</span>
                </h1>
                <p className={styles.subtitle}>Real-time global health monitoring</p>
            </header>

            <div className={styles.metricsGrid}>
                <MetricCard
                    title="Global Population"
                    value="8.1B"
                    change="+0.9% this year"
                    trend="up"
                    icon="👥"
                />
                <MetricCard
                    title="CO₂ Levels"
                    value="421 ppm"
                    change="+2.1 ppm/year"
                    trend="down"
                    icon="🌡️"
                />
                <MetricCard
                    title="Forest Coverage"
                    value="31.2%"
                    change="-0.3% this year"
                    trend="down"
                    icon="🌲"
                />
                <MetricCard
                    title="Ocean Health"
                    value="72%"
                    change="-1.2% this year"
                    trend="down"
                    icon="🌊"
                />
                <MetricCard
                    title="Renewable Energy"
                    value="29.4%"
                    change="+3.8% this year"
                    trend="up"
                    icon="⚡"
                />
                <MetricCard
                    title="Global GDP"
                    value="$105T"
                    change="+2.9% this year"
                    trend="up"
                    icon="💹"
                />
            </div>

            <div className={styles.visualizationSection}>
                <div className={`${styles.worldMap} glass-panel`}>
                    <h3 className={styles.sectionTitle}>Global Activity Map</h3>
                    <div className={styles.mapPlaceholder}>
                        <div className={styles.globe}>🌍</div>
                        <p className={styles.mapText}>Real-time planetary data visualization</p>
                    </div>
                </div>

                <div className={`${styles.alerts} glass-panel`}>
                    <h3 className={styles.sectionTitle}>Active Alerts & Resource Allocation</h3>
                    <div className={styles.alertsList}>
                        <div className={`${styles.alert} ${styles.alertCritical}`}>
                            <span className={styles.alertIcon}>🌪️</span>
                            <div className={styles.alertContent}>
                                <div className={styles.alertTitle}>Natural Disaster: Hurricane</div>
                                <div className={styles.alertText}>Category 4 approaching Florida coast</div>
                                <div className={styles.resourceAllocation}>
                                    <span className={styles.resourceLabel}>Resources Needed:</span>
                                    <span className={styles.resourceValue}>$2.5B, 5K personnel</span>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.alert} ${styles.alertCritical}`}>
                            <span className={styles.alertIcon}>🔥</span>
                            <div className={styles.alertContent}>
                                <div className={styles.alertTitle}>Human Disaster: Conflict Zone</div>
                                <div className={styles.alertText}>Humanitarian crisis in East Africa</div>
                                <div className={styles.resourceAllocation}>
                                    <span className={styles.resourceLabel}>Resources Needed:</span>
                                    <span className={styles.resourceValue}>$1.2B, Medical supplies</span>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.alert} ${styles.alertWarning}`}>
                            <span className={styles.alertIcon}>🌊</span>
                            <div className={styles.alertContent}>
                                <div className={styles.alertTitle}>Natural Disaster: Flooding</div>
                                <div className={styles.alertText}>Monsoon floods affecting South Asia</div>
                                <div className={styles.resourceAllocation}>
                                    <span className={styles.resourceLabel}>Resources Needed:</span>
                                    <span className={styles.resourceValue}>$800M, 2K rescue teams</span>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.alert} ${styles.alertWarning}`}>
                            <span className={styles.alertIcon}>⚠️</span>
                            <div className={styles.alertContent}>
                                <div className={styles.alertTitle}>Environmental Alert</div>
                                <div className={styles.alertText}>Amazon deforestation: -12k hectares</div>
                                <div className={styles.resourceAllocation}>
                                    <span className={styles.resourceLabel}>Resources Needed:</span>
                                    <span className={styles.resourceValue}>$500M, Conservation teams</span>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.alert} ${styles.alertSuccess}`}>
                            <span className={styles.alertIcon}>✅</span>
                            <div className={styles.alertContent}>
                                <div className={styles.alertTitle}>Resource Deployment Success</div>
                                <div className={styles.alertText}>Earthquake relief: 95% resources deployed</div>
                                <div className={styles.resourceAllocation}>
                                    <span className={styles.resourceLabel}>Impact:</span>
                                    <span className={styles.resourceValue}>50K people assisted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RSSFeed feedType="planetary" title="Latest Environmental & Climate News" />
        </div>
    );
}
