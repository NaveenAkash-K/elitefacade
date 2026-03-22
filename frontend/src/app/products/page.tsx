import styles from './page.module.scss';
import { ASSETS, PRODUCTS_DATA, FILTER_BUTTONS, FOOTER_SOLUTIONS, FOOTER_COMPANY, FOOTER_OFFICES } from './assets';

export default function ProductsPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Breadcrumbs & Title */}
        <div className={styles.pageHeader}>
          <div className={styles.titleSection}>
            <div className={styles.titleContent}>
              <h2 className={styles.pageTitle}>Architectural Façade Systems</h2>
              <p className={styles.pageDescription}>
                Precision-engineered building envelopes combining thermal efficiency, structural integrity, and aesthetic excellence for high-performance developments.
              </p>
            </div>
          </div>
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
    </div>
  );
}