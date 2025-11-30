'use client';

import styles from './MichioKushiResearch.module.css';

export default function MichioKushiResearch() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>
                    <span className={styles.gradient}>Michio Kushi Health Research</span>
                </h2>
                <p className={styles.subtitle}>Macrobiotics & Holistic Wellness Principles</p>
            </header>

            <div className={`${styles.bioCard} glass-panel`}>
                <div className={styles.bioHeader}>
                    <div className={styles.portrait}>🧘‍♂️</div>
                    <div className={styles.bioInfo}>
                        <h3 className={styles.bioName}>Michio Kushi (1926-2014)</h3>
                        <p className={styles.bioTitle}>Founder of Modern Macrobiotics</p>
                        <p className={styles.bioDescription}>
                            Japanese-American educator and advocate of macrobiotics, a holistic approach to health based on traditional Eastern philosophy and modern nutritional science.
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.principlesGrid}>
                <div className={`${styles.principleCard} glass-panel`}>
                    <div className={styles.principleIcon}>🌾</div>
                    <h3 className={styles.principleTitle}>Whole Grains Foundation</h3>
                    <p className={styles.principleText}>
                        40-60% of daily diet should consist of whole cereal grains such as brown rice, barley, millet, oats, and whole wheat.
                    </p>
                    <div className={styles.actionTag}>Recommended Action</div>
                </div>

                <div className={`${styles.principleCard} glass-panel`}>
                    <div className={styles.principleIcon}>🥬</div>
                    <h3 className={styles.principleTitle}>Fresh Vegetables</h3>
                    <p className={styles.principleText}>
                        20-30% vegetables, especially leafy greens and root vegetables. Emphasize locally grown, seasonal, and organic produce.
                    </p>
                    <div className={styles.actionTag}>Recommended Action</div>
                </div>

                <div className={`${styles.principleCard} glass-panel`}>
                    <div className={styles.principleIcon}>🫘</div>
                    <h3 className={styles.principleTitle}>Beans & Sea Vegetables</h3>
                    <p className={styles.principleText}>
                        5-10% beans, bean products, and sea vegetables for protein and essential minerals. Include miso soup daily.
                    </p>
                    <div className={styles.actionTag}>Recommended Action</div>
                </div>

                <div className={`${styles.principleCard} glass-panel`}>
                    <div className={styles.principleIcon}>⚖️</div>
                    <h3 className={styles.principleTitle}>Yin-Yang Balance</h3>
                    <p className={styles.principleText}>
                        Balance opposing forces in food and life. Avoid extreme foods (refined sugar, excessive meat, processed foods).
                    </p>
                    <div className={styles.actionTag}>Recommended Action</div>
                </div>
            </div>

            <div className={`${styles.recommendationsPanel} glass-panel`}>
                <h3 className={styles.sectionTitle}>Personalized Recommendations Based on Your Bio-Twin</h3>

                <div className={styles.recommendations}>
                    <div className={styles.recommendation}>
                        <div className={styles.recHeader}>
                            <span className={styles.recIcon}>✅</span>
                            <span className={styles.recTitle}>Dietary Adjustment</span>
                        </div>
                        <p className={styles.recText}>
                            Based on your current health metrics, increase whole grain intake to 50% of daily calories. Your digestive health score suggests better grain digestion.
                        </p>
                    </div>

                    <div className={styles.recommendation}>
                        <div className={styles.recHeader}>
                            <span className={styles.recIcon}>🥗</span>
                            <span className={styles.recTitle}>Vegetable Variety</span>
                        </div>
                        <p className={styles.recText}>
                            Incorporate more leafy greens (kale, collards) and root vegetables (daikon, burdock). These will support your cardiovascular health goals.
                        </p>
                    </div>

                    <div className={styles.recommendation}>
                        <div className={styles.recHeader}>
                            <span className={styles.recIcon}>🍵</span>
                            <span className={styles.recTitle}>Daily Miso Soup</span>
                        </div>
                        <p className={styles.recText}>
                            Start each day with miso soup containing wakame seaweed. This will improve gut health and provide essential minerals.
                        </p>
                    </div>

                    <div className={styles.recommendation}>
                        <div className={styles.recHeader}>
                            <span className={styles.recIcon}>🚫</span>
                            <span className={styles.recTitle}>Foods to Reduce</span>
                        </div>
                        <p className={styles.recText}>
                            Minimize refined sugars, dairy products, and excessive animal protein. Your inflammation markers suggest these are contributing factors.
                        </p>
                    </div>
                </div>
            </div>

            <div className={`${styles.researchPanel} glass-panel`}>
                <h3 className={styles.sectionTitle}>Key Research Findings</h3>

                <div className={styles.findings}>
                    <div className={styles.finding}>
                        <div className={styles.findingNumber}>01</div>
                        <div className={styles.findingContent}>
                            <h4 className={styles.findingTitle}>Cancer Prevention</h4>
                            <p className={styles.findingText}>
                                Studies suggest macrobiotic diet may reduce cancer risk through high fiber, low fat intake, and abundant phytochemicals from whole plant foods.
                            </p>
                        </div>
                    </div>

                    <div className={styles.finding}>
                        <div className={styles.findingNumber}>02</div>
                        <div className={styles.findingContent}>
                            <h4 className={styles.findingTitle}>Cardiovascular Health</h4>
                            <p className={styles.findingText}>
                                Research indicates improved cholesterol levels, blood pressure, and reduced heart disease risk among macrobiotic practitioners.
                            </p>
                        </div>
                    </div>

                    <div className={styles.finding}>
                        <div className={styles.findingNumber}>03</div>
                        <div className={styles.findingContent}>
                            <h4 className={styles.findingTitle}>Longevity & Vitality</h4>
                            <p className={styles.findingText}>
                                Populations following macrobiotic principles show increased lifespan, better energy levels, and reduced chronic disease incidence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.actionPlan} glass-panel`}>
                <h3 className={styles.sectionTitle}>Your 30-Day Action Plan</h3>

                <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                        <div className={styles.timelineWeek}>Week 1-2</div>
                        <div className={styles.timelineContent}>
                            <h4>Transition Phase</h4>
                            <ul>
                                <li>Replace white rice with brown rice</li>
                                <li>Add one serving of leafy greens daily</li>
                                <li>Introduce miso soup 3x per week</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.timelineItem}>
                        <div className={styles.timelineWeek}>Week 3-4</div>
                        <div className={styles.timelineContent}>
                            <h4>Integration Phase</h4>
                            <ul>
                                <li>Achieve 50% whole grains in diet</li>
                                <li>Daily miso soup practice</li>
                                <li>Reduce processed foods by 75%</li>
                                <li>Add sea vegetables to meals</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <button className={styles.startButton}>
                    🌱 Start Your Macrobiotic Journey
                </button>
            </div>
        </div>
    );
}
