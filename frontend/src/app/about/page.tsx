import styles from './page.module.scss';
import { ASSETS, STATS_DATA, CORE_VALUES, CERTIFICATIONS } from './assets';
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Header / Navigation */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" />
              </svg>
            </div>
            <h2 className={styles.logoText}>HG Walls</h2>
          </div>
          <nav className={styles.nav}>
            <Link href="/frontend/public">Home</Link>
            <Link href="/about" className={styles.activeLink}>About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className={styles.headerRight}>
            <button className={styles.quoteBtn}>Get a Quote</button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGradient}></div>
            <div
              className={styles.heroImage}
              style={{ backgroundImage: `url('${ASSETS.heroBackground}')` }}
            ></div>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroInner}>
              <span className={styles.heroBadge}>Legacy of Engineering</span>
              <h1 className={styles.heroTitle}>
                Engineering Excellence <br /><span className={styles.heroTitleAccent}>In Every Façade.</span>
              </h1>
              <p className={styles.heroDescription}>
                Redefining architectural boundaries with precision and innovation since inception. We design the skin of the future.
              </p>
              <button className={styles.heroButton}>
                Explore Our Work
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Company Story Section */}
        <section className={styles.storySection}>
          <div className={styles.storySectionInner}>
            <div className={styles.storyGrid}>
              <div className={styles.storyContent}>
                <div className={styles.storyTextContent}>
                  <h2 className={styles.storyTitle}>The HG Walls Story</h2>
                  <p className={styles.storyParagraph}>
                    HG Walls is a global leader in façade engineering, providing comprehensive end-to-end solutions for high-end corporate environments and iconic landmarks. Our legacy is built on a foundation of structural integrity and aesthetic mastery.
                  </p>
                  <p className={styles.storyParagraph}>
                    Founded with a vision to merge technical precision with architectural beauty, we have consistently pushed the limits of what's possible in building envelope design, ensuring every project is both a masterpiece and a sustainable asset.
                  </p>
                </div>
                <div className={styles.statsGrid}>
                  {STATS_DATA.map((stat, index) => (
                    <div key={index} className={styles.statItem}>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.storyImageWrapper}>
                <div className={styles.storyImageBackground}></div>
                <div className={styles.storyImageContainer}>
                  <div
                    className={styles.storyImage}
                    style={{ backgroundImage: `url('${ASSETS.companyStoryImage}')` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className={styles.visionMissionSection}>
          <div className={styles.visionMissionInner}>
            <div className={styles.visionMissionGrid}>
              {/* Vision Card */}
              <div className={styles.visionMissionCard}>
                <div className={styles.visionMissionIcon}>
                  <span className="material-symbols-outlined">visibility</span>
                </div>
                <h3 className={styles.visionMissionTitle}>Our Vision</h3>
                <p className={styles.visionMissionDescription}>
                  To be the global benchmark in sustainable and innovative façade solutions, setting the standard for the next generation of architectural envelopes.
                </p>
              </div>
              {/* Mission Card */}
              <div className={styles.visionMissionCard}>
                <div className={styles.visionMissionIcon}>
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <h3 className={styles.visionMissionTitle}>Our Mission</h3>
                <p className={styles.visionMissionDescription}>
                  Delivering precision-engineered building envelopes that inspire and endure, combining cutting-edge technology with unmatched craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className={styles.valuesSection}>
          <div className={styles.valuesSectionInner}>
            <div className={styles.valuesHeader}>
              <h2 className={styles.valuesTitle}>Our Core Values</h2>
              <div className={styles.valuesDivider}></div>
              <p className={styles.valuesSubtitle}>
                The principles that guide our engineering philosophy and corporate culture.
              </p>
            </div>
            <div className={styles.valuesGrid}>
              {CORE_VALUES.map((value, index) => (
                <div key={index} className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <span className="material-symbols-outlined">{value.icon}</span>
                  </div>
                  <h4 className={styles.valueTitle}>{value.title}</h4>
                  <p className={styles.valueDescription}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className={styles.certificationsSection}>
          <div className={styles.certificationsSectionInner}>
            <div className={styles.certificationsContent}>
              <div className={styles.certificationsText}>
                <h3 className={styles.certificationsTitle}>Quality Certified</h3>
                <p className={styles.certificationsDescription}>
                  We maintain the highest international standards in safety, environmental impact, and engineering quality.
                </p>
              </div>
              <div className={styles.certificationsGrid}>
                {CERTIFICATIONS.map((cert, index) => (
                  <div key={index} className={styles.certificationItem}>
                    <span className="material-symbols-outlined">{cert.icon}</span>
                    <span className={styles.certificationLabel}>{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerGrid}>
              <div className={styles.footerBrand}>
                <div className={styles.footerLogo}>
                  <div className={styles.footerLogoIcon}>
                    <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" />
                    </svg>
                  </div>
                  <span className={styles.footerLogoText}>HG Walls</span>
                </div>
                <p className={styles.footerBrandDescription}>
                  Leaders in premium façade engineering and sustainable architectural solutions for the modern world.
                </p>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialLink}>
                    <span className="material-symbols-outlined">share</span>
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <span className="material-symbols-outlined">mail</span>
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <span className="material-symbols-outlined">link</span>
                  </a>
                </div>
              </div>

              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Solutions</h4>
                <ul className={styles.footerLinks}>
                  <li><a href="#">Curtain Walls</a></li>
                  <li><a href="#">Glass Structures</a></li>
                  <li><a href="#">Facade Consulting</a></li>
                  <li><a href="#">Energy Optimization</a></li>
                </ul>
              </div>

              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Contact</h4>
                <ul className={styles.footerContactList}>
                  <li>
                    <span className="material-symbols-outlined">location_on</span>
                    <span>122 Engineering Blvd, <br />Suite 400, Chicago, IL</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined">call</span>
                    <span>+1 (555) 890-2341</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <p>© 2024 HG Walls Engineering Ltd. All Rights Reserved.</p>
              <div className={styles.footerLegal}>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}