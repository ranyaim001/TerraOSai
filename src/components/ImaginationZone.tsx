'use client';

import { useState, useEffect } from 'react';
import styles from './ImaginationZone.module.css';

interface Game {
    id: string;
    name: string;
    icon: string;
    description: string;
    color: string;
}

export default function ImaginationZone() {
    const [activeGame, setActiveGame] = useState<string | null>(null);

    const games: Game[] = [
        {
            id: 'zen-garden',
            name: 'Zen Garden',
            icon: '🌸',
            description: 'Create beautiful patterns and relax',
            color: '#00ff9d',
        },
        {
            id: 'mind-maze',
            name: 'Mind Maze',
            icon: '🧩',
            description: 'Exercise your brain with puzzles',
            color: '#00f0ff',
        },
        {
            id: 'riddle-master',
            name: 'Riddle Master',
            icon: '🎭',
            description: 'Solve clever riddles and brain teasers',
            color: '#7000ff',
        },
        {
            id: 'mystery-box',
            name: 'Mystery Box',
            icon: '🎁',
            description: 'AI-generated surprises and fun',
            color: '#ff0055',
        },
    ];

    const renderGame = () => {
        switch (activeGame) {
            case 'zen-garden':
                return <ZenGarden />;
            case 'mind-maze':
                return <MindMaze />;
            case 'riddle-master':
                return <RiddleMaster />;
            case 'mystery-box':
                return <MysteryBox />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.zone}>
            {!activeGame ? (
                <>
                    <div className={styles.header}>
                        <h1 className={styles.title}>
                            <span className={styles.gradient}>Imagination & Break Time</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Take a break, relax your mind, and have some fun! 🎨
                        </p>
                    </div>

                    <div className={styles.gamesGrid}>
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className={`${styles.gameCard} glass-panel`}
                                onClick={() => setActiveGame(game.id)}
                                style={{ '--game-color': game.color } as React.CSSProperties}
                            >
                                <div className={styles.gameIcon}>{game.icon}</div>
                                <h3 className={styles.gameName}>{game.name}</h3>
                                <p className={styles.gameDescription}>{game.description}</p>
                                <button className={styles.playButton}>Play Now</button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.quote}>
                        <p className={styles.quoteText}>
                            "Creativity is intelligence having fun." - Albert Einstein
                        </p>
                    </div>
                </>
            ) : (
                <div className={styles.gameContainer}>
                    <button className={styles.backButton} onClick={() => setActiveGame(null)}>
                        ← Back to Games
                    </button>
                    {renderGame()}
                </div>
            )}
        </div>
    );
}

// Zen Garden - Relaxing drawing game
function ZenGarden() {
    const [pattern, setPattern] = useState<string>('ripples');
    const [color, setColor] = useState<string>('#00f0ff');
    const [brushSize, setBrushSize] = useState<number>(20);

    useEffect(() => {
        const canvas = document.getElementById('zen-canvas') as HTMLCanvasElement;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let isDrawing = false;

        const draw = (e: MouseEvent) => {
            if (!isDrawing) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ctx.globalAlpha = 0.3;
            ctx.fillStyle = color;

            if (pattern === 'ripples') {
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.arc(x, y, brushSize + i * 10, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (pattern === 'stars') {
                drawStar(ctx, x, y, 5, brushSize, brushSize / 2);
            } else if (pattern === 'flowers') {
                drawFlower(ctx, x, y, brushSize);
            }
        };

        const startDrawing = () => (isDrawing = true);
        const stopDrawing = () => (isDrawing = false);

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseleave', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseleave', stopDrawing);
        };
    }, [pattern, color, brushSize]);

    const clearCanvas = () => {
        const canvas = document.getElementById('zen-canvas') as HTMLCanvasElement;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    return (
        <div className={styles.zenGarden}>
            <h2 className={styles.gameTitle}>🌸 Zen Garden</h2>
            <p className={styles.gameInstructions}>
                Click and drag to create beautiful patterns. Let your mind relax and flow.
            </p>

            <div className={styles.zenControls}>
                <div className={styles.controlGroup}>
                    <label>Pattern:</label>
                    <select value={pattern} onChange={(e) => setPattern(e.target.value)}>
                        <option value="ripples">Ripples</option>
                        <option value="stars">Stars</option>
                        <option value="flowers">Flowers</option>
                    </select>
                </div>

                <div className={styles.controlGroup}>
                    <label>Color:</label>
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>

                <div className={styles.controlGroup}>
                    <label>Size: {brushSize}</label>
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                    />
                </div>

                <button onClick={clearCanvas} className={styles.clearButton}>
                    Clear Canvas
                </button>
            </div>

            <canvas id="zen-canvas" className={styles.zenCanvas}></canvas>
        </div>
    );
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
}

function drawFlower(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = cx + Math.cos(angle) * size / 2;
        const y = cy + Math.sin(angle) * size / 2;
        ctx.beginPath();
        ctx.arc(x, y, size / 3, 0, Math.PI * 2);
        ctx.fill();
    }
    // Center
    ctx.beginPath();
    ctx.arc(cx, cy, size / 4, 0, Math.PI * 2);
    ctx.fill();
}

