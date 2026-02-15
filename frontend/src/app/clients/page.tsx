import styles from './page.module.scss';
import { ASSETS, STATS_DATA, CLIENT_LOGOS } from './assets';
import Link from "next/link";

export default function ClientsPage() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 48 48" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" />
              </svg>
            </div>
            <h2 className={styles.logoText}>HG Walls</h2>
          </div>
          <nav className={styles.nav}>
            <Link href="/solutions">Solutions</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/clients" className={styles.activeLink}>Clients</Link>
            <Link href="/innovation">Innovation</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <button className={styles.quoteBtn}>Request Quote</button>
        </div>
      </header>

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
            <h2 className={styles.ctaTitle}>Collaborate with HG Walls</h2>
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

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>
                <svg viewBox="0 0 48 48" fill="currentColor">
                  <path d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" />
                </svg>
              </div>
              <span className={styles.footerLogoText}>HG Walls</span>
            </div>
            <p className={styles.footerBrandDescription}>
              Global leader in custom facade engineering, providing innovative solutions for the world's most complex architectural challenges.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className="material-symbols-outlined">groups</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Explore</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#">Our Solutions</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Engineering Process</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Contact</h4>
            <ul className={styles.footerContactList}>
              <li>HQ: London, UK</li>
              <li>contact@hgwalls.com</li>
              <li>+44 (0) 20 7946 0123</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          © 2024 HG Walls Engineering Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}