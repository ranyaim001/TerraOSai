'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import PlanetaryHUD from '@/components/PlanetaryHUD';
import MyDividend from '@/components/MyDividend';
import TheSimulation from '@/components/TheSimulation';
import BioTwin from '@/components/BioTwin';
import AIChat from '@/components/AIChat';
import KnowledgeHub from '@/components/KnowledgeHub';
import NotesAI from '@/components/NotesAI';
import CountriesView from '@/components/CountriesView';
import LearningPortal from '@/components/LearningPortal';
import ImaginationZone from '@/components/ImaginationZone';
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
      case 'notes-ai':
        return <NotesAI />;
      case 'knowledge-hub':
        return <KnowledgeHub />;
      case 'learning-portal':
        return <LearningPortal />;
      case 'imagination-zone':
        return <ImaginationZone />;
      case 'countries':
        return <CountriesView onClose={() => setActiveTab('home')} />;
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

              <div className={`${styles.card} glass-panel`} onClick={() => setActiveTab('notes-ai')}>
                <div className={styles.cardIcon}>📝</div>
                <h3 className={styles.cardTitle}>Notes AI</h3>
                <p className={styles.cardDescription}>
                  Digitize your handwritten notes instantly with AI-powered transcription.
                </p>
              </div>

              <div className={`${styles.card} glass-panel`} onClick={() => setActiveTab('knowledge-hub')}>
                <div className={styles.cardIcon}>📚</div>
                <h3 className={styles.cardTitle}>Knowledge Hub</h3>
                <p className={styles.cardDescription}>
                  Curated resources for health, finance, and holistic wellness wisdom.
                </p>
              </div>

              <div className={`${styles.card} ${styles.featured} glass-panel`} onClick={() => setActiveTab('learning-portal')}>
                <div className={styles.cardIcon}>🎓</div>
                <h3 className={styles.cardTitle}>Learning Portal</h3>
                <p className={styles.cardDescription}>
                  Your personal gateway to cutting-edge research, books, and knowledge across all domains.
                </p>
              </div>

              <div className={`${styles.card} ${styles.featured} glass-panel`} onClick={() => setActiveTab('imagination-zone')}>
                <div className={styles.cardIcon}>🎨</div>
                <h3 className={styles.cardTitle}>Imagination & Break Time</h3>
                <p className={styles.cardDescription}>
                  Relax, play games, solve riddles, and let your creativity flow with fun activities.
                </p>
              </div>
            </div>

            <div className={styles.stats}>
              <div className={`${styles.stat} glass-panel`}>
                <div className={styles.statValue}>8.1B</div>
                <div className={styles.statLabel}>Global Citizens</div>
              </div>
              <div className={`${styles.stat} glass-panel`} onClick={() => setActiveTab('countries')} style={{ cursor: 'pointer' }}>
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
