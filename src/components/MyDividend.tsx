'use client';

import { useState } from 'react';
import AITradingDashboard from './AITradingDashboard';
import styles from './MyDividend.module.css';

export default function MyDividend() {
    const [activeTab, setActiveTab] = useState('dividend');

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.gradient}>My Dividend</span>
                </h1>
                <p className={styles.subtitle}>Universal Basic Income & Economic Participation</p>
            </header>

            <div className={styles.tabNav}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'dividend' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('dividend')}
                >
                    💰 Dividend Overview
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'trading' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('trading')}
                >
                    🤖 AI Trading Agent
                </button>
            </div>

            {activeTab === 'trading' ? (
                <AITradingDashboard />
            ) : (
                <>
                    <div className={styles.balanceCard + ' glass-panel'}>
                        <div className={styles.balanceHeader}>
                            <span className={styles.balanceLabel}>Your Current Balance</span>
                            <span className={styles.balanceIcon}>💰</span>
                        </div>
                        <div className={styles.balanceAmount}>$2,847.50</div>
                        <div className={styles.balanceChange}>
                            <span style={{ color: 'var(--success)' }}>↑ +$125.00</span>
                            <span className={styles.balancePeriod}>this month</span>
                        </div>
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={`${styles.statCard} glass-panel`}>
                            <div className={styles.statIcon}>📊</div>
                            <div className={styles.statLabel}>Monthly Dividend</div>
                            <div className={styles.statValue}>$250.00</div>
                        </div>
                        <div className={`${styles.statCard} glass-panel`}>
                            <div className={styles.statIcon}>🌍</div>
                            <div className={styles.statLabel}>Global Pool</div>
                            <div className={styles.statValue}>$2.1T</div>
                        </div>
                        <div className={`${styles.statCard} glass-panel`}>
                            <div className={styles.statIcon}>👥</div>
                            <div className={styles.statLabel}>Recipients</div>
                            <div className={styles.statValue}>8.1B</div>
                        </div>
                        <div className={`${styles.statCard} glass-panel`}>
                            <div className={styles.statIcon}>📈</div>
                            <div className={styles.statLabel}>Growth Rate</div>
                            <div className={styles.statValue}>+12.4%</div>
                        </div>
                    </div>

                    <div className={styles.contentGrid}>
                        <div className={`${styles.transactions} glass-panel`}>
                            <h3 className={styles.sectionTitle}>Recent Transactions</h3>
                            <div className={styles.transactionsList}>
                                {[
                                    { date: 'Nov 1, 2025', amount: '+$250.00', type: 'Monthly Dividend', status: 'completed' },
                                    { date: 'Oct 15, 2025', amount: '+$50.00', type: 'Participation Bonus', status: 'completed' },
                                    { date: 'Oct 1, 2025', amount: '+$250.00', type: 'Monthly Dividend', status: 'completed' },
                                    { date: 'Sep 20, 2025', amount: '+$75.00', type: 'Community Reward', status: 'completed' },
                                    { date: 'Sep 1, 2025', amount: '+$250.00', type: 'Monthly Dividend', status: 'completed' },
                                ].map((transaction, index) => (
                                    <div key={index} className={styles.transaction}>
                                        <div className={styles.transactionLeft}>
                                            <div className={styles.transactionType}>{transaction.type}</div>
                                            <div className={styles.transactionDate}>{transaction.date}</div>
                                        </div>
                                        <div className={styles.transactionAmount}>{transaction.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`${styles.participation} glass-panel`}>
                            <h3 className={styles.sectionTitle}>Participation Score</h3>
                            <div className={styles.scoreCircle}>
                                <div className={styles.scoreValue}>87</div>
                                <div className={styles.scoreLabel}>/ 100</div>
                            </div>
                            <div className={styles.scoreBreakdown}>
                                <div className={styles.scoreItem}>
                                    <span className={styles.scoreItemLabel}>Governance Votes</span>
                                    <div className={styles.scoreBar}>
                                        <div className={styles.scoreBarFill} style={{ width: '92%' }}></div>
                                    </div>
                                    <span className={styles.scoreItemValue}>92%</span>
                                </div>
                                <div className={styles.scoreItem}>
                                    <span className={styles.scoreItemLabel}>Community Actions</span>
                                    <div className={styles.scoreBar}>
                                        <div className={styles.scoreBarFill} style={{ width: '85%' }}></div>
                                    </div>
                                    <span className={styles.scoreItemValue}>85%</span>
                                </div>
                                <div className={styles.scoreItem}>
                                    <span className={styles.scoreItemLabel}>Environmental Impact</span>
                                    <div className={styles.scoreBar}>
                                        <div className={styles.scoreBarFill} style={{ width: '78%' }}></div>
                                    </div>
                                    <span className={styles.scoreItemValue}>78%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
