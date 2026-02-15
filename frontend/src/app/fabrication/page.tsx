import styles from './page.module.scss';
import { ASSETS, STATS_DATA, PRODUCTION_ITEMS, QA_FEATURES, FOOTER_CAPABILITIES, FOOTER_CORPORATE } from './assets';

export default function FabricationPage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <span className="material-symbols-outlined">factory</span>
            <h2 className={styles.logoText}>HG Walls</h2>
          </div>
          <nav className={styles.nav}>
            <a href="/solutions">Solutions</a>
            <a href="/fabrication" className={styles.activeLink}>Fabrication</a>
            <a href="/projects">Projects</a>
            <a href="/engineering">Engineering</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBox}>
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search facilities..." />
          </div>
          <button className={styles.specsBtn}>Request Technical Specs</button>
        </div>
      </header>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <div className={styles.heroOverlay}></div>
            <img
              src={ASSETS.heroImage}
              alt="Modern high-tech CNC machining facility floor"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>Industrial Scale Facility</div>
            <h1 className={styles.heroTitle}>
              ENGINEERED TO <br />
              <span className={styles.heroTitleAccent}>PERFECTION.</span>
            </h1>
            <p className={styles.heroDescription}>
              Our 120,000 sq.ft. fabrication hub integrates aerospace-grade CNC technology with structural engineering expertise to deliver the world's most complex façade systems.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.heroPrimaryBtn}>
                Virtual Tour
                <span className="material-symbols-outlined">play_circle</span>
              </button>
              <button className={styles.heroSecondaryBtn}>Capabilities Deck</button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {STATS_DATA.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <span className="material-symbols-outlined">{stat.icon}</span>
                <p className={styles.statLabel}>{stat.label}</p>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <div className={styles.statAccent}></div>
              </div>
            ))}
          </div>
        </section>

        {/* Production Capacity Section */}
        <section className={styles.productionSection}>
          <div className={styles.productionHeader}>
            <div className={styles.productionHeaderText}>
              <h2 className={styles.productionTitle}>Production Capacity</h2>
              <p className={styles.productionDescription}>
                From automated milling to modular assembly, our facility is optimized for high-volume delivery without compromising on bespoke engineering requirements.
              </p>
            </div>
            <div className={styles.productionNav}>
              <button className={styles.navBtn}>
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className={styles.navBtn}>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          <div className={styles.productionGrid}>
            {PRODUCTION_ITEMS.map((item, index) => (
              <div key={index} className={styles.productionCard}>
                <div className={styles.productionCardImage}>
                  <img
                    src={ASSETS[item.imageKey as keyof typeof ASSETS]}
                    alt={item.alt}
                  />
                  <div className={styles.productionCardOverlay}></div>
                  <div className={styles.productionCardTitle}>
                    <h4>{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Assurance Section */}
        <section className={styles.qaSection}>
          <div className={styles.qaContent}>
            <div className={styles.qaImageWrapper}>
              <div className={styles.qaImageBorder}></div>
              <img
                src={ASSETS.qaImage}
                alt="Engineer inspecting glass façade components"
                className={styles.qaImage}
              />
              <div className={styles.qaBadge}>
                <span className="material-symbols-outlined">military_tech</span>
                <p className={styles.qaBadgeTitle}>AAMA/FGIA</p>
                <p className={styles.qaBadgeLabel}>Certified Lab</p>
              </div>
            </div>
            <div className={styles.qaText}>
              <h2 className={styles.qaTitle}>
                Rigorous Quality <br />
                <span className={styles.qaTitleAccent}>Assurance Protocol</span>
              </h2>
              <p className={styles.qaDescription}>
                Every component that leaves our facility undergoes a multi-stage inspection process. We utilize laser scanning and ultrasonic testing to ensure structural integrity and aesthetic consistency across massive production runs.
              </p>
              <div className={styles.qaFeatures}>
                {QA_FEATURES.map((feature, index) => (
                  <div key={index} className={styles.qaFeatureItem}>
                    <div className={styles.qaFeatureIcon}>
                      <span className="material-symbols-outlined">{feature.icon}</span>
                    </div>
                    <div>
                      <h5 className={styles.qaFeatureTitle}>{feature.title}</h5>
                      <p className={styles.qaFeatureDescription}>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className={styles.qaButton}>View QA Standards</button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to scale your next project?</h2>
            <p className={styles.ctaDescription}>
              Consult with our engineering team to see how our fabrication capabilities can optimize your schedule and budget.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryBtn}>Book a Factory Visit</button>
              <button className={styles.ctaSecondaryBtn}>Get a Technical Quote</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <span className="material-symbols-outlined">factory</span>
              <h2>HG Walls</h2>
            </div>
            <p className={styles.footerDescription}>
              Leading the industry in modular façade engineering and advanced fabrication services.
            </p>
          </div>

          <div className={styles.footerColumn}>
            <h6 className={styles.footerColumnTitle}>Capabilities</h6>
            <ul className={styles.footerLinks}>
              {FOOTER_CAPABILITIES.map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h6 className={styles.footerColumnTitle}>Corporate</h6>
            <ul className={styles.footerLinks}>
              {FOOTER_CORPORATE.map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h6 className={styles.footerColumnTitle}>Headquarters</h6>
            <div className={styles.footerAddress}>
              <p>888 Fabrication Way</p>
              <p>Industrial District, Chicago IL</p>
              <p className={styles.footerPhone}>+1 (555) 942-1200</p>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2024 HG Walls Structural Systems LLC. All rights reserved.</p>
          <div className={styles.footerLegal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Supplier Portal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}