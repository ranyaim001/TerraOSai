'use client';

import { useState } from 'react';
import styles from './AITradingDashboard.module.css';

export default function AITradingDashboard() {
    const [investmentAmount, setInvestmentAmount] = useState('1000');
    const [riskLevel, setRiskLevel] = useState('conservative');

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>
                    <span className={styles.gradient}>AI Trading Agent</span>
                </h2>
                <p className={styles.subtitle}>Automated stock market trading with the safest strategies</p>
            </header>

            <div className={styles.performanceCard + ' glass-panel'}>
                <div className={styles.performanceHeader}>
                    <div>
                        <div className={styles.performanceLabel}>Total Portfolio Value</div>
                        <div className={styles.performanceValue}>$12,847.32</div>
                    </div>
                    <div className={styles.performanceChange}>
                        <span style={{ color: 'var(--success)' }}>↑ +$1,247.32</span>
                        <span className={styles.performancePeriod}>+10.75% this month</span>
                    </div>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={`${styles.card} glass-panel`}>
                    <h3 className={styles.cardTitle}>🎯 Investment Strategy</h3>
                    <div className={styles.strategyInfo}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Current Strategy:</span>
                            <span className={styles.infoValue}>Conservative Growth</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Risk Level:</span>
                            <span className={styles.infoValue} style={{ color: 'var(--success)' }}>Low</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>AI Model:</span>
                            <span className={styles.infoValue}>GPT-4 + Claude 3.5</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Diversification:</span>
                            <span className={styles.infoValue}>12 sectors</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.card} glass-panel`}>
                    <h3 className={styles.cardTitle}>📊 Performance Metrics</h3>
                    <div className={styles.metricsGrid}>
                        <div className={styles.metric}>
                            <div className={styles.metricValue}>+18.4%</div>
                            <div className={styles.metricLabel}>YTD Return</div>
                        </div>
                        <div className={styles.metric}>
                            <div className={styles.metricValue}>0.42</div>
                            <div className={styles.metricLabel}>Sharpe Ratio</div>
                        </div>
                        <div className={styles.metric}>
                            <div className={styles.metricValue}>-8.2%</div>
                            <div className={styles.metricLabel}>Max Drawdown</div>
                        </div>
                        <div className={styles.metric}>
                            <div className={styles.metricValue}>94.2%</div>
                            <div className={styles.metricLabel}>Win Rate</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.holdings} glass-panel`}>
                <h3 className={styles.sectionTitle}>Current Holdings</h3>
                <div className={styles.holdingsList}>
                    {[
                        { symbol: 'AAPL', name: 'Apple Inc.', allocation: '15%', value: '$1,927', change: '+2.4%', trend: 'up' },
                        { symbol: 'MSFT', name: 'Microsoft', allocation: '12%', value: '$1,542', change: '+1.8%', trend: 'up' },
                        { symbol: 'NVDA', name: 'NVIDIA', allocation: '10%', value: '$1,285', change: '+5.2%', trend: 'up' },
                        { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', allocation: '25%', value: '$3,212', change: '+1.2%', trend: 'up' },
                        { symbol: 'BND', name: 'Vanguard Bond ETF', allocation: '20%', value: '$2,569', change: '+0.3%', trend: 'up' },
                        { symbol: 'CASH', name: 'Cash Reserve', allocation: '18%', value: '$2,312', change: '0.0%', trend: 'neutral' },
                    ].map((holding, index) => (
                        <div key={index} className={styles.holding}>
                            <div className={styles.holdingInfo}>
                                <div className={styles.holdingSymbol}>{holding.symbol}</div>
                                <div className={styles.holdingName}>{holding.name}</div>
                            </div>
                            <div className={styles.holdingStats}>
                                <div className={styles.holdingAllocation}>{holding.allocation}</div>
                                <div className={styles.holdingValue}>{holding.value}</div>
                                <div
                                    className={styles.holdingChange}
                                    style={{
                                        color: holding.trend === 'up' ? 'var(--success)' :
                                            holding.trend === 'down' ? 'var(--error)' :
                                                'var(--warning)'
                                    }}
                                >
                                    {holding.trend === 'up' ? '↑' : holding.trend === 'down' ? '↓' : '→'} {holding.change}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`${styles.configPanel} glass-panel`}>
                <h3 className={styles.sectionTitle}>Configure Your AI Agent</h3>
                <div className={styles.configForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Investment Amount</label>
                        <input
                            type="number"
                            className={styles.formInput}
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Risk Tolerance</label>
                        <select
                            className={styles.formSelect}
                            value={riskLevel}
                            onChange={(e) => setRiskLevel(e.target.value)}
                        >
                            <option value="conservative">Conservative (Safest)</option>
                            <option value="moderate">Moderate</option>
                            <option value="aggressive">Aggressive</option>
                        </select>
                    </div>

                    <button className={styles.activateButton}>
                        🤖 Activate AI Trading Agent
                    </button>
                </div>

                <div className={styles.safetyFeatures}>
                    <h4 className={styles.featuresTitle}>Safety Features</h4>
                    <ul className={styles.featuresList}>
                        <li>✓ Stop-loss protection at 5% max loss</li>
                        <li>✓ Diversification across 12+ sectors</li>
                        <li>✓ Real-time risk monitoring</li>
                        <li>✓ Automated rebalancing</li>
                        <li>✓ Tax-loss harvesting</li>
                        <li>✓ Emergency pause button</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
