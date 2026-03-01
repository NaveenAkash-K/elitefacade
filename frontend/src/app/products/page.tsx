import styles from './page.module.scss';
import { ASSETS, PRODUCTS_DATA, FILTER_BUTTONS, FOOTER_SOLUTIONS, FOOTER_COMPANY, FOOTER_OFFICES } from './assets';

export default function ProductsPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Breadcrumbs & Title */}
        <div className={styles.pageHeader}>
          <div className={styles.breadcrumbs}>
            <a href="/frontend/public">Home</a>
            <span className="material-symbols-outlined">arrow_forward_ios</span>
            <span>Products</span>
          </div>
          <div className={styles.titleSection}>
            <div className={styles.titleContent}>
              <h2 className={styles.pageTitle}>Architectural Façade Systems</h2>
              <p className={styles.pageDescription}>
                Precision-engineered building envelopes combining thermal efficiency, structural integrity, and aesthetic excellence for high-performance developments.
              </p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className={styles.filtersSection}>
          {FILTER_BUTTONS.map((filter, index) => (
            <button
              key={index}
              className={`${styles.filterBtn} ${index === 0 ? styles.filterActive : ''}`}
            >
              {index === 0 && (
                <span className="material-symbols-outlined">filter_alt</span>
              )}
              {filter.label}
              {filter.hasDropdown && (
                <span className="material-symbols-outlined">keyboard_arrow_down</span>
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className={styles.productGrid}>
          {PRODUCTS_DATA.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <div
                  className={styles.productImage}
                  style={{ backgroundImage: `url(${ASSETS[product.imageKey as keyof typeof ASSETS]})` }}
                />
                {product.badge && (
                  <div className={styles.productBadge}>
                    <span>{product.badge}</span>
                  </div>
                )}
              </div>
              <div className={styles.productContent}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <ul className={styles.productSpecs}>
                  {product.specs.map((spec, specIndex) => (
                    <li key={specIndex}>
                      <span className="material-symbols-outlined">check_circle</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
                <button className={styles.productBtn}>
                  View Technical Details
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button className={styles.paginationArrow}>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className={styles.paginationText}>1 of 4</span>
          <button className={styles.paginationArrow}>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <div className={styles.footerLogoIcon}>
                  <span className="material-symbols-outlined">grid_view</span>
                </div>
                <h2>Elite Facade Solutions</h2>
              </div>
              <p className={styles.footerBrandDescription}>
                Leading the industry in precision-engineered building envelope solutions. Quality you can build on.
              </p>
              <div className={styles.footerSocial}>
                <a href="#"><span className="material-symbols-outlined">link</span></a>
                <a href="#"><span className="material-symbols-outlined">share</span></a>
                <a href="#"><span className="material-symbols-outlined">mail</span></a>
              </div>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Solutions</h4>
              <ul className={styles.footerLinks}>
                {FOOTER_SOLUTIONS.map((item, index) => (
                  <li key={index}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Company</h4>
              <ul className={styles.footerLinks}>
                {FOOTER_COMPANY.map((item, index) => (
                  <li key={index}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Global Offices</h4>
              <div className={styles.footerAddresses}>
                {FOOTER_OFFICES.map((office, index) => (
                  <div key={index} className={styles.footerAddress}>
                    <span className="material-symbols-outlined">location_on</span>
                    <span>{office}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© 2024 Elite Facade Solutions Engineering Ltd. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}