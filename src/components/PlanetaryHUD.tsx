'use client';

import { useState } from 'react';
import styles from './PlanetaryHUD.module.css';

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
                    <h3 className={styles.sectionTitle}>Active Alerts</h3>
                    <div className={styles.alertsList}>
                        <div className={styles.alert}>
                            <span className={styles.alertIcon}>⚠️</span>
                            <div className={styles.alertContent}>
                                <div className={styles.alertTitle}>Deforestation Alert</div>
                                <div className={styles.alertText}>Amazon rainforest: -12k hectares</div>
                            </div>
                        </div>
                        <div className={styles.alert}>
                            <span className={styles.alertIcon}>🌊</span>
                            <div className={styles.alertContent}>
                                <div className={styles.alertTitle}>Ocean Temperature</div>
                                <div className={styles.alertText}>Pacific: +0.8°C above average</div>
                            </div>
                        </div>
                        <div className={styles.alert}>
                            <span className={styles.alertIcon}>✅</span>
                            <div className={styles.alertContent}>
                                <div className={styles.alertTitle}>Renewable Milestone</div>
                                <div className={styles.alertText}>Solar capacity: +50GW this month</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
