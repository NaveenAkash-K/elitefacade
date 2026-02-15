import styles from './page.module.scss';
import { ASSETS } from './assets';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className={styles.logoText}>HG Walls</h2>
          </div>

          <nav className={styles.nav}>
            <a href="#">Services</a>
            <a href="#">Projects</a>
            <a href="#">Products</a>
            <a href="#">About Us</a>
            <a href="#">Sustainability</a>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.contactBtn}>Contact Us</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className={styles.hero} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url("${ASSETS.heroBackground}")` }}>
          <div className={styles.heroContent}>
            <div className={styles.heroTextWrapper}>
              <span className={styles.heroBadge}>Global Engineering Excellence</span>
              <h1 className={styles.heroTitle}>
                Precision Engineering for <span className={styles.highlight}>Iconic</span> Façades
              </h1>
              <p className={styles.heroDescription}>
                High-end façade engineering solutions for complex corporate structures. Setting the standard in architectural aesthetics and structural performance.
              </p>
              <div className={styles.heroButtons}>
                <button className={styles.primaryBtn}>View Portfolio</button>
                <button className={styles.secondaryBtn}>Technical Data</button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.statsInner}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <span className="material-symbols-outlined">public</span>
                </div>
                <p className={styles.statLabel}>Global Projects Completed</p>
                <p className={styles.statValue}>500+</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <span className="material-symbols-outlined">corporate_fare</span>
                </div>
                <p className={styles.statLabel}>Corporate Clients</p>
                <p className={styles.statValue}>120+</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <p className={styles.statLabel}>Years of Excellence</p>
                <p className={styles.statValue}>25+</p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className={styles.expertise}>
          <div className={styles.expertiseInner}>
            <div className={styles.expertiseHeader}>
              <div>
                <h2 className={styles.sectionSubtitle}>Our Expertise</h2>
                <h3 className={styles.sectionTitle}>Engineered Solutions</h3>
              </div>
              <a href="#" className={styles.exploreLink}>
                Explore all products <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>

            <div className={styles.expertiseGrid}>
              <div className={styles.expertiseCard}>
                <div
                  className={styles.expertiseImage}
                  style={{ backgroundImage: `url("${ASSETS.curtainWall}")` }}
                />
                <div className={styles.expertiseContent}>
                  <h4 className={styles.expertiseTitle}>Curtain Wall Systems</h4>
                  <p className={styles.expertiseDescription}>
                    Innovative thermal break technology designed for peak energy efficiency in high-rise constructions.
                  </p>
                  <span className={styles.expertiseTag}>Thermal Performance Optimization</span>
                </div>
              </div>

              <div className={styles.expertiseCard}>
                <div
                  className={styles.expertiseImage}
                  style={{ backgroundImage: `url("${ASSETS.unitizedFacade}")` }}
                />
                <div className={styles.expertiseContent}>
                  <h4 className={styles.expertiseTitle}>Unitized Façades</h4>
                  <p className={styles.expertiseDescription}>
                    Precision-engineered pre-assembled units for rapid onsite installation and superior quality control.
                  </p>
                  <span className={styles.expertiseTag}>Rapid Installation Engineering</span>
                </div>
              </div>

              <div className={styles.expertiseCard}>
                <div
                  className={styles.expertiseImage}
                  style={{ backgroundImage: `url("${ASSETS.structuralGlass}")` }}
                />
                <div className={styles.expertiseContent}>
                  <h4 className={styles.expertiseTitle}>Structural Glass</h4>
                  <p className={styles.expertiseDescription}>
                    Architectural aesthetics meets load-bearing strength with our advanced structural glazing systems.
                  </p>
                  <span className={styles.expertiseTag}>Seamless Architectural Aesthetics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className={styles.clients}>
          <div className={styles.clientsInner}>
            <p className={styles.clientsTitle}>Trusted by Industry Leaders</p>
            <div className={styles.clientsLogos}>
              <img src={ASSETS.clientLogoA} alt="Client Logo A" />
              <img src={ASSETS.clientLogoB} alt="Client Logo B" />
              <img src={ASSETS.clientLogoC} alt="Client Logo C" />
              <img src={ASSETS.clientLogoD} alt="Client Logo D" />
              <img src={ASSETS.clientLogoE} alt="Client Logo E" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaOverlay} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Engineer the Future of Your Project?</h2>
              <p className={styles.ctaDescription}>
                Consult with our engineering experts today to bring your complex architectural vision to life.
              </p>
              <div className={styles.ctaButtons}>
                <button className={styles.ctaPrimaryBtn}>Get a Consultation</button>
                <button className={styles.ctaSecondaryBtn}>Request Catalog</button>
              </div>
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
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
                </svg>
              </div>
              <span className={styles.footerLogoText}>HG Walls</span>
            </div>
            <p className={styles.footerBrandDescription}>
              Redefining skylines through innovative façade engineering and sustainable architectural solutions for the modern world.
            </p>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Services</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#">Façade Design</a></li>
              <li><a href="#">Structural Engineering</a></li>
              <li><a href="#">Thermal Modeling</a></li>
              <li><a href="#">Consultancy</a></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Company</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Contact</h4>
            <ul className={styles.footerContact}>
              <li>
                <span className="material-symbols-outlined">location_on</span>
                Global Headquarters, London
              </li>
              <li>
                <span className="material-symbols-outlined">mail</span>
                info@hgwalls.engineering
              </li>
              <li>
                <span className="material-symbols-outlined">call</span>
                +44 (0) 20 7946 0000
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2024 HG Walls Engineering Ltd. All rights reserved.</p>
          <div className={styles.footerLegal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}