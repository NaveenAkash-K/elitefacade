import styles from './page.module.scss';
import { ASSETS } from './assets';
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <Link href="/frontend/public" className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
                </svg>
              </div>
              <span className={styles.logoText}>HG Walls</span>
            </Link>
            <nav className={styles.nav}>
              <Link href="/frontend/public">Home</Link>
              <Link href="/projects" className={styles.activeLink}>Projects</Link>
              <Link href="/services">Services</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.searchBox}>
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Search projects..." />
            </div>
            <button className={styles.quoteBtn}>Get a Quote</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Header */}
        <div className={styles.heroHeader}>
          <h1 className={styles.pageTitle}>Our Portfolio</h1>
          <p className={styles.pageDescription}>
            Pioneering the future of architectural envelopes. From high-rise curtain walls to intricate interior glazing, explore our global engineering benchmarks.
          </p>
        </div>

        {/* Filters Section */}
        <div className={styles.filtersSection}>
          <div className={styles.filterTabs}>
            <button className={styles.filterTabActive}>All Projects</button>
            <button className={styles.filterTab}>Exterior</button>
            <button className={styles.filterTab}>Interior</button>
            <button className={styles.filterTab}>Sustainability</button>
          </div>
          <div className={styles.sortBy}>
            <span className={styles.sortLabel}>Sort By:</span>
            <select className={styles.sortSelect}>
              <option>Recent Completion</option>
              <option>Project Scale</option>
              <option>Location</option>
            </select>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className={styles.masonryGrid}>
          {/* Project 1 */}
          <div className={styles.projectCard}>
            <img
              src={ASSETS.project1}
              alt="Corporate Tower Facade"
              className={styles.projectImage}
            />
            <div className={styles.projectOverlay}>
              <span className={styles.projectCategory}>Exterior Facade</span>
              <h3 className={styles.projectTitle}>The Zenith Plaza</h3>
              <p className={styles.projectLocation}>
                <span className="material-symbols-outlined">location_on</span> Dubai, UAE
              </p>
            </div>
          </div>

          {/* Project 2 */}
          <div className={styles.projectCard}>
            <img
              src={ASSETS.project2}
              alt="Minimalist Atrium"
              className={styles.projectImage}
            />
            <div className={styles.projectOverlay}>
              <span className={styles.projectCategory}>Interior Systems</span>
              <h3 className={styles.projectTitle}>Lumina HQ</h3>
              <p className={styles.projectLocation}>
                <span className="material-symbols-outlined">location_on</span> London, UK
              </p>
            </div>
          </div>

          {/* Project 3 */}
          <div className={styles.projectCard}>
            <img
              src={ASSETS.project3}
              alt="Residential Complex"
              className={styles.projectImage}
            />
            <div className={styles.projectOverlay}>
              <span className={styles.projectCategory}>Exterior Facade</span>
              <h3 className={styles.projectTitle}>Riverside Terraces</h3>
              <p className={styles.projectLocation}>
                <span className="material-symbols-outlined">location_on</span> New York, USA
              </p>
            </div>
          </div>

          {/* Project 4 */}
          <div className={styles.projectCard}>
            <img
              src={ASSETS.project4}
              alt="Commercial Center"
              className={styles.projectImage}
            />
            <div className={styles.projectOverlay}>
              <span className={styles.projectCategory}>Commercial Glass</span>
              <h3 className={styles.projectTitle}>Apex Retail Hub</h3>
              <p className={styles.projectLocation}>
                <span className="material-symbols-outlined">location_on</span> Singapore
              </p>
            </div>
          </div>

          {/* Project 5 */}
          <div className={styles.projectCard}>
            <img
              src={ASSETS.project5}
              alt="Modern Lobby"
              className={styles.projectImage}
            />
            <div className={styles.projectOverlay}>
              <span className={styles.projectCategory}>Interior Systems</span>
              <h3 className={styles.projectTitle}>Azure Hotel Atrium</h3>
              <p className={styles.projectLocation}>
                <span className="material-symbols-outlined">location_on</span> Tokyo, Japan
              </p>
            </div>
          </div>

          {/* Project 6 */}
          <div className={styles.projectCard}>
            <img
              src={ASSETS.project6}
              alt="Art Museum"
              className={styles.projectImage}
            />
            <div className={styles.projectOverlay}>
              <span className={styles.projectCategory}>Specialized Engineering</span>
              <h3 className={styles.projectTitle}>Contemporary Arts Pavilion</h3>
              <p className={styles.projectLocation}>
                <span className="material-symbols-outlined">location_on</span> Berlin, Germany
              </p>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button className={styles.paginationArrow}>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <div className={styles.paginationNumbers}>
            <button className={styles.paginationActive}>1</button>
            <button className={styles.paginationNumber}>2</button>
            <button className={styles.paginationNumber}>3</button>
            <span className={styles.paginationEllipsis}>...</span>
            <button className={styles.paginationNumber}>12</button>
          </div>
          <button className={styles.paginationArrow}>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
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
              Delivering world-class facade solutions for iconic architecture worldwide. Excellence in engineering, precision in execution.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Services</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#">Curtain Walls</a></li>
              <li><a href="#">Structural Glazing</a></li>
              <li><a href="#">Interior Partitions</a></li>
              <li><a href="#">Maintenance</a></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Company</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#">Our History</a></li>
              <li><a href="#">Technical Standards</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
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