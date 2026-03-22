import styles from './page.module.scss';
import { ASSETS } from './assets';
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
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
    </div>
  );
}