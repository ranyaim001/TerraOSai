'use client';

import { useState } from 'react';
import styles from './TheSimulation.module.css';

interface ProposalProps {
    id: number;
    title: string;
    description: string;
    votes: { for: number; against: number };
    status: 'active' | 'passed' | 'failed';
}

function ProposalCard({ id, title, description, votes, status }: ProposalProps) {
    const totalVotes = votes.for + votes.against;
    const forPercentage = totalVotes > 0 ? (votes.for / totalVotes) * 100 : 0;

    return (
        <div className={`${styles.proposalCard} glass-panel`}>
            <div className={styles.proposalHeader}>
                <h4 className={styles.proposalTitle}>{title}</h4>
                <span className={`${styles.proposalStatus} ${styles[status]}`}>
                    {status.toUpperCase()}
                </span>
            </div>
            <p className={styles.proposalDescription}>{description}</p>

            <div className={styles.voteBar}>
                <div className={styles.voteBarFill} style={{ width: `${forPercentage}%` }}></div>
            </div>

            <div className={styles.voteStats}>
                <div className={styles.voteStat}>
                    <span className={styles.voteLabel}>For</span>
                    <span className={styles.voteValue}>{votes.for.toLocaleString()}</span>
                </div>
                <div className={styles.voteStat}>
                    <span className={styles.voteLabel}>Against</span>
                    <span className={styles.voteValue}>{votes.against.toLocaleString()}</span>
                </div>
            </div>

            {status === 'active' && (
                <div className={styles.voteButtons}>
                    <button className={`${styles.voteButton} ${styles.voteFor}`}>Vote For</button>
                    <button className={`${styles.voteButton} ${styles.voteAgainst}`}>Vote Against</button>
                </div>
            )}
        </div>
    );
}

export default function TheSimulation() {
    const proposals: ProposalProps[] = [
        {
            id: 1,
            title: 'Global Carbon Tax Initiative',
            description: 'Implement a unified carbon pricing mechanism across all participating nations to accelerate climate action.',
            votes: { for: 4250000, against: 1890000 },
            status: 'active',
        },
        {
            id: 2,
            title: 'Universal Healthcare Framework',
            description: 'Establish baseline healthcare standards and resource sharing protocols for all global citizens.',
            votes: { for: 5120000, against: 980000 },
            status: 'active',
        },
        {
            id: 3,
            title: 'Ocean Cleanup Protocol',
            description: 'Coordinate international efforts to remove plastic waste from oceans and prevent future pollution.',
            votes: { for: 6780000, against: 450000 },
            status: 'passed',
        },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <span className={styles.gradient}>The Simulation</span>
                </h1>
                <p className={styles.subtitle}>Gamified Governance & Collaborative Decision-Making</p>
            </header>

            <div className={styles.statsBar}>
                <div className={`${styles.statItem} glass-panel`}>
                    <div className={styles.statIcon}>🎮</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>1,247</div>
                        <div className={styles.statLabel}>Active Simulations</div>
                    </div>
                </div>
                <div className={`${styles.statItem} glass-panel`}>
                    <div className={styles.statIcon}>👥</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>12.4M</div>
                        <div className={styles.statLabel}>Participants</div>
                    </div>
                </div>
                <div className={`${styles.statItem} glass-panel`}>
                    <div className={styles.statIcon}>✅</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>892</div>
                        <div className={styles.statLabel}>Resolutions Passed</div>
                    </div>
                </div>
                <div className={`${styles.statItem} glass-panel`}>
                    <div className={styles.statIcon}>🌍</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>195</div>
                        <div className={styles.statLabel}>Nations Involved</div>
                    </div>
                </div>
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.proposalsSection}>
                    <h3 className={styles.sectionTitle}>Active Proposals</h3>
                    <div className={styles.proposalsList}>
                        {proposals.map((proposal) => (
                            <ProposalCard key={proposal.id} {...proposal} />
                        ))}
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={`${styles.leaderboard} glass-panel`}>
                        <h3 className={styles.sectionTitle}>Top Contributors</h3>
                        <div className={styles.leaderboardList}>
                            {[
                                { rank: 1, name: 'GlobalCitizen_2847', points: 15420, badge: '🥇' },
                                { rank: 2, name: 'PeaceMaker_9182', points: 14890, badge: '🥈' },
                                { rank: 3, name: 'EcoWarrior_5431', points: 13750, badge: '🥉' },
                                { rank: 4, name: 'Diplomat_7621', points: 12340, badge: '⭐' },
                                { rank: 5, name: 'Visionary_3298', points: 11890, badge: '⭐' },
                            ].map((user) => (
                                <div key={user.rank} className={styles.leaderboardItem}>
                                    <span className={styles.leaderboardBadge}>{user.badge}</span>
                                    <div className={styles.leaderboardInfo}>
                                        <div className={styles.leaderboardName}>{user.name}</div>
                                        <div className={styles.leaderboardPoints}>{user.points.toLocaleString()} pts</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${styles.yourImpact} glass-panel`}>
                        <h3 className={styles.sectionTitle}>Your Impact</h3>
                        <div className={styles.impactStats}>
                            <div className={styles.impactItem}>
                                <span className={styles.impactLabel}>Votes Cast</span>
                                <span className={styles.impactValue}>127</span>
                            </div>
                            <div className={styles.impactItem}>
                                <span className={styles.impactLabel}>Proposals Created</span>
                                <span className={styles.impactValue}>8</span>
                            </div>
                            <div className={styles.impactItem}>
                                <span className={styles.impactLabel}>Influence Score</span>
                                <span className={styles.impactValue}>4,892</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
