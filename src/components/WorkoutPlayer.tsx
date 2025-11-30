'use client';

import { useState } from 'react';
import styles from './WorkoutPlayer.module.css';

interface WorkoutPlayerProps {
    videoId: string;
    title: string;
    channel: string;
    duration: string;
    difficulty: string;
    caloriesBurn: number;
    description: string;
}

export default function WorkoutPlayer({
    videoId,
    title,
    channel,
    duration,
    difficulty,
    caloriesBurn,
    description,
}: WorkoutPlayerProps) {
    const [isCompleted, setIsCompleted] = useState(false);

    const handleComplete = () => {
        setIsCompleted(true);
        setTimeout(() => setIsCompleted(false), 3000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.videoWrapper}>
                <iframe
                    className={styles.video}
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                {isCompleted && (
                    <div className={styles.completionOverlay}>
                        <div className={styles.completionMessage}>
                            <span className={styles.completionIcon}>🎉</span>
                            <span className={styles.completionText}>Workout Complete!</span>
                            <span className={styles.completionCalories}>+{caloriesBurn} calories burned</span>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.meta}>
                    <span className={styles.channel}>📺 {channel}</span>
                    <span className={styles.duration}>⏱️ {duration}</span>
                    <span className={`${styles.difficulty} ${styles[difficulty.toLowerCase()]}`}>
                        {difficulty}
                    </span>
                </div>
                <p className={styles.description}>{description}</p>
                <button className={styles.completeButton} onClick={handleComplete}>
                    ✓ Mark as Complete
                </button>
            </div>
        </div>
    );
}