// Mind Maze - Pattern matching puzzle
function MindMaze() {
    const [level, setLevel] = useState(1);
    const [pattern, setPattern] = useState<number[]>([]);
    const [userPattern, setUserPattern] = useState<number[]>([]);
    const [isShowing, setIsShowing] = useState(false);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('Click Start to begin!');

    const startGame = () => {
        const newPattern = Array.from({ length: level + 3 }, () => Math.floor(Math.random() * 9));
        setPattern(newPattern);
        setUserPattern([]);
        setIsShowing(true);
        setMessage('Watch the pattern...');

        setTimeout(() => {
            setIsShowing(false);
            setMessage('Now repeat the pattern!');
        }, (level + 3) * 800);
    };

    const handleTileClick = (index: number) => {
        if (isShowing) return;

        const newUserPattern = [...userPattern, index];
        setUserPattern(newUserPattern);

        if (newUserPattern[newUserPattern.length - 1] !== pattern[newUserPattern.length - 1]) {
            setMessage('❌ Wrong! Try again.');
            setTimeout(startGame, 1500);
            return;
        }

        if (newUserPattern.length === pattern.length) {
            setScore(score + level * 10);
            setLevel(level + 1);
            setMessage(`✅ Perfect! Level ${level} complete!`);
            setTimeout(startGame, 1500);
        }
    };

    return (
        <div className={styles.mindMaze}>
            <h2 className={styles.gameTitle}>🧩 Mind Maze</h2>
            <p className={styles.gameInstructions}>
                Watch the pattern, then repeat it. Each level adds more tiles!
            </p>

            <div className={styles.mazeStats}>
                <div className={styles.stat}>Level: {level}</div>
                <div className={styles.stat}>Score: {score}</div>
            </div>

            <div className={styles.mazeMessage}>{message}</div>

            <div className={styles.mazeGrid}>
                {Array.from({ length: 9 }, (_, i) => (
                    <div
                        key={i}
                        className={`${styles.mazeTile} ${isShowing && pattern.includes(i) && pattern.indexOf(i) < userPattern.length + 1
                                ? styles.active
                                : ''
                            }`}
                        onClick={() => handleTileClick(i)}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>

            <button onClick={startGame} className={styles.startButton}>
                {level === 1 && score === 0 ? 'Start Game' : 'Restart'}
            </button>
        </div>
    );
}

// Riddle Master
function RiddleMaster() {
    const riddles = [
        {
            question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
            answer: "echo",
            hint: "Think about sound bouncing back..."
        },
        {
            question: "The more you take, the more you leave behind. What am I?",
            answer: "footsteps",
            hint: "Think about walking..."
        },
        {
            question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
            answer: "map",
            hint: "It's a representation of the world..."
        },
        {
            question: "What has keys but no locks, space but no room, and you can enter but can't go inside?",
            answer: "keyboard",
            hint: "You're probably using one right now..."
        },
        {
            question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
            answer: "candle",
            hint: "Think about something that burns..."
        },
        {
            question: "What gets wet while drying?",
            answer: "towel",
            hint: "You use it after a shower..."
        },
        {
            question: "I have branches, but no fruit, trunk, or leaves. What am I?",
            answer: "bank",
            hint: "Think about money..."
        },
        {
            question: "What can travel around the world while staying in a corner?",
            answer: "stamp",
            hint: "Think about mail..."
        },
    ];

    const [currentRiddle, setCurrentRiddle] = useState(0);
    const [answer, setAnswer] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);

    const checkAnswer = () => {
        const correct = answer.toLowerCase().trim() === riddles[currentRiddle].answer.toLowerCase();

        if (correct) {
            setMessage('🎉 Correct! Amazing!');
            setScore(score + (showHint ? 5 : 10));
            setTimeout(() => {
                setCurrentRiddle((currentRiddle + 1) % riddles.length);
                setAnswer('');
                setShowHint(false);
                setMessage('');
            }, 2000);
        } else {
            setMessage('❌ Not quite! Try again or use a hint.');
        }
    };

    return (
        <div className={styles.riddleMaster}>
            <h2 className={styles.gameTitle}>🎭 Riddle Master</h2>
            <p className={styles.gameInstructions}>
                Solve clever riddles and brain teasers. Use hints if you need help!
            </p>

            <div className={styles.riddleScore}>Score: {score}</div>

            <div className={styles.riddleCard}>
                <div className={styles.riddleNumber}>Riddle #{currentRiddle + 1}</div>
                <p className={styles.riddleQuestion}>{riddles[currentRiddle].question}</p>

                {showHint && (
                    <div className={styles.riddleHint}>
                        💡 Hint: {riddles[currentRiddle].hint}
                    </div>
                )}

                <input
                    type="text"
                    className={styles.riddleInput}
                    placeholder="Type your answer..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />

                <div className={styles.riddleActions}>
                    <button onClick={checkAnswer} className={styles.submitButton}>
                        Submit Answer
                    </button>
                    <button onClick={() => setShowHint(true)} className={styles.hintButton}>
                        Show Hint (-5 points)
                    </button>
                </div>

                {message && <div className={styles.riddleMessage}>{message}</div>}
            </div>
        </div>
    );
}

// Mystery Box - AI-generated surprises
function MysteryBox() {
    const [surprise, setSurprise] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const openBox = async () => {
        setLoading(true);

        try {
            const response = await fetch('/api/mystery-box');
            const data = await response.json();
            setSurprise(data);
        } catch (error) {
            console.error('Error fetching surprise:', error);
            // Fallback surprises
            const fallbacks = [
                {
                    type: 'joke',
                    content: "Why don't scientists trust atoms? Because they make up everything!",
                    emoji: '😄'
                },
                {
                    type: 'fact',
                    content: "Honey never spoils. Archaeologists have found 3000-year-old honey in Egyptian tombs that's still edible!",
                    emoji: '🍯'
                },
                {
                    type: 'challenge',
                    content: "Try to write your name with your non-dominant hand while looking in a mirror!",
                    emoji: '🎯'
                }
            ];
            setSurprise(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.mysteryBox}>
            <h2 className={styles.gameTitle}>🎁 Mystery Box</h2>
            <p className={styles.gameInstructions}>
                Click the box for AI-generated jokes, facts, puzzles, and surprises!
            </p>

            {!surprise ? (
                <div className={styles.boxContainer}>
                    <div className={styles.giftBox} onClick={openBox}>
                        <div className={styles.boxTop}>🎁</div>
                        <div className={styles.boxBottom}>
                            {loading ? 'Opening...' : 'Click to Open!'}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.surpriseCard}>
                    <div className={styles.surpriseEmoji}>{surprise.emoji}</div>
                    <div className={styles.surpriseType}>{surprise.type?.toUpperCase()}</div>
                    <p className={styles.surpriseContent}>{surprise.content}</p>
                    <button onClick={() => setSurprise(null)} className={styles.anotherButton}>
                        Open Another Box!
                    </button>
                </div>
            )}
        </div>
    );
}
