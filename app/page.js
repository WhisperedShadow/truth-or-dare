import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* ---------- Hero Section ---------- */}
      <header className={styles.hero}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Reveal or Risk</span>
        </h1>
        <p className={styles.subtitle}>
          Fun, challenging, and local-only Truth or Dare experience for you and your friends 🎯
        </p>
      </header>

      {/* ---------- Game Modes Section ---------- */}
      <section className={styles.gameModes}>
        <div className={styles.modeCard}>
          <h2>🎲 Random Picker</h2>
          <p>
            Randomly select an <strong>Asker</strong> and an <strong>Answerer</strong> from your player list.  
            Perfect for quick starts and fair play!
          </p>
          <Link className={styles.ctaButton} href="/random">
            Start Picker
          </Link>
        </div>

        <div className={styles.modeCard}>
          <h2>🤖 AI Truth or Dare</h2>
          <p>
            Let AI pick a random player and give them a challenging Truth or Dare question.  
            Play locally with friends — no online multiplayer.
          </p>
          <Link className={styles.ctaButton} href="/game">
            Start Game
          </Link>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Reveal or Risk | Built with ❤️</p>
      </footer>
    </div>
  );
}
