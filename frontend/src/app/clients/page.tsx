import styles from './page.module.scss';
import { ASSETS, STATS_DATA, CLIENT_LOGOS } from './assets';
import Link from "next/link";

export default function ClientsPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <span className={styles.heroBadge}>Global Network</span>
          <h1 className={styles.heroTitle}>Trusted by Industry Leaders</h1>
          <p className={styles.heroDescription}>
            We partner with the world's most prestigious developers and architectural firms to deliver high-performance façade engineering that redefines city skylines.
          </p>
        </section>

        {/* Client Logo Grid */}
        <section className={styles.logoGrid}>
          {CLIENT_LOGOS.map((logo, index) => (
            <div key={index} className={styles.logoGridItem}>
              <div
                className={styles.logoImage}
                style={{ backgroundImage: `url('${ASSETS[logo.imageKey as keyof typeof ASSETS]}')` }}
                title={logo.alt}
              ></div>
            </div>
          ))}
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          {STATS_DATA.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Partnership CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBackground}></div>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Collaborate with Elite Facade Solutions</h2>
            <p className={styles.ctaDescription}>
              Ready to elevate your next project? Join our network of industry partners and benefit from our specialized engineering expertise.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryBtn}>Contact Partnership Team</button>
              <button className={styles.ctaSecondaryBtn}>View Project Portfolio</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}