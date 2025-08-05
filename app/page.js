import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* ---------- Hero Section ---------- */}
      <header className={styles.hero}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Truth & Dare</span>
        </h1>
        <p className={styles.subtitle}>
          Play fun and challenging Truth or Dare questions with friends! 🎯
        </p>
        <Link className={styles.ctaButton} href="/game">Start Playing</Link>
      </header>

      {/* ---------- Features Section ---------- */}
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <h3>🤝 Multiplayer Fun</h3>
          <p>Connect with friends and enjoy endless challenges together.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>🎯 Random Challenges</h3>
          <p>Get unexpected and exciting dares or truths every time.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>⚡ Fast & Simple</h3>
          <p>Start playing instantly without complicated setup.</p>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Truth & Dare | Built with ❤️</p>
      </footer>
    </div>
  );
}
