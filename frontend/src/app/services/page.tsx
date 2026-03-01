import styles from './page.module.scss';
import {
  ASSETS,
  GLOBAL_REGIONS,
  SOLUTION_PHASES,
  PROCESS_STEPS,
  WHY_CHOOSE_US,
  STATS_DATA,
  FOOTER_CAPABILITIES,
  FOOTER_CORPORATE
} from './assets';
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.badgeDot}>
                  <span className={styles.badgePing}></span>
                  <span className={styles.badgeDotInner}></span>
                </span>
                Global Façade Excellence
              </div>
              <h1 className={styles.heroTitle}>
                Advanced Façade Engineering & Consultancy
              </h1>
              <p className={styles.heroDescription}>
                We deliver high-performance building envelopes through meticulous technical analysis, innovative design systems, and seamless global execution.
              </p>
              <div className={styles.heroButtons}>
                <button className={styles.primaryBtn}>Download Capabilities</button>
                <button className={styles.secondaryBtn}>Technical Specs</button>
              </div>
            </div>
            <div className={styles.heroImageWrapper}>
              <div className={styles.heroImageGlow}></div>
              <div
                className={styles.heroImage}
                style={{ backgroundImage: `url(${ASSETS.heroImage})` }}
              />
            </div>
          </div>
        </div>

        {/* Global Service Regions */}
        <section className={styles.regionsSection}>
          <div className={styles.regionsContent}>
            <div className={styles.regionsSectionHeader}>
              <h2 className={styles.sectionTitle}>Global Operations & Strategic Hubs</h2>
              <p className={styles.sectionDescription}>
                Serving complex architectural projects across four continents with localized expertise and international standards.
              </p>
            </div>
            <div className={styles.regionsGrid}>
              {GLOBAL_REGIONS.map((region, index) => (
                <div key={index} className={styles.regionCard}>
                  <span className="material-symbols-outlined">{region.icon}</span>
                  <h3 className={styles.regionTitle}>{region.title}</h3>
                  <p className={styles.regionDescription}>{region.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Cards */}
        <section className={styles.solutionsSection}>
          <div className={styles.solutionsSectionHeader}>
            <h2 className={styles.solutionsSectionTitle}>Integrated Engineering Solutions</h2>
            <div className={styles.sectionDivider}></div>
          </div>
          <div className={styles.solutionsGrid}>
            {SOLUTION_PHASES.map((phase, index) => (
              <div key={index} className={styles.solutionCard}>
                <div
                  className={styles.solutionImage}
                  style={{ backgroundImage: `url(${ASSETS[phase.imageKey as keyof typeof ASSETS]})` }}
                />
                <div className={styles.solutionContent}>
                  <div className={styles.phaseLabel}>Phase 0{index + 1}</div>
                  <h3 className={styles.solutionTitle}>{phase.title}</h3>
                  <p className={styles.solutionDescription}>{phase.description}</p>
                  <ul className={styles.solutionFeatures}>
                    {phase.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <span className="material-symbols-outlined">check_circle</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="#" className={styles.solutionLink}>
                    Learn More <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Process Timeline */}
        <section className={styles.processSection}>
          <div className={styles.processContent}>
            <h2 className={styles.processTitle}>Our Engineering Process</h2>
            <div className={styles.processTimeline}>
              <div className={styles.timelineLine}>
                <div className={styles.timelineProgress}></div>
              </div>
              <div className={styles.processSteps}>
                {PROCESS_STEPS.map((step, index) => (
                  <div key={index} className={styles.processStep}>
                    <div className={`${styles.stepNumber} ${index < 3 ? styles.stepActive : styles.stepInactive}`}>
                      0{index + 1}
                    </div>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.whyChooseSection}>
          <div className={styles.whyChooseGrid}>
            <div className={styles.whyChooseContent}>
              <h2 className={styles.whyChooseTitle}>Why Industry Leaders Choose Elite Facade Solutions</h2>
              <div className={styles.featuresList}>
                {WHY_CHOOSE_US.map((item, index) => (
                  <div key={index} className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <h5 className={styles.featureTitle}>{item.title}</h5>
                      <p className={styles.featureDescription}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statsColumn}>
                <div className={`${styles.statCard} ${styles.statPrimary}`}>
                  <div className={styles.statValue}>{STATS_DATA[0].value}</div>
                  <div className={styles.statLabel}>{STATS_DATA[0].label}</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{STATS_DATA[1].value}</div>
                  <div className={styles.statLabel}>{STATS_DATA[1].label}</div>
                </div>
              </div>
              <div className={styles.statsColumn}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{STATS_DATA[2].value}</div>
                  <div className={styles.statLabel}>{STATS_DATA[2].label}</div>
                </div>
                <div className={`${styles.statCard} ${styles.statHighlight}`}>
                  <div className={`${styles.statValue} ${styles.statValuePrimary}`}>{STATS_DATA[3].value}</div>
                  <div className={styles.statLabel}>{STATS_DATA[3].label}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to engineer your next landmark?</h2>
            <p className={styles.ctaDescription}>
              Consult with our technical directors to define your project requirements.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryBtn}>Schedule Consultation</button>
              <button className={styles.ctaSecondaryBtn}>Contact Support</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>
                <svg viewBox="0 0 48 48" fill="currentColor">
                  <path d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" />
                </svg>
              </div>
              <span>Elite Facade Solutions</span>
            </div>
          </div>
          <div className={styles.footerCopyright}>
            © 2024 Elite Facade Solutions Façade Engineering. All Rights Reserved.
          </div>
          <div className={styles.footerSocial}>
            <Link href="#"><span className="material-symbols-outlined">language</span></Link>
            <Link href="#"><span className="material-symbols-outlined">mail</span></Link>
            <Link href="#"><span className="material-symbols-outlined">description</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}