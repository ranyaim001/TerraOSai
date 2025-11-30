'use client';

import { useState, useEffect } from 'react';
import styles from './BioTwin.module.css';
import RSSFeed from './RSSFeed';
import WorkoutPlayer from './WorkoutPlayer';

interface Workout {
    id: number;
    title: string;
    channel: string;
    videoId: string;
    duration: string;
    category: string;
    difficulty: string;
    description: string;
    caloriesBurn: number;
}

interface WorkoutData {
    categories: string[];
    dailyPick: Workout;
    featured: Workout[];
    userStats: {
        streak: number;
        totalWorkouts: number;
        totalCaloriesBurned: number;
        favoriteCategory: string;
        averagePerWeek: number;
    };
}

export default function BioTwin() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
    const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('/api/workouts');
                const data = await response.json();
                setWorkoutData(data);
                setCurrentWorkout(data.dailyPick);
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            }
        };

        fetchWorkouts();
    }, []);

    const filteredWorkouts = workoutData?.featured.filter(
        (workout) => selectedCategory === 'All' || workout.category === selectedCategory
    ) || [];

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

            {/* 5-Minute Workout Section */}
            <div className={`${styles.workoutSection} glass-panel`}>
                <div className={styles.workoutHeader}>
                    <h2 className={styles.sectionTitle}>🏋️ 5-Minute Daily Workout</h2>
                    {workoutData && (
                        <div className={styles.workoutStats}>
                            <div className={styles.stat}>
                                <span className={styles.statIcon}>🔥</span>
                                <div>
                                    <div className={styles.statValue}>{workoutData.userStats.streak}</div>
                                    <div className={styles.statLabel}>Day Streak</div>
                                </div>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statIcon}>💪</span>
                                <div>
                                    <div className={styles.statValue}>{workoutData.userStats.totalWorkouts}</div>
                                    <div className={styles.statLabel}>Total Workouts</div>
                                </div>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statIcon}>⚡</span>
                                <div>
                                    <div className={styles.statValue}>{workoutData.userStats.totalCaloriesBurned}</div>
                                    <div className={styles.statLabel}>Calories Burned</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.categorySelector}>
                    <button
                        className={`${styles.categoryButton} ${selectedCategory === 'All' ? styles.active : ''}`}
                        onClick={() => setSelectedCategory('All')}
                    >
                        All
                    </button>
                    {workoutData?.categories.map((category) => (
                        <button
                            key={category}
                            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {currentWorkout && (
                    <div className={styles.dailyWorkout}>
                        <div className={styles.dailyWorkoutBadge}>⭐ Today&apos;s Pick</div>
                        <WorkoutPlayer
                            videoId={currentWorkout.videoId}
                            title={currentWorkout.title}
                            channel={currentWorkout.channel}
                            duration={currentWorkout.duration}
                            difficulty={currentWorkout.difficulty}
                            caloriesBurn={currentWorkout.caloriesBurn}
                            description={currentWorkout.description}
                        />
                    </div>
                )}

                {filteredWorkouts.length > 0 && (
                    <div className={styles.moreWorkouts}>
                        <h3 className={styles.subsectionTitle}>More Workouts</h3>
                        <div className={styles.workoutGrid}>
                            {filteredWorkouts.slice(0, 3).map((workout) => (
                                <div
                                    key={workout.id}
                                    className={styles.workoutCard}
                                    onClick={() => setCurrentWorkout(workout)}
                                >
                                    <div className={styles.workoutCardThumb}>
                                        <img
                                            src={`https://img.youtube.com/vi/${workout.videoId}/mqdefault.jpg`}
                                            alt={workout.title}
                                            className={styles.workoutCardImage}
                                        />
                                        <div className={styles.workoutCardDuration}>{workout.duration}</div>
                                    </div>
                                    <div className={styles.workoutCardInfo}>
                                        <h4 className={styles.workoutCardTitle}>{workout.title}</h4>
                                        <p className={styles.workoutCardChannel}>{workout.channel}</p>
                                        <div className={styles.workoutCardMeta}>
                                            <span className={`${styles.workoutCardDifficulty} ${styles[workout.difficulty.toLowerCase()]}`}>
                                                {workout.difficulty}
                                            </span>
                                            <span className={styles.workoutCardCalories}>🔥 {workout.caloriesBurn} cal</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
                                    You&apos;re 20% below your daily water intake goal. Consider drinking 2 more glasses today.
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
                                    You&apos;ve been sedentary for 3 hours. A 5-minute walk would boost your energy levels.
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

            <RSSFeed feedType="health" title="Health & Wellness News" />
            <RSSFeed feedType="fitness" title="Fitness & Workout Tips" />
        </div >
    );
}
