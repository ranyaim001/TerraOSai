'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import PlanetaryHUD from '@/components/PlanetaryHUD';
import MyDividend from '@/components/MyDividend';
import TheSimulation from '@/components/TheSimulation';
import BioTwin from '@/components/BioTwin';
import AIChat from '@/components/AIChat';
import styles from './page.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'planetary-hud':
        return <PlanetaryHUD />;
      case 'my-dividend':
        return <MyDividend />;
      case 'the-simulation':
        return <TheSimulation />;
      case 'bio-twin':
        return <BioTwin />;
      default:
        return (
          <>
            <div className={styles.hero}>
              <h1 className={styles.title}>
                Welcome to <span className={styles.gradient}>TerraOS</span>
              </h1>
              <p className={styles.subtitle}>
                Visualizing unseen connections. Gamifying global cooperation.
              </p>
            </div>

            <AIChat />

            <div className={styles.grid}>
              <div className={`${styles.card} glass-panel`} onClick={() => setActiveTab('planetary-hud')}>
                <div className={styles.cardIcon}>🌍</div>
                <h3 className={styles.cardTitle}>Planetary HUD</h3>
                <p className={styles.cardDescription}>
                  Real-time global health monitoring and visualization of planetary metrics.
                </p>
              </div>

              <div className={`${styles.card} glass-panel`} onClick={() => setActiveTab('my-dividend')}>
                <div className={styles.cardIcon}>💰</div>
                <h3 className={styles.cardTitle}>My Dividend</h3>
                <p className={styles.cardDescription}>
                  Track your economic participation and universal basic income distribution.
                </p>
              </div>

              <div className={`${styles.card} glass-panel`} onClick={() => setActiveTab('the-simulation')}>
                <div className={styles.cardIcon}>🎮</div>
                <h3 className={styles.cardTitle}>The Simulation</h3>
                <p className={styles.cardDescription}>
                  Gamified governance platform for collaborative decision-making and peace solutions.
                </p>
              </div>

              <div className={`${styles.card} glass-panel`} onClick={() => setActiveTab('bio-twin')}>
                <div className={styles.cardIcon}>🧬</div>
                <h3 className={styles.cardTitle}>Bio-Twin</h3>
                <p className={styles.cardDescription}>
                  Your digital health twin for personalized wellness tracking and insights.
                </p>
              </div>
            </div>

            <div className={styles.stats}>
              <div className={`${styles.stat} glass-panel`}>
                <div className={styles.statValue}>8.1B</div>
                <div className={styles.statLabel}>Global Citizens</div>
              </div>
              <div className={`${styles.stat} glass-panel`}>
                <div className={styles.statValue}>195</div>
                <div className={styles.statLabel}>Countries Connected</div>
              </div>
              <div className={`${styles.stat} glass-panel`}>
                <div className={styles.statValue}>99.8%</div>
                <div className={styles.statLabel}>System Uptime</div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className={styles.main}>
        {renderContent()}
      </main>
    </>
  );
}
